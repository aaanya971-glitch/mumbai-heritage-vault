/**
 * Mumbai HeritageVault - Top Navigation Bar
 * Conforms to the strict 3-zone Top Bar Contract:
 * [Brand Zone (single text element wordmark)] — [4-6 Nav Links + Dropdown] — [1-2 Actions]
 */

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Landmark,
  Search,
  Bookmark,
  User as UserIcon,
  Menu,
  X,
  ShieldCheck,
  LogOut,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { authApi, favoritesApi } from '../../services/api';
import { User } from '../../types';

interface NavbarProps {
  onOpenSearch: () => void;
  currentUser: User | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, currentUser, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exploreDropdownOpen, setExploreDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const favoritesCount = currentUser ? favoritesApi.getByUserId(currentUser.id).length : 0;

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* ZONE 1: BRAND ZONE (Single-line wordmark with emblem) */}
          <Link
            to="/"
            className="flex items-center gap-3 text-stone-900 hover:text-amber-900 transition-colors group shrink-0"
          >
            <div className="w-10 h-10 rounded-sm bg-stone-900 text-stone-100 flex items-center justify-center border border-stone-800 shadow-sm group-hover:bg-amber-950 transition-colors">
              <Landmark className="w-5 h-5 text-amber-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-emblem text-lg sm:text-xl font-bold tracking-wider text-stone-900 leading-none">
                MUMBAI HERITAGEVAULT
              </span>
              <span className="text-[10px] tracking-widest text-stone-700 uppercase font-medium mt-1">
                Digital Museum & Archive
              </span>
            </div>
          </Link>

          {/* ZONE 2: PRIMARY NAVIGATION LINKS */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
            <Link
              to="/"
              className={`transition-colors hover:text-stone-950 ${
                isActive('/') ? 'text-stone-950 font-semibold border-b-2 border-amber-800 pb-0.5' : ''
              }`}
            >
              Home
            </Link>

            {/* Explore Dropdown */}
            <div className="relative" onMouseLeave={() => setExploreDropdownOpen(false)}>
              <button
                type="button"
                onClick={() => setExploreDropdownOpen(!exploreDropdownOpen)}
                onMouseEnter={() => setExploreDropdownOpen(true)}
                className={`flex items-center gap-1 transition-colors hover:text-stone-950 py-1 ${
                  location.pathname.startsWith('/heritage') ||
                  location.pathname === '/museums' ||
                  location.pathname === '/monuments' ||
                  location.pathname === '/forts-caves'
                    ? 'text-stone-950 font-semibold'
                    : ''
                }`}
              >
                <span>Collections</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {exploreDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-stone-50 rounded-md shadow-lg border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-1">
                  <Link
                    to="/heritage"
                    onClick={() => setExploreDropdownOpen(false)}
                    className="block px-4 py-2 text-xs font-medium text-stone-800 hover:bg-stone-100 hover:text-amber-900"
                  >
                    All Heritage Sites
                  </Link>
                  <Link
                    to="/museums"
                    onClick={() => setExploreDropdownOpen(false)}
                    className="block px-4 py-2 text-xs font-medium text-stone-800 hover:bg-stone-100 hover:text-amber-900"
                  >
                    Museums of Mumbai
                  </Link>
                  <Link
                    to="/monuments"
                    onClick={() => setExploreDropdownOpen(false)}
                    className="block px-4 py-2 text-xs font-medium text-stone-800 hover:bg-stone-100 hover:text-amber-900"
                  >
                    Monuments & Architecture
                  </Link>
                  <Link
                    to="/forts-caves"
                    onClick={() => setExploreDropdownOpen(false)}
                    className="block px-4 py-2 text-xs font-medium text-stone-800 hover:bg-stone-100 hover:text-amber-900"
                  >
                    Forts & Ancient Caves
                  </Link>
                  <Link
                    to="/artifacts"
                    onClick={() => setExploreDropdownOpen(false)}
                    className="block px-4 py-2 text-xs font-medium text-stone-800 hover:bg-stone-100 hover:text-amber-900"
                  >
                    Artifact Gallery
                  </Link>
                  <Link
                    to="/personalities"
                    onClick={() => setExploreDropdownOpen(false)}
                    className="block px-4 py-2 text-xs font-medium text-stone-800 hover:bg-stone-100 hover:text-amber-900"
                  >
                    Historical Personalities
                  </Link>
                  <Link
                    to="/culture"
                    onClick={() => setExploreDropdownOpen(false)}
                    className="block px-4 py-2 text-xs font-medium text-stone-800 hover:bg-stone-100 hover:text-amber-900"
                  >
                    Cultural Traditions & Kolis
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/timeline"
              className={`transition-colors hover:text-stone-950 ${
                isActive('/timeline') ? 'text-stone-950 font-semibold border-b-2 border-amber-800 pb-0.5' : ''
              }`}
            >
              Timeline
            </Link>

            <Link
              to="/map"
              className={`transition-colors hover:text-stone-950 ${
                isActive('/map') ? 'text-stone-950 font-semibold border-b-2 border-amber-800 pb-0.5' : ''
              }`}
            >
              Heritage Map
            </Link>

            <Link
              to="/virtual-museum"
              className={`transition-colors hover:text-stone-950 ${
                isActive('/virtual-museum') ? 'text-stone-950 font-semibold border-b-2 border-amber-800 pb-0.5' : ''
              }`}
            >
              Virtual Museum
            </Link>

            <Link
              to="/tour-planner"
              className={`transition-colors hover:text-stone-950 ${
                isActive('/tour-planner') ? 'text-stone-950 font-semibold border-b-2 border-amber-800 pb-0.5' : ''
              }`}
            >
              Tour Planner
            </Link>

            <Link
              to="/quiz"
              className={`transition-colors hover:text-stone-950 ${
                isActive('/quiz') ? 'text-stone-950 font-semibold border-b-2 border-amber-800 pb-0.5' : ''
              }`}
            >
              Quiz
            </Link>

            <Link
              to="/ai-guide"
              className={`flex items-center gap-1.5 transition-colors hover:text-amber-900 ${
                isActive('/ai-guide') ? 'text-amber-900 font-semibold border-b-2 border-amber-800 pb-0.5' : 'text-amber-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Mitra AI</span>
            </Link>
          </nav>

          {/* ZONE 3: ACTIONS & AUTHENTICATION */}
          <div className="flex items-center gap-3">
            {/* Search Trigger Button */}
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search Heritage Archive"
              className="p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 rounded-md transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            {currentUser ? (
              <div className="flex items-center gap-2">
                {/* Favorites Link */}
                <Link
                  to="/favorites"
                  aria-label="View My Saved Collection"
                  className="relative p-2 text-stone-700 hover:text-amber-900 hover:bg-stone-200/60 rounded-md transition-colors"
                >
                  <Bookmark className="w-4 h-4" />
                  {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-800 text-stone-100 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {favoritesCount}
                    </span>
                  )}
                </Link>

                {/* Admin Link if role=admin */}
                {currentUser.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-950 bg-amber-100/90 hover:bg-amber-200/80 rounded-md transition-colors border border-amber-300"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-800" />
                    <span>Admin</span>
                  </Link>
                )}

                {/* Profile Link */}
                <Link
                  to="/profile"
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 text-xs font-medium text-stone-800 hover:bg-stone-200/60 rounded-md transition-colors border border-stone-300"
                >
                  <UserIcon className="w-3.5 h-3.5 text-stone-600" />
                  <span className="hidden sm:inline truncate max-w-[100px]">{currentUser.name.split(' ')[0]}</span>
                </Link>

                <button
                  type="button"
                  onClick={onLogout}
                  title="Logout"
                  className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded-md transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-950 hover:bg-stone-200/60 rounded-md transition-colors whitespace-nowrap"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-xs font-medium text-stone-100 bg-stone-900 hover:bg-stone-800 rounded-md transition-colors whitespace-nowrap shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 text-stone-700 hover:text-stone-900 rounded-md"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU ACCORDION */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#FBF9F5] px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-stone-800 rounded-md hover:bg-stone-200/50"
          >
            Home
          </Link>
          <Link
            to="/heritage"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-stone-800 rounded-md hover:bg-stone-200/50"
          >
            Explore Heritage Sites
          </Link>
          <Link
            to="/museums"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-stone-800 rounded-md hover:bg-stone-200/50"
          >
            Museums
          </Link>
          <Link
            to="/monuments"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-stone-800 rounded-md hover:bg-stone-200/50"
          >
            Monuments & Architecture
          </Link>
          <Link
            to="/forts-caves"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-stone-800 rounded-md hover:bg-stone-200/50"
          >
            Forts & Ancient Caves
          </Link>
          <Link
            to="/timeline"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-stone-800 rounded-md hover:bg-stone-200/50"
          >
            Historical Timeline
          </Link>
          <Link
            to="/map"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-stone-800 rounded-md hover:bg-stone-200/50"
          >
            Heritage Map
          </Link>
          <Link
            to="/virtual-museum"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-stone-800 rounded-md hover:bg-stone-200/50"
          >
            Virtual Museum
          </Link>
          <Link
            to="/artifacts"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-stone-800 rounded-md hover:bg-stone-200/50"
          >
            Artifact Gallery
          </Link>
          <Link
            to="/personalities"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-stone-800 rounded-md hover:bg-stone-200/50"
          >
            Historical Personalities
          </Link>
          <Link
            to="/culture"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-stone-800 rounded-md hover:bg-stone-200/50"
          >
            Cultural Heritage & Kolis
          </Link>
          <Link
            to="/tour-planner"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-stone-800 rounded-md hover:bg-stone-200/50"
          >
            Heritage Tour Planner
          </Link>
          <Link
            to="/quiz"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-stone-800 rounded-md hover:bg-stone-200/50"
          >
            Educational Quiz
          </Link>
          <Link
            to="/ai-guide"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-amber-900 rounded-md hover:bg-amber-100/50"
          >
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>Mitra – AI Heritage Guide</span>
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-stone-600 rounded-md hover:bg-stone-200/50"
          >
            About & Mission
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-stone-600 rounded-md hover:bg-stone-200/50"
          >
            Contact & Archival Queries
          </Link>

          {currentUser?.role === 'admin' && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-amber-950 bg-amber-100 rounded-md"
            >
              Admin Dashboard
            </Link>
          )}
        </div>
      )}
    </header>
  );
};
