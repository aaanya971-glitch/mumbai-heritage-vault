-- ============================================================================
-- Mumbai HeritageVault - Digital Historical & Cultural Heritage Museum
-- Database Seed Data (PostgreSQL)
-- Verified Mumbai historical facts, architectural lineages, and museums
-- ============================================================================

-- 1. USERS (Demo Admin & Demo Visitor)
-- Passwords hashed: Admin@123 and Visitor@123
INSERT INTO users (id, name, email, password_hash, role, bio) VALUES
('usr_admin_01', 'Heritage Curator Admin', 'admin@heritagevault.demo', '$2a$10$w8.hIkgVbIuY139xJ0oG3.j4z0x6KlmE9P/bK7hG02gZk8mB56T7W', 'admin', 'Senior Digital Archivist & Mumbai Architectural Historian'),
('usr_visitor_01', 'Arjun Deshmukh', 'visitor@heritagevault.demo', '$2a$10$w8.hIkgVbIuY139xJ0oG3.j4z0x6KlmE9P/bK7hG02gZk8mB56T7W', 'visitor', 'Student researcher in urban history and Mumbai heritage');

-- 2. HERITAGE SITES
INSERT INTO heritage_sites (id, name, slug, category, description, historical_period, year, location, latitude, longitude, architectural_style, significance, unesco_status, image, why_it_matters, architect, interesting_facts, nearby_sites, access_type, references_source) VALUES
(
    'site_csmt',
    'Chhatrapati Shivaji Maharaj Terminus (CSMT)',
    'csmt-terminus',
    'Railway Heritage',
    'Formerly Victoria Terminus, CSMT is an outstanding example of Victorian Gothic Revival architecture in India, blended with themes derived from Indian traditional architecture. Built over 10 years starting in 1878, it serves as the headquarters of Central Railway.',
    '19th Century',
    '1878–1887',
    'Chhatrapati Shivaji Maharaj Terminus Area, Fort, Mumbai, 400001',
    18.9398208,
    72.8354676,
    'Victorian Gothic Revival with Indo-Saracenic influences',
    'A UNESCO World Heritage Site recognized globally for exceptional 19th-century structural engineering, stone masonry, Italian marble interiors, and hand-carved gargoyles representing local fauna.',
    'UNESCO World Heritage Site',
    '/src/assets/images/csmt_victoria_terminus_1791209100224.jpg',
    'It marks the apex of the High Victorian Gothic era and was the ceremonial gate for the expansion of India''s railway network, transforming Bombay from a collection of seven islands into an international trading metropolis.',
    'Frederick William Stevens (Assisted by Axel Haig and students of Sir J.J. School of Art)',
    ARRAY[
        'Took a full decade to construct from 1878 to 1887, opening on Queen Victoria''s Golden Jubilee.',
        'The massive central octagonal dome is topped by a 14-foot colossal stone figure representing "Progress".',
        'Wood carvings, tiles, ornamental brass and iron railings were crafted by master artisans from Sir J.J. School of Art.',
        'Features grotesque gargoyles, lions, and peacocks integrated into classical Gothic buttresses.'
    ],
    ARRAY['Municipal Corporation Building', 'Crawford Market', 'Asiatic Society Library'],
    'Free',
    'UNESCO World Heritage Centre, Inscription 945rev; Archaeological Survey of India (ASI)'
),
(
    'site_gateway',
    'Gateway of India',
    'gateway-of-india',
    'Monument',
    'An iconic 20th-century arch monument overlooking the Arabian Sea at the tip of Apollo Bunder. Erected to commemorate the landing of King George V and Queen Mary in December 1911, and later the ceremonial exit point for the last British troops in 1948.',
    'Early 20th Century',
    '1914–1924',
    'Apollo Bandar, Colaba, Mumbai, 400001',
    18.9219841,
    72.8346543,
    'Indo-Saracenic with Gujarati architectural detailing',
    'The ceremonial gateway through which viceroys and governors entered British India, and the site where the Somerset Light Infantry departed on 28 February 1948, marking the symbolic end of British rule.',
    'None',
    '/src/assets/images/gateway_of_india_1791209115560.jpg',
    'Stands as the defining physical landmark of Mumbai''s maritime identity, embodying the synthesized architectural language of Islamic domes, Gujarati jali work, and Roman triumphal arches.',
    'George Wittet (Superintending Architect to the Government of Bombay)',
    ARRAY[
        'Constructed from honey-colored yellow basalt stone quarried locally from Kharodi in Raigad.',
        'The central dome measures 48 feet in diameter and rises 83 feet above ground.',
        'The foundation stone was laid on 31 March 1911 by Sir George Sydenham Clarke, Governor of Bombay.',
        'The First Battalion of the Somerset Light Infantry marched through the archway onto the ship Empress of Australia in 1948.'
    ],
    ARRAY['Taj Mahal Palace Hotel', 'CSMVS Museum', 'Colaba Causeway'],
    'Free',
    'Maharashtra State Directorate of Archaeology and Museums; Mumbai Heritage Conservation Committee (MHCC)'
),
(
    'site_kanheri',
    'Kanheri Caves',
    'kanheri-caves',
    'Cave',
    'A vast Buddhist rock-cut monastic complex comprising 109 caves carved into the basalt hills of the Sanjay Gandhi National Park. Ranging from the 1st century BCE to the 10th century CE, it was a vital hub on ancient maritime trade routes connecting Sopara and Kalyan.',
    'Ancient & Early History',
    '1st Century BCE – 10th Century CE',
    'Sanjay Gandhi National Park, Borivali East, Mumbai, 400066',
    19.206111,
    72.906389,
    'Rock-cut Buddhist Maurya, Satavahana, and Rashtrakuta Architecture',
    'One of the largest Buddhist monastic university complexes in western India, featuring massive prayer halls (chaityas), residential cells (viharas), rock-cut water cisterns (podhis), and ancient Brahmi inscriptions.',
    'None',
    '/src/assets/images/kanheri_caves_sculpture_1791209128401.jpg',
    'Kanheri demonstrates over 1,000 years of continuous Buddhist spiritual, architectural, and educational heritage within Mumbai''s modern geographic bounds.',
    'Built by Buddhist monks with patronage from merchants and royal dynasties (Satavahanas, Traikutakas, Rashtrakutas)',
    ARRAY[
        'The name derives from the Sanskrit "Krishnagiri" meaning "Black Mountain".',
        'Cave 3 contains an ancient 5th-century Avalokiteshvara figure with eleven heads and a 22-foot colossal standing Buddha.',
        'Ingenious rain-harvesting cisterns cut into rock kept water cool and fresh for monks throughout arid summers.',
        'Over 50 epigraphic inscriptions in Brahmi, Devanagari, and Pahlavi script document international trade connections.'
    ],
    ARRAY['Sanjay Gandhi National Park', 'Mandapeshwar Caves', 'Jogeshwari Caves'],
    'Ticketed',
    'Archaeological Survey of India (ASI) - Mumbai Circle, Ancient Monuments and Archaeological Sites and Remains Act'
),
(
    'site_csmvs',
    'Chhatrapati Shivaji Maharaj Vastu Sangrahalaya (CSMVS)',
    'csmvs-museum',
    'Museum',
    'Formerly known as the Prince of Wales Museum of Western India, CSMVS is Mumbai''s premier art and history museum. Located in the Kala Ghoda Art District, it houses over 70,000 artifacts across art, archaeology, and natural history.',
    'Early 20th Century',
    '1905–1922',
    '159-161, Mahatma Gandhi Road, Kala Ghoda, Fort, Mumbai, 400023',
    18.926861,
    72.832722,
    'Indo-Saracenic (Mughal, Maratha, and Jain motifs)',
    'Recipient of the UNESCO Asia-Pacific Award for Cultural Heritage Conservation (Award of Excellence 2022). Home to priceless Indus Valley antiquities, Mughal miniatures, and Gandharan sculptures.',
    'None',
    '/src/assets/images/csmvs_museum_gallery_1791209142918.jpg',
    'CSMVS represents the cultural heart of Mumbai, bridging centuries of Indian craftsmanship, imperial histories, and community educational initiatives in a majestic palm garden.',
    'George Wittet',
    ARRAY[
        'Its white marble dome was inspired directly by the Gol Gumbaz of Vijayapura (Bijapur).',
        'During World War I, before opening to the public, the building served as a military hospital for wounded soldiers.',
        'Surrounded by formal gardens with palm trees, fountains, and period stone statues.',
        'Houses rare terracotta relics from Harappa and Mohenjo-daro dating back to 2500 BCE.'
    ],
    ARRAY['Jehangir Art Gallery', 'National Gallery of Modern Art (NGMA)', 'University of Mumbai'],
    'Ticketed',
    'Trustees of Chhatrapati Shivaji Maharaj Vastu Sangrahalaya; UNESCO Heritage Awards Archive'
),
(
    'site_high_court',
    'Bombay High Court',
    'bombay-high-court',
    'Heritage Building',
    'Part of the Victorian Gothic and Art Deco Ensembles of Mumbai World Heritage Site, this magnificent neo-Gothic court building was initiated in 1871 and inaugurated in November 1878. Constructed in black stone with grand arches and carved spiral staircases.',
    '19th Century',
    '1871–1878',
    'Dr. Kane Road, Fort, Mumbai, 400032',
    18.929556,
    72.830278,
    'Victorian Gothic Revival',
    'One of the oldest High Courts in India, chartered under the High Courts Act of 1861, where stalwarts of the Indian Bar including Dr. B.R. Ambedkar and Bal Gangadhar Tilak practiced law.',
    'UNESCO World Heritage Site',
    '/src/assets/images/mumbai_heritage_hero_1791209085207.jpg',
    'An indispensable pillar of Indian constitutional and legal history, representing the institutional architecture of justice facing the Oval Maidan.',
    'Colonel J.A. Fuller, Royal Engineers',
    ARRAY[
        'Constructed using blue basalt stone with bandings of Kurla buff stone and Porbandar stone.',
        'Stone carvings over columns include monkeys wearing judge wigs and foxes in lawyer robes, subtle satirical touches by stone carvers.',
        'Dr. B.R. Ambedkar was enrolled here as an advocate in 1923 and fought landmark constitutional battles.',
        'Forms part of the historic uninterrupted vista looking westward towards Art Deco residential facades across the Oval Maidan.'
    ],
    ARRAY['University of Mumbai & Rajabai Tower', 'Oval Maidan', 'Asiatic Society Library'],
    'Restricted',
    'Bombay High Court Registry Archives; UNESCO World Heritage Inscription 1480'
),
(
    'site_rajabai',
    'Rajabai Clock Tower & University of Mumbai',
    'rajabai-clock-tower',
    'Heritage Building',
    'A 280-foot clock tower situated within the Fort campus of the University of Mumbai. Modeled by Sir George Gilbert Scott on Big Ben in London, it was funded by the merchant and broker Premchand Roychand, who named it in honor of his mother Rajabai.',
    '19th Century',
    '1869–1878',
    'University of Mumbai Fort Campus, Karmaveer Bhaurao Patil Marg, Mumbai, 400032',
    18.929722,
    72.830556,
    'Venetian and Victorian Gothic Revival',
    'World Heritage monument housing the historic University Library, famous for stained glass windows, teakwood ceilings, and 24 stone statues representing castes and costumes of 19th-century India.',
    'UNESCO World Heritage Site',
    '/src/assets/images/csmt_victoria_terminus_1791209100224.jpg',
    'Premchand Roychand donated ₹2,00,000 in 1864 so that his blind mother Rajabai, a devout Jain, could know the time by the tolling of the bell and break her fast before sunset.',
    'Sir George Gilbert Scott (London) & Rao Bahadur Mukund Ramchandra (Executive Engineer)',
    ARRAY[
        'During British rule, the tower chimes played sixteen different tunes including "Rule Britannia" and "Home! Sweet Home!".',
        'Features 24 statues depicting Indian regional attire sculpted by students of Sir J.J. School of Art.',
        'The library hall contains pristine stained glass manufactured in London by Heaton, Butler and Bayne.',
        'Premchand Roychand, who made a fortune in cotton during the American Civil War, donated the funds with no architectural control, requesting only the name.'
    ],
    ARRAY['Bombay High Court', 'CSMVS Museum', 'Flora Fountain'],
    'Restricted',
    'University of Mumbai Archives; UNESCO World Heritage Inscription 1480'
),
(
    'site_asiatic',
    'Town Hall & The Asiatic Society of Mumbai',
    'asiatic-society-town-hall',
    'Heritage Building',
    'Overlooking Horniman Circle (formerly Elphinstone Circle), the Town Hall is an imposing neoclassical structure featuring a monumental flight of 30 granite steps and eight Doric columns imported from England.',
    '19th Century',
    '1820–1833',
    'Shahid Bhagat Singh Road, Fort, Mumbai, 400023',
    18.931667,
    72.837222,
    'Neoclassical / Greek Revival',
    'Houses the Asiatic Society Library containing over 100,000 books, rare manuscripts including a 14th-century Italian manuscript of Dante''s Divine Comedy, and an original 1804 charter of the Literary Society of Bombay.',
    'None',
    '/src/assets/images/mumbai_heritage_hero_1791209085207.jpg',
    'It is the civic cradle of Bombay''s intellectual and administrative life, where public town meetings, civic receptions, and momentous declarations took place.',
    'Colonel Thomas Cowper, Bombay Engineers',
    ARRAY[
        'Houses one of only two known original manuscript copies of Dante''s Divine Comedy from 1350.',
        'The 30 grand exterior steps serve as Mumbai''s favorite cultural gathering space and filming location.',
        'The Asiatic Society was founded in 1804 by Sir James Mackintosh as the Literary Society of Bombay.',
        'Contains ancient coins of the Gupta, Satavahana, and Roman empires uncovered in Western India.'
    ],
    ARRAY['Horniman Circle Garden', 'St. Thomas Cathedral', 'RBI Monetary Museum'],
    'Free',
    'The Asiatic Society of Mumbai Council Records; Government of Maharashtra Heritage Directory'
),
(
    'site_crawford',
    'Crawford Market (Mahatma Jyotirao Phule Mandai)',
    'crawford-market',
    'Market',
    'Built in 1869, Crawford Market is one of South Mumbai''s most vibrant covered markets. Named after Arthur Crawford, the first Municipal Commissioner of Bombay, and renamed after the social reformer Mahatma Jyotirao Phule.',
    '19th Century',
    '1865–1869',
    'Dhobi Talao, Chhatrapati Shivaji Maharaj Terminus Area, Fort, Mumbai, 400001',
    18.947222,
    72.834444,
    'Norman and Flemish Gothic architecture',
    'First building in India to be lit by electricity in 1882. Notable for exterior stone bas-reliefs sculpted by John Lockwood Kipling (father of author Rudyard Kipling).',
    'None',
    '/src/assets/images/csmt_victoria_terminus_1791209100224.jpg',
    'It marks the transition of Mumbai from unorganized bazaars into planned Victorian civic infrastructure, immortalized by John Lockwood Kipling''s stone friezes celebrating Indian farmers and laborers.',
    'William Emerson (Stone bas-reliefs by John Lockwood Kipling)',
    ARRAY[
        'John Lockwood Kipling was principal of Sir J.J. School of Art when he carved the entrance friezes depicting Indian agrarian life.',
        'The market tower rises 128 feet and features a historic clock face visible across the Crawford plaza.',
        'In 1882, it became the very first building in India illuminated with electric arc lamps.',
        'Constructed using Kurla buff stone and coarse red Porbandar stone.'
    ],
    ARRAY['CSMT Station', 'Zaveri Bazaar', 'Mangaldas Market'],
    'Free',
    'Brihanmumbai Municipal Corporation (BMC) Heritage Cell; Sir J.J. School of Art Archives'
),
(
    'site_worli_fort',
    'Worli Fort',
    'worli-fort',
    'Fort',
    'A 17th-century coastal fortress situated on the promontory of Worli Hill, built by the British East India Company around 1675 to guard Mahim Bay against pirate attacks and Portuguese incursions.',
    'Portuguese Period',
    'Circa 1675',
    'Worli Koliwada, Worli, Mumbai, 400030',
    19.023889,
    72.816667,
    'Colonial British Coastal Bastion',
    'An authentic lookout fort integrated seamlessly into Worli Koliwada, one of Mumbai''s oldest indigenous fishing villages, offering panoramic views of Mahim Bay and the Bandra-Worli Sea Link.',
    'None',
    '/src/assets/images/gateway_of_india_1791209115560.jpg',
    'Embodies the maritime defense ring created by European powers across the Seven Islands of Bombay and the living continuity of Mumbai''s Koli community.',
    'British East India Company military engineers',
    ARRAY[
        'Erected during the governorship of Gerald Aungier when Bombay was heavily fortified.',
        'Houses an ancient Hanuman shrine and historic cannon embrasures inside its ramparts.',
        'Located in the heart of Worli Koliwada, where centuries-old fishing and dry-fish drying traditions continue today.',
        'Provides an extraordinary juxtapositional vantage point between 17th-century stone bastions and the 21st-century Sea Link.'
    ],
    ARRAY['Bandra-Worli Sea Link', 'Mahim Fort', 'Siddhivinayak Temple'],
    'Free',
    'Maharashtra Maritime Board; Archaeological Survey of India (State Directorate)'
),
(
    'site_sion_fort',
    'Sion Hillock Fort',
    'sion-fort',
    'Fort',
    'Constructed between 1669 and 1677 by the British Governor Gerald Aungier atop a conical hillock, marking the historic boundary between British-held Parel island and Portuguese Salsette island.',
    'British/Bombay Period',
    '1669–1677',
    'Sion East, Mumbai, 400022',
    19.046944,
    72.867778,
    'British Colonial Hilltop Defense Bastion',
    'A protected monument of the Archaeological Survey of India, maintaining remnants of fortification walls, stone bastions, and a vantage point over the historical creek that separated Bombay from Salsette.',
    'None',
    '/src/assets/images/kanheri_caves_sculpture_1791209128401.jpg',
    'Marks the historic geopolitical frontier between British and Portuguese territories in 17th-century Mumbai prior to the reclamation of the tidal channels.',
    'Commissioned by Gerald Aungier, Governor of Bombay',
    ARRAY[
        'Declared a protected heritage monument under the Archaeological Survey of India in 1925.',
        'Served as a strategic signaling post with lines of sight to Sewri Fort, Worli Fort, and Mahim Fort.',
        'A historic garden maintains pathways leading to the highest bastion overlooking the Sion railway junction.',
        'Features an ancient stone watchtower with gun loops for musketry.'
    ],
    ARRAY['Mahim Fort', 'Sewri Fort', 'Dharavi Art and Leather District'],
    'Free',
    'ASI Mumbai Circle; Monument Notification No. 1289 (1925)'
);

