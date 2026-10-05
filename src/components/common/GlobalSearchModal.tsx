/**
 * Mumbai HeritageVault - Grouped Global Search Modal
 * Searches across Heritage Sites, Museums, Artifacts, Personalities, and Timeline
 */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Landmark, Compass, Sparkles, Calendar, User, ArrowRight } from 'lucide-react';
import {
  heritageApi,
  museumsApi,
  artifactsApi,
  personalitiesApi,
  timelineApi,
} from '../../services/api';
import { HeritageSite, Museum, Artifact, Personality, TimelineEvent } from '../../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const sites = trimmed
    ? heritageApi.getAll().filter(
        (s) =>
          s.name.toLowerCase().includes(trimmed) ||
          s.description.toLowerCase().includes(trimmed) ||
          s.location.toLowerCase().includes(trimmed) ||
          s.category.toLowerCase().includes(trimmed)
      ).slice(0, 4)
    : [];

  const museums = trimmed
    ? museumsApi.getAll().filter(
        (m) =>
          m.name.toLowerCase().includes(trimmed) ||
          m.description.toLowerCase().includes(trimmed) ||
          m.location.toLowerCase().includes(trimmed)
      ).slice(0, 3)
    : [];

  const artifacts = trimmed
    ? artifactsApi.getAll().filter(
        (a) =>
          a.name.toLowerCase().includes(trimmed) ||
          a.description.toLowerCase().includes(trimmed) ||
          a.category.toLowerCase().includes(trimmed) ||
          a.material.toLowerCase().includes(trimmed)
      ).slice(0, 3)
    : [];

  const personalities = trimmed
    ? personalitiesApi.getAll().filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.biography.toLowerCase().includes(trimmed) ||
          p.contribution.toLowerCase().includes(trimmed)
      ).slice(0, 3)
    : [];

  const timelineEvents = trimmed
    ? timelineApi.getAll().filter(
        (t) =>
          t.title.toLowerCase().includes(trimmed) ||
          t.description.toLowerCase().includes(trimmed) ||
          t.period.toLowerCase().includes(trimmed)
      ).slice(0, 3)
    : [];

  const hasResults =
    sites.length > 0 ||
    museums.length > 0 ||
    artifacts.length > 0 ||
    personalities.length > 0 ||
    timelineEvents.length > 0;

  const handleSelect = (url: string) => {
    onClose();
    navigate(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-2xl bg-[#FBF9F5] rounded-lg shadow-2xl border border-stone-300 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-stone-200 bg-white">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search heritage sites, museums, artifacts, architects, timeline events..."
            className="w-full px-3 text-sm text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-none font-sans"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-600 rounded-md mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2 py-1 text-xs font-medium text-stone-500 hover:text-stone-800 bg-stone-100 rounded border border-stone-200"
          >
            Esc
          </button>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto p-4 space-y-6">
          {!trimmed && (
            <div className="py-8 text-center space-y-3">
              <Landmark className="w-8 h-8 text-stone-300 mx-auto" />
              <p className="text-xs text-stone-500 uppercase tracking-widest font-medium">
                Try searching for “CSMT”, “Gateway”, “Kanheri”, “Miniatures”, or “Ambedkar”
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['CSMT', 'Kanheri Caves', 'Gateway of India', 'Indo-Saracenic', 'Koli Heritage'].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="text-xs px-2.5 py-1 rounded bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {trimmed && !hasResults && (
            <div className="py-12 text-center space-y-2">
              <p className="text-stone-800 font-serif-display text-base">We couldn't find matching records</p>
              <p className="text-xs text-stone-500">
                Try a different keyword or browse through our verified collections.
              </p>
            </div>
          )}

          {/* Group 1: Heritage Sites */}
          {sites.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-stone-500 uppercase tracking-wider">
                <Landmark className="w-3.5 h-3.5 text-amber-800" />
                <span>Heritage Sites & Monuments ({sites.length})</span>
              </div>
              <div className="space-y-1">
                {sites.map((site) => (
                  <button
                    key={site.id}
                    type="button"
                    onClick={() => handleSelect(`/heritage/${site.slug}`)}
                    className="w-full text-left p-2.5 rounded-md hover:bg-stone-100 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={site.image}
                        alt={site.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 object-cover rounded bg-stone-200"
                      />
                      <div>
                        <div className="text-sm font-semibold text-stone-900 group-hover:text-amber-900 transition-colors">
                          {site.name}
                        </div>
                        <div className="text-xs text-stone-500 flex items-center gap-1.5">
                          <span>{site.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{site.year}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-700 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Group 2: Museums */}
          {museums.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-stone-500 uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5 text-amber-800" />
                <span>Museums ({museums.length})</span>
              </div>
              <div className="space-y-1">
                {museums.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleSelect('/museums')}
                    className="w-full text-left p-2.5 rounded-md hover:bg-stone-100 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={m.image}
                        alt={m.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 object-cover rounded bg-stone-200"
                      />
                      <div>
                        <div className="text-sm font-semibold text-stone-900 group-hover:text-amber-900">
                          {m.name}
                        </div>
                        <div className="text-xs text-stone-500">{m.museumType}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-700" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Group 3: Artifacts */}
          {artifacts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-stone-500 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                <span>Historical Artifacts ({artifacts.length})</span>
              </div>
              <div className="space-y-1">
                {artifacts.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => handleSelect('/artifacts')}
                    className="w-full text-left p-2.5 rounded-md hover:bg-stone-100 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={a.image}
                        alt={a.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 object-cover rounded bg-stone-200"
                      />
                      <div>
                        <div className="text-sm font-semibold text-stone-900 group-hover:text-amber-900">
                          {a.name}
                        </div>
                        <div className="text-xs text-stone-500 flex items-center gap-1.5">
                          <span>{a.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{a.material}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-700" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Group 4: Personalities */}
          {personalities.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-stone-500 uppercase tracking-wider">
                <User className="w-3.5 h-3.5 text-amber-800" />
                <span>Historical Personalities ({personalities.length})</span>
              </div>
              <div className="space-y-1">
                {personalities.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelect('/personalities')}
                    className="w-full text-left p-2.5 rounded-md hover:bg-stone-100 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 object-cover rounded bg-stone-200"
                      />
                      <div>
                        <div className="text-sm font-semibold text-stone-900 group-hover:text-amber-900">
                          {p.name}
                        </div>
                        <div className="text-xs text-stone-500">{p.role}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-700" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Group 5: Timeline */}
          {timelineEvents.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-stone-500 uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5 text-amber-800" />
                <span>Historical Timeline ({timelineEvents.length})</span>
              </div>
              <div className="space-y-1">
                {timelineEvents.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleSelect('/timeline')}
                    className="w-full text-left p-2.5 rounded-md hover:bg-stone-100 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-stone-900 group-hover:text-amber-900">
                        {t.title}
                      </div>
                      <div className="text-xs text-stone-500 flex items-center gap-1.5">
                        <span className="font-semibold text-amber-900">{t.dateDisplay}</span>
                        <span aria-hidden="true">·</span>
                        <span>{t.period}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-700" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-stone-100 border-t border-stone-200 text-[11px] text-stone-500 flex items-center justify-between">
          <span>Navigate using search keywords</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
