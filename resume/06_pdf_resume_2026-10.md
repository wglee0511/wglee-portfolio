# 제출용 이력서 (PDF) 저장본

> 원본: `~/Downloads/프론트엔드_이원교_react_reactnative.pdf` (Rallit 생성, 저장일 2026-10-30)
> 용도: **면접 질문·답변을 만들 때 근거로 삼는 제출본.** `interview/28_merakiplace_interview.md`가 이 파일을 기준으로 질문한다.
> 연락처(전화 · 주소 · 이메일)는 저장하지 않았다. 원문 그대로 옮겼으며 `resume/01~05`와 다른 부분은 맨 아래에 따로 적었다.

## 요약 문구

- 프론트엔드 개발자 (React Native / React) — 네이티브 · AI 개발 환경 구축
- 글로벌 500만 사용자 서비스에서 메모리 사용량을 69% 줄이고 앱 초기 실행 시간을 26% 단축
- 체감이 아닌 실사용자 지표(P50/P95)로 개선 전후를 직접 측정·검증
- 플랫폼 경계 영역(홈 위젯 · Wear OS · 백그라운드 이벤트)을 직접 설계·구현. 코드 분석 → 계획 수립 → AI 피드백 사이클로 낯선 영역도 단독 구현

기술 스택: React, React Native, Redux, redux-saga, redux-toolkit, zustand, TypeScript, Electron, MobX, react-query, d3.js, storybook, github-actions, claude, cursor

## 경력

### 주식회사 루티너리 — 프론트엔드 개발자 · 프로덕트 팀 (2024.11 ~ 2026.07, 1년 9개월, 정규직)

200개 국가 500만 명 이상이 사용하는 루틴 · 습관 플래너 앱

- **AI 개발 환경 구축 및 팀 배포**
  - Hook 2종으로 검사 자동화: 파일 저장 시 ESLint 자동 정리, 작업 종료 시 타입 검사. 이미 에러 367개가 쌓인 프로젝트라 **편집한 파일만 골라 검사**
  - 검토용 에이전트 3종: React Native 코드 리뷰 1종(실제 발생한 크래시 · 성능 문제를 검사 항목으로 정리), iOS · Android 빌드 로그 분석 2종. 모두 수정 권한 없이 진단만
  - 코딩 컨벤션 · 리뷰 기준 · 커밋 규칙을 규칙 문서 8종으로 정리, 위험한 명령어는 실행 차단 목록으로 관리
  - 온보딩 문서를 쓰고 PR 리뷰를 거쳐 도입, 이후 팀원들이 직접 규칙을 추가하며 함께 운영
- **앱 전반 성능 개선**
  - 서버 상태를 스토어로 복사하던 구조를 걷어내 React Query가 서버 상태를 소유, Zustand는 구독 단위를 필요한 값으로 좁혀 불필요한 리렌더링 제거
  - 스토어 21개의 중복 통합 및 computed 기반 파생 상태 최적화, 스토어별 `version` · `migrate`로 저장 구조 변경 대응
  - Xcode Organizer 실사용자 지표(P50/P95) 기반으로 개선 전후 직접 측정 및 검증
    - Peak Memory(P95): 958.5MB → 297.4MB (-69%)
    - Launch Time(P50): 540ms → 400ms (-140ms, -26%)
- **Android / iOS 체크리스트 위젯 신규 개발**
  - Zustand 스토어 변경 → Shared Storage → 앱 진입 시 데이터 병합 → Firestore 순차 동기화로 앱-위젯 상태 동기화 파이프라인 설계
  - 수정 시각 기반 item 단위 충돌 해결 로직으로 앱 · 위젯 동시 수정 시 데이터 정합성 확보
  - iOS 17+ AppIntents 기반 인터랙티브 위젯, Android suspend 기반 단계형 갱신 처리
  - 4종 위젯 설정 화면 공통 컴포넌트 구조화로 신규 위젯 확장 비용 절감
- **Wear OS 앱 UI 시스템 현대화**: XML → 100% Jetpack Compose, 커스텀 테마(Color/Typography/Shape) 재구축, State 기반 동적 화면, WearDataLayer(DataClient)로 메인 앱 데이터 변경 시 워치 UI 자동 갱신
- **CI/CD 자동화 (Fastlane)**
  - iOS DEV/PROD 빌드 파이프라인 단독 구축: Firebase App Distribution 테스터 배포, TestFlight 업로드(심사 제출 분리), package.json 버전 자동 동기화(sync_version lane)
  - Android DEV APK / PROD APK / PROD AAB 자동화: Google Play Internal Testing 업로드, `git rev-list --count` 기반 versionCode 자동 계산
  - 빌드 완료 시 Slack Dev 그룹 자동 알림
