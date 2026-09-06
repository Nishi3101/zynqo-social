/**
 * Advanced Multi-Language, Gen-Z Slang, Regional Dialect & Code-Switching Engine
 * Provides deep contextual understanding, intent decoding, and localized content generation.
 */

// 1. GEN-Z SLANG & INTERNET CULTURE LEXICON
export const GEN_Z_LEXICON = {
  // Superlatives / High Hype
  'fire': { meaning: 'exceptionally good, impressive, top-tier', intent: 'praise', sentiment: 'positive', domain: 'quality' },
  'bussin': { meaning: 'extremely good, delicious, or satisfying', intent: 'praise', sentiment: 'positive', domain: 'quality' },
  'ate': { meaning: 'performed or succeeded exceptionally well', intent: 'praise', sentiment: 'positive', domain: 'performance' },
  'slay': { meaning: 'did something wonderfully or looked stunning', intent: 'praise', sentiment: 'positive', domain: 'style' },
  'goated': { meaning: 'greatest of all time, unmatched', intent: 'praise', sentiment: 'positive', domain: 'excellence' },
  'peak': { meaning: 'the highest level of excellence', intent: 'praise', sentiment: 'positive', domain: 'excellence' },
  'w': { meaning: 'win, victory, great outcome', intent: 'praise', sentiment: 'positive', domain: 'outcome' },
  'valid': { meaning: 'justified, reasonable, acceptable', intent: 'agreement', sentiment: 'positive', domain: 'validation' },

  // Mediocrity / Critique
  'mid': { meaning: 'mediocre, average, underwhelming, not worth the hype', intent: 'critique', sentiment: 'negative', domain: 'evaluation' },
  'l': { meaning: 'loss, bad decision, failure', intent: 'critique', sentiment: 'negative', domain: 'outcome' },
  'cringe': { meaning: 'embarrassing or awkward to witness', intent: 'critique', sentiment: 'negative', domain: 'emotion' },
  'npc': { meaning: 'someone acting predictably or lacking original thought', intent: 'observation', sentiment: 'neutral', domain: 'behavior' },
  'sus': { meaning: 'suspicious, questionable, shady', intent: 'skepticism', sentiment: 'neutral', domain: 'trust' },

  // Authenticity / Sincerity
  'no cap': { meaning: 'no lie, completely factual and true', intent: 'emphasis', sentiment: 'positive', domain: 'truth' },
  'fr fr': { meaning: 'for real, for real; absolute truth and agreement', intent: 'emphasis', sentiment: 'positive', domain: 'agreement' },
  'ngl': { meaning: 'not gonna lie; candid confession', intent: 'candor', sentiment: 'neutral', domain: 'tone' },
  'deadass': { meaning: 'completely serious, truly without exaggeration', intent: 'emphasis', sentiment: 'neutral', domain: 'truth' },
  'facts': { meaning: 'irrefutable truth, strongly agreed', intent: 'agreement', sentiment: 'positive', domain: 'truth' },
  'cap': { meaning: 'a lie or exaggeration', intent: 'skepticism', sentiment: 'negative', domain: 'truth' },

  // Nuance / Degrees
  'lowkey': { meaning: 'subtly, secretly, to a mild extent', intent: 'nuance', sentiment: 'neutral', domain: 'intensity' },
  'highkey': { meaning: 'openly, boldly, intensely without hiding', intent: 'emphasis', sentiment: 'neutral', domain: 'intensity' },
  'it\'s giving': { meaning: 'radiating a specific vibe or energy', intent: 'comparison', sentiment: 'neutral', domain: 'aesthetic' },
  'vibe check': { meaning: 'evaluating the mood, energy, or emotional tone', intent: 'exploration', sentiment: 'neutral', domain: 'mood' },
  'delulu': { meaning: 'delusional with humorous optimism', intent: 'humor', sentiment: 'neutral', domain: 'mindset' },
  'rizz': { meaning: 'charisma, charm, ability to attract interest', intent: 'praise', sentiment: 'positive', domain: 'social' },
  'let him cook': { meaning: 'allow someone time and freedom to demonstrate their skill or idea', intent: 'support', sentiment: 'positive', domain: 'patience' },
  'caught in 4k': { meaning: 'caught in indisputable proof or video evidence', intent: 'observation', sentiment: 'neutral', domain: 'evidence' },
  'living rent free': { meaning: 'constantly occupying one\'s mind without effort', intent: 'obsession', sentiment: 'neutral', domain: 'psychology' },
  'main character energy': { meaning: 'behaving with confidence, charisma, and narrative significance', intent: 'empowerment', sentiment: 'positive', domain: 'persona' },
  'touch grass': { meaning: 'step away from the screen and reconnect with reality', intent: 'advice', sentiment: 'neutral', domain: 'wellbeing' },
  'pov': { meaning: 'point of view, immersive scenario perspective', intent: 'perspective', sentiment: 'neutral', domain: 'storytelling' },
  'bruh': { meaning: 'exclamation of disbelief, exasperation, or shock', intent: 'reaction', sentiment: 'neutral', domain: 'emotion' },
  'bet': { meaning: 'affirmative agreement, deal confirmed, challenge accepted', intent: 'confirmation', sentiment: 'positive', domain: 'action' }
};

