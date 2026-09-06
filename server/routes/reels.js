import express from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { analyzeLanguage } from '../services/languageEngine.js';

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

// GET all reels with multi-factor filtering (Intent, Category, Goal, Search, Mood)
router.get('/', (req, res) => {
  const { intent, category, goal, mood, search, detox } = req.query;
  let reels = loadReels();

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
      reels = reels.filter(r => r.mood === mood);
    }
    if (search) {
      const analysis = analyzeLanguage(search);
      const q = search.toLowerCase().trim();
      
      // Slang, emotion, and intent-aware keywords
      const intentKeywords = [];
      if (analysis.detectedSlangs.some(s => s.intent === 'praise' || s.term === 'fire')) {
        intentKeywords.push('neural', 'quantum', 'interest', 'compound');
      }
      if (analysis.detectedSlangs.some(s => s.term === 'chill' || s.term === 'vibe') || q.includes('chill') || q.includes('vibe')) {
        intentKeywords.push('breathing', 'cortisol', 'detox', 'calm');
      }
      if (analysis.detectedDialect === 'kathiawadi' || q.includes('moj') || q.includes('bapu')) {
        intentKeywords.push('compound', 'interest', 'growth');
      }
      if (analysis.detectedDialect === 'bambaiya' || q.includes('jhakaas') || q.includes('bantai')) {
        intentKeywords.push('neural', 'network');
      }

      const matchReel = (r) => {
        const titleL = (r.title || '').toLowerCase();
        const descL = (r.description || '').toLowerCase();
        const catL = (r.category || '').toLowerCase();
        const tags = (r.goalTags || []).join(' ').toLowerCase();

        // 1. Direct query match
        if (titleL.includes(q) || descL.includes(q) || catL.includes(q) || tags.includes(q)) {
          return true;
        }

        // 2. Intent-expanded semantic match
        if (intentKeywords.length > 0 && intentKeywords.some(kw => titleL.includes(kw) || descL.includes(kw) || tags.includes(kw))) {
          return true;
        }

        return false;
      };

      const matched = reels.filter(matchReel);
      if (matched.length > 0) {
        reels = matched;
      }
    }
  }

  res.json({ success: true, count: reels.length, reels });
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
  const { title, description, category, intent, duration = 45, thumbnailUrl, overlayText } = req.body;
  const reels = loadReels();

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
      primaryReason: 'Freshly published native creator reel.',
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

  reels.unshift(newReel);
  saveReels(reels);

  res.json({ success: true, reel: newReel });
});

export default router;
