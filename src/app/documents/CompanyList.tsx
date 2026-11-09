'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import StarButton from './StarButton';
import { STAR_LABEL, useStarred } from './starred';

type Company = { key: string; name: string; regions: string[] };
type Row = Company & { no: number };

export default function CompanyList({ companies }: { companies: Company[] }) {
  const valid = useMemo(() => new Set(companies.map((c) => c.key)), [companies]);
  const starred = useStarred();

  // 번호는 원래 순서 그대로 둔다. 표시한 회사는 위 묶음으로 옮기고 아래 목록에서는 뺀다.
  const { planned, applied, rest } = useMemo(() => {
    const rows: Row[] = companies.map((c, i) => ({ ...c, no: i + 1 }));
    return {
      planned: rows.filter((r) => starred.get(r.key) === 1),
      applied: rows.filter((r) => starred.get(r.key) === 2),
      rest: rows.filter((r) => !starred.has(r.key)),
    };
  }, [companies, starred]);

  const renderRows = (rows: Row[]) => (
    <ul className="space-y-2">
      {rows.map((c) => (
        <li key={c.key} className="glass flex items-center gap-1 rounded-xl pl-1 transition-colors hover:border-accent-blue/40 sm:pl-2">
          <StarButton companyKey={c.key} name={c.name} valid={valid} />
          <Link
            href={`/documents/${c.key}`}
            className="flex min-w-0 flex-1 items-baseline justify-between gap-3 py-3 pr-4 sm:pr-5"
          >
            <span className="flex min-w-0 items-baseline gap-2.5">
              <span className="w-7 shrink-0 text-right font-mono text-[0.6875rem] text-accent-blue sm:w-8 sm:text-xs">
                {c.no}
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

  const sections: [string, Row[]][] = [
    [STAR_LABEL[1], planned],
    [STAR_LABEL[2], applied],
    ['전체', rest],
  ];
  const grouped = planned.length + applied.length > 0;

  return (
    <div className="space-y-8">
      {sections.map(
        ([title, rows]) =>
          rows.length > 0 && (
            <section key={title}>
              {grouped && (
                <h2 className="mb-3 font-mono text-xs tracking-[0.15em] text-accent-blue">
                  {title} ({rows.length})
                </h2>
              )}
              {renderRows(rows)}
            </section>
          ),
      )}
    </div>
  );
}
