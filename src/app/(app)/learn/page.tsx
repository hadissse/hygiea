import Link from 'next/link';
import { COURSES, ASTRO_COURSES } from '@/content/courses';
import { gradientCss } from '@/components/learn/primitives';

export default function LearnPage() {
  return (
    <div className="bg-cream pb-16">
      <div className="px-5 pt-8 pb-6">
        <h1 className="font-prose text-2xl text-ink">Library</h1>
        <p className="text-sm text-ink-muted mt-1">Courses, teachers, and guided practices.</p>
      </div>

      <div className="px-5">
        <div className="text-[11px] text-ink-muted font-semibold tracking-wider mb-3">Featured</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {COURSES.map((course) => (
            <Link key={course.id} href={`/learn/${course.id}`} className="block group">
              <div className="bg-white rounded-[18px] border border-rule-soft overflow-hidden transition-shadow group-hover:shadow-sm">
                <div
                  className="h-32 w-full"
                  style={{ background: gradientCss(course.variant) }}
                />
                <div className="p-4">
                  <div className="text-[11px] text-ink-muted mb-1 tracking-wide">{course.course}</div>
                  <div className="font-prose text-[17px] text-ink leading-snug">{course.title}</div>
                  <div className="text-xs text-ink-muted mt-1.5">{course.teacher}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Lectures row */}
      <div className="px-5 mt-10">
        <div className="text-[11px] text-ink-muted font-semibold tracking-wider mb-3">Lectures</div>
        <Link
          href="/learn/karma"
          className="flex items-center justify-between bg-white rounded-[18px] border border-rule-soft px-4 py-3.5 group hover:shadow-sm transition-shadow"
        >
          <div>
            <div className="font-prose text-[15px] text-ink leading-snug">Karmic Relationships</div>
            <div className="text-xs text-ink-muted mt-0.5">Rudolf Steiner · GA235–GA236 · 18 lectures</div>
          </div>
          <span className="text-ink-muted text-sm group-hover:text-ink transition-colors">→</span>
        </Link>
      </div>

      <div className="px-5 mt-10">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[11px] text-ink-muted font-semibold tracking-wider">Astrology Courses</div>
          <span
            className="text-[9px] font-medium px-1.5 py-0.5 rounded-full"
            style={{ background: '#F0EDE6', color: '#9A9482' }}
          >
            Coming soon
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {ASTRO_COURSES.map((c) => (
            <div key={c.id} className="cursor-default opacity-70">
              <div className="bg-white rounded-[16px] border border-rule-soft overflow-hidden">
                <div
                  className="h-20 w-full"
                  style={{ background: gradientCss(c.variant) }}
                />
                <div className="p-3.5">
                  <div className="font-prose text-sm text-ink truncate">{c.title}</div>
                  <div className="text-xs text-ink-muted mt-0.5">{c.course} · {c.teacher}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
