/* A shared, accessible theme preference for the homepage and poetry room. */
(function () {
  "use strict";

  const storageKey = "mayank-site-theme";
  const root = document.documentElement;
  const buttons = Array.from(document.querySelectorAll("[data-theme-toggle]"));
  const colorMeta = document.querySelector('meta[name="theme-color"]');

  function savedTheme() {
    try {
      return localStorage.getItem(storageKey) === "dark" ? "dark" : "light";
    } catch (_) {
      return root.dataset.theme === "dark" ? "dark" : "light";
    }
  }

  function applyTheme(value, save) {
    const dark = value === "dark";
    root.dataset.theme = dark ? "dark" : "light";
    if (colorMeta) colorMeta.setAttribute("content", dark ? "#09172d" : "#f3f8fc");

    for (const button of buttons) {
      button.setAttribute("aria-pressed", dark ? "true" : "false");
      button.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
      const label = button.querySelector("[data-theme-label]");
      const icon = button.querySelector(".theme-icon");
      if (label) label.textContent = dark ? "Light mode" : "Dark mode";
      if (icon) icon.textContent = dark ? "☼" : "☾";
    }

    if (save) {
      try { localStorage.setItem(storageKey, dark ? "dark" : "light"); }
      catch (_) { /* Theme still works if browser storage is unavailable. */ }
    }
  }

  applyTheme(savedTheme(), false);

  for (const button of buttons) {
    button.addEventListener("click", function () {
      applyTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
    });
  }

  window.addEventListener("storage", function (event) {
    if (event.key === storageKey) applyTheme(savedTheme(), false);
  });
})();
