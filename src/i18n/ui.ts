// UI strings for both locales. Single source for all chrome/copy that is not case-study
// content (that lives in src/data/caseStudies.ts). Keep EN and IT in sync.
// Positioning source: strategy/JOB_TARGETING.md §1; keep DRY with CV + LinkedIn masters.
import type { Locale } from '../config';

export const languages: Record<Locale, string> = { en: 'English', it: 'Italiano' };

export const ui = {
  en: {
    'site.tagline': 'Blockchain Analyst & On-Chain Investigator',

    'nav.home': 'Home',
    'nav.work': 'Work',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.cv': 'CV',
    'nav.skipToContent': 'Skip to content',
    'theme.toggle': 'Toggle light / dark theme',

    'home.role': 'Blockchain Analyst & On-Chain Investigator',
    'home.metaDesc': 'Independent on-chain investigator. Wallet clustering, cross-chain fund tracing, and market-manipulation analysis, documented to intelligence-grade standards.',
    'home.hero': 'I analyze on-chain data and reconstruct the flows behind it.',
    'home.sub': 'Blockchain analyst and investigator working from raw on-chain data: wallet clustering, fund-flow reconstruction and market analysis, for investigations and compliance, investment research, risk and market surveillance.',
    'home.cta.work': 'View case studies',
    'home.cta.cv': 'Download CV',
    'home.cta.contact': 'Get in touch',
    'home.work.title': 'Selected work',
    'home.work.sub': 'Two published forensic case studies. Read the full reports, or see what each one demonstrates.',
    'home.what.title': 'What I do',
    'home.availability': 'Open to roles in blockchain intelligence, risk, AML and research. Remote-first, open to hybrid or relocation in Europe for the right role. Available as an employee or as an independent contractor.',

    'work.title': 'Case Studies',
    'work.sub': 'Published forensic case studies. Each links to the full report, with a short summary of what it demonstrates.',
    'work.readMore': 'Read case study',
    'work.demonstrates': 'What this demonstrates',
    'work.findings': 'Key findings',
    'work.summary': 'Summary',
    'work.report': 'Full report',
    'work.downloadPdf': 'Download PDF',
    'work.openHtml': 'Open web version',
    'work.reportEnNote': 'The full report is authored in English. Below is an Italian summary; open the report for the complete analysis.',
    'work.backToWork': 'All case studies',
    'work.embedTitle': 'Full report (embedded)',
    'work.embedFallback': 'Your browser can’t display the PDF inline. Download it or open the web version above.',
    'work.contents': 'Contents',
    'work.readTime': 'min read',
    'work.reportIntro': 'The full report below. Prefer the PDF? Download it, or open the standalone web version.',

    'about.title': 'About',
    'about.bioTitle': 'My story',
    'about.skillsTitle': 'Skills',
    'about.eduTitle': 'Education',
    'about.edu': 'BSc in Computer Systems and Networks Security (Sicurezza dei sistemi e delle reti informatiche, L-31), University of Milan, 2025.',
    'about.langTitle': 'Languages',
    'about.lang': 'Italian (native) · English (professional working proficiency).',

    'contact.title': 'Contact',
    'contact.intro': 'The fastest way to reach me is email. I am open to full-time and contract engagements, remote-first.',
    'contact.emailLabel': 'Email',
    'contact.githubLabel': 'GitHub',
    'contact.cvLabel': 'CV',
    'contact.cvValue': 'Download (PDF)',
    'contact.availability': 'Open to roles in blockchain intelligence, risk, AML and research. Remote-first, open to hybrid or relocation in Europe for the right role. Available as an employee or as an independent contractor.',

    'cv.title': 'Curriculum Vitae',
    'cv.intro': 'One page, ATS-safe. Download in English or Italian.',
    'cv.en': 'Download CV: English (PDF)',
    'cv.it': 'Scarica il CV: Italiano (PDF)',
    'cv.note': 'The English CV is the primary version for international roles; the Italian version is for Italian companies and HR.',

    'footer.built': 'Built with Astro. Source on GitHub.',
    'footer.rights': 'All rights reserved.',

    'lang.switch': 'Italiano',
  },

  it: {
    'site.tagline': 'Blockchain Analyst & On-Chain Investigator',

    'nav.home': 'Home',
    'nav.work': 'Lavori',
    'nav.about': 'Profilo',
    'nav.contact': 'Contatti',
    'nav.cv': 'CV',
    'nav.skipToContent': 'Vai al contenuto',
    'theme.toggle': 'Cambia tema chiaro / scuro',

    'home.role': 'Blockchain Analyst & On-Chain Investigator',
    'home.metaDesc': 'Investigatore on-chain indipendente. Wallet clustering, cross-chain fund tracing e analisi di manipolazione di mercato, documentati a standard di livello intelligence.',
    'home.hero': 'Analizzo dati on-chain e ricostruisco i flussi che ci stanno dietro.',
    'home.sub': 'Analista e investigatore blockchain, a partire dai dati on-chain grezzi: wallet clustering, ricostruzione dei flussi di fondi e analisi di mercato, per indagini e compliance, ricerca d’investimento, risk e market surveillance.',
    'home.cta.work': 'Vedi i case study',
    'home.cta.cv': 'Scarica il CV',
    'home.cta.contact': 'Contattami',
    'home.work.title': 'Lavori selezionati',
    'home.work.sub': 'Due case study forensi pubblicati. Leggi i report completi o scopri cosa dimostra ciascuno.',
    'home.what.title': 'Cosa faccio',
    'home.availability': 'Aperto a ruoli in blockchain intelligence, risk, AML e research. Remote-first, con apertura a ibrido o trasferimento in Europa per il ruolo giusto. Disponibile come dipendente o come contractor indipendente.',

    'work.title': 'Case Study',
    'work.sub': 'Case study forensi pubblicati. Ognuno rimanda al report completo, con una breve sintesi di cosa dimostra.',
    'work.readMore': 'Leggi il case study',
    'work.demonstrates': 'Cosa dimostra',
    'work.findings': 'Risultati chiave',
    'work.summary': 'Sintesi',
    'work.report': 'Report completo',
    'work.downloadPdf': 'Scarica il PDF',
    'work.openHtml': 'Apri la versione web',
    'work.reportEnNote': 'Il report completo è redatto in inglese. Qui sotto trovi una sintesi in italiano; apri il report per l’analisi completa.',
    'work.backToWork': 'Tutti i case study',
    'work.embedTitle': 'Report completo (incorporato)',
    'work.embedFallback': 'Il tuo browser non può mostrare il PDF qui. Scaricalo o apri la versione web qui sopra.',
    'work.contents': 'Indice',
    'work.readTime': 'min di lettura',
    'work.reportIntro': 'Il report completo qui sotto. Preferisci il PDF? Scaricalo, oppure apri la versione web autonoma.',

    'about.title': 'Profilo',
    'about.bioTitle': 'La mia storia',
    'about.skillsTitle': 'Competenze',
    'about.eduTitle': 'Formazione',
    'about.edu': 'Laurea triennale in Sicurezza dei sistemi e delle reti informatiche (L-31), Università degli Studi di Milano, 2025.',
    'about.langTitle': 'Lingue',
    'about.lang': 'Italiano (madrelingua) · Inglese (livello professionale).',

    'contact.title': 'Contatti',
    'contact.intro': 'Il modo più rapido per contattarmi è l’email. Sono disponibile per collaborazioni full-time e a contratto, remote-first.',
    'contact.emailLabel': 'Email',
    'contact.githubLabel': 'GitHub',
    'contact.cvLabel': 'CV',
    'contact.cvValue': 'Scarica (PDF)',
    'contact.availability': 'Aperto a ruoli in blockchain intelligence, risk, AML e research. Remote-first, con apertura a ibrido o trasferimento in Europa per il ruolo giusto. Disponibile come dipendente o come contractor indipendente.',

    'cv.title': 'Curriculum Vitae',
    'cv.intro': 'Una pagina, ATS-safe. Scaricalo in inglese o in italiano.',
    'cv.en': 'Download CV: English (PDF)',
    'cv.it': 'Scarica il CV: Italiano (PDF)',
    'cv.note': 'Il CV in inglese è la versione principale per i ruoli internazionali; la versione italiana è per aziende e HR italiani.',

    'footer.built': 'Realizzato con Astro. Codice su GitHub.',
    'footer.rights': 'Tutti i diritti riservati.',

    'lang.switch': 'English',
  },
} as const;

