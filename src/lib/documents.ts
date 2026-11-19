import raw from '@/data/documents.json';
import { compareDistance, distanceFromGoyangKm } from './documentsDistance';
import { postingScore } from './documentsRank';

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
  /** 본문을 읽고 React Native 직무로 판단한 공고(제목·주요업무·필수 자격요건). 우대·대안 나열·기술 태그만이면 false */
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
  /** 소속 공고 중 최고 추천 점수 */
  score: number;
  /** 최고 점수 공고 중 고양시(일산)에서 가장 가까운 지역까지의 거리(km) */
  distanceKm: number;
  postings: JobPosting[];
};

const postings = raw as JobPosting[];

function buildCompanies(): Company[] {
  const map = new Map<string, Company>();
  for (const p of postings) {
    const c = map.get(p.companyKey) ?? { key: p.companyKey, name: p.company, regions: [], rn: false, score: -Infinity, distanceKm: Infinity, postings: [] };
    c.postings.push(p);
    if (p.rn) c.rn = true;
    // 거리는 회사 점수를 낸 최고 점수 공고들 가운데 가장 가까운 지역 기준이다.
    const score = postingScore(p);
    const km = distanceFromGoyangKm(p.region);
    if (score > c.score) {
      c.score = score;
      c.distanceKm = km;
    } else if (score === c.score) {
      c.distanceKm = Math.min(c.distanceKm, km);
    }
    if (!c.regions.includes(p.region)) c.regions.push(p.region);
    map.set(p.companyKey, c);
  }
  // 추천순(점수 높은 순) → 같으면 고양시(일산)에서 가까운 순 → 같으면 가나다순.
  return [...map.values()].sort(
    (a, b) => b.score - a.score || compareDistance(a.distanceKm, b.distanceKm) || a.name.localeCompare(b.name, 'ko'),
  );
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
