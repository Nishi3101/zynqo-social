import express from 'express';
import fs from 'fs';
import path from 'path';
import { DatabaseSync } from 'node:sqlite';

const router = express.Router();
const goalsPath = path.resolve(process.cwd(), 'server/data/goals.json');
const dbPath = path.resolve(process.cwd(), 'server/data/users.db');
const usersJsonPath = path.resolve(process.cwd(), 'server/data/users.json');

// Ensure server/data directory exists
const dataDir = path.resolve(process.cwd(), 'server/data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize SQLite database
const db = new DatabaseSync(dbPath);

// Ensure users table exists with all required fields
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    language TEXT DEFAULT 'en',
    date_of_birth TEXT,
    category TEXT,
    created_at TEXT
  );
`);

// Add date_of_birth, category, and current_mood columns if table previously existed without them
try {
  const existingCols = db.prepare(`PRAGMA table_info(users)`).all().map(c => c.name);
  if (!existingCols.includes('date_of_birth')) {
    db.exec(`ALTER TABLE users ADD COLUMN date_of_birth TEXT;`);
  }
  if (!existingCols.includes('category')) {
    db.exec(`ALTER TABLE users ADD COLUMN category TEXT;`);
  }
  if (!existingCols.includes('current_mood')) {
    db.exec(`ALTER TABLE users ADD COLUMN current_mood TEXT DEFAULT 'Happy';`);
  }
} catch (e) {
  console.warn('[DB] Migration check notice:', e);
}

// Seed default user if not already present
try {
  const defaultUser = db.prepare(`SELECT * FROM users WHERE email = ?`).get('alex@zynqosocial.internal');
  if (!defaultUser) {
    db.prepare(`
      INSERT INTO users (id, name, email, password, language, date_of_birth, category, current_mood, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'user-default',
      'Alex Rivera',
      'alex@zynqosocial.internal',
      'alex123',
      'en',
      '1995-06-15',
      'Manager',
      'Happy',
      new Date().toISOString()
    );
  }
} catch (e) {
  console.warn('[DB] Default user notice:', e);
}

// Sync users.json snapshot
function syncUsersJson() {
  try {
    const allUsers = db.prepare(`SELECT id, name, email, language, date_of_birth, category, current_mood, created_at FROM users`).all();
    fs.writeFileSync(usersJsonPath, JSON.stringify(allUsers, null, 2), 'utf8');
  } catch (e) {
    console.warn('[DB] syncUsersJson notice:', e);
  }
}
syncUsersJson();

export const ALLOWED_CATEGORIES = ['Student', 'Teacher', 'Clerk', 'Manager', 'Head', 'Other'];

export const ALLOWED_MOODS = [
  'Happy',
  'Relaxed',
  'Excited',
  'Chill',
  'Sad',
  'Tired',
  'Neutral',
  'Frustrated',
  'Curious',
  'Romantic'
];

// Mock in-memory user profile state
let userProfile = {
  id: 'user-default',
  name: 'Alex Rivera',
  handle: '@alex_explorer',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
  bio: 'AI Creator & Digital Explorer. Crafting interactive educational reels, verified science breakdowns, and productivity workflows. 🚀',
  followersCount: 1420,
  followingCount: 388,
  isFollowing: false,
  xp: 1420,
  level: 4,
  streakDays: 6,
  attentionBudgetMinutes: 30,
  minutesUsedToday: 14,
  date_of_birth: '1995-06-15',
  category: 'Manager',
  current_mood: 'Happy',
  badges: [
    { id: 'b1', name: 'Knowledge Seeker', icon: 'BookOpen', description: 'Saved 10+ AI Notes' },
    { id: 'b2', name: 'Fact Sentinel', icon: 'ShieldCheck', description: 'Checked 5+ Claims' },
    { id: 'b3', name: 'Focus Master', icon: 'Clock', description: 'Completed 3 Timed Sessions' },
    { id: 'b4', name: 'Detox Champion', icon: 'Sparkles', description: 'Completed 2 Breathwork Resets' }
  ],
  memoryVault: [
    { id: 'm1', type: 'interest', text: 'Machine Learning & Neural Networks', dateAdded: 'Yesterday' },
    { id: 'm2', type: 'interest', text: 'Behavioral Psychology & 2-Min Habits', dateAdded: '2 days ago' },
    { id: 'm3', type: 'goal', text: 'Master Full-Stack AI Development', dateAdded: '3 days ago' },
    { id: 'm4', type: 'learning', text: 'Learned: Gradient descent steps in reverse of gradient slope', dateAdded: 'Today' }
  ],
  privacySettings: {
    useWatchHistory: true,
    useMoodSignals: true,
    allowCollaborativeFiltering: true,
    privateMode: false
  }
};

