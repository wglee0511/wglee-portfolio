# 면접 질문 — 상태 관리 · 아키텍처 (루티너리)

> 근거: `src/stores/**`, `src/configs/reactQueryConfig.ts`, `src/hooks/queries/common/queryKeys.ts`,
> `src/components/Container/ScreenFreeze.tsx`, `final-refactor-guide.md`, `patches/**`
> 이력서 항목: "상태 관리 구조 개선"

---

## A. 미들웨어 구성 — 실제 코드의 모순

121. `useRoutineStore`는 `subscribeWithSelector(computed(persist(...)))` 순서인데, `useSettingsStore`는 `subscribeWithSelector(persist(computed(...)))`입니다. **두 스토어의 `computed`와 `persist` 순서가 반대**인데 의도한 건가요?

122. `final-refactor-guide.md:34`에는 순서가 `subscribeWithSelector → persist → computed`라고 적혀 있습니다. 루티너리 스토어 실제 코드와 문서가 다른데, 어느 쪽이 맞나요?

123. `computed`가 `persist` **바깥**이면 persist는 base state만 봅니다. 그런데 `routines/index.ts`의 `partialize`는 여전히 `sortedRoutineList`를 명시적으로 제외합니다. 불필요한 코드 아닌가요?

124. 반대로 settings는 `computed`가 `persist` **안**이라 `partialize`가 `isTimelineMode`를 반드시 걷어내야 합니다. 안 걷어내면 무슨 일이 벌어지나요?

125. `settings/index.ts`에 `isTimelineMode: false, // computed middleware에 의해 override됨`이라는 플레이스홀더가 있습니다. 타입을 `SettingsState`와 `SettingsComputed`로 분리하지 않은 이유는?

126. `routines/index.ts`에 `@ts-ignore`가 두 개 붙어 있습니다. 세 미들웨어 합성이 타입 레벨에서 왜 깨지나요? 이 무시가 가리고 있는 실제 위험은?

127. `zustand-computed`는 상태 **아무 필드나** 바뀌면 computed 전체를 다시 계산합니다. 그럼 `setAlarmSound` 하나에도 `computeRoutineActiveList`가 통째로 도는 것 아닌가요?

128. 가이드 문서(`:962-978`)는 "alarmSound 변경 시 sortedRoutineList 재계산 안 함"이라고 주장합니다. 이걸 어떻게 검증했나요? 실제로 측정해 봤나요?

129. computed가 매번 **새 객체**를 만들면, 그 아래에서 `useShallow`를 써도 항상 "달라짐"으로 판정됩니다. 이 조합이 실제로 리렌더링을 줄이나요?

---

## B. useShallow 100곳 — 정확히 이해하고 썼나

130. `selectors.ts:110`의 `useShallow(state => getSubscriptionAvailable(state))`는 **boolean**을 반환합니다. 원시값에 `useShallow`를 쓰면 무슨 일이 일어나나요?

131. 같은 패턴이 `:148`, `:182`에도 있습니다(문자열 반환). 이 세 곳의 `useShallow`가 하는 일을 설명해 주세요.

132. `TimerFooter.tsx:52`의 `useShallow(state => state.timerState)`는 **단일 객체 참조**를 고릅니다. 일반 셀렉터와 무엇이 다른가요?

133. 위 경우 `timerState.routine`은 배열입니다. shallow 비교가 배열에 대해 어떻게 동작하고, 어떤 변경을 놓치나요?

134. `routineActiveList`는 `Record<string, Record<string, ...>>` **중첩 구조**입니다. 여기에 `useShallow`를 쓰면 안쪽 변경을 감지할 수 있나요?

135. `sortedRoutineList`에 `useShallow`를 쓰면 루틴 N개를 매 상태 변경마다 원소별로 비교합니다. 구독 컴포넌트가 많을 때 이 비용이 리렌더링 비용보다 싼가요?

136. `useShallow`를 **쓰면 안 되는** 경우의 판단 기준을 팀에 어떻게 공유했나요?

---

## C. 무한 증가 — 실제로 고쳤나

