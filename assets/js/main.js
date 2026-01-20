const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-label");
const languageToggle = document.querySelector(".language-toggle");
const languageLabel = document.querySelector(".language-label");

const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const storedLanguage = localStorage.getItem("language");
const browserLanguage = navigator.language && navigator.language.toLowerCase().startsWith("fi") ? "fi" : "en"; // Serve website in Finnish if browser set to Finnish

// Translation copy for all UI strings.
const translations = {
  en: {
    languageCode: "EN",
    language: "Language",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    pageTitle: "Martti Koivisto | markka.net",
    metaDescription: "Portfolio of Martti Koivisto, a full-stack student open to junior developer roles.",
    navLabel: "Portfolio sections",
    eyebrow: "markka.net",
    subtitle:
      "Full-stack student and finance-to-software builder. I focus on backend systems, data handling, and clean interfaces.",
    statusOpen: "Open to junior developer roles",
    heroHeading: "From finance rigor to software craft",
    heroLead:
      "Career-changing developer training at kood/Sisu, with a focus on backend services, data workflows, and clear interfaces between components.",
    ctaContact: "Contact me",
    ctaProjects: "View projects",
    statLabel1: "ranked in my starting batch 2025",
    statLabel2: "kood/Sisu × Documtec hackathon",
    statLabel3: "peer review score (27 reviewers)",
    focusHeading: "Current focus",
    focusItem1: "kood/Sisu full-stack program (Go, SQL, JavaScript)",
    focusItem2: "Building reliable backend services and REST APIs",
    focusItem3: "Exploring systems-level and embedded paths",
    coinHeading: "The markka coin",
    coinBody: "A nod to my initials (MK) and Finland's former currency.",
    stackFocusHeading: "Stack snapshot",
    tabAbout: "About me",
    tabProjects: "Projects",
    tabExperience: "Experience",
    tabStack: "Stack & skills",
    tabContact: "Contact me",
    aboutHeading: "About me",
    aboutBody1:
      "I’m a career-changing software developer with a strong analytical background from the finance industry.",
    aboutBody2:
      "I apply rigorous reasoning to software development, with a growing focus on backend systems, data handling, and clean interfaces between components.",
    educationHeading: "Education",
    education1Title: "kood/Sisu — Full-Stack Software Development",
    education1Meta: "10/2025 – Present",
    education1Body: "Peer-reviewed program using Go, SQL, and JavaScript with real-world datasets.",
    education2Title: "Harvard University — CS50x",
    education2Meta: "04/2025 – 07/2025",
    education2Body: "Strong foundation in algorithms, memory, and data structures with projects in C, Python, SQL, and web.",
    education3Title: "Lancaster University — Postgraduate Diploma in Finance",
    education3Meta: "10/2018 – 09/2019",
    education3Body: "Final project in Python: scraping, external data fetching, and valuation models.",
    education4Title: "Católica Lisbon School of Business & Economics — BSc Management",
    education4Meta: "09/2015 – 08/2018",
    education4Body: "International exposure and business fundamentals.",
    lookingHeading: "What I’m looking for",
    lookingItem1: "Junior Software Developer / Software Engineer roles",
    lookingItem2: "Teams with code reviews, mentorship, and real ownership",
    lookingItem3: "Opportunities to grow in backend, systems-level, and embedded software",
    projectsHeading: "Selected projects",
    projectTitle1: "Documtec Search Insights",
    projectMeta1: "Hackathon • Elasticsearch • Real-world data",
    projectDesc1:
      "Built a search-driven insight tool on production-like data. Placed 2nd in the kood/Sisu × Documtec hackathon.",
    projectTitle2: "Fund-O-Matic",
    projectMeta2: "CS50x final project • Flask • SQLite",
    projectDesc2:
      "Web app to plan private-market fund commitments and forecast cashflows using simple investment phase logic.",
    projectTitle3: "Literary Lions Forum",
    projectMeta3: "kood/Sisu • Go • SQLite",
    projectDesc3:
      "Full-stack discussion forum with posts, comments, reactions, search, and bcrypt authentication.",
    projectTitle4: "Stations Pathfinder",
    projectMeta4: "kood/Sisu • CLI • Visualization",
    projectDesc4: "Multi-train routing tool with BFS, DFS, Dijkstra & A* algorithms and PNG map rendering for solutions.",
    projectTitle5: "Portfolio website",
    projectMeta5: "markka.net • HTML/CSS/JS",
    projectDesc5:
      "Static portfolio with theme + language toggles, tabbed navigation, and accessibility-first layout.",
    projectTitle6: "Raspberry Pi home server",
    projectMeta6: "Pi-hole • Networking",
    projectDesc6: "Always-on DNS sinkhole with network-wide ad blocking and a web-based admin dashboard.",
    projectTitle7: "Cars viewer",
    projectMeta7: "Go • API integration",
    projectDesc7:
      "Web interface that consumes an external cars API for browsing, comparing, and recommendations.",
    projectLinkLabel: "View ReadMe",
    experienceHeading: "Professional experience",
    experience1Title: "Investment Analyst — Conficap Oy",
    experience1Meta: "07/2020 – 09/2025",
    experience1Body:
      "Investment and portfolio analysis across asset classes, plus internal tools and data workflows to support decision-making.",
    experience2Title: "Finance Roles — London",
    experience2Meta: "10/2019 – 05/2020",
    experience2Body: "Early-career roles in financial analysis and reporting in fast-paced environments.",
    leadershipHeading: "Leadership & responsibility",
    leadership1Title: "Co-Founder — Suomen Metsä",
    leadership1Meta: "01/2022 – Present",
    leadership1Body: "Organized fundraising and operations; raised ~€100k to protect forest land.",
    leadership2Title: "Board Member — E3 Innovations Oy",
    leadership2Meta: "11/2021 – 10/2024",
    leadership2Body: "Vehicle data analytics startup exposure to product and tech strategy.",
    leadership3Title: "Board Member — Are Oy & Conficap Oy",
    leadership3Meta: "03/2018 – Present",
    leadership3Body: "Participated in strategy, performance evaluation, and international expansion discussions.",
    stackHeading1: "Languages",
    stackHeading2: "Web & backend",
    stackHeading3: "Databases & search",
    stackHeading4: "Tools & practices",
    stackItemWeb1: "REST APIs and backend services in Go",
    stackItemWeb2: "Frontend fundamentals (HTML, CSS, JavaScript)",
    stackItemWeb3: "Clean interfaces between components",
    stackItemDb1: "Relational databases and SQL schema design",
    stackItemDb2: "Elasticsearch (hands-on project experience)",
    stackItemDb3: "Data modeling and querying",
    stackItemTools1: "Git & GitHub, peer code reviews",
    stackItemTools2: "Command-line tooling and debugging",
    stackItemTools3: "Basic system design and collaboration habits",
    contactHeading: "Let’s connect",
    contactBody:
      "I’m open to junior roles where I can grow in a professional engineering environment and contribute to production-quality code.",
    contactLocationLabel: "Location",
    contactLinkedInLabel: "LinkedIn",
    contactWebsiteLabel: "Website",
    contactLocationValue: "Helsinki, Finland (open to remote)",
    contactFormHeading: "Send a message",
    contactNameLabel: "Name",
    contactMessageLabel: "Message",
    contactNamePlaceholder: "Your name",
    contactEmailPlaceholder: "you@email.com",
    contactMessagePlaceholder: "Tell me about the role or project.",
    contactSubmit: "Send message",
    footerLine1: "Designed and built by Martti Koivisto.",
    footerLine2: "markka.net — Built for GitHub Pages."
  },
  fi: {
    languageCode: "FI",
    language: "Kieli",
    theme: "Teema",
    light: "Vaalea",
    dark: "Tumma",
    pageTitle: "Martti Koivisto | markka.net",
    metaDescription: "Martti Koiviston portfolio, full-stack-opiskelija joka hakee juniorikehittäjän rooleja.",
    navLabel: "Portfolion osiot",
    eyebrow: "markka.net",
    subtitle:
      "Full-stack-opiskelija ja uranvaihtaja sijoitusalalta. Keskityn backend-järjestelmiin, dataan ja selkeisiin rajapintoihin.",
    statusOpen: "Avoin juniorikehittäjän rooleille",
    heroHeading: "Finanssitaustasta ohjelmistokehitykseen",
    heroLead:
      "Kouluttaudun kood/Sisussa. Keskityn backend-palveluihin, data-työnkulkuun ja selkeisiin rajapintoihin.",
    ctaContact: "Ota yhteyttä",
    ctaProjects: "Katso projektit",
    statLabel1: "sijoitus oman saapumiserässä 2025",
    statLabel2: "kood/Sisu × Documtec -hackathon",
    statLabel3: "vertaisarvio 4,9/5 (27 arvioijaa)",
    focusHeading: "Tämänhetkinen fokus",
    focusItem1: "kood/Sisu full-stack -ohjelma (Go, SQL, JavaScript)",
    focusItem2: "Luotettavat backend-palvelut ja REST API:t",
    focusItem3: "Polku kohti järjestelmä- ja sulautettuja ohjelmistoja",
    coinHeading: "Markka-kolikko",
    coinBody: "Viittaus nimikirjaimiini (MK) ja Suomen entiseen valuuttaan.",
    stackFocusHeading: "Pikakatsaus stackiin",
    tabAbout: "Minusta",
    tabProjects: "Projektit",
    tabExperience: "Kokemus",
    tabStack: "Tekniikka & taidot",
    tabContact: "Ota yhteyttä",
    aboutHeading: "Minusta",
    aboutBody1: "Olen uranvaihtaja ohjelmistokehitykseen, taustana vahva analytiikkakyky finanssialalta.",
    aboutBody2:
      "Sovellan samaa kurinalaista ajattelua ohjelmistokehitykseen, painottaen backend-järjestelmiä, dataa ja selkeitä rajapintoja.",
    educationHeading: "Koulutus",
    education1Title: "kood/Sisu — Full-Stack Software Development",
    education1Meta: "10/2025 – Nykyhetki",
    education1Body: "Vertaisarvioitu projektipohjainen opintoohjelma Go:lla, SQL:llä ja JavaScriptillä.",
    education2Title: "Harvard University — CS50x",
    education2Meta: "04/2025 – 07/2025",
    education2Body:
      "Vahva pohja algoritmeihin, muistiin ja tietorakenteisiin projekteilla C:llä, Pythonilla, SQL:llä ja webillä.",
    education3Title: "Lancaster University — Postgraduate Diploma in Finance",
    education3Meta: "10/2018 – 09/2019",
    education3Body: "Lopputyö Pythonilla: web scraping, ulkoiset datahaet ja arvonmääritysmallit.",
    education4Title: "Católica Lisbon School of Business & Economics — BSc Management",
    education4Meta: "09/2015 – 08/2018",
    education4Body: "Kansainvälinen kokemus ja liiketoiminnan perusteet.",
    lookingHeading: "Mitä etsin",
    lookingItem1: "Junior Software Developer / Software Engineer -rooleja",
    lookingItem2: "Tiimejä, joissa on code review, mentorointi ja aito omistajuus",
    lookingItem3: "Mahdollisuuksia kasvaa backend-, järjestelmä- ja sulautettuun ohjelmistoon",
    projectsHeading: "Valikoidut projektit",
    projectTitle1: "Documtec Search Insights",
    projectMeta1: "Hackathon • Elasticsearch • Oikea data",
    projectDesc1:
      "Rakensin hakupohjaisen insight-työkalun tuotantotyyppisellä datalla. Sijoitus 2. kood/Sisu × Documtec -hackathonissa.",
    projectTitle2: "Fund-O-Matic",
    projectMeta2: "CS50x lopputyö • Flask • SQLite",
    projectDesc2:
      "Web-sovellus private market -rahastositoumusten suunnitteluun ja kassavirtaennusteisiin.",
    projectTitle3: "Literary Lions Forum",
    projectMeta3: "kood/Sisu • Go • SQLite",
    projectDesc3:
      "Full-stack-keskustelufoorumi posteilla, kommenteilla, reaktioilla, haulla ja bcrypt-autentikoinnilla.",
    projectTitle4: "Stations Pathfinder",
    projectMeta4: "kood/Sisu • CLI • Visualisointi",
    projectDesc4:
      "Usean junan reititystyökalu BFS-, DFS-, Dijkstra- ja A*-algoritmeilla sekä PNG-karttarenderöinnillä.",
    projectTitle5: "Portfolio-sivusto",
    projectMeta5: "markka.net • HTML/CSS/JS",
    projectDesc5:
      "Staattinen portfolio teema- ja kielivalinnoilla, välilehtinavigaatiolla ja saavutettavuusfokuksella.",
    projectTitle6: "Raspberry Pi -kotipalvelin",
    projectMeta6: "Pi-hole • Verkko",
    projectDesc6:
      "Aina päällä oleva DNS-sinkhole, joka estää mainokset koko verkossa ja tarjoaa hallintapaneelin.",
    projectTitle7: "Cars viewer",
    projectMeta7: "Go • API-integraatio",
    projectDesc7:
      "Web-käyttöliittymä, joka hakee dataa ulkoisesta cars-API:sta selaamiseen, vertailuun ja suosituksiin.",
    projectLinkLabel: "Avaa ReadMe",
    experienceHeading: "Työkokemus",
    experience1Title: "Investment Analyst — Conficap Oy",
    experience1Meta: "07/2020 – 09/2025",
    experience1Body:
      "Sijoitus- ja portfolioanalyysi useissa omaisuusluokissa sekä sisäiset työkalut ja data-työnkulut päätöksenteon tueksi.",
    experience2Title: "Finance Roles — London",
    experience2Meta: "10/2019 – 05/2020",
    experience2Body: "Ura alkuvaiheen roolit talousanalyysissa ja raportoinnissa nopeatahtisissa ympäristöissä.",
    leadershipHeading: "Luottamustehtävät",
    leadership1Title: "Co-Founder — Suomen Metsä",
    leadership1Meta: "01/2022 – Nykyhetki",
    leadership1Body:
      "Varainhankinta ja operatiivinen toiminta; kerätty noin €100k metsämaan suojeluun.",
    leadership2Title: "Board Member — E3 Innovations Oy",
    leadership2Meta: "11/2021 – 10/2024",
    leadership2Body: "Ajoneuvodataa hyödyntävä startup; näkökulmaa tuote- ja teknologiastrategiaan.",
    leadership3Title: "Board Member — Are Oy",
    leadership3Meta: "03/2018 – Nykyhetki",
    leadership3Body: "Osallistuminen strategia-, suorituskyky- ja kansainvälistymiskeskusteluihin.",
    stackHeading1: "Ohjelmointikielet",
    stackHeading2: "Web & backend",
    stackHeading3: "Tietokannat & haku",
    stackHeading4: "Työkalut & käytännöt",
    stackItemWeb1: "REST API:t ja backend-palvelut Go:lla",
    stackItemWeb2: "Frontend-perusteet (HTML, CSS, JavaScript)",
    stackItemWeb3: "Selkeät rajapinnat komponenttien välillä",
    stackItemDb1: "Relaatiotietokannat ja SQL-mallinnus",
    stackItemDb2: "Elasticsearch (käytännön projekti)",
    stackItemDb3: "Datan mallinnus ja kyselyt",
    stackItemTools1: "Git & GitHub, vertaisarviointi",
    stackItemTools2: "Komentorivityökalut ja debuggaus",
    stackItemTools3: "Perusjärjestelmä- ja tiimityötaidot",
    contactHeading: "Otetaan yhteyttä",
    contactBody:
      "Haen juniorirooleja, joissa voin kasvaa ammatillisessa ympäristössä ja tuottaa tuotantotason koodia.",
    contactLocationLabel: "Sijainti",
    contactLinkedInLabel: "LinkedIn",
    contactWebsiteLabel: "Verkkosivu",
    contactLocationValue: "Helsinki, Suomi (avoin etätyölle)",
    contactFormHeading: "Lähetä viesti",
    contactNameLabel: "Nimi",
    contactMessageLabel: "Viesti",
    contactNamePlaceholder: "Nimesi",
    contactEmailPlaceholder: "sinä@email.com",
    contactMessagePlaceholder: "Kerro roolista tai projektista.",
    contactSubmit: "Lähetä viesti",
    footerLine1: "Suunniteltu ja rakennettu: Martti Koivisto.",
    footerLine2: "markka.net — Rakennettu GitHub Pagesille."
  }
};

