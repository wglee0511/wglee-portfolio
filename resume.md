# 이원교 — 프론트엔드 개발자 (React / React Native)

- **연락처**: +82-10-6599-3677
- **이메일**: ranazang@naver.com
- **GitHub**: https://github.com/wglee0511
- **Velog**: https://velog.io/@wglee0511/posts

---

## 소개

4년 차 개발자로 웹과 앱 서비스를 개발, 배포 및 운영했습니다. 작은 규모의 팀에서 200명 규모의 회사로 성장하는 과정 속에서, 제품 개발에 필요한 기술 역량과 협업 방식을 함께 쌓아왔습니다.

팀의 생산성과 작업 효율성을 높이기 위해 공용 UI 컴포넌트와 재사용 가능한 라이브러리를 제작하고 운영하며, 반복 작업을 줄이고 개발 속도를 개선해왔습니다.

문제를 해결할 때는 혼자 고민하기보다 다양한 역할의 동료들과 적극적으로 소통하는 방식을 선호합니다. 새로운 기술 도입이나 구조 변경이 필요한 경우에는 PoC(Proof of Concept)를 통해 가능성과 효과를 먼저 검증하고, 이를 바탕으로 팀원들과 공감대를 형성하며 설득해왔습니다.

---

## 기술 스택

`React` `React Native` `Redux` `redux-saga` `redux-toolkit` `zustand` `TypeScript` `Electron` `MobX` `react-query` `d3.js` `storybook` `github-actions` `claude` `cursor`

---

## 경력

### 주식회사 루티너리 (Routinery Inc.)
**프론트엔드 개발자 — 프로덕트 팀** | 2024.11 ~ 재직 중 (1년 5개월 | 정규직)

200개 국가 500만 명 이상이 사용하는 루틴·습관 플래너 앱

**업무 방식**
- PO, 개발자, 디자이너가 목적 중심의 팀으로 업무 진행
- 매주 플래닝/백로그 회의를 통해 지표 공유 및 프로덕트 개발 방향 논의
- 매주 전사적 QA를 통해 기능 출시 전 제품 퀄리티 점검
- 매주 웜스타트·크래시 비율 등을 점검하고 성능 유지보수 작업 진행
- 네이티브 영역(Kotlin / Swift / Jetpack Compose / Glance)은 코드 분석 → 계획 수립 → AI 피드백 사이클로 단독 설계 구현

**주요 업무**

_Wear OS 앱 UI 시스템 현대화_
- Android Wear OS 모듈 UI를 기존 XML 레이아웃에서 100% Jetpack Compose로 마이그레이션
- 타이머 컨트롤 뷰·설정 화면 등 핵심 화면 전면 재작성
- Compose 환경에 맞는 커스텀 테마(Color / Typography / Shape) 및 디자인 시스템 재구축
- State 기반 UI 구조 적용으로 데이터 변경에 즉각 반응하는 동적 화면 구현
- WearDataLayer(DataClient)를 통해 메인 앱 데이터 변경 시 워치 UI 자동 갱신 연동

_Android 홈 위젯 시스템 현대화_
- Grid / Calendar / Weekly / Streak 4종 위젯을 RemoteViews에서 Jetpack Glance 기반으로 전면 재작성
- 레거시 코드 약 1,600라인 및 불필요한 drawable variant 28개 제거
- 런타임 크기 기반 반응형 레이아웃 구현 (Calendar 셀 자동 조정, Weekly 레이아웃 자동 전환)
- 위젯 상태 저장 구조를 DataStore 기반으로 개선하여 프로세스 재시작 시 상태 소실 문제 해결
- Receiver 클래스명 유지 + 내부 구현 교체 방식으로 기존 사용자 위젯을 유지한 채 무중단 마이그레이션 수행

_Android / iOS 체크리스트 위젯 신규 개발_
- React Native와 네이티브 간 앱-위젯 상태 동기화 파이프라인 설계 (Zustand 스토어 변경 → Shared Storage → 앱 진입 시 위젯 데이터 병합 → Firestore 순차 동기화)
- 수정 시각 기반 item 단위 충돌 해결 로직 설계로 앱·위젯 동시 수정 시 데이터 정합성 확보
- iOS 17+ AppIntents 기반 인터랙티브 위젯, Android의 suspend 기반 단계형 갱신 처리 등 플랫폼별 UX 구현
- 4종 위젯 설정 화면 공통 컴포넌트 구조 구축으로 신규 위젯 확장 비용 절감

_Android Geofence 기반 위치 알림 모듈 개발_
- Android Geofence 기반 위치 진입/이탈 이벤트에 따른 맞춤형 알림 모듈 개발
- React Native Headless JS, 네이티브 모듈, BroadcastReceiver를 활용해 앱 종료 상태에서도 동작하는 백그라운드 이벤트 처리 구조 설계
- 사용자 설정에 따라 Geofence 동적 등록/해제 구현으로 장소 연계 루틴 알림 기능 신규 제공