let userContent = {
  reels: [
    {
      id: 'user-reel-1',
      title: 'Building AI Agents with Collaborative Memory in 60s',
      description: 'Here is how autonomous agents pass context through memory vectors without hallucination.',
      videoUrl: '/videos/flower.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
      views: 18400,
      likes: 1240,
      commentsCount: 88,
      shares: 310,
      uploadDate: '2 days ago',
      duration: 54,
      creator: {
        name: 'Alex Rivera',
        handle: '@alex_explorer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        verified: true,
        bio: 'AI Creator & Digital Explorer'
      }
    },
    {
      id: 'user-reel-2',
      title: 'The 2-Minute Rule to Defeat Task Inertia',
      description: 'Why starting for just 120 seconds tricks your dopamine system into continuous flow.',
      videoUrl: '/videos/flower.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80',
      views: 9200,
      likes: 850,
      commentsCount: 42,
      shares: 195,
      uploadDate: '5 days ago',
      duration: 48,
      creator: {
        name: 'Alex Rivera',
        handle: '@alex_explorer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        verified: true,
        bio: 'AI Creator & Digital Explorer'
      }
    }
  ],
  videos: [
    {
      id: 'user-vid-1',
      title: 'Complete Deep-Dive: Next-Gen Social Entertainment Architectures',
      description: 'A comprehensive walkthrough of attention nutrition, verifiable claims, and interactive study plans.',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
      videoUrl: '/videos/flower.mp4',
      views: 34200,
      likes: 2890,
      commentsCount: 145,
      uploadDate: '1 week ago',
      duration: 185
    },
    {
      id: 'user-vid-2',
      title: 'Designing High-Conversion UI Micro-Interactions for Gen-Z',
      description: 'How to structure fluid CSS hover physics, glassmorphism layers, and responsive touch feedback.',
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80',
      videoUrl: '/videos/flower.mp4',
      views: 19400,
      likes: 1530,
      commentsCount: 92,
      uploadDate: '2 weeks ago',
      duration: 240
    }
  ],
  posts: [
    {
      id: 'user-post-1',
      caption: 'Reflecting on our company hackathon edition launch! Proud of shipping 190+ intelligent features with live radar analytics and attention protection. What should we build next? 💡✨',
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
      likes: 412,
      commentsCount: 56,
      uploadDate: 'Yesterday',
      creator: {
        name: 'Alex Rivera',
        handle: '@alex_explorer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        verified: true
      }
    },
    {
      id: 'user-post-2',
      caption: 'Cheat-sheet for Neural Network training: 1. Normalize your inputs. 2. Start with small learning rates. 3. Monitor validation loss continuously. Keep coding! 💻🔥',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
      likes: 689,
      commentsCount: 84,
      uploadDate: '4 days ago',
      creator: {
        name: 'Alex Rivera',
        handle: '@alex_explorer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        verified: true
      }
    }
  ]
};

let userActivities = {
  liked: [
    {
      id: 'act-like-1',
      contentId: 'reel-1',
      type: 'reel',
      title: 'How Neural Networks Actually Learn in 60s',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
      videoUrl: '/videos/flower.mp4',
      creatorName: 'Dr. Elena Vance',
      creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      likes: 24201,
      commentsCount: 842,
      views: 184000,
      date: 'Today'
    },
    {
      id: 'act-like-2',
      contentId: 'user-vid-1',
      type: 'video',
      title: 'Complete Deep-Dive: Next-Gen Social Entertainment Architectures',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
      videoUrl: '/videos/flower.mp4',
      creatorName: 'Alex Rivera',
      creatorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      likes: 2890,
      commentsCount: 145,
      views: 34200,
      date: 'Yesterday'
    }
  ],
  saved: [
    {
      id: 'act-save-1',
      contentId: 'reel-1',
      type: 'reel',
      title: 'How Neural Networks Actually Learn in 60s',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
      videoUrl: '/videos/flower.mp4',
      creatorName: 'Dr. Elena Vance',
      creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      likes: 24201,
      commentsCount: 842,
      views: 184000,
      date: 'Today'
    },
    {
      id: 'act-save-2',
      contentId: 'user-post-2',
      type: 'post',
      title: 'Cheat-sheet for Neural Network training',
      caption: 'Cheat-sheet for Neural Network training: 1. Normalize your inputs. 2. Start with small learning rates...',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
      creatorName: 'Alex Rivera',
      creatorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      likes: 689,
      commentsCount: 84,
      date: '3 days ago'
    }
  ],
  comments: [
    {
      id: 'act-comm-1',
      contentId: 'reel-1',
      contentType: 'reel',
      contentTitle: 'How Neural Networks Actually Learn in 60s',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
      videoUrl: '/videos/flower.mp4',
      commentText: 'The gradient descent visual finally made the math click for me! Great explanation.',
      timeAgo: '2 hours ago',
      timestamp: new Date().toISOString()
    }
  ]
};

