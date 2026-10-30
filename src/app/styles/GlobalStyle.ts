import { createGlobalStyle } from 'styled-components';

/**
 * Global base styles beyond Tailwind's preflight.
 * Font smoothing and a stable box-sizing baseline.
 */
export const GlobalStyle = createGlobalStyle`
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    min-height: 100vh;
    background-color: var(--color-background);
    color: var(--color-text);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Helvetica Neue', Arial, sans-serif;
  }

  #root {
    min-height: 100vh;
  }

  /* Focus-visible outline using theme tokens */
  :focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  /* Reduced motion preference is respected by motion library by default,
     but we also disable custom CSS transitions for accessibility. */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
