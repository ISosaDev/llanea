package co.llanea.registro.servlet;

import at.favre.lib.crypto.bcrypt.BCrypt;
import co.llanea.registro.dao.UsuarioDAO;
import co.llanea.registro.modelo.Usuario;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Pattern;

/**
 * Controlador del registro de usuarios (patron MVC: Servlet = controlador,
 * JSP = vista, UsuarioDAO = acceso a datos).
 *
 *  - doGet:  muestra el formulario registro.jsp.
 *  - doPost: valida, revisa duplicados, cifra la contrasena y guarda en la base.
 *
 * @author Isael Antonio Sosa Garcia
 */
@WebServlet(name = "RegistroUsuarioServlet", urlPatterns = "/registro")
public class RegistroUsuarioServlet extends HttpServlet {

    private static final Logger LOG = Logger.getLogger(RegistroUsuarioServlet.class.getName());

    // Valores permitidos por el CHECK chk_tipo_id de la tabla usuarios.
    private static final Set<String> TIPOS_ID = Set.of("CC", "TI", "CE", "NIT", "Pasaporte");

    // Formatos de validacion. Los largos reflejan los VARCHAR de la tabla.
    private static final Pattern NUMERO_ID = Pattern.compile("^[A-Za-z0-9]{5,20}$");
    private static final Pattern NOMBRE = Pattern.compile("^[\\p{L}][\\p{L} .'-]{1,99}$");
    private static final Pattern CORREO = Pattern.compile("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
    private static final Pattern TELEFONO = Pattern.compile("^[0-9+ ]{7,20}$");

    private static final int COSTO_BCRYPT = 12; // RNF02: costo minimo 12

    private final UsuarioDAO usuarioDAO = new UsuarioDAO();

    /** GET /registro: solo entrega el formulario vacio. */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.getRequestDispatcher("/registro.jsp").forward(request, response);
    }

    /** POST /registro: procesa el formulario. */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Sin esto las tildes y la enie llegan dañadas.
        request.setCharacterEncoding("UTF-8");

        String tipoId = valor(request, "tipoIdentificacion");
        String numeroId = valor(request, "numeroIdentificacion");
        String nombres = valor(request, "nombres");
        String apellidos = valor(request, "apellidos");
        String correo = valor(request, "correo");
        String telefono = valor(request, "telefono");
        String clave = request.getParameter("contrasena") == null ? "" : request.getParameter("contrasena");
        String clave2 = request.getParameter("confirmacion") == null ? "" : request.getParameter("confirmacion");
        boolean acepta = request.getParameter("aceptaTerminos") != null;

        // 1. Validaciones de formato
        List<String> errores = new ArrayList<>();
        if (!TIPOS_ID.contains(tipoId)) errores.add("Selecciona un tipo de documento válido.");
        if (!NUMERO_ID.matcher(numeroId).matches()) errores.add("El número de documento debe tener entre 5 y 20 letras o números, sin espacios.");
        if (!NOMBRE.matcher(nombres).matches()) errores.add("Los nombres solo admiten letras (máximo 100 caracteres).");
        if (!NOMBRE.matcher(apellidos).matches()) errores.add("Los apellidos solo admiten letras (máximo 100 caracteres).");
        if (correo.length() > 150 || !CORREO.matcher(correo).matches()) errores.add("El correo electrónico no tiene un formato válido.");
        if (!TELEFONO.matcher(telefono).matches()) errores.add("El teléfono debe tener entre 7 y 20 dígitos (se permite el signo +).");
        if (clave.length() < 8 || clave.length() > 72 || !clave.matches(".*[A-Za-z].*") || !clave.matches(".*[0-9].*")) {
            errores.add("La contraseña debe tener entre 8 y 72 caracteres, con al menos una letra y un número.");
        } else if (!clave.equals(clave2)) {
            errores.add("La confirmación no coincide con la contraseña.");
        }
        if (!acepta) errores.add("Debes aceptar los términos y condiciones.");

        // 2. Si el formato es correcto, se consulta la base (duplicados y rol)
        int idRol = -1;
        if (errores.isEmpty()) {
            try {
                if (usuarioDAO.existeDocumento(numeroId)) errores.add("Ya existe un usuario registrado con ese número de documento.");
                if (usuarioDAO.existeCorreo(correo)) errores.add("Ya existe un usuario registrado con ese correo electrónico.");
                if (errores.isEmpty()) {
                    idRol = usuarioDAO.buscarIdRol("cliente");
                    if (idRol < 0) errores.add("No se pudo completar el registro: falta el rol 'cliente' en la base de datos.");
                }
            } catch (SQLException e) {
                LOG.log(Level.SEVERE, "Error consultando la base de datos", e);
                errores.add("No fue posible comunicarse con la base de datos. Intenta de nuevo.");
            }
        }

        if (!errores.isEmpty()) {
            volverAlFormulario(request, response, errores);
            return;
        }

        // 3. Armar el usuario con la contrasena ya cifrada y guardarlo
        Usuario u = new Usuario();
        u.setIdRol(idRol);
        u.setTipoIdentificacion(tipoId);
        u.setNumeroIdentificacion(numeroId);
        u.setNombres(nombres);
        u.setApellidos(apellidos);
        u.setCorreo(correo);
        u.setTelefono(telefono);
        u.setContrasenaHash(BCrypt.withDefaults().hashToString(COSTO_BCRYPT, clave.toCharArray()));
        u.setAceptaTerminos(true);

        try {
            usuarioDAO.insertar(u);
        } catch (SQLException e) {
            // Segunda linea de defensa: dos personas registrando el mismo documento a la vez.
            if (UsuarioDAO.SQLSTATE_UNICO_DUPLICADO.equals(e.getSQLState())) {
                errores.add("El documento o el correo ya están registrados.");
            } else {
                LOG.log(Level.SEVERE, "Error guardando el usuario", e);
                errores.add("No fue posible guardar el registro. Intenta de nuevo.");
            }
            volverAlFormulario(request, response, errores);
            return;
        }

        // 4. Patron Post-Redirect-Get: si el usuario recarga la pagina no se reenvia el POST.
        request.getSession().setAttribute("nombreRegistrado", nombres + " " + apellidos);
        response.sendRedirect(request.getContextPath() + "/exito.jsp");
    }

    // Devuelve el formulario con los errores y los datos escritos (nunca la contrasena).
    private void volverAlFormulario(HttpServletRequest request, HttpServletResponse response, List<String> errores)
            throws ServletException, IOException {
        request.setAttribute("errores", errores);
        request.getRequestDispatcher("/registro.jsp").forward(request, response);
    }

    // Lee un parametro y le quita espacios en los extremos; null se vuelve "".
    private String valor(HttpServletRequest request, String nombre) {
        String v = request.getParameter(nombre);
        return v == null ? "" : v.trim();
    }
}
