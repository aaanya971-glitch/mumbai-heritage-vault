/**
 * Mumbai HeritageVault - Cultural Heritage Page
 * Communities, Food Heritage, Festivals, Performing Arts & Traditional Occupations
 */

import React, { useState } from 'react';
import { Compass, MapPin, Sparkles, Coffee, Users, Music, Heart } from 'lucide-react';
import { cultureApi } from '../services/api';
import { CulturalHeritage } from '../types';

export const CulturalHeritagePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const items = cultureApi.getAll();

  const categories = ['All', 'Communities', 'Food Heritage', 'Festivals', 'Traditional Occupations', 'Performing Arts'];

  const filtered = items.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Editorial Header */}
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <span className="text-xs uppercase tracking-widest text-stone-700 font-semibold font-sans">
          Intangible & Living Traditions
        </span>
        <h1 className="font-serif-display text-3xl sm:text-4xl font-semibold text-stone-900">
          Cultural Heritage of Mumbai
        </h1>
        <p className="text-sm text-stone-600 font-serif max-w-3xl leading-relaxed">
          Beyond stone monuments lies the living soul of the city: the 2,000-year seafaring memory of the indigenous Koli fisherfolk, 130-year-old Dabbawala logistics networks, historic Irani corner cafés, and the mass public Ganeshotsav festival.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 pb-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setSelectedCategory(c)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedCategory === c
                ? 'bg-amber-800 text-stone-100 font-semibold shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Cultural Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-sm text-stone-100 text-[11px] px-2.5 py-1 rounded">
                {item.category}
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1 space-y-4">
              <div className="space-y-1">
                <h3 className="font-serif-display text-2xl font-bold text-stone-900 leading-snug">
                  {item.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 font-serif leading-relaxed">
                {item.description}
              </p>

              <div className="p-4 bg-stone-50 rounded-lg border border-stone-100 space-y-2 text-xs text-stone-700">
                <div>
                  <strong className="text-stone-900 block font-semibold text-[11px] uppercase tracking-wider">
                    Historical Origins & Evolution:
                  </strong>
                  <p className="font-serif leading-relaxed mt-0.5">{item.history}</p>
                </div>

                <div className="pt-2 border-t border-stone-200">
                  <strong className="text-stone-900 block font-semibold text-[11px] uppercase tracking-wider">
                    Contemporary Cultural Significance:
                  </strong>
                  <p className="font-serif leading-relaxed mt-0.5">{item.culturalSignificance}</p>
                </div>
              </div>

              {item.relatedLocations && item.relatedLocations.length > 0 && (
                <div className="pt-2 border-t border-stone-100 flex items-center gap-1.5 text-xs text-stone-500">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="truncate">
                    <strong>Living Precincts:</strong> {item.relatedLocations.join(' · ')}
                  </span>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
