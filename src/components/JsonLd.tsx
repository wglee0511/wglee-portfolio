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
    jobTitle: 'Frontend Developer',
    description: '4년차 프론트엔드 개발자. React, React Native, TypeScript를 다루며 모바일·웹 서비스를 개발합니다.',
    knowsAbout: ['React', 'React Native', 'TypeScript', 'Next.js', 'D3.js', 'Zustand', 'Electron'],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: '경희대학교',
      sameAs: 'https://www.khu.ac.kr',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Routinery Inc.',
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Frontend Developer',
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

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Code Slugger',
    applicationCategory: 'GameApplication',
    operatingSystem: 'iOS, Android',
    author: {
      '@type': 'Person',
      name: '이원교',
    },
    description: '회원가입 없이 바로 시작할 수 있는 숫자 추리 게임 앱. React Native로 개발.',
    downloadUrl: 'https://apps.apple.com/kr/app/code-slugger/id6759213279',
    datePublished: '2026-03',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
    </>
  );
}
