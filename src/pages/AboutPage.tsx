/**
 * Mumbai HeritageVault - Institutional About Page
 * Vision, Mission, Target Users, Objectives, and Curatorial Charter
 */

import React from 'react';
import { Landmark, Compass, Shield, BookOpen, Users, Award, Heart, CheckCircle } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 space-y-2 text-center">
        <span className="text-xs uppercase tracking-widest text-stone-700 font-semibold font-sans">
          Institutional Charter
        </span>
        <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-stone-900">
          About Mumbai HeritageVault
        </h1>
        <p className="text-base text-stone-600 font-serif max-w-2xl mx-auto italic">
          “Discover Mumbai. Explore Its History. Preserve Its Heritage.”
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-sm bg-amber-900 text-stone-100 flex items-center justify-center">
            <Compass className="w-5 h-5 text-amber-300" />
          </div>
          <h2 className="font-serif-display text-xl font-bold text-stone-900">Our Vision</h2>
          <p className="text-xs sm:text-sm text-stone-700 font-serif leading-relaxed">
            To create a comprehensive, universally accessible digital museum repository that preserves, interprets, and honors the multicultural architectural, maritime, and indigenous heritage of Mumbai for future generations.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-sm bg-stone-900 text-stone-100 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-amber-400" />
          </div>
          <h2 className="font-serif-display text-xl font-bold text-stone-900">Our Mission</h2>
          <p className="text-xs sm:text-sm text-stone-700 font-serif leading-relaxed">
            To provide an interactive, academically grounded educational platform connecting students, researchers, tourists, and residents with verified records of Mumbai’s Grade-I monuments, museums, forts, and living cultural traditions.
          </p>
        </div>
      </div>

      {/* Strategic Objectives */}
      <section className="bg-white p-8 rounded-xl border border-stone-200 shadow-xs space-y-6">
        <h2 className="font-serif-display text-2xl font-bold text-stone-900 border-b border-stone-200 pb-3">
          Core Institutional Objectives
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm text-stone-700">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-stone-900">
              <CheckCircle className="w-4 h-4 text-amber-800 shrink-0" />
              <span>1. Digital Preservation</span>
            </div>
            <p className="pl-6 text-stone-600 font-serif leading-relaxed">
              Archiving high-resolution photographs, architectural monographs, historical timelines, and provenance data for fragile coastal stone structures.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-stone-900">
              <CheckCircle className="w-4 h-4 text-amber-800 shrink-0" />
              <span>2. Heritage Education & Literacy</span>
            </div>
            <p className="pl-6 text-stone-600 font-serif leading-relaxed">
              Equipping schools, universities, and lifelong learners with verified curricula, interactive quizzes, and factual AI guidance without speculative history.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-stone-900">
              <CheckCircle className="w-4 h-4 text-amber-800 shrink-0" />
              <span>3. Cultural Awareness & Inclusivity</span>
            </div>
            <p className="pl-6 text-stone-600 font-serif leading-relaxed">
              Highlighting the primordial traditions of the indigenous Koli community, working-class mill history in Girangaon, Parsi mercantile heritage, and the Samyukta Maharashtra movement.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-stone-900">
              <CheckCircle className="w-4 h-4 text-amber-800 shrink-0" />
              <span>4. Sustainable Tourism & Fieldwork</span>
            </div>
            <p className="pl-6 text-stone-600 font-serif leading-relaxed">
              Guiding responsible pedestrian exploration through South Mumbai's UNESCO World Heritage Ensembles and Salsette's protected archaeological zones.
            </p>
          </div>
        </div>
      </section>

      {/* Target Audiences */}
      <section className="space-y-4">
        <h2 className="font-serif-display text-xl font-bold text-stone-900 border-b border-stone-200 pb-2">
          Who This Platform Serves
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
          {['Students & Schools', 'Tourists & Visitors', 'Historical Researchers', 'Architects & Urbanists', 'Local Residents', 'Heritage Conservators'].map((u) => (
            <div key={u} className="p-4 rounded-lg bg-stone-100/70 border border-stone-200 text-xs font-semibold text-stone-800">
              {u}
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer Section */}
      <div className="bg-stone-900 text-stone-200 p-6 rounded-xl border border-stone-800 text-xs space-y-2">
        <div className="flex items-center gap-2 text-amber-400 font-semibold uppercase tracking-wider text-[11px]">
          <Shield className="w-4 h-4" />
          <span>Academic & Verification Charter</span>
        </div>
        <p className="leading-relaxed font-serif text-stone-300">
          This digital museum is an educational project. Historical information should be verified against authoritative museum, archival, archaeological, and government sources including the Archaeological Survey of India (ASI) and the Mumbai Heritage Conservation Committee (MHCC).
        </p>
      </div>
    </div>
  );
};
