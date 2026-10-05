/**
 * Mumbai HeritageVault - Digital Historical & Cultural Heritage Museum
 * API Service Layer & Persistent Local Repository
 */

import {
  HeritageSite,
  Museum,
  Artifact,
  Personality,
  TimelineEvent,
  CulturalHeritage,
  VirtualExhibitRoom,
  QuizQuestion,
  QuizResult,
  User,
  FavoriteItem,
  TourPlan,
  AIChatMessage,
  DashboardStats,
} from '../types';
import {
  INITIAL_HERITAGE_SITES,
  INITIAL_MUSEUMS,
  INITIAL_ARTIFACTS,
  INITIAL_PERSONALITIES,
  INITIAL_TIMELINE_EVENTS,
  INITIAL_CULTURAL_HERITAGE,
  INITIAL_VIRTUAL_ROOMS,
  INITIAL_QUIZ_QUESTIONS,
  DEMO_USERS,
} from '../data/mockHeritageData';

const STORAGE_KEYS = {
  USER: 'mhv_auth_user',
  TOKEN: 'mhv_auth_token',
  HERITAGE: 'mhv_heritage_sites',
  MUSEUMS: 'mhv_museums',
  ARTIFACTS: 'mhv_artifacts',
  PERSONALITIES: 'mhv_personalities',
  FAVORITES: 'mhv_user_favorites',
  QUIZ_RESULTS: 'mhv_quiz_results',
  QUIZ_QUESTIONS: 'mhv_quiz_questions',
  USERS: 'mhv_registered_users',
};

// Local storage helper
function getStored<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

// Initialize default state
export function initStore() {
  if (!localStorage.getItem(STORAGE_KEYS.HERITAGE)) {
    setStored(STORAGE_KEYS.HERITAGE, INITIAL_HERITAGE_SITES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.MUSEUMS)) {
    setStored(STORAGE_KEYS.MUSEUMS, INITIAL_MUSEUMS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.ARTIFACTS)) {
    setStored(STORAGE_KEYS.ARTIFACTS, INITIAL_ARTIFACTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.PERSONALITIES)) {
    setStored(STORAGE_KEYS.PERSONALITIES, INITIAL_PERSONALITIES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.QUIZ_QUESTIONS)) {
    setStored(STORAGE_KEYS.QUIZ_QUESTIONS, INITIAL_QUIZ_QUESTIONS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    setStored(STORAGE_KEYS.USERS, DEMO_USERS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.FAVORITES)) {
    // Seed initial favorites for demo visitor
    const sampleFavs: FavoriteItem[] = [
      {
        id: 'fav_1',
        userId: 'usr_visitor_01',
        itemType: 'heritage',
        itemId: 'site_csmt',
        itemTitle: 'Chhatrapati Shivaji Maharaj Terminus (CSMT)',
        itemImage: INITIAL_HERITAGE_SITES[0].image,
        category: 'Railway Heritage',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'fav_2',
        userId: 'usr_visitor_01',
        itemType: 'museum',
        itemId: 'mus_csmvs',
        itemTitle: 'Chhatrapati Shivaji Maharaj Vastu Sangrahalaya (CSMVS)',
        itemImage: INITIAL_MUSEUMS[0].image,
        category: 'Art & Archaeology',
        createdAt: new Date().toISOString(),
      },
    ];
    setStored(STORAGE_KEYS.FAVORITES, sampleFavs);
  }
  if (!localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS)) {
    const initialResults: QuizResult[] = [
      {
        id: 'res_1',
        userId: 'usr_visitor_01',
        userName: 'Arjun Deshmukh',
        score: 9,
        totalQuestions: 10,
        category: 'Mumbai History',
        badgeEarned: 'Heritage Master',
        completedAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: 'res_2',
        userId: 'usr_anon',
        userName: 'Meera Rao',
        score: 8,
        totalQuestions: 10,
        category: 'Mumbai Architecture',
        badgeEarned: 'Mumbai Historian',
        completedAt: new Date(Date.now() - 172800000).toISOString(),
      },
    ];
    setStored(STORAGE_KEYS.QUIZ_RESULTS, initialResults);
  }
}