-- 3. MUSEUMS
INSERT INTO museums (id, name, description, location, museum_type, latitude, longitude, image, opening_info_placeholder, website, collection_count, highlights) VALUES
(
    'mus_csmvs',
    'Chhatrapati Shivaji Maharaj Vastu Sangrahalaya (CSMVS)',
    'Mumbai’s premier museum of art, archaeology, and natural history, set in magnificent heritage gardens. Features world-renowned galleries of Indian miniature paintings, Himalayan art, European oil paintings, and Harappan antiquities.',
    '159-161, Mahatma Gandhi Road, Kala Ghoda, Fort, Mumbai, 400023',
    'Art, Archaeology & Natural History',
    18.926861,
    72.832722,
    '/src/assets/images/csmvs_museum_gallery_1791209142918.jpg',
    'Generally open Tuesday to Sunday, 10:15 AM to 6:00 PM (verify with museum before visiting)',
    'https://csmvs.gov.in',
    70000,
    ARRAY['Indus Valley Civilization Seals', 'Mughal & Rajasthani Miniatures', 'Gandhara Sculptures', 'Japanese & Chinese Porcelain']
),
(
    'mus_bhau_daji_lad',
    'Dr. Bhau Daji Lad Mumbai City Museum',
    'Established in 1855 as the Central Museum of Natural History, Economy, Geology, Industry and Arts, this is Mumbai’s oldest museum. Located inside Jijamata Udyan in Byculla, it is an exquisite example of High Victorian decorative design.',
    '91 A, Rani Baug, Veer Mata Jijabai Bhonsle Udyan, Dr Baba Saheb Ambedkar Rd, Byculla East, Mumbai, 400027',
    'City History & Decorative Arts',
    18.978611,
    72.834444,
    '/src/assets/images/csmt_victoria_terminus_1791209100224.jpg',
    'Generally open Thursday to Tuesday, 10:00 AM to 5:30 PM (Wednesday closed; verify before visiting)',
    'https://bdlmuseum.org',
    21000,
    ARRAY['19th-Century Mumbai Dioramas', 'Kala Azar & Bidri Ware Collection', 'The Original Elephanta Island Basalt Elephant', 'Minton encaustic tiled flooring']
),
(
    'mus_mani_bhavan',
    'Mani Bhavan Gandhi Sangrahalaya',
    'A focal point of India''s freedom struggle, Mani Bhavan was Mahatma Gandhi''s Bombay headquarters between 1917 and 1934. It was from here that the Non-Cooperation, Satyagraha, Swadeshi, Khadi, and Civil Disobedience movements were planned.',
    '19, Laburnum Road, Gamdevi, Mumbai, 400007',
    'Biographical & Freedom Movement Museum',
    18.959722,
    72.812778,
    '/src/assets/images/mumbai_heritage_hero_1791209085207.jpg',
    'Generally open all 7 days from 9:30 AM to 5:30 PM (verify before visiting)',
    'https://gandhimanibhavan.org',
    5000,
    ARRAY['Gandhiji''s Preserved Bedroom and Charkhas', 'Historic Picture Gallery of Freedom Struggle', 'The 1932 Letter to Adolf Hitler', 'Library of over 50,000 Gandhian volumes']
),
(
    'mus_rbi',
    'RBI Monetary Museum',
    'Established by the Reserve Bank of India to document the numismatic heritage of the Indian subcontinent, from ancient punch-marked coins to paper currency, promissory notes, and modern decimal coinage.',
    'Amar Building, Sir Phirozeshah Mehta Road, Fort, Mumbai, 400001',
    'Numismatics & Economic History',
    18.934444,
    72.833889,
    '/src/assets/images/gateway_of_india_1791209115560.jpg',
    'Generally open Tuesday to Sunday, 10:45 AM to 5:15 PM (Closed Mondays and RBI holidays)',
    'https://museum.rbi.org.in',
    10000,
    ARRAY['6th Century BCE Punch-Marked Coins', 'Kushan Gold Dinars', 'Mughal Mohurs of Emperor Akbar', 'Early British East India Company Banknotes']
),
(
    'mus_nehru_science',
    'Nehru Science Centre',
    'India’s largest interactive science centre, located in Worli. Developed to popularize scientific inquiry, industrial heritage, and the technological evolution of Mumbai''s maritime, rail, and manufacturing industries.',
    'Opposite 4 Seasons Hotel, Dr. E. Moses Road, Worli, Mumbai, 400018',
    'Science, Technology & Industrial Heritage',
    18.990278,
    72.818333,
    '/src/assets/images/csmvs_museum_gallery_1791209142918.jpg',
    'Open 7 days a week, 9:30 AM to 6:00 PM (verify before visiting)',
    'https://nehrusciencecentre.gov.in',
    15000,
    ARRAY['Historic Steam Locomotive and Tram Car', 'Evolution of Communication Gallery', 'Interactive Sound & Light Hall', 'Prehistoric Animal Life Models']
);

