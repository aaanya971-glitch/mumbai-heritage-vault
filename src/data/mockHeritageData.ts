/**
 * Mumbai HeritageVault - Digital Historical & Cultural Heritage Museum
 * Comprehensive Verified Historical Dataset
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
  User,
} from '../types';

export const HERO_IMAGE = '/src/assets/images/mumbai_monuments_panorama_1791209878821.jpg';
export const MONUMENTS_PANORAMA_IMAGE = '/src/assets/images/mumbai_monuments_panorama_1791209878821.jpg';
export const HARBOR_HERO_IMAGE = '/src/assets/images/mumbai_heritage_hero_1791209085207.jpg';
export const CSMT_IMAGE = '/src/assets/images/csmt_victoria_terminus_1791209100224.jpg';
export const GATEWAY_IMAGE = '/src/assets/images/gateway_of_india_1791209115560.jpg';
export const KANHERI_IMAGE = '/src/assets/images/kanheri_caves_sculpture_1791209128401.jpg';
export const CSMVS_IMAGE = '/src/assets/images/csmvs_museum_gallery_1791209142918.jpg';

export const INITIAL_HERITAGE_SITES: HeritageSite[] = [
  {
    id: 'site_csmt',
    name: 'Chhatrapati Shivaji Maharaj Terminus (CSMT)',
    slug: 'csmt-terminus',
    category: 'Railway Heritage',
    description:
      'Formerly known as Victoria Terminus, CSMT is an outstanding example of Victorian Gothic Revival architecture in India, fused with themes derived from Indian traditional architecture. Built over 10 years starting in 1878, it serves as the headquarters of Central Railway and stands as an architectural triumph of 19th-century structural engineering.',
    historicalPeriod: '19th Century',
    year: '1878–1887',
    location: 'Chhatrapati Shivaji Maharaj Terminus Area, Fort, Mumbai, 400001',
    latitude: 18.9398208,
    longitude: 72.8354676,
    architecturalStyle: 'High Victorian Gothic Revival with Indo-Saracenic detailing',
    significance:
      'Inscribed as a UNESCO World Heritage Site in 2004. Celebrated for stone masonry, polychromatic brickwork, groined ribbed vaults, Italian marble staircases, and hand-carved gargoyles representing native fauna.',
    unescoStatus: 'UNESCO World Heritage Site',
    image: CSMT_IMAGE,
    whyItMatters:
      'CSMT stands as the premier symbol of Mumbai’s rise as "Urbs Prima in Indis" (First City in India). It became the operational hinge that connected the interior agricultural hinterlands of the Deccan plateau to the global maritime markets of the Arabian Sea.',
    architect: 'Frederick William Stevens (Assisted by Axel Haig and artists of Sir J.J. School of Art)',
    interestingFacts: [
      'Took a full decade to construct from 1878 to 1887, opening during Queen Victoria’s Golden Jubilee.',
      'The colossal 14-foot stone statue atop the central octagonal dome represents "Progress", holding a torch in her right hand and a spoked wheel in her left.',
      'Wood carvings, decorative tilework, ornamental brass, and iron railings were hand-crafted by master Indian craftsmen and students of the Sir J.J. School of Art.',
      'Features an innovative structural steel framework concealed beneath stone cladding, allowing vast internal column-free train sheds.',
    ],
    nearbySites: ['Municipal Corporation Building', 'Crawford Market', 'Asiatic Society Library'],
    accessType: 'Free',
    referencesSource: 'UNESCO World Heritage Centre Inscription 945rev; Archaeological Survey of India (ASI)',
    audioGuideText:
      'Welcome to Chhatrapati Shivaji Maharaj Terminus, an epic cathedral of steam and steel. Look up at the soaring octagonal dome crowned by the figure of Progress. Notice how Frederick William Stevens harmonized European Gothic arches with sculpted Indian peacocks, monkeys, and lions.',
  },
  {
    id: 'site_gateway',
    name: 'Gateway of India',
    slug: 'gateway-of-india',
    category: 'Monument',
    description:
      'An iconic 20th-century arch monument overlooking the Arabian Sea at the historical landing point of Apollo Bunder. Erected to commemorate the royal visit of King George V and Queen Mary in December 1911, and later celebrated as the ceremonial exit point for the last British troops in 1948.',
    historicalPeriod: 'Early 20th Century',
    year: '1914–1924',
    location: 'Apollo Bandar, Colaba, Mumbai, 400001',
    latitude: 18.9219841,
    longitude: 72.8346543,
    architecturalStyle: 'Indo-Saracenic with 16th-century Gujarati architectural motifs',
    significance:
      'The ceremonial gateway through which viceroys and governors entered British India, and where the First Battalion of the Somerset Light Infantry marched in farewell on 28 February 1948, marking the symbolic departure of British colonial forces from sovereign India.',
    unescoStatus: 'None',
    image: GATEWAY_IMAGE,
    whyItMatters:
      'It represents the grandest civic manifestation of Indo-Saracenic synthesis in Mumbai, marrying Muslim triumphal arch proportions with intricate Hindu and Jain trefoil tracery carved into indigenous yellow basalt.',
    architect: 'George Wittet (Superintending Architect to the Government of Bombay)',
    interestingFacts: [
      'Constructed from honey-tinted yellow basalt quarried locally from Kharodi in Raigad district.',
      'The central dome measures 48 feet in diameter and reaches a height of 83 feet above the sea promenade.',
      'The foundation stone was laid on 31 March 1911 by Sir George Sydenham Clarke, then Governor of Bombay.',
      'On 28 February 1948, the last British regiment passed through its portals aboard the ship Empress of Australia, saluting a free India.',
    ],
    nearbySites: ['Taj Mahal Palace Hotel', 'CSMVS Museum', 'Colaba Causeway'],
    accessType: 'Free',
    referencesSource: 'Maharashtra State Directorate of Archaeology and Museums; Mumbai Heritage Conservation Committee (MHCC)',
    audioGuideText:
      'You are standing before the Gateway of India, facing the Mumbai Harbour. Notice the yellow basalt stonework that glows golden in morning and evening light. Observe the delicate stone jali lattice screens inspired by Gujarati Sultanate architecture.',
  },
  {
    id: 'site_kanheri',
    name: 'Kanheri Caves',
    slug: 'kanheri-caves',
    category: 'Cave',
    description:
      'A vast Buddhist rock-cut monastic complex comprising 109 caves carved into the basalt hills of the Sanjay Gandhi National Park in Borivali. Spanning over a millennium from the 1st century BCE to the 10th century CE, it was a pivotal Buddhist center on the maritime trade route between Sopara, Kalyan, and the western world.',
    historicalPeriod: 'Ancient & Early History',
    year: '1st Century BCE – 10th Century CE',
    location: 'Sanjay Gandhi National Park, Borivali East, Mumbai, 400066',
    latitude: 19.206111,
    longitude: 72.906389,
    architecturalStyle: 'Rock-cut Buddhist Maurya, Satavahana, and Rashtrakuta Architecture',
    significance:
      'One of the largest Buddhist monastic university complexes in western India, featuring soaring chaitya prayer halls, viharas (residential monastic cells), rock-cut cisterns (podhis), and ancient Brahmi inscriptions.',
    unescoStatus: 'None',
    image: KANHERI_IMAGE,
    whyItMatters:
      'Kanheri demonstrates over 1,000 years of unbroken spiritual, academic, and commercial history within modern Mumbai’s borders, proving the city’s ancient role in pan-Asian maritime commerce.',
    architect: 'Patronized by Buddhist guilds, monks, and royal rulers of the Satavahana and Rashtrakuta dynasties',
    interestingFacts: [
      'The name originates from the Sanskrit "Krishnagiri", meaning the "Black Mountain".',
      'Cave 3 features an ancient 5th-century Avalokiteshvara figure with eleven heads and a 22-foot colossal standing Buddha.',
      'Features a sophisticated rainwater harvesting and purification system of rock-cut stone gutters and subterranean tanks.',
      'Contains more than 50 epigraphic inscriptions in Brahmi, Devanagari, and ancient Pahlavi scripts.',
    ],
    nearbySites: ['Sanjay Gandhi National Park', 'Mandapeshwar Caves', 'Jogeshwari Caves'],
    accessType: 'Ticketed',
    referencesSource: 'Archaeological Survey of India (ASI) - Mumbai Circle, Ancient Monuments and Archaeological Sites and Remains Act',
    audioGuideText:
      'Enter the serene volcanic caves of Kanheri. Listen to the wind whispering through stone pillars carved two thousand years ago. Imagine monks chanting sacred sutras while maritime merchants from Alexandria and Rome rested here after docking at nearby ports.',
  },
  {
    id: 'site_csmvs',
    name: 'Chhatrapati Shivaji Maharaj Vastu Sangrahalaya (CSMVS)',
    slug: 'csmvs-museum',
    category: 'Museum',
    description:
      'Formerly known as the Prince of Wales Museum of Western India, CSMVS is Mumbai’s premier art, archaeology, and natural history museum. Located in the Kala Ghoda Art District, it houses over 70,000 artifacts across Indian art, ancient civilizations, and global treasures.',
    historicalPeriod: 'Early 20th Century',
    year: '1905–1922',
    location: '159-161, Mahatma Gandhi Road, Kala Ghoda, Fort, Mumbai, 400023',
    latitude: 18.926861,
    longitude: 72.832722,
    architecturalStyle: 'Indo-Saracenic (Mughal, Maratha, and Jain idioms)',
    significance:
      'Conferred the UNESCO Asia-Pacific Award of Excellence for Cultural Heritage Conservation in 2022. Houses invaluable Harappan antiquities, Mughal miniatures, and Gandharan Buddhist sculptures.',
    unescoStatus: 'None',
    image: CSMVS_IMAGE,
    whyItMatters:
      'CSMVS represents the cultural sanctuary of Mumbai, where centuries of artistic heritage, conservation excellence, and public museum pedagogy come together in a heritage palm garden.',
    architect: 'George Wittet',
    interestingFacts: [
      'Its majestic white central dome was inspired directly by the Gol Gumbaz of Vijayapura (Bijapur).',
      'During World War I, prior to its public opening, the building served as a military hospital for wounded soldiers.',
      'Preserves rare terracotta antiquities from Harappa and Mohenjo-daro dating back to 2500 BCE.',
      'Surrounded by heritage botanical gardens featuring rare royal palms and period stone sculptures.',
    ],
    nearbySites: ['Jehangir Art Gallery', 'National Gallery of Modern Art (NGMA)', 'University of Mumbai'],
    accessType: 'Ticketed',
    referencesSource: 'Board of Trustees of CSMVS; UNESCO Asia-Pacific Heritage Awards Archive (2022)',
    audioGuideText:
      'Step into the magnificent atrium of CSMVS. Notice the interlocking wooden brackets inspired by traditional Gujarati havelis, and the pure white dome echoing the Adil Shahi mausoleums of the Deccan.',
  },
  {
    id: 'site_high_court',
    name: 'Bombay High Court',
    slug: 'bombay-high-court',
    category: 'Heritage Building',
    description:
      'Part of the Victorian Gothic and Art Deco Ensembles of Mumbai UNESCO World Heritage Site, this neo-Gothic court complex was commenced in 1871 and inaugurated in November 1878. Built in black Kurla stone with grand stone arcades, towers, and sculpted spiral stairways.',
    historicalPeriod: '19th Century',
    year: '1871–1878',
    location: 'Dr. Kane Road, Fort, Mumbai, 400032',
    latitude: 18.929556,
    longitude: 72.830278,
    architecturalStyle: 'Victorian Gothic Revival (Early English Gothic)',
    significance:
      'One of India’s oldest High Courts, chartered under the High Courts Act of 1861, where stalwarts of the Indian Bar including Dr. B.R. Ambedkar, Bal Gangadhar Tilak, and Mahadev Govind Ranade practiced.',
    unescoStatus: 'UNESCO World Heritage Site',
    image: HERO_IMAGE,
    whyItMatters:
      'It is an enduring temple of constitutional jurisprudence and democratic struggle, where seminal trials in Indian freedom history took place facing the Oval Maidan.',
    architect: 'Colonel J.A. Fuller, Royal Engineers',
    interestingFacts: [
      'Constructed using blue basalt stone banded with buff Kurla stone and Porbandar limestone.',
      'Whimsical stone capitals depict monkeys wearing judge wigs and foxes in advocate robes, carved as gentle satire by Indian craftsmen.',
      'Dr. B.R. Ambedkar enrolled here as an advocate in 1923 and fought landmark constitutional battles.',
      'Forms a magnificent dialogue with the line of 1930s Art Deco apartment buildings across the green sweep of Oval Maidan.',
    ],
    nearbySites: ['University of Mumbai & Rajabai Tower', 'Oval Maidan', 'Asiatic Society Library'],
    accessType: 'Restricted',
    referencesSource: 'Bombay High Court Historical Archives; UNESCO World Heritage Inscription 1480',
    audioGuideText:
      'You are gazing upon the Bombay High Court. Look closely at the Gothic arches facing the Oval Maidan. Within these stone courtrooms, Dr. B.R. Ambedkar championed social equality, and Tilak proclaimed that Swaraj is his birthright.',
  },
  {
    id: 'site_rajabai',
    name: 'Rajabai Clock Tower & University of Mumbai',
    slug: 'rajabai-clock-tower',
    category: 'Heritage Building',
    description:
      'A 280-foot clock tower situated within the Fort campus of the University of Mumbai. Designed by Sir George Gilbert Scott in London and constructed with funds donated by financier Premchand Roychand, who named it in honor of his mother Rajabai.',
    historicalPeriod: '19th Century',
    year: '1869–1878',
    location: 'University of Mumbai Fort Campus, Karmaveer Bhaurao Patil Marg, Mumbai, 400032',
    latitude: 18.929722,
    longitude: 72.830556,
    architecturalStyle: 'Venetian and Victorian Gothic Revival',
    significance:
      'World Heritage monument housing the historic University Library, renowned for stained glass windows, teakwood ribbed roofs, and 24 stone statues representing castes and regional dress of 19th-century India.',
    unescoStatus: 'UNESCO World Heritage Site',
    image: CSMT_IMAGE,
    whyItMatters:
      'It represents the dawn of secular university education in western India and a touching testament of maternal devotion in urban Mumbai history.',
    architect: 'Sir George Gilbert Scott & Rao Bahadur Mukund Ramchandra (Executive Engineer)',
    interestingFacts: [
      'Premchand Roychand donated ₹2,00,000 so his blind mother Rajabai, a devout Jain, could hear the bells toll and break her fast before sunset.',
      'During the 19th century, the clock chimes played sixteen different melodies throughout the day.',
      'The 24 sculptures around the upper tiers were carved by students of Sir J.J. School of Art.',
      'Its stained glass windows were executed by the famous Victorian glassmakers Heaton, Butler and Bayne in London.',
    ],
    nearbySites: ['Bombay High Court', 'Flora Fountain', 'CSMVS Museum'],
    accessType: 'Restricted',
    referencesSource: 'University of Mumbai Archives; UNESCO Inscription 1480',
    audioGuideText:
      'Look up at the graceful spire of the Rajabai Clock Tower rising 280 feet into the Mumbai sky. Designed by Sir George Gilbert Scott, its chimes guided the daily rhythms of 19th-century South Mumbai.',
  },
  {
    id: 'site_asiatic',
    name: 'Town Hall & The Asiatic Society of Mumbai',
    slug: 'asiatic-society-town-hall',
    category: 'Heritage Building',
    description:
      'Overlooking the historic Horniman Circle (formerly Elphinstone Circle), the Town Hall is an imposing neoclassical structure featuring a monumental flight of 30 granite steps and eight colossal Doric columns imported from England.',
    historicalPeriod: '19th Century',
    year: '1820–1833',
    location: 'Shahid Bhagat Singh Road, Fort, Mumbai, 400023',
    latitude: 18.931667,
    longitude: 72.837222,
    architecturalStyle: 'Neoclassical / Greek Revival',
    significance:
      'Houses the Asiatic Society Library with over 100,000 rare volumes, ancient manuscripts including a 14th-century handwritten Dante’s Divine Comedy, and an original 1804 charter of the Literary Society of Bombay.',
    unescoStatus: 'None',
    image: HERO_IMAGE,
    whyItMatters:
      'It was the intellectual and administrative forum of 19th-century Bombay, where public receptions, scientific debates, and monumental proclamations occurred.',
    architect: 'Colonel Thomas Cowper, Bombay Engineers',
    interestingFacts: [
      'Preserves one of only two known original handwritten Italian manuscript copies of Dante’s Divine Comedy from 1350.',
      'The 30 grand exterior granite steps serve as a beloved public salon, cultural gathering spot, and cinema backdrop.',
      'The Asiatic Society was established in 1804 by jurist Sir James Mackintosh as the Literary Society of Bombay.',
      'Contains an extraordinary numismatic collection of ancient Gupta, Satavahana, and Roman coins excavated in the Konkan.',
    ],
    nearbySites: ['Horniman Circle Garden', 'St. Thomas Cathedral', 'RBI Monetary Museum'],
    accessType: 'Free',
    referencesSource: 'The Asiatic Society of Mumbai Council Records; Government of Maharashtra Heritage Registry',
    audioGuideText:
      'Ascend the 30 granite steps of the Town Hall. Look across to Horniman Circle, Bombay’s first planned circular plaza. Step inside the library where scholarly luminaries documented the ancient history of western India.',
  },
  {
    id: 'site_crawford',
    name: 'Crawford Market (Mahatma Jyotirao Phule Mandai)',
    slug: 'crawford-market',
    category: 'Market',
    description:
      'Erected in 1869, Crawford Market is one of Mumbai’s most storied public covered markets. Named after Arthur Crawford, the city’s first Municipal Commissioner, and later dedicated to the social reformer Mahatma Jyotirao Phule.',
    historicalPeriod: '19th Century',
    year: '1865–1869',
    location: 'Dhobi Talao, CSMT Area, Fort, Mumbai, 400001',
    latitude: 18.947222,
    longitude: 72.834444,
    architecturalStyle: 'Norman and Flemish Gothic architecture',
    significance:
      'The first public building in India to be illuminated by electricity in 1882. Famous for stone bas-reliefs sculpted by John Lockwood Kipling (father of author Rudyard Kipling).',
    unescoStatus: 'None',
    image: CSMT_IMAGE,
    whyItMatters:
      'Marks the transition from traditional open-air bazaars into planned Victorian civic infrastructure, celebrating Indian agrarian life in stone relief carvings.',
    architect: 'William Emerson (Bas-reliefs by John Lockwood Kipling)',
    interestingFacts: [
      'John Lockwood Kipling was principal of Sir J.J. School of Art when he hand-carved the entrance friezes depicting Indian farmers and laborers.',
      'The market clock tower reaches 128 feet and dominates the vibrant junction connecting the Fort to the indigenous bazaars.',
      'In 1882, it was equipped with pioneer electric arc lamps.',
      'Constructed with Kurla buff stone and rich Porbandar limestone.',
    ],
    nearbySites: ['CSMT Station', 'Zaveri Bazaar', 'Mangaldas Market'],
    accessType: 'Free',
    referencesSource: 'Brihanmumbai Municipal Corporation (BMC) Heritage Cell; Sir J.J. School of Art Archives',
    audioGuideText:
      'Welcome to the bustling Crawford Market. Pause at the main stone portal to examine John Lockwood Kipling’s stone carvings showing Indian cultivators carrying sheaves of wheat and driving bullock carts.',
  },
  {
    id: 'site_worli_fort',
    name: 'Worli Fort',
    slug: 'worli-fort',
    category: 'Fort',
    description:
      'A 17th-century coastal bastion built by the British East India Company around 1675 atop the volcanic promontory of Worli Hill to protect Mahim Bay and the approaches to Bombay against pirate and Portuguese raids.',
    historicalPeriod: 'Portuguese Period',
    year: 'Circa 1675',
    location: 'Worli Koliwada, Worli, Mumbai, 400030',
    latitude: 19.023889,
    longitude: 72.816667,
    architecturalStyle: 'British Colonial Coastal Bastion',
    significance:
      'An authentic lookout fortification integrated into Worli Koliwada, one of Mumbai’s oldest surviving indigenous fishing settlements, offering panoramic vistas of Mahim Bay.',
    unescoStatus: 'None',
    image: GATEWAY_IMAGE,
    whyItMatters:
      'Embodies the coastal defense perimeter erected across the Seven Islands and the living continuity of Mumbai’s Koli community.',
    architect: 'British East India Company military engineers under Governor Gerald Aungier',
    interestingFacts: [
      'Houses an ancient Hanuman shrine and historic cannon embrasures inside its sturdy stone ramparts.',
      'Situated in the heart of Worli Koliwada, where centuries-old fishing and dry-fish drying traditions continue today.',
      'Provides a dramatic vantage point looking out toward the modern Bandra-Worli Sea Link.',
      'Its stone battlements remain intact despite 350 years of relentless Arabian Sea surf and monsoon winds.',
    ],
    nearbySites: ['Bandra-Worli Sea Link', 'Mahim Fort', 'Siddhivinayak Temple'],
    accessType: 'Free',
    referencesSource: 'Maharashtra Maritime Board; Archaeological Survey of India (State Directorate)',
    audioGuideText:
      'Stand upon the stone ramparts of Worli Fort. Smell the salt sea spray and feel the cool ocean breeze. Here, 350 years ago, watchmen looked out for hostile pirate ships while Koli fishermen below mended their cotton nets.',
  },
  {
    id: 'site_sion_fort',
    name: 'Sion Hillock Fort',
    slug: 'sion-fort',
    category: 'Fort',
    description:
      'Built between 1669 and 1677 by British Governor Gerald Aungier atop a conical hillock, marking the historic boundary between British-held Parel island and Portuguese Salsette island.',
    historicalPeriod: 'British/Bombay Period',
    year: '1669–1677',
    location: 'Sion East, Mumbai, 400022',
    latitude: 19.046944,
    longitude: 72.867778,
    architecturalStyle: 'British Colonial Hilltop Bastion',
    significance:
      'A protected monument of the Archaeological Survey of India, maintaining remnants of fortification walls, stone bastions, and a vantage point over the historical creek that separated Bombay from Salsette.',
    unescoStatus: 'None',
    image: KANHERI_IMAGE,
    whyItMatters:
      'Marks the geopolitical boundary between European rival powers in 17th-century Mumbai prior to the reclamation of the tidal channels.',
    architect: 'Commissioned by Governor Gerald Aungier',
    interestingFacts: [
      'Declared a protected heritage monument under the Archaeological Survey of India in 1925.',
      'Served as a strategic signaling post with lines of sight to Sewri Fort, Worli Fort, and Mahim Fort.',
      'A hilltop garden maintains stone pathways leading to the highest bastion overlooking the Sion railway junction.',
      'Features an ancient stone watchtower with gun loops for musketry.',
    ],
    nearbySites: ['Mahim Fort', 'Sewri Fort', 'Dharavi Artisans District'],
    accessType: 'Free',
    referencesSource: 'ASI Mumbai Circle; Monument Notification No. 1289 (1925)',
    audioGuideText:
      'Ascend the winding stone stairs of Sion Hillock Fort. From this vantage point, British sentries guarded the narrow creek that once separated the British islands from Portuguese territory to the north.',
  },
  {
    id: 'site_sewri_fort',
    name: 'Sewri Fort',
    slug: 'sewri-fort',
    category: 'Fort',
    description:
      'A coastal fort built by the British in 1680 on the eastern shoreline of Mumbai, overlooking the eastern harbour and the mudflats. Primarily intended as a defense against Siddis of Janjira and Maratha naval forces.',
    historicalPeriod: 'British/Bombay Period',
    year: '1680',
    location: 'Sewri East, Mumbai, 400015',
    latitude: 18.998611,
    longitude: 72.859722,
    architecturalStyle: 'Colonial Stone Coastal Bastion',
    significance:
      'A Grade I heritage structure famous for its robust pentagonal bastions and as the prime viewing location for hundreds of thousands of wintering migratory Lesser Flamingos on the Sewri mudflats.',
    unescoStatus: 'None',
    image: GATEWAY_IMAGE,
    whyItMatters:
      'Highlights Mumbai’s twin defense strategy guarding both the western open sea and the sheltered eastern harbour.',
    architect: 'British East India Company Engineers',
    interestingFacts: [
      'Repelled an attack by the Siddi admiral Yakut Khan in 1689 during the Anglo-Mughal hostilities.',
      'Overlooks the Sewri mudflats where thousands of flamingos arrive every winter from the Rann of Kutch.',
      'Features high perimeter stone walls and an inner courtyard surrounded by vaulted ammunition cells.',
      'Maintains original gun ports oriented towards Elephanta Island and Trombay.',
    ],
    nearbySites: ['Sewri Flamingo Mudflats', 'Dr. Bhau Daji Lad Museum', 'Haji Bandar'],
    accessType: 'Free',
    referencesSource: 'State Directorate of Archaeology, Maharashtra; Mumbai Heritage Conservation Committee',
    audioGuideText:
      'Gaze from the ramparts of Sewri Fort across the shimmering eastern mudflats. Built to defend against the formidable Siddi fleet of Janjira, today it overlooks the peaceful spectacle of thousands of pink flamingos.',
  },
  {
    id: 'site_mahim_fort',
    name: 'Mahim Fort',
    slug: 'mahim-fort',
    category: 'Fort',
    description:
      'An ancient fort located at the mouth of Mahim Creek, originally fortified by Raja Bhimdev in the 13th century, expanded by the Gujarat Sultanate, seized by the Portuguese in 1534, and subsequently fortified by the British in 1684.',
    historicalPeriod: 'Medieval Period',
    year: '13th Century / British Rebuild 1684',
    location: 'Mahim Bay, Mahim West, Mumbai, 400016',
    latitude: 19.041667,
    longitude: 72.839444,
    architecturalStyle: 'Medieval Stone Bastion & Coastal Ramparts',
    significance:
      'One of Mumbai’s oldest strategic forts, commanding the Mahim Creek which historically separated Bombay Island from Salsette Island.',
    unescoStatus: 'None',
    image: HERO_IMAGE,
    whyItMatters:
      'Connects Mumbai directly to the medieval Kingdom of Mahikawati established by Raja Bhimdev.',
    architect: 'Raja Bhimdev; upgraded by British East India Company engineers',
    interestingFacts: [
      'Raja Bhimdev declared Mahikawati (Mahim) his royal capital around 1290 CE.',
      'Sir Thomas Grantham reinforced the fort walls in 1684 against potential Portuguese raids from Bandra.',
      'Located near the historic Makhdoom Ali Mahimi Dargah, celebrated for Mumbai’s syncretic Sufi traditions.',
      'Overlooks the confluence of the historic Mithi River as it enters the Arabian Sea.',
    ],
    nearbySites: ['Makhdoom Ali Mahimi Dargah', 'Bandra Fort', 'Mahim Beach'],
    accessType: 'Free',
    referencesSource: 'Maharashtra Directorate of Archaeology and Museums',
    audioGuideText:
      'Listen to the confluence of the Mithi River and the Arabian Sea at Mahim Fort. For seven centuries, this site witnessed the rise and fall of medieval kings, Portuguese governors, and British commanders.',
  },
];

export const INITIAL_MUSEUMS: Museum[] = [
  {
    id: 'mus_csmvs',
    name: 'Chhatrapati Shivaji Maharaj Vastu Sangrahalaya (CSMVS)',
    description:
      'Mumbai’s premier museum of art, archaeology, and natural history, set in magnificent heritage gardens. Features world-renowned galleries of Indian miniature paintings, Himalayan art, European oil paintings, and Harappan antiquities.',
    location: '159-161, Mahatma Gandhi Road, Kala Ghoda, Fort, Mumbai, 400023',
    museumType: 'Art, Archaeology & Natural History',
    latitude: 18.926861,
    longitude: 72.832722,
    image: CSMVS_IMAGE,
    openingInfoPlaceholder: 'Generally open Tuesday to Sunday, 10:15 AM to 6:00 PM (verify with museum before visiting)',
    website: 'https://csmvs.gov.in',
    collectionCount: 70000,
    highlights: ['Indus Valley Civilization Seals', 'Mughal & Rajasthani Miniatures', 'Gandhara Sculptures', 'Japanese & Chinese Porcelain'],
  },
  {
    id: 'mus_bhau_daji_lad',
    name: 'Dr. Bhau Daji Lad Mumbai City Museum',
    description:
      'Established in 1855 as the Central Museum of Natural History, Economy, Geology, Industry and Arts, this is Mumbai’s oldest museum. Located inside Jijamata Udyan in Byculla, it is an exquisite example of High Victorian decorative design.',
    location: '91 A, Rani Baug, Veer Mata Jijabai Bhonsle Udyan, Dr Baba Saheb Ambedkar Rd, Byculla East, Mumbai, 400027',
    museumType: 'City History & Decorative Arts',
    latitude: 18.978611,
    longitude: 72.834444,
    image: CSMT_IMAGE,
    openingInfoPlaceholder: 'Generally open Thursday to Tuesday, 10:00 AM to 5:30 PM (Wednesday closed; verify before visiting)',
    website: 'https://bdlmuseum.org',
    collectionCount: 21000,
    highlights: ['19th-Century Mumbai Dioramas', 'Bidri Ware Collection', 'The Original Elephanta Island Basalt Elephant', 'Minton encaustic tiled flooring'],
  },
  {
    id: 'mus_mani_bhavan',
    name: 'Mani Bhavan Gandhi Sangrahalaya',
    description:
      'A focal point of India’s freedom struggle, Mani Bhavan was Mahatma Gandhi’s Bombay headquarters between 1917 and 1934. It was from here that the Non-Cooperation, Satyagraha, Swadeshi, Khadi, and Civil Disobedience movements were planned.',
    location: '19, Laburnum Road, Gamdevi, Mumbai, 400007',
    museumType: 'Biographical & Freedom Movement Museum',
    latitude: 18.959722,
    longitude: 72.812778,
    image: HERO_IMAGE,
    openingInfoPlaceholder: 'Generally open all 7 days from 9:30 AM to 5:30 PM (verify before visiting)',
    website: 'https://gandhimanibhavan.org',
    collectionCount: 5000,
    highlights: ['Gandhiji’s Preserved Bedroom and Charkhas', 'Historic Picture Gallery of Freedom Struggle', 'The 1932 Letter to Adolf Hitler', 'Library of over 50,000 Gandhian volumes'],
  },
  {
    id: 'mus_rbi',
    name: 'RBI Monetary Museum',
    description:
      'Established by the Reserve Bank of India to document the numismatic heritage of the Indian subcontinent, from ancient punch-marked coins to paper currency, promissory notes, and modern decimal coinage.',
    location: 'Amar Building, Sir Phirozeshah Mehta Road, Fort, Mumbai, 400001',
    museumType: 'Numismatics & Economic History',
    latitude: 18.934444,
    longitude: 72.833889,
    image: GATEWAY_IMAGE,
    openingInfoPlaceholder: 'Generally open Tuesday to Sunday, 10:45 AM to 5:15 PM (Closed Mondays and RBI holidays)',
    website: 'https://museum.rbi.org.in',
    collectionCount: 10000,
    highlights: ['6th Century BCE Punch-Marked Coins', 'Kushan Gold Dinars', 'Mughal Mohurs of Emperor Akbar', 'Early British East India Company Banknotes'],
  },
  {
    id: 'mus_nehru_science',
    name: 'Nehru Science Centre',
    description:
      'India’s largest interactive science centre, located in Worli. Developed to popularize scientific inquiry, industrial heritage, and the technological evolution of Mumbai’s maritime, rail, and manufacturing industries.',
    location: 'Opposite 4 Seasons Hotel, Dr. E. Moses Road, Worli, Mumbai, 400018',
    museumType: 'Science, Technology & Industrial Heritage',
    latitude: 18.990278,
    longitude: 72.818333,
    image: KANHERI_IMAGE,
    openingInfoPlaceholder: 'Open 7 days a week, 9:30 AM to 6:00 PM (verify before visiting)',
    website: 'https://nehrusciencecentre.gov.in',
    collectionCount: 15000,
    highlights: ['Historic Steam Locomotive and Tram Car', 'Evolution of Communication Gallery', 'Interactive Sound & Light Hall', 'Prehistoric Animal Life Models'],
  },
];

export const INITIAL_ARTIFACTS: Artifact[] = [
  {
    id: 'art_01',
    name: 'The Elephanta Basalt Monolithic Elephant',
    category: 'Sculptures',
    period: 'Medieval Period (6th Century CE)',
    material: 'Black Basalt Stone',
    origin: 'Gharapuri (Elephanta Island), Mumbai Harbour',
    description:
      'A colossal monolithic elephant sculpture that originally stood near the boat landing of Elephanta Island, giving the island its colonial name during Portuguese contact in the 16th century.',
    significance:
      'It is the namesake relic of the Elephanta Island UNESCO World Heritage site, reassembled in 1914 and installed in the gardens of Dr. Bhau Daji Lad Museum.',
    image: KANHERI_IMAGE,
    source: 'Dr. Bhau Daji Lad Museum Collection',
    museumSource: 'Dr. Bhau Daji Lad Museum',
    accessionNumber: 'BDL-SC-1914-01',
  },
  {
    id: 'art_02',
    name: 'Silver Punch-Marked Coin of the Mauryan Empire',
    category: 'Coins',
    period: 'Ancient & Early History (3rd Century BCE)',
    material: 'Silver alloy',
    origin: 'Found near Sopara (Nala Sopara port, Mumbai region)',
    description:
      'Karshapana coin bearing five distinct stamped punch symbols including the sun, six-armed wheel, and three-arched hill with crescent, used across ancient trading ports of the Konkan coast.',
    significance:
      'Demonstrates the deep integration of the northern Konkan maritime trade network with the pan-Indian Mauryan economy under Emperor Ashoka.',
    image: CSMVS_IMAGE,
    source: 'RBI Monetary Museum & CSMVS Numismatics Gallery',
    museumSource: 'RBI Monetary Museum',
    accessionNumber: 'RBI-COIN-ANC-084',
  },
  {
    id: 'art_03',
    name: 'Gilt Bronze Maitreya from Kanheri',
    category: 'Sculptures',
    period: 'Medieval Period (8th Century CE)',
    material: 'Gilt Bronze',
    origin: 'Kanheri Cave Complex, Salsette Island',
    description:
      'A finely detailed bronze representation of Maitreya, the future Buddha, wearing elaborate monastic robes and standing in abhaya mudra with lotus crest.',
    significance:
      'Reflects the artistic sophistication of the western Deccan bronze ateliers patronized by maritime merchants along the trade routes of Salsette.',
    image: KANHERI_IMAGE,
    source: 'CSMVS Archaeology & Sculpture Gallery',
    museumSource: 'CSMVS Museum',
    accessionNumber: 'CSMVS-MET-1922-34',
  },
  {
    id: 'art_04',
    name: '14th Century Illuminated Dante’s Divine Comedy',
    category: 'Manuscripts',
    period: 'Medieval Period (Circa 1350 CE)',
    material: 'Vellum / Hand-inked parchment with gold leaf',
    origin: 'Florence, Italy (Gifted to the Literary Society of Bombay by Mountstuart Elphinstone)',
    description:
      'One of only two known original handwritten Italian copies of Dante Alighieri’s Divina Commedia from the 14th century, preserved in extraordinary condition.',
    significance:
      'Considered one of the greatest literary treasures in Asia; Benito Mussolini once offered £1 million in the 1930s to acquire it, which the Asiatic Society politely declined.',
    image: HERO_IMAGE,
    source: 'The Asiatic Society of Mumbai Rare Manuscripts Room',
    museumSource: 'Asiatic Society of Mumbai',
    accessionNumber: 'ASM-MS-DANTE-01',
  },
  {
    id: 'art_05',
    name: 'Model of Mumbai Textile Mill & Chawl Settlement',
    category: 'Tools',
    period: '19th Century (Circa 1890)',
    material: 'Teakwood, Brass, and Plaster',
    origin: 'Girangaon (The Village of Mills), Central Mumbai',
    description:
      'A detailed scale diorama demonstrating the operation of early steam-driven cotton looms and the social architecture of worker chawls in Parel and Lalbaug.',
    significance:
      'Girangaon comprised over 130 operational cotton textile mills that attracted hundreds of thousands of migrant workers, forging modern Marathi working-class culture.',
    image: CSMT_IMAGE,
    source: 'Dr. Bhau Daji Lad Museum Diorama Archive',
    museumSource: 'Dr. Bhau Daji Lad Museum',
    accessionNumber: 'BDL-IND-1890-42',
  },
  {
    id: 'art_06',
    name: 'Gandharan Standing Bodhisattva in Schist',
    category: 'Sculptures',
    period: 'Ancient Period (2nd Century CE)',
    material: 'Grey Schist Stone',
    origin: 'Gandhara (Northwestern frontier, in Mumbai collection)',
    description:
      'A masterfully carved stone sculpture depicting a Bodhisattva with flowing Greco-Buddhist drapery, ornate turban, and almond-shaped eyes.',
    significance:
      'Represents the synthesis of Hellenistic Greek realistic portraiture and Indian Buddhist metaphysics preserved in CSMVS.',
    image: CSMVS_IMAGE,
    source: 'CSMVS Classical Antiquities Section',
    museumSource: 'CSMVS Museum',
    accessionNumber: 'CSMVS-SC-204',
  },
  {
    id: 'art_07',
    name: 'Parsi Gara Silk Embroidery Sari with Birds and Peonies',
    category: 'Textiles',
    period: '19th Century (Circa 1880)',
    material: 'Silk with fine silk floss satin stitch embroidery',
    origin: 'Canton (Guangzhou) & Mumbai Parsi Ateliers',
    description:
      'A family heirloom purple silk sari hand-embroidered with motifs of cranes, peonies, and weeping willows, brought to Bombay via the maritime China trade.',
    significance:
      'Illustrates the rich cultural amalgamation of Persian, Chinese, and Indian aesthetic traditions within Mumbai’s Parsi mercantile community.',
    image: GATEWAY_IMAGE,
    source: 'CSMVS Textile Gallery and Private Donations',
    museumSource: 'CSMVS Museum',
    accessionNumber: 'CSMVS-TEX-1880-12',
  },
  {
    id: 'art_08',
    name: 'Original 1853 Great Indian Peninsula Railway Timetable',
    category: 'Historical documents',
    period: '19th Century (1853)',
    material: 'Letterpress print on rag paper',
    origin: 'Bori Bunder, Bombay',
    description:
      'The inaugural printed timetable card for the passenger service between Bori Bunder and Tannah (Thane), detailing fares for First, Second, and Third Class carriages.',
    significance:
      'The foundational printed document of Asian railway travel, marking the exact starting point of India’s railway heritage.',
    image: CSMT_IMAGE,
    source: 'Central Railway Heritage Archives & CSMT Museum Gallery',
    museumSource: 'CSMT Railway Heritage Museum',
    accessionNumber: 'CR-RAIL-1853-01',
  },
  {
    id: 'art_09',
    name: 'Raja Ravi Varma Oil Painting: Damayanti and the Swan',
    category: 'Paintings',
    period: 'Late 19th Century (1899)',
    material: 'Oil on canvas',
    origin: 'Lonavala & Mumbai Studio (Ravi Varma Press)',
    description:
      'A legendary mythological painting by Raja Ravi Varma depicting princess Damayanti conversing with the royal swan about her beloved Nala.',
    significance:
      'Ravi Varma established his pioneering lithographic printing press in Ghatkopar and Malavli near Mumbai, democratizing Indian art across households.',
    image: HERO_IMAGE,
    source: 'CSMVS European and Indian Paintings Gallery',
    museumSource: 'CSMVS Museum',
    accessionNumber: 'CSMVS-ART-1899-77',
  },
];

export const INITIAL_PERSONALITIES: Personality[] = [
  {
    id: 'per_shankarseth',
    name: 'Nana Jagannath Shankarseth',
    role: 'Philanthropist, Reformer & Modern Architect of Bombay',
    biography:
      'Known as the "Architect of Modern Mumbai", Shankarseth was an Indian philanthropist and educational visionary. He co-founded the Great Indian Peninsula Railway, the Native School Book Society, and funded the development of Victoria Gardens and JJ School of Art.',
    birthDate: '10 February 1803',
    deathDate: '31 July 1865',
    contribution:
      'Championed the introduction of the first railway line in Asia (Bombay to Thane, 1853), modernized higher education for women and indigenous communities, and served as the first Indian member of the Bombay Legislative Council.',
    associatedPlaces: ['CSMT Station Area', 'Dr. Bhau Daji Lad Museum', 'Elphinstone College', 'Girgaon'],
    image: HERO_IMAGE,
    relatedSites: ['site_csmt', 'site_asiatic'],
  },
  {
    id: 'per_jejeebhoy',
    name: 'Sir Jamsetjee Jejeebhoy, 1st Baronet',
    role: 'Merchant, Global Philanthropist & Civic Leader',
    biography:
      'A Parsi-Indian merchant prince and humanitarian who amassed a fortune in the China tea and silk trade and redirected his wealth into transforming Mumbai’s civic infrastructure, hospitals, waterworks, and educational foundations.',
    birthDate: '15 July 1783',
    deathDate: '14 April 1859',
    contribution:
      'Endowed the Sir Jamsetjee Jeejebhoy Hospital (JJ Hospital), Sir J.J. School of Art, the Mahim Causeway linking Salsette to Mahim island, and water reservoirs across Pune and Bombay.',
    associatedPlaces: ['Sir J.J. School of Art', 'Mahim Causeway', 'Byculla', 'Fort'],
    image: CSMVS_IMAGE,
    relatedSites: ['site_crawford', 'site_csmt'],
  },
  {
    id: 'per_naoroji',
    name: 'Dadabhai Naoroji ("The Grand Old Man of India")',
    role: 'Statesman, Economist & Freedom Pioneer',
    biography:
      'Born in Navsari and educated in Bombay at Elphinstone College, Naoroji was the first Asian to be elected to the British Parliament (House of Commons). Author of the seminal "Poverty and Un-British Rule in India" detailing the economic drain theory.',
    birthDate: '4 September 1825',
    deathDate: '30 June 1917',
    contribution:
      'Pioneered the economic critique of colonial rule, co-founded the Indian National Congress in Bombay in 1885, and mentored Gopal Krishna Gokhale and Mahatma Gandhi.',
    associatedPlaces: ['Elphinstone College', 'D.N. Road Heritage Mile', 'Gowalia Tank'],
    image: CSMT_IMAGE,
    relatedSites: ['site_high_court', 'site_asiatic'],
  },
  {
    id: 'per_ambedkar',
    name: 'Dr. Bhimrao Ramji Ambedkar',
    role: 'Chief Architect of the Indian Constitution, Jurist & Social Crusader',
    biography:
      'Leader of the Dalit movement, scholar, and the primary draftsman of the Constitution of India. Lived and studied in Mumbai, enrolled as an advocate at the Bombay High Court, and established Siddharth College and Milind College.',
    birthDate: '14 April 1891',
    deathDate: '6 December 1956',
    contribution:
      'Authored the Constitution of the Republic of India, established institutional protections against caste discrimination, and led landmark social agitations like the Mahad Satyagraha.',
    associatedPlaces: ['Bombay High Court', 'Rajgriha (Dadar Hindu Colony)', 'Chaitya Bhoomi (Dadar Chowpatty)'],
    image: GATEWAY_IMAGE,
    relatedSites: ['site_high_court'],
  },
  {
    id: 'per_gandhi',
    name: 'Mahatma Mohandas Karamchand Gandhi',
    role: 'Leader of the Indian Independence Movement',
    biography:
      'Gandhi’s strategic headquarters in Bombay was Mani Bhavan on Laburnum Road. From this unassuming mansion in Gamdevi, he launched landmark national non-violent campaigns that galvanized millions of Indians across all faiths.',
    birthDate: '2 October 1869',
    deathDate: '30 January 1948',
    contribution:
      'Launched the historic Quit India Resolution on 8 August 1942 at Gowalia Tank Maidan (August Kranti Maidan) in Mumbai, declaring "Do or Die" to the British colonial administration.',
    associatedPlaces: ['Mani Bhavan', 'August Kranti Maidan', 'Chowpatty Beach'],
    image: HERO_IMAGE,
    relatedSites: ['site_gateway'],
  },
  {
    id: 'per_tilak',
    name: 'Lokmanya Bal Gangadhar Tilak',
    role: 'Freedom Fighter, Editor & Nationalist Leader',
    biography:
      'A fiery nationalist teacher, lawyer, and journalist who popularized the slogan "Swaraj is my birthright and I shall have it!". Tried and defended in the Bombay High Court in 1897 and 1908.',
    birthDate: '23 July 1856',
    deathDate: '1 August 1920',
    contribution:
      'Transformed the celebration of Ganeshotsav in 1893 into a mass public nationalist festival, founding the Kesari newspaper and mobilizing the Indian masses.',
    associatedPlaces: ['Sardar Griha near Crawford Market', 'Bombay High Court', 'Girgaon Chowpatty'],
    image: CSMT_IMAGE,
    relatedSites: ['site_high_court', 'site_crawford'],
  },
  {
    id: 'per_sorabji',
    name: 'Cornelia Sorabji',
    role: 'Pioneering Jurist & First Female Advocate in India',
    biography:
      'The first female graduate from Bombay University and the first woman to read law at Oxford University. Later admitted to practice law in the courts of British India, fighting for the legal rights of purdahnashin women.',
    birthDate: '15 November 1866',
    deathDate: '6 July 1954',
    contribution:
      'Pioneered legal representation for marginalized and secluded women across Western India, opening the legal profession to Indian women.',
    associatedPlaces: ['University of Mumbai', 'Bombay High Court'],
    image: KANHERI_IMAGE,
    relatedSites: ['site_rajabai', 'site_high_court'],
  },
];

export const INITIAL_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'time_01',
    title: 'Rock-cut Excavations at Kanheri and Elephanta',
    period: 'Ancient & Early History',
    dateDisplay: 'Circa 200 BCE – 600 CE',
    yearNumeric: -200,
    description:
      'Buddhist monks sculpt elaborate chaityas and viharas out of volcanic basalt at Kanheri on Salsette Island. At Elephanta Island in the harbour, colossal rock-cut Shaivite cave temples featuring the celebrated Sadashiva Trimurti are carved.',
    relatedLocations: ['Kanheri Caves', 'Elephanta Caves', 'Sopara'],
    relatedPersonalities: ['Satavahana Kings', 'Rashtrakuta Dynasts'],
    image: KANHERI_IMAGE,
  },
  {
    id: 'time_02',
    title: 'The Raja Bhimdev Settlement of Mahikawati',
    period: 'Medieval Period',
    dateDisplay: 'Circa 1290 CE',
    yearNumeric: 1290,
    description:
      'King Bhimdev establishes his capital at Mahikawati (modern-day Mahim), bringing Pathare Prabhu, Bhandari, and Agri communities, constructing temples, and establishing Mumbai’s first urban court administrative system.',
    relatedLocations: ['Mahim', 'Prabhadevi', 'Walkeshwar'],
    relatedPersonalities: ['Raja Bhimdev'],
    image: GATEWAY_IMAGE,
  },
  {
    id: 'time_03',
    title: 'Portuguese Treaty of Bassein and Manor Estates',
    period: 'Portuguese Period',
    dateDisplay: '1534 CE',
    yearNumeric: 1534,
    description:
      'Sultan Bahadur Shah of Gujarat cedes the Seven Islands of Bombay and Bassein (Vasai) to the Portuguese Empire under Nuno da Cunha. Portuguese Franciscan and Jesuit orders erect coastal churches and fortresses at Mahim, Worli, and Bandra.',
    relatedLocations: ['Bassein Fort', 'Bandra Fort', 'St. Michael Church Mahim'],
    relatedPersonalities: ['Nuno da Cunha', 'Garcia de Orta'],
    image: HERO_IMAGE,
  },
  {
    id: 'time_04',
    title: 'Royal Dowry Treaty and British Crown Acquisition',
    period: 'British/Bombay Period',
    dateDisplay: '1661–1668 CE',
    yearNumeric: 1661,
    description:
      'The Seven Islands of Bombay are transferred by King Afonso VI of Portugal to King Charles II of England as part of the royal dowry for Princess Catherine of Braganza. In 1668, Charles II leases the islands to the British East India Company for £10 of gold per year.',
    relatedLocations: ['Bombay Castle', 'Fort St. George', 'Colaba'],
    relatedPersonalities: ['Gerald Aungier', 'Humphrey Cooke'],
    image: HERO_IMAGE,
  },
  {
    id: 'time_05',
    title: 'Hornby Vellard and the Reclamation of the Seven Islands',
    period: '19th Century',
    dateDisplay: '1782–1845 CE',
    yearNumeric: 1782,
    description:
      'Governor William Hornby constructs the Hornby Vellard causeway to plug the Great Breach at Mahalaxmi, preventing tidal inundation of the central marshlands. Subsequent civil engineering projects merge the original Seven Islands into one contiguous landmass.',
    relatedLocations: ['Mahalaxmi', 'Breach Candy', 'Haji Ali Causeway'],
    relatedPersonalities: ['Governor William Hornby'],
    image: CSMT_IMAGE,
  },
  {
    id: 'time_06',
    title: 'First Passenger Railway in Asia (Bombay to Thane)',
    period: '19th Century',
    dateDisplay: '16 April 1853',
    yearNumeric: 1853,
    description:
      'At 3:35 PM, the first commercial passenger train in Asia steams out of Bori Bunder station (now CSMT site) hauling 14 carriages and 400 guests over 21 miles to Thane, powered by three steam locomotives named Sindh, Sultan, and Sahib.',
    relatedLocations: ['CSMT (Bori Bunder)', 'Sion', 'Thane'],
    relatedPersonalities: ['Nana Jagannath Shankarseth', 'Sir Jamsetjee Jejeebhoy'],
    image: CSMT_IMAGE,
  },
  {
    id: 'time_07',
    title: 'Birth of the Indian National Congress',
    period: '19th Century',
    dateDisplay: '28 December 1885',
    yearNumeric: 1885,
    description:
      '72 delegates from across India gather at Gokuldas Tejpal Sanskrit College near Gowalia Tank in Bombay, forming the Indian National Congress to fight for self-governance and democratic rights.',
    relatedLocations: ['Gokuldas Tejpal College', 'August Kranti Maidan', 'Girgaon'],
    relatedPersonalities: ['Dadabhai Naoroji', 'Allan Octavian Hume', 'W.C. Bonnerjee'],
    image: HERO_IMAGE,
  },
  {
    id: 'time_08',
    title: 'Quit India Movement Launched at Gowalia Tank',
    period: 'Indian Independence Movement',
    dateDisplay: '8 August 1942',
    yearNumeric: 1942,
    description:
      'The All-India Congress Committee meets at Gowalia Tank Maidan in South Mumbai. Mahatma Gandhi delivers his fiery "Do or Die" speech, sparking the nationwide Quit India civil resistance movement against colonial rule.',
    relatedLocations: ['August Kranti Maidan', 'Mani Bhavan'],
    relatedPersonalities: ['Mahatma Gandhi', 'Aruna Asaf Ali', 'Maulana Abul Kalam Azad'],
    image: HERO_IMAGE,
  },
  {
    id: 'time_09',
    title: 'Samyukta Maharashtra Movement and Modern Mumbai',
    period: 'Post-Independence Mumbai',
    dateDisplay: '1 May 1960',
    yearNumeric: 1960,
    description:
      'Following intense mass democratic mobilization led by the Samyukta Maharashtra Samiti, the bilingual Bombay State is reorganized. The historic state of Maharashtra is inaugurated with Mumbai as its proud capital city.',
    relatedLocations: ['Flora Fountain (Hutatma Chowk)', 'Shivaji Park'],
    relatedPersonalities: ['Acharya Atre', 'S.A. Dange', 'Senapati Bapat'],
    image: GATEWAY_IMAGE,
  },
];

export const INITIAL_CULTURAL_HERITAGE: CulturalHeritage[] = [
  {
    id: 'cul_koli',
    title: 'Koli Fisherfolk Community Heritage',
    category: 'Communities',
    description:
      'The Kolis are the indigenous fisherfolk of Mumbai who inhabited the Seven Islands centuries before colonial arrival. They maintain their distinctive dialect, traditional seafaring knowledge, customs, and matriarchal fish-vending networks.',
    history:
      'Dating back over 2,000 years, the Kolis named several of Mumbai’s islands and localities, including Mumbadevi (from whom Mumbai gets its modern name), Kolaba (Colaba), and Worli.',
    culturalSignificance:
      'Their deep connection to the Arabian Sea, reverence for sea goddess Hinglaj Mata and Mumbadevi, and sustainable tidal fishing practices represent the primordial foundation of Mumbai’s cultural identity.',
    relatedLocations: ['Worli Koliwada', 'Versova Koliwada', 'Cuffe Parade', 'Mumbadevi Temple'],
    image: GATEWAY_IMAGE,
  },
  {
    id: 'cul_irani_cafe',
    title: 'Irani Café Tradition & Culinary Culture',
    category: 'Food Heritage',
    description:
      'Irani cafés were established by Zoroastrian and Bahá’í Iranian immigrants in the late 19th and early 20th centuries. Renowned for bentwood Thonet chairs, marble-topped tables, etched mirrors, Brun Maska, and steaming cups of spiced Irani chai.',
    history:
      'Situated predominantly at road corners, Irani cafés were among the first non-segregated secular spaces in colonial Bombay where people of all castes, religions, and economic classes gathered freely.',
    culturalSignificance:
      'An indelible cultural pillar of Mumbai’s urban cosmopolitanism, immortalized in modern Indian literature, poetry, and nostalgia.',
    relatedLocations: ['Fort Heritage District', 'Dhobi Talao', 'Grant Road', 'Colaba'],
    image: HERO_IMAGE,
  },
  {
    id: 'cul_ganesh_utsav',
    title: 'Sarvajanik Ganeshotsav Festival Tradition',
    category: 'Festivals',
    description:
      'The 10-day community celebration honoring Lord Ganesha, transformed by freedom fighter Lokmanya Bal Gangadhar Tilak in 1893 from a private household puja into a mass public festival to unify Indians against British colonial censorship.',
    history:
      'Tilak used the Keshavji Naik Chawl in Girgaon as the birthplace of Sarvajanik Ganeshotsav, turning celebration pandals into venues for patriotic speeches, political mobilization, and cultural arts.',
    culturalSignificance:
      'Today, Mumbai’s Ganeshotsav is an incomparable spectacle of faith, community philanthropy, folk music, and secular solidarity celebrated across millions of citizens.',
    relatedLocations: ['Girgaon Keshavji Naik Chawl', 'Lalbaug', 'Girgaon Chowpatty Beach'],
    image: CSMVS_IMAGE,
  },
  {
    id: 'cul_dabbawalas',
    title: 'Mumbai Dabbawala Delivery Network',
    category: 'Traditional Occupations',
    description:
      'Mumbai’s legendary 130-year-old meal delivery system where over 5,000 Dabbawalas transport approximately 200,000 freshly cooked home lunches to office workers every single day using local suburban trains and bicycles.',
    history:
      'Started in 1890 by Mahadeo Havaji Bachche with about 100 men delivering tiffins to Parsi and British businessmen across the Fort area.',
    culturalSignificance:
      'Celebrated globally by Harvard Business School for their Six Sigma precision without barcode scanners, computers, or high-tech devices, relying on an ingenious color-coded numbering system.',
    relatedLocations: ['Churchgate Station', 'CSMT Station', 'Dadar Central Station'],
    image: CSMT_IMAGE,
  },
  {
    id: 'cul_lavani_theater',
    title: 'Marathi Folk Theatre & Natyasangeet Tradition',
    category: 'Performing Arts',
    description:
      'Mumbai’s vibrant theatrical history, spanning Tamasha, Lavani folk dances, and classical Sangeet Natak (musical drama) performed in historic venues like the Royal Opera House and Girgaon sabhas.',
    history:
      'In the late 19th and early 20th centuries, Girgaon and Grant Road became the Broadway of Western India, hosting legendary Marathi drama companies and shaping early Indian cinema.',
    culturalSignificance:
      'Preserves the poetic richness of Marathi literature and classical ragas while providing social commentary on feudalism and modernity.',
    relatedLocations: ['Royal Opera House', 'Sahitya Sangh Mandir (Girgaon)', 'Shivaji Mandir (Dadar)'],
    image: KANHERI_IMAGE,
  },
];

export const INITIAL_VIRTUAL_ROOMS: VirtualExhibitRoom[] = [
  {
    roomId: 'room_1',
    roomNumber: 1,
    roomTitle: 'Ancient Mumbai & The Seven Islands',
    theme: 'Geological, Indigenous & Buddhist Origins',
    era: '3rd Century BCE – 13th Century CE',
    exhibits: [
      {
        id: 'vex_01',
        room: 'Room 1',
        title: 'The Seven Islands Archipelago',
        description:
          'Before reclamation, Mumbai was a group of seven separate islands: Isle of Bombay, Colaba, Old Woman’s Island, Mazagaon, Parel, Worli, and Mahim.',
        historicalContext:
          'The islands were separated by tidal creeks and mangrove mudflats inhabited by indigenous Koli mariners.',
        image: HERO_IMAGE,
        period: 'Ancient to Medieval Period',
        audioGuidePlaceholder: 'Discover how the original archipelago was charted by Ptolemy and settled by Buddhist and indigenous mariners.',
      },
      {
        id: 'vex_01b',
        room: 'Room 1',
        title: 'Kanheri Monastic University',
        description:
          'Over 100 rock-cut caves carved into black basalt hills, functioning as a vibrant center of Buddhist learning and shelter for Silk Road merchants.',
        historicalContext:
          'Cave 3 features a 22-foot standing Buddha sculpture dating to the 5th century CE.',
        image: KANHERI_IMAGE,
        period: '1st Century BCE – 10th Century CE',
        audioGuidePlaceholder: 'Listen to the acoustic resonance inside Cave 3’s vaulted chaitya prayer hall.',
      },
    ],
  },
  {
    roomId: 'room_2',
    roomNumber: 2,
    roomTitle: 'Bombay Under Colonial Rule & Reclamation',
    theme: 'The Great Breach, Engineering & Trade Expansion',
    era: '1661 – 1860 CE',
    exhibits: [
      {
        id: 'vex_02',
        room: 'Room 2',
        title: 'The Hornby Vellard Engineering Breakthrough',
        description:
          'Governor William Hornby defied the East India Company directors in 1782 to build the causeway blocking the catastrophic sea breach at Mahalaxmi.',
        historicalContext:
          'This bold public works project initiated over 150 years of civil engineering that unified Mumbai into a singular landmass.',
        image: CSMT_IMAGE,
        period: '18th & 19th Century',
        audioGuidePlaceholder: 'Step onto the newly reclaimed causeway of 1784 that saved central Bombay from daily tidal flooding.',
      },
      {
        id: 'vex_02b',
        room: 'Room 2',
        title: 'The 1853 First Passenger Railway in Asia',
        description:
          'The historic inaugural run from Bori Bunder to Thane on 16 April 1853, marking the birth of Indian railways.',
        historicalContext:
          'Three steam locomotives—Sindh, Sultan, and Sahib—hauled 400 dignitaries in 14 carriages over 21 miles.',
        image: CSMT_IMAGE,
        period: '1853 CE',
        audioGuidePlaceholder: 'Hear the celebratory 21-gun salute that accompanied Asia’s first train departure.',
      },
    ],
  },
  {
    roomId: 'room_3',
    roomNumber: 3,
    roomTitle: 'Mumbai’s Architectural Renaissance',
    theme: 'Victorian Gothic & Art Deco Dialogue across the Oval',
    era: '1870 – 1950 CE',
    exhibits: [
      {
        id: 'vex_03',
        room: 'Room 3',
        title: 'Victorian Gothic & Art Deco Ensembles',
        description:
          'Mumbai possesses the second largest collection of Art Deco buildings in the world after Miami, directly facing Victorian Gothic monuments across the Oval Maidan.',
        historicalContext:
          'Inscribed together as a UNESCO World Heritage Site in 2018, representing the dual architectural soul of Mumbai.',
        image: GATEWAY_IMAGE,
        period: 'Late 19th to Mid 20th Century',
        audioGuidePlaceholder: 'Stand in the Oval Maidan and observe the striking dialogue between Gothic spires and sleek ocean-liner curves.',
      },
    ],
  },
  {
    roomId: 'room_4',
    roomNumber: 4,
    roomTitle: 'The Freedom Movement in Bombay',
    theme: 'August Kranti, Mani Bhavan & Civil Defiance',
    era: '1885 – 1947 CE',
    exhibits: [
      {
        id: 'vex_04',
        room: 'Room 4',
        title: 'August Kranti: Epicenter of Non-Violent Defiance',
        description:
          'On 8 August 1942, tens of thousands gathered at Gowalia Tank Maidan to hear Mahatma Gandhi proclaim Quit India.',
        historicalContext:
          'Young activist Aruna Asaf Ali bravely hoisted the Indian National Flag on 9 August despite tear gas and British police bayonets.',
        image: HERO_IMAGE,
        period: '1915–1947 CE',
        audioGuidePlaceholder: 'Listen to historic recordings and eyewitness accounts of the August Kranti revolt in South Mumbai.',
      },
    ],
  },
  {
    roomId: 'room_5',
    roomNumber: 5,
    roomTitle: 'Mumbai’s Living Cultural Heritage',
    theme: 'Communities, Food Traditions & Indigenous Life',
    era: 'Ancestral to Modern Era',
    exhibits: [
      {
        id: 'vex_05',
        room: 'Room 5',
        title: 'The Marine Legacy of Worli and Versova Koliwadas',
        description:
          'An interactive exhibition celebrating indigenous marine folklore, traditional songs, fishing gear, and coastal ecology.',
        historicalContext:
          'Shows how contemporary community heritage archives are preserving ancestral boat-building knowledge and coastal biodiversity.',
        image: KANHERI_IMAGE,
        period: 'Contemporary Heritage',
        audioGuidePlaceholder: 'Experience the vibrant chants of Koli fishermen setting sail into the Arabian Sea at dawn.',
      },
    ],
  },
  {
    roomId: 'room_6',
    roomNumber: 6,
    roomTitle: 'Modern Mumbai & Heritage Conservation',
    theme: 'Restoring Mumbai’s Architectural Jewels',
    era: '1995 – Present',
    exhibits: [
      {
        id: 'vex_06',
        room: 'Room 6',
        title: 'Restoring Mumbai’s Victorian and Art Deco Jewels',
        description:
          'A showcase on modern restoration initiatives that revived the Royal Opera House, CSMVS gardens, Flora Fountain, and David Sassoon Library.',
        historicalContext:
          'Highlighting modern conservation techniques that use original Porbandar and Kurla stones to protect Mumbai’s fragile heritage from coastal humidity.',
        image: CSMVS_IMAGE,
        period: '21st Century Conservation',
        audioGuidePlaceholder: 'Learn how master stone carvers and architects restore 140-year-old stained glass and gargoyles.',
      },
    ],
  },
];

export const INITIAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q_01',
    category: 'Mumbai History',
    question: 'In what year did the first commercial passenger railway train in Asia run between Bombay and Thane?',
    optionA: '1848',
    optionB: '1853',
    optionC: '1857',
    optionD: '1869',
    correctAnswer: 1,
    explanation: 'The historic 21-mile journey took place on 16 April 1853 from Bori Bunder to Thane, powered by the locomotives Sindh, Sultan, and Sahib.',
    difficulty: 'easy',
  },
  {
    id: 'q_02',
    category: 'Mumbai Architecture',
    question: 'Who was the chief architect of Chhatrapati Shivaji Maharaj Terminus (formerly Victoria Terminus)?',
    optionA: 'George Wittet',
    optionB: 'Sir George Gilbert Scott',
    optionC: 'Frederick William Stevens',
    optionD: 'Edwin Lutyens',
    correctAnswer: 2,
    explanation: 'Frederick William Stevens designed the majestic Victorian Gothic headquarters over a ten-year construction period from 1878 to 1887.',
    difficulty: 'medium',
  },
  {
    id: 'q_03',
    category: 'Mumbai History',
    question: 'Which ancient Buddhist rock-cut complex within Mumbai features 109 caves dating from 1st century BCE to 10th century CE?',
    optionA: 'Ajanta Caves',
    optionB: 'Kanheri Caves',
    optionC: 'Ellora Caves',
    optionD: 'Karla Caves',
    correctAnswer: 1,
    explanation: 'Kanheri Caves, located in Sanjay Gandhi National Park (Borivali), served as a major Buddhist monastic university on the ancient silk and maritime routes.',
    difficulty: 'easy',
  },
  {
    id: 'q_04',
    category: 'Museums',
    question: 'Which Mumbai museum received the UNESCO Asia-Pacific Award of Excellence for Cultural Heritage Conservation in 2022?',
    optionA: 'Dr. Bhau Daji Lad Museum',
    optionB: 'CSMVS (formerly Prince of Wales Museum)',
    optionC: 'RBI Monetary Museum',
    optionD: 'Mani Bhavan',
    correctAnswer: 1,
    explanation: 'Chhatrapati Shivaji Maharaj Vastu Sangrahalaya (CSMVS) won the prestigious UNESCO Award of Excellence in 2022 for its comprehensive centenary restoration.',
    difficulty: 'medium',
  },
  {
    id: 'q_05',
    category: 'Mumbai Architecture',
    question: 'Premchand Roychand funded the construction of the Rajabai Clock Tower on one condition. What was it?',
    optionA: 'It must chime every 15 minutes',
    optionB: 'It must be named after his mother Rajabai',
    optionC: 'It must be taller than Big Ben',
    optionD: 'It must be built out of Italian marble',
    correctAnswer: 1,
    explanation: 'Premchand Roychand donated ₹2,00,000 so that the tower would bear his devout mother’s name, allowing her to hear the chimes and break her fast before sunset.',
    difficulty: 'medium',
  },
  {
    id: 'q_06',
    category: 'Forts',
    question: 'Which British Governor constructed the Sion Fort in the 1670s to mark the boundary between British Parel and Portuguese Salsette?',
    optionA: 'Gerald Aungier',
    optionB: 'William Hornby',
    optionC: 'Bartle Frere',
    optionD: 'Mountstuart Elphinstone',
    correctAnswer: 0,
    explanation: 'Gerald Aungier, who served as Governor of Bombay from 1669 to 1677, heavily fortified the islands, creating forts at Sion, Sewri, and Worli.',
    difficulty: 'hard',
  },
  {
    id: 'q_07',
    category: 'Culture',
    question: 'Who transformed the private domestic celebration of Ganesh Utsav into a mass public (Sarvajanik) festival in Bombay in 1893?',
    optionA: 'Mahatma Jyotirao Phule',
    optionB: 'Lokmanya Bal Gangadhar Tilak',
    optionC: 'Gopal Krishna Gokhale',
    optionD: 'Nana Jagannath Shankarseth',
    correctAnswer: 1,
    explanation: 'Lokmanya Tilak organized the first public Ganeshotsav at Keshavji Naik Chawl in Girgaon in 1893 to overcome British bans on public political gatherings.',
    difficulty: 'easy',
  },
  {
    id: 'q_08',
    category: 'Famous Personalities',
    question: 'From which historic South Mumbai home did Mahatma Gandhi launch the Non-Cooperation and Civil Disobedience campaigns?',
    optionA: 'Jinnah House',
    optionB: 'Mani Bhavan on Laburnum Road',
    optionC: 'Aga Khan Palace',
    optionD: 'Birla House',
    correctAnswer: 1,
    explanation: 'Mani Bhavan served as Gandhi’s headquarters in Bombay from 1917 to 1934 and is now a revered national memorial museum.',
    difficulty: 'easy',
  },
  {
    id: 'q_09',
    category: 'Mumbai Architecture',
    question: 'Beside Victorian Gothic, Mumbai is celebrated globally for possessing the second largest cluster in the world of which 20th-century architectural style?',
    optionA: 'Brutalist Architecture',
    optionB: 'Art Deco',
    optionC: 'Baroque Revival',
    optionD: 'Bauhaus Industrial',
    correctAnswer: 1,
    explanation: 'Mumbai boasts the world’s second largest concentration of Art Deco structures after Miami, famously clustered along Marine Drive and the Oval Maidan.',
    difficulty: 'easy',
  },
  {
    id: 'q_10',
    category: 'Culture',
    question: 'Which indigenous community is recognized as the original fisherfolk inhabitants of Mumbai’s seven islands?',
    optionA: 'Warli community',
    optionB: 'Koli community',
    optionC: 'Gond community',
    optionD: 'Bhil community',
    correctAnswer: 1,
    explanation: 'The Kolis are the original native mariners of Mumbai who named Mumbadevi, Colaba, and Worli, and continue their seafaring traditions in historical Koliwadas.',
    difficulty: 'easy',
  },
  {
    id: 'q_11',
    category: 'Mumbai History',
    question: 'What civil engineering structure built in 1782 plugged the Great Breach at Mahalaxmi and began the unification of Mumbai’s seven islands?',
    optionA: 'Mahim Causeway',
    optionB: 'Hornby Vellard',
    optionC: 'Apollo Bunder Pier',
    optionD: 'Bandra Reclamation',
    correctAnswer: 1,
    explanation: 'The Hornby Vellard was built under Governor William Hornby to stop the sea inundating the central lowlands of Bombay.',
    difficulty: 'medium',
  },
  {
    id: 'q_12',
    category: 'Famous Personalities',
    question: 'Who was the first Asian to be elected to the British Parliament (House of Commons) in 1892, representing Finsbury Central?',
    optionA: 'Sir Pherozeshah Mehta',
    optionB: 'Dadabhai Naoroji',
    optionC: 'Dinshaw Wacha',
    optionD: 'W.C. Bonnerjee',
    correctAnswer: 1,
    explanation: 'Dadabhai Naoroji, known as the Grand Old Man of India, won election to the British Parliament and formulated the economic drain theory of colonial rule.',
    difficulty: 'medium',
  },
];

export const DEMO_USERS: User[] = [
  {
    id: 'usr_admin_01',
    name: 'Heritage Curator Admin',
    email: 'admin@heritagevault.demo',
    role: 'admin',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    bio: 'Senior Digital Archivist & Mumbai Architectural Historian. Overseeing cataloging of colonial and medieval monuments.',
    createdAt: '2026-01-15T10:00:00Z',
    isActive: true,
  },
  {
    id: 'usr_visitor_01',
    name: 'Arjun Deshmukh',
    email: 'visitor@heritagevault.demo',
    role: 'visitor',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    bio: 'Student researcher in urban history and architecture at the University of Mumbai.',
    createdAt: '2026-02-10T14:30:00Z',
    isActive: true,
  },
];
