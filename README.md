# 🧪 Technical Test -- Mini Editor with tldraw

This repository contains the project developed for the technical test.
It's a web application that integrates a visual editor with
[tldraw](https://tldraw.com/), a lightweight backend using **tRPC** +
**Prisma**, and a frontend built with **Next.js**, **Tailwind CSS**, and
**shadcn/ui**.

The goal is to cover the proposed functional and technical requirements
while maintaining a modular and easily extensible architecture.

> [!NOTE]  
> After the delivery, I fixed an issue with the button to edit shapes in the `feature/add-button-edit-shapes` branch. The result can be seen here: [technical-test-v-git-feature-add-button](https://technical-test-v-git-feature-add-button-c98ae3-franegs-projects.vercel.app/tldraw)

------------------------------------------------------------------------

## 🚀 Tech Stack

-   Next.js 15 (App Router)\
-   tRPC v11 (client and server) + superjson (simplifies JSON handling)\
-   Prisma 6 with SQLite by default (optional PostgreSQL)\
-   Tailwind CSS 4 + shadcn/ui\
-   tldraw v3\
-   Zod for validation\
-   Vitest and ESLint

------------------------------------------------------------------------

## 📂 Project Structure (summary)

-   `app/`: UI with App Router, layouts, protected pages, and client
    hooks.\
-   `server/`: server layer with tRPC, Prisma, and domain modules (light
    DDD).
    -   `trpc/routers`: grouped routers (`user`, `notebook`, `sheet`).\
    -   `modules/**/domain|application|infrastructure`: entities, use
        cases, and Prisma repositories.\
    -   `prisma/`: DB schema (`schema.prisma`) and client generation.\
-   `components/`: UI components (shadcn/ui and app-specific).\
-   `shared/`: shared validators and utilities (e.g., with Zod).

------------------------------------------------------------------------

## ✅ Requirements

-   Node.js 20+\
-   pnpm (recommended) or npm\
-   SQLite (default) or a valid PostgreSQL/MySQL URL if you want to
    change the `datasource`.

------------------------------------------------------------------------

## ⚙️ Setup

1.  Clone this repository\
2.  Install dependencies: `pnpm install`\
3.  Environment variables:
    -   Copy `.env.example` to `.env` and adjust `DATABASE_URL` if
        needed.\
    -   By default, local SQLite is used:
        `DATABASE_URL="file:./dev.db"`.\
    -   `dev.db` will be created in the folder where `schemas.prisma` is
        located, along with a `migrations` folder.\
4.  Database with Prisma:
    -   Generate client: `pnpm db:generate`\
    -   Initialize/migrate: `pnpm db:migrate:init` (first time) or
        `pnpm db:migrate`\
    -   (Optional) Inspect DB: `pnpm db:studio`\
5.  Run in development:
    -   `pnpm dev`\
    -   Open `http://localhost:3000`\
6.  Build/production:
    -   `pnpm build`\
    -   `pnpm start`\
7.  You can deploy on a free hosting service such as Vercel.

------------------------------------------------------------------------

## 🔐 Authentication (demo)

Authentication is deliberately simple for this test:\
- Login and Register with email + name.\
- User state is stored in `localStorage` (no persistent server
session).\
- Routes under `app/(pages)/(protected)` require an authenticated user.

Key component and hook:\
- `app/(pages)/_contexts/AuthContext.tsx`: authentication context using
tRPC.\
- `app/(pages)/_hooks/useAuth.tsx`: hook for accessing the context.

------------------------------------------------------------------------

## 🧭 Main Routes

-   `/` Public welcome page.\
-   `/login` and `/register` for authentication.\
-   `/tldraw` protected visual editor. Integrates `<Tldraw />` and a
    sidebar with actions (save, exit, etc.).

Relevant editor layout:\
- `app/(pages)/(protected)/tldraw/layout.tsx`: wraps the editor UI.

------------------------------------------------------------------------

## 🧰 API (tRPC)

Routers are defined in `server/trpc/routers` and combined in `_app.ts`:

-   `user`:
    -   `list`\
    -   `create`, `register`, `login`, `logout`, `edit`, `delete`,
        `getUser`\
-   `notebook`:
    -   `listMine` (user's notebooks), `create`, `delete`\
-   `sheet`:
    -   `create`, `update`, `delete`, `get`

tRPC context (`server/trpc/init.ts`):\
- Includes `prisma` and `userId` derived from `uid` cookie or
`x-user-id` header (not required for the demo with `localStorage`).

------------------------------------------------------------------------

## 🗃️ Data and Prisma

-   Schema in `server/prisma/schema.prisma`.\
-   By default, `provider = "sqlite"` and
    `DATABASE_URL = file:./dev.db`.\
-   You can switch to PostgreSQL by updating the `provider` and
    environment variable.

Useful scripts (see `package.json`):\
- `db:migrate:init`, `db:migrate`, `db:generate`, `db:studio`.

------------------------------------------------------------------------

## 🧩 UI and Editor

-   Components built with **shadcn/ui** and styled with **Tailwind
    CSS**.\
-   Editor powered by **tldraw**
    (`app/(pages)/(protected)/tldraw/TldrawClient.tsx`).\
-   Sidebar and actions in
    `app/(pages)/(protected)/tldraw/_components/*`.

------------------------------------------------------------------------

## 🧪 Quality and Tests

-   Linter: `pnpm lint`\
-   Tests: `pnpm test` (Vitest)

------------------------------------------------------------------------