-- 4. ARTIFACTS
INSERT INTO artifacts (id, name, category, period, material, origin, description, significance, image, source, museum_source, accession_number) VALUES
(
    'art_01',
    'The Elephanta Basalt Monolithic Elephant',
    'Sculptures',
    'Medieval Period (6th Century CE)',
    'Black Basalt Stone',
    'Gharapuri (Elephanta Island), Mumbai Harbour',
    'A colossal monolithic elephant sculpture that originally stood near the boat landing of Elephanta Island, giving the island its colonial name during Portuguese contact in the 16th century.',
    'It is the namesake relic of the Elephanta Island UNESCO World Heritage site, reassembled in 1914 and installed in the gardens of Dr. Bhau Daji Lad Museum.',
    '/src/assets/images/kanheri_caves_sculpture_1791209128401.jpg',
    'Dr. Bhau Daji Lad Museum Collection',
    'Dr. Bhau Daji Lad Museum',
    'BDL-SC-1914-01'
),
(
    'art_02',
    'Silver Punch-Marked Coin of the Mauryan Empire',
    'Coins',
    'Ancient & Early History (3rd Century BCE)',
    'Silver alloy',
    'Found near Sopara (Nala Sopara port, Mumbai region)',
    'Karshapana coin bearing five distinct stamped punch symbols including the sun, six-armed wheel, and three-arched hill with crescent, used across ancient trading ports of the Konkan coast.',
    'Demonstrates the deep integration of the northern Konkan maritime trade network with the pan-Indian Mauryan economy under Emperor Ashoka.',
    '/src/assets/images/csmvs_museum_gallery_1791209142918.jpg',
    'RBI Monetary Museum & CSMVS Numismatics Gallery',
    'RBI Monetary Museum',
    'RBI-COIN-ANC-084'
),
(
    'art_03',
    'Gilt Bronze Maitreya from Kanheri',
    'Sculptures',
    'Medieval Period (8th Century CE)',
    'Gilt Bronze',
    'Kanheri Cave Complex, Salsette Island',
    'A finely detailed bronze representation of Maitreya, the future Buddha, wearing elaborate monastic robes and standing in abhaya mudra with lotus crest.',
    'Reflects the artistic sophistication of the western Deccan bronze ateliers patronized by maritime merchants along the trade routes of Salsette.',
    '/src/assets/images/kanheri_caves_sculpture_1791209128401.jpg',
    'CSMVS Archaeology & Sculpture Gallery',
    'CSMVS Museum',
    'CSMVS-MET-1922-34'
),
(
    'art_04',
    '14th Century Illuminated Dante''s Divine Comedy',
    'Manuscripts',
    'Medieval Period (Circa 1350 CE)',
    'Vellum / Hand-inked parchment with gold leaf',
    'Florence, Italy (Gifted to the Literary Society of Bombay by Mountstuart Elphinstone)',
    'One of only two known original handwritten Italian copies of Dante Alighieri''s Divina Commedia from the 14th century, preserved in extraordinary condition.',
    'Considered one of the greatest literary treasures in Asia; Benito Mussolini once offered £1 million in the 1930s to acquire it, which the Asiatic Society politely declined.',
    '/src/assets/images/mumbai_heritage_hero_1791209085207.jpg',
    'The Asiatic Society of Mumbai Rare Manuscripts Room',
    'Asiatic Society of Mumbai',
    'ASM-MS-DANTE-01'
),
(
    'art_05',
    'Model of Mumbai Textile Mill & Chawl Settlement',
    'Tools',
    '19th Century (Circa 1890)',
    'Teakwood, Brass, and Plaster',
    'Girangaon (The Village of Mills), Central Mumbai',
    'A detailed scale diorama demonstrating the operation of early steam-driven cotton looms and the social architecture of worker chawls in Parel and Lalbaug.',
    'Girangaon comprised over 130 operational cotton textile mills that attracted hundreds of thousands of migrant workers, forging modern Marathi working-class culture.',
    '/src/assets/images/csmt_victoria_terminus_1791209100224.jpg',
    'Dr. Bhau Daji Lad Museum Diorama Archive',
    'Dr. Bhau Daji Lad Museum',
    'BDL-IND-1890-42'
);

