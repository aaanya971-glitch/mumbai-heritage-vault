/**
 * Mumbai HeritageVault - Interactive Audio Guide Player
 * Utilizes Web Speech API for authentic spoken museum narration with fallback playback
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, FileText } from 'lucide-react';

interface AudioGuidePlayerProps {
  title: string;
  narrationText: string;
  speakerLabel?: string;
}

export const AudioGuidePlayer: React.FC<AudioGuidePlayerProps> = ({
  title,
  narrationText,
  speakerLabel = 'Museum Curatorial Narration',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);

  // Stop speech when component unmounts
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handlePlay = () => {
    if (!('speechSynthesis' in window)) {
      alert('Audio narration speech is not supported in this browser.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      startProgressTracking();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(narrationText);
    utterance.rate = 0.95; // Steady museum cadence
    utterance.pitch = 1.0;

    // Pick an English voice if available
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find(
      (v) => (v.lang.includes('en-IN') || v.lang.includes('en-GB') || v.lang.includes('en-US'))
    );
    if (enVoice) utterance.voice = enVoice;

    utterance.onend = () => {
      setIsPlaying(false);
      setProgress(100);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setProgress(0);
    startProgressTracking();
  };

  const startProgressTracking = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const estDurationMs = (narrationText.split(' ').length / 2.2) * 1000;
    const start = Date.now();
    intervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / estDurationMs) * 100, 99);
      setProgress(pct);
    }, 250);
  };

  const handleRestart = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setProgress(0);
    setIsPlaying(false);
    setTimeout(() => handlePlay(), 100);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    // Web Speech doesn't support mute dynamically on running utterance, but we can pause/cancel
    if (!isMuted && isPlaying) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  return (
    <div className="bg-stone-900 text-stone-100 rounded-lg p-5 border border-stone-800 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[11px] uppercase tracking-widest text-amber-300/90 font-medium">
              {speakerLabel}
            </span>
          </div>
          <h4 className="text-base font-serif-display font-medium text-stone-100">{title}</h4>
        </div>

        {/* Audio Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRestart}
            title="Restart Narration"
            className="p-2 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-full transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handlePlay}
            className="flex items-center gap-2 px-4 py-2 bg-amber-700 hover:bg-amber-600 text-stone-100 rounded-full text-xs font-semibold tracking-wide transition-colors shadow-sm"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause Guide</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Play Audio Guide</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleToggleMute}
            title={isMuted ? 'Unmute' : 'Mute'}
            className="p-2 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-full transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => setShowTranscript(!showTranscript)}
            title="Toggle Transcript"
            className={`p-2 rounded-full transition-colors ${
              showTranscript ? 'text-amber-400 bg-stone-800' : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800'
            }`}
          >
            <FileText className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Track */}
      <div className="pt-3">
        <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-amber-600 h-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-stone-400 mt-1.5 font-mono">
          <span>{isPlaying ? 'Narration in progress' : 'Ready'}</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Transcript Accordion */}
      {showTranscript && (
        <div className="mt-4 pt-4 border-t border-stone-800 text-xs text-stone-300 leading-relaxed font-serif bg-stone-950/40 p-3 rounded border border-stone-800/80">
          <span className="block text-[10px] text-stone-400 uppercase tracking-wider font-sans mb-1 font-semibold">
            Spoken Transcript
          </span>
          {narrationText}
        </div>
      )}
    </div>
  );
};
