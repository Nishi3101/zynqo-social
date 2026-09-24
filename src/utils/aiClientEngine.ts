// Client-Side AI Engine: Provides offline & high-speed intelligence for AI Nova, Creator Studio, and Language Analysis
import { Reel } from '../types';

export interface AIResponse {
  success: boolean;
  reply: string;
  action?: 'SWITCH_REEL' | 'NAVIGATE' | 'NONE';
  targetReelId?: string;
  languageAnalysis?: {
    detectedLanguage: string;
    slangDetected?: string[];
    sentiment: 'positive' | 'neutral' | 'motivational' | 'thoughtful';
    formality: 'casual' | 'gen-z' | 'formal';
  };
}

// Math solver
function solveMath(query: string): string | null {
  const clean = query.toLowerCase()
    .replace(/what is|calculate|solve|how much is|evaluate|\?|=|value of/gi, '')
    .trim();

  // Percentage: e.g. "15% of 800"
  const pctMatch = clean.match(/^([\d.]+)\s*%\s*of\s*([\d.]+)$/i);
  if (pctMatch) {
    const pct = parseFloat(pctMatch[1]);
    const total = parseFloat(pctMatch[2]);
    const ans = (pct / 100) * total;
    return `**Calculation Result:**\n\n${pct}% of ${total} = **${ans}**\n\n*Formula:* (${pct} ÷ 100) × ${total} = ${ans}`;
  }

  // Square root: e.g. "square root of 144"
  const sqrtMatch = clean.match(/^(?:square root of|sqrt)\s*\(?([\d.]+)\)?$/i);
  if (sqrtMatch) {
    const num = parseFloat(sqrtMatch[1]);
    return `**Square Root Result:**\n\n√${num} = **${Math.sqrt(num)}**`;
  }

  // Pure arithmetic
  if (/^[\d\s\+\-\*\/\^\(\)\.]+$/.test(clean) && /[\d]/.test(clean) && /[\+\-\*\/\^]/.test(clean)) {
    try {
      const sanitized = clean.replace(/\^/g, '**');
      // eslint-disable-next-line no-eval
      const ans = Function(`'use strict'; return (${sanitized})`)();
      if (typeof ans === 'number' && !isNaN(ans) && isFinite(ans)) {
        return `**Calculation Result:**\n\n${clean} = **${ans}**`;
      }
    } catch (e) {}
  }
  return null;
}

// Coding help
function getCodeHelp(query: string): string | null {
  const q = query.toLowerCase();
  if (!/code|python|javascript|typescript|c\+\+|java|react|html|css|sql|function|algorithm|loop|reverse|fibonacci/i.test(q)) {
    return null;
  }

  if (q.includes('reverse') && q.includes('string')) {
    return `**How to Reverse a String in Python & JavaScript**\n\n**1. Python (Slice Notation):**\n\`\`\`python\ndef reverse_string(s: str) -> str:\n    return s[::-1]\n\nprint(reverse_string("hello"))  # "olleh"\n\`\`\`\n\n**2. JavaScript (Split, Reverse, Join):**\n\`\`\`javascript\nconst reverseString = (str) => str.split('').reverse().join('');\nconsole.log(reverseString("world")); // "dlrow"\n\`\`\``;
  }

  if (q.includes('fibonacci')) {
    return `**Fibonacci Sequence (Optimal O(n) Time, O(1) Space)**\n\n\`\`\`python\ndef fibonacci(n: int):\n    a, b = 0, 1\n    for _ in range(n):\n        print(a, end=" ")\n        a, b = b, a + b\n\nfibonacci(10)  # Output: 0 1 1 2 3 5 8 13 21 34\n\`\`\``;
  }

  return `**Programming Architecture & Insights**\n\nHere are the recommended patterns for **"${query}"**:\n\n1. **Modularity**: Break logic into pure, single-purpose functions.\n2. **Complexity**: Aim for O(n) or O(log n) time complexity.\n3. **Resilience**: Implement boundary validation and type safety.\n\nWould you like a full code example in Python, TypeScript, or React?`;
}

