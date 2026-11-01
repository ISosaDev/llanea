<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="co.llanea.registro.util.Html" %>
<%!
    // Declaración JSP: método auxiliar disponible en toda la página.
    // Devuelve lo que el usuario ya había escrito (escapado) para que no pierda
    // los datos si el formulario vuelve con errores.
    private String previo(jakarta.servlet.http.HttpServletRequest r, String campo) {
        return Html.escapar(r.getParameter(campo));
    }

    // Marca la opción del <select> que el usuario había elegido.
    private String seleccionado(jakarta.servlet.http.HttpServletRequest r, String valor) {
        return valor.equals(r.getParameter("tipoIdentificacion")) ? "selected" : "";
    }
%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Llanea | Registro de usuario</title>
    <style>
        body { font-family: "Lucida Sans Unicode", "Segoe UI", Arial, sans-serif; background: #f4f6f8; margin: 0; color: #222; }
        main { max-width: 520px; margin: 32px auto; background: #fff; padding: 28px 32px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,.12); }
        h1 { margin-top: 0; font-size: 1.5rem; color: #0b5d3b; }
        label { display: block; margin-top: 14px; font-weight: 600; font-size: .9rem; }
        input[type=text], input[type=email], input[type=tel], input[type=password], select {
            width: 100%; padding: 9px 10px; margin-top: 4px; border: 1px solid #b8c0c8; border-radius: 4px; font-size: 1rem; box-sizing: border-box; }
        .check { display: flex; gap: 8px; align-items: center; margin-top: 16px; font-weight: 400; }
        button { margin-top: 22px; width: 100%; padding: 11px; background: #0b5d3b; color: #fff; border: 0; border-radius: 4px; font-size: 1rem; cursor: pointer; }
        button:hover { background: #094a2f; }
        .errores { background: #fdecea; border: 1px solid #f5a8a0; color: #7a1c14; padding: 10px 14px; border-radius: 4px; margin-bottom: 8px; }
        .errores ul { margin: 6px 0 0; padding-left: 20px; }
    </style>
</head>
<body>
<main>
    <h1>Crear cuenta en Llanea</h1>

    <%
        // Scriptlet: si el servlet devolvió errores, se muestran en una lista.
        @SuppressWarnings("unchecked")
        List<String> errores = (List<String>) request.getAttribute("errores");
        if (errores != null && !errores.isEmpty()) {
    %>
    <div class="errores" role="alert">
        Revisa los siguientes puntos:
        <ul>
            <% for (String e : errores) { %>
            <li><%= Html.escapar(e) %></li>
            <% } %>
        </ul>
    </div>
    <% } %>

    <form action="<%= request.getContextPath() %>/registro" method="post" autocomplete="off">
        <label for="tipoIdentificacion">Tipo de documento</label>
        <select id="tipoIdentificacion" name="tipoIdentificacion" required>
            <option value="">Selecciona...</option>
            <option value="CC" <%= seleccionado(request, "CC") %>>Cédula de ciudadanía</option>
            <option value="TI" <%= seleccionado(request, "TI") %>>Tarjeta de identidad</option>
            <option value="CE" <%= seleccionado(request, "CE") %>>Cédula de extranjería</option>
            <option value="NIT" <%= seleccionado(request, "NIT") %>>NIT</option>
            <option value="Pasaporte" <%= seleccionado(request, "Pasaporte") %>>Pasaporte</option>
        </select>

        <label for="numeroIdentificacion">Número de documento</label>
        <input type="text" id="numeroIdentificacion" name="numeroIdentificacion" maxlength="20" required
               value="<%= previo(request, "numeroIdentificacion") %>">

        <label for="nombres">Nombres</label>
        <input type="text" id="nombres" name="nombres" maxlength="100" required value="<%= previo(request, "nombres") %>">

        <label for="apellidos">Apellidos</label>
        <input type="text" id="apellidos" name="apellidos" maxlength="100" required value="<%= previo(request, "apellidos") %>">

        <label for="correo">Correo electrónico</label>
        <input type="email" id="correo" name="correo" maxlength="150" required value="<%= previo(request, "correo") %>">

        <label for="telefono">Teléfono de contacto</label>
        <input type="tel" id="telefono" name="telefono" maxlength="20" required value="<%= previo(request, "telefono") %>">

        <label for="contrasena">Contraseña (mínimo 8 caracteres, con letras y números)</label>
        <input type="password" id="contrasena" name="contrasena" minlength="8" maxlength="72" required>

        <label for="confirmacion">Confirmar contraseña</label>
        <input type="password" id="confirmacion" name="confirmacion" minlength="8" maxlength="72" required>

        <label class="check">
            <input type="checkbox" name="aceptaTerminos" value="1" required>
            Acepto los términos y condiciones
        </label>

        <button type="submit">Registrarme</button>
    </form>
</main>
</body>
</html>
