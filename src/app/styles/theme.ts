/**
 * TypeScript theme mirror for styled-components.
 * All values reference the same CSS custom properties defined in theme.css,
 * keeping a single source of truth for design tokens.
 */
export const theme = {
  colors: {
    primary: 'var(--color-primary)',
    primaryHover: 'var(--color-primary-hover)',
    background: 'var(--color-background)',
    surface: 'var(--color-surface)',
    text: 'var(--color-text)',
    textWhite: 'var(--color-text-white)',
    muted: 'var(--color-muted)',
    border: 'var(--color-border)',
    sidebar: 'var(--color-sidebar)',
    chat: 'var(--color-chat)',
    input: 'var(--color-input)',
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    error: 'var(--color-error)',
  },
  radii: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    '2xl': 'var(--radius-2xl)',
  },
  shadows: {
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    xl: 'var(--shadow-xl)',
  },
  spacing: {
    sidebarCollapsed: 'var(--spacing-sidebar-collapsed)',
    sidebarExpanded: 'var(--spacing-sidebar-expanded)',
  },
  fontSizes: {
    xs: 'var(--font-size-xs)',
    sm: 'var(--font-size-sm)',
    base: 'var(--font-size-base)',
    lg: 'var(--font-size-lg)',
    xl: 'var(--font-size-xl)',
    '2xl': 'var(--font-size-2xl)',
    '3xl': 'var(--font-size-3xl)',
  },
} as const;

export type Theme = typeof theme;
