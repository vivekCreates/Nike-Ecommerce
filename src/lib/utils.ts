import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const firstLetterOfName = (str: string) => {
  return str.charAt(0).toUpperCase();
}