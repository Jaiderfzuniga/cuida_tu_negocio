# Sustento del puntaje del cuestionario

Respuesta a la pregunta del asesor en la asesoría del **6 de noviembre de 2026**: ¿de dónde sale la puntuación, por qué esos puntos y cómo se ha comprobado, para que el resultado no parezca inventado?
El documento completo para el asesor es `Sustento_Puntaje_Escudo_Digital.docx`.

## Respuesta corta

El puntaje **no es inventado, pero todavía no está validado**.
- Cada pregunta sale de una necesidad del diagnóstico de los 12 microcomercios (H1–H12) y de una subcategoría del NIST CSF 2.0.
- El cálculo es el mismo que se usó en el objetivo 1: porcentaje de prácticas favorables por función.
- Lo que es una **propuesta del investigador** y falta validar: el valor de cada respuesta (2, 1 o 0) y que todas las preguntas pesen lo mismo.

## Qué papel cumple

- **Puntaje de la plataforma:** autodiagnóstico orientativo para el propietario; ordena las recomendaciones.
- **Variables de la investigación** (utilidad percibida y capacidad de implementar): se miden con la encuesta pre-test/post-test y la lista de chequeo, no con este puntaje.

## Cómo se calcula (`src/lib/puntaje.ts`)

1. Cada respuesta: práctica completa = 2, parcial = 1, no la tiene o no sabe = 0.
2. Se suman los puntos de cada función (solo las preguntas que aplican al negocio).
3. Nivel por función = puntos obtenidos ÷ puntos posibles × 100.
4. Nivel general = promedio de los tres niveles (cada función pesa lo mismo).

Ejemplo: Identificar 3/8 = 38 %, Proteger 5/8 = 63 %, Recuperar 1/6 = 17 % → general (38 + 63 + 17) ÷ 3 = **39 %**.

## Por qué así

| Decisión | Justificación |
|---|---|
| Escala 2-1-0 | Mismo criterio «favorable / no favorable» del objetivo 1, con un nivel intermedio porque muchas prácticas estaban a medias (6 de 12 respaldaban sin frecuencia). Versión simplificada de los niveles (Tiers) del NIST CSF. |
| «No sé» = 0 | Si no sabe si la protección está activa, no puede asegurarla; el diagnóstico mostró que el autorreporte sobrestima (H5). |
| Mismo peso por pregunta | El NIST CSF no asigna pesos numéricos; no hay evidencia para ponderar. La prioridad se da al ordenar las recomendaciones. |
| Promedio de funciones | Proteger tiene más preguntas; así cada función cuenta igual, como en los resultados del objetivo 1. |

## Por qué cada opción vale lo que vale

El NIST **no publica una tabla de puntos**: el CSF describe resultados y deja que cada organización los mida (para eso está la guía NIST SP 800-55 Vol. 1). El valor de cada opción se apoya en dos bases verificables:

1. **Escala de niveles del MSPI de MinTIC.** Su instrumento de evaluación califica cada control como inexistente (0), inicial (20), repetible (40), efectivo (60), gestionado (80) u optimizado (100) y da un porcentaje 0–100 por función del NIST CSF (ejemplo publicado: evaluación de ICULTUR 2024). La plataforma lo simplifica a tres niveles: 0 = inexistente, 1 = inicial o repetible (a medias, depende de acordarse), 2 = efectivo.
2. **Una fuente oficial que ordena las opciones** de cada pregunta.

| Tipo | Preguntas | 2 | 1 | 0 | Base |
|---|---|---|---|---|---|
| Sí o no | ID2, ID3, ID5, PR2 | Activada | — | No / no sé | Subcategoría NIST de la pregunta |
| Cobertura | PR3, PR6, RC2, RC3 | Todas | Algunas | Ninguna / no sé | El resultado NIST se cumple a medias si cubre solo una parte |
| Frecuencia | ID4, RC1 | Siempre / automática | A veces / a mano | Nunca | PR.DS-11: copias creadas y mantenidas; MSPI: «inicial» si depende de acordarse |
| Cantidad de medidas | PR4 | Las dos | Una | Ninguna | Número de medidas de Nequi activas |
| Comprobado o creído | RC5 | Ya lo hizo | Cree que sí | No | PR.DS-11: las copias se prueban |
| Fuente oficial | PR1 | App de contraseñas | Las recuerda y son distintas | Misma en todas | NIST SP 800-63B-4 §3.1.1 y CISA *Use Strong Passwords* |

**Inconsistencia por decidir con el asesor (no aplicada en la plataforma):** «Anotadas en papel o cuaderno» vale hoy 0, igual que usar la misma contraseña en todas. El NIST define la contraseña como un secreto que se memoriza **o se registra**, así que anotarla no es incorrecto en sí; el riesgo es dejarla a la vista (H5). Propuesta: subirla a 1 punto y aclarar en la ayuda que el cuaderno se guarde fuera de la vista.

## Qué ya está comprobado y qué falta

- ✅ El cálculo da lo que dice la fórmula (3 pruebas automáticas).
- ✅ Cada opción se apoya en una fuente oficial (revisión documental, 07/11/2026).
- ✅ Funciona con datos reales (prueba con dos cuentas el 02/11/2026: 43 % → 88 %).
- ⏳ **Juicio de expertos:** el asesor y un segundo experto califican pertinencia, claridad y puntos de cada pregunta (1 a 4); se acepta con 3 o 4.
- ⏳ **Prueba piloto:** aplicar la plataforma y la lista de chequeo en 2–3 negocios fuera de la muestra y comparar si coinciden en la función más débil.
- 💡 Propuesta: enlace «¿Cómo se calculó?» en la pantalla de resultados.
