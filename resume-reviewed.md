# 이원교 — 프론트엔드 개발자 (React Native / React) — 네이티브 · AI 개발 환경 구축

- **이메일**: ranazang@naver.com
- **홈페이지**: https://wglee.getcodeforge.dev
- **GitHub**: https://github.com/wglee0511
- **Velog**: https://velog.io/@wglee0511/posts

---

## 소개

앱과 웹을 넘나들며 실제 사용자에게 닿는 제품을 만드는 프론트엔드 개발자입니다. 글로벌 **500만 사용자** 서비스에서 메모리 누수를 추적해 네이티브 힙 사용량을 **69%** 줄이고, ANR을 유발하던 메인 스레드 블로킹을 제거했습니다. 개선은 **측정으로 검증하는 것**을 원칙으로 삼아, 콜드 스타트 계측 체계와 프로덕션 telemetry를 구축하고 그 지표에 따라 제 작업을 되돌린 경험도 있습니다.

AI를 코드 생성기가 아니라 **설계 파트너**로 씁니다. 기능마다 설계 문서(spec) → 구현 계획(plan) → 구현 → 계측 검증 순서를 문서로 남기는 방식으로, Kotlin·Jetpack Glance·Wear OS 같은 비전공 네이티브 영역도 프로덕션 수준까지 단독 구현했습니다. 이 방식을 팀에 이식해 루티너리의 **AI 개발 환경을 구축·배포**했고, 이후 팀원들이 직접 규칙을 추가하며 함께 운영했습니다.

2026년 하반기에는 개인 프로젝트로 일본·한국 인디 메이커 플랫폼 **쿠미쉽**과 한일 맛집 순위 서비스 **로지로지**를 만들었습니다. 프런트에 머물지 않고 **Kotlin/Spring API의 인증·동시성·운영 도구**와 **React Native 앱의 지도·배포**까지 맡았고, 전 과정을 Claude Code 에이전트와 협업했습니다. 그 전에는 LLM에게 거부권만 주는 **OKX 선물 자동매매 시스템**을 만들었습니다.

---

## 기술 스택

**프론트엔드**
`React` `React Native` `Expo` `TypeScript` `JavaScript` `Next.js` `Vite` `Zustand` `MobX` `React Query (TanStack Query)` `Redux (Saga · Toolkit)` `Reanimated` `React Native Skia` `D3.js` `Chart.js` `Canvas API` `WebView` `Electron` `Storybook`

**네이티브**
`Kotlin` `Swift` `Jetpack Compose` `Jetpack Glance` `SwiftUI` `AppIntents` `Wear OS` `Geofencing` `MapLibre`

**데이터 · 백엔드**
`Kotlin` `Spring Boot` `JPA` `MySQL` `Flyway` `Spring Session` `Testcontainers` `Firestore`

**인프라 · 자동화**
`GitHub Actions` `Fastlane` `EAS` `CodePush` `Docker` `GHCR` `AWS (S3 · CloudFront)` `Cloudflare (Workers · Pages)` `Firebase`

**테스트 · 모니터링**
`Jest` `Vitest` `React Native Testing Library` `Sentry` `Amplitude` `GA4` `Crashlytics`

**AI 개발 환경**
`Claude Code (Hooks · Subagents · MCP)` `Codex` `spec → plan → 구현 → 검증 워크플로` `Agent 기반 코드 리뷰 · 빌드 진단 자동화` `AGENTS.md 기반 팀 규칙 운영`

---

## 경력

### 주식회사 루티너리 (Routinery Inc.)
**프론트엔드 개발자 — 프로덕트 팀** | 2024.11 ~ 2026.07 (1년 9개월) | 정규직

200개 국가, 500만 명 이상이 사용하는 루틴·습관 플래너 앱

---

