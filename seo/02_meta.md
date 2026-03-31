# SEO — metadata 명세

> 파일: `src/app/layout.tsx`
> 의존: `seo/01_context.md` (SITE_URL, 인증 코드 등)
> 상태: ✅ 적용 완료

---

## 현재 적용된 metadata 전체

```typescript
const SITE_URL = 'https://wglee.getcodeforge.dev';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // 타이틀
  title: {
    default: "이원교 | Frontend Developer Portfolio",
    template: "%s | 이원교 포트폴리오",
  },

  // 설명 (120~160자 유지)
  description: "4년차 프론트엔드 개발자 이원교의 포트폴리오. React, React Native, TypeScript를 다루며 메모리 최적화 -69%, 번들사이즈 -43% 성능 개선 경험 보유. 500만 MAU 서비스 운영.",

  // 키워드
  keywords: [
    "프론트엔드 개발자", "Frontend Developer", "React 개발자", "React Native 개발자",
    "React", "React Native", "TypeScript", "Next.js", "D3.js", "Zustand",
    "성능 최적화", "모바일 앱 개발", "크로스플랫폼",
    "이원교", "Rowan",
    "포트폴리오", "Portfolio", "개발자 포트폴리오",
  ],

  // 저자
  authors: [{ name: "이원교", url: SITE_URL }],
  creator: "이원교",

  // 크롤러
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },

  // canonical + hreflang
  alternates: {
    canonical: SITE_URL,
    languages: { 'ko-KR': SITE_URL },
  },

  // Open Graph
  openGraph: {
    type: 'profile',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: '이원교 포트폴리오',
    title: '이원교 | Frontend Developer Portfolio',
    description: '4년차 프론트엔드 개발자 이원교의 포트폴리오. React, React Native 기반 모바일·웹 서비스 개발. 메모리 -69%, 번들 -43% 성능 개선.',
    images: [
      {
        url: '/opengraph-image',  // src/app/opengraph-image.tsx 에서 동적 생성
        width: 1200,
        height: 630,
        alt: '이원교 Frontend Developer Portfolio',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: '이원교 | Frontend Developer Portfolio',
    description: '4년차 프론트엔드 개발자 이원교의 포트폴리오. React · React Native · TypeScript.',
    images: ['/opengraph-image'],
    creator: '@wglee0511',
  },

  // PWA
  manifest: '/manifest.json',

  // 검색엔진 인증
  verification: {
    google: 'OmpNWXemvdfd_sre-v8xyrZSF_bOhzDGaISB0E_JfjA',
  },
  other: {
    'naver-site-verification': 'cfed1c5917d8a29b183d2da6826319eb4e06b2d0',
  },
};
```

---

## 수정 시 주의사항

- `description`은 **120~160자** 유지
- `title.default`와 `openGraph.title`은 동일하게 유지
- OG 이미지 URL은 `/opengraph-image` (정적 파일이 아닌 Next.js 동적 라우트)
- `keywords`에 "전문가", "전문" 같은 단어 사용 지양
- 연차 변경 시 description, OG description, twitter description **3곳 모두** 수정
