package co.llanea.registro.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Entrega conexiones JDBC a PostgreSQL (base llanea_v3).
 *
 * Nota: los datos de conexion NO van escritos en el codigo. Se leen de variables
 * de entorno (RNF08) para que ninguna credencial termine en el repositorio.
 *   LLANEA_DB_URL       (opcional) por defecto jdbc:postgresql://localhost:5432/llanea_v3
 *   LLANEA_DB_USER      (obligatoria)
 *   LLANEA_DB_PASSWORD  (obligatoria)
 *
 * @author Isael Antonio Sosa Garcia
 */
public final class ConexionBD {

    private static final String URL_POR_DEFECTO = "jdbc:postgresql://localhost:5432/llanea_v3";

    // Constructor privado: es una clase de utilidades, no se instancia.
    private ConexionBD() {
    }

    /**
     * Abre una conexion nueva. Quien la pida debe cerrarla (try-with-resources).
     */
    public static Connection getConexion() throws SQLException {
        String url = leerVariable("LLANEA_DB_URL", URL_POR_DEFECTO);
        String usuario = leerVariable("LLANEA_DB_USER", null);
        String clave = leerVariable("LLANEA_DB_PASSWORD", null);

        try {
            // Dentro de Tomcat el driver vive en WEB-INF/lib; se carga a mano para
            // no depender del descubrimiento automatico de DriverManager.
            Class.forName("org.postgresql.Driver");
        } catch (ClassNotFoundException e) {
            throw new SQLException("No se encontro el driver JDBC de PostgreSQL", e);
        }
        return DriverManager.getConnection(url, usuario, clave);
    }

    // Lee una variable de entorno; si falta y no hay valor por defecto, falla con un mensaje claro.
    private static String leerVariable(String nombre, String porDefecto) throws SQLException {
        String valor = System.getenv(nombre);
        if (valor == null || valor.isBlank()) {
            if (porDefecto == null) {
                throw new SQLException("Falta la variable de entorno " + nombre);
            }
            return porDefecto;
        }
        return valor;
    }
}
