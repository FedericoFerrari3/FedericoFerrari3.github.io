// Build-time loader for the native report pages.
//
// Source of truth: the owner's generated report HTML, synced from `casestudy/*.html`
// (itself built from the `.md` masters) into `public/reports/` — the copies INSIDE this
// repo, so the GitHub Actions build works without access to the un-versioned repo root.
// When the owner updates a report, re-copy casestudy/*.{html,pdf} into public/reports/.
// We extract the <body> inner HTML and adapt it for the site so the full report reads as
// a native, site-themed, responsive page. We never alter wording, numbers, or addresses:
// the transforms below only re-wrap structure (tables get a scroll container, figures
// become captioned placeholders because the report-side image assets are the owner's and
// are not committed) and derive a table of contents.
//
// The HTML is inlined at build time via Vite's `?raw` glob import (path is resolved by Vite
// relative to this source file), so there is no runtime filesystem access and the bundle
// stays portable.
const reportSources = import.meta.glob('../../public/reports/*.html', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export type TocItem = { id: string; label: string };
export type RenderedReport = { html: string; toc: TocItem[]; readingMinutes: number };

/** File name (no extension) of the generated report HTML in casestudy/, per slug. */
const REPORT_FILE: Record<string, string> = {
  superfortune: 'report_GUA_v2_senior',
  eli5defi: 'report_eli5defi_v2_senior',
};

function rawFor(base: string): string {
  const key = Object.keys(reportSources).find((k) => k.endsWith(`/${base}.html`));
  if (!key) throw new Error(`Report HTML not found for "${base}.html" (looked in public/reports/)`);
  return reportSources[key];
}

function readBody(raw: string): string {
  const m = raw.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return (m ? m[1] : raw).trim();
}

/**
 * Adapt the report body for the site:
 *  - wrap every <table> in a horizontal-scroll container so wide tables never break mobile;
 *  - point figure images at the site copy of the report assets (/reports/assets/, extracted
 *    from the owner's PDFs) and lazy-load them; captions stay verbatim;
 *  - keep every heading id (used by the in-page TOC and the report's own §-cross-links).
 */
function adaptBody(body: string): string {
  let out = body;

  // Figures: the report HTML references `assets/<fig>.png` relative to itself; the site
  // serves those files at /reports/assets/. Mark the figure for styling and lazy-load.
  out = out.replace(/<figure>\s*<img\b/gi, '<figure class="report-figure"><img loading="lazy"');
  out = out.replace(/(<img\b[^>]*?\bsrc=")assets\//gi, '$1/reports/assets/');

  // Tables: wrap in a scroll container.
  out = out.replace(/<table\b/gi, '<div class="table-scroll"><table');
  out = out.replace(/<\/table>/gi, '</table></div>');

  return out;
}

/** Decode the handful of named/numeric HTML entities that appear in report headings.
 *  The TOC label is rendered as plain text (Astro re-escapes it), so entities in the
 *  source HTML must be decoded here or they show literally (e.g. "&amp;"). */
function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_m, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_m, n) => String.fromCodePoint(parseInt(n, 16)));
}

/** Extract h2[id] headings for the table of contents (top-level report sections). */
function buildToc(body: string): TocItem[] {
  const toc: TocItem[] = [];
  const re = /<h2\b[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body))) {
    const id = m[1];
    const label = decodeEntities(m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
    if (id === 'contents') continue; // the report's own inline TOC; we render our own
    toc.push({ id, label });
  }
  return toc;
}

function estimateReadingMinutes(body: string): number {
  const text = body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text ? text.split(' ').length : 0;
  return Math.max(1, Math.round(words / 220));
}

export function loadReport(slug: string): RenderedReport {
  const base = REPORT_FILE[slug];
  if (!base) throw new Error(`No report file mapping for slug "${slug}"`);
  const body = readBody(rawFor(base));
  // Drop the report's own inline "Contents" block (we render a styled TOC instead).
  // The block can hold nested <ul>s (Part I / Part II with sub-items), so cut everything
  // from the "Contents" heading up to the next <h2 (the first real section heading).
  const withoutInlineToc = body.replace(
    /<h2\b[^>]*\bid="contents"[^>]*>[\s\S]*?(?=<h2\b)/i,
    '',
  );
  return {
    html: adaptBody(withoutInlineToc),
    toc: buildToc(body),
    readingMinutes: estimateReadingMinutes(body),
  };
}
