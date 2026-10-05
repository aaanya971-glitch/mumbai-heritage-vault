/**
 * Mumbai HeritageVault - Digital Historical & Cultural Heritage Museum
 * Main Application Component & Routing
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ExploreHeritagePage } from './pages/ExploreHeritagePage';
import { HeritageDetailPage } from './pages/HeritageDetailPage';
import { MuseumsPage } from './pages/MuseumsPage';
import { MonumentsPage } from './pages/MonumentsPage';
import { FortsAndCavesPage } from './pages/FortsAndCavesPage';
import { TimelinePage } from './pages/TimelinePage';
import { HeritageMapPage } from './pages/HeritageMapPage';
import { VirtualMuseumPage } from './pages/VirtualMuseumPage';
import { ArtifactGalleryPage } from './pages/ArtifactGalleryPage';
import { PersonalitiesPage } from './pages/PersonalitiesPage';
import { CulturalHeritagePage } from './pages/CulturalHeritagePage';
import { TourPlannerPage } from './pages/TourPlannerPage';
import { QuizPage } from './pages/QuizPage';
import { AIGuidePage } from './pages/AIGuidePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { authApi } from './services/api';
import { User } from './types';

// ScrollToTop on route transition
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => authApi.getCurrentUser());
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleLogout = () => {
    authApi.logout();
    setCurrentUser(null);
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-stone-900 selection:bg-amber-800 selection:text-amber-50">
        <Navbar
          onOpenSearch={() => setIsSearchOpen(true)}
          currentUser={currentUser}
          onLogout={handleLogout}
        />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage currentUser={currentUser} />} />
            <Route path="/heritage" element={<ExploreHeritagePage currentUser={currentUser} />} />
            <Route path="/heritage/:slug" element={<HeritageDetailPage currentUser={currentUser} />} />
            <Route path="/museums" element={<MuseumsPage />} />
            <Route path="/monuments" element={<MonumentsPage />} />
            <Route path="/forts-caves" element={<FortsAndCavesPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/map" element={<HeritageMapPage currentUser={currentUser} />} />
            <Route path="/virtual-museum" element={<VirtualMuseumPage />} />
            <Route path="/artifacts" element={<ArtifactGalleryPage currentUser={currentUser} />} />
            <Route path="/personalities" element={<PersonalitiesPage />} />
            <Route path="/culture" element={<CulturalHeritagePage />} />
            <Route path="/tour-planner" element={<TourPlannerPage />} />
            <Route path="/quiz" element={<QuizPage currentUser={currentUser} />} />
            <Route path="/ai-guide" element={<AIGuidePage />} />
            <Route path="/favorites" element={<FavoritesPage currentUser={currentUser} />} />
            <Route path="/profile" element={<ProfilePage currentUser={currentUser} onLogout={handleLogout} />} />
            <Route path="/admin" element={<AdminDashboardPage currentUser={currentUser} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={<RegisterPage onRegisterSuccess={handleLoginSuccess} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />

        <GlobalSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      </div>
    </BrowserRouter>
  );
}
