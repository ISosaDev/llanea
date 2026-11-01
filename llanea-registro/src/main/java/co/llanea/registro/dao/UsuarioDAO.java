package co.llanea.registro.dao;

import co.llanea.registro.modelo.Usuario;
import co.llanea.registro.util.ConexionBD;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Acceso a datos de la tabla usuarios (y consulta del rol en roles).
 *
 * Reglas que se cumplen en todos los metodos:
 *  - PreparedStatement con parametros (?) para evitar inyeccion SQL.
 *  - try-with-resources: la conexion, el statement y el resultado se cierran
 *    solos, incluso si hay una excepcion.
 *
 * @author Isael Antonio Sosa Garcia
 */
public class UsuarioDAO {

    /** SQLState de PostgreSQL para "violacion de restriccion UNIQUE". */
    public static final String SQLSTATE_UNICO_DUPLICADO = "23505";

    /** Consulta si ya hay un usuario con ese numero de documento. */
    public boolean existeDocumento(String numeroIdentificacion) throws SQLException {
        String sql = "SELECT 1 FROM usuarios WHERE numero_identificacion = ?";
        try (Connection con = ConexionBD.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, numeroIdentificacion);
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next();
            }
        }
    }

    /** Consulta si ya hay un usuario con ese correo (comparacion sin importar mayusculas). */
    public boolean existeCorreo(String correo) throws SQLException {
        String sql = "SELECT 1 FROM usuarios WHERE LOWER(correo) = LOWER(?)";
        try (Connection con = ConexionBD.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, correo);
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next();
            }
        }
    }

    /**
     * Busca el id de un rol por su nombre ('cliente', 'propietario', 'administrador').
     * Se busca por nombre y no se deja fijo el numero, porque el id lo genera SERIAL.
     *
     * @return el id del rol, o -1 si no existe
     */
    public int buscarIdRol(String nombreRol) throws SQLException {
        String sql = "SELECT id_rol FROM roles WHERE nombre = ?";
        try (Connection con = ConexionBD.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, nombreRol);
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next() ? rs.getInt("id_rol") : -1;
            }
        }
    }

    /**
     * Inserta el usuario y devuelve el id que genero la base (RETURNING).
     * Si el documento o el correo ya existen, PostgreSQL lanza SQLException con
     * SQLState 23505; el servlet la atiende como segunda linea de defensa.
     */
    public int insertar(Usuario u) throws SQLException {
        String sql = "INSERT INTO usuarios (id_rol, tipo_identificacion, numero_identificacion, "
                + "nombres, apellidos, correo, telefono, contrasena_hash, acepta_terminos) "
                + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id_usuario";
        try (Connection con = ConexionBD.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, u.getIdRol());
            ps.setString(2, u.getTipoIdentificacion());
            ps.setString(3, u.getNumeroIdentificacion());
            ps.setString(4, u.getNombres());
            ps.setString(5, u.getApellidos());
            ps.setString(6, u.getCorreo());
            ps.setString(7, u.getTelefono());
            ps.setString(8, u.getContrasenaHash());
            ps.setBoolean(9, u.isAceptaTerminos());
            try (ResultSet rs = ps.executeQuery()) {
                rs.next();
                return rs.getInt("id_usuario");
            }
        }
    }
}
