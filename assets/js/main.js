const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-label");
const languageToggle = document.querySelector(".language-toggle");
const languageLabel = document.querySelector(".language-label");

const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const storedLanguage = localStorage.getItem("language");
const browserLanguage = navigator.language && navigator.language.toLowerCase().startsWith("fi") ? "fi" : "en";

// Translation copy for all UI strings.
const translations = {
  en: {
    languageCode: "EN",
    language: "Language",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    pageTitle: "Junior Developer Portfolio",
    metaDescription: "Junior developer portfolio with projects, education, and contact details.",
    navLabel: "Portfolio sections",
    eyebrow: "Junior Developer Portfolio",
    subtitle:
      "Building resilient, accessible web experiences with a focus on performance, clean architecture, and thoughtful UI details.",
    statusOpen: "Open to internships and junior roles",
    heroHeading: "Creative engineering with a product mindset",
    heroLead:
      "I am a junior developer who loves turning complex requirements into simple, elegant flows. I build with modern tooling, write clean documentation, and keep an eye on performance budgets from the first commit.",
    metaComponents: "Production-ready UI components",
    metaProjects: "Team projects shipped this year",
    metaAccessibility: "Lighthouse accessibility scores",
    ctaContact: "Contact me",
    ctaProjects: "View projects",
    stackFocus: "Stack focus",
    quickPitch: "Quick pitch",
    quickPitchText:
      "I enjoy pairing thoughtful UX with reliable engineering. Ask me about my design system experiments, deployment automation, or building a11y-first components.",
    tabAbout: "About me",
    tabProjects: "Projects",
    tabEducation: "Education",
    tabCertificates: "Certificates",
    tabContact: "Contact me",
    aboutHeading: "About me",
    aboutBody:
      "I am a junior full-stack developer with a background in product design and a drive to build clean, reliable interfaces. I thrive in collaborative teams and enjoy translating messy problem spaces into structured plans.",
    bringHeading: "What I bring",
    bringItem1: "Strong communication and documentation habits to keep teams aligned.",
    bringItem2: "Accessibility-first UI thinking, including keyboard testing and semantic HTML.",
    bringItem3: "Curiosity for backend systems, APIs, and deployment pipelines.",
    toolkitHeading: "Toolkit highlights",
    projectMeta1: "Design system \u2022 React \u2022 TypeScript",
    projectDesc1:
      "Built a component library with tokens, theming, and documented patterns. Included automated visual testing and accessibility checklists to speed up onboarding.",
    projectMeta2: "Data visualization \u2022 Node \u2022 PostgreSQL",
    projectDesc2:
      "Delivered a responsive analytics suite with role-based access, server-side caching, and a metrics export flow for stakeholders.",
    projectMeta3: "Full-stack \u2022 Auth \u2022 Automation",
    projectDesc3:
      "Led a team project for matching volunteers with local events. Implemented multi-step onboarding, transactional emails, and automated regression testing.",
    educationTitle1: "BSc in Computer Science",
    educationBody1:
      "Focused on software architecture, HCI, and data systems. Led the student developer club and hosted peer workshops on testing and code reviews.",
    educationTitle2: "Software Engineering Internship",
    educationBody2:
      "Built internal tooling for QA automation, contributed to UI refactors, and partnered with designers to unify component patterns across products.",
    educationTitle3: "Full-Stack Bootcamp",
    educationBody3:
      "Strengthened hands-on skills in React, Node, and database modeling. Capstone project focused on civic tech and responsive design.",
    certificatesTitle1: "Frontend Performance Essentials",
    certificatesMeta1: "Google Developers \u2022 2024",
    certificatesBody1:
      "Hands-on labs focused on Core Web Vitals, bundle optimization, and building consistently fast interfaces.",
    certificatesTitle2: "Testing JavaScript Applications",
    certificatesMeta2: "Open Source Academy \u2022 2023",
    certificatesBody2:
      "Built a testing strategy with unit, integration, and end-to-end coverage using modern tooling and CI.",
    certificatesTitle3: "Cloud Foundations",
    certificatesMeta3: "AWS Educate \u2022 2023",
    certificatesBody3:
      "Covered deployment basics, infrastructure terminology, and monitoring patterns for modern web apps.",
    contactHeading: "Let's connect",
    contactBody:
      "I am eager to join a team where I can grow, contribute to real products, and keep learning from senior engineers. Feel free to reach out with roles, collaborations, or mentorship opportunities.",
    contactEmailLabel: "Email",
    contactLocationLabel: "Location",
    contactLinkedInLabel: "LinkedIn",
    contactLocationValue: "Helsinki, Finland (open to remote)",
    contactFormHeading: "Send a message",
    contactNameLabel: "Name",
    contactMessageLabel: "Message",
    contactNamePlaceholder: "Your name",
    contactEmailPlaceholder: "you@email.com",
    contactMessagePlaceholder: "Tell me about the role or project.",
    contactSubmit: "Send message",
    footerLine1: "Designed and built by Martti Koivisto.",
    footerLine2: "Updated 2026. Built for GitHub Pages."
  },
  fi: {
    languageCode: "FI",
    language: "Kieli",
    theme: "Teema",
    light: "Vaalea",
    dark: "Tumma",
    pageTitle: "Junior-kehittäjän portfolio",
    metaDescription: "Junior-kehittäjän portfolio projekteilla, koulutuksella ja yhteystiedoilla.",
    navLabel: "Portfolion osiot",
    eyebrow: "Junior-kehittäjän portfolio",
    subtitle:
      "Rakennan kestavia, saavutettavia web-kokemuksia painottaen suorituskykya, selkeaa arkkitehtuuria ja harkittuja UI-yksityiskohtia.",
    statusOpen: "Haen harjoittelu- ja junior-rooleja",
    heroHeading: "Luovaa ohjelmointia tuoteajattelulla",
    heroLead:
      "Olen junior-kehittaja, joka nauttii monimutkaisten vaatimusten muuttamisesta selkeiksi ja tyylikkaiksi virroiksi. Rakennan modernilla toolchainilla, kirjoitan selkeaa dokumentaatiota ja pidan suorituskykybudjetit mielessa alusta asti.",
    metaComponents: "Tuotantovalmiita UI-komponentteja",
    metaProjects: "Tiimiprojekteja julkaistu tana vuonna",
    metaAccessibility: "Lighthouse-saavutettavuuspisteet",
    ctaContact: "Ota yhteytta",
    ctaProjects: "Katso projektit",
    stackFocus: "Teknologiakeskittyma",
    quickPitch: "Nopea esittely",
    quickPitchText:
      "Yhdistan harkitun UX:n ja luotettavan insinooroinnin. Kysy design system -kokeiluistani, deploy-automaatioista tai a11y-ensin -komponenteista.",
    tabAbout: "Minusta",
    tabProjects: "Projektit",
    tabEducation: "Koulutus",
    tabCertificates: "Sertifikaatit",
    tabContact: "Ota yhteytta",
    aboutHeading: "Minusta",
    aboutBody:
      "Olen junior full-stack -kehittaja, jolla on tausta tuotesuunnittelussa ja halu rakentaa siisteja, luotettavia kayttoliittymia. Viihdyn yhteistyossa ja nautin sekavien ongelmien muuntamisesta selkeiksi suunnitelmiksi.",
    bringHeading: "Mita tuon mukanani",
    bringItem1: "Selkea viestinta ja dokumentointi, jotka pitaa tiimit linjassa.",
    bringItem2: "Saavutettavuus ensin -ajattelu, mukaan lukien nappaimistotestaus ja semanttinen HTML.",
    bringItem3: "Uteliaisuus backend-jarjestelmiin, API:hin ja julkaisuputkiin.",
    toolkitHeading: "Tyokalujen kohokohdat",
    projectMeta1: "Design-jarjestelma \u2022 React \u2022 TypeScript",
    projectDesc1:
      "Rakensin komponenttikirjaston tokeneilla, teemalla ja dokumentoiduilla kaannoilla. Mukana automaattinen visuaalinen testaus ja saavutettavuuslistat, jotka nopeuttavat onboardingia.",
    projectMeta2: "Data-visualisointi \u2022 Node \u2022 PostgreSQL",
    projectDesc2:
      "Toimitin responsiivisen analytiikkanakyman roolipohjaisella paasylla, palvelinpuolen vailimuistilla ja mittarien vientipolulla sidosryhmille.",
    projectMeta3: "Full-stack \u2022 Autentikointi \u2022 Automaatio",
    projectDesc3:
      "Johdin tiimiprojektia vapaaehtoisten yhdistamiseksi paikallisiin tapahtumiin. Toteutin monivaiheisen onboardingin, transaktiosahkopostit ja automaattisen regressiotestauksen.",
    educationTitle1: "Tietojenkasittelytieteen kandidaatti",
    educationBody1:
      "Painotus ohjelmistoarkkitehtuuriin, HCI:hin ja datajarjestelmiin. Johdin opiskelijakehittajaklubia ja jarjestin vertaisworkshopeja testauksesta ja code review'sta.",
    educationTitle2: "Ohjelmistokehitysharjoittelu",
    educationBody2:
      "Rakensin sisaisia QA-tyokaluja automaatiolle, osallistuin UI-refaktorointeihin ja tein yhteistyoa suunnittelijoiden kanssa komponenttimallien yhtenaistamiseksi.",
    educationTitle3: "Full-stack-bootcamp",
    educationBody3:
      "Vahvistin kaytannon taitoja Reactissa, Nodessa ja tietokantamallinnuksessa. Capstone-projekti keskittyi civic techiin ja responsiiviseen suunnitteluun.",
    certificatesTitle1: "Frontend-suorituskyvyn perusteet",
    certificatesMeta1: "Google Developers \u2022 2024",
    certificatesBody1:
      "Kaytannon harjoituksia Core Web Vitals -mittareista, bundle-optimoinnista ja tasaisen nopeiden kayttoliittymien rakentamisesta.",
    certificatesTitle2: "JavaScript-sovellusten testaus",
    certificatesMeta2: "Open Source Academy \u2022 2023",
    certificatesBody2:
      "Rakensin testausstrategian yksikko-, integraatio- ja end-to-end -tasolle modernilla toolchainilla ja CI:lla.",
    certificatesTitle3: "Pilvipalveluiden perusteet",
    certificatesMeta3: "AWS Educate \u2022 2023",
    certificatesBody3:
      "Kattasi julkaisu- ja infrastruktuuriperusteet, valvonnan ja yleiset turvallisuusmallit modernille webille.",
    contactHeading: "Otetaan yhteytta",
    contactBody:
      "Olen innokas liittymaan tiimiin, jossa voin kasvaa, tehda oikeita tuotteita ja oppia kokeneemmilta insinooreilta. Ota yhteytta rooleista, yhteistyosta tai mentoroinnista.",
    contactEmailLabel: "Sahkoposti",
    contactLocationLabel: "Sijainti",
    contactLinkedInLabel: "LinkedIn",
    contactLocationValue: "Helsinki, Suomi (avoin etatyolle)",
    contactFormHeading: "Laheta viesti",
    contactNameLabel: "Nimi",
    contactMessageLabel: "Viesti",
    contactNamePlaceholder: "Nimesi",
    contactEmailPlaceholder: "sina@email.com",
    contactMessagePlaceholder: "Kerro roolista tai projektista.",
    contactSubmit: "Laheta viesti",
    footerLine1: "Suunniteltu ja rakennettu: Martti Koivisto.",
    footerLine2: "Paivitetty 2026. Rakennettu GitHub Pagesille."
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

// CTA links switch tabs and smoothly scroll to the panel.
tabLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    activateTab(link.dataset.tabLink, true, true);
    const panel = document.querySelector("[data-panel='" + link.dataset.tabLink + "']");
    if (panel) {
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
