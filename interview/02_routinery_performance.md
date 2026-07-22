# 면접 질문 — 성능: 메모리 누수 · 콜드 스타트 (루티너리)

> 근거: 커밋 `e1130453`, `docs/superpowers/specs/2026-06-11-memory-leak-fixes-design.md`,
> `docs/lazy-loading-measurements/comparison.md`, `App.tsx`, `scripts/measure-*.sh`
> 이력서 항목: "메모리 누수 해결로 OutOfMemoryError 제거", "콜드 스타트 지연 로딩 전환"

---

## A. Reanimated 메모리 누수

51. `OutOfMemoryError`가 Android에서만 발생했나요, iOS에서도 재현됐나요? 두 플랫폼의 메모리 압박 방식 차이를 설명해 주세요.

52. Reanimated SharedValue가 정리되지 않으면 **네이티브 힙**이 늘어나는 경로를 설명해 주세요. JS 객체가 아니라 왜 native heap인가요?

53. `useAnimationCleanup`에서 최신 SharedValue를 추적하려고 ref 패턴을 썼다고 했습니다. 왜 의존성 배열에 SharedValue를 직접 넣지 않았나요?

54. `cancelAnimation`을 명시적으로 호출하는 것과, 컴포넌트 언마운트 시 Reanimated가 자동 정리하는 것의 차이는? 자동 정리를 믿을 수 없었던 이유는?

55. `isMounted` 체크를 worklet 안에서 하는데, worklet은 UI 스레드에서 돕니다. JS 스레드의 ref 값을 worklet이 읽을 때 동기화 문제는 없나요?

56. `useFrameCallback`에 `isMounted` 체크를 추가했습니다. 프레임마다 도는 콜백에 조건 분기를 넣으면 오버헤드가 있을 텐데, 측정해 봤나요?

57. `setTimeout` 누수를 제거했다고 했습니다. 원래 코드에서 `setTimeout`이 왜 필요했고, 무엇으로 대체했나요?

58. SharedValue 25개(슬라이드 15 + 타이머 서클 6 + 비교 4)에 적용했습니다. 왜 이 세 곳만이었나요? 다른 SharedValue 사용처는 안전하다고 판단한 근거는?

59. 측정 지표가 `Total Allocations` 101.9MB → 31.2MB입니다. 이건 **누적 할당량**이지 상주 메모리(RSS)가 아닌데, 누수 해결의 지표로 적절한가요?

60. 같은 커밋에 `Remaining Size` 31.2MB → 11.0MB도 있습니다. 이게 실제 "회수 안 된 메모리"에 더 가까운 지표 아닌가요? 왜 69%(Total Allocations)를 대표 수치로 골랐나요?

61. `calloc Allocations` 5,940 → 4,044 (32% 감소)도 있습니다. 할당 **횟수**가 줄어든 건 cleanup과 어떤 인과관계인가요?

62. 측정은 어떤 시나리오로 했나요? 같은 조작을 몇 번 반복했고, 재현성은 어떻게 확보했나요?

63. Android Native Heap 계측 도구는 무엇을 썼나요? (Android Studio Memory Profiler? `dumpsys meminfo`?) 왜 그 도구였나요?

64. 이 수정 이후 실제 프로덕션 크래시율(Crashlytics/Sentry)이 얼마나 떨어졌나요?

65. `patches/react-native-reanimated+4.3.1.patch`에서 C++ 레벨로 `initializeLayoutAnimationsProxy`의 null deref를 막았습니다. 이 크래시는 언제 발생하나요?

66. 위 패치 주석에 "Bridgeless startup race"라고 적었습니다. bridgeless 모드에서 `installTurboModule`이 Fabric scheduler 등록보다 먼저 불릴 수 있는 이유는?

