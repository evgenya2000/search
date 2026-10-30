export type Language = 'en' | 'ru';

export const defaultLanguage: Language = 'en';

export const supportedLanguages: Language[] = ['en', 'ru'];

export const languageNames: Record<Language, string> = {
  en: 'English',
  ru: 'Русский',
};

type TranslationValue = string | { [key: string]: TranslationValue };

type TranslationTree = { [key: string]: TranslationValue };

export const translations: Record<Language, TranslationTree> = {
  en: {
    app: {
      name: 'LandSearch',
    },
    login: {
      title: 'Welcome back',
      subtitle: 'Sign in to find your perfect land plot',
      email: 'Email',
      password: 'Password',
      submit: 'Sign in',
      errors: {
        emailRequired: 'Email is required',
        emailInvalid: 'Enter a valid email',
        passwordMin: 'Password must be at least 6 characters',
      },
    },
    sidebar: {
      chat: 'Chat',
      logout: 'Sign out',
      expand: 'Expand sidebar',
      collapse: 'Collapse sidebar',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    chat: {
      emptyState: 'Start a conversation to find the best land plots.',
      placeholder: 'Describe the land plot you are looking for...',
      send: 'Send message',
      loading: 'Loading',
    },
    listings: {
      title: 'Recommended plots',
      empty: 'No plots found yet. Start a conversation above.',
      area: '{{area}} acres',
      status: {
        available: 'Available',
        reserved: 'Reserved',
        sold: 'Sold',
      },
    },
    listingDetail: {
      loading: 'Loading listing…',
      notFound: 'Listing not found',
      notFoundDescription: 'The requested listing could not be found.',
      back: 'Go back',
      goToSearch: 'Go to search',
      description: 'Description',
      documents: 'Attached documents',
      noDocuments: 'No documents attached.',
      contactSeller: 'Contact seller',
      emailSeller: 'Email seller',
    },
    spinner: {
      loading: 'Loading',
    },
    language: {
      title: 'Language',
    },
  },
  ru: {
    app: {
      name: 'Поиск участков',
    },
    login: {
      title: 'С возвращением',
      subtitle: 'Войдите, чтобы найти идеальный земельный участок',
      email: 'Email',
      password: 'Пароль',
      submit: 'Войти',
      errors: {
        emailRequired: 'Укажите email',
        emailInvalid: 'Введите корректный email',
        passwordMin: 'Пароль должен содержать не менее 6 символов',
      },
    },
    sidebar: {
      chat: 'Чат',
      logout: 'Выйти',
      expand: 'Развернуть боковую панель',
      collapse: 'Свернуть боковую панель',
      openMenu: 'Открыть меню',
      closeMenu: 'Закрыть меню',
    },
    chat: {
      emptyState: 'Начните разговор, чтобы найти лучшие земельные участки.',
      placeholder: 'Опишите земельный участок, который вы ищете...',
      send: 'Отправить сообщение',
      loading: 'Загрузка',
    },
    listings: {
      title: 'Рекомендуемые участки',
      empty: 'Пока ничего не найдено. Начните разговор выше.',
      area: '{{area}} соток',
      status: {
        available: 'Доступен',
        reserved: 'Забронирован',
        sold: 'Продан',
      },
    },
    listingDetail: {
      loading: 'Загрузка объявления…',
      notFound: 'Объявление не найдено',
      notFoundDescription: 'Запрошенное объявление не найдено.',
      back: 'Назад',
      goToSearch: 'К поиску',
      description: 'Описание',
      documents: 'Прикреплённые документы',
      noDocuments: 'Документы не прикреплены.',
      contactSeller: 'Связаться с продавцом',
      emailSeller: 'Написать продавцу',
    },
    spinner: {
      loading: 'Загрузка',
    },
    language: {
      title: 'Язык',
    },
  },
};