export type UIKey = keyof (typeof ui)['en'];

export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui.en[key] ?? key;
  };
}

// Home "what I do" bullets + "selected results" stats (DRY with CV/LinkedIn).
export const whatIDo: Record<Locale, string[]> = {
  en: [
    'Wallet clustering and entity attribution',
    'Cross-chain fund tracing across EVM chains, Solana and Tron',
    'Transaction monitoring and risk flagging',
    'On-chain research and data analysis',
    'Custom tooling, built with Python and AI',
  ],
  it: [
    'Wallet clustering e attribuzione di entità',
    'Cross-chain fund tracing su chain EVM, Solana e Tron',
    'Transaction monitoring e segnalazione dei rischi',
    'Ricerca on-chain e analisi dati',
    'Tooling su misura, sviluppato con Python e AI',
  ],
};

// About "My story" narrative paragraphs (portfolio-only; longer form than CV/LinkedIn).
// IT is a first draft pending F's proofread.
export const story: Record<Locale, string[]> = {
  en: [
    'I got into crypto around 2021 as an investor. I started with the mechanical side: yield farming, delta-neutral strategies, that whole world. It did not take long to see that those strategies would not move the needle at the capital I had, so I switched to direct investing, mostly in smaller, higher-risk tokens.',
    'Making that work required an edge, and the edge was never in the trade itself. It was in the information: knowing who was moving, and why, before it showed up in the price. That is when I stopped thinking of myself as a trader and started working as an on-chain analyst.',
    'The goal I set myself was simple to state and hard to do: connect public entities to the anonymous addresses behind them. Chasing that goal is how I learned the craft of wallet clustering, behavioral and time analysis, transaction monitoring and cross-chain tracing. One address at a time, it added up: over the years I have built a personal attribution dataset of more than 2,500 addresses mapped to 15+ entities.',
    'I also rely heavily on AI. Every tool and script I use day to day I built myself with large language models: the models write the code, the analysis and the judgment stay mine. The craft is the same whether the goal is tracking smart money, investigating a theft or flagging risk.',
  ],
  it: [
    'Sono entrato nelle crypto intorno al 2021 da investitore. Ho iniziato dal lato meccanico: yield farming, strategie delta-neutral, tutto quel mondo. Ci ho messo poco a capire che con il capitale che avevo quelle strategie non spostavano nulla, così sono passato all’investimento diretto, soprattutto in token più piccoli e più rischiosi.',
    'Per farlo funzionare serviva un vantaggio, e il vantaggio non era mai nel trade in sé. Era nell’informazione: sapere chi si stava muovendo, e perché, prima che si vedesse nel prezzo. È lì che ho smesso di considerarmi un trader e ho iniziato a lavorare come analista on-chain.',
    'L’obiettivo che mi sono dato è semplice da dire e difficile da fare: collegare entità pubbliche agli indirizzi anonimi che le rappresentano. Inseguendo quell’obiettivo ho imparato il mestiere: wallet clustering, analisi comportamentale e temporale, transaction monitoring, tracciamento cross-chain. Un indirizzo alla volta, il lavoro si è accumulato: negli anni ho costruito un dataset personale di attribuzione con oltre 2.500 indirizzi mappati su più di 15 entità.',
    'Mi affido molto anche all’AI. Ogni strumento e script che uso ogni giorno l’ho costruito io con i large language model: i modelli scrivono il codice, l’analisi e il giudizio restano miei. Il mestiere è lo stesso, che si tratti di seguire lo smart money, indagare un furto o segnalare un rischio.',
  ],
};

