/**
 * Mumbai HeritageVault - Monuments & Heritage Buildings Page
 * Dedicated showcase of colonial, Victorian Gothic Revival, and civic landmarks
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, ArrowRight, MapPin, Compass } from 'lucide-react';
import { heritageApi } from '../services/api';

export const MonumentsPage: React.FC = () => {
  const allSites = heritageApi.getAll();
  const monuments = allSites.filter(
    (s) =>
      s.category === 'Monument' ||
      s.category === 'Heritage Building' ||
      s.category === 'Railway Heritage' ||
      s.category === 'Market'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Editorial Header */}
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <span className="text-xs uppercase tracking-widest text-stone-700 font-semibold font-sans">
          Architectural Monographs
        </span>
        <h1 className="font-serif-display text-3xl sm:text-4xl font-semibold text-stone-900">
          Monuments & Heritage Buildings
        </h1>
        <p className="text-sm text-stone-600 font-serif max-w-3xl leading-relaxed">
          From the Victorian Gothic spires of CSMT and Rajabai Tower to the basalt triumphal arch of the Gateway of India and the Neoclassical Doric colonnade of the Town Hall, explore Mumbai's institutional stone legacy.
        </p>
      </div>

      {/* Grid of Monument Profiles */}
      <div className="space-y-12">
        {monuments.map((m, idx) => (
          <article
            key={m.id}
            className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            {/* Visual (5 cols) */}
            <div className={`lg:col-span-5 relative aspect-[4/3] lg:aspect-auto ${idx % 2 === 1 ? 'lg:order-last' : ''}`}>
              <img
                src={m.image}
                alt={m.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-sm text-stone-100 text-[11px] px-2.5 py-1 rounded">
                {m.year} · {m.category}
              </div>
            </div>

            {/* Text & History (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-800 font-semibold">
                  <span>{m.architecturalStyle || 'Historic Monument'}</span>
                  {m.unescoStatus === 'UNESCO World Heritage Site' && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-stone-900">UNESCO World Heritage</span>
                    </>
                  )}
                </div>

                <h3 className="font-serif-display text-2xl font-bold text-stone-900 leading-snug">
                  {m.name}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-stone-500">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{m.location}</span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif pt-1">
                  {m.whyItMatters || m.description}
                </p>

                {m.architect && (
                  <p className="text-xs text-stone-600 pt-1">
                    <strong>Architectural Attribution:</strong> {m.architect}
                  </p>
                )}
              </div>

              {/* Action footer */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <Link
                  to={`/heritage/${m.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 hover:text-amber-700 transition-colors"
                >
                  <span>Explore Complete Architectural Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to="/map"
                  className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Locate on Map</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