67. 이 패치는 upstream 이슈(#6965)에 대한 우회입니다. 라이브러리를 패치하는 것과 버전을 내리는 것 중 왜 패치를 골랐나요?

68. `patch-package`로 관리하는 패치가 27개입니다. RN이나 라이브러리 업그레이드 시 이 패치들이 깨질 텐데, 어떻게 관리했나요?

69. `patches/react-native+0.84.0.patch`에서 `RCTViewComponentView.mm`의 `unmountChildComponentView`에 bounds check를 넣었습니다. 왜 Fabric이 이미 없는 인덱스의 unmount를 요청하나요?

70. 위 패치에서 인덱스가 범위를 벗어나면 `removeFromSuperview` 후 조용히 return 합니다. 이게 뷰 계층을 불일치 상태로 남길 위험은 없나요?

---

## B. 상태 관리 / 메모리 설계

71. 설계 문서(`2026-06-11`)에서 `timerStore.records`를 200개 ring buffer로 제한하기로 했습니다. **현재 코드(`src/stores/timer/actions.ts:50`)에는 이 제한이 없습니다.** 실제로 반영됐나요, 아니면 설계 단계에서 멈췄나요?

72. 마찬가지로 `routineActiveList`의 18개월 윈도우 캡도 `initRoutineActiveListUtil`에 보이지 않습니다. 어느 브랜치에 있나요?

73. (반영됐다면) 200이라는 숫자는 어떻게 정했나요? 개발자 디버그 전용 데이터인데 왜 persist 대상으로 남겼나요?

74. `records`가 MMKV persist 대상이라 디스크에도 누적됩니다. 이미 수만 건이 쌓인 기존 사용자의 데이터는 어떻게 정리하나요? 마이그레이션이 필요하지 않나요?

75. `recordActivityLog` 호출처에 FCM 백그라운드 메시지 핸들러가 있습니다. 푸시를 받을 때마다 append되면, 앱이 꺼진 상태에서도 무한히 자라나요?

76. 18개월 윈도우가 "안전 마진"이라고 문서에 적혀 있는데, UI가 그보다 과거를 조회하면 빈 값이 나옵니다. 통계/캘린더 화면의 최대 조회 범위를 실제로 확인했나요?

77. 원본 `routineActiveHistory`는 보존하고 computed 전개만 제한하는 설계입니다. 사용자가 2년 전 데이터를 보려 하면 어떻게 되나요?

78. 타임라인 뷰 토글 시 "누를 때마다 약 20MB가 회수되지 않던" 누수를 lazy mount + keep-alive로 해결했습니다. keep-alive는 오히려 메모리를 붙잡아 두는 전략인데, 왜 이게 해결책인가요?

79. `ScreenFreeze`(react-freeze)를 `AnalysisScreen`은 `delay={600}`, `FriendsScreen`은 `SCREEN_FREEZE_DELAY` 상수를 씁니다. 왜 값이 다른가요? 600이라는 숫자의 근거는?

80. freeze된 화면에서 Reanimated 애니메이션과 Skia Canvas는 어떻게 되나요? 복귀 시 상태가 깨지지 않나요?

81. `<ScreenFreeze>`를 복원한 커밋(`09ee1c95`)의 설명에 "3.29.22부터 메모리 사용량이 ~300MB → ~600MB로 약 2배 증가한 회귀"라고 되어 있습니다. 이 회귀의 원인은 무엇이었나요?

82. 위 수치(~300MB / ~600MB)와 이력서의 메모리 지표(101.9MB → 31.2MB)는 스케일이 다릅니다. 각각 무엇을 측정한 건지 구분해서 설명해 주세요.

---

## C. Zustand · React Query

83. `useRoutineStore`의 미들웨어 순서가 `subscribeWithSelector(computed(persist(...)))`입니다. 이 순서를 바꾸면 무엇이 깨지나요?

84. `computed`가 `persist` 바깥에 있습니다. computed 값이 디스크에 저장되지 않게 하려는 의도인가요? 반대 순서면 어떻게 되나요?

85. `create<RoutineStore>` 위에 `@ts-ignore`가 두 개 붙어 있습니다. 타입 호환성 문제를 우회한 건데, 이게 가리고 있는 실제 위험은?

86. `patches/zustand-computed+2.1.1.patch`에서 `Object.assign(state, computedState)`를 `{...state, ...computedState}`로 바꿨습니다. 원본이 왜 버그인가요?

87. 위 수정이 없으면 어떤 증상이 나타나나요? 직접 겪은 문제였나요?

88. `sortedRoutineList`와 `routineActiveList`를 persist state에서 제거하고 computed로 옮겼습니다. 기존 사용자의 MMKV에 남아 있는 이 키들은 어떻게 처리되나요?

89. `useShallow`를 100곳에서 씁니다. 언제 `useShallow`가 **필요없는지** 판단 기준은? 남용하면 어떤 비용이 있나요?

90. `reactQueryConfig.ts`에서 `structuralSharing: true`로 리렌더링을 줄이면서 동시에 `notifyOnChangeProps: 'all'`을 설정했습니다. 이 조합은 모순 아닌가요?

91. `staleTime: 30초`, `gcTime: 10분`으로 잡았습니다. 이 값의 근거는? 화면별로 다르게 가져가야 하는 쿼리는 없었나요?

92. `refetchOnMount: false`입니다. 사용자가 화면을 다시 열었을 때 30초 이내면 오래된 데이터를 보게 되는데, 구독 상태 같은 민감한 데이터도 이 정책을 따르나요?

93. `retry`에서 `error?.status >= 400 && < 500`은 재시도하지 않습니다. 429(Too Many Requests)도 여기 포함되는데 의도한 건가요?

94. `SERVER_TIMEOUT`을 문자열 메시지로 비교합니다. 에러 타입/코드가 아니라 메시지 문자열에 의존하는 게 취약하지 않나요?

95. React Query와 Zustand가 둘 다 있습니다. 어떤 데이터가 어느 쪽에 속하는지 팀 내 기준이 있었나요?

96. `syncStores.ts`에서 `subscribe`와 `fireImmediately`를 씁니다. 스토어 간 동기화를 이벤트로 연결하면 순환 업데이트 위험이 있는데 어떻게 막았나요?

---

## D. 콜드 스타트 / 지연 로딩

97. 약 50개 화면을 콜드 스타트 JS 평가에서 제외했습니다. 어떤 기준으로 "지연 로딩해도 되는 화면"을 골랐나요?

98. 지연 로딩된 화면에 처음 진입할 때 지연이 생깁니다. 사용자 체감을 어떻게 확인했나요? 측정 문서에는 "Regression Probe: 미수행"으로 되어 있는데요.

99. 위 항목이 "추후 진행 예정"으로 남아 있습니다. 지금 이 리팩터링을 프로덕션에 넣는 게 안전하다고 판단한 근거는?

100. `App.tsx`에 "⚠️ CRITICAL: hydration 후 migration 실행 (순서 중요!)" 주석이 있습니다. 순서가 뒤바뀌면 구체적으로 무슨 일이 벌어지나요?

101. `useStoresHydrated()`가 여러 스토어의 hydration 완료를 어떻게 판단하나요? MMKV는 동기 API인데 왜 hydration 대기가 필요한가요?

102. `isAppFullyReady = areStoresHydrated && isMigrated && isI18nConfig && isInit` 네 조건입니다. 이 중 하나가 영원히 false로 남으면 어떻게 감지하나요? 타임아웃이 있나요?

103. `logPerfMarker('BOOTSPLASH_HIDE')` 직후에 `RNBootSplash.hide()`를 부릅니다. 스플래시를 숨긴 시점과 실제 첫 화면이 그려지는 시점 사이의 빈 화면은 없나요?

104. 측정 문서의 A 구간이 `BOOTSPLASH_HIDE → SPLASH_DONE`입니다. 마커 기반 측정은 JS 실행 시점만 잡는데, 네이티브 초기화 시간은 어떻게 포함했나요?

105. `measure-cold-start.sh`가 median과 p95를 계산합니다. n=10에서 p95는 사실상 최댓값에 가까운데, 통계적으로 의미가 있나요?

106. 측정이 **Debug 빌드** 기준입니다. Release 빌드에서는 Hermes 바이트코드 사전 컴파일, 인라인 requires 등으로 양상이 완전히 다른데, Debug 수치로 개선을 주장할 수 있나요?

107. Baseline과 After가 **같은 커밋**(`2a847244`)으로 문서에 적혀 있습니다. 어떻게 같은 커밋에서 전후를 측정했나요?

108. 측정 raw 데이터에서 Baseline T의 마지막 값이 21,193ms로 다른 값(17,000대)보다 큽니다. 이런 이상치를 median으로 처리한 건 적절한가요? 원인을 파악했나요?

109. 프로덕션 telemetry를 Amplitude로 보낸다고 했습니다. 실제 프로덕션 P50은 얼마였나요? Debug 측정치와 얼마나 달랐나요?

110. `init_summary`에서 음수/30초 초과 splash duration을 필터링하는 커밋이 있습니다. 왜 음수가 나오나요?

111. 필터링해서 버린 데이터가 전체의 몇 %였나요? 그 데이터가 실제 문제(예: 저사양 기기 극단 케이스)를 가리고 있진 않나요?

112. Firebase Performance(`@react-native-firebase/perf`)와 Shopify `react-native-performance`가 둘 다 설치돼 있습니다. 자체 마커 계측을 따로 만든 이유는?

113. 116개 dependency 중 앱 시작 시 초기화되는 SDK가 많습니다(Amplitude, Sentry, Airbridge, FlareLane, Adapty, Firebase 7종…). 서드파티 초기화가 콜드 스타트에서 차지하는 비중을 측정했나요?

114. 그중 지연 초기화로 옮긴 SDK가 있나요? 없다면 왜인가요?

115. CodePush를 자체 구축(S3 + CloudFront)했습니다. 번들을 원격에서 받으면 콜드 스타트에 어떤 영향이 있나요?

116. `releaseHistoryFetcher`가 앱 시작 시 네트워크를 칩니다. 네트워크가 느릴 때 시작이 블로킹되지 않나요?

117. 지연 로딩 전환 후 번들 크기 자체는 변했나요? 아니면 평가 시점만 미룬 건가요?

118. Hermes를 쓰고 있나요? 쓴다면 lazy require와 바이트코드 사전 컴파일이 이 최적화와 어떻게 상호작용하나요?

119. 이 최적화를 다시 한다면, Debug가 아니라 무엇을 기준으로 측정하겠습니까?

120. 콜드 스타트 개선 -21.8%를 사용자가 체감할 수 있다고 보나요? 근거는?
