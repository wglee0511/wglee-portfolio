"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, ExternalLink } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-accent-blue/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="fluid-h1 font-bold mb-6 text-white tracking-tight">
            Let&apos;s Build <br className="md:hidden"/>
            <span className="text-gradient">Something Great</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            새로운 도전을 환영합니다. 매력적인 프로덕트를 함께 만들어갈 기회를 찾고 계신다면, 
            언제든 편하게 연락해 주세요.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: '0 10px 40px -10px rgba(255,51,153,0.3)' }}
            whileTap={{ scale: 0.95 }}
            href="mailto:ranazang@naver.com"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-accent-purple to-accent-magenta text-white rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-lg"
          >
            <Mail size={24} />
            Send Email
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/wglee0511"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 glass rounded-full hover:bg-white/10 transition-all font-medium text-lg"
          >
            <Github size={24} />
            GitHub
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href="https://velog.io/@wglee0511"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 glass rounded-full hover:bg-white/10 transition-all font-medium text-lg"
          >
            <ExternalLink size={24} />
            Velog
          </motion.a>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.8, duration: 1 }}
           className="mt-24 text-gray-500 text-sm font-medium tracking-wide"
        >
          <p>Available for new opportunities.</p>
        </motion.div>
      </div>
      {/* Decorative Blur */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-accent-magenta/5 rounded-full blur-[100px]" />
    </section>
  );
};

export default ContactSection;
