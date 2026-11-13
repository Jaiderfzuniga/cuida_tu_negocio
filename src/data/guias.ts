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
        'Abre WhatsApp y entra a Ajustes > Chats > Copia de seguridad.',
        'Elige la cuenta de Google donde se guardará la copia.',
        'En la frecuencia de la copia, elige «Diariamente».',
        'Toca «Guardar» para hacer la primera copia ahora.',
      ] },
      { titulo: 'Recuperar en un celular nuevo', pasos: [
        'Inicia sesión en el celular nuevo con la misma cuenta de Google.',
        'Instala WhatsApp y verifica el mismo número de teléfono.',
        'Cuando WhatsApp lo ofrezca, toca «Restaurar» y espera a que termine.',
      ] },
    ],
    frecuencia: 'Diaria y automática. Una vez al mes, entra a Copia de seguridad y revisa que la fecha de la última copia sea reciente.',
    fuente: { nombre: 'Centro de ayuda de WhatsApp', url: 'https://faq.whatsapp.com/481135090640375/?cms_platform=android&locale=es_LA' },
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
        'Revisa que iCloud esté activo en tu iPhone (Ajustes > tu nombre > iCloud).',
        'Abre WhatsApp y entra a Configuración > Chats > Copia de seguridad.',
        'En «Copia automática», elige «Diaria».',
        'Toca «Realizar copia ahora» para hacer la primera copia.',
      ] },
      { titulo: 'Recuperar en un iPhone nuevo', pasos: [
        'Inicia sesión en el iPhone nuevo con el mismo Apple ID.',
        'Instala WhatsApp y verifica el mismo número de teléfono.',
        'Toca «Restaurar historial de chats» y espera a que termine.',
      ] },
    ],
    frecuencia: 'Diaria y automática. Una vez al mes, revisa que la fecha de la última copia sea reciente.',
    fuente: { nombre: 'Centro de ayuda de WhatsApp', url: 'https://faq.whatsapp.com/481135090640375/?cms_platform=iphone&locale=es_LA' },
    herramientas: ['R-05'],
  },
  {
    id: 'copia-android',
    funcion: 'Recuperar',
    titulo: 'Copia del celular Android con Google One',
    para: 'Guardar contactos, mensajes, ajustes y aplicaciones para pasarlos a otro celular.',
    equipo: 'android',
    secciones: [
      { titulo: 'Activar la copia', pasos: [
        'Abre Ajustes y busca «Copia de seguridad». Según la marca está en Ajustes > Google o en Ajustes > Sistema.',
        'Activa «Copia de seguridad de Google One» con la cuenta de Google del negocio.',
        'Toca «Crear copia ahora» para hacer la primera copia.',
        'Las fotos y videos se guardan con Google Fotos; actívalo también si los necesitas.',
      ] },
      { titulo: 'Recuperar en un celular nuevo', pasos: [
        'Al encender el celular nuevo, conéctalo a una red wifi.',
        'Cuando aparezca «Copiar aplicaciones y datos», elige restaurar desde la nube.',
        'Ingresa la misma cuenta de Google, elige la copia del celular anterior y toca «Restaurar».',
      ] },
    ],
    frecuencia: 'Automática: el celular hace la copia solo cuando está conectado a wifi y cargando. Revisa la fecha de la última copia una vez al mes.',
    fuente: { nombre: 'Soporte de ASUS: copia de seguridad con Google One', url: 'https://www.asus.com/co/support/faq/1036182/' },
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
        'Abre Ajustes y toca tu nombre.',
        'Toca iCloud > Copia en iCloud y activa «Copia en iCloud».',
        'Toca «Realizar copia de seguridad ahora» para hacer la primera copia.',
      ] },
      { titulo: 'Recuperar en un iPhone nuevo', pasos: [
        'Al encender el iPhone nuevo, conéctalo a una red wifi.',
        'Elige restaurar desde una copia de iCloud e inicia sesión con el mismo Apple ID.',
        'Elige la copia más reciente y espera a que termine.',
      ] },
    ],
    frecuencia: 'Automática: iCloud hace una copia al día cuando el iPhone está conectado a wifi, cargando y bloqueado. Si pasan 180 días sin copia, Apple puede borrar las anteriores.',
    fuente: { nombre: 'Ayuda de iCloud (Apple)', url: 'https://help.apple.com/icloud/es.lproj/mmab848634c8.html' },
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
        'Abre WhatsApp y entra a Ajustes (o Configuración) > Cuenta > Verificación en dos pasos.',
        'Toca «Activar» y crea un PIN de 6 números que no sea tu fecha de nacimiento.',
        'Agrega un correo electrónico: sirve para cambiar el PIN si lo olvidas.',
        'WhatsApp te pedirá el PIN de vez en cuando para que no lo olvides.',
      ] },
    ],
    frecuencia: 'Se activa una vez. Nunca compartas el PIN ni el código de 6 números que llega por mensaje.',
    fuente: { nombre: 'Centro de ayuda de WhatsApp', url: 'https://faq.whatsapp.com/1278661612895630/?locale=es_LA' },
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
        'Entra a myaccount.google.com con la cuenta del negocio.',
        'Toca «Seguridad e inicio de sesión» (en algunos celulares dice solo «Seguridad»).',
        'Toca «Verificación en 2 pasos» y sigue los pasos en pantalla.',
        'Elige recibir la confirmación en tu celular y guarda los códigos de respaldo en un lugar seguro, fuera de la vista.',
      ] },
    ],
    frecuencia: 'Se activa una vez. Revisa cada tres meses en «Seguridad» que el número de celular siga siendo el tuyo.',
    fuente: { nombre: 'Ayuda de la cuenta de Google', url: 'https://support.google.com/accounts/answer/185839' },
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
        'En Facebook o Instagram, entra a Configuración > Centro de cuentas.',
        'Toca «Contraseña y seguridad» > «Autenticación en dos pasos».',
        'Elige la cuenta y el método: una app de autenticación (como Google Authenticator) o un mensaje de texto.',
        'Guarda los códigos de recuperación en un lugar seguro, fuera de la vista.',
      ] },
    ],
    frecuencia: 'Se activa una vez por cuenta. Si tienes Facebook e Instagram, actívala en las dos.',
    fuente: { nombre: 'Configuración de Facebook', url: 'https://www.facebook.com/settings' },
    herramientas: ['P-17', 'P-06'],
  },
  {
    id: 'nequi',
    funcion: 'Proteger',
    titulo: 'Clave dinámica y botón de pánico de Nequi',
    para: 'Confirmar tus movimientos con un código que solo ves tú y bloquear tu Nequi si te roban o pierdes el celular.',
    equipo: 'todos',
    plataformas: ['nequi'],
    secciones: [
      { titulo: 'Usar la clave dinámica', pasos: [
        'La clave dinámica aparece en la pantalla de ingreso de la app de Nequi y cambia cada poco tiempo.',
        'Úsala solo dentro de la app o en sitios oficiales de Nequi.',
        'Nunca se la dictes a nadie por llamada, WhatsApp o mensaje, aunque diga ser de Nequi.',
      ] },
      { titulo: 'Si te roban o pierdes el celular: botón de pánico', pasos: [
        'Hazlo lo antes posible, desde otro celular o un computador.',
        'Entra a nequi.com.co (escríbelo tú mismo en el navegador) y toca «Entrar».',
        'Ingresa con tu número de celular y tu clave de Nequi.',
        'Elige «Bloquear tu Nequi» y confirma el bloqueo.',
        'Si no puedes entrar, comunícate con Nequi por sus canales de atención para que te ayuden a bloquearlo.',
      ] },
    ],
    frecuencia: 'Aprende hoy estos pasos y tu clave de Nequi de memoria: si te roban el celular, la vas a necesitar para bloquear desde otro equipo.',
    fuente: { nombre: 'Centro de ayuda de Nequi: clave dinámica', url: 'https://ayuda.nequi.com.co/hc/es/articles/34010128839949--Qu%C3%A9-es-la-clave-din%C3%A1mica-de-Nequi-y-para-qu%C3%A9-sirve' },
    otrasFuentes: [
      { nombre: 'Centro de ayuda de Nequi: bloquear si pierdes o roban tu celular', url: 'https://ayuda.nequi.com.co/hc/es/articles/35177946188941--C%C3%B3mo-bloquear-Nequi-si-pierdo-o-roban-mi-celular' },
    ],
    herramientas: ['P-18'],
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
};
export function guiaPropiaDe(herramientaId: string, celular?: 'android' | 'iphone'): Guia | undefined {
  if (herramientaId === 'R-05') return guiaDe(herramientaId, celular);
  return GUIAS.find((g) => g.id === GUIA_PROPIA[herramientaId]);
}
