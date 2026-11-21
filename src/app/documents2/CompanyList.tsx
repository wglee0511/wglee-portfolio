'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import StarButton from './StarButton';
import { STAR_LABEL, setStar, useStarred, type StarLevel } from './starred';

type Company = { key: string; name: string; regions: string[]; jobs: string[] };
type Row = Company & { no: number };

function ResultButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md border border-accent-blue/30 px-2.5 py-1.5 text-[0.6875rem] transition-colors hover:bg-accent-blue/10 sm:text-xs"
      style={{ color: 'var(--text-secondary)' }}
    >
      {label}
    </button>
  );
}

export default function CompanyList({ companies }: { companies: Company[] }) {
  const valid = useMemo(() => new Set(companies.map((c) => c.key)), [companies]);
  const starred = useStarred();

  // 번호는 원래 순서 그대로 둔다. 표시한 회사는 위 묶음으로 옮기고 아래 목록에서는 뺀다.
  const { planned, applied, passed, rejected, read, rest } = useMemo(() => {
    const rows: Row[] = companies.map((c, i) => ({ ...c, no: i + 1 }));
    return {
      planned: rows.filter((r) => starred.get(r.key) === 1),
      applied: rows.filter((r) => starred.get(r.key) === 2),
      passed: rows.filter((r) => starred.get(r.key) === 4),
      rejected: rows.filter((r) => starred.get(r.key) === 3),
      read: rows.filter((r) => starred.get(r.key) === 5),
      rest: rows.filter((r) => !starred.has(r.key)),
    };
  }, [companies, starred]);

  const renderRows = (rows: Row[]) => (
    <ul className="space-y-2">
      {rows.map((c) => (
        <li key={c.key} className="glass flex flex-wrap items-center gap-1 rounded-xl pl-1 transition-colors hover:border-accent-blue/40 sm:pl-2">
          <StarButton companyKey={c.key} name={c.name} valid={valid} />
          <Link
            href={`/documents2/${c.key}`}
            className="flex min-w-0 flex-1 items-baseline justify-between gap-3 py-3 pr-4 sm:pr-5"
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <span className="w-7 shrink-0 text-right font-mono text-[0.6875rem] text-accent-blue sm:w-8 sm:text-xs">
                {c.no}
              </span>
              <span className="flex min-w-0 flex-col">
                <span
                  className="min-w-0 truncate text-[0.9375rem] font-semibold sm:text-base"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {c.name}
                </span>
                <span
                  className="min-w-0 truncate text-[0.6875rem] sm:text-xs"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {c.jobs.join(' · ')}
                </span>
              </span>
            </span>
            <span
              className="shrink-0 text-[0.8125rem] sm:text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              {c.regions.join(' · ')}
            </span>
          </Link>
          {[2, 3, 4].includes(starred.get(c.key) ?? 0) && (
            <span className="ml-auto flex shrink-0 gap-1 pb-2 pr-2 sm:pb-0 sm:pr-3">
              {([4, 3] as StarLevel[])
                .filter((l) => l !== starred.get(c.key))
                .map((l) => (
                  <ResultButton key={l} label={STAR_LABEL[l]} onClick={() => setStar(c.key, l, valid)} />
                ))}
              <ResultButton label="되돌리기" onClick={() => setStar(c.key, 0, valid)} />
            </span>
          )}
        </li>
      ))}
    </ul>
  );

  const sections: [string, Row[]][] = [
    [STAR_LABEL[1], planned],
    [STAR_LABEL[2], applied],
    [STAR_LABEL[4], passed],
    [STAR_LABEL[3], rejected],
    [STAR_LABEL[5], read],
    ['전체', rest],
  ];
  const grouped = planned.length + applied.length + passed.length + rejected.length + read.length > 0;

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
