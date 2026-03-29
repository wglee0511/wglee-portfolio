# 포트폴리오 마이그레이션 계획

> 기준 파일: `resume-reviewed.md`
> 현재 상태: 각 섹션 컴포넌트에 콘텐츠가 하드코딩되어 있음

---

## 현황 분석

### 일치하는 부분 (변경 불필요)
- 회사 3곳 순서 및 기간 정보
- 프로젝트 2개 (Code Slugger, UPBIT Auto Trading) 존재 여부
- 연락처(이메일, GitHub, Velog)

### 불일치 / 누락 항목

| 섹션 | 현재 코드 | resume-reviewed.md | 조치 |
|---|---|---|---|
| **ExperienceSection** | 루티너리 achievements 7개 항목이 단일 평면 배열 | 5개 독립 업무(앱 성능, 체크리스트 위젯, 홈 위젯 현대화, Wear OS, Geofence)로 구분 | 구조 개편 |
| **ExperienceSection** | 루티너리 tags에 `Jetpack Compose`, `Jetpack Glance` 포함 | 이력서 tags에 없음 | 이력서 기준으로 통일 |
| **ExperienceSection** | 메이크델타 achievements 7개 평면 배열 | 4개 업무(알림앱, 차트 웹뷰, 주식앱, 디자인시스템)로 구분 | 구조 개편 |
| **ExperienceSection** | 페이히어 achievements 4개 평면 배열 | 4개 업무(고객관리, 고객대면앱, 네이버플레이스, 예약스토어)로 구분 | 구조 개편 |
| **ProjectsSection** | Code Slugger `link: "https://github.com/wglee0511/code-slugger"` | 링크 명시 없음 | 링크 제거 또는 확인 후 유지 |
| **ProjectsSection** | Code Slugger 기간 없음 | `2026.02 ~ 2026.03` | 기간 추가 |
| **ProjectsSection** | UPBIT Auto Trading 기간 없음 | `2025.01 ~ 2025.02` | 기간 추가 + 제목을 `암호화폐 자동매매 시스템`으로 변경 |
| **HeroSection** | 소개 문구 2줄 | 이력서 소개 3단락 | 소개 문구 일치 확인 (현재 일부만 반영) |
| **AboutSection** | stats: `4+` Years, `10+` Projects, `3+` Companies, `69%` Perf. Boost | 직접 명시 없음 (내용으로 유추 가능) | 유지 |
| **SkillsSection** | `Dev Suite`에 `Claude Code`, `Cursor` 포함 | 기술 스택에 없음 | 제거 또는 유지 결정 필요 |
| **SkillsSection** | `redux-toolkit` 미포함 | 이력서 스택에 있음 | Frontend 카테고리에 추가 |

---

## 마이그레이션 작업 목록

### 1. ExperienceSection — 업무 단위 그룹화 구조 개편

현재 단일 `achievements[]` 배열을 이력서의 업무 단위(소제목 기준)로 **그룹화된 구조**로 변경합니다.

```ts
// 변경 전
achievements: ["항목1", "항목2", ...]

// 변경 후
tasks: [
  {
    title: "앱 전반 성능 개선",
    items: ["React Query 구독 구조 재설계 ...", ...]
  },
  {
    title: "Android / iOS 체크리스트 위젯 신규 개발",
    items: [...]
  },
  ...
]
```

**루티너리** — 5개 업무 그룹:
1. 앱 전반 성능 개선
2. Android / iOS 체크리스트 위젯 신규 개발
3. Android 홈 위젯 시스템 현대화
4. Wear OS 앱 UI 시스템 현대화
5. Android Geofence 기반 위치 알림 모듈 개발

**메이크델타** — 4개 업무 그룹:
1. 암호화폐 트레이딩 전략 기반 실시간 알림 앱 개발
2. 트레이딩 차트 및 시세조회 웹뷰 페이지
3. 주식 트레이딩 분석 앱 출시
4. 모바일 디자인 시스템 구축

**페이히어** — 4개 업무 그룹:
1. 고객 관리 프리미엄 기능 개발
2. 고객 대면 앱 출시 (0→1)
3. 네이버 플레이스 예약 연동
4. 예약업 온라인 스토어 웹 앱 개발

**수정 파일**: `src/components/sections/ExperienceSection.tsx`

---

### 2. ExperienceSection — tags 이력서 기준 정렬

**루티너리 tags 수정**:
- 현재: `["React Native", "React", "TypeScript", "Swift", "Kotlin", "Jetpack Compose", "Jetpack Glance", "Zustand", "MobX", "React Query", "Firestore"]`
- 변경: `["React Native", "React", "TypeScript", "Swift", "Kotlin", "Zustand", "MobX", "Firestore", "Fastlane", "Firebase App Distribution", "i18next"]`

**수정 파일**: `src/components/sections/ExperienceSection.tsx`

---

### 3. ProjectsSection — 기간 필드 추가

각 프로젝트 데이터 객체에 `period` 필드 추가 및 UI 표시:

```ts
{ title: "Code Slugger", period: "2026.02 ~ 2026.03", ... }
{ title: "암호화폐 자동매매 시스템", period: "2025.01 ~ 2025.02", ... }
```

**수정 파일**: `src/components/sections/ProjectsSection.tsx`

---

### 4. SkillsSection — 스택 동기화

**추가**:
- `Frontend` 카테고리: `redux-toolkit` 추가

**검토 필요**:
- `Dev Suite` 카테고리의 `Claude Code`, `Cursor`는 이력서에 없음 → 포함 여부 결정 필요 (기술 스택이 아닌 도구로 간주하여 유지하거나 제거)

**수정 파일**: `src/components/sections/SkillsSection.tsx`

---

### 5. HeroSection — 소개 문구 3단락 반영 (선택)

현재 2줄 소개를 이력서의 3단락 구조로 확장하는 것을 검토합니다:
1. "웹과 앱을 넘나들며 실제 사용자에게 닿는 제품을 만드는 프론트엔드 개발자입니다."
2. "성능 저하의 구조적 원인을 찾아 코드 수준에서 해결합니다."
3. "플랫폼 경계 영역을 직접 설계하고 구현합니다."

현재 HeroSection은 1~2 단락만 반영 중. 3단락 추가는 선택사항.

**수정 파일**: `src/components/sections/HeroSection.tsx` (선택)

---

## 우선순위

| 우선순위 | 작업 | 파일 |
|---|---|---|
| 🔴 높음 | ExperienceSection 업무 그룹화 구조 개편 | ExperienceSection.tsx |
| 🔴 높음 | ExperienceSection tags 이력서 기준 정렬 | ExperienceSection.tsx |
| 🟡 중간 | ProjectsSection 기간 필드 추가 + UPBIT 제목 → `암호화폐 자동매매 시스템` | ProjectsSection.tsx |
| 🟡 중간 | SkillsSection `redux-toolkit` 추가 | SkillsSection.tsx |
| 🟢 낮음 | HeroSection 소개 문구 3단락 반영 | HeroSection.tsx |
| 🟢 낮음 | SkillsSection `Claude Code`, `Cursor` 유지 여부 결정 | SkillsSection.tsx |
