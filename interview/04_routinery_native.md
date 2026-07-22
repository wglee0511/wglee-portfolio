# 면접 질문 — 네이티브: 위젯 · Wear OS · Geofence · CI/CD (루티너리)

> 근거: `android/app/src/main/java/com/alt/goodmorning/**`, `android/wear/**`, `ios/routinery-widget/**`,
> `ios/NativeModules/**`, `src/native/*.ts`, `src/utils/device/widget/**`, `AndroidManifest.xml`, `*/fastlane/Fastfile`
> 이력서 항목: "위젯 시스템 설계 및 현대화", "Android Geofence 기반 위치 알림 모듈", "CI/CD 자동화"

---

## A. TurboModule / New Architecture

236. `NativeGeofenceManager`의 `getRegisteredGeofenceIdentifiers()`가 **`void`를 반환**합니다. 이름은 getter인데 값을 안 돌려주는데, 결과는 어떻게 받나요?

237. `getMonitoringLocations()`는 `Promise<string>`으로 **JSON 문자열**을 반환합니다. 구조화된 배열이 아닌 이유는?

238. TurboModule 스펙에 `addListener`/`removeListeners`를 직접 선언했습니다(`GeofenceManager.kt:301-316`에 "RN 0.80 요구사항" 주석). 왜 필수인가요?

239. `setReady(ready: boolean)`는 **iOS 전용**이고 Android에서는 no-op입니다(`GeofenceManager.kt:313`). 왜 플랫폼마다 준비 신호 방식이 다른가요?

240. Android는 HeadlessJS, iOS는 `setReady` 핸드셰이크 + **3중 큐**(`GeofenceUtils.pendingEvents`, `GeofenceManager.pendingEvents`, `isReady`)를 씁니다. 이 비대칭의 근본 원인은?

241. iOS `startMonitoringLocation`은 `void`에 에러 전파가 없고, Android는 `Promise`를 반환합니다. `src/native/NativeGeofenceManager.ts`에서 이 차이를 어떻게 흡수하나요?

242. `WatchModule.kt:40`에 `Arguments.createMap().apply { merge(it) }`와 "방어적 복사: 동시 수정으로 인한 CME 방지" 주석이 있습니다. `WritableMap`을 재사용하면 왜 안 되나요?

243. `WatchModule`이 `override fun initialize()`에서 큐를 비웁니다("Catalyst/Bridgeless 모두"). 이 시점이 보장하는 것은 무엇인가요?

244. `NativeSharedStorage`의 대부분이 "Android only"입니다. iOS에서 호출하면 어떻게 되나요? 타입으로 막을 방법은?

---

## B. Android 위젯 — Glance 마이그레이션

245. 리시버 클래스명(`.Widget`, `.widget.CalendarWidget` …)을 **그대로 유지**한 채 부모 클래스만 교체했습니다. 이름을 바꿨다면 기존 사용자 위젯에 무슨 일이 벌어지나요?

246. `Widget.kt`만 루트 패키지에 있고 나머지는 `.widget` 패키지입니다. 이 불일치를 왜 정리하지 못했나요?

247. 매니페스트의 위젯 리시버마다 `android:priority`가 다릅니다(Grid 150, Streak 110, Weekly 105, Calendar 100, CheckList 95). `UpdateWidgets`는 **명시적 컴포넌트**로 브로드캐스트하는데, 이 우선순위가 실제로 하는 일이 있나요?

248. `DateAwareGlanceReceiver.onUpdate`에 "getGlanceIdBy는 null을 반환하지 않고 IllegalArgumentException을 throw한다"는 주석이 있습니다. 시그니처와 실제 동작이 다른 걸 어떻게 알아냈나요?

249. `DateAwareGlanceReceiver`가 `BroadcastReceiver`인데 필드로 `MainScope()`를 들고 코루틴을 띄웁니다. `onReceive`가 반환되면 프로세스가 죽을 수 있는데 `goAsync()`를 쓰지 않은 이유는?

250. 위 `scope`는 취소되지 않고, 리시버는 브로드캐스트마다 새로 생성됩니다. 스코프가 누적되지 않나요?

