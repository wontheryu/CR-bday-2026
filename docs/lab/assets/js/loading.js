document.addEventListener("DOMContentLoaded", () => {
  const content = window.LAB_CONTENT || {};
  const splash = document.getElementById("loading-screen");
  const home = document.getElementById("home-screen");
  const loadingStorageKey = content?.loading?.storageKey || "cr-bday-2026.lab.loading-seen";

  if (!splash || !home) {
    return;
  }

  if (shouldBypassLoading(loadingStorageKey)) {
    showHomeScreen();
    return;
  }

  preloadHomeAssets(home).finally(() => {
    const duration = getLoadingDuration(content);
    window.setTimeout(showHomeScreen, duration);
  });

  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) {
      return;
    }

    if (hasSeenLoading(loadingStorageKey)) {
      showHomeScreen();
    }
  });

  function showHomeScreen() {
    markLoadingSeen(loadingStorageKey);
    splash.classList.remove("is-active");
    splash.setAttribute("aria-hidden", "true");
    home.classList.add("is-active");
    home.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-loaded");
  }
});

function shouldBypassLoading(storageKey) {
  const searchParams = new URLSearchParams(window.location.search);
  return (
    searchParams.get("preview") === "home" ||
    searchParams.get("skipLoading") === "1" ||
    hasSeenLoading(storageKey)
  );
}

function getLoadingDuration(content) {
  const configuredDuration = Number(content?.loading?.durationMs);
  return Number.isFinite(configuredDuration) ? configuredDuration : 3200;
}

function hasSeenLoading(storageKey) {
  try {
    return window.sessionStorage.getItem(storageKey) === "true";
  } catch {
    return false;
  }
}

function markLoadingSeen(storageKey) {
  try {
    window.sessionStorage.setItem(storageKey, "true");
  } catch {
    // no-op
  }
}

async function preloadHomeAssets(home) {
  const images = Array.from(home.querySelectorAll("img"));

  if (!images.length) {
    return;
  }

  await Promise.all(
    images.map((image) =>
      image.decode ? image.decode().catch(() => {}) : Promise.resolve()
    )
  );
}
