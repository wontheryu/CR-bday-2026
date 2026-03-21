document.addEventListener("DOMContentLoaded", async () => {
  try {
    const content = await loadContent("./data/content.json");

    applyMeta(content);
    applyLoading(content);
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

function applyLoading(content) {
  const loadingArt = document.querySelector(".loading-art");
  const loadingMessages = content?.loading?.messages || [];

  if (loadingArt && content?.loading?.imageAlt) {
    loadingArt.alt = content.loading.imageAlt;
  }

  renderLoadingMessages(loadingMessages);
}

function applyHeader(content) {
  const headerImage = document.querySelector(".site-header-image");
  if (!headerImage) return;

  if (content?.home?.headerAlt) {
    headerImage.alt = content.home.headerAlt;
  }
}

function renderLoadingMessages(messages) {
  const list = document.getElementById("loading-message-list");
  const safeMessages = messages.length
    ? messages
    : ["안내 문구를 입력해 주세요."];

  if (!list) return;

  list.innerHTML = "";

  safeMessages.forEach((message, index) => {
    const item = document.createElement("li");
    item.className = "loading-message-item";

    if (index === 0) {
      item.classList.add("is-active");
    }

    item.textContent = message;
    list.appendChild(item);
  });
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