-- 5. HISTORICAL PERSONALITIES
INSERT INTO personalities (id, name, role, biography, birth_date, death_date, contribution, associated_places, image) VALUES
(
    'per_shankarseth',
    'Nana Jagannath Shankarseth',
    'Philanthropist, Reformer & Modern Architect of Bombay',
    'Known as the "Architect of Modern Mumbai", Shankarseth was an Indian philanthropist and educational visionary. He co-founded the Great Indian Peninsula Railway, the Native School Book Society, and funded the development of Victoria Gardens and JJ School of Art.',
    '10 February 1803',
    '31 July 1865',
    'Championed the introduction of the first railway line in Asia (Bombay to Thane, 1853), modernized higher education for women and indigenous communities, and served as the first Indian member of the Bombay Legislative Council.',
    ARRAY['CSMT Station Area', 'Dr. Bhau Daji Lad Museum', 'Elphinstone College', 'Girgaon'],
    '/src/assets/images/mumbai_heritage_hero_1791209085207.jpg'
),
(
    'per_jejeebhoy',
    'Sir Jamsetjee Jejeebhoy, 1st Baronet',
    'Merchant, Global Philanthropist & Civic Leader',
    'A Parsi-Indian merchant prince and humanitarian who amassed a fortune in the China tea and silk trade and redirected his wealth into transforming Mumbai''s civic infrastructure, hospitals, waterworks, and educational foundations.',
    '15 July 1783',
    '14 April 1859',
    'Endowed the Sir Jamsetjee Jeejebhoy Hospital (JJ Hospital), Sir J.J. School of Art, the Mahim Causeway linking Salsette to Mahim island, and water reservoirs across Pune and Bombay.',
    ARRAY['Sir J.J. School of Art', 'Mahim Causeway', 'Byculla', 'Fort'],
    '/src/assets/images/csmvs_museum_gallery_1791209142918.jpg'
),
(
    'per_naoroji',
    'Dadabhai Naoroji ("The Grand Old Man of India")',
    'Statesman, Economist & Freedom Pioneer',
    'Born in Navsari and educated in Bombay at Elphinstone College, Naoroji was the first Asian to be elected to the British Parliament (House of Commons). Author of the seminal "Poverty and Un-British Rule in India" detailing the economic drain theory.',
    '4 September 1825',
    '30 June 1917',
    'Pioneered the economic critique of colonial rule, co-founded the Indian National Congress in Bombay in 1885, and mentor to Gopal Krishna Gokhale and Mahatma Gandhi.',
    ARRAY['Elphinstone College', 'D.N. Road Heritage Mile', 'Gowalia Tank'],
    '/src/assets/images/csmt_victoria_terminus_1791209100224.jpg'
),
(
    'per_ambedkar',
    'Dr. Bhimrao Ramji Ambedkar',
    'Chief Architect of the Indian Constitution, Jurist & Social Crusader',
    'Leader of the Dalit movement, scholar, and the primary draftsman of the Constitution of India. Lived and studied in Mumbai, enrolled as an advocate at the Bombay High Court, and established Siddharth College and Milind College.',
    '14 April 1891',
    '6 December 1956',
    'Authored the Constitution of the Republic of India, established institutional protections against caste discrimination, and led landmark social agitations like the Mahad Satyagraha.',
    ARRAY['Bombay High Court', 'Rajgriha (Dadar Hindu Colony)', 'Chaitya Bhoomi (Dadar Chowpatty)'],
    '/src/assets/images/gateway_of_india_1791209115560.jpg'
),
(
    'per_gandhi',
    'Mahatma Mohandas Karamchand Gandhi',
    'Father of the Nation & Leader of the Indian Independence Movement',
    'Gandhi''s strategic home in Bombay was Mani Bhavan on Laburnum Road. From this unassuming mansion in Gamdevi, he launched landmark national non-violent campaigns that galvanized millions of Indians across all faiths.',
    '2 October 1869',
    '30 January 1948',
    'Launched the historic Quit India Resolution on 8 August 1942 at Gowalia Tank Maidan (August Kranti Maidan) in Mumbai, declaring "Do or Die" to the British colonial administration.',
    ARRAY['Mani Bhavan', 'August Kranti Maidan', 'Chowpatty Beach'],
    '/src/assets/images/mumbai_heritage_hero_1791209085207.jpg'
);

