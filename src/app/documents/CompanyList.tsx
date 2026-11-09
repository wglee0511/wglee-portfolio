'use client';

import { useMemo, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';

type Row = { key: string; name: string; regions: string[] };

const STORAGE_KEY = 'documents:starred';
const CHANGE_EVENT = 'documents:starred-change';

function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === null || e.key === STORAGE_KEY) onChange();
  };
  window.addEventListener('storage', onStorage);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

// 문자열 그대로 비교해야 getSnapshot이 안정적이다. 접근이 막히면 빈 값으로 본다.
function readRaw(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
}

function parse(raw: string): string[] {
  try {
    const v: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(v) ? v.filter((k): k is string => typeof k === 'string') : [];
  } catch {
    return [];
  }
}

// 재검색으로 사라진 회사 키는 저장값에서 함께 걸러낸다.
function toggle(key: string, valid: Set<string>) {
  const current = parse(readRaw()).filter((k) => valid.has(k));
  const next = current.includes(key) ? current.filter((k) => k !== key) : [...current, key];
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    return; // 저장 불가(사생활 보호 모드 등): 표시도 바꾸지 않는다.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export default function CompanyList({ companies }: { companies: Row[] }) {
  const raw = useSyncExternalStore(subscribe, readRaw, () => '');
  const starred = useMemo(() => new Set(parse(raw)), [raw]);
  const valid = useMemo(() => new Set(companies.map((c) => c.key)), [companies]);

  return (
    <ul className="space-y-2">
      {companies.map((c, i) => {
        const on = starred.has(c.key);
        return (
          <li key={c.key} className="glass flex items-center gap-1 rounded-xl pl-1 transition-colors hover:border-accent-blue/40 sm:pl-2">
            <button
              type="button"
              onClick={() => toggle(c.key, valid)}
              aria-pressed={on}
              aria-label={`${c.name} 별표`}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-accent-blue/10 ${on ? 'text-amber-400' : 'text-accent-blue'}`}
            >
              <Star size={16} fill={on ? 'currentColor' : 'none'} />
            </button>
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
        );
      })}
    </ul>
  );
}
