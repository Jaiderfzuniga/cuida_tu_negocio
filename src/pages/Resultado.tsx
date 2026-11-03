import { Link, Navigate, useParams } from 'react-router-dom';
import { Pagina, Cargando } from '../components/Pagina';
import { Anillo } from '../components/Anillo';
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
    <Pagina>
      <div className="mt-4 text-center">
        <div className="text-[26px] font-black">Resultados para</div>
        <div className="text-[28px] font-black text-verde" style={{ textShadow: '0 0 16px rgb(43 234 122 / var(--brillo))' }}>{negocio?.nombre}</div>
        <span className="mt-2 inline-block rounded-full bg-ambar px-3.5 py-1.5 text-[13px] font-extrabold text-[#2a1a00]">
          {actual.momento === 'pre' ? 'Diagnóstico inicial' : 'Nuevo diagnóstico'} · {fecha}
        </span>
      </div>
      <div className="flex flex-1 flex-col md:mt-8 md:grid md:flex-none md:grid-cols-2 md:items-center md:gap-10">
      <div className="mt-6 grid grid-cols-3 gap-1 md:mt-0">
        {FUNCIONES.map((f, k) => <Anillo key={f} etiqueta={f} valor={n[f]} color={COLOR[f].fuerte} retraso={k * 150} />)}
      </div>
      <div className="flex flex-1 flex-col">
      <div className="tarjeta mt-6 p-5 md:mt-0 text-center" style={{ borderColor: COLOR[debil].fuerte, borderWidth: 1.5 }}>
        <div className="text-[56px] font-black leading-none tracking-tighter" aria-label={`${n.general} por ciento`}>{general}%</div>
        <div className="mt-2 text-[15px] font-bold">Nivel general de protección</div>
        {n.general < 100 && (
          <p className="m-0 mt-2 text-[13px] leading-snug text-suave">
            Tu punto más débil es <strong style={{ color: COLOR[debil].texto }}>{debil}</strong>: {EXPLICA[debil]}
          </p>
        )}
      </div>
      <div className="mt-auto flex flex-col gap-3 pt-6">
        <Link to={`/ruta/${actual.id}`} className="btn btn-primario">{n.general < 100 ? 'Ver cómo llegar al 100%' : 'Ver mis herramientas'}</Link>
        <Link to="/historial" className="btn btn-secundario">Ver mi avance</Link>
      </div>
      </div>
      </div>
    </Pagina>
  );
}