-- 6. TIMELINE EVENTS
INSERT INTO timeline_events (id, title, period, date_display, year_numeric, description, related_locations, related_personalities, image) VALUES
(
    'time_01',
    'Rock-cut Excavations at Kanheri and Elephanta',
    'Ancient & Early History',
    'Circa 200 BCE – 600 CE',
    -200,
    'Buddhist monks sculpt elaborate chaityas and viharas out of the volcanic basalt at Kanheri on Salsette Island. At Elephanta Island in the harbour, colossal rock-cut Shaivite cave temples featuring the celebrated Sadashiva Trimurti are carved.',
    ARRAY['Kanheri Caves', 'Elephanta Caves', 'Sopara'],
    ARRAY['Satavahana Kings', 'Rashtrakuta Dynasts'],
    '/src/assets/images/kanheri_caves_sculpture_1791209128401.jpg'
),
(
    'time_02',
    'The Raja Bhimdev Settlement of Mahikawati',
    'Medieval Period',
    'Circa 1290 CE',
    1290,
    'King Bhimdev establishes his capital at Mahikawati (modern-day Mahim), bringing Pathare Prabhu, Bhandari, and Agris communities, constructing temples, and establishing Mumbai’s first urban court administrative system.',
    ARRAY['Mahim', 'Prabhadevi', 'Walkeshwar'],
    ARRAY['Raja Bhimdev'],
    '/src/assets/images/gateway_of_india_1791209115560.jpg'
),
(
    'time_03',
    'Portuguese Treaty of Bassein and Manor Estates',
    'Portuguese Period',
    '1534 CE',
    1534,
    'Sultan Bahadur Shah of Gujarat cedes the Seven Islands of Bombay and Bassein (Vasai) to the Portuguese Empire under Nuno da Cunha. Portuguese Franciscan and Jesuit orders erect coastal churches and fortresses at Mahim, Worli, and Bandra.',
    ARRAY['Bassein Fort', 'Bandra Fort', 'St. Michael Church Mahim'],
    ARRAY['Nuno da Cunha', 'Garcia de Orta'],
    '/src/assets/images/mumbai_heritage_hero_1791209085207.jpg'
),
(
    'time_04',
    'Royal Dowry Treaty and British Crown Acquisition',
    'British/Bombay Period',
    '1661–1668 CE',
    1661,
    'The Seven Islands of Bombay are transferred by King Afonso VI of Portugal to King Charles II of England as part of the royal dowry for Princess Catherine of Braganza. In 1668, Charles II leases the islands to the British East India Company for £10 of gold per year.',
    ARRAY['Bombay Castle', 'Fort St. George', 'Colaba'],
    ARRAY['Gerald Aungier', 'Humphrey Cooke'],
    '/src/assets/images/mumbai_heritage_hero_1791209085207.jpg'
),
(
    'time_05',
    'Hornby Vellard and the Reclamation of the Seven Islands',
    '19th Century',
    '1782–1845 CE',
    1782,
    'Governor William Hornby constructs the Hornby Vellard causeway to plug the Great Breach at Mahalaxmi, preventing tidal inundation of the central marshlands. Subsequent civil engineering projects merge the original Seven Islands into one contiguous landmass.',
    ARRAY['Mahalaxmi', 'Breach Candy', 'Haji Ali Causeway'],
    ARRAY['Governor William Hornby'],
    '/src/assets/images/csmt_victoria_terminus_1791209100224.jpg'
),
(
    'time_06',
    'First Passenger Railway in Asia (Bombay to Thane)',
    '19th Century',
    '16 April 1853',
    1853,
    'At 3:35 PM, the first commercial passenger train in Asia steams out of Bori Bunder station (now CSMT site) hauling 14 carriages and 400 guests over 21 miles to Thane, powered by three steam locomotives named Sindh, Sultan, and Sahib.',
    ARRAY['CSMT (Bori Bunder)', 'Sion', 'Thane'],
    ARRAY['Nana Jagannath Shankarseth', 'Sir Jamsetjee Jejeebhoy'],
    '/src/assets/images/csmt_victoria_terminus_1791209100224.jpg'
),
(
    'time_07',
    'Birth of the Indian National Congress',
    '19th Century',
    '28 December 1885',
    1885,
    '72 delegates from across India gather at Gokuldas Tejpal Sanskrit College near Gowalia Tank in Bombay, forming the Indian National Congress to fight for self-governance and democratic rights.',
    ARRAY['Gokuldas Tejpal College', 'August Kranti Maidan', 'Girgaon'],
    ARRAY['Dadabhai Naoroji', 'Allan Octavian Hume', 'W.C. Bonnerjee'],
    '/src/assets/images/mumbai_heritage_hero_1791209085207.jpg'
),
(
    'time_08',
    'Quit India Movement Launched at Gowalia Tank',
    'Indian Independence Movement',
    '8 August 1942',
    1942,
    'The All-India Congress Committee meets at Gowalia Tank Maidan in South Mumbai. Mahatma Gandhi delivers his fiery "Do or Die" speech, sparking the nationwide Quit India civil resistance movement against colonial rule.',
    ARRAY['August Kranti Maidan', 'Mani Bhavan'],
    ARRAY['Mahatma Gandhi', 'Aruna Asaf Ali', 'Maulana Abul Kalam Azad'],
    '/src/assets/images/mumbai_heritage_hero_1791209085207.jpg'
),
(
    'time_09',
    'Samyukta Maharashtra Movement and Modern Mumbai',
    'Post-Independence Mumbai',
    '1 May 1960',
    1960,
    'Following intense mass democratic mobilization led by the Samyukta Maharashtra Samiti, the bilingual Bombay State is reorganized. The historic state of Maharashtra is inaugurated with Mumbai as its proud capital city.',
    ARRAY['Flora Fountain (Hutatma Chowk)', 'Shivaji Park'],
    ARRAY['Acharya Atre', 'S.A. Dange', 'Senapati Bapat'],
    '/src/assets/images/gateway_of_india_1791209115560.jpg'
);

