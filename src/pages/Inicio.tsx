import { Link } from 'react-router-dom';
import { Pagina } from '../components/Pagina';
import { Chica } from '../components/Robot';
import { useSesion } from '../hooks/useSesion';

export default function Inicio() {
  const { perfil, negocio } = useSesion();
  return (
    <Pagina fantasma="ESCUDO" extras={<>
      <Chica className="chica-inicio solo-pc" />
      <div className="puntos-deco" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <div className="sello"><b className="text-[27px] font-extrabold leading-none">NIST</b><b className="text-[46px] font-black leading-none">CSF</b></div>
    </>}>
      <div className="flex flex-col pc:min-h-[calc(100dvh-136px)] pc:max-w-[52vw] pc:justify-between">
        <div className="mt-6 pc:mt-[11vh]">
          <h1 className="titulo titulo-inicio">Escudo<br />Digital</h1>
          <p className="subtitulo">Cuida lo que has construido. ¿Sabes qué tan protegido está tu negocio?</p>
          <p className="m-0 mt-4 max-w-[580px] text-[clamp(17px,1.4vw,21px)] leading-[1.36] text-suave">
            {negocio ? `Hola, ${negocio.nombre}. ` : ''}Evalúa la seguridad digital de tu negocio en cinco minutos.<br className="solo-pc" /> Sin tecnicismos y sin costo.
          </p>
          <p className="m-0 mt-3 text-[16px] font-bold">Basado en el marco NIST CSF: Identificar, Proteger y Recuperar.</p>
        </div>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap pc:mt-4">
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
        <Chica className="chica-inicio solo-movil" />
      </div>
    </Pagina>
  );
}
