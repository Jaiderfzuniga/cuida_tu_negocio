import { createPortal } from 'react-dom';
import type { Paso } from '../lib/motor';
import type { Diagnostico, Funcion, Herramienta, Negocio } from '../types';
import { FUNCIONES } from '../types';
import { funcionMasDebil } from '../lib/puntaje';

const TONO: Record<Funcion, string> = { Identificar: '#0b7640', Proteger: '#1f5fd6', Recuperar: '#c2410c' };
const QUE: Record<Funcion, string> = {
  Identificar: 'Saber qué equipos y cuentas tienes y cuáles están en riesgo.',
  Proteger: 'Barreras para tus cuentas y equipos contra robos y fraudes.',
  Recuperar: 'Copias para no perder pedidos, contactos ni comprobantes.',
};
const sitio = (url: string) => { try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return url; } };

/**
 * Resumen imprimible del diagnóstico (RF-16). Solo se ve al imprimir o al guardar como PDF
 * desde el botón «Descargar o imprimir» de la pantalla de resultados.
 */
export function Reporte({ d, negocio, pasos, extra }: { d: Diagnostico; negocio: Negocio; pasos: Paso[]; extra: Herramienta[] }) {
  const n = d.niveles;
  const debil = funcionMasDebil(n);
  const fecha = new Date(d.fecha).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
  return createPortal(
    <section className="reporte-impreso" aria-hidden="true">
      <header className="rp-cabeza">
        <svg width="34" height="38" viewBox="0 0 34 38"><path d="M17 2 L31 7 V18 C31 27 25 33 17 36 C9 33 3 27 3 18 V7 Z" fill="#0a0a0d" /><path d="M11 18.5 l4.5 4.5 8-9" fill="none" stroke="#14b866" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <div><div className="rp-marca">ESCUDO DIGITAL</div><div className="rp-sub">Resultado del diagnóstico de ciberseguridad</div></div>
        <div className="rp-fecha">{fecha}<br />{d.momento === 'pre' ? 'Diagnóstico inicial' : 'Nuevo diagnóstico'}</div>
      </header>

      <div className="rp-resumen">
        <div>
          <div className="rp-negocio">{negocio.nombre}</div>
          <div className="rp-general">{n.general}<span> %</span></div>
          <div className="rp-etiqueta">Nivel general de protección</div>
        </div>
        <div className="rp-barras">
          {FUNCIONES.map((f) => (
            <div key={f} className="rp-barra">
              <div className="rp-barra-fila"><strong style={{ color: TONO[f] }}>{f}</strong><span>{n[f]} %</span></div>
              <div className="rp-pista"><div style={{ width: `${n[f]}%`, background: TONO[f] }} /></div>
              <div className="rp-que">{QUE[f]}</div>
            </div>
          ))}
        </div>
      </div>

      {n.general < 100 && (
        <div className="rp-aviso" style={{ borderColor: TONO[debil] }}>
          Tu punto más débil es <strong style={{ color: TONO[debil] }}>{debil}</strong>. Empieza por las herramientas de esa función.
        </div>
      )}

      {pasos.length > 0 && (
        <>
          <h2 className="rp-titulo">Tu ruta al 100 %</h2>
          <p className="rp-nota">En este orden: lo más urgente primero. Los puntos son lo que sube tu nivel general al aplicar cada herramienta.</p>
          <ol className="rp-lista">
            {pasos.map((p, i) => (
              <li key={p.herramienta.id} style={{ borderColor: TONO[p.funcion] }}>
                <span className="rp-num" style={{ background: TONO[p.funcion] }}>{i + 1}</span>
                <div className="rp-item">
                  <div className="rp-item-fila"><strong>{p.herramienta.nombre}</strong><span className="rp-puntos" style={{ color: TONO[p.funcion] }}>+{p.puntos} puntos</span></div>
                  <div className="rp-item-meta">{p.funcion} · {p.herramienta.costo} · {sitio(p.herramienta.url)}</div>
                </div>
              </li>
            ))}
          </ol>
        </>
      )}

      {extra.length > 0 && (
        <>
          <h2 className="rp-titulo">Para mantener tu protección</h2>
          <ul className="rp-lista rp-extra">
            {extra.map((h) => (
              <li key={h.id} style={{ borderColor: TONO[h.funcion] }}>
                <div className="rp-item">
                  <strong>{h.nombre}</strong>
                  <div className="rp-item-meta">{h.funcion} · {h.costo} · {sitio(h.url)}</div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      <footer className="rp-pie">
        Busca cada herramienta en su sitio oficial o en la tienda de tu celular. Nunca compartas tus contraseñas ni códigos.<br />
        Autodiagnóstico orientativo basado en las funciones Identificar, Proteger y Recuperar del NIST CSF · Trabajo de grado, Ingeniería de Sistemas, Universidad CESMAG.
      </footer>
    </section>,
    document.body,
  );
}