251. `onAppWidgetOptionsChanged`에서 `super`만으로 부족해 명시적 reload를 넣었습니다("super의 resize()는 LocalSize만 반영"). 어떤 증상을 보고 알았나요?

252. `WidgetGlanceStateDefinition`이 `ConcurrentHashMap`으로 DataStore를 캐싱합니다. 캐싱하지 않으면 어떤 예외가 나나요?

253. `remove()`가 맵 엔트리만 지우고 **디스크 파일은 남깁니다.** 위젯을 지웠다 다시 추가해 같은 `appWidgetId`가 재사용되면 옛 상태가 되살아나지 않나요?

254. 시리얼라이저가 `catch (e: Exception) → defaultValue`로 모든 읽기 실패를 삼킵니다. 스키마를 바꾸면 전 사용자 위젯이 조용히 초기화되는데 의도한 건가요?

255. **설정은 SharedPreferences, 렌더 상태는 DataStore**로 이원화돼 있고 DataStore는 파생 캐시입니다. Glance가 `GlanceStateDefinition`을 요구한다면 `PreferencesGlanceStateDefinition`으로 통일할 수 있지 않았나요?

256. `WidgetConfigViewModel.save()`에서 SharedPreferences 쓰기는 무조건, DataStore 갱신은 **catch 본문이 주석뿐인 try/catch**입니다. best-effort로 둔 근거는?

257. 최초 설정 시 `prefs.contains("widget_color_$id")`의 **키 부재**로 "한 번도 설정 안 함"과 "사용자가 흰색 선택"을 구분합니다. 센티널 값 대신 부재를 쓴 이유는?

258. Grid 위젯이 Android 셀 공식 `(dp + 30) / 70`을 직접 구현했습니다. `colCount`를 계산해놓고 **쓰지 않고** `chunked(2)`로 고정한 이유는?

259. Grid의 `LazyColumn itemId`에서 31진 해시를 손수 만들고 `and(Long.MAX_VALUE)`로 양수를 보장합니다("Glance LazyColumn 제약"). 왜 `String.hashCode()`로 부족한가요?

260. 위 해시가 **충돌**하면 어떻게 되나요?

261. Calendar 위젯의 `CALENDAR_HEADER_OVERHEAD_DP = 42`는 하드코딩된 추정치입니다. Glance가 텍스트를 측정할 수 없어서인데, 시스템 폰트 200%나 제목 줄바꿈에서는 어떻게 되나요?

262. Weekly의 `WEEKLY_EXTRA_SAFETY_PADDING_DP = 20`은 "Android 12+ 런처 패딩" 보정입니다. 이 값을 어떻게 구했고, 삼성 One UI처럼 패딩이 다른 런처에서도 맞나요?

263. **CheckList만 `SizeMode.Responsive`**, 나머지 넷은 `SizeMode.Exact`입니다. 왜 하나만 다른가요?

264. `SizeMode.Responsive`는 선언한 크기마다 RemoteViews를 미리 만들어 전부 전송합니다. **Binder 1MB 제한**과의 관계를 설명해 주세요.

265. Responsive 크기를 `NARROW(100×100)`, `WIDE(250×100)` 둘만 선언했습니다. 사용자가 그 사이나 더 큰 크기로 조절하면?

266. `GridGlanceWidget.kt:68`의 `(state.opacity - 255 / 10)`은 **정수 나눗셈**이라 항상 25입니다. 컨테이너가 셀보다 25 덜 불투명해지는데, 의도한 레이어링인가요 `255 / 10f` 오타인가요?

267. 투명도가 11단계 슬라이더 → 0~255 → 5개 드로어블로 양자화됩니다. Glance가 런타임 알파를 못 해서 드로어블 10개를 미리 만든 건데, 색을 추가하려면 몇 개를 더 만들어야 하나요?

268. `WidgetType` enum에 `TOTAL_DAY`가 있지만 **Android Glance 위젯이 없습니다.** iOS에는 있는데 왜 빠졌나요?

---

## C. 위젯 설정 화면 · SessionReplay 리플렉션

