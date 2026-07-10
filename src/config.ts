// Single source of truth for site-wide constants.
// To change the GitHub handle, edit SITE_HANDLE here and `site` in astro.config.mjs,
// then rebuild. Nothing else hard-codes it.
export const SITE_HANDLE = 'federicoferrari3';

export const SITE = {
  name: 'Federico Ferrari',
  handle: SITE_HANDLE,
  url: `https://${SITE_HANDLE}.github.io`,
  email: 'federicoferrari3@proton.me',
  github: `https://github.com/${SITE_HANDLE}`,
  githubLabel: `github.com/${SITE_HANDLE}`,
  // LinkedIn intentionally omitted for now (F's decision, 2026-07-08). When ready, set
  // `linkedin` to the full URL and it will surface in Contact/Footer automatically.
  linkedin: '' as string,
  location: 'Milan, Italy',
} as const;

export const LOCALES = ['en', 'it'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

// CV PDF filenames (served from /public/cv, copied from the repo's cv/ workstream).
export const CV_FILES = {
  en: '/cv/Federico-Ferrari-CV-EN.pdf',
  it: '/cv/Federico-Ferrari-CV-IT.pdf',
} as const;
