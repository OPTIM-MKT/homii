import es from "@/constants/es.json";
import en from "@/constants/en.json";

type Translations = typeof es;

export function useReactI18n(initialLang?: string): {
  t: Translations;
  locale: string;
} {
  const locale =
    initialLang ||
    (typeof window !== "undefined" && window.location.pathname.startsWith("/en")
      ? "en"
      : "es");

  const t: Translations = locale === "en" ? en : es;
  return { t, locale };
}