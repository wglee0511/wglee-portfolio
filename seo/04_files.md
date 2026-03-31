# SEO — 생성 파일 명세

> 의존: `seo/01_context.md` (SITE_URL)
> 상태: ✅ 모두 생성 완료

---

## public/robots.txt

```txt
User-agent: *
Allow: /

Sitemap: https://wglee.getcodeforge.dev/sitemap.xml
```

**역할**: 모든 크롤러에 전체 허용, sitemap 위치 안내.

---

## src/app/sitemap.ts

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://wglee.getcodeforge.dev',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
```

**역할**: `/sitemap.xml` 자동 생성. 단일 페이지 SPA이므로 루트 1개.

---

## src/app/opengraph-image.tsx

```typescript
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(/* ... */);
}
```

**역할**: `/opengraph-image` 경로에서 PNG 동적 생성.
**디자인**: 다크 테마(#131722) + 그리드 배경 + WG.LEE 그린 타이틀 + 성과 수치 3개(메모리 -69%, 번들 -43%, MAU 500만+) + 도메인 워터마크.

---

## public/manifest.json

```json
{
  "name": "이원교 포트폴리오",
  "short_name": "WG.LEE",
  "description": "이원교 Frontend Developer 포트폴리오",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#131722",
  "theme_color": "#00d084",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

**역할**: PWA 지원 — 모바일 홈화면 추가 시 앱처럼 실행.
**주의**: `/icon-192.png`, `/icon-512.png` 실제 파일은 아직 미생성 (→ `seo/06_todo.md` 참조).
