# PulseAI - Next-Gen AI Social Entertainment Platform 🚀
### Built for the AI Reels Hackathon • Futurrizon Technologies MVP Edition

> **"Traditional platforms ask: *'How long can we keep you watching?'***  
> **PulseAI asks: *'What do you need right now, how much time do you have, and how can we make that time meaningful?'"***

---

## 🌟 Executive Summary & Problem Solved

Traditional short-form video platforms (TikTok, Instagram Reels, YouTube Shorts) are engineered to trap users in passive, dopaminergic doomscrolling loops with zero regard for real-world application, learning retention, or time budget.

**PulseAI** transforms short-form entertainment from passive consumption into an **intelligent, time-aware, and actionable ecosystem** that understands user intent, protects cognitive wellbeing, and bridges digital content into real-world action.

---

## 🏆 Core Hackathon MVP Features Implemented

### 1. 🧠 Personal Entertainment OS (Concept 180)
- Instead of opening directly into a random feed, PulseAI asks: **"What do you need right now?"**
- One-click instant algorithmic filtering for:
  - 🧠 **Teach me** (Micro-learning & deep fundamentals)
  - 🎯 **Achieve** (Habits, workouts, productivity)
  - 🌿 **Relax me** (Tranquil breathwork & meditation)
  - 🎭 **Entertain me** (Curated high-quality creative reels)
  - ✨ **Inspire me** (Frontier science, space, and quantum discoveries)
  - 🤝 **Connect me** (Social watch parties)

### 2. ⏱️ "I Have X Minutes" Time-Aware Entertainment (Features 9, 11, 12, 13)
- Select 3-minute, 5-minute, or 10-minute structured sessions.
- Live countdown timer ring with synchronized reel sequences.
- **Smart Session Ending**: Replaces endless scrolling with intentional closure.
- **"One More / Finish Now" Dialog** with **Screen-Time Rewards (+50 XP)** upon completing sessions on time.

### 3. ⚡ "Make This Useful" Content-to-Action Engine (Features 31, 32, 35, 27, 29)
Transforms any reel in 1 click into 4 high-leverage outputs:
- 📝 **AI Structured Notes**: Summary, key takeaways, and core principle.
- 🧠 **Interactive 3-Question AI Quiz**: Immediate answer validation, explanation, and +45 XP.
- ✅ **Action Checklist**: Interactive task checkboxes with estimated completion minutes.
- 📅 **3-Day Action / Study Plan**: Structured progression from theory to execution.

### 4. 🛡️ AI Reality Check & Safety Shield (Features 70, 71, 72, 73, 74, 81)
- Fact-check verification badge on every reel (Verified / Context Needed / Claim Analyzed).
- **Viral Claim Checker**: Explains nuances behind health, science, and finance claims.
- **Source Transparency**: Clickable citations to peer-reviewed literature and institutions.
- **Comment Toxicity Protection**: Real-time NLP filter blocking abusive content.

### 5. 🤖 Nova AI Entertainment Companion (Features 38, 39, 40, 42, 83, 84)
- Floating dock & expandable conversational assistant.
- Natural language queries: *"Find me quick Python tricks"*, *"Explain this like I'm 10 (ELI10)"*, *"Explain deeper"*, or *"Surprise me"*.
- Speech-to-text voice recognition integration.

### 6. 🎯 Goal → Content Engine (Features 22, 23, 24)
- Life goals curriculum (e.g. *Full-Stack AI Developer*, *Daily Calisthenics*, *Atomic Habits*, *Financial Independence*).
- Multi-tier progressive curriculum tracks with milestone tracking and direct reel playback.

### 7. 👥 Temporary Interest Rooms & Watch Together (Features 56, 57, 62, 64)
- Synchronized video reel playback across all room participants via WebSockets (Socket.IO).
- Real-time room chat with simulated spectators.
- **AI Room Assistant ("Nova")**: Dynamically chimes in with discussion prompts, trivia, and conversation starters.

### 8. 📊 Digital Wellbeing & Entertainment Nutrition Label (Features 182, 184, 186, 187)
- **Entertainment Nutrition Label**: Visual breakdown of your daily session (e.g. 45% Learning, 30% Productivity, 15% Mindfulness, 10% Entertainment).
- **Daily Attention Budget**: Interactive slider managing time allocation.
- **AI Endless Scroll Firewall**: Intervenes after 4 continuous passive reels.
- **Content Detox Mode**: Tranquil environment prioritizing calming mindfulness.

### 9. 🎨 Creator Studio & AI Script Engine (Features 85, 86, 87, 96, 99, 101, 104)
- **AI Hook Generator**: 3 viral hooks (Curiosity Gap, Contrarian, High Stakes) with viral scores.
- **60-Second Script Engine**: Timed segments with visual cues and audio voiceover.
- **Reel Publishing**: Native reel upload to the live platform feed.
- **Creator Analytics Dashboard**: Viewer retention curve (seconds 0-55) with AI Coach performance feedback.

### 10. 🔒 Personal AI Memory Vault & Privacy (Features 140, 141, 143, 144, 160)
- **"What Did I Learn Today?" Digest**: AI-generated summary of key learnings.
- **"Forget This" Button**: Instant deletion of preferences from the personal knowledge graph.
- **Private Incognito Mode**: Prevent viewing activity from altering algorithms.
- **JSON Data Export**: Full data sovereignty.

