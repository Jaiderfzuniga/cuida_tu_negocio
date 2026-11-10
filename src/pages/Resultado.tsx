import { Link, Navigate, useParams } from 'react-router-dom';
import { Pagina, Cargando } from '../components/Pagina';
import { Anillo3D } from '../components/Anillo3D';
import { Robot } from '../components/Robot';
import { useSesion } from '../hooks/useSesion';
import { useDiagnosticos } from '../hooks/useDiagnostico';
import { useContador } from '../hooks/useContador';
import { COLOR } from '../lib/colores';
import { funcionMasDebil } from '../lib/puntaje';
import { refuerzo, rutaAl100 } from '../lib/motor';
import { Reporte } from '../components/Reporte';
import { FUNCIONES } from '../types';

const EXPLICA = {
  Identificar: 'no sabes bien qué equipos y cuentas tienes ni cuáles están en riesgo.',
  Proteger: 'tus cuentas y equipos tienen pocas barreras contra robos y fraudes.',
  Recuperar: 'si pierdes el celular o el computador, perderías pedidos, contactos y comprobantes.',
};

export default function Resultado() {
  const { id } = useParams();
  const { negocio } = useSesion();
  const { lista, actual, cargando } = useDiagnosticos(id);
  const general = useContador(actual?.niveles.general ?? 0, 1600, 450);
  if (cargando) return <Cargando />;
  if (!actual) return <Navigate to="/cuestionario" replace />;
  const n = actual.niveles;
  const debil = funcionMasDebil(n);
  // Intento anterior: si el nuevo diagnóstico queda igual o más bajo, se ofrece repetirlo.
  // Todos los intentos quedan guardados en la base de datos (el investigador los ve en el panel).
  const pos = lista!.findIndex((d) => d.id === actual.id);
  const anterior = pos > 0 ? lista![pos - 1] : null;
  const esUltimo = pos === lista!.length - 1;
  const repetir = esUltimo && anterior && n.general <= anterior.niveles.general;
  const pasos = negocio ? rutaAl100(actual.respuestas, negocio, n) : [];
  const extra = negocio ? refuerzo(negocio, pasos.flatMap((p) => [p.herramienta.id, ...p.alternativas.map((a) => a.id)]), pasos.length ? 1 : 2) : [];
  const fecha = new Date(actual.fecha).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <Pagina fantasma="RESULTADO" panel={
      <div className="flex flex-col gap-6 pc:mt-[3vh] pc:gap-[3.4vh]">
        <Robot alto={120} className="solo-pc self-end" />
        {FUNCIONES.map((f, k) => <Anillo3D key={f} funcion={f} valor={n[f]} retraso={k * 150} />)}
      </div>
    }>
      <div className="mt-5 text-[clamp(18px,1.55vw,24px)] font-extrabold pc:mt-9">
        {negocio?.nombre} · {actual.momento === 'pre' ? 'Diagnóstico inicial' : 'Nuevo diagnóstico'} · {fecha}
      </div>
      <div className="mt-2 font-display text-[clamp(110px,14vw,210px)] font-black leading-[0.92] tracking-[-0.05em]" aria-label={`${n.general} por ciento`}>{general} %</div>
      <h1 className="subtitulo mt-3 text-[clamp(26px,2.3vw,34px)]">Nivel general de protección</h1>
      {n.general < 100 && (
        <p className="m-0 mt-3 max-w-[640px] text-[clamp(18px,1.45vw,21px)] leading-[1.38]">
          Tu punto más débil es <strong style={{ color: COLOR[debil].texto }}>{debil}</strong>: {EXPLICA[debil]}
        </p>
      )}
      {repetir && (
        <div className="aviso-repetir mt-5 max-w-[640px]">
          <p className="m-0 text-[clamp(17px,1.35vw,20px)] font-bold leading-[1.35]">
            Tu nivel {n.general === anterior!.niveles.general ? 'quedó igual que' : 'bajó frente a'} tu diagnóstico anterior ({anterior!.niveles.general} %).
          </p>
          <p className="m-0 mt-1 text-[16px] leading-[1.38]">Este intento queda guardado. Si quieres, aplica las herramientas de tu ruta y vuelve a intentarlo.</p>
          <Link to="/cuestionario" className="btn btn-primario mt-3">Volver a intentar</Link>
        </div>
      )}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link to={`/ruta/${actual.id}`} className="btn btn-primario">{n.general < 100 ? 'Ver cómo llegar al 100 %' : 'Ver mis herramientas'}</Link>
        <Link to="/historial" className="btn btn-secundario">Ver mi avance</Link>
        <button className="btn btn-secundario" onClick={() => window.print()}>Descargar o imprimir</button>
      </div>
      {negocio && <Reporte d={actual} negocio={negocio} pasos={pasos} extra={extra} />}
    </Pagina>
  );
}
