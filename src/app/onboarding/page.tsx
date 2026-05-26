'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BirthDateStep } from '@/components/onboarding/BirthDateStep';
import { BirthTimeStep } from '@/components/onboarding/BirthTimeStep';
import { LocationStep } from '@/components/onboarding/LocationStep';
import { calculateChart } from '@/lib/chartCalculator';
import { calculateTraits, calculateTemperament, calculateBiographicalPhase, calculateNinefoldAnnotations } from '@/lib/traitEngine';
import { getTemperamentDescription, NINEFOLD_MEMBERS } from '@/content/constitution';
import { BIOGRAPHICAL_PHASES } from '@/content/biography';
import { syncChart, syncConstitution } from '@/lib/sync';
import type { AstralChart } from '@/lib/chartCalculator';
import type { Temperament } from '@/content/constitution';

type OnboardingStep = 'welcome' | 'birth-date' | 'birth-time' | 'location' | 'temperament' | 'biography' | 'ninefold';

interface CalculatedConstitution {
  chart: AstralChart;
  temperament: Temperament;
  biographicalPhase: number;
}

const TEMPERAMENT_COLORS: Record<Temperament, string> = {
  choleric: '#8B2E2E',
  sanguine: '#C9A84C',
  melancholic: '#1E3A5F',
  phlegmatic: '#6B8F5C',
};

