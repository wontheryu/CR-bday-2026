document.addEventListener("DOMContentLoaded", async () => {
  try {
    const content = await loadContent("./data/content.json");

    applyMeta(content);
    applyHeader(content);
    renderMenu(content);
  } catch (error) {
    console.error("콘텐츠 로드 실패:", error);
  }
});

async function loadContent(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`콘텐츠 응답 오류: ${response.status}`);
  }

  return response.json();
}

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

function renderMenu(content) {
  const menu = document.querySelector(".home-menu");
  const items = content?.home?.menuButtons || [];

  if (!menu) return;

  menu.innerHTML = "";

  items.forEach((item, index) => {
    const button = document.createElement("button");
    const label = document.createElement("span");
    const link = item?.link || "";
    const isDisabled = Boolean(item?.disabled || !link);

    button.className = "pixel-button menu-button";
    button.type = "button";
    button.dataset.link = link;

    if (isDisabled) {
      button.classList.add("is-disabled");
      button.setAttribute("aria-disabled", "true");
      button.disabled = true;
    } else {
      button.addEventListener("click", () => {
        window.location.href = link;
      });
    }

    label.className = "menu-button-label";
    label.textContent = item?.label || `MENU ${index + 1}`;

    button.appendChild(label);
    menu.appendChild(button);
  });
}
