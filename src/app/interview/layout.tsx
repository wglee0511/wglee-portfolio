import type { Metadata } from 'next';

/**
 * interview 하위 전체를 검색엔진에서 제외한다.
 * 이력서·회사 내부 정보가 포함되어 있어 URL을 아는 사람만 보게 한다.
 */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function InterviewLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // 루트 레이아웃의 Navbar는 #about 같은 홈 앵커라 이 경로에서 동작하지 않는다.
  // 고정 Navbar(모바일 기준 하단 ~110px) 아래에서 시작하도록 상단 여백만 맞춘다.
  return (
    <main className="min-h-screen px-4 pb-20 pt-28 sm:px-8 sm:pb-32 sm:pt-32">
      {children}
    </main>
  );
}
