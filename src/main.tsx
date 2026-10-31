import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';

try { if (localStorage.getItem('tema') === 'claro') document.documentElement.classList.add('claro'); } catch { /* */ }
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
