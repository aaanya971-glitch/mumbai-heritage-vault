/**
 * Mumbai HeritageVault - Heritage Site Card Component
 * Adheres strictly to Zero-Pill Discipline: unboxed metadata with typographic separators
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ArrowRight, MapPin } from 'lucide-react';
import { HeritageSite } from '../../types';

interface HeritageCardProps {
  site: HeritageSite;
  isFavorite?: boolean;
  onToggleFavorite?: (site: HeritageSite) => void;
}

export const HeritageCard: React.FC<HeritageCardProps> = ({
  site,
  isFavorite = false,
  onToggleFavorite,
}) => {
  return (
    <article className="group bg-white rounded-lg border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col">
      {/* Visual Image Slot with Scrim and Zero-Broken-Image Fallback */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        <img
          src={site.image}
          alt={site.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
          onError={(e) => {
            // Elegant CSS fallback container on error
            (e.currentTarget as HTMLImageElement).src =
              'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="%23f1ece1" width="400" height="300"/><text fill="%238c7b65" font-family="serif" font-size="20" x="50%" y="50%" text-anchor="middle">Mumbai Heritage Archive</text></svg>';
          }}
        />

        {/* Quiet Favorite Button */}
        {onToggleFavorite && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite(site);
            }}
            aria-label={isFavorite ? `Remove ${site.name} from collection` : `Save ${site.name} to collection`}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
              isFavorite
                ? 'bg-amber-800 text-stone-100 shadow-sm'
                : 'bg-stone-900/60 text-stone-200 hover:bg-stone-900/80 hover:text-white'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Unboxed Metadata Line (NO PILLS) */}
        <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs text-stone-700 uppercase tracking-wider font-medium mb-2">
          <span>{site.category}</span>
          <span aria-hidden="true" className="text-stone-400">·</span>
          <span>{site.year}</span>
          {site.unescoStatus === 'UNESCO World Heritage Site' && (
            <>
              <span aria-hidden="true" className="text-stone-400">·</span>
              <span className="text-amber-800 font-semibold normal-case">UNESCO Heritage</span>
            </>
          )}
        </div>

        {/* Primary Title */}
        <h3 className="font-serif-display text-lg font-semibold text-stone-900 group-hover:text-amber-900 transition-colors leading-snug line-clamp-1 mb-2">
          {site.name}
        </h3>

        {/* Location Subtitle */}
        <div className="flex items-center gap-1.5 text-xs text-stone-700 mb-3">
          <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" />
          <span className="truncate">{site.location}</span>
        </div>

        {/* Brief Excerpt */}
        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4 flex-1">
          {site.description}
        </p>

        {/* Hairline Divider and Action */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-auto">
          <span className="text-[11px] text-stone-700 italic">
            {site.architecturalStyle ? site.architecturalStyle.split('(')[0].trim() : 'Historic Monument'}
          </span>

          <Link
            to={`/heritage/${site.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 group-hover:text-amber-900 transition-colors"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
};
