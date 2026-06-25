'use client';

import { IconBack, Orb, PALETTE, PrimaryBtn, ProgressBar } from '@/components/onboarding/PreAppUI';

export interface IntroSlide {
  orb: 'dawn' | 'sage' | 'lake' | 'ember' | 'night' | 'dusk';
  media?: string;
  title: string;
  subtitle: string;
  cta?: string;
  dark?: boolean;
}

export const INTRO_SLIDES: IntroSlide[] = [
  { orb: 'dawn', title: 'Stillness for Every Moment', subtitle: 'Minutes of mindfulness — between meetings, before sleep, or when life gets loud.' },
  { orb: 'sage', title: 'Built on Research', subtitle: 'Our practices are grounded in three decades of clinical mindfulness research and over 150 peer-reviewed studies.' },
  { orb: 'lake', title: 'Tailored to Your Day', subtitle: 'A practice that adapts to your mood, energy, and available time.' },
  { orb: 'ember', title: 'Watch Your Journey Unfold', subtitle: 'Day streaks, reflections, and a quiet record of your presence.' },
  { orb: 'night', title: 'Drift into Sleep', subtitle: 'Sleep stories, soundscapes, and slow tales to help you rest.', dark: true },
  { orb: 'dusk', title: 'Talk to Someone Too', subtitle: 'When you need more than meditation, our certified therapists are just a touch away.' },
  { orb: 'sage', media: '/media/crowd.jpg', title: 'You Are Not Alone', subtitle: 'More than 80 million people practice with Hygiea — in every time zone.' },
  { orb: 'dawn', media: '/media/color-wheel.webp', title: "Let's Begin", subtitle: 'A few quick questions to shape your practice.', cta: 'Start Now' },
];

const SLIDE_BG: Record<string, string> = {
  dawn: '#F0E4D5', sage: '#D8E3D4', lake: '#CCDBE8',
  ember: '#F0D8B8', night: '#0F1228', dusk: '#DDD0E8',
};
const MEDIA_BG: Record<string, string> = {
  '/media/crowd.jpg': '#5C4530',
  '/media/color-wheel.webp': '#1C1030',
};

export function IntroCarousel({ slide, progress, onBack, onSkip, onNext }: {
  slide: IntroSlide; progress: number;
  onBack: () => void; onSkip: () => void; onNext: () => void;
}) {
  const hasMedia = !!slide.media;
  const dark = slide.dark ?? hasMedia;
  const txt = dark ? PALETTE.cream : PALETTE.ink;
  const mute = dark ? 'rgba(241,236,222,0.65)' : PALETTE.inkMuted;
  const slideBg = hasMedia
    ? (MEDIA_BG[slide.media!] ?? '#1a1025')
    : (slide.dark ? PALETTE.midnight : (SLIDE_BG[slide.orb] ?? '#F5F2EA'));

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden" style={{ background: slideBg }}>
      {hasMedia && (
        <>
          <img src={slide.media!} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.68) 100%)' }} />
        </>
      )}
      <div className="relative flex-1 px-6 pt-[60px] flex flex-col">
        <div className="flex items-center justify-between h-11">
          <button type="button" onClick={onBack} aria-label="Back"><IconBack color={txt} /></button>
          <ProgressBar value={progress} dark={dark} />
          <button type="button" onClick={onSkip} className="text-sm" style={{ color: mute }}>Skip</button>
        </div>
        {!hasMedia && (
          <div className="h-[280px] mt-[30px] flex items-center justify-center">
            <Orb variant={slide.orb} size={220} />
          </div>
        )}
        <div className={hasMedia ? 'mt-auto pb-4' : 'mt-6'}>
          <h1 className="font-serif text-[30px] leading-[1.3]" style={{ color: txt }}>{slide.title}</h1>
          <p className="text-[15px] mt-3 leading-[1.7]" style={{ color: mute }}>{slide.subtitle}</p>
        </div>
      </div>
      <div className="relative px-5 pb-14">
        <PrimaryBtn dark={dark} onClick={onNext}>{slide.cta ?? 'Continue'}</PrimaryBtn>
      </div>
    </div>
  );
}