_AI 개발 환경 구축 및 팀 배포_
- **Hook 2종**으로 검사 자동화 — 파일 저장 시 ESLint 자동 정리, 작업 종료 시 타입 검사. 이미 에러 **367개**가 쌓인 프로젝트라 전체 검사는 노이즈가 되어 무시되므로, 세션에서 **편집한 파일만 골라 검사**하도록 범위를 좁혀 신규 에러 유입만 차단
- **검토용 에이전트 3종** 작성 — React Native 코드 리뷰용 1종(실제 발생했던 크래시·성능 문제를 검사 항목으로 정리), iOS·Android 빌드 로그 분석용 2종. AI 산출물을 사람이 판단할 수 있게 모두 **수정 권한 없이 진단만** 하도록 제한
- 코딩 컨벤션·리뷰 기준·커밋 규칙을 **규칙 문서 8종**으로 정리해 AI와 팀원이 같은 기준을 참조하도록 구성, 되돌릴 수 없는 명령(`rm -rf`·force push·hard reset 등)은 **실행 차단 목록**으로 관리하고 개인별 허용 범위는 로컬 설정으로 분리
- **특정 도구 종속 제거** — 동일 하네스를 Codex 환경으로 포팅하되 복제가 아니라 **훅이 같은 스크립트를 참조하고 스킬을 심볼릭 링크로 공유**하는 구조로 구성해, 한쪽을 수정하면 양쪽에 반영되고 규칙이 어긋나지 않도록 설계
- 온보딩 문서를 쓰고 PR 리뷰를 거쳐 도입, 이후 **팀원들이 직접 규칙을 추가하며 함께 운영** — 개인 생산성 도구가 아니라 팀이 유지보수하는 공용 인프라로 정착

_메모리 누수 해결로 OutOfMemoryError 제거_
- Reanimated SharedValue 정리 누락으로 발생하던 네이티브 힙 누수를 추적해 **OutOfMemoryError 크래시 해결**
- 공용 cleanup 훅 설계 — 언마운트 시 `cancelAnimation` 일괄 호출, `isMounted` 플래그로 언마운트 후 worklet 콜백 실행 차단. 화면마다 개별 정리하던 구조를 훅 하나로 통일
- 온보딩 슬라이드(14개)·타이머 서클(6개)·비교 애니메이션(4개) 등 **SharedValue 24개**를 훅에 등록
- Android Native Heap 계측으로 개선 전후 직접 측정
  - **Total Allocations**: 101.9MB → 31.2MB (**-69%**)
  - **Remaining Size**: 31.2MB → 11.0MB (**-65%**)

_ANR 해결 — 분석 로깅의 메인 스레드 블로킹 제거_
- 이벤트 로깅 함수 하나가 **분석 SDK 6종 호출과 로컬 저장소 I/O 2건을 동기 실행**해 UI 렌더링 중 메인 스레드를 0.5~2초 점유, 팝업·루틴 추가 등 화면 전환 시점과 겹치며 ANR 유발
- `InteractionManager`로 무거운 작업을 **렌더링 완료 이후로 분리**하고 네이티브 브리지 호출을 병렬화, 가벼운 작업만 즉시 실행하도록 재구성
- SDK가 하나씩 추가되며 누적된 비용이라 개별 코드 리뷰로는 드러나지 않던 문제 — **누적 지연을 보는 계측의 필요성**을 확인한 사례

_콜드 스타트 계측 체계 구축 및 지연 로딩 검증_
- 시작 단계별 구간을 마커로 계측하는 스크립트 작성 — 워밍업 제외 후 **n=10 중앙값·p95**로 개선 전후 비교
- 내비게이션 화면 62개를 React.lazy로 전환해 콜드 스타트 JS 평가 대상에서 제외, Debug 빌드 기준 **Splash 초기화 -24.4% · JS 총 로딩 -21.8%** 확인
- 프로덕션 시작 단계별 duration을 Amplitude로 전송하는 **telemetry 구축** — 로컬 측정만으로는 실기기 분포를 알 수 없다고 판단
- **프로덕션 지표 확인 후 지연 로딩을 최종 제거** — lazy 경계마다 추가되는 Suspense·스켈레톤의 화면 전환 비용이 시작 시간 이득보다 크다고 판단. 측정 체계와 telemetry는 유지

