/* ────────────────────────────────────────────────────────────────
   Innovation Multimedial — contenuti editoriali e cruscotto KPI
   Framework: "multimedia-book-dance-ecosystem" v1.0.0
   ──────────────────────────────────────────────────────────────── */

export type StakeholderId = "fondazioni" | "aziende" | "istituzioni" | "community" | "tech";

export const px = (id: number, w = 900, h = 1100) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const IMG = {
  splitLeap: 11148970,
  maleLeap: 31699701,
  invertedLeap: 8502163,
  studioLeap: 16084320,
  gymLeap: 9940635,
  pointeHands: 5255123,
  pointeTie: 5255131,
  pointeAdjust: 6616549,
  operaBoxes: 39591668,
  scalaInterior: 39641859,
  backstageCurtain: 10708010,
  darkStage: 763214,
  performance: 27116809,
  rehearsalDuo: 8462873,
  stageBack: 8831666,
  silhouette: 10012372,
} as const;

/* ─── KPI ──────────────────────────────────────────────────────── */
export type KpiUnit = "percent" | "count" | "currency" | "ratio" | "minutes" | "decimal";

export interface Kpi {
  name: string;
  definition: string;
  unit: KpiUnit;
  t12: number;
  t24: number;
  decimals?: number;
  baseline: string;
  baselineValue: number;
  extra?: string;
  frequency: string;
  source: string;
}

export interface Module {
  id: string;
  group: "A" | "B";
  short: string;
  title: string;
  tagline: string;
  theme: string;
  editorial: string;
  media: string[];
  how: string[];
  benefits: string[];
  kpis: [Kpi, Kpi];
  stakeholders: StakeholderId[];
  image: number;
  imageAlt: string;
}

