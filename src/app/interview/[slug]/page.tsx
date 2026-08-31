import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { getDoc, getDocs } from '@/lib/interview';
import { renderMarkdown, setPublishedSlugs } from '@/lib/markdown';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getDocs().map((doc) => ({ slug: doc.slug }));
}

// 빌드 시 생성한 문서 외에는 404. 임의 경로로 파일을 훑는 걸 막는다.
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return {};

  return {
    title: doc.title,
    description: doc.summary || undefined,
  };
}

export default async function InterviewDocPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = getDoc(slug);

  if (!doc) notFound();

  const docs = getDocs();
  setPublishedSlugs(docs.map((d) => d.slug));

  const index = docs.findIndex((d) => d.slug === doc.slug);
  const prev = docs[index - 1];
  const next = docs[index + 1];

  return (
    <div className="mx-auto w-full max-w-3xl">
      <Link
        href="/interview"
        className="mb-7 inline-flex items-center gap-2 text-[0.8125rem] transition-colors hover:text-accent-blue sm:mb-10 sm:text-sm"
        style={{ color: 'var(--text-secondary)' }}
      >
        <ArrowLeft size={14} />
        문서 목록
      </Link>

      <article
        className="md-body"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(doc.content) }}
      />

      <nav
        className="mt-12 flex flex-col gap-4 border-t pt-6 sm:mt-16 sm:flex-row sm:justify-between sm:gap-6 sm:pt-8"
        style={{ borderColor: 'var(--surface-border)' }}
      >
        {prev ? (
          <Link
            href={`/interview/${prev.slug}`}
            className="text-[0.8125rem] leading-snug transition-colors hover:text-accent-blue sm:max-w-[48%] sm:text-sm"
            style={{ color: 'var(--text-secondary)' }}
          >
            ← {prev.title}
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
        {next && (
          <Link
            href={`/interview/${next.slug}`}
            className="text-[0.8125rem] leading-snug transition-colors hover:text-accent-blue sm:max-w-[48%] sm:text-right sm:text-sm"
            style={{ color: 'var(--text-secondary)' }}
          >
            {next.title} →
          </Link>
        )}
      </nav>
    </div>
  );
}