137. `src/stores/timer/actions.ts:50`의 `recordActivityLog`는 지금도 무제한 append입니다. 설계 문서(`2026-06-11`)에 있는 200개 링 버퍼는 **어느 브랜치에 있나요?**

138. `dev`, `main`, 현재 브랜치 모두에서 `slice(-200)`이나 `MAX_RECORD` 상수를 찾을 수 없었습니다. 이 항목을 이력서에 완료된 성과로 적은 근거는?

139. 마찬가지로 `initRoutineActiveListUtil`에 18개월 윈도우 캡이 없습니다. 설계와 구현 사이 어디서 멈췄나요?

140. `timer` 스토어에는 `partialize`가 없어서 `records`가 **전부 MMKV에 저장**됩니다. 6개월 쓴 사용자의 저장소에 무슨 일이 벌어지나요?

141. `mmkvStorage.ts`는 값이 10MB를 넘으면 **조용히 저장을 건너뜁니다**(`에러를 throw하지 않고 로그만`). `records`가 커지면 타이머 스토어 전체의 persist가 죽는데, 이 연쇄를 알고 있었나요?

142. Sentry 리포트에 `dedupeKey`가 걸려 있어 이 실패가 한 건으로만 보입니다. 실제로 몇 명에게 발생 중인지 어떻게 파악하나요?

143. `records` 항목마다 `new Date().toTimeString()`을 씁니다. 날짜가 없어서 다른 날 기록을 구분할 수 없는데 디버그 용도로 충분한가요?

144. append마다 `[...state.records, x]`로 전체 배열을 복사합니다. n번 호출하면 O(n²)인데, FCM 백그라운드 핸들러에서 푸시마다 호출된다는 점과 합치면?

145. `initRoutineActiveListUtil`의 `while` 루프 조건에 `dayjs(history.endDate)`가 있습니다. **매 반복마다 dayjs 객체를 새로 만드는데** 왜 밖으로 빼지 않았나요?

146. 이 루프는 상한이 없습니다. 데이터 손상이나 시계 오차로 `endDate`가 미래로 튀면, Zustand 미들웨어 안에서 동기적으로 수년치를 도는데 ANR을 어떻게 막나요?

147. `key.indexOf(routine.id) !== -1`은 **부분 문자열 매칭**입니다. ID가 `abc`와 `abc1`처럼 접두사 관계면 어떻게 되나요? ID 포맷이 이를 보장하나요?

---

## D. React Query 설정 — 주석과 코드의 불일치

148. `// === 성능 최적화 ===` 섹션 안에 `notifyOnChangeProps: 'all'`이 있습니다. 기본값(tracked)이 더 최적화된 설정인데 왜 `'all'`인가요?

149. `mutations`에 `networkMode: 'always'`인데 주석은 `// 온라인일 때만 실행`입니다. **주석과 코드가 정반대**인데 어느 쪽이 의도인가요?

150. `placeholderData: keepPreviousData`를 **전역**으로 걸었습니다. `fortuneKeys.today(uid, ...)`에서 사용자가 바뀌면 잠깐 **다른 사용자의 데이터**가 보이지 않나요?

151. `refetchOnMount: false` + `refetchOnWindowFocus: false`면 갱신 트리거가 reconnect와 수동 invalidate뿐입니다. 앱을 한 시간 백그라운드 두고 돌아온 사용자는 언제 새 데이터를 보나요?

152. RN에는 window focus 개념이 없습니다. `AppState` 기반 갱신은 어디서 처리하나요?

153. `retry`에서 `error?.status`로 4xx를 판별합니다. axios 에러는 `error.response.status`인데, 실제 API 레이어가 만드는 에러 모양은 무엇인가요?

154. 위 판별이 틀리면 4xx도 재시도됩니다. 확인해 봤나요?

155. `throwOnError: false`가 전역이라 에러 바운더리가 쿼리 에러를 못 봅니다. `keepPreviousData`와 합치면 실패해도 옛 데이터가 그대로 보이는데, 사용자는 실패를 어떻게 아나요?

