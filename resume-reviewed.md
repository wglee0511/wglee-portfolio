# 이원교 — 프론트엔드 개발자 (React Native / React) — 네이티브 · AI 개발 환경 구축

- **이메일**: ranazang@naver.com
- **홈페이지**: https://wglee.getcodeforge.dev
- **GitHub**: https://github.com/wglee0511
- **Velog**: https://velog.io/@wglee0511/posts

---

## 소개

앱과 웹을 넘나들며 실제 사용자에게 닿는 제품을 만드는 프론트엔드 개발자입니다. 글로벌 **500만 사용자** 서비스에서 메모리 누수를 추적해 네이티브 힙 사용량을 **69%** 줄이고, 콜드 스타트를 **20% 이상** 단축했습니다.

React Native를 기반으로 하되, 제품에 필요하다면 네이티브 영역으로 범위를 넓힙니다. Kotlin·Swift·Jetpack Compose는 경험이 없던 기술이었지만 홈 위젯·Wear OS·백그라운드 위치 알림·CI/CD 파이프라인을 모두 단독으로 구현했고, 2026년 상반기에만 앱 2종과 웹 서비스 1종을 **PRD 작성부터 배포까지 혼자 완주**했습니다.

이 방식을 개인 작업에 두지 않고 팀이 쓸 수 있는 구조로 만듭니다. 루티너리에서 코드 리뷰·타입 검증·빌드 진단을 자동화하는 AI 개발 하네스를 설계해 팀 전체에 배포했고, 이후 다른 팀원들이 규칙을 추가하며 함께 운영했습니다.

---

## 기술 스택

**프론트엔드**
`React` `React Native` `Expo` `TypeScript` `Next.js` `Zustand` `React Query` `Redux (Saga · Toolkit)` `D3.js` `react-native-svg` `Storybook`

**네이티브**
`Kotlin` `Swift` `Jetpack Compose` `Jetpack Glance` `SwiftUI` `AppIntents` `Wear OS` `HealthKit` `Health Connect` `Geofencing`

**데이터 · 백엔드**
`Supabase` `PostgreSQL` `Edge Functions` `SQLite` `Firestore`

**인프라 · 자동화**
`GitHub Actions` `Fastlane` `EAS` `Docker` `GCP` `Vercel` `Firebase`

**테스트 · 모니터링**
`Jest` `React Native Testing Library` `Maestro` `Sentry` `PostHog` `GA4`

**AI 개발 환경**
`Claude Code` `Codex` `MCP` `Agent 기반 코드 리뷰 · 빌드 진단 자동화`

---

## 경력

### 주식회사 루티너리 (Routinery Inc.)
**프론트엔드 개발자 — 프로덕트 팀** | 2024.11 ~ 2026.07 (1년 9개월) | 정규직

200개 국가, 500만 명 이상이 사용하는 루틴·습관 플래너 앱

---

_AI 개발 하네스 구축 및 팀 배포_
- 코드 리뷰·타입 검증·빌드 진단을 자동화하는 AI 개발 환경을 단독 설계해 **단계적으로 도입**하고 **팀 전체에 배포**
- 파일 편집 시 ESLint 자동 수정, 작업 종료 시 타입 검증 후 차단하는 **검증 계층 구성** — 레거시 에러가 누적된 코드베이스에서 **신규 작성 코드에만 품질 게이트 적용**
- **React Native 코드 리뷰 서브에이전트** 도입 — 프로젝트에서 실제 발생한 크래시 패턴과 성능 안티패턴을 자동 검사 항목으로 규칙화
- iOS/Android **빌드 진단 서브에이전트** 도입 — 긴 Xcode·Gradle 로그를 격리된 컨텍스트에서 분석해 원인만 반환, 에이전트 전체에 자동 수정 권한을 제거하고 진단·보고로 역할 한정
- Linear·Figma **MCP 연동**으로 티켓 컨텍스트 자동 로드 및 디자인 기반 구현 흐름 구성, 동일 하네스를 **Codex 환경으로 포팅**해 특정 도구 종속성 제거
- 팀원 온보딩 문서 작성 후 PR 리뷰를 거쳐 도입, 이후 **다른 팀원들이 규칙을 추가하며 공동 운영**