function loadGoals() {
  try {
    return JSON.parse(fs.readFileSync(goalsPath, 'utf8'));
  } catch (err) {
    return [];
  }
}

// GET user profile
router.get('/profile', (req, res) => {
  res.json({
    success: true,
    profile: userProfile,
    nutritionLabel: {
      totalTimeMinutes: userProfile.minutesUsedToday,
      breakdown: [
        { category: 'Learning & Tech', percentage: 45, color: '#06b6d4' },
        { category: 'Productivity & Habits', percentage: 30, color: '#8b5cf6' },
        { category: 'Health & Mindfulness', percentage: 15, color: '#10b981' },
        { category: 'Entertainment', percentage: 10, color: '#f59e0b' }
      ],
      meaningfulEngagementScore: '92 / 100 (Healthy)'
    }
  });
});

// PUT update user profile
router.put('/profile', (req, res) => {
  const { name, handle, bio, avatar, isFollowing } = req.body;
  if (name !== undefined) userProfile.name = name;
  if (handle !== undefined) userProfile.handle = handle.startsWith('@') ? handle : `@${handle}`;
  if (bio !== undefined) userProfile.bio = bio;
  if (avatar !== undefined) userProfile.avatar = avatar;
  if (isFollowing !== undefined) {
    userProfile.isFollowing = isFollowing;
    userProfile.followersCount = (userProfile.followersCount || 1420) + (isFollowing ? 1 : -1);
  }
  res.json({ success: true, profile: userProfile });
});

// GET user uploaded content (Reels, Videos, Posts)
router.get('/content', (req, res) => {
  res.json({
    success: true,
    reels: userContent.reels,
    videos: userContent.videos,
    posts: userContent.posts
  });
});

// POST add new user uploaded content
router.post('/content', (req, res) => {
  const { type, item } = req.body;
  if (!type || !item) {
    return res.status(400).json({ success: false, error: 'Type and item required' });
  }

  const newItem = {
    ...item,
    id: item.id || `user-${type}-${Date.now()}`,
    uploadDate: item.uploadDate || 'Just now',
    creator: {
      name: userProfile.name,
      handle: userProfile.handle,
      avatar: userProfile.avatar,
      verified: true,
      bio: userProfile.bio
    }
  };

  if (type === 'reel') {
    userContent.reels.unshift(newItem);
  } else if (type === 'video') {
    userContent.videos.unshift(newItem);
  } else if (type === 'post') {
    userContent.posts.unshift(newItem);
  }

  res.json({ success: true, item: newItem });
});

// GET user activities (Liked, Saved, Comments)
router.get('/activity', (req, res) => {
  res.json({
    success: true,
    liked: userActivities.liked,
    saved: userActivities.saved,
    comments: userActivities.comments
  });
});

// POST toggle like activity
router.post('/activity/like', (req, res) => {
  const { item } = req.body;
  if (!item || !item.contentId) {
    return res.status(400).json({ success: false, error: 'Content item required' });
  }

  const existingIdx = userActivities.liked.findIndex(a => a.contentId === item.contentId && a.type === item.type);
  let isLiked = false;

  if (existingIdx >= 0) {
    userActivities.liked.splice(existingIdx, 1);
    isLiked = false;
  } else {
    userActivities.liked.unshift({
      id: `act-like-${Date.now()}`,
      contentId: item.contentId,
      type: item.type || 'reel',
      title: item.title || 'Untitled',
      thumbnail: item.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
      videoUrl: item.videoUrl,
      creatorName: item.creatorName || item.creator?.name || 'Creator',
      creatorAvatar: item.creatorAvatar || item.creator?.avatar,
      likes: (item.likes || 0) + 1,
      commentsCount: item.commentsCount || 0,
      views: item.views,
      date: 'Just now'
    });
    isLiked = true;
  }

  res.json({ success: true, isLiked, liked: userActivities.liked });
});