156. `mutations.retry: 1`입니다. 구매·선물 등록 같은 **비멱등** 뮤테이션이 재시도되면 중복 처리 위험이 있는데 멱등키가 있나요?

157. `SERVER_TIMEOUT`을 에러 **메시지 문자열**로 비교합니다. 타입이나 코드가 아닌 이유는?

---

## E. 쿼리 키 설계

158. 키 팩토리가 두 가지 스타일로 공존합니다 — `routineKeys`는 spread 합성, `subscriptionKeys`는 리터럴 재작성. 왜 통일하지 않았나요?

159. `subscriptionKeys.validation.android(productId, token)`은 **구매 토큰을 캐시 키에 넣습니다.** 토큰이 `gcTime` 동안 메모리에 남는데 보안상 괜찮나요?

160. 토큰은 구매마다 유일해서 캐시가 재사용되지 않습니다. 이 키를 캐싱하는 의미가 있나요?

161. `subscriptionKeys.iosPromotionSignature(...)`는 **암호학적 서명**을 `staleTime: 60초`로 캐싱합니다. Apple 프로모션 서명은 nonce 기반 일회용인데, 캐시된 서명을 재사용하면 검증에 실패하지 않나요?

162. `giftKeys.products.list(productIds: string[])`는 배열을 키에 넣습니다. `['a','b']`와 `['b','a']`가 다른 캐시 항목이 되는데, 호출 전에 정렬하나요?

163. `fortuneKeys.today`는 주석으로 "lang은 queryKey에 포함하지 않음"을 **의도적으로** 명시했습니다. 사용자가 언어를 바꾸면 날짜가 바뀔 때까지 이전 언어 운세를 보게 되는데, 이 트레이드오프를 어떻게 정당화하나요?

164. `useRegisterGift.ts:55-56`은 `giftKeys.codes.byUser(uid)`와 `giftKeys.all`을 연달아 무효화합니다. 후자가 전자를 포함하는데 첫 줄이 필요한가요?

165. `useInvalidateGiftQueries.ts`라는 전용 훅이 있는데 `useRegisterGift`는 인라인으로 중복 구현합니다. 왜인가요?

166. `useIncrementSubscriptionDetailViewedCount`는 `setQueryData`로 낙관적 갱신 후 **즉시** `invalidateQueries`를 부릅니다. 낙관적 업데이트의 의미가 있나요?

---

## F. ScreenFreeze — 되돌아온 회귀

167. 커밋 `09ee1c95d`에서 `RoutineListScreenV2`에 `<ScreenFreeze>`를 복원해 300MB→600MB 회귀를 잡았습니다. **그런데 현재 HEAD에는 그 래퍼가 없고, 변수도 `_isTodoListScreenActive`로 되돌아가 있습니다.** 무슨 일이 있었나요?

168. 이 클래스의 회귀(고쳤다가 리팩터링 중 다시 사라짐)를 막으려면 무엇이 필요할까요? 메모리 회귀를 CI에서 잡을 방법이 있나요?

169. 그 커밋 메시지에 "137개 Reanimated 훅"이라고 적혀 있습니다. 이 숫자는 어떻게 셌나요?

170. `<Freeze>`는 내부적으로 Suspense를 씁니다. **freeze는 unmount가 아니라서** SharedValue·`useFrameCallback` 등록·네이티브 Skia 서피스는 그대로 살아 있는데, 그럼 정말 메모리가 줄어드나요?

171. 위와 연결해서 — freeze된 트리에서는 `useAnimationCleanup`의 언마운트 정리가 **절대 실행되지 않습니다.** 이게 §메모리 항목과 충돌하지 않나요?

172. `AnalysisScreen`은 `delay={600}`, `FriendsScreen`은 `SCREEN_FREEZE_DELAY(1000)`입니다. 왜 다른가요? 600의 근거는?

173. freeze는 지연시키고 unfreeze는 즉시입니다. 이 비대칭이 필요한 이유는?

174. 탭 전환을 빠르게 반복하면 `clearTimeout`으로 pending freeze가 취소됩니다. 이게 없으면 무슨 버그가 생기나요?

