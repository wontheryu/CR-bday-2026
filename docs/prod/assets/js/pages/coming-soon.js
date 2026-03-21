document.addEventListener("DOMContentLoaded", () => {
  const content = getContent();
  applyPlaceholderContent(content);
});

function getContent() {
  if (window.SITE_CONTENT) {
    return window.SITE_CONTENT;
  }

  console.error("SITE_CONTENT가 없습니다.");
  return {};
}

function applyPlaceholderContent(content) {
  const pageId = window.location.hash.replace("#", "");
  const placeholder = content?.placeholderPage || {};
  const section = placeholder?.sections?.[pageId] || null;

  if (content?.meta?.siteName) {
    document.title = section?.label
      ? `${section.label} | ${content.meta.siteName}`
      : content.meta.siteName;
  }

  setText("[data-placeholder-kicker]", placeholder.kicker || "COMING SOON");
  setText(
    "[data-placeholder-section]",
    section?.label || placeholder.defaultSectionLabel || "MENU"
  );
  setText(
    "[data-placeholder-title]",
    section?.title || placeholder.title || "PAGE UNDER CONSTRUCTION"
  );
  setText(
    "[data-placeholder-copy]",
    section?.description || placeholder.copy || "선택한 안내 페이지는 현재 준비 중입니다."
  );
  setText(
    "[data-placeholder-detail]",
    placeholder.detail || "상세 정보와 운영 데이터는 순차적으로 반영될 예정입니다."
  );

  const homeLink = document.querySelector("[data-placeholder-home]");
  if (homeLink) {
    homeLink.textContent = placeholder.backLabel || "BACK TO HOME";
    homeLink.href = placeholder.backLink || "../index.html";
  }
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (!element || !value) return;

  element.textContent = value;
}
