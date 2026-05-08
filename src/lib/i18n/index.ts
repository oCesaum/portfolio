import { pt, type Dictionary } from "./dictionaries/pt";
import { en } from "./dictionaries/en";

export type Locale = "pt" | "en";
export const locales: Locale[] = ["pt", "en"];
export const defaultLocale: Locale = "pt";

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function getLangAttr(locale: Locale): string {
  return locale === "pt" ? "pt-BR" : "en";
}

export type { Dictionary };
