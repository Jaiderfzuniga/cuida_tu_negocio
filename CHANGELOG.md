# Historial de cambios

Registro de la evolución de la plataforma para la trazabilidad del trabajo de grado.

## v2.1.2 — Corrección (2 nov. 2026)

- **HU-24 (continuación):** con una cuenta nueva, el cuestionario quedaba en blanco. Ahora el cuestionario espera a que carguen los datos del negocio, la sesión nunca queda vacía al recargar en desarrollo y, si una pantalla falla, se muestra un mensaje con el error y un botón «Recargar» en lugar de una página en blanco.
- Prueba: inicio de sesión, cuestionario completo y resultado, simulando las respuestas de la base de datos.

## v2.1.1 — Corrección (2 nov. 2026)

- **HU-24:** al iniciar sesión con la base de datos real, la plataforma se quedaba en «Cargando…». Causa: se consultaba la base de datos dentro del aviso de cambio de sesión de Supabase, lo que la bloquea. Ahora la consulta se hace un instante después y la pantalla nunca queda cargando si algo falla. Lo encontró el investigador al probar con su cuenta.

## v2.1.0 — Base de datos conectada (2 nov. 2026)

- **HU-16:** la plataforma publicada usa la base de datos Supabase (proyecto `escudo-digital`): cuentas reales, negocios, diagnósticos y respuestas quedan guardados y el panel del investigador ve a todos los negocios.
- **HU-21:** se guarda la fecha en que cada propietario aceptó el uso de sus datos (Ley 1581 de 2012).
- **HU-22:** se guardan las herramientas recomendadas en cada diagnóstico, para el análisis del objetivo 4.
- **HU-23:** nueva pantalla para crear una contraseña nueva desde el enlace de «Olvidé mi contraseña».
- Catálogo y cuestionario cargados en la base de datos (33 herramientas, 13 preguntas, 40 opciones, 29 reglas).
- Se quitaron de las descripciones de las herramientas las citas internas del Excel ([60], [61]…).
- Seguridad: las funciones internas de la base de datos ya no se pueden llamar desde fuera (migración 002).
- Prueba: dos usuarios simulados; cada uno ve solo su negocio y el consentimiento queda guardado.
- Primera cuenta real creada (investigador): correo confirmado, consentimiento guardado y rol de investigador asignado.

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
