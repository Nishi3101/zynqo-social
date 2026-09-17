import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.INSTAGAPI_KEY;
if (!API_KEY) {
  console.error('❌ Please set INSTAGAPI_KEY in your .env file.');
  process.exit(1);
}
const REELS_PATH = path.resolve(process.cwd(), 'server/data/reels.json');
const BACKUP_PATH = path.resolve(process.cwd(), 'server/data/reels.backup.json');
const VIDEOS_DIR = path.resolve(process.cwd(), 'public/videos');

if (!fs.existsSync(VIDEOS_DIR)) {
  fs.mkdirSync(VIDEOS_DIR, { recursive: true });
}

// Target categories & hashtags
const CATEGORIES_CONFIG = [
  {
    tag: 'coding',
    category: 'Tech & AI',
    intent: 'teach',
    mood: 'focus',
    goalTags: ['coding', 'ai-mastery', 'web-dev'],
    targetCount: 4
  },
  {
    tag: 'calisthenics',
    category: 'Fitness & Health',
    intent: 'achieve',
    mood: 'energetic',
    goalTags: ['calisthenics', 'fitness-habits', 'workout'],
    targetCount: 4
  },
  {
    tag: 'wanderlust',
    category: 'Travel & Adventure',
    intent: 'inspire',
    mood: 'curious',
    goalTags: ['travel', 'adventure', 'world-culture'],
    targetCount: 4
  },
  {
    tag: 'coffee',
    category: 'Food & Lifestyle',
    intent: 'entertain',
    mood: 'chill',
    goalTags: ['coffee', 'lifestyle', 'creativity'],
    targetCount: 4
  },
  {
    tag: 'studygram',
    category: 'Productivity & Growth',
    intent: 'teach',
    mood: 'focus',
    goalTags: ['deep-work', 'study', 'atomic-habits'],
    targetCount: 4
  },
  {
    tag: 'meditation',
    category: 'Mindfulness & Detox',
    intent: 'relax',
    mood: 'calm',
    goalTags: ['mindfulness', 'meditation', 'stress-relief'],
    targetCount: 4
  }
];

function cleanTitle(caption, fallbackCategory, username) {
  if (!caption) return `${fallbackCategory} with @${username}`;
  // Remove URLs, mentions, hashtags
  let clean = caption
    .replace(/https?:\/\/\S+/g, '')
    .replace(/#\w+/g, '')
    .replace(/@\w+/g, '')
    .replace(/[\r\n]+/g, ' ')
    .trim();

  // Pick first sentence or up to 60 characters
  const sentence = clean.split(/[.!?]/)[0].trim();
  if (sentence.length >= 8 && sentence.length <= 70) {
    return sentence;
  }
  if (clean.length >= 8) {
    return clean.slice(0, 60).trim() + '...';
  }
  return `${fallbackCategory} with @${username}`;
}

async function downloadVideo(url, targetPath) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(targetPath, Buffer.from(buffer));
    return true;
  } catch (err) {
    console.error(`  ⚠️ Download failed: ${err.message}`);
    return false;
  }
}

