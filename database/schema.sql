-- ============================================================================
-- Mumbai HeritageVault - Digital Historical & Cultural Heritage Museum
-- Database Schema (PostgreSQL)
-- ============================================================================

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS ai_conversations CASCADE;
DROP TABLE IF EXISTS quiz_results CASCADE;
DROP TABLE IF EXISTS quiz_questions CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS virtual_exhibits CASCADE;
DROP TABLE IF EXISTS cultural_heritage CASCADE;
DROP TABLE IF EXISTS timeline_events CASCADE;
DROP TABLE IF EXISTS personalities CASCADE;
DROP TABLE IF EXISTS artifacts CASCADE;
DROP TABLE IF EXISTS museums CASCADE;
DROP TABLE IF EXISTS heritage_sites CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 1. USERS TABLE
CREATE TABLE users (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL DEFAULT 'visitor', -- 'visitor' | 'admin'
    profile_image TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. HERITAGE SITES TABLE
CREATE TABLE heritage_sites (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(64) NOT NULL, -- 'Monument', 'Museum', 'Fort', 'Cave', 'Heritage Building', 'Religious Heritage', 'Cultural Heritage', 'Market', 'Railway Heritage'
    description TEXT NOT NULL,
    historical_period VARCHAR(128) NOT NULL,
    year VARCHAR(64) NOT NULL,
    location VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    architectural_style VARCHAR(128),
    significance TEXT NOT NULL,
    unesco_status VARCHAR(64) DEFAULT 'None', -- 'UNESCO World Heritage Site', 'Tentative List', 'None'
    image TEXT NOT NULL,
    why_it_matters TEXT,
    architect VARCHAR(255),
    interesting_facts TEXT[], -- Array of interesting facts
    nearby_sites TEXT[],
    access_type VARCHAR(32) DEFAULT 'Free', -- 'Free', 'Ticketed', 'Restricted'
    references_source TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. MUSEUMS TABLE
CREATE TABLE museums (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    museum_type VARCHAR(128) NOT NULL,
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    image TEXT NOT NULL,
    opening_info_placeholder VARCHAR(255) DEFAULT 'Contact museum authority for current timings',
    website TEXT,
    collection_count INTEGER DEFAULT 1000,
    highlights TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. ARTIFACTS TABLE
CREATE TABLE artifacts (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL, -- 'Sculptures', 'Coins', 'Manuscripts', 'Paintings', 'Textiles', 'Tools', 'Decorative objects', 'Historical documents', 'Photographs'
    period VARCHAR(128) NOT NULL,
    material VARCHAR(128) NOT NULL,
    origin VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    significance TEXT NOT NULL,
    image TEXT NOT NULL,
    source VARCHAR(255) NOT NULL,
    museum_source VARCHAR(255),
    accession_number VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. PERSONALITIES TABLE
CREATE TABLE personalities (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    biography TEXT NOT NULL,
    birth_date VARCHAR(64),
    death_date VARCHAR(64),
    contribution TEXT NOT NULL,
    associated_places TEXT[],
    image TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. TIMELINE EVENTS TABLE
CREATE TABLE timeline_events (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    period VARCHAR(128) NOT NULL, -- 'Ancient & Early History', 'Medieval Period', 'Portuguese Period', 'British/Bombay Period', '19th Century', 'Early 20th Century', 'Indian Independence Movement', 'Post-Independence Mumbai', 'Modern Mumbai'
    date_display VARCHAR(64) NOT NULL,
    year_numeric INTEGER,
    description TEXT NOT NULL,
    related_locations TEXT[],
    related_personalities TEXT[],
    image TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. CULTURAL HERITAGE TABLE
CREATE TABLE cultural_heritage (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL, -- 'Communities', 'Food Heritage', 'Festivals', 'Performing Arts', 'Traditional Occupations'
    description TEXT NOT NULL,
    history TEXT NOT NULL,
    cultural_significance TEXT NOT NULL,
    related_locations TEXT[],
    image TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. VIRTUAL EXHIBITS TABLE
CREATE TABLE virtual_exhibits (
    id VARCHAR(64) PRIMARY KEY,
    room VARCHAR(128) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    historical_context TEXT NOT NULL,
    image TEXT NOT NULL,
    period VARCHAR(128) NOT NULL,
    audio_guide_placeholder TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. FAVORITES TABLE
CREATE TABLE favorites (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    item_type VARCHAR(64) NOT NULL, -- 'heritage_site', 'museum', 'artifact', 'personality', 'culture'
    item_id VARCHAR(64) NOT NULL,
    item_title VARCHAR(255),
    item_image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_item UNIQUE (user_id, item_type, item_id)
);

-- 10. QUIZ QUESTIONS TABLE
CREATE TABLE quiz_questions (
    id VARCHAR(64) PRIMARY KEY,
    category VARCHAR(64) NOT NULL,
    question TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_answer INTEGER NOT NULL, -- 0 for A, 1 for B, 2 for C, 3 for D
    explanation TEXT NOT NULL,
    difficulty VARCHAR(32) DEFAULT 'medium'
);

-- 11. QUIZ RESULTS TABLE
CREATE TABLE quiz_results (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    user_name VARCHAR(255) NOT NULL,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    category VARCHAR(64) NOT NULL,
    badge_earned VARCHAR(128),
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. AI CONVERSATIONS TABLE
CREATE TABLE ai_conversations (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    verified_sources TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_heritage_category ON heritage_sites(category);
CREATE INDEX idx_heritage_slug ON heritage_sites(slug);
CREATE INDEX idx_artifacts_category ON artifacts(category);
CREATE INDEX idx_timeline_period ON timeline_events(period);
CREATE INDEX idx_favorites_user ON favorites(user_id);
