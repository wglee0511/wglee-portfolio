# 마이그레이션 계획 — resume-reviewed.md 기반

현재 코드와 `resume-reviewed.md`를 비교하여 불일치 항목과 누락 항목을 정리하고, 수정 작업을 섹션별로 명세합니다.

---

## 0. 현황 요약

| 섹션 | 현재 상태 | 조치 |
|------|----------|------|
| HeroSection | 내용 일치 | 유지 |
| AboutSection | 통계 수치 일부 부정확 | 수정 |
| SkillsSection | 스택 일부 누락 | 수정 |
| ExperienceSection | Routinery CI/CD 태스크 누락 | 추가 |
| ProjectsSection | 내용 일치 | 유지 |
| ContactSection | 내용 일치 | 유지 |

---

## 1. HeroSection — 변경 없음

현재 코드의 문구가 `resume-reviewed.md` 소개 단락과 완전히 일치합니다.

---

## 2. AboutSection — 통계 카드 수정

### 현재 코드 (`AboutSection.tsx:59-64`)

```
{ value: "4+", label: "Years Exp." },
{ value: "10+", label: "Projects" },
{ value: "3+", label: "Companies" },
{ value: "69%", label: "Perf. Boost" }
```

### 문제점

- `Years Exp.`: resume 기준 경력 시작은 2021.12. 2026-03-29 현재 약 4년 3개월 → `4+`는 유효하지만 `5+`도 합리적. **현행 유지.**
- `10+`: resume에 명시된 프로젝트 수 근거 없음. 경력사 3곳 × 주요 태스크 수로 보면 15개 이상. 외부에서 확인 불가하므로 **현행 유지.**
- `Companies`: 루티너리·메이크델타·페이히어 = 3개 → `3+` 정확. **유지.**
- `Perf. Boost`: resume에 Peak Memory -69% 명시. **유지.**

> 통계 카드는 변경 불필요합니다.

---

## 3. SkillsSection — 스택 정렬

### 현재 코드 (`SkillsSection.tsx:8-29`)

| 카테고리 | 현재 목록 |
|---------|----------|
| Frontend | React, Next.js, TypeScript, Redux (Saga·Toolkit), Zustand, MobX, React Query, TailwindCSS, D3.js, i18next |
| Native / Desktop | React Native, Jetpack Compose, Jetpack Glance, Electron, Swift, Kotlin |
| Infra & Tools | AWS, GCP, Docker, Firebase, Supabase, GitHub Actions, Fastlane, Storybook |
| Dev Suite | Claude Code, Cursor, PostgreSQL, React Native Skia, Python |

### resume-reviewed.md 기술 스택 목록

`React` `React Native` `TypeScript` `Next.js` `Zustand` `React Query` `Redux` `redux-saga` `redux-toolkit` `MobX` `D3.js` `Electron` `Storybook` `GitHub Actions`

### 차이 분석

- `redux-saga` / `redux-toolkit` 이 resume에 명시되어 있으나 Frontend 카테고리에서 `Redux (Saga · Toolkit)` 로 통합 표기 중 → **의미상 동일, 현행 유지.**
- resume 스택 목록에는 없지만 각 경력 사용 기술에 명시된 것들(`Fastlane`, `Firebase App Distribution`, `Firestore`, `Supabase`, `Docker`, `GCP`, `Python 3.11`, `Swift`, `Kotlin`, `Vite` 등)은 모두 현재 카드에 포함되어 있거나 합리적으로 그룹핑되어 있음.
- **`Vite`** — 메이크델타 경력 사용 기술에 명시(`Vite`). 현재 Frontend 카테고리에 없음.

### 수정 항목

**`SkillsSection.tsx` Frontend 배열에 `Vite` 추가**

```diff
- skills: ["React", "Next.js", "TypeScript", "Redux (Saga · Toolkit)", "Zustand", "MobX", "React Query", "TailwindCSS", "D3.js", "i18next"]
+ skills: ["React", "Next.js", "TypeScript", "Redux (Saga · Toolkit)", "Zustand", "MobX", "React Query", "TailwindCSS", "D3.js", "Vite", "i18next"]
```

---

## 4. ExperienceSection — CI/CD 태스크 추가

