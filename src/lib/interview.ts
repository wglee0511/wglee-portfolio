import fs from 'node:fs';
import path from 'node:path';

/**
 * interview/ 디렉토리의 마크다운을 빌드 타임에 읽는다.
 * 원본 md가 소스이므로 문서를 고치면 페이지도 같이 갱신된다.
 */

const INTERVIEW_DIR = path.join(process.cwd(), 'interview');

export type InterviewDoc = {
  /** 파일명에서 확장자를 뺀 값. 라우트 세그먼트로 쓴다. */
  slug: string;
  /** 문서 첫 h1. 없으면 slug를 그대로 쓴다. */
  title: string;
  /** 목록 카드에 쓸 한 줄 요약. */
  summary: string;
  /** 파일명 앞 번호 (README는 0). 정렬 기준. */
  order: number;
  content: string;
};

const titleOf = (content: string, slug: string) =>
  content.match(/^#\s+(.+)$/m)?.[1].trim() ?? slug;

/** h1 다음의 첫 본문 줄. 인용·표·목록 기호는 걷어낸다. */
const summaryOf = (content: string) => {
  const body = content.replace(/^#\s+.+$/m, '');
  const line = body
    .split('\n')
    .map((l) => l.trim())
    .find((l) => l && !/^[|>#\-*`]/.test(l));

  if (!line) return '';
  const plain = line.replace(/\*\*/g, '').replace(/`/g, '');
  return plain.length > 100 ? `${plain.slice(0, 100)}…` : plain;
};

export const getDocs = (): InterviewDoc[] =>
  fs
    .readdirSync(INTERVIEW_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const content = fs.readFileSync(path.join(INTERVIEW_DIR, file), 'utf-8');
      return {
        slug,
        title: titleOf(content, slug),
        summary: summaryOf(content),
        // README는 목록 맨 앞에 오도록 0으로 둔다.
        order: Number(slug.match(/^(\d+)/)?.[1] ?? 0),
        content,
      };
    })
    .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));

export const getDoc = (slug: string): InterviewDoc | undefined =>
  getDocs().find((doc) => doc.slug === slug);
