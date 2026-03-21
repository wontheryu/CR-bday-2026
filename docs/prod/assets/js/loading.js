document.addEventListener("DOMContentLoaded", () => {
  if (shouldShowHomePreview()) {
    showHomeScreen();
    return;
  }

  const loadingDuration = getRandomLoadingDuration();
  const startTime = performance.now();
  const animationTimer = window.setInterval(() => {
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / loadingDuration, 1);

    updateLoadingMessages(progress);

    if (progress >= 1) {
      window.clearInterval(animationTimer);
      showHomeScreen();
    }
  }, 80);

  updateLoadingMessages(0);
});

function shouldShowHomePreview() {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get("preview") === "home";
}

function getRandomLoadingDuration() {
  const mean = 2500;
  const stdDev = 1000;
  let value = gaussianRandom(mean, stdDev);

  value = Math.max(value, 1500);
  value = Math.min(value, 4000);

  return value;
}

function updateLoadingMessages(progress) {
  const items = document.querySelectorAll(".loading-message-item");

  if (!items.length) return;

  const activeIndex = Math.min(
    Math.floor(progress * items.length),
    items.length - 1
  );

  items.forEach((item, index) => {
    item.classList.toggle("is-complete", index < activeIndex);
    item.classList.toggle("is-active", index === activeIndex);
  });
}

function gaussianRandom(mean, stdDev) {
  let u = 0;
  let v = 0;

  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();

  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return z * stdDev + mean;
}

function showHomeScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  const homeScreen = document.getElementById("home-screen");

  if (loadingScreen) {
    loadingScreen.classList.remove("is-active");
    loadingScreen.setAttribute("aria-hidden", "true");
  }

  if (homeScreen) {
    homeScreen.classList.add("is-active");
    homeScreen.setAttribute("aria-hidden", "false");
  }

  document.body.classList.add("is-loaded");
}
