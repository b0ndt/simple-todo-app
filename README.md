# simple-todo-app

A simple, single-screen todo app built with React + TypeScript + Vite.

## Features

- Add todos (ignores empty/whitespace-only input)
- View empty and populated list states
- Mark todos complete/incomplete
- Delete todos
- Local persistence with `localStorage`
- Loading and error handling states for data read/write
- Client-side routing (`/`, `/todos`, fallback `*`)

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS (design tokens from `design-system/`)
- React Router
- Lucide React icons

## Project Structure

```txt
design-system/           # shared UI components and theme tokens
docs/                    # requirements/architecture/design docs
public/assets/           # pre-generated PNG assets
screens/                 # screen-level UI components
src/
  hooks/                 # state and orchestration hooks
  lib/todos/             # data fetching/persistence adapter
  types/                 # app types
```

## Getting Started

```bash
npm install
npm run dev
```

Open the app at `http://localhost:5173`.

## Scripts

- `npm run dev` — start local development server
- `npm run build` — typecheck and create production build
- `npm run preview` — preview production build locally
- `npm run typecheck` — run TypeScript checks

## Environment Variables / API Keys

No environment variables or API keys are required by architecture (`docs/architecture/00-system-overview.md`).

## Deployment (Vercel)

`vercel.json` is configured with an SPA rewrite so client routes resolve correctly:

- `/(.*)` → `/index.html`

Build command: `npm run build`  
Output directory: `dist`
