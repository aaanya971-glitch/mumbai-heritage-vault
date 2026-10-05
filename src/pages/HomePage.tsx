/**
 * Mumbai HeritageVault - Museum Homepage
 * Conforms to Museum Editorial Guidelines & Universal Frontend Design Constitution
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Landmark,
  Compass,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  MapPin,
  Calendar,
  HelpCircle,
  Clock,
  BookOpen,
  Award,
  ChevronLeft,
  ChevronRight,
  Camera,
} from 'lucide-react';
import { heritageApi, museumsApi, favoritesApi } from '../services/api';
import { HeritageSite, User } from '../types';
import { HeritageCard } from '../components/common/HeritageCard';
import {
  HERO_IMAGE,
  MONUMENTS_PANORAMA_IMAGE,
  CSMT_IMAGE,
  GATEWAY_IMAGE,
  KANHERI_IMAGE,
  CSMVS_IMAGE,
} from '../data/mockHeritageData';

interface HomePageProps {
  currentUser: User | null;
}

interface MonumentBackground {
  id: string;
  name: string;
  style: string;
  location: string;
  image: string;
  link: string;
}

const MONUMENT_BACKGROUNDS: MonumentBackground[] = [
  {
    id: 'rajabai_panorama',
    name: 'Rajabai Clock Tower & Gothic Ensembles',
    style: 'Venetian & Victorian Gothic Revival · 1878',
    location: 'Oval Maidan Precinct, Fort',
    image: MONUMENTS_PANORAMA_IMAGE,
    link: '/heritage/rajabai-clock-tower',
  },
  {
    id: 'csmt_cathedral',
    name: 'Chhatrapati Shivaji Maharaj Terminus (CSMT)',
    style: 'High Victorian Gothic · UNESCO World Heritage (1887)',
    location: 'Bori Bunder, Fort',
    image: CSMT_IMAGE,
    link: '/heritage/csmt-terminus',
  },
  {
    id: 'gateway_arch',
    name: 'Gateway of India',
    style: 'Indo-Saracenic Basalt Triumphal Arch · 1924',
    location: 'Apollo Bunder, Colaba',
    image: GATEWAY_IMAGE,
    link: '/heritage/gateway-of-india',
  },
  {
    id: 'kanheri_chaitya',
    name: 'Kanheri Buddhist Rock-Cut Sanctuary',
    style: 'Satavahana & Rashtrakuta Rock-Cut Architecture · 1st c. BCE',
    location: 'Sanjay Gandhi National Park, Borivali',
    image: KANHERI_IMAGE,
    link: '/heritage/kanheri-caves',
  },
  {
    id: 'csmvs_palace',
    name: 'CSMVS Vastu Sangrahalaya',
    style: 'Indo-Saracenic Palace & Palm Gardens · 1922',
    location: 'Kala Ghoda Art District, Fort',
    image: CSMVS_IMAGE,
    link: '/heritage/csmvs-museum',
  },
];

export const HomePage: React.FC<HomePageProps> = ({ currentUser }) => {
  const [featuredSites, setFeaturedSites] = useState<HeritageSite[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [bgIndex, setBgIndex] = useState(0);

  const activeMonument = MONUMENT_BACKGROUNDS[bgIndex];

  useEffect(() => {
    const all = heritageApi.getAll();
    const featured = all.slice(0, 6);
    setFeaturedSites(featured);

    if (currentUser) {
      const favs = favoritesApi.getByUserId(currentUser.id);
      setFavoriteIds(favs.map((f) => f.itemId));
    }
  }, [currentUser]);

  const handleNextBg = () => {
    setBgIndex((prev) => (prev + 1) % MONUMENT_BACKGROUNDS.length);
  };

  const handlePrevBg = () => {
    setBgIndex((prev) => (prev - 1 + MONUMENT_BACKGROUNDS.length) % MONUMENT_BACKGROUNDS.length);
  };

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

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* 1. HERO SECTION WITH MONUMENTS BACKGROUND SWITCHER */}
      <section className="relative min-h-[620px] lg:min-h-[680px] flex items-center justify-center overflow-hidden border-b border-stone-200">
        {/* Background Image with Measured Contrast Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            key={activeMonument.id}
            src={activeMonument.image}
            alt={activeMonument.name}
            className="w-full h-full object-cover object-center transition-opacity duration-700 animate-in fade-in"
          />
          {/* Measured multi-stop scrim ensuring 4.5:1 text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/75 to-stone-900/40" />
        </div>

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
          {/* Unboxed curatorial kicker (NO PILLS) */}
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-medium">
            <span>Historical & Cultural Digital Museum</span>
            <span aria-hidden="true">·</span>
            <span>Mumbai, Maharashtra</span>
          </div>

          <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-stone-100 font-semibold tracking-tight text-balance leading-tight">
            Discover the Heritage of Mumbai
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-stone-300 font-serif leading-relaxed text-balance">
            Explore centuries of history, architecture, culture, people, and stories that shaped the city of Mumbai from seven islands to a global metropolis.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/heritage"
              className="px-6 py-3 bg-amber-800 hover:bg-amber-700 text-stone-100 rounded-md text-sm font-semibold tracking-wide transition-colors shadow-sm flex items-center gap-2"
            >
              <span>Explore Heritage</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/virtual-museum"
              className="px-6 py-3 bg-stone-900/80 hover:bg-stone-900 text-stone-200 border border-stone-600 rounded-md text-sm font-medium tracking-wide transition-colors backdrop-blur-sm flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Start Virtual Tour</span>
            </Link>
          </div>
        </div>

        {/* HERO MONUMENT BACKGROUND SWITCHER RIBBON */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 bg-stone-950/80 backdrop-blur-md border border-stone-700/80 rounded-lg px-4 py-2.5 text-xs text-stone-200">
          <div className="flex items-center gap-2.5 text-left">
            <Camera className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-medium">
                Active Monument Background ({bgIndex + 1}/{MONUMENT_BACKGROUNDS.length})
              </span>
              <span className="font-serif-display text-sm font-semibold text-stone-100">
                {activeMonument.name}
              </span>
              <span className="text-stone-400 text-[11px] block sm:inline sm:ml-2">
                · {activeMonument.style}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Direct Link to active monument */}
            <Link
              to={activeMonument.link}
              className="text-[11px] font-semibold text-amber-300 hover:text-amber-200 hover:underline mr-2"
            >
              View Record →
            </Link>

            {/* Previous / Next buttons */}
            <button
              type="button"
              onClick={handlePrevBg}
              aria-label="Previous Monument Background"
              className="p-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600 transition-colors"
              title="Previous monument"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {/* Thumbnail dots */}
            <div className="flex items-center gap-1.5 px-1">
              {MONUMENT_BACKGROUNDS.map((bg, idx) => (
                <button
                  key={bg.id}
                  type="button"
                  onClick={() => setBgIndex(idx)}
                  aria-label={`Switch to ${bg.name}`}
                  className={`h-2 rounded-full transition-all ${
                    bgIndex === idx ? 'w-5 bg-amber-400' : 'w-2 bg-stone-600 hover:bg-stone-400'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNextBg}
              aria-label="Next Monument Background"
              className="p-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600 transition-colors"
              title="Next monument"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. OPERATIONAL UTILITY STRIP */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-lg border border-stone-200 shadow-sm p-4 sm:p-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-600">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-amber-800 shrink-0" />
            <div>
              <strong className="block text-stone-900 font-semibold">100% Archival Integrity</strong>
              <span>Verified against ASI & UNESCO World Heritage documentation</span>
            </div>
          </div>
          <div className="flex items-center gap-3 border-t md:border-t-0 md:border-l border-stone-200 pt-3 md:pt-0 md:pl-4">
            <MapPin className="w-5 h-5 text-amber-800 shrink-0" />
            <div>
              <strong className="block text-stone-900 font-semibold">South Mumbai & Salsette</strong>
              <span>Fort, Kala Ghoda, Marine Drive, Worli & Borivali Sanjay Gandhi Park</span>
            </div>
          </div>
          <div className="flex items-center gap-3 border-t md:border-t-0 md:border-l border-stone-200 pt-3 md:pt-0 md:pl-4">
            <Sparkles className="w-5 h-5 text-amber-800 shrink-0" />
            <div>
              <strong className="block text-stone-900 font-semibold">AI Heritage Assistant</strong>
              <span>Mitra: Guided factual inquiry with zero AI hallucinations</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. HERITAGE STATISTICS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-stone-700 font-semibold">
            Institutional Catalog
          </span>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-stone-900 mt-1">
            Mumbai's Documented Heritage by the Numbers
          </h2>
          <p className="text-xs text-stone-700 mt-2">
            Curated dataset representing primary Grade-I & UNESCO World Heritage monuments of Mumbai.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
            <span className="block font-serif-display text-3xl font-bold text-amber-900 tabular-nums">
              13+
            </span>
            <span className="text-xs text-stone-600 font-medium mt-1 block">Heritage Sites</span>
          </div>
          <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
            <span className="block font-serif-display text-3xl font-bold text-amber-900 tabular-nums">
              5+
            </span>
            <span className="text-xs text-stone-600 font-medium mt-1 block">Museums</span>
          </div>
          <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
            <span className="block font-serif-display text-3xl font-bold text-amber-900 tabular-nums">
              9+
            </span>
            <span className="text-xs text-stone-600 font-medium mt-1 block">Historical Artifacts</span>
          </div>
          <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
            <span className="block font-serif-display text-3xl font-bold text-amber-900 tabular-nums">
              7+
            </span>
            <span className="text-xs text-stone-600 font-medium mt-1 block">Personalities</span>
          </div>
          <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
            <span className="block font-serif-display text-3xl font-bold text-amber-900 tabular-nums">
              5+
            </span>
            <span className="text-xs text-stone-600 font-medium mt-1 block">Cultural Traditions</span>
          </div>
          <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
            <span className="block font-serif-display text-3xl font-bold text-amber-900 tabular-nums">
              9+
            </span>
            <span className="text-xs text-stone-600 font-medium mt-1 block">Historical Epochs</span>
          </div>
        </div>
      </section>

      {/* 4. FEATURED HERITAGE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-widest text-stone-700 font-semibold">
              Curated Highlights
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-stone-900 mt-1">
              Featured Heritage of Mumbai
            </h2>
            <p className="text-xs text-stone-700 mt-1">
              Must-visit Grade-I landmarks and UNESCO World Heritage ensembles.
            </p>
          </div>
          <Link
            to="/heritage"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 hover:text-amber-800 transition-colors"
          >
            <span>View Full Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSites.map((site) => (
            <HeritageCard
              key={site.id}
              site={site}
              isFavorite={favoriteIds.includes(site.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      </section>

      {/* 5. MUMBAI THROUGH TIME TEASER */}
      <section className="bg-stone-900 text-stone-100 py-16 border-y border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
                Chronological Exhibition
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-stone-100 leading-tight">
                Mumbai Through Time
              </h2>
              <p className="text-stone-300 text-sm font-serif leading-relaxed">
                From ancient Buddhist rock-cut monasteries at Kanheri to the Portuguese manor estates, the epic 18th-century land reclamation of the Seven Islands, and the dawn of Asia's first railway line.
              </p>
              <div className="pt-2">
                <Link
                  to="/timeline"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-800 hover:bg-amber-700 text-stone-100 rounded-md text-xs font-semibold tracking-wide transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Explore Interactive Timeline</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-stone-800/80 p-5 rounded-lg border border-stone-700 space-y-2">
                <span className="text-xs font-mono text-amber-400 font-semibold block">200 BCE – 600 CE</span>
                <h4 className="text-sm font-serif-display font-medium text-stone-200">Ancient Basalt Carvings</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Kanheri and Elephanta rock-cut sanctuaries carved by Buddhist and Shaivite artisans.
                </p>
              </div>

              <div className="bg-stone-800/80 p-5 rounded-lg border border-stone-700 space-y-2">
                <span className="text-xs font-mono text-amber-400 font-semibold block">1782–1845 CE</span>
                <h4 className="text-sm font-serif-display font-medium text-stone-200">The Great Reclamation</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Governor Hornby’s causeway plugs the breach at Mahalaxmi, uniting the seven separate islands.
                </p>
              </div>

              <div className="bg-stone-800/80 p-5 rounded-lg border border-stone-700 space-y-2">
                <span className="text-xs font-mono text-amber-400 font-semibold block">1853–1947 CE</span>
                <h4 className="text-sm font-serif-display font-medium text-stone-200">Steam & Independence</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Asia's first train runs from Bori Bunder to Thane, and Gowalia Tank witnesses Quit India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE MAP TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-100 rounded-xl border border-stone-200 p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-stone-700 font-semibold">
              Spatial Cartography
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-stone-900 leading-tight">
              Explore Mumbai Heritage on the Map
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              Navigate all documented Grade-I monuments, museums, medieval forts, and ancient caves pinpointed across the Mumbai peninsula and Salsette island. Filter by categories, preview thumbnail archives, and plan physical walks.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/map"
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-md text-xs font-semibold tracking-wide transition-colors"
              >
                Launch Interactive Map
              </Link>
              <Link
                to="/tour-planner"
                className="px-5 py-2.5 bg-white hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-md text-xs font-medium tracking-wide transition-colors"
              >
                Plan a Walking Tour
              </Link>
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden border border-stone-300 shadow-sm aspect-[16/10] bg-stone-200">
            <img
              src={HERO_IMAGE}
              alt="Mumbai Cartographic Map Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-stone-900/40 flex items-center justify-center p-6 text-center">
              <div className="bg-white/95 backdrop-blur-md p-4 rounded-md shadow-md max-w-xs space-y-1">
                <MapPin className="w-6 h-6 text-amber-800 mx-auto" />
                <h4 className="font-serif-display text-sm font-bold text-stone-900">
                  OpenStreetMap Cartography
                </h4>
                <p className="text-[11px] text-stone-600">
                  Click below to open full interactive map with coordinate markers & layers.
                </p>
                <Link
                  to="/map"
                  className="inline-block text-xs font-semibold text-amber-900 hover:underline pt-1"
                >
                  Open Map →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. MEET MITRA AI HERITAGE GUIDE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-stone-100 rounded-xl border border-stone-800 p-8 sm:p-12 shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-950/80 border border-amber-800 text-amber-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Historical Assistant</span>
            </div>

            <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-stone-100">
              Meet Mitra – Your Mumbai Heritage Guide
            </h2>

            <p className="text-stone-300 text-sm leading-relaxed font-serif">
              Have questions about Frederick William Stevens' architectural drawings? Curious about why Premchand Roychand built the Rajabai Clock Tower, or want a customized 3-hour South Mumbai walking route?
            </p>

            <div className="p-4 bg-stone-950/50 rounded-lg border border-stone-800/90 text-xs text-stone-300 space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold block">
                Zero-Hallucination Curatorial Grounding
              </span>
              <p className="italic">
                “When information is not available in our verified museum database, Mitra will tell you honestly that archival verification is required.”
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/ai-guide"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-700 hover:bg-amber-600 text-stone-100 rounded-md text-xs font-semibold tracking-wide transition-colors"
              >
                <span>Ask Mitra a Question</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TEST YOUR KNOWLEDGE QUIZ TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-stone-200 rounded-xl bg-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-stone-700 font-semibold">
              Educational Module
            </span>
            <h3 className="font-serif-display text-2xl font-semibold text-stone-900">
              Test Your Knowledge: Mumbai Heritage Quiz
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm max-w-xl leading-relaxed">
              Challenge yourself with our 10-question educational quiz spanning Mumbai history, Victorian Gothic architecture, ancient forts, and cultural traditions. Earn badges from Heritage Beginner to Heritage Master!
            </p>
          </div>

          <Link
            to="/quiz"
            className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-md text-xs font-semibold tracking-wide transition-colors whitespace-nowrap shrink-0 shadow-xs flex items-center gap-2"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Take the Quiz</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
