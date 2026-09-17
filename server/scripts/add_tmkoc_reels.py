import subprocess
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

REELS_JSON_PATH = os.path.join(os.getcwd(), 'server', 'data', 'reels.json')
VIDEOS_DIR = os.path.join(os.getcwd(), 'public', 'videos')

tmkoc_items = [
    {
        "code": "Dc0d1dtu1ug",
        "title": "Gokuldham Society Special: Jethalal & Bapuji Fun Moments",
        "uploader": "taarakmehtakaooltahchashmahnfp",
        "handle": "@taarakmehtakaooltahchashmahnfp",
        "name": "TMKOC Official (Neela Film)",
        "likes": 84500,
        "views": 420000,
        "commentsCount": 1250,
        "verified": True
    },
    {
        "code": "DdBV_uOhjGp",
        "title": "Jethalal Iconic Comedy Timing & Expressions",
        "uploader": "taarakmehtakaooltahchashmahnfp",
        "handle": "@taarakmehtakaooltahchashmahnfp",
        "name": "TMKOC Official (Neela Film)",
        "likes": 98200,
        "views": 560000,
        "commentsCount": 2140,
        "verified": True
    },
    {
        "code": "DdYUJs9h43a",
        "title": "Jethalal vs Iyer & Babita Ji Hilarious Encounter",
        "uploader": "comedy_tmkoc_16",
        "handle": "@comedy_tmkoc_16",
        "name": "Gokuldham Comedy Club",
        "likes": 52100,
        "views": 310000,
        "commentsCount": 890,
        "verified": False
    },
    {
        "code": "DdY3X2Csi2q",
        "title": "Chai Piyo Biscuit Khao! Bapuji & Jethalal Classic Scene",
        "uploader": "official_tmkoc_102",
        "handle": "@official_tmkoc_102",
        "name": "TMKOC Daily Laughs",
        "likes": 64300,
        "views": 390000,
        "commentsCount": 1120,
        "verified": False
    }
]