// 2. REGIONAL DIALECT PROFILES & IDIOMS
export const REGIONAL_DIALECTS = {
  // GUJARATI REGIONAL DIALECTS
  'gu': {
    name: 'Gujarati',
    regions: {
      'ahmedabad': {
        name: 'Ahmedabad / Central Urban',
        keywords: ['baka', 'bhai', 'khabar che', 'jalso', 'bole to', 'ekdum crazy', 'scene thayi gayo', 'fatafat', 'bhav na khav', 'locha', 'tame', 'kem cho'],
        greeting: 'Kem chho Amdavad! Baka aa jo ekdum next-level che!',
        slangTerms: {
          'baka': 'friendly term for friend/buddy in Ahmedabad',
          'jalso': 'pure celebration, absolute enjoyment',
          'scene thayi gayo': 'something big or unexpected just went down',
          'fatafat': 'super fast, without delay',
          'bhav na khav': 'don\'t act pricey/arrogant',
          'locha': 'mess, confusion, or interesting complication'
        },
        toneStyle: 'Fast-paced, vibrant, modern urban Gujarati with witty humor'
      },
      'kathiawadi': {
        name: 'Saurashtra / Kathiawadi',
        keywords: ['halo ne', 'bhaibandh', 'moj', 'vat che', 'bapu', 'ramkadiyo', 'lila laher', 'dasto', 'ganda', 'diyo', 'horo', 'hori'],
        greeting: 'Ram Ram bapu! Halo ne, aavi moj biji kyay nathi!',
        slangTerms: {
          'moj': 'unmatched bliss, boundless satisfaction and happiness',
          'halo ne': 'come on, let\'s go right now',
          'vat che': 'it\'s prestigious, classy, top-tier pride',
          'bhaibandh': 'cherished brotherly companion/friend',
          'lila laher': 'life flourishing in supreme comfort and joy',
          'ramkadiyo': 'playful, witty character'
        },
        toneStyle: 'Warm, deeply hospitable, rhythmic, soulful, and hearty Kathiawadi charm'
      },
      'surat': {
        name: 'Surat / South Gujarat',
        keywords: ['chho', 'karyo chhe ke', 'khaa ne', 'pori', 'poro', 'jov ne', 'ghaas', 'bhamariyo', 'baju', 'hachu'],
        greeting: 'Kem chho Surti lala! Surti mijaaj saathe aa reel jov ne!',
        slangTerms: {
          'khaa ne': 'indulge, enjoy to the fullest',
          'pori / poro': 'girl / boy or buddy',
          'jov ne': 'look at this, pay attention',
          'hachu': 'truly, genuine fact',
          'bhamariyo': 'restless energetic character'
        },
        toneStyle: 'Laid-back, foodie-spirited, jovial Surti flair'
      },
      'mehsana': {
        name: 'North Gujarat / Mehsana',
        keywords: ['chhyo', 'cheyo', 'hetsho', 'kona ghare', 'gadi', 'bhaiyo', 'vaya', 'reva de'],
        greeting: 'Alley bhai, kem chhyo badha! Aa dhyan thi sambhaljo!',
        slangTerms: {
          'chhyo': 'are / where are you (North Gujarat phonetics)',
          'hetsho': 'will walk / let us go',
          'reva de': 'let it be, ignore it',
          'kona ghare': 'at whose place'
        },
        toneStyle: 'Direct, candid, earthy North Gujarat cadence'
      }
    }
  },

  // HINDI REGIONAL DIALECTS
  'hi': {
    name: 'Hindi',
    regions: {
      'bambaiya': {
        name: 'Mumbai / Bambaiya Tapori',
        keywords: ['bantai', 'bhidu', 'jhakaas', 'kya bolti public', 'vaat lag gayi', 'bole toh', 'khali peeli', 'lafda', 'apun'],
        greeting: 'Kya bolti public! Bantai, ye reel ekdum jhakaas hai!',
        slangTerms: {
          'jhakaas': 'superb, fabulous, first-class',
          'bantai': 'close friend, homie',
          'bhidu': 'pal, companion',
          'kya bolti public': 'what is the word on the street',
          'vaat lag gayi': 'got in serious trouble or huge challenge',
          'khali peeli': 'unnecessarily, for no reason'
        },
        toneStyle: 'Street-smart, cinematic Mumbai energy with punchy rhythm'
      },
      'delhi': {
        name: 'Delhi / NCR Urban',
        keywords: ['yaar', 'scene sort', 'chill scene', 'kalesh', 'jugaad', 'bawal', 'systum', 'gedi', 'sahi me'],
        greeting: 'Haan bhai kya scene! Ye check kar, ekdum bawal piece hai!',
        slangTerms: {
          'scene sort': 'everything is taken care of / fixed',
          'bawal': 'viral sensation, chaotic brilliance',
          'kalesh': 'drama, heated argument, intense confrontation',
          'jugaad': 'innovative hack or resourcefulness',
          'systum': 'commanding authority and viral clout'
        },
        toneStyle: 'Casual, confident, expressive North Indian urban cool'
      },
      'purvanchal': {
        name: 'UP / Purvanchal / Bihar',
        keywords: ['bhaiya', 'ka ho', 'garda', 'rangbazi', 'ekdum bawaal', 'chhati thoki ke', 'bujhe'],
        greeting: 'Ka ho bhaiya! Ee video dekh ke garda udd jai!',
        slangTerms: {
          'garda': 'creating an unforgettable storm of hype',
          'rangbazi': 'fearless swagger, charisma',
          'bujhe': 'did you comprehend / get it'
        },
        toneStyle: 'Bold, rhythmic, authentic folk swagger'
      }
    }
  },

  // TAMIL REGIONAL DIALECTS
  'ta': {
    name: 'Tamil',
    regions: {
      'chennai': {
        name: 'Chennai / Madras Gethu',
        keywords: ['machi', 'thala', 'macha', 'vera level', 'sema', 'gethu', 'alappara', 'mass', 'jolly', 'matter'],
        greeting: 'Vanakkam Chennai machi! Idhu vera level mass reel paathuko!',
        slangTerms: {
          'vera level': 'another tier of excellence, unmatched',
          'sema': 'awesome, superb, top notch',
          'machi': 'best friend, brother',
          'gethu': 'swagger, pride, prestige',
          'alappara': 'grand excitement, making huge noise'
        },
        toneStyle: 'High-energy, charismatic, mass entertainment vibe'
      }
    }
  },

  // TELUGU REGIONAL DIALECTS
  'te': {
    name: 'Telugu',
    regions: {
      'hyderabad': {
        name: 'Hyderabad / Telangana',
        keywords: ['mama', 'kirrak', 'keka', 'thop', 'bindaas', 'chicha', 'scene ledu', 'dookudu'],
        greeting: 'Em mama! Ee reel chudu, kirrak undi boss!',
        slangTerms: {
          'kirrak': 'mind-blowing, insane, super awesome',
          'thop': 'genius, master of the craft',
          'mama': 'bro, buddy, close mate',
          'keka': 'electrifying excitement'
        },
        toneStyle: 'Energetic, punchy, mass commercial cinema feel'
      }
    }
  },

  // MARATHI REGIONAL DIALECTS
  'mr': {
    name: 'Marathi',
    regions: {
      'mumbai_pune': {
        name: 'Mumbai / Pune Maharashtrian',
        keywords: ['bhava', 'lai bhari', 'kadak', 'vishey sampla', 'zhakkaas', 'jugaad', 'patla'],
        greeting: 'Kay bhava! He bagh, ekdum lai bhari ahe!',
        slangTerms: {
          'lai bhari': 'incredibly awesome, superb beyond words',
          'kadak': 'solid, punchy, sharp, top-tier',
          'vishey sampla': 'topic closed, ultimate conclusion reached',
          'bhava': 'brother, dear friend'
        },
        toneStyle: 'Proud, witty, expressive, authentic Maharashtrian energy'
      }
    }
  },

  // PUNJABI
  'pa': {
    name: 'Punjabi',
    regions: {
      'standard': {
        name: 'Punjab Majha / Malwa',
        keywords: ['att', 'sira', 'gedi', 'chak de', 'ghaint', 'kaint', 'balle', 'gabhru', 'wakhra'],
        greeting: 'Sat Sri Akal ji! Aa reel taan jama sira karti!',
        slangTerms: {
          'att / sira': 'absolute pinnacle of perfection, mindblowing',
          'ghaint': 'super cool, classy',
          'chak de': 'let\'s go, smash it'
        },
        toneStyle: 'Upbeat, celebratory, royal Punjabi power'
      }
    }
  },

  // BENGALI
  'bn': {
    name: 'Bengali',
    regions: {
      'kolkata': {
        name: 'Kolkata / Urban Bengal',
        keywords: ['fatafati', 'darun', 'babu', 'dosh', 'khela hobe', 'jhakkas', 'adda'],
        greeting: 'Ki khobor bondhu! Eita ekdom fatafati video!',
        slangTerms: {
          'fatafati': 'tremendously great, jaw-dropping',
          'darun': 'wonderful, magnificent',
          'adda': 'friendly conversational hangout'
        },
        toneStyle: 'Intellectual, artistic, vibrant Kolkata charm'
      }
    }
  },

  // MALAYALAM
  'ml': {
    name: 'Malayalam',
    regions: {
      'kerala': {
        name: 'Kerala Urban / Kochi',
        keywords: ['pwoli', 'poli', 'scene', 'mass', 'macha', 'kidilam'],
        greeting: 'Aliya kand nokk! Pwoli sanam aanu idh!',
        slangTerms: {
          'pwoli / kidilam': 'epic, extraordinary, superb',
          'aliya / macha': 'dude, best buddy'
        },
        toneStyle: 'Creative, crisp, modern Mollywood vibe'
      }
    }
  },

  // KANNADA
  'kn': {
    name: 'Kannada',
    regions: {
      'bengaluru': {
        name: 'Bengaluru / Karnataka',
        keywords: ['sakkath', 'chindi', 'macha', 'guru', 'bombat', 'tindi'],
        greeting: 'Namaskara guru! Ee reel sakkath agi ide!',
        slangTerms: {
          'sakkath': 'superb, mindblowing, fantastic',
          'chindi': 'torn up in excitement / ultimate high level',
          'guru': 'boss, mentor, buddy'
        },
        toneStyle: 'Tech-forward, lively, warm Bengaluru vibe'
      }
    }
  }
};

