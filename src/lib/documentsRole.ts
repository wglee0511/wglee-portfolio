type Labelable = { role: string; rn: boolean };

const ROLE_LABEL: Record<string, string> = {
  rn: 'React Native',
  fe: '프론트엔드',
  fullstack: '풀스택',
  mobile: '모바일 앱',
  flutter: 'Flutter',
  android: 'Android',
  ios: 'iOS',
};

/** 공고 하나의 직무 표기. React Native가 확인된 공고는 직무와 상관없이 React Native로 쓴다. */
export function jobLabel(p: Labelable): string {
  if (p.rn) return 'React Native';
  return ROLE_LABEL[p.role] ?? p.role;
}

/** 회사 소속 공고의 직무 표기. 중복은 한 번만, React Native를 맨 앞에 둔다. */
export function jobLabels(postings: Labelable[]): string[] {
  const labels = [...new Set(postings.map(jobLabel))];
  return labels.sort((a, b) => Number(b === 'React Native') - Number(a === 'React Native'));
}
