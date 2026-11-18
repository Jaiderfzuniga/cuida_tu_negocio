import type { Funcion, Plataforma } from '../types';

/**
 * Guías paso a paso (HU-19: RF-08 y RF-09; RF-10; RF-12).
 * Solo cubren Identificar, Proteger y Recuperar (respaldo básico), como exige el alcance del proyecto.
 * Los nombres de los menús salen de la ayuda oficial de cada servicio; como cambian con las versiones,
 * cada guía enlaza a su página oficial.
 */
export type Equipo = 'android' | 'iphone' | 'pc' | 'todos';

export interface Guia {
  id: string;
  funcion: Funcion;
  titulo: string;
  /** Para qué le sirve al negocio, en una frase. */
  para: string;
  equipo: Equipo;
  /** Solo se destaca si el negocio usa alguna de estas plataformas. */
  plataformas?: Plataforma[];
  secciones: { titulo: string; pasos: string[] }[];
  /** Cada cuánto hacerlo (RF-09) o qué revisar. */
  frecuencia?: string;
  fuente: { nombre: string; url: string };
  /** Otras páginas oficiales que respaldan la guía. */
  otrasFuentes?: { nombre: string; url: string }[];
  /** Herramientas del catálogo que explica esta guía. */
  herramientas: string[];
}

