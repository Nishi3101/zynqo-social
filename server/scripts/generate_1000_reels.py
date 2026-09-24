import json
import os
import sys
import random
import string

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

REELS_SERVER_PATH = os.path.join(os.getcwd(), 'server', 'data', 'reels.json')
REELS_SRC_PATH = os.path.join(os.getcwd(), 'src', 'data', 'defaultReels.json')

# Video files available locally
VIDEO_FILES = [
    "/videos/ig_navratri_united_way.mp4",
    "/videos/ig_DdPNT9Yyp8H.mp4",
    "/videos/ig_tmkoc_Dc0d1dtu1ug.mp4",
    "/videos/ig_DdWqxO-sR9e.mp4",
    "/videos/ig_navratri_dodhiya_steps.mp4",
    "/videos/ig_DdVTdiOPDtt.mp4",
    "/videos/ig_tmkoc_DdBV_uOhjGp.mp4",
    "/videos/ig_DdZIPD-RVve.mp4",
    "/videos/ig_navratri_titodo_sanedo.mp4",
    "/videos/ig_DdUcTDvzIrk.mp4",
    "/videos/ig_tmkoc_DdYUJs9h43a.mp4",
    "/videos/ig_DdWE6TpPpqu.mp4",
    "/videos/ig_navratri_chaniya_choli.mp4",
    "/videos/ig_DdU_XfZREJJ.mp4",
    "/videos/ig_tmkoc_DdY3X2Csi2q.mp4",
    "/videos/ig_DdXH_4Gtttc.mp4",
    "/videos/ig_navratri_dholida_performance.mp4",
    "/videos/ig_DdV5tUnAUl6.mp4",
    "/videos/ig_DdYOAHWtQtq.mp4",
    "/videos/ig_DdW43OSsgU1.mp4",
    "/videos/ig_DdTB_BlxTvz.mp4",
    "/videos/ig_DdW6CnyM94H.mp4",
    "/videos/ig_DdWEbx9T__X.mp4",
    "/videos/ig_DdNzj7yJAIW.mp4",
    "/videos/ig_DdWlrQhyUHB.mp4",
    "/videos/ig_DdRas6aBycc.mp4",
    "/videos/ig_DdYLr-AzOcx.mp4",
    "/videos/ig_DdVEomDSc3-.mp4",
    "/videos/ig_DdWQwyBtb4S.mp4",
    "/videos/ig_DdNYCxPyBLt.mp4",
    "/videos/ig_DdWmja7slR5.mp4",
    "/videos/ig_DdYTVzIzE4u.mp4",
    "/videos/ig_DdMZzzCSeRI.mp4",
    "/videos/clip_fitness.mp4",
    "/videos/clip_movie.mp4",
    "/videos/clip_scifi.mp4",
    "/videos/clip_animation.mp4",
    "/videos/clip_nature.mp4",
    "/videos/clip_bbb.mp4"
]

AVATAR_POOL = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
]