175. `useState(!isFocused)`가 초기값입니다. 첫 탭이 아닌 탭은 마운트 시 `shouldFreeze=true`로 시작해 **한 번도 렌더되기 전에** 정지됩니다. 첫 진입 시 jank는 어떻게 되나요?

176. `navigationGroup.ts:286`에서 `TodoListScreen`만 `freezeOnBlur: true`를 씁니다. 커스텀 `ScreenFreeze`와 두 메커니즘이 공존하는 이유는?

177. `disabled={isTodoListScreenActive}`가 있었던 이유를 설명해 주세요. 없으면 무슨 문제가 생기나요?

178. `FriendsScreen`은 `ScreenFreeze` 옆에서 `cancelAnimation(offsetValue)`를 **수동으로** 부릅니다. 왜 `useAnimationCleanup`을 안 썼나요?

---

## G. 마이그레이션 · 패치

179. persist의 `migrate`와 `migrateStateManagement` — **두 개의 독립적인 마이그레이션 시스템**이 서로 다른 시점에 돕니다. 왜 하나로 합치지 않았나요?

180. `routines`의 `migrate`가 레거시 키를 병합한 뒤 **즉시** `removeItem`합니다. 새 상태가 디스크에 쓰이기 전에 앱이 죽으면 레거시 데이터가 사라지는데, 원자성은 어떻게 보장하나요?

181. `migrate` 안의 `console.log('[migrate] ...')`가 persist 상태 **전체**를 로그로 찍습니다. logcat에 PII가 남지 않나요?

182. `migration.ts`의 `performSafeMigration`은 실패 시 catch로 삼키고 완료 플래그를 **설정하지 않습니다.** 계속 실패하는 사용자는 매 콜드 스타트마다 Firestore 캐시 클리어를 반복하는데, 이 시작 성능 문제를 인지했나요?

183. `removeItemFromStorage` 함수 안의 `storage.delete(key)`가 **주석 처리**되어 있습니다. 이름과 동작이 다른데 의도한 건가요?

184. `zustand-computed` 패치에서 `Object.assign(state, computedState)`를 스프레드로 바꿨습니다. 원본이 왜 버그인가요? 어떤 증상을 겪었나요?

185. 이 패치를 upstream에 올렸나요? 안 올렸다면 다음 버전에서 어떻게 되나요?

186. `createZustandStore`의 `storeResetFns` Set은 **어디서도 읽히지 않습니다.** 죽은 코드인가요?

187. `createPersistentStore`도 export만 되고 사용처가 없습니다. 이런 미사용 코드를 리뷰에서 어떻게 걸러내나요?

---

## H. 아키텍처 전반

188. RN 0.84 + New Architecture(Fabric/TurboModule) + React 19 + Reanimated 4 조합입니다. 이 업그레이드를 주도했나요? 가장 크게 깨진 건 무엇이었나요?

189. `patches/` 27개 중 RN 코어와 Reanimated는 **C++/Objective-C++ 레벨** 패치입니다. 이 정도로 내려가야 했던 이유와, 유지보수 부담을 어떻게 관리하나요?

190. `newArchEnabled=true`인데 `react-native-*` 라이브러리 중 New Arch 미지원이 있었을 텐데 어떻게 대응했나요?

191. TurboModule 9종(`NativeGeofenceManager`, `NativeSharedStorage`, `NativeWatchModule` 등)을 직접 만들었습니다. Codegen 스펙을 작성할 때 가장 까다로웠던 타입은?

192. `NativeSharedStorage`의 메서드 다수가 "Android only"로 주석돼 있습니다. iOS에서 호출하면 어떻게 되나요? 타입 레벨로 막을 방법은 없었나요?

193. `dependencies` 116개입니다. 번들 크기와 시작 시간에 미치는 영향을 관리하는 기준이 있나요?

194. 소스 1,746개 파일 / 223K 라인인데 테스트는 12개뿐입니다. 이 비율을 어떻게 정당화하나요?

195. `CLAUDE.md`에 "검증 방법: 수동 검증"이 명시된 설계 문서가 있습니다. 자동 테스트를 안 쓰기로 한 팀 정책이 있었나요?