// 3. CODE-SWITCHING & MIXED LANGUAGE DETECTOR
export const CODE_SWITCHING_PATTERNS = [
  {
    type: 'gujrish',
    name: 'Gujrish (Gujarati + English)',
    regex: /\b(che|chhe|baka|nathi|su\s+che|shu\s+che|kem\s+cho|kem\s+che|tame|tamne|badha|joyu|karvanu|vaat\s+che|thayi|gayo|aaje|kyay|halo\s+ne|bhaibandh|moj\s+padi)\b/i,
    scriptRegex: /[\u0A80-\u0AFF]/,
    example: 'Bro aa reel ekdum fire che 😂'
  },
  {
    type: 'hinglish',
    name: 'Hinglish (Hindi + English)',
    regex: /\b(hai|hain|yeh|ye\s+reel|kya\s+bolti|bhai\s+ye|kalesh|bawal|systum|jhakaas|bantai|bhidu|bole\s+toh|raha\s+hai|rahi\s+hai|dekh|karo|accha|sahi\s+me)\b/i,
    scriptRegex: /[\u0900-\u097F]/,
    example: 'Bhai ye reel lowkey crazy hai'
  },
  {
    type: 'tanglish',
    name: 'Tanglish (Tamil + English)',
    regex: /\b(machi|thala|irukku|enna|paatha|sema|vera\s+level|pannu|podu|gethu|alappara)\b/i,
    scriptRegex: /[\u0B80-\u0BFF]/,
    example: 'Machi vera level reel idhu sema mass'
  },
  {
    type: 'telugish',
    name: 'Telugish (Telugu + English)',
    regex: /\b(mama|undi|kadu|chudu|bagundi|cheppu|ekkada|ela|kirrak|keka|thop)\b/i,
    scriptRegex: /[\u0C00-\u0C7F]/,
    example: 'Mama ee reel super undi'
  },
  {
    type: 'marathlish',
    name: 'Marathlish (Marathi + English)',
    regex: /\b(bhava|ahe|nahi|bagh|kay|kasa|vishey|lai\s+bhari|kadak)\b/i,
    scriptRegex: /[\u0900-\u097F]/,
    example: 'Bhava he ekdum kadak video ahe'
  }
];

// 4. EMOJI CONTEXT INTERPRETER
export const EMOJI_LEXICON = {
  '🔥': { meaning: 'hype, trending, phenomenal quality', intent: 'enthusiasm' },
  '💀': { meaning: 'dying of laughter, absurd, hilarious', intent: 'humor' },
  '😭': { meaning: 'overwhelmed with emotion or laughter', intent: 'emotional' },
  '🧢': { meaning: 'capping, lying, fake claim', intent: 'skepticism' },
  '🐐': { meaning: 'GOAT, all-time greatest', intent: 'praise' },
  '🫡': { meaning: 'respect, salute, acknowledging mastery', intent: 'respect' },
  '☕': { meaning: 'tea, gossip, truth being served', intent: 'observation' },
  '🗿': { meaning: 'chad, stoic, based, unflinching', intent: 'respect' },
  '🤡': { meaning: 'clowning, foolishness, foolish behavior', intent: 'critique' },
  '🤌': { meaning: 'chef\'s kiss, exquisite perfection', intent: 'admiration' }
};

/**
 * Core Language & Slang Analyzer: Parses natural user input into deep semantic components
 */
export function analyzeLanguage(text = '', userContext = {}) {
  const clean = text.trim();
  const lower = clean.toLowerCase();

  const detectedSlangs = [];
  let detectedIntent = 'general_inquiry';
  let primaryLanguage = userContext.preferredLang || 'en';
  let detectedDialect = userContext.preferredDialect || 'standard';
  let isCodeMixed = false;
  let codeMixedType = null;
  let detectedStyle = userContext.preferredTone || 'casual';
  let sentimentScore = 0; // -1 to 1

  // 1. Scan for Gen-Z slang tokens
  for (const [slang, data] of Object.entries(GEN_Z_LEXICON)) {
    const wordBoundary = new RegExp(`(^|[^a-zA-Z0-9])${slang}([^a-zA-Z0-9]|$)`, 'i');
    if (wordBoundary.test(lower)) {
      detectedSlangs.push({ term: slang, ...data });
      if (data.sentiment === 'positive') sentimentScore += 0.3;
      if (data.sentiment === 'negative') sentimentScore -= 0.3;
      if (data.intent === 'praise') detectedIntent = 'positive_feedback';
      if (data.intent === 'critique') detectedIntent = 'critical_feedback';
    }
  }

  // 2. Scan for Emojis
  const detectedEmojis = [];
  for (const [emoji, meta] of Object.entries(EMOJI_LEXICON)) {
    if (clean.includes(emoji)) {
      detectedEmojis.push({ emoji, ...meta });
    }
  }

  // 3. Detect Code-Switching (Gujrish, Hinglish, Tanglish, etc.)
  for (const pattern of CODE_SWITCHING_PATTERNS) {
    if (pattern.regex.test(lower) || pattern.scriptRegex.test(clean)) {
      isCodeMixed = true;
      codeMixedType = pattern.type;
      if (pattern.type === 'gujrish') primaryLanguage = 'gu';
      else if (pattern.type === 'hinglish') primaryLanguage = 'hi';
      else if (pattern.type === 'tanglish') primaryLanguage = 'ta';
      else if (pattern.type === 'telugish') primaryLanguage = 'te';
      else if (pattern.type === 'marathlish') primaryLanguage = 'mr';
      break;
    }
  }

  // 4. Detect Specific Regional Dialect (Ahmedabad, Kathiawadi, Bambaiya, Delhi, etc.)
  const langConfig = REGIONAL_DIALECTS[primaryLanguage];
  if (langConfig && langConfig.regions) {
    for (const [regId, regData] of Object.entries(langConfig.regions)) {
      for (const kw of regData.keywords) {
        if (lower.includes(kw.toLowerCase())) {
          detectedDialect = regId;
          break;
        }
      }
    }
  }

  // Determine overall tone / style
  if (detectedSlangs.length > 0) {
    detectedStyle = 'gen_z';
  } else if (isCodeMixed) {
    detectedStyle = 'mixed_language';
  } else if (detectedDialect !== 'standard') {
    detectedStyle = 'regional';
  }

  // Build normalized semantic representation
  const normalizedMeaning = generateNormalizedMeaning(clean, detectedSlangs, detectedDialect, isCodeMixed);

  return {
    rawInput: clean,
    primaryLanguage,
    detectedDialect,
    isCodeMixed,
    codeMixedType,
    detectedStyle,
    detectedSlangs,
    detectedEmojis,
    detectedIntent,
    sentiment: sentimentScore > 0 ? 'positive' : sentimentScore < 0 ? 'negative' : 'neutral',
    normalizedMeaning
  };
}

/**
 * Translates slang/code-mixed phrases to clear semantic meaning without stripping cultural nuance
 */
function generateNormalizedMeaning(input, slangs, dialect, isCodeMixed) {
  let explanation = input;

  if (slangs.length > 0) {
    const slangExplanations = slangs.map(s => `"${s.term}" (${s.meaning})`).join(', ');
    explanation += ` [Gen-Z Meaning: ${slangExplanations}]`;
  }

  if (dialect && dialect !== 'standard') {
    explanation += ` [Dialect Context: ${dialect} regional flavor]`;
  }

  if (isCodeMixed) {
    explanation += ` [Code-Switching: Multi-language blend]`;
  }

  return explanation;
}

/**
 * Generates viral creator assets (Hooks, 60s Script, Captions, Hashtags)
 * with authentic Regional Language, Dialect, Gen-Z Slang, and Code-Switching.
 */
