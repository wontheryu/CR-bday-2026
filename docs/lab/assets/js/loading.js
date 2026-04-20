document.addEventListener("DOMContentLoaded", () => {
  const content = window.LAB_CONTENT || {};
  const splash = document.getElementById("loading-screen");
  const home = document.getElementById("home-screen");
  const loadingArt = document.getElementById("loading-art");

  if (!splash || !home || !loadingArt) {
    return;
  }

  if (shouldShowHomePreview()) {
    showHomeScreen();
    return;
  }

  restartLoadingArt(loadingArt);

  preloadHomeAssets(home).finally(() => {
    const duration = getLoadingDuration(content);
    window.setTimeout(showHomeScreen, duration);
  });

  window.addEventListener("pageshow", () => {
    restartLoadingArt(loadingArt);
  });

  function showHomeScreen() {
    splash.classList.remove("is-active");
    splash.setAttribute("aria-hidden", "true");
    home.classList.add("is-active");
    home.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-loaded");
  }
});

function shouldShowHomePreview() {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get("preview") === "home";
}

function restartLoadingArt(node) {
  const originalSrc = node.dataset.src || node.getAttribute("src");
  node.dataset.src = originalSrc;
  node.removeAttribute("src");

  requestAnimationFrame(() => {
    node.src = `${originalSrc}?cb=${Date.now()}`;
  });
}

function getLoadingDuration(content) {
  const configuredDuration = Number(content?.loading?.durationMs);
  return Number.isFinite(configuredDuration) ? configuredDuration : 3200;
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
