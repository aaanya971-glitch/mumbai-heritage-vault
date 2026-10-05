/**
 * Mumbai HeritageVault - User Profile Page
 * Profile metrics, earned badges, quiz score records, and saved collections
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Award, Bookmark, Clock, Trophy, Shield, ArrowRight, LogOut } from 'lucide-react';
import { favoritesApi, quizApi } from '../services/api';
import { User as UserType } from '../types';

interface ProfilePageProps {
  currentUser: UserType | null;
  onLogout: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <User className="w-12 h-12 text-stone-300 mx-auto" />
        <h2 className="font-serif-display text-2xl font-bold text-stone-900">
          User Profile
        </h2>
        <p className="text-sm text-stone-600">Please sign in to view your profile and achievements.</p>
        <Link
          to="/login"
          className="inline-block px-5 py-2.5 bg-stone-900 text-stone-100 rounded text-xs font-semibold hover:bg-stone-800 transition-colors"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const favorites = favoritesApi.getByUserId(currentUser.id);
  const quizResults = quizApi.getUserResults(currentUser.id);

  // Badges calculation
  const badges = [
    { title: 'Heritage Scholar', description: 'Registered member of Mumbai HeritageVault', unlocked: true },
    {
      title: 'Heritage Explorer',
      description: 'Saved 2 or more sites to your collection',
      unlocked: favorites.length >= 2,
    },
    {
      title: 'Mumbai Historian',
      description: 'Achieved 70%+ score in the educational quiz',
      unlocked: quizResults.some((q) => q.score / q.totalQuestions >= 0.7),
    },
    {
      title: 'Heritage Master',
      description: 'Scored 90%+ in the comprehensive Mumbai history evaluation',
      unlocked: quizResults.some((q) => q.score / q.totalQuestions >= 0.9),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Profile Header Box */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-24 h-24 rounded-full bg-stone-200 border-2 border-stone-300 overflow-hidden shrink-0 flex items-center justify-center">
          {currentUser.profileImage ? (
            <img
              src={currentUser.profileImage}
              alt={currentUser.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-10 h-10 text-stone-500" />
          )}
        </div>

        <div className="space-y-2 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
              {currentUser.name}
            </h1>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-bold bg-amber-100 text-amber-900 border border-amber-200">
              {currentUser.role}
            </span>
          </div>

          <p className="text-xs text-stone-500 font-mono">{currentUser.email}</p>
          <p className="text-xs text-stone-600 font-serif max-w-lg leading-relaxed pt-1">
            {currentUser.bio || 'Curator and researcher passionate about the preservation of Mumbai heritage.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-stone-500">
            <span>Member since {currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : '2026'}</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-stone-800 tabular-nums">{favorites.length} Saved Records</span>
          </div>
        </div>

        <div className="shrink-0 flex flex-col gap-2">
          {currentUser.role === 'admin' && (
            <Link
              to="/admin"
              className="px-4 py-2 bg-amber-800 hover:bg-amber-700 text-stone-100 rounded text-xs font-semibold text-center transition-colors shadow-xs"
            >
              Open Admin Dashboard
            </Link>
          )}

          <button
            type="button"
            onClick={onLogout}
            className="px-4 py-2 border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Badges Earned Section */}
      <section className="space-y-4">
        <h2 className="font-serif-display text-xl font-bold text-stone-900 border-b border-stone-200 pb-2 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-800" />
          <span>Earned Heritage Badges</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((b, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border transition-all ${
                b.unlocked
                  ? 'bg-white border-amber-200 shadow-xs'
                  : 'bg-stone-50 border-stone-200 opacity-60'
              }`}
            >
              <div className="w-8 h-8 rounded-full mb-3 flex items-center justify-center bg-amber-100 text-amber-900">
                <Award className="w-4 h-4" />
              </div>
              <h4 className="font-serif-display text-sm font-bold text-stone-900">
                {b.title}
              </h4>
              <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                {b.description}
              </p>
              <span className="inline-block mt-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-900">
                {b.unlocked ? 'Unlocked' : 'In Progress'}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz History */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-2">
          <h2 className="font-serif-display text-xl font-bold text-stone-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-800" />
            <span>Recent Quiz Assessments</span>
          </h2>
          <Link to="/quiz" className="text-xs font-semibold text-amber-900 hover:underline">
            Take Another Quiz →
          </Link>
        </div>

        {quizResults.length > 0 ? (
          <div className="bg-white rounded-lg border border-stone-200 divide-y divide-stone-100 shadow-xs">
            {quizResults.map((qr) => (
              <div key={qr.id} className="p-4 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-stone-900 font-semibold text-sm">{qr.category}</strong>
                  <div className="text-stone-400 text-[11px]">
                    Completed on {new Date(qr.completedAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="px-2.5 py-1 rounded bg-amber-100/70 text-amber-900 font-semibold text-[11px]">
                    {qr.badgeEarned}
                  </span>
                  <span className="font-mono text-base font-bold text-stone-900 tabular-nums">
                    {qr.score} / {qr.totalQuestions}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg border border-stone-200 text-center text-xs text-stone-500 space-y-2">
            <Trophy className="w-8 h-8 text-stone-300 mx-auto" />
            <p>You haven't completed any educational quizzes yet.</p>
            <Link to="/quiz" className="text-amber-900 font-semibold hover:underline inline-block">
              Challenge yourself with our 10-question quiz →
            </Link>
          </div>
        )}
      </section>

      {/* Saved Collection Quick Link */}
      <div className="bg-stone-100 p-6 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-serif-display text-lg font-bold text-stone-900">
            My Heritage Collection ({favorites.length} items)
          </h3>
          <p className="text-xs text-stone-600 font-serif">
            Access your bookmarked monuments, artifacts, and personalized walking tours.
          </p>
        </div>
        <Link
          to="/favorites"
          className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded text-xs font-semibold tracking-wide transition-colors whitespace-nowrap"
        >
          View Saved Collection
        </Link>
      </div>
    </div>
  );
};
