# 이원교 | Frontend Developer Portfolio

> 개발자를 **우량주(Blue Chip)** 종목으로 상정하고, 방문자 경험을 주식 거래 플랫폼으로 치환한 포트폴리오 웹사이트

**🔗 배포 URL:** https://wglee.getcodeforge.dev

---

## 소개

4년차 프론트엔드 개발자 이원교의 포트폴리오입니다.
React · React Native · TypeScript를 기반으로 모바일·웹 서비스를 개발하며, 메모리 최적화 -69%, 번들 사이즈 -43% 등 실사용자 지표 기반의 성능 개선 경험을 보유하고 있습니다.

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI | React 19, Tailwind CSS 4, Framer Motion 12 |
| Theme | next-themes (라이트/다크 모드) |
| Icons | lucide-react |
| Package Manager | pnpm |

---

## 주요 기능

### 트레이딩 테마 UI
- **HeroSection** — 캔들스틱 차트 SVG, 실시간 가격 카운터 애니메이션
- **StockTicker** — 기술 스택 및 성과 지표를 무한 스크롤 티커로 표시
- **ContactSection** — HTS 스타일 매수 주문서 ("WG.LEE 전량 매수")

### 포트폴리오 섹션
| 섹션 | 컨셉 |
|------|------|
| About | 펀더멘탈 분석 — 핵심 투자 포인트 |
| Skills | 섹터별 투자 비중 — 기술 스택 및 숙련도 |
| Experience | 실적 발표 — 경력 타임라인 |
| Projects | 계좌 편입 종목 — 사이드 프로젝트 |
| Contact | 매수 주문 창 — 연락처 |

### 기술적 특징
- Framer Motion `whileInView` 기반 스크롤 진입 애니메이션
- 다크/라이트 모드 전환 (시스템 설정 자동 감지)
- Glassmorphism 카드 컴포넌트
- 유동형 반응형 타이포그래피 (CSS `clamp`)
- SEO 최적화 (OG 이미지, JSON-LD 구조화 데이터, 사이트맵, robots.txt)

---

## 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx            # 루트 레이아웃 — 메타데이터, SEO
│   ├── page.tsx              # 메인 페이지
│   ├── globals.css           # 글로벌 스타일 (트레이딩 테마 색상 시스템)
│   ├── sitemap.ts            # 사이트맵
│   ├── icon.tsx              # Favicon 동적 생성
│   └── opengraph-image.tsx   # OG 이미지 동적 생성
└── components/
    ├── JsonLd.tsx            # 구조화 데이터 (Person, ProfilePage, SoftwareApplication)
    ├── layout/
    │   ├── Navbar.tsx        # 고정 네비게이션
    │   ├── Footer.tsx        # 푸터
    │   ├── StockTicker.tsx   # 무한 스크롤 티커
    │   ├── ScrollToTop.tsx   # 상단 스크롤 버튼
    │   └── ThemeProvider.tsx # 테마 제공자
    └── sections/
        ├── HeroSection.tsx
        ├── AboutSection.tsx
        ├── SkillsSection.tsx
        ├── ExperienceSection.tsx
        ├── ProjectsSection.tsx
        └── ContactSection.tsx
```

---

## 로컬 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build
pnpm start
```

---

## 경력 요약

### 주식회사 루티너리 (2024.11 ~ 재직 중)
200개 국가, 500만 명 사용 루틴·습관 플래너 앱
- 앱 성능 개선: Peak Memory -69% (958.5MB → 297.4MB), Launch Time -26%
- iOS/Android 체크리스트 위젯 신규 개발
- Jetpack Glance 기반 Android 홈 위젯 시스템 현대화
- Wear OS Jetpack Compose 마이그레이션
- Fastlane 기반 CI/CD 파이프라인 단독 구축

### 주식회사 메이크델타 (2023.07 ~ 2024.04)
20,000+ 직장인 트레이더 대상 모바일 트레이딩 분석 서비스
- 40종 기술적 지표 기반 커스텀 전략 빌더 구현
- Canvas API + D3.js 캔들스틱 차트 개발
- 번들 크기 43% 절감 (Vite manualChunks + React.lazy)

### 주식회사 페이히어 (2021.12 ~ 2023.06)
48,000+ 가맹점 오프라인 결제 서비스(POS)
- 고객 대면 앱 0→1 출시
- 네이버 플레이스 예약 연동
- AWS S3/Route53/CloudFront 기반 정적 배포

---

## 사이드 프로젝트

### Code Slugger (2026.02 ~ 2026.03)
숫자야구 모바일 게임 (iOS / Android)
React Native · Supabase Auth · PostgreSQL · Edge Functions
[App Store](https://apps.apple.com/kr/app/code-slugger/id6759213279)

### 암호화폐 자동매매 시스템 (2025.01 ~ 2025.02)
업비트 실계좌 연동 24시간 자동매매 시스템
Python 3.11 · Docker · GCP · GitHub Actions

---

## 연락처

- **Email:** ranazang@naver.com
- **GitHub:** https://github.com/wglee0511
- **Velog:** https://velog.io/@wglee0511/posts
