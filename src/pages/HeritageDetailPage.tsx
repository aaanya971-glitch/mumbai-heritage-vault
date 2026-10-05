/**
 * Mumbai HeritageVault - Heritage Site Detail Page
 * Features Museum Accession Layout, Audio Guide Player, Editorial Essay & Nearby Sites
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Bookmark,
  Share2,
  MapPin,
  Calendar,
  Compass,
  ArrowLeft,
  CheckCircle,
  ExternalLink,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';
import { heritageApi, favoritesApi } from '../services/api';
import { HeritageSite, User } from '../types';
import { AudioGuidePlayer } from '../components/common/AudioGuidePlayer';
import { HeritageCard } from '../components/common/HeritageCard';

interface HeritageDetailPageProps {
  currentUser: User | null;
}

export const HeritageDetailPage: React.FC<HeritageDetailPageProps> = ({ currentUser }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [site, setSite] = useState<HeritageSite | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [nearbySites, setNearbySites] = useState<HeritageSite[]>([]);

  useEffect(() => {
    if (!slug) return;
    const found = heritageApi.getBySlug(slug);
    if (found) {
      setSite(found);
      if (currentUser) {
        setIsFavorite(favoritesApi.isFavorite(currentUser.id, found.id));
      }

      // Find nearby sites
      const all = heritageApi.getAll();
      const nearby = all.filter((s) => s.id !== found.id && s.category === found.category).slice(0, 3);
      setNearbySites(nearby.length > 0 ? nearby : all.filter((s) => s.id !== found.id).slice(0, 3));
    } else {
      setSite(null);
    }
  }, [slug, currentUser]);

  if (!site) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif-display text-2xl font-semibold text-stone-900">
          We couldn't find that heritage site
        </h2>
        <p className="text-sm text-stone-600">
          The requested record may have been re-indexed or does not exist in our digital archive.
        </p>
        <Link
          to="/heritage"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-stone-100 rounded text-xs font-semibold hover:bg-stone-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore Heritage</span>
        </Link>
      </div>
    );
  }

  const handleToggleFavorite = () => {
    if (!currentUser) {
      alert('Please log in with demo account (visitor@heritagevault.demo) to save to your collection.');
      return;
    }
    const newStatus = favoritesApi.toggle(currentUser.id, {
      id: site.id,
      title: site.name,
      image: site.image,
      category: site.category,
      type: 'heritage',
    });
    setIsFavorite(newStatus);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/heritage"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Heritage Directory</span>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleFavorite}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
              isFavorite
                ? 'bg-amber-800 text-stone-100 border-amber-900 shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-300'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
            <span>{isFavorite ? 'Saved to Collection' : 'Add to Favorites'}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedShare ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Hero Visual Frame */}
      <div className="relative rounded-xl overflow-hidden border border-stone-300 shadow-sm bg-stone-900 aspect-[16/9] max-h-[500px]">
        <img
          src={site.image}
          alt={site.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

        {/* Hero Title & Unboxed Metadata Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 space-y-2 text-stone-100">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-widest text-amber-300 font-medium">
            <span>{site.category}</span>
            <span aria-hidden="true">·</span>
            <span>{site.year}</span>
            {site.unescoStatus === 'UNESCO World Heritage Site' && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-stone-100">UNESCO World Heritage Inscription</span>
              </>
            )}
          </div>

          <h1 className="font-serif-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            {site.name}
          </h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-300 pt-1">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{site.location}</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout (70% Essay & Artifacts / 30% Accession Data & Map) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column (8 cols): Editorial Prose */}
        <div className="lg:col-span-8 space-y-10">
          {/* Audio Narration Guide Player */}
          {site.audioGuideText && (
            <AudioGuidePlayer
              title={`Audio Guide: ${site.name}`}
              narrationText={site.audioGuideText}
              speakerLabel="Museum Audio Guide Series"
            />
          )}

          {/* Section: Why This Place Matters with Drop Cap */}
          <section className="space-y-4">
            <h2 className="font-serif-display text-2xl font-bold text-stone-900 border-b border-stone-200 pb-2">
              Why This Place Matters
            </h2>
            <div className="text-stone-800 font-serif leading-relaxed text-base space-y-4">
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-amber-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 leading-relaxed">
                {site.whyItMatters || site.description}
              </p>
              <p className="leading-relaxed text-stone-700">
                {site.significance}
              </p>
            </div>
          </section>

          {/* Section: Architectural & Design Language */}
          <section className="space-y-4">
            <h3 className="font-serif-display text-xl font-bold text-stone-900 border-b border-stone-200 pb-2">
              Architectural & Structural Anatomy
            </h3>
            <div className="bg-white p-5 rounded-lg border border-stone-200 space-y-3 text-sm text-stone-700 leading-relaxed">
              <div className="flex items-center gap-2 font-medium text-stone-900">
                <Layers className="w-4 h-4 text-amber-800" />
                <span>Primary Style: {site.architecturalStyle || 'Colonial Architecture'}</span>
              </div>
              <p>
                {site.architect && (
                  <span className="block mb-2 text-stone-800">
                    <strong>Master Architect / Designer:</strong> {site.architect}
                  </span>
                )}
                The structure reflects high craftsmanship in indigenous basalt and stone carving, balancing European structural engineering with climatic adaptations like deep verandahs, perforated jali screens, and monumental arcades.
              </p>
            </div>
          </section>

          {/* Section: Interesting Facts & Curatorial Notes */}
          {site.interestingFacts && site.interestingFacts.length > 0 && (
            <section className="space-y-4">
              <h3 className="font-serif-display text-xl font-bold text-stone-900 border-b border-stone-200 pb-2">
                Archival Facts & Curatorial Notes
              </h3>
              <ul className="space-y-3">
                {site.interestingFacts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-stone-700">
                    <span className="text-xs font-mono font-bold text-amber-800 mt-1 shrink-0">
                      0{i + 1}.
                    </span>
                    <span className="leading-relaxed">{fact}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Citations & Verified Provenance */}
          <div className="p-4 bg-stone-100 rounded-lg border border-stone-200 text-xs text-stone-600 space-y-1">
            <span className="font-semibold text-stone-800 block uppercase tracking-wider text-[11px]">
              Archival Source & Verification Record:
            </span>
            <p className="italic">
              {site.referencesSource || 'Archaeological Survey of India (ASI) - Mumbai Circle Archival Record'}
            </p>
          </div>
        </div>

        {/* Right Column (4 cols): Accession Ledger & Coordinates */}
        <div className="lg:col-span-4 space-y-6">
          {/* Accession Ledger Box */}
          <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-serif-display text-base font-bold text-stone-900 uppercase tracking-wider border-b border-stone-200 pb-2">
              Monument Accession Record
            </h3>

            <dl className="space-y-3 text-xs">
              <div>
                <dt className="text-stone-700 font-semibold uppercase tracking-wider">Classification</dt>
                <dd className="text-stone-900 font-medium text-sm mt-0.5">{site.category}</dd>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <dt className="text-stone-700 font-semibold uppercase tracking-wider">Construction Epoch</dt>
                <dd className="text-stone-900 font-medium text-sm mt-0.5">{site.year}</dd>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <dt className="text-stone-700 font-semibold uppercase tracking-wider">Historical Period</dt>
                <dd className="text-stone-900 font-medium text-sm mt-0.5">{site.historicalPeriod}</dd>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <dt className="text-stone-700 font-semibold uppercase tracking-wider">UNESCO Status</dt>
                <dd className="text-amber-900 font-semibold text-sm mt-0.5">{site.unescoStatus}</dd>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <dt className="text-stone-700 font-semibold uppercase tracking-wider">Public Access</dt>
                <dd className="text-stone-900 font-medium text-sm mt-0.5">{site.accessType || 'Public Access'}</dd>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <dt className="text-stone-700 font-semibold uppercase tracking-wider">Geographic Coordinates</dt>
                <dd className="text-stone-800 font-mono mt-0.5">
                  {site.latitude.toFixed(5)}° N, {site.longitude.toFixed(5)}° E
                </dd>
              </div>
            </dl>

            <div className="pt-3 border-t border-stone-200">
              <Link
                to={`/map`}
                className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>View on Interactive Map</span>
              </Link>
            </div>
          </div>

          {/* Ask Mitra about this monument */}
          <div className="bg-stone-900 text-stone-100 p-5 rounded-lg border border-stone-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Ask Mitra AI Guide</span>
            </div>
            <p className="text-xs text-stone-300 font-serif leading-relaxed">
              Curious about architectural anecdotes or historical controversies surrounding {site.name}?
            </p>
            <Link
              to={`/ai-guide`}
              className="inline-block text-xs font-semibold text-amber-300 hover:underline"
            >
              Ask Mitra about {site.name.split('(')[0]} →
            </Link>
          </div>
        </div>
      </div>

      {/* Section: Explore Nearby Heritage */}
      {nearbySites.length > 0 && (
        <section className="pt-8 border-t border-stone-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-stone-700 font-semibold">
                Geographic Proximity
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-stone-900 mt-1">
                Explore Nearby Heritage
              </h3>
            </div>
            <Link
              to="/heritage"
              className="text-xs font-semibold text-amber-900 hover:underline"
            >
              View All Sites →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nearbySites.map((ns) => (
              <HeritageCard key={ns.id} site={ns} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