_앱 전반 리팩토링 및 성능 개선_
- React Query 기반 구독 구조 재설계 및 Selector 패턴 적용으로 불필요한 리렌더링 제거
- Zustand 스토어 중복 통합, computed 기반 파생 상태 최적화, hydration 완료 후 지연 초기화 구조로 전환하여 앱 시작 시점 과도한 메모리 점유 문제 해결
- Xcode Organizer 실사용자 지표(P50/P95) 기반으로 개선 전후 직접 측정 및 검증
  - **Peak Memory(P95)**: 958.5MB → 297.4MB (**-69%**)
  - **Launch Time(P50)**: 540ms → 400ms (**-140ms, -26%**)

**사용 기술**: React, React Native, TypeScript, Swift, Kotlin, i18next, Zustand, MobX, Firestore Database, Fastlane, Firebase App Distribution, Claude Code, Cursor

---

### 주식회사 메이크델타 (Make Delta Inc.)
**프론트엔드 개발자 — 프로덕트 팀** | 2023.07 ~ 2024.04 (10개월 | 정규직)

20,000+ 직장인 트레이더가 사용하는 모바일 트레이딩 분석 서비스 스타트업

**업무 방식**
- 매주 팀 회의를 통해 지표 공유 및 프로덕트 개발 방향 논의
- PRD를 기반으로 작업 진행, 필요 시 문서화 작업 병행
- 매주 전사적 QA를 통해 기능 출시 전 제품 퀄리티 점검

**주요 업무**

_암호화폐 트레이딩 전략 기반 실시간 알림 앱 개발 (iOS / Android)_
- 40종 이상의 기술적 지표(RSI · MACD · 볼린저 밴드 · 일목균형표 등)를 Atom → Molecule → Strategy 계층 구조로 조합하는 커스텀 전략 빌더 구현, 8개 거래소(업비트 · 빗썸 · 바이낸스 등) 멀티 마켓 지원
- FCM + Notifee 기반 전략 트리거 알림 구현, 앱 상태(포그라운드/백그라운드/종료)에 관계없이 일관된 알림 수신 보장
- Apple / Google 인앱 구독 결제(IAP) 3단계 요금제 통합 구현

_트레이딩 차트 및 시세조회 웹뷰 페이지 도입_
- WebView 기반 암호화폐 실시간 시세조회 및 캔들스틱 차트 페이지 신규 개발
- Atom(개별 지표) → Molecule(지표 조합) → Strategy(전략 세트) 계층 구조 설계로 여러 지표를 동시에 오버레이하는 유연한 시각화 시스템 구현
- Canvas API로 캔들스틱 지표 라인을 픽셀 단위 직접 렌더링해 DOM 재계산 없이 고빈도 리드로우 처리
- D3의 scaleTime · scaleLinear · zoom · drag를 활용한 줌/패닝, 크로스헤어, 툴팁 구현
- Vite manualChunks로 대형 라이브러리를 개별 청크로 분리 + React.lazy + Suspense로 지연 로딩 전환 → **번들 크기 약 43% 절감**

_주식 트레이딩 분석 앱 출시_
- iOS / AOS 초기 설정 및 구조 설계, 배포, 심사 프로세스 관리 전담
- WebView + Canvas 기반 암호화폐 앱과 달리 네이티브 렌더링 성능 확보를 위해 React Native Skia로 캔들 차트 구현
- Firebase Notification 연동 push 알림 및 딥링크 적용

_모바일 디자인 시스템_
- 파운데이션(Color · Typography · Spacing) 토큰부터 컴포넌트까지 0→1 설계 및 배포 전담
- Storybook 웹 배포로 컴포넌트 사용 예시 제공, GitHub Actions 기반 GitHub Package 자동 배포 파이프라인 구축
- 디자이너와 협업하여 토큰 정의 → 컴포넌트 스펙 → 코드 구현 프로세스 정립

**사용 기술**: React, React Native, TypeScript, Vite, i18next, Zustand, D3, AWS S3/Route53/CloudFront, Fastlane, Firebase App Distribution

---

### 주식회사 페이히어 (Payhere Inc.)
**프론트엔드 개발자 — 프로덕트 팀** | 2021.12 ~ 2023.06 (1년 7개월 | 정규직)

48,000+ 가맹점이 이용하는 오프라인 매장을 위한 결제 서비스(POS) 스타트업

**업무 방식**
- PO, 개발자, 디자이너가 목적 중심의 스쿼드로 한 팀으로 업무 진행
- 매주 스쿼드 회의를 통해 지표 공유 및 프로덕트 개발 방향 논의
- PRD를 기반으로 작업 진행, 필요 시 문서화하여 공유 및 리뷰 후 개발 진행
- 매주 스쿼드별 QA를 통해 기능 출시 전 제품 퀄리티 점검

**주요 업무**

