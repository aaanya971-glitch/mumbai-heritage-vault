/**
 * Mumbai HeritageVault - Historical Timeline Page ("Mumbai Through Time")
 * Horizontal/Vertical responsive interactive timeline organized by historic epochs
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, User, ArrowRight, Layers, Clock } from 'lucide-react';
import { timelineApi } from '../services/api';
import { TimelineEvent, HistoricalPeriod } from '../types';

export const TimelinePage: React.FC = () => {
  const [selectedEpoch, setSelectedEpoch] = useState<string>('All');
  const events = timelineApi.getAll();

  const epochs: string[] = [
    'All',
    'Ancient & Early History',
    'Medieval Period',
    'Portuguese Period',
    'British/Bombay Period',
    '19th Century',
    'Indian Independence Movement',
    'Post-Independence Mumbai',
  ];

  const filteredEvents = events.filter((e) => {
    if (selectedEpoch === 'All') return true;
    return e.period === selectedEpoch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Editorial Header */}
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <span className="text-xs uppercase tracking-widest text-stone-700 font-semibold font-sans">
          Chronological Master Archive
        </span>
        <h1 className="font-serif-display text-3xl sm:text-4xl font-semibold text-stone-900">
          Mumbai Through Time
        </h1>
        <p className="text-sm text-stone-600 font-serif max-w-3xl leading-relaxed">
          Traverse over two thousand years of urban transformation: from the volcanic basalt caves of Kanheri and the medieval Kingdom of Mahikawati, through Portuguese manor estates and British land reclamations, to the Indian independence struggle and modern metropolis.
        </p>
      </div>

      {/* Epoch Filter Bar */}
      <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs space-y-2">
        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
          Filter by Historic Era:
        </label>
        <div className="flex flex-wrap items-center gap-1.5">
          {epochs.map((epoch) => (
            <button
              key={epoch}
              type="button"
              onClick={() => setSelectedEpoch(epoch)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedEpoch === epoch
                  ? 'bg-amber-800 text-stone-100 font-semibold shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              {epoch}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Stream (Vertical with alternating desktop layout) */}
      <div className="relative border-l-2 border-stone-300 ml-4 sm:ml-32 pl-6 sm:pl-8 space-y-12">
        {filteredEvents.map((evt, idx) => (
          <div key={evt.id} className="relative group">
            {/* Timeline Marker Bullet */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-amber-800 shadow-xs group-hover:scale-125 transition-transform" />

            {/* Date Tag on Left (Desktop) */}
            <div className="hidden sm:block absolute -left-36 top-1 text-right w-24">
              <span className="text-xs font-bold text-amber-900 font-mono block leading-tight">
                {evt.dateDisplay}
              </span>
              <span className="text-[10px] text-stone-700 font-serif">{evt.period.split(' ')[0]}</span>
            </div>

            {/* Card Content */}
            <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-xs hover:shadow-md transition-shadow grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-3">
                <div className="sm:hidden text-xs font-mono font-bold text-amber-900">
                  {evt.dateDisplay} · {evt.period}
                </div>

                <div className="text-[11px] font-semibold text-stone-700 uppercase tracking-wider">
                  {evt.period}
                </div>

                <h3 className="font-serif-display text-xl font-bold text-stone-900">
                  {evt.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-700 font-serif leading-relaxed">
                  {evt.description}
                </p>

                {/* Related Locations & Personalities (Unboxed metadata) */}
                <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-4 text-xs text-stone-500">
                  {evt.relatedLocations && evt.relatedLocations.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span>{evt.relatedLocations.join(', ')}</span>
                    </div>
                  )}

                  {evt.relatedPersonalities && evt.relatedPersonalities.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-stone-400" />
                      <span>{evt.relatedPersonalities.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Event Visual */}
              <div className="md:col-span-4 aspect-[4/3] rounded-md overflow-hidden bg-stone-100 border border-stone-200">
                <img
                  src={evt.image}
                  alt={evt.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
