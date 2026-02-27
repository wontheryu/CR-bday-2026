(() => {
  const splash = document.getElementById('splash');
  const after = document.getElementById('afterLoad');
  const loadGif = document.getElementById('loadGif');

  // 필수 DOM이 없으면 종료
  if (!after || !loadGif) return;

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

  // 로딩 노출 시간 X를 정규분포 N(4, 1) (초)에서 샘플링하되, X > 2.5s 조건 적용
  // 그리고 "GIF가 끝난 뒤" 전환되도록, 기존 GIF 한 사이클(3.5s) 단위로 올림(ceil) 처리
  const GIF_LOOP_MS = 3500; // 기존 세팅(변화 주지 않기)

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
    // 조건을 만족할 때까지 샘플링(보통 1~2번 내로 통과)
    let ms = Math.round(sampleNormalSeconds(4, 1) * 1000);
    while (ms <= MIN_MS) {
      ms = Math.round(sampleNormalSeconds(4, 1) * 1000);
    }

    // GIF가 끝난 뒤에만 전환되도록 GIF 한 사이클 단위로 올림
    const cycles = Math.ceil(ms / GIF_LOOP_MS);
    return cycles * GIF_LOOP_MS;
  }

  const splashDurationMs = getRandomSplashDurationMs();
  setTimeout(closeSplash, splashDurationMs);
})();
