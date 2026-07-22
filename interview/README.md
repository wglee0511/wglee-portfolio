# 루티너리 면접 예상 질문

이력서의 루티너리 경력 항목과 `routinery-v2` 코드베이스를 직접 분석해 만든 질문 모음입니다.
**총 395문항.**

| 파일 | 범위 | 문항 |
|---|---|---|
| [01_routinery_ai_harness.md](./01_routinery_ai_harness.md) | AI 개발 하네스 (Hooks · Subagents · Rules · 팀 운영) | 1–50 |
| [02_routinery_performance.md](./02_routinery_performance.md) | 메모리 누수 · 콜드 스타트 · 계측 방법론 | 51–120 |
| [03_routinery_state.md](./03_routinery_state.md) | Zustand · React Query · ScreenFreeze · 마이그레이션 | 121–235 |
| [04_routinery_native.md](./04_routinery_native.md) | 위젯 · Wear OS · Geofence · CI/CD | 236–395 |

모든 질문은 실제 파일·커밋·라인 번호에 근거합니다. 추측으로 만든 문항은 없습니다.

---

## ⚠️ 먼저 확인해야 할 것 — 이력서와 코드가 다릅니다

분석 중 **이력서에 적힌 내용이 코드에서 확인되지 않는 항목 3건**을 발견했습니다.
면접에서 質問받기 전에 사실관계를 정리하시는 걸 권합니다.

### 1. 200개 링 버퍼 — 미구현

이력서: *"무한 증가하던 타이머 기록을 **200개 링 버퍼**로 제한"*

실제 `src/stores/timer/actions.ts:50`:
```ts
recordActivityLog: (message: string) => {
  set(state => ({
    records: [...state.records, `${new Date().toTimeString()}:: ${message}`],
  }));
},
```
상한이 없습니다. `dev`·`main`·현재 브랜치 전부에서 `slice(-200)`·`MAX_RECORD` 상수를 찾지 못했습니다.
설계 문서(`docs/superpowers/specs/2026-06-11-memory-leak-fixes-design.md`)에는 코드까지 적혀 있으나 반영되지 않았습니다.

### 2. 18개월 윈도우 캡 — 미구현

이력서: *"파생 상태로 전개되던 루틴 활동 이력을 **18개월 윈도우**로 캡"*

`src/utils/routineUtil.ts:446` `initRoutineActiveListUtil`에 날짜 윈도우 제한이 없습니다.
`while` 루프가 이력 전체를 하루씩 전개합니다.

### 3. 콜드 스타트 지연 로딩 — 정적 import

이력서: *"내비게이션 그룹의 즉시 import를 제거해 **약 50개 화면을 콜드 스타트 JS 평가 대상에서 제외**"*

`src/navigations/navigationGroup.ts`는 **66개 화면 전부 정적 `import`** 입니다.
`React.lazy`·`Suspense`·동적 `import()`가 이 파일에 없습니다.
(`freezeOnBlur: true`는 `TodoListScreen` 한 곳에만 있습니다.)

> 셋 다 **설계·측정 문서는 실재**합니다. 브랜치가 머지되지 않았거나, 롤백됐거나, 다른 저장소일 가능성이 있습니다.
> 확인 후 ① 실제 반영된 브랜치를 찾거나 ② 이력서 표현을 "설계·제안"으로 조정하는 편이 안전합니다.

---

## 🔥 가장 답하기 어려운 질문 15선

시간이 없다면 이것부터 준비하세요. 실제 작성자만 답할 수 있는 것들입니다.
**전부 소스에서 직접 확인했습니다.**