269. `onCreate` 첫 줄에서 `setResult(RESULT_CANCELED)`를 부릅니다. 이 계약을 지키지 않으면 무슨 일이 생기나요?

270. "P25 해결" 주석 — 최초 설정 시 `widget_type_$id`가 없어 async race가 났습니다. Activity 클래스별 `fixedWidgetType`을 **동기 주입**해 해결했는데, 원래 어떤 증상이었나요?

271. `WidgetBaseConfigActivity`가 `Application.mActivityLifecycleCallbacks` **private 필드에 리플렉션**해 Amplitude SessionReplay를 찾아 stop/start합니다. 왜 이렇게까지 했나요?

272. 위 코드는 클래스명에 "SessionReplay"가 포함된 객체를 찾습니다. Amplitude SDK를 업그레이드해 클래스명이 바뀌면?

273. 실패 시 `Log.w`만 남기고 **fail-open**입니다 — 즉 사용자 화면이 계속 녹화됩니다. 개인정보 관점에서 이 기본값이 맞나요?

274. Android 9+ hidden API 그레이리스트, R8 난독화(`enableProguardInReleaseBuilds = true`)에서 이 리플렉션이 살아남나요? keep 룰이 있나요?

275. `window.decorView.post { stopSessionReplay() }`로 한 프레임 미룹니다. Choreographer 타이밍에 의존하는 코드인데 더 확실한 방법은 없었나요?

---

## D. RN → 위젯 브리지

276. 모든 데이터가 `"DATA"` SharedPreferences 한 파일에 키 하나씩 들어갑니다. 5개 setter 중 **`setCheckListData`만 `apply()`**, 나머지는 `commit()`입니다. 왜 다른가요?

277. `commit()`은 블로킹입니다. 루틴이 많은 사용자의 `routineData` 저장이 JS 호출 스레드를 잡으면 ANR 위험이 없나요?

278. 위젯 데이터를 **`||` 구분자로 join한 병렬 배열**로 넘깁니다. JSON 배열 대신 이 포맷을 고른 이유는?

279. `src/utils/device/widget/index.ts:141`에 `if (routine.title.indexOf('||') < 0)` 가드가 있습니다. **제목에 `||`가 들어간 루틴은 위젯에서 통째로 사라지는데** 사용자에게 알리나요?

280. `Storage.kt`에서 `routineStartOptionList` 등 3개만 `.filter { it.isNotEmpty() }` 없이 파싱돼 인덱스가 어긋납니다. `WidgetStateRepository.safeMapRoutines`가 이를 **주석으로 문서화하고 방어**하는데, 왜 `Storage.kt`를 고치지 않았나요?

281. 빈 문자열을 필터링하면 "없음"과 "빈 값"을 구분할 수 없어서인가요? 그렇다면 포맷 자체의 한계 아닌가요?

282. `SharedStorage.set`이 삭제된 루틴을 가리키는 위젯을 기본값으로 되돌립니다(고아 GC). iOS에는 이 로직이 없고 `EntityQuery`가 지연 처리하는데, 비대칭을 어떻게 정당화하나요?

283. 모든 setter가 끝에 `UpdateWidgets().updateWidgets(context)`를 부릅니다. Zustand 변경 → 최대 5개 브로드캐스트 → 인스턴스마다 DataStore 재기록인데, **디바운스가 없는 이유는?**

284. `AppWidgetManager`에는 시간당 갱신 횟수 제한이 있습니다. 체크리스트를 빠르게 여러 개 토글하면 어떻게 되나요?

285. 프로바이더 XML의 `updatePeriodMillis="86400000"`(24시간)은 사실상 푸시 기반에 의존하겠다는 뜻입니다. 30분 미만은 무시된다는 걸 알고 정한 값인가요?

---

## E. iOS 위젯 · AppIntents

286. 위젯 번들에 8종이 있고 **설정 API 3세대가 공존**합니다 — 레거시 SiriKit `INIntent`, iOS 17 `WidgetConfigurationIntent`, 인터랙션용 `AppIntent`. 왜 전부 AppIntents로 통일하지 않았나요?