let currentTheme = storedTheme || (prefersDark ? "dark" : "light");
let currentLanguage = storedLanguage || browserLanguage;
if (!translations[currentLanguage]) {
  currentLanguage = "en";
}

function updateThemeLabel() {
  if (!themeLabel) {
    return;
  }
  const strings = translations[currentLanguage] || translations.en;
  const modeLabel = currentTheme === "dark" ? strings.dark : strings.light;
  themeLabel.textContent = strings.theme + ": " + modeLabel;
}

function updateLanguageLabel() {
  if (!languageLabel) {
    return;
  }
  const strings = translations[currentLanguage] || translations.en;
  languageLabel.textContent = strings.language + ": " + strings.languageCode;
}

// Apply translated copy to text nodes, placeholders, and attributes.
function applyTranslations() {
  const strings = translations[currentLanguage] || translations.en;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (Object.prototype.hasOwnProperty.call(strings, key)) {
      element.textContent = strings[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (Object.prototype.hasOwnProperty.call(strings, key)) {
      element.setAttribute("placeholder", strings[key]);
    }
  });

  document.querySelectorAll("[data-i18n-content]").forEach((element) => {
    const key = element.dataset.i18nContent;
    if (Object.prototype.hasOwnProperty.call(strings, key)) {
      element.setAttribute("content", strings[key]);
    }
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const key = element.dataset.i18nAria;
    if (Object.prototype.hasOwnProperty.call(strings, key)) {
      element.setAttribute("aria-label", strings[key]);
    }
  });

  updateThemeLabel();
  updateLanguageLabel();
}

