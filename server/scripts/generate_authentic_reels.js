import fs from 'fs';
import path from 'path';

const REELS_SERVER_PATH = path.resolve('server/data/reels.json');
const REELS_SRC_PATH = path.resolve('src/data/defaultReels.json');
const E6_PATH = path.resolve('server/data/reels_e61b1ac.json');

const e6List = JSON.parse(fs.readFileSync(E6_PATH, 'utf8'));

// Build lookup map of the 33 reels from e6
const e6Map = new Map();
e6List.forEach(r => {
  const filename = path.basename(r.videoUrl);
  e6Map.set(filename, r);
});

// Specific clean titles, descriptions, and categories for the 33 items to ensure 100% correlation
const cleanMetadataOverrides = {
  "ig_navratri_united_way.mp4": {
    title: "United Way Vadodara: 30,000+ Dancers in Hypnotic Circular Raas",
    description: "Over 30,000 dancers moving in mesmerizing concentric circles under the Sharad Poonam night sky at United Way Vadodara. The spiritual energy, traditional beats, and synchronized footwork of Gujarat's grandest Navratri festival. #Navratri #Garba #UnitedWay #Baroda #Gujarat #Dandiya #CulturalHeritage",
    category: "Culture & Dance",
    transcript: "Aerial view of United Way Vadodara Garba ground. Tens of thousands of dancers in traditional attire move seamlessly in synchronized concentric rings to the beat of authentic Gujarati folk music."
  },
  "ig_DdPNT9Yyp8H.mp4": {
    title: "Designing an Aesthetic GitHub Profile README with Dynamic Stats",
    description: "Trying to make my GitHub profile stand out! Adding dynamic streak cards, language breakdown badges, and clean markdown layout for tech recruiters. #github #coding #programming #webdev #portfolio #developerlife",
    category: "Tech & AI",
    transcript: "Trying to make my GitHub profile look super clean with custom markdown cards, animated header SVGs, and automated GitHub Actions metrics."
  },
  "ig_tmkoc_Dc0d1dtu1ug.mp4": {
    title: "Gokuldham Society Special: Jethalal & Bapuji Fun Moments",
    description: "Gokuldham Society Special: Jethalal & Bapuji morning fun! Jethalal's expressions and Champaklal's scolding make every morning hilarious. #TMKOC #Jethalal #TaarakMehtaKaOoltahChashmah #Comedy #IndianSitcom #Gokuldham",
    category: "Entertainment & Comedy",
    transcript: "Bapuji scolds Jethalal early in the morning in the Gokuldham society apartment while Jethalal tries to give funny excuses."
  },
  "ig_DdWqxO-sR9e.mp4": {
    title: "Morning Calisthenics Activation: Full-Body Joint Mobility Routine",
    description: "Morning activation routine! Shoulder dislocation stretches, scapular retractions, and deep wrist prep before heavy calisthenics training. #calisthenics #mobility #morningroutine #fitness #bodyweight #streetworkout",
    category: "Fitness & Health",
    transcript: "Morning joint mobility activation sequence: shoulder rotations, wrist conditioning, and deep scapular engagement on gymnastic rings."
  },
  "ig_navratri_dodhiya_steps.mp4": {
    title: "Traditional 14-Step Dodhiya: Master the Footwork & Claps",
    description: "Master the authentic 14-step Dodhiya! Breakdown of footwork, rhythm transition, and traditional claps for Navratri Garba nights. #GarbaTutorial #Dodhiya #Navratri #Gujarat #FolkDance #DandiyaRaas",
    category: "Culture & Dance",
    transcript: "Step-by-step breakdown of 14-step Dodhiya Garba: right foot tap, turn and clap, cross back, and dynamic spin on tempo."
  },
  "ig_DdVTdiOPDtt.mp4": {
    title: "खुद से मिलने निकला हूँ: Rustic Village & Nature Serenity",
    description: "Exploring the rustic village roads, golden mustard fields, and peaceful rural life of India. Travel therapy away from city noise. #IncredibleIndia #RuralLife #VillageVibes #Wanderlust #NatureLovers #TravelGram",
    category: "Travel & Adventure",
    transcript: "Walking through serene rural countryside roads surrounded by open green fields and fresh village air. A peaceful journey into nature."
  },
  "ig_tmkoc_DdBV_uOhjGp.mp4": {
    title: "Jethalal Iconic Comedy Timing & Expressions",
    description: "Jethalal's legendary comedic expressions, confused looks, and hilarious timing in Gokuldham Society. #TMKOC #Jethalal #ComedyScenes #Gokuldham #DilipJoshi #IndianSitcom",
    category: "Entertainment & Comedy",
    transcript: "Jethalal delivering his classic comic expressions and hilarious situational dialogue in the Gokuldham society clubhouse."
  },
  "ig_DdZIPD-RVve.mp4": {
    title: "Switching to an Automatic Home Espresso Setup: Rich Crema Extraction",
    description: "Switching to an automatic home espresso setup was the best decision! Watch the golden tiger-striped crema pull through the bottomless portafilter. #espresso #coffee #barista #morningritual #crema #specialtycoffee",
    category: "Food & Lifestyle",
    transcript: "Switching to an automatic home espresso setup was the best decision. Watch this rich golden crema extract smoothly at 9 bars of pressure."
  },
  "ig_navratri_titodo_sanedo.mp4": {
    title: "Energetic Titodo & Sanedo: Authentic Kathiawadi High-Tempo Beats",
    description: "High-energy Titodo and Sanedo beats! Fast-paced Gujarati folk footwork and non-stop spinning raas energy under festive lights. #Navratri #Titodo #Sanedo #Garba #Kathiyawadi #Gujarat #Dandiya",
    category: "Culture & Dance",
    transcript: "The tempo accelerates into energetic Titodo and Sanedo steps as dancers pick up speed to the thundering live dhol beats."
  },
  "ig_DdUcTDvzIrk.mp4": {
    title: "Day 3/∞ Deep Work Desk Session: High-Focus Study Grind",
    description: "Day 3/∞ of deliberate study habits. Clean desk, warm amber lamp, notebook active recall, and zero phone distractions. #studygram #studymotivation #deepwork #pomodoro #productivity #studentlife",
    category: "Productivity & Growth",
    transcript: "Day 3 of our study challenge: warm desk lighting, focused handwriting notes, and phone placed in another room for 90 uninterrupted minutes."
  },
  "ig_tmkoc_DdYUJs9h43a.mp4": {
    title: "Jethalal vs Iyer & Babita Ji Hilarious Encounter",
    description: "Jethalal running into Babita Ji in Gokuldham compound while Iyer arrives with his suspicious look! Classic comedy chemistry. #TMKOC #Jethalal #BabitaJi #Iyer #GokuldhamComedy #Hilarious",
    category: "Entertainment & Comedy",
    transcript: "Jethalal cheerfully wishes 'Good Morning' to Babita Ji before being suddenly interrupted by Scientist Iyer in the Gokuldham compound."
  },
  "ig_DdWE6TpPpqu.mp4": {
    title: "Highline Balance: Titanium 9:1 Pulley System for Slackliners",
    description: "The new Titanium 9:1 mechanical pulley system for slackliners and highliners is here! Maximum mechanical advantage with minimal gear weight. #slackline #highline #adventure #balance #extremeoutdoor #engineering",
    category: "Mindfulness & Detox",
    transcript: "Setting up a highline with the new ultra-light titanium 9:1 pulley system. Smooth mechanical advantage and precise line tensioning."
  },
  "ig_navratri_chaniya_choli.mp4": {
    title: "Royal Kutch Chaniya Choli: Handcrafted Mirror Work & Dandiya Styling",
    description: "Handcrafted authentic Gujarati Navratri couture! Genuine Kutch mirror embroidery, vibrant 10-meter flare gher, and oxidized silver jewelry. #ChaniyaCholi #NavratriFashion #KutchWork #EthnicWear #GarbaOutfit #Gujarat",
    category: "Culture & Dance",
    transcript: "Showcasing royal Kutch handcrafted Chaniya Choli with intricate Abhla mirror embroidery and traditional oxidized silver jewelry styling."
  },
  "ig_DdU_XfZREJJ.mp4": {
    title: "Imagine All Your Friends Give You Digital Presents: 3D Tech Concept",
    description: "Creative 3D digital concept: what if all your friends gave you interactive digital birthday presents in AR? #tech #3dconcept #innovation #blender #digitalart #augmentedreality",
    category: "Tech & AI",
    transcript: "Imagine all your friends give you digital presents in 3D space. Exploring interactive creative tech concepts."
  },
  "ig_tmkoc_DdY3X2Csi2q.mp4": {
    title: "Chai Piyo Biscuit Khao! Bapuji & Jethalal Classic Scene",
    description: "The most iconic morning dialogue of Indian television: 'Chai Piyo, Biscuit Khao!' Bapuji guiding Jethalal with hilarious wisdom. #TMKOC #Bapuji #Jethalal #ChaiPiyoBiscuitKhao #ComedyClassic #IndianMemes",
    category: "Entertainment & Comedy",
    transcript: "Bapuji sitting on the swing commanding Jethalal with his iconic advice: Chai piyo, biscuit khao! A timeless Gokuldham scene."
  },
  "ig_DdXH_4Gtttc.mp4": {
    title: "Handstand & Core Progression: Safe Leg Raise Technique",
    description: "How to safely raise legs into a handstand and headstand without kicking or swinging! Core compression and shoulder stability breakdown. #handstand #calisthenics #headstand #coreworkout #fitnesstips #bodyweight",
    category: "Fitness & Health",
    transcript: "Learn how to safely press and raise your legs into a headstand using core compression rather than jumping or flailing."
  },
  "ig_navratri_dholida_performance.mp4": {
    title: "Dholida Raas: Fast-Paced Dhol Beats & High Energy Clapping",
    description: "Live stage performance of Dholida Raas! Lightning-fast synchronized claps, high-tempo spins, and electrifying live percussion. #Dholida #GarbaRaas #LiveDhol #NavratriDance #GujaratCulture #HighEnergy",
    category: "Culture & Dance",
    transcript: "Live stage performance of Dholida Raas with thunderous dhol percussion and high-speed synchronized group choreography."
  },
  "ig_DdV5tUnAUl6.mp4": {
    title: "Desert Heritage of Jodhpur: Cultural Traditions & Folk Music",
    description: "Exploring the authentic culture, folk music, colorful turbans, and desert heritage of Jodhpur, Rajasthan. #Jodhpur #Rajasthan #CulturalHeritage #DesertVibes #IncredibleIndia #FolkTraditions",
    category: "Travel & Adventure",
    transcript: "Experiencing traditional Rajasthani folk music, rich cultural heritage, and desert community life in Jodhpur."
  },
  "ig_DdYOAHWtQtq.mp4": {
    title: "Slow Sunday Morning: V60 Filter Coffee & Fresh Bakery Ritual",
    description: "Slow, intentional Sunday morning: hand-pouring a fresh V60 Ethiopian brew paired with a buttery croissant. #morningroutine #v60 #filtercoffee #slowliving #bakery #aestheticmorning",
    category: "Food & Lifestyle",
    transcript: "Pouring hot water over freshly ground specialty coffee in a V60 dripper. A quiet Sunday morning ritual of slow living."
  },
  "ig_DdW43OSsgU1.mp4": {
    title: "Minimalist Desk Study Setup: 2-Hour Focus Flow",
    description: "Minimalist aesthetic study desk: clean iPad notes, mechanical keyboard, soft focus lighting, and 2 hours of pure flow state. #studysetup #minimalism #deskgoals #ipadnotes #productivity #studyflow",
    category: "Productivity & Growth",
    transcript: "Minimalist desk space optimized for distraction-free studying. Note-taking, timer running, and high-efficiency workflow."
  },
  "ig_DdTB_BlxTvz.mp4": {
    title: "Deep Sound Healing & Inner Meditation Session",
    description: "Deep sound healing with Tibetan singing bowl resonance and spiritual reading. Calming the racing mind into silent tranquility. #meditation #soundhealing #singingbowl #innerpeace #mindfulness #spiritualjourney",
    category: "Mindfulness & Detox",
    transcript: "Ringing the Tibetan singing bowl. Let the sustained acoustic vibrations center your thoughts into present-moment peace."
  },
  "ig_DdW6CnyM94H.mp4": {
    title: "Late Night Coding & UI/UX Design Workflow",
    description: "Late night developer vibes: designing Figma interfaces, testing component states, and drinking hot coffee. #coding #uiux #figma #webdev #frontend #studentdeveloper #nightowl",
    category: "Tech & AI",
    transcript: "Late night coding session: crafting UI/UX wireframes in Figma and turning them into responsive frontend components."
  },
  "ig_DdWEbx9T__X.mp4": {
    title: "Frog Stand to Handstand: Step-by-Step Calisthenics Balance Progression",
    description: "Mastering bodyweight balance: progressing safely from the beginner frog stand to a full straight handstand hold. #calisthenics #frogstand #handstand #balance #streetworkout #progressions",
    category: "Fitness & Health",
    transcript: "Step-by-step balance progression: build wrist and forearm strength in frog stand before kicking up into a solid handstand."
  },
  "ig_DdNzj7yJAIW.mp4": {
    title: "City of Hills and Thrills: Mountain Pass Road Trip",
    description: "Cruising through winding serpentine mountain passes, misty cliffs, and scenic hill lookout vistas. #travel #wanderlust #roadtrip #mountains #scenicdrive #exploretheworld",
    category: "Travel & Adventure",
    transcript: "Driving through winding alpine roads surrounded by dramatic mountain valleys and breathtaking hill station views."
  },
  "ig_DdWlrQhyUHB.mp4": {
    title: "Artisan Bakery Pretzels & Fresh Brewed Morning Coffee",
    description: "Golden warm bakery pretzels fresh out of the oven paired with steaming morning coffee. The perfect cozy start. #bakery #coffee #freshbread #pretzel #cozyvibes #morningaesthetic",
    category: "Food & Lifestyle",
    transcript: "Freshly baked artisan pretzels with sea salt crystals paired with hot brewed coffee at a cozy bakery."
  },
  "ig_DdRas6aBycc.mp4": {
    title: "BEAT IT: Late Night Study Grind & Active Recall Revision",
    description: "BEAT IT! Intense late-night study revision with highlighters, active recall flashcards, and exam focus music. #studygram #examprep #activerecall #studymotivation #collegelife #studygrind",
    category: "Productivity & Growth",
    transcript: "Pushing through intense late-night study grind with active recall note testing and high-energy concentration."
  },
  "ig_DdYLr-AzOcx.mp4": {
    title: "Morning Yoga Pranayama & Mindful Meditation in the Himalayas",
    description: "Connecting with inner stillness: morning Pranayama breathwork and guided silent meditation amidst mountain air. #yoga #pranayama #meditation #himalayas #spirituality #innerpeace",
    category: "Mindfulness & Detox",
    transcript: "Deep diaphragmatic Pranayama breathwork in the peaceful Himalayan mountain breeze. Centering the mind and soul."
  },
  "ig_DdVEomDSc3-.mp4": {
    title: "How to Become a Software & AI Engineer in 2026: Complete Roadmap",
    description: "Want to crack software engineering, web development, or AI roles in 2026? Essential roadmap: Git, TypeScript, Python, LLMs, and DSA. #softwareengineer #aiengineer #webdev #codingroadmap #techcareers #programming",
    category: "Tech & AI",
    transcript: "Comprehensive roadmap for becoming a Software and AI Engineer in 2026: master foundations, build full-stack projects, and deploy LLM agents."
  },
  "ig_DdWQwyBtb4S.mp4": {
    title: "Explosive Muscle-Up & Pull-Up Technique Breakdown",
    description: "Unlocking the explosive bar muscle-up! False grip, explosive chest-to-bar pull, and aggressive hip drive mechanics. #muscleup #calisthenics #pullups #streetworkout #bodyweightpower #strength",
    category: "Fitness & Health",
    transcript: "Breaking down the explosive bar muscle-up: initiate with a powerful C-curve pull, drive hips toward the bar, and lean chest over in transition."
  },
  "ig_DdNYCxPyBLt.mp4": {
    title: "Golden Hour Airport Sunrise: The Thrill of Next Adventure",
    description: "There's nothing quite like watching the sunrise over an airport tarmac before catching an international departure flight. #travel #airportsunrise #wanderlust #solotravel #aviation #nextadventure",
    category: "Travel & Adventure",
    transcript: "Watching the golden morning sun rise over the airport tarmac through terminal glass before boarding the next international flight."
  },
  "ig_DdWmja7slR5.mp4": {
    title: "Despacio con Calma: Mindful Coffee Pause & Savoring the Moment",
    description: "Despacio, con calma... taking a deliberate mindful pause to truly savor the rich aroma and taste of your coffee cup. #mindfulcoffee #slowdown #espresso #presentmoment #mindfulness #spanishvibes",
    category: "Food & Lifestyle",
    transcript: "Slow down and take a mindful breath. Savor the warmth, aroma, and rich flavor of your coffee in this present moment."
  },
  "ig_DdYTVzIzE4u.mp4": {
    title: "Selection Day Motivation: Competitive Exam Preparation Grind",
    description: "Dedicated to every student grinding for competitive exams and uniforms. Hard work, early mornings, and unwavering discipline pay off. #upscmotivation #competitiveexams #discipline #success #hardwork #studygrind",
    category: "Productivity & Growth",
    transcript: "Discipline and persistent effort: honoring the grind of competitive exam preparation with early morning dedication."
  },
  "ig_DdMZzzCSeRI.mp4": {
    title: "Vedic Pranayama & Shaktipath Breathwork for Stress Release",
    description: "Ancient Vedic breathing practice tested through tradition to release deep mental fatigue, anxiety, and restore clarity. #pranayama #vedicwisdom #breathwork #stressrelief #yogicscience #innercalm",
    category: "Mindfulness & Detox",
    transcript: "Ancient rhythmic Pranayama technique to regulate the vagus nerve, soothe mental overthinking, and restore deep inner tranquility."
  }
};

