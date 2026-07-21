const SITE_URL = 'https://wglee.getcodeforge.dev';

export default function JsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: '이원교',
    alternateName: 'WG.LEE',
    url: SITE_URL,
    email: 'ranazang@naver.com',
    sameAs: [
      'https://github.com/wglee0511',
      'https://velog.io/@wglee0511',
    ],
    jobTitle: 'Frontend Developer (React Native / React)',
    description: '4년차 프론트엔드 개발자. React Native·React를 기반으로 앱과 웹을 개발하며, 네이티브 영역과 AI 개발 환경 구축까지 범위를 넓힙니다.',
    knowsAbout: [
      'React',
      'React Native',
      'Expo',
      'TypeScript',
      'Next.js',
      'Zustand',
      'Supabase',
      'SQLite',
      'Kotlin',
      'Swift',
      'Jetpack Compose',
      'D3.js',
      'Electron',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: '경희대학교',
      sameAs: 'https://www.khu.ac.kr',
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Frontend Developer (React Native / React)',
      occupationLocation: {
        '@type': 'Country',
        name: '대한민국',
      },
    },
  };

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: '이원교 포트폴리오',
    url: SITE_URL,
    mainEntity: { '@id': `${SITE_URL}/#person` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  );
}
