'use client';

import { CircleCheck, Star } from 'lucide-react';
import { STAR_LABEL, toggleStar, useStarred } from './starred';

type Props = { companyKey: string; name: string; valid?: Set<string>; className?: string };

export default function StarButton({ companyKey, name, valid, className = '' }: Props) {
  const level = useStarred().get(companyKey) ?? 0;
  const color = level === 1 ? 'text-amber-400' : level === 2 ? 'text-emerald-400' : 'text-accent-blue';
  return (
    <button
      type="button"
      onClick={() => toggleStar(companyKey, valid)}
      aria-label={`${name} ${STAR_LABEL[level]}`}
      title={STAR_LABEL[level]}
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-accent-blue/10 ${color} ${className}`}
    >
      {level === 2 ? <CircleCheck size={16} /> : <Star size={16} fill={level === 1 ? 'currentColor' : 'none'} />}
    </button>
  );
}
