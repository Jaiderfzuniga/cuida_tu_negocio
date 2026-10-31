# Escudo Digital

Plataforma web de diagnóstico y recomendaciones de ciberseguridad basada en NIST CSF (Identificar, Proteger y Recuperar) para microcomercios de San Juan de Pasto.
Trabajo de grado · Ingeniería de Sistemas · Universidad CESMAG.

## 1. Probarla en tu computador

Necesitas Node.js 18 o superior.

```bash
npm install
npm run dev        # abre http://localhost:5173
npm test           # pruebas del cálculo y del motor de reglas
```

Sin archivo `.env` funciona en **modo demostración** (guarda en el navegador).
Para ver el panel del investigador en modo demo, crea una cuenta con un correo que contenga la palabra `investigador`.

## 2. Conectar la base de datos (Supabase)

1. Crea un proyecto gratis en https://supabase.com.
2. En **SQL Editor** ejecuta `supabase/migrations/001_esquema.sql` y luego `supabase/seed.sql`.
3. En **Project Settings → API** copia la URL y la clave `anon public`.
4. Copia `.env.example` como `.env` y pega esos dos valores.
5. Crea tu cuenta en la plataforma y date el rol de investigador (última línea del archivo SQL).

## 3. Publicarla (Vercel)

1. Sube la carpeta a un repositorio de GitHub (el `.gitignore` ya excluye `node_modules` y `.env`).
2. En https://vercel.com → **Add New Project** → elige el repositorio (Vercel detecta Vite).
3. En **Environment Variables** agrega `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
4. **Deploy**. En Supabase → Authentication → URL Configuration, pon la dirección de Vercel como *Site URL*.

## Estructura

```
src/
├── pages/        Pantallas (Inicio, Ingresar, Negocio, Cuestionario, Resultado, Ruta, Catálogo, Historial, Panel)
├── components/   Escudo 3D, anillos, logo de herramientas, tarjetas, diseño de página
├── lib/          puntaje.ts (nivel por función) y motor.ts (reglas y ruta al 100 %)
├── data/         Cuestionario (13 preguntas como máximo) y catálogo (33 herramientas)
├── services/     Conexión con Supabase o modo demostración
├── hooks/        Sesión y tema claro/oscuro
├── styles/       Identidad visual
└── types/        Tipos de TypeScript
supabase/         Esquema (9 tablas + RLS) y datos iniciales
scripts/seed.ts   Regenera supabase/seed.sql si cambias src/data (npx vite-node scripts/seed.ts > supabase/seed.sql)
tests/            Pruebas automáticas
```

## Cómo se calcula

- Cada respuesta vale 2 (práctica completa), 1 (parcial) o 0. Las preguntas que no aplican al negocio (sin computador, sin Facebook, etc.) no cuentan.
- Nivel por función = puntos obtenidos ÷ puntos posibles. Nivel general = promedio de las tres funciones.
- Ruta al 100 %: cada respuesta sin el puntaje máximo activa la primera herramienta compatible con los equipos del negocio; los puntos que faltan se reparten entre esas herramientas y se ordenan empezando por la función más baja.
- Sin inteligencia artificial: todas las reglas están en `src/data/preguntas.ts`.