export function generateRegionalCreatorAssets(topic = '', language = 'en', regionalStyle = 'standard', tone = 'gen_z') {
  const cleanTopic = topic || 'How AI Agents Actually Think';

  // 1. GUJARATI (Ahmedabad, Kathiawadi, Surat, Mehsana, Standard)
  if (language === 'gu') {
    if (regionalStyle === 'kathiawadi') {
      return {
        topic: cleanTopic,
        language: 'Gujarati (Kathiawadi / Saurashtra)',
        tone: 'Kathiawadi Moj & High Energy',
        hooks: [
          { type: 'Kathiawadi Moj Hook', hook: `Halo ne bapu! ${cleanTopic} vishe aavi vat tame kyay nai sambhali hoy, ekdum moj padi jaashe:`, score: 98 },
          { type: 'Direct Challenge', hook: `Diyo bapu dhyan! 99% bhaibandho ${cleanTopic} ma locho kare che, sacho rasto aa rahyo:`, score: 95 },
          { type: 'Pride & Value', hook: `Ramkadiyo nathi aa! ${cleanTopic} no ek niyam sikhvano che, pachi vat che jalso j jalso:`, score: 96 }
        ],
        script: {
          totalDuration: '55 seconds',
          segments: [
            { timestamp: '0:00 - 0:05', visual: '[Bold Saurashtra Aesthetic] Dynamic zoom on presenter with vibrant amber title', audio: `Ram Ram bapu! Aa ${cleanTopic} no vishay tame samajhta hoy to theek, baki aaje sachi vat thashe!` },
            { timestamp: '0:05 - 0:20', visual: '[Visual Hook] Kinetic Kathiawadi typography and quick cuts', audio: `Ghanay bhaibandho ghani mahenat kare che, pan ahiya jugad nathi chalto, system chalave che.` },
            { timestamp: '0:20 - 0:40', visual: '[Step-by-step breakdown] 3-step modern graphic with clean icons', audio: `Pehlu kam: Dasto sidho rakho. Biju: Roz na 5 minute aapo. Triju: Moj ma rehine satat kam karo!` },
            { timestamp: '0:40 - 0:55', visual: '[Friendly CTA with smile] Presenter pointing to save button', audio: `Halo ne have, fatafat save kari lyo ane tamara bhaibandh ne share karo, vat che!` }
          ]
        },
        captions: `Bapu ${cleanTopic} ma aavi vat tame kyay nai joyi hoy! Ekdum moj aavi jaashe. Tamarun su vichar che? Comments ma kaho bapu! 👇🔥`,
        hashtags: [`#${cleanTopic.replace(/[^a-zA-Z0-9]/g, '')}`, '#KathiawadiMoj', '#SaurashtraVibes', '#GujaratiReels', '#ZynqoSocial', '#GujaratiCreator']
      };
    }

    if (regionalStyle === 'ahmedabad' || tone === 'gen_z') {
      return {
        topic: cleanTopic,
        language: 'Gujarati (Amdavadi Gen-Z / Gujrish)',
        tone: 'Urban Gen-Z Gujrish',
        hooks: [
          { type: 'Amdavadi Gen-Z Hook', hook: `Baka aa reel miss na karto! ${cleanTopic} no scene ekdum fire che no cap fr:`, score: 99 },
          { type: 'Viral Curiosity', hook: `99% Amdavadis think they know ${cleanTopic}, pan locha ahiya thay che:`, score: 94 },
          { type: 'Relatable Slang', hook: `Scene thayi gayo boss! ${cleanTopic} sikhi lidhu to lifestyle ekdum sorted che:`, score: 97 }
        ],
        script: {
          totalDuration: '50 seconds',
          segments: [
            { timestamp: '0:00 - 0:05', visual: '[Fast Pop Hook] Smartphone POV with kinetic text overlay', audio: `Baka listen up! ${cleanTopic} no scene badha mate confusing che, pan aaje 45 seconds ma decode કરીએ!` },
            { timestamp: '0:05 - 0:20', visual: '[Problem Framing] Fast-paced split screen showing the everyday struggle', audio: `Tame hours spend karo pan output mid aave che. Why? Cause smart workflow missing che baka!` },
            { timestamp: '0:20 - 0:38', visual: '[Clean 3-Point Action] Minimal glassmorphism card animation', audio: `Step 1: Simplify everything. Step 2: Everyday consistent practice. Step 3: Zynqo Social tools thi automate karo.` },
            { timestamp: '0:38 - 0:50', visual: '[Signature Amdavadi Witty CTA]', audio: `Jalso karo ane fatafat bookmark karo so tame bhuli na jav. Drop a 🔥 if this helped!` }
          ]
        },
        captions: `Bro ${cleanTopic} no funda ekdum crystal clear che! Amdavad style ma 50 seconds ma samjavu che. Bookmark karo fatafat! ⚡🚀`,
        hashtags: [`#${cleanTopic.replace(/[^a-zA-Z0-9]/g, '')}`, '#AmdavadiVibes', '#GujrishReels', '#GenZGujarati', '#ZynqoSocial', '#Amdavad']
      };
    }

    // Standard Gujarati
    return {
      topic: cleanTopic,
      language: 'Gujarati (Standard)',
      tone: 'Informative & Engaging',
      hooks: [
        { type: 'Knowledge Hook', hook: `${cleanTopic} વિશે આ 3 બાબતો દરેક વ્યક્તિએ જાણવી જોઈએ:`, score: 94 },
        { type: 'Direct Value', hook: `જો તમે ${cleanTopic} માં સફળ થવા માંગો છો, તો આ વીડિયો ચોક્કસ જુઓ:`, score: 92 },
        { type: 'Curiosity', hook: `${cleanTopic} ની સાચી પદ્ધતિ શું છે? 60 સેકન્ડમાં જાણો:`, score: 95 }
      ],
      script: {
        totalDuration: '55 seconds',
        segments: [
          { timestamp: '0:00 - 0:05', visual: '[Presenter Hook] Clear title text with elegant typography', audio: `નમસ્તે મિત્રો! આજે આપણે ${cleanTopic} ની સાચી પદ્ધતિ સરળ શબ્દોમાં સમજીશું.` },
          { timestamp: '0:05 - 0:20', visual: '[Visual problem explanation]', audio: `મોટાભાગના લોકો શરૂઆત તો કરે છે પણ યોગ્ય માર્ગદર્શન વિના સમય વેડફે છે.` },
          { timestamp: '0:20 - 0:40', visual: '[Step-by-step points on screen]', audio: `ત્રણ મહત્વના સિદ્ધાંતો: નિયમિતતા, વ્યવહારુ અભ્યાસ અને યોગ્ય સાધનોનો ઉપયોગ.` },
          { timestamp: '0:40 - 0:55', visual: '[Friendly Call to Action]', audio: `આ ઉપયોગી માહિતી સેવ કરો અને તમારા મિત્રો સાથે શેર કરો.` }
        ]
      },
      captions: `${cleanTopic} અંગેની મહત્વપૂર્ણ માહિતી અને વ્યવહારુ માર્ગદર્શન. લાઈક અને શેર કરો! 📚✨`,
      hashtags: [`#${cleanTopic.replace(/[^a-zA-Z0-9]/g, '')}`, '#GujaratiEducation', '#KnowledgeReels', '#ZynqoSocial']
    };
  }

  // 2. HINDI (Bambaiya, Delhi NCR, Purvanchal, Hinglish, Standard)
  if (language === 'hi') {
    if (regionalStyle === 'bambaiya') {
      return {
        topic: cleanTopic,
        language: 'Hindi (Bambaiya / Mumbai Slang)',
        tone: 'Tapori Swagger & Fast Pace',
        hooks: [
          { type: 'Bambaiya Hook', hook: `Kya bolti public! Bantai ${cleanTopic} ka aisa secret batayega ki dimaag hil jayega:`, score: 98 },
          { type: 'Street Logic', hook: `Khali peeli time waste mat kar bhidu! ${cleanTopic} ka asli scene ye hai:`, score: 94 },
          { type: 'Bole Toh Mass', hook: `Bole toh ekdum jhakaas! ${cleanTopic} seekh liya na, toh life me full vaat khatam:`, score: 96 }
        ],
        script: {
          totalDuration: '50 seconds',
          segments: [
            { timestamp: '0:00 - 0:05', visual: '[Mumbai Street Mood] Kinetic Mumbai typography with snappy zoom', audio: `Apun ka namaskar Mumbai! Bantai, ${cleanTopic} ko leke public ka dimaag confuse hai!` },
            { timestamp: '0:05 - 0:20', visual: '[Fast cuts with sound effects]', audio: `Sab idhar udhar bhatak rahe hain. Apan 40 second me seedha mudde pe aate hain.` },
            { timestamp: '0:20 - 0:38', visual: '[3 Punchy tips with bold yellow borders]', audio: `Pehla rule: Overthink nahi mangta. Dusra: Roz 10 minute dede. Teesra: Smart execution, full power!` },
            { timestamp: '0:38 - 0:50', visual: '[Thumbs up with swagger gesture]', audio: `Samajh gaya na bhidu? Reel ko abhi save kar lene ka aur public me share maarne ka!` }
          ]
        },
        captions: `Bantai ${cleanTopic} ka pura game sort kar diya 50 second me! Kya bolti public, comment me batao! 🔥⚡`,
        hashtags: [`#${cleanTopic.replace(/[^a-zA-Z0-9]/g, '')}`, '#BambaiyaVibes', '#MumbaiSlang', '#JhakaasReels', '#ZynqoSocial']
      };
    }

    if (regionalStyle === 'delhi' || tone === 'gen_z') {
      return {
        topic: cleanTopic,
        language: 'Hindi (Delhi Urban / Hinglish Gen-Z)',
        tone: 'Delhi NCR Gen-Z Slang',
        hooks: [
          { type: 'Delhi Vibe Hook', hook: `Bhai scene check kar! ${cleanTopic} ka concept lowkey mind-blowing hai fr fr:`, score: 99 },
          { type: 'No Cap Hook', hook: `No cap bro, 99% log ${cleanTopic} bilkul galat samajh rahe hain:`, score: 96 },
          { type: 'High Energy', hook: `Ekdum bawal piece hai yaar! ${cleanTopic} seekh liya to game sort ho jayega:`, score: 95 }
        ],
        script: {
          totalDuration: '52 seconds',
          segments: [
            { timestamp: '0:00 - 0:05', visual: '[High-octane Gen-Z aesthetic] Crisp cuts and dynamic captions', audio: `Haan bhai kya scene! ${cleanTopic} ko leke itna kalesh kyu hai internet pe? Let\'s break it down!` },
            { timestamp: '0:05 - 0:20', visual: '[Meme insert + fast illustration]', audio: `Log mid advice follow kar rahe hain bro. You don\'t need 10 hours a day, you just need leverage!` },
            { timestamp: '0:20 - 0:40', visual: '[3 clean neon badges displaying the strategy]', audio: `Step 1: Strip the friction. Step 2: 2-minute rule lagao. Step 3: Consistency over motivation.` },
            { timestamp: '0:40 - 0:52', visual: '[Presenter confident smile + subtle bookmark animation]', audio: `Simple hai na boss? Hit save right now so you don\'t lose it, and share with your squad!` }
          ]
        },
        captions: `Bro ${cleanTopic} is actually lowkey fire if you understand this framework! No cap, save it now! 🚀🔥`,
        hashtags: [`#${cleanTopic.replace(/[^a-zA-Z0-9]/g, '')}`, '#DelhiVibes', '#HinglishGenZ', '#NoCap', '#ZynqoSocial']
      };
    }

    // Standard Hindi
    return {
      topic: cleanTopic,
      language: 'Hindi (Standard)',
      tone: 'Professional & Educational',
      hooks: [
        { type: 'Clarity Hook', hook: `${cleanTopic} को 60 सेकंड में आसानी से समझें:`, score: 94 },
        { type: 'Practical Value', hook: `अगर आप ${cleanTopic} में महारत हासिल करना चाहते हैं, तो यह नियम याद रखें:`, score: 93 },
        { type: 'Intrigue', hook: `${cleanTopic} के पीछे का असली विज्ञान क्या है? जानिए यहाँ:`, score: 95 }
      ],
      script: {
        totalDuration: '55 seconds',
        segments: [
          { timestamp: '0:00 - 0:05', visual: '[Presenter with polished background]', audio: `नमस्ते दोस्तों! आज हम ${cleanTopic} के महत्वपूर्ण पहलुओं को गहराई से समझेंगे.` },
          { timestamp: '0:05 - 0:20', visual: '[Concept breakdown animation]', audio: `अक्सर हम जटिल सिद्धांतों में उलझ जाते हैं, जबकि शुरुआत हमेशा सरल चरणों से होती है.` },
          { timestamp: '0:20 - 0:40', visual: '[3-step strategy cards]', audio: `पहला नियम: आधारभूत ज्ञान. दूसरा नियम: निरंतर अभ्यास. तीसरा नियम: सही तकनीक.` },
          { timestamp: '0:40 - 0:55', visual: '[Save prompt]', audio: `इस उपयोगी जानकारी को अभी सेव करें और अपने सुझाव कमेंट्स में बताएं.` }
        ]
      },
      captions: `${cleanTopic} पर आधारित व्यावहारिक सुझाव और महत्वपूर्ण जानकारी। लाइक और शेयर करें! 💡✨`,
      hashtags: [`#${cleanTopic.replace(/[^a-zA-Z0-9]/g, '')}`, '#HindiKnowledge', '#EducationalReels', '#ZynqoSocial']
    };
  }

  // 3. TAMIL (Chennai Mass / Tanglish)
  if (language === 'ta') {
    return {
      topic: cleanTopic,
      language: 'Tamil (Chennai / Tanglish)',
      tone: 'Mass Entertainment & Punchy',
      hooks: [
        { type: 'Chennai Mass Hook', hook: `Machi vera level! ${cleanTopic} pathi indha secret therinja shock aagiduveenga:`, score: 98 },
        { type: 'Gethu Hook', hook: `Thala idhu sema mass content! ${cleanTopic} la 90% per pannum thappu idhudhaan:`, score: 95 }
      ],
      script: {
        totalDuration: '50 seconds',
        segments: [
          { timestamp: '0:00 - 0:05', visual: '[High contrast cinematic text]', audio: `Vanakkam machi! ${cleanTopic} pathi aayiram per pesalaam, aana unmaiyaana trick idhudhaan!` },
          { timestamp: '0:05 - 0:20', visual: '[Fast pace visual interrupt]', audio: `Tension aagaama 40 seconds la mudicharlaam, gavanama paarunga.` },
          { timestamp: '0:20 - 0:40', visual: '[3 kinetic cards in Tamil and English]', audio: `Step 1: Daily 5 mins habit. Step 2: Eliminate distractions. Step 3: Track progress smart-ah.` },
          { timestamp: '0:40 - 0:50', visual: '[Friendly thumbs up]', audio: `Sema la? Ippove save panni unga friends-ku anupunga machi!` }
        ]
      },
      captions: `Machi ${cleanTopic} pathi vera level explanation! Sema useful-ah irukkum, save pannikonga! 🔥✨`,
      hashtags: [`#${cleanTopic.replace(/[^a-zA-Z0-9]/g, '')}`, '#TanglishReels', '#ChennaiGethu', '#TamilTech', '#ZynqoSocial']
    };
  }

  // 4. TELUGU (Hyderabad / Kirrak)
  if (language === 'te') {
    return {
      topic: cleanTopic,
      language: 'Telugu (Hyderabad Kirrak)',
      tone: 'Energetic & Punchy',
      hooks: [
        { type: 'Kirrak Hook', hook: `Em mama! ${cleanTopic} gurinchi ee vishayam telisthe mind pothundi anthe:`, score: 97 },
        { type: 'Thop Logic', hook: `Boss idi keka! ${cleanTopic} lo thop avvali ante ee okka secret chalu:`, score: 95 }
      ],
      script: {
        totalDuration: '50 seconds',
        segments: [
          { timestamp: '0:00 - 0:05', visual: '[Punchy Hyderabad style dynamic title]', audio: `Namaskaram mama! ${cleanTopic} gurinchi internet lo chala sodhi untadi, but idi pure gold!` },
          { timestamp: '0:05 - 0:20', visual: '[Snappy visual transition]', audio: `Time waste cheyakunda direct point ki vacheddam.` },
          { timestamp: '0:20 - 0:40', visual: '[3 key actionable takeaways in bold]', audio: `Point 1: Start small. Point 2: Repeat consistently. Point 3: Track feedback.` },
          { timestamp: '0:40 - 0:50', visual: '[Save icon flash]', audio: `Kirrak undi kada? Ventane save cheskondi, mana friends ki share cheyandi!` }
        ]
      },
      captions: `Mama ${cleanTopic} gurinchi kirrak video! Idi miss avvakandi, ventane bookmark cheskondi! 🚀🔥`,
      hashtags: [`#${cleanTopic.replace(/[^a-zA-Z0-9]/g, '')}`, '#TeluguReels', '#KirrakContent', '#HyderabadVibes', '#ZynqoSocial']
    };
  }

  // 5. MARATHI (Lai Bhari)
  if (language === 'mr') {
    return {
      topic: cleanTopic,
      language: 'Marathi (Lai Bhari)',
      tone: 'Proud & Punchy Maharashtrian',
      hooks: [
        { type: 'Lai Bhari Hook', hook: `Kay bhava! ${cleanTopic} baddal hi gost aikun doke thandak hoil, ekdum kadak:`, score: 97 },
        { type: 'Vishey Sampla Hook', hook: `Vishey sampla bhava! ${cleanTopic} sathi hi trick vapara, result 10x milnar:`, score: 96 }
      ],
      script: {
        totalDuration: '50 seconds',
        segments: [
          { timestamp: '0:00 - 0:05', visual: '[Bold saffron-emerald tone typography]', audio: `Namaskar bhava! ${cleanTopic} sathi ha video pure mahiti deun jaeel!` },
          { timestamp: '0:05 - 0:20', visual: '[Snappy motion graphic]', audio: `Baki sagle bolat rahtat, pan aapan seedha practical karun dakhvu.` },
          { timestamp: '0:20 - 0:40', visual: '[3 clean actionable points]', audio: `Pahili gosht: Rojana 10 minute. Dusri: Focus clear theva. Tisri: Satat prayatna kara.` },
          { timestamp: '0:40 - 0:50', visual: '[Save & follow prompt]', audio: `Lai bhari vatla na? Mag lavkar save kara aani bhava sobat share kara!` }
        ]
      },
      captions: `Bhava ${cleanTopic} ekdum lai bhari padhatine samjavla ahe! Save karun theva! 🚩🔥`,
      hashtags: [`#${cleanTopic.replace(/[^a-zA-Z0-9]/g, '')}`, '#MarathiReels', '#LaiBhari', '#Maharashtra', '#ZynqoSocial']
    };
  }

  // 6. ENGLISH (Gen-Z, Internet Slang Native)
  return {
    topic: cleanTopic,
    language: 'English (Gen-Z & Internet Native)',
    tone: 'Gen-Z Internet Culture',
    hooks: [
      { type: 'Curiosity & No Cap', hook: `No cap fr fr, 99% of people are approaching ${cleanTopic} completely backwards:`, score: 99 },
      { type: 'Aesthetic / POV', hook: `POV: You finally unlocked the high-leverage cheat code for ${cleanTopic} in 2026:`, score: 96 },
      { type: 'Contrarian', hook: `Stop doing ${cleanTopic} like an NPC. Science just proved this lowkey method ate:`, score: 97 }
    ],
    script: {
      totalDuration: '52 seconds',
      segments: [
        { timestamp: '0:00 - 0:05', visual: '[Fast Zoom POV] Bold neon subtitle with glitch pattern interrupt', audio: `Okay listen, most advice on ${cleanTopic} is straight up mid. Let me put you on.` },
        { timestamp: '0:05 - 0:20', visual: '[B-roll split showing burnout vs smart flow]', audio: `You spend hours burnt out trying to brute-force it, when high-performers are lowkey using systems instead.` },
        { timestamp: '0:20 - 0:40', visual: '[3 floating 3D cards highlighting the cheat code]', audio: `Rule 1: Eliminate start friction. Rule 2: Anchor to existing dopamine triggers. Rule 3: Leverage intelligent AI feedback loops.` },
        { timestamp: '0:40 - 0:52', visual: '[Presenter looking straight into camera with subtle save prompt]', audio: `Hit save right now so you don't lose this framework, and drop your thoughts in the comments. We talk back!` }
      ]
    },
    captions: `No cap, ${cleanTopic} is completely lowkey when you stop doing it the old way. Tap save so you don't forget this! What's your take? 👇🔥`,
    hashtags: [`#${cleanTopic.replace(/[^a-zA-Z0-9]/g, '')}`, '#GenZVibes', '#NoCap', '#AestheticProductivity', '#ZynqoSocial', '#ViralReels']
  };
}

