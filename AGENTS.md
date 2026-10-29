<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## 커밋 & 푸시 규칙

커밋 또는 푸시 요청이 들어오면 **모든 변경사항**(staged + unstaged + untracked 파일 전체)을 대상으로 커밋하고 푸시한다.

## 이력서 컨텍스트

개발자 정보·경력·프로젝트 관련 작업 시 `resume/` 디렉토리를 참조한다.
`resume-reviewed.md`는 원본 소스이며, `resume/` 하위 파일이 AI 작업용 분리본이다.

| 파일 | 용도 |
|------|------|
| `resume/01_identity.md` | 이름·포지션·핵심 성과 수치·강점 요약 |
| `resume/02_stack.md` | 기술 스택 전체 목록 및 섹터별 분류 |
| `resume/03_experience.md` | 경력 3개사 상세 (루티너리·메이크델타·페이히어) |
| `resume/04_projects.md` | 사이드 프로젝트 상세 (Code Slugger·자동매매) |
| `resume/05_education.md` | 학력 및 교육 과정 |

## 면접 답변 작성 규칙

`interview/` 문서의 답변(다시 쓴 답변 · 개념 설명)은 **쉽고 짧게** 쓴다. "쉽게 설명해 달라"는 요청은 **양을 늘리라는 뜻이 아니다.**

- **첫 줄은 결론 한 문장.** `**→ 결론.**` 형태로 시작한다.
- **흐름은 그림 하나로.** 필요할 때만 코드 블록 1개, **5줄 안팎**.
- **나머지는 `→` 포인트 2~3개.** 각 포인트는 1~2문장.
- **한계·모르는 것은 한 줄로 정직하게.** 지어내지 않고, 확인이 필요하면 `[ ]`로 남긴다.
- **쉬운 말을 쓴다.** 용어는 꼭 필요할 때만 쓰고, 처음 나오면 괄호로 짧게 풀어 쓴다.
- **쓰지 않는 것:** 비유 표, 여러 개의 소제목(`####`), "30초 버전" 같은 중복 요약, 같은 내용을 반복하는 문단, 파일 경로·함수 이름 나열.
- **사실은 코드·이력서로 확인한 것만 쓴다.** 근거를 확인했어도 답변에는 결론만 남긴다.

예시 (`interview/27_wrtn_review.md` Q15):

````markdown
**→ 한 기기 안은 공유 저장소, 기기 사이는 Firestore로 맞췄습니다.**

```
A 기기에서 체크 → Firestore에 저장
  → B 기기 앱이 실시간 리스너(onSnapshot)로 받음
  → B 기기 공유 저장소(App Group / SharedPreferences)에 기록 → B 위젯 갱신
```

**→ 충돌은 수정 시각이 더 늦은 쪽이 이깁니다.** 삭제는 `deleted: true` 표시로 남겨서 다른 기기에도 전해지게 했습니다.

**→ 한계:** B 앱이 꺼져 있으면 B 위젯은 **B에서 앱을 열 때** 바뀝니다. 바로 바꾸려면 iOS는 **조용한 푸시**, Android는 **FCM data 메시지**로 기기를 깨워야 합니다.
````

## SEO 컨텍스트

SEO·메타데이터·구조화 데이터 관련 작업 시 `seo/` 디렉토리를 참조한다.

| 파일 | 용도 |
|------|------|
| `seo/01_context.md` | 프로젝트 기본 정보·도메인·검색엔진 인증 코드 |
| `seo/02_meta.md` | 메타데이터 스펙 |
| `seo/03_jsonld.md` | JSON-LD 구조화 데이터 |
| `seo/04_files.md` | robots.txt · manifest.json · sitemap |
| `seo/05_components.md` | SEO 관련 컴포넌트 |
| `seo/06_todo.md` | SEO 잔여 작업 목록 |
