'use client';

import { useMemo, useSyncExternalStore } from 'react';

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

/** 별표한 회사 키 집합. 목록과 상세가 같은 저장값을 본다. */
export function useStarred(): Set<string> {
  const raw = useSyncExternalStore(subscribe, readRaw, () => '');
  return useMemo(() => new Set(parse(raw)), [raw]);
}

/** 별표를 켜고 끈다. `valid`를 주면 재검색으로 사라진 회사 키는 저장값에서 걸러낸다. */
export function toggleStar(key: string, valid?: Set<string>) {
  const stored = parse(readRaw());
  const current = valid ? stored.filter((k) => valid.has(k)) : stored;
  const next = current.includes(key) ? current.filter((k) => k !== key) : [...current, key];
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    return; // 저장 불가(사생활 보호 모드 등): 표시도 바꾸지 않는다.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
