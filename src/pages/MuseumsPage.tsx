/**
 * Mumbai HeritageVault - Museums Directory Page
 * Curated catalogue of Mumbai's premier historical, art, and numismatic institutions
 */

import React, { useState, useEffect } from 'react';
import { Compass, ExternalLink, MapPin, Clock, Layers, ArrowRight, Shield } from 'lucide-react';
import { museumsApi } from '../services/api';
import { Museum } from '../types';

export const MuseumsPage: React.FC = () => {
  const [museums, setMuseums] = useState<Museum[]>([]);
  const [selectedType, setSelectedType] = useState<string>('All');

  useEffect(() => {
    setMuseums(museumsApi.getAll());
  }, []);

  const types = ['All', 'Art & Archaeology', 'City History', 'Freedom Movement', 'Numismatics', 'Science'];

  const filtered = museums.filter((m) => {
    if (selectedType === 'All') return true;
    return m.museumType.toLowerCase().includes(selectedType.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Editorial Header */}
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <span className="text-xs uppercase tracking-widest text-stone-700 font-semibold font-sans">
          Institutional Archives
        </span>
        <h1 className="font-serif-display text-3xl sm:text-4xl font-semibold text-stone-900">
          Museums of Mumbai
        </h1>
        <p className="text-sm text-stone-600 font-serif max-w-3xl leading-relaxed">
          From the Indo-Saracenic grandeur of CSMVS to the Victorian jewel-box architecture of Dr. Bhau Daji Lad Museum and the sacred halls of Mani Bhavan, explore Mumbai's repository of art, antiquities, and freedom heritage.
        </p>
      </div>

      {/* Verified Notice Ribbon */}
      <div className="bg-stone-100 rounded-md border border-stone-200 p-4 flex items-center gap-3 text-xs text-stone-600">
        <Shield className="w-4 h-4 text-amber-800 shrink-0" />
        <p>
          <strong>Advisory Note:</strong> Opening hours provided below are archival placeholders. Please consult individual museum administration websites directly prior to planning physical visits.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {types.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setSelectedType(t)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              selectedType === t
                ? 'bg-amber-800 text-stone-100 font-semibold shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Museum Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((m) => (
          <article
            key={m.id}
            className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
              <img
                src={m.image}
                alt={m.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-sm text-stone-100 text-[11px] px-2.5 py-1 rounded">
                {m.museumType}
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1 space-y-4">
              <div className="space-y-1">
                <h3 className="font-serif-display text-xl font-bold text-stone-900 leading-snug">
                  {m.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-stone-500">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="truncate">{m.location}</span>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed font-serif line-clamp-3">
                {m.description}
              </p>

              {/* Highlights & Collection count */}
              {m.highlights && m.highlights.length > 0 && (
                <div className="pt-2 border-t border-stone-100 space-y-1.5">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-400">
                    Curatorial Highlights:
                  </span>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-stone-700">
                    {m.highlights.map((h, i) => (
                      <span key={i} className="after:content-['·'] after:ml-2 last:after:content-none text-stone-700">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Opening Placeholder */}
              <div className="flex items-start gap-2 text-xs text-stone-500 pt-2 border-t border-stone-100">
                <Clock className="w-3.5 h-3.5 text-amber-800 shrink-0 mt-0.5" />
                <span className="leading-snug">{m.openingInfoPlaceholder}</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-auto">
                {m.collectionCount && (
                  <span className="text-xs font-mono text-stone-500 tabular-nums">
                    {m.collectionCount.toLocaleString()} Artifacts
                  </span>
                )}

                {m.website && (
                  <a
                    href={m.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 hover:text-amber-700 transition-colors"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
