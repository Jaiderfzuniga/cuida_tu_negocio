# Plataforma Web de Diagnóstico y Recomendaciones de Ciberseguridad (NIST CSF)

> **Institución:** Universidad CESMAG  
> **Programa:** Ingeniería de Sistemas  
> **Autor:** Jaider Matta 


---

## 📋 Descripción del Proyecto

Esta plataforma web es una solución de software orientada a evaluar y fortalecer la ciberseguridad de **microcomercios** ubicados en el sector Suroriental de San Juan de Pasto. Trabajando con una muestra intencional de 8 microcomercios, la herramienta permite realizar un diagnóstico del estado de seguridad digital de cada negocio mediante un **cuestionario integrado**.

A partir de las respuestas, el sistema genera recomendaciones automatizadas de herramientas de ciberseguridad, basándose de manera estricta y simplificada en tres funciones específicas del marco **NIST CSF**: **Identificar, Proteger y Recuperar** (limitando esta última a prácticas básicas de respaldo y restauración de información). 

**Delimitación del alcance:** Quedan explícitamente fuera del alcance de esta plataforma las funciones de *Gobernar, Detectar y Responder* (como detección de amenazas en tiempo real o respuesta automatizada a incidentes). El proyecto se enfoca en proporcionar una herramienta inicial accesible para usuarios no especializados.

---

## 🛠️ Arquitectura y Stack Tecnológico

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
```
## 🚀 Guía de Instalación y Ejecución Local
```bash
git clone [https://github.com/Jaiderfzuniga/cuida_tu_negocio.git](https://github.com/Jaiderfzuniga/cuida_tu_negocio.git)
cd cuida_tu_negocio
npm install
npm run dev