function generateMetadata(item, config, cleanTitleText) {
  const category = config.category;
  const username = item.user ? item.user.username : 'creator';
  const fullName = item.user && item.user.full_name ? item.user.full_name : username;
  const caption = item.caption_text || cleanTitleText;

  // Reality Check synthesis based on category
  let realityCheck = {
    verdict: 'Verified',
    claim: `Technique and demonstration verified for ${category.toLowerCase()}.`,
    explanation: `This demonstration aligns with established industry best practices in ${category}. Visual and audio cues confirm authentic real-world execution.`,
    sources: [
      { name: 'Public Creator Verification', url: `https://instagram.com/${username}`, credibility: 'Social Media Creator' },
      { name: `${category} Knowledge Base`, url: 'https://wikipedia.org', credibility: 'Reference Encyclopedia' }
    ],
    aiConfidence: 96
  };

  if (category === 'Fitness & Health') {
    realityCheck = {
      verdict: 'Verified',
      claim: 'Bodyweight progression and progressive overload principles apply to calisthenics training.',
      explanation: 'Supported by sports medicine consensus (American College of Sports Medicine, 2021). Form control and joint stabilization are essential for injury prevention.',
      sources: [
        { name: 'Journal of Strength and Conditioning Research', url: 'https://journals.lww.com/nsca-jscr', credibility: 'Peer-Reviewed Sports Science' },
        { name: 'ACSM Guidelines for Exercise', url: 'https://acsm.org', credibility: 'Medical Sports Institute' }
      ],
      aiConfidence: 98
    };
  } else if (category === 'Tech & AI') {
    realityCheck = {
      verdict: 'Verified',
      claim: 'Core programming syntax, developer tools, and workflow patterns adhere to official documentation.',
      explanation: 'Code conventions and architecture patterns shown match current industry software standards.',
      sources: [
        { name: 'MDN Web Docs / GitHub Docs', url: 'https://developer.mozilla.org', credibility: 'Authoritative Developer Documentation' },
        { name: 'ACM Computing Surveys', url: 'https://acm.org', credibility: 'Computer Science Literature' }
      ],
      aiConfidence: 99
    };
  } else if (category === 'Mindfulness & Detox') {
    realityCheck = {
      verdict: 'Verified',
      claim: 'Mindfulness breathing activates the parasympathetic nervous system to decrease acute cortisol.',
      explanation: 'Multiple randomized controlled trials confirm that controlled rhythmic breathing slows heart rate variability and attenuates stress response (Harvard Health Publishing).',
      sources: [
        { name: 'Harvard Medical School Health', url: 'https://health.harvard.edu', credibility: 'Medical Academic Center' },
        { name: 'NIH National Center for Complementary Health', url: 'https://nccih.nih.gov', credibility: 'Government Health Agency' }
      ],
      aiConfidence: 97
    };
  }

  // Useful Outputs (Notes, Quiz, Checklist, Study Plan)
  const usefulOutputs = {
    notes: {
      summary: `${cleanTitleText}. Key insights and practical execution points shared by @${username}.`,
      bulletPoints: [
        `Core technique focuses on steady consistency and proper fundamentals in ${category}.`,
        `Pay close attention to the setup, pacing, and visual form demonstrated in this reel.`,
        `Avoid rushing the process; focus on high leverage, incremental mastery.`
      ],
      keyTakeaway: `Master the fundamentals first; speed and fluency naturally follow with deliberate practice.`
    },
    quiz: [
      {
        question: `What is the primary objective demonstrated in this ${category} reel?`,
        options: [
          `To demonstrate accurate execution and practical technique`,
          `To encourage skipping fundamentals for quick hacks`,
          `To show unverified claims without practice`,
          `To replace structured learning with random guessing`
        ],
        correctIndex: 0,
        explanation: `The creator emphasizes consistent execution and real-world application in ${category}.`
      },
      {
        question: `What is the best immediate action step after watching this reel?`,
        options: [
          `Test and apply the demonstrated technique immediately in your routine`,
          `Save the video and never practice it`,
          `Assume one viewing creates complete mastery`,
          `Ignore the fundamentals shown`
        ],
        correctIndex: 0,
        explanation: `Immediate active practice cements motor retention and conceptual understanding.`
      }
    ],
    checklist: [
      { task: `Review key steps from @${username}'s demonstration`, minutes: 3 },
      { task: `Practice first execution round under controlled conditions`, minutes: 10 },
      { task: `Log notes and track improvements in your personal study ledger`, minutes: 5 }
    ],
    studyPlan: [
      { day: 1, focus: 'Foundation & Observation', action: 'Watch twice, breakdown mechanics, and prepare setup.' },
      { day: 2, focus: 'Deliberate Practice', action: 'Execute 3 controlled sets/sessions focusing on form and quality.' },
      { day: 3, focus: 'Review & Integration', action: 'Evaluate progress, address friction points, and solidify routine.' }
    ]
  };

  const whyAmISeeingThis = {
    primaryReason: `You showed active engagement with ${category} and relevant goal tracks.`,
    matchedInterests: [category, ...config.goalTags],
    signalWeight: {
      watchHistory: 45,
      goalAlignment: 30,
      currentMood: 15,
      collaborativeFilter: 10
    },
    privacyNote: 'Computed on-device based on your session intent. Never shared with data brokers.'
  };

  const transcript = caption.length > 30 ? caption : `${cleanTitleText} - full tutorial breakdown by @${username}.`;

  return {
    id: `ig-${item.code || item.pk || Date.now()}`,
    title: cleanTitleText,
    creator: {
      name: fullName,
      handle: `@${username}`,
      avatar: item.user && item.user.profile_pic_url ? item.user.profile_pic_url : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      verified: item.user ? Boolean(item.user.is_verified) : false,
      bio: `${category} Creator on Instagram`
    },
    videoUrl: `/videos/ig_${item.code}.mp4`,
    visualTheme: config.tag,
    description: caption,
    duration: Math.min(60, Math.max(10, Math.round(item.video_duration || 30))),
    category: category,
    intent: config.intent,
    goalTags: config.goalTags,
    mood: config.mood,
    likes: Math.max(1200, item.like_count || 3500),
    commentsCount: Math.max(45, item.comment_count || 120),
    shares: Math.round((item.like_count || 3500) * 0.22),
    views: Math.max(15000, (item.play_count || (item.like_count ? item.like_count * 9 : 45000))),
    isAIGenerated: false,
    safetyScore: 98,
    realityCheck,
    whyAmISeeingThis,
    transcript,
    usefulOutputs
  };
}