// Creative writing
function getCreativeWriting(query: string): string | null {
  const q = query.toLowerCase();
  if (/story|वाર્તા|कहानी/i.test(q)) {
    return `**The Tale of the Unseen Horizon 🌟**\n\nOnce upon a time, a young traveler named Leo stood at the edge of the valley, looking past the ancient mountains. While others stayed behind safe walls, Leo wanted to explore what lay beyond.\n\nArmed with courage and curiosity, he climbed through pine forests and misty trails. At the summit at twilight, he was met not with peril, but with an endless golden horizon of peaceful cities and sparkling rivers.\n\nHe opened his notebook and wrote: *"Fear ends where curiosity begins."* ✨`;
  }

  if (/poem|કવિતા|कविता|shayari/i.test(q)) {
    return `**Echoes of Tomorrow ✨**\n\nAcross the quiet hush of dawn,\nA gentle thread of light is drawn.\nThe world awakens, fresh and bright,\nDispelling shadows of the night.\n\nIn every whisper of the breeze,\nA quiet truth begins to gleam—\nThat hope is woven in a dream. 💫`;
  }

  return null;
}

/**
 * Main Client-Side Nova AI Companion Chat Engine
 */
export async function clientCompanionChat(message: string, context: any = {}): Promise<AIResponse> {
  const text = (message || '').trim();
  const lower = text.toLowerCase();
  const currentReel: Reel | undefined = context.currentReel;
  const lang = context.language || 'en';

  // 1. Math queries
  const mathAns = solveMath(text);
  if (mathAns) {
    return {
      success: true,
      reply: mathAns,
      languageAnalysis: { detectedLanguage: lang, sentiment: 'thoughtful', formality: 'casual' }
    };
  }

  // 2. Coding queries
  const codeAns = getCodeHelp(text);
  if (codeAns) {
    return {
      success: true,
      reply: codeAns,
      languageAnalysis: { detectedLanguage: lang, sentiment: 'thoughtful', formality: 'casual' }
    };
  }

  // 3. Creative writing
  const creativeAns = getCreativeWriting(text);
  if (creativeAns) {
    return {
      success: true,
      reply: creativeAns,
      languageAnalysis: { detectedLanguage: lang, sentiment: 'motivational', formality: 'casual' }
    };
  }

  const history: Array<{ sender?: string; role?: string; text: string }> = Array.isArray(context.history) ? context.history : [];

  // 4. Reel and creator queries
  if (lower.includes('who made') || lower.includes('creator') || lower.includes('who is the creator') || lower.includes('who posted')) {
    if (currentReel?.creator) {
      return {
        success: true,
        reply: `This reel was created by **${currentReel.creator.name}** (@${currentReel.creator.handle}), who is a ${currentReel.creator.bio || 'creator on Zynqo Social'}. You can find more of their content by exploring the ${currentReel.category || 'feed'} category!`,
        languageAnalysis: { detectedLanguage: lang, sentiment: 'thoughtful', formality: 'casual' }
      };
    }
  }

  if (lower.includes('this reel') || lower.includes('what is this') || lower.includes('explain') || lower.includes('summarize')) {
    if (currentReel) {
      const summary = currentReel.usefulOutputs?.notes?.summary || currentReel.description;
      const takeaway = currentReel.usefulOutputs?.notes?.keyTakeaway || 'Mastery comes from micro-actions repeated consistently.';
      return {
        success: true,
        reply: `**Breakdown of "${currentReel.title}"** 🎬\n\n${summary}\n\n💡 **Key Takeaway:** ${takeaway}\n\nWould you like me to generate a 2-question quiz or practical action tasks for this reel?`,
        languageAnalysis: { detectedLanguage: lang, sentiment: 'thoughtful', formality: 'casual' }
      };
    }
  }

  // Multi-turn acknowledgment in client engine
  if (history.length > 0 && /^(?:ok|okay|cool|got it|thanks|thank you|great|awesome|nice|sure|yep|yeah)\b/i.test(lower) && lower.length < 25) {
    return {
      success: true,
      reply: "Glad that helped! What would you like to explore next? Feel free to ask about this reel, request a quick quiz, or explore a new topic!",
      languageAnalysis: { detectedLanguage: lang, sentiment: 'positive', formality: 'casual' }
    };
  }

  // 5. Intent and Navigation commands
  if (lower.includes('relax') || lower.includes('calm') || lower.includes('stress')) {
    return {
      success: true,
      reply: `I hear you! Taking time to decompress is vital. I've tuned your feed to relaxing meditation and nature streams. Take a deep breath and enjoy! 🌿`,
      action: 'SWITCH_REEL',
      languageAnalysis: { detectedLanguage: lang, sentiment: 'motivational', formality: 'casual' }
    };
  }

  if (lower.includes('motivat') || lower.includes('inspire') || lower.includes('energy')) {
    return {
      success: true,
      reply: `Let's elevate that energy! 🚀 Remember: discipline beats motivation every single day. One focused hour today compounds into freedom tomorrow. What goal are we conquering today?`,
      languageAnalysis: { detectedLanguage: lang, sentiment: 'motivational', formality: 'casual' }
    };
  }

  if (lower.includes('garba') || lower.includes('navratri') || lower.includes('united way')) {
    return {
      success: true,
      reply: `Ae Halo! 🥁 The Navratri and Garba reels on Zynqo feature over 30,000 dancers in Vadodara with authentic traditional beats, Dodhiya steps, and festive energy! Let's groove! 💃✨`,
      languageAnalysis: { detectedLanguage: 'gu', slangDetected: ['Ae Halo', 'Garba'], sentiment: 'positive', formality: 'casual' }
    };
  }

  if (lower.includes('tmkoc') || lower.includes('jethalal') || lower.includes('comedy')) {
    return {
      success: true,
      reply: `Haha! Taarak Mehta Ka Ooltah Chashmah is pure nostalgia! "Chai piyo, biskoot khao!" ☕ Let me know if you want more hilarious comedy breakdowns in your feed!`,
      languageAnalysis: { detectedLanguage: 'hi', sentiment: 'positive', formality: 'casual' }
    };
  }

  // 6. General Conversational Fallback
  const replies = [
    `Hello! I'm Nova, your AI companion on Zynqo Social. Whether you want to learn from the current reel, test your knowledge with a quiz, explore creative scripts, or just chat, I'm here 24/7! What would you like to explore? ✨`,
    `That's an interesting thought! On Zynqo, we prioritize mindful entertainment and practical learning. How can I help you make the most of your session today? 🚀`,
    `I'm ready! Feel free to ask me to summarize any reel, generate study notes, write code, or explain any scientific concept in simple terms. 💡`
  ];

  const randomReply = replies[Math.floor(Math.random() * replies.length)];
  return {
    success: true,
    reply: randomReply,
    languageAnalysis: { detectedLanguage: lang, sentiment: 'positive', formality: 'casual' }
  };
}