| # | 질문 요지 | 근거 |
|---|---|---|
| 350 | **`stopMonitoringLocation`이 지오펜스를 전부 지웁니다.** id로 하나 지운 뒤 `removeGeofences(pendingIntent)`로 전체 제거, 그런데 prefs는 하나만 정리. 위치 하나 해제하면 나머지가 다 죽습니다. | `GeofenceManager.kt:185-191` |
| 353 | **부팅 후 지오펜스가 하나도 복구되지 않습니다.** `BOOT_COMPLETED` 시점에 `reactHost?.currentReactContext`는 null이라 `else` 분기로 빠져 로그만 남습니다. | `GeofenceBootCompletedReceiver.kt:33` |
| 309 | **삭제한 항목이 부활합니다.** 앱에서 X 삭제 → 위젯에서 Y 토글 → 포그라운드 복귀 시 `storageGroupNewer`가 참이 되어 X가 되살아납니다. | `mergeCheckListData.ts:63-69` |
| 314–316 | **iOS 위젯이 모르는 JSON 필드를 파괴합니다.** Swift `Codable`은 드롭, Kotlin `org.json`은 보존. `createdAt`만 수동 복원 중인데 다른 필드는? | `mergeCheckListData.ts:83` vs `CheckListModels.swift` |
| 167 | ScreenFreeze로 잡은 300→600MB 회귀가 **HEAD에서 다시 사라졌습니다**. 변수도 `_isTodoListScreenActive`로 되돌아갔습니다. | `RoutineListScreenV2/index.tsx:77` vs 커밋 `09ee1c95d` |
| 140–142 | 무제한 `records` → MMKV 10MB 초과 → **타이머 스토어 persist 전체가 조용히 죽음**. Sentry는 dedupe로 1건. | `timer/actions.ts:50` + `mmkvStorage.ts:30` |
| 121–122 | 두 스토어의 미들웨어 순서가 반대이고, **본인이 쓴 가이드 문서와도 다릅니다**. | `routines/index.ts:32` vs `settings/index.ts:15` vs `final-refactor-guide.md:34` |
| 225–227 | `measure-first-screen.sh`가 기다리는 `FIRST_SCREEN_READY` 마커가 **소스에 존재하지 않습니다**. 타임아웃 후 "빌드 안 됨"으로 오진합니다. | `grep -rn FIRST_SCREEN_READY src/` → 0건 |
| 228 | `p95 = round(0.95×(n−1))`, n=10 → 인덱스 9 → **p95 = 최댓값**. | `measure-cold-start.sh:151` |
| 216 | 12월에 모든 `useFrameCallback`에 `isMounted` 가드를 넣었는데, **`TimerCircle/index.tsx`에는 없습니다**. | `TimerCircle/index.tsx:132` |
| 340–341 | 백그라운드 지오펜스에서 `startService()` — **Android 8+에서는 IllegalStateException**입니다. Play Services 임시 allowlist에 의존 중인데 알고 계셨나요? | `GeofenceBroadcastReceiver.kt:58-106` |
| 345–347 | `isEntry`/`isExit`를 둘 다 못 켭니다. `setLoiteringDelay`는 설정했지만 DWELL 타입은 등록 안 함. `setInitialTrigger(0)`은 안티치트 목적. | `GeofenceManager.kt:80-94` |
| 271–274 | **`Application`의 private 필드에 리플렉션**해 SessionReplay를 멈춥니다. 실패 시 fail-open이라 사용자 화면이 계속 녹화됩니다. | `WidgetBaseConfigActivity.kt:46-74` |
| 374–376 | versionCode = 커밋 수 + 1062000이 **Ruby·Groovy 양쪽에 중복**. rebase하면 역행해 Play Store 영구 거부. ABI split은 2^20 오버플로. | `Fastfile:88` + `build.gradle:88,277` |
| 130–131 | `useShallow(state => getSubscriptionAvailable(state))` — **boolean에 shallow 비교**. 3곳. | `subscription/selectors.ts:110,148,182` |

---

## 준비 전략

**1. 수치의 출처를 한 문장으로 말할 수 있게 하세요.**
`-69%`는 *Android Native Heap **Total Allocations** 101.9MB → 31.2MB*이지 Peak Memory가 아닙니다.
`-21.8%`는 *Debug 빌드 중앙값 n=10*이지 프로덕션 P50이 아닙니다.
먼저 조건을 밝히면 신뢰를 얻고, 숨기면 추궁당합니다.

**2. "왜 그 값인가"를 준비하세요.**
`delay={600}` vs `SCREEN_FREEZE_DELAY(1000)`, `staleTime 30초`, `MAX_VALID_DURATION_MS 30000`, 반경·임계값 —
근거 없는 매직 넘버는 가장 흔한 추궁 지점입니다.

**3. 모르는 건 모른다고 하세요.**
위 12선 중 상당수는 "지금 보니 버그다"가 정답입니다.
발견하고 인정하는 태도가, 없는 근거를 지어내는 것보다 훨씬 좋게 평가됩니다.

**4. 미구현 3건은 미리 정리하세요.**
"설계까지 했고 머지가 안 됐다"는 정직한 답변이 가능합니다.
다만 **면접장에서 처음 알게 되면** 수습이 어렵습니다.