// Execute store initialization
initStore();

// ============================================================================
// AUTHENTICATION API
// ============================================================================

export const authApi = {
  getCurrentUser(): User | null {
    return getStored<User | null>(STORAGE_KEYS.USER, null);
  },

  login(email: string, password: string):Promise<{ user: User; token: string }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getStored<User[]>(STORAGE_KEYS.USERS, DEMO_USERS);
        const lowerEmail = email.toLowerCase().trim();

        // Check for demo credentials or registered user
        let foundUser = users.find((u) => u.email.toLowerCase() === lowerEmail);

        if (!foundUser) {
          if (lowerEmail === 'admin@heritagevault.demo') {
            foundUser = DEMO_USERS[0];
          } else if (lowerEmail === 'visitor@heritagevault.demo') {
            foundUser = DEMO_USERS[1];
          }
        }

        if (foundUser) {
          if (foundUser.isActive === false) {
            return reject(new Error('This account has been deactivated by administrator.'));
          }
          const token = `jwt_mock_token_${foundUser.id}_${Date.now()}`;
          setStored(STORAGE_KEYS.USER, foundUser);
          setStored(STORAGE_KEYS.TOKEN, token);
          resolve({ user: foundUser, token });
        } else {
          // Allow demo login for common demonstration variations
          if (password === 'Admin@123' || password === 'Visitor@123') {
            const role = password.startsWith('Admin') ? 'admin' : 'visitor';
            const user: User = {
              id: `usr_${Date.now()}`,
              name: email.split('@')[0],
              email: lowerEmail,
              role: role,
              isActive: true,
              createdAt: new Date().toISOString(),
            };
            const token = `jwt_mock_token_${user.id}_${Date.now()}`;
            setStored(STORAGE_KEYS.USER, user);
            setStored(STORAGE_KEYS.TOKEN, token);
            resolve({ user, token });
          } else {
            reject(new Error('Invalid email or password. Please use demo credentials: admin@heritagevault.demo / Admin@123 or visitor@heritagevault.demo / Visitor@123'));
          }
        }
      }, 250);
    });
  },

  register(name: string, email: string, role: 'visitor' | 'admin' = 'visitor'): Promise<{ user: User; token: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = getStored<User[]>(STORAGE_KEYS.USERS, DEMO_USERS);
        const newUser: User = {
          id: `usr_${Date.now()}`,
          name,
          email: email.toLowerCase().trim(),
          role,
          isActive: true,
          createdAt: new Date().toISOString(),
          bio: 'Mumbai heritage and history enthusiast.',
        };
        users.push(newUser);
        setStored(STORAGE_KEYS.USERS, users);

        const token = `jwt_mock_token_${newUser.id}_${Date.now()}`;
        setStored(STORAGE_KEYS.USER, newUser);
        setStored(STORAGE_KEYS.TOKEN, token);
        resolve({ user: newUser, token });
      }, 300);
    });
  },

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  },
};

// ============================================================================
// HERITAGE SITES API
// ============================================================================

export const heritageApi = {
  getAll(): HeritageSite[] {
    return getStored<HeritageSite[]>(STORAGE_KEYS.HERITAGE, INITIAL_HERITAGE_SITES);
  },

  getBySlug(slugOrId: string): HeritageSite | undefined {
    const sites = this.getAll();
    return sites.find((s) => s.slug === slugOrId || s.id === slugOrId);
  },

  create(site: Omit<HeritageSite, 'id'>): HeritageSite {
    const sites = this.getAll();
    const newSite: HeritageSite = {
      ...site,
      id: `site_${Date.now()}`,
    };
    sites.unshift(newSite);
    setStored(STORAGE_KEYS.HERITAGE, sites);
    return newSite;
  },

  update(id: string, updates: Partial<HeritageSite>): HeritageSite {
    const sites = this.getAll();
    const index = sites.findIndex((s) => s.id === id);
    if (index === -1) throw new Error('Site not found');
    sites[index] = { ...sites[index], ...updates };
    setStored(STORAGE_KEYS.HERITAGE, sites);
    return sites[index];
  },

  delete(id: string): void {
    const sites = this.getAll().filter((s) => s.id !== id);
    setStored(STORAGE_KEYS.HERITAGE, sites);
  },
};

