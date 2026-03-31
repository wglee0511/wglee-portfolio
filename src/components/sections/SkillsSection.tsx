"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Monitor, Database, Settings } from 'lucide-react';

interface Skill {
  name: string;
  weight: number; // 0-100 percentage
  opinion: 'Strong Buy' | 'Buy' | 'Hold';
}

interface SkillCategory {
  title: string;
  sectorCode: string;
  icon: React.ReactNode;
  totalWeight: number;
  skills: Skill[];
}

const opinionColor = (opinion: string) => {
  if (opinion === 'Strong Buy') return 'var(--up-color)';
  if (opinion === 'Buy') return '#4fc3f7';
  return 'var(--text-muted)';
};

const opinionBg = (opinion: string) => {
  if (opinion === 'Strong Buy') return 'rgba(0,208,132,0.1)';
  if (opinion === 'Buy') return 'rgba(79,195,247,0.1)';
  return 'rgba(255,255,255,0.04)';
};

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    sectorCode: "FE",
    icon: <Monitor size={20} />,
    totalWeight: 45,
    skills: [
      { name: "React / Next.js", weight: 95, opinion: "Strong Buy" },
      { name: "TypeScript", weight: 90, opinion: "Strong Buy" },
      { name: "React Query", weight: 88, opinion: "Strong Buy" },
      { name: "Zustand / MobX", weight: 82, opinion: "Buy" },
      { name: "D3.js", weight: 75, opinion: "Buy" },
      { name: "Redux (Saga·Toolkit)", weight: 70, opinion: "Buy" },
      { name: "Vite / i18next", weight: 68, opinion: "Buy" },
    ]
  },
  {
    title: "Native / Desktop",
    sectorCode: "NAT",
    icon: <Smartphone size={20} />,
    totalWeight: 30,
    skills: [
      { name: "React Native", weight: 92, opinion: "Strong Buy" },
      { name: "Swift (iOS)", weight: 70, opinion: "Buy" },
      { name: "Kotlin (Android)", weight: 68, opinion: "Buy" },
      { name: "Jetpack Compose", weight: 65, opinion: "Hold" },
      { name: "Electron", weight: 60, opinion: "Hold" },
    ]
  },
  {
    title: "Infra & Tools",
    sectorCode: "INF",
    icon: <Database size={20} />,
    totalWeight: 18,
    skills: [
      { name: "Firebase / Supabase", weight: 80, opinion: "Strong Buy" },
      { name: "GitHub Actions", weight: 78, opinion: "Buy" },
      { name: "Fastlane", weight: 75, opinion: "Buy" },
      { name: "Docker / GCP", weight: 65, opinion: "Buy" },
      { name: "AWS", weight: 60, opinion: "Hold" },
      { name: "Storybook", weight: 70, opinion: "Buy" },
    ]
  },
  {
    title: "Dev Suite",
    sectorCode: "DEV",
    icon: <Settings size={20} />,
    totalWeight: 7,
    skills: [
      { name: "React Native Skia", weight: 72, opinion: "Buy" },
      { name: "Python", weight: 65, opinion: "Buy" },
    ]
  }
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 px-6 relative overflow-visible">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-md text-[10px] font-ticker font-bold uppercase tracking-widest"
            style={{
              background: 'var(--hts-header)',
              border: '1px solid var(--hts-border)',
              color: 'var(--text-muted)',
            }}
          >
            <span style={{ color: 'var(--up-color)' }}>■</span>
            섹터별 투자 비중 (Asset Allocation / Sector Weight)
          </div>
          <h2 className="fluid-h2 font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Technical <span className="text-gradient">Stacks</span>
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>서비스의 특성에 맞는 최적의 기술을 선택하고 활용합니다.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="rounded-2xl overflow-hidden transition-all group"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--hts-border)',
              }}
            >
              {/* Card header — sector row */}
              <div
                className="flex items-center justify-between px-5 py-3 border-b"
                style={{
                  background: 'var(--hts-header)',
                  borderColor: 'var(--hts-border)',
                }}
              >
                <div className="flex items-center gap-2" style={{ color: 'var(--up-color)' }}>
                  {category.icon}
                  <span className="font-ticker text-xs font-bold">{category.sectorCode}</span>
                </div>
                <span
                  className="font-ticker text-xs font-bold px-2 py-0.5 rounded"
                  style={{ color: 'var(--up-color)', background: 'rgba(0,208,132,0.1)' }}
                >
                  {category.totalWeight}%
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {category.title}
                </h3>
                {/* Portfolio bar */}
                <div className="w-full h-1.5 rounded-full mb-5 overflow-hidden" style={{ background: 'var(--surface-border)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${category.totalWeight}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.3, duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: 'var(--up-color)' }}
                  />
                </div>

                <ul className="space-y-3">
                  {category.skills.map((skill) => (
                    <li key={skill.name} className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium truncate" style={{ color: 'var(--text-secondary)' }}>
                            {skill.name}
                          </span>
                          <span
                            className="shrink-0 text-[9px] font-ticker font-bold ml-2 px-1.5 py-0.5 rounded"
                            style={{
                              color: opinionColor(skill.opinion),
                              background: opinionBg(skill.opinion),
                            }}
                          >
                            {skill.opinion}
                          </span>
                        </div>
                        {/* Skill weight bar */}
                        <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: 'var(--surface-border)' }}>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.weight}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 + 0.5, duration: 0.8, ease: 'easeOut' }}
                            className="h-full rounded-full"
                            style={{ background: opinionColor(skill.opinion), opacity: 0.7 }}
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