export const MODULES: Module[] = [
  /* ═══ GRUPPO A — I 6 PILASTRI ═══ */
  {
    id: "3.1",
    group: "A",
    short: "Acquisto B2B/B2G & referral",
    title: "Acquisto B2B/B2G, diffusione verticale e motore referral",
    tagline: "Superare i vincoli del finanziamento al non profit: l’opera diventa un bene culturale acquistabile e virale.",
    theme: "Atlante Vivo della Danza e dei Mestieri d’Arte",
    editorial:
      "Monografie digitali d’autore sul dialogo tra coreografia e alto artigianato italiano — sartoria teatrale, scarpette fatte a mano, scenografia, liuteria e design del movimento — con documentari in 4K, gallery ad alta risoluzione e schede storico-tecniche.",
    media: ["Documentari 4K", "Gallery HD", "Schede storico-tecniche"],
    how: [
      "Pacchetti di licenze digitali personalizzabili, con prefazione istituzionale o ex-libris digitale, acquistabili da fondazioni, aziende ed enti come bene culturale o omaggio di valore.",
      "Accesso tramite landing page dedicate a database verticali profilati: associazioni dell’artigianato, scuole di danza, circoli culturali.",
      "Referral culturale a fine capitolo: chi invita 3 colleghi o appassionati sblocca una masterclass filmata o il backstage integrale di uno spettacolo — mai uno sconto banale.",
    ],
    benefits: [
      "Ricavi immediati e non diluitivi, conformi alle regole di acquisto di beni e servizi di fondazioni ed enti",
      "Pubblico altamente profilato con costo di acquisizione (CAC) drasticamente ridotto",
      "Diffusione organica e tracciabile prima ancora del lancio dei servizi core",
    ],
    kpis: [
      {
        name: "Tasso di viralità organica (K-factor)",
        definition: "Nuovi lettori unici generati in media da ogni lettore iniziale tramite i contenuti sbloccabili.",
        unit: "decimal",
        t12: 0.45,
        t24: 0.7,
        decimals: 2,
        baseline: "Benchmark editoria digitale: 0,15",
        baselineValue: 0.15,
        extra: "22% dei lettori invita almeno 3 contatti (30% a 24 mesi)",
        frequency: "Mensile",
        source: "Analytics di piattaforma",
      },
      {
        name: "Valore medio per contratto B2B/B2G (ACV)",
        definition: "Ricavo medio per fondazione o ente acquirente, rispetto ai €24 di copertina della copia singola.",
        unit: "currency",
        t12: 8500,
        t24: 12000,
        baseline: "Copia singola al dettaglio: €24",
        baselineValue: 24,
        extra: "40 contratti istituzionali a 12 mesi, 90 a 24 mesi",
        frequency: "Trimestrale",
        source: "CRM e contratti",
      },
    ],
    stakeholders: ["fondazioni"],
    image: IMG.pointeHands,
    imageAlt: "Mani di una danzatrice che stringono scarpette da punta consumate",
  },
  {
    id: "3.2",
    group: "A",
    short: "Serialità, territorio & giurie",
    title: "Format immersivi, serialità, territorio e giornalisti-giurati",
    tagline: "La vita del libro va oltre la singola lettura: diventa un appuntamento seriale e partecipato.",
    theme: "Cronache del Movimento: Storie, Luoghi e Sfide",
    editorial:
      "Un racconto a puntate mensili costruito come un festival digitale permanente: trailer cinematografici, mappe interattive dei teatri e degli spazi non convenzionali, micro-documentari di scuole e compagnie e una caccia al dettaglio nascosta tra testi e video.",
    media: ["Trailer cinematografici", "Mappe interattive", "Caccia al dettaglio"],
    how: [
      "Calendario editoriale a episodi: 12 uscite annuali che trasformano il libro in un appuntamento ricorrente.",
      "Contest territoriali per scuole e compagnie: video-racconti e coreografie entrano nelle puntate; il pubblico vota con una micro-donazione mirata («dona con il voto») per borse di studio e progetti locali.",
      "Tavole rotonde multimediali tra opinion leader della danza e di altri settori sul tema del valore condiviso.",
      "Giornalisti culturali e generalisti come firme editoriali e come giurati nelle tappe locali, in diverse città italiane.",
    ],
    benefits: [
      "Ciclo di vita del prodotto allungato e community fidelizzata nel tempo",
      "Contenuti co-creati a costo contenuto, con i pubblici di scuole e compagnie",
      "Copertura mediatica locale e nazionale moltiplicata dai giornalisti-giurati",
    ],
    kpis: [
      {
        name: "Tasso di ritenzione seriale",
        definition: "Lettori della prima puntata che aprono e completano almeno il 60% delle puntate successive.",
        unit: "percent",
        t12: 45,
        t24: 55,
        baseline: "Contenuti seriali digitali: 28%",
        baselineValue: 28,
        frequency: "Per episodio",
        source: "Analytics di piattaforma",
      },
      {
        name: "Partecipazione attiva ai contest",
        definition: "Voti e interazioni generati dai contest territoriali di scuole e compagnie.",
        unit: "count",
        t12: 60000,
        t24: 150000,
        baseline: "Contest culturale locale medio: 5.000 voti",
        baselineValue: 5000,
        extra: "120 articoli e servizi dei giornalisti-giurati (300 a 24 mesi) · €45.000 in micro-donazioni",
        frequency: "Per tappa",
        source: "Piattaforma voto + rassegna stampa",
      },
    ],
    stakeholders: ["community"],
    image: IMG.performance,
    imageAlt: "Danzatori in scena durante una performance, in bianco e nero",
  },
  {
    id: "3.3",
    group: "A",
    short: "Sponsor privati & enti territoriali",
    title: "Sponsorizzazioni private e partnership con enti pubblici territoriali",
    tagline: "Un veicolo di reputazione per i brand privati e di valorizzazione per Regioni e Comuni.",
    theme: "Geografie della Danza e dell’Eccellenza",
    editorial:
      "Edizioni speciali tematiche o territoriali — la danza nei borghi storici e nei teatri delle Marche, un dossier su benessere, postura, estetica e sostenibilità del corpo in movimento — esplorate con rigore giornalistico, reportage fotografici e audio-guide d’autore.",
    media: ["Reportage fotografici", "Audio-guide d’autore", "Edizioni territoriali"],
    how: [
      "Pacchetti di cultural sponsorship: il brand sostiene un capitolo coerente con i propri valori e ottiene il diritto di regalarlo in esclusiva al proprio CRM e ai prospect.",
      "Edizioni territoriali co-progettate con Unioni di Comuni e Regioni: patrocinio istituzionale, licenze per cittadini e turisti, diffusione coordinata su newsletter e portali dell’ente.",
    ],
    benefits: [
      "Monetizzazione scalabile, ordini di grandezza oltre la marginalità della vendita al dettaglio",
      "Accesso diretto e legittimato ai database proprietari di aziende ed enti pubblici",
      "Sponsor associati a un prodotto culturale di pregio, non a banner invasivi",
    ],
    kpis: [
      {
        name: "Tasso di riscatto sui database partner",
        definition: "Clienti aziendali o cittadini che scaricano e aprono l’ebook tramite i canali dello sponsor o dell’ente.",
        unit: "percent",
        t12: 18,
        t24: 25,
        baseline: "Omaggi digitali via CRM: 6%",
        baselineValue: 6,
        frequency: "Per campagna",
        source: "Codici di riscatto univoci",
      },
      {
        name: "Tempo medio sul contenuto sponsorizzato",
        definition: "Minuti medi trascorsi nei moduli editoriali sostenuti dal partner: indicatore diretto di brand affinity.",
        unit: "minutes",
        t12: 7.5,
        t24: 9,
        decimals: 1,
        baseline: "Native advertising medio: 1,2 min",
        baselineValue: 1.2,
        frequency: "Mensile",
        source: "Analytics di piattaforma",
      },
    ],
    stakeholders: ["fondazioni", "aziende"],
    image: IMG.operaBoxes,
    imageAlt: "Palchi decorati di un teatro storico all’italiana",
  },
  {
    id: "3.4",
    group: "A",
    short: "Grandi istituzioni & earned media",
    title: "Alleanze con grandi istituzioni culturali ed earned media",
    tagline: "La forza editoriale come chiave d’accesso a festival e istituzioni prestigiose.",
    theme: "Quaderni d’Autore e Diari di Festival",
    editorial:
      "Speciali monografici sulle grandi rassegne internazionali: interviste inedite ai coreografi ospiti, saggi critici sugli spettacoli in cartellone, archivi fotografici storici e clip di prove commentate.",
    media: ["Interviste inedite", "Saggi critici", "Prove commentate"],
    how: [
      "Partnership editoriale a costo zero per l’ente: la startup produce e distribuisce come editore indipendente i contenuti di approfondimento sul programma.",
      "In cambio della copertura qualificata, l’ebook viene distribuito sulla mailing list ufficiale e sui canali social dell’istituzione.",
      "La credibilità maturata apre il go-to-market dei servizi tecnologici e strategici verso l’istituzione e la sua rete.",
    ],
    benefits: [
      "Trasferimento immediato di autorevolezza dall’istituzione storica alla startup (halo effect)",
      "Earned media e reach qualificata di appassionati, mecenati e addetti ai lavori",
      "Canali relazionali diretti con i vertici decisionali del settore culturale",
    ],
    kpis: [
      {
        name: "Earned Media Value (EMV)",
        definition: "Valore mediatico stimato della copertura generata, calcolato su listini pubblicitari equivalenti.",
        unit: "currency",
        t12: 220000,
        t24: 520000,
        baseline: "Investimento media diretto: €0",
        baselineValue: 0,
        extra: "Reach istituzionale: 150.000 utenti unici (400.000 a 24 mesi)",
        frequency: "Per speciale",
        source: "Rassegna stampa monitorata",
      },
      {
        name: "Conversione relazionale (pipeline B2B)",
        definition: "Nuovi contatti istituzionali qualificati generati a valle della pubblicazione dello speciale.",
        unit: "count",
        t12: 40,
        t24: 95,
        baseline: "Outbound a freddo: 16 contatti/anno",
        baselineValue: 16,
        extra: "Almeno il 30% evolve in trattativa commerciale",
        frequency: "Trimestrale",
        source: "CRM",
      },
    ],
    stakeholders: ["istituzioni"],
    image: IMG.backstageCurtain,
    imageAlt: "Danzatrici dietro le quinte, accanto al sipario, in bianco e nero",
  },
  {
    id: "3.5",
    group: "A",
    short: "Editoria a stampa & phygital",
    title: "Sinergia con l’editoria a stampa: allegati e collezionabili",
    tagline: "La capillarità e l’autorevolezza della carta, l’interattività del digitale.",
    theme: "La Biblioteca della Danza Contemporanea",
    editorial:
      "Una collana di fascicoli e inserti d’autore — ritratti di grandi maestri, storia dei balletti iconici, guide alla visione — in formato phygital: ogni pagina integra QR editoriali che aprono video-analisi ed estratti coreografici.",
    media: ["Inserti collezionabili", "QR editoriali", "Video-analisi"],
    how: [
      "Accordi di co-edizione o distribuzione con quotidiani locali e nazionali, settimanali, mensili e riviste di danza e spettacolo.",
      "L’opera come allegato collezionabile in edicola o come benefit digitale riservato agli abbonati della testata.",
      "Un ponte fluido dalla carta al digitale che trasforma il lettore d’edicola in utente registrato.",
    ],
    benefits: [
      "Visibilità di massa e legittimazione presso il pubblico generalista e gli addetti ai lavori",
      "Un contenuto collezionabile che aiuta gli editori ad aumentare vendite e fidelizzazione",
    ],
    kpis: [
      {
        name: "Tasso di attivazione phygital (QR-to-digital)",
        definition: "Copie cartacee distribuite che generano almeno un accesso effettivo ai contenuti multimediali.",
        unit: "percent",
        t12: 12,
        t24: 18,
        baseline: "QR su stampa pubblicitaria: 3%",
        baselineValue: 3,
        frequency: "Per uscita",
        source: "QR univoci per testata",
      },
      {
        name: "Tiratura e diffusione complessiva",
        definition: "Copie o abbonati esposti all’inserto sulle testate partner.",
        unit: "count",
        t12: 250000,
        t24: 600000,
        baseline: "Inserto medio di un quotidiano locale: 25.000",
        baselineValue: 25000,
        frequency: "Per uscita",
        source: "Dati di diffusione delle testate",
      },
    ],
    stakeholders: ["istituzioni"],
    image: IMG.studioLeap,
    imageAlt: "Ballerina in un salto in sala prove, in bianco e nero",
  },
  {
    id: "3.6",
    group: "A",
    short: "Inchieste & advocacy",
    title: "Opinion leader, format inchiesta e advocacy («Pagina Bianca»)",
    tagline: "Il libro come piattaforma di dibattito pubblico e pressione costruttiva sul sistema culturale.",
    theme: "Stati Generali della Danza: Inchieste e Prese di Posizione",
    editorial:
      "Dossier giornalistici rigorosi sui nodi strutturali del settore — sostenibilità economica, carriere dei danzatori, riforma dei finanziamenti, accesso alla cultura — con pagine firmate da opinion leader e uno spazio di confronto diretto con i decisori pubblici.",
    media: ["Dossier d’inchiesta", "Video-editoriali", "La Pagina Bianca"],
    how: [
      "Format Inchiesta: coreografi, economisti della cultura, direttori di teatro e giuristi firmano una pagina multimediale (testo + video-editoriale) con dati e proposte concrete.",
      "Format «La Pagina Bianca»: domande chiare e costruttive a un’istituzione chiave, con data di chiusura comunicata in anticipo; in assenza di risposta la pagina resta bianca, con nota esplicita.",
      "Ufficio stampa mirato verso testate nazionali, agenzie e programmi di approfondimento culturale.",
    ],
    benefits: [
      "Da semplice operatore di mercato a voce autorevole e osservatorio riconosciuto del settore",
      "Risonanza mediatica organica alimentata dalla forza simbolica della pagina bianca",
    ],
    kpis: [
      {
        name: "Share of voice e citazioni media",
        definition: "Riprese giornalistiche, menzioni social di stakeholder di settore e inviti a tavoli istituzionali.",
        unit: "count",
        t12: 150,
        t24: 400,
        baseline: "Nuovo entrante di settore: 10 citazioni/anno",
        baselineValue: 10,
        extra: "Share of voice del 12% sul tema «danza» (20% a 24 mesi) · 15 inviti a tavoli e convegni",
        frequency: "Mensile",
        source: "Media monitoring",
      },
      {
        name: "Tasso di risposta istituzionale",
        definition: "Decisori ed enti interpellati che forniscono una presa di posizione ufficiale, prima o dopo l’uscita.",
        unit: "percent",
        t12: 40,
        t24: 60,
        baseline: "Richieste pubbliche non sollecitate: 15%",
        baselineValue: 15,
        frequency: "Per dossier",
        source: "Registro redazionale",
      },
    ],
    stakeholders: ["istituzioni"],
    image: IMG.darkStage,
    imageAlt: "Danzatore su un palco in penombra con il braccio alzato",
  },

  /* ═══ GRUPPO B — LE 7 ESTENSIONI ═══ */
  {
    id: "4.1",
    group: "B",
    short: "Living Archive",
    title: "Edizione «Living Archive» e dossier di settore",
    tagline: "I capitoli enciclopedici diventano una risorsa permanente di riferimento per il settore.",
    theme: "Annuario Dinamico delle Arti Performative",
    editorial:
      "Un archivio vivo e aggiornabile: schede storiche, case study gestionali, analisi di tendenze internazionali, video-interviste tecniche e repertori catalogati per stili e territori.",
    media: ["Database editoriale", "Video-interviste tecniche", "Aggiornamento trimestrale"],
    how: [
      "Capitoli enciclopedici strutturati in un database editoriale consultabile, aggiornato ogni trimestre.",
      "Licenze d’accesso annuali multi-utente per università, biblioteche, accademie, osservatori culturali e associazioni di categoria.",
    ],
    benefits: [
      "Ricavi ricorrenti svincolati dalla singola campagna di lancio",
      "Un asset proprietario di conoscenza unico nel panorama nazionale",
    ],
    kpis: [
      {
        name: "Ricavo ricorrente annuale da licenze (ARR B2B)",
        definition: "Valore complessivo degli abbonamenti istituzionali e accademici attivi.",
        unit: "currency",
        t12: 120000,
        t24: 320000,
        baseline: "Anno zero: nessun ricavo ricorrente",
        baselineValue: 0,
        extra: "60 licenze attive a 12 mesi, 150 a 24 mesi",
        frequency: "Mensile",
        source: "Controllo di gestione",
      },
      {
        name: "Tasso di rinnovo annuale",
        definition: "Enti e biblioteche che rinnovano l’accesso all’archivio nell’anno successivo.",
        unit: "percent",
        t12: 85,
        t24: 90,
        baseline: "Banche dati per l’education: 78%",
        baselineValue: 78,
        frequency: "Annuale",
        source: "CRM e contratti",
      },
    ],
    stakeholders: ["community"],
    image: IMG.stageBack,
    imageAlt: "Danzatrice di spalle sul palcoscenico di un teatro storico",
  },
  {
    id: "4.2",
    group: "B",
    short: "Kit didattico",
    title: "Kit didattico interattivo per scuole, conservatori e accademie",
    tagline: "La cultura della danza entra nell’educazione formale con strumenti multimediali.",
    theme: "Capire il Movimento: Guida Multimediale per Studenti e Docenti",
    editorial:
      "Moduli educativi con video-analisi passo-passo di coreografie storiche e contemporanee, glossari illustrati, approfondimenti su musica e storia dell’arte e tracce per laboratori in classe.",
    media: ["Video-analisi passo-passo", "Glossari illustrati", "Tracce di laboratorio"],
    how: [
      "Pedagogisti e docenti di storia della danza nel comitato editoriale, con schede allineate ai programmi scolastici e ai percorsi PCTO.",
      "Adozioni multi-licenza in istituti superiori, licei coreutici, conservatori e progetti educativi finanziati da fondazioni o bandi regionali.",
    ],
    benefits: [
      "Accesso al mercato EdTech e culturale-scolastico, altamente finanziabile da enti e fondazioni",
      "Formazione del pubblico di domani: audience development strutturale",
    ],
    kpis: [
      {
        name: "Istituti adottanti",
        definition: "Scuole, licei coreutici e accademie che integrano il kit nei propri percorsi formativi.",
        unit: "count",
        t12: 120,
        t24: 350,
        baseline: "Progetti pilota regionali: 12 istituti",
        baselineValue: 12,
        extra: "600 classi (≈13.000 studenti) a 12 mesi · 1.800 classi a 24 mesi",
        frequency: "Semestrale",
        source: "Registro adozioni",
      },
      {
        name: "Completamento dei moduli didattici",
        definition: "Studenti e classi che completano i percorsi interattivi assegnati.",
        unit: "percent",
        t12: 70,
        t24: 78,
        baseline: "Corsi online aperti (MOOC): 12%",
        baselineValue: 12,
        frequency: "Per modulo",
        source: "Piattaforma didattica",
      },
    ],
    stakeholders: ["fondazioni"],
    image: IMG.rehearsalDuo,
    imageAlt: "Due danzatori classici provano un passo a due in sala",
  },
  {
    id: "4.3",
    group: "B",
    short: "Bandi, residenze & audizioni",
    title: "Portale per bandi, residenze, casting e audizioni",
    tagline: "Accanto al valore culturale, un’utilità pratica e ricorrente per i professionisti.",
    theme: "Bussola delle Opportunità e Storie di Carriera",
    editorial:
      "Interviste a direttori di residenze artistiche e guide pratiche per affrontare un’audizione internazionale, alternate a una bacheca multimediale curata di bandi, borse di studio, residenze e casting.",
    media: ["Bacheca curata", "Schede video delle residenze", "Guide pratiche"],
    how: [
      "Un modulo aggiornabile dedicato alle call artistiche, con schede video di presentazione delle residenze e dei teatri ospitanti.",
      "Accordi con festival, fondazioni e compagnie per call in evidenza e raccolta strutturata di candidature e portfolio.",
    ],
    benefits: [
      "Uno strumento di utilità frequente che moltiplica i ritorni spontanei dei professionisti",
      "Una community verticale di danzatori, coreografi e operatori culturali",
    ],
    kpis: [
      {
        name: "Utenti attivi mensili di ritorno",
        definition: "Professionisti che tornano regolarmente a consultare la sezione opportunità.",
        unit: "count",
        t12: 6500,
        t24: 15000,
        baseline: "Portali verticali di settore: 2.000",
        baselineValue: 2000,
        frequency: "Mensile",
        source: "Analytics di piattaforma",
      },
      {
        name: "Click-through sulle call",
        definition: "Lettori della bacheca che aprono e avviano una candidatura verso bandi, residenze e audizioni.",
        unit: "percent",
        t12: 9,
        t24: 12,
        baseline: "Bacheche generaliste: 2,5%",
        baselineValue: 2.5,
        extra: "12.000 interazioni qualificate a 12 mesi (30.000 a 24 mesi)",
        frequency: "Mensile",
        source: "Analytics + partner",
      },
    ],
    stakeholders: ["community"],
    image: IMG.gymLeap,
    imageAlt: "Danzatrice in un salto ampio ed elegante, in bianco e nero",
  },
  {
    id: "4.4",
    group: "B",
    short: "Turismo culturale & itinerari",
    title: "Progetto «Cultural Tourism & Itinerari»",
    tagline: "La narrazione della danza incontra la scoperta lenta e sostenibile dei territori.",
    theme: "Sulle Tracce della Danza: Itinerari tra Teatri Storici, Borghi e Festival",
    editorial:
      "Guide esperienziali con mappe geolocalizzate, audio-racconti da ascoltare in cammino, interviste agli artigiani del posto e calendari stagionali degli spettacoli dal vivo sul territorio.",
    media: ["Mappe geolocalizzate", "Audio-racconti", "Calendari stagionali"],
    how: [
      "Collaborazioni con DMO, consorzi turistici, reti di hotel di charme e operatori di turismo culturale.",
      "Il libro come guida digitale di benvenuto co-brandizzata per gli ospiti delle strutture e i visitatori della destinazione.",
    ],
    benefits: [
      "Accesso ai budget del turismo culturale e del destination marketing",
      "Pubblico allargato ai viaggiatori culturali italiani e internazionali",
    ],
    kpis: [
      {
        name: "Attivazioni della guida",
        definition: "Viaggiatori che attivano la guida tramite strutture ricettive o info-point partner.",
        unit: "count",
        t12: 25000,
        t24: 70000,
        baseline: "Guide digitali generiche: 6.400 (800 × 8 destinazioni)",
        baselineValue: 6400,
        extra: "≈3.100 attivazioni per destinazione su 8 destinazioni pilota",
        frequency: "Mensile",
        source: "Codici struttura / info-point",
      },
      {
        name: "Click verso esperienze e biglietterie",
        definition: "Lettori attivi che passano dall’itinerario alla prenotazione di spettacoli, visite o servizi locali.",
        unit: "percent",
        t12: 24,
        t24: 30,
        baseline: "Portali turistici istituzionali: 4%",
        baselineValue: 4,
        extra: "6.000 click verso biglietterie a 12 mesi (18.000 a 24 mesi)",
        frequency: "Mensile",
        source: "Link tracciati",
      },
    ],
    stakeholders: ["fondazioni"],
    image: IMG.scalaInterior,
    imageAlt: "Interno di un grande teatro storico all’italiana con platea e palchi",
  },
  {
    id: "4.5",
    group: "B",
    short: "Behind the scenes & tech/craft",
    title: "Format «Behind the Scenes» e Tech/Craft Showcase",
    tagline: "La filiera tecnica, tecnologica e scientifica che rende possibile lo spettacolo.",
    theme: "L’Ingegneria dell’Invisibile",
    editorial:
      "Reportage multimediali e video-esplosi interattivi su ciò che il pubblico non vede: illuminotecnica, acustica, pavimentazioni tecniche, biomeccanica e fisioterapia del danzatore, tessili innovativi e tecnologie digitali per la scena.",
    media: ["Video-esplosi interattivi", "Reportage tecnici", "Casi d’uso reali"],
    how: [
      "Selezione di aziende eccellenti della filiera tecnica, medicale-sportiva e tecnologica pronte a raccontare il proprio know-how con casi d’uso reali.",
      "Capitoli tecnico-scientifici in cui l’innovazione del partner è mostrata in azione nel contesto autentico della preparazione artistica: divulgazione, mai pubblicità.",
    ],
    benefits: [
      "Sponsor tecnici B2B e aziende tech/health ad alta capacità di spesa",
      "Valore educativo e divulgativo dell’opera arricchito",
    ],
    kpis: [
      {
        name: "Valore delle sponsorizzazioni tecniche",
        definition: "Ricavo diretto o valore di fornitura tecnica (barter) generato dai partner di filiera.",
        unit: "currency",
        t12: 150000,
        t24: 380000,
        baseline: "Anno zero: nessuno sponsor tecnico",
        baselineValue: 0,
        extra: "Circa il 35% in fornitura tecnica (barter)",
        frequency: "Trimestrale",
        source: "Controllo di gestione",
      },
      {
        name: "Lead B2B qualificati",
        definition: "Richieste di contatto verso i partner tecnici da teatri, scuole e professionisti lettori.",
        unit: "count",
        t12: 300,
        t24: 800,
        baseline: "Fiera di settore media: 120 lead",
        baselineValue: 120,
        frequency: "Mensile",
        source: "Form tracciati",
      },
    ],
    stakeholders: ["aziende"],
    image: IMG.silhouette,
    imageAlt: "Silhouette di una ballerina dietro le quinte con luce drammatica",
  },
  {
    id: "4.6",
    group: "B",
    short: "Zero-party data & insight",
    title: "Raccolta dati e insight di mercato (zero-party data)",
    tagline: "La lettura interattiva diventa conoscenza strategica sul pubblico della danza.",
    theme: "Ritratti del Pubblico: Sondaggi d’Autore e Mappe dei Gusti",
    editorial:
      "Micro-interazioni eleganti tra i capitoli — test come «Quale stile coreografico racconta la tua estetica?», sondaggi sulle abitudini culturali, mappe partecipative dei desideri — restituite ai lettori come infografiche editoriali.",
    media: ["Test interattivi", "Mappe partecipative", "Infografiche"],
    how: [
      "Punti di raccolta dati dichiarativi, trasparenti e conformi al GDPR, motivati dalla curiosità del lettore e dalla co-creazione di report di settore.",
      "Analisi aggregate per orientare i prodotti della startup e redigere report di mercato esclusivi per sponsor, teatri e istituzioni.",
    ],
    benefits: [
      "Un patrimonio informativo proprietario in un settore povero di dati aggiornati",
      "Valore percepito delle proposte a sponsor e partner istituzionali drasticamente più alto",
    ],
    kpis: [
      {
        name: "Completamento dei micro-sondaggi",
        definition: "Lettori che rispondono volontariamente ai moduli interattivi.",
        unit: "percent",
        t12: 35,
        t24: 45,
        baseline: "Sondaggi online standard: 12%",
        baselineValue: 12,
        frequency: "Mensile",
        source: "Survey engine",
      },
      {
        name: "Profili segmentati e consensati",
        definition: "Utenti unici con preferenze tematiche e territoriali profilate nel rispetto della normativa privacy.",
        unit: "count",
        t12: 40000,
        t24: 110000,
        baseline: "Anno zero: nessun dato proprietario",
        baselineValue: 0,
        extra: "100% con consenso esplicito e revocabile",
        frequency: "Mensile",
        source: "CDP conforme GDPR",
      },
    ],
    stakeholders: ["aziende", "tech"],
    image: IMG.maleLeap,
    imageAlt: "Danzatore in volo durante un salto, in bianco e nero",
  },
  {
    id: "4.7",
    group: "B",
    short: "White-label chiavi in mano",
    title: "Edizioni white-label o co-branded «chiavi in mano»",
    tagline: "L’architettura del libro diventa un prodotto replicabile per altri settori creativi.",
    theme: "Piattaforma Editoriale per le Arti e la Cultura",
    editorial:
      "Lo stesso formato multimediale — capitoli, video, mappe, referral, inchieste — declinato per la stagione di un teatro lirico, il centenario di una fondazione, la rassegna di un museo o un progetto di design e musica.",
    media: ["Template modulare", "Analytics integrati", "Co-branding"],
    how: [
      "Standardizzazione del template tecnologico, del flusso redazionale e dei moduli di analytics sviluppati per la danza.",
      "Infrastruttura proposta come servizio editoriale-tecnologico chiavi in mano a fondazioni, festival, musei e grandi imprese culturali.",
    ],
    benefits: [
      "Ricavi diversificati con margini elevati su tecnologia e know-how già ammortizzati",
      "Posizionamento come leader tecnologico-editoriale delle industrie creative",
    ],
    kpis: [
      {
        name: "Margine per edizione replicata",
        definition: "Rapporto tra ricavo della commessa white-label e costo marginale di produzione e personalizzazione.",
        unit: "ratio",
        t12: 2.8,
        t24: 3.6,
        decimals: 1,
        baseline: "Prima edizione (danza): 1,0×",
        baselineValue: 1,
        extra: "≈64% di margine operativo a 12 mesi (72% a 24 mesi)",
        frequency: "Per commessa",
        source: "Controllo di gestione",
      },
      {
        name: "Commesse extra-danza attivate",
        definition: "Edizioni realizzate per settori culturali o istituzionali affini.",
        unit: "count",
        t12: 3,
        t24: 8,
        baseline: "Anno zero: 0 commesse",
        baselineValue: 0,
        frequency: "Semestrale",
        source: "CRM e contratti",
      },
    ],
    stakeholders: ["tech"],
    image: IMG.invertedLeap,
    imageAlt: "Danzatrice in un salto capovolto, in bianco e nero",
  },
];

