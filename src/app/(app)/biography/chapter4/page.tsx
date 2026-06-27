'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NodalAxisDiagram } from '@/components/NodalAxisDiagram';
import {
  PLANET_IN_SIGN_MAP,
  PLANET_IN_HOUSE_MAP,
  SPHERE_BY_PLANET,
  type PlacementContent,
} from '@/content/reportData';
import type { AstralChart, HousePosition } from '@/lib/chartCalculator';
import { STORAGE_KEYS } from '@/lib/storageKeys';

// ─── helpers ────────────────────────────────────────────────────────────────

function getPlanetHouseNum(longitude: number, houses: HousePosition[]): number {
  if (!houses || houses.length < 12) return 1;
  for (let i = 0; i < 12; i++) {
    const curr = ((houses[i].cusp % 360) + 360) % 360;
    const next = ((houses[(i + 1) % 12].cusp % 360) + 360) % 360;
    const lon = ((longitude % 360) + 360) % 360;
    if (next > curr) {
      if (lon >= curr && lon < next) return houses[i].num;
    } else {
      if (lon >= curr || lon < next) return houses[i].num;
    }
  }
  return 1;
}

/** Convert sign name to lowercase key used in content maps */
function signKey(sign: string): string {
  return sign.toLowerCase();
}

/** Convert planet display key to content-db key */
function planetKey(key: string): string {
  const map: Record<string, string> = {
    northNode: 'north_node',
    southNode: 'south_node',
  };
  return map[key] ?? key.toLowerCase();
}

function lookupSign(planet: string, sign: string): PlacementContent | null {
  return PLANET_IN_SIGN_MAP[`${planetKey(planet)}-${signKey(sign)}`] ?? null;
}

function lookupHouse(planet: string, house: number): PlacementContent | null {
  return PLANET_IN_HOUSE_MAP[`${planetKey(planet)}-${house}`] ?? null;
}

// ─── sub-components ─────────────────────────────────────────────────────────

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-[16px] border border-[#F0EDE6] p-4 space-y-4">
      <p className="text-[11px] font-semibold tracking-wider text-ink-muted">{title.toUpperCase()}</p>
      {children}
    </div>
  );
}

function PlacementBlock({ content }: { content: PlacementContent }) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[10px] font-semibold tracking-wider text-ink-muted mb-1">Traditional</p>
        <p className="font-prose text-ink leading-relaxed text-[15px]">{content.traditional_en}</p>
      </div>
      <div>
        <p className="text-[10px] font-semibold tracking-wider text-ink-muted mb-1">Evolutionary</p>
        <p className="font-prose text-ink leading-relaxed text-[15px]">{content.evolutionary_en}</p>
      </div>
      <div>
        <p className="text-[10px] font-semibold tracking-wider text-ink-muted mb-1">Developmental</p>
        <p className="font-prose text-ink leading-relaxed text-[15px]">{content.developmental_en}</p>
      </div>
      {content.aphorism_en && (
        <blockquote className="border-l-2 border-[#C8B9A2] pl-4 italic font-prose text-ink-muted text-[14px] leading-relaxed">
          {content.aphorism_en}
        </blockquote>
      )}
    </div>
  );
}

function ProxyNote({ planet, proxyPlanet }: { planet: string; proxyPlanet: string }) {
  return (
    <p className="text-xs text-ink-muted font-ui italic mb-2">
      (Showing {proxyPlanet} in sign as karmic inheritance proxy — no direct {planet} entry)
    </p>
  );
}

// ─── main page ──────────────────────────────────────────────────────────────