-- 7. CULTURAL HERITAGE
INSERT INTO cultural_heritage (id, title, category, description, history, cultural_significance, related_locations, image) VALUES
(
    'cul_koli',
    'Koli Fisherfolk Community Heritage',
    'Communities',
    'The Kolis are the indigenous fisherfolk of Mumbai who inhabited the Seven Islands centuries before colonial arrival. They maintain their distinctive dialect, traditional seafaring knowledge, customs, and matriarchal fish-vending networks.',
    'Dating back over 2,000 years, the Kolis named several of Mumbai’s islands and localities, including Mumbadevi (from whom Mumbai gets its modern name), Kolaba (Colaba), and Worli.',
    'Their deep connection to the Arabian Sea, reverence for sea goddess Hinglaj Mata and Mumbadevi, and sustainable tidal fishing practices represent the primordial foundation of Mumbai''s cultural identity.',
    ARRAY['Worli Koliwada', 'Versova Koliwada', 'Cuffe Parade', 'Mumbadevi Temple'],
    '/src/assets/images/gateway_of_india_1791209115560.jpg'
),
(
    'cul_irani_cafe',
    'Irani Café Tradition & Culinary Culture',
    'Food Heritage',
    'Irani cafés were established by Zoroastrian and Bahá''í Iranian immigrants in the late 19th and early 20th centuries. Renowned for bentwood Thonet chairs, marble-topped tables, etched mirrors, Brun Maska, and steaming cups of spiced Irani chai.',
    'Situated predominantly at road corners, Irani cafés were among the first non-segregated secular spaces in colonial Bombay where people of all castes, religions, and economic classes gathered freely.',
    'An indelible cultural pillar of Mumbai''s urban cosmopolitanism, immortalized in modern Indian literature, poetry, and nostalgia.',
    ARRAY['Fort Heritage District', 'Dhobi Talao', 'Grant Road', 'Colaba'],
    '/src/assets/images/mumbai_heritage_hero_1791209085207.jpg'
),
(
    'cul_ganesh_utsav',
    'Sarvajanik Ganeshotsav Festival Tradition',
    'Festivals',
    'The 10-day community celebration honoring Lord Ganesha, transformed by freedom fighter Lokmanya Bal Gangadhar Tilak in 1893 from a private household puja into a mass public festival to unify Indians against British colonial censorship.',
    'Tilak used the Keshavji Naik Chawl in Girgaon as the birthplace of Sarvajanik Ganeshotsav, turning celebration pandals into venues for patriotic speeches, political mobilization, and cultural arts.',
    'Today, Mumbai’s Ganeshotsav is an incomparable spectacle of faith, community philanthropy, folk music, and secular solidarity celebrated across millions of citizens.',
    ARRAY['Girgaon Keshavji Naik Chawl', 'Lalbaug', 'Girgaon Chowpatty Beach'],
    '/src/assets/images/csmvs_museum_gallery_1791209142918.jpg'
),
(
    'cul_dabbawalas',
    'Mumbai Dabbawala Delivery Network',
    'Traditional Occupations',
    'Mumbai''s legendary 130-year-old meal delivery system where over 5,000 Dabbawalas transport approximately 200,000 freshly cooked home lunches to office workers every single day using local suburban trains and bicycles.',
    'Started in 1890 by Mahadeo Havaji Bachche with about 100 men delivering tiffins to Parsi and British businessmen across the Fort area.',
    'Celebrated globally by Harvard Business School for their Six Sigma precision without barcode scanners, computers, or high-tech devices, relying on an ingenious color-coded numbering system.',
    ARRAY['Churchgate Station', 'CSMT Station', 'Dadar Central Station'],
    '/src/assets/images/csmt_victoria_terminus_1791209100224.jpg'
);