196. 12개 언어를 지원하는데 i18n 키 누락은 어떻게 검출하나요?

197. 자체 CodePush를 S3 + CloudFront로 구축했습니다. Microsoft CodePush 종료 대응이었나요? 롤백 전략은?

198. CodePush로 JS를 교체할 때 네이티브 모듈 시그니처가 바뀌면 크래시합니다. 이 불일치를 어떻게 막나요?

199. `DeveloperScreen.tsx`가 1,515줄입니다. `rn-reviewer`는 300줄 초과를 지적하는데, 이 파일은 어떻게 다뤘나요?

200. 1년 9개월 동안 이 코드베이스에서 가장 잘한 결정과 가장 후회하는 결정을 하나씩 꼽는다면?

---

## I. 심화 — 직접 작성자만 답할 수 있는 질문

201. `computeSortedRoutineList`에서 `aMinutes <= dayEndingTime`이면 +1440분을 더합니다. **정확히 `dayEndingTime`(03:00)인 루틴**은 다음 날로 밀리는데, `<`가 아니라 `<=`인 이유는?

202. `syncStores.ts`의 `fireImmediately: true`는 **모듈 평가 시점**에 발화합니다. 이때는 user 스토어 hydration 전이라 기본값(180)이 routine 스토어로 들어가는데, 그 사이 `sortedRoutineList`는 어떤 기준으로 정렬되나요?

203. `dayEndingTime`을 두 스토어에 중복 보관합니다. routine의 computed가 `useUserStore.getState()`를 직접 읽으면 안 되는 이유는?

204. `App.tsx:11`의 `import '~/stores/syncStores'`는 부수효과 임포트입니다. 번들러가 트리셰이킹으로 날려버릴 위험은 없나요?

205. `RNBootSplash.hide()`가 hydration 완료 **전에** 호출되는데, 그 시점의 JS 트리는 `null`입니다. 네이티브 스플래시도 없고 JS 화면도 없는 구간이 생기지 않나요?

206. 위 구간이 실제로 존재한다면 사용자에게 어떻게 보이나요? 측정해 봤나요?

207. `setI18nConfig()`가 `try/finally`로 감싸여 실패해도 `isI18nConfig(true)`가 됩니다. 의도적인 fail-open인가요?

208. `App.tsx`의 default export가 debug일 때 `App`, release일 때 `Sentry.wrap(CodePush(...)(App))`입니다. **debug와 release의 컴포넌트 트리 모양이 다른데**, debug 빌드로 측정한 콜드 스타트 수치를 신뢰할 수 있나요?

209. `useAppInitializer`는 불리언 플래그를 훅 인자로 넘겨 순차 실행을 만듭니다. 게이트마다 `SplashScreen`이 리렌더되는데 최소 8회입니다. async 오케스트레이터로 안 간 이유는?

210. `initLogger`의 `MAX_VALID_DURATION_MS = 30000` 필터는 **가장 느린 케이스를 통계에서 제거합니다.** 저사양 기기의 진짜 p99를 못 보게 되는 문제를 어떻게 보완하나요?

211. 올바른 해법은 monotonic clock(`elapsedRealtime`)인데 왜 30초 휴리스틱을 골랐나요?

212. `initLogger`의 요약 키가 `phase.includes(':')` 여부로 필터링됩니다. 네이밍 규칙이 필터 역할을 겸하는데, 이름을 바꾸면 조용히 리포트가 달라지지 않나요?

213. `dev_init_summary`의 프로퍼티 이름이 런타임에 동적 생성됩니다. Amplitude 스키마가 불안정해지는데 대시보드는 어떻게 유지했나요?

214. `startupProfiler`는 `isDebug()`일 때만 켜지고, `perf.ts`는 `logREvent`가 전부 주석 처리돼 사실상 죽은 코드입니다. 계측 유틸이 셋인데 정리 계획이 있었나요?

215. `endMeasure`가 `marks.find(m => m.name === name+'_START')`로 **첫 번째** 매치를 찾습니다. 같은 이름을 중첩·반복 측정하면 잘못된 기준점을 쓰게 되는데 알고 있었나요?

