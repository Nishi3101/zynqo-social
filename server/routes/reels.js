import express from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { analyzeLanguage } from '../services/languageEngine.js';
import { parseSearchIntentWithAI } from '../services/aiEngine.js';

const router = express.Router();
const reelsPath = path.resolve(process.cwd(), 'server/data/reels.json');

// Configure multer for reel uploads
const uploadDir = path.resolve(process.cwd(), 'server/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.mp4';
    cb(null, `reel-${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });

function loadReels() {
  try {
    const raw = fs.readFileSync(reelsPath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error loading reels:', err);
    return [];
  }
}

function saveReels(reels) {
  try {
    fs.writeFileSync(reelsPath, JSON.stringify(reels, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving reels:', err);
  }
}

const MOOD_PROFILES = {
  Happy: {
    label: 'Happy',
    targetMoods: ['humorous', 'excited', 'energetic', 'creative', 'chill'],
    targetIntents: ['entertain', 'inspire', 'connect'],
    targetCategories: ['Comedy & Satire', 'Culture & Dance', 'Gaming & Humor', 'Music & Audio'],
    keywords: ['comedy', 'happy', 'laugh', 'fun', 'joy', 'garba', 'dance', 'smile', 'jethalal', 'humor', 'positive', 'tmkoc', 'babita', 'raas']
  },
  Relaxed: {
    label: 'Relaxed',
    targetMoods: ['calm', 'chill', 'focus'],
    targetIntents: ['relax', 'teach'],
    targetCategories: ['Mindfulness & Mental Wellness', 'Science & Cosmos', 'Music & Audio'],
    keywords: ['calm', 'peace', 'meditation', 'breathwork', 'nature', 'cosmos', 'zen', 'relax', 'lo-fi', 'sleep', 'ambient', 'mindfulness']
  },
  Excited: {
    label: 'Excited',
    targetMoods: ['excited', 'energetic', 'creative'],
    targetIntents: ['entertain', 'achieve', 'inspire'],
    targetCategories: ['Culture & Dance', 'Fitness & Movement', 'AI & Futuristic Tech'],
    keywords: ['energetic', 'hype', 'garba', 'dance', 'workout', 'future', 'ai', 'breakthrough', 'action', 'fast', 'festivals', 'dandiya']
  },
  Chill: {
    label: 'Chill',
    targetMoods: ['chill', 'calm', 'creative'],
    targetIntents: ['relax', 'connect', 'entertain'],
    targetCategories: ['Music & Audio', 'Culture & Dance', 'Mindfulness & Mental Wellness'],
    keywords: ['chill', 'vibes', 'lo-fi', 'music', 'groove', 'style', 'coffee', 'casual', 'ambient', 'beats', 'peace']
  },
  Sad: {
    label: 'Sad',
    targetMoods: ['calm', 'humorous', 'chill'],
    targetIntents: ['relax', 'entertain', 'inspire'],
    targetCategories: ['Mindfulness & Mental Wellness', 'Comedy & Satire', 'Culture & Dance'],
    keywords: ['uplifting', 'comfort', 'healing', 'mindfulness', 'laughter', 'breathwork', 'hope', 'peace', 'wellness', 'jethalal', 'comedy']
  },
  Tired: {
    label: 'Tired',
    targetMoods: ['calm', 'chill'],
    targetIntents: ['relax'],
    targetCategories: ['Mindfulness & Mental Wellness', 'Science & Cosmos', 'Music & Audio'],
    keywords: ['sleep', 'night', 'rest', 'calm', 'ambient', 'stars', 'cosmos', 'peaceful', 'relaxing', 'gentle', 'meditation']
  },
  Neutral: {
    label: 'Neutral',
    targetMoods: ['curious', 'focus', 'creative'],
    targetIntents: ['teach', 'entertain', 'inspire'],
    targetCategories: ['AI & Futuristic Tech', 'Science & Cosmos', 'Comedy & Satire'],
    keywords: ['interesting', 'science', 'tech', 'facts', 'curiosity', 'creative', 'knowledge', 'explore', 'neural', 'quantum']
  },
  Frustrated: {
    label: 'Frustrated',
    targetMoods: ['calm', 'humorous', 'energetic'],
    targetIntents: ['relax', 'entertain', 'achieve'],
    targetCategories: ['Mindfulness & Mental Wellness', 'Fitness & Movement', 'Comedy & Satire'],
    keywords: ['stress', 'release', 'breathe', 'punchline', 'workout', 'calisthenics', 'laugh', 'detox', 'reset', 'comedy', 'peace']
  },
  Curious: {
    label: 'Curious',
    targetMoods: ['curious', 'focus'],
    targetIntents: ['teach', 'achieve'],
    targetCategories: ['AI & Futuristic Tech', 'Science & Cosmos', 'Finance & Compounding'],
    keywords: ['neural', 'ai', 'quantum', 'physics', 'finance', 'how it works', 'code', 'algorithm', 'learn', 'deep-dive', 'compounding']
  },
  Romantic: {
    label: 'Romantic',
    targetMoods: ['creative', 'chill', 'calm', 'excited'],
    targetIntents: ['connect', 'entertain', 'inspire'],
    targetCategories: ['Culture & Dance', 'Music & Audio'],
    keywords: ['garba', 'dance', 'music', 'heart', 'love', 'duet', 'soul', 'rhythm', 'raas', 'melody', 'poetry', 'connection']
  }
};

function rankReelsByMood(allReels, mood) {
  if (!mood || mood.toLowerCase() === 'all') return allReels;

  const key = Object.keys(MOOD_PROFILES).find(
    k => k.toLowerCase() === mood.trim().toLowerCase()
  );
  if (!key) return allReels;

  const profile = MOOD_PROFILES[key];

  const scored = allReels.map((reel, index) => {
    let score = 0;
    const rMood = (reel.mood || '').toLowerCase();
    const rIntent = (reel.intent || '').toLowerCase();
    const rCat = (reel.category || '').toLowerCase();
    const rTitle = (reel.title || '').toLowerCase();
    const rDesc = (reel.description || '').toLowerCase();
    const rTags = (reel.goalTags || []).map(t => t.toLowerCase());

    // 1. Mood alignment (+50 if in target moods, extra +15 for primary match)
    if (profile.targetMoods.includes(rMood)) {
      score += 50;
      if (rMood === profile.targetMoods[0]) score += 15;
    }

    // 2. Intent alignment (+35)
    if (profile.targetIntents.includes(rIntent)) {
      score += 35;
    }

    // 3. Category alignment (+40)
    if (profile.targetCategories.some(c => c.toLowerCase() === rCat)) {
      score += 40;
    }

    // 4. Keyword & Tag matches (+10 to +20)
    for (const kw of profile.keywords) {
      if (rTags.includes(kw)) score += 20;
      if (rTitle.includes(kw)) score += 15;
      if (rDesc.includes(kw)) score += 10;
    }

    // Tie-breaker
    const tieBreaker = (allReels.length - index) * 0.001;

    const personalizedReel = {
      ...reel,
      whyAmISeeingThis: {
        ...reel.whyAmISeeingThis,
        primaryReason: `Recommended for your "${profile.label}" mood: aligns with ${reel.category} and your current vibe.`,
        signalWeight: {
          watchHistory: reel.whyAmISeeingThis?.signalWeight?.watchHistory ?? 20,
          goalAlignment: reel.whyAmISeeingThis?.signalWeight?.goalAlignment ?? 20,
          currentMood: 50,
          collaborativeFilter: reel.whyAmISeeingThis?.signalWeight?.collaborativeFilter ?? 10
        }
      }
    };

    return { reel: personalizedReel, score: score + tieBreaker };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.map(s => s.reel);
}

// GET all reels with multi-factor filtering (Intent, Category, Goal, Search, Mood)
router.get('/', async (req, res) => {
  const { intent, category, goal, mood, search, detox } = req.query;
  let reels = loadReels();
  let searchIntent = null;

  if (detox === 'true') {
    reels = reels.filter(r => r.category === 'Mindfulness & Detox' || r.intent === 'relax');
  } else {
    if (intent && intent !== 'all') {
      reels = reels.filter(r => r.intent === intent);
    }
    if (category && category !== 'All') {
      reels = reels.filter(r => r.category.toLowerCase() === category.toLowerCase());
    }
    if (goal) {
      reels = reels.filter(r => r.goalTags && r.goalTags.includes(goal));
    }
    if (mood && mood !== 'all') {
      reels = rankReelsByMood(reels, mood);
    }
    if (search && search.trim()) {
      searchIntent = await parseSearchIntentWithAI(search);
      const qLower = search.trim().toLowerCase();

      // Score each reel based on relevance to the interpreted intent
      const scored = reels.map(reel => {
        let score = 0;
        const titleL = (reel.title || '').toLowerCase();
        const descL = (reel.description || '').toLowerCase();
        const catL = (reel.category || '').toLowerCase();
        const creatorL = ((reel.creator?.name || '') + ' ' + (reel.creator?.handle || '')).toLowerCase();
        const tagsL = (reel.goalTags || []).join(' ').toLowerCase();

        // 1. Direct query substring matches
        if (titleL.includes(qLower)) score += 60;
        if (descL.includes(qLower)) score += 35;
        if (catL.includes(qLower)) score += 40;
        if (creatorL.includes(qLower)) score += 40;

        // 2. Keyword relevance scoring
        if (searchIntent && searchIntent.keywords) {
          for (const kw of searchIntent.keywords) {
            const kwLower = kw.toLowerCase();
            if (titleL.includes(kwLower)) score += 25;
            if (descL.includes(kwLower)) score += 15;
            if (tagsL.includes(kwLower)) score += 20;
            if (catL.includes(kwLower)) score += 25;
            if (creatorL.includes(kwLower)) score += 20;
          }
        }

        // 3. Category alignment with semantic intent
        if (searchIntent?.category && reel.category && reel.category.toLowerCase() === searchIntent.category.toLowerCase()) {
          score += 45;
        }

        // 4. Intent & Mood alignment
        if (searchIntent?.intent && reel.intent && reel.intent === searchIntent.intent) {
          score += 25;
        }
        if (searchIntent?.mood && reel.mood && reel.mood === searchIntent.mood) {
          score += 20;
        }
        if (mood && mood !== 'all') {
          const mKey = Object.keys(MOOD_PROFILES).find(k => k.toLowerCase() === mood.trim().toLowerCase());
          if (mKey && MOOD_PROFILES[mKey].targetMoods.includes((reel.mood || '').toLowerCase())) {
            score += 25;
          }
        }

        // 5. Regional Language & Culture Boost
        if (searchIntent?.language === 'gu') {
          if (tagsL.includes('gujarat') || titleL.includes('garba') || titleL.includes('jethalal') || catL.includes('culture')) {
            score += 35;
          }
        }

        // 6. Duration constraint validation
        if (searchIntent?.maxDuration && reel.duration) {
          if (reel.duration <= searchIntent.maxDuration) {
            score += 15;
          }
        }

        return { reel, score };
      });

      const matches = scored.filter(item => item.score > 0);
      if (matches.length > 0) {
        matches.sort((a, b) => b.score - a.score);
        reels = matches.map(m => m.reel);
      } else {
        // Fallback: Standard substring search
        reels = reels.filter(r => {
          const t = (r.title || '').toLowerCase();
          const d = (r.description || '').toLowerCase();
          const c = (r.category || '').toLowerCase();
          return t.includes(qLower) || d.includes(qLower) || c.includes(qLower);
        });
      }
    } else {
      // Instagram-style dynamic session feed rotation:
      // When browsing the default unfiltered feed, rotate the starting reel dynamically so every session opens with a fresh trending video
      const isUnfiltered = (!intent || intent === 'all') && (!category || category === 'All') && !goal && (!mood || mood === 'all');
      if (isUnfiltered && reels.length > 1) {
        const startIndex = Math.floor(Math.random() * reels.length);
        reels = [...reels.slice(startIndex), ...reels.slice(0, startIndex)];
      }
    }
  }

  res.json({ success: true, count: reels.length, searchIntent, reels });
});

// GET single reel by ID
router.get('/:id', (req, res) => {
  const reels = loadReels();
  const reel = reels.find(r => r.id === req.params.id);
  if (!reel) {
    return res.status(404).json({ success: false, error: 'Reel not found' });
  }
  res.json({ success: true, reel });
});

// POST toggle like
router.post('/:id/like', (req, res) => {
  const reels = loadReels();
  const reel = reels.find(r => r.id === req.params.id);
  if (!reel) {
    return res.status(404).json({ success: false, error: 'Reel not found' });
  }
  reel.likes = (reel.likes || 0) + 1;
  saveReels(reels);
  res.json({ success: true, likes: reel.likes });
});

// POST add comment with toxicity filter
router.post('/:id/comment', (req, res) => {
  const { text, user = 'Guest User' } = req.body;
  if (!text) {
    return res.status(400).json({ success: false, error: 'Comment text required' });
  }

  // Toxicity check
  const toxicKeywords = ['hate', 'stupid', 'idiot', 'die', 'garbage'];
  const isToxic = toxicKeywords.some(w => text.toLowerCase().includes(w));

  const reels = loadReels();
  const reel = reels.find(r => r.id === req.params.id);
  if (!reel) {
    return res.status(404).json({ success: false, error: 'Reel not found' });
  }

  if (isToxic) {
    return res.json({
      success: false,
      flagged: true,
      message: 'Comment blocked by Zynqo Social Toxicity & Safety Shield.'
    });
  }

  const newComment = {
    id: `c-${Date.now()}`,
    user,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
    text,
    likes: 0,
    timeAgo: 'Just now'
  };

  reel.comments = [newComment, ...(reel.comments || [])];
  reel.commentsCount = (reel.commentsCount || 0) + 1;
  saveReels(reels);

  res.json({ success: true, comment: newComment, totalComments: reel.commentsCount });
});

// POST upload new reel
router.post('/upload', upload.single('video'), (req, res) => {
  const { 
    title, 
    description, 
    category, 
    intent, 
    duration = 45, 
    thumbnailUrl, 
    overlayText,
    isScheduled,
    scheduledDate,
    scheduledTime
  } = req.body;
  const reels = loadReels();

  const isPostScheduled = isScheduled === 'true' || isScheduled === true;

  const newReel = {
    id: `reel-${Date.now()}`,
    title: title || 'My New AI Reel',
    creator: {
      name: 'Creator You',
      handle: '@you_creator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      verified: true,
      bio: 'Verified Zynqo Social Creator'
    },
    videoUrl: req.file ? `/uploads/${req.file.filename}` : '/videos/flower.mp4',
    thumbnailUrl: thumbnailUrl || undefined,
    overlayText: overlayText || '',
    visualTheme: 'neural_network',
    description: description || 'Created with Zynqo Social Creator Studio.',
    duration: parseInt(duration, 10) || 45,
    category: category || 'Tech & AI',
    intent: intent || 'teach',
    goalTags: ['coding', 'self-growth'],
    mood: 'curious',
    status: isPostScheduled ? 'scheduled' : 'published',
    scheduledAt: isPostScheduled && scheduledDate ? `${scheduledDate}T${scheduledTime || '12:00'}` : undefined,
    scheduledDate: isPostScheduled ? scheduledDate : undefined,
    scheduledTime: isPostScheduled ? scheduledTime : undefined,
    sourceRights: {
      platform: 'Zynqo Studio Upload',
      creatorHandle: '@you_creator',
      rightsStatus: 'Licensed (Original Creator)',
      isDemo: false
    },
    likes: 1,
    commentsCount: 0,
    shares: 0,
    views: 12,
    isAIGenerated: true,
    safetyScore: 100,
    realityCheck: {
      verdict: 'Verified',
      claim: title || 'Empirical insight shared by creator.',
      explanation: 'Scanned by Zynqo Social Safety Shield. No safety violations or misinformation detected.',
      sources: [{ name: 'Zynqo Social Moderation Scan', url: '#', credibility: 'Verified' }],
      aiConfidence: 98
    },
    whyAmISeeingThis: {
      primaryReason: isPostScheduled ? 'Scheduled native creator reel.' : 'Freshly published native creator reel.',
      matchedInterests: [category || 'General'],
      signalWeight: { watchHistory: 20, goalAlignment: 40, currentMood: 20, collaborativeFilter: 20 },
      privacyNote: 'Organic creator distribution.'
    },
    transcript: description || title || 'Audio transcript generated automatically.',
    usefulOutputs: {
      notes: {
        summary: `Summary of ${title}`,
        bulletPoints: ['Point 1: Key premise', 'Point 2: Practical implementation', 'Point 3: Follow-up action'],
        keyTakeaway: 'Transforming ideas into meaningful action.'
      },
      quiz: [
        {
          question: `What is the core topic of ${title}?`,
          options: ['Irrelevant noise', category || 'Actionable insight', 'Unrelated speculation', 'Passive waiting'],
          correctIndex: 1,
          explanation: 'Clear alignment with practical focus.'
        }
      ],
      tasks: [{ id: `t-${Date.now()}`, title: `Review action items for ${title}`, estimatedMinutes: 5, category: 'Creator' }],
      studyPlan: [{ day: 'Day 1', action: 'Apply core learning', outcome: 'Action accomplished' }]
    },
    comments: []
  };

  if (isPostScheduled) {
    reels.push(newReel);
  } else {
    reels.unshift(newReel);
  }
  saveReels(reels);

  res.json({ success: true, scheduled: isPostScheduled, reel: newReel });
});

export default router;
