/**
 * Mumbai HeritageVault - Artifact Collection & Gallery Page
 * Comprehensive archive of sculptures, coins, manuscripts, textiles, and historical documents
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, X, Bookmark, ExternalLink, ArrowRight, Shield } from 'lucide-react';
import { artifactsApi, favoritesApi } from '../services/api';
import { Artifact, User } from '../types';

interface ArtifactGalleryPageProps {
  currentUser: User | null;
}

export const ArtifactGalleryPage: React.FC<ArtifactGalleryPageProps> = ({ currentUser }) => {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null);

  useEffect(() => {
    setArtifacts(artifactsApi.getAll());
  }, []);

  const categories = [
    'All',
    'Sculptures',
    'Coins',
    'Manuscripts',
    'Tools',
    'Textiles',
    'Paintings',
    'Historical documents',
  ];

  const filtered = artifacts.filter((a) => {
    if (selectedCategory === 'All') return true;
    return a.category === selectedCategory;
  });

  const handleToggleFavorite = (art: Artifact) => {
    if (!currentUser) {
      alert('Please log in with demo account (visitor@heritagevault.demo) to save to collection.');
      return;
    }
    favoritesApi.toggle(currentUser.id, {
      id: art.id,
      title: art.name,
      image: art.image,
      category: art.category,
      type: 'artifact',
    });
    alert(`Updated collection for: ${art.name}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <span className="text-xs uppercase tracking-widest text-stone-700 font-semibold font-sans">
          Antiquities & Accessions
        </span>
        <h1 className="font-serif-display text-3xl sm:text-4xl font-semibold text-stone-900">
          The Artifact Gallery
        </h1>
        <p className="text-sm text-stone-600 font-serif max-w-3xl leading-relaxed">
          Explore cataloged historical treasures: from ancient Mauryan silver punch-marked coins found in Sopara to the monolithic basalt elephant from Elephanta Island, 14th-century illuminated Dante manuscripts, and Parsi silk embroidery.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedCategory === cat
                ? 'bg-amber-800 text-stone-100 font-semibold shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Artifacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((art) => (
          <article
            key={art.id}
            onClick={() => setActiveArtifact(art)}
            className="group cursor-pointer bg-white rounded-lg border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
          >
            <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
              <img
                src={art.image}
                alt={art.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5 bg-stone-900/80 backdrop-blur-sm text-stone-100 text-[10px] px-2 py-0.5 rounded font-mono uppercase">
                {art.category}
              </div>
            </div>

            <div className="p-5 flex flex-col flex-1 space-y-2">
              <div className="text-[11px] text-stone-700 font-medium uppercase tracking-wider">
                {art.period} · {art.material}
              </div>

              <h3 className="font-serif-display text-base font-bold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-1">
                {art.name}
              </h3>

              <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed font-serif">
                {art.description}
              </p>

              <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-700 flex items-center justify-between mt-auto">
                <span className="truncate max-w-[180px]">{art.museumSource || art.origin}</span>
                <span className="text-amber-900 font-semibold flex items-center gap-1">
                  <span>Inspect</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Lightbox Accession Modal */}
      {activeArtifact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl bg-[#FBF9F5] rounded-xl shadow-2xl border border-stone-300 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white">
              <div className="space-y-0.5">
                <span className="text-[11px] uppercase tracking-wider text-amber-800 font-semibold font-mono">
                  ACCESSION: {activeArtifact.accessionNumber || 'MHV-ARC-01'}
                </span>
                <h3 className="font-serif-display text-xl font-bold text-stone-900">
                  {activeArtifact.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveArtifact(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 space-y-6">
              <div className="aspect-[16/10] rounded-lg overflow-hidden bg-stone-900 border border-stone-200">
                <img
                  src={activeArtifact.image}
                  alt={activeArtifact.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Accession Definition List */}
              <div className="bg-white p-5 rounded-lg border border-stone-200 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-stone-400 uppercase font-semibold block text-[10px]">Classification</span>
                  <strong className="text-stone-900 text-sm">{activeArtifact.category}</strong>
                </div>
                <div>
                  <span className="text-stone-400 uppercase font-semibold block text-[10px]">Period</span>
                  <strong className="text-stone-900 text-sm">{activeArtifact.period}</strong>
                </div>
                <div>
                  <span className="text-stone-400 uppercase font-semibold block text-[10px]">Material</span>
                  <strong className="text-stone-900 text-sm">{activeArtifact.material}</strong>
                </div>
                <div>
                  <span className="text-stone-400 uppercase font-semibold block text-[10px]">Geographic Origin</span>
                  <strong className="text-stone-900 text-sm">{activeArtifact.origin}</strong>
                </div>
                <div>
                  <span className="text-stone-400 uppercase font-semibold block text-[10px]">Preserved At</span>
                  <strong className="text-stone-900 text-sm">{activeArtifact.museumSource || 'Mumbai Museum Archive'}</strong>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif-display text-base font-bold text-stone-900 border-b border-stone-200 pb-1">
                  Curatorial Description
                </h4>
                <p className="text-stone-800 text-xs sm:text-sm font-serif leading-relaxed">
                  {activeArtifact.description}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif-display text-base font-bold text-stone-900 border-b border-stone-200 pb-1">
                  Historical Significance
                </h4>
                <p className="text-stone-700 text-xs sm:text-sm font-serif leading-relaxed">
                  {activeArtifact.significance}
                </p>
              </div>

              <div className="p-3 bg-stone-100 rounded text-xs text-stone-600">
                <strong>Archive Reference:</strong> {activeArtifact.source}
              </div>
            </div>

            <div className="px-6 py-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleToggleFavorite(activeArtifact)}
                className="flex items-center gap-1.5 text-xs text-stone-700 hover:text-amber-900 font-medium"
              >
                <Bookmark className="w-4 h-4" />
                <span>Save to Collection</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveArtifact(null)}
                className="px-4 py-1.5 bg-stone-900 text-stone-100 text-xs font-semibold rounded hover:bg-stone-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