function setLanguage(language) {
  currentLanguage = translations[language] ? language : "en";
  root.setAttribute("lang", currentLanguage);
  localStorage.setItem("language", currentLanguage);
  applyTranslations();
  if (languageToggle) {
    languageToggle.setAttribute("aria-pressed", currentLanguage === "fi");
  }
}

function setTheme(mode) {
  currentTheme = mode;
  root.setAttribute("data-theme", mode);
  localStorage.setItem("theme", mode);
  updateThemeLabel();
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", mode === "dark");
  }
}

// Apply the saved or system language on first load.
setLanguage(currentLanguage);

// Apply the saved or system theme on first load.
setTheme(currentTheme);

// Toggle theme and update the label/ARIA state for accessibility.
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const next = currentTheme === "dark" ? "light" : "dark";
    setTheme(next);
  });
}

// Toggle language between English and Finnish.
if (languageToggle) {
  languageToggle.addEventListener("click", () => {
    const next = currentLanguage === "fi" ? "en" : "fi";
    setLanguage(next);
  });
}

const tabs = Array.from(document.querySelectorAll("[role='tab']"));
const panels = Array.from(document.querySelectorAll("[role='tabpanel']"));
const tabLinks = Array.from(document.querySelectorAll("[data-tab-link]"));
const techLinks = Array.from(document.querySelectorAll("[data-tech]"));
const projectCards = Array.from(document.querySelectorAll(".project-card"));
let activeTech = null;

