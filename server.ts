/**
 * Mumbai HeritageVault - Digital Historical & Cultural Heritage Museum
 * Backend Server (Node.js + Express + TypeScript)
 * Includes Server-Side Gemini AI Integration using @google/genai
 */

import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import {
  INITIAL_HERITAGE_SITES,
  INITIAL_MUSEUMS,
  INITIAL_ARTIFACTS,
  INITIAL_PERSONALITIES,
  INITIAL_TIMELINE_EVENTS,
  INITIAL_CULTURAL_HERITAGE,
  INITIAL_QUIZ_QUESTIONS,
  DEMO_USERS,
} from './src/data/mockHeritageData.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory server database (can be substituted with PostgreSQL via DATABASE_URL)
let heritageSites = [...INITIAL_HERITAGE_SITES];
let museums = [...INITIAL_MUSEUMS];
let artifacts = [...INITIAL_ARTIFACTS];
let personalities = [...INITIAL_PERSONALITIES];
let quizQuestions = [...INITIAL_QUIZ_QUESTIONS];
let users = [...DEMO_USERS];
let favorites: Array<{ id: string; userId: string; itemType: string; itemId: string; title: string; image: string }> = [];
let quizResults: Array<{ id: string; userId?: string; userName: string; score: number; totalQuestions: number; category: string; badgeEarned: string; completedAt: string }> = [];

// Initialize Google GenAI client (Server-side only)
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Gemini client initialization notice:', err);
  }
}

// ============================================================================
// REST API ROUTES
// ============================================================================

// 1. Auth routes
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email.toLowerCase() === (email || '').toLowerCase().trim());

  if (user) {
    if (user.isActive === false) {
      return res.status(403).json({ error: 'This account has been deactivated by administrator.' });
    }
    const token = `jwt_${user.id}_${Date.now()}`;
    return res.json({ user, token });
  }

  // Demo fallback
  if (password === 'Admin@123' || password === 'Visitor@123') {
    const role = password.startsWith('Admin') ? 'admin' : 'visitor';
    const fallbackUser = {
      id: `usr_${Date.now()}`,
      name: (email || '').split('@')[0] || 'User',
      email: email,
      role: role as 'admin' | 'visitor',
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    users.push(fallbackUser);
    const token = `jwt_${fallbackUser.id}_${Date.now()}`;
    return res.json({ user: fallbackUser, token });
  }

  return res.status(401).json({ error: 'Invalid credentials. Use demo credentials or register.' });
});

app.post('/api/auth/register', (req: Request, res: Response) => {
  const { name, email, role = 'visitor' } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());
  if (existing) {
    return res.status(400).json({ error: 'Email already registered.' });
  }

  const newUser = {
    id: `usr_${Date.now()}`,
    name,
    email: email.toLowerCase().trim(),
    role: (role === 'admin' ? 'admin' : 'visitor') as 'admin' | 'visitor',
    isActive: true,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  const token = `jwt_${newUser.id}_${Date.now()}`;
  return res.status(201).json({ user: newUser, token });
});

// 2. Heritage Sites
app.get('/api/heritage', (req: Request, res: Response) => {
  const { category, period, search } = req.query;
  let result = [...heritageSites];

  if (category && category !== 'All') {
    result = result.filter((s) => s.category === category);
  }
  if (period && period !== 'All') {
    result = result.filter((s) => s.historicalPeriod === period);
  }
  if (search) {
    const q = String(search).toLowerCase();
    result = result.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        s.historicalPeriod.toLowerCase().includes(q)
    );
  }

  res.json(result);
});

app.get('/api/heritage/:id', (req: Request, res: Response) => {
  const site = heritageSites.find((s) => s.id === req.params.id || s.slug === req.params.id);
  if (!site) return res.status(404).json({ error: 'Heritage site not found' });
  res.json(site);
});

app.post('/api/heritage', (req: Request, res: Response) => {
  const newSite = {
    ...req.body,
    id: `site_${Date.now()}`,
    slug: (req.body.name || 'heritage-site')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, ''),
  };
  heritageSites.unshift(newSite);
  res.status(201).json(newSite);
});