_메모리 누수 해결로 OutOfMemoryError 제거_
- Reanimated SharedValue 정리 누락으로 발생하던 네이티브 힙 누수를 추적해 **OutOfMemoryError 크래시 해결**
- 애니메이션 cleanup 훅 재설계 — setTimeout 누수 제거, `cancelAnimation`으로 이전 애니메이션 명시적 취소, `isMounted` 체크로 언마운트 후 worklet 실행 차단
- 슬라이드(15개)·타이머 서클(6개)·비교 애니메이션(4개) 등 SharedValue 25개 전반에 적용
- Android Native Heap 계측으로 개선 전후 직접 측정
  - **Total Allocations**: 101.9MB → 31.2MB (**-69%**)
  - **Remaining Size**: 31.2MB → 11.0MB (**-65%**)

_콜드 스타트 지연 로딩 전환_
- 내비게이션 그룹의 즉시 import를 제거해 **약 50개 화면을 콜드 스타트 JS 평가 대상에서 제외**
- 시작 단계별 구간을 마커로 계측하는 스크립트를 만들어 n=10 중앙값으로 개선 전후 비교 (Debug 빌드 기준)
  - **Splash 초기화** (**-24.4%**) · **JS 총 로딩** (**-21.8%**)
- 프로덕션 시작 단계별 duration을 Amplitude로 전송하는 telemetry 구축

_상태 관리 구조 개선_
- React Query 구독 구조 재설계 및 **Selector 패턴** 전면 적용으로 불필요한 리렌더링 제거
- Zustand 스토어 중복 통합, computed 기반 파생 상태 최적화, **hydration 완료 후 마이그레이션 실행** 순서 보장
- 무한 증가하던 타이머 기록을 **200개 링 버퍼**로 제한하고, 파생 상태로 전개되던 루틴 활동 이력을 **18개월 윈도우**로 캡 (원본 이력은 보존)
- 타임라인 뷰 토글 시 리마운트 churn으로 **누르는 횟수마다 약 20MB가 회수되지 않던 누수**를 lazy mount + keep-alive로 해결

_위젯 시스템 설계 및 현대화 (Android / iOS / Wear OS)_
- Zustand 스토어 변경 → Shared Storage → 앱 진입 시 데이터 병합 → Firestore 순차 동기화로 **앱-위젯 상태 동기화 파이프라인** 설계
- **수정 시각 기반 item 단위 충돌 해결 로직**으로 앱·위젯 동시 수정 시 데이터 정합성 확보
- Grid / Calendar / Weekly / Streak 4종 위젯을 RemoteViews에서 **Jetpack Glance**로 전면 재작성, Receiver 클래스명 유지 + 내부 구현 교체 방식으로 기존 사용자 위젯을 유지한 채 **무중단 마이그레이션** 수행
- iOS 17+ **AppIntents** 기반 인터랙티브 위젯, Android **suspend** 기반 단계형 갱신 처리 등 플랫폼별 UX 구현
- DataStore 기반으로 위젯 상태 저장 구조를 개선해 프로세스 재시작 시 **상태 소실 문제 해결**, 런타임 크기 기반 반응형 레이아웃 적용
- Wear OS 모듈 UI를 XML 레이아웃에서 **Jetpack Compose**로 마이그레이션하고 **WearDataLayer(DataClient)**로 메인 앱 데이터 변경 시 워치 UI 자동 갱신 연동

_Android Geofence 기반 위치 알림 모듈 개발_
- React Native Headless JS, 네이티브 모듈, BroadcastReceiver를 활용해 **앱 종료 상태에서도 동작**하는 백그라운드 이벤트 처리 구조 설계
- 사용자 설정에 따라 Geofence **동적 등록/해제** 구현으로 장소 연계 루틴 알림 기능 제공

