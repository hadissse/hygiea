'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { AstralChart } from '@/lib/chartCalculator';
import { Glyph } from '@/components/Glyph';
import { SpheresDiagram } from '@/components/SpheresDiagram';
import { LucifericAhrimanicAxis } from '@/components/LucifericAhrimanicAxis';
import {
  PLANET_IN_SIGN_MAP,
  PLANET_IN_HOUSE_MAP,
  SPHERE_BY_PLANET,
} from '@/content/reportData';

interface BirthData {
  name?: string;
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  place?: string;
  lat?: number;
  lng?: number;
  utcOffsetHours?: number;
}

// Seven classical planets in order
const CLASSICAL_PLANETS = [
  { key: 'sun',     label: 'Sun',     glyph: '☉', sphereKey: 'Sun',     color: '#D4A82A' },
  { key: 'moon',    label: 'Moon',    glyph: '☽', sphereKey: 'Moon',    color: '#5a7a8a' },
  { key: 'mercury', label: 'Mercury', glyph: '☿', sphereKey: 'Mercury', color: '#5a6a4a' },
  { key: 'venus',   label: 'Venus',   glyph: '♀', sphereKey: 'Venus',   color: '#8a5a6a' },
  { key: 'mars',    label: 'Mars',    glyph: '♂', sphereKey: 'Mars',    color: '#8b3a2a' },
  { key: 'jupiter', label: 'Jupiter', glyph: '♃', sphereKey: 'Jupiter', color: '#4a5a8a' },
  { key: 'saturn',  label: 'Saturn',  glyph: '♄', sphereKey: 'Saturn',  color: '#5a4a2a' },
] as const;

const HOUSE_ORDINALS = [
  '1st', '2nd', '3rd', '4th', '5th', '6th',
  '7th', '8th', '9th', '10th', '11th', '12th',
];

/** Determine which house (1–12) a longitude falls in, using actual house cusps. */
function getPlanetHouseNumber(longitude: number, houses: AstralChart['houses']): number {
  const cusps = houses.map((h) => h.cusp);
  for (let i = 0; i < 12; i++) {
    const next = (i + 1) % 12;
    const start = cusps[i];
    const end = cusps[next];
    const inHouse =
      end > start
        ? longitude >= start && longitude < end
        : longitude >= start || longitude < end;
    if (inHouse) return i + 1;
  }
  return 1;
}

