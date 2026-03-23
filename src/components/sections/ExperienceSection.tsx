"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Building2, ChevronRight } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      company: "주식회사 루티너리 (Routinery Inc.)",
      role: "프론트엔드 개발자 (프로덕트 팀)",
      period: "2024.11 - 현재",
      description: "글로벌 습관 형성 서비스 루티너리의 프론트엔드 및 네이티브 환경 현대화 주도",
      achievements: [
        "Wear OS 앱의 XML 레이아웃을 Jetpack Compose로 100% 마이그레이션",
        "Jetpack Glance 기반의 Android 홈 위젯 4종 재작성 (레거시 코드 1,600라인 제거)",
        "React Query Selector 패턴 도입으로 Peak Memory 69% 감소 (958MB -> 297MB)",
        "네이티브와 React Native 간 상태 동기화 파이프라인 설계"
      ],
      tags: ["React Native", "Jetpack Compose", "Zustand", "React Query"]
    },
    {
      company: "주식회사 메이크델타 (Make Delta Inc.)",
      role: "프론트엔드 개발자 (프로덕트 팀)",
      period: "2023.07 - 2024.04",
      description: "퀀트 투자 플랫폼의 데이터 시각화 및 디자인 시스템 구축",
      achievements: [
        "D3.js와 Canvas API를 활용한 고밀도 실시간 캔들스틱 차트 시스템 개발",
        "Vite manualChunks 및 Lazy Loading 최적화로 번들 사이즈 43% 절감",
        "모바일 디자인 시스템(0 to 1) 구축 및 Storybook 배포 자동화"
      ],
      tags: ["React", "D3.js", "Vite", "Storybook", "Tailwind CSS"]
    },
    {
      company: "주식회사 페이히어 (Payhere Inc.)",
      role: "프론트엔드 개발자 (프로덕트 팀)",
      period: "2021.12 - 2023.06",
      description: "클라우드 기반 포스(POS) 서비스의 고객 접점 앱 및 에코시스템 개발",
      achievements: [
        "포스 연동 포인트/스탬프/결제 서명용 고객 대면 앱 개발 및 출시",
        "실시간 네이버 예약 연동 시스템 클라이언트 기능 설계 및 개발",
        "Electron 기반 하드웨어(프린터, 카드 리더기) 통합 플러그인 시스템 구축"
      ],
      tags: ["React", "Electron", "Redux Saga", "Next.js"]
    }
  ];

  return (
    <section id="experience" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-24"
        >
          <h2 className="fluid-h2 font-bold mb-4 text-white">Work <span className="text-gradient">Experience</span></h2>
          <p className="text-gray-400 text-lg">성장하는 팀에서 핵심적인 가치를 만들어온 여정입니다.</p>
        </motion.div>

        <div className="space-y-16">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.15, duration: 0.7, ease: "easeOut" }}
              className="relative pl-8 md:pl-12 border-l border-white/5 group"
            >
              {/* Glowing timeline dot */}
              <div className="absolute left-[-6px] md:left-[-6px] top-1 w-3 h-3 rounded-full bg-accent-purple border-2 border-[#03040b] group-hover:bg-accent-blue group-hover:scale-125 transition-all duration-300 shadow-[0_0_15px_rgba(157,80,187,0.6)] group-hover:shadow-[0_0_20px_rgba(0,225,255,0.8)]" />
              
              <div className="mb-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-400 font-medium tracking-wide">
                <span className="flex items-center gap-1.5 bg-white/5 py-1 px-3 rounded-full border border-white/10 w-fit">
                  <Calendar size={14} className="text-accent-blue" /> {exp.period}
                </span>
                <span className="flex items-center gap-1.5 text-gray-300">
                  <Building2 size={16} className="text-accent-purple" /> {exp.company}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                {exp.role}
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed max-w-2xl">{exp.description}</p>

              <div className="glass p-6 md:p-8 rounded-[2rem] mb-8 bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                <ul className="space-y-4">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300 text-sm md:text-base leading-relaxed">
                      <ChevronRight size={18} className="mt-0.5 text-accent-magenta shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {exp.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 rounded-full bg-accent-blue/5 text-[11px] font-bold text-accent-blue border border-accent-blue/20 uppercase tracking-widest hover:bg-accent-blue/10 hover:border-accent-blue/40 transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
