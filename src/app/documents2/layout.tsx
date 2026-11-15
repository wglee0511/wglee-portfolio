import type { Metadata } from 'next';

/**
 * documents 하위 전체를 검색엔진에서 제외한다.
 * 개인 지원 후보 목록이라 URL을 아는 사람만 보게 한다. (robots.txt 에도 Disallow)
 */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function DocumentsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // 루트 레이아웃의 Navbar는 홈 앵커용이라 이 경로에서는 동작하지 않는다.
  return (
    <main className="min-h-screen px-4 pb-20 pt-28 sm:px-8 sm:pb-32 sm:pt-32">
      {children}
    </main>
  );
}
