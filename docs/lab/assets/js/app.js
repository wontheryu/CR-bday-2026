document.addEventListener("DOMContentLoaded", () => {
  const content = window.LAB_CONTENT || {};

  applyMeta(content);
  renderMenu(content);
  renderOfficialLinks(content);
});

function applyMeta(content) {
  if (content?.meta?.title) {
    document.title = content.meta.title;
  }

  if (content?.home?.logoAlt) {
    document.querySelectorAll(".home-logo").forEach((homeLogo) => {
      homeLogo.alt = content.home.logoAlt;
    });
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
    const image = document.createElement("img");
    const fallback = document.createElement("span");

    link.className = "menu-button";
    link.classList.add("menu-button--image");
    link.setAttribute("aria-label", item?.label || `MENU ${index + 1}`);

    image.className = "menu-button__image";
    image.src = item?.imageSrc || "";
    image.alt = "";
    image.width = 1280;
    image.height = 288;
    image.decoding = "async";
    image.setAttribute("aria-hidden", "true");

    fallback.className = "menu-button__fallback";
    fallback.textContent = item?.label || `MENU ${index + 1}`;

    link.append(image, fallback);

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

function renderOfficialLinks(content) {
  const linkGrid = document.querySelector("[data-home-links]");
  const items = content?.home?.officialLinks || [];

  if (!linkGrid) return;

  linkGrid.innerHTML = "";

  items.forEach((item) => {
    const link = document.createElement("a");
    const badge = document.createElement("span");
    const title = document.createElement("span");
    const detail = document.createElement("span");

    link.className = "support-link";
    link.href = item?.href || "#";
    link.target = "_blank";
    link.rel = "noreferrer noopener";
    badge.className = "support-link__badge";
    badge.classList.add(`support-link__badge--${item?.icon || "default"}`);
    badge.innerHTML = getSupportIconMarkup(item?.icon);
    title.className = "support-link__title";
    title.textContent = item?.label || "LINK";
    detail.className = "support-link__detail";
    detail.textContent = item?.detail || "OPEN";
    link.append(badge, title, detail);
    linkGrid.appendChild(link);
  });
}

function getSupportIconMarkup(icon) {
  if (icon === "youtube") {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M22 12c0 3.1-.3 4.8-.7 5.8-.3.8-.9 1.4-1.7 1.7-1 .4-2.8.7-7.6.7s-6.6-.3-7.6-.7a2.7 2.7 0 0 1-1.7-1.7C2.3 16.8 2 15.1 2 12s.3-4.8.7-5.8c.3-.8.9-1.4 1.7-1.7C5.4 4.1 7.2 3.8 12 3.8s6.6.3 7.6.7c.8.3 1.4.9 1.7 1.7.4 1 .7 2.7.7 5.8Zm-12.2 3.9 6-3.9-6-3.9v7.8Z"/>
      </svg>
    `;
  }

  if (icon === "instagram") {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="4.2" y="4.2" width="15.6" height="15.6" rx="4"></rect>
        <circle cx="12" cy="12" r="3.6"></circle>
        <circle cx="17.1" cy="6.9" r="1"></circle>
      </svg>
    `;
  }

  return "GO";
}
