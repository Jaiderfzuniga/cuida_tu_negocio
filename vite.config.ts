import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// En GitHub Pages la app vive en /cuida_tu_negocio/; en local y en Vercel, en la raíz.
export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/cuida_tu_negocio/' : '/',
  plugins: [react(), tailwindcss()],
  // React y Supabase en archivos aparte: cambian poco, así el navegador los reutiliza entre versiones.
  build: { rollupOptions: { output: { manualChunks: { react: ['react', 'react-dom', 'react-router-dom'], supabase: ['@supabase/supabase-js'] } } } },
});
