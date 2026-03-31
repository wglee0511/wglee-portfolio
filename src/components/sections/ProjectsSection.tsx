"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Code, Calendar, TrendingUp, TrendingDown, ChevronDown } from 'lucide-react';
import Image from 'next/image';

const projects = [
  {
    symbol: "CSLUGG",
    title: "Code Slugger",
    period: "2026.02 ~ 2026.03",
    category: "Mobile Game (B2C)",
    sector: "Consumer / Game",
    price: "₩ 4,200",
    change: "+12.5%",
    up: true,
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
    link: null,
    appStoreLink: "https://apps.apple.com/kr/app/code-slugger/id6759213279",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/96/9f/d0/969fd098-adec-5761-a674-6d03dbecb562/Placeholder.mill/230x0w.png",
    screenshots: [
      "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/fc/30/a3/fc30a32c-31b5-3dd7-f45b-d53a21dc4a14/IMG_6859_appstore_1242x2688.png/300x0w.png",
      "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/0a/61/67/0a6167a1-f13f-1948-05fe-ded7da3342e5/IMG_6860_appstore_1242x2688.png/300x0w.png",
      "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/22/2d/60/222d60cb-3aa2-e285-cb3f-38e6566094ba/IMG_6861_appstore_1242x2688.png/300x0w.png",
    ]
  },
  {
    symbol: "CRYPTOBOT",
    title: "암호화폐 자동매매 시스템",
    period: "2025.01 ~ 2025.02",
    category: "System Engineering",
    sector: "Fintech / Infra",
    price: "₩ 7,850",
    change: "+34.7%",
    up: true,
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
    link: null,
    appStoreLink: null,
    icon: null,
    screenshots: null,
  }
];

interface Project {
  symbol: string;
  title: string;
  period: string;
  category: string;
  sector: string;
  price: string;
  change: string;
  up: boolean;
  description: string;
  highlights: string[];
  tech: string[];
  link: string | null;
  appStoreLink: string | null;
  icon: string | null;
  screenshots: string[] | null;
}

const ProjectCard = ({ project, idx }: { project: Project; idx: number }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: idx * 0.15, duration: 0.7, ease: "easeOut" }}
      className="rounded-2xl overflow-hidden group"
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--hts-border)',
      }}
    >
      {/* Header: stock list row */}
      <div
        className="flex items-center gap-4 px-5 py-3 border-b"
        style={{
          background: 'var(--hts-header)',
          borderColor: 'var(--hts-border)',
        }}
      >
        <span className="font-ticker text-sm font-bold" style={{ color: 'var(--up-color)' }}>
          {project.symbol}
        </span>
        <span className="text-xs flex-1" style={{ color: 'var(--text-muted)' }}>
          {project.sector}
        </span>
        <div className="flex items-center gap-2">
          <span className="font-ticker text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
            {project.price}
          </span>
          <span
            className="inline-flex items-center gap-1 font-ticker text-xs font-bold px-2 py-0.5 rounded"
            style={{
              color: project.up ? 'var(--up-color)' : 'var(--down-color)',
              background: project.up ? 'rgba(0,208,132,0.1)' : 'rgba(33,150,243,0.1)',
            }}
          >
            {project.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {project.change}
          </span>
        </div>
      </div>

      {/* Screenshot / Hero area */}
      <div className="h-48 md:h-56 flex items-center justify-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--surface), var(--card-bg))' }}
      >
        {project.screenshots ? (
          <>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0f1624 0%, #1a1f35 50%, #0d1520 100%)' }} />
            <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(0,208,132,0.2) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(33,150,243,0.12) 0%, transparent 60%)' }} />

            {/* App icon */}
            {project.icon && (
              <div className="absolute top-5 left-5 z-20">
                <Image src={project.icon} alt="icon" width={48} height={48} className="rounded-xl shadow-lg" unoptimized />
              </div>
            )}

            <div className="relative flex items-end justify-center gap-3 h-full pt-4 pb-0 z-10">
              <div className="relative w-[90px] translate-y-4 -rotate-3 shadow-2xl rounded-[12px] overflow-hidden opacity-80 group-hover:opacity-100 group-hover:-rotate-2 group-hover:translate-y-2 transition-all duration-500">
                <Image src={project.screenshots[1]} alt="screenshot 2" width={90} height={195} className="w-full h-auto" unoptimized />
              </div>
              <div className="relative w-[100px] shadow-[0_20px_50px_rgba(0,208,132,0.2)] rounded-[12px] overflow-hidden group-hover:-translate-y-1 transition-all duration-500 z-10">
                <Image src={project.screenshots[0]} alt="screenshot 1" width={100} height={217} className="w-full h-auto" unoptimized />
              </div>
              <div className="relative w-[90px] translate-y-4 rotate-3 shadow-2xl rounded-[12px] overflow-hidden opacity-80 group-hover:opacity-100 group-hover:rotate-2 group-hover:translate-y-2 transition-all duration-500">
                <Image src={project.screenshots[2]} alt="screenshot 3" width={90} height={195} className="w-full h-auto" unoptimized />
              </div>
            </div>

            {project.appStoreLink && (
              <a
                href={project.appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-5 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold backdrop-blur-md transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                App Store
              </a>
            )}
          </>
        ) : (
          <>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0f1624, #1a1f35)' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-[50px] group-hover:scale-150 transition-all duration-700" style={{ background: 'rgba(0,208,132,0.15)' }} />
            <Code size={48} className="relative z-10 transition-colors duration-500" style={{ color: 'rgba(0,208,132,0.5)' }} />
          </>
        )}

        {/* Category badge */}
        <div className="absolute top-5 right-5 z-20">
          <span className="px-3 py-1.5 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest font-ticker"
            style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {project.title}
          </h3>
          <span className="flex items-center gap-1.5 text-[11px] font-medium shrink-0 mt-1 font-ticker" style={{ color: 'var(--text-muted)' }}>
            <Calendar size={12} />
            {project.period}
          </span>
        </div>

        <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map(t => (
            <span
              key={t}
              className="text-[10px] uppercase font-bold px-2.5 py-1 rounded font-ticker"
              style={{
                background: 'var(--surface)',
                color: 'var(--text-muted)',
                border: '1px solid var(--surface-border)',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Expandable highlights */}
        <button
          onClick={() => setExpanded(e => !e)}
          className="flex items-center gap-2 text-xs font-semibold mt-2 transition-colors"
          style={{ color: 'var(--up-color)' }}
        >
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={14} />
          </motion.div>
          {expanded ? '상세 숨기기' : '상세 보기 (종목 분석)'}
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden mt-4 space-y-2.5"
            >
              {project.highlights.map((h, i) => (
                <li key={i} className="text-[13px] flex items-start gap-2.5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: 'var(--up-color)' }} />
                  {h}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {project.link && (
          <div className="flex items-center gap-6 pt-4 mt-4" style={{ borderTop: '1px solid var(--surface-border)' }}>
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold transition-colors w-fit"
              style={{ color: 'var(--text-secondary)' }}
            >
              <Github size={18} /> Source Code
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20"
        >
          {/* HTS header */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-md text-[10px] font-ticker font-bold uppercase tracking-widest"
            style={{
              background: 'var(--hts-header)',
              border: '1px solid var(--hts-border)',
              color: 'var(--text-muted)',
            }}
          >
            <span style={{ color: 'var(--up-color)' }}>■</span>
            포트폴리오 계좌 편입 종목 (Portfolio Holdings)
          </div>
          <h2 className="fluid-h2 font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>아이디어를 현실로 구현한 주요 프로젝트들입니다.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={project.symbol} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
