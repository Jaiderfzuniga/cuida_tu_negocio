import { Link, Navigate, useParams } from 'react-router-dom';
import { Pagina, Cargando } from '../components/Pagina';
import { Anillo3D } from '../components/Anillo3D';
import { Robot } from '../components/Robot';
import { useSesion } from '../hooks/useSesion';
import { useDiagnosticos } from '../hooks/useDiagnostico';
import { useContador } from '../hooks/useContador';
import { COLOR } from '../lib/colores';
import { funcionMasDebil } from '../lib/puntaje';
import { FUNCIONES } from '../types';

const EXPLICA = {
  Identificar: 'no sabes bien qué equipos y cuentas tienes ni cuáles están en riesgo.',
  Proteger: 'tus cuentas y equipos tienen pocas barreras contra robos y fraudes.',
  Recuperar: 'si pierdes el celular o el computador, perderías pedidos, contactos y comprobantes.',
};

export default function Resultado() {
  const { id } = useParams();
  const { negocio } = useSesion();
  const { actual, cargando } = useDiagnosticos(id);
  const general = useContador(actual?.niveles.general ?? 0, 1600, 450);
  if (cargando) return <Cargando />;
  if (!actual) return <Navigate to="/cuestionario" replace />;
  const n = actual.niveles;
  const debil = funcionMasDebil(n);
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
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link to={`/ruta/${actual.id}`} className="btn btn-primario">{n.general < 100 ? 'Ver cómo llegar al 100 %' : 'Ver mis herramientas'}</Link>
        <Link to="/historial" className="btn btn-secundario">Ver mi avance</Link>
      </div>
    </Pagina>
  );
}