/**
 * Client-Side Creator Studio Asset Generator
 */
export function clientGenerateCreatorAssets(topic: string, category: string, tone = 'gen_z') {
  const cleanTopic = topic || 'AI & Future Technology';
  return {
    success: true,
    hook: `Stop scrolling if you care about ${cleanTopic}! 🤯`,
    script: `1. Hook (0-3s): Most people get ${cleanTopic} completely wrong.\n2. Insight (3-15s): Here is the exact breakdown that changes the game.\n3. Takeaway (15-30s): Implement this in your routine and notice the compounding advantage!`,
    caption: `Everything you need to know about ${cleanTopic} in under 30 seconds. Drop your thoughts below! 👇 #Zynqo #Trending #${cleanTopic.replace(/\s+/g, '')} #ExplorePage`,
    hashtags: [`#${cleanTopic.replace(/\s+/g, '')}`, '#ZynqoSocial', '#ViralReels', '#NextGenAI', '#LearnEveryday'],
    coachFeedback: {
      predictedRetention: '89% (Viral Potential)',
      recommendedBPM: '115-125 BPM upbeat lo-fi',
      pacingTip: 'Start with visual contrast in the first 1.5 seconds to hook viewer attention.'
    }
  };
}

/**
 * Client-Side Text to Speech (Uses Browser SpeechSynthesis)
 */