-- 8. VIRTUAL EXHIBITS
INSERT INTO virtual_exhibits (id, room, title, description, historical_context, image, period, audio_guide_placeholder) VALUES
(
    'vex_01',
    'Room 1: Ancient Mumbai & The Seven Islands',
    'The Seven Islands of Bombay Archipelago',
    'Before reclamation, Mumbai was a group of seven separate islands: Isle of Bombay, Colaba, Old Woman''s Island, Mazagaon, Parel, Worli, and Mahim.',
    'The islands were separated by treacherous tidal channels and mangrove swamps inhabited by the Koli fishing settlements.',
    '/src/assets/images/mumbai_heritage_hero_1791209085207.jpg',
    'Ancient to Medieval Period',
    'Audio narration: Discover how the original archipelago was charted by Ptolemy and settled by Buddhist and indigenous mariners.'
),
(
    'vex_02',
    'Room 2: Bombay Under Colonial Rule & Reclamation',
    'The Great Breach and Hornby Vellard Engineering',
    'Governor William Hornby defied the East India Company directors in 1782 to build the causeway blocking the catastrophic sea breach at Mahalaxmi.',
    'This audacious public works project initiated over 150 years of civil engineering that unified Mumbai into a singular economic powerhouse.',
    '/src/assets/images/csmt_victoria_terminus_1791209100224.jpg',
    '18th & 19th Century',
    'Audio narration: Step onto the newly reclaimed causeway of 1784 that saved central Bombay from daily high tides.'
),
(
    'vex_03',
    'Room 3: Mumbai''s Architectural Renaissance',
    'The Victorian Gothic and Art Deco Ensembles',
    'Mumbai possesses the second largest collection of Art Deco buildings in the world after Miami, directly facing the Victorian Gothic monuments across the Oval Maidan.',
    'Inscribed together as a UNESCO World Heritage Site in 2018, representing the dual architectural soul of Mumbai: 19th-century imperial Gothic confronting 20th-century modern Indian Art Deco.',
    '/src/assets/images/gateway_of_india_1791209115560.jpg',
    'Late 19th to Mid 20th Century',
    'Audio narration: Stand in the Oval Maidan and observe the striking dialogue between Gothic spires and sleek ocean-liner curves.'
),
(
    'vex_04',
    'Room 4: The Freedom Movement in Bombay',
    'August Kranti: The Epicenter of Non-Violent Defiance',
    'On 8 August 1942, tens of thousands of citizens gathered at Gowalia Tank Maidan to hear Mahatma Gandhi proclaim Quit India.',
    'The brave young activist Aruna Asaf Ali hoisted the Indian National tricolor flag on 9 August despite tear gas and British police bayonets.',
    '/src/assets/images/mumbai_heritage_hero_1791209085207.jpg',
    '1915–1947 CE',
    'Audio narration: Listen to historic recordings and eyewitness accounts of the August Kranti revolt in South Mumbai.'
),
(
    'vex_05',
    'Room 5: Mumbai''s Living Cultural Heritage',
    'The Marine Legacy of Worli and Versova Koliwadas',
    'An interactive exhibition celebrating indigenous marine folklore, traditional songs, fishing gear, and coastal ecology.',
    'Shows how contemporary community heritage archives are preserving ancestral boat-building knowledge and coastal biodiversity.',
    '/src/assets/images/kanheri_caves_sculpture_1791209128401.jpg',
    'Contemporary Heritage',
    'Audio narration: Experience the vibrant chants of Koli fishermen setting sail into the Arabian Sea at dawn.'
),
(
    'vex_06',
    'Room 6: Modern Mumbai & Heritage Conservation',
    'Restoring the Architectural Jewels of Mumbai',
    'A showcase on modern restoration initiatives that revived the Opera House, CSMVS gardens, Flora Fountain, and David Sassoon Library.',
    'Highlighting modern conservation techniques that use original Porbandar and Kurla stones to protect Mumbai’s fragile heritage from coastal humidity.',
    '/src/assets/images/csmvs_museum_gallery_1791209142918.jpg',
    '21st Century Conservation',
    'Audio narration: Learn how master stone carvers and architects restore 140-year-old stained glass and gargoyles.'
);

