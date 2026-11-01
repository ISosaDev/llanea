-- Usuario de aplicacion para Llanea (politica: solo SELECT, INSERT y UPDATE).
-- Ejecutar en pgAdmin 4 (Herramienta de consulta) conectado como postgres a la base llanea_v3.
-- Cambiar 'CAMBIAR_ESTA_CLAVE' por una contrasena propia antes de ejecutar.

CREATE ROLE llanea_app LOGIN PASSWORD 'CAMBIAR_ESTA_CLAVE';

GRANT CONNECT ON DATABASE llanea_v3 TO llanea_app;
GRANT USAGE ON SCHEMA public TO llanea_app;

-- Este modulo solo necesita estas dos tablas.
GRANT SELECT ON roles TO llanea_app;
GRANT SELECT, INSERT, UPDATE ON usuarios TO llanea_app;

-- INSERT en una columna SERIAL necesita permiso sobre su secuencia.
GRANT USAGE ON SEQUENCE usuarios_id_usuario_seq TO llanea_app;