287. `INIntent` → `AppIntent` 마이그레이션을 잘못하면 **기존 사용자 위젯 설정이 전부 초기화**됩니다. Android 리시버 개명 문제와 같은 구조인데, 두 경우 모두 어떻게 회피했나요?

288. `ToggleCheckItemIntent.perform()`이 `CheckListStorage.lock`(NSLock)을 잡습니다. **위젯 익스텐션과 앱은 별도 프로세스**라 NSLock은 교차 프로세스 보호가 없는데, 동시 쓰기를 어떻게 막나요?

289. Android도 `Mutex`가 프로세스 내부 락입니다. JS가 `checkListData` 전체를 read-modify-write 하는 동안 위젯이 토글하면 **lost update**가 나는데, 이 레이스를 인지했나요?

290. `perform()` 끝에서 `WidgetCenter.shared.reloadAllTimelines()`로 **8종 전부** 리로드합니다. iOS 위젯 리로드 예산(일 40~70회)을 소모하는데 `reloadTimelines(ofKind:)`를 쓰지 않은 이유는?

291. `CheckListProvider`가 0.2초 간격 엔트리 2개로 **체크 애니메이션을 흉내**냅니다. WidgetKit이 0.2초 단위를 실제로 지켜주나요? 시스템이 병합하면 어떻게 되나요?

292. `isRecent`를 2초 이내로 제한한 이유는? 리로드가 3초 뒤에 오면 하이라이트가 아예 안 보이는데 괜찮나요?

293. `TimelineReloadPolicy`를 `autoResetCompleted` 여부에 따라 `.after(nextResetDate)` / `.atEnd`로 나눕니다. `.atEnd`는 언제 다시 불리나요?

294. 자동 초기화 멱등성을 `checkListLastResetAt_$id` 워터마크로 보장합니다. "오늘 초기화했나"가 아니라 **"마지막 예상 경계"**와 비교하는 이유는?

295. 이 로직이 **Swift·Kotlin·TypeScript 3개 언어에 중복** 구현돼 있습니다. 어떻게 동기화를 유지하나요? 테스트가 있나요?

296. 서머타임 전환일(03:00이 존재하지 않는 날)에 `dayEndingTime = 180`이면 `Calendar.date(from:)`가 무엇을 반환하고, 워터마크는 전진하나요?

297. App Group이 `group.com.alt.routinery`인데 앱 번들은 `com.alt.goodmorning`입니다. 이 접두사 불일치를 왜 정리하지 못했나요?

298. `RCTWidgetModule.updateWidget(_:_:)`이 인자 2개를 받아 **전부 무시**하고 로그만 찍습니다(RN 문서 템플릿 잔재). 정리하지 않은 이유는?

299. iOS `SharedStorage.m`이 `@"data"` 키에 쓰는데 어떤 위젯도 이 키를 읽지 않습니다. 죽은 코드인가요?

300. 위젯 익스텐션 메모리 상한(약 30MB)을 넘긴 적이 있나요? 어떻게 진단했나요?

---

## F. 앱 ↔ 위젯 동기화 — 병합 알고리즘

301. `useCheckListStoreReactions`가 `JSON.stringify(state.checkList)` 해시로 변경을 감지합니다. 체크리스트 항목을 타이핑할 때마다 전체 트리를 직렬화하는데 비용은 측정했나요?

302. `JSON.stringify`는 키 삽입 순서에 의존합니다. 내용이 같아도 순서가 바뀌면 불필요한 쓰기가 발생하지 않나요?

303. `useWidgetForegroundSync`가 **콜드 스타트와 포그라운드 복귀 때만** 동기화합니다. 앱을 열지 않고 위젯만 쓰는 사용자의 변경은 언제 Firestore로 가나요?

304. 위 상황에서 **다른 기기**가 Firestore를 먼저 갱신하면, 위젯의 변경은 어떻게 되나요?

305. Firestore 실시간 동기화(`checkList.service.ts`)와 `useWidgetForegroundSync`가 콜드 스타트에서 경쟁하지 않나요? 순서가 보장되나요?

306. `checkListService.update`가 체크리스트 id별 **프로미스 체인 큐**로 직렬화합니다. `.catch(() => undefined)`로 이전 실패를 흡수하는 이유는?