_상태 관리 구조 개선_
- 서버 상태를 스토어로 복사하던 구조를 걷어내 **React Query가 서버 상태를 소유**하도록 정리
- 화면마다 흩어져 있던 구독 상태 판단 로직을 **전용 selector 로 중앙화** (60개 호출 지점) — 동일 조건이 화면별로 달라지던 문제 제거
- 스토어 21개 규모에서 파생 상태를 computed 로 전환 — 정렬·전개 목록을 별도 저장하던 구조를 제거해 목록 갱신 시 `set` 호출 3회를 1회로 축소, 스토어별 `version`·`migrate`로 저장 구조 변경 대응
- **MobX → Zustand 마이그레이션** — 완료 플래그로 1회만 실행하고, 실패 시 앱이 중단되지 않도록 예외를 격리해 리포팅만 수행 (운영 중 서비스의 기존 사용자 데이터 보호)
- 타임라인 뷰 토글 시 삼항 분기로 무거운 Reanimated·제스처 트리가 통째로 리마운트되며 **누를 때마다 약 20MB가 회수되지 않던 누수**를 lazy mount + keep-alive로 수정
- 시간 경과형 메모리 증가 2건(타이머 기록 무한 누적 · 루틴 이력의 날짜별 전개)을 Instruments로 원인 분리하고 **링 버퍼·윈도우 캡 방식으로 설계 제안** (원본 이력 보존 전제)

_위젯 시스템 설계 및 현대화 (Android / iOS / Wear OS)_
- Zustand 스토어 변경 → Shared Storage → 앱 진입 시 데이터 병합 → Firestore 순차 동기화로 **앱-위젯 상태 동기화 파이프라인** 설계
- **수정 시각 기반 item 단위 충돌 해결 로직**으로 앱·위젯 동시 수정 시 데이터 정합성 확보
- Grid / Calendar / Weekly / Streak / CheckList **5종 위젯**을 RemoteViews에서 **Jetpack Glance**로 전면 재작성, Receiver 클래스명과 패키지 경로를 유지한 채 내부 구현만 교체해 홈 화면에 등록된 기존 위젯을 깨뜨리지 않는 **무중단 마이그레이션** 수행
- iOS 17+ **AppIntents** 기반 인터랙티브 위젯, Android **suspend** 기반 단계형 갱신 처리 등 플랫폼별 UX 구현
- DataStore 기반으로 위젯 상태 저장 구조를 개선해 프로세스 재시작 시 **상태 소실 문제 해결** — 위젯 인스턴스별 저장소 분리로 동일 위젯 복수 배치 시 상태 간섭 제거, 위젯 삭제 시 저장소 정리 처리. 런타임 크기 기반 반응형 레이아웃 적용
- Wear OS 모듈 UI를 XML 레이아웃에서 **Jetpack Compose**로 마이그레이션하고 **WearDataLayer(DataClient)**로 메인 앱 데이터 변경 시 워치 UI 자동 갱신 연동
- 사내 선례·네이티브 리뷰어가 없는 영역이라 **AI로 제약 조건을 먼저 검증하고 실기기로 재확인하는 방식**으로 진행 — 원형 디스플레이 클리핑은 시뮬레이터에서 재현되지 않아, 패딩 보정 대신 `ScalingLazyColumn` + `isScreenRound` 기반 구조 변경으로 근본 해결

