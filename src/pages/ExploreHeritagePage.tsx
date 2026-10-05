/**
 * Mumbai HeritageVault - Explore Heritage Directory Page
 * Searchable, multi-facet filterable catalog with Zero-Pill discipline
 */

import React, { useState, useMemo } from 'react';
import { Search, Filter, RotateCcw, SlidersHorizontal, MapPin } from 'lucide-react';
import { heritageApi, favoritesApi } from '../services/api';
import { HeritageSite, HeritageCategory, HistoricalPeriod, User } from '../types';
import { HeritageCard } from '../components/common/HeritageCard';

interface ExploreHeritagePageProps {
  currentUser: User | null;
}

export const ExploreHeritagePage: React.FC<ExploreHeritagePageProps> = ({ currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('All');
  const [selectedUnesco, setSelectedUnesco] = useState<string>('All');
  const [selectedAccess, setSelectedAccess] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'name' | 'year' | 'category'>('name');

  const allSites = useMemo(() => heritageApi.getAll(), []);

  const categories: string[] = [
    'All',
    'Monument',
    'Museum',
    'Fort',
    'Cave',
    'Heritage Building',
    'Market',
    'Railway Heritage',
  ];

  const periods: string[] = [
    'All',
    'Ancient & Early History',
    'Medieval Period',
    'Portuguese Period',
    'British/Bombay Period',
    '19th Century',
    'Early 20th Century',
  ];

  const filteredSites = useMemo(() => {
    return allSites
      .filter((site) => {
        // Search
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const match =
            site.name.toLowerCase().includes(q) ||
            site.description.toLowerCase().includes(q) ||
            site.location.toLowerCase().includes(q) ||
            site.historicalPeriod.toLowerCase().includes(q) ||
            (site.architecturalStyle && site.architecturalStyle.toLowerCase().includes(q));
          if (!match) return false;
        }

        // Category
        if (selectedCategory !== 'All' && site.category !== selectedCategory) {
          return false;
        }

        // Period
        if (selectedPeriod !== 'All' && site.historicalPeriod !== selectedPeriod) {
          return false;
        }

        // UNESCO
        if (selectedUnesco === 'UNESCO' && site.unescoStatus !== 'UNESCO World Heritage Site') {
          return false;
        }

        // Access
        if (selectedAccess !== 'All' && site.accessType !== selectedAccess) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'year') return a.year.localeCompare(b.year);
        if (sortBy === 'category') return a.category.localeCompare(b.category);
        return 0;
      });
  }, [allSites, searchTerm, selectedCategory, selectedPeriod, selectedUnesco, selectedAccess, sortBy]);

  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    if (!currentUser) return [];
    return favoritesApi.getByUserId(currentUser.id).map((f) => f.itemId);
  });

  const handleToggleFavorite = (site: HeritageSite) => {
    if (!currentUser) {
      alert('Please log in with demo account (visitor@heritagevault.demo) to save items to your collection.');
      return;
    }
    const isNowFav = favoritesApi.toggle(currentUser.id, {
      id: site.id,
      title: site.name,
      image: site.image,
      category: site.category,
      type: 'heritage',
    });
    setFavoriteIds((prev) =>
      isNowFav ? [...prev, site.id] : prev.filter((id) => id !== site.id)
    );
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedPeriod('All');
    setSelectedUnesco('All');
    setSelectedAccess('All');
    setSortBy('name');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Editorial Page Header */}
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <span className="text-xs uppercase tracking-widest text-stone-700 font-semibold font-sans">
          Curated Archive
        </span>
        <h1 className="font-serif-display text-3xl sm:text-4xl font-semibold text-stone-900">
          Explore Mumbai Heritage
        </h1>
        <p className="text-sm text-stone-600 font-serif max-w-3xl leading-relaxed">
          Search across Grade-I monuments, UNESCO World Heritage Victorian Gothic ensembles, ancient Buddhist rock-cut monasteries, coastal defense forts, and historic public markets.
        </p>
      </div>

      {/* Search and Filters Section */}
      <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs space-y-4">
        {/* Search Bar Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by monument name, location, architectural style, or keyword..."
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-md text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-800"
            />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-md text-xs font-medium text-stone-800 focus:outline-none"
            >
              <option value="name">Sort by Name</option>
              <option value="year">Sort Chronologically</option>
              <option value="category">Sort by Category</option>
            </select>

            {(searchTerm ||
              selectedCategory !== 'All' ||
              selectedPeriod !== 'All' ||
              selectedUnesco !== 'All' ||
              selectedAccess !== 'All') && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-3 py-2.5 text-xs text-stone-600 hover:text-stone-900 border border-stone-200 bg-stone-50 rounded-md flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs (Interactive Filter Controls, not static pills) */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
            Filter by Category:
          </label>
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  selectedCategory === cat
                    ? 'bg-amber-800 text-stone-100 font-semibold shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Multi-facet Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-stone-100">
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 uppercase tracking-wider mb-1">
              Historical Period:
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded text-xs text-stone-800 focus:outline-none"
            >
              {periods.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-600 uppercase tracking-wider mb-1">
              UNESCO World Heritage:
            </label>
            <select
              value={selectedUnesco}
              onChange={(e) => setSelectedUnesco(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded text-xs text-stone-800 focus:outline-none"
            >
              <option value="All">All Inscription Statuses</option>
              <option value="UNESCO">UNESCO World Heritage Only</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-600 uppercase tracking-wider mb-1">
              Access Type:
            </label>
            <select
              value={selectedAccess}
              onChange={(e) => setSelectedAccess(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded text-xs text-stone-800 focus:outline-none"
            >
              <option value="All">All Access Types</option>
              <option value="Free">Free Public Access</option>
              <option value="Ticketed">Ticketed Admission</option>
              <option value="Restricted">Restricted / Institutional</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <span>
          Showing <strong className="text-stone-900 tabular-nums">{filteredSites.length}</strong> of{' '}
          <strong className="text-stone-900 tabular-nums">{allSites.length}</strong> verified sites
        </span>
        {selectedCategory !== 'All' && (
          <span>Category: <strong className="text-stone-800">{selectedCategory}</strong></span>
        )}
      </div>

      {/* Grid Results */}
      {filteredSites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSites.map((site) => (
            <HeritageCard
              key={site.id}
              site={site}
              isFavorite={favoriteIds.includes(site.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-stone-200 p-12 text-center space-y-3">
          <p className="font-serif-display text-lg text-stone-800 font-semibold">
            No heritage sites matched your criteria
          </p>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Try adjusting your search terms or clearing one of your filters to discover more historical records.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-4 py-2 bg-stone-900 text-stone-100 text-xs font-semibold rounded hover:bg-stone-800 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
