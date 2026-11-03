import { Link } from 'react-router-dom';
import { Pagina } from '../components/Pagina';
import { Tienda3D } from '../components/Tienda3D';
import { useSesion } from '../hooks/useSesion';

export default function Inicio() {
  const { perfil, negocio } = useSesion();
  return (
    <Pagina>
      <div className="flex flex-1 flex-col md:mt-6 md:grid md:flex-none md:grid-cols-2 md:items-center md:gap-12">
      <div>
      <div className="mt-10 flex flex-col gap-4 text-center md:mt-0 md:text-left">
        <h1 className="m-0 text-[40px] font-black md:text-[60px] leading-[1.05] tracking-tight">
          Cuida lo que <span className="text-verde" style={{ textShadow: '0 0 18px rgb(43 234 122 / var(--brillo))' }}>has construido.</span>
        </h1>
        <p className="m-0 text-[15px] leading-relaxed text-suave">
          {negocio ? `Hola, ${negocio.nombre}. ` : ''}Evalúa la seguridad digital de tu negocio en cinco minutos. Sin tecnicismos y sin costo.
        </p>
        <p className="m-0 text-[13px] text-tenue">Basado en el marco NIST CSF: Identificar, Proteger y Recuperar.</p>
      </div>
      <div className="mt-7 flex flex-col gap-3 md:max-w-sm">
        {perfil ? (
          <>
            <Link to={negocio ? '/cuestionario' : '/negocio'} className="btn btn-primario">Hacer mi diagnóstico</Link>
            <Link to="/historial" className="btn btn-secundario">Ver mi avance</Link>
          </>
        ) : (
          <>
            <Link to="/ingresar?modo=registro" className="btn btn-primario">Crear mi cuenta y empezar →</Link>
            <Link to="/ingresar" className="btn btn-secundario">Ya tengo cuenta · Ingresar</Link>
          </>
        )}
      </div>
      </div>
      <div className="mt-auto flex justify-center pt-6 md:mt-0 md:pt-0 [&>svg]:md:max-w-[460px]"><Tienda3D /></div>
      </div>
    </Pagina>
  );
}
