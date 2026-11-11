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
        failed: 'Sign in failed. Please try again.',
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
      placeholder: 'Paste a complete search request JSON…',
      send: 'Send message',
      loading: 'Loading',
      expandMessage: 'Expand message',
      collapseMessage: 'Collapse message',
    },
    search: {
      invalidJson: 'Enter valid JSON.',
      invalidRequest: 'The JSON must be a search request object with a filter object.',
      found: 'Search complete. Found {{count}} plots.',
      failed: 'Search failed.',
    },
    listings: {
      title: 'Recommended plots',
      empty: 'No plots matched this search.',
      count: 'Found {{count}} plots',
      area: '{{area}} sotkas',
      priceUnknown: 'Price not specified',
      houseUnknown: 'House status unknown',
      withHouse: 'With a house',
      withoutHouse: 'Without a house',
      matches: 'Matched nearby objects: {{count}}',
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
      nearby: 'Nearby objects',
      noNearby: 'No nearby objects are listed.',
      showMore: 'Show more',
      showLess: 'Show less',
      originalListing: 'Open original listing',
      routeSummary: '{{minutes}} min · {{distance}} km',
      categories: { river: 'River', lake: 'Lake', forest: 'Forest', custom_object: 'Nearby place' },
      modes: { foot: 'On foot', bicycle: 'By bicycle', car: 'By car' },
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
        failed: 'Не удалось войти. Попробуйте ещё раз.',
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
      placeholder: 'Вставьте полный JSON запроса поиска…',
      send: 'Отправить сообщение',
      loading: 'Загрузка',
      expandMessage: 'Развернуть сообщение',
      collapseMessage: 'Свернуть сообщение',
    },
    search: {
      invalidJson: 'Введите корректный JSON.',
      invalidRequest: 'В JSON должен быть объект запроса поиска с объектом filter.',
      found: 'Поиск завершён. Найдено участков: {{count}}.',
      failed: 'Не удалось выполнить поиск.',
    },
    listings: {
      title: 'Рекомендуемые участки',
      empty: 'По этому запросу участки не найдены.',
      count: 'Найдено участков: {{count}}',
      area: '{{area}} соток',
      priceUnknown: 'Цена не указана',
      houseUnknown: 'Наличие дома не указано',
      withHouse: 'С домом',
      withoutHouse: 'Без дома',
      matches: 'Подходящих объектов рядом: {{count}}',
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
      nearby: 'Объекты рядом',
      noNearby: 'Связанные объекты не указаны.',
      showMore: 'Показать больше',
      showLess: 'Свернуть',
      originalListing: 'Открыть исходное объявление',
      routeSummary: '{{minutes}} мин · {{distance}} км',
      categories: { river: 'Река', lake: 'Озеро', forest: 'Лес', custom_object: 'Объект рядом' },
      modes: { foot: 'Пешком', bicycle: 'На велосипеде', car: 'На машине' },
    },
    spinner: {
      loading: 'Загрузка',
    },
    language: {
      title: 'Язык',
    },
  },
};