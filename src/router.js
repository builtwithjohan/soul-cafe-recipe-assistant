(function () {
  "use strict";

  const viewToHash = {
    landing: "#/landing",
    home: "#/recipes",
    overview: "#/recipe",
    cook: "#/cook",
    done: "#/done",
    menus: "#/menus",
    ordering: "#/ordering",
    dashboard: "#/dashboard",
  };

  function normalizeHash(rawHash) {
    const hash = String(rawHash || "").trim();
    if (!hash) return "#/landing";
    if (hash.startsWith("#/")) return hash;
    if (hash.startsWith("#")) return `#/${hash.slice(1)}`;
    return "#/landing";
  }

  function hashForView(viewName) {
    return viewToHash[viewName] || "#/landing";
  }

  function viewFromHash(rawHash) {
    const hash = normalizeHash(rawHash);
    const path = hash.replace(/^#\//, "").split("?")[0].toLowerCase();

    if (path === "recipes") return "home";
    if (path === "recipe") return "overview";
    if (path === "cook") return "cook";
    if (path === "done") return "done";
    if (path === "menus") return "menus";
    if (path === "ordering") return "ordering";
    if (path === "dashboard") return "dashboard";
    return "landing";
  }

  function ensureHashForView(viewName) {
    const nextHash = hashForView(viewName);
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
      return true;
    }
    return false;
  }

  window.AppRouter = {
    normalizeHash,
    hashForView,
    viewFromHash,
    ensureHashForView,
  };
})();
