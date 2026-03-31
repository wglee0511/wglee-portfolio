# SEO 개선 현황 인덱스

> 프로젝트: wglee-portfolio
> 배포 도메인: https://wglee.getcodeforge.dev
> 최종 업데이트: 2026-03-31

---

## 진행 현황

| 파일 | 내용 | 상태 |
|------|------|------|
| [seo/01_context.md](./seo/01_context.md) | 프로젝트 기본 정보 · 도메인 · 인증 코드 | ✅ 완료 |
| [seo/02_meta.md](./seo/02_meta.md) | metadata (OG, Twitter, canonical, keywords) | ✅ 완료 |
| [seo/03_jsonld.md](./seo/03_jsonld.md) | JSON-LD 구조화 데이터 (Person, ProfilePage, SoftwareApplication) | ✅ 완료 |
| [seo/04_files.md](./seo/04_files.md) | 생성 파일 (robots.txt, sitemap.ts, opengraph-image.tsx, manifest.json) | ✅ 완료 |
| [seo/05_components.md](./seo/05_components.md) | 컴포넌트 수정 (HeroSection, ProjectsSection, Footer) | ✅ 완료 |
| [seo/06_todo.md](./seo/06_todo.md) | 잔여 작업 (미적용 Low 이슈) | ⬜ 잔여 |

---

## 전체 점수

**개선 전**: 약 35/100 → **현재**: 약 80/100

---

## AI 할당 방법

각 파일은 단독으로 AI에 전달해도 바로 실행 가능합니다.

- **새 SEO 작업 추가 시** → `seo/06_todo.md` 전달
- **메타데이터 수정 시** → `seo/01_context.md` + `seo/02_meta.md` 전달
- **구조화 데이터 수정 시** → `seo/01_context.md` + `seo/03_jsonld.md` 전달
- **컴포넌트 접근성/SEO 수정 시** → `seo/05_components.md` 전달