_고객 관리 프리미엄 기능 개발_
- 구독 서비스인 고객 관리 프리미엄의 추가 고객 확보를 목표
- 매장 가맹점의 유저 보이스를 바탕으로 스탬프 적립, 쿠폰 발송, 고객관리 분석 시각화 등 신규 기능 개발
- Firebase GA를 활용한 사용자 분석을 통해 현황 파악 및 UI/UX를 개선한 리팩토링 진행

_고객 대면 앱 출시_
- 포인트/스탬프 적립, 카드서명 등 매장과 고객의 편의성을 증가하기 위한 앱 개발 및 기획
- iOS / AOS에 대한 초기설정 및 구조 설계, 배포, 심사 프로세스 관리
- Pusher를 통한 매장과 고객 앱 사이 실시간 반응 로직 개발

_캐시충전 및 부가 기능 개발_
- 캐시충전, 메시지 전송 페이지의 Webview 초기세팅 및 기능 개발

_네이버 플레이스 예약 연동_
- 페이히어와 네이버 플레이스 회의에 참여하며 API 구성, 에러 케이스 및 상세 기획에 참여
- 네이버 예약 연동에 필요한 Client 신규 기능(연동 UI, 상품 구성 페이지 등) 개발
- 주기적인 모니터링 및 리팩토링 작업 진행

_예약업 온라인 스토어 웹 어플리케이션 개발_
- 매장 가맹점의 비대면 주문 기능을 위한 웹 어플리케이션 개발
- 예약 캘린더, 매장 지도 표기, 휴대폰 인증 등 필요 기능 개발

**사용 기술**: React, React Native, Electron, TypeScript, Next.js, Redux (Thunk · Saga · Toolkit), AWS S3/Route53/CloudFront/Serverless, Fastlane, Firebase App Distribution

---

## 프로젝트

### Code Slugger — 숫자야구 모바일 게임 (iOS / Android)
**개인 프로젝트** | 2026.02 ~ 2026.03 (2개월)

회원가입 없이 바로 시작할 수 있는 숫자 추리 게임 앱을 직접 만들고 출시한 프로젝트. 게임 플레이 자체보다도, 처음 들어온 사용자가 이탈 없이 시작하고, 다시 돌아와도 데이터를 잃지 않으며, 자연스럽게 결제와 광고 흐름까지 이어질 수 있는 구조를 만드는 데 집중.

**주요 구현 내용**
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
**개인 프로젝트** | 2025.01 ~ 2025.02 (2개월)

업비트 실계좌와 연동해 24시간 자동으로 동작하는 암호화폐 자동매매 시스템. 단순 매수·매도 로직 구현이 아닌, 시장 판단·리스크 관리·배포 자동화·운영 알림까지 포함한 실제 운영형 시스템 구축에 초점.

**주요 구현 내용**
- **다중 지표 전략**: EMA, RSI, MACD, Bollinger Bands, Stochastic RSI를 조합하되, 시장 상태를 먼저 판별한 뒤 진입 여부를 결정하는 구조로 설계
- **추세 필터**: ATR 비율과 볼린저 밴드 폭을 결합해 횡보·추세 구간을 판별하고 의미 있는 구간에서만 신호 발생
- **동적 손절/익절**: 최근 20봉 저점과 ATR을 활용한 동적 손절가 계산, R:R 1:2 기준 익절가 자동 산출
- **시장 전체 흐름 반영**: UBMI/UBAI 모니터링으로 급락 시 신규 진입 차단 및 보유 포지션 정리 로직 적용
- **배포·모니터링 자동화**: GitHub Actions + Docker + GCP로 main 브랜치 반영 시 자동 배포, Slack으로 매수/매도/오류/주문취소 이벤트 및 정기 리포트 전송
- **백테스트 환경**: 과거 캔들 데이터 기반 시뮬레이션, 수수료·승률·평균 수익·평균 손실 등 자동 집계

**사용 기술**: Python 3.11, pandas, numpy, ta, scikit-learn, Docker, GCP (Compute Engine, Artifact Registry), GitHub Actions

---

### 슬기로운 백신생활
**팀 프로젝트** | 2021.08 ~ 2021.09 (2개월)

코로나 백신 후기를 공유하는 웹 어플리케이션. 실 사용자 가입 유저 211명, 게시글 157개 기록.

- 백신·격리 후기 게시판, 글쓰기·수정, 댓글 기능 Client 개발
- React-Quill을 이용한 Custom Editor 서비스 적용
- 자동 로그아웃 기능, 무한스크롤, Alert 구현

**사용 기술**: ReactJS, Redux, AWS S3/CloudFront/Route53

---

## 교육

| 기관 | 과정 | 기간 |
|------|------|------|
| 항해99 | Frontend React 과정 (수료) | 2021.05 ~ 2021.09 |
| 경희대학교 | 기계공학과 학사 (졸업) | 2015.03 ~ 2018.08 |
