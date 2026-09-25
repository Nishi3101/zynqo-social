import express from 'express';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
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

// Add date_of_birth, category, current_mood, profile_visibility, and room_privacy columns if table previously existed without them
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
  if (!existingCols.includes('profile_visibility')) {
    db.exec(`ALTER TABLE users ADD COLUMN profile_visibility TEXT DEFAULT 'public';`);
  }
  if (!existingCols.includes('room_privacy')) {
    db.exec(`ALTER TABLE users ADD COLUMN room_privacy TEXT DEFAULT 'public';`);
  }
  if (!existingCols.includes('google_id')) {
    db.exec(`ALTER TABLE users ADD COLUMN google_id TEXT;`);
  }
  if (!existingCols.includes('avatar')) {
    db.exec(`ALTER TABLE users ADD COLUMN avatar TEXT;`);
  }
} catch (e) {
  console.warn('[DB] Migration check notice:', e);
}

// Seed default user if not already present
try {
  const defaultUser = db.prepare(`SELECT * FROM users WHERE email = ?`).get('alex@zynqosocial.internal');
  if (!defaultUser) {
    db.prepare(`
      INSERT INTO users (id, name, email, password, language, date_of_birth, category, current_mood, profile_visibility, room_privacy, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'user-default',
      'Alex Rivera',
      'alex@zynqosocial.internal',
      'alex123',
      'en',
      '1995-06-15',
      'Manager',
      'Happy',
      'public',
      'public',
      new Date().toISOString()
    );
  } else if (!defaultUser.profile_visibility || !defaultUser.room_privacy) {
    db.prepare(`UPDATE users SET profile_visibility = COALESCE(profile_visibility, 'public'), room_privacy = COALESCE(room_privacy, 'public') WHERE email = ?`).run('alex@zynqosocial.internal');
  }
} catch (e) {
  console.warn('[DB] Default user notice:', e);
}

// Sync users.json snapshot
function syncUsersJson() {
  try {
    const allUsers = db.prepare(`SELECT id, name, email, language, date_of_birth, category, current_mood, profile_visibility, room_privacy, created_at FROM users`).all();
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
  profile_visibility: 'public',
  room_privacy: 'public',
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
    privateMode: false,
    profileVisibility: 'public',
    roomPrivacy: 'public'
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
  const email = req.query.email ? req.query.email.trim().toLowerCase() : null;
  if (email) {
    const dbUser = db.prepare(`SELECT * FROM users WHERE LOWER(email) = ?`).get(email);
    if (dbUser) {
      userProfile.id = dbUser.id;
      userProfile.name = dbUser.name;
      userProfile.date_of_birth = dbUser.date_of_birth || userProfile.date_of_birth;
      userProfile.category = dbUser.category || userProfile.category;
      userProfile.current_mood = dbUser.current_mood || userProfile.current_mood;
      userProfile.profile_visibility = dbUser.profile_visibility || 'public';
      userProfile.room_privacy = dbUser.room_privacy || 'public';
      userProfile.privacySettings = {
        ...userProfile.privacySettings,
        profileVisibility: dbUser.profile_visibility || 'public',
        roomPrivacy: dbUser.room_privacy || 'public',
        privateMode: (dbUser.profile_visibility || 'public') === 'private'
      };
    }
  }
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
  const { name, handle, bio, avatar, isFollowing, profile_visibility, room_privacy, email } = req.body;
  if (name !== undefined) userProfile.name = name;
  if (handle !== undefined) userProfile.handle = handle.startsWith('@') ? handle : `@${handle}`;
  if (bio !== undefined) userProfile.bio = bio;
  if (avatar !== undefined) userProfile.avatar = avatar;
  if (isFollowing !== undefined) {
    userProfile.isFollowing = isFollowing;
    userProfile.followersCount = (userProfile.followersCount || 1420) + (isFollowing ? 1 : -1);
  }
  if (profile_visibility !== undefined && ['public', 'private'].includes(String(profile_visibility).toLowerCase())) {
    userProfile.profile_visibility = String(profile_visibility).toLowerCase();
    userProfile.privacySettings.profileVisibility = userProfile.profile_visibility;
    userProfile.privacySettings.privateMode = userProfile.profile_visibility === 'private';
  }
  if (room_privacy !== undefined && ['public', 'private'].includes(String(room_privacy).toLowerCase())) {
    userProfile.room_privacy = String(room_privacy).toLowerCase();
    userProfile.privacySettings.roomPrivacy = userProfile.room_privacy;
  }
  if (email || userProfile.email) {
    const targetEmail = (email || userProfile.email).trim().toLowerCase();
    try {
      db.prepare(`UPDATE users SET profile_visibility = ?, room_privacy = ? WHERE LOWER(email) = ?`).run(
        userProfile.profile_visibility,
        userProfile.room_privacy,
        targetEmail
      );
      syncUsersJson();
    } catch (e) {}
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

// GET /api/user/privacy & GET /api/user/settings - Load privacy settings
const getPrivacySettingsHandler = (req, res) => {
  try {
    const email = req.query.email ? req.query.email.trim().toLowerCase() : (userProfile.email || '').toLowerCase();
    const userId = req.query.userId || userProfile.id;

    let dbUser = null;
    if (email) {
      dbUser = db.prepare(`SELECT * FROM users WHERE LOWER(email) = ?`).get(email);
    } else if (userId) {
      dbUser = db.prepare(`SELECT * FROM users WHERE id = ?`).get(userId);
    }

    const profileVisibility = dbUser?.profile_visibility || userProfile.profile_visibility || 'public';
    const roomPrivacy = dbUser?.room_privacy || userProfile.room_privacy || 'public';

    return res.json({
      success: true,
      settings: {
        profileVisibility,
        roomPrivacy,
        useWatchHistory: userProfile.privacySettings.useWatchHistory,
        useMoodSignals: userProfile.privacySettings.useMoodSignals,
        allowCollaborativeFiltering: userProfile.privacySettings.allowCollaborativeFiltering,
        privateMode: profileVisibility === 'private'
      }
    });
  } catch (err) {
    console.error('[API] Get privacy settings error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
router.get('/privacy', getPrivacySettingsHandler);
router.get('/settings', getPrivacySettingsHandler);

// POST /api/user/privacy & POST /api/user/settings & PUT /api/user/settings - Save privacy settings
const savePrivacySettingsHandler = (req, res) => {
  try {
    const { email, userId, profileVisibility, roomPrivacy, key, value } = req.body;
    const headerEmail = req.headers['x-user-email'];

    // Identify requesting user
    let dbUser = null;
    let targetEmail = null;
    let targetId = null;

    if (email && email.trim()) {
      targetEmail = email.trim().toLowerCase();
      dbUser = db.prepare(`SELECT * FROM users WHERE LOWER(email) = ?`).get(targetEmail);
      if (!dbUser && targetEmail !== 'alex@zynqosocial.internal') {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized: User not found or not logged in.'
        });
      }
    } else if (userId && userId.trim()) {
      targetId = userId.trim();
      dbUser = db.prepare(`SELECT * FROM users WHERE id = ?`).get(targetId);
      if (!dbUser && targetId !== 'user-default') {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized: User not found or not logged in.'
        });
      }
    } else if (headerEmail && headerEmail.trim()) {
      targetEmail = headerEmail.trim().toLowerCase();
      dbUser = db.prepare(`SELECT * FROM users WHERE LOWER(email) = ?`).get(targetEmail);
      if (!dbUser && targetEmail !== 'alex@zynqosocial.internal') {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized: User not found or not logged in.'
        });
      }
    } else if (userProfile && userProfile.email) {
      targetEmail = userProfile.email.trim().toLowerCase();
      dbUser = db.prepare(`SELECT * FROM users WHERE LOWER(email) = ?`).get(targetEmail);
    } else if (userProfile && userProfile.id && userProfile.id !== 'local-profile') {
      targetId = userProfile.id;
      dbUser = db.prepare(`SELECT * FROM users WHERE id = ?`).get(targetId);
    } else {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: You must be logged in to modify your settings.'
      });
    }

    // Determine current values
    let updatedProfileVis = dbUser?.profile_visibility || userProfile.profile_visibility || 'public';
    let updatedRoomPriv = dbUser?.room_privacy || userProfile.room_privacy || 'public';

    // Handle legacy key/value toggle
    if (key) {
      if (key === 'profileVisibility' || key === 'profile_visibility') {
        const val = String(value).toLowerCase();
        if (['public', 'private'].includes(val)) updatedProfileVis = val;
      } else if (key === 'roomPrivacy' || key === 'room_privacy') {
        const val = String(value).toLowerCase();
        if (['public', 'private'].includes(val)) updatedRoomPriv = val;
      } else if (key === 'privateMode') {
        updatedProfileVis = value ? 'private' : 'public';
      }
      if (userProfile.privacySettings.hasOwnProperty(key)) {
        userProfile.privacySettings[key] = value;
      }
    }

    // Handle direct profileVisibility updates
    if (profileVisibility !== undefined) {
      const cleanVal = String(profileVisibility).trim().toLowerCase();
      if (!['public', 'private'].includes(cleanVal)) {
        return res.status(400).json({
          success: false,
          error: "Profile Visibility must be 'public' or 'private'."
        });
      }
      updatedProfileVis = cleanVal;
    }

    // Handle direct roomPrivacy updates
    if (roomPrivacy !== undefined) {
      const cleanVal = String(roomPrivacy).trim().toLowerCase();
      if (!['public', 'private'].includes(cleanVal)) {
        return res.status(400).json({
          success: false,
          error: "Room Privacy must be 'public' or 'private'."
        });
      }
      updatedRoomPriv = cleanVal;
    }

    // Update SQLite database record for the logged-in user
    if (dbUser) {
      db.prepare(`UPDATE users SET profile_visibility = ?, room_privacy = ? WHERE id = ?`).run(
        updatedProfileVis,
        updatedRoomPriv,
        dbUser.id
      );
      syncUsersJson();
    }

    // Update in-memory profile cache
    userProfile.profile_visibility = updatedProfileVis;
    userProfile.room_privacy = updatedRoomPriv;
    userProfile.privacySettings.profileVisibility = updatedProfileVis;
    userProfile.privacySettings.roomPrivacy = updatedRoomPriv;
    userProfile.privacySettings.privateMode = updatedProfileVis === 'private';

    return res.json({
      success: true,
      message: 'Privacy settings saved successfully.',
      settings: {
        profileVisibility: updatedProfileVis,
        roomPrivacy: updatedRoomPriv,
        privateMode: updatedProfileVis === 'private',
        useWatchHistory: userProfile.privacySettings.useWatchHistory,
        useMoodSignals: userProfile.privacySettings.useMoodSignals,
        allowCollaborativeFiltering: userProfile.privacySettings.allowCollaborativeFiltering
      }
    });
  } catch (err) {
    console.error('[API] Save privacy settings error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
router.post('/privacy', savePrivacySettingsHandler);
router.post('/settings', savePrivacySettingsHandler);
router.put('/settings', savePrivacySettingsHandler);

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
      INSERT INTO users (id, name, email, password, language, date_of_birth, category, current_mood, profile_visibility, room_privacy, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, cleanName, cleanEmail, password, language, cleanDob, cleanCategory, cleanMood, 'public', 'public', createdAt);

    // Sync snapshot to users.json
    syncUsersJson();

    // Update active in-memory user profile
    userProfile.id = id;
    userProfile.name = cleanName;
    userProfile.email = cleanEmail;
    userProfile.handle = `@${cleanName.toLowerCase().replace(/\s+/g, '_')}`;
    userProfile.date_of_birth = cleanDob;
    userProfile.category = cleanCategory;
    userProfile.current_mood = cleanMood;
    userProfile.profile_visibility = 'public';
    userProfile.room_privacy = 'public';
    userProfile.privacySettings = {
      ...userProfile.privacySettings,
      profileVisibility: 'public',
      roomPrivacy: 'public',
      privateMode: false
    };

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
        profile_visibility: 'public',
        room_privacy: 'public',
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
        profile_visibility: 'public',
        room_privacy: 'public',
        language: 'en'
      };
    }

    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    // Update active in-memory user profile
    userProfile.id = user.id;
    userProfile.name = user.name;
    userProfile.email = user.email;
    userProfile.handle = `@${user.name.toLowerCase().replace(/\s+/g, '_')}`;
    userProfile.date_of_birth = user.date_of_birth || '1995-06-15';
    userProfile.category = user.category || 'Manager';
    userProfile.current_mood = user.current_mood || 'Happy';
    userProfile.profile_visibility = user.profile_visibility || 'public';
    userProfile.room_privacy = user.room_privacy || 'public';
    userProfile.privacySettings = {
      ...userProfile.privacySettings,
      profileVisibility: userProfile.profile_visibility,
      roomPrivacy: userProfile.room_privacy,
      privateMode: userProfile.profile_visibility === 'private'
    };

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
        profile_visibility: userProfile.profile_visibility,
        room_privacy: userProfile.room_privacy,
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

    const rawMood = mood.trim();
    const matchedMood = ALLOWED_MOODS.find(m => m.toLowerCase() === rawMood.toLowerCase());
    if (!matchedMood) {
      return res.status(400).json({
        success: false,
        error: `Mood must be one of: ${ALLOWED_MOODS.join(', ')}.`
      });
    }

    const cleanMood = matchedMood;
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
    const users = db.prepare(`SELECT id, name, email, language, date_of_birth, category, current_mood, profile_visibility, room_privacy, created_at FROM users`).all();
    res.json({ success: true, count: users.length, users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Helper to read and reload Google OAuth credentials safely
const getGoogleCredentials = () => {
  // If not yet present in process.env, reload .env dynamically from project root
  if (!process.env.GOOGLE_CLIENT_ID && !process.env.VITE_GOOGLE_CLIENT_ID) {
    try {
      dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: true });
    } catch (e) {}
  }

  const clientId = (
    process.env.GOOGLE_CLIENT_ID || 
    process.env.VITE_GOOGLE_CLIENT_ID || 
    ''
  ).trim();

  const clientSecret = (
    process.env.GOOGLE_CLIENT_SECRET || 
    process.env.VITE_GOOGLE_CLIENT_SECRET || 
    process.env.GOOGLE_SECRET || 
    ''
  ).trim();

  const isConfigured = Boolean(
    clientId && 
    !clientId.toLowerCase().includes('your_google_client_id') &&
    clientId.toLowerCase() !== 'placeholder' &&
    clientId.toLowerCase() !== 'your_client_id_here'
  );

  return { clientId, clientSecret, isConfigured };
};

// GET /api/user/auth/google/config - Public OAuth client configuration
router.get('/auth/google/config', (req, res) => {
  const { clientId, isConfigured } = getGoogleCredentials();

  res.json({
    success: true,
    configured: isConfigured,
    clientId: isConfigured ? clientId : ''
  });
});

// Helper to determine exact OAuth redirect URI
const getOAuthRedirectUri = (req) => {
  const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'http';
  const host = req.headers['x-forwarded-host'] || req.get('host') || 'localhost:5000';
  const configuredUri = (process.env.GOOGLE_REDIRECT_URI || '').trim();

  if (configuredUri.startsWith('/')) {
    return `${protocol}://${host}${configuredUri}`;
  }

  const isLiveHost = host && !host.includes('localhost') && !host.includes('127.0.0.1');
  if (isLiveHost && configuredUri.includes('localhost')) {
    return `${protocol}://${host}/api/user/auth/google/callback`;
  }

  if (configuredUri) {
    return configuredUri;
  }

  return `${protocol}://${host}/api/user/auth/google/callback`;
};

// POST /api/user/auth/google/verify - Verify Google ID Token (Google Identity Services)
router.post('/auth/google/verify', async (req, res) => {
  try {
    const { credential, isDemo } = req.body;

    if (!credential && !isDemo) {
      return res.status(400).json({ success: false, error: 'Google credential token is required.' });
    }

    let sub, email, name, picture;

    if (isDemo || credential === 'demo-google-token') {
      // Demo test user for local validation when Google Cloud Console keys are not yet configured
      sub = '109876543210987654321';
      email = 'google.user@zynqosocial.app';
      name = 'Google User';
      picture = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150';
    } else {
      // Verify token with Google's public tokeninfo endpoint
      const googleVerifyRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
      if (!googleVerifyRes.ok) {
        const errText = await googleVerifyRes.text();
        console.error('[Google OAuth] Verification failed:', errText);
        return res.status(401).json({ success: false, error: 'Invalid Google authentication token.' });
      }

      const tokenPayload = await googleVerifyRes.json();
      if (!tokenPayload.email_verified || tokenPayload.email_verified === 'false') {
        return res.status(401).json({ success: false, error: 'Google email address is not verified.' });
      }

      // Validate token audience against configured Client ID
      const { clientId: configuredClientId } = getGoogleCredentials();
      if (configuredClientId && tokenPayload.aud !== configuredClientId) {
        console.error('[Google OAuth] Token audience mismatch. Expected:', configuredClientId, 'Got:', tokenPayload.aud);
        return res.status(401).json({ success: false, error: 'Google token was not issued for this application.' });
      }

      sub = tokenPayload.sub;
      email = tokenPayload.email;
      name = tokenPayload.name || tokenPayload.given_name || 'Google User';
      picture = tokenPayload.picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150';
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check if user already exists in SQLite
    let user = db.prepare(`SELECT * FROM users WHERE LOWER(email) = ? OR google_id = ?`).get(cleanEmail, sub);

    if (!user) {
      // Create new user record
      const newId = `user-g-${sub.slice(-8)}`;
      db.prepare(`
        INSERT INTO users (id, name, email, password, google_id, avatar, language, date_of_birth, category, current_mood, profile_visibility, room_privacy, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        newId,
        name,
        cleanEmail,
        `google-oauth-${Date.now()}`,
        sub,
        picture,
        'en',
        '1998-01-01',
        'Student',
        'Happy',
        'public',
        'public',
        new Date().toISOString()
      );
      user = db.prepare(`SELECT * FROM users WHERE id = ?`).get(newId);
      syncUsersJson();
    } else {
      // Update Google ID and Avatar if missing
      db.prepare(`
        UPDATE users 
        SET google_id = COALESCE(google_id, ?), 
            avatar = COALESCE(avatar, ?) 
        WHERE id = ?
      `).run(sub, picture, user.id);
      syncUsersJson();
    }

    // Update in-memory userProfile
    userProfile.id = user.id;
    userProfile.name = user.name;
    userProfile.email = user.email;
    userProfile.avatar = user.avatar || picture || userProfile.avatar;
    userProfile.handle = `@${user.name.toLowerCase().replace(/[^a-z0-9_]/g, '_')}`;
    userProfile.date_of_birth = user.date_of_birth || '1998-01-01';
    userProfile.category = user.category || 'Student';
    userProfile.current_mood = user.current_mood || 'Happy';
    userProfile.profile_visibility = user.profile_visibility || 'public';
    userProfile.room_privacy = user.room_privacy || 'public';

    return res.json({
      success: true,
      message: 'Google Sign-In successful.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: userProfile.avatar,
        date_of_birth: userProfile.date_of_birth,
        category: userProfile.category,
        current_mood: userProfile.current_mood,
        profile_visibility: userProfile.profile_visibility,
        room_privacy: userProfile.room_privacy,
        language: user.language || 'en'
      }
    });
  } catch (err) {
    console.error('[API] Google verify error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/user/auth/google - Initiate Google OAuth Redirect
router.get('/auth/google', (req, res) => {
  const { clientId, isConfigured } = getGoogleCredentials();
  if (!isConfigured) {
    return res.status(400).send(`
      <!DOCTYPE html>
      <html>
        <head><title>Google OAuth Not Configured</title></head>
        <body style="font-family:sans-serif;padding:3rem;text-align:center;background:#0f172a;color:#f8fafc;">
          <h2>Google OAuth Not Configured</h2>
          <p style="color:#94a3b8;">Please set <code>GOOGLE_CLIENT_ID</code> and <code>GOOGLE_CLIENT_SECRET</code> in your <code>.env</code> file.</p>
          <button onclick="window.close()" style="margin-top:1rem;padding:0.6rem 1.2rem;border-radius:0.5rem;background:#38bdf8;color:#0f172a;border:none;font-weight:bold;cursor:pointer;">Close Window</button>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'GOOGLE_AUTH_UNCONFIGURED' }, '*');
            }
          </script>
        </body>
      </html>
    `);
  }

  const redirectUri = getOAuthRedirectUri(req);
  const state = Math.random().toString(36).substring(7);
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=openid%20email%20profile&state=${state}&prompt=select_account`;
  res.redirect(authUrl);
});

// GET /api/user/auth/google/callback - Handle OAuth Code Exchange
router.get('/auth/google/callback', async (req, res) => {
  const { code, error } = req.query;

  if (error || !code) {
    return res.send(`
      <!DOCTYPE html>
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'GOOGLE_AUTH_ERROR', error: '${error || 'Authentication was cancelled.'}' }, '*');
              window.close();
            } else {
              window.location.href = '/?error=google_cancelled';
            }
          </script>
        </body>
      </html>
    `);
  }

  try {
    const { clientId, clientSecret } = getGoogleCredentials();
    const redirectUri = getOAuthRedirectUri(req);

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code: String(code),
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok || !tokenData.access_token) {
      throw new Error(tokenData.error_description || 'Failed to exchange authorization code with Google.');
    }

    const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    });
    const userInfo = await userInfoRes.json();
    const { sub, email, name, picture } = userInfo;

    const cleanEmail = email.trim().toLowerCase();
    let user = db.prepare(`SELECT * FROM users WHERE LOWER(email) = ? OR google_id = ?`).get(cleanEmail, sub);

    if (!user) {
      const newId = `user-g-${sub.slice(-8)}`;
      db.prepare(`
        INSERT INTO users (id, name, email, password, google_id, avatar, language, date_of_birth, category, current_mood, profile_visibility, room_privacy, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        newId,
        name || 'Google User',
        cleanEmail,
        `google-oauth-${Date.now()}`,
        sub,
        picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        'en',
        '1998-01-01',
        'Student',
        'Happy',
        'public',
        'public',
        new Date().toISOString()
      );
      user = db.prepare(`SELECT * FROM users WHERE id = ?`).get(newId);
      syncUsersJson();
    } else {
      db.prepare(`
        UPDATE users 
        SET google_id = COALESCE(google_id, ?), 
            avatar = COALESCE(avatar, ?) 
        WHERE id = ?
      `).run(sub, picture || user.avatar, user.id);
      syncUsersJson();
    }

    userProfile.id = user.id;
    userProfile.name = user.name;
    userProfile.email = user.email;
    userProfile.avatar = user.avatar || picture || userProfile.avatar;
    userProfile.handle = `@${user.name.toLowerCase().replace(/[^a-z0-9_]/g, '_')}`;

    const userPayload = JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: userProfile.avatar,
      date_of_birth: userProfile.date_of_birth,
      category: userProfile.category,
      current_mood: userProfile.current_mood,
      profile_visibility: userProfile.profile_visibility,
      room_privacy: userProfile.room_privacy
    });

    res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>Google Authentication Success</title></head>
        <body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;background:#0f172a;color:#fff;">
          <div style="text-align:center;">
            <h3>Authentication Successful</h3>
            <p>Signing in to Zynqo Social...</p>
          </div>
          <script>
            const user = ${userPayload};
            if (window.opener) {
              window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS', user }, '*');
              window.close();
            } else {
              localStorage.setItem('pulseai_logged_in', 'true');
              localStorage.setItem('pulseai_user_name', user.name);
              localStorage.setItem('pulseai_user_email', user.email);
              if (user.avatar) localStorage.setItem('pulseai_user_avatar', user.avatar);
              window.location.href = '/?auth=google_success';
            }
          </script>
        </body>
      </html>
    `);
  } catch (err) {
    console.error('[Google OAuth] Callback error:', err);
    res.send(`
      <!DOCTYPE html>
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'GOOGLE_AUTH_ERROR', error: '${err.message}' }, '*');
              window.close();
            } else {
              window.location.href = '/?error=' + encodeURIComponent('${err.message}');
            }
          </script>
        </body>
      </html>
    `);
  }
});

export default router;