// ============================================================================
// MUSEUMS API
// ============================================================================

export const museumsApi = {
  getAll(): Museum[] {
    return getStored<Museum[]>(STORAGE_KEYS.MUSEUMS, INITIAL_MUSEUMS);
  },

  getById(id: string): Museum | undefined {
    return this.getAll().find((m) => m.id === id);
  },

  create(museum: Omit<Museum, 'id'>): Museum {
    const museums = this.getAll();
    const newMuseum: Museum = { ...museum, id: `mus_${Date.now()}` };
    museums.unshift(newMuseum);
    setStored(STORAGE_KEYS.MUSEUMS, museums);
    return newMuseum;
  },

  update(id: string, updates: Partial<Museum>): Museum {
    const museums = this.getAll();
    const idx = museums.findIndex((m) => m.id === id);
    if (idx === -1) throw new Error('Museum not found');
    museums[idx] = { ...museums[idx], ...updates };
    setStored(STORAGE_KEYS.MUSEUMS, museums);
    return museums[idx];
  },

  delete(id: string): void {
    const filtered = this.getAll().filter((m) => m.id !== id);
    setStored(STORAGE_KEYS.MUSEUMS, filtered);
  },
};

// ============================================================================
// ARTIFACTS API
// ============================================================================

export const artifactsApi = {
  getAll(): Artifact[] {
    return getStored<Artifact[]>(STORAGE_KEYS.ARTIFACTS, INITIAL_ARTIFACTS);
  },

  getById(id: string): Artifact | undefined {
    return this.getAll().find((a) => a.id === id);
  },

  create(artifact: Omit<Artifact, 'id'>): Artifact {
    const artifacts = this.getAll();
    const newArt: Artifact = { ...artifact, id: `art_${Date.now()}` };
    artifacts.unshift(newArt);
    setStored(STORAGE_KEYS.ARTIFACTS, artifacts);
    return newArt;
  },

  update(id: string, updates: Partial<Artifact>): Artifact {
    const list = this.getAll();
    const idx = list.findIndex((a) => a.id === id);
    if (idx === -1) throw new Error('Artifact not found');
    list[idx] = { ...list[idx], ...updates };
    setStored(STORAGE_KEYS.ARTIFACTS, list);
    return list[idx];
  },

  delete(id: string): void {
    const filtered = this.getAll().filter((a) => a.id !== id);
    setStored(STORAGE_KEYS.ARTIFACTS, filtered);
  },
};

// ============================================================================
// PERSONALITIES API
// ============================================================================

export const personalitiesApi = {
  getAll(): Personality[] {
    return getStored<Personality[]>(STORAGE_KEYS.PERSONALITIES, INITIAL_PERSONALITIES);
  },

  getById(id: string): Personality | undefined {
    return this.getAll().find((p) => p.id === id);
  },
};

// ============================================================================
// TIMELINE API
// ============================================================================

export const timelineApi = {
  getAll(): TimelineEvent[] {
    return INITIAL_TIMELINE_EVENTS;
  },
};

// ============================================================================
// CULTURAL HERITAGE API
// ============================================================================

export const cultureApi = {
  getAll(): CulturalHeritage[] {
    return INITIAL_CULTURAL_HERITAGE;
  },
};

// ============================================================================
// VIRTUAL EXHIBITS API
// ============================================================================

export const virtualMuseumApi = {
  getRooms(): VirtualExhibitRoom[] {
    return INITIAL_VIRTUAL_ROOMS;
  },
};

// ============================================================================
// FAVORITES API
// ============================================================================