_CI/CD 자동화 인프라 구축 (Fastlane)_
- iOS DEV/PROD 빌드 파이프라인 단독 구축 — Firebase App Distribution 테스터 배포, TestFlight 업로드, 앱 버전 자동 동기화
- Android DEV APK / PROD APK / PROD AAB 빌드 자동화 — Google Play Internal Testing 업로드, versionCode 자동 계산
- 빌드 완료 시 Slack 자동 알림 연동으로 배포 상태 공유

**사용 기술**: React Native, React, TypeScript, Swift, Kotlin, Jetpack Compose, Jetpack Glance, AppIntents, Wear OS, Zustand, MobX, Firestore, Fastlane, Firebase App Distribution, GitHub Actions, i18next, Claude Code (Hooks · Subagents · MCP)

---

### 주식회사 메이크델타 (Make Delta Inc.)
**프론트엔드 개발자 — 프로덕트 팀** | 2023.07 ~ 2024.04 (10개월) | 정규직

20,000+ 직장인 트레이더가 사용하는 모바일 트레이딩 분석 서비스 스타트업

---

_암호화폐 트레이딩 전략 기반 실시간 알림 앱 개발 (iOS / Android)_
- **40종 이상**의 기술적 지표(RSI · MACD · 볼린저 밴드 · 일목균형표 등)를 Atom → Molecule → Strategy 계층 구조로 조합하는 커스텀 전략 빌더 구현, **8개 거래소** 멀티 마켓 지원
- FCM + Notifee 기반 전략 트리거 알림 구현, 앱 상태(포그라운드/백그라운드/종료)에 관계없이 **일관된 알림 수신 보장**
- Apple / Google **인앱 구독 결제(IAP)** 3단계 요금제 통합 구현

_트레이딩 차트 및 시세조회 웹뷰 페이지_
- Canvas API로 캔들스틱 지표 라인을 픽셀 단위 직접 렌더링해 **DOM 재계산 없이 고빈도 리드로우** 처리
- D3의 scaleTime · scaleLinear · zoom · drag를 활용한 줌/패닝, 크로스헤어, 툴팁 구현
- Vite manualChunks로 대형 라이브러리를 개별 청크 분리 + React.lazy + Suspense로 지연 로딩 전환 → **번들 크기 43% 절감**

_주식 트레이딩 분석 앱 출시_
- iOS / Android 초기 설정 및 구조 설계, 배포, 심사 프로세스 전담
- WebView + Canvas 기반 암호화폐 앱과 달리 네이티브 렌더링 성능 확보를 위해 **React Native Skia**로 캔들 차트 구현

_모바일 디자인 시스템 구축_
- 파운데이션(Color · Typography · Spacing) 토큰부터 컴포넌트까지 **0→1 설계 및 배포** 전담
- Storybook 웹 배포로 컴포넌트 사용 예시 제공, GitHub Actions 기반 **GitHub Package 자동 배포 파이프라인** 구축
- 디자이너와 협업하여 토큰 정의 → 컴포넌트 스펙 → 코드 구현 프로세스 정립

**사용 기술**: React Native, React, TypeScript, Vite, D3, Zustand, i18next, AWS S3/Route53/CloudFront, Fastlane, Firebase App Distribution

---

### 주식회사 페이히어 (Payhere Inc.)
**프론트엔드 개발자 — 프로덕트 팀** | 2021.12 ~ 2023.06 (1년 7개월) | 정규직

48,000+ 가맹점이 이용하는 오프라인 매장용 결제 서비스(POS) 스타트업

---

_고객 관리 프리미엄 기능 개발_
- **48,000+** 가맹점 중 유료 구독 전환 확대를 목표로, 유저 보이스 기반 스탬프 적립·쿠폰 발송·고객관리 분석 시각화 등 신규 기능 개발
- Firebase Analytics 기반 사용자 행동 분석으로 이탈 구간 파악 및 UI/UX 개선 리팩토링 진행

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

**사용 기술**: React, React Native, Electron, TypeScript, Next.js, Redux (Thunk · Saga · Toolkit), AWS S3/Route53/CloudFront, Fastlane, Firebase App Distribution