def download_and_process():
    print("🎬 Starting TMKOC Instagram Reels Integration...")
    
    with open(REELS_JSON_PATH, 'r', encoding='utf-8') as f:
        existing_reels = json.load(f)
        
    new_reels = []
    
    for item in tmkoc_items:
        code = item["code"]
        url = f"https://www.instagram.com/reel/{code}/"
        output_file = os.path.join(VIDEOS_DIR, f"ig_tmkoc_{code}.mp4")
        
        print(f"\n⬇️ Downloading TMKOC Reel: {code} ({item['title']})...")
        
        # Download using yt-dlp
        dl_res = subprocess.run(
            ["python", "-m", "yt_dlp", "-o", output_file, "--no-warnings", url],
            capture_output=True,
            text=True,
            timeout=40
        )
        
        if os.path.exists(output_file) and os.path.getsize(output_file) > 10000:
            print(f"✅ Downloaded successfully: {output_file} ({os.path.getsize(output_file)} bytes)")
            
            # Build reel object
            reel_obj = {
                "id": f"ig-tmkoc-{code}",
                "title": item["title"],
                "creator": {
                    "name": item["name"],
                    "handle": item["handle"],
                    "avatar": "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=150&auto=format&fit=crop&q=80",
                    "verified": item["verified"],
                    "bio": "Taarak Mehta Ka Ooltah Chashmah Official & Fan Comedy Reels"
                },
                "videoUrl": f"/videos/ig_tmkoc_{code}.mp4",
                "visualTheme": "comedy_tmkoc",
                "description": f"{item['title']} - Watch the comedy of Gokuldham Society! #TMKOC #Jethalal #TaarakMehtaKaOoltahChashmah #Comedy #IndianSitcom",
                "duration": 30,
                "category": "Entertainment & Comedy",
                "intent": "entertain",
                "goalTags": ["comedy", "tmkoc", "jethalal", "gokuldham"],
                "mood": "humorous",
                "likes": item["likes"],
                "commentsCount": item["commentsCount"],
                "shares": round(item["likes"] * 0.28),
                "views": item["views"],
                "isAIGenerated": False,
                "safetyScore": 99,
                "realityCheck": {
                    "verdict": "Verified Sitcom Classic",
                    "claim": "Iconic Indian television comedy produced by Asit Kumarr Modi based on Tarak Mehta's literature.",
                    "explanation": "Taarak Mehta Ka Ooltah Chashmah holds the Limca Book of World Records as India's longest-running comedy show, promoting social unity and family entertainment across generations.",
                    "sources": [
                        {
                            "name": "Sony SAB TV Official Archive",
                            "url": "https://sonyliv.com",
                            "credibility": "Official Broadcaster"
                        },
                        {
                            "name": "Limca Book of Records",
                            "url": "https://limcabookofrecords.in",
                            "credibility": "National Record Registry"
                        }
                    ],
                    "aiConfidence": 99
                },
                "whyAmISeeingThis": {
                    "primaryReason": "You selected Entertainment or searched for TMKOC / Jethalal comedy moments.",
                    "matchedInterests": ["Comedy", "TMKOC", "Jethalal", "Entertainment"],
                    "signalWeight": {
                        "watchHistory": 40,
                        "goalAlignment": 30,
                        "currentMood": 20,
                        "collaborativeFilter": 10
                    },
                    "privacyNote": "Locally ranked based on your comedy preferences. No data shared with advertisers."
                },
                "transcript": f"{item['title']}. Jethalal, Champaklal, Babita ji, and the residents of Gokuldham Society in their iconic situational comedy moment.",
                "usefulOutputs": {
                    "notes": {
                        "summary": f"{item['title']} - Classic situational comedy from Gokuldham Society.",
                        "bulletPoints": [
                            "Laughter stimulates endorphin release and naturally lowers stress hormones (cortisol).",
                            "Relational humor and community connection strengthen emotional wellbeing.",
                            "A brief 5-minute comedy break rejuvenates mental stamina for subsequent productive tasks."
                        ],
                        "keyTakeaway": "Laughter is the best medicine — keep smiling with Gokuldham Society!"
                    },
                    "quiz": [
                        {
                            "question": "What is Jethalal's famous electronics showroom called?",
                            "options": [
                                "Gada Electronics",
                                "Jethalal Appliances",
                                "Gokuldham Gadgets",
                                "Champaklal Electronics"
                            ],
                            "correctIndex": 0,
                            "explanation": "Jethalal Champaklal Gada runs Gada Electronics with Nattu Kaka and Bagha!"
                        },
                        {
                            "question": "What is Bapuji's most famous morning advice to Jethalal?",
                            "options": [
                                "Chai piyo, biscuit khao!",
                                "So jao!",
                                "Dukaan mat jao!",
                                "Jalebi Fafda bandh karo!"
                            ],
                            "correctIndex": 0,
                            "explanation": "Bapuji's iconic line 'Chai piyo, biscuit khao' is one of the most famous dialogues in Indian television history!"
                        }
                    ],
                    "checklist": [
                        { "task": "Enjoy a healthy laughter break with TMKOC", "minutes": 2 },
                        { "task": "Share a funny Jethalal moment with family or friends", "minutes": 1 }
                    ],
                    "studyPlan": [
                        { "day": 1, "focus": "De-stress & Chuckle", "action": "Watch classic Jethalal comedic expressions to release workday tension." },
                        { "day": 2, "focus": "Lighthearted Focus", "action": "Use 5-minute humor intervals between intensive study/coding sessions." },
                        { "day": 3, "focus": "Social Joy", "action": "Watch Gokuldham festival celebrations with family." }
                    ]
                }
            }
            new_reels.append(reel_obj)
        else:
            print(f"❌ Failed to download {code}")
            
    if new_reels:
        # Prepend TMKOC reels to the beginning of the feed so the user sees them right away!
        updated_reels = new_reels + existing_reels
        with open(REELS_JSON_PATH, 'w', encoding='utf-8') as f:
            json.dump(updated_reels, f, indent=2, ensure_ascii=False)
        print(f"\n🎉 Successfully added {len(new_reels)} TMKOC Instagram Reels to reels.json!")
        print(f"Total reels now in app: {len(updated_reels)}")
    else:
        print("⚠️ No new TMKOC reels could be added.")

if __name__ == '__main__':
    download_and_process()
