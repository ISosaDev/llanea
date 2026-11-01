# Llanea - User registration module

Java web module (Servlet + JSP + JDBC) that registers users in the `usuarios` table of the `llanea_v3` PostgreSQL database.

Evidence: GA7-220501096-AA2-EV01 / AA2-EV02 (SENA ADSO, ficha 3336142).
Author: Isael Antonio Sosa Garcia.

## Stack
- Java 17+, Maven (WAR), Jakarta Servlet 6.1, JSP 4.0
- Apache Tomcat 11.0.x
- PostgreSQL 18 + JDBC driver 42.7.4
- bcrypt (cost 12) for password hashes

## Structure
| Path | Role |
|---|---|
| `servlet/RegistroUsuarioServlet` | Controller: `doGet` shows the form, `doPost` validates and saves |
| `dao/UsuarioDAO` | JDBC access with `PreparedStatement` and try-with-resources |
| `modelo/Usuario` | Data object |
| `util/ConexionBD` | Connection factory, reads credentials from environment variables |
| `util/Html` | HTML escaping for JSP output |
| `webapp/registro.jsp`, `exito.jsp` | Views |
| `db/crear_usuario_llanea_app.sql` | Least-privilege DB user (SELECT, INSERT, UPDATE) |

## Configuration
Set these environment variables before starting Tomcat:

| Variable | Required | Default |
|---|---|---|
| `LLANEA_DB_URL` | no | `jdbc:postgresql://localhost:5432/llanea_v3` |
| `LLANEA_DB_USER` | yes | - |
| `LLANEA_DB_PASSWORD` | yes | - |

## Build and run
```
mvn clean package
copy target\llanea-registro.war  <TOMCAT_HOME>\webapps\
<TOMCAT_HOME>\bin\startup.bat
```
Open http://localhost:8080/llanea-registro/registro

## Security notes
- No SQL injection: every query uses `PreparedStatement`.
- Passwords are stored as bcrypt hashes, never in plain text.
- Duplicate document/email: checked before insert and again on SQLState `23505`.
- Output is HTML-escaped; credentials never live in the source code.