export const GUIAS: Guia[] = [
  // ───────── Recuperar: respaldo y restauración (RF-08 y RF-09) ─────────
  {
    id: 'copia-whatsapp-android',
    funcion: 'Recuperar',
    titulo: 'Copia de WhatsApp en Android',
    para: 'Recuperar los chats, pedidos y contactos de tus clientes si pierdes o cambias el celular.',
    equipo: 'android',
    plataformas: ['whatsapp'],
    secciones: [
      { titulo: 'Activar la copia', pasos: [
        'En WhatsApp, ve a Ajustes > Chats > Copia de seguridad.',
        'Toca «Copia de seguridad en la nube», elige WhatsApp o Google y toca «Activar copias de seguridad».',
        'Si usas Google: toca «Guardar», elige una frecuencia (por ejemplo, «Diariamente») y la cuenta de Google del negocio.',
        'Toca «Realizar copia de seguridad» para hacer la primera copia ahora.',
      ] },
      { titulo: 'Recuperar en un celular nuevo', pasos: [
        'Instala WhatsApp y verifica el mismo número de teléfono (y, si usas Google, la misma cuenta de Google).',
        'Cuando se te indique, toca «Restaurar». No toques «Omitir» si quieres tus chats antiguos.',
      ] },
    ],
    frecuencia: 'Diaria y automática. Revisa una vez al mes en Copia de seguridad la fecha de la última copia: si tiene más de 120 días, es posible que no se pueda restaurar.',
    fuente: { nombre: 'Centro de ayuda de WhatsApp: copia de seguridad', url: 'https://faq.whatsapp.com/481135090640375/?cms_platform=android&locale=es_LA' },
    otrasFuentes: [
      { nombre: 'Centro de ayuda de WhatsApp: restaurar el historial de chat', url: 'https://faq.whatsapp.com/618575946635920/?cms_platform=android&locale=es_LA' },
    ],
    herramientas: ['R-05'],
  },
  {
    id: 'copia-whatsapp-iphone',
    funcion: 'Recuperar',
    titulo: 'Copia de WhatsApp en iPhone',
    para: 'Recuperar los chats, pedidos y contactos de tus clientes si pierdes o cambias el iPhone.',
    equipo: 'iphone',
    plataformas: ['whatsapp'],
    secciones: [
      { titulo: 'Activar la copia', pasos: [
        'En WhatsApp, ve a Ajustes > Chats > Copia de seguridad.',
        'Toca «Copia de seguridad en la nube», elige WhatsApp o iCloud y toca «Activar copias de seguridad».',
        'En «Copia automática», elige la frecuencia (por ejemplo, diaria).',
        'Toca «Realizar copia ahora» para hacer la primera copia.',
      ] },
      { titulo: 'Recuperar en un iPhone nuevo', pasos: [
        'Usa el mismo número de teléfono y la misma cuenta de iCloud con los que hiciste la copia.',
        'Instala WhatsApp, verifica el número y, cuando se te indique, restaura el historial de chats.',
      ] },
    ],
    frecuencia: 'Diaria y automática. Una vez al mes, revisa que la fecha de la última copia sea reciente.',
    fuente: { nombre: 'Centro de ayuda de WhatsApp: copia de seguridad', url: 'https://faq.whatsapp.com/481135090640375/?cms_platform=iphone&locale=es_LA' },
    otrasFuentes: [
      { nombre: 'Centro de ayuda de WhatsApp: restaurar el historial de chat', url: 'https://faq.whatsapp.com/618575946635920/?cms_platform=iphone&locale=es_LA' },
    ],
    herramientas: ['R-05'],
  },
  {
    id: 'copia-android',
    funcion: 'Recuperar',
    titulo: 'Copia del celular Android con Google',
    para: 'Guardar contactos, mensajes, ajustes y aplicaciones para pasarlos a otro celular.',
    equipo: 'android',
    secciones: [
      { titulo: 'Activar la copia', pasos: [
        'Abre la app Configuración del celular.',
        'Toca «Servicios de Google» (o «Google») > «Todos los servicios» > «Copia de seguridad».',
        'Elige qué guardar (Fotos y videos, Datos del dispositivo o ambos) y activa la copia de seguridad con la cuenta de Google del negocio.',
        'Para hacer una copia ya, toca «Crear copia de seguridad».',
      ] },
      { titulo: 'Recuperar en un celular nuevo', pasos: [
        'Al configurar el celular nuevo, agrega la misma cuenta de Google.',
        'Sigue los pasos que aparecen en pantalla para restaurar la copia.',
      ] },
    ],
    frecuencia: 'Automática. La primera copia puede tardar hasta 24 horas; cuando termina, aparece «Activado» debajo de lo que elegiste. Protege el celular con PIN, patrón o contraseña.',
    fuente: { nombre: 'Ayuda de Android (Google): copia de seguridad', url: 'https://support.google.com/android/answer/2819582?hl=es-419' },
    herramientas: ['R-06', 'R-18'],
  },
  {
    id: 'copia-iphone',
    funcion: 'Recuperar',
    titulo: 'Copia del iPhone con iCloud',
    para: 'Guardar fotos, contactos, mensajes y ajustes para pasarlos a otro iPhone.',
    equipo: 'iphone',
    secciones: [
      { titulo: 'Activar la copia', pasos: [
        'Conecta el iPhone a una red wifi.',
        'Abre Configuración, toca tu nombre y luego iCloud.',
        'Toca «Respaldo en iCloud» y activa «Respaldar este dispositivo».',
        'Toca «Realizar respaldo ahora» y deja el iPhone conectado al wifi hasta que termine.',
      ] },
      { titulo: 'Recuperar en un iPhone nuevo', pasos: [
        'Al encender el iPhone nuevo, conéctalo a una red wifi.',
        'Elige restaurar desde un respaldo de iCloud e inicia sesión con el mismo Apple ID.',
        'Elige el respaldo más reciente y espera a que termine.',
      ] },
    ],
    frecuencia: 'Automática: con «Respaldar este dispositivo» activado, el iPhone se respalda solo cuando está cargando, conectado a wifi y con la pantalla bloqueada. Si iCloud avisa que no hay espacio, sigue los pasos en pantalla.',
    fuente: { nombre: 'Soporte de Apple: respaldar el iPhone con iCloud', url: 'https://support.apple.com/es-co/108366' },
    herramientas: ['R-07'],
  },
  {
    id: 'copia-computador',
    funcion: 'Recuperar',
    titulo: 'Archivos del computador en la nube con OneDrive',
    para: 'Que facturas, inventarios y documentos no se pierdan si el computador se daña o lo bloquea un virus.',
    equipo: 'pc',
    secciones: [
      { titulo: 'Activar la copia', pasos: [
        'Toca el ícono de nube de OneDrive junto al reloj de Windows e inicia sesión con tu cuenta de Microsoft.',
        'Entra a Configuración y ayuda > Configuración > Sincronización y copia de seguridad.',
        'Toca «Administrar copia de seguridad» y activa Escritorio, Documentos e Imágenes.',
        'Toca «Guardar cambios». Desde ahora, lo que guardes en esas carpetas se copia solo.',
      ] },
      { titulo: 'Recuperar en otro computador', pasos: [
        'Instala o abre OneDrive en el otro computador e inicia sesión con la misma cuenta.',
        'Tus archivos aparecen en las mismas carpetas del Explorador de archivos.',
        'También puedes verlos desde onedrive.com o desde la app de OneDrive en el celular.',
      ] },
    ],
    frecuencia: 'Continua: cada archivo se copia al guardarlo. Guarda siempre los archivos del negocio en Escritorio o Documentos.',
    fuente: { nombre: 'Soporte de Microsoft', url: 'https://support.microsoft.com/es-ES/onedrive/back-up-your-folders-with-onedrive' },
    herramientas: ['R-04', 'R-03'],
  },

  // ───────── Proteger: verificación en dos pasos (RF-10) ─────────
  {
    id: 'dos-pasos-whatsapp',
    funcion: 'Proteger',
    titulo: 'Verificación en dos pasos de WhatsApp',
    para: 'Que nadie se pueda llevar tu WhatsApp a otro celular aunque consiga el código que llega por mensaje.',
    equipo: 'todos',
    plataformas: ['whatsapp'],
    secciones: [
      { titulo: 'Activarla', pasos: [
        'En WhatsApp, entra a Ajustes > Cuenta > Verificación en dos pasos.',
        'Activa «Activar verificación en dos pasos».',
        'Crea una contraseña segura y confírmala.',
        'Agrega un correo electrónico al que tengas acceso: sirve si olvidas la contraseña.',
      ] },
    ],
    frecuencia: 'Se activa una vez. WhatsApp está cambiando el PIN de 6 dígitos por una contraseña: si ya tienes PIN, puedes cambiarlo desde el mismo menú. Nunca compartas tu contraseña ni el código que llega por mensaje.',
    fuente: { nombre: 'Centro de ayuda de WhatsApp: verificación en dos pasos', url: 'https://faq.whatsapp.com/1920866721452534/?cms_platform=android&locale=es_LA' },
    herramientas: ['P-09'],
  },
  {
    id: 'dos-pasos-google',
    funcion: 'Proteger',
    titulo: 'Verificación en 2 pasos de Google (Gmail)',
    para: 'Proteger el correo del negocio, que también sirve para recuperar las demás cuentas.',
    equipo: 'todos',
    plataformas: ['correo'],
    secciones: [
      { titulo: 'Activarla', pasos: [
        'Abre tu Cuenta de Google (myaccount.google.com) con la cuenta del negocio.',
        'Toca «Seguridad y acceso».',
        'En «Cómo acceder a Google», elige «Activar la Verificación en 2 pasos».',
        'Sigue los pasos que aparecen en pantalla.',
      ] },
    ],
    frecuencia: 'Se activa una vez. Si agregas un número de teléfono nuevo, Google puede tardar hasta 7 días en confiar en él.',
    fuente: { nombre: 'Ayuda de la Cuenta de Google', url: 'https://support.google.com/accounts/answer/185839?hl=es-419' },
    herramientas: ['P-16', 'P-06'],
  },
  {
    id: 'dos-pasos-meta',
    funcion: 'Proteger',
    titulo: 'Autenticación en dos pasos de Facebook e Instagram',
    para: 'Evitar que roben la página del negocio para estafar a tus clientes.',
    equipo: 'todos',
    plataformas: ['facebook', 'instagram'],
    secciones: [
      { titulo: 'Activarla', pasos: [
        'En Facebook: toca tu foto del perfil > Configuración y privacidad > Configuración > Centro de cuentas. En Instagram: Configuración > Centro de cuentas.',
        'Toca «Contraseña y seguridad» > «Autenticación en dos pasos» y elige la cuenta.',
        'Elige el método: una app de autenticación (como Google Authenticator) o mensajes de texto (SMS). En Instagram también puedes usar WhatsApp después de activar los mensajes de texto.',
        'Guarda los códigos de recuperación en un lugar seguro, fuera de la vista.',
      ] },
    ],
    frecuencia: 'Se activa una vez por cuenta. Si tienes Facebook e Instagram, actívala en las dos.',
    fuente: { nombre: 'Servicio de ayuda de Facebook: autenticación en dos pasos', url: 'https://www.facebook.com/help/148233965247823?locale=es_LA' },
    otrasFuentes: [
      { nombre: 'Servicio de ayuda de Instagram: autenticación en dos pasos', url: 'https://help.instagram.com/566810106808145?locale=es_LA' },
    ],
    herramientas: ['P-17', 'P-36', 'P-06'],
  },
  {
    id: 'nequi',
    funcion: 'Proteger',
    titulo: 'Clave dinámica y bloqueo de Nequi',
    para: 'Confirmar tus movimientos con un código que solo ves tú y proteger tu Nequi si te roban o pierdes el celular.',
    equipo: 'todos',
    plataformas: ['nequi'],
    secciones: [
      { titulo: 'Usar la clave dinámica', pasos: [
        'La clave dinámica es un código de 6 dígitos que cambia cada 45 segundos. La ves en el inicio de la app Nequi, incluso sin internet.',
        'Sirve para pagos por PSE y algunas validaciones de seguridad, como entrar al sitio web de Nequi.',
        'Úsala solo dentro de la app o en sitios oficiales de Nequi; nunca se la dictes a nadie.',
      ] },
      { titulo: 'Si te roban o pierdes el celular', pasos: [
        'Actúa lo antes posible. Llama a tu operador para bloquear la línea y reportar el celular.',
        'En otro celular, descarga la app Nequi e ingresa con tu número y tu clave.',
        'Sigue los pasos para enlazar tu Nequi a ese celular: así se cierra la sesión del celular perdido.',
        'Después, cambia tu clave de Nequi.',
        'Si no puedes ingresar desde otro celular, llama a Nequi al (+57) 300 600 01 00, opción 3, para pedir el bloqueo.',
      ] },
    ],
    frecuencia: 'Aprende hoy tu clave de Nequi de memoria: si te roban el celular, la vas a necesitar para entrar desde otro.',
    fuente: { nombre: 'Centro de ayuda de Nequi: clave dinámica', url: 'https://ayuda.nequi.com.co/hc/es/articles/34010128839949--Qu%C3%A9-es-la-clave-din%C3%A1mica-de-Nequi-y-para-qu%C3%A9-sirve' },
    otrasFuentes: [
      { nombre: 'Centro de ayuda de Nequi: bloquear si pierdes o roban tu celular', url: 'https://ayuda.nequi.com.co/hc/es/articles/35177946188941--C%C3%B3mo-bloquear-Nequi-si-pierdo-o-roban-mi-celular' },
    ],
    herramientas: ['P-18'],
  },
  {
    id: 'daviplata',
    funcion: 'Proteger',
    titulo: 'Proteger tu DaviPlata',
    para: 'Cuidar tu clave, reconocer los mensajes reales y reportar a tiempo si algo raro pasa o pierdes el celular.',
    equipo: 'todos',
    plataformas: ['daviplata'],
    secciones: [
      { titulo: 'Reconocer los mensajes reales', pasos: [
        'DaviPlata solo te escribe por mensaje de texto desde los códigos 85888, 87718 y 89899. No respondas mensajes de otros números.',
        'Sus correos solo llegan desde el dominio @davivienda.com.',
        'DaviPlata nunca te llamará para devolverte el IVA o el 4 x 1.000, ni te pedirá claves o códigos por teléfono: si pasa, es un fraude.',
        'Si te piden enviar plata para reclamar un premio, desconfía.',
      ] },
      { titulo: 'Cuidar tu clave', pasos: [
        'Cambia tu clave con frecuencia y no se la digas a nadie: DaviPlata nunca te la pedirá por ningún medio.',
        'No uses fechas importantes ni números seguidos.',
      ] },
      { titulo: 'Si algo te parece raro o pierdes el celular', pasos: [
        'Bloquea la línea con tu operador.',
        'Reporta lo que pasó con el botón «¿Necesitas ayuda?» de la app DaviPlata (puedes entrar desde otro celular).',
      ] },
    ],
    frecuencia: 'DaviPlata no tiene línea telefónica ni clave dinámica como Nequi: todo se reporta desde el botón «¿Necesitas ayuda?» de la app.',
    fuente: { nombre: 'DaviPlata: consejos de seguridad informática', url: 'https://www.daviplata.com/consejos-de-seguridad-informatica' },
    herramientas: ['P-37'],
  },
  {
    id: 'bancolombia',
    funcion: 'Proteger',
    titulo: 'Clave Dinámica de Bancolombia',
    para: 'Confirmar tus pagos con un código que solo ves tú y bloquearlo si pierdes el celular.',
    equipo: 'todos',
    plataformas: ['bancolombia'],
    secciones: [
      { titulo: 'Inscribir la Clave Dinámica', pasos: [
        'Necesitas estar inscrito en Alertas y Notificaciones de Bancolombia.',
        'Abre la app Mi Bancolombia y ve a «Inscribir Clave Dinámica» (o al menú Ajustes > Claves Dinámicas).',
        'Si no has ingresado, entra con tu usuario y contraseña, huella o reconocimiento facial.',
        'Sigue los pasos que aparecen en pantalla.',
      ] },
      { titulo: 'Si pierdes el celular donde está inscrita', pasos: [
        'Bloquéala de inmediato: desde otro celular, entra a la app con tu usuario y clave y bloquea la Clave Dinámica. También puedes pedirlo en la Sucursal Telefónica o en una oficina.',
        'Cambia tus datos de seguridad para que la Clave Dinámica te llegue por otro medio.',
        'Cambia también tu Clave Principal.',
      ] },
    ],
    frecuencia: 'Se inscribe una vez. Nunca compartas tus claves ni la Clave Dinámica con nadie.',
    fuente: { nombre: 'Bancolombia: inscribir la Clave Dinámica en la app', url: 'https://www.bancolombia.com/centro-de-ayuda/preguntas-frecuentes/inscribir-clave-dinamica-app-personas' },
    otrasFuentes: [
      { nombre: 'Bancolombia: qué hacer si pierdes el celular con la Clave Dinámica', url: 'https://www.bancolombia.com/centro-de-ayuda/preguntas-frecuentes/que-hacer-en-caso-de-perdida-o-robo-celular' },
    ],
    herramientas: ['P-38'],
  },
  {
    id: 'dos-pasos-tiktok',
    funcion: 'Proteger',
    titulo: 'Verificación de seguridad y en dos pasos de TikTok',
    para: 'Evitar que roben la cuenta de TikTok con la que promocionas tus productos.',
    equipo: 'todos',
    plataformas: ['tiktok'],
    secciones: [
      { titulo: 'Revisar la verificación de seguridad', pasos: [
        'En la app de TikTok, toca «Perfil» abajo y luego el botón Menú ☰ arriba.',
        'Entra a «Ajustes y privacidad» > «Seguridad y permisos» > «Verificación de seguridad».',
        'Completa las tareas que aparecen: vincular tu teléfono y tu correo, revisar los dispositivos de confianza y la actividad de la cuenta. Cada tarea lista queda con una marca verde.',
      ] },
      { titulo: 'Activar la verificación en dos pasos', pasos: [
        'En «Seguridad y permisos», toca «Verificación en dos pasos».',
        'Elige al menos dos métodos: teléfono, correo electrónico, app de autenticación o contraseña.',
        'Toca «Activar» y escribe el código que te llegue por SMS o correo.',
      ] },
    ],
    frecuencia: 'Se activa una vez. Cuando TikTok te avise de un dispositivo desconocido, revísalo en «Verificación de seguridad».',
    fuente: { nombre: 'Soporte de TikTok: seguridad de la cuenta', url: 'https://www.tiktok.com/support/faq_detail?category=web_privacy_user_safety&id=7543604780950624824' },
    otrasFuentes: [
      { nombre: 'Soporte de TikTok: cómo configurar la verificación en dos pasos', url: 'https://support.tiktok.com/es/account-and-privacy/personalized-ads-and-data/how-your-phone-number-is-used-on-tiktok' },
    ],
    herramientas: ['P-35'],
  },

  // ───────── Identificar: reconocer fraudes (RF-12) ─────────
  {
    id: 'reconocer-fraudes',
    funcion: 'Identificar',
    titulo: 'Cómo reconocer un mensaje o enlace falso',
    para: 'Detectar a tiempo los engaños por WhatsApp, correo o redes que buscan tus claves o tu dinero.',
    equipo: 'todos',
    secciones: [
      { titulo: 'Señales de alerta', pasos: [
        'Te apuran: «tu cuenta se bloqueará hoy», «último aviso», «ganaste un premio».',
        'Te piden un código, una clave o la clave dinámica. Ninguna empresa seria te la pide.',
        'El enlace no es el sitio oficial: tiene letras de más, números raros o termina distinto.',
        'Llega de un número o correo desconocido, o de un conocido que escribe distinto a como lo hace siempre.',
        'Te piden pagar o transferir a una cuenta nueva o a nombre de otra persona.',
      ] },
      { titulo: 'Antes de abrir o pagar', pasos: [
        'No toques el enlace: escribe tú mismo la dirección oficial o entra desde la app.',
        'Si dudas de un enlace, pégalo en Google Estado del sitio o en VirusTotal (están en el catálogo).',
        'Si es un conocido o un proveedor, confírmalo con una llamada al número que ya tienes guardado.',
        'Revisa en Have I Been Pwned si tu correo apareció en una filtración y, si es así, cambia esa contraseña.',
      ] },
    ],
    frecuencia: 'Cada vez que llegue un mensaje con prisa, premio o pedido de dinero.',
    fuente: { nombre: 'Google: Estado del sitio (Navegación segura)', url: 'https://transparencyreport.google.com/safe-browsing/search' },
    herramientas: ['I-16', 'I-15', 'I-04'],
  },
];

