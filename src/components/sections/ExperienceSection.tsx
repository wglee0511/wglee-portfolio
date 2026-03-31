"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Building2, ChevronRight, ChevronDown, TrendingDown, TrendingUp } from 'lucide-react';

interface Task {
  title: string;
  items: string[];
}

interface Experience {
  company: string;
  url: string;
  role: string;
  period: string;
  description: string;
  tasks: Task[];
  tags: string[];
}

/* Parse metric strings like "(-69%)" or "(-26%)" and render as badges */
const renderItemWithBadges = (text: string) => {
  // Match patterns like (-69%) or (+26%) or (-140ms) etc.
  const parts = text.split(/(\([-+][^)]+\))/g);
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part, i) => {
        const isMetric = /^\([-+]/.test(part);
        if (!isMetric) return <span key={i}>{part}</span>;
        const isDown = part.startsWith('(-');
        return (
          <span
            key={i}
            className="inline-flex items-center gap-0.5 font-ticker font-bold mx-1 px-1.5 py-0.5 rounded text-[11px] align-middle"
            style={{
              color: isDown ? 'var(--down-color)' : 'var(--up-color)',
              background: isDown ? 'rgba(255,71,87,0.1)' : 'rgba(0,208,132,0.1)',
              border: `1px solid ${isDown ? 'rgba(255,71,87,0.2)' : 'rgba(0,208,132,0.2)'}`,
            }}
          >
            {isDown ? <TrendingDown size={9} /> : <TrendingUp size={9} />}
            {part.slice(1, -1)}
          </span>
        );
      })}
    </>
  );
};

