"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Monitor, Database, Settings } from 'lucide-react';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Monitor size={24} />,
      skills: ["React", "Next.js", "TypeScript", "Redux (Saga · Toolkit)", "Zustand", "MobX", "React Query", "TailwindCSS", "D3.js", "Vite", "i18next"]
    },
    {
      title: "Native / Desktop",
      icon: <Smartphone size={24} />,
      skills: ["React Native", "Jetpack Compose", "Jetpack Glance", "Electron", "Swift", "Kotlin"]
    },
    {
      title: "Infra & Tools",
      icon: <Database size={24} />,
      skills: ["AWS", "GCP", "Docker", "Firebase", "Supabase", "GitHub Actions", "Fastlane", "Storybook"]
    },
    {
      title: "Dev Suite",
      icon: <Settings size={24} />,
      skills: ["Claude Code", "Cursor", "PostgreSQL", "React Native Skia", "Python"]
    }
  ];

  return (
    <section id="skills" className="py-24 px-6 relative overflow-visible">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
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
              className="glass p-8 rounded-[2rem] hover:border-accent-blue/40 hover:shadow-[0_20px_40px_-15px_rgba(0,225,255,0.15)] transition-all group relative overflow-hidden"
            >
              {/* Subtle hover gradient inside card */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/0 via-transparent to-accent-purple/0 group-hover:from-accent-blue/5 group-hover:to-accent-purple/5 transition-colors duration-500" />

              <div className="relative z-10">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-accent-blue/10 group-hover:shadow-[0_0_20px_rgba(0,225,255,0.2)] transition-all"
                  style={{ background: 'var(--surface)' }}
                >
                  <div className="group-hover:text-accent-blue transition-colors" style={{ color: 'var(--text-secondary)' }}>
                    {category.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-6 tracking-tight" style={{ color: 'var(--text-primary)' }}>{category.title}</h3>
                <ul className="space-y-4">
                  {category.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-3 text-sm font-medium group-hover:text-gray-300 transition-colors" style={{ color: 'var(--text-secondary)' }}>
                      <div className="w-[5px] h-[5px] rounded-full group-hover:bg-accent-blue/60 transition-colors" style={{ background: 'var(--surface-border)' }} />
                      {skill}
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
