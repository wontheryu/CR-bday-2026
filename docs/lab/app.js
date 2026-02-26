// docs/lab/app.js
(() => {
  const splash = document.getElementById("splash");
  const after = document.getElementById("afterLoad");
  const loadGif = document.getElementById("loadGif");

  if (!splash || !after || !loadGif) return;

  // GIF를 항상 1프레임부터 시작시키기(강제 리셋)
  function restartGif() {
    // 1) src 비우기
    loadGif.removeAttribute("src");
    // 2) 다음 프레임에 새 src 주기 (Safari/Chrome 안정)
    requestAnimationFrame(() => {
      loadGif.src = `./assets/load.gif?cb=${Date.now()}`;
    });
  }

  // 스플래시 닫기 + 캐릭터 보여주기
  function closeSplash() {
    if (document.body.contains(splash)) splash.remove();
    after.classList.add("is-visible");
  }

  // 최초 1회
  restartGif();

  // bfcache(뒤로가기/앞으로가기) 대응
  window.addEventListener("pageshow", restartGif);

  // 3.5초 후 자동 전환
  setTimeout(closeSplash, 3500);
})();