CATEGORY_TEMPLATES = {
    "Tech & AI": {
        "intent": "teach",
        "moods": ["focus", "curious", "excited"],
        "goalTags": ["coding", "ai-mastery", "future-tech", "agents", "machine-learning"],
        "theme": "neural_network",
        "creators": [
            ("Alex Chen (AI Researcher)", "@alexchen_ai", "Building Autonomous Agentic Systems & LLM Architectures"),
            ("Sara Dev (Fullstack Lead)", "@saradev_code", "TypeScript, React, & Modern Cloud Engineering"),
            ("Neural Byte", "@neuralbyte_labs", "Deep learning models, open-source AI, & robotics"),
            ("Priya Patel (Cloud Architect)", "@priyacloud", "DevOps, Kubernetes, and Low-Latency Backends"),
            ("Marcus Thorne", "@marcus_builds", "Building micro-SaaS with local LLMs and AI workflows")
        ],
        "titles": [
            "Building Autonomous Multi-Agent AI Workflows with Python in 45 Seconds",
            "Why Local LLMs with Ollama Are Replacing Cloud APIs for Devs",
            "Next-Gen React 19 Compiler: 3 Huge Performance Hacks You Must Know",
            "Understanding DeepSeek-V3 MoE Architecture in 60 Seconds",
            "Top 5 Terminal CLI Tools Every Senior Software Engineer Uses Daily",
            "How Vector Embeddings and RAG Actually Work Under the Hood",
            "Quantum Computing Milestone: What 1000 Qubits Means for Encryption",
            "Clean Architecture in Go: How to Structure High-Throughput Microservices",
            "Building Real-Time WebSockets in Node.js with Zero Memory Leaks",
            "Prompt Engineering vs Fine-Tuning: Which One Actually Saves Costs?"
        ],
        "claim": "Modern LLM fine-tuning techniques reduce inference cost by up to 60%.",
        "explanation": "Quantization (4-bit/8-bit) and LoRA adapters dramatically compress parameter footprints without significant accuracy regression."
    },
    "Entertainment & Comedy": {
        "intent": "entertain",
        "moods": ["humorous", "happy", "excited"],
        "goalTags": ["comedy", "tmkoc", "jethalal", "gokuldham", "satire"],
        "theme": "comedy_tmkoc",
        "creators": [
            ("Gokuldham Comedy Hub", "@gokuldham_comedy", "Daily iconic moments from Taarak Mehta Ka Ooltah Chashmah"),
            ("Kabir Standup", "@kabir_jokes", "Relatable corporate humor, college life, & modern dating"),
            ("Desi Meme Vault", "@desimemevault", "Top trending viral Indian comedy clips & mimicry"),
            ("Neha Laughs", "@neha_skits", "Relatable observational skits on family, friends & society"),
            ("Bapuji & Jetha Fan Club", "@bapuji_jetha_fans", "Best classic comedic dialogues and punchlines")
        ],
        "titles": [
            "Jethalal's Unmatched Excuse When Caught Red-Handed by Bapuji 😂",
            "When Your Manager Asks for Weekend Deployment: The Perfect Response",
            "Chai Piyo, Biscuit Khao! The Most Iconic Scene in Indian Television",
            "Engineering Students During Exam Night vs Result Day: Peak Relatability",
            "Bhide's Scooter 'Sakharam' Causes Another Emergency in Gokuldham!",
            "Expectation vs Reality: Trying to Work from Home on a Monday Morning",
            "Jethalal vs Sundar Lal: When Investments Go Utterly Wrong 🤣",
            "That One Friend Who Promises 'I Am Reaching in 5 Minutes'",
            "Natukaka & Bagha Demanding Salary Hike: Pure Cinematic Comedy Timing",
            "Corporate Slang Translated to Honest Truth: What 'Quick Sync' Really Means"
        ],
        "claim": "Laughter triggers endorphin release and lowers cardiovascular arterial stress.",
        "explanation": "Clinical neurobiology confirms that genuine laughter decreases cortisol and stimulates dopamine and endorphin synthesis."
    },
    "Culture & Dance": {
        "intent": "entertain",
        "moods": ["energetic", "excited", "happy"],
        "goalTags": ["garba", "navratri", "culture", "dance", "gujarat", "dandiya"],
        "theme": "festival_garba",
        "creators": [
            ("United Way Baroda Official", "@unitedwaybaroda_garba", "World's Largest Folk Dance Festival in Vadodara"),
            ("Aarti Choreo", "@aarti_dancefolk", "Traditional Kathak, Bharatnatyam & Modern Garba Fusion"),
            ("Gujarat Heritage Beats", "@gujarat_heritage", "Folk dances, authentic dhol rhythms, & cultural preservation"),
            ("Rohan & Simran Dance", "@rohan_simran_duo", "Viral wedding choreo, energetic Bhangra, & Garba steps"),
            ("Ahmedabad Raas Club", "@amdavad_raas_club", "High-energy 14-step Dodhiya and Titodo performances")
        ],
        "titles": [
            "Mesmerizing 30,000+ Dancers in Concentric Circles at United Way Vadodara",
            "Traditional 14-Step Dodhiya Garba: Step-by-Step Footwork Tutorial",
            "High-Octane Titodo & Sanedo: Authentic Dhol Beats That Set the Stage on Fire",
            "Royal Kutch Handcrafted Chaniya Choli: 100-Year-Old Mirror Work Artistry",
            "Fast-Paced Dholida Raas: Hypnotic Spinning Steps You Need to Try",
            "Folk Fusion: When Traditional Garba Beats Collide with Modern Electronic Bass",
            "The Spiritual Significance of Navratri Raas Around the Sacred Garbi",
            "Vadodara to Worldwide: How Gujarati Folk Culture Reached Global Dance Floors",
            "Mastering the 3-Clap Garba (Tran Tali): Perfect Synchronization Guide",
            "Authentic Kathiawadi Dhol Rhythm That Gives Instant Goosebumps!"
        ],
        "claim": "Traditional group folk dancing enhances social synchrony and cardiovascular endurance.",
        "explanation": "Synchronous rhythmic physical activity triggers endorphin surges and elevates social bonding metrics according to cultural anthropology studies."
    },
    "Fitness & Health": {
        "intent": "achieve",
        "moods": ["energetic", "focus", "curious"],
        "goalTags": ["calisthenics", "fitness-habits", "workout", "mobility", "strength"],
        "theme": "fitness_pulse",
        "creators": [
            ("John Workout", "@johnworkout_fit", "Calisthenics athlete, bodyweight strength, & clean form"),
            ("Elena Movement", "@elena_mobility", "Restoring shoulder, hip, and spinal mobility daily"),
            ("Hyrox Beast Coach", "@hyrox_coach", "Endurance racing, functional fitness & stamina conditioning"),
            ("Dr. Vikram Sports Med", "@dr_vikram_physio", "Injury prevention, biomechanics, & strength rehabilitation"),
            ("Pulse Strength Lab", "@pulsestrength", "Scientific strength training, progressive overload & hypertrophy")
        ],
        "titles": [
            "How to Unlock Your First Strict Muscle-Up (3 Step Progression)",
            "The 5-Minute Daily Hip Mobility Routine That Eliminates Lower Back Pain",
            "Zone-2 Cardio: Why Low-Intensity Running Burns More Visceral Fat",
            "Perfect Push-Up Mechanics: Stop Flaring Your Elbows for Shoulder Safety",
            "Hang For 2 Minutes Every Day: What It Actually Does to Your Spine",
            "Why Calisthenics Builds Deeper Core Strength Than Traditional Crunches",
            "Fixing Rounded Shoulders: 3 Corrective Drills You Can Do at Your Desk",
            "The Science of Active Muscle Recovery: Ice Baths vs Light Movement",
            "Pistol Squat Masterclass: Balance, Ankle Dorsiflexion, and Knee Health",
            "Bodyweight Leg Day: Build Explosive Power with Zero Equipment"
        ],
        "claim": "Progressive bodyweight training activates deep stabilizer muscle fibers effectively.",
        "explanation": "Closed kinetic chain exercises improve neuromuscular control and tendon stiffness with lower shearing stress on joints."
    },
    "Food & Lifestyle": {
        "intent": "entertain",
        "moods": ["chill", "relaxed", "happy"],
        "goalTags": ["coffee", "lifestyle", "creativity", "baking", "aesthetic"],
        "theme": "cooking_flame",
        "creators": [
            ("Artisan Brews", "@artisan_brews", "Specialty espresso, pour-overs, & coffee beans origin stories"),
            ("Chef Ananya", "@chef_ananya", "Plant-rich gourmet recipes, quick sourdough, & comforting bowls"),
            ("Studio Living", "@studioliving_vlog", "Minimalist desk setups, morning rituals, & cozy aesthetics"),
            ("Street Food Chronicles", "@streetfood_chronicles", "Exploring authentic night markets and street delicacies globally"),
            ("Matcha & Co.", "@matcha_and_co", "Ceremonial grade matcha whisking, iced drinks, & Japanese aesthetics")
        ],
        "titles": [
            "Dialing in Espresso: The Ideal Grind Size for Sweet, Balanced Crema",
            "Weekend Sourdough Loaf: High Hydration, Crisp Crust, and Open Crumb",
            "The 6:00 AM Calm Morning Routine of a Minimalist Creator",
            "Authentic Japanese Iced Matcha Latte: Water Temperature & Whisking Technique",
            "Aesthetic Desk Setup Tour: Cable Management Hacks and Warm Lighting",
            "Pour-Over Coffee Masterclass: The 4:6 Method for Clarity and Floral Notes",
            "15-Minute Creamy Garlic Pasta Using Only 5 Pantry Ingredients",
            "How Fermented Foods Supercharge Your Gut Microbiome and Brain Energy",
            "Creating a Cozy Rainy Day Workspace with Ambient Soundscapes",
            "The Art of Making Fresh Sourdough Focaccia with Rosemary and Sea Salt"
        ],
        "claim": "Brewing coffee at 90-96°C extracts optimal aromatics without excessive bitterness.",
        "explanation": "Specialty Coffee Association standards prove water temperatures above 96°C over-extract bitter chlorogenic acids."
    },
    "Travel & Adventure": {
        "intent": "inspire",
        "moods": ["curious", "excited", "romantic"],
        "goalTags": ["travel", "adventure", "world-culture", "himalayas", "wanderlust"],
        "theme": "zen_flow",
        "creators": [
            ("Nomad Horizon", "@nomad_horizon", "Cinematic drone shots, solo vanlife, & unexplored destinations"),
            ("Spiti Diaries", "@spiti_diaries", "Winter expeditions, high passes, and Buddhist monasteries"),
            ("Kyoto Wanderer", "@kyoto_wanderer", "Hidden alleys, tranquil shrines, and Japanese seasonal beauty"),
            ("Tara Wild Trek", "@tara_wildtrek", "Alpine summits, backcountry camping, and trail survival"),
            ("Global Explorer Duo", "@global_explorer_duo", "Budget travel hacks, cultural discoveries, and remote vistas")
        ],
        "titles": [
            "Driving Through Frozen Spiti Valley at -25°C: The Ultimate Winter Roadtrip",
            "Walking Through Kyoto's Hidden Bamboo Groves at Sunrise (No Crowds)",
            "Chasing the Aurora Borealis in Tromsø, Norway: Nature's Neon Light Show",
            "Standing on the Edge of Preikestolen Cliff: Norway's Most Dramatic View",
            "Secret Crystal Blue Lagoons of the Mediterranean Hidden Behind Cliffs",
            "High-Altitude Camping Under a Billion Stars in Ladakh, Himalayas",
            "Solo Backpacking Through the Ancient Stone Villages of Georgia & Caucasus",
            "Catching the Golden Hour Over the Dolomite Peaks in Northern Italy",
            "Exploring the Living Root Bridges of Meghalaya Deep in the Rainforest",
            "The Most Scenic Train Ride in the World: Crossing the Swiss Glacier Express"
        ],
        "claim": "Immersion in natural vistas reduces mental fatigue through attention restoration.",
        "explanation": "Environmental psychology research (Kaplan & Kaplan) confirms natural environments trigger involuntary soft fascination, resetting prefrontal cortex fatigue."
    },
    "Productivity & Growth": {
        "intent": "teach",
        "moods": ["focus", "chill", "tired"],
        "goalTags": ["deep-work", "study", "atomic-habits", "psychology", "growth"],
        "theme": "finance_growth",
        "creators": [
            ("James Clear Insights", "@habits_mastery", "Small changes that lead to remarkable results"),
            ("Deep Work Hub", "@deepwork_hub", "Focus protocols, digital distraction blockers & flow states"),
            ("Mindset Vector", "@mindset_vector", "Mental models, cognitive biases, and strategic decision making"),
            ("Kavita Studygram", "@kavitastudies", "Medical student study systems, active recall & spaced repetition"),
            ("The High-Leverage Life", "@highleverage", "Compounding routines, personal finance, & time valuation")
        ],
        "titles": [
            "The 2-Minute Rule to Beat Procrastination Every Single Morning",
            "Why Willpower Fails: How to Design an Environment for Automatic Focus",
            "Active Recall & Spaced Repetition: How to Remember Everything You Read",
            "The 50/10 Pomodoro Flow: How to Work 4 Hours with 10 Hours of Output",
            "Digital Dopamine Detox: 3 Simple Steps to Reclaim Your Attention Span",
            "Second Brain Architecture: How I Organize My Entire Life in Obsidian",
            "The Compound Effect: Why 1% Better Daily Equals 37x Improvement in a Year",
            "Stop Multitasking: Cognitive Context Switching Destroys 40% of Daily IQ",
            "How to Build an Indestructible Morning Routine Without Waking at 4 AM",
            "Saying 'No' Strategically: The Highest Leverage Productivity Skill on Earth"
        ],
        "claim": "Context switching incurs cognitive attention residue that impairs productivity.",
        "explanation": "Professor Sophie Leroy's research confirms that shifting between tasks leaves residual attention on previous tasks, lowering cognitive bandwidth."
    },
    "Mindfulness & Mental Wellness": {
        "intent": "relax",
        "moods": ["calm", "relaxed", "sad"],
        "goalTags": ["mindfulness", "meditation", "stress-relief", "breathwork", "detox"],
        "theme": "zen_flow",
        "creators": [
            ("Calm Mind Institute", "@calmmind_institute", "Breathwork, nervous system regulation & somatic reset"),
            ("Dr. Maya Neuro", "@dr_maya_neuro", "Neurobiology of sleep, stress reduction & mental clarity"),
            ("Zen Sanctuary", "@zen_sanctuary", "Guided meditations, Tibetan singing bowls, and peaceful ambience"),
            ("Stoic Daily", "@stoic_daily", "Timeless philosophy for inner tranquility amidst external chaos"),
            ("Breathe with David", "@breathe_david", "Box breathing, 4-7-8 method, and physiological sigh practices")
        ],
        "titles": [
            "The 90-Second Physiological Sigh: Instantly Reset Acute Stress & Panic",
            "Box Breathing Technique Used by Navy SEALs to Stay Calm Under High Pressure",
            "Non-Sleep Deep Rest (NSDR): How a 15-Minute Protocol Restores 2 Hours of Sleep",
            "Morning Sunlight Exposure: Why 10 Minutes Sets Your Circadian Clock",
            "Stoic Reflection for When Everything Feels Overwhelming: Focus on What You Control",
            "Somatic Body Scan for Deep Muscle Relaxation Before Bed",
            "Why Overthinking Is an Addiction: 3 Micro-Practices to Ground in the Present",
            "Sound Healing with 432Hz Tibetan Singing Bowls: Calming Brain Waves",
            "Mindful Walking: How to Convert Your Daily Commute into Active Meditation",
            "The Power of Journaling Your Anxieties: Externalizing Mental Friction"
        ],
        "claim": "Double inhales followed by prolonged exhales immediately slow heart rate.",
        "explanation": "The physiological sigh offloads carbon dioxide and stimulates vagal parasympathetic signaling, slowing sinoatrial cardiac pacing."
    },
    "Music & Audio": {
        "intent": "relax",
        "moods": ["chill", "romantic", "creative"],
        "goalTags": ["music", "lofi", "beats", "acoustic", "instrumental"],
        "theme": "zen_flow",
        "creators": [
            ("Lo-Fi Dusk", "@lofidusk", "Warm tape saturation, vinyl crackle, & cozy midnight chords"),
            ("Acoustic Strings", "@acoustic_strings", "Fingerstyle acoustic guitar arrangements of iconic melodies"),
            ("Synthwave Odyssey", "@synthwave_odyssey", "80s retro synthesizers, neon highways, and analog drum machines"),
            ("Sitar & Beats", "@sitar_beats_fusion", "Classical Indian raga melodies layered over deep lo-fi grooves"),
            ("Piano Reverie", "@piano_reverie", "Gentle cinematic piano improvisations for studying and dreaming")
        ],
        "titles": [
            "Midnight Rain & Lo-Fi Beats: Nostalgic Chords to Study and Relax to",
            "Fingerstyle Acoustic Guitar: Soft Melodic Harmonics in DADGAD Tuning",
            "Retro Synthwave Drive: Analog Arpeggios Under a Neon Twilight Sky",
            "Sitar Raga Meets Lo-Fi Hip Hop: Mesmerizing Fusion of East and West",
            "Cinematic Piano Improvisation That Feels Like a Quiet Winter Memory",
            "Chillhop Coffee Break: Warm Rhodes Piano and Dusty Vinyl Textures",
            "Ambient Modular Synth Jam: Generative Soundscapes for Sleep and Peace",
            "Bhangra Beats on Lo-Fi Tape: A Relaxed Take on Vibrant Punjabi Folk",
            "Acoustic Cover of Timeless Bollywood Melody in Warm Sunset Light",
            "Deep Binaural Beats (Alpha Waves) for Effortless Flow State Focus"
        ],
        "claim": "Listening to 60-80 BPM music synchronizes brainwaves to relaxed alpha states.",
        "explanation": "Auditory beat stimulation modulates electroencephalographic oscillations, shifting neural activity towards 8-12 Hz relaxation frequencies."
    },
    "Science & Cosmos": {
        "intent": "teach",
        "moods": ["curious", "excited", "focus"],
        "goalTags": ["astronomy", "cosmos", "physics", "neuroscience", "biology"],
        "theme": "quantum_grid",
        "creators": [
            ("Cosmos Explained", "@cosmos_explained", "Astrophysics, black holes, and the mysteries of deep space"),
            ("Quantum Frontier", "@quantum_frontier", "Quantum mechanics, particle physics, and fundamental reality"),
            ("Bio Wonders", "@bio_wonders", "Cellular machinery, evolutionary adaptations, & microbiology"),
            ("Neuro Lab", "@neuro_lab", "How 86 billion neurons generate thoughts, consciousness & dreams"),
            ("Ocean Mysteries", "@ocean_mysteries", "Abyssal trenches, bioluminescence, and alien marine ecosystems")
        ],
        "titles": [
            "James Webb Telescope Captures the Earliest Galaxies Born After Big Bang",
            "What Actually Happens When You Cross a Black Hole's Event Horizon?",
            "Quantum Entanglement: How Two Particles Communicate Across Light Years",
            "The Brain's Glymphatic System: How Your Cerebrospinal Fluid Cleans Waste at Night",
            "Deep Sea Bioluminescence: How Creatures Glow in the Sunless Abyss",
            "The True Scale of the Solar System: If Earth Were a Marble",
            "CRISPR Gene Editing Explained: Molecular Scissors Rewriting Biology",
            "Neutron Stars: Where One Teaspoon of Matter Weighs as Much as Mount Everest",
            "Tardigrades: The Microscopic Animals That Can Survive the Vacuum of Space",
            "The Fermi Paradox: If Alien Life Is Likely, Where Is Everybody?"
        ],
        "claim": "The James Webb Space Telescope observes the universe in deep infrared wavelengths.",
        "explanation": "Infrared light penetrates dense cosmic dust clouds, allowing JWST to resolve light redshifted from the cosmic dawn ~13.5 billion years ago."
    }
}

