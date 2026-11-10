import { lazy, Suspense, type ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SesionProvider, useSesion } from './hooks/useSesion';
import { Cargando } from './components/Pagina';
import Inicio from './pages/Inicio';
import { Fallo } from './components/Fallo';

const Ingresar = lazy(() => import('./pages/Ingresar'));
const Negocio = lazy(() => import('./pages/Negocio'));
const Cuestionario = lazy(() => import('./pages/Cuestionario'));
const Resultado = lazy(() => import('./pages/Resultado'));
const Ruta = lazy(() => import('./pages/Ruta'));
const Catalogo = lazy(() => import('./pages/Catalogo'));
const ComoFunciona = lazy(() => import('./pages/ComoFunciona'));
const Historial = lazy(() => import('./pages/Historial'));
const Panel = lazy(() => import('./pages/Panel'));
const NuevaClave = lazy(() => import('./pages/NuevaClave'));
const Guias = lazy(() => import('./pages/Guias'));

/** Exige sesión; con `negocio` exige además haber registrado el negocio; con `investigador`, ese rol. */
function Protegida({ children, negocio, investigador }: { children: ReactNode; negocio?: boolean; investigador?: boolean }) {
  const s = useSesion();
  if (s.cargando) return <Cargando />;
  if (!s.perfil) return <Navigate to="/ingresar" replace />;
  if (investigador && s.perfil.rol !== 'investigador') return <Navigate to="/" replace />;
  if (negocio && !s.negocio) return <Navigate to="/negocio" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <SesionProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Fallo>
        <Suspense fallback={<Cargando />}>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/ingresar" element={<Ingresar />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/como-funciona" element={<ComoFunciona />} />
            <Route path="/guias" element={<Guias />} />
            <Route path="/nueva-clave" element={<NuevaClave />} />
            <Route path="/negocio" element={<Protegida><Negocio /></Protegida>} />
            <Route path="/cuestionario" element={<Protegida negocio><Cuestionario /></Protegida>} />
            <Route path="/resultado/:id" element={<Protegida negocio><Resultado /></Protegida>} />
            <Route path="/ruta/:id" element={<Protegida negocio><Ruta /></Protegida>} />
            <Route path="/historial" element={<Protegida negocio><Historial /></Protegida>} />
            <Route path="/panel" element={<Protegida investigador><Panel /></Protegida>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        </Fallo>
      </BrowserRouter>
    </SesionProvider>
  );
}