307. `finally`에서 `get(updateKey) === nextUpdate`일 때만 삭제합니다. 이 항등 검사가 없으면 어떤 레이스가 나나요?

308. `performUpdate`가 `safeGetDoc` 후 존재 여부로 `setDoc`/`updateDoc`을 고릅니다. **비원자적 check-then-act**인데 `set(..., {merge:true})` 한 번으로 안 되나요?

309. **핵심 시나리오**: 앱에서 항목 X를 삭제(그룹 `lastUpdatedAt`=T2) → 백그라운드 전에 위젯에서 **다른 항목 Y**를 토글(storage `lastUpdatedAt`=T3>T2) → 포그라운드 복귀. `mergeCheckListData:63-69`에 따라 **X가 부활하지 않나요?** 코드로 추적해 주세요.

310. 항목 단위 tombstone이 없어서 "storage에 있고 zustand에 없음"이 추가인지 삭제인지 모호합니다. **그룹 레벨 `lastUpdatedAt`을 대리 지표로** 쓴 근거는?

311. tombstone을 도입하지 않은 이유는? 도입하면 무엇이 해결되나요?

312. `toDate(undefined) → new Date(0)`이라 타임스탬프가 없으면 무조건 집니다. 네이티브가 `updatedAt` 스탬프를 빠뜨리면 조용히 데이터를 잃는데, 이 계약을 어떻게 강제하나요?

313. 병합이 **기기 시계**에 의존합니다. 위젯 프로세스와 JS가 쓴 타임스탬프, 혹은 두 기기의 시계가 어긋나면?

314. `createdAt`을 항상 Zustand 값으로 되돌립니다 — **Swift `CheckListModel`에 필드가 없어 위젯 저장 시 드롭되기 때문**입니다. `createdAt` 말고 또 어떤 필드가 유실되나요?

315. Kotlin은 `org.json`으로 원본 객체를 제자리 수정해 **모르는 필드를 보존**하고, Swift `Codable`은 **파괴**합니다. 이 플랫폼 비대칭을 알고 있었나요?

316. Swift 쪽을 어떻게 고치겠습니까? (`decodeIfPresent` + 원본 보존? `[String: Any]` 파싱?)

317. `order`는 양쪽에서 바뀔 수 있는데 병합 규칙이 없습니다. 동시에 재정렬 + 토글하면 `order`가 중복되지 않나요?

318. 같은 항목을 앱과 위젯에서 동시에 토글하면 LWW로 한쪽이 조용히 버려집니다. 사용자에게 알릴 방법은 고려했나요?

---

## G. Wear OS

319. wear 모듈이 `applicationId`를 폰과 **동일**하게 씁니다. 왜 같아야 하나요?

320. 디버그 키스토어를 `sharedDebugKeystorePath`로 공유합니다. 서명이 다르면 Data Layer 연결이 왜 실패하나요?

321. 폰은 versionCode를 git 커밋 수로, 워치는 `package.json`의 `watchVersionCode`로 계산합니다. **한 저장소에 두 체계**를 둔 이유는?

322. wear는 `isMinifyEnabled = false`, 폰은 ProGuard 활성입니다. 왜 다른가요?

323. Compose 마이그레이션이 **부분적**입니다 — `ComposeActivity`와 `TimerActivity`, XML 레이아웃이 공존합니다. 무엇이 남았고 왜 못 옮겼나요?

324. `AmbientModeSupport`가 `FragmentActivity`를 요구하는 것이 이유인가요? Compose에서 always-on을 어떻게 처리하나요?

325. `WearableDelegate`의 `putDataMapReq.dataMap.putInt(COUNT_KEY, ++count)` — 이 카운터를 빼면 무엇이 깨지나요?

326. `count`는 프로세스 재시작 시 0으로 돌아갑니다. 이전에 보낸 값과 충돌하면 동기화가 멈추지 않나요?

327. `setUrgent()`를 붙인 이유는? 없으면 얼마나 지연되나요?

328. 클라이언트 초기화 전 데이터를 **50개 상한 큐**에 넣고, 드레인 시 30초 넘은 항목을 버립니다. 두 숫자의 근거는?

