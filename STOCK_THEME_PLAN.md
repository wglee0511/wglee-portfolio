# 주식(Stock/Trading) 테마 포트폴리오 변경 계획 (Migration Plan)

본 문서는 현재 포트폴리오를 주식/트레이딩 테마로 변경하기 위한 세부 계획과 적용 가이드입니다.

## 1. 테마 콘셉트 및 핵심 시각 요소

*   **메인 콘셉트**: 개발자 이원교를 하나의 **"우량주(Blue Chip)"** 종목으로 상정하고, 방문자(채용 담당자)가 포트폴리오를 탐색하는 과정을 매력적인 종목을 발굴하여 "매수(채용)"하는 경험으로 치환합니다.
*   **색상 팔레트 (Color Scheme)**:
    *   **Background**: 다크 모드 기반의 깊은 색상 (예: 트레이딩 뷰의 다크 테마 배경색 `#131722`)
    *   **Accent Color**: 
        *   **상승 (Red / Green)**: 성과 창출, 긍정적 지표, 기술 스택 등을 강조 (글로벌 기준 Green, 한국 기준 Red 중 선택 - 개발자 친화적인 Green(`+`) 추천)
        *   **하락 (Blue / Red)**: 최적화로 감소시킨 지표 (예: 메모리 감소, 로딩 속도 감소 등 비용 단축 지표) 강조
*   **타이포그래피**: 주요 수치 지표(메모리 감소율, 사용자 수 등)에는 Monospace 및 전광판(LED) 느낌의 폰트를 사용하여 증권 거래 화면의 느낌을 부여.
*   **UI/UX 컴포넌트**: 캔들스틱 차트, 호가창(Order Book), 티커(Ticker, 전광판 흐르는 텍스트) 애니메이션, 종목 카드 레이아웃.

---

## 2. 섹션별 리뉴얼 세부 계획

### 2.1 Hero Section (`HeroSection.tsx`)
*   **시각화**: 배경에 은은하게 상승하는 캔들스틱 차트나 라인 차트 애니메이션 배치. (실제 D3.js나 React Native Skia 경험을 어필하는 차트 캔버스 연출)
*   **타이틀**: "Front-End Developer WG.LEE"를 하나의 상장 종목 코드(Ticker: `WGLEE`)처럼 표시.
*   **현재가 연출**: 메인 타이틀 옆에 현재 가치가 실시간으로 상승하는 애니메이션 적용 (`+1,200 (↑ 5.2%)`).
*   **효과**: 상단이나 하단에 핵심 스킬과 이력이 끊임없이 흐르는 주식 티커(Ticker) 컴포넌트 배치.

### 2.2 About Section (`AboutSection.tsx`)
*   **콘셉트**: 종목 요약 정보 (Stock Summary & Fundamentals)
*   **콘텐츠 구성**: 기업의 펀더멘털을 분석하듯 개발자의 3가지 핵심 역량(성능 최적화, 구조 개선, 주도적 설계)을 "투자 포인트"로 제시.
*   **디자인**: 재무제표 요약표나 시가총액, 거래량 테이블과 유사한 그리드 레이아웃(Glassmorphism 적용)으로 텍스트를 정갈하게 배치.

### 2.3 Experience Section (`ExperienceSection.tsx`)
*   **콘셉트**: 타임라인 및 실적 발표 (Earnings & Historical Chart)
*   **시각화**: 경력 기간을 월봉/주봉 차트의 형태나, 상승하는 계단식 라인 차트 위 핀(Pin) 마커로 표시.
*   **성과 지표 강조**: 이력서 내 주요 성과 수치를 트레이딩 화면의 등락률 UI 컴포넌트로 변경.
    *   예: `Peak Memory: 297.4MB` <span style="color: blue">(-69% ▼)</span>
    *   예: `Launch Time: 400ms` <span style="color: blue">(-26% ▼)</span>

### 2.4 Projects Section (`ProjectsSection.tsx`)
*   **콘셉트**: 포트폴리오 계좌 편입 종목 (Portfolio Holdings)
*   **콘텐츠**: `Code Slugger`, `암호화폐 자동매매 시스템`, `메이크델타 앱`, `루티너리 위젯` 등을 포트폴리오 내 주력 종목으로 표시. (특히 자동매매 및 트레이딩 앱 개발 경험은 주식 테마와 시너지가 가장 큰 프로젝트이므로 카드 디자인 최상단에 배치)
*   **디자인**: 종목 리스트 뷰 구조. 카드를 호버하면 해당 프로젝트의 기술적 차트(기여도나 사용 스킬 비중율)가 Tooltip 형태로 등장.

### 2.5 Skills Section (`SkillsSection.tsx`)
*   **콘셉트**: 섹터별 투자 비중 (Asset Allocation / Sector Weight)
*   **시각화**: 원형 다이아그램(파이 차트)이나, 포트폴리오 비중 표시 바이트 단위 게이지를 활용하여 React, Native, TS 등의 기술 수준을 **'보유 비중(%)'** 및 **'투자 의견(Strong Buy)'** 형식으로 위트 있게 표현.

### 2.6 Contact Section (`ContactSection.tsx`)
*   **콘셉트**: 매수 주문 창 (Order Form)
*   **디자인**: 사용자 이름, 이메일, 메시지를 입력하는 창을 주식 HTS 앱의 "시장가 매수", "지정가 매수" 입력 폼과 같이 패러디.
*   **버튼**: `Submit` 버튼을 `[ WG.LEE 전량 매수 (Hire Me) ]` 등 빨간색/초록색 굵은 버튼으로 변경.

---

## 3. 개발 및 마이그레이션 기술 전략

1.  **CSS / Styling**: 
    *   기존 `globals.css` 및 Tailwind Theme 색상을 다크/트레이딩 팔레트로 대체.
    *   Tailwind Config의 `colors`에 `ticker-red`, `ticker-green`, `chart-bg` 토큰 추가.
2.  **Animations (Framer Motion)**:
    *   숫자 카운팅 애니메이션(현재가 상승 모션) 라이브러리 추가 혹은 Framer Motion 기반 카운터 개발.
    *   무한 롤링되는 Ticker 컴포넌트 개발.
3.  **차트 렌더링**:
    *   기존 이력서에서 D3.js 능력을 강조했으므로, 가급적 Hero Section의 배경 등의 단순 차트를 구현 시 실제 SVG 타임라인이나 Canvas 캔들 차트 요소 포함 고려.

## 4. 진행 순서 (Checklist)

- [ ] 디자인 시스템 (Color, Typography, Shadows) Theme 토큰 주식/트레이딩 버전으로 업데이트
- [ ] 글로벌 Ticker(흐르는 전광판) 공통 컴포넌트 신규 생성 및 레이아웃 연결
- [ ] Hero Section 리팩토링 (주가 변동 카운트 애니메이션, 캔들/라인 일러스트 적용)
- [ ] Experience Section 수치 뱃지 및 타임라인 구조 업데이트 (등락률 스타일)
- [ ] Projects Section 증권 리스트 UI 변경
- [ ] Contact Section 매수 주문 폼(Order Form) UI 리디자인
- [ ] 반응형 최적화 & 테스트 (P50/P95 지표 악화 방지 렌더링 최적화 검수)
