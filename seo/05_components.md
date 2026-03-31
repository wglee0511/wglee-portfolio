# SEO — 컴포넌트 수정 명세

> 상태: ✅ 모두 적용 완료

---

## src/components/sections/HeroSection.tsx

### 변경: h1 aria-label 추가

**문제**: `<h1>WG.LEE</h1>` 만으로는 검색 엔진이 페이지 주제 파악 불가.

**적용**:
```tsx
<h1 className="fluid-h1 font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
  <span
    className="text-gradient"
    aria-label="이원교 프론트엔드 개발자 포트폴리오"
  >
    WG.LEE
  </span>
</h1>
```

---

## src/components/sections/ProjectsSection.tsx

### 변경: Image alt 텍스트 구체화 + priority 추가

**문제**: `alt="screenshot 1"` 등 의미 없는 alt 텍스트.

**적용**:
```tsx
{/* 앱 아이콘 */}
<Image
  src={project.icon}
  alt="Code Slugger 앱 아이콘 - 숫자 추리 게임"
  width={48} height={48}
  className="rounded-xl shadow-lg"
  unoptimized
/>

{/* 좌측 스크린샷 */}
<Image
  src={project.screenshots[1]}
  alt="Code Slugger 게임 플레이 화면 - 점수 입력 인터페이스"
  width={90} height={195}
  className="w-full h-auto"
  unoptimized
/>

{/* 중앙 스크린샷 — LCP 대상이므로 priority 적용 */}
<Image
  src={project.screenshots[0]}
  alt="Code Slugger 앱 홈 화면 - 숫자 야구 모바일 게임"
  width={100} height={217}
  className="w-full h-auto"
  unoptimized
  priority
/>

{/* 우측 스크린샷 */}
<Image
  src={project.screenshots[2]}
  alt="Code Slugger 결과 화면 - 정답 공개 애니메이션"
  width={90} height={195}
  className="w-full h-auto"
  unoptimized
/>
```

---

## src/components/layout/Footer.tsx

### 변경: address 태그로 연락처 구조화

**문제**: 검색 엔진이 연락처 정보 파악 불가.

**적용**:
```tsx
<address className="not-italic mb-3 flex items-center justify-center gap-3 flex-wrap">
  <a
    href="mailto:ranazang@naver.com"
    rel="author"
    className="hover:underline"
    style={{ color: 'var(--text-muted)' }}
  >
    ranazang@naver.com
  </a>
  <span aria-hidden="true">·</span>
  <a
    href="https://github.com/wglee0511"
    rel="me noopener noreferrer"
    target="_blank"
    className="hover:underline"
    style={{ color: 'var(--text-muted)' }}
  >
    GitHub
  </a>
  <span aria-hidden="true">·</span>
  <a
    href="https://velog.io/@wglee0511"
    rel="me noopener noreferrer"
    target="_blank"
    className="hover:underline"
    style={{ color: 'var(--text-muted)' }}
  >
    Velog
  </a>
</address>
```

**포인트**:
- `<address>`: 소유자 연락처임을 시맨틱하게 명시
- `rel="author"`: 이메일이 페이지 저자의 것임을 표시
- `rel="me"`: 소셜 링크 소유 확인 (Google Profile, Mastodon 등 활용)