export const moduleById = (id: string) => MODULES.find((m) => m.id === id) ?? MODULES[0];

/* ─── Stakeholder ──────────────────────────────────────────────── */
export interface Stakeholder {
  id: StakeholderId;
  label: string;
  short: string;
  target: string;
  headline: string;
  highlight: string;
  body: string;
  publicLives: string;
  partnerGets: string;
  benefits: string[];
  modules: string[];
  kpis: { value: number; decimals?: number; prefix?: string; suffix?: string; label: string }[];
  image: number;
  imageAlt: string;
  cta: string;
}

export const STAKEHOLDERS: Stakeholder[] = [
  {
    id: "fondazioni",
    label: "Fondazioni ed Enti",
    short: "Fondazioni",
    target: "Fondazioni bancarie · Regioni · Comuni",
    headline: "Sostieni la cultura e il territorio con un’opera",
    highlight: "misurabile",
    body: "Non un contributo a fondo perduto, ma un bene culturale da acquistare, personalizzare e distribuire. Ogni licenza ha un destinatario, ogni lettura genera un dato, ogni territorio ottiene il suo racconto d’autore.",
    publicLives: "Monografie, kit per le classi e itinerari tra teatri e borghi",
    partnerGets: "Licenze tracciate, report trimestrale e diffusione certificata",
    benefits: [
      "Acquisto conforme alle regole su beni e servizi culturali",
      "Prefazione istituzionale ed ex-libris digitale firmati dall’ente",
      "Diffusione verticale a scuole, associazioni e circoli del territorio",
      "Report d’impatto trimestrale sul cruscotto a 26 indicatori",
    ],
    modules: ["3.1", "3.3", "4.2", "4.4"],
    kpis: [
      { value: 8500, prefix: "€", label: "valore medio per contratto" },
      { value: 120, label: "istituti scolastici adottanti" },
      { value: 25000, label: "attivazioni turistiche" },
    ],
    image: IMG.operaBoxes,
    imageAlt: "Palchi dorati di un teatro storico italiano",
    cta: "Richiedi la proposta per il tuo ente",
  },
  {
    id: "aziende",
    label: "Aziende e Brand",
    short: "Brand",
    target: "Sponsor privati · Filiera tech & craft",
    headline: "Associa il tuo brand all’eccellenza artistica, con contenuti",
    highlight: "mai invasivi",
    body: "Il tuo marchio non compra spazi: rende possibile un capitolo d’autore coerente con i tuoi valori e lo regala ai tuoi clienti. I lettori restano, leggono e ricordano chi l’ha reso possibile.",
    publicLives: "Reportage e video-esplosi su corpo, tecnica e materiali della scena",
    partnerGets: "Distribuzione al CRM, tempo di lettura, lead e insight proprietari",
    benefits: [
      "Capitolo tematico co-progettato con la redazione, a taglio divulgativo",
      "Distribuzione esclusiva e illimitata al tuo CRM e ai prospect",
      "Know-how mostrato in azione, nel contesto autentico della scena",
      "Insight zero-party sul pubblico della danza, aggregati e conformi al GDPR",
    ],
    modules: ["3.3", "4.5", "4.6"],
    kpis: [
      { value: 7.5, decimals: 1, suffix: " min", label: "tempo medio sul capitolo" },
      { value: 18, suffix: "%", label: "riscatto sui database del brand" },
      { value: 300, label: "lead B2B qualificati" },
    ],
    image: IMG.pointeTie,
    imageAlt: "Danzatrice che allaccia una scarpetta da punta",
    cta: "Prenota un capitolo per il tuo brand",
  },
  {
    id: "istituzioni",
    label: "Istituzioni e Media",
    short: "Istituzioni",
    target: "Festival · Teatri · Editori a stampa",
    headline: "Amplifica la programmazione e il dibattito culturale con un partner",
    highlight: "nativo digitale",
    body: "Speciali monografici sui festival a costo zero per l’ente, collane phygital per le testate, inchieste che portano i nodi del settore al centro del dibattito pubblico.",
    publicLives: "Diari di festival, inserti collezionabili e inchieste d’autore",
    partnerGets: "Earned media, nuovi abbonati, pubblico qualificato e autorevolezza",
    benefits: [
      "Quaderni d’autore e diari di festival prodotti da un editore indipendente",
      "Allegati collezionabili con QR editoriali che portano il lettore nel digitale",
      "Format inchiesta e «Pagina Bianca» per il confronto diretto con i decisori",
      "Ufficio stampa mirato verso testate nazionali e agenzie",
    ],
    modules: ["3.4", "3.5", "3.6"],
    kpis: [
      { value: 220000, prefix: "€", label: "earned media value" },
      { value: 250000, label: "copie e abbonati esposti" },
      { value: 150, label: "citazioni e riprese media" },
    ],
    image: IMG.backstageCurtain,
    imageAlt: "Danzatrici dietro il sipario prima dello spettacolo",
    cta: "Proponi una partnership editoriale",
  },
  {
    id: "community",
    label: "Community Danza",
    short: "Community",
    target: "Scuole · Compagnie · Danzatori",
    headline: "Racconta il tuo territorio, partecipa ai contest, accedi a",
    highlight: "visibilità nazionale",
    body: "Scuole e compagnie diventano co-autrici: i loro micro-documentari entrano nelle puntate, il pubblico vota e dona, i giornalisti fanno da giuria. E ogni mese, una bussola di opportunità concrete.",
    publicLives: "Puntate mensili, contest territoriali e storie di carriera",
    partnerGets: "Visibilità, borse di studio, bandi, archivi e una rete nazionale",
    benefits: [
      "Contest territoriali con «dona con il voto» per borse di studio locali",
      "Micro-documentari pubblicati nelle puntate mensili dell’opera",
      "Bacheca curata di bandi, residenze, casting e audizioni",
      "Accesso al Living Archive: repertori, case study e video tecnici",
    ],
    modules: ["3.2", "4.1", "4.3"],
    kpis: [
      { value: 45, suffix: "%", label: "ritenzione seriale delle puntate" },
      { value: 60000, label: "voti nei contest territoriali" },
      { value: 6500, label: "professionisti attivi ogni mese" },
    ],
    image: IMG.rehearsalDuo,
    imageAlt: "Due danzatori in sala prove",
    cta: "Candida la tua scuola o compagnia",
  },
  {
    id: "tech",
    label: "Tecnologia & White-Label",
    short: "White-label",
    target: "Imprese creative · Musei · Altri settori",
    headline: "Un formato scalabile e data-driven, pronto per dare voce al",
    highlight: "tuo progetto culturale",
    body: "La stessa architettura — capitoli, video, mappe, referral, inchieste e analytics — declinata per la stagione di un teatro lirico, il centenario di una fondazione, la rassegna di un museo.",
    publicLives: "Un’esperienza editoriale multimediale con la tua identità",
    partnerGets: "Piattaforma chiavi in mano, dati proprietari e tempi rapidi",
    benefits: [
      "Template tecnologico e flusso redazionale già collaudati",
      "Edizioni white-label o co-branded «chiavi in mano»",
      "Moduli di analytics e raccolta zero-party integrati",
      "Messa online in 10–14 settimane grazie a componenti riutilizzabili",
    ],
    modules: ["4.6", "4.7"],
    kpis: [
      { value: 2.8, decimals: 1, suffix: "×", label: "ricavo su costo marginale" },
      { value: 35, suffix: "%", label: "completamento dei sondaggi" },
      { value: 3, label: "commesse extra-danza in 12 mesi" },
    ],
    image: IMG.darkStage,
    imageAlt: "Danzatore su un palco in penombra",
    cta: "Parliamo del tuo progetto",
  },
];

