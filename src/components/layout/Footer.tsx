/**
 * Mumbai HeritageVault - Institutional Footer
 * Conforms to museum editorial guidelines & educational disclaimer
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Compass, Sparkles, BookOpen, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      {/* Editorial Quote Banner */}
      <div className="border-b border-stone-800/80 bg-stone-950/60 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-serif-display text-xl sm:text-2xl text-stone-200 italic font-normal tracking-wide">
            “Every building has a story. Every artifact has a memory. Every street carries a piece of Mumbai’s history.”
          </p>
          <p className="text-xs text-amber-200/60 uppercase tracking-widest font-sans mt-3">
            Digital Archival Philosophy · Mumbai HeritageVault
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 text-stone-100">
              <div className="w-9 h-9 rounded-sm bg-stone-800 border border-stone-700 flex items-center justify-center">
                <Landmark className="w-5 h-5 text-amber-400" />
              </div>
              <span className="font-emblem text-lg font-bold tracking-wider text-stone-100">
                MUMBAI HERITAGEVAULT
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-md font-serif-display">
              Discover Mumbai. Explore Its History. Preserve Its Heritage.
            </p>
            <p className="text-xs text-stone-500 leading-relaxed max-w-sm">
              An interactive digital museum dedicated to documenting, archiving, and celebrating the architectural,
              indigenous, and social heritage of Mumbai, Maharashtra, India.
            </p>
            <div className="flex items-center gap-4 text-xs text-stone-400 pt-2">
              <span className="inline-flex items-center gap-1.5 text-amber-300/80">
                <Shield className="w-3.5 h-3.5" />
                <span>Verified Historical Archiving</span>
              </span>
            </div>
          </div>

          {/* Column 2: Digital Galleries */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-widest text-stone-200 uppercase font-sans">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link to="/heritage" className="hover:text-amber-300 transition-colors">
                  All Heritage Sites
                </Link>
              </li>
              <li>
                <Link to="/museums" className="hover:text-amber-300 transition-colors">
                  Museums of Mumbai
                </Link>
              </li>
              <li>
                <Link to="/monuments" className="hover:text-amber-300 transition-colors">
                  Monuments & High Court
                </Link>
              </li>
              <li>
                <Link to="/forts-caves" className="hover:text-amber-300 transition-colors">
                  Coastal Forts & Kanheri Caves
                </Link>
              </li>
              <li>
                <Link to="/artifacts" className="hover:text-amber-300 transition-colors">
                  Historical Artifacts
                </Link>
              </li>
              <li>
                <Link to="/culture" className="hover:text-amber-300 transition-colors">
                  Koli & Living Traditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Interactive Experiences */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-widest text-stone-200 uppercase font-sans">
              Interactive Tools
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link to="/virtual-museum" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-amber-400/80" />
                  <span>Virtual Museum</span>
                </Link>
              </li>
              <li>
                <Link to="/timeline" className="hover:text-amber-300 transition-colors">
                  Timeline of Mumbai
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-amber-300 transition-colors">
                  Interactive Heritage Map
                </Link>
              </li>
              <li>
                <Link to="/tour-planner" className="hover:text-amber-300 transition-colors">
                  Plan My Heritage Tour
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="hover:text-amber-300 transition-colors">
                  Heritage Knowledge Quiz
                </Link>
              </li>
              <li>
                <Link to="/ai-guide" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400/80" />
                  <span>Mitra AI Assistant</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Institutional & Archival */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-widest text-stone-200 uppercase font-sans">
              Institutional
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link to="/about" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>About & Vision</span>
                </Link>
              </li>
              <li>
                <Link to="/personalities" className="hover:text-amber-300 transition-colors">
                  Historical Personalities
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-300 transition-colors">
                  Curatorial Inquiries
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-amber-300 transition-colors">
                  Demo Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Institutional Academic Disclaimer */}
        <div className="mt-12 pt-8 border-t border-stone-800 text-xs text-stone-500 space-y-4">
          <div className="p-4 rounded-md bg-stone-950/40 border border-stone-800">
            <p className="font-semibold text-stone-400 mb-1">Institutional Notice & Disclaimer:</p>
            <p className="leading-relaxed">
              This digital museum is an educational project designed for academic presentation, research, and public heritage appreciation.
              Historical information should be verified against authoritative museum, archival, archaeological, and government sources including
              the Archaeological Survey of India (ASI), the Directorate of Archaeology and Museums (Maharashtra), and UNESCO World Heritage documentation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-stone-500">
            <p>
              © {new Date().getFullYear()} Mumbai HeritageVault. Preserving the memory of the Seven Islands.
            </p>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-stone-400">Demo User: visitor@heritagevault.demo</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-400">Demo Admin: admin@heritagevault.demo</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
