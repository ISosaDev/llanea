<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="co.llanea.registro.util.Html" %>
<%
    // El servlet dejó el nombre en la sesión antes de redirigir. Se lee una sola vez y se borra.
    String nombre = (String) session.getAttribute("nombreRegistrado");
    session.removeAttribute("nombreRegistrado");
    if (nombre == null) {
        // Si alguien abre esta página directamente, se le devuelve al formulario.
        response.sendRedirect(request.getContextPath() + "/registro");
        return;
    }
%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Llanea | Registro exitoso</title>
    <style>
        body { font-family: "Lucida Sans Unicode", "Segoe UI", Arial, sans-serif; background: #f4f6f8; margin: 0; color: #222; }
        main { max-width: 520px; margin: 48px auto; background: #fff; padding: 32px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,.12); text-align: center; }
        h1 { color: #0b5d3b; font-size: 1.5rem; }
        a { display: inline-block; margin-top: 16px; color: #0b5d3b; }
    </style>
</head>
<body>
<main>
    <h1>¡Registro exitoso!</h1>
    <p>Bienvenido(a) a Llanea, <strong><%= Html.escapar(nombre) %></strong>. Tus datos quedaron guardados.</p>
    <a href="<%= request.getContextPath() %>/registro">Registrar otro usuario</a>
</main>
</body>
</html>
