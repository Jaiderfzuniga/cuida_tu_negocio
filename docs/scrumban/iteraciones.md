# Iteraciones

Registro de cada iteración: qué se planeó, qué se entregó, qué se corrigió en la revisión y qué se mejora del proceso.

> Nota de trazabilidad: las iteraciones I1 a I4 se trabajaron antes de subir el código; sus commits (31/10/2026) agrupan el trabajo por etapa. Desde I5, cada historia se sube en su propio commit.

> Fechas planeadas: cada actividad del cronograma (7, 8 y 9) se dividió en dos iteraciones. Las iteraciones I1 a I4 se ejecutaron en octubre, después de lo planeado; I5 e I6 mantienen las fechas de la actividad 9.

## I1 · Planear cómo se construye  —  Hecho

- **Actividad del cronograma:** Actividad 7
- **Planeado:** 07/09 – 18/09/2026 · **Real:** 30/10/2026
- **Objetivo:** Decidir con qué tecnologías se hace la plataforma, cómo se organiza el código y qué datos se guardan.
- **Historias:** —
- **Entregables:** Un documento de 11 páginas con el plan técnico: las partes del sistema, las 9 tablas de la base de datos y quién puede ver qué.
- **Evidencia:** Documento «Arquitectura y stack tecnológico»
- **Revisión:** Se revisó el prototipo anterior y no servía de base: todo el código estaba en un solo archivo, no guardaba datos y tenía solo 7 preguntas. Por eso se empezó un proyecto nuevo.
- **Mejora (retrospectiva):** Planear antes de programar evitó repetir los errores del primer prototipo.

## I2 · Diseñar cómo se ve  —  Hecho

- **Actividad del cronograma:** Actividad 7
- **Planeado:** 19/09 – 30/09/2026 · **Real:** 30/10/2026
- **Objetivo:** Dibujar las pantallas antes de programar, para aprobar el diseño primero.
- **Historias:** —
- **Entregables:** 11 pantallas de muestra (10 para celular y 1 para computador) con el estilo «Neón».
- **Evidencia:** Lienzo de diseño «Escudo Digital — propuesta visual»
- **Revisión:** El primer diseño no gustó y se rehízo con la referencia que eligió el investigador. Además se pidió mostrar cómo llegar al 100 %, poner el logo de cada herramienta y agregar dibujos en 3D.
- **Mejora (retrospectiva):** Corregir un dibujo es mucho más rápido que corregir código ya hecho.

## I3 · Construir la base  —  Hecho

- **Actividad del cronograma:** Actividad 8
- **Planeado:** 01/10 – 15/10/2026 · **Real:** 30/10/2026
- **Objetivo:** Crear el proyecto, cargar las preguntas y las 33 herramientas, y programar cómo se calcula el puntaje y qué se recomienda.
- **Historias:** HU-01, HU-02, HU-03, HU-04
- **Entregables:** El proyecto funcionando con el catálogo, el cuestionario, el cálculo del puntaje y las reglas de recomendación (sin inteligencia artificial).
- **Evidencia:** Cambios guardados en GitHub: 8f4d84c, f428e4b, ede64af y 4c5e831
- **Revisión:** Se crearon pruebas automáticas que revisan solas que el puntaje se calcule bien. Las 3 pasaron.
- **Mejora (retrospectiva):** Guardar las preguntas y las herramientas aparte del resto del código permite cambiarlas sin reprogramar.

## I4 · Armar las pantallas y corregir  —  Hecho

- **Actividad del cronograma:** Actividad 8
- **Planeado:** 16/10 – 30/10/2026 · **Real:** 30–31/10/2026
- **Objetivo:** Construir todas las pantallas y aplicar las correcciones que pidió el investigador al probarlas.
- **Historias:** HU-05, HU-06, HU-07, HU-08, HU-09, HU-10, HU-11, HU-12, HU-13, HU-14
- **Entregables:** 9 pantallas funcionando. Cambios pedidos: porcentajes que se cargan con animación, cuestionario más corto (de 18 a 13 preguntas), filtro por celular o computador, herramientas recomendadas aunque se saque 100 % y diseño que se adapta a PC y celular.
- **Evidencia:** Cambios guardados en GitHub: 5713fa0 y 1ddd3bc
- **Revisión:** Al responder todo «sí», la plataforma no recomendaba nada: el mismo error del primer prototipo. Se corrigió y se agregó una prueba para que no vuelva a pasar.
- **Mejora (retrospectiva):** Siempre hay que probar los casos extremos: responder todo «sí» y todo «no».

## I5 · Publicar y conectar  —  En curso

- **Actividad del cronograma:** Actividad 9
- **Planeado:** 01/11 – 13/11/2026 · **Real:** 31/10 – 02/11/2026 (en curso)
- **Objetivo:** Subir el código a GitHub, publicar la plataforma en internet y conectar la base de datos.
- **Historias:** HU-15, HU-16, HU-17, HU-21, HU-22, HU-23, HU-24
- **Entregables:** Código en GitHub guardado por etapas y unido a la rama principal (pull request #1, 02/11/2026), historial de cambios, la plataforma publicada en GitHub Pages y la base de datos Supabase conectada (9 tablas, catálogo y preguntas cargados, consentimiento y recomendaciones guardados).
- **Evidencia:** https://jaiderfzuniga.github.io/cuida_tu_negocio/
- **Revisión:** La base de datos se probó con dos usuarios de prueba: cada uno ve solo su negocio, el consentimiento queda con fecha y las recomendaciones se guardan. Al probarla con su cuenta real, el investigador encontró que la plataforma se quedaba cargando y luego en blanco al hacer el diagnóstico; se corrigió (HU-24) y el investigador confirmó el 2 de noviembre que ya funciona. El mismo día la versión 2 se unió a la rama principal de GitHub (pull request #1). Falta revisar las preguntas con el asesor.
- **Mejora (retrospectiva):** Desde ahora, cada historia terminada se guarda en GitHub por separado. Además, la carpeta del computador tenía un archivo viejo que causó otro error: cada actualización debe copiar el código completo, no archivos sueltos.

## I6 · Probar y dejar lista  —  Por hacer

- **Actividad del cronograma:** Actividad 9
- **Planeado:** 14/11 – 27/11/2026 · **Real:** Nov. 2026 (planeada)
- **Objetivo:** Probar la plataforma en el celular y el computador del objetivo 2 y corregir lo necesario antes de llevarla a los microcomercios.
- **Historias:** HU-18, HU-19, HU-20
- **Entregables:** Pruebas de facilidad de uso (norma ISO/IEC 25010), enlaces oficiales corregidos, guías para hacer copias de seguridad y una versión estable para la Fase 4.
- **Evidencia:** —
- **Revisión:** —
- **Mejora (retrospectiva):** —
