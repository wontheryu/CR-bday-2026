document.addEventListener("DOMContentLoaded", () => {
  const content = window.LAB_CONTENT || {};

  applyMeta(content);
  applyHomeCopy(content);
  renderMenu(content);
});

function applyMeta(content) {
  if (content?.meta?.title) {
    document.title = content.meta.title;
  }

  if (content?.loading?.imageAlt) {
    const loadingArt = document.getElementById("loading-art");
    if (loadingArt) {
      loadingArt.alt = content.loading.imageAlt;
    }
  }

  if (content?.home?.logoAlt) {
    const homeLogo = document.querySelector(".home-logo");
    if (homeLogo) {
      homeLogo.alt = content.home.logoAlt;
    }
  }
}

function applyHomeCopy(content) {
  const caption = document.querySelector("[data-home-caption]");
  const copy = document.querySelector("[data-home-copy]");

  if (caption) {
    caption.textContent = content?.home?.caption || "8-BIT HEART PROTOTYPE";
  }

  if (copy) {
    copy.textContent =
      content?.home?.copy ||
      "게임 UI 중심 홈 화면과 메뉴 구조를 확인하는 실험용 빌드.";
  }
}

function renderMenu(content) {
  const menu = document.querySelector("[data-home-menu]");
  const items = content?.home?.menuButtons || [];

  if (!menu) return;

  menu.innerHTML = "";

  items.forEach((item, index) => {
    const link = document.createElement("a");
    const isDisabled = Boolean(item?.disabled);

    link.className = "menu-button";
    link.textContent = item?.label || `MENU ${index + 1}`;

    if (isDisabled) {
      link.href = "#";
      link.setAttribute("aria-disabled", "true");
      link.addEventListener("click", (event) => {
        event.preventDefault();
      });
    } else {
      link.href = item?.href || "#";
    }

    menu.appendChild(link);
  });
}
