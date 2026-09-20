export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const url = req.url || '';

  if (url.includes('/api/user/signup')) {
    const { name, email, date_of_birth, category, language = 'en', current_mood = 'Happy' } = req.body || {};
    return res.status(200).json({
      success: true,
      message: 'User registered successfully.',
      user: {
        id: `user-${Date.now()}`,
        name: name || 'User',
        email: email || 'user@zynqosocial.app',
        date_of_birth: date_of_birth || '2000-01-01',
        category: category || 'Student',
        current_mood,
        language
      }
    });
  }

  if (url.includes('/api/user/login')) {
    const { email } = req.body || {};
    return res.status(200).json({
      success: true,
      message: 'User logged in successfully.',
      user: {
        id: `user-${Date.now()}`,
        name: email ? email.split('@')[0] : 'User',
        email: email || 'user@zynqosocial.app',
        category: 'Student',
        current_mood: 'Happy'
      }
    });
  }

  if (url.includes('/api/user/profile')) {
    return res.status(200).json({
      success: true,
      profile: {
        id: 'user-profile-default',
        name: 'Nishi Thakkar',
        handle: '@nishi_thakkar',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        bio: 'Exploring AI Reels on Zynqo ✨',
        category: 'Student',
        current_mood: 'Happy',
        attentionBudgetMinutes: 30,
        minutesUsedToday: 0,
        xp: 150,
        level: 2,
        streakDays: 3,
        badges: [],
        privacySettings: {
          useWatchHistory: true,
          useMoodSignals: true,
          allowCollaborativeFiltering: true,
          privateMode: false
        },
        memoryVault: []
      }
    });
  }

  if (url.includes('/api/health')) {
    return res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  }

  return res.status(200).json({ success: true });
}
