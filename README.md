# 🦶 Sanando Pies — Sistema Integral de Administración Clínica

![Estado](https://img.shields.io/badge/Estado-En%20Desarrollo-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green)
![Licencia](https://img.shields.io/badge/Licencia-Uso%20Privado-red)

---

# Descripción

**Sanando Pies** es una plataforma web desarrollada para modernizar la administración de una clínica de podología.

El proyecto está dividido en dos grandes módulos:

- 🌐 Sitio web público para pacientes.
- 🏥 Sistema administrativo para la gestión interna de la clínica.

El objetivo es centralizar la administración de pacientes, citas, tratamientos, especialistas, productos, inventario, finanzas y reportes en una sola plataforma.

---

# Características principales

## Sitio público

- Página de inicio
- Nosotros
- Tratamientos
- Especialistas
- Productos
- Promociones
- Testimonios
- Preguntas frecuentes
- Contacto
- Solicitud de citas

## Panel administrativo

- Dashboard
- Agenda
- Pacientes
- Especialistas
- Servicios
- Productos
- Inventario
- Finanzas
- Reportes
- Configuración

---

# Tecnologías utilizadas

- Next.js 14 (App Router)
- React
- TypeScript
- Tailwind CSS
- Supabase
- PostgreSQL
- Supabase Auth
- Row Level Security (RLS)
- Vercel
- GitHub

---

# Arquitectura del sistema

```text
Paciente
     │
     ▼
Sitio Web Público
     │
     ▼
Next.js 14
     │
     ▼
Supabase
├── Authentication
├── Database
├── Storage
└── Row Level Security
```

---

# Estado del proyecto

| Módulo | Estado |
|---------|---------|
| Sitio web público | ✅ Completado |
| Diseño UI | ✅ Completado |
| Login con Supabase | ✅ Completado |
| Dashboard | ✅ Completado |
| Base de datos | 🚧 En integración |
| Agenda | 🚧 En desarrollo |
| Pacientes | 🚧 En desarrollo |
| Inventario | 🚧 En desarrollo |
| Productos | 🚧 En desarrollo |
| Finanzas | 🚧 En desarrollo |
| Reportes | 🚧 En desarrollo |

---

# Modo Demo

Actualmente el sistema funciona con datos de ejemplo.

Mientras no se configure Supabase:

- ✅ El sitio web funciona.
- ✅ El dashboard funciona.
- ✅ La interfaz administrativa funciona.
- ✅ El login muestra la interfaz.
- ❌ No se almacenan datos reales.

Una vez configuradas las variables de entorno y Supabase, toda la información será almacenada en la base de datos.

---

# Requisitos

- Node.js 20+
- Git
- GitHub
- Supabase
- Vercel

---

# Instalación

```bash
git clone https://github.com/TU_USUARIO/sanando-pies.git

cd sanando-pies

npm install
```

Copiar las variables de entorno:

```bash
cp .env.example .env.local
```

Iniciar el proyecto:

```bash
npm run dev
```

Abrir:

```
http://localhost:3000
```

---

# Configuración de Supabase

Crear un proyecto nuevo.

Agregar las siguientes variables:

```
NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=
```

Ejecutar:

```
supabase/schema.sql
```

Crear el primer usuario administrador desde:

Authentication → Users

---

# Despliegue

El proyecto está preparado para desplegarse en Vercel.

Agregar las mismas variables de entorno del archivo `.env.local`.

Cada cambio enviado a la rama **main** desplegará automáticamente una nueva versión.

---

# Seguridad

El proyecto utiliza:

- Supabase Auth
- PostgreSQL
- Row Level Security (RLS)
- Variables de entorno
- Middleware de protección de rutas
- Service Role Key únicamente para funciones de servidor

---

# Estructura del proyecto

```
src/
│
├── app/
│   ├── (public)
│   ├── (admin)
│   └── login
│
├── components/
│
├── features/
│
├── hooks/
│
├── lib/
│
├── constants/
│
├── types/
│
└── middleware.ts

public/

supabase/
│
└── schema.sql
```

---

# Roadmap

## Versión 1

- ✅ Sitio web
- ✅ Login
- ✅ Dashboard

## Versión 2

- ⏳ Agenda
- ⏳ Pacientes
- ⏳ Especialistas
- ⏳ Inventario

## Versión 3

- ⏳ Finanzas
- ⏳ Reportes
- ⏳ Estadísticas

## Versión 4

- ⏳ WhatsApp
- ⏳ Correos automáticos
- ⏳ Calendario
- ⏳ Inteligencia Artificial

---

# Próximos pasos

- Conectar todos los módulos a Supabase.
- Eliminar completamente los datos mock.
- Implementar CRUD completo.
- Generar reportes PDF.
- Mejorar permisos por roles.
- Optimizar rendimiento.
- Realizar pruebas finales.

---

# Versión

**v0.1.0**

Estado: En desarrollo.

---

# Autor

**María Guadalupe Castañeda López**

Proyecto desarrollado para la clínica **Sanando Pies**.

---

# Licencia

Uso privado.

Todos los derechos reservados.