function applyTechFilter(nextTech) {
  if (!nextTech) {
    activeTech = null;
  } else {
    activeTech = activeTech === nextTech ? null : nextTech;
  }

  const hasFilter = Boolean(activeTech);
  projectCards.forEach((card) => {
    const tags = (card.dataset.tags || "").split(/\s+/).filter(Boolean);
    const isMatch = hasFilter && tags.includes(activeTech);
    card.classList.toggle("is-highlight", hasFilter && isMatch);
    card.classList.toggle("is-dim", hasFilter && !isMatch);
  });

  techLinks.forEach((link) => {
    const isActive = hasFilter && link.dataset.tech === activeTech;
    link.classList.toggle("is-active", isActive);
  });
}

function activateTab(name, setFocus, updateHash) {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.tab === name;
    tab.setAttribute("aria-selected", isActive);
    tab.tabIndex = isActive ? 0 : -1;
  });

  panels.forEach((panel) => {
    const isActive = panel.dataset.panel === name;
    if (isActive) {
      panel.removeAttribute("hidden");
    } else {
      panel.setAttribute("hidden", "true");
    }
  });

  if (setFocus) {
    const activeTab = tabs.find((tab) => tab.dataset.tab === name);
    if (activeTab) {
      activeTab.focus();
    }
  }

  // Keep the URL hash in sync so deep links work.
  if (updateHash !== false && history.replaceState) {
    history.replaceState(null, "", "#" + name);
  }
}

