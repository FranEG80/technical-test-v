# 🧪 Prueba Técnica – Mini Editor con tldraw

Este repositorio contiene el proyecto desarrollado para la prueba técnica. Es una aplicación web que integra un editor visual con [tldraw](https://tldraw.com/), un backend liviano con **tRPC** + **Prisma**, y un frontend en **Next.js** con **Tailwind CSS** y **shadcn/ui**.

El objetivo es cubrir los requisitos funcionales y técnicos propuestos, manteniendo una arquitectura modular y fácilmente extensible.

---

## 🚀 Stack Tecnológico
- Next.js 15 (App Router)
- tRPC v11 (cliente y servidor) + superjson (facilita el manejo de los json)
- Prisma 6 con SQLite por defecto (opcional PostgreSQL)
- Tailwind CSS 4 + shadcn/ui
- tldraw v3
- Zod para validación
- Vitest y ESLint

---

## 📂 Estructura del Proyecto (resumen)
- `app/`: UI con App Router, layouts, páginas protegidas y hooks de cliente.
- `server/`: capa de servidor con tRPC, Prisma y módulos de dominio (DDD light).
  - `trpc/routers`: routers agrupados (`user`, `notebook`, `sheet`).
  - `modules/**/domain|application|infrastructure`: entidades, casos de uso y repositorios Prisma.
  - `prisma/`: schema de la BBDD (`schema.prisma`) y generación del cliente.
- `components/`: componentes de UI (shadcn/ui y específicos de la app).
- `shared/`: validadores y utilidades compartidas (por ejemplo, con Zod).

---

## ✅ Requisitos
- Node.js 20+
- pnpm (recomendado) o npm
- SQLite (por defecto) o una URL válida para PostgreSQL/MySQL si deseas cambiar el `datasource`.

---

## ⚙️ Configuración
1) Clonar este repositorio 
3) instalar dependencias `pnpm install`
2) Variables de entorno:
   - Copia `.env.example` a `.env` y ajusta `DATABASE_URL` si lo necesitas.
   - Por defecto, se usa SQLite local: `DATABASE_URL="file:./dev.db"`.
   - `dev.db` se creará en la carpeta donde se encuentra `schemas.prisma` y además se creará una carpeta `migrations`
3) Base de datos con Prisma:
   - Generar cliente: `pnpm db:generate`
   - Inicializar/migrar: `pnpm db:migrate:init` (primera vez) o `pnpm db:migrate`
   - (Opcional) Inspeccionar DB: `pnpm db:studio`
4) Ejecutar en desarrollo:
   - `pnpm dev`
   - Abre `http://localhost:3000`
5) Build/producción:
   - `pnpm build`
   - `pnpm start`
6) Se puede hacer el despligue en un hosting gratuito tipo Vercel

---

## 🔐 Autenticación (demo)
La autenticación es deliberadamente simple para la prueba:
- Se ofrece Login y Registro con email + nombre.
- El estado del usuario se guarda en `localStorage` (no hay sesión de servidor persistida).
- Rutas bajo `app/(pages)/(protected)` requieren usuario autenticado.

Componente y hook clave:
- `app/(pages)/_contexts/AuthContext.tsx`: contexto de autenticación usando tRPC.
- `app/(pages)/_hooks/useAuth.tsx`: hook de acceso al contexto.

---

## 🧭 Rutas principales
- `/` Página pública de bienvenida.
- `/login` y `/register` para autenticación.
- `/tldraw` editor visual protegido. Integra `<Tldraw />` y una barra lateral con acciones (guardar, salir, etc.).

Layout relevante del editor:
- `app/(pages)/(protected)/tldraw/layout.tsx`: envuelve la UI del editor.

---

## 🧰 API (tRPC)
Routers definidos en `server/trpc/routers` y combinados en `_app.ts`:

- `user`:
  - `list`
  - `create`, `register`, `login`, `logout`, `edit`, `delete`, `getUser`
- `notebook`:
  - `listMine` (cuadernos del usuario), `create`, `delete`
- `sheet`:
  - `create`, `update`, `delete`, `get`

Contexto tRPC (`server/trpc/init.ts`):
- Incluye `prisma` y `userId` derivado de cookie `uid` o cabecera `x-user-id` (no imprescindible para la demo con `localStorage`).

---

## 🗃️ Datos y Prisma
- Esquema en `server/prisma/schema.prisma`.
- Por defecto, `provider = "sqlite"` y `DATABASE_URL = file:./dev.db`.
- Puedes cambiar a PostgreSQL actualizando el `provider` y la variable de entorno.

Scripts útiles (ver `package.json`):
- `db:migrate:init`, `db:migrate`, `db:generate`, `db:studio`.

---

## 🧩 UI y Editor
- Componentes con **shadcn/ui** y estilos con **Tailwind CSS**.
- Editor con **tldraw** (`app/(pages)/(protected)/tldraw/TldrawClient.tsx`).
- Barra lateral y acciones en `app/(pages)/(protected)/tldraw/_components/*`.

---

## 🧪 Calidad y Tests
- Linter: `pnpm lint`
- Tests: `pnpm test` (Vitest)

---
