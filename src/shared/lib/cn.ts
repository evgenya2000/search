import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines clsx (conditional classes) with tailwind-merge (conflict resolution).
 * Use this helper whenever className is built conditionally.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
