export interface Creator {
  name: string;
  handle: string;
  avatar: string;
  verified: boolean;
  bio: string;
}

export interface RealityCheckSource {
  name: string;
  url: string;
  credibility: string;
}

export interface RealityCheck {
  verdict: 'Verified' | 'Context Needed' | 'Claim Analyzed' | 'Educational Consensus';
  claim: string;
  explanation: string;
  sources: RealityCheckSource[];
  aiConfidence: number;
}

export interface SignalWeight {
  watchHistory: number;
  goalAlignment: number;
  currentMood: number;
  collaborativeFilter: number;
}

export interface WhyAmISeeingThis {
  primaryReason: string;
  matchedInterests: string[];
  signalWeight: SignalWeight;
  privacyNote: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TaskItem {
  id: string;
  title: string;
  estimatedMinutes: number;
  category: string;
  completed?: boolean;
}

export interface StudyPlanDay {
  day: string;
  action: string;
  outcome: string;
}

export interface UsefulOutputs {
  notes: {
    summary: string;
    bulletPoints: string[];
    keyTakeaway: string;
  };
  quiz: QuizQuestion[];
  tasks: TaskItem[];
  studyPlan: StudyPlanDay[];
}

export interface CommentItem {
  id: string;
  user: string;
  avatar: string;
  text: string;
  likes: number;
  timeAgo: string;
}

export interface Reel {
  id: string;
  title: string;
  creator: Creator;
  videoUrl: string;
  thumbnail?: string;
  visualTheme: 'neural_network' | 'zen_flow' | 'fitness_pulse' | 'quantum_grid' | 'finance_growth' | 'cooking_flame';
  description: string;
  duration: number;
  category: string;
  intent: 'teach' | 'achieve' | 'relax' | 'entertain' | 'inspire' | 'connect';
  goalTags: string[];
  mood: string;
  likes: number;
  commentsCount: number;
  shares: number;
  views: number;
  isAIGenerated: boolean;
  safetyScore: number;
  realityCheck: RealityCheck;
  whyAmISeeingThis: WhyAmISeeingThis;
  transcript: string;
  usefulOutputs: UsefulOutputs;
  comments: CommentItem[];
}

export interface GoalCurriculumItem {
  level: string;
  topic: string;
  reelId: string;
  completed: boolean;
}

export interface GoalTrack {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  totalReels: number;
  completedReels: number;
  xpReward: number;
  targetTags: string[];
  curriculum: GoalCurriculumItem[];
}

export interface UserBadge {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface MemoryItem {
  id: string;
  type: 'interest' | 'goal' | 'learning';
  text: string;
  dateAdded: string;
}

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio?: string;
  followersCount?: number;
  followingCount?: number;
  isFollowing?: boolean;
  xp: number;
  level: number;
  streakDays: number;
  attentionBudgetMinutes: number;
  minutesUsedToday: number;
  badges: UserBadge[];
  memoryVault: MemoryItem[];
  date_of_birth?: string;
  category?: string;
  current_mood?: string;
  privacySettings: {
    useWatchHistory: boolean;
    useMoodSignals: boolean;
    allowCollaborativeFiltering: boolean;
    privateMode: boolean;
  };
}

export interface UserVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  views: number;
  likes: number;
  commentsCount: number;
  uploadDate: string;
  duration?: number;
}

export interface UserPost {
  id: string;
  caption: string;
  imageUrl: string;
  likes: number;
  commentsCount: number;
  uploadDate: string;
  creator?: Creator;
}

export interface ActivityItem {
  id: string;
  contentId: string;
  type: 'reel' | 'video' | 'post';
  title: string;
  thumbnail?: string;
  videoUrl?: string;
  creatorName?: string;
  creatorAvatar?: string;
  likes: number;
  commentsCount: number;
  views?: number;
  date: string;
  caption?: string;
}

export interface CommentActivity {
  id: string;
  contentId: string;
  contentType: 'reel' | 'video' | 'post';
  contentTitle: string;
  thumbnail?: string;
  videoUrl?: string;
  commentText: string;
  timeAgo: string;
  timestamp: string;
}

export type PageType = 'home' | 'feed' | 'profile';

export type UserCategory = 'Student' | 'Teacher' | 'Clerk' | 'Manager' | 'Head' | 'Other';

export type UserMood = 
  | 'Happy' 
  | 'Relaxed' 
  | 'Excited' 
  | 'Chill' 
  | 'Sad' 
  | 'Tired' 
  | 'Neutral' 
  | 'Frustrated' 
  | 'Curious' 
  | 'Romantic';

export type IntentType = 'all' | 'teach' | 'achieve' | 'relax' | 'entertain' | 'inspire' | 'connect';
export type MoodType = 'all' | 'curious' | 'motivated' | 'stressed' | 'energetic' | 'calm';
export type LanguageCode = 'en' | 'es' | 'hi' | 'gu' | 'fr' | 'ja' | 'de' | 'mr' | 'ta' | 'te' | 'bn' | 'pa' | 'ml' | 'kn';
export type ThemeType = 'emerald' | 'amber' | 'cobalt' | 'rose' | 'cyan';
export type ColorMode = 'dark' | 'light';

export type LanguageStyle = 'standard' | 'gen_z' | 'casual' | 'regional' | 'mixed_language';

export interface RegionalDialectOption {
  id: string;
  name: string;
  description: string;
  samplePhrase: string;
}

export interface SlangToken {
  term: string;
  meaning: string;
  intent: string;
  sentiment: string;
  domain: string;
}

export interface LanguageAnalysisResult {
  rawInput: string;
  primaryLanguage: string;
  detectedDialect: string;
  isCodeMixed: boolean;
  codeMixedType: string | null;
  detectedStyle: LanguageStyle;
  detectedSlangs: SlangToken[];
  detectedIntent: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  normalizedMeaning: string;
}

