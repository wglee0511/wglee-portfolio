import Link from 'next/link';
import type { Metadata } from 'next';
import { getCheckedAt, getCompanies, getPostingCount } from '@/lib/documents';

export const metadata: Metadata = {
  title: '지원 가능 회사',
  description: '일산 기준 편도 90분 이내에서 지원할 수 있는 회사 목록.',
};

export default function DocumentsIndexPage() {
  const companies = getCompanies();

  return (
    <div className="mx-auto w-full max-w-3xl">
      <header className="mb-8 sm:mb-12">
        <p className="mb-2 font-mono text-[0.6875rem] tracking-[0.2em] text-accent-blue sm:mb-3 sm:text-xs">
          DOCUMENTS
        </p>
        <h1
          className="text-2xl font-bold sm:text-4xl"
          style={{ color: 'var(--text-primary)' }}
        >
          지원 가능 회사
        </h1>
        <p
          className="mt-3 text-[0.8125rem] leading-relaxed sm:mt-4 sm:text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          일산 기준 편도 90분 이내(추정). 중복 없는 공고 {getPostingCount()}건, 회사{' '}
          {companies.length}곳. 마감일은 {getCheckedAt()} 확인 시점 기준입니다.
        </p>
      </header>

      <ul className="space-y-2">
        {companies.map((c) => (
          <li key={c.key}>
            <Link
              href={`/documents/${c.key}`}
              className="glass flex items-baseline justify-between gap-3 rounded-xl px-4 py-3 transition-colors hover:border-accent-blue/40 sm:px-5"
            >
              <span
                className="min-w-0 truncate text-[0.9375rem] font-semibold sm:text-base"
                style={{ color: 'var(--text-primary)' }}
              >
                {c.name}
              </span>
              <span
                className="shrink-0 text-[0.8125rem] sm:text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                {c.regions.join(' · ')}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