export const stakeholderById = (id: StakeholderId) => STAKEHOLDERS.find((s) => s.id === id) ?? STAKEHOLDERS[0];

/* ─── Programma pilota (social proof) ──────────────────────────── */
export const PILOT_STATS = [
  { value: 21300, label: "lettori unici", note: "3 edizioni pilota, 6 mesi" },
  { value: 9.4, decimals: 1, suffix: " min", label: "sessione media", note: "contro 1,2 min dei contenuti sponsorizzati" },
  { value: 41, suffix: "%", label: "ritenzione seriale", note: "contro il 28% di benchmark" },
  { value: 37, label: "articoli in earned media", note: "testate locali e nazionali" },
];

export const PARTNERS = [
  { name: "Fondazione Lumen", style: "serif" },
  { name: "FESTIVAL CORPO MOBILE", style: "heavy" },
  { name: "rete teatri adriatici", style: "mono" },
  { name: "KINESIS LAB", style: "pixel" },
  { name: "Il Quotidiano delle Arti", style: "serif" },
  { name: "Officina del Gesto", style: "wide" },
  { name: "ATELIER PUNTA & RASO", style: "mono" },
  { name: "Borghi in Scena", style: "heavy" },
  { name: "Accademia del Movimento", style: "serif" },
  { name: "LUCE SCENICA", style: "pixel" },
] as const;