export const favoritesApi = {
  getByUserId(userId: string): FavoriteItem[] {
    const all = getStored<FavoriteItem[]>(STORAGE_KEYS.FAVORITES, []);
    return all.filter((f) => f.userId === userId);
  },

  isFavorite(userId: string, itemId: string): boolean {
    const list = this.getByUserId(userId);
    return list.some((f) => f.itemId === itemId);
  },

  toggle(userId: string, item: { id: string; title: string; image: string; category?: string; type: FavoriteItem['itemType'] }): boolean {
    const all = getStored<FavoriteItem[]>(STORAGE_KEYS.FAVORITES, []);
    const existingIndex = all.findIndex((f) => f.userId === userId && f.itemId === item.id);

    if (existingIndex > -1) {
      all.splice(existingIndex, 1);
      setStored(STORAGE_KEYS.FAVORITES, all);
      return false; // Removed
    } else {
      const newFav: FavoriteItem = {
        id: `fav_${Date.now()}`,
        userId,
        itemType: item.type,
        itemId: item.id,
        itemTitle: item.title,
        itemImage: item.image,
        category: item.category,
        createdAt: new Date().toISOString(),
      };
      all.unshift(newFav);
      setStored(STORAGE_KEYS.FAVORITES, all);
      return true; // Added
    }
  },
};

// ============================================================================
// QUIZ API
// ============================================================================

export const quizApi = {
  getQuestions(): QuizQuestion[] {
    return getStored<QuizQuestion[]>(STORAGE_KEYS.QUIZ_QUESTIONS, INITIAL_QUIZ_QUESTIONS);
  },

  submitResult(result: Omit<QuizResult, 'id' | 'badgeEarned' | 'completedAt'>): QuizResult {
    const ratio = result.score / result.totalQuestions;
    let badge = 'Heritage Beginner';
    if (ratio >= 0.9) badge = 'Heritage Master';
    else if (ratio >= 0.7) badge = 'Mumbai Historian';
    else if (ratio >= 0.5) badge = 'Heritage Explorer';

    const newResult: QuizResult = {
      ...result,
      id: `res_${Date.now()}`,
      badgeEarned: badge,
      completedAt: new Date().toISOString(),
    };

    const results = getStored<QuizResult[]>(STORAGE_KEYS.QUIZ_RESULTS, []);
    results.unshift(newResult);
    setStored(STORAGE_KEYS.QUIZ_RESULTS, results);
    return newResult;
  },

  getLeaderboard(): QuizResult[] {
    const results = getStored<QuizResult[]>(STORAGE_KEYS.QUIZ_RESULTS, []);
    return [...results].sort((a, b) => b.score - a.score).slice(0, 10);
  },

  getUserResults(userId: string): QuizResult[] {
    const results = getStored<QuizResult[]>(STORAGE_KEYS.QUIZ_RESULTS, []);
    return results.filter((r) => r.userId === userId);
  },
};

// ============================================================================
// ADMIN DASHBOARD API
// ============================================================================