---

## 프로젝트

### Cadence — GLP-1 복약 기록 앱 (iOS)
**개인 프로젝트** | 2026.07

위고비·오젬픽·마운자로 등 GLP-1 약물 사용자를 위한 복약 기록 앱. 주사·경구 복용 기록, 증량(titration) 일정 추적, 부작용·체중 로깅, 진료용 PDF 리포트 내보내기까지 지원하는 실서비스.

- **13종 약물 카탈로그**: 약물별 표준 증량 사다리(위고비 0.25→2.4mg 등)와 투여 주기(주 1회·매일·하루 2회·경구)를 데이터로 모델링, 현재 단계와 다음 증량 시점을 자동 산출
- **오프라인 퍼스트 아키텍처**: SQLite를 진실의 원천으로 두고 테이블별 리포지토리로 접근을 격리, Zustand는 "오늘"·활성 플랜 등 파생 상태만 보유해 상태 중복 제거
- **클라우드 동기화**: Supabase 기반 Apple·Google·이메일 로그인 + 게스트 모드, 다기기 동기화를 last-write-wins로 병합하고 동기화 자체는 옵트인으로 설계
- **약물 농도 추정 곡선**: 공개 반감기 기반 지수 감쇠 합으로 체내 약물량 변화를 SVG로 시각화 (교육용 근사치)
- **SVG 시각화 자체 구현**: 진행 링·증량 계단·체중 차트·주사 부위 바디맵을 외부 차트 라이브러리 없이 직접 구현, 6개 주사 부위 자동 순환 로직 포함
- **의사용 PDF 내보내기**: 기간별 주사·체중·증상 기록을 HTML→PDF로 렌더링해 시스템 공유 시트로 전달
- **건강 앱 연동**: Apple HealthKit / Android Health Connect에서 체중·걸음 수·안정 시 심박수·수면·활동 에너지를 선택적으로 읽어 리포트에 반영
- **테스트 가능한 순수 로직 분리**: 스케줄·포매팅 로직을 네이티브 import 없이 유지해 Jest로 검증, 네이티브 의존 모듈은 타입체크로만 커버하는 경계 설계
- **네이티브 설정 코드화**: `ios/`·`android/`를 prebuild 산출물로 두고 모든 네이티브 설정을 Expo config plugin으로 관리해 직접 수정 금지 원칙 유지
- **운영 계측**: Sentry 크래시 모니터링 + PostHog 분석 연동, RevenueCat 인앱 구독, 5개 국어(한·영·일·중·서) 로케일 자동 감지

**사용 기술**: Expo SDK 57, React Native 0.86 (New Architecture · React Compiler), TypeScript, Expo Router, SQLite, Zustand, MMKV, Supabase, RevenueCat, react-native-svg, i18next, Sentry, PostHog, Jest, Maestro, GitHub Actions

---

### 스팟 스테이플러 (Spot Stapler) — 위치 기반 리마인더 앱 (iOS)
**개인 프로젝트** | 2026.06 ~ 2026.07

"장소에 할 일을 고정한다"는 컨셉의 위치 기반 알림 앱. 앱을 종료한 상태에서도 등록한 장소에 도착하면 OS 지오펜스가 알림을 발송하는 구조.

