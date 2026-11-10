# Rúbrica de puntuación del cuestionario

Propuesta del investigador (07/11/2026) para responder la pregunta del asesor del 06/11: qué significa cada puntaje y por qué cada opción vale lo que vale. El documento para el asesor es `Rubrica_Puntaje_Escudo_Digital.docx`. El cálculo está en el [sustento del puntaje](sustento-puntaje.md).

## Por qué una rúbrica propia

El NIST CSF 2.0 no tiene una puntuación oficial: organiza resultados en funciones, categorías y subcategorías, y deja que cada organización decida cómo medirlos [1]. Por eso cualquier escala numérica es propia de quien la usa, y debe definirse y explicarse antes de evaluar [2]. Esta rúbrica es la escala propia de la plataforma. Se comprobará con una prueba piloto en 2 o 3 microcomercios que no forman parte de la muestra, antes de la Fase 4.

## Niveles

| Puntos | Nivel | Qué significa |
|---|---|---|
| 2 | Protección aceptable | El microcomercio tiene la protección esperada para su tamaño y recursos. |
| 1 | Vulnerabilidad moderada | Hay un esfuerzo por protegerse, pero se hace a medias o a mano y deja puertas abiertas. |
| 0 | Vulnerabilidad alta | La práctica no existe o se hace de una forma que el diagnóstico mostró como riesgosa. |

Reglas:
- **«No» y «No sé» valen 0.** «No»: la práctica no existe. «No sé»: si no sabe si una protección está activa, no puede confirmar que esté protegido; el diagnóstico mostró que el autorreporte sobrestima la protección (H5) [3].
- **Lo que no aplica no cuenta** (RF-17): no se cuenta como fallo ni como acierto [2].
- **Todas las preguntas pesan lo mismo:** la prioridad se muestra aparte, en el orden de las recomendaciones [2].

## Rúbrica por pregunta

