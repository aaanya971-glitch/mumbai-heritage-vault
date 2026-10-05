/**
 * Mumbai HeritageVault - Historical Personalities Page
 * Biographies of architects, reformers, jurists, and freedom pioneers of Mumbai
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { User, MapPin, ArrowRight, BookOpen } from 'lucide-react';
import { personalitiesApi } from '../services/api';

export const PersonalitiesPage: React.FC = () => {
  const personalities = personalitiesApi.getAll();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Editorial Header */}
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <span className="text-xs uppercase tracking-widest text-stone-700 font-semibold font-sans">
          Biographical Archives
        </span>
        <h1 className="font-serif-display text-3xl sm:text-4xl font-semibold text-stone-900">
          Historical Personalities of Mumbai
        </h1>
        <p className="text-sm text-stone-600 font-serif max-w-3xl leading-relaxed">
          The philanthropists, constitutional jurists, freedom fighters, and social visionaries who laid the institutional, educational, and civic foundations of Mumbai.
        </p>
      </div>

      {/* Personalities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {personalities.map((p) => (
          <article
            key={p.id}
            className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row"
          >
            {/* Visual (1:1 / Portrait) */}
            <div className="sm:w-48 sm:shrink-0 aspect-[4/5] sm:aspect-auto bg-stone-100 relative">
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1 space-y-3">
              <div className="space-y-1">
                {p.birthDate && p.deathDate && (
                  <span className="text-[11px] font-mono text-stone-500 block">
                    {p.birthDate.split(' ').pop()} – {p.deathDate.split(' ').pop()}
                  </span>
                )}
                <h3 className="font-serif-display text-xl font-bold text-stone-900 leading-snug">
                  {p.name}
                </h3>
                <div className="text-xs font-semibold text-amber-800">
                  {p.role}
                </div>
              </div>

              <p className="text-xs text-stone-700 font-serif leading-relaxed line-clamp-3">
                {p.biography}
              </p>

              <div className="pt-2 border-t border-stone-100 text-xs text-stone-600 space-y-1">
                <strong className="text-stone-900 block font-semibold text-[11px] uppercase tracking-wider">
                  Key Historical Contribution:
                </strong>
                <p className="line-clamp-2 italic">{p.contribution}</p>
              </div>

              {p.associatedPlaces && p.associatedPlaces.length > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-stone-500 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="truncate">{p.associatedPlaces.join(' · ')}</span>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