MOOD_LIST = [
    "happy", "relaxed", "excited", "chill", "sad",
    "tired", "neutral", "frustrated", "curious", "romantic"
]

def generate_shortcode():
    chars = string.ascii_letters + string.digits + "_-"
    return "Dd" + "".join(random.choices(chars, k=9))

def generate_reel(index, cat_name, data):
    code = generate_shortcode()
    creator_info = random.choice(data["creators"])
    name, handle, bio = creator_info
    title_base = random.choice(data["titles"])
    
    # Add slight natural variations
    variation_suffixes = [
        "", " — Part 2", " (Viral Breakdown)", " • Watch Till The End",
        " 🚀", " ✨", " 🔥", " (2026 Edition)", " | Full Guide", " [Step by Step]"
    ]
    title = f"{title_base}{random.choice(variation_suffixes)}"
    
    video_url = random.choice(VIDEO_FILES)
    avatar_url = random.choice(AVATAR_POOL)
    
    selected_mood = random.choice(data["moods"]) if random.random() < 0.7 else random.choice(MOOD_LIST)
    
    likes = random.randint(3500, 890000)
    views = int(likes * random.uniform(4.5, 12.0))
    comments_count = max(45, int(likes * random.uniform(0.015, 0.055)))
    shares = int(likes * random.uniform(0.12, 0.35))
    duration = random.randint(18, 58)
    
    # Goal tags
    category_tags = data["goalTags"]
    tags = list(set([cat_name.lower().replace(" ", "-"), selected_mood] + random.sample(category_tags, min(3, len(category_tags)))))
    
    hashtags = " ".join([f"#{t.replace('-', '')}" for t in tags[:4]])
    description = f"{title} - Shared by {handle}. {hashtags} #TrendingReels #Instagram #ZynqoSocial"
    
    reality_check = {
        "verdict": "Verified" if random.random() < 0.85 else "Educational Consensus",
        "claim": data["claim"],
        "explanation": data["explanation"],
        "sources": [
            {"name": f"{cat_name} Verified Research", "url": f"https://instagram.com/{handle.replace('@','')}", "credibility": "Social Media Creator & Domain Authority"},
            {"name": "Independent Science Reference", "url": "https://wikipedia.org", "credibility": "Peer-Reviewed Reference Base"}
        ],
        "aiConfidence": random.randint(95, 99)
    }
    
    why_am_i_seeing_this = {
        "primaryReason": f"Recommended for your active interest in {cat_name} and {selected_mood} mood vibe.",
        "matchedInterests": [cat_name, selected_mood.capitalize()] + tags[:2],
        "signalWeight": {
            "watchHistory": random.randint(35, 45),
            "goalAlignment": random.randint(25, 35),
            "currentMood": random.randint(15, 25),
            "collaborativeFilter": 10
        },
        "privacyNote": "Personalized on-device via zero-tracker intent synthesis."
    }
    
    useful_outputs = {
        "notes": {
            "summary": f"{title}. Key insights shared by {handle}.",
            "bulletPoints": [
                f"Core principle: Applying deliberate practice to {cat_name}.",
                "Focus on steady execution and removing cognitive friction.",
                "Compounding habits produce outsized results over time."
            ],
            "keyTakeaway": "Consistency in fundamentals outperforms sporadic intensity every single time."
        },
        "quiz": [
            {
                "question": f"What is the primary takeaway demonstrated in this {cat_name} reel?",
                "options": [
                    "Consistent, deliberate execution of core fundamentals",
                    "Rushing the process for immediate shortcuts",
                    "Ignoring practical techniques entirely",
                    "Passive observation without real-world application"
                ],
                "correctIndex": 0,
                "explanation": f"The creator demonstrates intentional technique and structured consistency in {cat_name}."
            },
            {
                "question": "What is the most effective immediate next step?",
                "options": [
                    "Test and apply the demonstrated technique immediately",
                    "Forget the video and move on",
                    "Wait months before practicing",
                    "Complicate the routine unnecessarily"
                ],
                "correctIndex": 0,
                "explanation": "Immediate active execution cements motor learning and concept retention."
            }
        ],
        "checklist": [
            {"task": f"Review key principles from {handle}'s demonstration", "minutes": 3},
            {"task": f"Apply 1 practical insight to your daily routine", "minutes": 10}
        ],
        "studyPlan": [
            {"day": "Day 1", "focus": "Observation & Form", "action": "Break down mechanics and identify baseline friction."},
            {"day": "Day 2", "focus": "Execution", "action": "Complete 1 focused session applying the demonstration."},
            {"day": "Day 3", "focus": "Integration", "action": "Log progress in Memory Vault and refine routine."}
        ],
        "tasks": [
            {
                "id": f"t-ig-{code}-0",
                "title": f"Review key principles from {handle}'s demonstration",
                "estimatedMinutes": 3,
                "category": cat_name
            },
            {
                "id": f"t-ig-{code}-1",
                "title": f"Apply 1 practical insight to your daily routine",
                "estimatedMinutes": 10,
                "category": cat_name
            }
        ]
    }
    
    source_rights = {
        "platform": "Instagram",
        "creatorHandle": handle,
        "rightsStatus": "Licensed" if random.random() < 0.6 else "Creator Attributed",
        "url": f"https://www.instagram.com/reel/{code}/"
    }
    
    return {
        "id": f"ig-{code}",
        "title": title,
        "creator": {
            "name": name,
            "handle": handle,
            "avatar": avatar_url,
            "verified": random.random() < 0.7,
            "bio": bio
        },
        "videoUrl": video_url,
        "visualTheme": data["theme"],
        "description": description,
        "duration": duration,
        "category": cat_name,
        "intent": data["intent"],
        "goalTags": tags,
        "mood": selected_mood,
        "likes": likes,
        "commentsCount": comments_count,
        "shares": shares,
        "views": views,
        "isAIGenerated": False,
        "safetyScore": random.randint(96, 99),
        "realityCheck": reality_check,
        "whyAmISeeingThis": why_am_i_seeing_this,
        "transcript": f"{title} - Video presentation by {name} ({handle}). Breaking down key practical insights.",
        "usefulOutputs": useful_outputs,
        "sourceRights": source_rights
    }

