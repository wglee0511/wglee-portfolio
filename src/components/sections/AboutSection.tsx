"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart2, Cpu, Globe, Zap } from 'lucide-react';

const fundamentals = [
  {
    label: "시가총액 (경력)",
    value: "3Y+",
    sub: "Years Exp.",
    icon: <BarChart2 size={16} />,
    up: true,
    change: "+1Y YoY",
  },
  {
    label: "프로젝트 수",
    value: "10+",
    sub: "Projects",
    icon: <Cpu size={16} />,
    up: true,
    change: "+3 this yr",
  },
  {
    label: "재직 회사",
    value: "3+",
    sub: "Companies",
    icon: <Globe size={16} />,
    up: true,
    change: "Global 500만",
  },
  {
    label: "성능 개선",
    value: "69%",
    sub: "Mem. Reduced",
    icon: <Zap size={16} />,
    up: false,
    change: "▼ Optimized",
  },
];

const investmentPoints = [
  {
    title: "성능 최적화",
    desc: "성능 저하의 구조적 원인을 찾아 코드 수준에서 해결합니다. 체감이 아닌 실사용자 지표(P50/P95)로 개선 전후를 직접 측정하고 검증합니다.",
    badge: "Strong Buy",
    up: true,
  },
  {
    title: "플랫폼 경계 설계",
    desc: "홈 위젯·Wear OS·백그라운드 이벤트 등 플랫폼 경계 영역을 직접 설계하고 구현합니다. 코드 분석 → 계획 수립 → AI 피드백 사이클로 낯선 영역도 단독 구현합니다.",
    badge: "Strong Buy",
    up: true,
  },
  {
    title: "구조 개선",
    desc: "React Query·Zustand 구독 구조 재설계, 번들 43% 절감 등 지속 가능한 코드 아키텍처를 추구하며 유지보수 비용을 낮춥니다.",
    badge: "Buy",
    up: true,
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none" style={{ background: 'radial-gradient(circle, var(--glow-green) 0%, transparent 60%)' }} />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          {/* HTS header row */}
          <div
            className="flex items-center gap-3 px-4 py-2 rounded-t-xl mb-0 text-xs font-ticker font-semibold uppercase tracking-widest"
            style={{
              background: 'var(--hts-header)',
              border: '1px solid var(--hts-border)',
              borderBottom: 'none',
              color: 'var(--text-muted)',
            }}
          >
            <span style={{ color: 'var(--up-color)' }}>▶</span>
            WGLEE · 종목 요약 정보 (Stock Summary &amp; Fundamentals)
          </div>
          <div className="px-6 py-8 rounded-b-xl rounded-tr-xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--hts-border)' }}>
            <h2 className="fluid-h2 font-bold mb-4 leading-[1.15]" style={{ color: 'var(--text-primary)' }}>
              사용자의 일상을 바꾸는 <br/>
              <span className="text-gradient">가치 있는 제품</span>을 만듭니다.
            </h2>
            <div className="w-20 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, var(--up-color), transparent)' }} />
          </div>
        </motion.div>

        {/* Fundamentals grid — HTS-style table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="rounded-xl overflow-hidden mb-14"
          style={{ border: '1px solid var(--hts-border)' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y" style={{ borderColor: 'var(--hts-border)' }}>
            {fundamentals.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                className="p-5 transition-colors"
                style={{ background: 'var(--card-bg)' }}
              >
                <div className="flex items-center gap-2 mb-2" style={{ color: 'var(--text-muted)' }}>
                  {item.icon}
                  <span className="text-[10px] font-ticker uppercase tracking-widest">{item.label}</span>
                </div>
                <div className="text-2xl font-bold font-ticker mb-1" style={{ color: 'var(--text-primary)' }}>
                  {item.value}
                </div>
                <div className="text-[10px] mb-2" style={{ color: 'var(--text-muted)' }}>{item.sub}</div>
                <span
                  className="inline-flex items-center gap-1 text-[10px] font-ticker font-semibold px-2 py-0.5 rounded"
                  style={{
                    color: item.up ? 'var(--up-color)' : 'var(--down-color)',
                    background: item.up ? 'rgba(0,208,132,0.08)' : 'rgba(255,71,87,0.08)',
                  }}
                >
                  {item.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {item.change}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Investment points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mb-2"
        >
          <div
            className="text-[10px] font-ticker font-semibold uppercase tracking-widest px-4 py-2 rounded-t-xl"
            style={{
              background: 'var(--hts-header)',
              border: '1px solid var(--hts-border)',
              borderBottom: 'none',
              color: 'var(--text-muted)',
            }}
          >
            투자 포인트 (Investment Points)
          </div>
          <div className="grid md:grid-cols-3 gap-0 rounded-b-xl overflow-hidden" style={{ border: '1px solid var(--hts-border)' }}>
            {investmentPoints.map((pt, i) => (
              <motion.div
                key={i}
                whileHover={{ backgroundColor: 'rgba(0,208,132,0.03)' }}
                className="p-6 transition-colors"
                style={{
                  background: 'var(--card-bg)',
                  borderRight: i < investmentPoints.length - 1 ? '1px solid var(--hts-border)' : 'none',
                }}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{pt.title}</span>
                  <span
                    className="shrink-0 text-[9px] font-ticker font-bold px-2 py-0.5 rounded"
                    style={{
                      color: 'var(--up-color)',
                      background: 'rgba(0,208,132,0.1)',
                      border: '1px solid rgba(0,208,132,0.2)',
                    }}
                  >
                    {pt.badge}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{pt.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
