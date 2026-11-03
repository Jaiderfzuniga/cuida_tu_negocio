# Cómo se aplica el marco NIST CSF

El proyecto usa dos metodologías: **Scrumban** organiza el trabajo (cómo y cuándo se construye) y **NIST CSF 2.0** organiza el contenido (qué se evalúa y se recomienda).
Solo se usan tres funciones: **Identificar**, **Proteger** y **Recuperar** (esta última, limitada a copias de seguridad). Gobernar, Detectar y Responder quedan fuera del alcance.

| Función | Preguntas del cuestionario | Herramientas del catálogo | Dónde se ve |
|---|---|---|---|
| Identificar | 4: filtración de claves, sesiones abiertas, enlaces raros, ubicar el celular | 10 (ID.AM-01, ID.AM-02, ID.RA-01, ID.RA-03) | Verde · franja de arriba del escudo · primer anillo |
| Proteger | 5: contraseñas, PIN de WhatsApp, verificación en dos pasos, Nequi, antivirus | 17 (PR.AA, PR.AT, PR.DS, PR.PS) | Azul · franja del medio · segundo anillo |
| Recuperar | 4: copia de WhatsApp, copia del celular, archivos en la nube, saber recuperar | 6 (PR.DS-11, RC.RP-03) | Naranja · franja de abajo · tercer anillo |

**En el código:**
- `src/data/preguntas.ts`: cada pregunta tiene su campo `funcion`.
- `src/data/catalogo.json`: cada herramienta tiene `funcion` y `subcategoria` NIST.
- `src/lib/puntaje.ts`: porcentaje por función; nivel general = promedio de las tres.
- `src/lib/motor.ts`: la ruta al 100 % empieza por la función con el puntaje más bajo.

**En Scrumban:** una tarea solo se da por terminada si no se sale de las tres funciones (ver [scrumban/README.md](scrumban/README.md)).