// Now define the 17 additional unique reels (9 new + 8 demo/cinematics)
const additionalReels = [
  // 34. Python 60s
  {
    id: "reel-python-60s",
    title: "Learn Python in 60 Seconds: Core Syntax & Fast Hacks",
    creator: {
      name: "DevBytes Academy",
      handle: "@devbytes_python",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      verified: true,
      bio: "Bite-sized Python, AI engineering, and clean code principles in under 60 seconds"
    },
    videoUrl: "/videos/reel_python_60s.mp4",
    visualTheme: "python_matrix",
    description: "Learn Python in 59 seconds! Variables, f-strings, list comprehensions, and functions broken down with zero fluff. #python #coding #programming #learntocode #softwareengineering #developer",
    duration: 59,
    category: "Tech & AI",
    intent: "teach",
    goalTags: ["python", "coding", "software", "tech"],
    mood: "focus",
    likes: 81400,
    commentsCount: 1420,
    shares: 19800,
    views: 490000,
    isAIGenerated: false,
    safetyScore: 99,
    realityCheck: {
      verdict: "Verified Tech Standards",
      claim: "Python is the dominant language for modern AI, data science, and backend prototyping.",
      explanation: "According to the TIOBE and IEEE Spectrum indices, Python maintains the #1 programming index ranking driven by PyTorch, TensorFlow, and LLM tooling.",
      sources: [
        { name: "Python Software Foundation Official Docs", url: "https://python.org", credibility: "Official Language Foundation" }
      ],
      aiConfidence: 99
    },
    whyAmISeeingThis: {
      primaryReason: "You expressed interest in Python programming, software engineering, and software foundations.",
      matchedInterests: ["Python", "Coding", "Tech & AI"],
      signalWeight: { watchHistory: 45, goalAlignment: 30, currentMood: 15, collaborativeFilter: 10 },
      privacyNote: "Computed on-device for developer growth."
    },
    transcript: "Learn Python in 59 seconds: Python syntax is clean and readable. Variables, f-string formatting, list comprehensions, and defining functions with def.",
    usefulOutputs: {
      notes: {
        summary: "Core Python language constructs in 60 seconds.",
        bulletPoints: [
          "Use f-strings for fast, readable string interpolation.",
          "List comprehensions replace bulky for-loops with concise, vectorized expressions.",
          "Functions use def with clean 4-space indentation instead of curly brackets."
        ],
        keyTakeaway: "Python's simplicity lets you think like a programmer rather than fighting complex syntax."
      },
      quiz: [
        {
          question: "Which Python feature allows concise creation of transformed lists in a single line?",
          options: ["List Comprehensions", "Pointer Arithmetic", "Macro Expansions", "Struct Declarations"],
          correctIndex: 0,
          explanation: "List comprehensions offer a concise and readable way to build new lists!"
        }
      ],
      checklist: [
        { task: "Open Python REPL in terminal and test one f-string expression", minutes: 2 },
        { task: "Write a 1-line list comprehension to square even numbers", minutes: 3 }
      ],
      studyPlan: [
        { day: 1, focus: "Syntax Basics", action: "Practice data types, variables, and formatted print strings." },
        { day: 2, focus: "Data Structures", action: "Master lists, dictionaries, sets, and comprehension patterns." },
        { day: 3, focus: "Functions & Modules", action: "Build a CLI script using functions and the built-in sys module." }
      ]
    },
    sourceRights: {
      platform: "YouTube",
      creatorHandle: "@devbytes_python",
      rightsStatus: "Licensed Tech Tutorial",
      url: "https://www.youtube.com/watch?v=fabelAs_m08"
    }
  },

  // 35. JS Reverse String
  {
    id: "reel-js-reverse-string",
    title: "Reverse a String in JavaScript in 40 Seconds",
    creator: {
      name: "Code Snippets Pro",
      handle: "@codesnippetspro",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      verified: false,
      bio: "JavaScript algorithms, frontend interview prep, and clean code tips"
    },
    videoUrl: "/videos/reel_js_reverse_string.mp4",
    visualTheme: "javascript_glow",
    description: "Reverse a string in JavaScript in 40 seconds! Comparing split-reverse-join vs modern loop methods for coding interviews. #javascript #webdev #frontend #codinginterview #algorithms #learntocode",
    duration: 40,
    category: "Tech & AI",
    intent: "teach",
    goalTags: ["javascript", "algorithms", "web-dev", "frontend"],
    mood: "focus",
    likes: 42300,
    commentsCount: 380,
    shares: 8900,
    views: 240000,
    isAIGenerated: false,
    safetyScore: 99,
    realityCheck: {
      verdict: "Verified Algorithm",
      claim: "String manipulation algorithms are staple interview screening questions in frontend engineering.",
      explanation: "Understanding Array.prototype methods and pointer manipulation is foundational for technical evaluations.",
      sources: [
        { name: "MDN Web Docs: String and Array Prototype", url: "https://developer.mozilla.org", credibility: "Authoritative Web Documentation" }
      ],
      aiConfidence: 99
    },
    whyAmISeeingThis: {
      primaryReason: "You searched for JavaScript tutorials, web development tips, and algorithm practice.",
      matchedInterests: ["JavaScript", "Web Dev", "Algorithms"],
      signalWeight: { watchHistory: 45, goalAlignment: 30, currentMood: 15, collaborativeFilter: 10 },
      privacyNote: "Locally ranked for developer training."
    },
    transcript: "Reverse a string in JavaScript: str.split('').reverse().join('') or using a simple backward decrementing for loop.",
    usefulOutputs: {
      notes: {
        summary: "String reversal methods in JavaScript.",
        bulletPoints: [
          "The one-liner method: `str.split('').reverse().join('')`.",
          "For memory-sensitive tasks, using a two-pointer approach avoids creating intermediate arrays.",
          "Be mindful of multi-byte Unicode and emoji characters when splitting strings."
        ],
        keyTakeaway: "Know both the built-in one-liner and manual iteration for coding interviews."
      },
      quiz: [
        {
          question: "Which JavaScript method is used to split a string into an array of characters?",
          options: ["str.split('')", "str.slice()", "str.concat()", "str.splice()"],
          correctIndex: 0,
          explanation: "str.split('') splits the string into individual characters!"
        }
      ],
      checklist: [
        { task: "Test string reversal in your browser developer console", minutes: 2 }
      ],
      studyPlan: [
        { day: 1, focus: "String Methods", action: "Practice split, slice, substring, and replace methods in JS." }
      ]
    },
    sourceRights: {
      platform: "YouTube",
      creatorHandle: "@codesnippetspro",
      rightsStatus: "Licensed Tutorial",
      url: "https://www.youtube.com/watch?v=gS-2I6ghtH4"
    }
  },

  // 36. AI vs Agentic AI
  {
    id: "reel-ai-vs-agentic",
    title: "Generative AI vs Agentic AI Explained in 60 Seconds",
    creator: {
      name: "AI Frontier Insights",
      handle: "@aifrontier_insights",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      verified: true,
      bio: "Demystifying autonomous AI agents, LLM architectures, and next-gen intelligence"
    },
    videoUrl: "/videos/reel_ai_vs_agentic.mp4",
    visualTheme: "neural_agentic",
    description: "Generative AI vs Agentic AI in 60 seconds! Why 2026 is moving from static prompt-response chat to autonomous AI agents with tools, memory, and multi-step reasoning. #ai #agenticai #machinelearning #generativeai #futuretech #deeplearning",
    duration: 60,
    category: "Tech & AI",
    intent: "teach",
    goalTags: ["ai", "agents", "machine-learning", "future-tech"],
    mood: "curious",
    likes: 95400,
    commentsCount: 1680,
    shares: 31200,
    views: 610000,
    isAIGenerated: false,
    safetyScore: 99,
    realityCheck: {
      verdict: "Verified Industry Consensus",
      claim: "Agentic AI introduces autonomous tool execution, persistent environment memory, and self-correcting feedback loops.",
      explanation: "Industry whitepapers from Google DeepMind, Stanford HAI, and OpenAI highlight Agentic Workflows as the critical shift from passive text generation to active execution.",
      sources: [
        { name: "Google DeepMind Research Publications", url: "https://deepmind.google", credibility: "Global AI Research Lab" },
        { name: "Stanford HAI AI Index Report", url: "https://hai.stanford.edu", credibility: "Academic AI Institute" }
      ],
      aiConfidence: 99
    },
    whyAmISeeingThis: {
      primaryReason: "You follow artificial intelligence trends, autonomous agents, and cutting-edge software paradigms.",
      matchedInterests: ["AI", "Agentic AI", "Machine Learning"],
      signalWeight: { watchHistory: 45, goalAlignment: 30, currentMood: 15, collaborativeFilter: 10 },
      privacyNote: "Computed on-device for frontier technology discovery."
    },
    transcript: "Generative AI generates text or images when prompted. Agentic AI can plan, invoke external tools, correct its own errors, and execute complex goals autonomously.",
    usefulOutputs: {
      notes: {
        summary: "The evolutionary jump from Generative AI to Agentic AI.",
        bulletPoints: [
          "Generative AI: Input prompt in, single response out (passive retrieval).",
          "Agentic AI: Decomposes tasks into sub-goals, calls APIs/tools, and evaluates results iteratively.",
          "Key components of agents: Planning module, working memory, external tool access, and reflection."
        ],
        keyTakeaway: "Agents don't just answer questions — they complete end-to-end tasks."
      },
      quiz: [
        {
          question: "What primary capability distinguishes Agentic AI from basic Generative AI?",
          options: ["Autonomous multi-step tool execution and goal pursuit", "Larger font size", "Faster typing animation", "It only generates images"],
          correctIndex: 0,
          explanation: "Agentic AI can independently formulate plans, call external tools, and verify outcomes!"
        }
      ],
      checklist: [
        { task: "Identify one repetitive computer workflow that an AI agent could automate", minutes: 3 }
      ],
      studyPlan: [
        { day: 1, focus: "Agent Architecture", action: "Learn about the ReAct (Reasoning + Acting) pattern in AI systems." }
      ]
    },
    sourceRights: {
      platform: "YouTube",
      creatorHandle: "@aifrontier_insights",
      rightsStatus: "Licensed Educational Short",
      url: "https://www.youtube.com/watch?v=EtaiKxn-thI"
    }
  },

  // 37. Handstand 60s
  {
    id: "reel-handstand-calisthenics",
    title: "Master the Handstand in 60 Seconds: Calisthenics Balance Guide",
    creator: {
      name: "Calisthenics Movement",
      handle: "@calisthenics_move",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      verified: true,
      bio: "Bodyweight balance, handstands, and gymnastic calisthenics tutorials"
    },
    videoUrl: "/videos/reel_handstand_calisthenics.mp4",
    visualTheme: "handstand_balance",
    description: "Master your handstand balance in 1 minute! Hand placement, shoulder elevation, posterior pelvic tilt, and finger gripping technique. #handstand #calisthenics #balance #handstandtutorial #gymnastics #bodyweight",
    duration: 60,
    category: "Fitness & Health",
    intent: "achieve",
    goalTags: ["handstand", "calisthenics", "balance", "fitness"],
    mood: "energetic",
    likes: 88900,
    commentsCount: 1120,
    shares: 24300,
    views: 520000,
    isAIGenerated: false,
    safetyScore: 99,
    realityCheck: {
      verdict: "Verified Gymnastics Technique",
      claim: "Gripping the floor with bent finger fingertips (cambered hand technique) provides active micro-balance corrections.",
      explanation: "Gymnastics training coaches emphasize fingertip pressure to counteract falling forward and palm heel pressure for falling backward.",
      sources: [
        { name: "USA Gymnastics Coaching Guidelines", url: "https://usagym.org", credibility: "National Gymnastics Federation" }
      ],
      aiConfidence: 99
    },
    whyAmISeeingThis: {
      primaryReason: "You showed interest in bodyweight skills, gymnastic balance, and fitness training.",
      matchedInterests: ["Handstand", "Calisthenics", "Fitness"],
      signalWeight: { watchHistory: 45, goalAlignment: 30, currentMood: 15, collaborativeFilter: 10 },
      privacyNote: "Locally ranked for calisthenics skill acquisition."
    },
    transcript: "How to handstand in 1 minute: spread fingers wide, push shoulders high to your ears, tuck your pelvis, and grip the floor with your fingertips for micro-adjustments.",
    usefulOutputs: {
      notes: {
        summary: "Essential cues for a solid freestanding handstand.",
        bulletPoints: [
          "Push the floor away: elevate scapulae all the way into your ears.",
          "Hollow body posture: tuck pelvis to eliminate banana back arching.",
          "Active fingertips: claw the floor with bent knuckles to brake momentum."
        ],
        keyTakeaway: "A handstand is balanced with the hands and fingers, not just shoulder strength."
      },
      quiz: [
        {
          question: "How do you counteract over-balancing forward in a handstand?",
          options: ["Press down firmly through your fingertips", "Arch your lower back", "Bend your elbows", "Close your eyes"],
          correctIndex: 0,
          explanation: "Gripping firmly through the fingertips acts as the primary braking mechanism!"
        }
      ],
      checklist: [
        { task: "Practice 3 sets of 30-second chest-to-wall handstand holds", minutes: 5 }
      ],
      studyPlan: [
        { day: 1, focus: "Wall Drills", action: "Build shoulder endurance with chest-to-wall alignment holds." },
        { day: 2, focus: "Fingertip Pressure", action: "Practice pulling feet 1 inch off the wall using fingertip control." },
        { day: 3, focus: "Freestanding Kick-ups", action: "Perform 10 controlled kick-up attempts with a safe bail-out plan." }
      ]
    },
    sourceRights: {
      platform: "YouTube",
      creatorHandle: "@calisthenics_move",
      rightsStatus: "Licensed Tutorial",
      url: "https://www.youtube.com/watch?v=as_7ZiCdMZw"
    }
  },

  // 38. Indian Street Chai
  {
    id: "reel-indian-street-chai",
    title: "Authentic Indian Street Masala Chai: Fastest Hand-Poured Tea Making",
    creator: {
      name: "Desi Street Flavors",
      handle: "@desi_streetflavors",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      verified: false,
      bio: "Authentic Indian street food, traditional tea wallahs, and culinary heritage"
    },
    videoUrl: "/videos/reel_indian_street_chai.mp4",
    visualTheme: "street_chai",
    description: "Fastest chai maker in action! Watch the high hand-pour aeration, bubbling spices, and piping hot Indian street masala chai. #chai #indianstreetfood #masalachai #chailover #streetfood #teatime",
    duration: 28,
    category: "Food & Lifestyle",
    intent: "entertain",
    goalTags: ["chai", "street-food", "indian-food", "tea"],
    mood: "energetic",
    likes: 76500,
    commentsCount: 920,
    shares: 18400,
    views: 450000,
    isAIGenerated: false,
    safetyScore: 99,
    realityCheck: {
      verdict: "Verified Culinary Tradition",
      claim: "High hand-pouring (pulling) aerates the tea and cools it slightly while creating a frothy top layer.",
      explanation: "A traditional technique practiced across Indian tea stalls, similar to Malaysian Teh Tarik, enhancing aroma release.",
      sources: [
        { name: "Culinary Institute of India Food Archives", url: "https://culinary.in", credibility: "Culinary Heritage Institute" }
      ],
      aiConfidence: 99
    },
    whyAmISeeingThis: {
      primaryReason: "Recommended for street food lovers, culinary culture, and artisanal tea traditions.",
      matchedInterests: ["Chai", "Street Food", "Food & Lifestyle"],
      signalWeight: { watchHistory: 40, goalAlignment: 30, currentMood: 20, collaborativeFilter: 10 },
      privacyNote: "Locally ranked for food culture discovery."
    },
    transcript: "High-speed Indian street chai making: boiling rich ginger and cardamom spices, adding full cream milk, and pulling the tea high for a frothy cup.",
    usefulOutputs: {
      notes: {
        summary: "The art of authentic Indian Masala Chai.",
        bulletPoints: [
          "Crushed fresh ginger and green cardamom pods form the fragrant spice base.",
          "Boiling water and tea leaves together before adding milk extracts rich tannins.",
          "Aerating the chai through a high pour creates natural froth without a steam wand."
        ],
        keyTakeaway: "Great chai is about patience, aroma extraction, and boiling spices to perfection."
      },
      quiz: [
        {
          question: "Why do traditional tea wallahs pour chai from a height between vessels?",
          options: ["To aerate the tea, mix ingredients thoroughly, and create natural froth", "To spill excess liquid", "To make noise only", "To remove all caffeine"],
          correctIndex: 0,
          explanation: "Aerating (pulling) the tea mixes the flavors, cools it to drinking temperature, and creates froth!"
        }
      ],
      checklist: [
        { task: "Crush 2 cardamom pods and a slice of fresh ginger for your next tea", minutes: 3 }
      ],
      studyPlan: [
        { day: 1, focus: "Spice Infusion", action: "Simmer spices in water for 3 minutes before adding milk and black tea leaves." }
      ]
    },
    sourceRights: {
      platform: "YouTube",
      creatorHandle: "@desi_streetflavors",
      rightsStatus: "Licensed Food Feature",
      url: "https://www.youtube.com/watch?v=l3zQLI1x-LA"
    }
  },

  // 39. Swiss Nature Alps
  {
    id: "reel-swiss-nature-alps",
    title: "30 Seconds of Pure Swiss Alps Nature & Mountain Serenity",
    creator: {
      name: "Alpine Explorer 4K",
      handle: "@alpine_explorer",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
      verified: true,
      bio: "Capturing pristine alpine landscapes, glacial lakes, and mountain ridges in 4K"
    },
    videoUrl: "/videos/reel_swiss_nature_alps.mp4",
    visualTheme: "alpine_peaks",
    description: "30 seconds of pure Swiss nature. Crystal clear glacial streams, soaring alpine peaks, and blooming wildflower meadows in the Swiss Alps. #switzerland #alps #mountains #nature #travel #wanderlust #4kcinematic",
    duration: 28,
    category: "Travel & Adventure",
    intent: "inspire",
    goalTags: ["travel", "switzerland", "mountains", "nature"],
    mood: "calm",
    likes: 92400,
    commentsCount: 1150,
    shares: 28900,
    views: 580000,
    isAIGenerated: false,
    safetyScore: 99,
    realityCheck: {
      verdict: "Verified Geolocation",
      claim: "Swiss Alps encompass over 60% of Switzerland's total surface area with 48 peaks over 4,000 meters.",
      explanation: "Visuals capture authentic high alpine flora and glacial valley formations characteristic of the Bernese Oberland and Valais regions.",
      sources: [
        { name: "Switzerland Tourism Official Portal", url: "https://myswitzerland.com", credibility: "National Tourism Board" }
      ],
      aiConfidence: 99
    },
    whyAmISeeingThis: {
      primaryReason: "Recommended for nature discovery, stress relief, and scenic global destinations.",
      matchedInterests: ["Nature", "Travel", "Mountains", "Wanderlust"],
      signalWeight: { watchHistory: 40, goalAlignment: 30, currentMood: 20, collaborativeFilter: 10 },
      privacyNote: "Locally ranked for travel inspiration."
    },
    transcript: "Pristine Swiss mountain landscape. Sunlit alpine peaks towering over crystal blue glacier streams and lush green pine valleys.",
    usefulOutputs: {
      notes: {
        summary: "The restorative psychological benefits of nature immersion.",
        bulletPoints: [
          "Viewing natural landscapes lowers sympathetic nervous system arousal within 3 minutes.",
          "Biophilic visual stimuli stimulate involuntary attention (Attention Restoration Theory).",
          "Spending time in green spaces significantly boosts self-reported wellbeing."
        ],
        keyTakeaway: "Nature is nature's antidote to digital screen fatigue — pause and breathe in the stillness."
      },
      quiz: [
        {
          question: "What percentage of Switzerland is covered by the Alps mountain range?",
          options: ["Approximately 60%", "Only 10%", "Around 25%", "95%"],
          correctIndex: 0,
          explanation: "The Alps cover about 60% of Switzerland's land area, forming its iconic geography!"
        }
      ],
      checklist: [
        { task: "Take 3 deep belly breaths while looking at the mountain horizon", minutes: 1 }
      ],
      studyPlan: [
        { day: 1, focus: "Digital Detox Pause", action: "Take short 5-minute visual nature breaks between screen sessions." }
      ]
    },
    sourceRights: {
      platform: "YouTube",
      creatorHandle: "@alpine_explorer",
      rightsStatus: "Licensed Nature Feature",
      url: "https://www.youtube.com/watch?v=hRam4nhspAs"
    }
  },

  // 39b. Fingerstyle Guitar
  {
    id: "reel-fingerstyle-guitar",
    title: "Relaxing Fingerstyle Acoustic Guitar: Peaceful Calming Melody",
    creator: {
      name: "David Acoustic Strings",
      handle: "@david_acoustic",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      verified: false,
      bio: "Acoustic fingerstyle guitar covers, soothing melodies, and mindful musical pauses"
    },
    videoUrl: "/videos/reel_fingerstyle_guitar.mp4",
    visualTheme: "acoustic_warmth",
    description: "Relaxing acoustic guitar solo in fingerstyle. Close your eyes, slow your breath, and let the gentle acoustic vibrations calm your thoughts. #acousticguitar #fingerstyle #relaxingmusic #guitarcover #mindfulness #soothing",
    duration: 43,
    category: "Mindfulness & Detox",
    intent: "relax",
    goalTags: ["guitar", "music", "relaxation", "mindfulness"],
    mood: "calm",
    likes: 67800,
    commentsCount: 890,
    shares: 15400,
    views: 390000,
    isAIGenerated: false,
    safetyScore: 99,
    realityCheck: {
      verdict: "Verified Neuroscience",
      claim: "Slow acoustic musical tempos (60-80 BPM) naturally synchronize brainwaves to alpha frequencies.",
      explanation: "Auditory rhythm entrainment has been shown in clinical trials to reduce state anxiety and lower systolic blood pressure within minutes.",
      sources: [
        { name: "Nature Human Behaviour", url: "https://nature.com", credibility: "Peer-Reviewed Scientific Journal" }
      ],
      aiConfidence: 98
    },
    whyAmISeeingThis: {
      primaryReason: "You selected relaxation, auditory calm, or evening unwinding.",
      matchedInterests: ["Music", "Mindfulness", "Detox", "Acoustic"],
      signalWeight: { watchHistory: 40, goalAlignment: 30, currentMood: 20, collaborativeFilter: 10 },
      privacyNote: "Locally ranked for sound healing and tranquility."
    },
    transcript: "Gentle fingerstyle acoustic guitar performance with delicate note plucking, resonant harmonics, and peaceful melodic phrasing.",
    usefulOutputs: {
      notes: {
        summary: "Using acoustic music for nervous system down-regulation.",
        bulletPoints: [
          "Acoustic instruments generate natural overtones that soothe auditory sensory fatigue.",
          "Listening with closed eyes shifts sensory processing towards internal relaxation.",
          "Ideal companion for post-work transition rituals to mark the end of the workday."
        ],
        keyTakeaway: "Music is the fastest non-pharmacological way to shift emotional state."
      },
      quiz: [
        {
          question: "What brainwave frequency is typically stimulated by slow, calming acoustic melodies?",
          options: ["Alpha waves (8-12 Hz) associated with calm alertness", "Delta waves only", "High Beta stress waves", "Gamma waves"],
          correctIndex: 0,
          explanation: "Alpha waves represent a relaxed yet alert mental state!"
        }
      ],
      checklist: [
        { task: "Listen with headphones and relax your shoulders and jaw", minutes: 2 }
      ],
      studyPlan: [
        { day: 1, focus: "Mindful Listening", action: "Listen fully without multitasking to ground your attention." }
      ]
    },
    sourceRights: {
      platform: "YouTube",
      creatorHandle: "@david_acoustic",
      rightsStatus: "Licensed Music Short",
      url: "https://www.youtube.com/watch?v=EBqf1gbyDbg"
    }
  },

  // 40. TMKOC Jethalal Edit
  {
    id: "reel-tmkoc-jethalal-edit",
    title: "Jethalal Attitude & Funniest Comedy Moments Edit",
    creator: {
      name: "Gokuldham Fan Edits",
      handle: "@gokuldham_fanedits",
      avatar: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=150&auto=format&fit=crop&q=80",
      verified: false,
      bio: "High-energy TMKOC edits, Jethalal swagger moments, and Gokuldham comedy reels"
    },
    videoUrl: "/videos/reel_tmkoc_jethalal_edit.mp4",
    visualTheme: "tmkoc_attitude",
    description: "Jethalal 'Mere Paas Bahut Paisa Hai' attitude edit! The swag, comic swagger, and iconic dialogues of Jetha Ji. #TMKOC #Jethalal #JethalalEdit #ComedyReels #Gokuldham #DilipJoshi #AttitudeEdit",
    duration: 30,
    category: "Entertainment & Comedy",
    intent: "entertain",
    goalTags: ["comedy", "tmkoc", "jethalal", "memes"],
    mood: "humorous",
    likes: 112000,
    commentsCount: 1840,
    shares: 34500,
    views: 720000,
    isAIGenerated: false,
    safetyScore: 99,
    realityCheck: {
      verdict: "Verified Comedy Classic",
      claim: "Jethalal Champaklal Gada is one of the most culturally iconic and beloved sitcom characters in Indian television history.",
      explanation: "Portrayed by veteran actor Dilip Joshi since 2008, winning numerous national television comedy awards.",
      sources: [
        { name: "Indian Television Academy Awards", url: "https://ita2024.com", credibility: "National Television Guild" }
      ],
      aiConfidence: 99
    },
    whyAmISeeingThis: {
      primaryReason: "You enjoy Indian sitcom humor, meme edits, and laughter therapy.",
      matchedInterests: ["TMKOC", "Jethalal", "Comedy", "Memes"],
      signalWeight: { watchHistory: 40, goalAlignment: 30, currentMood: 20, collaborativeFilter: 10 },
      privacyNote: "Locally ranked for entertainment."
    },
    transcript: "Jethalal swagger comedy edit: 'Mere paas bahut paisa hai' featuring funny expressions, comedic reactions, and Gokuldham background beats.",
    usefulOutputs: {
      notes: {
        summary: "The cultural impact of Jethalal's character comedy.",
        bulletPoints: [
          "Dilip Joshi's expressive physical comedy and micro-expressions drive the show's humor.",
          "Jethalal's relatable dilemmas (business troubles, fatherly scoldings, brother-in-law Sundar) create timeless comedy.",
          "Humor provides instant mental relief and community connection."
        ],
        keyTakeaway: "Take life with a smile — Jethalal's humor turns everyday stress into laughter."
      },
      quiz: [
        {
          question: "Who is Jethalal's notorious brother-in-law who always asks for money from Ahmedabad?",
          options: ["Sundar Lal", "Bagha", "Popatlal", "Bhide"],
          correctIndex: 0,
          explanation: "Sundar Lal (Daya's brother) from Ahmedabad is famous for his hilarious schemes!"
        }
      ],
      checklist: [
        { task: "Share a quick smile or laugh with a coworker or friend", minutes: 1 }
      ],
      studyPlan: [
        { day: 1, focus: "Laughter Break", action: "Enjoy short comedic breaks during intensive work." }
      ]
    },
    sourceRights: {
      platform: "YouTube",
      creatorHandle: "@gokuldham_fanedits",
      rightsStatus: "Licensed Entertainment Short",
      url: "https://www.youtube.com/watch?v=IPiP6j1zKeI"
    }
  },

  // 41. James Webb Cosmos
  {
    id: "reel-james-webb-cosmos",
    title: "NASA James Webb Space Telescope: Deep Field Galaxies & Cosmic Evolution",
    creator: {
      name: "NASA Webb Telescope Official",
      handle: "@nasa_webb",
      avatar: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=150&auto=format&fit=crop&q=80",
      verified: true,
      bio: "Unfolding the universe from Lagrange Point 2 with NASA's flagship infrared observatory"
    },
    videoUrl: "/videos/reel_james_webb_cosmos.mp4",
    visualTheme: "cosmos_deep_space",
    description: "Galaxy development across cosmic distances! NASA's James Webb Space Telescope captures ancient galaxies formed over 13 billion years ago. #NASA #JWST #space #astronomy #cosmos #galaxies #science",
    duration: 50,
    category: "Science & Cosmos",
    intent: "inspire",
    goalTags: ["space", "nasa", "astronomy", "cosmos", "science"],
    mood: "curious",
    likes: 125000,
    commentsCount: 2310,
    shares: 45600,
    views: 890000,
    isAIGenerated: false,
    safetyScore: 99,
    realityCheck: {
      verdict: "Verified Astrophysics",
      claim: "JWST observes in infrared light, peering through cosmic dust to view early galaxies formed 300 million years after the Big Bang.",
      explanation: "Equipped with a 6.5-meter gold-coated beryllium mirror orbiting at Earth-Sun L2 (1.5 million kilometers away).",
      sources: [
        { name: "NASA Goddard Space Flight Center", url: "https://jwst.nasa.gov", credibility: "Official Space Agency" },
        { name: "Space Telescope Science Institute (STScI)", url: "https://stsci.edu", credibility: "Astronomical Research Institute" }
      ],
      aiConfidence: 99
    },
    whyAmISeeingThis: {
      primaryReason: "You showed wonder and curiosity for space exploration, astronomy, and cosmic science.",
      matchedInterests: ["NASA", "Space", "Cosmos", "Science"],
      signalWeight: { watchHistory: 45, goalAlignment: 30, currentMood: 15, collaborativeFilter: 10 },
      privacyNote: "Locally ranked for scientific exploration."
    },
    transcript: "Visualizing cosmic evolution across billions of light years. NASA's James Webb Space Telescope reveals early infant galaxies clustered in deep space.",
    usefulOutputs: {
      notes: {
        summary: "Key scientific achievements of the James Webb Space Telescope.",
        bulletPoints: [
          "Infrared sensitivity allows JWST to detect cosmological redshift from early universe expansion.",
          "Operates at ultra-cold temperatures (-233°C) shielded by a 5-layer tennis-court-sized sunshield.",
          "Analyzes exoplanet atmospheres for biosignatures including water vapor and carbon dioxide."
        ],
        keyTakeaway: "Looking deep into space is literally looking backward in time at our cosmic origins."
      },
      quiz: [
        {
          question: "Where is the James Webb Space Telescope positioned in space?",
          options: ["Second Lagrange Point (L2) 1.5 million km from Earth", "Low Earth Orbit near the ISS", "In orbit around the Moon", "In orbit around Mars"],
          correctIndex: 0,
          explanation: "JWST orbits the Sun at the Earth-Sun L2 point, staying synchronized with Earth!"
        }
      ],
      checklist: [
        { task: "Look up today's Astronomy Picture of the Day (APOD)", minutes: 2 }
      ],
      studyPlan: [
        { day: 1, focus: "Cosmic Scale", action: "Explore the distance scale from our solar system to deep field galaxies." }
      ]
    },
    sourceRights: {
      platform: "YouTube",
      creatorHandle: "@nasa_webb",
      rightsStatus: "Public Domain / NASA Scientific Release",
      url: "https://www.youtube.com/watch?v=tiPUlwA52VU"
    }
  },

  // 42. Calisthenics Pro Clip
  {
    id: "clip-fitness-pro",
    title: "High-Intensity Calisthenics: Weighted Pullups & Form Mastery",
    creator: {
      name: "Apex Athletic",
      handle: "@apex_calisthenics",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      verified: true,
      bio: "Elite street workout, weighted bodyweight mechanics, and strength development"
    },
    videoUrl: "/videos/clip_fitness.mp4",
    visualTheme: "calisthenics_iron",
    description: "Full bodyweight power! Heavy weighted pullups, controlled bar dips, and core tension demonstration in high definition. #calisthenics #weightedcalisthenics #pullups #fitness #strength #gymmotivation",
    duration: 35,
    category: "Fitness & Health",
    intent: "achieve",
    goalTags: ["calisthenics", "pullups", "fitness", "strength"],
    mood: "energetic",
    likes: 71200,
    commentsCount: 840,
    shares: 16700,
    views: 410000,
    isAIGenerated: false,
    safetyScore: 99,
    realityCheck: {
      verdict: "Verified Sports Science",
      claim: "Progressive overload via weighted pull-ups stimulates upper body hypertrophy and vertical pull recruitment.",
      explanation: "Pullups engage the latissimus dorsi, biceps brachii, and trapezius with minimal axial spine loading compared to machine pull-downs.",
      sources: [
        { name: "Journal of Strength and Conditioning Research", url: "https://journals.lww.com", credibility: "Peer-Reviewed Sports Science" }
      ],
      aiConfidence: 99
    },
    whyAmISeeingThis: {
      primaryReason: "You selected athletic conditioning, muscle building, and bodyweight strength.",
      matchedInterests: ["Fitness", "Calisthenics", "Pullups"],
      signalWeight: { watchHistory: 45, goalAlignment: 30, currentMood: 15, collaborativeFilter: 10 },
      privacyNote: "Computed on-device for athletic performance."
    },
    transcript: "Executing weighted pull-ups with full range of motion: dead-hang at bottom, chest to bar at top, with strict tempo control.",
    usefulOutputs: {
      notes: {
        summary: "Mastering strict pull-up form mechanics.",
        bulletPoints: [
          "Always start from a dead hang with fully extended elbows and engaged shoulders.",
          "Pull elbows down towards your back pockets to maximize lat activation.",
          "Avoid swinging or kipping to ensure pure muscular force generation."
        ],
        keyTakeaway: "One clean, full-ROM pullup is worth five sloppy half-reps."
      },
      quiz: [
        {
          question: "Which primary back muscle is targeted most by wide-grip pullups?",
          options: ["Latissimus Dorsi", "Quadriceps", "Soleus", "Gastrocnemius"],
          correctIndex: 0,
          explanation: "The latissimus dorsi is the primary mover during vertical pulling movements!"
        }
      ],
      checklist: [
        { task: "Do 3 sets of slow-tempo negative pullups (5-second descent)", minutes: 6 }
      ],
      studyPlan: [
        { day: 1, focus: "Volume", action: "Perform 5 sets of sub-maximal strict pull-ups." }
      ]
    },
    sourceRights: {
      platform: "Open Source Media",
      creatorHandle: "@apex_calisthenics",
      rightsStatus: "Licensed Demonstration",
      url: "https://zynqosocial.app"
    }
  },

  // 43. Sintel Fantasy Action
  {
    id: "clip-movie-sintel",
    title: "Sintel: Cinematic 4K Fantasy Action & Open-Source 3D VFX Showcase",
    creator: {
      name: "Blender Animation Studio",
      handle: "@blender_open_movie",
      avatar: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=150&auto=format&fit=crop&q=80",
      verified: true,
      bio: "Official Blender Open Movie Project — Pioneering open-source 3D film production"
    },
    videoUrl: "/videos/clip_movie.mp4",
    visualTheme: "cinema_fantasy",
    description: "Epic fantasy combat in 4K! Sintel demonstrates advanced open-source character animation, dynamic lighting, and cinematic action choreography created entirely in Blender. #blender #sintel #3danimation #vfx #cinema #openmovie",
    duration: 32,
    category: "Cinema & VFX",
    intent: "inspire",
    goalTags: ["blender", "cinema", "vfx", "animation", "action"],
    mood: "excited",
    likes: 89400,
    commentsCount: 1350,
    shares: 22100,
    views: 560000,
    isAIGenerated: false,
    safetyScore: 99,
    realityCheck: {
      verdict: "Verified Open-Source Production",
      claim: "Sintel is an internationally recognized open movie created by the Blender Foundation to advance 3D open-source graphics.",
      explanation: "Released under Creative Commons Attribution 3.0, proving that professional Hollywood-grade VFX can be produced with open software.",
      sources: [
        { name: "Blender Foundation Studio Archive", url: "https://studio.blender.org", credibility: "Official Studio Archive" }
      ],
      aiConfidence: 99
    },
    whyAmISeeingThis: {
      primaryReason: "Recommended for fans of cinematic animation, visual effects, and digital art.",
      matchedInterests: ["VFX", "Cinema", "Blender", "Animation"],
      signalWeight: { watchHistory: 40, goalAlignment: 30, currentMood: 20, collaborativeFilter: 10 },
      privacyNote: "Locally ranked for cinematic discovery."
    },
    transcript: "Cinematic action sequence from Sintel: dramatic combat and fluid sword choreography rendered in open-source 3D graphics.",
    usefulOutputs: {
      notes: {
        summary: "The power of open-source creative technology.",
        bulletPoints: [
          "Blender provides a complete pipeline: modeling, sculpting, texturing, rigging, animation, and compositing.",
          "Open movie projects push tool boundaries by developing production features during actual filmmaking.",
          "High frame-rate physics simulation and hair dynamics were pioneered during this film's production."
        ],
        keyTakeaway: "Creativity is liberated when state-of-the-art tools are accessible to everyone worldwide."
      },
      quiz: [
        {
          question: "Which open-source 3D software suite was used to produce Sintel?",
          options: ["Blender", "MS Paint", "QuickTime", "Audacity"],
          correctIndex: 0,
          explanation: "Blender is the premier open-source 3D creation suite!"
        }
      ],
      checklist: [
        { task: "Download Blender and explore the default 3D viewport", minutes: 10 }
      ],
      studyPlan: [
        { day: 1, focus: "3D Basics", action: "Navigate the 3D viewport and experiment with mesh primitives." }
      ]
    },
    sourceRights: {
      platform: "Blender Foundation",
      creatorHandle: "@blender_open_movie",
      rightsStatus: "Creative Commons Attribution 3.0",
      url: "https://durian.blender.org"
    }
  },

  // 44. Tears of Steel Sci-Fi
  {
    id: "clip-scifi-tears-of-steel",
    title: "Tears of Steel: Cyberpunk Sci-Fi VFX & Robotics Demonstration",
    creator: {
      name: "Open VFX Collective",
      handle: "@open_vfx_studio",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      verified: true,
      bio: "High-end visual effects breakdowns, camera tracking, and cyberpunk CGI"
    },
    videoUrl: "/videos/clip_scifi.mp4",
    visualTheme: "scifi_cyberpunk",
    description: "Futuristic dystopian science fiction: advanced camera motion tracking, robotic prosthetics, and cinematic sci-fi VFX in Amsterdam's futuristic setting. #scifi #vfx #cyberpunk #robotics #blender #cameratracking",
    duration: 38,
    category: "Sci-Fi & VFX",
    intent: "inspire",
    goalTags: ["scifi", "vfx", "robotics", "cyberpunk", "cinema"],
    mood: "excited",
    likes: 94200,
    commentsCount: 1490,
    shares: 26800,
    views: 630000,
    isAIGenerated: false,
    safetyScore: 99,
    realityCheck: {
      verdict: "Verified VFX Production",
      claim: "Tears of Steel proved open-source optical motion tracking and photorealistic live-action visual integration.",
      explanation: "Filmed with 4K Sony F65 cameras with complete open VFX tracking and compositing pipelines.",
      sources: [
        { name: "Blender Studio Mango Project", url: "https://mango.blender.org", credibility: "Official VFX Research Archive" }
      ],
      aiConfidence: 99
    },
    whyAmISeeingThis: {
      primaryReason: "You enjoy science fiction cinema, visual effects, and futuristic technology.",
      matchedInterests: ["Sci-Fi", "VFX", "Cyberpunk", "Robotics"],
      signalWeight: { watchHistory: 45, goalAlignment: 30, currentMood: 15, collaborativeFilter: 10 },
      privacyNote: "Ranked locally for sci-fi enthusiasts."
    },
    transcript: "Cyberpunk visual effects scene from Tears of Steel: mechanical robotic arms and futuristic weapons integrated into live-action footage.",
    usefulOutputs: {
      notes: {
        summary: "Visual effects motion tracking techniques.",
        bulletPoints: [
          "Marker tracking reconstructs real camera movements in virtual 3D space.",
          "Shadow catchers and HDRI environment maps ground CGI elements photorealistically.",
          "Color grading ties digital layers seamlessly into live plate photography."
        ],
        keyTakeaway: "Great visual effects go unnoticed because they perfectly match physical camera physics."
      },
      quiz: [
        {
          question: "What technique matches virtual 3D camera movement to real live-action camera footage?",
          options: ["Camera Motion Tracking (Matchmoving)", "Color Inversion", "Audio Pitch Shifting", "Bitrate Compression"],
          correctIndex: 0,
          explanation: "Matchmoving tracks visual feature points to replicate real camera trajectory in 3D!"
        }
      ],
      checklist: [
        { task: "Watch a 3-minute camera tracking breakdown to see how markers work", minutes: 3 }
      ],
      studyPlan: [
        { day: 1, focus: "Tracking Principles", action: "Learn about optical flow and point tracking algorithms." }
      ]
    },
    sourceRights: {
      platform: "Blender Foundation",
      creatorHandle: "@open_vfx_studio",
      rightsStatus: "Creative Commons Attribution 3.0",
      url: "https://mango.blender.org"
    }
  },

  // 45. 3D Animation Showcase
  {
    id: "clip-animation-showcase",
    title: "3D Character Rigging & Expressive Animation Showcase",
    creator: {
      name: "Studio PolyMotion",
      handle: "@polymotion_3d",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      verified: false,
      bio: "Character animation, weight physics, stylized 3D aesthetics, and rigging breakdowns"
    },
    videoUrl: "/videos/clip_animation.mp4",
    visualTheme: "animation_poly",
    description: "Expressive 3D character animation! Demonstrating squash-and-stretch, weight arcs, and stylized motion design in full motion. #3danimation #characteranimation #motiondesign #rigging #digitalart #animation",
    duration: 25,
    category: "Animation & Art",
    intent: "inspire",
    goalTags: ["animation", "3d", "art", "character-design"],
    mood: "creative",
    likes: 62100,
    commentsCount: 780,
    shares: 14200,
    views: 370000,
    isAIGenerated: false,
    safetyScore: 99,
    realityCheck: {
      verdict: "Verified Animation Principles",
      claim: "The 12 Principles of Animation (squash & stretch, timing, anticipation) form the foundation of compelling digital movement.",
      explanation: "Formulated by Disney animators Ollie Johnston and Frank Thomas in 'The Illusion of Life'.",
      sources: [
        { name: "The Illusion of Life: Disney Animation", url: "https://en.wikipedia.org/wiki/12_basic_principles_of_animation", credibility: "Classic Animation Literature" }
      ],
      aiConfidence: 99
    },
    whyAmISeeingThis: {
      primaryReason: "You enjoy digital arts, stylized character design, and 3D motion graphics.",
      matchedInterests: ["Animation", "3D Art", "Motion Design"],
      signalWeight: { watchHistory: 40, goalAlignment: 30, currentMood: 20, collaborativeFilter: 10 },
      privacyNote: "Locally ranked for creative art inspiration."
    },
    transcript: "Dynamic 3D character animation demonstration featuring expressive character movement, fluid timing arcs, and stylized physical weight.",
    usefulOutputs: {
      notes: {
        summary: "Key principles of expressive character animation.",
        bulletPoints: [
          "Anticipation prepares the audience's eye for the major action.",
          "Arcs make movements feel natural and biological rather than robotic.",
          "Exaggeration adds personality and emotional punch to physical acting."
        ],
        keyTakeaway: "Movement expresses emotion: how a character moves tells who they are."
      },
      quiz: [
        {
          question: "Which animation principle is used to give weight and flexibility to drawn and 3D objects?",
          options: ["Squash and Stretch", "Color Saturation", "File Compression", "Polygon Decimation"],
          correctIndex: 0,
          explanation: "Squash and stretch conveys an object's mass and flexibility!"
        }
      ],
      checklist: [
        { task: "Observe how humans anticipate before jumping (bending knees first)", minutes: 2 }
      ],
      studyPlan: [
        { day: 1, focus: "12 Principles", action: "Study timing, spacing, and anticipation in classic animation." }
      ]
    },
    sourceRights: {
      platform: "Open Source Media",
      creatorHandle: "@polymotion_3d",
      rightsStatus: "Licensed Animation Short",
      url: "https://zynqosocial.app"
    }
  },

  // 46. Norwegian Fjords
  {
    id: "clip-nature-fjords",
    title: "Majestic Norwegian Fjords: Aerial Glacial Landscapes in 4K",
    creator: {
      name: "Nordic Earth Explorers",
      handle: "@nordic_earth",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
      verified: true,
      bio: "Aerial drone cinematography capturing Scandinavia's grandest fjords and glacial valleys"
    },
    videoUrl: "/videos/clip_nature.mp4",
    visualTheme: "nordic_fjords",
    description: "Breathtaking aerial drone footage soaring through Norway's Geirangerfjord. Sheer mountain cliffs, cascading waterfalls, and deep emerald waters. #norway #fjords #aerialdrone #nature #travel #scandinavia #4k",
    duration: 30,
    category: "Travel & Adventure",
    intent: "inspire",
    goalTags: ["travel", "norway", "fjords", "nature", "drone"],
    mood: "calm",
    likes: 85400,
    commentsCount: 1040,
    shares: 21300,
    views: 540000,
    isAIGenerated: false,
    safetyScore: 99,
    realityCheck: {
      verdict: "Verified UNESCO World Heritage",
      claim: "Western Norwegian Fjords are recognized by UNESCO for their exceptional natural beauty and geological significance.",
      explanation: "Carved by massive glaciers during successive ice ages, plunging over 1,000 meters into seawater.",
      sources: [
        { name: "UNESCO World Heritage Centre", url: "https://whc.unesco.org", credibility: "Global Heritage Authority" }
      ],
      aiConfidence: 99
    },
    whyAmISeeingThis: {
      primaryReason: "Recommended for nature exploration, Nordic travel, and serene landscapes.",
      matchedInterests: ["Norway", "Fjords", "Travel", "Nature"],
      signalWeight: { watchHistory: 40, goalAlignment: 30, currentMood: 20, collaborativeFilter: 10 },
      privacyNote: "Locally ranked for travel discovery."
    },
    transcript: "Aerial drone sweeping over the majestic Norwegian fjords. Crystal clear glacial waters flanked by towering rock precipices.",
    usefulOutputs: {
      notes: {
        summary: "Geological formation of glacial fjords.",
        bulletPoints: [
          "Fjords are created when a glacier cuts a U-shaped valley through ice segregation and abrasion.",
          "Norway hosts over 1,190 recognized fjords along its coast.",
          "Glacial meltwater carries rock flour that reflects emerald green hues under sunlight."
        ],
        keyTakeaway: "Earth's landscape was sculpted over millions of years by the patient power of ice."
      },
      quiz: [
        {
          question: "What natural force carved the distinctive deep valleys of Norwegian fjords?",
          options: ["Glacial ice sheets during the Ice Ages", "Volcanic magma flows", "Human excavation", "Wind erosion only"],
          correctIndex: 0,
          explanation: "Slow-moving massive glaciers carved these spectacular U-shaped valleys!"
        }
      ],
      checklist: [
        { task: "Take 1 minute to admire the vast natural scale of our planet", minutes: 1 }
      ],
      studyPlan: [
        { day: 1, focus: "Geomorphology", action: "Learn about the difference between V-shaped river valleys and U-shaped glacial fjords." }
      ]
    },
    sourceRights: {
      platform: "Open Source Media",
      creatorHandle: "@nordic_earth",
      rightsStatus: "Licensed Nature Broadcast",
      url: "https://zynqosocial.app"
    }
  },

  // 47. Big Buck Bunny
  {
    id: "clip-bbb-comedy",
    title: "Big Buck Bunny: Classic 3D Animated Forest Comedy Short",
    creator: {
      name: "Peach Open Movie Project",
      handle: "@peach_animation",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      verified: true,
      bio: "The iconic open-source animated comedy short that captivated audiences worldwide"
    },
    videoUrl: "/videos/clip_bbb.mp4",
    visualTheme: "bbb_forest",
    description: "The classic open-source animated comedy: Big Buck Bunny enjoys a sunny forest morning until mischievous woodland critters disturb the peace! #bigbuckbunny #animation #comedy #blender #classic #openmovie",
    duration: 33,
    category: "Entertainment & Comedy",
    intent: "entertain",
    goalTags: ["comedy", "animation", "big-buck-bunny", "humor"],
    mood: "humorous",
    likes: 91200,
    commentsCount: 1410,
    shares: 25400,
    views: 680000,
    isAIGenerated: false,
    safetyScore: 99,
    realityCheck: {
      verdict: "Verified Animation Milestone",
      claim: "Big Buck Bunny is one of the most widely benchmarked open-source 3D animated films in computer history.",
      explanation: "Released by the Blender Foundation in 2008, used globally for video player testing, video codec development, and animation training.",
      sources: [
        { name: "Blender Foundation Peach Archive", url: "https://peach.blender.org", credibility: "Official Film Archive" }
      ],
      aiConfidence: 99
    },
    whyAmISeeingThis: {
      primaryReason: "Recommended for family comedy, animation history, and lighthearted humor.",
      matchedInterests: ["Comedy", "Animation", "Blender"],
      signalWeight: { watchHistory: 40, goalAlignment: 30, currentMood: 20, collaborativeFilter: 10 },
      privacyNote: "Locally ranked for humor and smiles."
    },
    transcript: "Big Buck Bunny enjoying a peaceful forest morning smelling butterflies and wildflowers before the mischievous woodland critters appear.",
    usefulOutputs: {
      notes: {
        summary: "The legacy of Big Buck Bunny in digital media.",
        bulletPoints: [
          "Demonstrated open-source fur, grass, and hair particle systems in 3D rendering.",
          "Used by millions of developers worldwide as the standard sample video format for testing.",
          "Combines classic slapstick humor with high artistic craftsmanship."
        ],
        keyTakeaway: "Great storytelling connects with everyone regardless of language."
      },
      quiz: [
        {
          question: "In what year was Big Buck Bunny released by the Blender Institute?",
          options: ["2008", "1995", "2024", "1980"],
          correctIndex: 0,
          explanation: "Big Buck Bunny was released in 2008 as an open-source animation project!"
        }
      ],
      checklist: [
        { task: "Enjoy a nostalgic laugh with classic animated comedy", minutes: 2 }
      ],
      studyPlan: [
        { day: 1, focus: "Comedy Timing", action: "Observe how character pauses enhance comedic timing in animation." }
      ]
    },
    sourceRights: {
      platform: "Blender Foundation",
      creatorHandle: "@peach_animation",
      rightsStatus: "Creative Commons Attribution 3.0",
      url: "https://peach.blender.org"
    }
  },

  // 48. Flower Bloom Time-Lapse
  {
    id: "nature-flower-bloom",
    title: "Botanical Time-Lapse: Macro Flower Bloom & Plant Phototropism",
    creator: {
      name: "FloraScope Lab",
      handle: "@florascope_macro",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      verified: false,
      bio: "High-resolution macro time-lapse revealing the secret biological rhythm of plant life"
    },
    videoUrl: "/videos/flower.mp4",
    visualTheme: "botanical_bloom",
    description: "The secret life of plants revealed: stunning 4K macro time-lapse showing petals unfurling, vascular hydration, and phototropic movement in slow motion. #botany #timelapse #nature #flowerbloom #macro #science",
    duration: 30,
    category: "Science & Nature",
    intent: "inspire",
    goalTags: ["science", "nature", "flowers", "botany", "timelapse"],
    mood: "calm",
    likes: 68400,
    commentsCount: 790,
    shares: 15300,
    views: 430000,
    isAIGenerated: false,
    safetyScore: 99,
    realityCheck: {
      verdict: "Verified Plant Physiology",
      claim: "Flower petals open through differential cellular expansion and turgor pressure changes within petal bases.",
      explanation: "Circadian rhythms and temperature cues trigger auxin redistribution, causing cells on the inner petal surface to expand rapidly.",
      sources: [
        { name: "Annual Review of Plant Biology", url: "https://annualreviews.org", credibility: "Botanical Research Journal" }
      ],
      aiConfidence: 99
    },
    whyAmISeeingThis: {
      primaryReason: "You enjoy nature time-lapses, botanical wonders, and relaxing visual science.",
      matchedInterests: ["Nature", "Science", "Botany", "Time-Lapse"],
      signalWeight: { watchHistory: 40, goalAlignment: 30, currentMood: 20, collaborativeFilter: 10 },
      privacyNote: "Locally ranked for mindful nature observation."
    },
    transcript: "Macro time-lapse photography capturing delicate flower petals unfurling in slow motion against a dark velvet backdrop.",
    usefulOutputs: {
      notes: {
        summary: "The cellular mechanics of flower blooming.",
        bulletPoints: [
          "Petal opening is driven by reversible turgor pressure or irreversible cell wall elongation.",
          "Many species exhibit nyctinasty (closing at night to protect pollen from dampness).",
          "Time-lapse compresses hours of slow botanical movement into seconds of visible vitality."
        ],
        keyTakeaway: "Growth happens quietly, millimeter by millimeter, before bursting into full bloom."
      },
      quiz: [
        {
          question: "What primary plant mechanism drives the opening of petals during blooming?",
          options: ["Differential cell expansion and turgor pressure", "Wind vibration", "Magnetic field shifts", "Soil acidity only"],
          correctIndex: 0,
          explanation: "Turgor pressure and differential cell growth push petals open toward sunlight!"
        }
      ],
      checklist: [
        { task: "Water a houseplant or observe outdoor leaves turning towards sunlight", minutes: 2 }
      ],
      studyPlan: [
        { day: 1, focus: "Plant Circadian Rhythms", action: "Learn how plants anticipate day and night cycles." }
      ]
    },
    sourceRights: {
      platform: "Open Source Media",
      creatorHandle: "@florascope_macro",
      rightsStatus: "Licensed Botanical Feature",
      url: "https://zynqosocial.app"
    }
  },

  // 49. Lava Flow Earth
  {
    id: "nature-lava-flow",
    title: "Molten Basaltic Lava Flow: Earth's Geothermal Volcano Power",
    creator: {
      name: "GeoThermal Earth",
      handle: "@geothermal_earth",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      verified: true,
      bio: "Volcanology, geothermal energy, and geological phenomena across the Ring of Fire"
    },
    videoUrl: "/videos/lava.webm",
    visualTheme: "volcanic_fire",
    description: "Witness the raw power of planetary creation: glowing molten basaltic lava rivers flowing over cooling volcanic rock crust at 1,100°C. #volcano #lava #geology #earthscience #nature #fire #geothermal",
    duration: 35,
    category: "Science & Nature",
    intent: "inspire",
    goalTags: ["volcano", "lava", "geology", "earth-science", "nature"],
    mood: "curious",
    likes: 83200,
    commentsCount: 1190,
    shares: 20400,
    views: 520000,
    isAIGenerated: false,
    safetyScore: 99,
    realityCheck: {
      verdict: "Verified Geosciences",
      claim: "Basaltic lava erupts at temperatures between 1,000°C and 1,200°C with low silica content allowing rapid fluid flow.",
      explanation: "Low viscosity allows basaltic flows (pahoehoe and aa) to travel great distances before cooling into new oceanic crust.",
      sources: [
        { name: "US Geological Survey (USGS) Volcano Hazards Program", url: "https://volcanoes.usgs.gov", credibility: "Government Geological Agency" }
      ],
      aiConfidence: 99
    },
    whyAmISeeingThis: {
      primaryReason: "Recommended for earth sciences, volcanology, and the raw primal beauty of our planet.",
      matchedInterests: ["Geology", "Volcano", "Science", "Nature"],
      signalWeight: { watchHistory: 40, goalAlignment: 30, currentMood: 20, collaborativeFilter: 10 },
      privacyNote: "Locally ranked for scientific curiosity."
    },
    transcript: "Glowing red molten lava river flowing steadily across dark basalt volcanic crust, illuminating the landscape with geothermal heat.",
    usefulOutputs: {
      notes: {
        summary: "The geological significance of basaltic volcanism.",
        bulletPoints: [
          "Basalt forms over 70% of the Earth's total crust (predominantly the ocean floor).",
          "Pahoehoe lava creates smooth, ropey surfaces, while Aa lava forms sharp, jagged clinkers.",
          "Volcanic eruptions release mineral-rich nutrients that eventually create some of Earth's most fertile agricultural soils."
        ],
        keyTakeaway: "Volcanoes are not just forces of destruction — they are the builders of new continents."
      },
      quiz: [
        {
          question: "At what typical temperature does basaltic lava flow upon eruption?",
          options: ["1,000°C to 1,200°C", "100°C to 200°C", "5,000°C", "0°C to 50°C"],
          correctIndex: 0,
          explanation: "Basaltic lava is the hottest common lava type, flowing between 1,000°C and 1,200°C!"
        }
      ],
      checklist: [
        { task: "Look up a map of the Pacific Ring of Fire", minutes: 2 }
      ],
      studyPlan: [
        { day: 1, focus: "Plate Tectonics", action: "Learn how mid-ocean ridges and mantle plumes create new basaltic crust." }
      ]
    },
    sourceRights: {
      platform: "Open Source Media",
      creatorHandle: "@geothermal_earth",
      rightsStatus: "Licensed Geological Feature",
      url: "https://zynqosocial.app"
    }
  }
];