/** Guía que explica una herramienta del catálogo (para enlazarla desde la ruta). */
export function guiaDe(herramientaId: string, celular?: 'android' | 'iphone'): Guia | undefined {
  const g = GUIAS.filter((x) => x.herramientas.includes(herramientaId));
  return g.find((x) => x.equipo === celular) ?? g[0];
}

/** Guía paso a paso escrita para esa herramienta (no una guía que solo la menciona). La usa el botón del catálogo. */
const GUIA_PROPIA: Record<string, string> = {
  'R-05': 'copia-whatsapp-android', 'R-06': 'copia-android', 'R-07': 'copia-iphone', 'R-04': 'copia-computador',
  'P-09': 'dos-pasos-whatsapp', 'P-16': 'dos-pasos-google', 'P-17': 'dos-pasos-meta', 'P-18': 'nequi',
  'P-35': 'dos-pasos-tiktok', 'P-36': 'dos-pasos-meta', 'P-37': 'daviplata', 'P-38': 'bancolombia',
};
export function guiaPropiaDe(herramientaId: string, celular?: 'android' | 'iphone'): Guia | undefined {
  if (herramientaId === 'R-05') return guiaDe(herramientaId, celular);
  return GUIAS.find((g) => g.id === GUIA_PROPIA[herramientaId]);
}
