/**
 * Mumbai HeritageVault - Virtual Museum Exhibition
 * 6 Curated Virtual Galleries with Interactive Lightbox, Historical Context & Audio Narration
 */

import React, { useState } from 'react';
import { Compass, Volume2, X, ArrowRight, Sparkles, BookOpen, Layers } from 'lucide-react';
import { virtualMuseumApi } from '../services/api';
import { VirtualExhibitRoom, VirtualExhibit } from '../types';
import { AudioGuidePlayer } from '../components/common/AudioGuidePlayer';

export const VirtualMuseumPage: React.FC = () => {
  const rooms = virtualMuseumApi.getRooms();
  const [activeRoomId, setActiveRoomId] = useState<string>(rooms[0].roomId);
  const [selectedExhibit, setSelectedExhibit] = useState<VirtualExhibit | null>(null);

  const activeRoom = rooms.find((r) => r.roomId === activeRoomId) || rooms[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Editorial Exhibition Header */}
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <span className="text-xs uppercase tracking-widest text-stone-700 font-semibold font-sans">
          Curated Virtual Pavilions
        </span>
        <h1 className="font-serif-display text-3xl sm:text-4xl font-semibold text-stone-900">
          The Virtual Heritage Museum
        </h1>
        <p className="text-sm text-stone-600 font-serif max-w-3xl leading-relaxed">
          Step into our six thematic virtual exhibition halls. Examine archival dioramas, colonial architectural blueprints, indigenous marine artifacts, and key documents of the Indian freedom movement.
        </p>
      </div>

      {/* Room Selection Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200">
        {rooms.map((room) => (
          <button
            key={room.roomId}
            type="button"
            onClick={() => setActiveRoomId(room.roomId)}
            className={`px-4 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeRoomId === room.roomId
                ? 'bg-amber-800 text-stone-100 font-semibold shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <span>Room {room.roomNumber}: {room.roomTitle.split(':')[1]?.trim() || room.roomTitle}</span>
          </button>
        ))}
      </div>

      {/* Active Pavilion Title & Theme Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-xs space-y-2">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-amber-800 font-semibold">
          <span>Room {activeRoom.roomNumber}</span>
          <span aria-hidden="true">·</span>
          <span>{activeRoom.era}</span>
        </div>
        <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
          {activeRoom.roomTitle}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-serif max-w-2xl">
          Theme: <strong>{activeRoom.theme}</strong>
        </p>
      </div>

      {/* Exhibit Cards in this Room */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {activeRoom.exhibits.map((exhibit) => (
          <article
            key={exhibit.id}
            onClick={() => setSelectedExhibit(exhibit)}
            className="group cursor-pointer bg-white rounded-lg border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
          >
            <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
              <img
                src={exhibit.image}
                alt={exhibit.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/10 transition-colors" />
              <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-sm text-stone-100 text-[11px] px-2.5 py-1 rounded">
                {exhibit.period}
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1 space-y-3">
              <h3 className="font-serif-display text-xl font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                {exhibit.title}
              </h3>
              <p className="text-xs text-stone-600 font-serif leading-relaxed line-clamp-3">
                {exhibit.description}
              </p>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-auto">
                <span className="inline-flex items-center gap-1.5 text-xs text-amber-800 font-medium">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Audio Narration Available</span>
                </span>
                <span className="text-xs font-semibold text-stone-900 group-hover:text-amber-900 flex items-center gap-1">
                  <span>Enter Exhibit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Exhibit Lightbox Inspector Modal */}
      {selectedExhibit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-3xl bg-[#FBF9F5] rounded-xl shadow-2xl border border-stone-300 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white">
              <div className="space-y-0.5">
                <span className="text-[11px] uppercase tracking-wider text-amber-800 font-semibold">
                  {selectedExhibit.room} · {selectedExhibit.period}
                </span>
                <h3 className="font-serif-display text-xl font-bold text-stone-900">
                  {selectedExhibit.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedExhibit(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scroll Content */}
            <div className="overflow-y-auto p-6 space-y-6">
              <div className="aspect-[16/10] rounded-lg overflow-hidden bg-stone-900 border border-stone-200">
                <img
                  src={selectedExhibit.image}
                  alt={selectedExhibit.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Audio guide */}
              {selectedExhibit.audioGuidePlaceholder && (
                <AudioGuidePlayer
                  title={selectedExhibit.title}
                  narrationText={`${selectedExhibit.title}. ${selectedExhibit.description} ${selectedExhibit.historicalContext} ${selectedExhibit.audioGuidePlaceholder}`}
                  speakerLabel="Virtual Gallery Narrator"
                />
              )}

              <div className="space-y-3">
                <h4 className="font-serif-display text-lg font-bold text-stone-900 border-b border-stone-200 pb-1">
                  Exhibition Overview
                </h4>
                <p className="text-stone-800 text-sm font-serif leading-relaxed">
                  {selectedExhibit.description}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-serif-display text-lg font-bold text-stone-900 border-b border-stone-200 pb-1">
                  Historical Context & Archival Value
                </h4>
                <p className="text-stone-700 text-sm font-serif leading-relaxed">
                  {selectedExhibit.historicalContext}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
              <span>Mumbai HeritageVault Digital Pavilion</span>
              <button
                type="button"
                onClick={() => setSelectedExhibit(null)}
                className="px-4 py-1.5 bg-stone-900 text-stone-100 text-xs font-medium rounded hover:bg-stone-800"
              >
                Close Exhibit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
