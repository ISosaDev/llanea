package llanea;

import java.util.Locale;

/**
 * Programa principal: arma un pedido de ejemplo con objetos de la clase Plato
 * y calcula el total. Los precios son de ejemplo del prototipo, no del menú real.
 */
public class LlaneaPedidoApp {

    // Da formato de pesos colombianos: 38000 -> $38.000
    static String formatearPesos(double valor) {
        return String.format(Locale.forLanguageTag("es-CO"), "$%,.0f", valor);
    }

    public static void main(String[] args) {

        // 1. Crear los objetos: cada new llama al constructor de la clase Plato.
        Plato[] menu = {
            new Plato("PL-001", "Mamona llanera",   38000),
            new Plato("PL-002", "Caldo de costilla", 14000),
            new Plato("PL-003", "Jugo de corozo",     6000)
        };

        // Cantidad pedida de cada plato, en el mismo orden del arreglo menu.
        int[] cantidades = {2, 1, 3};

        // 2. Recorrer el pedido y usar los métodos del objeto.
        System.out.println("=== Pedido en Fogón Llanero (Yopal) ===");
        double totalPedido = 0;
        for (int i = 0; i < menu.length; i++) {
            double subtotal = menu[i].calcularTotal(cantidades[i]);
            totalPedido += subtotal;
            System.out.printf("%s | %-18s | %d x %-8s = %s%n",
                    menu[i].getCodigo(), menu[i].getNombre(), cantidades[i],
                    formatearPesos(menu[i].obtenerPrecio()), formatearPesos(subtotal));
        }
        System.out.println("Total del pedido: " + formatearPesos(totalPedido));

        // 3. Cambiar un atributo con set y volver a calcular.
        menu[2].setPrecio(7000);
        System.out.println("\nNuevo precio de " + menu[2].getNombre() + ": " + formatearPesos(menu[2].getPrecio())
                + " -> 3 unidades = " + formatearPesos(menu[2].calcularTotal(3)));

        // 4. Probar la validación: el precio negativo debe rechazarse.
        try {
            menu[0].setPrecio(-5000);
        } catch (IllegalArgumentException e) {
            System.out.println("Validación correcta: " + e.getMessage());
        }
    }
}
