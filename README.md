# Land Plot Search

Single-page application for searching land plots through a conversational neural-network interface.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v4 (`@tailwindcss/vite`)
- styled-components
- react-router-dom
- zustand
- react-hook-form + zod
- lucide-react
- motion (installed, ready for animations)

## Architecture

The project follows Feature-Sliced Design v2.1 with six layers (no `processes`):

```
app → pages → widgets → features → entities → shared
```

- Top-down imports only.
- Slices expose public API via `index.ts`.
- Segments: `ui`, `model`, `lib`, `api`, `config`.
- `app` and `shared` are layer-level slices without sub-slices.
- `pages` are thin and compose widgets.

## Project structure

```
search/
├── public/
├── src/
│   ├── app/                 # providers, styles, routes, App, main
│   ├── pages/               # login, chat
│   ├── widgets/             # sidebar, chat-panel, listings-grid
│   ├── features/            # auth, send-message, show-results
│   ├── entities/            # session, chat, listing
│   └── shared/              # ui-kit, lib, config
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig*.json
├── eslint.config.js
└── .prettierrc
```

## Available scripts

```bash
npm install      # install dependencies
npm run dev      # start Vite dev server
npm run build    # production build
npm run preview  # preview production build
npm run lint     # run ESLint
```

## Getting started

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173/`).

Use any email and a password of at least 6 characters to sign in.
