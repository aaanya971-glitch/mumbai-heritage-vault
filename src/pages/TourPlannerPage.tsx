/**
 * Mumbai HeritageVault - Heritage Tour Planner Page
 * Generates tailored step-by-step walking and transit heritage itineraries
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Clock, MapPin, Footprints, ArrowRight, CheckCircle, Navigation, Sparkles } from 'lucide-react';
import { generateHeritageTour } from '../services/api';
import { TourPlan } from '../types';

export const TourPlannerPage: React.FC = () => {
  const [durationHours, setDurationHours] = useState<number>(3);
  const [area, setArea] = useState<string>('South Mumbai Heritage District');
  const [interest, setInterest] = useState<string>('Architecture & Victorian Gothic');
  const [walkingPreference, setWalkingPreference] = useState<'walking' | 'transit'>('walking');

  const [tourPlan, setTourPlan] = useState<TourPlan>(() =>
    generateHeritageTour({
      durationHours: 3,
      area: 'South Mumbai Heritage District',
      interest: 'Architecture & Victorian Gothic',
      walkingPreference: 'walking',
    })
  );

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlan = generateHeritageTour({
      durationHours,
      area,
      interest,
      walkingPreference,
    });
    setTourPlan(newPlan);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <span className="text-xs uppercase tracking-widest text-stone-700 font-semibold font-sans">
          Itinerary Curator
        </span>
        <h1 className="font-serif-display text-3xl sm:text-4xl font-semibold text-stone-900">
          Plan My Heritage Tour
        </h1>
        <p className="text-sm text-stone-600 font-serif max-w-3xl leading-relaxed">
          Create a personalized, historically sequenced itinerary tailored to your schedule, physical walking preference, and architectural interests.
        </p>
      </div>

      {/* Main Grid: Form Settings (4 cols) & Generated Itinerary (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Settings Form */}
        <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-5">
          <h2 className="font-serif-display text-lg font-bold text-stone-900 border-b border-stone-200 pb-2">
            Tour Parameters
          </h2>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Available Time:
              </label>
              <select
                value={durationHours}
                onChange={(e) => setDurationHours(Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded text-xs text-stone-800 focus:outline-none"
              >
                <option value={2}>2 Hours (Express Highlights)</option>
                <option value={3}>3 Hours (Half-Day Heritage Walk)</option>
                <option value={5}>5 Hours (Extended Architectural Exploration)</option>
                <option value={7}>7 Hours (Full-Day Deep Heritage Immersion)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Geographic Area:
              </label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded text-xs text-stone-800 focus:outline-none"
              >
                <option value="South Mumbai Heritage District">South Mumbai (Fort & Colaba)</option>
                <option value="Kala Ghoda & Oval Maidan">Kala Ghoda & UNESCO Oval Ensembles</option>
                <option value="Central Mumbai & Girangaon">Central Mumbai (Byculla & Girangaon Mills)</option>
                <option value="Suburban Salsette & Borivali">Suburban Salsette & Kanheri Caves</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Primary Interest:
              </label>
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded text-xs text-stone-800 focus:outline-none"
              >
                <option value="Architecture & Victorian Gothic">Architecture & Victorian Gothic</option>
                <option value="Museums & Archival Galleries">Museums & Art Galleries</option>
                <option value="Forts & Coastal Defense">Coastal Forts & Maritime Defenses</option>
                <option value="Ancient Caves & Archaeology">Ancient Buddhist Caves</option>
                <option value="Freedom Movement & Gandhi">Freedom Movement & Nationalist History</option>
                <option value="Culture & Street Heritage">Indigenous Koli & Culinary Heritage</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Mobility Preference:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setWalkingPreference('walking')}
                  className={`py-2 px-3 text-xs rounded border text-center transition-colors ${
                    walkingPreference === 'walking'
                      ? 'bg-amber-800 text-white border-amber-900 font-semibold'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  Walking Only
                </button>
                <button
                  type="button"
                  onClick={() => setWalkingPreference('transit')}
                  className={`py-2 px-3 text-xs rounded border text-center transition-colors ${
                    walkingPreference === 'transit'
                      ? 'bg-amber-800 text-white border-amber-900 font-semibold'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  Walking + Taxi
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded text-xs font-semibold tracking-wide transition-colors mt-2"
            >
              Generate Itinerary
            </button>
          </form>
        </div>

        {/* Generated Itinerary Panel */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-xs space-y-6">
          <div className="border-b border-stone-200 pb-4 space-y-2">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-wider text-amber-800 font-semibold">
              <span>{tourPlan.durationHours} Hours Duration</span>
              <span aria-hidden="true">·</span>
              <span>{tourPlan.walkingDistanceKm} km Total Distance</span>
              <span aria-hidden="true">·</span>
              <span>{tourPlan.stops.length} Planned Stops</span>
            </div>
            <h2 className="font-serif-display text-2xl font-bold text-stone-900">
              {tourPlan.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-serif leading-relaxed">
              {tourPlan.description}
            </p>
          </div>

          {/* Practical Advisory Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700 bg-stone-50 p-4 rounded-lg border border-stone-100">
            <div>
              <strong className="block text-stone-900 font-semibold mb-0.5">Recommended Timing:</strong>
              <span>{tourPlan.recommendedTimeOfDay}</span>
            </div>
            <div>
              <strong className="block text-stone-900 font-semibold mb-0.5">Transit Guidance:</strong>
              <span>{tourPlan.bestTransport}</span>
            </div>
          </div>

          {/* Step by Step Timeline of Stops */}
          <div className="space-y-6 pt-2">
            <h3 className="font-serif-display text-base font-bold text-stone-900 uppercase tracking-wider">
              Sequenced Stops & Timings
            </h3>

            <div className="space-y-6">
              {tourPlan.stops.map((stop) => (
                <div
                  key={stop.order}
                  className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border border-stone-200 hover:border-amber-700/60 transition-colors bg-white shadow-xs"
                >
                  <img
                    src={stop.site.image}
                    alt={stop.site.name}
                    className="w-full sm:w-32 h-28 object-cover rounded bg-stone-100 shrink-0"
                  />

                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-amber-900">
                        STOP 0{stop.order} · {stop.durationMinutes} MIN EXPLORATION
                      </span>
                      <span className="text-[11px] text-stone-700 uppercase font-semibold">
                        {stop.site.category}
                      </span>
                    </div>

                    <h4 className="font-serif-display text-lg font-bold text-stone-900">
                      {stop.site.name}
                    </h4>

                    <p className="text-xs text-stone-600 font-serif line-clamp-2">
                      {stop.site.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-xs">
                      <span className="text-stone-700 italic text-[11px]">{stop.historicalNote}</span>
                      <Link
                        to={`/heritage/${stop.site.slug}`}
                        className="text-amber-900 font-semibold hover:underline flex items-center gap-1"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
            <Link
              to="/map"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-800 hover:text-amber-900"
            >
              <Navigation className="w-4 h-4" />
              <span>Preview Stops on Interactive Map</span>
            </Link>

            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs font-medium border border-stone-300 transition-colors"
            >
              Print Itinerary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
