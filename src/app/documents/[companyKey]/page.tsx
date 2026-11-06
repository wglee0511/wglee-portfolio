import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getCompanies, getCompany, safeUrl } from '@/lib/documents';

type PageProps = { params: Promise<{ companyKey: string }> };

export function generateStaticParams() {
  return getCompanies().map((c) => ({ companyKey: c.key }));
}

// 빌드 시 만든 회사 외에는 404.
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { companyKey } = await params;
  const company = getCompany(companyKey);
  return company ? { title: company.name } : {};
}

const MUTED = { color: 'var(--text-secondary)' } as const;

export default async function CompanyPage({ params }: PageProps) {
  const { companyKey } = await params;
  const company = getCompany(companyKey);
  if (!company) notFound();

  // 같은 회사의 공고에서 확인된 정보를 합친다. 먼저 나온 값을 쓰고, 없으면 "확인 안 됨".
  const info = (key: 'industry' | 'address' | 'homepage' | 'established' | 'summary') =>
    company.postings.map((p) => p.companyInfo[key]).find(Boolean);
  const infoSources = company.postings
    .flatMap((p) => p.infoSources)
    .filter((s, i, arr) => arr.findIndex((o) => o.url === s.url) === i);

  const rows: [string, string | undefined][] = [
    ['업종', info('industry')],
    ['주소', info('address')],
    ['규모', undefined], // 수집한 출처(원티드·사람인·점핏 공고)에 규모가 없어 확인 안 됨으로 표시
    ['설립', info('established')],
    ['기술 스택', undefined], // 공고별 요구 스택은 지원 경로의 공고 링크에서 확인
    ['소개', info('summary')],
  ];
  const homepage = safeUrl(info('homepage'));
  const checkedAt = [...new Set(company.postings.map((p) => p.checkedAt))].join(', ');

  return (
    <div className="mx-auto w-full max-w-3xl">
      <Link
        href="/documents"
        className="mb-7 inline-flex items-center gap-2 text-[0.8125rem] transition-colors hover:text-accent-blue sm:mb-10 sm:text-sm"
        style={MUTED}
      >
        <ArrowLeft size={14} />
        회사 목록
      </Link>

      <h1
        className="text-2xl font-bold sm:text-3xl"
        style={{ color: 'var(--text-primary)' }}
      >
        {company.name}
      </h1>
      <p className="mt-2 text-[0.8125rem] sm:text-sm" style={MUTED}>
        {company.regions.join(' · ')}
      </p>

      <section className="mt-8 sm:mt-10">
        <h2 className="mb-3 font-mono text-xs tracking-[0.15em] text-accent-blue">회사 정보</h2>
        <dl className="glass grid grid-cols-[4.5rem_1fr] gap-x-4 gap-y-2.5 rounded-xl px-4 py-4 text-[0.8125rem] leading-relaxed sm:px-5 sm:text-sm">
          {rows.map(([label, value]) => (
            <div key={label} className="contents">
              <dt style={MUTED}>{label}</dt>
              <dd style={{ color: 'var(--text-primary)' }}>{value || '확인 안 됨'}</dd>
            </div>
          ))}
          <dt style={MUTED}>홈페이지</dt>
          <dd style={{ color: 'var(--text-primary)' }}>
            {homepage ? (
              <a
                href={homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-accent-blue hover:underline"
              >
                {homepage}
              </a>
            ) : (
              '확인 안 됨'
            )}
          </dd>
        </dl>
        <p className="mt-2 text-[0.75rem]" style={MUTED}>
          출처:{' '}
          {infoSources.length === 0 && '확인 안 됨'}
          {infoSources.map((s, i) => (
            <span key={s.url}>
              {i > 0 && ' · '}
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent-blue hover:underline">
                {s.label}
              </a>
            </span>
          ))}
          {' '}· {checkedAt} 확인
        </p>
      </section>

      <section className="mt-8 sm:mt-10">
        <h2 className="mb-3 font-mono text-xs tracking-[0.15em] text-accent-blue">
          지원 경로 ({company.postings.length}건)
        </h2>
        <ul className="space-y-3">
          {company.postings.map((p) => (
            <li key={p.id} className="glass rounded-xl px-4 py-4 sm:px-5">
              <h3
                className="text-[0.9375rem] font-semibold leading-snug sm:text-base"
                style={{ color: 'var(--text-primary)' }}
              >
                {p.position}
              </h3>
              <p className="mt-1.5 text-[0.8125rem] sm:text-sm" style={MUTED}>
                {[p.region, p.career || '경력 확인 안 됨', `마감 ${p.deadline}`].join(' · ')}
              </p>
              {p.maybeSame && (
                <p className="mt-1 text-[0.75rem]" style={MUTED}>같은 공고일 수 있음</p>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {p.sources.map((s) => (
                  <a
                    key={s.url}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[0.8125rem] text-accent-blue transition-colors hover:bg-accent-blue/10"
                    style={{ borderColor: 'var(--surface-border)' }}
                  >
                    {s.site}에서 지원
                    <ExternalLink size={12} />
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