/* ─── Testimonianze ────────────────────────────────────────────── */
export const TESTIMONIALS = [
  {
    quote:
      "Per la prima volta abbiamo acquistato cultura invece di finanziarla a fondo perduto: 2.000 licenze, un report trimestrale e la certezza di sapere chi ha letto, quanto e dove.",
    name: "Giulia Ferraresi",
    role: "Responsabile Progetti Culturali",
    org: "Fondazione Lumen per le Arti",
    stakeholder: "Fondazione",
    metric: "81%",
    metricLabel: "licenze attivate",
    tone: "irid",
  },
  {
    quote:
      "Il nostro capitolo sulla biomeccanica del danzatore ha generato 340 lead da teatri e scuole. Nessun banner ci avrebbe mai regalato otto minuti di lettura.",
    name: "Marco Diotallevi",
    role: "Head of Brand",
    org: "Kinesis Lab",
    stakeholder: "Sponsor tecnico",
    metric: "8,2 min",
    metricLabel: "tempo medio sul capitolo",
    tone: "foil",
  },
  {
    quote:
      "Uno speciale di questo livello, a costo zero per il festival, ha portato il nostro cartellone a lettori che la nostra newsletter non aveva mai raggiunto.",
    name: "Elena Marchetti",
    role: "Direttrice artistica",
    org: "Festival Corpo Mobile",
    stakeholder: "Festival",
    metric: "+38%",
    metricLabel: "reach del programma",
    tone: "ink",
  },
  {
    quote:
      "L’edizione territoriale è diventata la guida di benvenuto dei nostri borghi: i visitatori arrivano per un teatro e restano tre giorni.",
    name: "Andrea Pieroni",
    role: "Assessore alla Cultura",
    org: "Unione dei Comuni Borghi in Scena",
    stakeholder: "Ente locale",
    metric: "3.400",
    metricLabel: "attivazioni della guida",
    tone: "red",
  },
  {
    quote:
      "I nostri allievi sono diventati autori: il loro micro-documentario è entrato nella puntata di marzo ed è stato visto da dodicimila persone.",
    name: "Sara Lombardi",
    role: "Direttrice",
    org: "Scuola di danza Officina del Gesto",
    stakeholder: "Scuola",
    metric: "12.000",
    metricLabel: "visualizzazioni",
    tone: "paper",
  },
  {
    quote:
      "Da giurato ho scoperto compagnie che nessuna agenzia ci aveva mai segnalato. Ne sono nati quattro servizi per le nostre pagine di cultura.",
    name: "Paolo Venturi",
    role: "Giornalista culturale",
    org: "Il Quotidiano delle Arti",
    stakeholder: "Media",
    metric: "4",
    metricLabel: "servizi pubblicati",
    tone: "volt",
  },
] as const;