export function clientSpeakText(text: string, lang = 'en-US'): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn('SpeechSynthesis notice:', e);
  }
}

/**
 * Client-Side Content Suggestions (Captions, Hashtags, Thumbnails)
 */
export function clientGenerateContentSuggestions(title: string, category: string, tone = 'gen_z') {
  const cleanTitle = title || 'Next-Gen AI & Tech';
  return {
    captions: [
      {
        id: 'cap-1',
        toneType: 'viral_hook',
        toneLabel: 'Viral Hook',
        text: `Stop scrolling! Here is the breakdown of ${cleanTitle} you didn't know you needed. 🚀✨`,
        badge: 'High CTR (94%)',
        recommendedFor: 'Broad Discovery'
      },
      {
        id: 'cap-2',
        toneType: 'educational',
        toneLabel: 'Educational & Practical',
        text: `Mastering ${cleanTitle}: 3 game-changing takeaways in 30 seconds. Drop a comment if this helped! 💡`,
        badge: 'High Retention',
        recommendedFor: 'Lifelong Learners'
      },
      {
        id: 'cap-3',
        toneType: 'thought_provoking',
        toneLabel: 'Thought-Provoking',
        text: `The future of ${cleanTitle} is already here. Are you adapting or falling behind? 👇`,
        badge: 'Discussion Starter',
        recommendedFor: 'Community Debate'
      }
    ],
    hashtags: {
      relevant: [`#${cleanTitle.replace(/\s+/g, '')}`, '#ZynqoSocial', '#ViralReels', '#NextGenAI'],
      niche: ['#DeepLearning', '#MindfulTech', '#DigitalCreator'],
      broad: ['#Trending', '#ExplorePage', '#ReelsInstagram', '#FYP'],
      regional: ['#ZynqoIndia', '#TechIndia', '#GujaratCreators']
    },
    thumbnails: [
      {
        id: 'th-1',
        frameType: 'action_moment',
        timestamp: '00:03',
        previewUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80',
        suggestedOverlayText: `THE TRUTH ABOUT ${cleanTitle.toUpperCase()}`,
        reason: 'Peak visual contrast in first 3 seconds'
      },
      {
        id: 'th-2',
        frameType: 'infographic',
        timestamp: '00:12',
        previewUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
        suggestedOverlayText: '3 STEPS TO MASTERY',
        reason: 'Clean high-readability title card'
      },
      {
        id: 'th-3',
        frameType: 'creator_reaction',
        timestamp: '00:24',
        previewUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80',
        suggestedOverlayText: 'DON’T MISS THIS ⚡',
        reason: 'High emotion face trigger'
      }
    ]
  };
}

/**
 * Structured Search Intent Representation
 */
export interface StructuredSearchIntent {
  rawQuery: string;
  normalizedQuery: string;
  category?: string;
  intent?: 'entertain' | 'teach' | 'achieve' | 'inspire' | 'relax' | 'all';
  mood?: 'energetic' | 'focus' | 'humorous' | 'curious' | 'chill' | 'excited' | 'calm' | 'creative' | 'all';
  keywords: string[];
  language?: string;
  maxDuration?: number;
  isNaturalLanguage: boolean;
  confidence: number;
  reasoning: string;
}

/**
 * Converts a raw user search query into a structured semantic search intent.
 * Understands conversational prompts, time limits, multi-lingual cues, and topic descriptors.
 */
