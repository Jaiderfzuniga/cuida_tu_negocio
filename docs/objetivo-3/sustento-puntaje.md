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

## Qué ya está comprobado y qué falta

- ✅ El cálculo da lo que dice la fórmula (3 pruebas automáticas).
- ✅ Funciona con datos reales (prueba con dos cuentas el 02/11/2026: 43 % → 88 %).
- ⏳ **Juicio de expertos:** el asesor y un segundo experto califican pertinencia, claridad y puntos de cada pregunta (1 a 4); se acepta con 3 o 4.
- ⏳ **Prueba piloto:** aplicar la plataforma y la lista de chequeo en 2–3 negocios fuera de la muestra y comparar si coinciden en la función más débil.
- 💡 Propuesta: enlace «¿Cómo se calculó?» en la pantalla de resultados.