export const adminApi = {
  getDashboardStats(): DashboardStats {
    const sites = heritageApi.getAll();
    const museums = museumsApi.getAll();
    const artifacts = artifactsApi.getAll();
    const personalities = personalitiesApi.getAll();
    const quizQuestions = quizApi.getQuestions();
    const favorites = getStored<FavoriteItem[]>(STORAGE_KEYS.FAVORITES, []);
    const users = getStored<User[]>(STORAGE_KEYS.USERS, DEMO_USERS);

    const categoryMap: Record<string, number> = {};
    sites.forEach((s) => {
      categoryMap[s.category] = (categoryMap[s.category] || 0) + 1;
    });

    const periodMap: Record<string, number> = {};
    sites.forEach((s) => {
      periodMap[s.historicalPeriod] = (periodMap[s.historicalPeriod] || 0) + 1;
    });

    return {
      totalHeritageSites: sites.length,
      totalMuseums: museums.length,
      totalArtifacts: artifacts.length,
      totalPersonalities: personalities.length,
      totalQuizQuestions: quizQuestions.length,
      totalFavorites: favorites.length,
      totalUsers: users.length,
      popularSites: [
        { name: 'CSMT Station', views: 4820, favorites: 340 },
        { name: 'Gateway of India', views: 6150, favorites: 520 },
        { name: 'CSMVS Museum', views: 3200, favorites: 280 },
        { name: 'Kanheri Caves', views: 2950, favorites: 215 },
        { name: 'Rajabai Clock Tower', views: 2410, favorites: 190 },
      ],
      categoryBreakdown: Object.entries(categoryMap).map(([name, count]) => ({ name, count })),
      periodBreakdown: Object.entries(periodMap).map(([name, count]) => ({ name, count })),
    };
  },

  getUsers(): User[] {
    return getStored<User[]>(STORAGE_KEYS.USERS, DEMO_USERS);
  },

  toggleUserStatus(userId: string): User {
    const users = getStored<User[]>(STORAGE_KEYS.USERS, DEMO_USERS);
    const u = users.find((x) => x.id === userId);
    if (!u) throw new Error('User not found');
    u.isActive = u.isActive === false ? true : false;
    setStored(STORAGE_KEYS.USERS, users);
    return u;
  },
};

// ============================================================================
// TOUR PLANNER GENERATOR
// ============================================================================

export function generateHeritageTour(params: {
  durationHours: number;
  area: string;
  interest: string;
  walkingPreference: 'walking' | 'transit';
}): TourPlan {
  const sites = heritageApi.getAll();

  // Match area
  let candidateSites = sites;
  if (params.area.toLowerCase().includes('south')) {
    candidateSites = sites.filter((s) => s.latitude < 18.96);
  } else if (params.area.toLowerCase().includes('suburban') || params.area.toLowerCase().includes('borivali')) {
    candidateSites = sites.filter((s) => s.latitude > 19.1);
  }

  // If candidate count too low, use south mumbai
  if (candidateSites.length < 3) {
    candidateSites = sites.slice(0, 5);
  }

  // Match interest
  if (params.interest.toLowerCase().includes('fort')) {
    const forts = sites.filter((s) => s.category === 'Fort');
    if (forts.length > 0) candidateSites = [...forts, ...candidateSites];
  } else if (params.interest.toLowerCase().includes('cave')) {
    const caves = sites.filter((s) => s.category === 'Cave');
    if (caves.length > 0) candidateSites = [...caves, ...candidateSites];
  }

  // Deduplicate and take stops according to duration
  const uniqueCandidates = Array.from(new Set(candidateSites));
  const maxStops = Math.min(Math.max(Math.floor(params.durationHours * 1.5), 2), 5);
  const selected = uniqueCandidates.slice(0, maxStops);

  const stops = selected.map((site, index) => ({
    order: index + 1,
    site,
    durationMinutes: Math.round(35 + Math.random() * 20),
    walkingTimeToNextMin: index < selected.length - 1 ? 12 : undefined,
    historicalNote: `Focus on the ${site.architecturalStyle || site.category} features and unboxed architectural masonry.`,
  }));

  const estDistance = Number((stops.length * 1.2).toFixed(1));

  return {
    id: `tour_${Date.now()}`,
    title: `${params.durationHours}-Hour ${params.area || 'South Mumbai'} Heritage Walk`,
    durationHours: params.durationHours,
    area: params.area || 'South Mumbai Heritage District',
    walkingDistanceKm: estDistance,
    description: `A curated historical journey through ${selected.map((s) => s.name.split('(')[0].trim()).join(' → ')}, tailored for ${params.interest.toLowerCase()} enthusiasts.`,
    stops,
    recommendedTimeOfDay: 'Early Morning (07:30 AM – 10:30 AM) or Late Afternoon (04:00 PM – 06:30 PM)',
    bestTransport: params.walkingPreference === 'walking' ? 'Pedestrian Heritage Walkways' : 'Walking + Mumbai Black-and-Yellow (Kaali-Peeli) Taxi',
  };
}

