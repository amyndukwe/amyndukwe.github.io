/* theme.js - light / dark mode button for the whole portfolio.
   - Remembers the visitor's choice in the browser (localStorage).
   - Starts in dark mode the first time someone visits.
   - Adds the button to the header by itself, so no HTML changes are needed except loading this file. */
(function () {
  var KEY = "theme";
  var root = document.documentElement;

  function getSaved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }   // storage can be blocked
  }
  function save(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
  }

  var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

  var button = null;

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    if (!button) return;
    var next = theme === "light" ? "dark" : "light";
    button.innerHTML = theme === "light" ? MOON : SUN;      // show the mode you will switch TO
    button.setAttribute("aria-label", "Switch to " + next + " mode");
    button.setAttribute("title", "Switch to " + next + " mode");
  }

  // Set the theme straight away so the page does not flash the wrong colours
  apply(getSaved() === "light" ? "light" : "dark");

  document.addEventListener("DOMContentLoaded", function () {
    var header = document.querySelector("header");
    if (!header) return;
    button = document.createElement("button");
    button.type = "button";
    button.className = "theme-toggle";
    header.appendChild(button);
    apply(root.getAttribute("data-theme"));
    button.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      save(next);
      apply(next);
    });
  });
})();
