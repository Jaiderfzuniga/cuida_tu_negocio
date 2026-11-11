# Historial de cambios

Registro de la evolución de la plataforma para la trazabilidad del trabajo de grado.

## v2.4.1 — Ícono de la pestaña (11 nov. 2026)

- El ícono de la pestaña del navegador pasa del escudo verde del diseño «Neón» a la cabeza del robot, la mascota de la plataforma. El investigador lo eligió entre seis estilos (caricatura, anime, robot, pixel art, sticker y candado) porque se reconoce bien a 16 píxeles y une el ícono con el personaje de las pantallas.
- Se agregó el ícono grande (`icono-180.png`) para cuando se guarda la página en la pantalla de inicio del celular.

## v2.4.0 — Guías paso a paso (9 nov. 2026)

Nueva pantalla **Guías**, en el menú entre Catálogo y Mi avance. El investigador eligió el diseño entre tres opciones y la aprobó antes de subirla.

- **HU-19 (RF-08, RF-09):** guías para hacer y recuperar copias de WhatsApp (Android e iPhone), del celular (Google One e iCloud) y de los archivos del computador (OneDrive). Cada una dice cómo activar la copia, cómo recuperar en un equipo nuevo y cada cuánto hacerla.
- **HU-31 (RF-10, RF-12):** guías de verificación en dos pasos (WhatsApp, Google, Facebook e Instagram), de la clave dinámica de Nequi y de cómo reconocer un mensaje o enlace falso.
- **HU-32:** las guías se ordenan según el último diagnóstico (primero las de la ruta al 100 %, con los puntos que suman; después de la función más débil a la más fuerte). Sin diagnóstico, va primero Recuperar. Arriba hay un acceso rápido «Ir directo a».
- Solo se muestran las guías que sirven al negocio (Android o iPhone, computador, plataformas), con la opción «Ver todas».
- La ruta al 100 % enlaza cada herramienta con su guía. Cada guía termina con el enlace a su página oficial.
- 3 pruebas automáticas nuevas (6 en total): solo Identificar, Proteger y Recuperar, herramientas del catálogo y frecuencia en las guías de Recuperar.

## v2.3.0 — Ajustes de la asesoría y descargas (9 nov. 2026)

Cambios pedidos por el asesor el 6 de noviembre y revisados por el investigador en su computador antes de subirlos.

- **HU-26:** «¿Qué significa esto?» va en un recuadro con una franja y el título en el color de la función, para que se vea más.
- **HU-27:** en «Cómo funciona», los números 1, 3 y 5 van en verde, azul y naranja, los colores de Identificar, Proteger y Recuperar, en modo claro y oscuro.
- **HU-28:** si un nuevo diagnóstico queda igual o más bajo que el anterior, aparece «Volver a intentar». El intento queda guardado en la base de datos y el panel muestra cuántos intentos tiene cada negocio.
- **HU-29 (RF-16):** botón «Descargar o imprimir» en el resultado: una hoja con los niveles, el punto más débil y la ruta al 100 % con el sitio oficial de cada herramienta. Se guarda como PDF desde la ventana de imprimir.
- **HU-30:** el panel del investigador descarga un Excel en vez de un CSV, con una hoja por negocio (cada pregunta y la respuesta de cada intento), todas las respuestas con filtros, los intentos y la lista de preguntas. Se corrigió que el panel no traía las respuestas desde la base de datos.
- **HU-18:** enlaces oficiales de Nequi (P-18, centro de ayuda de Nequi) y de Windows Update (P-33, soporte de Microsoft), también en la base de datos.
- **Puntaje (HU-17):** se agregó la [rúbrica de puntuación](docs/objetivo-3/rubrica-puntaje.md) y se ajustó el [sustento](docs/objetivo-3/sustento-puntaje.md): «No» y «No sé» valen 0, la escala es propia porque el NIST CSF no tiene una puntuación oficial y, por ahora, no se hará juicio de expertos; queda la prueba piloto.
- Nueva librería: ExcelJS 4.4.0, que solo se carga al pulsar el botón del Excel.

## Documentación — asesoría del 6 nov. 2026

- El asesor **aprobó el diseño** (versión 2.2.1). Se registró en el informe del objetivo 3 y en el backlog (HU-25).
- El asesor preguntó de dónde sale el puntaje del cuestionario. Se agregó el [sustento del puntaje](docs/objetivo-3/sustento-puntaje.md) con el cálculo, el origen de cada pregunta, lo que falta validar y un plan de juicio de expertos y prueba piloto (HU-17 en curso).
- El informe de avances de los objetivos 1 y 2 quedó con **33 herramientas** (sin Recuva, descartada por su licencia de uso doméstico), igual que la plataforma.
- Los prototipos de Figma se llaman ahora **wireframes** en toda la documentación.

