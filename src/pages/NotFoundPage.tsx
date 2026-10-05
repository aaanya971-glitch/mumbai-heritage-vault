/**
 * Mumbai HeritageVault - 404 Not Found Page
 * Curatorial missing archival record state with direct return actions
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, ArrowLeft, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center mx-auto">
        <Landmark className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-stone-700 font-semibold font-mono">
          Status 404 · Missing Record
        </span>
        <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-stone-900">
          Archival Record Not Located
        </h1>
        <p className="text-sm text-stone-600 font-serif max-w-md mx-auto leading-relaxed">
          The requested heritage exhibition, monument page, or archival accession could not be found in our digital vaults.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <Link
          to="/heritage"
          className="px-5 py-2.5 bg-amber-800 hover:bg-amber-700 text-stone-100 rounded text-xs font-semibold tracking-wide transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore Heritage</span>
        </Link>

        <Link
          to="/"
          className="px-5 py-2.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded text-xs font-semibold tracking-wide transition-colors"
        >
          Return to Museum Homepage
        </Link>
      </div>
    </div>
  );
};
