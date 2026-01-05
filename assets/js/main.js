const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-label");
const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function setTheme(mode) {
  root.setAttribute("data-theme", mode);
  localStorage.setItem("theme", mode);
  themeLabel.textContent = "Theme: " + mode.charAt(0).toUpperCase() + mode.slice(1);
  themeToggle.setAttribute("aria-pressed", mode === "dark");
}

// Apply the saved or system theme on first load.
setTheme(storedTheme || (prefersDark ? "dark" : "light"));

// Toggle theme and update the label/ARIA state for accessibility.
themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  setTheme(next);
});

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
