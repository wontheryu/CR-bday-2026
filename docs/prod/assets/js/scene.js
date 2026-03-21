document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const body = document.body;

  function getViewportSize() {
    if (window.visualViewport) {
      return {
        width: window.visualViewport.width,
        height: window.visualViewport.height
      };
    }

    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  function updateSceneMode(viewport) {
    body.classList.toggle("is-portrait-scene", viewport.height > viewport.width);
  }

  function updateSceneScale() {
    const viewport = getViewportSize();
    updateSceneMode(viewport);

    const computed = getComputedStyle(body);
    const sceneWidth = parseFloat(computed.getPropertyValue("--scene-width"));
    const sceneHeight = parseFloat(computed.getPropertyValue("--scene-height"));
    const viewportPad = parseFloat(computed.getPropertyValue("--viewport-pad")) || 0;
    const availableWidth = Math.max(viewport.width - viewportPad * 2, 0);
    const availableHeight = Math.max(viewport.height - viewportPad * 2, 0);
    const scale = Math.min(availableWidth / sceneWidth, availableHeight / sceneHeight);

    root.style.setProperty("--scene-scale", `${Math.max(scale, 0)}`);
    body.classList.add("is-scene-ready");
  }

  updateSceneScale();
  window.addEventListener("resize", updateSceneScale);

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", updateSceneScale);
  }
});
