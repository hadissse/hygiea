'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const DAY_PLANETS: Record<number, { key: string; name: string; nameAr: string; glyph: string; organAr: string; metalAr: string; color: string }> = {
  0: { key: 'sun',     name: 'Sun',     nameAr: 'الشمس',   glyph: '☉', organAr: 'القلب والدم',              metalAr: 'الذهب',    color: '#FFC78A' },
  1: { key: 'moon',    name: 'Moon',    nameAr: 'القمر',   glyph: '☽', organAr: 'الدماغ والجهاز التناسلي', metalAr: 'الفضة',    color: '#C2D3E2' },
  2: { key: 'mars',    name: 'Mars',    nameAr: 'المريخ',  glyph: '♂', organAr: 'المرارة والصفراء',         metalAr: 'الحديد',   color: '#E9785E' },
  3: { key: 'mercury', name: 'Mercury', nameAr: 'عطارد',   glyph: '☿', organAr: 'الرئتان والتنفس',          metalAr: 'الزئبق',   color: '#C9D2BE' },
  4: { key: 'jupiter', name: 'Jupiter', nameAr: 'المشتري', glyph: '♃', organAr: 'الكبد والتمثيل الغذائي',  metalAr: 'القصدير',  color: '#9C8AB8' },
  5: { key: 'venus',   name: 'Venus',   nameAr: 'الزهرة',  glyph: '♀', organAr: 'الكليتان والترشيح',        metalAr: 'النحاس',   color: '#F8D6BE' },
  6: { key: 'saturn',  name: 'Saturn',  nameAr: 'زحل',     glyph: '♄', organAr: 'الطحال والعظام والجلد',    metalAr: 'الرصاص',   color: '#5A3E7A' },
};

const DAY_NAMES_AR = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const MONTH_NAMES_AR = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

export default function TodayPage() {
  const [planet, setPlanet] = useState<typeof DAY_PLANETS[0] | null>(null);
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const now = new Date();
    setPlanet(DAY_PLANETS[now.getDay()]);
    setDateStr(`${DAY_NAMES_AR[now.getDay()]} ${now.getDate()} ${MONTH_NAMES_AR[now.getMonth()]} ${now.getFullYear()}`);
  }, []);

  if (!planet) return <div className="min-h-dvh bg-cream" />;

  const maskStyle = {
    WebkitMaskImage: `url('/svg/${planet.key}.svg')`,
    maskImage: `url('/svg/${planet.key}.svg')`,
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
    background: planet.color,
  };

  return (
    <main className="min-h-dvh bg-cream pb-24">
      {/* Date header */}
      <div className="px-5 pt-12 pb-5">
        <p className="text-xs text-ink-muted font-medium tracking-wide">{dateStr}</p>
        <h1 className="font-serif text-[28px] text-ink mt-1 -tracking-[0.5px]">اليوم</h1>
      </div>

      {/* Sphere of the day — dark hero card */}
      <section className="px-5 mb-4">
        <Link href={`/spheres/${planet.key}`} className="block">
          <div
            className="rounded-[20px] p-6 relative overflow-hidden"
            style={{ background: '#0F1228' }}
          >
            {/* Subtle gradient accent */}
            <div
              className="absolute inset-0 opacity-20 rounded-[20px]"
              style={{ background: `radial-gradient(ellipse at 80% 20%, ${planet.color}, transparent 60%)` }}
            />
            <div className="relative z-10">
              <p className="text-[11px] font-semibold tracking-widest mb-4" style={{ color: planet.color }}>
                فلك اليوم
              </p>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 flex-shrink-0">
                  <div className="w-14 h-14" style={maskStyle} />
                </div>
                <div>
                  <h2 className="font-serif text-3xl text-white leading-none">{planet.nameAr}</h2>
                  <p className="text-white/50 text-sm mt-1.5">{planet.name} · اضغط للدخول ←</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Organ focus */}
      <section className="px-5 mb-4">
        <div className="bg-white rounded-[18px] p-5 border border-rule-soft">
          <p className="text-[10px] font-semibold tracking-widest text-ink-muted mb-3">العضو المحوري</p>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center"
              style={{ background: `${planet.color}22`, border: `1.5px solid ${planet.color}60` }}
            >
              <div className="w-5 h-5" style={maskStyle} />
            </div>
            <div>
              <p className="font-serif text-lg text-ink leading-snug">{planet.organAr}</p>
              <p className="text-xs text-ink-muted mt-0.5">المعدن: {planet.metalAr}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Daily practice */}
      <section className="px-5 mb-4">
        <div className="bg-cream-soft rounded-[18px] p-5 border border-rule-soft">
          <p className="text-[10px] font-semibold tracking-widest text-ink-muted mb-3">الممارسة اليومية</p>
          <p className="font-serif text-base text-ink leading-[1.8]">
            أحضر انتباهك إلى منطقة {planet.organAr.split('و')[0].trim()} في جسدك.
            لاحظ الدفء، الإيقاع، التوتر. ببساطة راقب لمدة دقيقة قبل أن يبدأ يومك.
          </p>
        </div>
      </section>

      {/* Evening reflection entry */}
      <section className="px-5">
        <Link href="/reflect" className="flex items-center justify-between bg-white rounded-[18px] p-5 border border-rule-soft">
          <div>
            <p className="text-[10px] font-semibold tracking-widest text-ink-muted mb-1">التأمّل المسائي</p>
            <p className="font-serif text-base text-ink">افتح التأمّل ←</p>
          </div>
          <span className="text-ink-muted text-xl">◌</span>
        </Link>
      </section>
    </main>
  );
}