// About-page skills groups (DRY with CV Skills section).
export const skillsGroups: Record<Locale, { label: string; items: string }[]> = {
  en: [
    { label: 'Investigation & analysis', items: 'Blockchain forensics · wallet clustering & entity attribution · cross-chain fund tracing · transaction monitoring · market-structure, liquidity & derivatives analysis · behavioral / time analysis' },
    { label: 'Compliance framing', items: 'AML · FATF red-flag typologies · ICD 203 confidence standards' },
    { label: 'Tools & data', items: 'Arkham · DeBank · Cielo · all base explorers (Etherscan, Solscan, BscScan, Tronscan) · Dune / SQL · Python (AI-assisted tooling & automation)' },
    { label: 'Chains', items: 'All EVM chains · Solana · Tron · Bitcoin' },
  ],
  it: [
    { label: 'Investigazione & analisi', items: 'Blockchain forensics · wallet clustering & entity attribution · cross-chain fund tracing · transaction monitoring · analisi di struttura di mercato, liquidità & derivati · analisi comportamentale / temporale' },
    { label: 'Ambito compliance', items: 'AML · tipologie di red flag FATF · standard di confidenza ICD 203' },
    { label: 'Strumenti & dati', items: 'Arkham · DeBank · Cielo · tutti gli explorer base (Etherscan, Solscan, BscScan, Tronscan) · Dune / SQL · Python (tooling assistito da AI e automazione)' },
    { label: 'Chain', items: 'Tutte le chain EVM · Solana · Tron · Bitcoin' },
  ],
};
