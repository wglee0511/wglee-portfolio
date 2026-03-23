"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Mail } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-[10%] w-[30vw] h-[30vw] min-w-[300px] min-h-[300px] bg-accent-blue/5 rounded-full blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-[10%] w-[40vw] h-[40vw] min-w-[400px] min-h-[400px] bg-accent-purple/5 rounded-full blur-[120px] animate-pulse delay-700 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-center z-10 px-6 w-full max-w-5xl mx-auto"
      >
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 mb-8 text-xs sm:text-sm font-semibold tracking-widest uppercase text-accent-blue bg-accent-blue/10 rounded-full border border-accent-blue/20 shadow-[0_0_20px_rgba(0,225,255,0.1)]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
            Frontend Developer
          </span>
        </motion.div>
        
        <h1 className="fluid-h1 font-bold mb-8 text-white">
          <span className="text-gradient">이원교</span>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-400 mb-12 leading-relaxed"
        >
          웹과 앱의 경계를 허무는 4년+ 프론트엔드 개발자입니다. <br className="hidden sm:block"/>
          사용자 경험을 중시하며, 효율적인 사내 도구와 컴포넌트 라이브러리 제작에 열정이 있습니다.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16"
        >
          <motion.a
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="https://github.com/wglee0511"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 glass rounded-full hover:bg-white/10 hover:border-white/20 transition-all font-medium text-sm sm:text-base"
          >
            <Github size={20} />
            <span>GitHub Profile</span>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.02, y: -2, boxShadow: '0 10px 30px -10px rgba(255,255,255,0.3)' }}
            whileTap={{ scale: 0.98 }}
            href="mailto:ranazang@naver.com"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-foreground text-background rounded-full font-bold hover:bg-white transition-all text-sm sm:text-base"
          >
            <Mail size={20} />
            <span>Contact Me</span>
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll Discover</span>
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown size={24} className="text-accent-blue/50" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