/* ─── Pacchetti ────────────────────────────────────────────────── */
export const PLANS = [
  {
    id: "community",
    name: "Community",
    audience: "Scuole, compagnie, licei coreutici",
    price: 390,
    prefix: "",
    unit: "/ anno per istituto",
    description: "Per chi vuole partecipare all’opera da co-autore e portarla in classe.",
    features: [
      "Kit didattico interattivo fino a 5 classi",
      "Partecipazione ai contest territoriali",
      "3 call in evidenza nella Bussola delle Opportunità",
      "Accesso base al Living Archive",
      "Webinar trimestrale per i docenti",
    ],
    cta: "Attiva il kit",
    role: "community" as StakeholderId,
  },
  {
    id: "mecenate",
    name: "Mecenate",
    audience: "Fondazioni, enti locali, associazioni",
    price: 6900,
    prefix: "da ",
    unit: "per 500 licenze",
    description: "Per chi sostiene la cultura acquistando un’opera misurabile.",
    features: [
      "500 licenze digitali personalizzate",
      "Prefazione istituzionale ed ex-libris digitale",
      "Landing dedicata e distribuzione verticale",
      "Motore referral con contenuti sbloccabili",
      "Report d’impatto trimestrale",
    ],
    cta: "Configura le licenze",
    role: "fondazioni" as StakeholderId,
  },
  {
    id: "brand",
    name: "Brand Partner",
    audience: "Aziende, filiera tech & craft",
    price: 24000,
    prefix: "da ",
    unit: "per capitolo",
    description: "Per chi vuole associare il proprio nome all’eccellenza, senza pubblicità.",
    features: [
      "Capitolo tematico co-progettato con la redazione",
      "Distribuzione illimitata al CRM e ai prospect",
      "Dashboard: riscatto, tempo di lettura, lead",
      "Report di insight zero-party sul pubblico",
      "Credito di mecenatismo, mai banner",
    ],
    cta: "Prenota un capitolo",
    role: "aziende" as StakeholderId,
    featured: true,
  },
  {
    id: "edizione",
    name: "Edizione su misura",
    audience: "Regioni, festival, musei, white-label",
    price: 45000,
    prefix: "da ",
    unit: "per edizione",
    description: "Per chi vuole un’opera intera dedicata al proprio territorio o progetto.",
    features: [
      "Edizione territoriale, di festival o white-label",
      "Mappe geolocalizzate e audio-guide d’autore",
      "Integrazione con canali e portali istituzionali",
      "Ufficio stampa nazionale dedicato",
      "Cruscotto KPI su misura",
    ],
    cta: "Parliamo del progetto",
    role: "tech" as StakeholderId,
  },
];