def main():
    print("🚀 Generating 1,000 Trending Instagram Reels with Mixed Feed...")
    
    # Load existing reels to preserve originals
    existing_reels = []
    if os.path.exists(REELS_SERVER_PATH):
        with open(REELS_SERVER_PATH, 'r', encoding='utf-8') as f:
            existing_reels = json.load(f)
    print(f"📦 Preserving {len(existing_reels)} existing original reels.")
    
    target_total = 1000
    needed = target_total - len(existing_reels)
    
    categories = list(CATEGORY_TEMPLATES.keys())
    new_reels = []
    
    for i in range(needed):
        cat_name = categories[i % len(categories)]
        cat_data = CATEGORY_TEMPLATES[cat_name]
        reel = generate_reel(i, cat_name, cat_data)
        new_reels.append(reel)
        
    # Shuffle new reels across categories and moods to create a rich mixed feed
    random.seed(42)  # Deterministic seed for reproducible elegance
    random.shuffle(new_reels)
    
    # Interleave existing original reels at top & balanced intervals
    combined_reels = []
    existing_idx = 0
    interval = target_total // (len(existing_reels) + 1)
    
    for i, new_reel in enumerate(new_reels):
        if existing_idx < len(existing_reels) and (i % interval == 0):
            combined_reels.append(existing_reels[existing_idx])
            existing_idx += 1
        combined_reels.append(new_reel)
        
    while existing_idx < len(existing_reels):
        combined_reels.append(existing_reels[existing_idx])
        existing_idx += 1
        
    print(f"✅ Generated {len(combined_reels)} total reels across {len(categories)} categories and 10 mood spectrums.")
    
    # Write to server/data/reels.json
    with open(REELS_SERVER_PATH, 'w', encoding='utf-8') as f:
        json.dump(combined_reels, f, indent=2, ensure_ascii=False)
    print(f"💾 Written to: {REELS_SERVER_PATH} ({os.path.getsize(REELS_SERVER_PATH)} bytes)")
    
    # Write to src/data/defaultReels.json
    with open(REELS_SRC_PATH, 'w', encoding='utf-8') as f:
        json.dump(combined_reels, f, indent=2, ensure_ascii=False)
    print(f"💾 Written to: {REELS_SRC_PATH} ({os.path.getsize(REELS_SRC_PATH)} bytes)")

if __name__ == '__main__':
    main()
