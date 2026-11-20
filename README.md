# Поиск земельных участков

Одностраничное приложение для поиска земельных участков через чат на естественном языке.

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

В чат можно написать обычным текстом, какой участок вы ищете. BFF передаёт текст в agent-searcher; ответ агента отображается в чате, а карточки и карта обновляются только если сервис выполнил поиск. Если агенту нужно уточнение, предыдущие результаты выдачи сохраняются.

Для локальной разработки запустите land-index на порту 8002 и agent-searcher на порту 8005, затем BFF на порту 3000 и фронтенд через npm run dev. По умолчанию BFF обращается к http://localhost:8005; Vite проксирует /api в NestJS.

Для Docker сначала запустите неизменённые стеки land-index и agent-searcher из их каталогов. Затем из каталога search выполните docker compose up --build. BFF подключается к сетям land-index_default и agent-searcher_default и читает настройки из `../land-search-bff/.env`. Для двух тестовых карточек задайте `BFF_SEARCH_MOCK=true`, для запросов в agent-searcher — `BFF_SEARCH_MOCK=false`. После изменения значения пересоздайте BFF: `docker compose up -d --build land-search-bff`. Фронтенд откроется по адресу http://localhost:8080/search/, а BFF — по адресу http://localhost:3000.