- **앱 종료 상태 지오펜싱**: expo-task-manager 백그라운드 태스크로 OS 위치 감지 이벤트를 처리, 앱 프로세스가 없어도 로컬 알림 발송. Android 재부팅 후 지오펜스 재등록 처리 포함
- **중복 알림 방지**: 동일 위치 재발송 제한(30분) 로직을 순수 함수로 분리해 단위 테스트로 검증
- **오프라인 큐**: 네트워크 단절 시 생성·수정·삭제 요청을 로컬에 보관했다가 온라인 복귀 시 순차 반영, 모든 작업을 **클라이언트 생성 UUID 기반 멱등**으로 설계해 중복 실행에도 안전
- **Supabase RLS 설계**: 위치·구독·설정 3개 테이블에 Row Level Security를 적용해 사용자별 데이터 접근을 DB 레벨에서 차단, 신규 유저 설정 자동 생성 트리거 구성, pgTAP으로 정책 검증
- **익명 인증**: 회원가입 없이 익명 세션으로 즉시 사용 가능하도록 구성, SQLite 기반 세션 저장 + AppState 연동 토큰 갱신
- **권한 UX 설계**: 위치·백그라운드 위치·알림 3종 권한을 사유형 체크리스트 + 상태 배지로 제시해 거부 시 복구 경로 제공
- **프리미엄 게이팅**: 무료 1개 / 구독 무제한 정책과 해지 시 초과분 비활성화·재구독 시 복원 흐름 구현 (RevenueCat)
- **브랜드 디자인 시스템**: 브랜드 토큰(color·radius) 기반 light/dark/system 테마, 종이 메모 카드·핀 앱마크 등 자체 UI 프리미티브 구축, Pretendard·JetBrains Mono 번들 및 폰트 로딩 게이팅
- **테스트·문서 자산**: 30개 테스트 파일로 지오펜스 로직·오프라인 큐·i18n을 검증, 5개 국어 스토어 스크린샷을 HTML 템플릿에서 자동 렌더링하는 파이프라인 구성

**사용 기술**: Expo SDK 56, React Native 0.85, TypeScript, Expo Router, expo-location, expo-task-manager, expo-notifications, expo-maps, Supabase (Auth · Postgres · RLS · pgTAP), RevenueCat, i18n-js, Jest, React Native Testing Library

---