- **Android Geofence 기반 위치 알림 모듈**: React Native Headless JS · 네이티브 모듈 · BroadcastReceiver로 앱 종료 상태에서도 동작하는 백그라운드 이벤트 처리 구조 설계, 사용자 설정에 따른 Geofence 동적 등록/해제
- 사용 기술: React, React Native, TypeScript, Swift, Kotlin, i18next, Zustand, MobX, Firestore, Fastlane, Firebase App Distribution, Claude Code, Cursor

### 주식회사 메이크델타 — 프론트엔드 개발자 · 프로덕트팀 (2023.07 ~ 2024.04, 10개월, 정규직)

20,000+ 직장인 트레이더가 사용하는 모바일 트레이딩 분석 서비스 스타트업

- **암호화폐 트레이딩 전략 기반 실시간 알림 앱 (iOS / Android)**
  - 40종 이상 기술적 지표(RSI · MACD · 볼린저 밴드 · 일목균형표 등)를 Atom → Molecule → Strategy 계층으로 조합하는 커스텀 전략 빌더, 8개 거래소 멀티 마켓
  - FCM + Notifee 기반 전략 트리거 알림, 앱 상태(포그라운드/백그라운드/종료)와 관계없이 일관된 알림 수신 보장
  - Apple / Google 인앱 구독 결제(IAP) 3단계 요금제 통합
- **트레이딩 차트 및 시세조회 웹뷰 페이지 도입**
  - Canvas API로 캔들스틱 지표 라인을 픽셀 단위로 직접 렌더링, DOM 재계산 없이 고빈도 리드로우
  - D3 scaleTime · scaleLinear · zoom · drag로 줌/패닝, 크로스헤어, 툴팁
  - Vite manualChunks로 대형 라이브러리 청크 분리 + React.lazy + Suspense → 번들 크기 43% 절감
- **주식 트레이딩 분석 앱 출시**: iOS / Android 초기 설정 · 구조 설계 · 배포 · 심사 전담. WebView + Canvas 기반 암호화폐 앱과 달리 네이티브 렌더링 성능 확보를 위해 React Native Skia로 캔들 차트 구현
- **모바일 디자인 시스템 구축**: Color · Typography · Spacing 토큰부터 컴포넌트까지 0→1 설계 및 배포. Storybook 웹 배포, GitHub Actions 기반 GitHub Package 자동 배포. 디자이너와 토큰 정의 → 컴포넌트 스펙 → 코드 구현 프로세스 정립
- 사용 기술: React, React Native, TypeScript, Vite, i18next, Zustand, D3, AWS S3 · Route53 · CloudFront, Fastlane, Firebase App Distribution

### 주식회사 페이히어 — 프론트엔드 개발자 · 프로덕트팀 (2021.12 ~ 2023.06, 1년 7개월, 정규직)

48,000+ 가맹점이 이용하는 오프라인 매장 결제 서비스(POS) 스타트업

- **고객 관리 프리미엄 기능**: 유료 구독 전환 확대를 목표로 유저 보이스 기반 스탬프 적립 · 쿠폰 발송 · 고객관리 분석 시각화 개발. Firebase Analytics 기반 이탈 구간 파악 및 UI/UX 리팩토링
- **고객 대면 앱 출시 (0→1)**: 매장-고객 간 포인트/스탬프 적립 · 카드 서명 등 대면 결제 앱 신규 개발. iOS / Android 초기 설정 · 구조 설계 · 배포 · 심사 전담. Pusher 기반 실시간 채널로 매장 앱과 고객 앱 간 결제 이벤트 동기화
- **네이버 플레이스 예약 연동**: 네이버 측과 API 설계 · 에러 케이스 정의 협의 참여, 연동 UI · 상품 구성 페이지, WebView 초기 설정 및 캐시충전 · 메시지 전송 페이지. 출시 후 주기적 모니터링 · 리팩토링
- **예약업 온라인 스토어 웹 앱**: React 기반 비대면 주문 웹 앱, 예약 캘린더 · 매장 지도 · 휴대폰 인증, AWS S3/Route53/CloudFront 정적 배포
- 사용 기술: React, React Native, Electron, TypeScript, NextJS, Redux(Thunk · Saga · Toolkit), AWS S3 · Route53 · CloudFront, Serverless, Fastlane, Firebase App Distribution