// POST toggle save activity
router.post('/activity/save', (req, res) => {
  const { item } = req.body;
  if (!item || !item.contentId) {
    return res.status(400).json({ success: false, error: 'Content item required' });
  }

  const existingIdx = userActivities.saved.findIndex(a => a.contentId === item.contentId && a.type === item.type);
  let isSaved = false;

  if (existingIdx >= 0) {
    userActivities.saved.splice(existingIdx, 1);
    isSaved = false;
  } else {
    userActivities.saved.unshift({
      id: `act-save-${Date.now()}`,
      contentId: item.contentId,
      type: item.type || 'reel',
      title: item.title || item.caption || 'Untitled',
      thumbnail: item.thumbnail || item.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
      videoUrl: item.videoUrl,
      caption: item.caption,
      creatorName: item.creatorName || item.creator?.name || 'Creator',
      creatorAvatar: item.creatorAvatar || item.creator?.avatar,
      likes: item.likes || 0,
      commentsCount: item.commentsCount || 0,
      views: item.views,
      date: 'Just now'
    });
    isSaved = true;
  }

  res.json({ success: true, isSaved, saved: userActivities.saved });
});

// POST record comment activity
router.post('/activity/comment', (req, res) => {
  const { contentId, contentType = 'reel', contentTitle = 'Content', thumbnail, text, videoUrl } = req.body;
  if (!contentId || !text) {
    return res.status(400).json({ success: false, error: 'contentId and text required' });
  }

  const newCommentAct = {
    id: `act-comm-${Date.now()}`,
    contentId,
    contentType,
    contentTitle,
    thumbnail: thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
    videoUrl,
    commentText: text,
    timeAgo: 'Just now',
    timestamp: new Date().toISOString()
  };

  userActivities.comments.unshift(newCommentAct);
  res.json({ success: true, commentActivity: newCommentAct });
});

// POST award XP
router.post('/xp', (req, res) => {
  const { amount = 25, reason = 'Action Completed' } = req.body;
  userProfile.xp += amount;
  
  // Check level up (every 500 XP)
  const newLevel = Math.floor(userProfile.xp / 500) + 1;
  const leveledUp = newLevel > userProfile.level;
  userProfile.level = newLevel;

  res.json({
    success: true,
    newXP: userProfile.xp,
    level: userProfile.level,
    leveledUp,
    rewardAmount: amount,
    reason
  });
});

// POST update time used in session
router.post('/session-tick', (req, res) => {
  const { minutes = 1 } = req.body;
  userProfile.minutesUsedToday += minutes;
  const limitReached = userProfile.minutesUsedToday >= userProfile.attentionBudgetMinutes;

  res.json({
    success: true,
    minutesUsedToday: userProfile.minutesUsedToday,
    attentionBudgetMinutes: userProfile.attentionBudgetMinutes,
    limitReached
  });
});

// POST Forget preference from Memory Vault
router.post('/forget', (req, res) => {
  const { id } = req.body;
  userProfile.memoryVault = userProfile.memoryVault.filter(m => m.id !== id);
  res.json({
    success: true,
    message: 'Preference permanently erased from your AI Memory Vault.',
    memoryVault: userProfile.memoryVault
  });
});

// POST toggle privacy settings
router.post('/privacy', (req, res) => {
  const { key, value } = req.body;
  if (userProfile.privacySettings.hasOwnProperty(key)) {
    userProfile.privacySettings[key] = value;
  }
  res.json({ success: true, privacySettings: userProfile.privacySettings });
});

// GET goals curriculum
router.get('/goals', (req, res) => {
  const goals = loadGoals();
  res.json({ success: true, goals });
});

