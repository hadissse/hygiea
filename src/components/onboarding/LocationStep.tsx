'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { searchLocation, getTimezoneOffset, type Location } from '@/lib/geocoding';

interface LocationStepProps {
  initialData: {
    latitude: number;
    longitude: number;
    utcOffsetHours: number;
  };
  onComplete: (location: {
    latitude: number;
    longitude: number;
    utcOffsetHours: number;
  }) => void;
}

export function LocationStep({ initialData, onComplete }: LocationStepProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [manualLat, setManualLat] = useState('');
  const [manualLon, setManualLon] = useState('');
  const [manualOffset, setManualOffset] = useState('0');
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length > 2) {
        handleSearch();
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleSearch = async () => {
    if (query.trim().length < 2) return;

    setIsSearching(true);
    try {
      const foundLocations = await searchLocation(query);
      setResults(foundLocations);
    } catch {
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleManualSubmit = () => {
    const lat = parseFloat(manualLat);
    const lon = parseFloat(manualLon);
    const offset = parseFloat(manualOffset);
    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) return;
    onComplete({ latitude: lat, longitude: lon, utcOffsetHours: isNaN(offset) ? 0 : offset });
  };

  const handleSelectLocation = async (location: Location) => {
    setSelectedLocation(location);
    setIsLoading(true);

    try {
      const offset = await getTimezoneOffset(location.timezone);
      onComplete({
        latitude: location.latitude,
        longitude: location.longitude,
        utcOffsetHours: offset,
      });
    } catch {
      onComplete({
        latitude: location.latitude,
        longitude: location.longitude,
        utcOffsetHours: 0,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-5 py-12">
      <div className="w-full max-w-sm">
        <button
          onClick={() => router.back()}
          className="mb-8 text-ink-muted hover:text-ink transition-colors"
        >
          ‹ Back
        </button>

        <h1 className="font-serif text-3xl text-ink mb-2">Where were you born?</h1>
        <p className="text-sm text-ink-muted mb-8">
          City, region, or country
        </p>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search your birthplace..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-[14px] bg-cream-soft border border-rule-soft text-ink placeholder:text-ink-muted text-sm focus:outline-none focus:ring-1 focus:ring-coral/20 transition-colors"
          />
        </div>

        {results.length > 0 && (
          <div className="mb-6 max-h-64 overflow-y-auto flex flex-col gap-2">
            {results.map((location, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectLocation(location)}
                disabled={isLoading}
                className="text-left px-4 py-3 rounded-[14px] bg-white border border-rule-soft text-ink text-sm hover:bg-cream-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="font-medium">{location.name}</div>
                <div className="text-xs text-ink-muted">
                  {location.country}
                </div>
              </button>
            ))}
          </div>
        )}

        {isSearching && (
          <div className="mb-6 text-center text-sm text-ink-muted">
            Searching...
          </div>
        )}

        {query.trim().length > 2 && results.length === 0 && !isSearching && (
          <div className="mb-6 text-center text-sm text-ink-muted">
            No results found
          </div>
        )}

        {selectedLocation && (
          <div className="mb-6 p-4 rounded-[14px] bg-cream-soft border border-rule-soft">
            <div className="font-medium text-ink mb-1">{selectedLocation.name}</div>
            <div className="text-xs text-ink-muted">
              {selectedLocation.latitude.toFixed(4)}° {selectedLocation.longitude.toFixed(4)}°
            </div>
          </div>
        )}

        {!selectedLocation && (
          <p className="text-xs text-ink-muted text-center mt-8">
            Select a location from the list above to continue
          </p>
        )}

        <div className="mt-8 border-t border-rule-soft pt-6">
          <button
            onClick={() => setShowManual((v) => !v)}
            className="text-xs text-ink-muted underline underline-offset-2 hover:text-ink transition-colors"
          >
            {showManual ? 'Hide manual entry' : "Can't find your location? Enter coordinates manually"}
          </button>

          {showManual && (
            <div className="mt-4 flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-ink-muted block mb-1">Latitude (−90 to 90)</label>
                  <input
                    type="number"
                    step="0.0001"
                    min="-90"
                    max="90"
                    value={manualLat}
                    onChange={(e) => setManualLat(e.target.value)}
                    placeholder="e.g. 24.6877"
                    className="w-full px-3 py-2 rounded-[10px] bg-cream-soft border border-rule-soft text-ink text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-ink-muted block mb-1">Longitude (−180 to 180)</label>
                  <input
                    type="number"
                    step="0.0001"
                    min="-180"
                    max="180"
                    value={manualLon}
                    onChange={(e) => setManualLon(e.target.value)}
                    placeholder="e.g. 46.7219"
                    className="w-full px-3 py-2 rounded-[10px] bg-cream-soft border border-rule-soft text-ink text-sm focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-ink-muted block mb-1">UTC offset (hours, e.g. 3 for UTC+3)</label>
                <input
                  type="number"
                  step="0.5"
                  min="-14"
                  max="14"
                  value={manualOffset}
                  onChange={(e) => setManualOffset(e.target.value)}
                  placeholder="e.g. 3"
                  className="w-full px-3 py-2 rounded-[10px] bg-cream-soft border border-rule-soft text-ink text-sm focus:outline-none"
                />
              </div>
              <button
                onClick={handleManualSubmit}
                disabled={!manualLat || !manualLon}
                className="w-full py-2.5 rounded-[14px] bg-ink text-cream text-sm font-medium disabled:opacity-40 transition-opacity"
              >
                Use these coordinates
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
