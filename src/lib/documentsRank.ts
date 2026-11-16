/** 추천순 점수. 높을수록 위. 기준은 AGENTS.md "추천순 정렬" 참고. */

const TARGET_YEARS = 4;

type Rankable = {
  position: string;
  career: string;
  deadline: string;
  rn: boolean;
  checkedAt: string;
};

/** 경력 범위에 4년이 드는지. 2 = 든다·무관, 1 = 표기 없음, -1 = 범위 밖 */
function careerFit(career: string, position: string): 2 | 1 | -1 {
  // 경력 칸에 연차가 없으면 제목의 "N년 이상"만 본다("우대"는 요건이 아니므로 제외).
  const titleMin = /우대/.test(position) ? '' : (position.match(/\d+\s*년\s*이상/)?.[0] ?? '');
  const text = /\d+\s*년/.test(career) ? career : `${career} ${titleMin}`;
  const range = text.match(/(\d+)\s*~\s*(\d+)\s*년/);
  if (range) return Number(range[1]) <= TARGET_YEARS && TARGET_YEARS <= Number(range[2]) ? 2 : -1;
  const min = text.match(/(\d+)\s*년\s*(이상|↑)/);
  if (min) return Number(min[1]) <= TARGET_YEARS ? 2 : -1;
  return /무관|신입/.test(career) ? 2 : 1;
}

/** 확인일(checkedAt) 기준으로 마감 여부. 날짜가 없으면 null. */
function deadlineState(deadline: string, checkedAt: string): 'open' | 'expired' | null {
  const year = Number(checkedAt.slice(0, 4));
  const iso = deadline.match(/(\d{4})-(\d{2})-(\d{2})/);
  const md = deadline.match(/(\d{1,2})\/(\d{1,2})/);
  let date = iso ? `${iso[1]}-${iso[2]}-${iso[3]}` : null;
  if (!date && md) {
    date = `${year}-${md[1].padStart(2, '0')}-${md[2].padStart(2, '0')}`;
    // 연말에 확인한 "1/5" 같은 마감은 다음 해로 본다.
    if (new Date(date).getTime() < new Date(checkedAt).getTime() - 180 * 864e5) {
      date = `${year + 1}${date.slice(4)}`;
    }
  }
  if (!date) return null;
  return date < checkedAt ? 'expired' : 'open';
}

export function postingScore(p: Rankable): number {
  const state = deadlineState(p.deadline, p.checkedAt);
  const fit = careerFit(p.career, p.position);
  const titleRn = /react[\s-]*native|\brn\b/i.test(p.position);
  return (
    (p.rn ? 100 : 0) +
    (titleRn ? 40 : 0) +
    (fit === 2 ? 20 : fit === 1 ? 10 : -200) +
    (state === 'open' ? 5 : state === 'expired' ? -200 : 0)
  );
}