### 찍고가 (zzikgoga) — 경로 위 최저가 주유소 · 휴게소 추천 웹 서비스
**개인 프로젝트** | 2026.07 · [zzikgoga.getcodeforge.dev](https://zzikgoga.getcodeforge.dev)

"가는 길 그대로, 가장 싼 주유소를 찍고 가요" — 유턴·왕복 없이 경로를 벗어나지 않고 들를 수 있는 최저가 주유소와 휴게소를 추천하는 서비스. 로그인 없이 전 기능 사용 가능.

- **런타임 의존성 제로**: Next.js 15 · React 19 · TypeScript 외 프로덕션 의존성 없이 구현. 지도·차트·상태관리·CSS 프레임워크를 모두 배제하고 CSS 변수 기반 디자인 토큰으로 직접 구성
- **경로↔주유소 매칭 알고리즘 자체 구현**: 경로 폴리라인을 8지점 샘플링 → 반경 검색 → 중복 제거 → **폴리라인 최단거리 계산으로 200m 이내만 필터**(부족 시 500m 완화) → 경로 이탈 시간·절약액 산출
- **좌표계 변환 직접 구현**: 오피넷이 사용하는 KATEC(TM128) ↔ WGS84 변환을 외부 라이브러리 없이 구현
- **경로 대안 병합**: TMAP 추천·무료우선·고속도로·최단거리 4종을 병렬 탐색한 뒤, 사실상 동일한 경로를 자동 병합해 실제로 구별되는 선택지만 카드로 제시
- **4개 외부 API 오케스트레이션**: 카카오맵 SDK · 카카오 로컬 · TMAP 경로 · 오피넷 유가를 조합, **모든 서버 키를 Next.js Route Handler 프록시 뒤에 은닉**하고 키가 없으면 데모 모드(SVG 일러스트 지도)로 폴백하는 단계적 성능 저하 설계
- **실데이터 방어 처리**: 오피넷 EUC-KR 응답 방어 디코딩, 도로 구분 필드가 없는 휴게소 주유소를 브랜드·명칭 휴리스틱으로 판별
- **반응형 단일 라우트**: 동일 라우트에서 모바일(지도+바텀시트)과 PC(좌측 패널+대형 지도)로 분기, 핀↔리스트 선택 상태 동기화
- **로그인 없는 개인화**: localStorage 3개 키로 최근 검색·선택 경로·휴게소 스냅샷을 관리해 홈·내 경로·휴게소 페이지에 자동 반영
- **수익화·SEO**: 카카오 애드핏 슬롯을 환경변수로 on/off 하되 **가격 정렬에는 개입하지 않도록 분리**, JSON-LD 구조화 데이터·사이트맵·OG 구성, Vercel 서울 리전 배포로 국내 API 지연 최소화

**사용 기술**: Next.js 15 (App Router · Route Handlers), React 19, TypeScript, 순수 CSS(디자인 토큰), 카카오맵 JS SDK, 카카오 로컬 API, TMAP 경로 API, 오피넷 API, Vercel

---

### Code Slugger — 숫자야구 모바일 게임 (iOS)
**개인 프로젝트** | 2026.02 ~ 2026.07

회원가입 없이 바로 시작할 수 있는 숫자 추리 게임 앱. 이탈 없는 온보딩, 기기 변경 시에도 데이터 유지, 결제·광고까지 자연스럽게 이어지는 수익화 구조를 갖춘 앱을 App Store에 출시해 운영했습니다.

- **익명 로그인**: Supabase Auth 익명 로그인으로 앱 실행 즉시 세션 발급, 별도 회원가입 없이 바로 플레이 가능
- **계정 복구 플로우**: 8자리 Recovery ID 발급으로 기기 변경·재설치 시에도 계정 연속성 유지
- **재화 시스템**: React Query Optimistic Update로 코인 소모·획득·힌트 구매 즉시 반영, 실패 시 자동 롤백
- **서버사이드 검증**: Supabase Edge Function에서 실제 코인 차감 로직 처리로 클라이언트 조작 방지 및 데이터 무결성 확보
- **AI 추리 로직**: 720개 후보군에서 이전 결과를 기반으로 불가능한 후보를 제거하는 방식으로 평균 4~5회 내 정답 도달
- **다국어/테마**: 한국어·영어·일본어·번체중국어·스페인어 5개 언어, 라이트/다크/시스템 테마 지원
- **수익화**: 인앱결제 + 광고를 게임 경제 구조와 연결한 수익화 흐름 구현

**사용 기술**: React Native, React Query, i18n, Supabase Auth, PostgreSQL, Edge Functions

---

### 암호화폐 자동매매 시스템
**개인 프로젝트** | 2025.01 ~ 2025.02

업비트 실계좌 연동, 24시간 자동 동작하는 암호화폐 자동매매 시스템. 단순 매수·매도가 아닌 시장 판단·리스크 관리·배포 자동화·운영 알림까지 포함한 실운영형 시스템.

- **다중 지표 전략**: EMA, RSI, MACD, Bollinger Bands, Stochastic RSI를 조합, 시장 상태를 먼저 판별한 뒤 진입 여부를 결정하는 구조 설계
- **추세 필터**: ATR 비율과 볼린저 밴드 폭을 결합해 횡보·추세 구간을 판별하고 유의미한 구간에서만 신호 발생
- **동적 손절/익절**: 최근 20봉 저점과 ATR을 활용한 동적 손절가 계산, R:R 1:2 기준 익절가 자동 산출
- **시장 전체 흐름 반영**: UBMI/UBAI 모니터링으로 급락 시 신규 진입 차단 및 보유 포지션 정리 로직 적용
- **배포·모니터링 자동화**: GitHub Actions + Docker + GCP로 main 브랜치 반영 시 자동 배포, Slack으로 매수/매도/오류 이벤트 및 정기 리포트 전송
- **백테스트 환경**: 과거 캔들 데이터 기반 시뮬레이션, 수수료·승률·평균 수익·평균 손실 등 자동 집계

**사용 기술**: Python 3.11, pandas, numpy, ta, Docker, GCP (Compute Engine, Artifact Registry), GitHub Actions

---

## 교육

| 기관 | 과정 | 기간 |
|------|------|------|
| 항해99 | Frontend React 과정 (수료) | 2021.05 ~ 2021.09 |
| 경희대학교 | 기계공학과 학사 (졸업) | 2015.03 ~ 2018.08 |
