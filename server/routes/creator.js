import express from 'express';
import { generateCreatorAssets, generateAICaption, generateAIHashtags } from '../services/aiEngine.js';

const router = express.Router();

// POST Generate creator assets (Hooks, 60s Script, Captions, Hashtags)
router.post('/generate', async (req, res) => {
  try {
    const { topic, audience, tone = 'gen_z', language = 'en', regionalStyle = 'standard' } = req.body;
    const assets = await generateCreatorAssets(topic, audience, tone, language, regionalStyle);
    res.json({ success: true, assets });
  } catch (err) {
    console.error('Creator generator error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Generate AI Caption for reel upload
router.post('/ai-caption', async (req, res) => {
  try {
    const { title, category, tone } = req.body;
    const caption = await generateAICaption(title, category, tone);
    res.json({ success: true, caption });
  } catch (err) {
    console.error('AI Caption generation error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Generate AI Hashtags for reel upload
router.post('/ai-hashtags', async (req, res) => {
  try {
    const { title, category } = req.body;
    const hashtags = await generateAIHashtags(title, category);
    res.json({ success: true, hashtags });
  } catch (err) {
    console.error('AI Hashtags generation error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET Creator Analytics & Retention Insights
router.get('/analytics', (req, res) => {
  res.json({
    success: true,
    analytics: {
      totalViews: 542800,
      totalLikes: 84320,
      totalComments: 12450,
      totalShares: 18900,
      followers: 24650,
      followersGained: '+1,240',
      viewsTrend: '+14.2%',
      likesTrend: '+9.8%',
      commentsTrend: '+22.4%',
      sharesTrend: '+31.5%',
      avgWatchTime: '44.2s',
      completionRate: '78.4%',
      meaningfulEngagementRate: '18.6%',
      weeklyAnalytics: [
        { date: 'Mon', label: 'Oct 17', views: 24500, likes: 3800 },
        { date: 'Tue', label: 'Oct 18', views: 38400, likes: 5900 },
        { date: 'Wed', label: 'Oct 19', views: 31200, likes: 4700 },
        { date: 'Thu', label: 'Oct 20', views: 42100, likes: 6800 },
        { date: 'Fri', label: 'Oct 21', views: 56900, likes: 9200 },
        { date: 'Sat', label: 'Oct 22', views: 68400, likes: 11400 },
        { date: 'Sun', label: 'Oct 23', views: 59200, likes: 9800 }
      ],
      recentPosts: [
        {
          id: 'post-1',
          title: 'Deep Learning: Attention Mechanisms in 45s',
          type: 'reel',
          thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
          publishedAt: '2 days ago',
          views: 124500,
          likes: 21300,
          comments: 2410,
          shares: 3820,
          performance: 'Viral Hit'
        },
        {
          id: 'post-2',
          title: 'Vadodara Navratri Raas: Garba Step Tutorial',
          type: 'reel',
          thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
          publishedAt: '5 days ago',
          views: 98200,
          likes: 18400,
          comments: 1820,
          shares: 4200,
          performance: 'High Retention'
        },
        {
          id: 'post-3',
          title: 'Quantum Computing Explained with Simple Polarizers',
          type: 'video',
          thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80',
          publishedAt: '1 week ago',
          views: 64100,
          likes: 11200,
          comments: 980,
          shares: 1450,
          performance: 'Steady Growth'
        },
        {
          id: 'post-4',
          title: 'Next-Gen AI Video Pipelines with Transformers',
          type: 'reel',
          thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&q=80',
          publishedAt: 'Oct 24 at 10:00 AM',
          views: 0,
          likes: 0,
          comments: 0,
          shares: 0,
          isScheduled: true,
          performance: 'Scheduled'
        }
      ],
      retentionCurve: [
        { second: 0, retention: 100 },
        { second: 3, retention: 92 },
        { second: 10, retention: 86 },
        { second: 25, retention: 79 },
        { second: 40, retention: 72 },
        { second: 55, retention: 68 }
      ],
      audienceDemographics: {
        topCountries: ['United States 34%', 'India 28%', 'United Kingdom 14%', 'Germany 8%'],
        topAges: ['18-24 (42%)', '25-34 (44%)', '35-44 (12%)']
      },
      aiCoachFeedback: {
        overallScore: 'A (Top 5% of educational creators)',
        strengths: [
          'Opening 3 seconds have exceptional 92% retention due to direct curiosity hook.',
          'Interactive "Make This Useful" button generated 1,420 note saves.'
        ],
        improvementOpportunities: [
          'Viewer drop-off occurs slightly at second 32. Consider inserting a visual pattern interrupt or quick cut.'
        ]
      }
    }
  });
});

export default router;
