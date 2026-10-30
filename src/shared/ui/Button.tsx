import styled from 'styled-components';
import { cn } from '@/shared/lib';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  isLoading?: boolean;
}

/**
 * Base button component.
 * Layout/spacing uses Tailwind utilities; dynamic variant/size styles
 * and hover states are handled by styled-components so they can read theme tokens.
 */
const StyledButton = styled.button<{ $variant: ButtonVariant; $size: ButtonSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  border-radius: ${({ theme }) => theme.radii.md};
  transition: transform 150ms ease, box-shadow 150ms ease, background-color 150ms ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Variant styles */
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'primary':
        return `
          background-color: ${theme.colors.primary};
          color: ${theme.colors.text};
          box-shadow: ${theme.shadows.sm};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryHover};
            box-shadow: ${theme.shadows.md};
          }
        `;
      case 'secondary':
        return `
          background-color: ${theme.colors.surface};
          color: ${theme.colors.text};
          border: 1px solid ${theme.colors.border};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.background};
          }
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: ${theme.colors.muted};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.input};
            color: ${theme.colors.text};
          }
        `;
    }
  }}

  /* Size styles */
  ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return 'height: 2rem; padding: 0 0.75rem; font-size: 0.875rem;';
      case 'md':
        return 'height: 2.5rem; padding: 0 1rem; font-size: 0.875rem;';
      case 'lg':
        return 'height: 3rem; padding: 0 1.5rem; font-size: 1rem;';
    }
  }}
`;

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  isLoading,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      className={cn(className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {children}
    </StyledButton>
  );
}
