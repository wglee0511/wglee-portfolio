"use client";

import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6 relative">
      {/* Decorative gradient behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-64 bg-accent-blue/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-24"
        >
          <h2 className="fluid-h2 font-bold mb-6 text-white leading-[1.15]">
            사용자의 일상을 바꾸는 <br/>
            <span className="text-gradient">가치 있는 제품</span>을 만듭니다.
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-blue to-transparent rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 text-gray-400 leading-relaxed text-base sm:text-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            <p className="mb-6">
              성능 저하의 구조적 원인을 찾아 코드 수준에서 해결합니다.
              체감이 아닌 실사용자 지표(P50/P95)로 개선 전후를 직접 측정하고 검증하는 방식으로 일합니다.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            <p>
              플랫폼 경계 영역(홈 위젯·Wear OS·백그라운드 이벤트)을 직접 설계하고 구현합니다.
              코드 분석 → 계획 수립 → AI 피드백 사이클로 AI를 설계 파트너 삼아 낯선 영역도 단독으로 구현합니다.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
        >
          {[
            { value: "4+", label: "Years Exp." },
            { value: "10+", label: "Projects" },
            { value: "3+", label: "Companies" },
            { value: "69%", label: "Perf. Boost" }
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5, scale: 1.05 }}
              className="text-center p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-accent-blue/30 hover:bg-white/[0.04] transition-all cursor-default"
            >
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-widest font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
