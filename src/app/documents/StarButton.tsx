'use client';

import { Star } from 'lucide-react';
import { toggleStar, useStarred } from './starred';

type Props = { companyKey: string; name: string; valid?: Set<string>; className?: string };

export default function StarButton({ companyKey, name, valid, className = '' }: Props) {
  const on = useStarred().has(companyKey);
  return (
    <button
      type="button"
      onClick={() => toggleStar(companyKey, valid)}
      aria-pressed={on}
      aria-label={`${name} 별표`}
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-accent-blue/10 ${on ? 'text-amber-400' : 'text-accent-blue'} ${className}`}
    >
      <Star size={16} fill={on ? 'currentColor' : 'none'} />
    </button>
  );
}