_Android Geofence 기반 위치 알림 모듈 개발_
- React Native Headless JS, 네이티브 모듈(TurboModule), BroadcastReceiver를 활용해 **앱 종료 상태에서도 동작**하는 백그라운드 이벤트 처리 구조 설계
- 사용자 설정에 따라 Geofence **동적 등록/해제** 구현으로 장소 연계 루틴 알림 기능 제공, 지오펜스 식별자를 루틴 ID로 매핑해 개별 해제 처리
- **재부팅 시 OS가 지오펜스를 소실**하는 문제를 부팅 완료 리시버로 재등록 처리, 제조사별 배터리 최적화 예외 확인·요청 경로 제공

_CI/CD 자동화 인프라 구축 (Fastlane)_
- iOS DEV/PROD 빌드 파이프라인 단독 구축 — Firebase App Distribution 테스터 배포, TestFlight 업로드, 앱 버전 자동 동기화
- Android DEV APK / PROD APK / PROD AAB 빌드 자동화 — Google Play Internal Testing 업로드, versionCode 자동 계산
- `package.json`을 버전 단일 원본으로 두고 **빌드 번호를 커밋 수에서 파생**해 수동 증가 누락·중복 제거
- 스토어 업로드까지만 자동화하고 **실제 출시는 사람이 판단**하도록 분리 (TestFlight 심사 제출 skip, Play 내부 테스트 draft 업로드)
- 빌드 완료 시 Slack 자동 알림 연동으로 배포 상태 공유

_자체 CodePush 배포 인프라 구축 및 데이터 유실 방어_
- App Center 종료에 대응해 **S3 + CloudFront 기반 자체 번들 배포 체계**를 구성 (릴리스·롤백 워크플로, Sentry 소스맵 업로드 연동)
- 릴리스 히스토리를 CDN에서 읽을 경우 **캐시된 404·구버전 응답을 빈 히스토리로 오인해 이전 배포 이력 전체가 소실될 수 있는 결함**을 발견
- 읽기 경로를 S3 원본으로 고정하고, 쓰기 전 기존 히스토리의 **상위집합 여부를 검증해 손실이 발생하면 쓰기를 중단**하도록 방어 로직 추가

**사용 기술**: React Native, React, TypeScript, Swift, Kotlin, Jetpack Compose, Jetpack Glance, AppIntents, Wear OS, Zustand, MobX, Firestore, Fastlane, Firebase App Distribution, GitHub Actions, i18next, Claude Code (Hooks · Subagents · MCP)

---

### 주식회사 메이크델타 (Make Delta Inc.)
**프론트엔드 개발자 — 프로덕트 팀** | 2023.07 ~ 2024.04 (10개월) | 정규직

20,000+ 직장인 트레이더가 사용하는 모바일 트레이딩 분석 서비스 스타트업

---

_암호화폐 트레이딩 전략 기반 실시간 알림 앱 개발 (iOS / Android)_
- **40종 이상**의 기술적 지표(RSI · MACD · 볼린저 밴드 · 일목균형표 등)를 Atom → Molecule → Strategy 계층 구조로 조합하는 커스텀 전략 빌더 구현, **5개 거래소 · 8개 마켓**(현물·선물) 멀티 마켓 지원
- FCM + Notifee 기반 전략 트리거 알림 구현, 앱 상태(포그라운드/백그라운드/종료)에 관계없이 **일관된 알림 수신 보장**
- Apple / Google **인앱 구독 결제(IAP)** 3단계 요금제 통합 구현, 요금제별 지표·알림 수 제한을 Zustand 스토어 메서드로 캡슐화
- 토큰 만료 시 **갱신 → 원 요청 재시도**를 Axios 인터셉터로 처리하고, 동시 요청은 큐로 모아 **갱신이 1회만** 실행되도록 구현. Google · Kakao · Apple 3종 로그인을 단일 인터페이스로 통합

