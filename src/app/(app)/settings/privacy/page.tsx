'use client';

import { useState, useEffect } from 'react';
import { SettingsSubHeader } from '@/components/SettingsSubHeader';

function CloudSyncToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(localStorage.getItem('hygiea.cloud-sync-consent') === 'true');
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    if (next) {
      localStorage.setItem('hygiea.cloud-sync-consent', 'true');
    } else {
      localStorage.removeItem('hygiea.cloud-sync-consent');
    }
  };

  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <div className="text-sm font-medium text-ink">Cloud chart sync</div>
        <div className="text-xs text-ink-muted mt-0.5">Enables access across devices</div>
      </div>
      <button
        onClick={toggle}
        className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-coral' : 'bg-rule-soft'}`}
        aria-label="Toggle cloud sync"
      >
        <span
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform"
          style={{ transform: enabled ? 'translateX(-1.25rem)' : 'translateX(-0.125rem)' }}
        />
      </button>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <div className="py-4 md:max-w-lg md:mx-auto">
      <SettingsSubHeader title="Privacy Policy" />
      <div className="px-5 flex flex-col gap-4 text-sm text-ink-muted leading-[1.8] mt-2">
        <p>
          Your privacy is foundational to Hygiea. Your birth data, chart, and events are stored on your device first,
          and never shared without your consent.
        </p>
        <p>
          Before signing in: your chart is calculated locally and never sent to any server.
        </p>
        <p>
          After signing in with sync enabled: your chart is stored on secure servers so you can access it from multiple devices.
        </p>
        <p>
          You can export or delete your data at any time from the Data screen.
        </p>
        <div className="border-t border-sand pt-2">
          <CloudSyncToggle />
        </div>
        <p className="text-ink">
          By using Hygiea you agree to this policy. We update it as needed and notify you of any material changes.
        </p>
      </div>
    </div>
  );
}