const MEMBER_PREVIEW_KEYS = ['physical_body', 'etheric_body', 'astral_body', 'sentient_soul'] as const;
const ACTIVATION_COLORS = {
  active:     '#1E3A5F',
  developing: '#C9A84C',
  latent:     '#A8B4C0',
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [constitution, setConstitution] = useState<CalculatedConstitution | null>(null);
  const [birthData, setBirthData] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    hour: 12,
    minute: 0,
    latitude: 24.7136,
    longitude: 46.6753,
    utcOffsetHours: 3,
    timeUnknown: false,
  });

  function handleStartOnboarding() { setStep('birth-date'); }

  function handleBirthDateComplete(date: { year: number; month: number; day: number }) {
    setBirthData((prev) => ({ ...prev, ...date }));
    setStep('birth-time');
  }

  function handleBirthTimeComplete(time: { hour: number; minute: number; timeUnknown?: boolean }) {
    setBirthData((prev) => ({ ...prev, hour: time.hour, minute: time.minute, timeUnknown: time.timeUnknown || false }));
    setStep('location');
  }

  function handleLocationComplete(location: { latitude: number; longitude: number; utcOffsetHours: number }) {
    const completeBirthData = { ...birthData, ...location };
    setBirthData(completeBirthData);

    try {
      const chart = calculateChart(completeBirthData);
      localStorage.setItem('hygiea.birth-data', JSON.stringify(completeBirthData));
      localStorage.setItem('hygiea.primary-chart.v1', JSON.stringify(chart));

      let quiz: Record<string, string[]> = {};
      try { const raw = localStorage.getItem('hygiea.quiz'); if (raw) quiz = JSON.parse(raw); } catch {}
      calculateTraits(chart, quiz);

      const temperament = calculateTemperament(chart);
      const biographicalPhase = calculateBiographicalPhase(completeBirthData);
      const ninefold = calculateNinefoldAnnotations(chart, temperament, biographicalPhase);

      setConstitution({ chart, temperament, biographicalPhase });

      // Save constitution to localStorage
      localStorage.setItem('hygiea.constitution.v1', JSON.stringify({ temperament, biographicalPhase, ninefold }));

      syncChart();
      syncConstitution({ dominantTemperament: temperament, biographicalPhase, ninefoldJson: ninefold });

      setStep('temperament');
    } catch {
      localStorage.setItem('hygiea.birth-data', JSON.stringify(completeBirthData));
      router.push('/threshold');
    }
  }

  function handleComplete() {
    router.push('/threshold');
  }

  if (step === 'welcome') {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh px-5 py-12 max-w-[430px] mx-auto">
        <div className="text-center">
          <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-4">Spirit-soul hygiene</div>
          <h1 className="font-serif text-5xl text-ink mb-4">Hygiea</h1>
          <p className="text-base text-ink-muted mb-8 leading-relaxed">
            Your constitution. Your calendar. Your practice.
          </p>
          <p className="text-sm text-ink-soft mb-12 leading-[1.65]">
            We begin with your natal chart — the record of the cosmic moment of your incarnation. You will need your date, time, and place of birth.
          </p>
          <button
            onClick={handleStartOnboarding}
            className="w-full h-[52px] rounded-[26px] bg-ink text-cream font-medium text-sm"
          >
            Begin
          </button>
          <p className="text-xs text-ink-muted mt-6">
            If you do not know your exact birth time, you may skip it.
          </p>
        </div>
      </div>
    );
  }

  if (step === 'birth-date') {
    return <BirthDateStep initialData={birthData} onComplete={handleBirthDateComplete} />;
  }
  if (step === 'birth-time') {
    return <BirthTimeStep initialData={birthData} onComplete={handleBirthTimeComplete} />;
  }
  if (step === 'location') {
    return <LocationStep initialData={birthData} onComplete={handleLocationComplete} />;
  }

  // ── Constitution reveal steps ──────────────────────────────────────────────

  if (step === 'temperament' && constitution) {
    const { temperament } = constitution;
    const desc = getTemperamentDescription(temperament);
    const color = desc ? desc.color : TEMPERAMENT_COLORS[temperament];
    return (
      <div className="flex flex-col min-h-dvh px-5 py-12 max-w-[430px] mx-auto">
        <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-2">Your constitution</div>
        <h2 className="font-serif text-[1.75rem] text-ink mb-6">Your temperament</h2>

        <div className="rounded-[18px] p-6 mb-5" style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
          <div className="text-[10px] font-medium tracking-widest uppercase mb-1" style={{ color }}>
            {desc?.element ?? temperament}
          </div>
          <h3 className="font-serif text-3xl text-ink mb-3 capitalize">{temperament}</h3>
          {desc && <p className="text-sm text-ink-soft leading-[1.7] font-serif">{desc.brief}</p>}
        </div>

        {desc && (
          <div className="space-y-4 mb-8">
            <div>
              <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-1">Gift</div>
              <p className="text-sm text-ink-soft leading-[1.65]">{desc.gift}</p>
            </div>
            <div>
              <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-1">The practice</div>
              <p className="text-sm text-ink-soft leading-[1.65]">{desc.practice}</p>
            </div>
          </div>
        )}

        <button
          onClick={() => setStep('biography')}
          className="w-full h-[52px] rounded-[26px] font-medium text-sm mt-auto"
          style={{ background: color, color: 'white' }}
        >
          Continue
        </button>
      </div>
    );
  }

  if (step === 'biography' && constitution) {
    const { biographicalPhase } = constitution;
    const phaseData = BIOGRAPHICAL_PHASES[Math.min(biographicalPhase - 1, BIOGRAPHICAL_PHASES.length - 1)];
    return (
      <div className="flex flex-col min-h-dvh px-5 py-12 max-w-[430px] mx-auto">
        <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-2">Your constitution</div>
        <h2 className="font-serif text-[1.75rem] text-ink mb-6">Your biographical phase</h2>

        <div className="rounded-[18px] p-6 mb-5" style={{ background: 'rgba(30,58,95,0.07)' }}>
          <div className="text-[10px] font-medium tracking-widest uppercase mb-1" style={{ color: 'var(--color-cosmic-blue)' }}>
            Phase {biographicalPhase} · Ages {phaseData?.ageRange[0]}–{phaseData?.ageRange[1] === 999 ? '∞' : phaseData?.ageRange[1]}
          </div>
          <h3 className="font-serif text-2xl text-ink mb-2">{phaseData?.name}</h3>
          <p className="text-sm text-ink-muted mb-4">{phaseData?.subtitle}</p>
          {phaseData && <p className="text-sm text-ink-soft leading-[1.7]">{phaseData.facultiesDeveloping.slice(0, 200)}…</p>}
        </div>

        {phaseData && (
          <div className="rounded-[14px] p-4 mb-8" style={{ background: 'rgba(201,168,76,0.08)' }}>
            <div className="text-[10px] font-medium tracking-widest uppercase mb-1" style={{ color: 'var(--color-gold-soft)' }}>
              Practice note
            </div>
            <p className="text-xs text-ink-soft leading-[1.65]">{phaseData.practiceNote.slice(0, 180)}…</p>
          </div>
        )}

        {phaseData?.worldSentence && (
          <p className="font-serif text-lg text-ink-muted italic text-center mb-8">"{phaseData.worldSentence}"</p>
        )}

        <button
          onClick={() => setStep('ninefold')}
          className="w-full h-[52px] rounded-[26px] font-medium text-sm mt-auto"
          style={{ background: 'var(--color-cosmic-blue)', color: 'white' }}
        >
          Continue
        </button>
      </div>
    );
  }

  if (step === 'ninefold' && constitution) {
    const { chart, temperament, biographicalPhase } = constitution;
    const ninefold = calculateNinefoldAnnotations(chart, temperament, biographicalPhase);

    return (
      <div className="flex flex-col min-h-dvh px-5 py-12 max-w-[430px] mx-auto">
        <div className="text-[10px] text-ink-muted font-medium tracking-widest uppercase mb-2">Your constitution</div>
        <h2 className="font-serif text-[1.75rem] text-ink mb-2">The ninefold being</h2>
        <p className="text-sm text-ink-muted mb-6 leading-[1.65]">
          Your first four members — those fully present in ordinary adult life.
        </p>

        <div className="space-y-2 mb-8">
          {MEMBER_PREVIEW_KEYS.map((key) => {
            const member = NINEFOLD_MEMBERS.find((m) => m.member === key);
            const ann = ninefold[key];
            if (!member || !ann) return null;
            const color = ACTIVATION_COLORS[ann.activation];
            return (
              <div key={key} className="rounded-[14px] p-4" style={{ background: 'rgba(28,25,23,0.04)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <div className="font-serif text-base text-ink">{member.name}</div>
                  <div
                    className="ml-auto text-[9px] font-medium tracking-widest uppercase px-2 py-0.5 rounded-full"
                    style={{ background: `${color}20`, color }}
                  >
                    {ann.activation}
                  </div>
                </div>
                <p className="text-xs text-ink-muted leading-[1.6] ml-4">{member.brief?.slice(0, 100) ?? ''}…</p>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-ink-muted text-center mb-6">
          Your full ninefold constitution is in the Spirit-Soul Profile.
        </p>

        <button
          onClick={handleComplete}
          className="w-full h-[52px] rounded-[26px] font-medium text-sm mt-auto bg-ink text-cream"
        >
          Enter Hygiea
        </button>
      </div>
    );
  }

  return null;
}
