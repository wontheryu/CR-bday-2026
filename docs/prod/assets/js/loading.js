document.addEventListener("DOMContentLoaded", () => {
  const loadingFill = document.getElementById("loading-bar-fill");
  const loadingText = document.getElementById("loading-text");

  const loadingDuration = getRandomLoadingDuration();
  const startTime = performance.now();

  const loadingMessages = [
    "시스템 접속 중",
    "메인 화면 불러오는 중",
    "비트 프레임 구성 중",
    "입장 준비 완료 직전"
  ];

  let messageIndex = 0;

  const messageInterval = setInterval(() => {
    messageIndex = (messageIndex + 1) % loadingMessages.length;
    if (loadingText) {
      loadingText.textContent = loadingMessages[messageIndex];
    }
  }, 900);

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

    clearInterval(messageInterval);
    showHomeScreen();
  }

  requestAnimationFrame(animate);
});

function getRandomLoadingDuration() {
  const mean = 4000;
  const stdDev = 400;
  let value = gaussianRandom(mean, stdDev);

  value = Math.max(value, 3200);
  value = Math.min(value, 6500);

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