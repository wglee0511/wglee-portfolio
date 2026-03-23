"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Code } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    {
      title: "Code Slugger",
      category: "Mobile Game (B2C)",
      description: "숫자야구 로직을 기반으로 한 모바일 캐주얼 게임입니다. 전 세계 사용자와 경쟁할 수 있는 랭킹 시스템을 제공합니다.",
      highlights: [
        "Supabase Auth 기반 익명 로그인 구현",
        "React Query를 활용한 낙관적 업데이트(Occupancy Update) 적용",
        "Edge Functions를 통한 보안 로직 처리",
        "i18n 적용으로 5개 국어 지원"
      ],
      tech: ["React Native", "Supabase", "React Query", "PostgreSQL"],
      link: "https://github.com/wglee0511/code-slugger"
    },
    {
      title: "Gatcha Roulette",
      category: "Utility App",
      description: "결정 장애를 돕는 랜덤 추첨 서비스 앱입니다. 간결한 UI와 부드러운 애니메이션에 집중하여 개발했습니다.",
      highlights: [
        "커스텀 룰렛 애니메이션 엔진 구현",
        "사용자 설정 저장 시스템 구축",
        "간편한 공유 기능 제공"
      ],
      tech: ["React Native", "Zustand", "Framer Motion"],
      link: "#"
    },
    {
      title: "UPBIT Auto Trading",
      category: "System Engineering",
      description: "업비트 API를 활용한 실시간 암호화폐 자동 매매 시스템입니다. 데이터 기반의 매매 전략을 자동화했습니다.",
      highlights: [
        "EMA, RSI, MACD 등 다중 기술 지표 분석 로직",
        "실시간 가격 모니터링 및 자동 주문 파이프라인",
        "손절(Stop Loss) 및 익절 전략 자동화",
        "Slack 알림 연동"
      ],
      tech: ["Python", "Pandas", "Upbit API", "Slack Webhook"],
      link: "#"
    }
  ];

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="fluid-h2 font-bold mb-4 text-white">Featured <span className="text-gradient">Projects</span></h2>
          <p className="text-gray-400 text-lg">아이디어를 현실로 구현한 주요 프로젝트들입니다.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.7, ease: "easeOut" }}
              className="glass rounded-[2.5rem] overflow-hidden flex flex-col group hover:border-accent-purple/30 hover:shadow-[0_20px_40px_-15px_rgba(157,80,187,0.15)] transition-all duration-500"
            >
              <div className="h-48 md:h-56 bg-gradient-to-br from-[#0a0a14] to-[#121226] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                
                {/* Decorative glowing orb behind icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent-blue/20 rounded-full blur-[40px] group-hover:bg-accent-magenta/20 group-hover:scale-150 transition-all duration-700" />
                
                <Code size={48} className="text-accent-blue/40 group-hover:text-accent-magenta/60 transition-colors duration-500 relative z-20 group-hover:scale-110 transform" />
                
                <div className="absolute top-6 left-6 z-20">
                  <span className="px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow bg-white/[0.01]">
                <h3 className="text-2xl font-bold mb-3 text-white tracking-tight group-hover:text-accent-blue transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed">
                  {project.description}
                </p>
                
                <ul className="space-y-3 mb-10 flex-grow">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="text-[13px] text-gray-300/80 flex items-start gap-3 leading-relaxed">
                       <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-accent-purple to-accent-magenta mt-1.5 shrink-0" />
                       {h}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-10 mt-auto">
                  {project.tech.map(t => (
                    <span key={t} className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-md bg-white/5 text-gray-300 border border-white/5 group-hover:border-white/10 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 pt-6 border-t border-white/5">
                  <a href={project.link} className="flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors group/link w-fit">
                    <Github size={18} className="group-hover/link:text-accent-blue transition-colors" /> Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