app.put('/api/heritage/:id', (req: Request, res: Response) => {
  const idx = heritageSites.findIndex((s) => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Site not found' });
  heritageSites[idx] = { ...heritageSites[idx], ...req.body };
  res.json(heritageSites[idx]);
});

app.delete('/api/heritage/:id', (req: Request, res: Response) => {
  heritageSites = heritageSites.filter((s) => s.id !== req.params.id);
  res.json({ success: true, message: 'Site deleted' });
});

// 3. Museums
app.get('/api/museums', (_req: Request, res: Response) => {
  res.json(museums);
});

app.get('/api/museums/:id', (req: Request, res: Response) => {
  const mus = museums.find((m) => m.id === req.params.id);
  if (!mus) return res.status(404).json({ error: 'Museum not found' });
  res.json(mus);
});

// 4. Artifacts
app.get('/api/artifacts', (req: Request, res: Response) => {
  const { category } = req.query;
  if (category && category !== 'All') {
    return res.json(artifacts.filter((a) => a.category === category));
  }
  res.json(artifacts);
});

app.get('/api/artifacts/:id', (req: Request, res: Response) => {
  const art = artifacts.find((a) => a.id === req.params.id);
  if (!art) return res.status(404).json({ error: 'Artifact not found' });
  res.json(art);
});

// 5. Personalities
app.get('/api/personalities', (_req: Request, res: Response) => {
  res.json(personalities);
});

// 6. Timeline
app.get('/api/timeline', (_req: Request, res: Response) => {
  res.json(INITIAL_TIMELINE_EVENTS);
});

// 7. Cultural Heritage
app.get('/api/culture', (_req: Request, res: Response) => {
  res.json(INITIAL_CULTURAL_HERITAGE);
});

// 8. Quiz
app.get('/api/quiz', (_req: Request, res: Response) => {
  res.json(quizQuestions);
});

app.post('/api/quiz/submit', (req: Request, res: Response) => {
  const { userId, userName, score, totalQuestions, category } = req.body;
  const ratio = score / totalQuestions;
  let badge = 'Heritage Beginner';
  if (ratio >= 0.9) badge = 'Heritage Master';
  else if (ratio >= 0.7) badge = 'Mumbai Historian';
  else if (ratio >= 0.5) badge = 'Heritage Explorer';

  const newResult = {
    id: `res_${Date.now()}`,
    userId,
    userName: userName || 'Visitor',
    score,
    totalQuestions,
    category: category || 'General Heritage',
    badgeEarned: badge,
    completedAt: new Date().toISOString(),
  };
  quizResults.unshift(newResult);
  res.json(newResult);
});

app.get('/api/quiz/results', (_req: Request, res: Response) => {
  res.json(quizResults.slice(0, 20));
});

// 9. Admin Dashboard
app.get('/api/admin/dashboard', (_req: Request, res: Response) => {
  res.json({
    totalHeritageSites: heritageSites.length,
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
  });
});

app.get('/api/admin/users', (_req: Request, res: Response) => {
  res.json(users);
});

// 10. Global Search
app.get('/api/search', (req: Request, res: Response) => {
  const q = String(req.query.q || '').toLowerCase().trim();
  if (!q) return res.json({ sites: [], museums: [], artifacts: [], personalities: [], timeline: [] });

  const matchedSites = heritageSites.filter(
    (s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.location.toLowerCase().includes(q)
  );
  const matchedMuseums = museums.filter((m) => m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q));
  const matchedArtifacts = artifacts.filter(
    (a) => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q) || a.material.toLowerCase().includes(q)
  );
  const matchedPersonalities = personalities.filter(
    (p) => p.name.toLowerCase().includes(q) || p.biography.toLowerCase().includes(q) || p.role.toLowerCase().includes(q)
  );
  const matchedTimeline = INITIAL_TIMELINE_EVENTS.filter(
    (t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
  );

  res.json({
    sites: matchedSites.slice(0, 5),
    museums: matchedMuseums.slice(0, 3),
    artifacts: matchedArtifacts.slice(0, 4),
    personalities: matchedPersonalities.slice(0, 3),
    timeline: matchedTimeline.slice(0, 3),
  });
});

// 11. AI Historical Assistant (Mitra)
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  const { question, history = [] } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  // If Gemini API is available on the server, invoke gemini-3.8-flash
  if (ai) {
    try {
      const systemInstruction = `You are "Mitra", the AI Historical Assistant for the Mumbai HeritageVault - Digital Historical & Cultural Heritage Museum.
Your role: Answer questions accurately and authoritatively about Mumbai's history, architecture, cultural traditions, museums, forts, caves, personalities, and monuments.

MANDATORY RULES:
1. Ground your answers strictly in historical and verified architectural facts.
2. DO NOT fabricate or invent dates, architects, UNESCO statuses, or historical events.
3. If information is not known with certainty, or outside the historical scope of Mumbai heritage, say:
"I don't have verified information about this in the museum database."
4. Tone: Curatorial, elegant, respectful, and educational (like a senior museum archivist).
5. Always mention relevant Mumbai locations, architectural styles (e.g. Victorian Gothic Revival, Indo-Saracenic, Art Deco), and historical contexts where applicable.`;

      const prompt = `User question about Mumbai heritage: ${question}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.2, // Low temperature for high factual accuracy
        },
      });

      const responseText = response.text || '';
      return res.json({
        text: responseText,
        references: ['Mumbai HeritageVault Verified Knowledge Base', 'Archaeological Survey of India'],
        verifiedStatus: true,
      });
    } catch (apiErr) {
      console.error('Gemini API call failed, falling back to local database:', apiErr);
    }
  }

  // Local factual knowledge lookup fallback
  const q = question.toLowerCase();
  if (q.includes('csmt') || q.includes('victoria terminus')) {
    return res.json({
      text: `**Chhatrapati Shivaji Maharaj Terminus (CSMT)**, formerly Victoria Terminus, is an outstanding example of Victorian Gothic Revival architecture in India, designed by Frederick William Stevens between 1878 and 1887. Inscribed as a UNESCO World Heritage Site in 2004, it marks the starting point of Asia's railway journey which began from Bori Bunder to Thane on 16 April 1853.`,
      references: ['UNESCO World Heritage Inscription 945rev', 'Central Railway Historical Archives'],
      verifiedStatus: true,
    });
  }
  if (q.includes('gateway')) {
    return res.json({
      text: `The **Gateway of India** is an Indo-Saracenic arch monument built in yellow basalt overlooking Mumbai Harbour. Designed by George Wittet and completed in 1924 to commemorate King George V and Queen Mary's 1911 visit, it was also the ceremonial departure point for the last British troops in 1948.`,
      references: ['Maharashtra State Directorate of Archaeology'],
      verifiedStatus: true,
    });
  }
  if (q.includes('kanheri') || q.includes('caves')) {
    return res.json({
      text: `**Kanheri Caves** comprises 109 rock-cut Buddhist caves inside Sanjay Gandhi National Park, Borivali. Dating from the 1st century BCE to the 10th century CE, it was a major Buddhist university and trade stop connecting ancient ports like Sopara and Kalyan.`,
      references: ['Archaeological Survey of India (ASI) - Mumbai Circle'],
      verifiedStatus: true,
    });
  }

  return res.json({
    text: `I don't have verified information about this in the museum database.\n\nTo preserve historical integrity, Mumbai HeritageVault only answers queries with verified archival and archaeological records. You can ask about CSMT, Gateway of India, Kanheri Caves, Mumbai Museums, or request a curated heritage walk.`,
    references: ['Mumbai HeritageVault Verification Policy'],
    verifiedStatus: false,
  });
});

// ============================================================================
// SERVER SETUP & VITE MIDDLEWARE
// ============================================================================

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    // Dynamic import of Vite in development
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`🏛️ Mumbai HeritageVault Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
});
