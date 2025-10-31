import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const firstLetterOfName = (str: string) => {
  return str.charAt(0).toUpperCase();
};

// Randomly pick a shoe image
export const randomShoeImage = (arr: string[]) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};