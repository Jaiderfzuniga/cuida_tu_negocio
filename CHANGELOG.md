# Historial de cambios

Registro de la evolución de la plataforma para la trazabilidad del trabajo de grado.

## v2.0.0 — Escudo Digital (31 oct. 2026)

Nueva versión construida desde cero según el documento de arquitectura y stack del objetivo 3.
El prototipo anterior se conserva en el historial de Git (commit `5173086`).

**Arquitectura**
- Código separado en capas: pantallas, componentes, lógica, datos y servicios (antes todo estaba en un solo archivo).
- Base de datos en Supabase: 9 tablas y reglas de acceso por fila (RLS); cuentas con correo y contraseña.
- Modo demostración sin base de datos para pruebas locales.

**Diagnóstico y recomendaciones**
- Cuestionario de 13 preguntas como máximo (4 Identificar, 5 Proteger, 4 Recuperar); se ocultan las que no aplican al negocio.
- Nivel por función y nivel general; motor de reglas sin inteligencia artificial.
- «Tu ruta al 100 %»: cada herramienta indica cuántos puntos suma y la suma completa lo que falta.
- Herramientas de refuerzo: aun con 100 % se recomiendan herramientas para mantener la protección.
- Solo se recomiendan herramientas compatibles con los equipos del negocio (Android/iPhone, con o sin computador).

**Catálogo**
- 33 herramientas del catálogo final del objetivo 2 (10 Identificar, 17 Proteger, 6 Recuperar).
- Logo de cada herramienta y aviso de sitio o tienda oficial.
- Filtros por función y por equipo (solo celular, solo PC, PC y celular).

**Interfaz**
- Estilo «Neón»: modo oscuro y modo claro.
- Escudo 3D que se llena por función durante el cuestionario; tienda 3D en el inicio.
- Anillos de porcentaje animados en el resultado.
- Diseño adaptado a celular y computador.
- Panel del investigador con comparativo pre/post y descarga de datos en CSV.

## v1 — Prototipo «Cuida tu Negocio»

Prototipo inicial: 7 preguntas, sin base de datos y con todo el código en un solo archivo.