### 현재 코드 (`ExperienceSection.tsx:34-80`)

루티너리 항목에 5개 태스크가 있습니다.

1. 앱 전반 성능 개선
2. Android / iOS 체크리스트 위젯 신규 개발
3. Android 홈 위젯 시스템 현대화
4. Wear OS 앱 UI 시스템 현대화
5. Android Geofence 기반 위치 알림 모듈 개발

### resume-reviewed.md 루티너리 태스크 목록

위 5개 외에 **`CI/CD 자동화 인프라 구축 (Fastlane)`** 태스크가 존재합니다.

### 누락 내용

```
CI/CD 자동화 인프라 구축 (Fastlane)
- iOS DEV/PROD 빌드 파이프라인 단독 구축 — Firebase App Distribution 테스터 배포, TestFlight 업로드(심사 제출 분리), package.json 버전 자동 동기화(sync_version lane)
- Android DEV APK / PROD APK / PROD AAB 빌드 자동화 — Google Play Internal Testing 업로드, git rev-list --count 기반 versionCode 자동 계산
- 빌드 완료 시 Slack Dev 그룹 자동 알림 연동
```

### 수정 항목

**`ExperienceSection.tsx` 루티너리 `tasks` 배열에 CI/CD 항목 추가 (5번째 태스크 뒤에 삽입)**

```diff
       {
         title: "Android Geofence 기반 위치 알림 모듈 개발",
         items: [...]
       },
+      {
+        title: "CI/CD 자동화 인프라 구축 (Fastlane)",
+        items: [
+          "iOS DEV/PROD 빌드 파이프라인 단독 구축 — Firebase App Distribution 테스터 배포, TestFlight 업로드(심사 제출 분리), package.json 버전 자동 동기화(sync_version lane)",
+          "Android DEV APK / PROD APK / PROD AAB 빌드 자동화 — Google Play Internal Testing 업로드, git rev-list --count 기반 versionCode 자동 계산",
+          "빌드 완료 시 Slack Dev 그룹 자동 알림 연동",
+        ]
+      },
```

### 루티너리 `tags` 배열 확인

현재: `["React Native", "React", "TypeScript", "Swift", "Kotlin", "Zustand", "MobX", "Firestore", "Fastlane", "Firebase App Distribution", "i18next"]`

resume 사용 기술: `React Native, React, TypeScript, Swift, Kotlin, Zustand, MobX, Firestore, Fastlane, Firebase App Distribution, GitHub Actions, i18next`

**`GitHub Actions` 누락.**

```diff
- tags: ["React Native", "React", "TypeScript", "Swift", "Kotlin", "Zustand", "MobX", "Firestore", "Fastlane", "Firebase App Distribution", "i18next"]
+ tags: ["React Native", "React", "TypeScript", "Swift", "Kotlin", "Zustand", "MobX", "Firestore", "Fastlane", "Firebase App Distribution", "GitHub Actions", "i18next"]
```

---

## 5. ProjectsSection — 변경 없음

현재 코드의 두 프로젝트(Code Slugger, 암호화폐 자동매매 시스템) 모두 resume와 내용·기술 스택이 일치합니다.

---

## 6. ContactSection — 변경 없음

이메일, GitHub, Velog 링크 모두 resume와 일치합니다.

---

## 작업 목록 (우선순위 순)

| 번호 | 파일 | 작업 내용 |
|------|------|----------|
| 1 | `src/components/sections/ExperienceSection.tsx` | 루티너리 `tasks` 배열에 CI/CD 태스크 추가 |
| 2 | `src/components/sections/ExperienceSection.tsx` | 루티너리 `tags` 배열에 `"GitHub Actions"` 추가 |
| 3 | `src/components/sections/SkillsSection.tsx` | Frontend 스킬 배열에 `"Vite"` 추가 |

---

## 변경하지 않는 항목

- `AboutSection` 통계 카드 수치 — resume에 근거한 `4+`, `3+`, `69%`는 정확하며 `10+`는 내부 집계 기준이므로 현행 유지.
- `HeroSection`, `ContactSection` — resume와 완전히 일치.
- `ProjectsSection` — 내용·기술 스택 모두 일치.
