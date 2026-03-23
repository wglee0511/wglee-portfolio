# wglee-portfolio 코드베이스 분석

## 프로젝트 개요

이원교(Lee Won-kyu)의 프론트엔드 개발자 포트폴리오 사이트.

| 항목 | 값 |
|------|-----|
| Framework | Next.js 16.2.1 |
| Language | TypeScript |
| UI Library | React 19.2.4 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12 |
| Package Manager | pnpm |

---

## 디렉토리 구조

```
wglee-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 루트 레이아웃 (폰트, 메타데이터, Navbar/Footer 래핑)
│   │   ├── page.tsx            # 홈 페이지 (섹션 컴포넌트 조합)
│   │   ├── globals.css         # 전역 스타일 및 테마 변수
│   │   └── favicon.ico
│   └── components/
│       ├── layout/
│       │   ├── Navbar.tsx      # 고정 상단 네비게이션 (글래스모피즘)
│       │   └── Footer.tsx      # 푸터
│       └── sections/
│           ├── HeroSection.tsx       # 인트로 (이름, 타이틀, CTA 버튼)
│           ├── AboutSection.tsx      # 소개 + 통계 카드
│           ├── SkillsSection.tsx     # 기술 스택 그리드
│           ├── ExperienceSection.tsx # 경력 타임라인
│           ├── ProjectsSection.tsx   # 프로젝트 카드
│           └── ContactSection.tsx    # 연락처 CTA
├── public/                     # 정적 에셋
├── resume.md                   # 상세 이력서 (한국어)
├── resume.pdf                  # 이력서 PDF
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

---

## 의존성

### 프로덕션
| 패키지 | 버전 | 용도 |
|--------|------|------|
| next | 16.2.1 | 프레임워크 |
| react / react-dom | 19.2.4 | UI 라이브러리 |
| framer-motion | 12.38.0 | 애니메이션 |
| lucide-react | 0.577.0 | 아이콘 |
| clsx | 2.1.1 | className 유틸 |
| tailwind-merge | 3.5.0 | Tailwind 클래스 병합 |

### 개발
| 패키지 | 버전 | 용도 |
|--------|------|------|
| tailwindcss | 4.2.2 | CSS 유틸리티 |
| @tailwindcss/postcss | 4.2.2 | PostCSS 통합 |
| typescript | 5 | 타입 시스템 |
| eslint / eslint-config-next | 9 / 16.2.1 | 린팅 |

### 스크립트
```bash
pnpm dev    # 개발 서버
pnpm build  # 프로덕션 빌드
pnpm start  # 프로덕션 서버 실행
pnpm lint   # ESLint 실행
```

---

## 디자인 시스템

### 색상 팔레트
```css
--background:     #03040b   /* 다크 베이스 */
--foreground:     #f8f8fa   /* 오프화이트 */
--accent-blue:    #00e1ff   /* 시안 */
--accent-purple:  #b366ff   /* 라벤더 */
--accent-magenta: #ff3399   /* 핫핑크 */
```

### 핵심 CSS 클래스
| 클래스 | 설명 |
|--------|------|
| `.glass` | 글래스모피즘 (backdrop-blur-16px, 반투명 배경, 인셋 섀도우) |
| `.text-gradient` | 파란→보라→마젠타 그래디언트 텍스트 |
| `.fluid-h1` | 반응형 h1 (clamp 2.5rem~6rem) |
| `.fluid-h2` | 반응형 h2 (clamp 2rem~4rem) |
| `.glow-mesh` | 고정 배경 그로우 메시 (radial-gradient + blur) |

### 타이포그래피
- Primary: **Inter** (본문/UI)
- Secondary: **Outfit** (헤딩)

---

## 컴포넌트 상세

### `layout.tsx`
- Google Fonts (Inter + Outfit) 로드
- SEO 메타데이터 설정
- 부드러운 스크롤, 커스텀 폰트 변수
- 배경 `glow-mesh` 효과
- Navbar + Footer 래핑

### `page.tsx`
```tsx
// 섹션 순서
HeroSection → AboutSection → SkillsSection → ExperienceSection → ProjectsSection → ContactSection
```

### `HeroSection.tsx`
- 풀뷰포트 높이 (`min-h-[100svh]`)
- 장식용 글로우 오브 2개 (파랑/보라, 펄싱)
- 애니메이션 등장 순서: 뱃지(0.3s) → 이름(0.5s) → 설명(0.7s) → CTA 버튼(0.9s)
- GitHub 링크: https://github.com/wglee0511
- 이메일: ranazang@naver.com

### `AboutSection.tsx`
- 2컬럼 텍스트 (md:grid-cols-2)
- 통계 카드 4개: **4년** 경험, **10+** 프로젝트, **3+** 회사, **69%** 성능 향상
- 카드 호버: y -5px, scale 1.05

### `SkillsSection.tsx`
4개 카테고리 4컬럼 그리드:

| 카테고리 | 기술 |
|----------|------|
| Frontend | React, Next.js, TypeScript, Redux Saga, Zustand, React Query, TailwindCSS, D3.js |
| Native / Desktop | React Native, Jetpack Compose, Jetpack Glance, Electron, Swift, Kotlin |
| Infra & Tools | AWS, Firebase, Supabase, GitHub Actions, Fastlane, Storybook |
| Dev Suite | Claude Code, Cursor, PostgreSQL, React Native Skia |

### `ExperienceSection.tsx`
타임라인 형태, 최신순 3개 직장:

| 회사 | 기간 | 주요 성과 |
|------|------|----------|
| Routinery Inc. | 2024.11 ~ 현재 | Wear OS XML→Compose 100% 마이그레이션, React Query 피크 메모리 69% 감소 (958MB→297MB) |
| Make Delta Inc. | 2023.07 ~ 2024.04 | D3.js 실시간 캔들차트, 번들 사이즈 43% 감소, 모바일 디자인 시스템 0→1 구축 |
| Payhere Inc. | 2021.12 ~ 2023.06 | 고객용 포인트/스탬프 앱, 네이버 플레이스 실시간 예약 연동, Electron 하드웨어 플러그인 시스템 |

### `ProjectsSection.tsx`
3개 프로젝트 카드:

| 프로젝트 | 설명 | 기술 |
|----------|------|------|
| Code Slugger | 글로벌 랭킹 숫자야구 모바일 게임 | React Native, Supabase, React Query, PostgreSQL |
| Gatcha Roulette | 랜덤 추첨 유틸리티 앱 | React Native, Zustand, Framer Motion |
| UPBIT Auto Trading | 기술적 분석 기반 암호화폐 자동매매 | Python, Pandas, Upbit API, Slack Webhook |

### `ContactSection.tsx`
- 헤딩: "Let's Build Something Great"
- 이메일 버튼 (그래디언트, 보라→마젠타)
- GitHub + Velog 링크 (글래스모피즘)
- Velog: https://velog.io/@wglee0511

---

## 애니메이션 패턴

Framer Motion 공통 패턴:

```tsx
// 등장 애니메이션
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.3, duration: 0.6 }}

// 스크롤 트리거
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}

// 호버
whileHover={{ scale: 1.05 }}
```

---

## TypeScript 설정

```json
{
  "target": "ES2017",
  "module": "esnext",
  "strict": true,
  "paths": { "@/*": ["./src/*"] }
}
```

경로 별칭: `@/` → `src/`

---

## 개인 정보

| 항목 | 값 |
|------|-----|
| 이름 | 이원교 (Lee Won-kyu) |
| 이메일 | ranazang@naver.com |
| GitHub | https://github.com/wglee0511 |
| 블로그 | https://velog.io/@wglee0511 |
| 경력 | 4년+ |
| 학력 | 경희대학교 기계공학과 (2015.03~2018.08) |