## 프로젝트 (개인)

### LLM 검증형 암호화폐 선물 자동매매 시스템 (OKX) — 2026.08 ~ 2026.09 (2개월)

업비트 현물 자동매매에 이은 두 번째 시스템. OKX 무기한 선물 대상. **매매 신호는 코드가 만들고 LLM에게는 거부권만 주는** 8단계 에이전트 파이프라인. LLM이 틀리거나 응답하지 않아도 손실로 이어지지 않는 구조를 우선.

- **LLM 권한 최소화**: 방향 · 손절가 · 목표가 · 주문 금액은 모두 코드가 결정, LLM은 "이 진입이 유효한가"만 판단. 지표 신호가 없으면 LLM을 호출하지 않으며, LLM이 다른 방향을 제시하거나 확신도가 기준 미만이면 진입 취소
- **실패 방향을 정해둔 fail-safe**: 진입 판단 실패 시 진입하지 않고, 보유 중 청산 재평가 실패 시 강제 청산하지 않고 유지. 주문 시 OKX 브래킷(attachAlgoOrds)으로 손절 · 익절을 함께 걸어 거래소가 최후 방어선을 맡도록 구성
- **리스크 관리**: 일일 실현손실 한도 도달 시 kill-switch를 SQLite에 기록해 신규 진입 차단, 날짜가 바뀌면 자동 해제. 명목 금액 상한 · 동시 보유 슬롯 · 중복 진입 차단 · 격리 마진 레버리지 설정
- **LLM 제공자 교체 구조**: Claude · OpenAI · Ollama · 로컬 모델 4종을 공통 인터페이스 뒤에 두고 설정 하나로 전환. JSON 스키마로 출력을 강제하되, 스키마 지원이 불완전한 로컬 모델은 JSON 모드 + 프롬프트 스키마로 대체하고 앞뒤 설명이 섞인 응답은 객체 구간만 추출. 형식 오류도 "진입 안 함"으로 처리
- **테스트**: 464개(30개 파일). LLM 대신 가짜 응답 · 예외를 주입해 신호 없음 시 미호출 · 방향 불일치 시 취소 · 오류 시 미진입 같은 주변 로직 검증, 프롬프트에 의도한 전략 문구만 들어가는지도 테스트
- 사용 기술: Python 3.12, asyncio, httpx, websockets, pandas, ta, Pydantic, aiosqlite(SQLite), Anthropic SDK, OpenAI SDK, Ollama, pytest

### 찍고가 (zzikgoga) — 경로 위 최저가 주유소 · 휴게소 추천 웹 서비스 — 2026.07 (1개월)

"가는 길 그대로, 가장 싼 주유소를 찍고 가요" — 유턴 · 왕복 없이 경로를 벗어나지 않고 들를 수 있는 최저가 주유소와 휴게소를 추천. 로그인 없이 전 기능 사용. zzikgoga.getcodeforge.dev

- 런타임 의존성 제로: Next.js 15 · React 19 · TypeScript 외 프로덕션 의존성 없이 구현. 지도 · 차트 · 상태관리 · CSS 프레임워크를 모두 배제하고 CSS 변수 기반 디자인 토큰으로 직접 구성
- 경로 → 주유소 매칭 알고리즘 자체 구현: 경로 폴리라인을 8지점 샘플링 → 반경 검색 → 중복 제거 → 폴리라인 최단거리 계산으로 200m 이내만 필터(부족 시 500m 완화) → 경로 이탈 시간 · 절약액 산출
- 좌표계 변환 직접 구현: 오피넷이 사용하는 KATEC(TM128) → WGS84 변환을 외부 라이브러리 없이 구현
- 4개 외부 API 오케스트레이션: 카카오맵 SDK · 카카오 로컬 · TMAP 경로 · 오피넷 유가를 조합, 모든 서버 키를 Next.js Route Handler 프록시 뒤에 은닉하고 키가 없으면 데모 모드(SVG 일러스트 지도)로 폴백하는 단계적 성능 저하 설계
- 수익화 · SEO: 카카오 애드핏 슬롯을 환경변수로 on/off 하되 가격 정렬에는 개입하지 않도록 분리, JSON-LD 구조화 데이터 · 사이트맵 · OG 구성, Vercel 서울 리전 배포로 국내 API 지연 최소화
- 사용 기술: Next.js 15 (App Router · Route Handlers), React 19, TypeScript, 순수 CSS, 카카오맵 JS SDK, 카카오 로컬 API, TMAP 경로 API, 오피넷 API, Vercel

