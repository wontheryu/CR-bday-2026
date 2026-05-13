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
    const isWideLabel = (item?.label || "").length > 8;
    const leftDeco = document.createElement("span");
    const label = document.createElement("span");
    const rightDeco = document.createElement("span");

    link.className = "menu-button";
    if (isWideLabel) {
      link.classList.add("menu-button--wide");
    }

    leftDeco.className = "menu-button__deco menu-button__deco--left";
    leftDeco.setAttribute("aria-hidden", "true");
    label.className = "menu-button__label";
    label.textContent = item?.label || `MENU ${index + 1}`;
    rightDeco.className = "menu-button__deco menu-button__deco--right";
    rightDeco.setAttribute("aria-hidden", "true");
    link.append(leftDeco, label, rightDeco);

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
    badge.textContent = item?.badge || "GO";
    title.className = "support-link__title";
    title.textContent = item?.label || "LINK";
    detail.className = "support-link__detail";
    detail.textContent = item?.detail || "OPEN";
    link.append(badge, title, detail);
    linkGrid.appendChild(link);
  });
}
