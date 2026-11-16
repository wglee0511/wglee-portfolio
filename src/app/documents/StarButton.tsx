'use client';

import { BadgeCheck, CircleCheck, CircleX, Star } from 'lucide-react';
import { STAR_LABEL, toggleStar, useStarred } from './starred';

type Props = { companyKey: string; name: string; valid?: Set<string>; className?: string };

export default function StarButton({ companyKey, name, valid, className = '' }: Props) {
  const level = useStarred().get(companyKey) ?? 0;
  // 합격·탈락에서는 누르면 표시가 지워지므로 동작을 라벨로 알린다.
  const label = level >= 3 ? `${STAR_LABEL[level]} · 누르면 표시 지움` : STAR_LABEL[level];
  const color =
    level === 1
      ? 'text-amber-400'
      : level === 2
        ? 'text-emerald-400'
        : level === 3
          ? 'text-red-400'
          : level === 4
            ? 'text-sky-400'
            : 'text-accent-blue';
  return (
    <button
      type="button"
      onClick={() => toggleStar(companyKey, valid)}
      aria-label={`${name} ${label}`}
      title={label}
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-accent-blue/10 ${color} ${className}`}
    >
      {level === 2 ? (
        <CircleCheck size={16} />
      ) : level === 3 ? (
        <CircleX size={16} />
      ) : level === 4 ? (
        <BadgeCheck size={16} />
      ) : (
        <Star size={16} fill={level === 1 ? 'currentColor' : 'none'} />
      )}
    </button>
  );
}