216. `TimerCircle/index.tsx`의 `useFrameCallback`에는 `isMounted` 가드가 **없습니다.** 형제 컴포넌트 둘(`TimerCircleReanimated`, `TimerCircleSlicer`)에는 있는데, 12월 수정이 이 파일에 반영되지 않은 이유는?

217. `TimerCircleReanimated.tsx:81`에서 `useAnimationCleanup([...]) as unknown as SharedValue<boolean>`로 이중 캐스팅합니다. 훅이 이미 그 타입을 반환하는데 왜 캐스팅이 필요했나요?

218. `useSlideAnimation`의 `titleOpacity`가 0,1,3,4로 **인덱스 2가 빠져** 있습니다. `titleOpacities[currentIndex]`로 접근하는데 `currentIndex === 4`면 어떻게 되나요?

219. `timeoutIds.current` 배열은 발화한 타이머 id를 지우지 않고 계속 쌓습니다. `clearTimeout(죽은 id)`는 무해하지만 배열은 자랍니다. `Map` + 삭제로 안 간 이유는?

220. `useAnimationCleanup`의 catch가 `console.debug`로 끝납니다. 이 코드베이스는 거의 모든 곳에서 `captureException`을 쓰는데 여기만 Sentry로 안 보내는 이유는?

221. 12월 커밋에서 `value.value = value.value` 자기 대입을 제거했습니다. 이 한 줄이 왜 문제였나요?

222. 같은 커밋에서 **빈 `setTimeout(..., 16)`**도 지웠습니다. 주석만 있고 본문이 없는 타이머가 왜 메모리를 잡고 있었나요?

223. `useBeforeAfterAnimation`의 deps가 `[isFocused]` 하나뿐이라 `duration` 변경이 무시됩니다. eslint-disable로 덮은 이유는?

224. 같은 훅에서 포커스를 잃으면 애니메이션을 리셋합니다. 탭을 빠르게 오가면 매번 재생되는데 의도한 UX인가요?

225. `measure-first-screen.sh`가 `FIRST_SCREEN_READY` 마커를 기다리는데, **소스 어디에도 그 마커가 없습니다.** 이 스크립트를 마지막으로 성공시킨 게 언제인가요?

226. 위 스크립트는 마커를 못 찾으면 "앱이 새 코드로 빌드되지 않았습니다"라고 **오진**합니다. 이 진단 메시지가 사람을 잘못 이끌지 않나요?

227. `measure-cold-start.sh`는 설치된 빌드(release 가능)를, `measure-first-screen.sh`는 `__DEV__` 필요(debug)를 측정합니다. **두 스크립트의 결과를 합칠 수 없는데** 인지했나요?

228. `p95`가 `round(0.95 * (n-1))`로 계산됩니다. n=10이면 인덱스 9 → **최댓값과 동일**합니다. p95라는 이름이 오해를 부르지 않나요?

229. median은 보간(`statistics.median`)하는데 p95는 nearest-rank라 방식이 불일치합니다. 의도한 건가요?

230. 표준편차가 `pstdev`(모집단)입니다. 표본인데 `stdev`가 아닌 이유는?

231. 등급 판정을 median 기준으로 합니다. 사용자 체감 고통은 tail에 있는데 왜 median인가요?

232. `DISABLE_ANIM=1`이 애니메이션 스케일을 0으로 만들고 `trap`으로 복구합니다. 애니메이션을 끈 상태의 측정치가 실사용을 대표하나요?

233. `navigationGroup.ts`에 66개 화면이 **전부 정적 import**입니다. 이력서의 "약 50개 화면을 콜드 스타트 JS 평가 대상에서 제외"와 어떻게 양립하나요?

234. `React.lazy`/`Suspense`/동적 `import()`가 이 파일에 없습니다. 지연 로딩을 어떤 방식으로 구현했는지 정확히 설명해 주세요.

235. Metro는 기본적으로 코드 스플리팅을 지원하지 않습니다. RN에서 "지연 로딩"이 실제로 무엇을 미루는지(파싱? 평가? 다운로드?) 설명해 주세요.
