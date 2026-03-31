"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, ExternalLink, TrendingUp, CheckCircle } from 'lucide-react';

const orderRows = [
  { label: "종목명", value: "WG.LEE (이원교)", mono: false },
  { label: "종목코드", value: "WGLEE", mono: true },
  { label: "현재가", value: "₩ 9,870", mono: true },
  { label: "등락률", value: "+7.28% ▲", up: true, mono: true },
  { label: "주문 유형", value: "시장가 매수 (Full-time Hire)", mono: false },
  { label: "거래 가능 시간", value: "즉시 가능", mono: false },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Background glow using radial gradients instead of heavy blur to prevent sharp box rendering artifacts */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] max-w-[1200px] max-h-[1200px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,208,132,0.04) 0%, transparent 60%)' }}
      />
      <div 
        className="absolute -bottom-40 -right-40 w-[800px] h-[800px] pointer-events-none" 
        style={{ background: 'radial-gradient(circle, rgba(255,71,87,0.04) 0%, transparent 60%)' }} 
      />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10 text-center"
        >
          {/* HTS label */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-md text-[10px] font-ticker font-bold uppercase tracking-widest"
            style={{
              background: 'var(--hts-header)',
              border: '1px solid var(--hts-border)',
              color: 'var(--text-muted)',
            }}
          >
            <span style={{ color: 'var(--up-color)' }}>■</span>
            매수 주문 창 (Order Form)
          </div>
          <h2 className="fluid-h1 font-bold mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Let&apos;s Build <br className="md:hidden"/>
            <span className="text-gradient">Something Great</span>
          </h2>
          <p className="text-base md:text-lg max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            새로운 도전을 환영합니다. 매력적인 프로덕트를 함께 만들어갈 기회를 찾고 계신다면, 언제든 편하게 연락해 주세요.
          </p>
        </motion.div>

        {/* HTS Order Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="rounded-2xl overflow-hidden mb-8"
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--hts-border)',
          }}
        >
          {/* Order book header */}
          <div
            className="flex items-center justify-between px-5 py-3 border-b"
            style={{
              background: 'var(--hts-header)',
              borderColor: 'var(--hts-border)',
            }}
          >
            <div className="flex items-center gap-2 font-ticker">
              <span className="text-sm font-bold" style={{ color: 'var(--up-color)' }}>WGLEE</span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>· 이원교 프론트엔드 개발자</span>
            </div>
            <span className="flex items-center gap-1 font-ticker text-xs font-bold" style={{ color: 'var(--up-color)' }}>
              <TrendingUp size={12} />
              매수 가능
            </span>
          </div>

          {/* Order detail table */}
          <div className="divide-y" style={{ borderColor: 'var(--surface-border)' }}>
            {orderRows.map((row, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-5 py-3"
              >
                <span className="text-xs font-ticker" style={{ color: 'var(--text-muted)' }}>
                  {row.label}
                </span>
                <span
                  className={`text-sm font-semibold ${row.mono ? 'font-ticker' : ''}`}
                  style={{
                    color: 'up' in row && row.up
                      ? 'var(--up-color)'
                      : 'var(--text-primary)',
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Available status */}
          <div
            className="flex items-center gap-2 px-5 py-3 border-t"
            style={{ borderColor: 'var(--hts-border)', background: 'rgba(0,208,132,0.04)' }}
          >
            <CheckCircle size={14} style={{ color: 'var(--up-color)' }} />
            <span className="text-xs font-ticker" style={{ color: 'var(--up-color)' }}>
              Available for new opportunities — 즉시 합류 가능
            </span>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          {/* Primary: 전량 매수 */}
          <motion.a
            whileHover={{ scale: 1.03, boxShadow: '0 12px 40px -8px rgba(0,208,132,0.4)' }}
            whileTap={{ scale: 0.97 }}
            href="mailto:ranazang@naver.com"
            className="w-full sm:flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base transition-all"
            style={{
              background: 'var(--up-color)',
              color: '#051a0d',
              boxShadow: '0 8px 24px -6px rgba(0,208,132,0.3)',
            }}
          >
            <Mail size={20} />
            WG.LEE 전량 매수 (Hire Me)
          </motion.a>

          {/* Secondary links */}
          <div className="flex gap-3">
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/wglee0511"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-4 glass rounded-xl font-medium text-sm transition-all"
              style={{ color: 'var(--text-primary)' }}
            >
              <Github size={20} />
              GitHub
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="https://velog.io/@wglee0511"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-4 glass rounded-xl font-medium text-sm transition-all"
              style={{ color: 'var(--text-primary)' }}
            >
              <ExternalLink size={20} />
              Velog
            </motion.a>
          </div>
        </motion.div>

        {/* Disclaimer */}
      </div>
    </section>
  );
};

export default ContactSection;