// --------------------------------------------------------------------------
// 7. CONTENT SUGGESTION ENGINE (REELS, VIDEOS & POSTS)
// --------------------------------------------------------------------------

// Category visual palettes and sample frame previews
const CATEGORY_VISUALS = {
  'Tech & AI': [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80'
  ],
  'Productivity': [
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&auto=format&fit=crop&q=80'
  ],
  'Health & Fitness': [
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80'
  ],
  'Finance': [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&auto=format&fit=crop&q=80'
  ],
  'Science & Space': [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80'
  ],
  'Default': [
    'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80'
  ]
};

/**
 * Extract clean topic and target context from inputs
 */
function resolveTopicContext(title = '', description = '', userPrompt = '', category = '') {
  let primary = (title || userPrompt || description || category || 'Content').trim();
  // Strip out prefix phrases if present
  primary = primary
    .replace(/^(give me a|generate a|write a|create a|suggest a|help me with)\s+/i, '')
    .replace(/(caption|post|video|reel|hashtags|for college students|for creators)\b/gi, '')
    .trim();
  if (primary.length < 3) primary = title || category || 'Trending Topic';
  return primary;
}

/**
 * Generates 4-5 distinct caption options
 */
export function generateCaptionSuggestions({
  contentType = 'reel',
  title = '',
  description = '',
  category = 'Tech & AI',
  userPrompt = '',
  language = 'en',
  dialect = 'standard',
  tone = 'auto',
  audience = 'general'
}) {
  const topic = resolveTopicContext(title, description, userPrompt, category);
  const langKey = (language === 'auto' || !language) ? 'en' : language.toLowerCase();
  const regDialect = (dialect || 'standard').toLowerCase();
  const audLabel = audience !== 'general' ? `for ${audience}` : '';

  // 1. GUJARATI CAPTIONS (With regional dialect nuance: Saurashtra/Kathiawadi, Ahmedabad, Surat, etc.)
  if (langKey === 'gu') {
    if (regDialect === 'kathiawadi') {
      return [
        {
          id: 'c1',
          toneType: 'short',
          toneLabel: 'Short & Catchy (Kathiawadi)',
          text: `Moj ma raho! ${topic} baddal aa vaat dhyan ma rakhva jevi che ⚡️`,
          badge: 'Punchy',
          recommendedFor: 'Quick engagement & saves'
        },
        {
          id: 'c2',
          toneType: 'gen_z',
          toneLabel: 'Gen-Z Viral (Saurashtra Vibe)',
          text: `Bhaibandh no cap, ${topic} thi life ma moj padi gayi fr fr! Aa trick miss na karta bapu, save kari lyo fatafat 🔥✨`,
          badge: 'Viral Hook',
          recommendedFor: 'High shareability among youth'
        },
        {
          id: 'c3',
          toneType: 'professional',
          toneLabel: 'Insightful & Practical',
          text: `Kathiawadi style ma direct vaat: Jyare tamaro focus clear hoy tyare ${topic} ma 10x result aave. Save this framework for your journey 📈`,
          badge: 'High Value',
          recommendedFor: 'Credibility & bookmarks'
        },
        {
          id: 'c4',
          toneType: 'storytelling',
          toneLabel: 'Storytelling / Relatable',
          text: `Kevali vaat kahu bapu! Pehla mane laagtu ke ${topic} bau aghru che, pan jyaare samjyo tyare ramkadiyo bani gayo! Dosto saathe share karo 👇`,
          badge: 'Story Flow',
          recommendedFor: 'Comments and discussion'
        },
        {
          id: 'c5',
          toneType: 'funny',
          toneLabel: 'Funny / Engaging',
          text: `Lila laher! Ek baju mobile nu scrolling ane biji baju ${topic} ni moj! 😂 Kaik navu sikhva malyu hoy to follow karjo!`,
          badge: 'Relatable Humor',
          recommendedFor: 'Comment section boost'
        }
      ];
    } else if (regDialect === 'surat') {
      return [
        {
          id: 'c1',
          toneType: 'short',
          toneLabel: 'Short & Crisp (Surti)',
          text: `Surti lala, aa ${topic} jov ne ekdum zordaar che ⚡️`,
          badge: 'Punchy',
          recommendedFor: 'Fast feeds'
        },
        {
          id: 'c2',
          toneType: 'gen_z',
          toneLabel: 'Gen-Z Surti Vibe',
          text: `Hachu kahu to ${topic} no scene super fire che! Pori-poro badha dhyan thi jov ne save kari lyo 🔥👌`,
          badge: 'Viral Hook',
          recommendedFor: 'Youth audience'
        },
        {
          id: 'c3',
          toneType: 'professional',
          toneLabel: 'Practical & Smart',
          text: `Surat ni vyapar budhdhi saathe: ${topic} ne logically samjo ane daily routine ma apply karo. Results guaranteed 📈`,
          badge: 'Strategic',
          recommendedFor: 'Professionals'
        },
        {
          id: 'c4',
          toneType: 'storytelling',
          toneLabel: 'Relatable Story',
          text: `Khaa ne! Aaje ${topic} vishe aatlu clear explanation mali gayu ke have bija koi video ni jarur nathi 👇`,
          badge: 'Engaging',
          recommendedFor: 'Saves'
        },
        {
          id: 'c5',
          toneType: 'funny',
          toneLabel: 'Light & Witty',
          text: `Locha jalebi khata khata aa ${topic} seekhi lo, tame pan khush ane tamaru future pan khush! 😂✨`,
          badge: 'Humor',
          recommendedFor: 'Shares'
        }
      ];
    } else {
      // Ahmedabad / Standard Gujarati
      return [
        {
          id: 'c1',
          toneType: 'short',
          toneLabel: 'Short & Catchy (Amdavadi)',
          text: `Baka, aa miss na karta! ${topic} mate ekdum solid tip ⚡️`,
          badge: 'Punchy',
          recommendedFor: 'High engagement'
        },
        {
          id: 'c2',
          toneType: 'gen_z',
          toneLabel: 'Gen-Z Viral (Gujrish)',
          text: `Amdavad public, scene thayi gayo! ${topic} lowkey fire che fr fr 🔥 Tap save before you forget!`,
          badge: 'Viral Hook',
          recommendedFor: 'Gen-Z & College students'
        },
        {
          id: 'c3',
          toneType: 'professional',
          toneLabel: 'Professional / Insightful',
          text: `Smart work over hard work. Kem ke ${topic} ma consistency j tamne aagal lai jaay che 📈 Bookmark this!`,
          badge: 'Valuable',
          recommendedFor: 'Creators & Professionals'
        },
        {
          id: 'c4',
          toneType: 'storytelling',
          toneLabel: 'Storytelling / Relatable',
          text: `Bhai sachhi vaat kahu to pehla hu pan confuse hato, pan ${topic} nu aa simple system understand karya pachi badhu easy bani gayu 👇`,
          badge: 'Relatable',
          recommendedFor: 'Community building'
        },
        {
          id: 'c5',
          toneType: 'funny',
          toneLabel: 'Funny / Engaging',
          text: `Bhav na khav baka! ${topic} sikhva ma kai nava juni nathi, like kari do fatafat! 😂✌️`,
          badge: 'Humor',
          recommendedFor: 'Fun viral reach'
        }
      ];
    }
  }

  // 2. HINDI CAPTIONS (With Bambaiya, Delhi, or Standard Hinglish)
  if (langKey === 'hi') {
    if (regDialect === 'mumbai') {
      return [
        {
          id: 'c1',
          toneType: 'short',
          toneLabel: 'Short & Crisp (Bambaiya)',
          text: `Bole toh ekdum jhakaas! ${topic} pe direct baat, no bakwaas ⚡️`,
          badge: 'Crisp',
          recommendedFor: 'Snappy reels'
        },
        {
          id: 'c2',
          toneType: 'gen_z',
          toneLabel: 'Gen-Z Viral (Mumbai)',
          text: `Bantai no cap, ye ${topic} scene lowkey fire hai fr fr! Jaldi save kar lo before it blows up 🔥`,
          badge: 'Viral',
          recommendedFor: 'Youth & trends'
        },
        {
          id: 'c3',
          toneType: 'professional',
          toneLabel: 'Sharp & Actionable',
          text: `Jab strategy solid ho toh execution mein time waste nahi hota. ${topic} ka practical breakdown 📈`,
          badge: 'Insight',
          recommendedFor: 'Career & tech'
        },
        {
          id: 'c4',
          toneType: 'storytelling',
          toneLabel: 'Relatable Journey',
          text: `Bhai sach bolun toh pehle mujhe bhi lagta tha bohot complicated hai, par ab scene poora sort hai 👇`,
          badge: 'Story',
          recommendedFor: 'High watchtime'
        },
        {
          id: 'c5',
          toneType: 'funny',
          toneLabel: 'Bambaiya Humor',
          text: `Dimag ka dahi mat karo, ye video dekho aur dost ko share karke hero bano! 😂🙌`,
          badge: 'Humor',
          recommendedFor: 'Shares'
        }
      ];
    } else {
      // Delhi / Standard Hinglish
      return [
        {
          id: 'c1',
          toneType: 'short',
          toneLabel: 'Short & Punchy (Hinglish)',
          text: `Scene sort hai! ${topic} ke baare mein ye ek cheez dhyan mein rakhna ⚡️`,
          badge: 'Punchy',
          recommendedFor: 'Quick saves'
        },
        {
          id: 'c2',
          toneType: 'gen_z',
          toneLabel: 'Gen-Z Viral (Dilli Style)',
          text: `No cap fr fr, ${topic} literally ate! Ye framework miss kiya toh bohot pachtaoge 💀🔥 Save it now!`,
          badge: 'Viral Hook',
          recommendedFor: 'College & creators'
        },
        {
          id: 'c3',
          toneType: 'professional',
          toneLabel: 'Professional & Strategic',
          text: `Smart creators don't work harder, they build systems. Here is the framework for ${topic} 📈`,
          badge: 'Insight',
          recommendedFor: 'LinkedIn/Zynqo feed'
        },
        {
          id: 'c4',
          toneType: 'storytelling',
          toneLabel: 'Storytelling / Relatable',
          text: `3 mahine pehle mujhe ${topic} ka A-B-C bhi nahi pata tha. Aaj results bolte hain. Read this 👇`,
          badge: 'Relatable',
          recommendedFor: 'Longer videos/posts'
        },
        {
          id: 'c5',
          toneType: 'funny',
          toneLabel: 'Funny / Chill',
          text: `Bhai kalesh se bachna hai aur ${topic} master karna hai toh chupchap save kar lo! 😂💯`,
          badge: 'Humor',
          recommendedFor: 'High engagement'
        }
      ];
    }
  }

  // 3. ENGLISH CAPTIONS (Gen-Z, Aesthetic, Creator & Pro)
  const isVideo = contentType === 'video';
  const isPost = contentType === 'post';

  return [
    {
      id: 'c1',
      toneType: 'short',
      toneLabel: 'Short & Punchy',
      text: isPost
        ? `Less noise, more signal. The core truth about ${topic} ⚡️`
        : `Stop overcomplicating ${topic}. Here's the 1 thing that actually matters ⚡️`,
      badge: 'Punchy',
      recommendedFor: 'High CTR & Quick Reads'
    },
    {
      id: 'c2',
      toneType: 'gen_z',
      toneLabel: 'Gen-Z Viral',
      text: `No cap fr fr, ${topic} lowkey living rent-free in my mind 💀🔥 If you're not doing this in 2026 you're sleeping! Tap save!`,
      badge: 'Viral Hook',
      recommendedFor: 'Algorithmic Reach & Saves'
    },
    {
      id: 'c3',
      toneType: 'professional',
      toneLabel: 'Professional / Insightful',
      text: isVideo
        ? `Complete breakdown: Why ${topic} is becoming the defining differentiator in 2026. Key takeaways and actionable blueprint inside 📈`
        : `Actionable insight: Consistency + deliberate architecture always beats brute force. 3 high-ROI rules for ${topic} 👇`,
      badge: 'High Value',
      recommendedFor: 'Industry Professionals & Creators'
    },
    {
      id: 'c4',
      toneType: 'storytelling',
      toneLabel: 'Storytelling / Relatable',
      text: `I spent months failing at ${topic} before realizing 90% of conventional advice was backwards. Here is what actually worked when everything else failed 👇`,
      badge: 'Story Hook',
      recommendedFor: 'Comments, Shares & Discussions'
    },
    {
      id: 'c5',
      toneType: 'funny',
      toneLabel: 'Funny / Engaging',
      text: `My last 2 brain cells debating whether to master ${topic} vs scrolling reels till 3 AM 😭 Drop a ❤️ if you feel called out!`,
      badge: 'Relatable Humor',
      recommendedFor: 'High Comment Density'
    }
  ];
}