// Initialize with a hash-tab if available, otherwise default to About.
const initialTab = window.location.hash.replace("#", "");
if (initialTab && tabs.some((tab) => tab.dataset.tab === initialTab)) {
  activateTab(initialTab, false, false);
} else {
  activateTab("about", false, false);
}

// Click and keyboard handlers keep tab navigation accessible.
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activateTab(tab.dataset.tab, false, true);
  });

  tab.addEventListener("keydown", (event) => {
    const currentIndex = tabs.indexOf(tab);
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
      activateTab(tabs[nextIndex].dataset.tab, true, true);
    }
  });
});

techLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    applyTechFilter(link.dataset.tech);
    const projectsTab = tabs.find((tab) => tab.dataset.tab === "projects");
    const isProjectsActive = projectsTab && projectsTab.getAttribute("aria-selected") === "true";
    if (!isProjectsActive) {
      activateTab("projects", false, true);
      const panel = document.querySelector("[data-panel='projects']");
      if (panel) {
        panel.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});

// CTA links switch tabs and smoothly scroll to the panel.
tabLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    activateTab(link.dataset.tabLink, true, true);
    if (link.dataset.tech) {
      applyTechFilter(link.dataset.tech);
    }
    const panel = document.querySelector("[data-panel='" + link.dataset.tabLink + "']");
    if (panel) {
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