/* ─── FAQ ──────────────────────────────────────────────────────── */
export const FAQS = [
  {
    q: "In cosa Innovation Multimedial è diverso da un normale ebook?",
    a: "È un’opera viva: documentari in 4K, mappe interattive, audio-guide, puntate mensili, contest territoriali, inchieste e un archivio aggiornato ogni trimestre. Intorno al valore editoriale vivono i meccanismi di crescita — referral culturale, distribuzione verticale, dati dichiarativi — che rendono ogni lettura misurabile per chi la rende possibile.",
  },
  {
    q: "Il libro conterrà pubblicità degli sponsor?",
    a: "No. Il principio è «Editorial First, Business by Design»: sponsor ed enti sono mecenati e abilitatori, mai protagonisti. I capitoli sostenuti dai partner sono co-progettati con la redazione, mantengono piena indipendenza giornalistica e riportano un credito di mecenatismo, non banner o publiredazionali.",
  },
  {
    q: "Una fondazione o un ente pubblico può acquistarlo come bene culturale?",
    a: "Sì. Le licenze sono beni e servizi culturali fatturabili, pienamente compatibili con le regole di acquisto di fondazioni ed enti. Possono essere personalizzate con prefazione istituzionale ed ex-libris digitale e distribuite gratuitamente a cittadini, scuole, soci o clienti.",
  },
  {
    q: "Come misurate concretamente l’impatto?",
    a: "Con un cruscotto di 26 indicatori — due per ciascuno dei 13 moduli — con target a 12 e 24 mesi, benchmark di partenza, frequenza e fonte di misurazione. Ogni partner riceve un accesso in tempo reale ai propri dati e un report trimestrale. I benchmark vengono ricalibrati dopo i primi 90 giorni.",
  },
  {
    q: "Come vengono trattati i dati dei lettori?",
    a: "Raccogliamo solo dati dichiarativi (zero-party), con consenso esplicito, granulare e revocabile, nel pieno rispetto del GDPR. Ai partner restituiamo insight aggregati e anonimi: i dati personali non vengono mai venduti né ceduti.",
  },
  {
    q: "Che cos’è la «Pagina Bianca»?",
    a: "È un format di advocacy: rivolgiamo a un’istituzione chiave domande chiare e costruttive, comunicando in anticipo la data di chiusura redazionale. Se la risposta non arriva, la pagina viene pubblicata deliberatamente bianca, con una nota esplicita. Un gesto editoriale che trasforma il silenzio in dibattito.",
  },
  {
    q: "Come partecipano scuole e compagnie?",
    a: "Attraverso i contest territoriali: si producono video-racconti o coreografie originali che diventano parte delle puntate. Il pubblico vota associando una micro-donazione a borse di studio e progetti locali, mentre giornalisti culturali compongono le giurie nelle diverse città.",
  },
  {
    q: "Quali sono i tempi di produzione?",
    a: "Un capitolo sponsorizzato richiede 10–14 settimane dalla firma alla pubblicazione; un’edizione territoriale o white-label 4–6 mesi. La prossima finestra editoriale chiude il 30 giugno 2026.",
  },
  {
    q: "Il formato è replicabile in altri settori culturali?",
    a: "Sì. Template tecnologico, flusso redazionale e analytics sono standardizzati: li offriamo chiavi in mano, in white-label o co-branding, per teatri lirici, musei, fondazioni, festival e progetti di design o musica.",
  },
];