## v2.2.1 — Colores ajustados en Figma (6 nov. 2026)

El investigador ajustó colores en los wireframes de Figma y se pasaron a la plataforma. Solo cambia el color de algunos títulos; nada de la lógica.

- En el cuestionario, el nombre de la función y «Pregunta N de 10» van en el color de su función: verde para Identificar, azul para Proteger y naranja para Recuperar, en modo claro y oscuro.
- En modo oscuro, los títulos de Crear cuenta, Ingresar, Nueva contraseña y Tu ruta al 100 % también van en naranja.

## v2.2.0 — Nuevo diseño (5 nov. 2026)

El investigador no quedó conforme con el estilo «Neón» y eligió uno nuevo después de ver más de 20 propuestas. Se publicó el 5 de noviembre a las 23:36 con el pull request #3 (commits `bc39ede` a `d9225b5`). El 6 de noviembre se agregó un último ajuste (`cbf3a61`). La versión anterior queda en el commit `bbb5824` (v2.1.3).

- **HU-25:** estilo «Papel»: fondo de papel arrugado en modo claro, fondo plano en modo oscuro, títulos grandes, botones redondeados y panel diagonal. Se mantiene la adaptación a computador y celular.
- La pantalla inicial usa los textos definidos por el investigador. Inicio, Crear cuenta y Tu negocio llevan una ilustración de una mujer con ruana usando su celular; el investigador la prefirió a la escena del robot con la tienda porque esta se veía infantil. Un robot pequeño acompaña en las demás ventanas. Las imágenes se generaron con inteligencia artificial; la plataforma no usa inteligencia artificial para diagnosticar ni recomendar.
- Nueva ventana «Cómo funciona»: qué es la plataforma, sus 5 pasos, las tres funciones con ejemplos reales del cuestionario, por qué existe, cómo se recomienda y cómo se usan los datos.
- Escudo en 3D en el cuestionario y anillos en 3D con porcentaje y animación en el resultado.
- En modo oscuro, los títulos de Inicio, Cómo funciona, Catálogo, Mi avance y Tu negocio van en naranja.
- La explicación de cada pregunta ahora se ve siempre, sin tener que tocar un botón.
- «Mi avance» muestra todos los diagnósticos y cuánto ha subido el negocio. Cada herramienta sigue mostrando su logo y su sitio oficial.
- No cambiaron las preguntas, el puntaje, las recomendaciones, el catálogo ni la base de datos. Los componentes `Anillo`, `Marca` y `Tienda3D` quedaron sin uso.
- Prueba: compilación, 3 pruebas automáticas y recorrido en modo demostración por las pantallas, en claro y oscuro, en computador y celular. El investigador lo revisó en su computador y los 33 logos cargan en la página publicada. Falta la revisión del asesor y las pruebas con usuarios.

Documentación: [proceso completo del objetivo 3](docs/objetivo-3/README.md).

## v2.1.3 — Corrección de la publicación (3 nov. 2026)

- Al pasar la publicación a GitHub Actions, la página quedó en «modo demostración» y las cuentas reales no funcionaban desde otros dispositivos. Causa: el flujo de publicación definía las variables de Supabase vacías y estas reemplazaban a las de `.env.production`. Se quitaron. Lo detectó el investigador al entrar desde otro dispositivo.

## Rama principal (2 nov. 2026)

- La versión 2 se unió a la rama principal `main` con el pull request #1 (27 commits). Desde ahora se trabaja en `version-2` y cada etapa se cierra con un pull request hacia `main`.

## v2.1.2 — Corrección (2 nov. 2026)

- **HU-24 (continuación):** con una cuenta nueva, el cuestionario quedaba en blanco. Ahora el cuestionario espera a que carguen los datos del negocio, la sesión nunca queda vacía al recargar en desarrollo y, si una pantalla falla, se muestra un mensaje con el error y un botón «Recargar» en lugar de una página en blanco.
- Prueba: inicio de sesión, cuestionario completo y resultado, simulando las respuestas de la base de datos.
- Prueba real del investigador en la plataforma publicada con dos cuentas: diagnóstico inicial (43 %) y de seguimiento (88 %) guardados como pre y post, con respuestas, recomendaciones y consentimiento.
- El investigador confirmó que el diagnóstico funciona con la base de datos real. El error de «refuerzo» en su computador venía de un archivo viejo en su carpeta; se sincronizó todo el código.

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
