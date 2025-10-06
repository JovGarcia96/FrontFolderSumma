import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases Tailwind eliminando duplicados
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}