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
              작은 규모의 스타트업에서 시작해 200명 규모의 성장하는 기업까지, 
              다양한 환경에서 프론트엔드 개발자로서의 전문성을 쌓아왔습니다. 
              단순히 기능을 구현하는 것을 넘어, 서비스의 성능을 최적화하고 
              팀의 생산성을 높일 수 있는 구조를 고민하는 것을 즐깁니다.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            <p>
              React와 React Native를 기반으로 한 웹/앱 통합 개발 경험을 보유하고 있으며, 
              Jetpack Compose와 같은 최신 네이티브 기술을 도입하여 프로덕트의 퀄리티를 한 단계 높이는 작업을 수행했습니다. 
              재사용 가능한 컴포넌트 시스템 구축을 통해 개발 효율성을 극대화하는 것에 강점이 있습니다.
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