export function parseClientSearchIntent(rawQuery: string): StructuredSearchIntent {
  const query = (rawQuery || '').trim();
  if (!query) {
    return {
      rawQuery: '',
      normalizedQuery: '',
      keywords: [],
      isNaturalLanguage: false,
      confidence: 0,
      reasoning: 'Empty search query.'
    };
  }

  const lower = query.toLowerCase();

  // 1. Detect conversational natural-language prefixes & fillers
  const conversationalRegex = /^(?:show\s+me|can\s+you\s+show\s+me|i\s+want\s+to\s+watch|i\s+want|i'm\s+looking\s+for|give\s+me|find\s+me|search\s+for|videos\s+of|reels\s+about|reels\s+of|something\s+about|something\s+for|display|play)\s+/i;
  const isConversational = conversationalRegex.test(query);

  let normalized = lower.replace(conversationalRegex, '').trim();
  // Strip non-essential fluff words for keyword extraction
  normalized = normalized.replace(/\b(?:please|videos?|reels?|shorts?|clips?|content)\b/gi, ' ').replace(/\s+/g, ' ').trim();

  // 2. Duration Extraction (e.g., "for 10 minutes", "5 mins", "quick 30 sec")
  let maxDuration: number | undefined;
  const durationMatch = lower.match(/(?:for\s+|in\s+)?(\d+)\s*(?:mins?|minutes?)/i);
  if (durationMatch) {
    maxDuration = parseInt(durationMatch[1], 10) * 60;
  } else {
    const secMatch = lower.match(/(\d+)\s*(?:secs?|seconds?)/i);
    if (secMatch) {
      maxDuration = parseInt(secMatch[1], 10);
    }
  }

  // 3. Category & Domain Intent Detection
  let category: string | undefined;
  let intent: StructuredSearchIntent['intent'];
  let mood: StructuredSearchIntent['mood'];
  const semanticKeywords: string[] = [];

  // Entertainment & Comedy / Humor (Check early so comedy requests are never misclassified)
  if (/\b(?:comedy|funny|humor|laugh|joke|memes?|hilarious|jethalal|bapuji|tmkoc|babita|iyer|gokuldham)\b/i.test(lower)) {
    category = 'Entertainment & Comedy';
    intent = 'entertain';
    mood = 'humorous';
    semanticKeywords.push('comedy', 'funny', 'humor', 'jethalal', 'bapuji', 'tmkoc', 'laugh', 'gokuldham');
  }

  // Travel & Adventure
  if (/\b(?:travel|travelling|journey|trip|mountains?|hills?|nature|explore|scenic|destination|sunrise|flight|airport|india)\b/i.test(lower)) {
    category = 'Travel & Adventure';
    semanticKeywords.push('travel', 'nature', 'mountains', 'hills', 'scenic', 'journey', 'explore');
    if (/\b(?:relax|relaxing|calm|peace|peaceful|soothing|chill)\b/i.test(lower)) {
      intent = 'relax';
      mood = 'chill';
      semanticKeywords.push('relaxing', 'peaceful', 'calm', 'chill');
    }
  }

  // Tech & AI
  if (/\b(?:ai|artificial\s+intelligence|tech|technology|code|coding|python|javascript|developer|software|robotics?|neural|engineer|programming|github)\b/i.test(lower)) {
    category = 'Tech & AI';
    intent = 'teach';
    mood = 'curious';
    semanticKeywords.push('ai', 'tech', 'software', 'engineer', 'developer', 'coding', 'neural');
  }

  // Food & Lifestyle / Cooking
  if (/\b(?:cook|cooking|recipe|food|kitchen|bake|espresso|coffee|delicious|eat|chef|dish|meal|breakfast|fails?)\b/i.test(lower)) {
    if (!category) {
      category = 'Food & Lifestyle';
      intent = 'entertain';
      mood = 'humorous';
    }
    semanticKeywords.push('cooking', 'food', 'kitchen', 'recipe', 'espresso', 'coffee');
    if (/\b(?:fails?|funny|laugh|hilarious)\b/i.test(lower)) {
      semanticKeywords.push('fail', 'funny', 'humor');
    }
  }

  // Culture & Dance (Garba, Folk, Navratri) - Only if dance/garba is specifically mentioned
  if (/\b(?:garba|navratri|dance|dancing|dodhiya|sanedo|titodo|dholida|raas|dandiya|vadodara|baroda|heritage)\b/i.test(lower)) {
    if (!category) {
      category = 'Culture & Dance';
      intent = 'entertain';
      mood = 'energetic';
    }
    semanticKeywords.push('garba', 'navratri', 'dance', 'culture', 'raas', 'dodhiya');
  }

  // Mindfulness & Mental Detox
  if (/\b(?:relax|relaxing|meditation|mindfulness|detox|calm|peaceful|breathing|zen|mental|slackline|stress)\b/i.test(lower)) {
    if (!category) {
      category = 'Mindfulness & Detox';
      intent = 'relax';
      mood = 'calm';
    }
    semanticKeywords.push('meditation', 'calm', 'peaceful', 'detox', 'mindfulness', 'relaxing');
  }

  // Fitness & Health
  if (/\b(?:fitness|workout|gym|exercise|training|health|muscle|activation|stretching)\b/i.test(lower)) {
    category = 'Fitness & Health';
    intent = 'achieve';
    mood = 'energetic';
    semanticKeywords.push('fitness', 'workout', 'exercise', 'training', 'health');
  }

  // Productivity & Growth / Study
  if (/\b(?:productivity|study|studying|focus|growth|career|habit|routine|learning|interesting|lesson)\b/i.test(lower)) {
    if (!category) {
      category = 'Productivity & Growth';
      intent = 'achieve';
      mood = 'focus';
    }
    semanticKeywords.push('productivity', 'study', 'growth', 'focus', 'learning');
  }

  // 4. Regional Language / Dialect Detection
  let detectedLang = 'en';
  if (/[\u0A80-\u0AFF]/.test(query) || /\b(?:gujarat|gujarati|garba|navratri|jethalal|sanedo|titodo|dodhiya|baka|jalso)\b/i.test(lower)) {
    detectedLang = 'gu';
    semanticKeywords.push('gujarat', 'gujarati');
  } else if (/[\u0900-\u097F]/.test(query) || /\b(?:deshi|desi|khud\s+se|jodhpur|sadhguru|apna|bhai)\b/i.test(lower)) {
    detectedLang = 'hi';
  }

  // 5. Raw Word Token Extraction (ignoring short stopwords)
  const stopwords = new Set(['the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'in', 'to', 'for', 'about', 'with', 'of', 'me', 'you', 'something', 'videos', 'reels', 'show']);
  const tokenWords = normalized
    .replace(/[^\w\s\u0A80-\u0AFF\u0900-\u097F]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 2 && !stopwords.has(w));

  const allKeywords = Array.from(new Set([...tokenWords, ...semanticKeywords]));
  const isNaturalLanguage = isConversational || allKeywords.length > 2 || Boolean(maxDuration) || Boolean(category);

  // Formulate explanatory reasoning for transparency
  const reasons: string[] = [];
  if (category) reasons.push(`Category: "${category}"`);
  if (intent) reasons.push(`Intent: ${intent}`);
  if (mood) reasons.push(`Mood: ${mood}`);
  if (detectedLang !== 'en') reasons.push(`Language: ${detectedLang.toUpperCase()}`);
  if (maxDuration) reasons.push(`Max Duration: ${Math.round(maxDuration / 60)}m`);
  const reasoning = reasons.length > 0 
    ? `Semantic intent parsed (${reasons.join(', ')}).` 
    : `Keyword search for: "${query}".`;

  return {
    rawQuery: query,
    normalizedQuery: normalized || query,
    category,
    intent,
    mood,
    keywords: allKeywords,
    language: detectedLang,
    maxDuration,
    isNaturalLanguage,
    confidence: isNaturalLanguage ? 0.92 : 0.75,
    reasoning
  };
}

/**
 * Filter & Rank Reels based on Structured Search Intent with graceful fallback
 */
export function rankReelsBySearchIntent(allReels: Reel[], query: string): { reels: Reel[]; intent: StructuredSearchIntent } {
  const trimmed = (query || '').trim();
  if (!trimmed) {
    return {
      reels: allReels,
      intent: {
        rawQuery: '',
        normalizedQuery: '',
        keywords: [],
        isNaturalLanguage: false,
        confidence: 0,
        reasoning: 'Empty query, returning all reels.'
      }
    };
  }

  const intent = parseClientSearchIntent(trimmed);
  const qLower = trimmed.toLowerCase();

  // Score each reel based on relevance to the interpreted intent
  const scored = allReels.map(reel => {
    let score = 0;
    const titleL = (reel.title || '').toLowerCase();
    const descL = (reel.description || '').toLowerCase();
    const catL = (reel.category || '').toLowerCase();
    const creatorL = ((reel.creator?.name || '') + ' ' + (reel.creator?.handle || '')).toLowerCase();
    const tagsL = (reel.goalTags || []).join(' ').toLowerCase();

    // 1. Direct raw query substring matches
    if (titleL.includes(qLower)) score += 60;
    if (descL.includes(qLower)) score += 35;
    if (catL.includes(qLower)) score += 40;
    if (creatorL.includes(qLower)) score += 40;

    // 2. Keyword relevance scoring
    for (const kw of intent.keywords) {
      const kwLower = kw.toLowerCase();
      if (titleL.includes(kwLower)) score += 25;
      if (descL.includes(kwLower)) score += 15;
      if (tagsL.includes(kwLower)) score += 20;
      if (catL.includes(kwLower)) score += 25;
      if (creatorL.includes(kwLower)) score += 20;
    }

    // 3. Category alignment with semantic intent
    if (intent.category && reel.category && reel.category.toLowerCase() === intent.category.toLowerCase()) {
      score += 45;
    }

    // 4. Intent & Mood alignment
    if (intent.intent && reel.intent && reel.intent === intent.intent) {
      score += 25;
    }
    if (intent.mood && reel.mood && reel.mood === intent.mood) {
      score += 20;
    }

    // 5. Regional Language & Culture Boost
    if (intent.language === 'gu') {
      if (tagsL.includes('gujarat') || titleL.includes('garba') || titleL.includes('jethalal') || catL.includes('culture')) {
        score += 35;
      }
    }

    // 6. Duration constraint validation
    if (intent.maxDuration && reel.duration) {
      if (reel.duration <= intent.maxDuration) {
        score += 15;
      }
    }

    return { reel, score };
  });

  // Filter reels with a positive relevance score
  const matches = scored.filter(item => item.score > 0);

  if (matches.length > 0) {
    matches.sort((a, b) => b.score - a.score);
    return {
      reels: matches.map(m => m.reel),
      intent
    };
  }

  // Fallback: Standard substring search across title & description
  const fallback = allReels.filter(r => {
    const t = (r.title || '').toLowerCase();
    const d = (r.description || '').toLowerCase();
    const c = (r.category || '').toLowerCase();
    return t.includes(qLower) || d.includes(qLower) || c.includes(qLower);
  });

  return {
    reels: fallback.length > 0 ? fallback : [],
    intent
  };
}

export interface MoodProfile {
  label: string;
  targetMoods: string[];
  targetIntents: string[];
  targetCategories: string[];
  keywords: string[];
}

export const MOOD_PROFILES: Record<string, MoodProfile> = {
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

/**
 * Re-sort and personalize reels feed according to the user's selected Current Mood.
 */
export function rankReelsByMood(allReels: Reel[], mood: string): Reel[] {
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

    // Tie-breaker to maintain stable ordering for identical scores
    const tieBreaker = (allReels.length - index) * 0.001;

    // Update whyAmISeeingThis metadata for transparent on-device AI explanation
    const personalizedReel: Reel = {
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