export default function Chapter4Page() {
  const [chart, setChart] = useState<AstralChart | null>(null);
  const [birthData, setBirthData] = useState<{ name?: string } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CHART);
      if (raw) setChart(JSON.parse(raw));
    } catch {}
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.BIRTH_DATA);
      if (raw) setBirthData(JSON.parse(raw));
    } catch {}
  }, []);

  if (!chart) {
    return (
      <main className="bg-[#FAFAF7] flex items-center justify-center">
        <p className="text-ink-muted font-prose text-sm">No chart data found. Please set up your natal chart first.</p>
      </main>
    );
  }

  // ── Node positions ──
  const nnHouse = getPlanetHouseNum(chart.northNode.longitude, chart.houses);
  const snHouse = getPlanetHouseNum(chart.southNode.longitude, chart.houses);
  const chHouse = getPlanetHouseNum(chart.chiron.longitude, chart.houses);

  // ── South Node lookups ──
  const snSign = lookupSign('southNode', chart.southNode.sign);
  const snSignProxy = snSign ? null : lookupSign('moon', chart.southNode.sign);
  const snHouseLookup = lookupHouse('south_node', snHouse);

  // ── North Node lookups ──
  const nnSign = lookupSign('northNode', chart.northNode.sign);
  const nnSignProxy = nnSign ? null : lookupSign('moon', chart.northNode.sign);
  const nnHouseLookup = lookupHouse('north_node', nnHouse);

  // ── Chiron lookups ──
  const chSign = lookupSign('chiron', chart.chiron.sign);
  const chHouseLookup = lookupHouse('chiron', chHouse);

  const name = birthData?.name ?? 'This Soul';

  return (
    <main className="bg-cream pb-24">
      {/* Header */}
      <div className="max-w-3xl mx-auto md:max-w-6xl px-5 pt-8 pb-6">
        <Link
          href="/biography"
          className="inline-flex items-center gap-1.5 text-[11px] text-ink-muted font-semibold tracking-wider hover:text-ink transition-colors mb-6"
        >
          ← BIOGRAPHY
        </Link>
        <p className="text-[11px] font-semibold tracking-wider text-ink-muted mb-2">CHAPTER 4</p>
        <h1 className="font-serif text-3xl text-ink leading-tight">The Nodal Axis &amp; The Sacred Wound</h1>
        {name && <p className="text-sm text-ink-muted mt-2">{name} · Soul Origin &amp; Frontier</p>}
      </div>

      <div className="max-w-3xl mx-auto md:max-w-6xl px-5 py-6 space-y-5">
        {/* Nodal Axis Diagram */}
        <SectionCard title="The Nodal Axis">
          <p className="text-sm text-ink-muted font-prose leading-relaxed">
            The lunar nodes mark the two points where the Moon's orbit intersects the ecliptic. The South Node
            represents accumulated soul-history — the deep grooves of past life mastery and compensatory habit.
            The North Node marks the frontier of elected development — what the soul has committed to integrate
            in this incarnation. Chiron, the wounded healer, occupies a third pole on this axis, marking the
            place where the soul's most ancient injury becomes its most significant gift.
          </p>
          <NodalAxisDiagram
            northNode={{ sign: chart.northNode.sign, degree: chart.northNode.degree, house: `H${nnHouse}` }}
            southNode={{ sign: chart.southNode.sign, degree: chart.southNode.degree, house: `H${snHouse}` }}
            chiron={{ sign: chart.chiron.sign, degree: chart.chiron.degree, house: `H${chHouse}`, retrograde: chart.chiron.retrograde }}
          />
        </SectionCard>

        {/* South Node */}
        <SectionCard
          title={`Soul's Origin — South Node in ${chart.southNode.sign} H${snHouse}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-prose text-ink">☋</span>
            <div>
              <p className="text-xs uppercase tracking-widest text-ink-muted font-ui">
                {chart.southNode.sign} · House {snHouse} · {chart.southNode.degree}°{chart.southNode.minute}′
              </p>
            </div>
          </div>

          {/* Sign interpretation */}
          <div>
            <p className="text-xs uppercase tracking-widest text-ink-muted font-ui mb-2">South Node in {chart.southNode.sign}</p>
            {!snSign && snSignProxy && <ProxyNote planet="South Node" proxyPlanet="Moon" />}
            {(snSign ?? snSignProxy) ? (
              <PlacementBlock content={(snSign ?? snSignProxy)!} />
            ) : (
              <p className="text-sm text-ink-muted font-prose italic">No interpretation available for this placement.</p>
            )}
          </div>

          {/* House interpretation */}
          {snHouseLookup && (
            <div className="border-t border-[#F0EDE6] pt-4">
              <p className="text-xs uppercase tracking-widest text-ink-muted font-ui mb-2">South Node in House {snHouse}</p>
              <PlacementBlock content={snHouseLookup} />
            </div>
          )}
        </SectionCard>

        {/* North Node */}
        <SectionCard
          title={`Soul's Frontier — North Node in ${chart.northNode.sign} H${nnHouse}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-prose text-ink">☊</span>
            <div>
              <p className="text-xs uppercase tracking-widest text-ink-muted font-ui">
                {chart.northNode.sign} · House {nnHouse} · {chart.northNode.degree}°{chart.northNode.minute}′
              </p>
            </div>
          </div>

          {/* Sign interpretation */}
          <div>
            <p className="text-xs uppercase tracking-widest text-ink-muted font-ui mb-2">North Node in {chart.northNode.sign}</p>
            {!nnSign && nnSignProxy && <ProxyNote planet="North Node" proxyPlanet="Moon" />}
            {(nnSign ?? nnSignProxy) ? (
              <PlacementBlock content={(nnSign ?? nnSignProxy)!} />
            ) : (
              <p className="text-sm text-ink-muted font-prose italic">No interpretation available for this placement.</p>
            )}
          </div>

          {/* House interpretation */}
          {nnHouseLookup && (
            <div className="border-t border-[#F0EDE6] pt-4">
              <p className="text-xs uppercase tracking-widest text-ink-muted font-ui mb-2">North Node in House {nnHouse}</p>
              <PlacementBlock content={nnHouseLookup} />
            </div>
          )}
        </SectionCard>

        {/* Chiron */}
        <SectionCard
          title={`The Ancient Wound — Chiron in ${chart.chiron.sign} H${chHouse}${chart.chiron.retrograde ? ' ℞' : ''}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-prose text-ink">⚷</span>
            <div>
              <p className="text-xs uppercase tracking-widest text-ink-muted font-ui">
                {chart.chiron.sign} · House {chHouse} · {chart.chiron.degree}°{chart.chiron.minute}′
                {chart.chiron.retrograde && <span className="ml-2 text-ink-muted">℞ retrograde</span>}
              </p>
            </div>
          </div>

          {chart.chiron.retrograde && (
            <p className="text-sm font-prose text-ink-muted leading-relaxed bg-[#FAFAF7] rounded-xl p-4 border border-[#F0EDE6]">
              Chiron retrograde intensifies the inward orientation of the wound — the healing process runs
              primarily through interior reckoning rather than outward circumstance. The soul's relationship
              to its own injury is more directly accessible to consciousness, and often more demanding for it.
              The gift, when it arrives, carries the quality of something earned rather than bestowed.
            </p>
          )}

          {/* Sign interpretation */}
          <div>
            <p className="text-xs uppercase tracking-widest text-ink-muted font-ui mb-2">Chiron in {chart.chiron.sign}</p>
            {chSign ? (
              <PlacementBlock content={chSign} />
            ) : (
              <p className="text-sm text-ink-muted font-prose italic">No interpretation available for this placement.</p>
            )}
          </div>

          {/* House interpretation */}
          {chHouseLookup && (
            <div className="border-t border-[#F0EDE6] pt-4">
              <p className="text-xs uppercase tracking-widest text-ink-muted font-ui mb-2">Chiron in House {chHouse}</p>
              <PlacementBlock content={chHouseLookup} />
            </div>
          )}
        </SectionCard>

        {/* Freedom & Karma — Steiner GA 228 */}
        <SectionCard title="Freedom &amp; Karma — The Saturn Powers as Karmic Memory">
          <p className="text-[10px] uppercase tracking-widest text-ink-muted font-ui mb-3">
            Rudolf Steiner · Spiritual Knowledge as a Foundation for Action · GA 228
          </p>

          <div className="space-y-4 font-prose text-ink leading-relaxed text-[15px]">
            <p>
              Saturn, the outermost of the classical planets, occupies a position in Steiner's cosmology that
              is at once the most conservative and the most liberating. Where the inner planets move swiftly
              through the signs — carrying the transient impressions of a single life — Saturn moves with
              deliberate slowness, completing its circuit in approximately twenty-nine and a half years. This
              measured pace is not incidental. For Steiner, Saturn carries what he calls the "memory of the
              cosmos" — the accumulated record of everything that has occurred within the solar system across
              vast stretches of time.
            </p>

            <p>
              In GA 228, Steiner speaks of the Saturn sphere as the place through which the soul passes between
              incarnations — specifically, the threshold region in which the soul confronts the full karmic
              weight of its past actions. He describes this as neither punishment nor reward but as a form of
              precise spiritual mathematics: the forces that were set in motion in previous lives continue to
              reverberate, and Saturn's sphere is the region in which those reverberations become fully legible
              to the incarnating soul. The soul does not encounter karma as something imposed from without but
              as something it itself has generated and must now — in the fullness of its freedom — take up.
            </p>

            <p>
              The link to the nodal axis is direct and profound. The South Node, as understood in evolutionary
              astrology, represents exactly this Saturnine accumulation — the habits of soul, the grooves worn
              deep by repetition across incarnations, the compensatory strategies that once served and now
              constrain. The North Node represents what Steiner would call the pre-birth intention: what the
              soul, in the lucidity available between incarnations, chose to develop. It is the frontier toward
              which freedom itself points.
            </p>

            <p>
              Chiron enters this picture as the wound that bridges past and future. In Steiner's language, the
              wound is not a misfortune but a developmental necessity — the place where the soul's resistance
              to its own evolution is most concentrated, and therefore the place where the greatest
              transformation becomes possible. The ancient wound is ancient precisely because it has been carried
              across multiple incarnations without resolution; its persistence is not a sign of failure but of
              the depth of the work required.
            </p>

            <p>
              What GA 228 illuminates above all is that the Saturn powers, the nodal axis, and the wound of
              Chiron form a single integrated system in the soul's development. Memory is not weight to be shed
              but substance to be transformed. The karmic patterns preserved in Saturn's sphere are not
              limitations imposed upon freedom — they are the raw material out of which genuine freedom is
              forged. Freedom, in this Steinerian sense, is not the absence of karma but the conscious
              transformation of it: the moment at which the soul ceases to repeat what has been unconsciously
              inherited and begins, with full awareness, to choose what it becomes.
            </p>

            <p>
              This chapter of the biography, then, is not a record of what has been fixed in you — it is a
              map of the territory in which your most significant freedom is at stake.
            </p>
          </div>
        </SectionCard>

      </div>
    </main>
  );
}
