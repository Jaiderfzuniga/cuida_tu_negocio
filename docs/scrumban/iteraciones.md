# Iteraciones

Registro de cada iteración: qué se planeó, qué se entregó, qué se corrigió en la revisión y qué se mejora del proceso.

> Nota de trazabilidad: las iteraciones I1 a I4 se trabajaron antes de subir el código; sus commits (31/10/2026) agrupan el trabajo por etapa. Desde I5, cada historia se sube en su propio commit.

> Desfase con el cronograma: la actividad 7 estaba planeada del 7 al 30 de septiembre y se ejecutó en octubre; la actividad 9 mantiene su fecha (1 al 27 de noviembre).

## I1 · Arquitectura y stack  —  Hecho

- **Actividad del cronograma:** Actividad 7
- **Fechas reales:** Oct. 2026
- **Objetivo:** Definir la arquitectura, el modelo de datos y las tecnologías de la plataforma.
- **Historias:** —
- **Entregables:** Documento «Arquitectura y stack tecnológico» (11 páginas): capas, 9 tablas, reglas de acceso y trazabilidad RF → componente.
- **Evidencia:** Arquitectura_Stack_Escudo_Digital.docx
- **Revisión:** Se revisó el prototipo anterior: todo el código en un solo archivo, sin base de datos y con 7 preguntas; se decidió construir un proyecto nuevo.
- **Mejora (retrospectiva):** Definir primero la arquitectura evitó repetir los problemas del prototipo v1.

## I2 · Diseño de interfaz (mockups)  —  Hecho

- **Actividad del cronograma:** Actividad 7
- **Fechas reales:** 30/10/2026
- **Objetivo:** Diseñar las pantallas antes de programar y aprobar el estilo visual.
- **Historias:** —
- **Entregables:** 11 mockups (10 de celular y 1 de computador) en un lienzo de diseño, con estilo «Neón & Holográfico 3D».
- **Evidencia:** Lienzo de mockups «Escudo Digital — propuesta visual»
- **Revisión:** El primer estilo fue rechazado por el investigador; se rehízo con la referencia «Neón & Holográfico 3D». Se agregaron la ruta al 100 %, los logos y las ilustraciones 3D.
- **Mejora (retrospectiva):** Revisar mockups antes de programar permitió corregir el diseño sin rehacer código.

## I3 · Base del proyecto, datos y lógica  —  Hecho

- **Actividad del cronograma:** Actividad 8
- **Fechas reales:** 30/10/2026
- **Objetivo:** Crear el proyecto, cargar el catálogo y el cuestionario, y programar el cálculo y el motor de reglas.
- **Historias:** HU-01, HU-02, HU-03, HU-04
- **Entregables:** Proyecto React + TypeScript; catálogo de 33 herramientas; motor de reglas sin IA; esquema de base de datos con RLS; pruebas automáticas.
- **Evidencia:** Commits 8f4d84c, f428e4b, ede64af, 4c5e831
- **Revisión:** Las pruebas automáticas del cálculo y del motor pasaron (3 de 3).
- **Mejora (retrospectiva):** Mantener el cuestionario y el catálogo como datos separados del código facilita cambiarlos sin reprogramar.

## I4 · Pantallas y ajustes de la revisión  —  Hecho

- **Actividad del cronograma:** Actividad 8
- **Fechas reales:** 30–31/10/2026
- **Objetivo:** Construir el flujo completo de pantallas y aplicar las correcciones del investigador.
- **Historias:** HU-05, HU-06, HU-07, HU-08, HU-09, HU-10, HU-11, HU-12, HU-13, HU-14
- **Entregables:** 9 pantallas; anillos animados; cuestionario reducido de 18 a 13 preguntas como máximo; filtro por equipo; herramientas de refuerzo con 100 %; diseño para PC y celular.
- **Evidencia:** Commits 5713fa0, 1ddd3bc
- **Revisión:** El investigador detectó que con 100 % no se recomendaba nada (el mismo error del prototipo v1); se corrigió y se agregó una prueba para que no vuelva a ocurrir.
- **Mejora (retrospectiva):** Probar casos extremos (todo «sí», todo «no») debe ser parte de la definición de hecho.

## I5 · Publicación e integración  —  En curso

- **Actividad del cronograma:** Actividad 9
- **Fechas reales:** 31/10/2026 – en curso
- **Objetivo:** Subir el código a GitHub, publicar la plataforma y conectar la base de datos.
- **Historias:** HU-15, HU-16, HU-17
- **Entregables:** Rama version-2 en GitHub con commits por etapa; CHANGELOG; publicación en GitHub Pages.
- **Evidencia:** Commits 884a9c1, d36e85a, 834fa3f; https://jaiderfzuniga.github.io/cuida_tu_negocio/
- **Revisión:** Pendiente: unir version-2 con main, conectar Supabase y validar el cuestionario con el asesor.
- **Mejora (retrospectiva):** Desde esta iteración, cada historia de usuario se sube en su propio commit.

## I6 · Pruebas internas y ajustes finales  —  Por hacer

- **Actividad del cronograma:** Actividad 9
- **Fechas reales:** Nov. 2026 (planeada)
- **Objetivo:** Probar la plataforma en los equipos del objetivo 2 y corregir antes de aplicarla a los microcomercios.
- **Historias:** HU-18, HU-19, HU-20
- **Entregables:** Pruebas de usabilidad internas (ISO/IEC 25010), enlaces oficiales corregidos, guías de Recuperar y versión estable para la Fase 4.
- **Evidencia:** —
- **Revisión:** —
- **Mejora (retrospectiva):** —
