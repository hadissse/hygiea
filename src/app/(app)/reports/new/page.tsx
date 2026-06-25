'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  FIXED_STARS as FIXED_STARS_DATA,
  PLANET_IN_SIGN_MAP,
  PLANET_IN_HOUSE_MAP,
  SPHERE_BY_PLANET,
} from '@/content/reportData';
import { SpheresDiagram } from '@/components/SpheresDiagram';

// ── Constants ─────────────────────────────────────────────────────────────────

const CLASSICAL_PLANETS = ['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn'];
const ALL_PLANETS = [
  'Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn',
  'Uranus','Neptune','Pluto','Chiron','North Node','South Node',
  'Ascendant','Midheaven',
];
const SIGNS = [
  'Aries','Taurus','Gemini','Cancer','Leo','Virgo',
  'Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces',
];
const ASPECT_TYPES = ['conjunction','sextile','trine','square','opposition','quincunx','semisquare','sesquiquadrate'];
const FIXED_STARS = FIXED_STARS_DATA.map(s => s.star_name);

// Steiner GA228: inner planets = destiny-determining; outer = freedom-making
const FREEDOM_DESTINY: Record<string, string> = {
  Moon: 'Destiny-determining · Heredity',
  Mercury: 'Destiny-determining · Rational soul',
  Venus: 'Destiny-determining · Temperament',
  Sun: 'Mediating · Freedom ↔ Destiny',
  Mars: 'Freedom-making · Speech',
  Jupiter: 'Freedom-making · Wisdom',
  Saturn: 'Freedom-making · Karma memory',
};

// ── Types ─────────────────────────────────────────────────────────────────────

interface PlanetRow { id: number; planet: string; sign: string; degree: string; house: string; retro: boolean }
interface AspectRow  { id: number; p1: string; type: string; p2: string; orb: string; note: string }
interface StarRow    { id: number; star: string; planet: string; orb: string; note: string }

type Notes = {
  // Ch 1 – The Arc
  ch1_threefold: string; physical_body: string; etheric_body: string;
  astral_body: string; ego: string; moon_phase: string;
  // Ch 2 – Seven Spheres (classical planets)
  sphere_sun: string; sphere_moon: string; sphere_mercury: string;
  sphere_venus: string; sphere_mars: string; sphere_jupiter: string; sphere_saturn: string;
  arena_sun: string; arena_moon: string; arena_mercury: string;
  arena_venus: string; arena_mars: string; arena_jupiter: string; arena_saturn: string;
  sun_synthesis: string; moon_synthesis: string; sun_aspects: string; moon_aspects: string;
  asc_note: string; asc_sun: string;
  // Ch 3 – Outer Spheres
  outer_uranus: string; outer_neptune: string; outer_pluto: string; outer_synthesis: string;
  // Ch 4 – Nodal Axis & Sacred Wound
  nodal: string; chiron: string; chiron_spirit: string; freedom_karma: string;
  // Ch 5 – Aspects
  stellium: string; house_concentration: string;
  // Ch 6 – Mission
  outer_mission: string; inner_mission: string; cosmic_mission: string; soul_gifts: string;
}

const EMPTY_NOTES: Notes = {
  ch1_threefold:'', physical_body:'', etheric_body:'', astral_body:'', ego:'', moon_phase:'',
  sphere_sun:'', sphere_moon:'', sphere_mercury:'', sphere_venus:'', sphere_mars:'', sphere_jupiter:'', sphere_saturn:'',
  arena_sun:'', arena_moon:'', arena_mercury:'', arena_venus:'', arena_mars:'', arena_jupiter:'', arena_saturn:'',
  sun_synthesis:'', moon_synthesis:'', sun_aspects:'', moon_aspects:'', asc_note:'', asc_sun:'',
  outer_uranus:'', outer_neptune:'', outer_pluto:'', outer_synthesis:'',
  nodal:'', chiron:'', chiron_spirit:'', freedom_karma:'',
  stellium:'', house_concentration:'',
  outer_mission:'', inner_mission:'', cosmic_mission:'', soul_gifts:'',
};

