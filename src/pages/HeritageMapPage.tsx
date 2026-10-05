/**
 * Mumbai HeritageVault - Interactive Heritage Map Page
 * Full-page cartographic viewer with category filter layers, location drawer, and direct navigation
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Navigation, ArrowRight, ExternalLink, Bookmark, Compass } from 'lucide-react';
import { heritageApi, favoritesApi } from '../services/api';
import { HeritageSite, User } from '../types';
import { InteractiveMap } from '../components/common/InteractiveMap';

interface HeritageMapPageProps {
  currentUser: User | null;
}

export const HeritageMapPage: React.FC<HeritageMapPageProps> = ({ currentUser }) => {
  const sites = heritageApi.getAll();
  const [selectedSite, setSelectedSite] = useState<HeritageSite | null>(sites[0] || null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-stone-700 font-semibold font-sans">
            Spatial Cartography
          </span>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-semibold text-stone-900 mt-1">
            Explore Mumbai Heritage Map
          </h1>
          <p className="text-xs text-stone-600 font-serif mt-1">
            Locate monuments, museums, forts, and caves across South Mumbai and Salsette Island.
          </p>
        </div>

        <Link
          to="/tour-planner"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-800 hover:bg-amber-700 text-stone-100 rounded text-xs font-semibold tracking-wide transition-colors"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Plan My Walking Tour</span>
        </Link>
      </div>

      {/* Main Map + Selected Inspector Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Map Container (8 cols) */}
        <div className="lg:col-span-8">
          <InteractiveMap
            sites={sites}
            selectedSiteId={selectedSite?.id}
            onSelectSite={(site) => setSelectedSite(site)}
            height="620px"
          />
        </div>

        {/* Selected Location Inspector (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-lg border border-stone-200 p-5 shadow-xs space-y-4">
          {selectedSite ? (
            <>
              <div className="aspect-[16/10] rounded overflow-hidden bg-stone-100 border border-stone-200 relative">
                <img
                  src={selectedSite.image}
                  alt={selectedSite.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-stone-900/80 backdrop-blur-sm text-stone-100 text-[10px] px-2 py-0.5 rounded uppercase font-semibold">
                  {selectedSite.category}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-mono text-amber-800 font-semibold">
                  {selectedSite.year} · {selectedSite.historicalPeriod}
                </div>
                <h3 className="font-serif-display text-lg font-bold text-stone-900 leading-snug">
                  {selectedSite.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-stone-500">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="truncate">{selectedSite.location}</span>
                </div>
              </div>

              <p className="text-xs text-stone-700 font-serif leading-relaxed line-clamp-4">
                {selectedSite.whyItMatters || selectedSite.description}
              </p>

              <div className="p-3 bg-stone-50 rounded border border-stone-100 text-xs text-stone-600 space-y-1 font-mono">
                <div>
                  <strong>Latitude:</strong> {selectedSite.latitude.toFixed(6)}° N
                </div>
                <div>
                  <strong>Longitude:</strong> {selectedSite.longitude.toFixed(6)}° E
                </div>
                <div>
                  <strong>UNESCO Status:</strong> {selectedSite.unescoStatus}
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to={`/heritage/${selectedSite.slug}`}
                  className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Explore Full Archive Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-xs text-stone-500 space-y-2">
              <MapPin className="w-6 h-6 text-stone-300 mx-auto" />
              <p>Click any map marker pin to inspect detailed architectural records.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
