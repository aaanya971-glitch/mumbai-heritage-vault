/**
 * Mumbai HeritageVault - Forts & Ancient Caves Page
 * Focuses on coastal maritime defense bastions and ancient Buddhist rock-cut excavations
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, MapPin, ArrowRight, Compass, Mountain, CheckCircle } from 'lucide-react';
import { heritageApi } from '../services/api';
import { HeritageSite } from '../types';

export const FortsAndCavesPage: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Fort' | 'Cave'>('All');
  const allSites = heritageApi.getAll();

  const fortAndCaves = allSites.filter(
    (s) => s.category === 'Fort' || s.category === 'Cave'
  );

  const displayList = fortAndCaves.filter((item) => {
    if (filter === 'All') return true;
    return item.category === filter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Editorial Header */}
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-700 font-semibold font-sans">
          <span>Archaeology & Maritime Bastions</span>
        </div>
        <h1 className="font-serif-display text-3xl sm:text-4xl font-semibold text-stone-900">
          Forts & Ancient Caves of Mumbai
        </h1>
        <p className="text-sm text-stone-600 font-serif max-w-3xl leading-relaxed">
          Before Victorian stone monuments reshaped the skyline, Mumbai was guarded by coastal bastions along the Seven Islands and volcanic basalt caves carved by Buddhist monks two thousand years ago.
        </p>
      </div>

      {/* Historical Verification Ribbon */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-4 flex items-center gap-3 text-xs text-amber-950">
        <CheckCircle className="w-5 h-5 text-amber-800 shrink-0" />
        <p>
          <strong>ASI & State Directorate Verified:</strong> All fortress records and Buddhist cave complexes listed are protected archaeological monuments under the Ancient Monuments and Archaeological Sites and Remains Act.
        </p>
      </div>

      {/* Segmented Filter Control */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setFilter('All')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            filter === 'All'
              ? 'bg-amber-800 text-stone-100 font-semibold shadow-xs'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          All Locations ({fortAndCaves.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('Fort')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            filter === 'Fort'
              ? 'bg-amber-800 text-stone-100 font-semibold shadow-xs'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          Coastal Forts ({fortAndCaves.filter((s) => s.category === 'Fort').length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('Cave')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            filter === 'Cave'
              ? 'bg-amber-800 text-stone-100 font-semibold shadow-xs'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          Ancient Caves ({fortAndCaves.filter((s) => s.category === 'Cave').length})
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {displayList.map((site) => (
          <article
            key={site.id}
            className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
              <img
                src={site.image}
                alt={site.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-sm text-stone-100 text-[11px] px-2.5 py-1 rounded">
                {site.category} · {site.year}
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1 space-y-3">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-800 font-semibold">
                  {site.historicalPeriod}
                </span>
                <h3 className="font-serif-display text-xl font-bold text-stone-900 leading-snug">
                  {site.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-stone-500">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{site.location}</span>
                </div>
              </div>

              <p className="text-xs text-stone-600 font-serif leading-relaxed line-clamp-3">
                {site.whyItMatters || site.description}
              </p>

              {/* Facts preview */}
              {site.interestingFacts && site.interestingFacts[0] && (
                <div className="p-3 bg-stone-50 rounded border border-stone-100 text-xs text-stone-700 space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-stone-500 block">
                    Key Historical Finding:
                  </span>
                  <p className="italic">{site.interestingFacts[0]}</p>
                </div>
              )}

              {/* Action buttons */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-auto">
                <Link
                  to={`/heritage/${site.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 hover:text-amber-700 transition-colors"
                >
                  <span>Explore Site Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to="/map"
                  className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>View on Map</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
