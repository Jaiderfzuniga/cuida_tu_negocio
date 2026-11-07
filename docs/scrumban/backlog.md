# Backlog del producto

Cada historia tiene la forma «Como [usuario], quiero [algo] para [beneficio]» y sale de una cadena:
**fuente** (hallazgo H1–H12 del diagnóstico, catálogo OE2, diseño metodológico, arquitectura o revisión del investigador) → **requisito** (RF/RNF) → **historia** → **iteración**.

Ejemplo: 10 de 12 negocios venden por WhatsApp y cobran por Nequi (H7) → RF-17 → HU-02 «registrar las plataformas del negocio».

| Código | Historia de usuario | De dónde sale → requisito | Iteración | Estado |
|---|---|---|---|---|
| HU-01 | Como propietario, quiero crear una cuenta con correo y contraseña para guardar mis diagnósticos. | Arquitectura: seguimiento antes/después → RF-16, RNF-08 | I3 | Hecho |
| HU-02 | Como propietario, quiero registrar los datos de mi negocio (plataformas y equipos) para recibir solo lo que me sirve. | H7: operan con pocas plataformas → RF-17 | I3 | Hecho |
| HU-03 | Como propietario, quiero responder un cuestionario corto organizado por Identificar, Proteger y Recuperar. | H1, H2 y encuesta pre-test → RF-01, RF-15 | I3 | Hecho |
| HU-04 | Como propietario, quiero una explicación sencilla de cada término técnico. | H1 y H9: sin formación previa → RF-02 | I3 | Hecho |
| HU-05 | Como propietario, quiero ver mi nivel por función y un escudo que se llena, para entender mi resultado. | H8: quieren orientación → RF-03, RF-04 | I4 | Hecho |
| HU-06 | Como propietario, quiero recomendaciones explicadas («porque…») y ordenadas por prioridad. | H8 y H12: sin personal técnico → RF-05, RF-07 | I4 | Hecho |
| HU-07 | Como propietario, quiero saber cuántos puntos me suma cada herramienta para llegar al 100 %. | Revisión del investigador (30/10) → RF-05, RF-07 | I4 | Hecho |
| HU-08 | Como propietario con 100 %, quiero que igual me recomienden herramientas para mantener mi protección. | Revisión del investigador (30/10) → RF-05 | I4 | Hecho |
| HU-09 | Como propietario, quiero consultar el catálogo y filtrarlo por función y por equipo (celular, PC o ambos). | OE2 y revisión del investigador → RF-06 | I4 | Hecho |
| HU-10 | Como propietario, quiero ver el logo y el sitio oficial de cada herramienta para saber que es legítima. | Revisión del investigador (30/10) → RF-06 | I4 | Hecho |
| HU-11 | Como propietario, quiero repetir el diagnóstico y ver mi avance antes y después. | Diseño pre-test / post-test → RF-16 | I4 | Hecho |
| HU-12 | Como investigador, quiero un panel con el comparativo pre/post de cada negocio y descargar los datos. | Diseño pre-test / post-test (OE4) → Objetivo 4 | I4 | Hecho |
| HU-13 | Como usuario, quiero cambiar entre modo claro y oscuro. | Decisión del investigador → RNF-05 | I4 | Hecho |
| HU-14 | Como usuario, quiero usar la plataforma en el celular y en el computador. | H7 y revisión del investigador → RNF-01 | I4 | Hecho |
| HU-15 | Como investigador, quiero el código en GitHub y la plataforma publicada en un enlace. | Revisión del investigador (31/10) → RNF-09 | I5 | Hecho |
| HU-16 | Como investigador, quiero conectar la base de datos Supabase en el sitio publicado. | Arquitectura (Supabase) → RF-16 | I5 | Hecho |
| HU-17 | Como investigador, quiero validar con el asesor la redacción y el puntaje de las preguntas. | Validez del instrumento → Validez del instrumento | I5 | En curso (sustento del puntaje entregado el 06/11; falta juicio de expertos y prueba piloto) |
| HU-18 | Como propietario, quiero que los enlaces de Nequi (P-18) y Windows Update (P-33) lleven a sitios oficiales. | Revisión del catálogo (OE2) → RF-06 | I6 | Por hacer |
| HU-19 | Como propietario, quiero guías paso a paso para respaldar y recuperar mi información. | H3 y H4: Recuperar crítica → RF-08, RF-09 | I6 | En curso |
| HU-21 | Como investigador, quiero que quede guardada la fecha en que cada propietario aceptó el uso de sus datos. | Revisión del código (02/11) → RNF-08 (Ley 1581) | I5 | Hecho |
| HU-22 | Como investigador, quiero que se guarden las herramientas que la plataforma recomendó en cada diagnóstico, para analizarlas en el objetivo 4. | Revisión del código (02/11) → RF-05, Objetivo 4 | I5 | Hecho |
| HU-23 | Como propietario, quiero crear una contraseña nueva si olvidé la mía. | Revisión del código (02/11) → RF-16 | I5 | Hecho |
| HU-24 | Como propietario, quiero que la plataforma no se quede «cargando» después de iniciar sesión. | Prueba del investigador (02/11) → RNF-02 | I5 | Hecho |
| HU-25 | Como propietario, quiero una interfaz clara y cercana, con una ilustración y un diseño que se entienda fácil. | Revisión del investigador (04–05/11) → RNF-05 | I5 | Hecho (aprobado por el asesor el 06/11) |
| HU-20 | Como investigador, quiero pruebas internas de usabilidad basadas en ISO/IEC 25010 antes de aplicar la plataforma. | ISO/IEC 25010 (OE4) → RNF-02, RNF-12 | I6 | Por hacer |

Para agregar una historia: asígnale el siguiente código (HU-26…), enlázala a un requisito y ubícala en **Por hacer**.
