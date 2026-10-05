/**
 * Mumbai HeritageVault - Secure Admin Dashboard
 * Analytics charts with Recharts, Catalog management (Heritage, Museums, Artifacts), and User controls
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Landmark,
  Compass,
  Sparkles,
  Users,
  Award,
  Bookmark,
  Plus,
  Edit2,
  Trash2,
  X,
  Check,
  BarChart3,
  Search,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  adminApi,
  heritageApi,
  museumsApi,
  artifactsApi,
  quizApi,
} from '../services/api';
import {
  HeritageSite,
  Museum,
  Artifact,
  User,
  DashboardStats,
} from '../types';

interface AdminDashboardPageProps {
  currentUser: User | null;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ currentUser }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'analytics' | 'sites' | 'museums' | 'artifacts' | 'users'>('analytics');
  const [stats, setStats] = useState<DashboardStats | null>(null);

  // Data states
  const [sites, setSites] = useState<HeritageSite[]>([]);
  const [museums, setMuseums] = useState<Museum[]>([]);
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Modal states for Site CRUD
  const [editingSite, setEditingSite] = useState<Partial<HeritageSite> | null>(null);
  const [isSiteModalOpen, setIsSiteModalOpen] = useState(false);

  // Modal states for Museum CRUD
  const [editingMuseum, setEditingMuseum] = useState<Partial<Museum> | null>(null);
  const [isMuseumModalOpen, setIsMuseumModalOpen] = useState(false);

  // Search filter
  const [adminSearch, setAdminSearch] = useState('');

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setStats(adminApi.getDashboardStats());
    setSites(heritageApi.getAll());
    setMuseums(museumsApi.getAll());
    setArtifacts(artifactsApi.getAll());
    setUsers(adminApi.getUsers());
  };

  // If not admin, show guard warning
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <ShieldCheck className="w-12 h-12 text-rose-700 mx-auto" />
        <h2 className="font-serif-display text-2xl font-bold text-stone-900">
          Admin Authorization Required
        </h2>
        <p className="text-xs text-stone-600 font-serif leading-relaxed">
          The Curatorial Dashboard is restricted to museum administrators. Please sign in using the administrator credentials.
        </p>
        <div className="p-3 bg-stone-100 rounded text-xs text-stone-700 font-mono">
          admin@heritagevault.demo / Admin@123
        </div>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="px-5 py-2.5 bg-stone-900 text-stone-100 rounded text-xs font-semibold hover:bg-stone-800 transition-colors"
        >
          Sign In as Admin
        </button>
      </div>
    );
  }

  // Handle Site Save
  const handleSaveSite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSite?.name) return;

    if (editingSite.id) {
      heritageApi.update(editingSite.id, editingSite);
    } else {
      heritageApi.create({
        name: editingSite.name,
        slug: (editingSite.name || 'new-site').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: editingSite.category || 'Monument',
        description: editingSite.description || '',
        historicalPeriod: editingSite.historicalPeriod || '19th Century',
        year: editingSite.year || '1880',
        location: editingSite.location || 'Mumbai, Maharashtra',
        latitude: editingSite.latitude || 18.93,
        longitude: editingSite.longitude || 72.83,
        architecturalStyle: editingSite.architecturalStyle || 'Colonial Architecture',
        significance: editingSite.significance || 'Grade-I historic monument.',
        unescoStatus: editingSite.unescoStatus || 'None',
        image: editingSite.image || '/src/assets/images/mumbai_heritage_hero_1791209085207.jpg',
      });
    }

    setIsSiteModalOpen(false);
    setEditingSite(null);
    refreshData();
  };

  const handleDeleteSite = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove "${name}" from the digital catalog?`)) {
      heritageApi.delete(id);
      refreshData();
    }
  };

  // Handle Museum Save
  const handleSaveMuseum = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMuseum?.name) return;

    if (editingMuseum.id) {
      museumsApi.update(editingMuseum.id, editingMuseum);
    } else {
      museumsApi.create({
        name: editingMuseum.name,
        description: editingMuseum.description || '',
        location: editingMuseum.location || 'Mumbai, Maharashtra',
        museumType: editingMuseum.museumType || 'Art & History',
        latitude: editingMuseum.latitude || 18.92,
        longitude: editingMuseum.longitude || 72.83,
        image: editingMuseum.image || '/src/assets/images/csmvs_museum_gallery_1791209142918.jpg',
        collectionCount: editingMuseum.collectionCount || 1000,
        openingInfoPlaceholder: editingMuseum.openingInfoPlaceholder || '10:00 AM to 5:00 PM',
      });
    }

    setIsMuseumModalOpen(false);
    setEditingMuseum(null);
    refreshData();
  };

  const handleDeleteMuseum = (id: string, name: string) => {
    if (confirm(`Delete museum record for "${name}"?`)) {
      museumsApi.delete(id);
      refreshData();
    }
  };

  const handleToggleUser = (userId: string) => {
    adminApi.toggleUserStatus(userId);
    refreshData();
  };

  // Chart color palette
  const COLORS = ['#78350f', '#0284c7', '#4d7c0f', '#7c3aed', '#dc2626', '#d97706', '#0f766e'];

  const filteredSites = sites.filter((s) =>
    s.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
    s.category.toLowerCase().includes(adminSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Top Banner */}
      <div className="border-b border-stone-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-amber-950 text-amber-300 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
              Curatorial Administration Dashboard
            </h1>
            <p className="text-xs text-stone-500 font-mono">
              Signed in as: <strong>{currentUser.name}</strong> ({currentUser.email})
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg border border-stone-200 shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'analytics' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Analytics & Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sites')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'sites' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Heritage Sites ({sites.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('museums')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'museums' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Museums ({museums.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'users' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Users ({users.length})
          </button>
        </div>
      </div>

      {/* TAB 1: ANALYTICS OVERVIEW */}
      {activeTab === 'analytics' && stats && (
        <div className="space-y-8">
          {/* Key Metric Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
              <span className="text-[11px] font-semibold text-stone-700 uppercase tracking-wider block">
                Heritage Sites
              </span>
              <span className="text-3xl font-bold font-serif-display text-amber-900 tabular-nums">
                {stats.totalHeritageSites}
              </span>
            </div>

            <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
              <span className="text-[11px] font-semibold text-stone-700 uppercase tracking-wider block">
                Museums
              </span>
              <span className="text-3xl font-bold font-serif-display text-amber-900 tabular-nums">
                {stats.totalMuseums}
              </span>
            </div>

            <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
              <span className="text-[11px] font-semibold text-stone-700 uppercase tracking-wider block">
                Artifacts
              </span>
              <span className="text-3xl font-bold font-serif-display text-amber-900 tabular-nums">
                {stats.totalArtifacts}
              </span>
            </div>

            <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
              <span className="text-[11px] font-semibold text-stone-700 uppercase tracking-wider block">
                Personalities
              </span>
              <span className="text-3xl font-bold font-serif-display text-amber-900 tabular-nums">
                {stats.totalPersonalities}
              </span>
            </div>

            <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
              <span className="text-[11px] font-semibold text-stone-700 uppercase tracking-wider block">
                Quiz Questions
              </span>
              <span className="text-3xl font-bold font-serif-display text-amber-900 tabular-nums">
                {stats.totalQuizQuestions}
              </span>
            </div>

            <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
              <span className="text-[11px] font-semibold text-stone-700 uppercase tracking-wider block">
                Registered Users
              </span>
              <span className="text-3xl font-bold font-serif-display text-amber-900 tabular-nums">
                {stats.totalUsers}
              </span>
            </div>
          </div>

          {/* Recharts Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart 1: Popular Locations Views vs Favorites */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="font-serif-display text-base font-bold text-stone-900 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-amber-800" />
                  <span>Most Viewed Heritage Sites & Monuments</span>
                </h3>
                <span className="text-xs text-stone-700 font-mono">Digital Traffic</span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.popularSites} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1c1917', color: '#fff', borderRadius: '4px', fontSize: '11px' }}
                    />
                    <Bar dataKey="views" fill="#78350f" radius={[4, 4, 0, 0]} name="Page Views" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Category Breakdown */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="font-serif-display text-base font-bold text-stone-900 flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-amber-800" />
                  <span>Collection Distribution by Classification</span>
                </h3>
                <span className="text-xs text-stone-700 font-mono">Proportions</span>
              </div>

              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.categoryBreakdown}
                      dataKey="count"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }: { name?: string; percent?: number }) =>
                        `${name || ''} (${((percent || 0) * 100).toFixed(0)}%)`
                      }
                    >
                      {stats.categoryBreakdown.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1c1917', color: '#fff', borderRadius: '4px', fontSize: '11px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HERITAGE SITES CRUD */}
      {activeTab === 'sites' && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <h2 className="font-serif-display text-xl font-bold text-stone-900">
                Heritage Sites Catalog Management
              </h2>
              <p className="text-xs text-stone-500">Add, edit, or curate monument records in the digital archive.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  placeholder="Filter records..."
                  className="pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-md text-stone-800 focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingSite({
                    category: 'Monument',
                    historicalPeriod: '19th Century',
                    unescoStatus: 'None',
                    latitude: 18.93,
                    longitude: 72.83,
                    accessType: 'Free',
                  });
                  setIsSiteModalOpen(true);
                }}
                className="px-3.5 py-1.5 bg-amber-800 hover:bg-amber-700 text-stone-100 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Heritage Site</span>
              </button>
            </div>
          </div>

          {/* Sites Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 uppercase font-semibold text-[10px] tracking-wider border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4">Monument</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Epoch / Year</th>
                  <th className="py-3 px-4">UNESCO</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredSites.map((site) => (
                  <tr key={site.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        src={site.image}
                        alt={site.name}
                        className="w-9 h-9 object-cover rounded bg-stone-200 shrink-0"
                      />
                      <div>
                        <strong className="text-stone-900 block font-semibold text-sm">{site.name}</strong>
                        <span className="text-stone-400 text-[11px] truncate max-w-xs block">{site.location}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-stone-700">{site.category}</td>
                    <td className="py-3 px-4 text-stone-700 font-mono">{site.year}</td>
                    <td className="py-3 px-4">
                      {site.unescoStatus === 'UNESCO World Heritage Site' ? (
                        <span className="text-amber-900 font-semibold">UNESCO Site</span>
                      ) : (
                        <span className="text-stone-400">None</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingSite(site);
                          setIsSiteModalOpen(true);
                        }}
                        className="p-1 text-stone-600 hover:text-amber-900 transition-colors"
                        title="Edit Record"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSite(site.id, site.name)}
                        className="p-1 text-stone-400 hover:text-rose-700 transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: MUSEUMS CRUD */}
      {activeTab === 'museums' && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <h2 className="font-serif-display text-xl font-bold text-stone-900">
                Museum Directory Management
              </h2>
              <p className="text-xs text-stone-500">Manage museum profile cards and collection counts.</p>
            </div>

            <button
              type="button"
              onClick={() => {
                setEditingMuseum({
                  museumType: 'Art, History & Archaeology',
                  collectionCount: 10000,
                  latitude: 18.93,
                  longitude: 72.83,
                });
                setIsMuseumModalOpen(true);
              }}
              className="px-3.5 py-1.5 bg-amber-800 hover:bg-amber-700 text-stone-100 rounded text-xs font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Museum</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {museums.map((m) => (
              <div key={m.id} className="p-4 rounded-lg border border-stone-200 flex gap-4 items-start">
                <img src={m.image} alt={m.name} className="w-20 h-20 object-cover rounded bg-stone-100 shrink-0" />
                <div className="space-y-1 flex-1">
                  <h4 className="font-serif-display text-sm font-bold text-stone-900">{m.name}</h4>
                  <div className="text-[11px] text-stone-500">{m.museumType} · {m.location}</div>
                  <p className="text-xs text-stone-600 line-clamp-2">{m.description}</p>
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingMuseum(m);
                        setIsMuseumModalOpen(true);
                      }}
                      className="text-xs text-amber-900 font-semibold hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteMuseum(m.id, m.name)}
                      className="text-xs text-rose-700 font-semibold hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: USERS MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-6 space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <h2 className="font-serif-display text-xl font-bold text-stone-900">
              User Accounts & Role Permissions
            </h2>
            <p className="text-xs text-stone-500">Monitor registered scholars, researchers, and administrators.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 uppercase font-semibold text-[10px] tracking-wider border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Registration</th>
                  <th className="py-3 px-4 text-right">Toggle Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {users.map((u) => (
                  <tr key={u.id}>
                    <td className="py-3 px-4">
                      <strong className="text-stone-900 text-sm block">{u.name}</strong>
                      <span className="text-stone-400 font-mono text-[11px]">{u.email}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold font-mono ${
                        u.role === 'admin' ? 'bg-amber-100 text-amber-900' : 'bg-stone-100 text-stone-700'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {u.isActive !== false ? (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>Active</span>
                        </span>
                      ) : (
                        <span className="text-rose-700 font-semibold">Deactivated</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-stone-500">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '2026-01-15'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {u.id !== currentUser.id && (
                        <button
                          type="button"
                          onClick={() => handleToggleUser(u.id)}
                          className="px-2.5 py-1 text-xs border border-stone-300 rounded hover:bg-stone-100 transition-colors"
                        >
                          {u.isActive !== false ? 'Deactivate' : 'Reactivate'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: SITE EDIT/CREATE */}
      {isSiteModalOpen && editingSite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-stone-300 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
              <h3 className="font-serif-display text-lg font-bold text-stone-900">
                {editingSite.id ? 'Edit Heritage Site' : 'Add New Heritage Site'}
              </h3>
              <button
                type="button"
                onClick={() => setIsSiteModalOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSite} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">Monument Name *</label>
                <input
                  type="text"
                  required
                  value={editingSite.name || ''}
                  onChange={(e) => setEditingSite({ ...editingSite, name: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-200 rounded text-stone-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 uppercase mb-1">Category</label>
                  <select
                    value={editingSite.category || 'Monument'}
                    onChange={(e) => setEditingSite({ ...editingSite, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-stone-200 rounded text-stone-900 focus:outline-none"
                  >
                    <option value="Monument">Monument</option>
                    <option value="Museum">Museum</option>
                    <option value="Fort">Fort</option>
                    <option value="Cave">Cave</option>
                    <option value="Heritage Building">Heritage Building</option>
                    <option value="Market">Market</option>
                    <option value="Railway Heritage">Railway Heritage</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 uppercase mb-1">Year / Period</label>
                  <input
                    type="text"
                    value={editingSite.year || ''}
                    onChange={(e) => setEditingSite({ ...editingSite, year: e.target.value })}
                    placeholder="e.g. 1878–1887"
                    className="w-full px-3 py-2 border border-stone-200 rounded text-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 uppercase mb-1">Historical Period</label>
                  <select
                    value={editingSite.historicalPeriod || '19th Century'}
                    onChange={(e) => setEditingSite({ ...editingSite, historicalPeriod: e.target.value as any })}
                    className="w-full px-3 py-2 border border-stone-200 rounded text-stone-900 focus:outline-none"
                  >
                    <option value="Ancient & Early History">Ancient & Early History</option>
                    <option value="Medieval Period">Medieval Period</option>
                    <option value="Portuguese Period">Portuguese Period</option>
                    <option value="British/Bombay Period">British/Bombay Period</option>
                    <option value="19th Century">19th Century</option>
                    <option value="Early 20th Century">Early 20th Century</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 uppercase mb-1">UNESCO Status</label>
                  <select
                    value={editingSite.unescoStatus || 'None'}
                    onChange={(e) => setEditingSite({ ...editingSite, unescoStatus: e.target.value as any })}
                    className="w-full px-3 py-2 border border-stone-200 rounded text-stone-900 focus:outline-none"
                  >
                    <option value="None">None</option>
                    <option value="UNESCO World Heritage Site">UNESCO World Heritage Site</option>
                    <option value="Tentative List">Tentative List</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">Location Address</label>
                <input
                  type="text"
                  value={editingSite.location || ''}
                  onChange={(e) => setEditingSite({ ...editingSite, location: e.target.value })}
                  placeholder="e.g. Fort, Mumbai, 400001"
                  className="w-full px-3 py-2 border border-stone-200 rounded text-stone-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 uppercase mb-1">Latitude</label>
                  <input
                    type="number"
                    step="0.000001"
                    value={editingSite.latitude || 18.93}
                    onChange={(e) => setEditingSite({ ...editingSite, latitude: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-200 rounded text-stone-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 uppercase mb-1">Longitude</label>
                  <input
                    type="number"
                    step="0.000001"
                    value={editingSite.longitude || 72.83}
                    onChange={(e) => setEditingSite({ ...editingSite, longitude: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-200 rounded text-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">Architectural Style</label>
                <input
                  type="text"
                  value={editingSite.architecturalStyle || ''}
                  onChange={(e) => setEditingSite({ ...editingSite, architecturalStyle: e.target.value })}
                  placeholder="e.g. Victorian Gothic Revival"
                  className="w-full px-3 py-2 border border-stone-200 rounded text-stone-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">Architect / Master Builder</label>
                <input
                  type="text"
                  value={editingSite.architect || ''}
                  onChange={(e) => setEditingSite({ ...editingSite, architect: e.target.value })}
                  placeholder="e.g. Frederick William Stevens"
                  className="w-full px-3 py-2 border border-stone-200 rounded text-stone-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">Curatorial Description</label>
                <textarea
                  rows={3}
                  value={editingSite.description || ''}
                  onChange={(e) => setEditingSite({ ...editingSite, description: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-200 rounded text-stone-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">Why This Place Matters</label>
                <textarea
                  rows={2}
                  value={editingSite.whyItMatters || ''}
                  onChange={(e) => setEditingSite({ ...editingSite, whyItMatters: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-200 rounded text-stone-900 focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSiteModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded text-stone-700 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-800 text-stone-100 rounded font-semibold hover:bg-amber-700"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: MUSEUM EDIT/CREATE */}
      {isMuseumModalOpen && editingMuseum && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-stone-300 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
              <h3 className="font-serif-display text-lg font-bold text-stone-900">
                {editingMuseum.id ? 'Edit Museum' : 'Add New Museum'}
              </h3>
              <button
                type="button"
                onClick={() => setIsMuseumModalOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMuseum} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">Museum Name *</label>
                <input
                  type="text"
                  required
                  value={editingMuseum.name || ''}
                  onChange={(e) => setEditingMuseum({ ...editingMuseum, name: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-200 rounded text-stone-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">Museum Classification</label>
                <input
                  type="text"
                  value={editingMuseum.museumType || ''}
                  onChange={(e) => setEditingMuseum({ ...editingMuseum, museumType: e.target.value })}
                  placeholder="e.g. Art, Archaeology & History"
                  className="w-full px-3 py-2 border border-stone-200 rounded text-stone-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">Address Location</label>
                <input
                  type="text"
                  value={editingMuseum.location || ''}
                  onChange={(e) => setEditingMuseum({ ...editingMuseum, location: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-200 rounded text-stone-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">Curatorial Summary</label>
                <textarea
                  rows={3}
                  value={editingMuseum.description || ''}
                  onChange={(e) => setEditingMuseum({ ...editingMuseum, description: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-200 rounded text-stone-900 focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsMuseumModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded text-stone-700 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-800 text-stone-100 rounded font-semibold hover:bg-amber-700"
                >
                  Save Museum
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
