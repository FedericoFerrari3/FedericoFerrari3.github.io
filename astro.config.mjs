// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site URL assumes the repo is named `<handle>.github.io`, so the site serves at the
// domain root (base '/') — no Astro base-path juggling. If F registers a different handle,
// change SITE_HANDLE in src/config.ts AND the `site` value below, then rebuild.
export default defineConfig({
  site: 'https://federicoferrari3.github.io',
  base: '/',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', it: 'it' },
      },
    }),
  ],
});
