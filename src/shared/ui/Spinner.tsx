import styled, { keyframes } from 'styled-components';
import { cn, useI18n } from '@/shared/lib';

interface SpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border: 2px solid currentColor;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.75s linear infinite;
`;

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
} as const;

export function Spinner({ className, size = 'md', label }: SpinnerProps) {
  const { t } = useI18n();
  const ariaLabel = label ?? t('spinner.loading');

  return (
    <StyledSpinner
      $size={sizeMap[size]}
      className={cn(className)}
      aria-label={ariaLabel}
      role="status"
    />
  );
}
