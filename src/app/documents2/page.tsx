import type { Metadata } from 'next';
import CompanyList from './CompanyList';
import { getCheckedAt, getCompanies, getPostingCount } from '@/lib/documents2';

export const metadata: Metadata = {
  title: '코스피 상위 100 지원 가능 회사',
  description: '코스피 시가총액 상위 100개 회사 중 공고가 확인된 회사 목록.',
};

export default function DocumentsIndexPage() {
  const companies = getCompanies();

  return (
    <div className="mx-auto w-full max-w-3xl">
      <header className="mb-8 sm:mb-12">
        <p className="mb-2 font-mono text-[0.6875rem] tracking-[0.2em] text-accent-blue sm:mb-3 sm:text-xs">
          DOCUMENTS
        </p>
        <h1
          className="text-2xl font-bold sm:text-4xl"
          style={{ color: 'var(--text-primary)' }}
        >
          코스피 상위 100 지원 가능 회사
        </h1>
        <p
          className="mt-3 text-[0.8125rem] leading-relaxed sm:mt-4 sm:text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          코스피 시가총액 상위 100개 회사(ETF·우선주 제외, 2026-11-15) 중 프론트엔드·웹·앱·풀스택 공고가 확인된 곳입니다. 공고 {getPostingCount()}건, 회사 {companies.length}곳. 경력 4년이 공고 범위에 드는 회사를 위에 두었고, 범위 밖인 회사는 아래에 &quot;경력 범위 밖&quot;으로 표시했습니다. 일산 기준 서울·고양·성남·파주·김포만 봤고, 100곳 중 약 절반은 채용 사이트를 읽지 못해 공고가 없다는 뜻이 아닙니다. CJ올리브영·CJ ENM·케이티밀리의서재는 코스피 상위가 아니라 공정위 20대 그룹(블로그 순위표 기준) 계열사 조사에서 나온 공고이며, 모두 경력 범위 밖입니다. {getCheckedAt()} 확인 시점 기준입니다.
        </p>
      </header>

      <CompanyList companies={companies.map(({ key, name, regions, fit }) => ({ key, name, regions: fit ? regions : [...regions, '경력 범위 밖'] }))} />
    </div>
  );
}