/**
 * Generates categorized hashtags: Relevant, Niche, Broad, Regional
 */
export function generateHashtagSuggestions({
  topic = '',
  category = 'Tech & AI',
  language = 'en',
  dialect = 'standard',
  contentType = 'reel'
}) {
  const cleanTopic = topic.replace(/[^a-zA-Z0-9]/g, '');
  const cleanCat = category.replace(/[^a-zA-Z0-9]/g, '');
  const langKey = (language || 'en').toLowerCase();
  const regDialect = (dialect || 'standard').toLowerCase();

  // 1. Relevant (Directly content-bound)
  const relevant = [
    `#${cleanTopic || 'ZynqoSocial'}`,
    `#${cleanCat || 'Content'}`,
    `#${cleanTopic}Tips`,
    `#${cleanTopic}Guide`,
    `#${cleanCat}Daily`
  ].filter((v, i, a) => a.indexOf(v) === i);

  // 2. Niche (Specific subtopics & frameworks)
  const nicheMap = {
    'Tech & AI': ['#GenAI', '#MachineLearning', '#FullStackDev', '#CodeNewbie', '#TechHacks'],
    'Productivity': ['#DeepWork', '#AtomicHabits', '#TimeManagement', '#FocusSystem', '#ProductiveLife'],
    'Health & Fitness': ['#FitnessGoals', '#CleanEating', '#GymMotivation', '#MobilityTraining', '#MindBody'],
    'Finance': ['#WealthBuilding', '#PersonalFinance', '#FinancialFreedom', '#InvestingTips', '#MoneyMindset'],
    'Science & Space': ['#Astrophysics', '#FutureTech', '#ScienceFacts', '#Cosmos', '#Quantum']
  };
  const niche = nicheMap[category] || ['#CreatorTips', '#GrowthMindset', '#SkillBuilding', '#BehindTheScenes'];

  // 3. Broad (High-reach general community tags)
  const broad = [
    '#ZynqoSocial',
    '#TrendingNow',
    '#ExplorePage',
    contentType === 'reel' ? '#ReelsOfInstagram' : (contentType === 'video' ? '#LongFormContent' : '#InstaPost'),
    '#ViralVideos',
    '#ContentCreator'
  ];

  // 4. Regional (Language & regional dialect tags)
  let regional = ['#DesiCreators', '#IndiaTrending', '#IndianCreators'];
  if (langKey === 'gu') {
    if (regDialect === 'kathiawadi') {
      regional = ['#KathiawadiMoj', '#SaurashtraVibes', '#GujaratiReels', '#RajkotCreators', '#GujjuGang', '#BapuNiMoj'];
    } else if (regDialect === 'surat') {
      regional = ['#SurtiMijaaj', '#SuratCity', '#GujaratiContent', '#SurtiPori', '#GujjuSwag'];
    } else {
      regional = ['#AmdavadDiaries', '#GujaratiCreators', '#GujaratiReels', '#Amdavadi', '#GujjuCulture'];
    }
  } else if (langKey === 'hi') {
    if (regDialect === 'mumbai') {
      regional = ['#BambaiyaVibes', '#AamchiMumbai', '#MumbaiCreators', '#BantaiPublic', '#HinglishReels'];
    } else {
      regional = ['#DelhiVibes', '#DilliMeriJaan', '#HinglishContent', '#HindiCreators', '#DesiContent'];
    }
  } else if (langKey === 'mr') {
    regional = ['#MarathiReels', '#LaiBhari', '#Maharashtra', '#PuneCreators', '#MarathiMan'];
  } else if (langKey === 'ta') {
    regional = ['#TamilReels', '#TanglishContent', '#ChennaiGethu', '#TamilCreators', '#KollywoodVibes'];
  } else if (langKey === 'te') {
    regional = ['#TeluguReels', '#HyderabadVibes', '#KirrakContent', '#TeluguCreators'];
  }

  return {
    relevant,
    niche,
    broad,
    regional
  };
}

