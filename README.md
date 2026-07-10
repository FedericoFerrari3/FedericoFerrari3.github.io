# Federico Ferrari — Portfolio

Bilingual (EN/IT) portfolio site for an independent on-chain investigator. Built with
[Astro](https://astro.build), deployed free on GitHub Pages.

Live (once deployed): **https://federicoferrari.github.io**

## Stack & structure

- **Astro** static site, no UI framework (fast, minimal JS).
- Bilingual with `/en` and `/it` routes, `hreflang` alternates, client-side language
  auto-detect + a manual toggle (choice persisted in `localStorage`).
- Content is DRY: UI strings in `src/i18n/ui.ts`, case-study data in
  `src/data/caseStudies.ts`, site constants in `src/config.ts`.

```
src/
  config.ts            site constants (name, email, GitHub handle, CV file paths)
  i18n/ui.ts           all UI copy, EN + IT (+ home stats / skills groups)
  i18n/utils.ts        locale helpers (path localization, toggle target)
  data/caseStudies.ts  case-study metadata + summaries (EN + IT)
  layouts/Base.astro   <head> (SEO/OG/hreflang), header + footer shell
  components/           Header, Footer, CaseStudyCard
  pages/
    index.astro        root: client-side language redirect
    [lang]/...          home, about, contact, cv, work index + [slug] detail
public/
  cv/                  CV PDFs (EN + IT)
  reports/             case-study report PDFs + HTML
  og/og-image.png      social preview
```

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # -> dist/
npm run preview    # serve the production build
```

## Deploy (GitHub Pages)

1. Create a **public** repo named `federicoferrari.github.io` (repo name must equal
   `<your-username>.github.io` so the site serves at the domain root).
2. Push this `port/` folder as the repo root.
3. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` builds and deploys on every push to `main`.

### Changing the GitHub handle

The handle `federicoferrari` is a placeholder. If you register a different one, change it in
**two** places, then rebuild:

- `src/config.ts` → `SITE_HANDLE`
- `astro.config.mjs` → `site`

(Also update the CV masters in `../cv/` and re-render, and the LinkedIn masters in
`../linkedin/`.)