// Now construct the complete set of 50 reels!
// Combine the 33 original reels (updated with 100% correlated metadata) + 17 additional reels
const finalReels = [];

// 1. Process 33 original reels
for (const original of e6List) {
  const filename = path.basename(original.videoUrl);
  const override = cleanMetadataOverrides[filename] || {};
  
  const reel = {
    ...original,
    title: override.title || original.title,
    description: override.description || original.description,
    category: override.category || original.category,
    transcript: override.transcript || original.transcript,
    videoUrl: `/videos/${filename}`
  };
  finalReels.push(reel);
}

// 2. Add the 17 additional unique reels
for (const add of additionalReels) {
  // Avoid duplicate ID if already exists
  if (!finalReels.some(r => r.id === add.id || r.videoUrl === add.videoUrl)) {
    finalReels.push(add);
  }
}

console.log(`\n========================================`);
console.log(`Total completely unique reels: ${finalReels.length}`);

// Verify every reel has a distinct videoUrl
const videoSet = new Set(finalReels.map(r => r.videoUrl));
console.log(`Unique video files: ${videoSet.size} / ${finalReels.length}`);

// Interleave the feed for maximum engagement across categories
// Categories: Culture, Tech, Comedy, Fitness, Travel, Food, Productivity, Mindfulness, Science, VFX
const categories = [
  "Culture & Dance",
  "Tech & AI",
  "Entertainment & Comedy",
  "Fitness & Health",
  "Food & Lifestyle",
  "Travel & Adventure",
  "Productivity & Growth",
  "Mindfulness & Detox",
  "Science & Cosmos",
  "Science & Nature",
  "Cinema & VFX",
  "Sci-Fi & VFX",
  "Animation & Art"
];

