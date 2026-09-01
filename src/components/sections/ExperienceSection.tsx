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
      period: "2024.11 - 2026.07 (1년 9개월)",
      description: "200개 국가, 500만 명 이상이 사용하는 루틴·습관 플래너 앱",
      tasks: [
        {
          title: "AI 개발 하네스 구축 및 팀 배포",
          items: [
            "코드 리뷰·타입 검증·빌드 진단을 자동화하는 AI 개발 환경을 단독 설계해 단계적으로 도입하고 팀 전체에 배포",
            "파일 편집 시 ESLint 자동 수정, 작업 종료 시 타입 검증 후 차단하는 검증 계층 구성 — 레거시 에러가 누적된 코드베이스에서 신규 작성 코드에만 품질 게이트 적용",
            "React Native 코드 리뷰 서브에이전트 도입 — 프로젝트에서 실제 발생한 크래시 패턴과 성능 안티패턴을 자동 검사 항목으로 규칙화",
            "iOS/Android 빌드 진단 서브에이전트 도입 — 긴 Xcode·Gradle 로그를 격리된 컨텍스트에서 분석해 원인만 반환, 자동 수정 권한을 제거하고 진단·보고로 역할 한정",
            "Linear·Figma MCP 연동으로 티켓 컨텍스트 자동 로드 및 디자인 기반 구현 흐름 구성, 동일 하네스를 Codex 환경으로 포팅해 특정 도구 종속성 제거",
            "팀원 온보딩 문서 작성 후 PR 리뷰를 거쳐 도입, 이후 다른 팀원들이 규칙을 추가하며 공동 운영",
          ]
        },
        {
          title: "메모리 누수 해결로 OutOfMemoryError 제거",
          items: [
            "Reanimated SharedValue 정리 누락으로 발생하던 네이티브 힙 누수를 추적해 OutOfMemoryError 크래시 해결",
            "공용 cleanup 훅 설계 — 언마운트 시 cancelAnimation 일괄 호출, isMounted 플래그로 언마운트 후 worklet 콜백 실행 차단. 화면마다 개별 정리하던 구조를 훅 하나로 통일",
            "온보딩 슬라이드(14개)·타이머 서클(6개)·비교 애니메이션(4개) 등 SharedValue 24개를 훅에 등록",
            "Android Native Heap 계측으로 개선 전후 직접 측정",
            "Total Allocations: 101.9MB → 31.2MB (-69%)",
            "Remaining Size: 31.2MB → 11.0MB (-65%)",
          ]
        },
        {
          title: "ANR 해결 — 분석 로깅의 메인 스레드 블로킹 제거",
          items: [
            "이벤트 로깅 함수 하나가 분석 SDK 6종 호출과 로컬 저장소 I/O 2건을 동기 실행해 UI 렌더링 중 메인 스레드를 0.5~2초 점유, 화면 전환 시점과 겹치며 ANR 유발",
            "InteractionManager로 무거운 작업을 렌더링 완료 이후로 분리하고 네이티브 브리지 호출을 병렬화",
          ]
        },
        {
          title: "콜드 스타트 계측 체계 구축 및 지연 로딩 검증",
          items: [
            "시작 단계별 구간을 마커로 계측하는 스크립트 작성 — 워밍업 제외 후 n=10 중앙값·p95로 개선 전후 비교",
            "내비게이션 화면 62개를 React.lazy로 전환해 콜드 스타트 JS 평가 대상에서 제외, Debug 빌드 기준 Splash 초기화 (-24.4%) · JS 총 로딩 (-21.8%) 확인",
            "프로덕션 시작 단계별 duration을 Amplitude로 전송하는 telemetry 구축",
            "프로덕션 지표 확인 후 지연 로딩을 최종 제거 — Suspense·스켈레톤의 화면 전환 비용이 시작 시간 이득보다 크다고 판단. 측정 체계와 telemetry는 유지",
          ]
        },
        {
          title: "상태 관리 구조 개선",
          items: [
            "서버 상태를 스토어로 복사하던 구조를 걷어내 React Query가 서버 상태를 소유하도록 정리, Zustand는 구독 단위를 필요한 값으로 좁혀 불필요한 리렌더링 제거",
            "스토어 21개의 중복 통합 및 computed 기반 파생 상태 최적화, 스토어별 version·migrate로 저장 구조 변경 대응",
            "MobX → Zustand 마이그레이션 — 완료 플래그로 1회만 실행하고, 실패 시 앱이 중단되지 않도록 예외를 격리해 리포팅만 수행",
            "타임라인 뷰 토글 시 삼항 분기로 무거운 Reanimated·제스처 트리가 통째로 리마운트되며 누를 때마다 약 20MB가 회수되지 않던 누수를 lazy mount + keep-alive로 수정",
            "시간 경과형 메모리 증가 2건을 Instruments로 원인 분리하고 링 버퍼·윈도우 캡 방식으로 설계 제안 (원본 이력 보존 전제)",
          ]
        },
        {
          title: "위젯 시스템 설계 및 현대화 (Android / iOS / Wear OS)",
          items: [
            "Zustand 스토어 변경 → Shared Storage → 앱 진입 시 데이터 병합 → Firestore 순차 동기화로 앱-위젯 상태 동기화 파이프라인 설계",
            "수정 시각 기반 item 단위 충돌 해결 로직으로 앱·위젯 동시 수정 시 데이터 정합성 확보",
            "Grid / Calendar / Weekly / Streak / CheckList 5종 위젯을 RemoteViews에서 Jetpack Glance로 전면 재작성, Receiver 클래스명과 패키지 경로를 유지한 채 내부 구현만 교체해 기존 사용자 위젯을 깨뜨리지 않는 무중단 마이그레이션 수행",
            "iOS 17+ AppIntents 기반 인터랙티브 위젯, Android suspend 기반 단계형 갱신 처리 등 플랫폼별 UX 구현",
            "DataStore 기반으로 위젯 상태 저장 구조를 개선해 프로세스 재시작 시 상태 소실 문제 해결, 런타임 크기 기반 반응형 레이아웃 적용",
            "Wear OS 모듈 UI를 XML 레이아웃에서 Jetpack Compose로 마이그레이션하고 WearDataLayer(DataClient)로 메인 앱 데이터 변경 시 워치 UI 자동 갱신 연동",
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
            "iOS DEV/PROD 빌드 파이프라인 단독 구축 — Firebase App Distribution 테스터 배포, TestFlight 업로드, 앱 버전 자동 동기화",
            "Android DEV APK / PROD APK / PROD AAB 빌드 자동화 — Google Play Internal Testing 업로드, versionCode 자동 계산",
            "package.json을 버전 단일 원본으로 두고 빌드 번호를 커밋 수에서 파생해 수동 증가 누락·중복 제거",
            "스토어 업로드까지만 자동화하고 실제 출시는 사람이 판단하도록 분리 (TestFlight 심사 제출 skip, Play 내부 테스트 draft 업로드)",
            "빌드 완료 시 Slack 자동 알림 연동으로 배포 상태 공유",
          ]
        },
        {
          title: "자체 CodePush 배포 인프라 구축 및 데이터 유실 방어",
          items: [
            "App Center 종료에 대응해 S3 + CloudFront 기반 자체 번들 배포 체계 구성 (릴리스·롤백 워크플로, Sentry 소스맵 업로드 연동)",
            "릴리스 히스토리를 CDN에서 읽을 경우 캐시된 404·구버전 응답을 빈 히스토리로 오인해 이전 배포 이력 전체가 소실될 수 있는 결함을 발견",
            "읽기 경로를 S3 원본으로 고정하고, 쓰기 전 기존 히스토리의 상위집합 여부를 검증해 손실이 발생하면 쓰기를 중단하도록 방어 로직 추가",
          ]
        },
      ],
      tags: ["React Native", "React", "TypeScript", "Swift", "Kotlin", "Jetpack Compose", "Jetpack Glance", "Wear OS", "Zustand", "Firestore", "Fastlane", "GitHub Actions", "Claude Code"]
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
