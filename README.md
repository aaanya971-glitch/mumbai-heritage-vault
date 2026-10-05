# Mumbai HeritageVault – Digital Historical & Cultural Heritage Museum

> **“Discover Mumbai. Explore Its History. Preserve Its Heritage.”**

Mumbai HeritageVault is a production-grade, interactive digital museum and archive dedicated to the architectural, archaeological, indigenous, and social heritage of **Mumbai, Maharashtra, India**. Designed with a high-character editorial aesthetic, it provides students, researchers, tourists, and heritage enthusiasts with verified historical records, virtual exhibition rooms, an interactive OpenStreetMap cartographic explorer, an educational quiz engine, and an AI Historical Assistant ("Mitra").

---

## 🏛️ Key Features

- **Architectural & Monument Dossiers**: Complete monographs on Grade-I monuments and UNESCO World Heritage sites including Chhatrapati Shivaji Maharaj Terminus (CSMT), Gateway of India, Rajabai Clock Tower, Bombay High Court, Town Hall, Crawford Market, and more.
- **Museums Directory**: Curated catalogue of CSMVS, Dr. Bhau Daji Lad Museum, Mani Bhavan Gandhi Sangrahalaya, RBI Monetary Museum, and Nehru Science Centre.
- **Coastal Forts & Ancient Caves**: Dedicated archives for Sion Fort, Worli Fort, Sewri Fort, Mahim Fort, and the 109 rock-cut Buddhist caves of Kanheri (1st c. BCE to 10th c. CE).
- **Historical Timeline ("Mumbai Through Time")**: Chronologically navigable stream spanning ancient basalt excavations, Raja Bhimdev’s Mahikawati settlement, Portuguese treaties, British Hornby Vellard reclamations, the 1853 first passenger train in Asia, and the 1942 Quit India movement.
- **Interactive Heritage Map**: Leaflet and OpenStreetMap powered map of Mumbai with custom category pins, coordinate indicators, and location inspector.
- **Virtual Museum**: Six thematic virtual exhibition pavilions with audio narration players and accession context.
- **Artifact Gallery**: Accession ledger documenting ancient coins, Buddhist sculptures, illuminated Dante manuscripts, and Parsi silk embroidery.
- **Living Cultural Heritage**: Documentation of the indigenous Koli fisherfolk community, Mumbai Dabbawalas, Irani café culture, and the Sarvajanik Ganeshotsav festival.
- **Personalities of Modern Mumbai**: Biographies and contributions of Nana Jagannath Shankarseth, Sir Jamsetjee Jejeebhoy, Dadabhai Naoroji, Dr. B.R. Ambedkar, Mahatma Gandhi, and Cornelia Sorabji.
- **Heritage Tour Planner**: Tailored step-by-step walking and transit itineraries calculated by duration, neighborhood, and physical walking preference.
- **Educational Quiz**: Timed 10-question quiz with instant historical explanations, four tiered badge awards (Heritage Beginner to Heritage Master), and a global leaderboard.
- **AI Historical Assistant ("Mitra")**: Grounded in the museum's verified knowledge base using the `@google/genai` TypeScript SDK (server-side). Enforces strict zero-hallucination protocols.
- **Curatorial Admin Dashboard**: Real-time analytics charts powered by Recharts, full CRUD operations for heritage sites, museums, and artifacts, and user management.

---

## 🔑 Demo Credentials

For immediate exploration and presentation demonstration:

| Role | Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Admin Curator** | `admin@heritagevault.demo` | `Admin@123` | Full access to Admin Dashboard, CRUD controls, analytics, user toggle |
| **Visitor / Student** | `visitor@heritagevault.demo` | `Visitor@123` | Save favorites, take quizzes, earn badges, plan tours, chat with Mitra |

*Note: For production deployments, replace demo credentials with securely hashed user credentials in PostgreSQL.*

---

## 📂 Project Structure

