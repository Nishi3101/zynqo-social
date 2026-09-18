import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

REELS_JSON_PATH = os.path.join(os.getcwd(), 'server', 'data', 'reels.json')

navratri_reels = [
    {
        "id": "ig-navratri-united-way-garba",
        "title": "United Way Vadodara: 30,000+ Dancers in Hypnotic Circular Raas",
        "creator": {
            "name": "United Way Baroda Official",
            "handle": "@unitedwaybaroda_garba",
            "avatar": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=150&auto=format&fit=crop&q=80",
            "verified": True,
            "bio": "Official Vadodara Navratri Mahotsav — Largest Garba Gathering in the World"
        },
        "videoUrl": "/videos/ig_navratri_united_way.mp4",
        "visualTheme": "festival_garba",
        "description": "Over 30,000 dancers moving in mesmerizing concentric circles under the Sharad Poonam night sky at United Way Vadodara. The spiritual energy, traditional beats, and synchronized footwork of Gujarat's grandest Navratri festival. #Navratri #Garba #UnitedWay #Baroda #Gujarat #Dandiya #CulturalHeritage",
        "duration": 53,
        "category": "Culture & Dance",
        "intent": "entertain",
        "goalTags": ["garba", "navratri", "culture", "dance", "gujarat"],
        "mood": "energetic",
        "likes": 142000,
        "commentsCount": 3820,
        "shares": 41200,
        "views": 890000,
        "isAIGenerated": False,
        "safetyScore": 99,
        "realityCheck": {
            "verdict": "Verified Cultural Heritage",
            "claim": "United Way Baroda is recognized globally as one of the largest synchronized community folk dance gatherings.",
            "explanation": "United Way of Baroda hosts over 30,000 registered dancers nightly during Navratri, dancing in concentric circles around the central Garbi shrine, recognized in global cultural festival archives.",
            "sources": [
                {
                    "name": "Gujarat Tourism Official Portal",
                    "url": "https://www.gujarattourism.com",
                    "credibility": "State Tourism Authority"
                },
                {
                    "name": "United Way Baroda Cultural Archive",
                    "url": "https://unitedwaybaroda.org",
                    "credibility": "Official Festival Foundation"
                }
            ],
            "aiConfidence": 99
        },
        "whyAmISeeingThis": {
            "primaryReason": "Recommended based on popular trending cultural dance, festive Navratri music, and community celebrations.",
            "matchedInterests": ["Navratri", "Garba", "Culture & Dance", "Festivals"],
            "signalWeight": {
                "watchHistory": 40,
                "goalAlignment": 30,
                "currentMood": 20,
                "collaborativeFilter": 10
            },
            "privacyNote": "Ranked locally for your cultural and dance discovery. No tracking cookies or commercial ad exchange."
        },
        "transcript": "Aerial view of United Way Vadodara Garba ground. Tens of thousands of dancers in traditional attire move seamlessly in synchronized concentric rings to the beat of authentic Gujarati folk music.",
        "usefulOutputs": {
            "notes": {
                "summary": "United Way Vadodara - The world's grandest community Garba celebration.",
                "bulletPoints": [
                    "Garba symbolizes the cyclical nature of time and creation, performed in concentric circles around the sacred Garbi lamp.",
                    "Synchronized folk dancing fosters immense community solidarity, social bonding, and cardiovascular fitness.",
                    "United Way Baroda channels proceeds towards education, healthcare, and humanitarian community empowerment across Gujarat."
                ],
                "keyTakeaway": "Garba brings people together in collective joy, fitness, and timeless cultural harmony."
            },
            "quiz": [
                {
                    "question": "In which Gujarat city is the world-renowned United Way Garba held?",
                    "options": ["Vadodara (Baroda)", "Surat", "Rajkot", "Bhavnagar"],
                    "correctIndex": 0,
                    "explanation": "Vadodara is known as the cultural capital of Gujarat, hosting the famous United Way Garba!"
                },
                {
                    "question": "What geometric pattern is traditionally formed by dancers during Garba?",
                    "options": ["Concentric Circles", "Straight Parallel Lines", "Triangular Grids", "Zig-zag columns"],
                    "correctIndex": 0,
                    "explanation": "Garba is performed in concentric circles, symbolizing the circle of life and infinite divine energy."
                }
            ],
            "checklist": [
                { "task": "Learn basic 2-step and 3-step Garba claps and footwork", "minutes": 10 },
                { "task": "Listen to traditional dhol rhythm to practice synchronization", "minutes": 5 }
            ],
            "studyPlan": [
                { "day": "Day 1", "focus": "Rhythm & Pulse", "action": "Listen to Garba dhol beats and practice basic foot-tapping in tempo." },
                { "day": "Day 2", "focus": "Circular Coordination", "action": "Practice 2-step Garba while maintaining steady rotational movement." },
                { "day": "Day 3", "focus": "Group Synchronization", "action": "Dance with friends or family in a circle to build festive harmony." }
            ]
        }
    },
    {
        "id": "ig-navratri-dodhiya-14step",
        "title": "Traditional 14-Step Dodhiya: Master the Footwork & Claps",
        "creator": {
            "name": "Dharini Shah Dance Academy",
            "handle": "@garba_queen_dharini",
            "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            "verified": True,
            "bio": "Traditional Gujarat Garba & Dodhiya Instructor | National Dance Performer"
        },
        "videoUrl": "/videos/ig_navratri_dodhiya_steps.mp4",
        "visualTheme": "fitness_pulse",
        "description": "Learn the classic 14-step Dodhiya! Breakdown of leg movements, directional transitions, and rhythm claps for your Navratri night. #Dodhiya #GarbaSteps #NavratriDance #DanceTutorial #GujaratiDance #GarbaLover",
        "duration": 17,
        "category": "Culture & Dance",
        "intent": "teach",
        "goalTags": ["dodhiya", "garba-tutorial", "dance", "navratri", "fitness"],
        "mood": "energetic",
        "likes": 96400,
        "commentsCount": 1450,
        "shares": 28300,
        "views": 540000,
        "isAIGenerated": False,
        "safetyScore": 99,
        "realityCheck": {
            "verdict": "Educational Consensus",
            "claim": "Dodhiya is an authentic multi-step folk dance progression originating from Gujarat's folk dance traditions.",
            "explanation": "Dodhiya variations range from 2-step, 3-step up to 14-step and 32-step patterns, blending anaerobic endurance, coordination, and rhythmic clapping.",
            "sources": [
                {
                    "name": "Sangeet Natak Akademi Folk Dance Research",
                    "url": "https://sangeetnatak.gov.in",
                    "credibility": "National Academy for Music & Dance"
                }
            ],
            "aiConfidence": 98
        },
        "whyAmISeeingThis": {
            "primaryReason": "Matched your interest in dance tutorials, fitness footwork, and cultural skill learning.",
            "matchedInterests": ["Garba", "Dance Tutorial", "Dodhiya", "Fitness"],
            "signalWeight": {
                "watchHistory": 45,
                "goalAlignment": 35,
                "currentMood": 10,
                "collaborativeFilter": 10
            },
            "privacyNote": "Personalized on device based on dance technique interest."
        },
        "transcript": "14 step Dodhiya tutorial breakdown. Step forward with the right foot, cross, pivot with clap, and step backward in 14 rhythmic counts.",
        "usefulOutputs": {
            "notes": {
                "summary": "Mastering 14-step Dodhiya footwork for Navratri.",
                "bulletPoints": [
                    "Dodhiya demands core stability and balanced weight distribution on the balls of your feet.",
                    "Keep knees slightly bent to absorb impact and enable swift direction changes.",
                    "Sync clapping with the fourth and eighth counts to maintain group cadence."
                ],
                "keyTakeaway": "Smooth footwork and rhythm timing make Dodhiya effortless and exhilarating!"
            },
            "quiz": [
                {
                    "question": "What is the key to executing smooth turns during a 14-step Dodhiya?",
                    "options": ["Staying on the balls of your feet with soft knees", "Stiffening your legs completely", "Looking down at the floor", "Stopping every two steps"],
                    "correctIndex": 0,
                    "explanation": "Staying light on the balls of your feet with bent knees allows agile, injury-free pivots!"
                }
            ],
            "checklist": [
                { "task": "Practice 14 counts slowly without music to memorize the pattern", "minutes": 5 },
                { "task": "Accelerate to full tempo with traditional dhol track", "minutes": 5 }
            ],
            "studyPlan": [
                { "day": "Day 1", "focus": "Count 1 to 7", "action": "Master the forward transition and first pivot." },
                { "day": "Day 2", "focus": "Count 8 to 14", "action": "Perfect the return sequence and synchronized clap." },
                { "day": "Day 3", "focus": "Full Flow", "action": "Perform 5 continuous cycles without breaking rhythm." }
            ]
        }
    },
    {
        "id": "ig-navratri-titodo-sanedo-beats",
        "title": "Energetic Titodo & Sanedo: Authentic Kathiawadi High-Tempo Beats",
        "creator": {
            "name": "Folk Raas Rhythm Club",
            "handle": "@folkraas_gujarat",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
            "verified": False,
            "bio": "Celebrating Authentic Sanedo, Titodo, and Kathiawadi Folk Rhythms"
        },
        "videoUrl": "/videos/ig_navratri_titodo_sanedo.mp4",
        "visualTheme": "zen_flow",
        "description": "When the dhol strikes the Titodo beat! The electrifying pulse of Kathiawadi folk music that keeps everyone dancing until 4 AM. #Titodo #Sanedo #Kathiyawadi #NavratriVibes #GarbaFever #GujaratiFolk",
        "duration": 30,
        "category": "Culture & Dance",
        "intent": "entertain",
        "goalTags": ["titodo", "sanedo", "garba", "kathiawadi", "folk-music"],
        "mood": "excited",
        "likes": 118000,
        "commentsCount": 2100,
        "shares": 34000,
        "views": 720000,
        "isAIGenerated": False,
        "safetyScore": 99,
        "realityCheck": {
            "verdict": "Verified Folk Tradition",
            "claim": "Sanedo and Titodo are indigenous folk forms rooted in Gujarat's rural traditions.",
            "explanation": "Sanedo is a historic Gujarati folk song and dance genre from Saurashtra/Kathiawad featuring four-line couplets and energetic rhythmic jumps.",
            "sources": [
                {
                    "name": "Gujarat Sahitya Akademi",
                    "url": "https://sahityaakademi.gujarat.gov.in",
                    "credibility": "Folk Literature & Culture Council"
                }
            ],
            "aiConfidence": 97
        },
        "whyAmISeeingThis": {
            "primaryReason": "Trending folk dance performance and regional Indian music celebration.",
            "matchedInterests": ["Folk Music", "Sanedo", "Titodo", "Navratri"],
            "signalWeight": {
                "watchHistory": 35,
                "goalAlignment": 30,
                "currentMood": 25,
                "collaborativeFilter": 10
            },
            "privacyNote": "Locally matched for cultural music lovers."
        },
        "transcript": "Titodo and Sanedo high-tempo beats with rapid clapping, rhythmic twirls, and enthusiastic shouts of Ae Halo!",
        "usefulOutputs": {
            "notes": {
                "summary": "High energy Kathiawadi Titodo and Sanedo folk expressions.",
                "bulletPoints": [
                    "Titodo is characterized by brisk, high-cadence steps that peak towards the climax of a Garba set.",
                    "Sanedo couplets traditionally express romance, rural wit, and communal camaraderie.",
                    "Folk music cadence elevates cardiovascular heart rate while keeping cognitive focus sharp."
                ],
                "keyTakeaway": "The pure acoustic power of dhol and shehnai drives unforgettable celebration."
            },
            "quiz": [
                {
                    "question": "What region of Gujarat is most famously associated with the Sanedo folk tradition?",
                    "options": ["Saurashtra / Kathiawad", "Goa", "Kashmir", "Punjab"],
                    "correctIndex": 0,
                    "explanation": "Sanedo originated in Saurashtra (Patan and Kathiawad region) and is beloved across Gujarat!"
                }
            ],
            "checklist": [
                { "task": "Learn the 3-clap Titodo progression", "minutes": 5 },
                { "task": "Practice rapid foot switch in sync with dhol tempo", "minutes": 5 }
            ],
            "studyPlan": [
                { "day": "Day 1", "focus": "Tempo Adaptation", "action": "Listen to accelerating dhol cues to train reaction speed." },
                { "day": "Day 2", "focus": "Jump & Clap Timing", "action": "Practice landing softly while maintaining simultaneous clap cadence." },
                { "day": "Day 3", "focus": "Endurance Stamina", "action": "Sustain a 3-minute continuous Titodo set." }
            ]
        }
    },
    {
        "id": "ig-navratri-chaniya-choli-styling",
        "title": "Royal Kutch Chaniya Choli: Handcrafted Mirror Work & Dandiya Styling",
        "creator": {
            "name": "Heritage Choli & Couture",
            "handle": "@navratri_ethnic_couture",
            "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
            "verified": False,
            "bio": "Kutch Mirror Work, Bandhani & Authentic Navratri Chaniya Choli Styling"
        },
        "videoUrl": "/videos/ig_navratri_chaniya_choli.mp4",
        "visualTheme": "cooking_flame",
        "description": "Handmade Abhla (mirror) embroidery, 10-meter flare gher, and oxidized silver jewelry! Complete styling guide for 9 nights of glamour. #ChaniyaCholi #NavratriFashion #KutchEmbroidery #EthnicWear #Navratri2026 #TraditionalLook",
        "duration": 35,
        "category": "Culture & Dance",
        "intent": "inspire",
        "goalTags": ["chaniya-choli", "fashion", "kutch-embroidery", "navratri-look", "styling"],
        "mood": "creative",
        "likes": 88900,
        "commentsCount": 920,
        "shares": 19400,
        "views": 460000,
        "isAIGenerated": False,
        "safetyScore": 99,
        "realityCheck": {
            "verdict": "Verified Artisanal Craft",
            "claim": "Kutch mirror-work (Abhla Bharat) and Bandhani tie-dye are GI-tagged indigenous crafts of Gujarat.",
            "explanation": "Artisans in Kutch use traditional hand embroidery with mirrors and hand-dyed Bandhani textiles dating back centuries, preserved by indigenous artisan cooperatives.",
            "sources": [
                {
                    "name": "Geographical Indications Registry of India",
                    "url": "https://ipindia.gov.in",
                    "credibility": "Government IP Authority"
                }
            ],
            "aiConfidence": 99
        },
        "whyAmISeeingThis": {
            "primaryReason": "Matched interest in traditional textiles, Indian fashion design, and festive styling.",
            "matchedInterests": ["Textiles", "Traditional Fashion", "Styling", "Navratri"],
            "signalWeight": {
                "watchHistory": 40,
                "goalAlignment": 30,
                "currentMood": 20,
                "collaborativeFilter": 10
            },
            "privacyNote": "Curated on-device. No advertiser profiling."
        },
        "transcript": "Showcasing an authentic 10-meter flare Kutch Chaniya Choli featuring real glass mirror embroidery, brass tassels, and oxidized silver coin jewelry.",
        "usefulOutputs": {
            "notes": {
                "summary": "Artisan craftsmanship of authentic Navratri Chaniya Choli.",
                "bulletPoints": [
                    "Abhla Bharat (mirror work) reflects candlelight and festive illumination during nocturnal dances.",
                    "Pure cotton fabrics with natural vegetable dyes provide breathability during rigorous 5-hour dancing sessions.",
                    "Pairing with lightweight oxidized silver jewelry prevents neck fatigue while preserving royal traditional aesthetics."
                ],
                "keyTakeaway": "Traditional handmade textiles combine sustainable craft, breathability, and stunning festive elegance."
            },
            "quiz": [
                {
                    "question": "What is the traditional Gujarati term for mirror-work embroidery on Chaniya Cholis?",
                    "options": ["Abhla Bharat", "Zardozi", "Chikankari", "Phulkari"],
                    "correctIndex": 0,
                    "explanation": "Abhla Bharat is the famous Gujarati mirror-work embroidery crafted by Kutch and Saurashtra artisans!"
                }
            ],
            "checklist": [
                { "task": "Check garment breathability and weight before long dance nights", "minutes": 3 },
                { "task": "Secure oxidized jewelry with safety pins and silicone backings", "minutes": 2 }
            ],
            "studyPlan": [
                { "day": "Day 1", "focus": "Textile Heritage", "action": "Learn about the difference between Bandhani, Patola, and Kutch embroidery." },
                { "day": "Day 2", "focus": "Comfort & Movement", "action": "Test dance mobility and skirt flare rotation." },
                { "day": "Day 3", "focus": "Accessorizing", "action": "Coordinate oxidized jewelry to balance weight and visual shine." }
            ]
        }
    },
    {
        "id": "ig-navratri-dholida-raas-performance",
        "title": "Dholida Raas: Fast-Paced Dhol Beats & High Energy Clapping",
        "creator": {
            "name": "Dholida Raas Crew",
            "handle": "@dholida_beats_official",
            "avatar": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
            "verified": True,
            "bio": "Dhol Beats, Fast-Paced Gujarati Raas & Festival Energy"
        },
        "videoUrl": "/videos/ig_navratri_dholida_performance.mp4",
        "visualTheme": "finance_growth",
        "description": "When the live dhol players accelerate the beat! Non-stop Raas Garba choreography with lightning-fast turns and synchronized partner claps. #Dholida #GarbaRaas #DholBeats #NavratriNights #GujaratFestival #FolkEnergy",
        "duration": 61,
        "category": "Culture & Dance",
        "intent": "achieve",
        "goalTags": ["dholida", "garba", "raas", "dhol-beats", "dance-cardio"],
        "mood": "energetic",
        "likes": 156000,
        "commentsCount": 2450,
        "shares": 39000,
        "views": 980000,
        "isAIGenerated": False,
        "safetyScore": 99,
        "realityCheck": {
            "verdict": "Verified Physical Wellness",
            "claim": "Intense folk dance like high-tempo Garba acts as high-intensity interval training (HIIT).",
            "explanation": "Cardiovascular studies show that 60 minutes of high-tempo Garba burns between 400 to 600 calories, enhancing aerobic endurance and core stability.",
            "sources": [
                {
                    "name": "International Journal of Physical Education & Sports",
                    "url": "https://ijpes.org",
                    "credibility": "Peer-Reviewed Sports Journal"
                }
            ],
            "aiConfidence": 98
        },
        "whyAmISeeingThis": {
            "primaryReason": "Popular high-energy dance workout and festival choreography recommendation.",
            "matchedInterests": ["Dance Cardio", "Garba", "HIIT", "Festival Energy"],
            "signalWeight": {
                "watchHistory": 40,
                "goalAlignment": 30,
                "currentMood": 20,
                "collaborativeFilter": 10
            },
            "privacyNote": "Calculated locally without ad trackers."
        },
        "transcript": "Fast tempo Dholida beats accelerating, dancers executing spinning jumps, double claps, and high-energy circular sweeps.",
        "usefulOutputs": {
            "notes": {
                "summary": "Cardiovascular and endurance benefits of high-energy Garba Raas.",
                "bulletPoints": [
                    "Accelerating percussion naturally triggers adrenaline and endorphin release.",
                    "Fast footwork challenges agility, balance, and bilateral coordination.",
                    "Remember to hydrate with electrolytes during sustained 3-hour dancing sessions."
                ],
                "keyTakeaway": "Garba is an incredible full-body cardio workout disguised as joyful celebration!"
            },
            "quiz": [
                {
                    "question": "How many calories can an hour of energetic Garba dance typically burn?",
                    "options": ["400 to 600 calories", "50 calories", "1500 calories", "None"],
                    "correctIndex": 0,
                    "explanation": "Research indicates an hour of energetic Garba burns approximately 400 to 600 calories!"
                }
            ],
            "checklist": [
                { "task": "Warm up ankles, calves, and hamstrings before fast Garba", "minutes": 5 },
                { "task": "Hydrate with water and coconut water / lemon water", "minutes": 2 }
            ],
            "studyPlan": [
                { "day": "Day 1", "focus": "Cardio Base", "action": "Dance through 15 minutes of moderate Garba songs without stopping." },
                { "day": "Day 2", "focus": "Interval Sprints", "action": "Perform 30-second rapid spin bursts during song crescendos." },
                { "day": "Day 3", "focus": "Cool Down & Recovery", "action": "Gentle stretching and hydration routine after dance." }
            ]
        }
    }
]

