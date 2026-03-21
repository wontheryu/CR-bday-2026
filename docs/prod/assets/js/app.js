document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("./data/content.json");
    const content = await response.json();

    applyMeta(content);
    applyHeader(content);
    applyMenu(content);
  } catch (error) {
    console.error("콘텐츠 로드 실패:", error);
  }
});

function applyMeta(content) {
  if (content?.meta?.title) {
    document.title = content.meta.title;
  }
}

function applyHeader(content) {
  const headerImage = document.querySelector(".site-header-image");
  if (!headerImage) return;

  if (content?.home?.headerAlt) {
    headerImage.alt = content.home.headerAlt;
  }
}

function applyMenu(content) {
  const buttons = document.querySelectorAll(".menu-button");
  const items = content?.home?.menuButtons || [];

  buttons.forEach((button, index) => {
    const item = items[index];
    if (!item) return;

    button.textContent = item.label || `MENU ${index + 1}`;
    button.dataset.link = item.link || "#";
  });

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const link = button.dataset.link;
      if (!link || link === "#") {
        console.warn("연결된 페이지가 없습니다.");
        return;
      }
      window.location.href = link;
    });
  });
}