# Sanando Pies — Sistema Integral de Administración Clínica

Proyecto Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn-style UI + Supabase.

## Estado del proyecto

| Etapa | Contenido | Estado |
|---|---|---|
| 1 | Sitio web público completo (Home, Nosotros, Tratamientos, Especialistas, Productos, Promociones, Testimonios, FAQ, Contacto + formulario de cita) | ✅ Terminado |
| 2 | Login (UI + lógica de Supabase Auth) | ✅ Terminado |
| 3 | Panel administrativo (Dashboard, Agenda, Pacientes, Especialistas, Servicios, Productos, Inventario, Finanzas, Reportes, Configuración) | ✅ Terminado (con datos de ejemplo) |
| 4 | Integración con Supabase (esquema SQL + clientes + server actions + middleware de protección de rutas) | ✅ Base lista — falta que **tú** crees tu proyecto de Supabase y pegues tus llaves |
| 5 | Pruebas finales | 🔜 Pendiente de tu revisión sobre datos reales |

Actualmente el panel administrativo y el dashboard funcionan con **datos de ejemplo** (`src/constants/mock-data.ts`) para que puedas ver el diseño completo sin depender de tu base de datos. El formulario de contacto y el login **ya están conectados a Supabase**: si no configuras las variables de entorno, funcionan en "modo demo" (no truenan, pero no guardan datos reales).

---

## 1. Requisitos previos

- [Node.js 20+](https://nodejs.org)
- Cuenta de [GitHub](https://github.com)
- Cuenta de [Supabase](https://supabase.com)
- Cuenta de [Vercel](https://vercel.com)

---

## 2. Ejecutarlo en tu computadora

```bash
# 1. Descomprime el ZIP y entra a la carpeta
cd sanando-pies

# 2. Instala dependencias
npm install

# 3. Copia el archivo de variables de entorno
cp .env.example .env.local
# (más abajo te explico cómo llenarlo con tus llaves de Supabase)

# 4. Levanta el servidor de desarrollo
npm run dev
```

Abre `http://localhost:3000` — verás el sitio público. El panel administrativo está en `/dashboard`, pero primero necesitas conectar Supabase y crear un usuario (paso 4).

---

## 3. Subirlo a GitHub

```bash
cd sanando-pies
git init
git add .
git commit -m "Sanando Pies: sitio público, login y panel administrativo"
```

1. Entra a [github.com/new](https://github.com/new) y crea un repositorio vacío, por ejemplo `sanando-pies` (no marques "Add README").
2. Conecta tu repo local y sube el código:

```bash
git branch -M main
git remote add origin https://github.com/TU_USUARIO/sanando-pies.git
git push -u origin main
```

> El `.gitignore` ya excluye `node_modules`, `.next` y tus archivos `.env*`, así que tus llaves nunca se suben a GitHub.

---

## 4. Configurar Supabase

1. Entra a [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**.
   - Elige nombre (`sanando-pies`), contraseña de base de datos y región (elige la más cercana, ej. `us-west` o `us-east`).
   - Plan **Free** es suficiente para empezar; el esquema fue diseñado pensando en ese límite.

2. **Crear las tablas**: entra a tu proyecto → **SQL Editor** → pega el contenido completo del archivo `supabase/schema.sql` (incluido en este ZIP) → **Run**.
   Esto crea todas las tablas normalizadas (pacientes, citas, especialistas, servicios, productos, inventario, ventas, testimonios, promociones, solicitudes de cita) junto con las políticas de seguridad (RLS): el sitio público solo puede leer catálogo e insertar solicitudes de cita; todo lo demás requiere una sesión de administrador autenticada.

3. **Obtener tus llaves**: en tu proyecto → **Settings → API**.
   - `Project URL` → va en `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → va en `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role key` (secreta, nunca la subas a GitHub ni la uses en el cliente) → va en `SUPABASE_SERVICE_ROLE_KEY` (reservada para futuras funciones de servidor)

   Pega esos valores en tu `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
   ```

4. **Crear tu primer usuario administrador**: en tu proyecto → **Authentication → Users → Add user** → captura tu correo y contraseña (o usa "Invite"). Ese será el usuario con el que entrarás en `/login`.

   Opcional pero recomendado: en **SQL Editor**, vincula ese usuario a la tabla `staff` para que aparezca como personal de la clínica:
   ```sql
   insert into staff (user_id, full_name, role)
   values ('UUID-DEL-USUARIO-QUE-CREASTE', 'Dr. Alejandro Ruiz', 'admin');
   ```
   (El UUID lo ves en la lista de usuarios de Authentication).

5. Reinicia `npm run dev` — el login y el formulario de contacto ya guardarán datos reales en Supabase.

---

## 5. Desplegar en Vercel

1. Entra a [vercel.com/new](https://vercel.com/new) e importa el repositorio de GitHub que acabas de subir (`sanando-pies`). Vercel detecta automáticamente que es Next.js.
2. En **Environment Variables**, agrega las mismas tres variables de tu `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Click **Deploy**. En 1-2 minutos tendrás tu URL pública, por ejemplo `sanando-pies.vercel.app`.
4. (Opcional) En **Settings → Domains** puedes conectar tu propio dominio, por ejemplo `sanandopies.mx`.

Cada vez que hagas `git push` a `main`, Vercel vuelve a desplegar automáticamente.

---

## 6. Estructura del proyecto (resumen)

```
src/
  app/
    (public)/        → Sitio público (Home, Nosotros, Tratamientos, etc.)
    login/            → Login
    (admin)/          → Panel administrativo, protegido por middleware
  components/
    ui/               → Botones, cards, inputs (estilo shadcn)
    public/           → Header, Footer, formulario de cita
    admin/            → Sidebar, Topbar, gráficas, badges de estado
  features/           → Lógica de negocio por dominio (appointments, auth)
  lib/supabase/       → Clientes de Supabase (browser / server)
  constants/          → Datos de ejemplo (mock-data.ts) — reemplázalos por
                        consultas reales a Supabase módulo por módulo
  types/               → Tipos de dominio y de la base de datos
supabase/
  schema.sql          → Esquema completo de base de datos + RLS
```

## 7. Siguientes pasos sugeridos (Etapa 4-5, a tu ritmo)

- Conectar cada módulo del panel (`pacientes`, `agenda`, `productos`, etc.) a Supabase reemplazando los arrays de `mock-data.ts` por consultas reales (`supabase.from(...)`) — puedo ir haciendo esto módulo por módulo cuando quieras.
- Regenerar tipos automáticamente desde tu base con: `npm run types:generate` (requiere `SUPABASE_PROJECT_ID` y la CLI de Supabase).
- Añadir el CRUD real de citas (crear/editar/cancelar) y la conversión de una solicitud pública en cita confirmada.
- Pruebas finales: revisar RLS, formularios y flujos completos antes de considerarlo producción.

¿Seguimos y conecto el primer módulo (por ejemplo Pacientes o Agenda) a datos reales de Supabase?