_트레이딩 차트 및 시세조회 웹뷰 페이지_
- Canvas API로 캔들스틱 지표 라인을 픽셀 단위 직접 렌더링해 **DOM 재계산 없이 고빈도 리드로우** 처리
- D3의 scaleTime · scaleLinear · zoom · drag를 활용한 줌/패닝, 크로스헤어, 툴팁 구현. 사용자 피드백(유저 보이스)을 받아 **지표 18종 추가**
- `postMessage` 기반 **앱↔WebView 양방향 브릿지** 개발 — 앱이 인증 토큰·마켓·코인 초기값을 전달하고 WebView가 사용자 이벤트를 회신
- Vite manualChunks로 패키지별 청크 분리 + React.lazy + Suspense 지연 로딩 → **청크 1,500KB → 850KB(-43%)**, Lighthouse 성능 **60 → 82점**

_주식 트레이딩 분석 앱 출시_
- iOS / Android 초기 설정 및 구조 설계, 배포, 심사 프로세스 전담, FCM 푸시·딥링크 연동
- WebView + Canvas 기반 암호화폐 앱과 달리 네이티브 렌더링 성능 확보를 위해 **React Native Skia**로 OHLCV 캔들 차트 구현

_모바일 디자인 시스템 구축_
- 파운데이션 토큰(색상 **50+** · 타이포그래피 **20종** · 반경 8단계)부터 **컴포넌트 20+종 · 아이콘 80+개**까지 **0→1 설계 및 배포** 전담. 이후 주식 앱(StockMeerkat)에서 사내 패키지로 재사용
- Storybook(스토리 20개)을 GitHub Pages에 배포해 디자이너·개발자가 브라우저에서 사용 예시를 확인, GitHub Actions 기반 **GitHub Package 자동 배포 파이프라인** 구축(CommonJS · ES Module · 타입 선언 3종 빌드)
- 디자이너와 협업하여 토큰 정의 → 컴포넌트 스펙 → 코드 구현 프로세스 정립

**사용 기술**: React Native, React, TypeScript, Vite, D3, Canvas API, React Native Skia, Reanimated, Zustand, React Query, i18next, Storybook, Notifee, FCM, Sentry, Amplitude, CodePush, AWS S3/Route53/CloudFront, Fastlane, Firebase App Distribution

---

### 주식회사 페이히어 (Payhere Inc.)
**프론트엔드 개발자 — 프로덕트 팀** | 2021.12 ~ 2023.06 (1년 7개월) | 정규직

48,000+ 가맹점이 이용하는 오프라인 매장용 결제 서비스(POS) 스타트업

---

_고객 관리 프리미엄 기능 개발_
- **48,000+** 가맹점 중 유료 구독 전환 확대를 목표로, 유저 보이스 기반 스탬프 적립·쿠폰 발송·고객관리 분석 시각화 등 신규 기능 개발
- 매출·상품·고객·포인트·쿠폰 분석을 보여주는 **매장 분석 웹**(저장소 전체 278 커밋 중 **69건** 작성, 2021.12~2023.06)을 Chart.js로 구현 — 쿠폰 현황·기여도 분석과 **가맹·구독 신청 유도 배너**로 유료 전환 동선 연결
- 하나의 웹을 **PC POS(Electron)와 POS WebView** 환경에서 공용으로 쓰도록 비가맹점·PC POS 분기, 피처 플래그, 가상 키보드(이메일 입력) 대응
- GA4 이벤트 설계와 Sentry 연동으로 사용자 행동·에러를 추적해 이탈 구간을 파악하고 UI/UX 개선 리팩토링 진행. 결제 시각이 23:59인 건이 선택일에 반영되지 않는 등 **날짜 경계 집계 오류**를 수정

_고객 대면 앱 출시 (0→1)_
- 매장-고객 간 포인트/스탬프 적립, 카드 서명 등 대면 결제 흐름을 처리하는 앱 신규 개발
- iOS / Android 초기 설정 및 구조 설계, 배포, 심사 프로세스 전담
- **Pusher 기반 실시간 채널**로 매장 앱과 고객 앱 간 결제 이벤트 동기화 구현

