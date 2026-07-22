# 경력 상세

> ExperienceSection 컨텐츠, 경력 기술서, AI 질의 응답에 사용하세요.

---

## 주식회사 루티너리 (Routinery Inc.)

**프론트엔드 개발자 — 프로덕트 팀** | 2024.11 ~ 2026.07 (1년 9개월) | 정규직

200개 국가, 500만 명 이상이 사용하는 루틴·습관 플래너 앱

**사용 기술:** React Native, React, TypeScript, Swift, Kotlin, Jetpack Compose, Jetpack Glance, AppIntents, Wear OS, Zustand, Firestore, Fastlane, Firebase App Distribution, GitHub Actions, i18next, Claude Code (MCP · Subagents)

---

### AI 개발 하네스 구축 및 팀 배포

- 코드 리뷰·타입 검증·빌드 진단을 자동화하는 AI 개발 환경을 단독 설계해 **단계적으로 도입**하고 **팀 전체에 배포**
- 파일 편집 시 ESLint 자동 수정, 작업 종료 시 타입 검증 후 차단하는 **검증 계층 구성** — 레거시 에러가 누적된 코드베이스에서 **신규 작성 코드에만 품질 게이트 적용**
- **React Native 코드 리뷰 서브에이전트** 도입 — 프로젝트에서 실제 발생한 크래시 패턴과 성능 안티패턴을 자동 검사 항목으로 규칙화
- iOS/Android **빌드 진단 서브에이전트** 도입 — 긴 Xcode·Gradle 로그를 격리된 컨텍스트에서 분석해 원인만 반환, 에이전트 전체에 자동 수정 권한을 제거하고 진단·보고로 역할 한정
- Linear·Figma **MCP 연동**으로 티켓 컨텍스트 자동 로드 및 디자인 기반 구현 흐름 구성, 동일 하네스를 **Codex 환경으로 포팅**해 특정 도구 종속성 제거
- 팀원 온보딩 문서 작성 후 PR 리뷰를 거쳐 도입, 이후 **다른 팀원들이 규칙을 추가하며 공동 운영**

### 메모리 누수 해결로 OutOfMemoryError 제거

- Reanimated SharedValue 정리 누락으로 발생하던 네이티브 힙 누수를 추적해 **OutOfMemoryError 크래시 해결**
- 애니메이션 cleanup 훅 재설계 — setTimeout 누수 제거, `cancelAnimation`으로 이전 애니메이션 명시적 취소, `isMounted` 체크로 언마운트 후 worklet 실행 차단
- 슬라이드(15개)·타이머 서클(6개)·비교 애니메이션(4개) 등 SharedValue 25개 전반에 적용
- Android Native Heap 계측으로 개선 전후 직접 측정
  - Total Allocations: 101.9MB → 31.2MB (**-69%**)
  - Remaining Size: 31.2MB → 11.0MB (**-65%**)

### 콜드 스타트 지연 로딩 전환

- 내비게이션 그룹의 즉시 import를 제거해 **약 50개 화면을 콜드 스타트 JS 평가 대상에서 제외**
- 시작 단계별 구간을 마커로 계측하는 스크립트를 만들어 n=10 중앙값으로 개선 전후 비교 (Debug 빌드 기준)
  - Splash 초기화 (**-24.4%**) · JS 총 로딩 (**-21.8%**)
- 프로덕션 시작 단계별 duration을 Amplitude로 전송하는 telemetry 구축

### 상태 관리 구조 개선

- React Query 구독 구조 재설계 및 Selector 패턴 전면 적용으로 불필요한 리렌더링 제거
- Zustand 스토어 중복 통합, computed 기반 파생 상태 최적화, hydration 완료 후 마이그레이션 실행 순서 보장
- 무한 증가하던 타이머 기록을 **200개 링 버퍼**로 제한하고, 파생 상태로 전개되던 루틴 활동 이력을 **18개월 윈도우**로 캡 (원본 이력은 보존)
- 타임라인 뷰 토글 시 리마운트 churn으로 **누르는 횟수마다 약 20MB가 회수되지 않던 누수**를 lazy mount + keep-alive로 해결

### 위젯 시스템 설계 및 현대화 (Android / iOS / Wear OS)

- Zustand 스토어 변경 → Shared Storage → 앱 진입 시 데이터 병합 → Firestore 순차 동기화로 앱-위젯 상태 동기화 파이프라인 설계
- 수정 시각 기반 item 단위 충돌 해결 로직으로 앱·위젯 동시 수정 시 데이터 정합성 확보
- Grid / Calendar / Weekly / Streak 4종 위젯을 RemoteViews에서 Jetpack Glance로 전면 재작성, Receiver 클래스명 유지 + 내부 구현 교체 방식으로 기존 사용자 위젯을 유지한 채 무중단 마이그레이션 수행
- iOS 17+ AppIntents 기반 인터랙티브 위젯, Android suspend 기반 단계형 갱신 처리 등 플랫폼별 UX 구현
- DataStore 기반으로 위젯 상태 저장 구조를 개선해 프로세스 재시작 시 상태 소실 문제 해결, 런타임 크기 기반 반응형 레이아웃 적용
- Wear OS 모듈 UI를 XML 레이아웃에서 Jetpack Compose로 마이그레이션하고 WearDataLayer(DataClient)로 메인 앱 데이터 변경 시 워치 UI 자동 갱신 연동

