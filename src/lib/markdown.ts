/**
 * interview/*.md 전용 마크다운 렌더러.
 *
 * 외부 의존성 없이 빌드 타임(서버)에서만 실행된다.
 * 지원 범위는 interview 문서가 실제로 쓰는 문법으로 한정한다 —
 * 제목 · 인용 · 목록 · 표 · 코드펜스 · 구분선 · 굵게 · 인라인코드 · 링크.
 */

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * 배포되는 문서의 slug 집합. 렌더러가 죽은 링크를 만들지 않도록
 * 존재하지 않는 문서로의 상대 링크는 일반 텍스트로 떨군다.
 * (README가 참조하지만 디렉토리에 없는 문서가 있다.)
 */
let publishedSlugs: ReadonlySet<string> = new Set();

export const setPublishedSlugs = (slugs: Iterable<string>) => {
  publishedSlugs = new Set(slugs);
};

/** 인라인 문법. 코드 조각을 먼저 빼두고 나머지를 처리해 코드 안 문법이 해석되지 않게 한다. */
const renderInline = (raw: string): string => {
  const codes: string[] = [];
  let text = raw.replace(/`([^`]+)`/g, (_, code: string) => {
    codes.push(code);
    return `@@CODE${codes.length - 1}@@`;
  });

  text = escapeHtml(text);
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_, label: string, href: string) => {
      // 문서끼리의 상대 링크(./07_tech_react.md)는 라우트로 바꾼다.
      const local = href.match(/^\.\/(.+)\.md$/);
      if (local) {
        // 배포 대상이 아닌 문서는 404가 되므로 링크를 걸지 않는다.
        if (!publishedSlugs.has(local[1])) return label;
        return `<a href="/interview/${local[1]}">${label}</a>`;
      }
      const external = /^https?:\/\//.test(href);
      const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${href}"${attrs}>${label}</a>`;
    },
  );

  return text.replace(
    /@@CODE(\d+)@@/g,
    (_, index: string) => `<code>${escapeHtml(codes[Number(index)])}</code>`,
  );
};

const renderTable = (rows: string[]): string => {
  const cells = (row: string) =>
    row
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((cell) => cell.trim());

  const [head, , ...body] = rows;
  const thead = cells(head)
    .map((cell) => `<th>${renderInline(cell)}</th>`)
    .join('');
  const tbody = body
    .map(
      (row) =>
        `<tr>${cells(row)
          .map((cell) => `<td>${renderInline(cell)}</td>`)
          .join('')}</tr>`,
    )
    .join('');

  return `<div class="md-table-wrap"><table><thead><tr>${thead}</tr></thead><tbody>${tbody}</tbody></table></div>`;
};

export const renderMarkdown = (source: string): string => {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // 코드 펜스
    if (/^```/.test(line)) {
      const body: string[] = [];
      i += 1;
      while (i < lines.length && !/^```/.test(lines[i])) {
        body.push(lines[i]);
        i += 1;
      }
      i += 1;
      out.push(`<pre><code>${escapeHtml(body.join('\n'))}</code></pre>`);
      continue;
    }

    // 구분선
    if (/^---+\s*$/.test(line)) {
      out.push('<hr />');
      i += 1;
      continue;
    }

    // 제목
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      out.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      i += 1;
      continue;
    }

    // 표 — 헤더 + 구분행이 붙어 있을 때만
    if (/^\|/.test(line) && i + 1 < lines.length && /^\|[\s:|-]+\|?\s*$/.test(lines[i + 1])) {
      const rows: string[] = [];
      while (i < lines.length && /^\|/.test(lines[i])) {
        rows.push(lines[i]);
        i += 1;
      }
      out.push(renderTable(rows));
      continue;
    }

    // 인용 — 연속된 > 를 한 블록으로 묶는다
    if (/^>\s?/.test(line)) {
      const body: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        body.push(lines[i].replace(/^>\s?/, ''));
        i += 1;
      }
      out.push(
        `<blockquote>${renderInline(body.join('\n')).replace(/\n/g, '<br />')}</blockquote>`,
      );
      continue;
    }

    // 목록
    const listKind = /^\s*[-*]\s+/.test(line)
      ? 'ul'
      : /^\s*\d+\.\s+/.test(line)
        ? 'ol'
        : null;
    if (listKind) {
      const items: string[] = [];
      const pattern = listKind === 'ul' ? /^\s*[-*]\s+/ : /^\s*\d+\.\s+/;
      while (i < lines.length && pattern.test(lines[i])) {
        items.push(`<li>${renderInline(lines[i].replace(pattern, ''))}</li>`);
        i += 1;
      }
      out.push(`<${listKind}>${items.join('')}</${listKind}>`);
      continue;
    }

    // 빈 줄
    if (!line.trim()) {
      i += 1;
      continue;
    }

    // 문단 — 다음 빈 줄이나 블록 시작 전까지
    const paragraph: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,6}\s|>|```|---+\s*$|\||\s*[-*]\s|\s*\d+\.\s)/.test(lines[i])
    ) {
      paragraph.push(lines[i]);
      i += 1;
    }
    if (paragraph.length) {
      out.push(`<p>${renderInline(paragraph.join('\n')).replace(/\n/g, '<br />')}</p>`);
    }
  }

  return out.join('\n');
};
