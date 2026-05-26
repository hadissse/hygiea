'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getTodayExercise, markExerciseComplete, isTodayComplete, type TodayExercise } from '@/lib/exerciseCycle';

export default function ExercisePage() {
  const router = useRouter();
  const [todayEx, setTodayEx] = useState<TodayExercise | null>(null);
  const [complete, setComplete] = useState(false);
  const [reflection, setReflection] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setTodayEx(getTodayExercise());
    setComplete(isTodayComplete());
  }, []);

  function handleComplete() {
    if (!todayEx) return;
    markExerciseComplete(todayEx.weekStart, todayEx.dayInCycle, reflection);
    setComplete(true);
    setSaved(true);
  }

  if (!todayEx) return null;

  const { exercise, isRestDay } = todayEx;

  return (
    <div className="pb-28 px-5 pt-6 max-w-[430px] mx-auto">
      {/* Header */}
      <button onClick={() => router.back()} className="text-ink-muted text-sm mb-5 flex items-center gap-1.5">
        <span>←</span> Today
      </button>

      {/* Exercise label */}
      <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-1">
        {isRestDay ? 'Rest day · Synthesis' : `Exercise ${exercise.id} of 6`}
      </div>

      {/* Title */}
      <h1 className="font-serif text-[2rem] text-ink leading-tight mb-1">{exercise.name}</h1>
      <p className="text-sm text-ink-muted mb-6">{exercise.subtitle}</p>

      {/* Day compass */}
      <div
        className="rounded-[14px] p-4 mb-6"
        style={{ background: 'rgba(30,58,95,0.06)' }}
      >
        <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-1">
          Compass for today
        </div>
        <p className="font-serif text-base text-ink leading-[1.6]">{exercise.dayCompass}</p>
      </div>

      {/* Guidance */}
      <div className="mb-6">
        <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-3">
          The practice
        </div>
        {exercise.guidance.split('\n\n').map((para, i) => (
          <p key={i} className="font-serif text-[1.05rem] text-ink-soft leading-[1.75] mb-4">
            {para}
          </p>
        ))}
      </div>

      {/* Practice prompt */}
      <div
        className="rounded-[14px] p-4 mb-6"
        style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}
      >
        <div className="text-[10px] font-medium tracking-widest uppercase mb-1" style={{ color: 'var(--color-gold-soft)' }}>
          Today's prompt
        </div>
        <p className="font-serif text-base text-ink leading-[1.65]">{exercise.practicePrompt}</p>
      </div>

      {/* Pitfalls */}
      <div className="mb-6 space-y-3">
        <div>
          <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-1">
            Ahrimanic pitfall
          </div>
          <p className="text-sm text-ink-soft leading-[1.6]">{exercise.ahrimanicPitfall}</p>
        </div>
        <div>
          <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-1">
            Luciferic pitfall
          </div>
          <p className="text-sm text-ink-soft leading-[1.6]">{exercise.lucifericPitfall}</p>
        </div>
      </div>

      {/* Reflection + completion */}
      {!saved && !complete && (
        <>
          <div className="mb-3">
            <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-2">
              Reflection (optional)
            </div>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="A single observation from today's practice."
              className="w-full bg-transparent border rounded-[12px] px-3.5 py-3 text-sm text-ink placeholder:text-ink-muted/60 focus:outline-none resize-none"
              style={{ borderColor: 'var(--color-rule-soft)', minHeight: 80 }}
              rows={3}
            />
          </div>
          <button
            onClick={handleComplete}
            className="w-full h-[52px] rounded-[26px] font-medium text-sm transition-colors"
            style={{ background: 'var(--color-cosmic-blue)', color: 'white' }}
          >
            Mark practice complete
          </button>
        </>
      )}

      {(saved || complete) && (
        <div
          className="rounded-[14px] p-4 text-center"
          style={{ background: 'rgba(201,168,76,0.1)' }}
        >
          <div className="font-serif text-base text-ink mb-1">Practice complete.</div>
          <div className="text-sm text-ink-muted">
            {reflection ? `"${reflection}"` : 'The exercise lives in the day.'}
          </div>
        </div>
      )}
    </div>
  );
}
