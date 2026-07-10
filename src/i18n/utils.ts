import { LOCALES, DEFAULT_LOCALE, type Locale } from '../config';

/** Locale from a pathname like '/en/work' -> 'en' (falls back to default). */
export function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split('/').filter(Boolean)[0];
  return (LOCALES.includes(seg as Locale) ? (seg as Locale) : DEFAULT_LOCALE);
}

/** Prefix a locale-relative path ('/', '/work', '/work/x') with the locale. */
export function localizePath(path: string, locale: Locale): string {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  return `/${locale}${clean}`;
}

/** Same page, other locale. '/en/work/x' -> '/it/work/x'. */
export function switchLocalePath(pathname: string, to: Locale): string {
  const parts = pathname.split('/').filter(Boolean);
  if (LOCALES.includes(parts[0] as Locale)) parts[0] = to;
  else parts.unshift(to);
  return '/' + parts.join('/');
}

export const otherLocale = (l: Locale): Locale => (l === 'en' ? 'it' : 'en');

/** True when `path` (locale-relative, e.g. '/work') matches the current pathname. */
export function isActive(pathname: string, localeRelative: string, locale: Locale): boolean {
  const target = localizePath(localeRelative, locale).replace(/\/$/, '');
  const current = pathname.replace(/\/$/, '');
  if (localeRelative === '/') return current === target;
  return current === target || current.startsWith(target + '/');
}
