import { Component, type ReactNode } from 'react';

/** Si una pantalla falla, muestra el error en vez de dejar la página en blanco. */
export class Fallo extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch(error: Error) { console.error('[Escudo Digital]', error); }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="mx-auto flex min-h-dvh max-w-[440px] flex-col justify-center gap-4 px-5 text-center">
        <h1 className="m-0 text-2xl font-black">Algo falló en esta pantalla</h1>
        <p className="m-0 text-sm text-suave">Recarga la página. Si vuelve a pasar, envía una captura de este mensaje:</p>
        <code className="tarjeta block break-words p-3 text-left text-xs text-naranja-texto">{this.state.error.message}</code>
        <button className="btn btn-primario" onClick={() => location.reload()}>Recargar</button>
      </div>
    );
  }
}