### 11. 🌍 Full Multilingual Localization (Document 1 Requirement)
- Instant language switcher supporting: **English (US)**, **Spanish (ES)**, **Hindi (IN)**, **French (FR)**, **Japanese (JA)**, and **German (DE)**.

---

## 🛠️ Architecture & Tech Stack

```
Frontend:  React 18 + Vite + TypeScript + Tailwind CSS + Lucide Icons + Canvas Confetti
Backend:   Node.js + Express + Socket.IO (WebSockets) + Multer
Storage:   In-Memory & JSON Graph Store
Real-Time: Bidirectional WebSocket sync for Watch Together lounges
AI Engine: Multi-tier Heuristic & LLM Synthesis (Gemini-ready via GEMINI_API_KEY)
```

---

## 🚀 Quickstart & Demo Instructions

### 1. Run the Full Application (Single Command)
```bash
cd C:\Users\Nishi\.gemini\antigravity\scratch\pulse-ai-reels
npm run dev
```
Or start the unified server directly:
```bash
node server/index.js
```

### 2. Access the Application
Open your browser at:
👉 **`http://localhost:5000`** (or `http://localhost:5173` in dev mode)

### 3. Recommended Judge / Hackathon Demo Flow:
1. **Personal Entertainment OS**: Click through "Teach me", "Achieve", "Relax me" in the top bar to watch the feed instantly re-index.
2. **"I Have 5 Mins" Mode**: Click the timer button in the navbar -> start 5-minute session -> observe live countdown ring -> trigger Smart Session Ending.
3. **"Make This Useful"**: On Reel 1 (Neural Networks), click the glowing ⚡ **Make This Useful** button on the right -> take the 3-question quiz -> score points -> see XP animation!
4. **AI Reality Check**: On Reel 3 (Water trend), click the 🛡️ **Reality Check** badge -> inspect the claim breakdown and peer-reviewed sources.
5. **Nova AI Companion**: Click the glowing orb in the bottom-left -> ask *"Explain like I'm 10"* or click *"Surprise Me"*.
6. **Watch Together Lounge**: Click "Watch Together" in the navbar -> test synchronized play/pause and real-time chat with the AI Room Assistant.
7. **Creator Studio**: Click "Creator Studio" -> enter a topic -> generate 3 viral hooks and 60-second script!
8. **Digital Wellbeing**: Click "Wellbeing" -> view your Entertainment Nutrition Label and Attention Budget.
9. **Multilingual Switcher**: Toggle between English, Hindi, Spanish, or Japanese in the top right.

---

## 📁 Project Structure

```
pulse-ai-reels/
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── server/
│   ├── index.js              # Express + Socket.IO server (Port 5000)
│   ├── data/
│   │   ├── reels.json        # Curated reels with transcripts, fact-checks, quizzes
│   │   └── goals.json        # Goal curriculum tracks
│   ├── routes/
│   │   ├── reels.js          # Reel feed, filtering, search, comments, uploads
│   │   ├── ai.js             # Make Useful, Reality Check, Companion chat
│   │   ├── creator.js       # AI Scriptwriter, Hook generator, Analytics
│   │   └── user.js           # Profile, XP gamification, Memory vault
│   └── services/
│       └── aiEngine.js       # Generative AI intelligence service
└── src/
    ├── App.tsx               # Main application shell & modal orchestrator
    ├── types/index.ts        # TypeScript interfaces
    ├── context/AppContext.tsx# State management & audio/gamification engine
    ├── utils/
    │   ├── sound.ts          # Procedural Web Audio API sound effects
    │   └── translations.ts   # EN, ES, HI, FR, JA, DE dictionary
    └── components/
        ├── Navigation.tsx    # Header with Entertainment OS intent bar
        ├── ReelFeed.tsx      # Vertical snap-scroll feed with keyboard nav
        ├── ReelCard.tsx      # Video player, subtitles, and comments
        ├── ReelActions.tsx   # Action sidebar (Make Useful, Reality Check, etc.)
        ├── ReelVisualizer.tsx# Procedural Canvas 60fps motion art
        ├── MakeUsefulModal.tsx   # Notes, Quiz, Action Checklist, Study Plan
        ├── RealityCheckModal.tsx # Fact check & source citations
        ├── ExplainModal.tsx  # "Why Am I Seeing This?" explainability graph
        ├── TimeSessionModal.tsx  # "I Have X Minutes" countdown & completion
        ├── AICompanion.tsx   # Nova AI floating conversational assistant
        ├── GoalLearningView.tsx  # Goal-based micro-learning tracks
        ├── WatchTogetherRoom.tsx # Synced viewing room & AI Room Assistant
        ├── DigitalWellbeingModal.tsx # Nutrition Label & Attention Budget
        ├── CreatorStudioModal.tsx# AI Hook/Script generator & Analytics
        ├── MemoryVaultModal.tsx  # Knowledge digest & Forget This button
        └── FirewallModal.tsx # AI Endless Scroll Firewall intervention
```

---
*Created for the Futurrizon Next-Gen Social Entertainment Hackathon.*
