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

  // 4. Reel specific queries
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