329. `onPause`에서 리스너 제거를 `Dispatchers.IO` 코루틴으로 던집니다. Activity가 먼저 죽으면 완료가 보장되나요?

330. `capabilityClient.addListener(..., FILTER_REACHABLE)` — 페어링됐지만 블루투스가 꺼진 워치는 어떻게 분류되나요?

331. 워치의 `saveData`가 **`R.string.preference_*_key` 문자열 리소스를 SharedPreferences 키로** 씁니다. 번역가가 이 문자열을 번역하면 어떻게 되나요?

332. `DataLayerListenerService`의 `/timer` 경로가 **로그만 남기고 처리하지 않습니다.** 죽은 경로인가요?

333. `LocalBroadcastManager`는 deprecated입니다. 대체하지 않은 이유는?

334. `WearApiService`가 워치에서 **S3를 직접** 호출합니다. 폰을 경유하지 않으면 배터리·연결성 측면에서 불리하지 않나요?

335. `app/build.gradle`에서 `WearableBindListener` lint를 억제하며 "still required for Wear OS sync"라고 적었습니다. 매니페스트 `<data-item>` 필터로 대체할 수 없나요?

336. iOS 워치는 `ExtendedRuntimeSessionManager`로 타이머를 유지합니다. Android의 `TimerService`(포그라운드 서비스)와 제약이 어떻게 다른가요?

---

## H. Geofence

337. `GeofenceBroadcastReceiver`가 `exported="true"`에 커스텀 액션을 받습니다. **다른 앱이 위조 브로드캐스트**를 보내면 어떻게 되나요?

338. PendingIntent가 `FLAG_MUTABLE`입니다. Play Services가 extras를 주입해야 해서인데, 보안상 함의는?

339. `directBootAware="true"`입니다. 최초 잠금 해제 전에 트리거되면 credential-protected 저장소 접근이 실패하는데 의도한 건가요?

340. 포그라운드면 `sendEventToJS`, 아니면 `startService(headlessIntent)`로 분기합니다. **Android 8+에서 백그라운드 `startService`는 IllegalStateException**인데 왜 동작하나요?

341. Play Services 브로드캐스트가 임시 allowlist를 준다면, Android 12+에서 그 창이 좁아진 변화에 대응했나요?

342. `isAppInForeground`가 `IMPORTANCE_FOREGROUND`만 봅니다. 포그라운드 **서비스**만 떠 있는 상태는 어떻게 분류되나요?

343. `sendEventToJS`에서 `reactHost?.currentReactContext`가 null이면 **이벤트가 조용히 사라집니다.** headless 폴백이 없는데 의도한 건가요?

344. ENTER는 `_enter`, EXIT는 `_exit` 접미사인데 **DWELL만 접미사가 없습니다.** 왜 비대칭인가요?

345. `Geofence.Builder`에서 `isEntry`만 보고 `transitionType`을 정합니다. **`isEntry`와 `isExit`를 동시에 켤 수 없는데** 스펙에는 둘 다 받습니다. 버그인가요?

346. `setLoiteringDelay(5000)`을 설정했지만 `setTransitionTypes`에 **DWELL이 없습니다.** 리시버에는 DWELL 처리 분기가 있는데, 죽은 코드 아닌가요?

347. `setInitialTrigger(0)`에 "initialTriggerType 사용시 fake GPS 사용 가능"이라고 적었습니다. 안티치트를 위해 껐다면, **이미 그 안에 있는 정상 사용자**는 어떻게 되나요?

348. `radius`가 NaN이면 `0f`로 대체합니다. 0 반경은 트리거되지 않는데, 거부하지 않고 조용히 실패시키는 이유는?

349. 모든 지오펜스가 `requestCode = 0`인 **하나의 PendingIntent**를 공유합니다(`identifier.hashCode()`는 주석 처리). 권장 패턴이긴 한데 어떤 대가가 따르나요?

350. **`stopMonitoringLocation`이 id로 하나를 지운 뒤 `removeGeofences(pendingIntent)`로 전부 지웁니다.** SharedPreferences는 그 하나만 지우고요. 위치 하나를 해제하면 **나머지 전부가 죽는 것 아닌가요?**