// GET "What Did I Learn Today?" digest
router.get('/learning-digest', (req, res) => {
  res.json({
    success: true,
    digest: {
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      insightsLearned: [
        'Neural networks optimize weights iteratively through gradient descent.',
        'The 2-minute rule breaks procrastination by defeating emotional task inertia.',
        'Overhydration with pure water can cause hyponatremia; listen to natural thirst cues.'
      ],
      xpGainedToday: 180,
      tasksCompleted: 2,
      recommendationTomorrow: 'Continue Full-Stack AI Developer Track (Vector Embeddings in 60s).'
    }
  });
});
// POST /api/user/signup - Register new user with Date of Birth and Category
router.post('/signup', (req, res) => {
  try {
    const { name, email, password, date_of_birth, category, language = 'en' } = req.body;

    // Field validations
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Name cannot be empty.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, error: 'Email cannot be empty.' });
    }
    if (!password || !password.trim()) {
      return res.status(400).json({ success: false, error: 'Password cannot be empty.' });
    }
    if (!date_of_birth || !date_of_birth.trim()) {
      return res.status(400).json({ success: false, error: 'Date of Birth cannot be empty.' });
    }
    if (!category || !category.trim()) {
      return res.status(400).json({ success: false, error: 'Category cannot be empty.' });
    }

    const cleanCategory = category.trim();
    if (!ALLOWED_CATEGORIES.includes(cleanCategory)) {
      return res.status(400).json({
        success: false,
        error: `Category must be one of: ${ALLOWED_CATEGORIES.join(', ')}.`
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanDob = date_of_birth.trim();

    // Check if user with email already exists
    const existing = db.prepare(`SELECT * FROM users WHERE LOWER(email) = ?`).get(cleanEmail);
    if (existing) {
      return res.status(400).json({ success: false, error: 'A user with this email address already exists.' });
    }

    const id = `user-${Date.now()}`;
    const createdAt = new Date().toISOString();
    const cleanMood = req.body.current_mood && ALLOWED_MOODS.includes(req.body.current_mood.trim()) 
      ? req.body.current_mood.trim() 
      : 'Happy';

    // Store in SQLite database
    db.prepare(`
      INSERT INTO users (id, name, email, password, language, date_of_birth, category, current_mood, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, cleanName, cleanEmail, password, language, cleanDob, cleanCategory, cleanMood, createdAt);

    // Sync snapshot to users.json
    syncUsersJson();

    // Update active in-memory user profile
    userProfile.id = id;
    userProfile.name = cleanName;
    userProfile.handle = `@${cleanName.toLowerCase().replace(/\s+/g, '_')}`;
    userProfile.date_of_birth = cleanDob;
    userProfile.category = cleanCategory;
    userProfile.current_mood = cleanMood;

    return res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      user: {
        id,
        name: cleanName,
        email: cleanEmail,
        date_of_birth: cleanDob,
        category: cleanCategory,
        current_mood: cleanMood,
        language,
        created_at: createdAt
      }
    });
  } catch (err) {
    console.error('[API] Signup error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/user/login - Email and Password authentication (does NOT require DOB or Category or Mood)
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, error: 'Email cannot be empty.' });
    }
    if (!password || !password.trim()) {
      return res.status(400).json({ success: false, error: 'Password cannot be empty.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    let user = db.prepare(`SELECT * FROM users WHERE LOWER(email) = ?`).get(cleanEmail);

    // Fallback for default test credentials
    if (!user && (cleanEmail === 'alex@zynqosocial.internal' || cleanEmail === 'alex')) {
      user = {
        id: 'user-default',
        name: 'Alex Rivera',
        email: 'alex@zynqosocial.internal',
        password: password,
        date_of_birth: '1995-06-15',
        category: 'Manager',
        current_mood: 'Happy',
        language: 'en'
      };
    }

    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    // Update active in-memory user profile
    userProfile.id = user.id;
    userProfile.name = user.name;
    userProfile.handle = `@${user.name.toLowerCase().replace(/\s+/g, '_')}`;
    userProfile.date_of_birth = user.date_of_birth || '1995-06-15';
    userProfile.category = user.category || 'Manager';
    userProfile.current_mood = user.current_mood || 'Happy';

    return res.json({
      success: true,
      message: 'Login successful.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        date_of_birth: userProfile.date_of_birth,
        category: userProfile.category,
        current_mood: userProfile.current_mood,
        language: user.language || 'en'
      }
    });
  } catch (err) {
    console.error('[API] Login error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/user/mood - Save current mood for logged-in user
router.post('/mood', (req, res) => {
  try {
    const { email, mood } = req.body;
    if (!mood || !mood.trim()) {
      return res.status(400).json({ success: false, error: 'Mood cannot be empty.' });
    }

    const cleanMood = mood.trim();
    if (!ALLOWED_MOODS.includes(cleanMood)) {
      return res.status(400).json({
        success: false,
        error: `Mood must be one of: ${ALLOWED_MOODS.join(', ')}.`
      });
    }

    userProfile.current_mood = cleanMood;

    if (email && email.trim()) {
      const cleanEmail = email.trim().toLowerCase();
      db.prepare(`UPDATE users SET current_mood = ? WHERE LOWER(email) = ?`).run(cleanMood, cleanEmail);
      syncUsersJson();
    }

    return res.json({
      success: true,
      message: 'Current mood updated successfully.',
      current_mood: cleanMood
    });
  } catch (err) {
    console.error('[API] Mood update error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/user/users - Retrieve stored users (excluding password) for verification
router.get('/users', (req, res) => {
  try {
    const users = db.prepare(`SELECT id, name, email, language, date_of_birth, category, current_mood, created_at FROM users`).all();
    res.json({ success: true, count: users.length, users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