-- 9. QUIZ QUESTIONS
INSERT INTO quiz_questions (id, category, question, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(
    'q_01',
    'Mumbai History',
    'In what year did the first commercial passenger railway train in Asia run between Bombay and Thane?',
    '1848',
    '1853',
    '1857',
    '1869',
    1,
    'The historic 21-mile journey took place on 16 April 1853 from Bori Bunder to Thane, powered by the locomotives Sindh, Sultan, and Sahib.'
),
(
    'q_02',
    'Mumbai Architecture',
    'Who was the chief architect of Chhatrapati Shivaji Maharaj Terminus (formerly Victoria Terminus)?',
    'George Wittet',
    'Sir George Gilbert Scott',
    'Frederick William Stevens',
    'Edwin Lutyens',
    2,
    'Frederick William Stevens designed the majestic Victorian Gothic headquarters over a ten-year construction period from 1878 to 1887.'
),
(
    'q_03',
    'Mumbai History',
    'Which ancient Buddhist rock-cut complex within Mumbai features 109 caves dating from 1st century BCE to 10th century CE?',
    'Ajanta Caves',
    'Kanheri Caves',
    'Ellora Caves',
    'Karla Caves',
    1,
    'Kanheri Caves, located in Sanjay Gandhi National Park (Borivali), served as a major Buddhist monastic university on the ancient silk and maritime routes.'
),
(
    'q_04',
    'Museums',
    'Which Mumbai museum received the UNESCO Asia-Pacific Award of Excellence for Cultural Heritage Conservation in 2022?',
    'Dr. Bhau Daji Lad Museum',
    'CSMVS (formerly Prince of Wales Museum)',
    'RBI Monetary Museum',
    'Mani Bhavan',
    1,
    'Chhatrapati Shivaji Maharaj Vastu Sangrahalaya (CSMVS) won the prestigious UNESCO Award of Excellence in 2022 for its comprehensive century centenary conservation.'
),
(
    'q_05',
    'Mumbai Architecture',
    'Premchand Roychand funded the construction of the Rajabai Clock Tower on one condition. What was it?',
    'It must chime every 15 minutes',
    'It must be named after his mother Rajabai',
    'It must be taller than Big Ben',
    'It must be built out of Italian marble',
    1,
    'Premchand Roychand donated ₹2,00,000 so that the tower would bear his devout mother''s name, allowing her to hear the chimes and break her fast before sunset.'
),
(
    'q_06',
    'Forts',
    'Which British Governor constructed the Sion Fort in the 1670s to mark the boundary between British Parel and Portuguese Salsette?',
    'Gerald Aungier',
    'William Hornby',
    'Bartle Frere',
    'Mountstuart Elphinstone',
    0,
    'Gerald Aungier, who served as Governor of Bombay from 1669 to 1677, heavily fortified the islands, creating forts at Sion, Sewri, and Worli.'
),
(
    'q_07',
    'Culture',
    'Who transformed the private domestic celebration of Ganesh Utsav into a mass public (Sarvajanik) festival in Bombay in 1893?',
    'Mahatma Jyotirao Phule',
    'Lokmanya Bal Gangadhar Tilak',
    'Gopal Krishna Gokhale',
    'Nana Jagannath Shankarseth',
    1,
    'Lokmanya Tilak organized the first public Ganeshotsav at Keshavji Naik Chawl in Girgaon in 1893 to overcome British bans on public political gatherings.'
),
(
    'q_08',
    'Famous Personalities',
    'From which historic South Mumbai home did Mahatma Gandhi launch the Non-Cooperation and Civil Disobedience campaigns?',
    'Jinnah House',
    'Mani Bhavan on Laburnum Road',
    'Aga Khan Palace',
    'Birla House',
    1,
    'Mani Bhavan served as Gandhi''s headquarters in Bombay from 1917 to 1934 and is now a revered national memorial museum.'
),
(
    'q_09',
    'Mumbai Architecture',
    'Beside Victorian Gothic, Mumbai is celebrated globally for possessing the second largest cluster in the world of which 20th-century architectural style?',
    'Brutalist Architecture',
    'Art Deco',
    'Baroque Revival',
    'Bauhaus Industrial',
    1,
    'Mumbai boasts the world''s second largest concentration of Art Deco structures after Miami, famously clustered along Marine Drive and the Oval Maidan.'
),
(
    'q_10',
    'Culture',
    'Which indigenous community is recognized as the original fisherfolk inhabitants of Mumbai''s seven islands?',
    'Warli community',
    'Koli community',
    'Gond community',
    'Bhil community',
    1,
    'The Kolis are the original native mariners of Mumbai who named Mumbadevi, Colaba, and Worli, and continue their seafaring traditions in historical Koliwadas.'
);