_네이버 플레이스 예약 연동_
- 네이버 플레이스 측과 API 설계, 에러 케이스 정의 등 외부 협의 참여
- 연동 UI·상품 구성 페이지 등 클라이언트 기능 개발, WebView 초기 설정 및 캐시충전·메시지 전송 페이지 구현
- 출시 후 주기적인 모니터링 및 리팩토링으로 안정성 유지

_예약업 온라인 스토어 웹 앱 개발_
- **React** 기반 비대면 주문 웹 앱 개발
- 예약 캘린더, 매장 지도 표기, 휴대폰 인증 등 핵심 기능 개발
- AWS S3/Route53/CloudFront 기반 정적 배포 구성

**사용 기술**: React, React Native, Electron, TypeScript, JavaScript, Next.js, Redux (Thunk · Saga · Toolkit), RTK Query, Chart.js, Pusher, WebView, Sentry, Firebase Analytics · Crashlytics · Remote Config, CodePush, AWS S3/Route53/CloudFront, Fastlane, Firebase App Distribution

---

## 프로젝트

### 쿠미쉽 (Kumiship)
**개인 프로젝트 (동료 1명과 공동 개발)** | 2026.10 ~ 2026.11

일본·한국 인디 메이커가 팀원을 모집하고 서비스를 등록해 랭킹에 오르는 플랫폼 (사용자 웹·서버, 운영자 웹·서버 4개 저장소)

---

_작성 범위_
- 커밋 기준 운영자 서버 **93/95건**, 운영자 웹 **11/11건**, 사용자 서버 **127/178건**, 사용자 웹 **20/77건** 작성
- Claude Code와 함께 만들었고, 사용자 웹의 후속 기능은 동료가 작성

_앱 소셜 로그인 보안_
- 앱은 소셜 로그인 결과를 딥링크로 받는데 다른 앱이 이 링크를 가로챌 수 있어, **가로챈 코드만으로는 로그인할 수 없도록 PKCE 방식의 일회용 코드**를 사용
- 코드는 DB에 **해시로만 저장**하고, 실패 이유는 알려 주지 않아 추측 단서를 차단

_동시 요청 처리_
- 여러 요청이 같은 데이터를 동시에 바꾸는 곳(모집 마감·탈퇴)에 **락을 걸고 락 순서를 규칙으로 고정**
- 주기 작업은 한 건씩 짧게 처리하고 **락 충돌일 때만 최대 3번 다시 시도**

_외부 주소 접속 · 이미지 업로드 보호_
- 사용자가 입력한 주소를 서버가 열어 보는 기능이라, **공인 IP인지 확인한 뒤 그 IP로만 연결**해 내부망 접근을 차단
- 업로드 이미지는 형식을 내용으로 판정하고 다시 인코딩해 **숨은 데이터를 제거**

_운영자 기능 분리_
- 운영자 서버는 사용자 DB를 **읽기만** 하고 변경은 사용자 서버의 내부 API로만 수행, 같은 요청을 두 번 보내도 **한 번만 처리**
- 운영자 웹은 배포 전에 **테스트용 가짜 데이터가 섞였는지 자동 검사**

**사용 기술**: Kotlin, Spring Boot 3.5, MySQL, Flyway, Testcontainers, Next.js 16, React 19, TypeScript, Vite, TanStack Query, Cloudflare, Claude Code

---

### 로지로지 (Rojiroji)
**개인 프로젝트 (동료 1명과 공동 개발)** | 2026.10 ~ 2026.11

영수증으로 방문이 확인된 리뷰만으로 순위를 정하는 한국·일본 맛집 서비스 (앱·웹·서버·운영 콘솔 5개 저장소에 기여)

---

_작성 범위_
- 커밋 기준 앱 **27/105건**, 웹 **11/187건**, 서버 **7/142건**, 운영 콘솔 **3건** 작성
- 로그인·API 기본 구조·서버 핵심 기능은 동료가 만들었고, 아래는 직접 만든 부분

