(() => {
  const splash = document.getElementById('splash');
  const after = document.getElementById('afterLoad');
  const loadGif = document.getElementById('loadGif');

  // 필수 DOM이 없으면 종료
  if (!splash || !after || !loadGif) return;

  // 로딩 중에는 캐릭터 숨김
  after.classList.remove('is-visible');

  // GIF를 항상 1프레임부터 시작시키기(강제 리셋)
  function restartGif() {
    loadGif.removeAttribute('src');
    requestAnimationFrame(() => {
      loadGif.src = `./assets/load-bit.gif?cb=${Date.now()}`;
    });
  }

  // 캐릭터 이미지 깜빡임 방지: 디코드 대기(지원 안 하면 즉시 통과)
  async function preloadCharacters() {
    const imgs = Array.from(after.querySelectorAll('img'));
    if (imgs.length === 0) return;

    await Promise.all(
      imgs.map((img) => (img.decode ? img.decode().catch(() => {}) : Promise.resolve()))
    );
  }

  let closed = false;
  async function closeSplash() {
    if (closed) return;
    closed = true;

    if (splash && document.body.contains(splash)) splash.remove();

    await preloadCharacters();
    after.classList.add('is-visible');
  }

  // 최초 로드/새로고침에서 GIF 리셋
  restartGif();

  // bfcache(뒤로/앞으로) 복귀에서도 GIF 리셋
  window.addEventListener('pageshow', () => {
    restartGif();
  });

  // 로딩 노출 시간 X ~ N(4,1) (초), 단 X > 2.5초
  function sampleNormalSeconds(mean = 4, std = 1) {
    // Box–Muller transform
    let u = 0;
    let v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return mean + std * z;
  }
  function getRandomSplashDurationMs() {
  const MIN_MS = 2500;
  const MAX_MS = 8000;

  let ms = Math.round(sampleNormalSeconds(4, 1) * 1000);
  while (ms <= MIN_MS || ms > MAX_MS) {
    ms = Math.round(sampleNormalSeconds(4, 1) * 1000);
  }
  return ms;
  }

  const splashDurationMs = getRandomSplashDurationMs();
  setTimeout(closeSplash, splashDurationMs);
})();