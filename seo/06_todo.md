# SEO — 잔여 작업 (미적용 항목)

> 이 파일만 AI에 전달해도 각 작업을 독립적으로 실행할 수 있습니다.
> 의존 정보가 필요한 경우 `seo/01_context.md`를 함께 전달하세요.

---

## TODO-1: PWA 아이콘 이미지 생성

**우선순위**: Medium
**이유**: `public/manifest.json`에 아이콘 경로가 선언되어 있으나 실제 파일 없음.

**작업 내용**:
- `public/icon-192.png` 생성 (192×192px)
- `public/icon-512.png` 생성 (512×512px)
- 디자인 기준: 다크 배경(#131722) + 그린(#00d084) "W" 레터마크 (기존 `src/app/icon.tsx` 스타일 참고)

**방법 A** — `src/app/icon.tsx`와 동일한 Edge Runtime 방식으로 PNG 생성 후 저장
**방법 B** — `src/app/icon.tsx`의 ImageResponse 출력을 그대로 manifest 아이콘으로 활용 (Next.js가 자동 처리하는지 확인 필요)

---

## TODO-2: prefers-reduced-motion 대응

**우선순위**: Low
**이유**: 접근성 향상 + Core Web Vitals CLS 개선.

**작업 내용**: Framer Motion 애니메이션 전체에 `useReducedMotion` 훅 적용

**적용 위치**: `src/components/sections/` 내 모든 섹션 컴포넌트

**구현 패턴**:
```tsx
import { useReducedMotion } from 'framer-motion';

const shouldReduceMotion = useReducedMotion();

<motion.div
  animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
  transition={{ duration: shouldReduceMotion ? 0 : 0.7 }}
>
```

---

## TODO-3: BreadcrumbList 구조화 데이터

**우선순위**: Low
**이유**: 단일 페이지 앱이라 효과 제한적이나, 섹션 내비게이션을 구조화 데이터로 표현 가능.

**작업 내용**: `src/components/JsonLd.tsx`에 스키마 추가

```typescript
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '소개', item: 'https://wglee.getcodeforge.dev/#about' },
    { '@type': 'ListItem', position: 2, name: '기술', item: 'https://wglee.getcodeforge.dev/#skills' },
    { '@type': 'ListItem', position: 3, name: '경력', item: 'https://wglee.getcodeforge.dev/#experience' },
    { '@type': 'ListItem', position: 4, name: '프로젝트', item: 'https://wglee.getcodeforge.dev/#projects' },
    { '@type': 'ListItem', position: 5, name: '연락처', item: 'https://wglee.getcodeforge.dev/#contact' },
  ],
};
```

---

## 검증 체크리스트 (배포 후)

- [ ] https://search.google.com/test/rich-results — JSON-LD 오류 확인
- [ ] https://developers.facebook.com/tools/debug/ — OG 태그 미리보기 확인
- [ ] https://cards-dev.twitter.com/validator — Twitter Card 미리보기 확인
- [ ] Google Search Console에서 sitemap 제출 (`https://wglee.getcodeforge.dev/sitemap.xml`)
- [ ] Naver Search Advisor에서 sitemap 제출
- [ ] Lighthouse SEO 점수 측정 (목표: 90+)
