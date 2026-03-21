document.addEventListener("DOMContentLoaded", () => {
  const loadingFill = document.getElementById("loading-bar-fill");

  const loadingDuration = getRandomLoadingDuration();
  const startTime = performance.now();

  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / loadingDuration, 1);

    if (loadingFill) {
      loadingFill.style.width = `${progress * 100}%`;
    }

    if (progress < 1) {
      requestAnimationFrame(animate);
      return;
    }

    showHomeScreen();
  }

  requestAnimationFrame(animate);
});

function getRandomLoadingDuration() {
  const mean = 2500;
  const stdDev = 1000;
  let value = gaussianRandom(mean, stdDev);

  value = Math.max(value, 1500);
  value = Math.min(value, 4000);

  return value;
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
