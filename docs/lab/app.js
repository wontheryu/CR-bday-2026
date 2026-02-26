// docs/lab/app.js
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
      loadGif.src = `./assets/load.gif?cb=${Date.now()}`;
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

  // 3.5초 후 로딩 종료 → 캐릭터 표시
  setTimeout(closeSplash, 3500);
})();