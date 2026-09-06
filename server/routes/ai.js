import express from 'express';
import fs from 'fs';
import path from 'path';
import { generateUsefulContent, analyzeFactCheck, companionChat } from '../services/aiEngine.js';
import {
  analyzeLanguage,
  REGIONAL_DIALECTS,
  generateContentSuggestions,
  generateCaptionSuggestions,
  generateHashtagSuggestions,
  generateThumbnailSuggestions,
  modifyCaptionWithAI
} from '../services/languageEngine.js';

const router = express.Router();
const reelsPath = path.resolve(process.cwd(), 'server/data/reels.json');

function getReelById(id) {
  try {
    const reels = JSON.parse(fs.readFileSync(reelsPath, 'utf8'));
    return reels.find(r => r.id === id);
  } catch (err) {
    return null;
  }
}

// POST Make This Useful (generates Notes, Quiz, Tasks, Study Plan)
router.post('/make-useful', async (req, res) => {
  try {
    const { reelId, format = 'all' } = req.body;
    const reel = getReelById(reelId);

    if (!reel) {
      return res.status(404).json({ success: false, error: 'Reel not found' });
    }

    const output = await generateUsefulContent(reel, format);
    res.json({ success: true, reelId, outputs: output });
  } catch (err) {
    console.error('Make useful error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST AI Reality Check (fact-checking and source verification)
router.post('/reality-check', async (req, res) => {
  try {
    const { claim, reelId } = req.body;
    const reel = reelId ? getReelById(reelId) : null;
    const result = await analyzeFactCheck(claim, reel);

    res.json({ success: true, result });
  } catch (err) {
    console.error('Reality check error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET Why Am I Seeing This (explainable AI)
router.get('/why-this/:id', (req, res) => {
  const reel = getReelById(req.params.id);
  if (!reel) {
    return res.status(404).json({ success: false, error: 'Reel not found' });
  }

  res.json({
    success: true,
    whyAmISeeingThis: reel.whyAmISeeingThis || {
      primaryReason: 'Recommended based on your recent activity.',
      matchedInterests: [reel.category],
      signalWeight: { watchHistory: 50, goalAlignment: 25, currentMood: 15, collaborativeFilter: 10 },
      privacyNote: 'Protected by on-device preference controls.'
    }
  });
});

// POST Nova AI Companion Chat
router.post('/companion', async (req, res) => {
  try {
    const { message, context = {} } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, error: 'Message required' });
    }

    const response = await companionChat(message, context);
    res.json({ success: true, ...response });
  } catch (err) {
    console.error('Companion chat error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Analyze Language, Slang, Regional Dialects & Code-Switching
router.post('/analyze-language', (req, res) => {
  try {
    const { text, context = {} } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, error: 'Text required' });
    }
    const analysis = analyzeLanguage(text, context);
    res.json({ success: true, analysis });
  } catch (err) {
    console.error('Analyze language error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET Regional dialects and supported languages catalog
router.get('/regional-catalog', (req, res) => {
  res.json({
    success: true,
    dialects: REGIONAL_DIALECTS
  });
});

// Handler for Google TTS streaming proxy supporting both GET and POST
async function handleTTS(req, res) {
  try {
    const text = req.body?.text || req.query?.text;
    const lang = req.body?.lang || req.query?.lang || 'en';
    if (!text) {
      return res.status(400).json({ success: false, error: 'Text is required' });
    }

    // Clean text: strip markdown, emojis, asterisks, extra whitespace
    const cleanText = String(text)
      .replace(/[*_#`~[\]()]/g, '')
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      return res.status(400).json({ success: false, error: 'Empty text after cleaning' });
    }

    // Split text into small chunks (<120 chars) along sentence/clause boundaries
    const rawChunks = cleanText.match(/[^.!?।\n,;:—]+[.!?।\n,;:—]+|[^.!?।\n,;:—]+/g) || [cleanText];
    const chunks = [];
    let currentChunk = '';

    for (const piece of rawChunks) {
      const trimmed = piece.trim();
      if (!trimmed) continue;
      if ((currentChunk + ' ' + trimmed).trim().length < 120) {
        currentChunk = (currentChunk + ' ' + trimmed).trim();
      } else {
        if (currentChunk) chunks.push(currentChunk);
        if (trimmed.length > 120) {
          const words = trimmed.split(' ');
          let wChunk = '';
          for (const w of words) {
            if ((wChunk + ' ' + w).length < 120) {
              wChunk = (wChunk + ' ' + w).trim();
            } else {
              if (wChunk) chunks.push(wChunk);
              wChunk = w;
            }
          }
          if (wChunk) chunks.push(wChunk);
          currentChunk = '';
        } else {
          currentChunk = trimmed;
        }
      }
    }
    if (currentChunk) chunks.push(currentChunk);

    // Fetch mp3 audio chunks from Google TTS
    const targetLang = String(lang).toLowerCase().slice(0, 2);
    const audioBuffers = [];

    // Limit to first 12 chunks to ensure swift delivery
    const safeChunks = chunks.slice(0, 12);

    for (const chunk of safeChunks) {
      try {
        const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${encodeURIComponent(targetLang)}&q=${encodeURIComponent(chunk)}`;
        const ttsRes = await fetch(ttsUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        if (ttsRes.ok) {
          const arrayBuf = await ttsRes.arrayBuffer();
          audioBuffers.push(Buffer.from(arrayBuf));
        }
      } catch (err) {
        console.warn('TTS chunk fetch failed:', err.message);
      }
    }

    if (audioBuffers.length === 0) {
      return res.status(502).json({ success: false, error: 'Failed to synthesize speech' });
    }

    const fullAudio = Buffer.concat(audioBuffers);
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': fullAudio.length,
      'Cache-Control': 'public, max-age=86400',
      'Accept-Ranges': 'bytes'
    });
    res.send(fullAudio);
  } catch (err) {
    console.error('TTS endpoint error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
}

router.get('/tts', handleTTS);
router.post('/tts', handleTTS);

// POST AI Content Suggestions (Unified: Captions, Hashtags, Thumbnails)
router.post('/suggest-content', (req, res) => {
  try {
    const {
      contentType = 'reel',
      title = '',
      description = '',
      category = 'Tech & AI',
      userPrompt = '',
      language = 'en',
      dialect = 'standard',
      tone = 'auto',
      audience = 'general'
    } = req.body;

    const suggestions = generateContentSuggestions({
      contentType,
      title,
      description,
      category,
      userPrompt,
      language,
      dialect,
      tone,
      audience
    });

    res.json({ success: true, suggestions });
  } catch (err) {
    console.error('Suggest content error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Regenerate Captions only
router.post('/suggest-content/captions', (req, res) => {
  try {
    const {
      contentType = 'reel',
      title = '',
      description = '',
      category = 'Tech & AI',
      userPrompt = '',
      language = 'en',
      dialect = 'standard',
      tone = 'auto',
      audience = 'general'
    } = req.body;

    const captions = generateCaptionSuggestions({
      contentType,
      title,
      description,
      category,
      userPrompt,
      language,
      dialect,
      tone,
      audience
    });

    res.json({ success: true, captions });
  } catch (err) {
    console.error('Regenerate captions error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Regenerate Hashtags only
router.post('/suggest-content/hashtags', (req, res) => {
  try {
    const {
      topic = '',
      category = 'Tech & AI',
      language = 'en',
      dialect = 'standard',
      contentType = 'reel'
    } = req.body;

    const hashtags = generateHashtagSuggestions({
      topic,
      category,
      language,
      dialect,
      contentType
    });

    res.json({ success: true, hashtags });
  } catch (err) {
    console.error('Regenerate hashtags error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Regenerate Thumbnails only
router.post('/suggest-content/thumbnails', (req, res) => {
  try {
    const {
      title = '',
      category = 'Tech & AI',
      contentType = 'reel',
      userPrompt = '',
      language = 'en'
    } = req.body;

    const thumbnails = generateThumbnailSuggestions({
      title,
      category,
      contentType,
      userPrompt,
      language
    });

    res.json({ success: true, thumbnails });
  } catch (err) {
    console.error('Regenerate thumbnails error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Modify Caption with AI Prompt
router.post('/suggest-content/modify-caption', (req, res) => {
  try {
    const {
      caption = '',
      instruction = '',
      language = 'en',
      dialect = 'standard'
    } = req.body;

    const modified = modifyCaptionWithAI({
      caption,
      instruction,
      language,
      dialect
    });

    res.json({ success: true, modifiedCaption: modified });
  } catch (err) {
    console.error('Modify caption error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