### Android Geofence 기반 위치 알림 모듈 개발

- React Native Headless JS, 네이티브 모듈, BroadcastReceiver를 활용해 앱 종료 상태에서도 동작하는 백그라운드 이벤트 처리 구조 설계
- 사용자 설정에 따라 Geofence 동적 등록/해제 구현으로 장소 연계 루틴 알림 기능 제공

### CI/CD 자동화 인프라 구축 (Fastlane)

- iOS DEV/PROD 빌드 파이프라인 단독 구축 — Firebase App Distribution 테스터 배포, TestFlight 업로드, 앱 버전 자동 동기화
- Android DEV APK / PROD APK / PROD AAB 빌드 자동화 — Google Play Internal Testing 업로드, versionCode 자동 계산
- 빌드 완료 시 Slack 자동 알림 연동으로 배포 상태 공유

---

## 주식회사 메이크델타 (Make Delta Inc.)

**프론트엔드 개발자 — 프로덕트 팀** | 2023.07 ~ 2024.04 (10개월) | 정규직

20,000+ 직장인 트레이더가 사용하는 모바일 트레이딩 분석 서비스 스타트업

**사용 기술:** React Native, React, TypeScript, Vite, D3, Zustand, i18next, AWS S3/Route53/CloudFront, Fastlane, Firebase App Distribution

---

### 암호화폐 트레이딩 전략 기반 실시간 알림 앱 개발 (iOS / Android)

- 40종 이상의 기술적 지표(RSI · MACD · 볼린저 밴드 · 일목균형표 등)를 Atom → Molecule → Strategy 계층 구조로 조합하는 커스텀 전략 빌더 구현, 8개 거래소 멀티 마켓 지원
- FCM + Notifee 기반 전략 트리거 알림 구현, 앱 상태(포그라운드/백그라운드/종료)에 관계없이 일관된 알림 수신 보장
- Apple / Google 인앱 구독 결제(IAP) 3단계 요금제 통합 구현

### 트레이딩 차트 및 시세조회 웹뷰 페이지

- Canvas API로 캔들스틱 지표 라인을 픽셀 단위 직접 렌더링해 DOM 재계산 없이 고빈도 리드로우 처리
- D3의 scaleTime · scaleLinear · zoom · drag를 활용한 줌/패닝, 크로스헤어, 툴팁 구현
- Vite manualChunks로 대형 라이브러리를 개별 청크 분리 + React.lazy + Suspense로 지연 로딩 전환 → 번들 크기 **43% 절감**

### 주식 트레이딩 분석 앱 출시

- iOS / Android 초기 설정 및 구조 설계, 배포, 심사 프로세스 전담
- WebView + Canvas 기반 암호화폐 앱과 달리 네이티브 렌더링 성능 확보를 위해 React Native Skia로 캔들 차트 구현

### 모바일 디자인 시스템 구축

- 파운데이션(Color · Typography · Spacing) 토큰부터 컴포넌트까지 0→1 설계 및 배포 전담
- Storybook 웹 배포로 컴포넌트 사용 예시 제공, GitHub Actions 기반 GitHub Package 자동 배포 파이프라인 구축

---

## 주식회사 페이히어 (Payhere Inc.)

**프론트엔드 개발자 — 프로덕트 팀** | 2021.12 ~ 2023.06 (1년 7개월) | 정규직

48,000+ 가맹점이 이용하는 오프라인 매장용 결제 서비스(POS) 스타트업

**사용 기술:** React, React Native, Electron, TypeScript, Next.js, Redux (Thunk · Saga · Toolkit), AWS S3/Route53/CloudFront, Fastlane, Firebase App Distribution

---

### 고객 관리 프리미엄 기능 개발

- 48,000+ 가맹점 중 유료 구독 전환 확대를 목표로, 스탬프 적립·쿠폰 발송·고객관리 분석 시각화 등 신규 기능 개발
- Firebase Analytics 기반 사용자 행동 분석으로 이탈 구간 파악 및 UI/UX 개선 리팩토링 진행

### 고객 대면 앱 출시 (0→1)

- 매장-고객 간 포인트/스탬프 적립, 카드 서명 등 대면 결제 흐름을 처리하는 앱 신규 개발
- iOS / Android 초기 설정 및 구조 설계, 배포, 심사 프로세스 전담
- Pusher 기반 실시간 채널로 매장 앱과 고객 앱 간 결제 이벤트 동기화 구현

### 네이버 플레이스 예약 연동

- 네이버 플레이스 측과 API 설계, 에러 케이스 정의 등 외부 협의 참여
- 연동 UI·상품 구성 페이지 등 클라이언트 기능 개발, WebView 초기 설정 및 캐시충전·메시지 전송 페이지 구현

### 예약업 온라인 스토어 웹 앱 개발

- React 기반 비대면 주문 웹 앱 개발
- 예약 캘린더, 매장 지도 표기, 휴대폰 인증 등 핵심 기능 개발
- AWS S3/Route53/CloudFront 기반 정적 배포 구성