/**
 * Generates thumbnail & frame suggestions for Reels and Videos
 */
export function generateThumbnailSuggestions({
  title = '',
  category = 'Tech & AI',
  contentType = 'reel',
  userPrompt = '',
  language = 'en'
}) {
  const topic = resolveTopicContext(title, '', userPrompt, category);
  const visuals = CATEGORY_VISUALS[category] || CATEGORY_VISUALS['Default'];

  // Craft high-CTR punchy overlay texts based on content and language
  const overlayTexts = language === 'gu'
    ? [
        `3 ${topic} Hacks ⚡️`,
        `ભૂલ ના કરતા! 🛑`,
        `10x Moj Result 🚀`,
        `Step-by-Step Trick 💡`
      ]
    : language === 'hi'
    ? [
        `3 ${topic} Secrets 🔥`,
        `Ye Galti Mat Karna! 🛑`,
        `10x Result Formula 🚀`,
        `Step-by-Step Trick 💡`
      ]
    : [
        `3 ${topic} Hacks ⚡️`,
        `Stop Doing This! 🛑`,
        `10x Result Blueprint 🚀`,
        `The Only Guide You Need 💡`
      ];

  return [
    {
      id: 'f1',
      frameType: 'High-Impact Hook Frame',
      timestamp: '0:01',
      previewUrl: visuals[0],
      suggestedOverlayText: overlayTexts[0],
      reason: 'Crisp subject alignment with high visual contrast stops scrolling in under 1.5 seconds.'
    },
    {
      id: 'f2',
      frameType: 'Curiosity Cliffhanger Frame',
      timestamp: '0:05',
      previewUrl: visuals[1],
      suggestedOverlayText: overlayTexts[1],
      reason: 'Creates an immediate psychological open loop that compels viewers to tap and watch.'
    },
    {
      id: 'f3',
      frameType: 'Action / Cheat-Code Frame',
      timestamp: '0:18',
      previewUrl: visuals[2],
      suggestedOverlayText: overlayTexts[2],
      reason: 'Displays tangible practical value, signaling actionable takeaways and high save rates.'
    },
    {
      id: 'f4',
      frameType: 'Reaction / Result Frame',
      timestamp: '0:34',
      previewUrl: visuals[3],
      suggestedOverlayText: overlayTexts[3],
      reason: 'Demonstrates immediate transformation and relatable human emotion for strong CTR.'
    }
  ];
}