_지도 점 표시 (앱)_
- 가게가 많으면 점으로 가득 차므로 일부만 보여 주되 **가게 ID로 정한 규칙**을 써서 다시 불러와도 같은 점이 표시
- 이름이 겹치면 **순위가 낮은 가게의 이름만 숨김**

_앱 업데이트 배포_
- 스토어 심사 없이 업데이트할 때 **개발용 서버 주소가 섞이는 문제**를 스크립트로 차단
- Xcode 새 버전에서 빌드가 깨지는 문제를 패치 스크립트로 해결

_없는 가게 주소는 404로 (웹 + 서버)_
- 없는 가게 주소도 정상(200)으로 응답하던 문제를 서버의 **가게 존재 확인 API**로 해결, 서버·웹 중 어느 쪽을 먼저 배포해도 안전하게 구성

_한국어·일본어 검색 노출(SEO)_
- 지역 이름의 일본어 표기를 **DB·API·웹·운영 콘솔까지 일관되게** 추가하고, 일본어 이름이 없는 지역의 일본어 페이지는 검색에서 제외 (검색 유입 효과는 측정하지 않음)

**사용 기술**: Expo SDK 57, React Native 0.86, MapLibre, EAS, Next.js 16, TypeScript, Spring Boot 4.1, Java 21, MySQL, Claude Code

---

### LLM 검증형 암호화폐 선물 자동매매 시스템 (OKX)
**개인 프로젝트** | 2026.08 ~ 2026.09

OKX 무기한 선물을 대상으로, 매매 신호는 코드가 만들고 **LLM에게는 거부권만 주는** 8단계 자동매매 파이프라인 (업비트 현물 자동매매에 이은 두 번째 시스템)

---

_LLM 권한 최소화_
- 방향·손절가·목표가·주문 금액은 **모두 코드가 결정**하고, LLM은 "이 진입이 유효한가"만 판단
- 지표 신호가 없으면 LLM을 부르지 않고, LLM이 **다른 방향을 말하거나 확신도가 기준 미만이면 진입 취소**

_실패했을 때의 방향을 미리 정함_
- 진입 판단이 실패하면 **진입하지 않고**, 보유 중 청산 재평가가 실패하면 **강제 청산하지 않고 유지**
- 주문할 때 거래소 브래킷 주문(`attachAlgoOrds`)으로 손절·익절을 함께 걸어, **거래소가 최후 방어선**을 맡도록 구성

_손실 한도_
- 하루 실현손실이 한도에 닿으면 **신규 진입을 막는 스위치(kill-switch)를 SQLite에 기록**하고, 날짜가 바뀌면 자동 해제
- 주문 금액 상한·동시 보유 개수·중복 진입 차단·격리 마진 레버리지 설정

_LLM 제공자 교체_
- Claude·OpenAI·Ollama·로컬 모델 4종을 **같은 인터페이스 뒤에 두고 설정 하나로 전환**
- 응답 형식이 깨지거나 설명이 섞여 와도 객체 부분만 추출하고, 그래도 실패하면 **"진입 안 함"으로 처리**

_테스트_
- 테스트 **464개(30개 파일)**. LLM 대신 가짜 응답·예외를 넣어 신호 없음 시 미호출, 방향 불일치 시 취소, 오류 시 미진입을 검증

**사용 기술**: Python 3.12, asyncio, httpx, websockets, pandas, ta, Pydantic, aiosqlite (SQLite), Anthropic SDK, OpenAI SDK, Ollama, pytest

---

## 교육

| 기관 | 과정 | 기간 |
|------|------|------|
| 항해99 | Frontend React 과정 (수료) | 2021.05 ~ 2021.09 |
| 경희대학교 | 기계공학과 학사 (졸업) | 2015.03 ~ 2018.08 |
