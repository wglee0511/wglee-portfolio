"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Code, Calendar } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    {
      title: "Code Slugger",
      period: "2026.02 ~ 2026.03",
      category: "Mobile Game (B2C)",
      description: "회원가입 없이 바로 시작할 수 있는 숫자 추리 게임 앱. 이탈 없는 온보딩, 기기 변경 시에도 데이터 유지, 결제·광고까지 자연스럽게 이어지는 수익화 구조를 갖춘 실서비스.",
      highlights: [
        "Supabase Auth 기반 익명 로그인 — 회원가입 없이 앱 실행 즉시 플레이 가능",
        "8자리 Recovery ID 기반 계정 복구 플로우로 기기 변경·재설치 시에도 연속성 유지",
        "React Query Optimistic Update로 코인 소모·획득·힌트 구매 즉시 반영, 실패 시 자동 롤백",
        "Supabase Edge Function에서 실제 코인 차감 로직 처리로 클라이언트 조작 방지 및 데이터 무결성 확보",
        "720개 후보군에서 이전 결과 기반 불가능한 후보를 제거하는 AI 추리 로직, 평균 4~5회 내 정답 도달",
        "한국어·영어·일본어·번체중국어·스페인어 5개 언어, 라이트/다크/시스템 테마 지원",
        "인앱결제 + 광고를 게임 경제 구조와 연결한 수익화 흐름 구현"
      ],
      tech: ["React Native", "React Query", "Supabase Auth", "PostgreSQL", "Edge Functions", "i18n"],
      link: "https://github.com/wglee0511/code-slugger"
    },
    {
      title: "암호화폐 자동매매 시스템",
      period: "2025.01 ~ 2025.02",
      category: "System Engineering",
      description: "업비트 실계좌 연동, 24시간 자동 동작하는 암호화폐 자동매매 시스템. 단순 매수·매도가 아닌 시장 판단·리스크 관리·배포 자동화·운영 알림까지 포함한 실운영형 시스템.",
      highlights: [
        "EMA, RSI, MACD, Bollinger Bands, Stochastic RSI 조합 — 시장 상태 판별 후 진입 여부 결정하는 구조 설계",
        "ATR 비율과 볼린저 밴드 폭을 결합한 횡보/추세 구간 판별 추세 필터",
        "최근 20봉 저점 + ATR 기반 동적 손절가 계산, R:R 1:2 기준 익절가 자동 산출",
        "UBMI/UBAI 모니터링으로 급락 시 신규 진입 차단 및 보유 포지션 정리 로직 적용",
        "GitHub Actions + Docker + GCP 자동 배포, Slack 매수/매도/오류 이벤트 및 정기 리포트 전송",
        "과거 캔들 데이터 기반 백테스트 환경 — 수수료·승률·평균 수익·평균 손실 자동 집계"
      ],
      tech: ["Python 3.11", "pandas", "numpy", "ta", "Docker", "GCP", "GitHub Actions"],
      link: null
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
          <h2 className="fluid-h2 font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>아이디어를 현실로 구현한 주요 프로젝트들입니다.</p>
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
              <div className="h-48 md:h-56 flex items-center justify-center relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, var(--surface), var(--card-bg))' }}
              >
                <div className="absolute inset-0 group-hover:bg-transparent transition-colors duration-500 z-10" style={{ background: 'rgba(0,0,0,0.1)' }} />

                {/* Decorative glowing orb behind icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent-blue/20 rounded-full blur-[40px] group-hover:bg-accent-magenta/20 group-hover:scale-150 transition-all duration-700" />

                <Code size={48} className="text-accent-blue/40 group-hover:text-accent-magenta/60 transition-colors duration-500 relative z-20 group-hover:scale-110 transform" />

                <div className="absolute top-6 left-6 z-20">
                  <span
                    className="px-4 py-1.5 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest"
                    style={{
                      background: 'rgba(0,0,0,0.5)',
                      border: '1px solid var(--card-border)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow" style={{ background: 'var(--surface)' }}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-2xl font-bold tracking-tight group-hover:text-accent-blue transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                    {project.title}
                  </h3>
                  <span className="flex items-center gap-1.5 text-[11px] font-medium shrink-0 mt-1" style={{ color: 'var(--text-muted)' }}>
                    <Calendar size={12} />
                    {project.period}
                  </span>
                </div>
                <p className="text-sm md:text-base mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {project.description}
                </p>

                <ul className="space-y-3 mb-10 flex-grow">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="text-[13px] flex items-start gap-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                       <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-accent-purple to-accent-magenta mt-1.5 shrink-0" />
                       {h}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-10 mt-auto">
                  {project.tech.map(t => (
                    <span
                      key={t}
                      className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-md transition-colors"
                      style={{
                        background: 'var(--surface)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--surface-border)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <div className="flex items-center gap-6 pt-6" style={{ borderTop: '1px solid var(--surface-border)' }}>
                    <a href={project.link} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-semibold transition-colors group/link w-fit hover:text-white"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <Github size={18} className="group-hover/link:text-accent-blue transition-colors" /> Source Code
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
