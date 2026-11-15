import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Fuentes alojadas en la propia web (antes venían de Google Fonts y bloqueaban la primera pintura).
import '@fontsource-variable/roboto-flex/wght.css';
import '@fontsource/montserrat/latin-800.css';
import '@fontsource/montserrat/latin-900.css';
import App from './App';
import './styles/index.css';

try { if (localStorage.getItem('tema') === 'claro') document.documentElement.classList.add('claro'); } catch { /* */ }
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
