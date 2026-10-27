package llanea;

/**
 * Plato del menú de un restaurante de Llanea.
 * Es la misma lógica de la clase Producto de la guía (código, nombre y precio),
 * aplicada al carrito de pedidos de gastronomía del proyecto.
 */
public class Plato {

    // ---------- Atributos ----------
    // Privados: solo se leen o se cambian por medio de los métodos get y set (encapsulamiento).
    private String codigo;   // identificación del plato, por ejemplo "PL-001"
    private String nombre;   // nombre que ve el usuario en el menú
    private double precio;   // valor en pesos colombianos; double porque admite decimales

    // ---------- Constructor ----------
    // Se ejecuta al crear el objeto con new Plato(...). No retorna ningún valor.
    public Plato(String codigo, String nombre, double precio) {
        this.codigo = codigo;
        this.nombre = nombre;
        setPrecio(precio);   // se usa el set para reutilizar la validación del precio
    }

    // ---------- Métodos get y set (siempre por pares) ----------
    public String getCodigo() { return codigo; }
    public void setCodigo(String codigo) { this.codigo = codigo; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public double getPrecio() { return precio; }

    // Validación: un precio negativo no tiene sentido y dañaría el total del pedido.
    public void setPrecio(double precio) {
        if (precio < 0) {
            throw new IllegalArgumentException("El precio no puede ser negativo: " + precio);
        }
        this.precio = precio;
    }

    // ---------- Operaciones de la clase ----------
    // Devuelve el precio unitario del plato.
    public double obtenerPrecio() {
        return precio;
    }

    // Calcula el valor de pedir varias unidades del mismo plato.
    public double calcularTotal(int cantidad) {
        if (cantidad <= 0) {
            throw new IllegalArgumentException("La cantidad debe ser mayor que cero: " + cantidad);
        }
        return precio * cantidad;
    }
}
