import Link from 'next/link';
import type { Metadata } from 'next';
import { getDocs } from '@/lib/interview';

export const metadata: Metadata = {
  title: '면접 준비',
  description: '면접 예상 질문과 답변 가이드.',
};

export default function InterviewIndexPage() {
  const docs = getDocs();

  return (
    <div className="mx-auto w-full max-w-3xl">
      <header className="mb-8 sm:mb-12">
        <p className="mb-2 font-mono text-[0.6875rem] tracking-[0.2em] text-accent-blue sm:mb-3 sm:text-xs">
          INTERVIEW
        </p>
        <h1
          className="text-2xl font-bold sm:text-4xl"
          style={{ color: 'var(--text-primary)' }}
        >
          면접 준비 문서
        </h1>
        <p
          className="mt-3 text-[0.8125rem] leading-relaxed sm:mt-4 sm:text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          경험 설명 질문과 스택별 기술 면접 질문 모음입니다. 총 {docs.length}개 문서.
        </p>
      </header>

      <ul className="space-y-3">
        {docs.map((doc) => (
          <li key={doc.slug}>
            <Link
              href={`/interview/${doc.slug}`}
              className="glass block rounded-xl px-4 py-3.5 transition-colors hover:border-accent-blue/40 sm:px-5 sm:py-4"
            >
              <div className="flex items-baseline gap-2.5 sm:gap-3">
                <span className="shrink-0 font-mono text-[0.6875rem] text-accent-blue sm:text-xs">
                  {String(doc.order).padStart(2, '0')}
                </span>
                <h2
                  className="text-[0.9375rem] font-semibold leading-snug sm:text-base"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {doc.title}
                </h2>
              </div>
              {doc.summary && (
                // 모바일에서는 들여쓰기를 없애 본문 폭을 확보한다.
                <p
                  className="mt-1.5 text-[0.8125rem] leading-relaxed sm:mt-2 sm:pl-8 sm:text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {doc.summary}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
