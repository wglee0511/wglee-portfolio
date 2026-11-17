'use client';

import { useMemo, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'documents2:starred';
const CHANGE_EVENT = 'documents2:starred-change';

/** 1 = 지원할 곳, 2 = 지원한 곳, 3 = 탈락, 4 = 합격. 표시가 없으면 맵에 없다. */
export type StarLevel = 1 | 2 | 3 | 4;

export const STAR_LABEL: Record<0 | StarLevel, string> = {
  0: '표시 없음',
  1: '지원할 곳',
  2: '지원한 곳',
  3: '탈락',
  4: '합격',
};

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

// 저장 형식은 `{ 회사키: 1 | 2 | 3 | 4 }`. 별표가 한 단계뿐이던 옛 형식(`[회사키, ...]`)은 "지원할 곳"으로 읽는다.
function parse(raw: string): Map<string, StarLevel> {
  const map = new Map<string, StarLevel>();
  try {
    const v: unknown = raw ? JSON.parse(raw) : {};
    if (Array.isArray(v)) {
      for (const k of v) if (typeof k === 'string') map.set(k, 1);
    } else if (v && typeof v === 'object') {
      for (const [k, level] of Object.entries(v)) if (level === 1 || level === 2 || level === 3 || level === 4) map.set(k, level);
    }
  } catch {
    // 깨진 값은 빈 값으로 본다.
  }
  return map;
}

/** 회사 키별 표시 단계. 목록과 상세가 같은 저장값을 본다. */
export function useStarred(): Map<string, StarLevel> {
  const raw = useSyncExternalStore(subscribe, readRaw, () => '');
  return useMemo(() => parse(raw), [raw]);
}

/** 표시를 바꾼다. level 0이면 표시를 지워 처음 상태로 되돌린다. `valid`를 주면 재검색으로 사라진 회사 키는 저장값에서 걸러낸다. */
export function setStar(key: string, level: 0 | StarLevel, valid?: Set<string>) {
  const stored = parse(readRaw());
  if (valid) for (const k of stored.keys()) if (!valid.has(k)) stored.delete(k);
  if (level === 0) stored.delete(key);
  else stored.set(key, level);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries(stored)));
  } catch {
    return; // 저장 불가(사생활 보호 모드 등): 표시도 바꾸지 않는다.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** 별 버튼: 없음 → 지원할 곳 → 지원한 곳 → 없음. 합격·탈락에서 누르면 처음(없음)으로 돌아간다. */
export function toggleStar(key: string, valid?: Set<string>) {
  const level = parse(readRaw()).get(key) ?? 0;
  setStar(key, level === 0 ? 1 : level === 1 ? 2 : 0, valid);
}
