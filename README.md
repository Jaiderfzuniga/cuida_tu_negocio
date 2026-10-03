# Plataforma Web de Diagnóstico y Recomendaciones de Ciberseguridad (NIST CSF)

> **Institución:** Universidad CESMAG  
> **Programa:** Ingeniería de Sistemas  
> **Autor:** Jaider Matta 


---

## 📋 Descripción del Proyecto

Esta plataforma web es una solución de software orientada a evaluar y fortalecer la ciberseguridad de **microcomercios** ubicados en el sector Suroriental de San Juan de Pasto. Trabajando con una muestra intencional de 8 microcomercios, la herramienta permite realizar un diagnóstico del estado de seguridad digital de cada negocio mediante un **cuestionario integrado**.

A partir de las respuestas, el sistema genera recomendaciones automatizadas de herramientas de ciberseguridad, basándose de manera estricta y simplificada en tres funciones específicas del marco **NIST CSF**: **Identificar, Proteger y Recuperar** (limitando esta última a prácticas básicas de respaldo y restauración de información). 

**Delimitación del alcance:** Quedan explícitamente fuera del alcance de esta plataforma las funciones de *Gobernar, Detectar y Responder* (como detección de amenazas en tiempo real o respuesta automatizada a incidentes). El proyecto se enfoca en proporcionar una herramienta inicial accesible para usuarios no especializados.

*Nota de Investigación:* El "cuestionario integrado" es el módulo de software que interactúa con el usuario final. La recolección de datos académicos para validar la investigación se realiza mediante "encuestas pre-test/post-test" separadas (vía Google Forms), las cuales evalúan la utilidad percibida y la capacidad de los microcomercios para implementar las medidas sugeridas.

---

## 🛠️ Metodología, Arquitectura y Stack Tecnológico

---

## 📂 Estructura del Repositorio

```text
cuida_tu_negocio/
│
├── .figma/          # Recursos de diseño y prototipado visual
├── img/             # Activos gráficos e imágenes de la interfaz
├── src/             # Código fuente principal de la aplicación (Lógica y componentes)
├── index.html       # Documento HTML principal de entrada
├── package.json     # Metadatos del proyecto y dependencias del sistema
├── tsconfig.json    # Configuración del compilador de TypeScript
└── vite.config.ts   # Configuración de optimización y construcción con Vite

## 🚀 Guía de Instalación y Ejecución Local

Para replicar, evaluar o auditar el código fuente del proyecto en un entorno local, siga los siguientes pasos:

### Prerrequisitos
* Tener instalado [Node.js](https://nodejs.org/) (versión recomendada LTS).
* Un gestor de paquetes compatible (npm, pnpm o yarn).

### Pasos de instalación y ejecución

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/Jaiderfzuniga/cuida_tu_negocio.git](https://github.com/Jaiderfzuniga/cuida_tu_negocio.git)
2. Acceder al directorio del proyecto:
  cd cuida_tu_negocio
3. Instalar las dependencias del sistema:
   npm install
  # O si prefieres utilizar pnpm:
   pnpm install
4. Ejecutar el entorno de desarrollo:
npm run dev
