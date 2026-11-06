import { Link } from 'react-router-dom';
import { Pagina } from '../components/Pagina';
import { Robot } from '../components/Robot';
import { CATALOGO } from '../data/catalogo';
import { useSesion } from '../hooks/useSesion';
import type { Funcion } from '../types';

const PASOS: [string, string][] = [
  ['Registra tu negocio', 'Cuéntanos si usas WhatsApp, Nequi, celular o computador. Así solo verás lo que te sirve.'],
  ['Responde', 'Hasta 13 preguntas sencillas, en unos cinco minutos. Cada una explica qué significa.'],
  ['Mira tu nivel', 'Recibes un porcentaje general y uno por cada función, y sabes cuál es tu punto más débil.'],
  ['Sigue tu ruta', 'Herramientas gratuitas o de bajo costo, en orden de urgencia, con los puntos que suma cada una.'],
  ['Repite y compara', 'Vuelve a hacer el diagnóstico y mira en «Mi avance» cuánto mejoró tu negocio.'],
];

const FRENTES: { f: Funcion; fondo: string; tinta: string; que: string; ejemplo: string }[] = [
  { f: 'Identificar', fondo: '#14b866', tinta: '#07140d', que: 'Saber qué equipos y cuentas tienes, y cuáles están en riesgo.', ejemplo: '¿Sabes en qué equipos está abierta tu cuenta de WhatsApp o de correo?' },
  { f: 'Proteger', fondo: '#1f6bf0', tinta: '#ffffff', que: 'Ponerles barreras a tus cuentas y equipos contra robos y fraudes.', ejemplo: '¿Dónde guardas las contraseñas de tus cuentas?' },
  { f: 'Recuperar', fondo: '#ff5a1f', tinta: '#120500', que: 'Tener copia de tu información para no perder pedidos, contactos ni comprobantes.', ejemplo: '¿Haces copia de seguridad de tus chats de WhatsApp?' },
];

const seccion = 'm-0 font-display text-[clamp(30px,3vw,44px)] font-black uppercase leading-none tracking-tight';
const cierre = 'm-0 font-display text-[clamp(28px,2.6vw,38px)] font-black uppercase leading-none tracking-tight';
const textoCierre = 'm-0 mt-4 text-[18px] leading-[1.42] text-[var(--panel-suave)]';

export default function ComoFunciona() {
  const { perfil, negocio } = useSesion();
  const destino = !perfil ? '/ingresar?modo=registro' : negocio ? '/cuestionario' : '/negocio';
  return (
    <Pagina fantasma="PASOS">
      <div className="flex items-start justify-between gap-6">
        <div className="max-w-[1080px]">
          <h1 className="titulo titulo-inicio mt-4 pc:mt-3">¿Cómo funciona?</h1>
          <p className="subtitulo pc:max-w-[980px]">Te decimos qué tan protegido está tu negocio y con qué herramientas cubrir lo que le falta.</p>
          <p className="m-0 mt-3 max-w-[900px] text-[clamp(17px,1.4vw,20px)] leading-[1.38] text-suave">Es un autodiagnóstico: lo haces tú mismo, desde tu celular o computador, sin saber de tecnología y sin costo.</p>
        </div>
        <Robot alto={190} className="solo-pc flex-none" />
      </div>

      <section className="mt-10 pc:mt-11">
        <h2 className={seccion}>Tu camino en 5 pasos</h2>
        <ol className="m-0 mt-6 grid list-none gap-6 p-0 sm:grid-cols-2 pc:grid-cols-5 pc:gap-7">
          {PASOS.map(([t, d], i) => (
            <li key={t}>
              <div className="font-display text-[clamp(64px,5.8vw,84px)] font-black leading-none tracking-[-0.04em]">{i + 1}</div>
              <div className="mt-2 text-[23px] font-extrabold leading-[1.15]">{t}</div>
              <p className="m-0 mt-2 text-[17.5px] leading-[1.38] text-suave">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12 pc:mt-14">
        <div className="flex flex-col gap-3 pc:flex-row pc:items-end pc:justify-between pc:gap-10">
          <h2 className={`${seccion} flex-none`}>Qué revisamos</h2>
          <p className="m-0 max-w-[760px] text-[19px] font-semibold leading-[1.36] pc:text-right">Nos basamos en el marco de ciberseguridad NIST CSF. De sus 6 funciones usamos las 3 que se ajustan a un microcomercio; las demás piden más recursos técnicos.</p>
        </div>
        <div className="mt-6 grid gap-3 pc:grid-cols-3 pc:gap-0">
          {FRENTES.map((x) => (
            <div key={x.f} className="frente" style={{ background: x.fondo, color: x.tinta }}>
              <h3 className="m-0 font-display text-[32px] font-black uppercase tracking-tight">{x.f}</h3>
              <p className="m-0 mt-3 text-[20px] font-bold leading-[1.28]">{x.que}</p>
              <p className="m-0 mt-3 text-[16.5px] font-medium leading-[1.35]">Por ejemplo: {x.ejemplo}</p>
              <div className="mt-4 flex items-baseline gap-2.5">
                <span className="font-display text-[62px] font-black leading-none tracking-[-0.04em]">{CATALOGO.filter((h) => h.funcion === x.f).length}</span>
                <span className="text-[18px] font-bold">herramientas</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cierre-info">
        <div className="grid gap-10 pc:grid-cols-[1.1fr_1fr_1fr] pc:gap-14">
          <div>
            <h2 className={cierre}>Por qué existe</h2>
            <div className="mt-4 font-display text-[66px] font-black leading-none tracking-[-0.04em] text-[var(--acento)]">95,8&nbsp;%</div>
            <p className="m-0 mt-2.5 text-[18px] leading-[1.4] text-[var(--panel-suave)]">de las 26.967 empresas activas de Pasto son microempresas (Cámara de Comercio de Pasto, 2024). Muchas ya venden por WhatsApp o cobran con Nequi, pero sin una protección formal.</p>
          </div>
          <div>
            <h2 className={cierre}>Cómo se recomienda</h2>
            <p className={textoCierre}>Según lo que respondes y los equipos que usas, unas reglas fijas eligen las herramientas. No hay inteligencia artificial ni asesor de por medio: el mismo resultado para las mismas respuestas.</p>
            <p className="m-0 mt-3 text-[18px] font-bold leading-[1.4]">Cada herramienta muestra su logo y su sitio oficial.</p>
          </div>
          <div>
            <h2 className={cierre}>Tus datos</h2>
            <p className={textoCierre}>Tus respuestas se usan de forma anónima para un trabajo de grado de Ingeniería de Sistemas de la Universidad CESMAG, según la Ley 1581 de 2012.</p>
            <p className="m-0 mt-3 text-[18px] font-bold leading-[1.4]">Nunca te pediremos las claves de tu correo, Nequi o banco.</p>
          </div>
        </div>
        <div className="mt-9">
          <Link to={destino} className="btn btn-panel">{perfil ? 'Hacer mi diagnóstico' : 'Crear mi cuenta y empezar →'}</Link>
        </div>
      </section>
    </Pagina>
  );
}