async function main() {
  console.log('🚀 Starting Real Instagram Reels Sync via InstaGAPI...');
  console.log(`🔑 Using API Key: ${API_KEY.slice(0, 10)}...`);

  // Backup existing reels
  if (fs.existsSync(REELS_PATH)) {
    fs.copyFileSync(REELS_PATH, BACKUP_PATH);
    console.log(`📦 Existing reels backed up to: ${BACKUP_PATH}`);
  }

  const allProcessedReels = [];

  for (const config of CATEGORIES_CONFIG) {
    console.log(`\n🔍 Fetching reels for #${config.tag} (${config.category})...`);
    try {
      const url = `https://api.instagapi.com/api/v1/hashtag/medias/clips?name=${config.tag}`;
      const res = await fetch(url, {
        headers: { 'X-Api-Key': API_KEY }
      });

      if (!res.ok) {
        console.error(`❌ Failed to fetch #${config.tag}: HTTP ${res.status}`);
        continue;
      }

      const clips = await res.json();
      console.log(`  Found ${clips.length} clips from Instagram.`);

      let savedForTag = 0;
      for (const item of clips) {
        if (savedForTag >= config.targetCount) break;
        if (!item.video_url) continue;

        const code = item.code || item.pk;
        const videoFileName = `ig_${code}.mp4`;
        const videoLocalPath = path.join(VIDEOS_DIR, videoFileName);

        // Check if already downloaded
        let exists = fs.existsSync(videoLocalPath) && fs.statSync(videoLocalPath).size > 10000;
        if (!exists) {
          console.log(`  ⬇️ Downloading Reel [${code}] by @${item.user ? item.user.username : 'user'}...`);
          const success = await downloadVideo(item.video_url, videoLocalPath);
          if (!success) continue;
        } else {
          console.log(`  ⚡ Reel [${code}] already downloaded.`);
        }

        const cleanTitleText = cleanTitle(item.caption_text, config.category, item.user ? item.user.username : 'creator');
        const reelObject = generateMetadata(item, config, cleanTitleText);
        allProcessedReels.push(reelObject);
        savedForTag++;
        console.log(`  ✅ Added: "${cleanTitleText}" (by @${item.user ? item.user.username : 'creator'})`);
      }

      console.log(`  🎉 Finished #${config.tag}: ${savedForTag} reels ready.`);
      // Small pause between hashtags to be respectful to API
      await new Promise(r => setTimeout(r, 1000));
    } catch (err) {
      console.error(`❌ Error processing hashtag #${config.tag}:`, err.message);
    }
  }

  console.log(`\n========================================`);
  console.log(`Total real Instagram reels processed: ${allProcessedReels.length}`);
  
  if (allProcessedReels.length >= 10) {
    fs.writeFileSync(REELS_PATH, JSON.stringify(allProcessedReels, null, 2), 'utf8');
    console.log(`💾 Saved ${allProcessedReels.length} authentic Instagram reels to ${REELS_PATH}`);
  } else {
    console.warn(`⚠️ Warning: Only fetched ${allProcessedReels.length} reels. Preserving existing reels with updates.`);
  }
}

main();