const ExperienceSection = () => {
  const [openTasks, setOpenTasks] = useState<Record<string, boolean>>({});

  const toggleTask = (key: string) => {
    setOpenTasks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const experiences: Experience[] = [
    {
      company: "주식회사 루티너리 (Routinery Inc.)",
      url: "https://www.routinery.app/ko",
      role: "프론트엔드 개발자 (프로덕트 팀)",
      period: "2024.11 - 현재",
      description: "200개 국가, 500만 명 이상이 사용하는 루틴·습관 플래너 앱",
      tasks: [
        {
          title: "앱 전반 성능 개선",
          items: [
            "React Query 구독 구조 재설계 및 Selector 패턴 적용으로 불필요한 리렌더링 제거",
            "Zustand 스토어 중복 통합, computed 기반 파생 상태 최적화, hydration 완료 후 지연 초기화 구조로 전환",
            "Xcode Organizer 실사용자 지표(P50/P95) 기반으로 개선 전후 직접 측정 및 검증",
            "Peak Memory(P95): 958.5MB → 297.4MB (-69%)",
            "Launch Time(P50): 540ms → 400ms (-140ms, -26%)",
          ]
        },
        {
          title: "Android / iOS 체크리스트 위젯 신규 개발",
          items: [
            "Zustand 스토어 변경 → Shared Storage → 앱 진입 시 데이터 병합 → Firestore 순차 동기화로 앱-위젯 상태 동기화 파이프라인 설계",
            "수정 시각 기반 item 단위 충돌 해결 로직으로 앱·위젯 동시 수정 시 데이터 정합성 확보",
            "iOS 17+ AppIntents 기반 인터랙티브 위젯, Android suspend 기반 단계형 갱신 처리 등 플랫폼별 UX 구현",
            "4종 위젯 설정 화면 공통 컴포넌트 구조화로 신규 위젯 확장 비용 절감",
          ]
        },
        {
          title: "Android 홈 위젯 시스템 현대화",
          items: [
            "Grid / Calendar / Weekly / Streak 4종 위젯을 RemoteViews에서 Jetpack Glance 기반으로 전면 재작성",
            "레거시 코드 약 1,600라인 및 불필요한 drawable variant 28개 제거",
            "런타임 크기 기반 반응형 레이아웃 구현 (Calendar 셀 자동 조정, Weekly 레이아웃 자동 전환)",
            "DataStore 기반으로 위젯 상태 저장 구조 개선, 프로세스 재시작 시 상태 소실 문제 해결",
            "Receiver 클래스명 유지 + 내부 구현 교체 방식으로 기존 사용자 위젯을 유지한 채 무중단 마이그레이션 수행",
          ]
        },
        {
          title: "Wear OS 앱 UI 시스템 현대화",
          items: [
            "Android Wear OS 모듈 UI를 기존 XML 레이아웃에서 100% Jetpack Compose로 마이그레이션",
            "Compose 환경에 맞는 커스텀 테마(Color / Typography / Shape) 및 디자인 시스템 재구축",
            "State 기반 UI 구조 적용으로 데이터 변경에 즉각 반응하는 동적 화면 구현",
            "WearDataLayer(DataClient)를 통해 메인 앱 데이터 변경 시 워치 UI 자동 갱신 연동",
          ]
        },
        {
          title: "Android Geofence 기반 위치 알림 모듈 개발",
          items: [
            "React Native Headless JS, 네이티브 모듈, BroadcastReceiver를 활용해 앱 종료 상태에서도 동작하는 백그라운드 이벤트 처리 구조 설계",
            "사용자 설정에 따라 Geofence 동적 등록/해제 구현으로 장소 연계 루틴 알림 기능 제공",
          ]
        },
        {
          title: "CI/CD 자동화 인프라 구축 (Fastlane)",
          items: [
            "iOS DEV/PROD 빌드 파이프라인 단독 구축 — Firebase App Distribution 테스터 배포, TestFlight 업로드(심사 제출 분리), package.json 버전 자동 동기화(sync_version lane)",
            "Android DEV APK / PROD APK / PROD AAB 빌드 자동화 — Google Play Internal Testing 업로드, git rev-list --count 기반 versionCode 자동 계산",
            "빌드 완료 시 Slack Dev 그룹 자동 알림 연동",
          ]
        },
      ],
      tags: ["React Native", "React", "TypeScript", "Swift", "Kotlin", "Zustand", "MobX", "Firestore", "Fastlane", "Firebase App Distribution", "GitHub Actions", "i18next"]
    },
    {
      company: "주식회사 메이크델타 (Make Delta Inc.)",
      url: "https://makedelta.io/",
      role: "프론트엔드 개발자 (프로덕트 팀)",
      period: "2023.07 - 2024.04",
      description: "20,000+ 직장인 트레이더가 사용하는 모바일 트레이딩 분석 서비스 스타트업",
      tasks: [
        {
          title: "암호화폐 트레이딩 전략 기반 실시간 알림 앱 개발 (iOS / Android)",
          items: [
            "40종 이상의 기술적 지표(RSI · MACD · 볼린저 밴드 · 일목균형표 등)를 Atom → Molecule → Strategy 계층 구조로 조합하는 커스텀 전략 빌더 구현, 8개 거래소 멀티 마켓 지원",
            "FCM + Notifee 기반 전략 트리거 알림 구현, 앱 상태(포그라운드/백그라운드/종료)에 관계없이 일관된 알림 수신 보장",
            "Apple / Google 인앱 구독 결제(IAP) 3단계 요금제 통합 구현",
          ]
        },
        {
          title: "트레이딩 차트 및 시세조회 웹뷰 페이지",
          items: [
            "Canvas API로 캔들스틱 지표 라인을 픽셀 단위 직접 렌더링해 DOM 재계산 없이 고빈도 리드로우 처리",
            "D3의 scaleTime · scaleLinear · zoom · drag를 활용한 줌/패닝, 크로스헤어, 툴팁 구현",
            "Vite manualChunks로 대형 라이브러리를 개별 청크 분리 + React.lazy + Suspense로 지연 로딩 전환 → 번들 크기 43% 절감 (-43%)",
          ]
        },
        {
          title: "주식 트레이딩 분석 앱 출시",
          items: [
            "iOS / Android 초기 설정 및 구조 설계, 배포, 심사 프로세스 전담",
            "WebView + Canvas 기반 암호화폐 앱과 달리 네이티브 렌더링 성능 확보를 위해 React Native Skia로 캔들 차트 구현",
          ]
        },
        {
          title: "모바일 디자인 시스템 구축",
          items: [
            "파운데이션(Color · Typography · Spacing) 토큰부터 컴포넌트까지 0→1 설계 및 배포 전담",
            "Storybook 웹 배포로 컴포넌트 사용 예시 제공, GitHub Actions 기반 GitHub Package 자동 배포 파이프라인 구축",
            "디자이너와 협업하여 토큰 정의 → 컴포넌트 스펙 → 코드 구현 프로세스 정립",
          ]
        },
      ],
      tags: ["React Native", "React", "TypeScript", "Vite", "D3.js", "Storybook", "GitHub Actions", "AWS", "Fastlane"]
    },
    {
      company: "주식회사 페이히어 (Payhere Inc.)",
      url: "https://payhere.in/",
      role: "프론트엔드 개발자 (프로덕트 팀)",
      period: "2021.12 - 2023.06",
      description: "48,000+ 가맹점이 이용하는 오프라인 매장용 결제 서비스(POS) 스타트업",
      tasks: [
        {
          title: "고객 관리 프리미엄 기능 개발",
          items: [
            "48,000+ 가맹점 중 유료 구독 전환 확대를 목표로, 유저 보이스 기반 스탬프 적립·쿠폰 발송·고객관리 분석 시각화 등 신규 기능 개발",
            "Firebase Analytics 기반 사용자 행동 분석으로 이탈 구간 파악 및 UI/UX 개선 리팩토링 진행",
          ]
        },
        {
          title: "고객 대면 앱 출시 (0→1)",
          items: [
            "매장-고객 간 포인트/스탬프 적립, 카드 서명 등 대면 결제 흐름을 처리하는 앱 신규 개발",
            "iOS / Android 초기 설정 및 구조 설계, 배포, 심사 프로세스 전담",
            "Pusher 기반 실시간 채널로 매장 앱과 고객 앱 간 결제 이벤트 동기화 구현",
          ]
        },
        {
          title: "네이버 플레이스 예약 연동",
          items: [
            "네이버 플레이스 측과 API 설계, 에러 케이스 정의 등 외부 협의 참여",
            "연동 UI·상품 구성 페이지 등 클라이언트 기능 개발, WebView 초기 설정 및 캐시충전·메시지 전송 페이지 구현",
            "출시 후 주기적인 모니터링 및 리팩토링으로 안정성 유지",
          ]
        },
        {
          title: "예약업 온라인 스토어 웹 앱 개발",
          items: [
            "React 기반 비대면 주문 웹 앱 개발",
            "예약 캘린더, 매장 지도 표기, 휴대폰 인증 등 핵심 기능 개발",
            "AWS S3/Route53/CloudFront 기반 정적 배포 구성",
          ]
        },
      ],
      tags: ["React", "React Native", "TypeScript", "Electron", "Next.js", "Redux Saga", "AWS"]
    }
  ];

  return (
    <section id="experience" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-24"
        >
          {/* HTS label */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-md text-[10px] font-ticker font-bold uppercase tracking-widest"
            style={{
              background: 'var(--hts-header)',
              border: '1px solid var(--hts-border)',
              color: 'var(--text-muted)',
            }}
          >
            <span style={{ color: 'var(--up-color)' }}>■</span>
            실적 발표 (Earnings History)
          </div>
          <h2 className="fluid-h2 font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>성장하는 팀에서 핵심적인 가치를 만들어온 여정입니다.</p>
        </motion.div>

        <div className="space-y-16">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.15, duration: 0.7, ease: "easeOut" }}
              className="relative pl-8 md:pl-12 group"
              style={{ borderLeft: '1px solid var(--timeline-border)' }}
            >
              {/* Timeline dot */}
              <div
                className="absolute left-[-6px] top-1 w-3 h-3 rounded-full border-2 group-hover:scale-125 transition-all duration-300"
                style={{
                  background: 'var(--up-color)',
                  borderColor: 'var(--background)',
                  boxShadow: '0 0 15px rgba(0,208,132,0.5)',
                }}
              />

              <div className="mb-4 flex flex-col gap-2 font-medium tracking-wide">
                <span
                  className="flex items-center gap-1.5 py-1 px-3 rounded-full border w-fit text-xs font-ticker"
                  style={{
                    background: 'var(--surface)',
                    borderColor: 'var(--surface-border)',
                    color: 'var(--text-muted)',
                  }}
                >
                  <Calendar size={12} style={{ color: 'var(--up-color)' }} /> {exp.period}
                </span>
                <a
                  href={exp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-2xl md:text-3xl font-bold tracking-tight hover:underline underline-offset-4 w-fit"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <Building2 size={22} style={{ color: 'var(--up-color)' }} className="shrink-0" /> {exp.company}
                </a>
              </div>

              <h3 className="text-sm font-semibold mb-4 tracking-wide font-ticker" style={{ color: 'var(--text-muted)' }}>
                {exp.role}
              </h3>
              <p className="mb-8 leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>{exp.description}</p>

              <div className="space-y-3 mb-8">
                {exp.tasks.map((task, taskIdx) => {
                  const key = `${exp.company}-${taskIdx}`;
                  const isOpen = openTasks[key] ?? false;
                  return (
                    <div
                      key={taskIdx}
                      className="rounded-xl overflow-hidden"
                      style={{
                        background: 'var(--card-bg)',
                        border: '1px solid var(--hts-border)',
                      }}
                    >
                      <button
                        onClick={() => toggleTask(key)}
                        className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors hover:bg-white/[0.02]"
                      >
                        <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{task.title}</span>
                        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} className="shrink-0" />
                        </motion.div>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <ul className="px-6 pb-5 space-y-3 pt-4" style={{ borderTop: '1px solid var(--surface-border)' }}>
                              {task.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                  <ChevronRight size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--up-color)' }} />
                                  <span>{renderItemWithBadges(item)}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-2.5">
                {exp.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-colors cursor-default font-ticker"
                    style={{
                      background: 'var(--tag-bg)',
                      color: 'var(--tag-text)',
                      border: '1px solid var(--tag-border)',
                    }}
                  >
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
