# Поиск земельных участков

Одностраничное приложение для поиска земельных участков путём отправки JSON-фильтров через чат-интерфейс.

## Стек

- React 18 + TypeScript
- Vite
- Tailwind CSS v4 (`@tailwindcss/vite`)
- styled-components
- react-router-dom
- zustand
- react-hook-form + zod
- lucide-react
- motion (установлен, готов к использованию для анимаций)

## Архитектура

Проект следует методологии Feature-Sliced Design v2.1 с шестью слоями (без `processes`):

```
app → pages → widgets → features → entities → shared
```

- Только импорты сверху вниз.
- Слайсы предоставляют публичный API через `index.ts`.
- Сегменты: `ui`, `model`, `lib`, `api`, `config`.
- `app` и `shared` — это слайсы уровня слоя без под-слайсов.
- `pages` тонкие и композируют виджеты.

## Структура проекта

```
search/
├── public/
├── src/
│   ├── app/                 # провайдеры, стили, маршруты, App, main
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

## Доступные скрипты

```bash
npm install      # установить зависимости
npm run dev      # запустить Vite dev-сервер
npm run build    # production-сборка
npm run preview  # предпросмотр production-сборки
npm run lint     # запустить ESLint
```

## Начало работы

```bash
npm install
npm run dev
```

Откройте http://localhost:5173/search/ в браузере.

Используйте любой email и пароль длиной не менее 6 символов для входа.

## API и Docker

Чат принимает полное JSON-тело для POST /api/search. Например, вставьте объект с полем `filter` и необязательными полями `limit`, `offset` и `matches_limit`. Тело пересылается в land-index, а ответ отображается в виде карточек объявлений.

Для локальной разработки запустите land-index на порту 8002, запустите BFF на порту 3000, затем выполните `npm run dev`. Vite проксирует запросы `/api` в NestJS.

Для Docker сначала запустите неизменённый стек land-index из его каталога проекта командой `docker compose up --build -d`. Затем из каталога текущего проекта выполните `docker compose up --build`. Фронтенд откроется по адресу http://localhost:8080/search/, а BFF — по адресу http://localhost:3000. Compose ожидает наличие Docker-сети `land-index_default`, созданной существующим Compose-проектом land-index.