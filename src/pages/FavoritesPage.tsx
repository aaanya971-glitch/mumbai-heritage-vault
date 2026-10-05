/**
 * Mumbai HeritageVault - My Heritage Collection (Favorites)
 * Saved monuments, artifacts, museums, and personalities
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ArrowRight, Trash2, Landmark, Compass, ArrowLeft } from 'lucide-react';
import { favoritesApi } from '../services/api';
import { FavoriteItem, User } from '../types';

interface FavoritesPageProps {
  currentUser: User | null;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({ currentUser }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    if (currentUser) {
      setFavorites(favoritesApi.getByUserId(currentUser.id));
    }
  }, [currentUser]);

  const handleRemove = (item: FavoriteItem) => {
    if (!currentUser) return;
    favoritesApi.toggle(currentUser.id, {
      id: item.itemId,
      title: item.itemTitle,
      image: item.itemImage,
      category: item.category,
      type: item.itemType,
    });
    setFavorites(favoritesApi.getByUserId(currentUser.id));
  };

  if (!currentUser) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <Bookmark className="w-12 h-12 text-stone-300 mx-auto" />
        <h2 className="font-serif-display text-2xl font-bold text-stone-900">
          Sign In to Access Your Collection
        </h2>
        <p className="text-sm text-stone-600 font-serif">
          Log in with your demo account to save heritage sites, artifacts, and personalized walking routes.
        </p>
        <Link
          to="/login"
          className="inline-block px-5 py-2.5 bg-stone-900 text-stone-100 rounded text-xs font-semibold hover:bg-stone-800 transition-colors"
        >
          Sign In with Demo Credentials
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-stone-700 font-semibold font-sans">
            Personal Repository
          </span>
          <h1 className="font-serif-display text-3xl font-bold text-stone-900 mt-1">
            My Heritage Collection
          </h1>
          <p className="text-xs text-stone-600 font-serif mt-1">
            Archived records and monuments saved for research and future visits.
          </p>
        </div>

        <Link
          to="/heritage"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 hover:text-amber-800"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Browse More Sites</span>
        </Link>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                <img
                  src={item.itemImage}
                  alt={item.itemTitle}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(item)}
                  title="Remove from Collection"
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-stone-900/80 text-stone-200 hover:bg-rose-900 hover:text-white transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-5 flex flex-col flex-1 space-y-2">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-700">
                  {item.category || item.itemType}
                </div>

                <h3 className="font-serif-display text-base font-bold text-stone-900 leading-snug line-clamp-1">
                  {item.itemTitle}
                </h3>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs mt-auto">
                  <span className="text-[11px] text-stone-700">Saved on {new Date(item.createdAt).toLocaleDateString()}</span>
                  <Link
                    to={item.itemType === 'heritage' ? `/heritage/${item.itemId}` : item.itemType === 'museum' ? '/museums' : '/artifacts'}
                    className="text-amber-900 font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>View Record</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-stone-200 p-12 text-center space-y-4">
          <Bookmark className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="font-serif-display text-lg font-bold text-stone-900">
            Your collection is currently empty
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Browse our directory of monuments, museums, and historical artifacts, and click the bookmark button to assemble your personal heritage collection.
          </p>
          <Link
            to="/heritage"
            className="inline-block px-5 py-2.5 bg-stone-900 text-stone-100 rounded text-xs font-semibold hover:bg-stone-800 transition-colors"
          >
            Explore Heritage Sites
          </Link>
        </div>
      )}
    </div>
  );
};
