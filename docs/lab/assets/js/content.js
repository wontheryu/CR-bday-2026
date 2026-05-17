const BUTTON_ASSET_VERSION = "20260517-1634";
const OFFICIAL_LINK_ASSET_VERSION = "20260517-1649";

function withAssetVersion(path) {
  return `${path}?v=${BUTTON_ASSET_VERSION}`;
}

function withOfficialLinkAssetVersion(path) {
  return `${path}?v=${OFFICIAL_LINK_ASSET_VERSION}`;
}

window.LAB_CONTENT = {
  meta: {
    title: "CR-bday-2026 LAB",
    description: "2026 이채령 생일카페 게임 UI 실험용 랩"
  },
  loading: {
    durationMs: 2400,
    storageKey: "cr-bday-2026.lab.loading-seen"
  },
  home: {
    logoAlt: "LOADING 605 로고",
    menuButtons: [
      {
        id: "notice",
        label: "NOTICE",
        href: "./pages/notice.html",
        imageSrc: withAssetVersion("./assets/img/ui/buttons/btn_notice.png"),
        disabled: false
      },
      {
        id: "lucky-draw",
        label: "LUCKY DRAW",
        href: "./pages/lucky-draw.html",
        imageSrc: withAssetVersion("./assets/img/ui/buttons/btn_luckydraw.png"),
        disabled: false
      },
      {
        id: "archive",
        label: "ARCHIVE",
        href: "./pages/wardrobe.html",
        imageSrc: withAssetVersion("./assets/img/ui/buttons/btn_archive.png"),
        disabled: false
      }
    ],
    officialLinks: [
      {
        id: "itzy-youtube",
        label: "ITZY",
        detail: "YOUTUBE",
        icon: "youtube",
        badgeImageSrc: withOfficialLinkAssetVersion("./assets/img/ui/official-links/button.png"),
        href: "https://www.youtube.com/@ITZY"
      },
      {
        id: "itzy-instagram",
        label: "ITZY",
        detail: "INSTAGRAM",
        icon: "instagram",
        badgeImageSrc: withOfficialLinkAssetVersion("./assets/img/ui/official-links/button.png"),
        href: "https://www.instagram.com/itzy.all.in.us/"
      },
      {
        id: "chaeryeong-instagram",
        label: "CHAERYEONG",
        detail: "INSTAGRAM",
        icon: "instagram",
        badgeImageSrc: withOfficialLinkAssetVersion("./assets/img/ui/official-links/button.png"),
        href: "https://www.instagram.com/chaerrry0/"
      }
    ]
  }
};