### Cadence — GLP-1 복약 기록 앱 (iOS) — 2026.07 (1개월)

위고비 · 오젬픽 · 마운자로 등 GLP-1 약물 사용자를 위한 복약 기록 앱. 주사 · 경구 복용 기록, 증량(titration) 일정 추적, 부작용 · 체중 로깅, 진료용 PDF 리포트 내보내기까지 지원하는 실서비스.

- 13종 약물 카탈로그: 약물별 표준 증량 사다리(위고비 0.25→2.4mg 등)와 투여 주기(주 1회 · 매일 · 하루 2회 · 경구)를 데이터로 모델링, 현재 단계와 다음 증량 시점 자동 산출
- 오프라인 퍼스트: SQLite를 진실의 원천으로 두고 테이블별 리포지토리로 접근 격리, Zustand는 "오늘" · 활성 플랜 등 파생 상태만 보유해 상태 중복 제거
- 클라우드 동기화: Supabase 기반 Apple · Google · 이메일 로그인 + 게스트 모드, 다기기 동기화를 last-write-wins로 병합, 동기화 자체는 옵트인
- 의사용 PDF 내보내기: 기간별 주사 · 체중 · 증상 기록을 HTML→PDF로 렌더링해 시스템 공유 시트로 전달
- **AI 협업 워크플로**: 17화면 규모를 7개 서브프로젝트로 분해하고 각각 설계 문서(spec) → 구현 계획(plan) → 구현 → 검증 사이클로 진행, 설계 문서 11건 · 구현 계획 10건을 저장소에 자산으로 축적. 프로젝트 규칙(AGENTS.md)에 SDK 버전 · 빌드 함정 · 아키텍처 원칙을 명문화해 AI가 매번 같은 기준을 참조
- 사용 기술: Expo SDK 57, React Native 0.86 (New Architecture · React Compiler), TypeScript, Expo Router, SQLite, Zustand, MMKV, Supabase, RevenueCat, react-native-svg, i18next, Sentry, PostHog, Jest, Maestro, GitHub Actions

### 스팟 스테이플러 (Spot Stapler) — 위치 기반 리마인더 앱 (iOS) — 2026.06 ~ 2026.07 (2개월)

"장소에 할 일을 고정한다"는 컨셉. 앱을 종료한 상태에서도 등록한 장소에 도착하면 OS 지오펜스가 알림을 발송.

- 앱 종료 상태 지오펜싱: expo-task-manager 백그라운드 태스크로 OS 위치 감지 이벤트 처리, 앱 프로세스가 없어도 로컬 알림 발송. Android 재부팅 후 지오펜스 재등록 처리
- 오프라인 큐: 네트워크 단절 시 생성 · 수정 · 삭제 요청을 로컬에 보관했다가 온라인 복귀 시 순차 반영, 클라이언트 생성 UUID 기반 멱등으로 중복 실행에도 안전
- Supabase RLS 설계: 위치 · 구독 · 설정 3개 테이블에 Row Level Security 적용, 신규 유저 설정 자동 생성 트리거, pgTAP 정책 검증
- 프리미엄 게이팅: 무료 1개 / 구독 무제한, 해지 시 초과분 비활성화 · 재구독 시 복원 (RevenueCat)
- **AI 협업 워크플로**: 28,000자 규모 PRD를 기능 단위로 분해해 설계 문서 14건 · 구현 계획 13건으로 전개, 각 기능을 독립된 spec → plan → 구현 사이클로 완료. 앱 종료 상태 지오펜싱처럼 검증이 어려운 영역은 순수 함수로 분리해 단위 테스트로 확인하는 경계를 먼저 설계
- 사용 기술: Expo SDK 56, React Native 0.85, TypeScript, Expo Router, expo-location, expo-task-manager, expo-notifications, expo-maps, Supabase(Auth · Postgres · RLS · pgTAP), RevenueCat, i18n-js, Jest, React Native Testing Library

