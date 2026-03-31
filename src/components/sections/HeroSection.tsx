"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Mail, TrendingUp } from 'lucide-react';

/* ─── Mini candlestick chart ─── */
const CandleChart = () => {
  const candles = [
    { o: 62, c: 70, h: 72, l: 60 },
    { o: 70, c: 68, h: 73, l: 66 },
    { o: 68, c: 76, h: 78, l: 67 },
    { o: 76, c: 74, h: 79, l: 72 },
    { o: 74, c: 80, h: 82, l: 73 },
    { o: 80, c: 85, h: 87, l: 79 },
    { o: 85, c: 83, h: 88, l: 81 },
    { o: 83, c: 90, h: 92, l: 82 },
    { o: 90, c: 94, h: 96, l: 89 },
    { o: 94, c: 92, h: 97, l: 90 },
    { o: 92, c: 98, h: 100, l: 91 },
    { o: 98, c: 96, h: 101, l: 94 },
  ];

  const minV = 58, maxV = 105;
  const W = 300, H = 80;
  const candleW = 14, gap = (W / candles.length);

  const toY = (v: number) => H - ((v - minV) / (maxV - minV)) * H;

  return (
    <svg
      width={W} height={H}
      className="opacity-25"
      style={{ overflow: 'visible' }}
    >
      {candles.map((c, i) => {
        const x = i * gap + gap / 2;
        const up = c.c >= c.o;
        const color = up ? '#00d084' : '#ff4757';
        const bodyTop = toY(Math.max(c.o, c.c));
        const bodyBot = toY(Math.min(c.o, c.c));
        const bodyH = Math.max(bodyBot - bodyTop, 2);
        return (
          <g key={i}>
            {/* Wick */}
            <line x1={x} y1={toY(c.h)} x2={x} y2={toY(c.l)} stroke={color} strokeWidth={1} />
            {/* Body */}
            <rect x={x - candleW / 2} y={bodyTop} width={candleW} height={bodyH} fill={color} rx={1} />
          </g>
        );
      })}
    </svg>
  );
};

/* ─── Animated price counter ─── */
const PriceCounter = () => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const start = 9200;
    const end = 9870;
    const duration = 2000;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * ease);
      if (ref.current) ref.current.textContent = current.toLocaleString('ko-KR');
      if (progress < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <span ref={ref} className="font-ticker">9,870</span>;
};

const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Background: subtle chart grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(var(--text-muted) 1px, transparent 1px),
            linear-gradient(90deg, var(--text-muted) 1px, transparent 1px)
          `,
          backgroundSize: '60px 40px',
        }}
      />
      {/* Glow blobs using radial gradients */}
      <div className="absolute top-1/4 left-[10%] w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,208,132,0.04) 0%, transparent 60%)' }} />
      <div className="absolute bottom-1/4 right-[10%] w-[900px] h-[900px] translate-x-1/4 translate-y-1/4 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,71,87,0.03) 0%, transparent 60%)' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-center z-10 px-6 w-full max-w-5xl mx-auto"
      >
        {/* Ticker symbol badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full border font-ticker"
            style={{
              color: 'var(--up-color)',
              background: 'rgba(0,208,132,0.08)',
              borderColor: 'rgba(0,208,132,0.25)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--up-color)' }} />
            KOSPI · WGLEE · Frontend Developer
          </span>
        </motion.div>

        {/* Main title as stock ticker style */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mb-4"
        >
          <h1 className="fluid-h1 font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            <span className="text-gradient">WG.LEE</span>
          </h1>
        </motion.div>

        {/* Price row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-8 font-ticker"
        >
          <span className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            ₩ <PriceCounter />
          </span>
          <span className="flex items-center gap-1 px-3 py-1 rounded text-sm font-bold badge-up">
            <TrendingUp size={14} />
            +670 (+7.28%)
          </span>
          <span className="text-xs px-2 py-1 rounded font-ticker" style={{ color: 'var(--text-muted)', background: 'var(--surface)', border: '1px solid var(--surface-border)' }}>
            전일 대비
          </span>
        </motion.div>

        {/* Candle chart illustration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="flex justify-center mb-8"
        >
          <CandleChart />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="max-w-2xl mx-auto text-base sm:text-lg mb-12 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          웹과 앱을 넘나들며 실제 사용자에게 닿는 제품을 만드는 프론트엔드 개발자입니다. <br className="hidden sm:block"/>
          글로벌 500만 사용자 서비스에서 메모리 사용량을 <span className="font-ticker font-bold" style={{ color: 'var(--up-color)' }}>-69%</span> 줄이고 앱 초기 실행 시간을 <span className="font-ticker font-bold" style={{ color: 'var(--up-color)' }}>-26%</span> 단축했습니다.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16"
        >
          <motion.a
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="https://github.com/wglee0511"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 glass rounded-full transition-all font-medium text-sm sm:text-base"
            style={{ color: 'var(--text-primary)' }}
          >
            <Github size={20} />
            <span>GitHub Profile</span>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="mailto:ranazang@naver.com"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all"
            style={{
              background: 'var(--up-color)',
              color: '#0a1a12',
              boxShadow: '0 8px 24px -6px rgba(0,208,132,0.35)',
            }}
          >
            <Mail size={20} />
            <span>WG.LEE 매수하기 (Contact)</span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-3" style={{ color: 'var(--text-muted)' }}>
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium font-ticker">종목 탐색</span>
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown size={24} style={{ color: 'var(--up-color)', opacity: 0.5 }} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
