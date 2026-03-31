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
