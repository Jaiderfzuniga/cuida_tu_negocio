import { useState, type InputHTMLAttributes } from 'react';

/** Campo de contraseña con botón para ver u ocultar lo que se escribe. */
export function CampoClave(props: Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'>) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="campo-clave">
      <input {...props} className="campo" type={visible ? 'text' : 'password'} spellCheck={false} autoCapitalize="none" />
      <button
        type="button"
        className="ojo-clave"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        aria-pressed={visible}
        title={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
          {visible && <path d="M4 20 20 4" />}
        </svg>
      </button>
    </div>
  );
}
