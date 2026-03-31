# SEO — JSON-LD 구조화 데이터 명세

> 파일: `src/components/JsonLd.tsx`
> 의존: `seo/01_context.md` (SITE_URL, 개발자 정보)
> 상태: ✅ 적용 완료
> 적용 위치: `src/app/layout.tsx` → `<JsonLd />` (body 최상단)

---

## 스키마 목록

| 스키마 | 목적 |
|--------|------|
| `Person` | 개발자 신원 — 구글 Knowledge Panel 노출 |
| `ProfilePage` | 포트폴리오 페이지 — 프로필 페이지임을 명시 |
| `SoftwareApplication` | Code Slugger 앱 — 앱 정보 리치 스니펫 |

---

## Person 스키마

```typescript
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://wglee.getcodeforge.dev/#person',  // 고유 ID, 다른 스키마에서 참조
  name: '이원교',
  alternateName: 'WG.LEE',
  url: 'https://wglee.getcodeforge.dev',
  email: 'ranazang@naver.com',
  sameAs: [
    'https://github.com/wglee0511',
    'https://velog.io/@wglee0511',
  ],
  jobTitle: 'Frontend Developer',
  description: '4년차 프론트엔드 개발자. React, React Native, TypeScript를 다루며 모바일·웹 서비스를 개발합니다.',
  knowsAbout: ['React', 'React Native', 'TypeScript', 'Next.js', 'D3.js', 'Zustand', 'Electron'],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: '경희대학교',
    sameAs: 'https://www.khu.ac.kr',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Routinery Inc.',
  },
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Frontend Developer',
    occupationLocation: { '@type': 'Country', name: '대한민국' },
  },
};
```

---

## ProfilePage 스키마

```typescript
const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  name: '이원교 포트폴리오',
  url: 'https://wglee.getcodeforge.dev',
  mainEntity: { '@id': 'https://wglee.getcodeforge.dev/#person' },  // Person 스키마 참조
};
```

---

## SoftwareApplication 스키마 (Code Slugger)

```typescript
const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Code Slugger',
  applicationCategory: 'GameApplication',
  operatingSystem: 'iOS, Android',
  author: { '@type': 'Person', name: '이원교' },
  description: '회원가입 없이 바로 시작할 수 있는 숫자 추리 게임 앱. React Native로 개발.',
  downloadUrl: 'https://apps.apple.com/kr/app/code-slugger/id6759213279',
  datePublished: '2026-03',
};
```

---

## 컴포넌트 반환 구조

```tsx
return (
  <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
  </>
);
```

---

## 수정 시 주의사항

- `@id` URI는 절대 변경하지 않음 (다른 스키마가 참조)
- 프로젝트 추가 시 `SoftwareApplication` 스키마를 추가하고 배열로 반환
- 직장 변경 시 `worksFor.name` 수정
- 검증: https://search.google.com/test/rich-results
