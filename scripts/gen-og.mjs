// Open Graph image generator (1200x630) for the portfolio.
// Renders on-brand social cards with the CURRENT "Signal" theme (teal accent,
// Schibsted Grotesk / IBM Plex Mono) and the correct live domain, then screenshots
// them to public/og/ via the system Chrome. Run: `npm run og`.
//
// One default/home card + one per case study. Copy is mirrored from src/i18n/ui.ts
// (home.*) and src/data/caseStudies.ts (title/kicker/summary) - keep in sync by hand
// if those change (this is a one-off asset generator, not part of the build).
//
// Style rule (house): no em dashes in copy.

import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, '../public/og');
const CHROME = process.env.CHROME_PATH || '/usr/bin/google-chrome-stable';
const DOMAIN = 'federicoferrari3.github.io';

// Theme tokens copied from src/styles/global.css [data-brand="c"][data-theme="dark"].
const C = {
  bg: '#0a0f0e',
  text: '#eaf1ee',
  muted: '#8b9792',
  faint: '#626d68',
  border: '#1f2b27',
  accent: '#3bb3a3',
  accentStrong: '#58c6b8',
  accentSoft: 'rgba(59,179,163,0.14)',
};

const esc = (s) =>
  String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

/** @typedef {{file:string, variant:'home'|'case', kicker:string, topRight:string,
 * title:string, subtitle:string, body:string, tags?:string[]}} Card */

/** @type {Card[]} */
const CARDS = [
  {
    file: 'og-image.png', // default / homepage card (also the site-wide fallback)
    variant: 'home',
    kicker: 'Blockchain Analyst & On-Chain Investigator',
    topRight: 'Milan, Italy',
    title: 'Federico Ferrari',
    subtitle: 'I analyze on-chain data and reconstruct the flows behind it.',
    body: 'Wallet clustering, fund-flow reconstruction and market analysis, for investigations and compliance, investment research, risk and market surveillance.',
  },
  {
    file: 'og-superfortune.png',
    variant: 'case',
    kicker: 'Case Study',
    topRight: 'Federico Ferrari',
    title: 'Superfortune (GUA): Market-Manipulability Assessment',
    subtitle: 'Market-structure and manipulation analysis',
    body: 'Coordinated accumulation, synthetic liquidity and perpetual-index fragility, assessed through behavioral wallet clustering and vesting-graph analysis.',
    tags: ['Wallet clustering', 'Manipulation detection', 'FATF red flags'],
  },
  {
    file: 'og-eli5defi.png',
    variant: 'case',
    kicker: 'Case Study',
    topRight: 'Federico Ferrari',
    title: 'Eli5DeFi: Wallet-Drainer and Cross-Chain Laundering',
    subtitle: 'Cross-chain fund tracing and laundering investigation',
    body: 'Reconstructing a BSC → Solana → Tron laundering corridor, de-anonymizing exchange hops through time analysis, and recovering obfuscated beneficiaries from calldata.',
    tags: ['Cross-chain tracing', 'CEX de-anonymization', 'Calldata decoding'],
  },
];

/** @param {Card} card */
function html(card) {
  const isHome = card.variant === 'home';
  const titleSize = isHome ? 104 : 62;
  const subSize = isHome ? 37 : 31;
  const bodySize = isHome ? 27 : 26;
  const pills = (card.tags || [])
    .map((t) => `<span class="pill">${esc(t)}</span>`)
    .join('');

  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Schibsted+Grotesk:wght@400;500;600;700;800&display=swap">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:1200px; height:630px; }
  body {
    background:${C.bg};
    color:${C.text};
    font-family:"Schibsted Grotesk", sans-serif;
    -webkit-font-smoothing:antialiased;
    position:relative; overflow:hidden;
  }
  .glow {
    position:absolute; inset:0;
    background:radial-gradient(900px 620px at 88% -14%, ${C.accentSoft}, transparent 60%);
  }
  .bar {
    position:absolute; top:0; left:0; right:0; height:6px;
    background:linear-gradient(90deg, ${C.accent} 0%, ${C.accentStrong} 42%, transparent 88%);
  }
  .frame {
    position:relative; width:100%; height:100%;
    padding:74px 80px; display:flex; flex-direction:column;
  }
  .top { display:flex; justify-content:space-between; align-items:flex-start; }
  .mono {
    font-family:"IBM Plex Mono", monospace; font-weight:600;
    text-transform:uppercase; letter-spacing:0.16em; font-size:20px;
  }
  .kicker { color:${C.accentStrong}; display:flex; align-items:center; gap:16px; }
  .kicker::before {
    content:""; width:34px; height:2px; background:${C.accent}; border-radius:2px;
  }
  .loc { color:${C.muted}; letter-spacing:0.14em; }
  .mid { flex:1; display:flex; flex-direction:column; justify-content:center; }
  h1 {
    font-weight:800; font-size:${titleSize}px; line-height:1.04;
    letter-spacing:-0.02em; color:${C.text}; max-width:1000px;
  }
  .sub {
    margin-top:28px; font-weight:600; font-size:${subSize}px; line-height:1.25;
    color:${C.accentStrong}; max-width:960px;
  }
  .body {
    margin-top:22px; font-weight:400; font-size:${bodySize}px; line-height:1.42;
    color:${C.muted}; max-width:1000px;
  }
  .pills { margin-top:30px; display:flex; gap:14px; flex-wrap:wrap; }
  .pill {
    font-family:"IBM Plex Mono", monospace; font-weight:500; font-size:19px;
    letter-spacing:0.02em; color:#b6c2bd;
    padding:9px 16px; border:1px solid ${C.border}; border-radius:8px;
    background:rgba(59,179,163,0.06);
  }
  .bot { display:flex; justify-content:space-between; align-items:baseline; }
  .domain {
    font-family:"IBM Plex Mono", monospace; font-weight:500; font-size:23px;
    letter-spacing:0.02em; color:${C.faint};
  }
  .domain b { color:${C.accentStrong}; font-weight:600; }
</style></head>
<body>
  <div class="glow"></div>
  <div class="bar"></div>
  <div class="frame">
    <div class="top">
      <div class="mono kicker">${esc(card.kicker)}</div>
      <div class="mono loc">${esc(card.topRight)}</div>
    </div>
    <div class="mid">
      <h1>${esc(card.title)}</h1>
      <div class="sub">${esc(card.subtitle)}</div>
      <div class="body">${esc(card.body)}</div>
      ${pills ? `<div class="pills">${pills}</div>` : ''}
    </div>
    <div class="bot">
      <div class="domain"><b>${DOMAIN}</b></div>
    </div>
  </div>
</body></html>`;
}

const run = async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--hide-scrollbars',
      '--force-color-profile=srgb',
    ],
  });
  try {
    for (const card of CARDS) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
      await page.setContent(html(card), { waitUntil: 'networkidle0' });
      await page.evaluateHandle('document.fonts.ready');
      await new Promise((r) => setTimeout(r, 350));
      const out = resolve(OUT_DIR, card.file);
      await page.screenshot({ path: out, type: 'png', clip: { x: 0, y: 0, width: 1200, height: 630 } });
      console.log('wrote', out);
      await page.close();
    }
  } finally {
    await browser.close();
  }
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