/**
 * Modifies an existing caption according to a user instruction
 */
export function modifyCaptionWithAI({ caption = '', instruction = '', language = 'en', dialect = 'standard' }) {
  if (!caption) return caption;
  const cleanInst = (instruction || '').toLowerCase();

  // Shorter / Punchier
  if (cleanInst.includes('short') || cleanInst.includes('punch') || cleanInst.includes('crisp')) {
    const parts = caption.split(/[.!?\n]/).filter(p => p.trim().length > 0);
    return `${parts[0] ? parts[0].trim() : caption.slice(0, 70)} ⚡️ Bookmark this!`;
  }

  // Add Emojis
  if (cleanInst.includes('emoji')) {
    return `🔥✨ ${caption} 🚀💯 Tap save! 👇🙌`;
  }

  // More Gen-Z / Slang
  if (cleanInst.includes('gen-z') || cleanInst.includes('slang') || cleanInst.includes('viral')) {
    return `No cap fr fr, ${caption} It's giving main character energy 💀 Tap save right now!`;
  }

  // Gujarati Kathiawadi conversion
  if (cleanInst.includes('gujarati') || cleanInst.includes('kathiawadi') || cleanInst.includes('saurashtra')) {
    return `Bhaibandh moj ma raho! ${caption} Ramkadiyo bani jaaso, aa vaat dhyan ma rakhva jevi che bapu! 🔥✨`;
  }

  // Hindi Bambaiya conversion
  if (cleanInst.includes('mumbai') || cleanInst.includes('hindi') || cleanInst.includes('bambaiya')) {
    return `Bole toh ekdum jhakaas! ${caption} Bantai public fatafat bookmark thok do! 🚀💯`;
  }

  // Professional / Polished
  if (cleanInst.includes('pro') || cleanInst.includes('formal') || cleanInst.includes('serious')) {
    return `Executive Takeaway: ${caption.replace(/[💀🔥😂]/g, '')} High-leverage systems generate compounding upside over time.`;
  }

  // Generic fallback modification
  return `${caption} (Refined: ${instruction}) ✨`;
}

/**
 * Main unified Content Suggestion Entrypoint
 */
export function generateContentSuggestions({
  contentType = 'reel',
  title = '',
  description = '',
  category = 'Tech & AI',
  userPrompt = '',
  language = 'en',
  dialect = 'standard',
  tone = 'auto',
  audience = 'general'
}) {
  const topic = resolveTopicContext(title, description, userPrompt, category);

  // 1. Captions
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

  // 2. Hashtags
  const hashtags = generateHashtagSuggestions({
    topic,
    category,
    language,
    dialect,
    contentType
  });

  // 3. Thumbnails (only for reels & videos)
  const thumbnails = (contentType === 'reel' || contentType === 'video')
    ? generateThumbnailSuggestions({
        title: topic,
        category,
        contentType,
        userPrompt,
        language
      })
    : [];

  return {
    contentType,
    topic,
    category,
    language,
    dialect,
    tone,
    audience,
    captions,
    hashtags,
    thumbnails
  };
}