### Code Slugger — 숫자야구 모바일 게임 (iOS / Android) — 2026.02 ~ 2026.03 (2개월)

회원가입 없이 바로 시작할 수 있는 숫자 추리 게임. 이탈 없는 온보딩, 기기 변경 시에도 데이터 유지, 결제 · 광고까지 자연스럽게 이어지는 수익화 구조. App Store 출시 · 운영.

- 익명 로그인 + 계정 복구: Supabase Auth 익명 로그인, 8자리 Recovery ID로 기기 변경 · 재설치 시 계정 연속성 유지
- 재화 시스템: React Query Optimistic Update로 코인 소모 · 획득 · 힌트 구매 즉시 반영, 실패 시 자동 롤백
- 서버사이드 검증: Supabase Edge Function에서 실제 코인 차감 로직 처리로 클라이언트 조작 방지
- AI 추리 로직: 720개 후보군에서 이전 결과를 기반으로 불가능한 후보를 제거, 평균 4~5회 내 정답 도달
- 수익화: 인앱결제 + 광고를 게임 경제 구조와 연결
- 사용 기술: React Native, React Query, i18n, Supabase Auth, PostgreSQL, Edge Functions

### 암호화폐 자동매매 시스템 — 개인 프로젝트 — 2025.01 ~ 2025.06 (6개월)

업비트 실계좌 연동, 24시간 자동 동작. 단순 매수/매도가 아닌 시장 판단 · 리스크 관리 · 배포 자동화 · 운영 알림까지 포함한 실운영형 시스템.

- 다중 지표 전략: EMA, RSI, MACD, Bollinger Bands, Stochastic RSI 조합, 시장 상태를 먼저 판별한 뒤 진입 여부를 결정
- 추세 필터: ATR 비율과 볼린저 밴드 폭을 결합해 횡보 · 추세 구간을 판별, 유의미한 구간에서만 신호 발생
- 동적 손절/익절: 최근 20봉 저점과 ATR로 동적 손절가 계산, R:R 1:2 기준 익절가 자동 산출
- 시장 전체 흐름 반영: UBMI/UBAI 모니터링으로 급락 시 신규 진입 차단 및 보유 포지션 정리 로직
- 배포 · 모니터링 자동화: GitHub Actions + Docker + GCP로 main 브랜치 반영 시 자동 배포, Slack으로 매수/매도/오류 이벤트 및 정기 리포트 전송
- 사용 기술: Python 3.11, pandas, numpy, ta, Docker, GCP(Compute Engine, Artifact Registry), GitHub Actions

## 포트폴리오 · 교육

- https://wglee.getcodeforge.dev/ · https://velog.io/@wglee0511/posts · GitHub wglee0511
- 항해99 사설 교육 Frontend React 과정 (2021.05 ~ 2021.09, 졸업) · 경희대학교 기계공학과 학사 (2015.03 ~ 2018.08, 졸업)

## `resume/01~05` · `resume-reviewed.md`와 다른 점 (면접에서 어긋나지 않게 확인)

- **PDF에만 있음:** Launch Time(P50) 540→400ms(-26%), OKX LLM 자동매매(2026.08~09), Code Slugger, 암호화폐 자동매매(2025.01~06), 프로젝트별 AI 협업 워크플로(spec → plan, 문서 건수), 요약 문구의 "앱 초기 실행 26% 단축".
- **PDF에 없음(저장소 이력서에만 있음):** Android Native Heap -69%(101.9→31.2MB), ANR 해결, Reanimated 누수 원인 · 공용 cleanup 훅, 콜드 스타트 지연 로딩 계측, MobX→Zustand 마이그레이션, Android 위젯 Jetpack Glance 재작성, CodePush(S3+CloudFront), 콜드 스타트 -21.8%/-24.4%.
- **표현 차이:** PDF는 "Hook 2종 · 에이전트 3종 · 규칙 문서 8종"으로 개수를 적었고 MCP · Codex 이식은 적지 않았다. PDF의 앱-위젯 항목 이름은 "체크리스트 위젯 신규 개발(4종 설정 화면)"이다.
- **기간 겹침(질문 나올 수 있음):** 암호화폐 자동매매(2025.01~06)와 Cadence · 스팟 스테이플러(2026.06~07)는 루티너리 재직(2024.11~2026.07)과 겹친다.