// Group by category
const byCat = {};
categories.forEach(c => byCat[c] = []);
finalReels.forEach(r => {
  const c = r.category || 'Tech & AI';
  if (!byCat[c]) byCat[c] = [];
  byCat[c].push(r);
});

// Interleave
const interleaved = [];
let added = true;
let round = 0;
while (interleaved.length < finalReels.length) {
  added = false;
  for (const c of categories) {
    if (byCat[c] && byCat[c].length > 0) {
      interleaved.push(byCat[c].shift());
      added = true;
    }
  }
  round++;
  if (!added) break;
}

// Add any remaining
for (const c of Object.keys(byCat)) {
  while (byCat[c].length > 0) {
    interleaved.push(byCat[c].shift());
  }
}

console.log(`Interleaved count: ${interleaved.length}`);

// Write to both paths
fs.writeFileSync(REELS_SERVER_PATH, JSON.stringify(interleaved, null, 2), 'utf8');
console.log(`Saved to ${REELS_SERVER_PATH}`);

fs.writeFileSync(REELS_SRC_PATH, JSON.stringify(interleaved, null, 2), 'utf8');
console.log(`Saved to ${REELS_SRC_PATH}`);

console.log(`\nVerified sample first 10 interleaved reels:`);
interleaved.slice(0, 10).forEach((r, i) => {
  console.log(`[${i+1}] ${r.title} | ${r.category} | ${r.videoUrl}`);
});
