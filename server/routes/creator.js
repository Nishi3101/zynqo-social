import express from 'express';
import { generateCreatorAssets } from '../services/aiEngine.js';

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

// GET Creator Analytics & Retention Insights
router.get('/analytics', (req, res) => {
  res.json({
    success: true,
    analytics: {
      totalViews: '428.5K',
      avgWatchTime: '44.2s',
      completionRate: '78.4%',
      meaningfulEngagementRate: '18.6%',
      followersGained: '+3,420',
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