// ============================================================================
// AI HERITAGE GUIDE API (Mitra)
// ============================================================================

export async function askMitraAI(userQuestion: string, conversationHistory: AIChatMessage[] = []): Promise<{
  text: string;
  references?: string[];
  verifiedStatus: boolean;
}> {
  try {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: userQuestion, history: conversationHistory }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.text) {
        return {
          text: data.text,
          references: data.references || ['Mumbai HeritageVault Verified Archives'],
          verifiedStatus: data.verifiedStatus !== false,
        };
      }
    }
  } catch {
    // Fall through to resilient local knowledge base
  }

  // High-accuracy fallback knowledge matching
  const q = userQuestion.toLowerCase();
  const sites = heritageApi.getAll();
  const museums = museumsApi.getAll();
  const personalities = personalitiesApi.getAll();

  if (q.includes('csmt') || q.includes('victoria terminus') || q.includes('railway station')) {
    const csmt = sites.find((s) => s.id === 'site_csmt')!;
    return {
      text: `**Chhatrapati Shivaji Maharaj Terminus (CSMT)**, formerly Victoria Terminus, is an architectural masterpiece of Victorian Gothic Revival architecture blended with Indian decorative elements. Constructed between 1878 and 1887 under chief architect **Frederick William Stevens**, it was inscribed as a **UNESCO World Heritage Site** in 2004.\n\nKey Highlights:\n- Topped by a 14-foot stone statue representing **Progress**.\n- Stone carvings, ornamental tiles, and woodcraft executed by students and master artisans of Sir J.J. School of Art.\n- Ground zero of Asian railway history: the very first passenger train in Asia steamed from this location (Bori Bunder) to Thane on 16 April 1853.`,
      references: ['UNESCO World Heritage Inscription 945rev', 'Central Railway Historical Archives'],
      verifiedStatus: true,
    };
  }

  if (q.includes('gateway') || q.includes('apollo bunder')) {
    const gw = sites.find((s) => s.id === 'site_gateway')!;
    return {
      text: `The **Gateway of India** is an Indo-Saracenic arch monument built in yellow basalt stone overlooking Mumbai Harbour. Designed by architect **George Wittet**, it was built between 1914 and 1924 to commemorate the 1911 landing of King George V and Queen Mary.\n\nHistorical Significance:\n- Combines 16th-century Gujarati Sultanate architectural motifs with Roman triumphal arch geometry.\n- On 28 February 1948, the First Battalion of the Somerset Light Infantry marched through its portals to depart India, marking the symbolic end of British rule.`,
      references: ['Maharashtra State Directorate of Archaeology', 'MHCC Heritage Records'],
      verifiedStatus: true,
    };
  }

  if (q.includes('kanheri') || q.includes('cave')) {
    return {
      text: `**Kanheri Caves** comprises 109 rock-cut Buddhist caves situated inside Sanjay Gandhi National Park, Borivali. Dating from the **1st century BCE to the 10th century CE**, it was one of the largest Buddhist monastic universities in western India.\n\nKey Facts:\n- The name comes from the Sanskrit "Krishnagiri" (Black Mountain).\n- Served as a critical stop on trade routes connecting ancient ports like Sopara and Kalyan.\n- Features sophisticated ancient water harvesting channels, a colossal 22-foot standing Buddha, and an 11-headed Avalokiteshvara in Cave 3.`,
      references: ['Archaeological Survey of India (ASI) - Mumbai Circle'],
      verifiedStatus: true,
    };
  }

  if (q.includes('museum') || q.includes('csmvs') || q.includes('bhau daji lad')) {
    return {
      text: `Mumbai is home to several premier museums:\n1. **Chhatrapati Shivaji Maharaj Vastu Sangrahalaya (CSMVS)**: Founded in 1905, designed by George Wittet in the Indo-Saracenic style, housing over 70,000 artifacts across Indus Valley seals, Mughal miniatures, and Himalayan bronzes. Winner of the 2022 UNESCO Asia-Pacific Award of Excellence.\n2. **Dr. Bhau Daji Lad Museum (Byculla)**: Established in 1855, Mumbai’s oldest museum, celebrated for 19th-century dioramas and Victorian decorative arts.\n3. **Mani Bhavan Gandhi Sangrahalaya (Gamdevi)**: Gandhi’s Bombay headquarters where the Non-Cooperation and Quit India movements were planned.\n4. **RBI Monetary Museum (Fort)**: Showcasing ancient punch-marked coins to modern banknotes.`,
      references: ['CSMVS Trust Records', 'Dr. Bhau Daji Lad City Museum Archives'],
      verifiedStatus: true,
    };
  }

  if (q.includes('koli') || q.includes('indigenous') || q.includes('fisher')) {
    return {
      text: `The **Koli community** is the indigenous fisherfolk of Mumbai who inhabited the original Seven Islands centuries before colonial arrival.\n\n- They gave Mumbai its name from their patron sea goddess **Mumbadevi**.\n- Localities like **Colaba** (Kolaba) and **Worli** derive their names from Koli heritage.\n- Historic villages (Koliwadas) in Worli, Versova, and Cuffe Parade preserve ancient sustainable tidal fishing and seafaring traditions.`,
      references: ['Anthropological Survey of India', 'Koli Cultural Heritage Archives'],
      verifiedStatus: true,
    };
  }

  if (q.includes('british') || q.includes('colonial') || q.includes('portuguese') || q.includes('history')) {
    return {
      text: `**Key Epochs in Mumbai's History**:\n- **1534**: Portuguese acquire the Seven Islands via the Treaty of Bassein.\n- **1661–1668**: Transferred as part of the royal dowry of Catherine of Braganza to King Charles II of England, who leased them to the East India Company for £10 of gold per year.\n- **1782–1845**: Governor William Hornby starts the **Hornby Vellard**, merging the seven separate islands into a unified landmass.\n- **1853**: First passenger train in Asia runs between Bombay and Thane.\n- **1942**: Mahatma Gandhi launches the Quit India Movement from Gowalia Tank Maidan.\n- **1960**: Mumbai becomes the capital of Maharashtra following the Samyukta Maharashtra Movement.`,
      references: ['Gazetteer of the Bombay Presidency', 'Bombay City Archives'],
      verifiedStatus: true,
    };
  }

  if (q.includes('tour') || q.includes('itinerary') || q.includes('south mumbai')) {
    return {
      text: `**Suggested South Mumbai 1-Day Heritage Walk**:\n\n1. **08:00 AM – Gateway of India & Apollo Bunder**: Golden hour sea breezes and Indo-Saracenic masonry.\n2. **09:30 AM – Kala Ghoda Art Precinct & CSMVS**: Explore Harappan seals and the museum palm gardens.\n3. **12:00 PM – Oval Maidan**: Witness the UNESCO dialogue between Victorian Gothic (Bombay High Court, Rajabai Tower) and 1930s Art Deco apartment blocks.\n4. **01:30 PM – Traditional Irani Café**: Enjoy Brun Maska and chai in the Fort district.\n5. **03:00 PM – Town Hall & Horniman Circle**: Neoclassical Doric architecture and the Asiatic Society steps.\n6. **04:30 PM – CSMT Station**: Evening illumination of Frederick William Stevens’ Victorian Gothic masterpiece.`,
      references: ['Mumbai HeritageWalk Curatorial Guide', 'UNESCO Heritage Corridor Maps'],
      verifiedStatus: true,
    };
  }

  // Honest fallback when not verified
  return {
    text: `I don't have verified information about this specific query in the museum database.\n\nTo preserve historical accuracy, Mumbai HeritageVault only provides verified architectural, archaeological, and archival records. You may ask me about **CSMT**, the **Gateway of India**, **Kanheri Caves**, **Mumbai Museums**, the **Seven Islands reclamation**, **Koli community heritage**, or request a **curated heritage tour**.`,
    references: ['Mumbai HeritageVault Verification Policy'],
    verifiedStatus: false,
  };
}
