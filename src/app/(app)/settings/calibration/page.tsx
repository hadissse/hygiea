'use client';

import { useEffect, useState } from 'react';
import { SettingsSubHeader } from '@/components/SettingsSubHeader';
import { Body } from '@/components/Body';

const TYPE_LABEL: Record<string, string> = {
  planet: 'Planet',
  sign: 'Sign',
  house: 'House',
  aspect: 'Aspect',
  element: 'Element',
};

const VALUE_LABEL: Record<string, string> = { yes: 'Yes', partial: 'Partial', no: 'No' };

interface CalEntry {
  label: string;
  value: string;
}

export default function CalibrationPage() {
  const [entries, setEntries] = useState<CalEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const out: CalEntry[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('hygiea.calibration.')) {
        const raw = k.replace('hygiea.calibration.', ''); // type:key
        const [type, key] = raw.split(':');
        const value = localStorage.getItem(k) || '';
        out.push({ label: `${TYPE_LABEL[type] ?? type} · ${key}`, value });
      }
    }
    setEntries(out);
    setLoaded(true);
  }, []);

  const yesCount = entries.filter((e) => e.value === 'yes').length;
  const total = entries.length;

  return (
    <div className="py-4 md:max-w-lg md:mx-auto">
      <SettingsSubHeader title="Calibration" />
      {loaded && total === 0 ? (
        <div className="px-5 py-12 text-center">
          <Body muted>No calibrations yet. Open a placement from your chart and choose "Resonates?".</Body>
        </div>
      ) : (
        <>
          <div className="mx-5 mt-2 p-5 bg-white rounded-[16px] border border-rule-soft text-center">
            <div className="font-serif text-[44px] text-ink leading-none">
              {yesCount} / {total}
            </div>
            <div className="text-[13px] text-ink-muted mt-2">resonates · of {total} placements</div>
          </div>
          <div className="px-5 mt-5 flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-2">
            {entries.map((e) => {
              const color = e.value === 'yes' ? '#8FA084' : e.value === 'no' ? '#E9785E' : '#5C5C7A';
              return (
                <div key={e.label} className="bg-white rounded-[12px] p-3 border border-rule-soft flex justify-between items-center">
                  <div className="font-serif text-sm text-ink">{e.label}</div>
                  <div className="text-xs font-semibold" style={{ color }}>{VALUE_LABEL[e.value] ?? e.value}</div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