```
├── .env.example                     # Environment variable definitions
├── database/
│   ├── schema.sql                   # Complete PostgreSQL DDL (12 tables + indexes)
│   └── seed.sql                     # Verified historical seed dataset
├── index.html                       # HTML entry point with metadata & web fonts
├── metadata.json                    # AI Studio metadata & server capabilities
├── package.json                     # NPM scripts & dependencies
├── server.ts                        # Full-stack Express backend with Gemini AI & Vite middlewares
├── src/
│   ├── App.tsx                      # Top-level routes & state coordination
│   ├── main.tsx                     # React 19 root bootstrap
│   ├── index.css                    # Archival paper styling & typography rules
│   ├── assets/
│   │   └── images/                  # High-fidelity heritage image assets
│   ├── types/
│   │   └── index.ts                 # Full TypeScript interfaces
│   ├── data/
│   │   └── mockHeritageData.ts      # Comprehensive verified Mumbai heritage data
│   ├── services/
│   │   └── api.ts                   # Resilient API service layer with persistent store
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx           # 3-zone Top Bar Contract navigation
│   │   │   └── Footer.tsx           # Institutional footer & academic disclaimer
│   │   └── common/
│   │       ├── AudioGuidePlayer.tsx # Speech-enabled museum audio guide
│   │       ├── HeritageCard.tsx     # Zero-pill unboxed metadata cards
│   │       ├── InteractiveMap.tsx   # Leaflet OpenStreetMap cartography
│   │       └── GlobalSearchModal.tsx# Grouped keyword search modal
│   └── pages/
│       ├── HomePage.tsx             # Hero, featured monuments, stats & teasers
│       ├── ExploreHeritagePage.tsx  # Multi-facet filtered search directory
│       ├── HeritageDetailPage.tsx   # Detailed accession monograph with drop caps
│       ├── MuseumsPage.tsx          # Dedicated museums directory
│       ├── MonumentsPage.tsx        # Victorian Gothic & civic architecture
│       ├── FortsAndCavesPage.tsx    # Coastal bastions & Kanheri Buddhist caves
│       ├── TimelinePage.tsx         # Chronological epochs
│       ├── HeritageMapPage.tsx      # Full-page map inspector
│       ├── VirtualMuseumPage.tsx    # 6 virtual exhibition rooms
│       ├── ArtifactGalleryPage.tsx  # Museum collection lightbox
│       ├── PersonalitiesPage.tsx    # Architects of modern Mumbai
│       ├── CulturalHeritagePage.tsx # Kolis, Dabbawalas, Irani cafes, Ganesh Utsav
│       ├── TourPlannerPage.tsx      # Custom walking tour generator
│       ├── QuizPage.tsx             # Timed quiz with badges & leaderboard
│       ├── AIGuidePage.tsx          # Mitra AI guide grounded in museum facts
│       ├── FavoritesPage.tsx        # "My Heritage Collection"
│       ├── ProfilePage.tsx          # Scholar profile & earned achievements
│       ├── AdminDashboardPage.tsx   # Recharts analytics & catalog CRUD
│       ├── AboutPage.tsx            # Institutional charter & mission
│       ├── ContactPage.tsx          # Curatorial inquiry desk
│       ├── LoginPage.tsx            # Sign in with one-click demo credentials
│       ├── RegisterPage.tsx         # User registration
│       └── NotFoundPage.tsx         # 404 missing archival record state
└── tsconfig.json                    # Strict TypeScript configuration
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory (based on `.env.example`):

```bash
# Gemini AI API Key (Injected automatically in AI Studio)
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# Application URL
APP_URL="http://localhost:3000"

# PostgreSQL connection string (Optional; local resilient store is active by default)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mumbai_heritage_vault"

# JWT Secret for signing authentication tokens
JWT_SECRET="mumbai-heritage-secret-key-change-in-production-2026"

# Port (defaults to 3000)
PORT=3000
```

---

## 🗄️ Database Setup (PostgreSQL)

If running a live PostgreSQL database:

1. Create a database:
   ```bash
   createdb mumbai_heritage_vault
   ```
2. Execute the schema definitions:
   ```bash
   psql -d mumbai_heritage_vault -f database/schema.sql
   ```
3. Seed the verified historical records:
   ```bash
   psql -d mumbai_heritage_vault -f database/seed.sql
   ```

*Note: The application includes a resilient client and in-memory store so it functions 100% out of the box without requiring a live PostgreSQL instance.*

---

## 🚀 Running the Application

### 1. Development Mode (Full-Stack)
Runs the Express backend on port 3000 with Vite middlewares mounted in dev mode:
```bash
npm run dev
```

### 2. Production Build
```bash
npm run build
npm start
```

---

## 🤖 Connecting Gemini AI

The application integrates the modern `@google/genai` TypeScript SDK on the server-side (`server.ts`):

- **Model**: `gemini-3.8-flash`
- **Telemetry Header**: `'User-Agent': 'aistudio-build'`
- **Curatorial System Instruction**: Grounded strictly in verified facts about Mumbai heritage, prohibiting fabricated dates, architects, or events.
- **Graceful Fallback**: If the API key is not present or the network is offline, the internal verified knowledge engine answers verified queries with zero errors.

---

## 🔮 Future Enhancements

1. **3D Photogrammetry Models**: Integrating Three.js / WebGL scans of architectural carvings and cave stupas.
2. **Multilingual Narrations**: Adding Marathi (मराठी) and Hindi (हिंदी) audio guides for wider accessibility.
3. **Geo-Fenced Heritage Trails**: Mobile GPS notifications alerting walkers when approaching a Grade-I structure.
4. **Community Oral History Archive**: Enabling verified descendants of mill workers, Koli elders, and architects to record spoken memoirs.
