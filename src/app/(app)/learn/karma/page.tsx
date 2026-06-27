import Link from 'next/link';
import { KARMA_LECTURES, KarmaLecture } from '@/content/karmaLectures';

function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function cleanTitle(title: string): string {
  // "Karmic Relationships · Lecture II" → "Lecture II"
  // "Karmic Relationships · Lecture" → "Lecture I" (first one has no numeral)
  const match = title.match(/Lecture\s*([\w]*)\s*$/);
  if (match) {
    const numeral = match[1].trim();
    return numeral ? `Lecture ${numeral}` : 'Lecture I';
  }
  return title;
}

function cleanOpening(opening: string): string {
  // Many openings start with navigation noise like:
  // "Lecture II — GA 235. Karmic Relationships I (1972) — Rudolf Steiner Archive ... Dornach Translate Show German Lecture II "
  // Strategy: find the last occurrence of a city name or "Show German" and take text after the next "Lecture [Roman]" or capital sentence start
  const cityMarkers = ['Show German Lecture', 'Show German\nLecture', 'Show German In', 'Show German Karma', 'Show German The', 'Show German We', 'Show German It', 'Show German Of', 'Show German At', 'Show German My', 'Show German To', 'Show German You', 'Show German Speaking', 'Show German I ', 'Show German S'];

  for (const marker of cityMarkers) {
    const idx = opening.lastIndexOf(marker);
    if (idx !== -1) {
      // After "Show German", skip past the lecture heading line
      let rest = opening.slice(idx + 'Show German'.length).trim();
      // If it starts with "Lecture [Roman numeral]", strip that heading
      rest = rest.replace(/^Lecture\s+[IVXLCDM]+\s*/, '').trim();
      if (rest.length > 20) {
        return rest.substring(0, 220) + '…';
      }
    }
  }

  // Fallback: just take first 220 chars
  return opening.substring(0, 220) + '…';
}

const GA_LABELS: Record<string, string> = {
  GA235: 'GA 235 · Volume V',
  GA236: 'GA 236 · Volume VI',
};

export default function KarmaLecturesPage() {
  const groups = ['GA235', 'GA236'].map((ga) => ({
    ga,
    label: GA_LABELS[ga] ?? ga,
    lectures: KARMA_LECTURES.filter((l) => l.ga === ga),
  }));

  return (
    <div className="bg-cream pb-20">
      {/* Back link */}
      <div className="px-5 pt-7">
        <Link href="/learn" className="text-xs text-ink-muted hover:text-ink transition-colors">
          ← Library
        </Link>
      </div>

      {/* Header */}
      <div className="px-5 pt-4 pb-6 max-w-2xl mx-auto md:max-w-3xl">
        <h1 className="font-prose text-2xl text-ink leading-snug">Karmic Relationships</h1>
        <p className="text-sm text-ink-muted mt-1">Rudolf Steiner · GA235–GA236 · 1924</p>
        <p className="text-[11px] text-ink-muted mt-3 leading-relaxed opacity-75">
          Lectures from the Rudolf Steiner Archive (rsarchive.org).{' '}
          Public domain — Steiner d.&thinsp;1925.
        </p>
      </div>

      {/* Lecture groups */}
      <div className="px-5 max-w-2xl mx-auto md:max-w-3xl space-y-10">
        {groups.map(({ ga, label, lectures }) => (
          <section key={ga}>
            {/* Section heading */}
            <div className="text-[11px] text-ink-muted font-semibold tracking-wider uppercase mb-3">
              {label}
            </div>

            <div className="flex flex-col gap-3">
              {lectures.map((lecture: KarmaLecture) => (
                <div
                  key={lecture.id}
                  className="bg-white rounded-[18px] border border-rule-soft p-4"
                >
                  <div className="text-[11px] text-ink-muted">{formatDate(lecture.date)}</div>
                  <div className="font-prose font-medium text-ink mt-1 leading-snug">
                    {cleanTitle(lecture.title)}
                  </div>
                  <p className="italic text-sm text-ink-muted leading-relaxed mt-2">
                    {cleanOpening(lecture.opening)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
