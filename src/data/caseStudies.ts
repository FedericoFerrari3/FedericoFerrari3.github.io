// Case-study content, both locales. This is the presentation metadata that wraps the
// full reports (which stay English-authored, owned by F). Figures are sourced from the
// reports and the CV master — do not alter numbers here. DRY with cv/ + linkedin/ masters.
import type { Locale } from '../config';

export type CaseStudy = {
  slug: string;
  order: number;
  reportPdf: string; // path under /public
  reportHtml: string;
  tags: string[]; // language-neutral (ATS/skill keywords)
  i18n: Record<
    Locale,
    {
      title: string;
      kicker: string; // short "what it is" label
      summary: string;
      findings: string[];
      demonstrates: string[];
    }
  >;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'superfortune',
    order: 1,
    reportPdf: '/reports/report_GUA_v2_senior.pdf',
    reportHtml: '/reports/report_GUA_v2_senior.html',
    tags: [
      'Market-structure analysis',
      'Wallet clustering',
      'Manipulation detection',
      'Derivatives / open interest',
      'FATF red flags',
    ],
    i18n: {
      en: {
        title: 'Superfortune (GUA): Market-Manipulability Assessment',
        kicker: 'Market-structure and manipulation analysis',
        summary:
          'A market-manipulability assessment of a token: coordinated accumulation, synthetic liquidity, and perpetual-index fragility, assessed through behavioral wallet clustering and vesting-graph analysis.',
        findings: [
          'Assessed conditional single control of ~94% of the effective circulating supply: a proven team/investor vesting tranche plus behaviorally clustered operational wallets (criteria C1–C6). Common control is assessed as highly probable, not proven.',
          'Quantified perpetual-market fragility: ~$46.5M open interest against a few hundred thousand dollars of real spot liquidity.',
          'Documented a ~$2.62M ask wall that collapsed ~91% unfilled, evidence of synthetic depth rather than genuine liquidity.',
          'Mapped findings to FATF virtual-asset red-flag typologies with explicit evidence tiers (observed / attributed / assessed).',
        ],
        demonstrates: [
          'Reading market microstructure (liquidity, open interest, order-book depth) for manipulation risk.',
          'Behavioral wallet clustering with multiple criteria, never a single signal.',
          'Keeping fact and inference distinct under an estimative-probability standard (ICD 203).',
        ],
      },
      it: {
        title: 'Superfortune (GUA): Valutazione di Manipolabilità di Mercato',
        kicker: 'Analisi di struttura e manipolazione di mercato',
        summary:
          'Valutazione della manipolabilità di mercato di un token: accumulo coordinato, liquidità sintetica e fragilità dell’indice perpetual, valutati tramite wallet clustering comportamentale e analisi del grafo di vesting.',
        findings: [
          'Valutato un controllo unico condizionale del ~94% della supply circolante effettiva: una tranche team/investitori provata via vesting più wallet operativi clusterizzati su base comportamentale (criteri C1–C6). Il controllo comune è valutato come altamente probabile, non provato.',
          'Quantificata la fragilità del mercato perpetual: ~46,5M$ di open interest a fronte di poche centinaia di migliaia di dollari di reale liquidità spot.',
          'Documentato un muro di ask da ~2,62M$ collassato per il ~91% ineseguito, segno di profondità sintetica anziché liquidità reale.',
          'Mappati i risultati sulle tipologie di red flag FATF per i virtual asset con livelli di evidenza espliciti (osservato / attribuito / valutato).',
        ],
        demonstrates: [
          'Lettura della microstruttura di mercato (liquidità, open interest, profondità dell’order book) in chiave di rischio di manipolazione.',
          'Wallet clustering comportamentale con più criteri, mai un segnale singolo.',
          'Separazione netta di fatto e inferenza secondo uno standard di probabilità estimativa (ICD 203).',
        ],
      },
    },
  },
  {
    slug: 'eli5defi',
    order: 2,
    reportPdf: '/reports/report_eli5defi_v2_senior.pdf',
    reportHtml: '/reports/report_eli5defi_v2_senior.html',
    tags: [
      'Cross-chain tracing',
      'Wallet-drainer forensics',
      'CEX de-anonymization',
      'Time analysis',
      'Calldata decoding',
    ],
    i18n: {
      en: {
        title: 'Eli5DeFi: Wallet-Drainer and Cross-Chain Laundering',
        kicker: 'Cross-chain fund tracing and laundering investigation',
        summary:
          'A multi-victim wallet-drainer and cross-chain laundering campaign: reconstructing the laundering corridor, de-anonymizing exchange hops through time analysis, and recovering obfuscated beneficiaries from calldata.',
        findings: [
          'Reconstructed a BSC → Solana → Tron laundering corridor across the full campaign.',
          'De-anonymized centralized-exchange hot-wallet hops (HTX, KuCoin) via deposit/withdrawal time-and-amount correlation.',
          'Traced ~$345k attributable to the actor cluster and recovered obfuscated beneficiaries by decoding 1inch limit-order calldata.',
          'Surfaced additional victims by re-applying time analysis from the Tron consolidation layer.',
        ],
        demonstrates: [
          'Cross-chain fund tracing through bridges and multiple ecosystems.',
          'De-anonymizing CEX hops with time-and-amount correlation where on-chain links break.',
          'Decoding transaction calldata (1inch limit orders) to recover hidden beneficiaries.',
        ],
      },
      it: {
        title: 'Eli5DeFi: Wallet-Drainer e Riciclaggio Cross-Chain',
        kicker: 'Cross-chain fund tracing e indagine sul riciclaggio',
        summary:
          'Campagna di wallet-drainer multi-vittima e riciclaggio cross-chain: ricostruzione del corridoio di riciclaggio, de-anonimizzazione degli hop su exchange tramite time analysis e recupero dei beneficiari offuscati dalla calldata.',
        findings: [
          'Ricostruito un corridoio di riciclaggio BSC → Solana → Tron lungo l’intera campagna.',
          'De-anonimizzati gli hop su hot wallet di exchange centralizzati (HTX, KuCoin) tramite correlazione tempo-importo di depositi e prelievi.',
          'Tracciati ~345k$ attribuibili al cluster dell’attore e recuperati i beneficiari offuscati decodificando la calldata dei limit order 1inch.',
          'Individuate ulteriori vittime riapplicando la time analysis dal layer di consolidamento su Tron.',
        ],
        demonstrates: [
          'Cross-chain fund tracing attraverso bridge ed ecosistemi diversi.',
          'De-anonimizzazione degli hop su CEX con correlazione tempo-importo dove i link on-chain si interrompono.',
          'Decodifica della calldata (limit order 1inch) per recuperare i beneficiari nascosti.',
        ],
      },
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export const sortedCaseStudies = [...caseStudies].sort((a, b) => a.order - b.order);