| Pregunta | Opción | Puntos | Nivel | Por qué | Base (NIST CSF 2.0 · hallazgo) |
|---|---|---|---|---|---|
| **ID2.** ¿Has revisado si tu correo o tus contraseñas aparecen en una filtración? | Sí, lo he revisado | 2 | Aceptable | Revisa si sus credenciales están expuestas. | ID.RA-01 · H5 |
| | No | 0 | Alta | No sabe si sus accesos ya están en manos de otros. | |
| | No sé | 0 | Alta | No puede confirmar que sus claves no se filtraron. | |
| **ID3.** ¿Sabes en qué equipos está abierta tu cuenta de WhatsApp o de correo? | Sí, lo reviso | 2 | Aceptable | Controla quién tiene acceso a sus cuentas. | ID.AM-01, ID.AM-02 · H2 |
| | No | 0 | Alta | Un tercero podría tener acceso sin que lo note. | |
| | No sé | 0 | Alta | No puede confirmar quién tiene acceso. | |
| **ID4.** Cuando te llega un enlace o archivo raro, ¿lo revisas antes de abrirlo? | Siempre | 2 | Aceptable | Previene el engaño por enlaces falsos (phishing). | ID.RA-03 · H1 |
| | A veces | 1 | Moderada | Un solo descuido puede infectar el equipo o robar datos. | |
| | Nunca / no sabía que se podía | 0 | Alta | Queda expuesto a fraude por enlaces falsos. | |
| **ID5.** Si pierdes el celular del negocio, ¿podrías ubicarlo o bloquearlo? | Sí, está activado | 2 | Aceptable | Puede proteger la información si roban o pierde el celular. | ID.AM-01 · H2, H12 |
| | No | 0 | Alta | Quien tenga el celular puede entrar a la información. | |
| | No sé | 0 | Alta | No puede confirmar que podría bloquearlo. | |
| **PR1.** ¿Dónde guardas las contraseñas de tus cuentas? | En una app de contraseñas | 2 | Aceptable | Guardadas de forma cifrada y distintas en cada cuenta. | PR.AA-01 · H5 (contraseñas a la vista en 5 negocios) |
| | Las recuerdo y son distintas | 1 | Moderada | Depende de la memoria: con muchas cuentas termina repitiéndolas u olvidándolas. | |
| | Anotadas en papel o cuaderno | 0 | Alta | En un local, otros pueden ver el papel. Se observó en 5 negocios. | |
| | Uso la misma en todas | 0 | Alta | Si roban una cuenta, pueden entrar a todas. | |
| **PR2.** ¿Tu WhatsApp tiene verificación en dos pasos? *(si usa WhatsApp)* | Sí | 2 | Aceptable | Evita que se lleven su WhatsApp a otro celular. | PR.AA-03 · H6, H7 |
| | No | 0 | Alta | Le pueden robar la cuenta para estafar a sus clientes. | |
| | No sé | 0 | Alta | No puede confirmar que la cuenta está protegida. | |
| **PR3.** ¿Tu correo y tus redes tienen verificación en dos pasos? *(si usa correo, Facebook o Instagram)* | Sí, en todas | 2 | Aceptable | Todas sus cuentas piden algo más que la contraseña. | PR.AA-03 · H6 |
| | Solo en algunas | 1 | Moderada | Protege unas cuentas y deja otras con el mismo riesgo. | |
| | No / no sé | 0 | Alta | Sus cuentas se protegen solo con la contraseña. | |
| **PR4.** ¿Usas la clave dinámica de Nequi y sabes dónde está el botón de pánico? *(si usa Nequi)* | Sí, las dos | 2 | Aceptable | Usa las dos protecciones contra fraude. | PR.AA-03 · H7, H10 |
| | Solo una | 1 | Moderada | La protección queda incompleta. | |
| | Ninguna | 0 | Alta | El dinero del negocio queda expuesto. | |
| **PR6.** ¿Tus equipos tienen antivirus o protección activa? | Sí, en todos | 2 | Aceptable | Todos sus equipos tienen protección. | PR.PS-05 · H10 |
| | Solo en algunos | 1 | Moderada | El equipo sin protección puede contagiar a los demás. | |
| | No / no sé | 0 | Alta | Sus equipos quedan expuestos a virus. | |
| **RC1.** ¿Haces copia de seguridad de tus chats de WhatsApp? *(si usa WhatsApp)* | Sí, automática | 2 | Aceptable | Recupera contactos y pedidos sin depender de acordarse. | PR.DS-11, RC.RP-03 · H4 |
| | A veces, a mano | 1 | Moderada | Pierde lo que pasó desde la última copia. | |
| | No | 0 | Alta | Si pierde el celular, pierde los chats con sus clientes. | |
| **RC2.** ¿Tienes copia de los contactos, fotos y archivos del celular? | Sí, automática | 2 | Aceptable | Puede pasar todo a un celular nuevo. | PR.DS-11, RC.RP-03 · H4 |
| | Solo de algunas cosas | 1 | Moderada | Recupera una parte; el resto se pierde. | |
| | No | 0 | Alta | Si pierde el celular, pierde la información. | |
| **RC3.** ¿Los archivos del computador están guardados en la nube? *(si tiene computador)* | Sí | 2 | Aceptable | Recupera sus archivos si el equipo se daña o lo bloquea un virus. | PR.DS-11, RC.RP-03 · H4 |
| | Solo algunos | 1 | Moderada | Los archivos que solo están en el equipo quedan en riesgo. | |
| | No | 0 | Alta | Si el computador falla, pierde los archivos. | |
| **RC5.** ¿Sabrías recuperar tu información si pierdes el celular o el computador? | Sí, ya lo he hecho | 2 | Aceptable | Ya comprobó que su copia funciona. | RC.RP-03 · H3 |
| | Creo que sí | 1 | Moderada | Sin práctica puede fallar cuando lo necesite. | |
| | No | 0 | Alta | No podría volver a tener su información. | |

## Referencias

[1] National Institute of Standards and Technology, «The NIST Cybersecurity Framework (CSF) 2.0», NIST CSWP 29, Gaithersburg, MD, EE. UU., feb. 2024, doi: 10.6028/NIST.CSWP.29.

[2] FortifyData Team, «What Is a NIST CSF Score?», FortifyData, dic. 2023, act. sep. 2026. [En línea]. Disponible en: https://fortifydata.com/insights/what-is-a-nist-csf-score

[3] J. F. Matta Zuñiga, «Informe de avances de Investigación II: objetivos específicos 1 y 2», Universidad CESMAG, San Juan de Pasto, oct. 2026.
