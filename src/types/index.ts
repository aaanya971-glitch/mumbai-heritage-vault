/**
 * Mumbai HeritageVault - Digital Historical & Cultural Heritage Museum
 * Core TypeScript Types
 */

export type UserRole = 'visitor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  bio?: string;
  createdAt?: string;
  isActive?: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export type HeritageCategory =
  | 'Monument'
  | 'Museum'
  | 'Fort'
  | 'Cave'
  | 'Heritage Building'
  | 'Religious Heritage'
  | 'Cultural Heritage'
  | 'Market'
  | 'Railway Heritage'
  | 'Colonial Heritage'
  | 'Natural Heritage';

export type HistoricalPeriod =
  | 'Ancient & Early History'
  | 'Medieval Period'
  | 'Portuguese Period'
  | 'British/Bombay Period'
  | '19th Century'
  | 'Early 20th Century'
  | 'Indian Independence Movement'
  | 'Post-Independence Mumbai'
  | 'Modern Mumbai';

export interface HeritageSite {
  id: string;
  name: string;
  slug: string;
  category: HeritageCategory;
  description: string;
  historicalPeriod: HistoricalPeriod;
  year: string;
  location: string;
  latitude: number;
  longitude: number;
  architecturalStyle?: string;
  significance: string;
  unescoStatus: 'UNESCO World Heritage Site' | 'Tentative List' | 'None';
  image: string;
  whyItMatters?: string;
  architect?: string;
  interestingFacts?: string[];
  nearbySites?: string[];
  accessType?: 'Free' | 'Ticketed' | 'Restricted';
  referencesSource?: string;
  gallery?: string[];
  audioGuideText?: string;
}

export interface Museum {
  id: string;
  name: string;
  description: string;
  location: string;
  museumType: string;
  latitude: number;
  longitude: number;
  image: string;
  openingInfoPlaceholder?: string;
  website?: string;
  collectionCount?: number;
  highlights?: string[];
}

export interface Artifact {
  id: string;
  name: string;
  category:
    | 'Sculptures'
    | 'Coins'
    | 'Manuscripts'
    | 'Paintings'
    | 'Textiles'
    | 'Tools'
    | 'Decorative objects'
    | 'Historical documents'
    | 'Photographs';
  period: string;
  material: string;
  origin: string;
  description: string;
  significance: string;
  image: string;
  source: string;
  museumSource?: string;
  accessionNumber?: string;
}

export interface Personality {
  id: string;
  name: string;
  role: string;
  biography: string;
  birthDate?: string;
  deathDate?: string;
  contribution: string;
  associatedPlaces?: string[];
  image: string;
  relatedSites?: string[];
}

export interface TimelineEvent {
  id: string;
  title: string;
  period: HistoricalPeriod;
  dateDisplay: string;
  yearNumeric?: number;
  description: string;
  relatedLocations?: string[];
  relatedPersonalities?: string[];
  image: string;
}

export interface CulturalHeritage {
  id: string;
  title: string;
  category: 'Communities' | 'Food Heritage' | 'Festivals' | 'Performing Arts' | 'Traditional Occupations';
  description: string;
  history: string;
  culturalSignificance: string;
  relatedLocations?: string[];
  image: string;
}

export interface VirtualExhibit {
  id: string;
  room: string;
  title: string;
  description: string;
  historicalContext: string;
  image: string;
  period: string;
  audioGuidePlaceholder?: string;
}

export interface VirtualExhibitRoom {
  roomId: string;
  roomNumber: number;
  roomTitle: string;
  theme: string;
  era: string;
  exhibits: VirtualExhibit[];
}

export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: number; // 0=A, 1=B, 2=C, 3=D
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface QuizResult {
  id: string;
  userId?: string;
  userName: string;
  score: number;
  totalQuestions: number;
  category: string;
  badgeEarned: string;
  completedAt: string;
}

export interface FavoriteItem {
  id: string;
  userId: string;
  itemType: 'heritage' | 'museum' | 'artifact' | 'personality' | 'culture';
  itemId: string;
  itemTitle: string;
  itemImage: string;
  category?: string;
  createdAt: string;
}

export interface TourStop {
  order: number;
  site: HeritageSite;
  durationMinutes: number;
  walkingTimeToNextMin?: number;
  historicalNote: string;
}

export interface TourPlan {
  id: string;
  title: string;
  durationHours: number;
  area: string;
  walkingDistanceKm: number;
  description: string;
  stops: TourStop[];
  recommendedTimeOfDay: string;
  bestTransport: string;
}

export interface AIChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  verifiedStatus?: boolean;
  references?: string[];
}

export interface DashboardStats {
  totalHeritageSites: number;
  totalMuseums: number;
  totalArtifacts: number;
  totalPersonalities: number;
  totalQuizQuestions: number;
  totalFavorites: number;
  totalUsers: number;
  popularSites: { name: string; views: number; favorites: number }[];
  categoryBreakdown: { name: string; count: number }[];
  periodBreakdown: { name: string; count: number }[];
}
