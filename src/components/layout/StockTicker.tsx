"use client";

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerItem {
  symbol: string;
  value: string;
  change: string;
  up: boolean;
}

const items: TickerItem[] = [
  { symbol: "WGLEE", value: "₩ 9,870", change: "+5.2%", up: true },
  { symbol: "RN", value: "Expert", change: "+40.0%", up: true },
  { symbol: "PERF", value: "-69%MEM", change: "▼ Optimized", up: false },
  { symbol: "TS", value: "5Y+", change: "+12.0%", up: true },
  { symbol: "RQ", value: "Mastered", change: "+28.5%", up: true },
  { symbol: "D3", value: "Canvas", change: "+33.0%", up: true },
  { symbol: "LAUNCH", value: "-26%TTI", change: "▼ Faster", up: false },
  { symbol: "KOTLIN", value: "Glance", change: "+19.4%", up: true },
  { symbol: "SWIFT", value: "AppIntents", change: "+15.7%", up: true },
  { symbol: "CI/CD", value: "Fastlane", change: "+100%", up: true },
  { symbol: "BUNDLE", value: "-43%KB", change: "▼ Leaner", up: false },
  { symbol: "GCP", value: "Docker", change: "+8.2%", up: true },
];

const TickerCell = ({ item }: { item: TickerItem }) => (
  <span className="inline-flex items-center gap-3 px-6 py-0 select-none shrink-0">
    <span className="font-ticker text-[11px] font-bold tracking-widest" style={{ color: 'var(--text-primary)' }}>
      {item.symbol}
    </span>
    <span className="font-ticker text-[11px]" style={{ color: 'var(--text-muted)' }}>
      {item.value}
    </span>
    <span
      className="font-ticker text-[11px] font-semibold flex items-center gap-0.5"
      style={{ color: item.up ? 'var(--up-color)' : 'var(--down-color)' }}
    >
      {item.up
        ? <TrendingUp size={10} className="shrink-0" />
        : <TrendingDown size={10} className="shrink-0" />
      }
      {item.change}
    </span>
    <span className="w-px h-3 mx-1 opacity-20" style={{ background: 'var(--text-muted)' }} />
  </span>
);

const StockTicker = () => {
  const doubled = [...items, ...items];

  return (
    <div
      className="w-full overflow-hidden border-y py-2"
      style={{
        background: 'var(--hts-header)',
        borderColor: 'var(--hts-border)',
      }}
    >
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <TickerCell key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default StockTicker;
