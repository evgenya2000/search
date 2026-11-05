# Land Plot Search

Single-page application for searching land plots by submitting JSON filters through a chat interface.

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

Open http://localhost:5173/search/ in the browser.

Use any email and a password of at least 6 characters to sign in.


## API and Docker

The chat accepts a complete JSON body for POST /api/search. For example, paste an object with a filter and optional limit, offset, and matches_limit fields. The body is forwarded to land-index and the response is displayed as listing cards.

For local development, run land-index on port 8002, start the BFF on port 3000, then run npm run dev. Vite proxies /api requests to NestJS.

For Docker, first start the unchanged land-index stack from its project directory with docker compose up --build -d. Then, from this project directory, run docker compose up --build. The frontend opens at http://localhost:8080/search/ and the BFF at http://localhost:3000. Compose expects the Docker network land-index_default, created by the existing land-index Compose project.