351. 위 코드의 주석은 "중복 방지"입니다. 어떤 중복 트리거 버그를 잡으려다 이렇게 됐나요?

352. `startMonitoringLocation`이 권한 검사와 등록 **이전에** SharedPreferences에 먼저 씁니다. 등록에 실패한 지오펜스도 저장되어 부팅 시 재시도되는데 의도한 재시도 의미인가요?

353. `GeofenceBootCompletedReceiver`가 `reactHost?.currentReactContext`를 가져옵니다. **BOOT_COMPLETED 시점에 RN 컨텍스트는 사실상 항상 null**인데, 그러면 재부팅 후 지오펜스가 하나도 복구되지 않는 것 아닌가요?

354. 이 경우 `Log.e("BootReceiver", "❗️ ReactContext가 아직 초기화되지 않음")`만 남습니다. 실제로 재부팅 후 위치 알림이 동작하는지 확인해 봤나요?

355. 부팅 재등록에 `Promise` 인터페이스 **11개 오버라이드**를 손으로 구현했습니다. 등록 로직을 RN 모듈 밖 헬퍼로 빼면 이 문제와 위 버그가 함께 해결되지 않나요?

356. `ACCESS_BACKGROUND_LOCATION` 결과를 **로그만 남기고 게이트하지 않습니다.** "앱 사용 중에만" 권한이면 등록은 성공하되 백그라운드 트리거는 안 오는데, 사용자에게 어떻게 알리나요?

357. iOS는 `.authorizedAlways`가 아니면 **등록을 거부**합니다. 두 플랫폼 중 어느 쪽이 맞다고 보나요?

358. iOS는 `monitoredRegions`를 OS가 소유해 부팅 복구가 불필요하고, Android는 SharedPreferences로 직접 관리합니다. 이 차이가 코드에 어떻게 드러나나요?

359. iOS는 앱당 **20개**, Android는 100개 제한입니다. 위치 루틴이 30개인 사용자는 어떻게 되나요?

360. HeadlessJS 타임아웃이 **5초**입니다. 콜드 번들 로드 + `initFirebaseMessaging` + 알림 예약이 저사양 기기에서 5초 안에 끝나나요? 넘으면?

361. `geofenceHeadlessCheck`가 `routineList.length === 0`으로 **프로세스 사망을 감지**해 수동 초기화합니다. 이 휴리스틱이 틀리는 경우는?

362. 지오펜스 2개가 동시에 트리거되면 같은 런타임에서 태스크가 병렬 실행되고 둘 다 `setState`를 부릅니다. 경쟁 상태가 없나요?

363. `Promise.resolve().then(() => {})`를 반환하는 이유는?

364. `MainActivity`에 alias 10개(다크·글로우·챌린지 등)로 동적 아이콘을 구현했습니다. alias 토글이 **프로세스를 죽이고** 런처 아이콘이 잠시 사라지는 부작용은 어떻게 다뤘나요?

---

## I. CI/CD

365. iOS `sync_version`이 `.xcconfig`를 생성해 5개 타깃에 버전을 전파합니다. `agvtool`/`increment_build_number` 대신 이 방식을 고른 이유는?

366. 빌드 번호가 `git rev-list --count HEAD` **+1**입니다. 커밋 없이 두 번 빌드하면 같은 번호가 나오고 App Store Connect가 거부하는데, 어떻게 운용했나요?

367. `#include? "tmp.xcconfig"`(옵셔널 include)를 둔 이유는?

368. `archive_prd`가 프로비저닝 프로파일 5개를 수동 매핑합니다. `SelectRoutineIntent` → `...SelectRoutineIntentUI`로 **다른 이름**에 매핑되는데 의도한 건가요?

369. FlareLane 항목만 `appstore ` 접두사가 없고 이름이 잘려 있습니다. 프로파일 이름 길이 제한 때문인가요?

370. `firebase_*`는 automatic signing, `archive_prd`는 manual입니다. 왜 나눴나요?