/* ─── Showcase (dentro l'opera) ────────────────────────────────── */
export const MAP_PINS = [
  { city: "Milano", x: 30, y: 15, kind: "Teatro storico", detail: "Atelier di sartoria teatrale · 2 documentari" },
  { city: "Torino", x: 15, y: 20, kind: "Spazio non convenzionale", detail: "Ex fabbrica riconvertita in sala prove" },
  { city: "Venezia", x: 52, y: 13, kind: "Festival", detail: "Biennale del movimento · diario d’autore" },
  { city: "Bologna", x: 44, y: 26, kind: "Scuola", detail: "Liceo coreutico · micro-documentario" },
  { city: "Firenze", x: 42, y: 34, kind: "Mestiere d’arte", detail: "Bottega di scarpette fatte a mano" },
  { city: "Ancona", x: 63, y: 34, kind: "Edizione territoriale", detail: "Borghi e teatri delle Marche · audio-guide" },
  { city: "Spoleto", x: 56, y: 42, kind: "Festival", detail: "Quaderno di festival · prove commentate" },
  { city: "Roma", x: 51, y: 52, kind: "Inchiesta", detail: "Stati Generali della Danza · tavola rotonda" },
  { city: "Napoli", x: 64, y: 63, kind: "Teatro storico", detail: "Palcoscenico all’italiana · gallery HD" },
  { city: "Lecce", x: 91, y: 66, kind: "Contest", detail: "Tappa territoriale · giuria di giornalisti" },
  { city: "Palermo", x: 50, y: 89, kind: "Itinerario", detail: "Sulle tracce della danza · 3 giorni" },
  { city: "Cagliari", x: 18, y: 72, kind: "Residenza", detail: "Residenza artistica · call aperta" },
];

export const POLL_OPTIONS = [
  { id: "neo", label: "Neoclassico", share: 24 },
  { id: "cont", label: "Contemporaneo", share: 38 },
  { id: "teatro", label: "Teatro-danza", share: 21 },
  { id: "urban", label: "Urban & hip-hop", share: 17 },
];
