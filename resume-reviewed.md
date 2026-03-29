# 이원교 — 프론트엔드 개발자 (React / React Native)

- **연락처**: +82-10-6599-3677
- **이메일**: ranazang@naver.com
- **GitHub**: https://github.com/wglee0511
- **Velog**: https://velog.io/@wglee0511/posts

---

## 소개

웹과 앱을 넘나들며 실제 사용자에게 닿는 제품을 만드는 프론트엔드 개발자입니다. 글로벌 **500만 사용자** 서비스에서 메모리 사용량을 **69%** 줄이고 앱 초기 실행 시간을 **26%** 단축한 경험이 있습니다.

성능 저하의 구조적 원인을 찾아 코드 수준에서 해결합니다. 체감이 아닌 실사용자 지표(P50/P95)로 개선 전후를 직접 측정하고 검증하는 방식으로 일합니다.

플랫폼 경계 영역(홈 위젯·Wear OS·백그라운드 이벤트)을 직접 설계하고 구현합니다. 코드 분석 → 계획 수립 → AI 피드백 사이클로 AI를 설계 파트너 삼아 낯선 영역도 단독으로 구현합니다.

---

## 기술 스택

`React` `React Native` `TypeScript` `Next.js` `Zustand` `React Query` `Redux` `redux-saga` `redux-toolkit` `MobX` `D3.js` `Electron` `Storybook` `GitHub Actions`

---

## 경력

### 주식회사 루티너리 (Routinery Inc.)
**프론트엔드 개발자 — 프로덕트 팀** | 2024.11 ~ 재직 중 | 정규직

200개 국가, 500만 명 이상이 사용하는 루틴·습관 플래너 앱

---

_앱 전반 성능 개선_
- React Query 구독 구조 재설계 및 **Selector 패턴** 적용으로 불필요한 리렌더링 제거
- Zustand 스토어 중복 통합, computed 기반 파생 상태 최적화, **hydration 완료 후 지연 초기화** 구조로 전환
- Xcode Organizer 실사용자 지표(P50/P95) 기반으로 개선 전후 직접 측정 및 검증
  - **Peak Memory(P95)**: 958.5MB → 297.4MB (**-69%**)
  - **Launch Time(P50)**: 540ms → 400ms (**-140ms, -26%**)

_Android / iOS 체크리스트 위젯 신규 개발_
- Zustand 스토어 변경 → Shared Storage → 앱 진입 시 데이터 병합 → Firestore 순차 동기화로 **앱-위젯 상태 동기화 파이프라인** 설계
- **수정 시각 기반 item 단위 충돌 해결 로직**으로 앱·위젯 동시 수정 시 데이터 정합성 확보
- iOS 17+ **AppIntents** 기반 인터랙티브 위젯, Android **suspend** 기반 단계형 갱신 처리 등 플랫폼별 UX 구현
- 4종 위젯 설정 화면 공통 컴포넌트 구조화로 신규 위젯 확장 비용 절감

_Android 홈 위젯 시스템 현대화_
- Grid / Calendar / Weekly / Streak 4종 위젯을 RemoteViews에서 **Jetpack Glance** 기반으로 전면 재작성
- 레거시 코드 약 **1,600라인** 및 불필요한 drawable variant **28개** 제거
- 런타임 크기 기반 반응형 레이아웃 구현 (Calendar 셀 자동 조정, Weekly 레이아웃 자동 전환)
- DataStore 기반으로 위젯 상태 저장 구조 개선, 프로세스 재시작 시 **상태 소실 문제 해결**
- Receiver 클래스명 유지 + 내부 구현 교체 방식으로 기존 사용자 위젯을 유지한 채 **무중단 마이그레이션** 수행

_Wear OS 앱 UI 시스템 현대화_
- Android Wear OS 모듈 UI를 기존 XML 레이아웃에서 **100% Jetpack Compose**로 마이그레이션
- Compose 환경에 맞는 커스텀 테마(Color / Typography / Shape) 및 디자인 시스템 재구축
- State 기반 UI 구조 적용으로 데이터 변경에 즉각 반응하는 동적 화면 구현
- **WearDataLayer(DataClient)**를 통해 메인 앱 데이터 변경 시 워치 UI 자동 갱신 연동

_Android Geofence 기반 위치 알림 모듈 개발_
- React Native Headless JS, 네이티브 모듈, BroadcastReceiver를 활용해 **앱 종료 상태에서도 동작**하는 백그라운드 이벤트 처리 구조 설계
- 사용자 설정에 따라 Geofence **동적 등록/해제** 구현으로 장소 연계 루틴 알림 기능 제공

**사용 기술**: React Native, React, TypeScript, Swift, Kotlin, Zustand, MobX, Firestore, Fastlane, Firebase App Distribution, i18next

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

### Code Slugger — 숫자야구 모바일 게임 (iOS / Android)
**개인 프로젝트** | 2026.02 ~ 2026.03

회원가입 없이 바로 시작할 수 있는 숫자 추리 게임 앱. 이탈 없는 온보딩, 기기 변경 시에도 데이터 유지, 결제·광고까지 자연스럽게 이어지는 수익화 구조를 갖춘 실서비스.

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