export default function Chapter2Page() {
  const [chart, setChart] = useState<AstralChart | null>(null);
  const [birthData, setBirthData] = useState<BirthData | null>(null);

  useEffect(() => {
    try {
      const rawChart = localStorage.getItem('hygiea.primary-chart.v1');
      if (rawChart) setChart(JSON.parse(rawChart));
      const rawBirth = localStorage.getItem('hygiea.birth-data');
      if (rawBirth) setBirthData(JSON.parse(rawBirth));
    } catch {
      // silently ignore parse errors
    }
  }, []);

  return (
    <main className="min-h-dvh bg-[#FAF6EF] pb-24">
      {/* Chapter header */}
      <div className="px-5 pt-8 pb-6">
        <p className="text-xs uppercase tracking-widest text-ink-muted font-ui mb-1">
          Chapter 2
        </p>
        <h1 className="font-prose text-3xl text-ink leading-snug">
          The Seven Spheres
        </h1>
        {birthData?.name && (
          <p className="text-sm text-ink-muted font-ui mt-2">{birthData.name}</p>
        )}
      </div>

      {/* Cosmological diagram */}
      <div className="px-5 mb-8">
        <div className="bg-white rounded-[18px] border border-[#E5E1D8] p-5">
          <p className="text-xs uppercase tracking-widest text-ink-muted font-ui mb-4">
            The Planetary Spheres — Cosmological Map
          </p>
          <SpheresDiagram />
          <p className="text-xs text-ink-muted font-prose italic text-center mt-3 leading-relaxed">
            Each classical planet radiates from its sphere in the cosmic order, shaping the human constitution
            as the soul descends through them before birth and ascends through them after death.
          </p>
        </div>
      </div>

      {/* Planet sections */}
      <div className="px-5 space-y-10">
        {CLASSICAL_PLANETS.map((planet) => {
          const planetData = chart
            ? (chart as unknown as Record<string, AstralChart['sun']>)[planet.key]
            : null;

          const signName = planetData?.sign ?? '';
          const signSlug = signName.toLowerCase();
          const degree = planetData?.degree ?? null;
          const retrograde = planetData?.retrograde ?? false;

          const houseNum =
            chart && planetData
              ? getPlanetHouseNumber(planetData.longitude, chart.houses)
              : null;

          const signKey = `${planet.key}-${signSlug}`;
          const houseKey = houseNum !== null ? `${planet.key}-${houseNum}` : null;

          const sphereData = SPHERE_BY_PLANET[planet.sphereKey] ?? null;
          const signContent = PLANET_IN_SIGN_MAP[signKey] ?? null;
          const houseContent = houseKey ? (PLANET_IN_HOUSE_MAP[houseKey] ?? null) : null;

          return (
            <section key={planet.key} id={`sphere-${planet.key}`}>
              {/* Planet card */}
              <div
                className="bg-white rounded-[18px] border border-[#E5E1D8] overflow-hidden"
                style={{ borderLeftWidth: 4, borderLeftColor: planet.color }}
              >
                {/* Section header */}
                <div className="px-5 pt-5 pb-4 border-b border-[#E5E1D8]">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-3xl"
                      style={{ color: planet.color }}
                      aria-hidden="true"
                    >
                      {planet.glyph}
                    </span>
                    <div>
                      <h2 className="font-prose text-2xl text-ink leading-snug">
                        The {planet.label} Sphere
                      </h2>
                      {planetData ? (
                        <p className="text-sm text-ink-muted font-ui mt-0.5">
                          {signName}
                          {degree !== null ? ` ${degree}°` : ''}
                          {retrograde ? ' ℞' : ''}
                          {houseNum !== null
                            ? ` · House ${HOUSE_ORDINALS[houseNum - 1]}`
                            : ''}
                        </p>
                      ) : (
                        <p className="text-xs text-ink-muted font-ui mt-0.5 italic">
                          Chart not loaded
                        </p>
                      )}
                      {sphereData && (
                        <p className="text-xs text-ink-muted font-prose italic mt-1">
                          {sphereData.sphere_epithet}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-6">
                  {/* Luciferic / Ahrimanic Axis */}
                  {sphereData && (
                    <div>
                      <p className="text-xs uppercase tracking-widest text-ink-muted font-ui mb-3">
                        The Axis of Temptation
                      </p>
                      <LucifericAhrimanicAxis
                        planet={planet.key}
                        luciferic={sphereData.luciferic}
                        ahrimanic={sphereData.ahrimanic}
                        sphereName={sphereData.sphere_name}
                      />
                    </div>
                  )}

                  {/* Sphere reference — 4-col info grid */}
                  {sphereData && (
                    <div>
                      <p className="text-xs uppercase tracking-widest text-ink-muted font-ui mb-3">
                        Sphere Reference
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#FAF6EF] rounded-[12px] p-3">
                          <p className="text-[10px] uppercase tracking-widest text-ink-muted font-ui mb-1">
                            Hierarchy
                          </p>
                          <p className="font-prose text-sm text-ink">{sphereData.hierarchy}</p>
                          {sphereData.hierarchy_sub && (
                            <p className="text-xs text-ink-muted font-ui mt-0.5">
                              {sphereData.hierarchy_sub}
                            </p>
                          )}
                        </div>
                        <div className="bg-[#FAF6EF] rounded-[12px] p-3">
                          <p className="text-[10px] uppercase tracking-widest text-ink-muted font-ui mb-1">
                            Body Member
                          </p>
                          <p className="font-prose text-sm text-ink">{sphereData.body_member}</p>
                          {sphereData.body_member_sub && (
                            <p className="text-xs text-ink-muted font-ui mt-0.5">
                              {sphereData.body_member_sub}
                            </p>
                          )}
                        </div>
                        <div className="bg-[#FAF6EF] rounded-[12px] p-3">
                          <p className="text-[10px] uppercase tracking-widest text-ink-muted font-ui mb-1">
                            Organ · Metal
                          </p>
                          <p className="font-prose text-sm text-ink">{sphereData.organ}</p>
                          <p className="text-xs font-ui mt-0.5" style={{ color: planet.color }}>
                            {sphereData.metal}
                          </p>
                        </div>
                        <div className="bg-[#FAF6EF] rounded-[12px] p-3">
                          <p className="text-[10px] uppercase tracking-widest text-ink-muted font-ui mb-1">
                            Sense
                          </p>
                          <p className="font-prose text-sm text-ink">
                            {sphereData.sense || '—'}
                          </p>
                          {sphereData.sense_sub && (
                            <p className="text-xs text-ink-muted font-ui mt-0.5">
                              {sphereData.sense_sub}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Planet in Sign */}
                  {signContent ? (
                    <div>
                      <p className="text-xs uppercase tracking-widest text-ink-muted font-ui mb-3">
                        {planet.label} in {signName}
                      </p>
                      <div className="space-y-4">
                        <div>
                          <p className="text-[11px] font-ui font-semibold tracking-wide text-ink-muted mb-2">
                            The Configuration
                          </p>
                          <p className="font-prose text-[15px] text-ink leading-[1.75]">
                            {signContent.traditional_en}
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] font-ui font-semibold tracking-wide text-ink-muted mb-2">
                            Soul Development
                          </p>
                          <p className="font-prose text-[15px] text-ink leading-[1.75]">
                            {signContent.evolutionary_en}
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] font-ui font-semibold tracking-wide text-ink-muted mb-2">
                            The Task
                          </p>
                          <p className="font-prose text-[15px] text-ink leading-[1.75]">
                            {signContent.developmental_en}
                          </p>
                        </div>
                        {signContent.aphorism_en && (
                          <blockquote className="border-l-2 pl-4 my-4" style={{ borderColor: planet.color }}>
                            <p className="font-prose italic text-[15px] text-ink leading-[1.75]">
                              {signContent.aphorism_en}
                            </p>
                          </blockquote>
                        )}
                      </div>
                    </div>
                  ) : planetData ? (
                    <div className="bg-[#FAF6EF] rounded-[12px] p-4">
                      <p className="text-sm text-ink-muted font-prose italic">
                        Interpretation for {planet.label} in {signName} is being prepared.
                      </p>
                    </div>
                  ) : null}

                  {/* Planet in House */}
                  {houseContent ? (
                    <div>
                      <p className="text-xs uppercase tracking-widest text-ink-muted font-ui mb-3">
                        {planet.label} in House {houseNum !== null ? HOUSE_ORDINALS[houseNum - 1] : ''}
                      </p>
                      <div className="space-y-4">
                        <div>
                          <p className="text-[11px] font-ui font-semibold tracking-wide text-ink-muted mb-2">
                            The Configuration
                          </p>
                          <p className="font-prose text-[15px] text-ink leading-[1.75]">
                            {houseContent.traditional_en}
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] font-ui font-semibold tracking-wide text-ink-muted mb-2">
                            Soul Development
                          </p>
                          <p className="font-prose text-[15px] text-ink leading-[1.75]">
                            {houseContent.evolutionary_en}
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] font-ui font-semibold tracking-wide text-ink-muted mb-2">
                            The Task
                          </p>
                          <p className="font-prose text-[15px] text-ink leading-[1.75]">
                            {houseContent.developmental_en}
                          </p>
                        </div>
                        {houseContent.aphorism_en && (
                          <blockquote className="border-l-2 pl-4 my-4" style={{ borderColor: planet.color }}>
                            <p className="font-prose italic text-[15px] text-ink leading-[1.75]">
                              {houseContent.aphorism_en}
                            </p>
                          </blockquote>
                        )}
                      </div>
                    </div>
                  ) : houseNum !== null ? (
                    <div className="bg-[#FAF6EF] rounded-[12px] p-4">
                      <p className="text-sm text-ink-muted font-prose italic">
                        Interpretation for {planet.label} in House {HOUSE_ORDINALS[houseNum - 1]} is being prepared.
                      </p>
                    </div>
                  ) : null}

                  {/* Sphere Narrative */}
                  {sphereData?.sphere_narrative && (
                    <div>
                      <p className="text-xs uppercase tracking-widest text-ink-muted font-ui mb-3">
                        The Sphere
                      </p>
                      <p className="font-prose text-[15px] text-ink leading-[1.75]">
                        {sphereData.sphere_narrative}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="px-5 mt-12 flex justify-between items-center gap-4">
        <Link
          href="/biography/chapter1"
          className="flex items-center gap-2 px-5 py-3 rounded-[12px] border border-[#E5E1D8] bg-white text-sm text-ink font-ui hover:bg-[#FAF6EF] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Chapter 1
        </Link>
        <Link
          href="/biography/chapter3"
          className="flex items-center gap-2 px-5 py-3 rounded-[12px] border border-[#E5E1D8] bg-white text-sm text-ink font-ui hover:bg-[#FAF6EF] transition-colors"
        >
          Chapter 3
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </main>
  );
}
