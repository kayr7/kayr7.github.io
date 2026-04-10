// i18n helpers - keep small and dependency-free.

import { ui, defaultLang, type Lang } from "./ui";

/**
 * Detect the active language from the URL pathname.
 *   /            -> defaultLang ("de")
 *   /en/...      -> "en"
 *   /de/...      -> "de"
 */
export function getLangFromUrl(url: URL): Lang {
  const segment = url.pathname.split("/")[1];
  if (segment && segment in ui) {
    return segment as Lang;
  }
  return defaultLang;
}

/**
 * Returns the translation table for a language. Use as:
 *   const t = useTranslations(lang);
 *   t.nav.home
 */
export function useTranslations(lang: Lang) {
  return ui[lang];
}

/**
 * Build a path for a given language. The default language has no prefix.
 *   localizedPath("de", "/about") -> "/about"
 *   localizedPath("en", "/about") -> "/en/about"
 *   localizedPath("en", "/")      -> "/en/"
 */
export function localizedPath(lang: Lang, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === defaultLang) return clean;
  if (clean === "/") return `/${lang}/`;
  return `/${lang}${clean}`;
}

/**
 * Given the current path and a target language, build the equivalent
 * path in the other language. Used by the language switcher.
 */
export function switchLangPath(currentPath: string, targetLang: Lang): string {
  // Strip leading lang segment if present
  const segments = currentPath.split("/").filter(Boolean);
  if (segments.length > 0 && segments[0] in ui) {
    segments.shift();
  }
  const rest = "/" + segments.join("/");
  return localizedPath(targetLang, rest === "/" ? "/" : rest);
}
