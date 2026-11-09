'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import StarButton from './StarButton';

type Row = { key: string; name: string; regions: string[] };

export default function CompanyList({ companies }: { companies: Row[] }) {
  const valid = useMemo(() => new Set(companies.map((c) => c.key)), [companies]);

  return (
    <ul className="space-y-2">
      {companies.map((c, i) => (
        <li key={c.key} className="glass flex items-center gap-1 rounded-xl pl-1 transition-colors hover:border-accent-blue/40 sm:pl-2">
          <StarButton companyKey={c.key} name={c.name} valid={valid} />
          <Link
            href={`/documents/${c.key}`}
            className="flex min-w-0 flex-1 items-baseline justify-between gap-3 py-3 pr-4 sm:pr-5"
          >
            <span className="flex min-w-0 items-baseline gap-2.5">
              <span className="w-7 shrink-0 text-right font-mono text-[0.6875rem] text-accent-blue sm:w-8 sm:text-xs">
                {i + 1}
              </span>
              <span
                className="min-w-0 truncate text-[0.9375rem] font-semibold sm:text-base"
                style={{ color: 'var(--text-primary)' }}
              >
                {c.name}
              </span>
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
  );
}