// ── Shared styles ─────────────────────────────────────────────────────────────

const inp = 'w-full border border-[#E5E1D8] rounded-lg px-3 py-2 text-sm bg-white text-ink focus:outline-none focus:border-midnight';
const sel = 'w-full border border-[#E5E1D8] rounded-lg px-3 py-2 text-sm bg-white text-ink focus:outline-none focus:border-midnight';
const ta  = 'w-full border border-[#E5E1D8] rounded-lg px-3 py-2 text-sm bg-white text-ink focus:outline-none focus:border-midnight resize-none';

// ── Sub-components ────────────────────────────────────────────────────────────

function NoteField({ label, noteKey, notes, onChange, placeholder, rows = 3 }: {
  label: string; noteKey: keyof Notes; notes: Notes;
  onChange: (k: keyof Notes, v: string) => void;
  placeholder?: string; rows?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-ink-muted mb-1">{label}</label>
      <textarea
        className={ta}
        rows={rows}
        value={notes[noteKey]}
        placeholder={placeholder ?? ''}
        onChange={e => onChange(noteKey, e.target.value)}
      />
    </div>
  );
}

function ChapterSection({ num, title, subtitle, children, defaultOpen = false }: {
  num: string; title: string; subtitle?: string;
  children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-[18px] border border-[#E5E1D8] mb-4 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div>
          <span className="text-[10px] uppercase tracking-widest text-ink-muted font-ui">{num}</span>
          <h2 className="text-base font-prose font-medium text-ink leading-tight">{title}</h2>
          {subtitle && <p className="text-xs text-ink-muted mt-0.5">{subtitle}</p>}
        </div>
        <span className="text-ink-muted text-lg shrink-0 ml-4">{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className="px-5 pb-5 border-t border-[#E5E1D8] pt-4">{children}</div>}
    </div>
  );
}

function SpherePanelContent({ planet, planetRows, notes, onChange }: {
  planet: string;
  planetRows: PlanetRow[];
  notes: Notes;
  onChange: (k: keyof Notes, v: string) => void;
}) {
  const [showInterp, setShowInterp] = useState(false);
  const row = planetRows.find(r => r.planet === planet);
  const sphere = SPHERE_BY_PLANET[planet];
  const sphereKey = `sphere_${planet.toLowerCase()}` as keyof Notes;
  const arenaKey  = `arena_${planet.toLowerCase()}` as keyof Notes;
  const fd = FREEDOM_DESTINY[planet] ?? '';

  const signInterp  = row?.sign  ? PLANET_IN_SIGN_MAP[`${planet}-${row.sign}`]  : null;
  const houseInterp = row?.house ? PLANET_IN_HOUSE_MAP[`${planet}-${row.house}`] : null;

  return (
    <div className="mb-4 border border-[#E5E1D8] rounded-[14px] overflow-hidden">
      {/* Sphere header */}
      <div className="bg-[#F8F5EF] px-4 py-3 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-prose font-semibold text-ink">{planet}</span>
            {row?.sign && <span className="text-xs text-ink-muted">in {row.sign}</span>}
            {row?.house && <span className="text-xs text-ink-muted">H{row.house}</span>}
            {row?.retro && <span className="text-xs text-gold">℞</span>}
          </div>
          {sphere && (
            <p className="text-xs text-ink-muted italic mt-0.5">{sphere.sphere_epithet}</p>
          )}
        </div>
        {fd && (
          <span className="text-[10px] text-ink-muted/70 text-right shrink-0 max-w-[140px] leading-tight">{fd}</span>
        )}
      </div>

      <div className="px-4 py-3 space-y-3">
        {/* Sphere reference card */}
        {sphere && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div className="bg-[#F4F0E8] rounded-lg p-2">
              <p className="text-[10px] uppercase tracking-wider text-ink-muted mb-0.5">Hierarchy</p>
              <p className="font-medium text-ink">{sphere.hierarchy}</p>
              <p className="text-ink-muted">{sphere.hierarchy_sub}</p>
            </div>
            <div className="bg-[#F4F0E8] rounded-lg p-2">
              <p className="text-[10px] uppercase tracking-wider text-ink-muted mb-0.5">Body Member</p>
              <p className="font-medium text-ink">{sphere.body_member}</p>
              <p className="text-ink-muted">{sphere.body_member_sub}</p>
            </div>
            <div className="bg-[#F4F0E8] rounded-lg p-2">
              <p className="text-[10px] uppercase tracking-wider text-ink-muted mb-0.5">Organ · Metal</p>
              <p className="font-medium text-ink">{sphere.organ || '—'}</p>
              <p className="text-ink-muted">{sphere.metal}</p>
            </div>
            <div className="bg-[#F4F0E8] rounded-lg p-2">
              <p className="text-[10px] uppercase tracking-wider text-ink-muted mb-0.5">Sense</p>
              <p className="font-medium text-ink">{sphere.sense || '—'}</p>
              <p className="text-ink-muted">{sphere.sense_sub}</p>
            </div>
          </div>
        )}

        {/* Luciferic / Ahrimanic */}
        {sphere?.luciferic && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-2">
              <p className="text-[10px] uppercase tracking-wider text-amber-600 mb-1">Luciferic pole</p>
              <p className="text-ink-muted leading-relaxed">{sphere.luciferic}</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-2">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Ahrimanic pole</p>
              <p className="text-ink-muted leading-relaxed">{sphere.ahrimanic}</p>
            </div>
          </div>
        )}

        {/* Interpretation preview */}
        {(signInterp || houseInterp) && (
          <div>
            <button
              onClick={() => setShowInterp(o => !o)}
              className="text-xs text-midnight hover:underline"
            >
              {showInterp ? '▲ Hide' : '▼ Show'} content DB preview
            </button>
            {showInterp && (
              <div className="mt-2 space-y-2">
                {signInterp && (
                  <div className="bg-[#F4F0E8] rounded-lg p-3">
                    <p className="text-[10px] uppercase tracking-wider text-ink-muted mb-1">{planet} in {row?.sign} — traditional</p>
                    <p className="text-xs text-ink-muted leading-relaxed line-clamp-6">{signInterp.traditional_en}</p>
                    {signInterp.aphorism_en && (
                      <p className="text-xs text-ink italic mt-1">"{signInterp.aphorism_en}"</p>
                    )}
                  </div>
                )}
                {houseInterp && (
                  <div className="bg-[#F4F0E8] rounded-lg p-3">
                    <p className="text-[10px] uppercase tracking-wider text-ink-muted mb-1">{planet} in House {row?.house} — traditional</p>
                    <p className="text-xs text-ink-muted leading-relaxed line-clamp-6">{houseInterp.traditional_en}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Sphere + Arena notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <NoteField
            label={`${planet} — Sphere note (override/supplement)`}
            noteKey={sphereKey}
            notes={notes}
            onChange={onChange}
            placeholder={`Narrative for the ${planet} sphere in this chart…`}
            rows={3}
          />
          <NoteField
            label={`${planet} — Arena / House note`}
            noteKey={arenaKey}
            notes={notes}
            onChange={onChange}
            placeholder={`House arena interpretation for ${planet}…`}
            rows={3}
          />
        </div>

        {/* Extra fields for Sun / Moon */}
        {planet === 'Sun' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <NoteField label="Sun — Aspects narrative" noteKey="sun_aspects" notes={notes} onChange={onChange} placeholder="Key Sun aspects in this chart…" rows={2} />
            <NoteField label="Sun — Synthesis" noteKey="sun_synthesis" notes={notes} onChange={onChange} placeholder="Integrative Sun reading…" rows={2} />
          </div>
        )}
        {planet === 'Moon' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <NoteField label="Moon — Phase at birth" noteKey="moon_phase" notes={notes} onChange={onChange} placeholder="Waxing gibbous, day 12…" rows={1} />
            <NoteField label="Moon — Aspects narrative" noteKey="moon_aspects" notes={notes} onChange={onChange} placeholder="Key Moon aspects…" rows={2} />
            <NoteField label="Moon — Synthesis" noteKey="moon_synthesis" notes={notes} onChange={onChange} placeholder="Integrative Moon reading…" rows={2} />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function NewReportPage() {
  const idRef = useRef(0);
  const uid = () => ++idRef.current;

  const [name, setName]           = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [birthtime, setBirthtime] = useState('');
  const [birthplace, setBirthplace] = useState('');

  const [planetRows, setPlanetRows] = useState<PlanetRow[]>(() =>
    ALL_PLANETS.map(p => ({ id: uid(), planet: p, sign: 'Aries', degree: '', house: '', retro: false }))
  );
  const [aspectRows, setAspectRows] = useState<AspectRow[]>([]);
  const [starRows,   setStarRows]   = useState<StarRow[]>([]);
  const [notes, setNotes]           = useState<Notes>(EMPTY_NOTES);
  const [status, setStatus]         = useState('');
  const [loading, setLoading]       = useState(false);
  const [showDiagram, setShowDiagram] = useState(false);

  function updateNote(key: keyof Notes, value: string) {
    setNotes(n => ({ ...n, [key]: value }));
  }

  function updatePlanet(id: number, field: keyof PlanetRow, value: string | boolean) {
    setPlanetRows(rows => rows.map(r => r.id === id ? { ...r, [field]: value } : r));
  }
  function addPlanet() {
    setPlanetRows(rows => [...rows, { id: uid(), planet: 'Sun', sign: 'Aries', degree: '', house: '', retro: false }]);
  }
  function removePlanet(id: number) { setPlanetRows(rows => rows.filter(r => r.id !== id)); }

  function addAspect() {
    setAspectRows(rows => [...rows, { id: uid(), p1: 'Sun', type: 'conjunction', p2: 'Moon', orb: '', note: '' }]);
  }
  function updateAspect(id: number, field: keyof AspectRow, value: string) {
    setAspectRows(rows => rows.map(r => r.id === id ? { ...r, [field]: value } : r));
  }
  function removeAspect(id: number) { setAspectRows(rows => rows.filter(r => r.id !== id)); }

  function addStar() {
    setStarRows(rows => [...rows, { id: uid(), star: 'Sirius', planet: 'Sun', orb: '', note: '' }]);
  }
  function updateStar(id: number, field: keyof StarRow, value: string) {
    setStarRows(rows => rows.map(r => r.id === id ? { ...r, [field]: value } : r));
  }
  function removeStar(id: number) { setStarRows(rows => rows.filter(r => r.id !== id)); }

  async function handleGenerate() {
    if (!name || !birthdate) { setStatus('Please fill in Name and Birth Date.'); return; }
    const payload = {
      name, birthdate, birthtime, birthplace,
      planets: planetRows.filter(r => r.degree).map(r => ({
        planet: r.planet, sign: r.sign, degree: r.degree, house: r.house, retro: r.retro,
      })),
      aspects: aspectRows.map(r => ({ p1: r.p1, type: r.type, p2: r.p2, orb: r.orb, note: r.note })),
      fixed_stars: starRows.map(r => ({ star: r.star, planet: r.planet, orb: r.orb, note: r.note })),
      notes: Object.fromEntries(Object.entries(notes).filter(([, v]) => (v as string).trim())),
    };
    setLoading(true);
    setStatus('Sending to report engine…');
    try {
      const res = await fetch('http://localhost:5050/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `${name.replace(/\s+/g, '_')}_Cosmological_Biography.docx`;
        a.click(); URL.revokeObjectURL(url);
        setStatus('Report downloaded successfully.');
      } else {
        const err = await res.json().catch(() => ({}));
        setStatus(`Engine error: ${(err as { error?: string }).error || res.statusText}`);
      }
    } catch { setStatus('Could not reach the report engine at localhost:5050 — make sure it is running.'); }
    setLoading(false);
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="px-5 pt-8 pb-32 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Link href="/reports" className="text-ink-muted text-sm hover:text-ink transition-colors">← Reports</Link>
      </div>
      <h1 className="text-xl font-prose font-medium text-ink mb-1">New Cosmological Biography</h1>
      <p className="text-xs text-ink-muted font-ui mb-5">Fill in the chart data across the six chapters below, then generate the .docx report.</p>

      {/* Sphere Diagram toggle */}
      <div className="mb-5">
        <button
          onClick={() => setShowDiagram(o => !o)}
          className="text-xs text-midnight border border-dashed border-midnight rounded-lg px-4 py-2 hover:bg-[#F0F2F8] transition-colors"
        >
          {showDiagram ? '▲ Hide' : '▼ Show'} Cosmological Sphere Diagram
        </button>
        {showDiagram && (
          <div className="mt-4 bg-white border border-[#E5E1D8] rounded-[18px] p-4">
            <SpheresDiagram />
            <p className="text-[10px] text-ink-muted text-center mt-2 italic">
              Steiner GA 228 — sphere layers from pre-incarnation to physical. Inner = destiny-determining, outer = freedom-making.
            </p>
          </div>
        )}
      </div>

      {/* ── Chapter 1 – The Arc ─────────────────────────────────────────────── */}
      <ChapterSection num="Chapter 1" title="The Arc" subtitle="Birth data · Natal positions · Body members" defaultOpen>
        {/* Client Info */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="col-span-2 md:col-span-1">
            <label className="block text-xs text-ink-muted mb-1">Full Name</label>
            <input className={inp} placeholder="e.g. Jordan Burress" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs text-ink-muted mb-1">Birth Date</label>
            <input className={inp} placeholder="20 December 1987" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs text-ink-muted mb-1">Birth Time</label>
            <input className={inp} placeholder="11:10" value={birthtime} onChange={e => setBirthtime(e.target.value)} />
          </div>
          <div className="col-span-2">
            <label className="block text-xs text-ink-muted mb-1">Birth Place</label>
            <input className={inp} placeholder="Charleston, USA" value={birthplace} onChange={e => setBirthplace(e.target.value)} />
          </div>
        </div>

        {/* Natal positions table */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-ink-muted font-ui mb-3">Natal Positions</p>
          <div className="hidden md:grid grid-cols-[2fr_2fr_1.5fr_1fr_auto_auto] gap-2 text-xs text-ink-muted uppercase tracking-wider font-ui px-1 mb-2">
            <span>Body</span><span>Sign</span><span>Degree</span><span>House</span><span>℞</span><span></span>
          </div>
          <div className="space-y-2">
            {planetRows.map(row => (
              <div key={row.id} className="grid grid-cols-[2fr_2fr_1.5fr_1fr_auto_auto] gap-2 items-center">
                <select className={sel} value={row.planet} onChange={e => updatePlanet(row.id, 'planet', e.target.value)}>
                  {ALL_PLANETS.map(p => <option key={p}>{p}</option>)}
                </select>
                <select className={sel} value={row.sign} onChange={e => updatePlanet(row.id, 'sign', e.target.value)}>
                  {SIGNS.map(s => <option key={s}>{s}</option>)}
                </select>
                <input className={inp} placeholder="17°23′" value={row.degree} onChange={e => updatePlanet(row.id, 'degree', e.target.value)} />
                <input className={inp} placeholder="1–12" value={row.house} onChange={e => updatePlanet(row.id, 'house', e.target.value)} />
                <input type="checkbox" className="w-4 h-4 cursor-pointer" checked={row.retro}
                  onChange={e => updatePlanet(row.id, 'retro', e.target.checked)} title="Retrograde" />
                <button onClick={() => removePlanet(row.id)} className="text-[#E5E1D8] hover:text-red-400 text-lg leading-none">×</button>
              </div>
            ))}
          </div>
          <button onClick={addPlanet} className="mt-3 text-xs text-midnight border border-dashed border-midnight rounded-lg px-4 py-2 hover:bg-[#F0F2F8] transition-colors">
            + Add body
          </button>
        </div>

        {/* Ninefold Constitution reference */}
        <div className="mb-6 bg-[#F8F5EF] rounded-[14px] p-4">
          <p className="text-xs uppercase tracking-widest text-ink-muted font-ui mb-3">Ninefold Constitution</p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-ink-muted mb-1">Lower Four — Instrument</p>
              {['Physical body','Etheric body','Astral body','The I (Ego)'].map(m => (
                <p key={m} className="text-ink-muted py-0.5 border-b border-[#E5E1D8] last:border-0">{m}</p>
              ))}
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-ink-muted mb-1">Soul Triad — Arena Now</p>
              {['Sentient Soul','Intellectual Soul','Consciousness Soul'].map(m => (
                <p key={m} className="text-ink-muted py-0.5 border-b border-[#E5E1D8] last:border-0">{m}</p>
              ))}
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-ink-muted mb-1">Spirit Triad — Horizon</p>
              {['Spirit-Self (Manas)','Life-Spirit (Buddhi)','Spirit-Man (Atma)'].map(m => (
                <p key={m} className="text-ink-muted py-0.5 border-b border-[#E5E1D8] last:border-0">{m}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Ch1 note fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NoteField label="1.1 Threefold Nature — Body / Soul / Spirit" noteKey="ch1_threefold" notes={notes} onChange={updateNote} placeholder="Spirit / Soul / Body reading for this chart…" />
          <NoteField label="Astral Body" noteKey="astral_body" notes={notes} onChange={updateNote} placeholder="Core astral configuration…" />
          <NoteField label="Physical Body" noteKey="physical_body" notes={notes} onChange={updateNote} placeholder="Physical constitution notes…" />
          <NoteField label="Etheric Body" noteKey="etheric_body" notes={notes} onChange={updateNote} placeholder="Life-force / formative forces…" />
          <NoteField label="The I (Ego)" noteKey="ego" notes={notes} onChange={updateNote} placeholder="I-development in this chart…" />
          <NoteField label="Moon Phase at Birth" noteKey="moon_phase" notes={notes} onChange={updateNote} placeholder="e.g. Waxing gibbous, day 10…" rows={2} />
        </div>
      </ChapterSection>

      {/* ── Chapter 2 – The Seven Spheres ───────────────────────────────────── */}
      <ChapterSection
        num="Chapter 2"
        title="The Seven Spheres"
        subtitle="Sun · Moon · Mercury · Venus · Mars · Jupiter · Saturn"
      >
        <p className="text-xs text-ink-muted mb-4">
          Each sphere panel shows the Steiner hierarchy/organ/metal reference card and auto-loads interpretation text from the content database based on your natal entries above. Add narrative notes to override or supplement the generated prose.
        </p>
        {CLASSICAL_PLANETS.map(planet => (
          <SpherePanelContent
            key={planet}
            planet={planet}
            planetRows={planetRows}
            notes={notes}
            onChange={updateNote}
          />
        ))}
        {/* Ascendant notes */}
        <div className="border border-[#E5E1D8] rounded-[14px] p-4 mt-2">
          <p className="text-xs font-medium text-ink mb-3">Ascendant</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <NoteField label="Ascendant — body note" noteKey="asc_note" notes={notes} onChange={updateNote} placeholder="Rising sign constitution…" />
            <NoteField label="Ascendant — Sun integration" noteKey="asc_sun" notes={notes} onChange={updateNote} placeholder="How the ASC and Sun work together…" />
          </div>
        </div>
      </ChapterSection>

      {/* ── Chapter 3 – Outer Spheres ────────────────────────────────────────── */}
      <ChapterSection
        num="Chapter 3"
        title="The Outer Spheres"
        subtitle="Uranus · Neptune · Pluto — awakening, dissolution, regeneration"
      >
        <p className="text-xs text-ink-muted mb-4">
          Beyond the classical seven — the transpersonal forces. Positions are entered in Chapter 1's natal table.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NoteField label="Uranus — Awakening Force" noteKey="outer_uranus" notes={notes} onChange={updateNote} placeholder="Uranus placement narrative…" />
          <NoteField label="Neptune — Dissolution &amp; Longing" noteKey="outer_neptune" notes={notes} onChange={updateNote} placeholder="Neptune placement narrative…" />
          <NoteField label="Pluto — Death-Regeneration" noteKey="outer_pluto" notes={notes} onChange={updateNote} placeholder="Pluto placement narrative…" />
          <NoteField label="Outer Spheres — Synthesis" noteKey="outer_synthesis" notes={notes} onChange={updateNote} placeholder="How Uranus/Neptune/Pluto work together in this chart…" />
        </div>
      </ChapterSection>

      {/* ── Chapter 4 – Nodal Axis & Sacred Wound ───────────────────────────── */}
      <ChapterSection
        num="Chapter 4"
        title="The Nodal Axis &amp; The Sacred Wound"
        subtitle="North Node · South Node · Chiron — soul origin, frontier, ancient wound"
      >
        <p className="text-xs text-ink-muted mb-4">
          Node and Chiron positions from Chapter 1. Saturn powers relate to what lives in karma (GA 228) — this chapter traces that thread.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NoteField label="Nodal Axis" noteKey="nodal" notes={notes} onChange={updateNote} placeholder="Soul origin (S.Node) and frontier (N.Node)…" />
          <NoteField label="Chiron — The Ancient Wound" noteKey="chiron" notes={notes} onChange={updateNote} placeholder="Chiron placement and wound…" />
          <NoteField label="Chiron — Spirit Reading" noteKey="chiron_spirit" notes={notes} onChange={updateNote} placeholder="Spiritual dimension of the Chiron wound…" />
          <NoteField label="Freedom Within Karma" noteKey="freedom_karma" notes={notes} onChange={updateNote} placeholder="How destiny and freedom interweave in this chart… (GA 228: Saturn = karmic memory, Moon = heredity)" />
        </div>
      </ChapterSection>

      {/* ── Chapter 5 – Aspects & Configurations ────────────────────────────── */}
      <ChapterSection
        num="Chapter 5"
        title="Aspects &amp; Configurations"
        subtitle="Karmic agreements · Stellium · Fixed stars · House concentrations"
      >
        {/* Aspects table */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-ink-muted font-ui mb-3">Key Aspects</p>
          <div className="space-y-3">
            {aspectRows.map(row => (
              <div key={row.id} className="grid grid-cols-[1fr_1.2fr_1fr_1fr_auto] gap-2 items-start">
                <select className={sel} value={row.p1} onChange={e => updateAspect(row.id, 'p1', e.target.value)}>
                  {ALL_PLANETS.map(p => <option key={p}>{p}</option>)}
                </select>
                <select className={sel} value={row.type} onChange={e => updateAspect(row.id, 'type', e.target.value)}>
                  {ASPECT_TYPES.map(a => <option key={a}>{a}</option>)}
                </select>
                <select className={sel} value={row.p2} onChange={e => updateAspect(row.id, 'p2', e.target.value)}>
                  {ALL_PLANETS.map(p => <option key={p}>{p}</option>)}
                </select>
                <input className={inp} placeholder="orb e.g. 1°22′" value={row.orb} onChange={e => updateAspect(row.id, 'orb', e.target.value)} />
                <button onClick={() => removeAspect(row.id)} className="text-[#E5E1D8] hover:text-red-400 text-lg leading-none pt-2">×</button>
                <textarea className={`${ta} col-span-4`} placeholder="Optional custom note for this aspect…"
                  value={row.note} rows={2} onChange={e => updateAspect(row.id, 'note', e.target.value)} />
              </div>
            ))}
          </div>
          {aspectRows.length === 0 && <p className="text-xs text-ink-muted mb-2">No aspects added yet.</p>}
          <button onClick={addAspect} className="mt-2 text-xs text-midnight border border-dashed border-midnight rounded-lg px-4 py-2 hover:bg-[#F0F2F8] transition-colors">
            + Add aspect
          </button>
        </div>

        {/* Fixed stars */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-ink-muted font-ui mb-3">Fixed Star Conjunctions</p>
          <div className="space-y-3">
            {starRows.map(row => (
              <div key={row.id} className="grid grid-cols-[1.5fr_1.5fr_1fr_auto] gap-2 items-start">
                <select className={sel} value={row.star} onChange={e => updateStar(row.id, 'star', e.target.value)}>
                  {FIXED_STARS.map(s => <option key={s}>{s}</option>)}
                </select>
                <select className={sel} value={row.planet} onChange={e => updateStar(row.id, 'planet', e.target.value)}>
                  {ALL_PLANETS.map(p => <option key={p}>{p}</option>)}
                </select>
                <input className={inp} placeholder="orb" value={row.orb} onChange={e => updateStar(row.id, 'orb', e.target.value)} />
                <button onClick={() => removeStar(row.id)} className="text-[#E5E1D8] hover:text-red-400 text-lg leading-none pt-2">×</button>
                <textarea className={`${ta} col-span-3`} placeholder="Optional note for this star conjunction…"
                  value={row.note} rows={2} onChange={e => updateStar(row.id, 'note', e.target.value)} />
              </div>
            ))}
          </div>
          {starRows.length === 0 && <p className="text-xs text-ink-muted mb-2">No fixed stars added yet.</p>}
          <button onClick={addStar} className="mt-2 text-xs text-midnight border border-dashed border-midnight rounded-lg px-4 py-2 hover:bg-[#F0F2F8] transition-colors">
            + Add fixed star
          </button>
        </div>

        {/* Stellium + House concentration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NoteField label="Stellium — Points of Fusion" noteKey="stellium" notes={notes} onChange={updateNote} placeholder="Describe any significant stellium (sign, house, planets)…" />
          <NoteField label="House Concentration" noteKey="house_concentration" notes={notes} onChange={updateNote} placeholder="Describe house concentration patterns…" />
        </div>
      </ChapterSection>

      {/* ── Chapter 6 – The I's Mission ─────────────────────────────────────── */}
      <ChapterSection
        num="Chapter 6"
        title="The I's Mission"
        subtitle="Outer mission · Inner mission · Cosmic mission · Soul gifts"
      >
        <p className="text-xs text-ink-muted mb-4">
          The culminating synthesis. What the I has come to do, develop, and give.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NoteField label="Outer Mission" noteKey="outer_mission" notes={notes} onChange={updateNote} placeholder="Visible work in the world…" rows={4} />
          <NoteField label="Inner Mission" noteKey="inner_mission" notes={notes} onChange={updateNote} placeholder="Psychological development demanded…" rows={4} />
          <NoteField label="Cosmic Mission" noteKey="cosmic_mission" notes={notes} onChange={updateNote} placeholder="Contribution to humanity's arc…" rows={4} />
          <NoteField label="The Four Soul Gifts" noteKey="soul_gifts" notes={notes} onChange={updateNote} placeholder="The gifts this soul offers the world…" rows={4} />
        </div>
      </ChapterSection>

      {/* ── Generate bar ─────────────────────────────────────────────────────── */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-cream/95 backdrop-blur border-t border-[#E5E1D8] px-5 py-4 flex items-center gap-4 z-40">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex-1 md:flex-none md:w-64 py-3.5 rounded-[26px] bg-midnight text-white font-semibold text-sm disabled:opacity-40 transition-opacity"
        >
          {loading ? 'Generating…' : 'Generate Report (.docx)'}
        </button>
        {status && (
          <p className={`text-xs flex-1 ${status.startsWith('Could not') || status.startsWith('Engine') ? 'text-red-500' : 'text-ink-muted'}`}>
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
