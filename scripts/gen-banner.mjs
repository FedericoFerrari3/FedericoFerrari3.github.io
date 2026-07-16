// LinkedIn banner generator (1584x396) for the portfolio.
// Renders an on-brand "entity network" cover in the CURRENT "Signal" theme
// (dark bg, teal accent) - the visual language of on-chain investigation
// (an organic wallet/entity network with a traced fund-flow path), instead
// of a text billboard. Screenshots via system Chrome. Run: `npm run banner`.
//
// Output goes to ../../linkedin/ (LinkedIn assets, uploaded by hand - not
// served by the site, not committed to the port repo).
//
// Two variants: a clean network, and one with a discreet mono wordmark.
// Style rule (house): no em dashes in copy.

import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdirSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, '../../linkedin');
const CHROME = process.env.CHROME_PATH || '/usr/bin/google-chrome-stable';

const W = 1584;
const H = 396;

// Theme tokens (brighter mix for a livelier cover).
const C = {
  bg: '#0b1210',
  text: '#eaf1ee',
  nodeMuted: '#93b4ad',
  accent: '#3bb3a3',
  accentStrong: '#5fd0c0',
  accentBright: '#7ee4d5',
};

// Deterministic PRNG so the layout is reproducible.
function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildGraph() {
  const rand = mulberry32(20260714);
  const nodes = [];

  // Organic blue-noise scatter: random darts, rejected if too close to an
  // existing node. Reads as a real network, not a hand-placed arc.
  const minDist = 74;
  const target = 74;
  let attempts = 0;
  while (nodes.length < target && attempts < 9000) {
    attempts++;
    const x = 48 + rand() * (W - 96);
    const y = 34 + rand() * (H - 60);
    let ok = true;
    for (const n of nodes) {
      const dx = n.x - x;
      const dy = n.y - y;
      if (dx * dx + dy * dy < minDist * minDist) {
        ok = false;
        break;
      }
    }
    if (ok) nodes.push({ x, y });
  }

  nodes.forEach((n) => {
    n.r = 2.4 + rand() * 3.6;
    n.teal = rand() < 0.46;
    n.kind = 'sat';
  });

  // Edges: connect each node to its nearest neighbours within range (straight
  // lines) -> a mesh, no curves.
  const edgeSet = new Set();
  const edges = [];
  const maxD2 = 205 * 205;
  nodes.forEach((n, i) => {
    const d = nodes
      .map((m, j) => ({ j, dist: (m.x - n.x) ** 2 + (m.y - n.y) ** 2 }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.dist - b.dist);
    const kk = 2 + (rand() < 0.5 ? 1 : 0);
    for (let t = 0; t < kk && t < d.length; t++) {
      if (d[t].dist > maxD2) continue;
      const j = d[t].j;
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (edgeSet.has(key)) continue;
      edgeSet.add(key);
      edges.push({ a: i, b: j });
    }
  });

  // Traced fund-flow path: greedy rightward walk across the network.
  let startIdx = 0;
  nodes.forEach((n, idx) => {
    if (n.x < nodes[startIdx].x) startIdx = idx;
  });
  const path = [startIdx];
  const visited = new Set([startIdx]);
  let cur = startIdx;
  for (let step = 0; step < 8; step++) {
    const c = nodes[cur];
    let best = -1;
    let bestScore = Infinity;
    nodes.forEach((m, j) => {
      if (visited.has(j)) return;
      if (m.x <= c.x - 8) return; // must progress right
      const dx = m.x - c.x;
      const dy = m.y - c.y;
      const score = Math.sqrt(dx * dx + dy * dy) + Math.abs(dy) * 0.7;
      if (score < bestScore) {
        bestScore = score;
        best = j;
      }
    });
    if (best < 0) break;
    path.push(best);
    visited.add(best);
    cur = best;
  }

  // Promote path nodes to bright hubs.
  path.forEach((idx) => {
    nodes[idx].kind = 'hub';
    nodes[idx].r = 6.5 + rand() * 2.5;
    nodes[idx].teal = true;
  });

  return { nodes, edges, path };
}

function svg(showWordmark) {
  const { nodes, edges, path } = buildGraph();

  const baseEdges = edges
    .map((e) => {
      const a = nodes[e.a];
      const b = nodes[e.b];
      const bothTeal = a.teal && b.teal;
      const stroke = bothTeal ? C.accentStrong : C.nodeMuted;
      const op = bothTeal ? 0.42 : 0.24;
      const w = bothTeal ? 1.3 : 1;
      return `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" stroke="${stroke}" stroke-width="${w}" opacity="${op}"/>`;
    })
    .join('');

  let tracePaths = '';
  let flowDots = '';
  for (let i = 0; i < path.length - 1; i++) {
    const a = nodes[path[i]];
    const b = nodes[path[i + 1]];
    tracePaths += `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" stroke="url(#flow)" stroke-width="2.8" opacity="0.98" filter="url(#glow)"/>`;
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    flowDots += `<circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="2.8" fill="${C.accentBright}" filter="url(#glow)"/>`;
  }

  const nodeEls = nodes
    .map((n) => {
      if (n.kind === 'hub') {
        return (
          `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="${n.r.toFixed(1)}" fill="${C.bg}" stroke="${C.accentBright}" stroke-width="2.2" filter="url(#glow)"/>` +
          `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="${(n.r * 0.4).toFixed(1)}" fill="${C.accentBright}"/>`
        );
      }
      const fill = n.teal ? C.accentStrong : C.nodeMuted;
      const op = n.teal ? 0.96 : 0.62;
      const glow = n.teal ? ' filter="url(#glow)"' : '';
      return `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="${n.r.toFixed(1)}" fill="${fill}" opacity="${op}"${glow}/>`;
    })
    .join('');

  const wordmark = showWordmark
    ? `<g font-family="'IBM Plex Mono', monospace">
         <text x="70" y="150" fill="${C.text}" font-size="30" font-weight="600" letter-spacing="1.5">Federico Ferrari</text>
         <text x="72" y="182" fill="${C.accentBright}" font-size="15" font-weight="500" letter-spacing="3">ON-CHAIN INVESTIGATOR</text>
       </g>`
    : '';

  const scrim = showWordmark
    ? `<rect x="0" y="0" width="600" height="${H}" fill="url(#scrim)"/>`
    : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="bgGlow" cx="74%" cy="6%" r="66%">
      <stop offset="0%" stop-color="${C.accent}" stop-opacity="0.30"/>
      <stop offset="60%" stop-color="${C.accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bgGlow2" cx="24%" cy="108%" r="60%">
      <stop offset="0%" stop-color="${C.accentStrong}" stop-opacity="0.20"/>
      <stop offset="70%" stop-color="${C.accentStrong}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bgGlow3" cx="52%" cy="46%" r="55%">
      <stop offset="0%" stop-color="${C.accent}" stop-opacity="0.10"/>
      <stop offset="70%" stop-color="${C.accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="flow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${C.accentStrong}"/>
      <stop offset="100%" stop-color="${C.accentBright}"/>
    </linearGradient>
    <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${C.bg}" stop-opacity="0.82"/>
      <stop offset="100%" stop-color="${C.bg}" stop-opacity="0"/>
    </linearGradient>
    <filter id="glow" x="-70%" y="-70%" width="240%" height="240%">
      <feGaussianBlur stdDeviation="3.4" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="${C.bg}"/>
  <rect width="${W}" height="${H}" fill="url(#bgGlow)"/>
  <rect width="${W}" height="${H}" fill="url(#bgGlow2)"/>
  <rect width="${W}" height="${H}" fill="url(#bgGlow3)"/>
  <rect x="0" y="0" width="${W}" height="4" fill="url(#flow)" opacity="0.95"/>
  <g>${baseEdges}</g>
  <g>${tracePaths}</g>
  <g>${nodeEls}</g>
  <g>${flowDots}</g>
  ${scrim}
  ${wordmark}
</svg>`;
}

function html(showWordmark) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap">
<style>*{margin:0;padding:0}html,body{width:${W}px;height:${H}px;background:${C.bg}}</style>
</head><body>${svg(showWordmark)}</body></html>`;
}

const VARIANTS = [
  { file: 'linkedin-banner-clean.png', wordmark: false },
  { file: 'linkedin-banner.png', wordmark: true },
];

const run = async () => {
  mkdirSync(OUT_DIR, { recursive: true });
  const only = process.argv.slice(2);
  const variants = only.length ? VARIANTS.filter((v) => only.includes(v.file)) : VARIANTS;
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars', '--force-color-profile=srgb'],
  });
  try {
    for (const v of variants) {
      const page = await browser.newPage();
      await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 });
      await page.setContent(html(v.wordmark), { waitUntil: 'networkidle0' });
      await page.evaluateHandle('document.fonts.ready');
      await new Promise((r) => setTimeout(r, 350));
      const out = resolve(OUT_DIR, v.file);
      await page.screenshot({ path: out, type: 'png', clip: { x: 0, y: 0, width: W, height: H } });
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
