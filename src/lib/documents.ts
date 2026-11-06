import raw from '@/data/documents.json';

export type DocSource = { site: string; url: string };

export type JobPosting = {
  id: string;
  companyKey: string;
  company: string;
  position: string;
  region: string;
  career: string;
  deadline: string;
  role: string;
  sources: DocSource[];
  companyInfo: {
    industry?: string;
    address?: string;
    homepage?: string;
    established?: string;
    summary?: string;
  };
  infoSources: { label: string; url: string }[];
  /** 공고 본문·기술 태그에 React Native가 확인된 공고 */
  rn: boolean;
  maybeSame: boolean;
  checkedAt: string;
};

export type Company = {
  key: string;
  name: string;
  regions: string[];
  /** 이 회사의 공고 중 React Native 확인된 것이 있는지 */
  rn: boolean;
  postings: JobPosting[];
};

const postings = raw as JobPosting[];

function buildCompanies(): Company[] {
  const map = new Map<string, Company>();
  for (const p of postings) {
    const c = map.get(p.companyKey) ?? { key: p.companyKey, name: p.company, regions: [], rn: false, postings: [] };
    c.postings.push(p);
    if (p.rn) c.rn = true;
    if (!c.regions.includes(p.region)) c.regions.push(p.region);
    map.set(p.companyKey, c);
  }
  // React Native 확인 회사를 먼저, 그 안에서는 가나다순.
  return [...map.values()].sort((a, b) => Number(b.rn) - Number(a.rn) || a.name.localeCompare(b.name, 'ko'));
}

/** 공고를 회사 단위로 묶는다. 목록은 회사당 한 줄이다. 모듈 로드 시 한 번만 계산한다. */
const companies = buildCompanies();
const byKey = new Map(companies.map((c) => [c.key, c]));

export function getCompanies(): Company[] {
  return companies;
}

export function getCompany(key: string): Company | undefined {
  return byKey.get(key);
}

/** http/https 주소만 허용한다. 스킴 대소문자는 정규화하고, 그 외는 null. */
export function safeUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const u = new URL(/^[a-z][a-z0-9+.-]*:/i.test(value) ? value : `https://${value}`);
    return u.protocol === 'http:' || u.protocol === 'https:' ? u.toString() : null;
  } catch {
    return null;
  }
}

export function getPostingCount(): number {
  return postings.length;
}

export function getCheckedAt(): string {
  return postings[0]?.checkedAt ?? '';
}