371. `upload_to_testflight`에 `skip_waiting_for_build_processing: true`, `skip_submission: true`입니다. 처리 완료를 기다리지 않으면 dSYM 업로드와 "테스트 준비됨"을 검증하지 못하는데 괜찮나요?

372. Android versionCode 공식이 **Ruby(Fastfile)와 Groovy(build.gradle) 두 곳에 중복**돼 있습니다. 드리프트를 어떻게 막나요?

373. `+ 1062000` 오프셋의 유래는? 왜 필요했나요?

374. rebase/squash로 커밋 수가 줄면 versionCode가 **역행**합니다. Play Store는 이미 게시된 코드보다 낮은 값을 영구히 거부하는데, 이 위험을 어떻게 관리하나요?

375. CI에서 `--depth=1` 얕은 클론을 쓰면 커밋 수가 1이 됩니다. 방어책이 있나요?

376. ABI split에서 `versionCodes.get(abi) * 1048576 + variant.versionCode`인데 base가 이미 1,062,000으로 **2^20을 넘습니다.** 밴드가 겹치지 않나요? AAB 배포라 죽은 코드인가요?

377. `upload_to_play_store`에 `skip_upload_metadata/images/screenshots: true`가 모두 켜져 있습니다. 무엇을 방지하려는 설정인가요?

378. `release_status: "draft"` + `track: "internal"`, iOS는 `skip_submission`. 두 플랫폼 모두 **사람이 최종 배포**하도록 만든 이유는?

379. dev와 prod가 **같은 Firebase App Distribution 앱 id와 같은 `testers` 그룹**을 씁니다. QA가 두 빌드를 어떻게 구분하나요?

380. Android는 `ENVFILE` 환경변수와 Gradle `flavor`를 **따로** 지정합니다. 둘이 어긋나면(예: `ENVFILE=dev` + `flavor: prod`) 어떻게 되나요? 가드가 있나요?

381. iOS는 `notify_slack`을 private lane으로 뺐는데 Android는 `slack(...)`을 **세 번 복붙**했습니다. 왜 정리하지 않았나요?

382. 빌드 실패 시에도 Slack 알림이 가나요? 실패 원인을 얼마나 포함하나요?

383. `hermesFlags = ["-O", "-output-source-map"]`에 "faster cold start" 주석이 있습니다. `-O`가 실제로 무엇을 하고 콜드 스타트에 얼마나 기여하나요?

384. `noCompress += ["ttf", "otf"]`를 설정한 이유는?

385. 자체 CodePush(S3 + CloudFront)에서 릴리스 이력을 S3 JSON으로 관리합니다. 두 명이 동시에 배포하면 경쟁 상태가 없나요?

386. **CodePush로 JS만 갱신하면 네이티브 위젯 코드는 그대로입니다.** `checkListData` 스키마를 JS에서 바꾸고 구 네이티브 바이너리와 만나면 병합이 깨지는데, 호환성을 어떻게 관리하나요?

387. 네이티브 변경이 포함된 릴리스를 실수로 CodePush로 내보내는 것을 막는 검증이 있나요?

388. `codepush:rollback`이 실제로 하는 일은? 이미 받아간 사용자는 어떻게 되나요?

---

## J. 종합 · 회고

389. 위젯·Wear OS·Geofence 모두 **경험 없던 네이티브 영역**을 AI를 파트너 삼아 단독 구현했다고 했습니다. AI가 틀린 답을 줬을 때 어떻게 알아챘나요? 구체적 사례는?

390. Kotlin/Swift 코드를 리뷰해줄 사람이 팀에 있었나요? 없었다면 품질을 어떻게 담보했나요?

391. 네이티브 224개 파일 중 본인이 작성한 비중은?

392. `patch-package` 27개 중 RN 코어·Reanimated는 C++/Objective-C++ 패치입니다. 이 정도까지 내려간 판단 기준은?

393. 위젯·Wear OS·Geofence 중 프로덕션 이슈가 가장 많았던 것과 그 이유는?

394. 이 세 가지를 다시 만든다면 무엇을 가장 크게 바꾸겠습니까?

395. 오늘 이 코드베이스를 다시 보면서 스스로 발견한 버그가 있다면 무엇인가요?
