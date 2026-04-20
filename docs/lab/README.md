# CR-bday-2026 LAB

`docs/lab`은 게임 UI 기반 생일카페 웹의 실험용 기준 폴더다.

## 현재 구조

- `index.html`: 로딩 화면 -> 홈 화면 흐름을 확인하는 엔트리
- `assets/css/reset.css`: 기본 리셋
- `assets/css/theme.css`: 색상, 크기, 씬 토큰
- `assets/css/app.css`: 로딩/홈 화면 스타일
- `assets/js/content.js`: 메뉴/문구 데이터
- `assets/js/scene.js`: 고정 세로 씬을 화면에 맞춰 스케일
- `assets/js/loading.js`: 로딩 애니메이션 재생 및 전환
- `assets/js/app.js`: 홈 메뉴 렌더링 및 메타 적용

## 자산 출처

- `assets/anim/loading.gif`: 기존 `lab`의 로딩 애니메이션
- `assets/img/characters/*`: 기존 `lab`의 캐릭터 스프라이트
- `assets/img/background/tile-stars.jpg`: 기존 `prod`의 반복 배경
- `assets/img/ui/loading-logo.png`: 기존 `prod`의 로고 크롭 버전
- `assets/img/ui/logo-square.png`: 기존 `prod`의 정사각 로고 원본

## 다음 교체 예정 자산

- 메뉴 버튼 이미지 3종
- 최종 로딩 애니메이션 원본
- 최종 홈 화면 로고/장식 프레임
- 서브 페이지 UI 자산
