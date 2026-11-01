package co.llanea.registro.util;

/**
 * Escapa texto antes de pintarlo en una pagina JSP.
 * Evita que lo escrito por el usuario se ejecute como HTML o JavaScript (XSS).
 *
 * @author Isael Antonio Sosa Garcia
 */
public final class Html {

    private Html() {
    }

    public static String escapar(String texto) {
        if (texto == null) {
            return "";
        }
        StringBuilder sb = new StringBuilder(texto.length() + 16);
        for (char c : texto.toCharArray()) {
            switch (c) {
                case '&' -> sb.append("&amp;");
                case '<' -> sb.append("&lt;");
                case '>' -> sb.append("&gt;");
                case '"' -> sb.append("&quot;");
                case '\'' -> sb.append("&#39;");
                default -> sb.append(c);
            }
        }
        return sb.toString();
    }
}
