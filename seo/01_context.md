# SEO 컨텍스트 — 프로젝트 기본 정보

> 이 파일은 모든 SEO 작업의 공통 기준값입니다.
> 다른 seo/*.md 파일과 함께 AI에게 전달하세요.

---

## 프로젝트 정보

| 항목 | 값 |
|------|----|
| 프로젝트 | wglee-portfolio |
| 프레임워크 | Next.js 16 (App Router) |
| 배포 도메인 | `https://wglee.getcodeforge.dev` |
| 상수명 | `SITE_URL = 'https://wglee.getcodeforge.dev'` |

---

## 개발자 정보

| 항목 | 값 |
|------|----|
| 이름 | 이원교 |
| 영문 닉네임 | WG.LEE, Rowan |
| 경력 | 4년차 프론트엔드 개발자 |
| 이메일 | ranazang@naver.com |
| GitHub | https://github.com/wglee0511 |
| Velog | https://velog.io/@wglee0511 |
| 현 직장 | Routinery Inc. |
| 학력 | 경희대학교 (https://www.khu.ac.kr) |
| 주요 스택 | React, React Native, TypeScript, Next.js, D3.js, Zustand, Electron |

---

## 검색엔진 인증 코드

```typescript
// Google Search Console
verification: {
  google: 'OmpNWXemvdfd_sre-v8xyrZSF_bOhzDGaISB0E_JfjA',
},

// Naver Search Advisor
other: {
  'naver-site-verification': 'cfed1c5917d8a29b183d2da6826319eb4e06b2d0',
},
```

---

## 주요 성과 수치 (description/OG에 사용)

- 메모리 최적화 **-69%** (958MB → 297MB)
- 앱 초기 실행 시간 **-26%** (540ms → 400ms)
- 번들사이즈 **-43%**
- 서비스 MAU **500만+**

---

## 관련 파일 경로

```
src/app/layout.tsx          # metadata, JsonLd import
src/app/opengraph-image.tsx # 동적 OG 이미지
src/app/sitemap.ts          # 사이트맵
src/components/JsonLd.tsx   # JSON-LD 구조화 데이터
public/robots.txt           # 크롤러 지침
public/manifest.json        # PWA manifest
```