def main():
    print("Loading existing reels...")
    with open(REELS_JSON_PATH, 'r', encoding='utf-8') as f:
        existing = json.load(f)
        
    # Remove any previous navratri reels to avoid duplicates
    existing_without_navratri = [r for r in existing if not r.get('id', '').startswith('ig-navratri-')]
    
    # Separate existing reels by category / type
    tmkoc_reels = [r for r in existing_without_navratri if 'tmkoc' in r.get('id', '')]
    other_reels = [r for r in existing_without_navratri if 'tmkoc' not in r.get('id', '')]
    
    print(f"Existing non-TMKOC reels: {len(other_reels)}")
    print(f"Existing TMKOC reels: {len(tmkoc_reels)}")
    print(f"New Navratri reels: {len(navratri_reels)}")
    
    # Build perfectly mixed, interleaved list
    # Sequence pattern: Navratri -> Other -> TMKOC -> Other -> Navratri -> Other -> Other -> TMKOC ...
    mixed = []
    
    # Groups
    nav_idx = 0
    tmkoc_idx = 0
    other_idx = 0
    
    while nav_idx < len(navratri_reels) or tmkoc_idx < len(tmkoc_reels) or other_idx < len(other_reels):
        # 1. Navratri reel (if available)
        if nav_idx < len(navratri_reels):
            mixed.append(navratri_reels[nav_idx])
            nav_idx += 1
            
        # 2. Tech / Lifestyle / Educational reel (if available)
        if other_idx < len(other_reels):
            mixed.append(other_reels[other_idx])
            other_idx += 1
            
        # 3. TMKOC Comedy reel (if available)
        if tmkoc_idx < len(tmkoc_reels):
            mixed.append(tmkoc_reels[tmkoc_idx])
            tmkoc_idx += 1
            
        # 4. Another varied reel (if available)
        if other_idx < len(other_reels):
            mixed.append(other_reels[other_idx])
            other_idx += 1

    print(f"\nTotal reels after mixing: {len(mixed)}")
    print("First 12 reels in mixed feed:")
    for i, r in enumerate(mixed[:12]):
        print(f"  {i+1}. [{r.get('category')}] {r.get('title')[:45]} (@{r.get('creator', {}).get('handle')})")

    # Save to reels.json
    with open(REELS_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(mixed, f, indent=2, ensure_ascii=False)
        
    print(f"\n🎉 reels.json successfully saved with {len(mixed)} interleaved reels!")

if __name__ == '__main__':
    main()
