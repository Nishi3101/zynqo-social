import React, { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
import { 
  Reel, 
  UserProfile, 
  IntentType, 
  MoodType, 
  LanguageCode, 
  ThemeType, 
  ColorMode,
  UserVideo,
  UserPost,
  ActivityItem,
  CommentActivity,
  PageType
} from '../types';
import { translations, getTranslations } from '../utils/translations';
import { themes } from '../utils/theme';
import { sounds } from '../utils/sound';
import confetti from 'canvas-confetti';
import defaultReelsData from '../data/defaultReels.json';
import { 
  rankReelsBySearchIntent, 
  parseClientSearchIntent, 
  StructuredSearchIntent,
  rankReelsByMood
} from '../utils/aiClientEngine';

interface TimeSessionState {
  isActive: boolean;
  totalSeconds: number;
  remainingSeconds: number;
  reelsWatched: number;
  sessionFinished: boolean;
}

interface AppContextType {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  isAuthModalOpen: boolean;
  authInitialStep: 'login' | 'mood' | 'onboarding';
  isLoggedIn: boolean;
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
  currentTheme: ThemeType;
  setTheme: (t: ThemeType) => void;
  isThemeModalOpen: boolean;
  openThemeModal: () => void;
  closeThemeModal: () => void;
  openAuthModal: (step?: 'login' | 'mood' | 'onboarding') => void;
  closeAuthModal: () => void;
  loginUser: (name: string, email: string, interests?: string[], budget?: number, date_of_birth?: string, category?: string, current_mood?: string) => void;
  logoutUser: () => void;
  saveUserMood: (mood: string) => Promise<void>;
  resetAttentionLimit: () => void;
  reels: Reel[];
  userReels: Reel[];
  userVideos: UserVideo[];
  userPosts: UserPost[];
  likedActivities: ActivityItem[];
  savedActivities: ActivityItem[];
  commentActivities: CommentActivity[];
  loading: boolean;
  currentReelIndex: number;
  currentReel: Reel | null;
  intent: IntentType;
  selectedCategory: string;
  selectedMood: MoodType;
  searchQuery: string;
  searchIntent: StructuredSearchIntent | null;
  language: LanguageCode;
  t: typeof translations['en'];
  userProfile: UserProfile | null;
  isDetoxMode: boolean;
  isMuted: boolean;
  isPlaying: boolean;
  activeModal: string | null;
  timeSession: TimeSessionState;
  firewallTriggered: boolean;
  firewallEnabled: boolean;
  setFirewallEnabled: (enabled: boolean) => void;
  firewallIntervalMinutes: number;
  setFirewallIntervalMinutes: (mins: number) => void;
  setCurrentReelIndex: (idx: number) => void;
  setIntent: (intent: IntentType) => void;
  setSelectedCategory: (cat: string) => void;
  setSelectedMood: (mood: MoodType) => void;
  setSearchQuery: (q: string) => void;
  setLanguage: (lang: LanguageCode) => void;
  toggleLike: (reelId: string, itemMeta?: Partial<ActivityItem>) => Promise<void>;
  toggleSave: (item: Partial<ActivityItem>) => Promise<boolean>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  addUserContent: (type: 'reel' | 'video' | 'post', item: any) => Promise<void>;
  addComment: (reelId: string, text: string) => Promise<boolean>;
  awardXP: (amount: number, reason?: string) => Promise<void>;
  startTimeSession: (minutes: number) => void;
  stopTimeSession: () => void;
  extendSessionOneMore: () => void;
  finishSessionNow: () => void;
  openModal: (modalName: string) => void;
  closeModal: () => void;
  toggleDetoxMode: () => void;
  toggleMute: () => void;
  togglePlay: () => void;
  dailyReelHistory: Record<string, number>;
  totalReelsWatched: number;
  todayReelsWatched: number;
  recordReelWatch: (reelId: string) => void;
  forgetMemoryItem: (id: string) => Promise<void>;
  dismissFirewall: () => void;
  refreshReels: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const generateInitialWatchHistory = (): Record<string, number> => {
  const result: Record<string, number> = {};
  // Realistic historical trend matching the user's reference chart peaks (33, 29, 28, etc.)
  const counts = [14, 21, 28, 16, 24, 33, 19, 26, 12, 18, 29, 15, 23, 11, 7];
  const now = new Date();
  for (let i = counts.length - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(now.getDate() - i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const key = `${yyyy}-${mm}-${dd}`;
    result[key] = counts[counts.length - 1 - i];
  }
  return result;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPageState] = useState<PageType>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialStep, setAuthInitialStep] = useState<'login' | 'mood' | 'onboarding'>('login');
  
  // Theme is permanently fixed to Zynqo Velvet Rose & Neon Plum brand identity
  const currentTheme: ThemeType = 'rose';
  const setTheme = (_t: ThemeType) => {};
  const isThemeModalOpen = false;
  const openThemeModal = () => {};
  const closeThemeModal = () => {};

  // Color Mode state (Dark / Light)
  const [colorMode, setColorModeState] = useState<ColorMode>(() => {
    try {
      const saved = localStorage.getItem('pulseai_color_mode');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (e) {}
    return 'dark';
  });

  const setColorMode = (mode: ColorMode) => {
    setColorModeState(mode);
    try {
      localStorage.setItem('pulseai_color_mode', mode);
    } catch (e) {}
  };

  const toggleColorMode = () => {
    setColorModeState(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('pulseai_color_mode', next);
      } catch (e) {}
      return next;
    });
  };

  useEffect(() => {
    const root = document.documentElement;
    if (colorMode === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      root.style.colorScheme = 'dark';
    }
    try {
      localStorage.setItem('pulseai_color_mode', colorMode);
    } catch (e) {}
  }, [colorMode]);

  // Persistent login state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('pulseai_logged_in') === 'true';
    } catch (e) {
      return false;
    }
  });

  const [reels, setReels] = useState<Reel[]>((defaultReelsData as unknown) as Reel[]);
  const [userReels, setUserReels] = useState<Reel[]>([]);
  const [userVideos, setUserVideos] = useState<UserVideo[]>([]);
  const [userPosts, setUserPosts] = useState<UserPost[]>([]);
  const [likedActivities, setLikedActivities] = useState<ActivityItem[]>([]);
  const [savedActivities, setSavedActivities] = useState<ActivityItem[]>([]);
  const [commentActivities, setCommentActivities] = useState<CommentActivity[]>([]);

  const [loading, setLoading] = useState(true);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [intent, setIntentState] = useState<IntentType>('all');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMood, setSelectedMood] = useState<MoodType>(() => {
    try {
      const saved = localStorage.getItem('pulseai_user_mood');
      if (saved) return saved as MoodType;
    } catch (e) {}
    return 'all';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchIntent, setSearchIntent] = useState<StructuredSearchIntent | null>(null);
  
  // Language state with fallback protection
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem('pulseai_lang') as LanguageCode;
      if (saved && translations[saved]) return saved;
    } catch (e) {}
    return 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    sounds.playClick();
    const safeLang = translations[lang] ? lang : 'en';
    setLanguageState(safeLang);
    try {
      localStorage.setItem('pulseai_lang', safeLang);
    } catch (e) {}
  };

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isDetoxMode, setIsDetoxMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [firewallTriggered, setFirewallTriggered] = useState(false);
  const [consecutivePassiveCount, setConsecutivePassiveCount] = useState(0);

  const [firewallEnabled, setFirewallEnabledState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('pulseai_firewall_enabled');
      return saved !== null ? saved === 'true' : true;
    } catch (e) {
      return true;
    }
  });

  const [firewallIntervalMinutes, setFirewallIntervalMinutesState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('pulseai_firewall_interval');
      return saved ? parseInt(saved, 10) : 10;
    } catch (e) {
      return 10;
    }
  });

  const sessionStartRef = useRef<number>(Date.now());
  const lastFirewallDismissedAtRef = useRef<number>(Date.now());

  const setFirewallEnabled = (enabled: boolean) => {
    sounds.playClick();
    setFirewallEnabledState(enabled);
    try {
      localStorage.setItem('pulseai_firewall_enabled', String(enabled));
    } catch (e) {}
    if (!enabled) {
      setFirewallTriggered(false);
    }
  };

  const setFirewallIntervalMinutes = (mins: number) => {
    sounds.playClick();
    setFirewallIntervalMinutesState(mins);
    try {
      localStorage.setItem('pulseai_firewall_interval', String(mins));
    } catch (e) {}
  };

  const [timeSession, setTimeSession] = useState<TimeSessionState>({
    isActive: false,
    totalSeconds: 300,
    remainingSeconds: 300,
    reelsWatched: 0,
    sessionFinished: false
  });

  // Daily Reel Watch History & Analytics State
  const [dailyReelHistory, setDailyReelHistory] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('pulseai_daily_watch_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
          return parsed;
        }
      }
    } catch (e) {}
    return generateInitialWatchHistory();
  });

  const todayDateStr = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const todayReelsWatched = dailyReelHistory[todayDateStr] || 0;

  const totalReelsWatched = useMemo(() => {
    return Object.values(dailyReelHistory).reduce((sum, val) => sum + (typeof val === 'number' ? val : 0), 0);
  }, [dailyReelHistory]);

  const watchedReelsThisSessionRef = useRef<Set<string>>(new Set());

  const recordReelWatch = (reelId: string) => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const today = `${yyyy}-${mm}-${dd}`;

    // Update history state & localStorage
    setDailyReelHistory(prev => {
      const currentDayCount = prev[today] || 0;
      const nextHistory = {
        ...prev,
        [today]: currentDayCount + 1
      };
      try {
        localStorage.setItem('pulseai_daily_watch_history', JSON.stringify(nextHistory));
      } catch (e) {}
      return nextHistory;
    });

    // Increment time session counter if active
    setTimeSession(prev => {
      if (!prev.isActive) return prev;
      return { ...prev, reelsWatched: prev.reelsWatched + 1 };
    });

    // Update user minutes used
    setUserProfile(prev => {
      if (!prev) return null;
      return {
        ...prev,
        minutesUsedToday: Math.min(prev.attentionBudgetMinutes || 60, (prev.minutesUsedToday || 0) + 1)
      };
    });

    // Sync to backend (fire-and-forget)
    try {
      fetch('/api/user/reels-watched', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reelId, date: today })
      }).catch(() => {});
    } catch (e) {}
  };

  // Deep fallback translation guarantee
  const t = getTranslations(language);
  const currentReel = reels[currentReelIndex] || null;

  const setCurrentPage = (page: PageType) => {
    sounds.playClick();
    setCurrentPageState(page);
  };

  const openAuthModal = (step: 'login' | 'mood' | 'onboarding' = 'login') => {
    sounds.playClick();
    setAuthInitialStep(step);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    sounds.playClick();
    setIsAuthModalOpen(false);
  };

  const loginUser = (
    name: string, 
    email: string, 
    interests?: string[], 
    budget?: number, 
    date_of_birth?: string, 
    category?: string,
    current_mood?: string
  ) => {
    sounds.playSuccess();
    setIsLoggedIn(true);
    localStorage.setItem('pulseai_logged_in', 'true');
    localStorage.setItem('pulseai_user_name', name);
    localStorage.setItem('pulseai_user_email', email);
    if (date_of_birth) localStorage.setItem('pulseai_user_dob', date_of_birth);
    if (category) localStorage.setItem('pulseai_user_category', category);
    if (current_mood) {
      localStorage.setItem('pulseai_user_mood', current_mood);
      setSelectedMood(current_mood as MoodType);
    }

    setUserProfile(prev => {
      const base: UserProfile = prev || {
        id: `user-${Date.now()}`,
        name: name || 'User',
        handle: `@${(name || 'user').toLowerCase().replace(/\s+/g, '_')}`,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        bio: 'Living life one reel at a time ✨',
        attentionBudgetMinutes: budget || 30,
        minutesUsedToday: 0,
        xp: 150,
        level: 2,
        streakDays: 3,
        date_of_birth: date_of_birth || localStorage.getItem('pulseai_user_dob') || undefined,
        category: category || localStorage.getItem('pulseai_user_category') || 'Student',
        current_mood: current_mood || localStorage.getItem('pulseai_user_mood') || 'Happy',
        badges: [],
        privacySettings: {
          useWatchHistory: true,
          useMoodSignals: true,
          allowCollaborativeFiltering: true,
          privateMode: false
        },
        memoryVault: []
      };

      const existingVault = Array.isArray(base.memoryVault) ? base.memoryVault : [];

      return {
        ...base,
        name: name || base.name,
        handle: `@${(name || 'user').toLowerCase().replace(/\s+/g, '_')}`,
        attentionBudgetMinutes: budget || base.attentionBudgetMinutes,
        date_of_birth: date_of_birth || base.date_of_birth || localStorage.getItem('pulseai_user_dob') || undefined,
        category: category || base.category || localStorage.getItem('pulseai_user_category') || 'Student',
        current_mood: current_mood || base.current_mood || localStorage.getItem('pulseai_user_mood') || 'Happy',
        memoryVault: interests && interests.length > 0 
          ? [
              ...interests.map((it, idx) => ({ id: `m-init-${idx}`, type: 'interest' as const, text: it, dateAdded: 'Today' })),
              ...existingVault
            ]
          : existingVault
      };
    });
  };

  const saveUserMood = async (mood: string) => {
    localStorage.setItem('pulseai_user_mood', mood);
    setSelectedMood(mood as MoodType);
    setUserProfile(prev => {
      if (!prev) return null;
      return { ...prev, current_mood: mood };
    });

    try {
      const email = localStorage.getItem('pulseai_user_email') || userProfile?.name;
      await fetch('/api/user/mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, mood })
      });
    } catch (e) {
      console.warn('Failed to sync mood to backend:', e);
    }
  };

  const logoutUser = () => {
    sounds.playClick();
    setIsLoggedIn(false);
    localStorage.removeItem('pulseai_logged_in');
    localStorage.removeItem('pulseai_user_name');
    localStorage.removeItem('pulseai_user_email');
    localStorage.removeItem('pulseai_user_dob');
    localStorage.removeItem('pulseai_user_category');
    localStorage.removeItem('pulseai_user_mood');
    setSelectedMood('all');
    
    // Reset to default guest profile
    setUserProfile(prev => {
      if (!prev) return null;
      return {
        ...prev,
        name: 'Guest User',
        handle: '@guest_user',
        xp: 100,
        level: 1,
        date_of_birth: undefined,
        category: undefined,
        current_mood: undefined
      };
    });

    openAuthModal('login');
  };

  // Reset attention limit / minutes used today
  const resetAttentionLimit = () => {
    sounds.playSuccess();
    confetti({ particleCount: 40, spread: 50 });
    setUserProfile(prev => {
      if (!prev) return null;
      return {
        ...prev,
        minutesUsedToday: 0
      };
    });
    setFirewallTriggered(false);
    setConsecutivePassiveCount(0);
    lastFirewallDismissedAtRef.current = Date.now();
  };

  // Fetch initial profile, content, and activity
  useEffect(() => {
    fetch('/api/user/profile')
      .then(res => res.headers.get('content-type')?.includes('application/json') ? res.json() : null)
      .then(data => {
        if (data && data.success && data.profile) {
          const savedName = localStorage.getItem('pulseai_user_name');
          const savedBio = localStorage.getItem('pulseai_user_bio');
          const savedHandle = localStorage.getItem('pulseai_user_handle');
          const savedAvatar = localStorage.getItem('pulseai_user_avatar');
          
          setUserProfile(prev => {
            const base: UserProfile = prev || {
              id: data.profile.id || 'local-profile',
              name: savedName || data.profile.name || 'Nishi Thakkar',
              handle: savedHandle || data.profile.handle || '@nishi_thakkar',
              avatar: savedAvatar || data.profile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
              bio: savedBio || data.profile.bio || 'Living life one reel at a time ✨',
              attentionBudgetMinutes: data.profile.attentionBudgetMinutes || 30,
              minutesUsedToday: data.profile.minutesUsedToday || 0,
              xp: data.profile.xp || 150,
              level: data.profile.level || 2,
              streakDays: data.profile.streakDays || 3,
              badges: Array.isArray(data.profile.badges) ? data.profile.badges : [],
              privacySettings: data.profile.privacySettings || {
                useWatchHistory: true,
                useMoodSignals: true,
                allowCollaborativeFiltering: true,
                privateMode: false
              },
              memoryVault: Array.isArray(data.profile.memoryVault) ? data.profile.memoryVault : []
            };

            return {
              ...base,
              ...data.profile,
              name: savedName || data.profile.name || base.name,
              handle: savedHandle || data.profile.handle || base.handle,
              bio: savedBio || data.profile.bio || base.bio,
              avatar: savedAvatar || data.profile.avatar || base.avatar,
              badges: Array.isArray(data.profile.badges) ? data.profile.badges : base.badges,
              memoryVault: Array.isArray(data.profile.memoryVault) ? data.profile.memoryVault : (base.memoryVault || []),
              privacySettings: data.profile.privacySettings || base.privacySettings
            };
          });
        } else {
          // Local profile fallback
          const savedName = localStorage.getItem('pulseai_user_name') || 'Nishi Thakkar';
          const savedHandle = localStorage.getItem('pulseai_user_handle') || `@${savedName.toLowerCase().replace(/\s+/g, '_')}`;
          const savedDob = localStorage.getItem('pulseai_user_dob') || undefined;
          const savedCat = localStorage.getItem('pulseai_user_category') || 'Student';
          const savedMood = localStorage.getItem('pulseai_user_mood') || 'Happy';
          setUserProfile(prev => prev || {
            id: 'local-profile',
            name: savedName,
            handle: savedHandle,
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
            bio: 'Living life one reel at a time ✨',
            attentionBudgetMinutes: 30,
            minutesUsedToday: 0,
            xp: 150,
            level: 2,
            streakDays: 3,
            date_of_birth: savedDob,
            category: savedCat,
            current_mood: savedMood,
            badges: [],
            privacySettings: {
              useWatchHistory: true,
              useMoodSignals: true,
              allowCollaborativeFiltering: true,
              privateMode: false
            },
            memoryVault: []
          });
        }
      })
      .catch(err => console.warn('Profile fetch notice:', err));

    // Fetch user uploaded content (Reels, Videos, Posts)
    fetch('/api/user/content')
      .then(res => res.headers.get('content-type')?.includes('application/json') ? res.json() : null)
      .then(data => {
        if (data && data.success) {
          if (data.reels) setUserReels(data.reels);
          if (data.videos) setUserVideos(data.videos);
          if (data.posts) setUserPosts(data.posts);
        }
      })
      .catch(err => console.warn('Content fetch notice:', err));

    // Fetch user activities (Liked, Saved, Comments)
    fetch('/api/user/activity')
      .then(res => res.headers.get('content-type')?.includes('application/json') ? res.json() : null)
      .then(data => {
        if (data && data.success) {
          if (data.liked) setLikedActivities(data.liked);
          if (data.saved) setSavedActivities(data.saved);
          if (data.comments) setCommentActivities(data.comments);
        }
      })
      .catch(err => console.warn('Activity fetch notice:', err));
  }, []);

  // Fetch reels based on intent, category, search, detox
  const fetchReels = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (isDetoxMode) {
      params.append('detox', 'true');
    } else {
      if (intent !== 'all') params.append('intent', intent);
      if (selectedCategory !== 'All') params.append('category', selectedCategory);
      if (selectedMood !== 'all') params.append('mood', selectedMood);
      if (searchQuery) params.append('search', searchQuery);
    }

    fetch(`/api/reels?${params.toString()}`)
      .then(res => res.headers.get('content-type')?.includes('application/json') ? res.json() : null)
      .then(data => {
        if (data && data.success && data.reels && data.reels.length > 0) {
          setReels(data.reels);
          if (data.searchIntent) {
            setSearchIntent(data.searchIntent);
          } else if (!searchQuery.trim()) {
            setSearchIntent(null);
          }
          setCurrentReelIndex(0);
        } else {
          // Local fallback filtering from defaultReelsData with client-side AI intent ranking
          let filtered = (defaultReelsData as unknown) as Reel[];
          if (isDetoxMode) {
            filtered = filtered.filter(r => r.category === 'Mindfulness & Mental Wellness' || r.category === 'Science & Cosmos');
            setSearchIntent(null);
          } else {
            if (searchQuery.trim()) {
              const ranked = rankReelsBySearchIntent(filtered, searchQuery);
              filtered = ranked.reels;
              setSearchIntent(ranked.intent);
            } else {
              setSearchIntent(null);
              if (intent !== 'all') filtered = filtered.filter(r => r.intent === intent);
              if (selectedCategory !== 'All') filtered = filtered.filter(r => r.category === selectedCategory);
              if (selectedMood && selectedMood !== 'all') filtered = rankReelsByMood(filtered, selectedMood);
            }
          }
          if (filtered.length > 0) {
            setReels(filtered);
            setCurrentReelIndex(0);
          }
        }
      })
      .catch(err => {
        console.warn('Reels fetch notice:', err);
        let filtered = (defaultReelsData as unknown) as Reel[];
        if (searchQuery.trim() && !isDetoxMode) {
          const ranked = rankReelsBySearchIntent(filtered, searchQuery);
          setReels(ranked.reels);
          setSearchIntent(ranked.intent);
          setCurrentReelIndex(0);
        } else if (selectedMood && selectedMood !== 'all' && !isDetoxMode) {
          filtered = rankReelsByMood(filtered, selectedMood);
          setReels(filtered);
          setCurrentReelIndex(0);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchReels();
  }, [intent, selectedCategory, selectedMood, searchQuery, isDetoxMode]);

  // Session timer countdown effect
  useEffect(() => {
    let interval: any = null;
    if (timeSession.isActive && !timeSession.sessionFinished) {
      interval = setInterval(() => {
        setTimeSession(prev => {
          if (prev.remainingSeconds <= 1) {
            clearInterval(interval);
            sounds.playSessionBell();
            confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
            return { ...prev, remainingSeconds: 0, sessionFinished: true };
          }
          return { ...prev, remainingSeconds: prev.remainingSeconds - 1 };
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timeSession.isActive, timeSession.sessionFinished]);

  // Handle scroll index update & endless scroll firewall
  const handleSetCurrentReelIndex = (idx: number) => {
    // Prevent duplicate triggers if the index has not changed
    if (idx === currentReelIndex) return;

    sounds.playClick();
    setCurrentReelIndex(idx);

    if (timeSession.isActive) {
      setTimeSession(prev => ({ ...prev, reelsWatched: prev.reelsWatched + 1 }));
    }

    const nextCount = consecutivePassiveCount + 1;
    setConsecutivePassiveCount(nextCount);

    // AI Endless Scroll Firewall:
    // Only triggers after user has actively scrolled continuously for at least `firewallIntervalMinutes` (default 10 mins)
    // AND has passively watched at least 20 reels without any interaction (like, comment, quiz, etc.)
    const now = Date.now();
    const elapsedMinutesFromDismiss = (now - lastFirewallDismissedAtRef.current) / 60000;
    const elapsedMinutesFromStart = (now - sessionStartRef.current) / 60000;

    if (
      firewallEnabled &&
      !firewallTriggered &&
      !timeSession.isActive &&
      nextCount >= 20 &&
      elapsedMinutesFromDismiss >= firewallIntervalMinutes &&
      elapsedMinutesFromStart >= firewallIntervalMinutes
    ) {
      setFirewallTriggered(true);
      setIsPlaying(false);
    }
  };

  const setIntent = (newIntent: IntentType) => {
    sounds.playClick();
    setIntentState(newIntent);
    if (isDetoxMode && newIntent !== 'relax') {
      setIsDetoxMode(false);
    }
  };

  const toggleLike = async (reelId: string, itemMeta?: Partial<ActivityItem>) => {
    sounds.playClick();
    setConsecutivePassiveCount(0); // active engagement
    const targetReel = reels.find(r => r.id === reelId);
    const isCurrentlyLiked = likedActivities.some(a => a.contentId === reelId);

    // Update reels state
    setReels(prev =>
      prev.map(r => (r.id === reelId ? { ...r, likes: Math.max(0, r.likes + (isCurrentlyLiked ? -1 : 1)) } : r))
    );

    // Update likedActivities state reactively
    if (isCurrentlyLiked) {
      setLikedActivities(prev => prev.filter(a => a.contentId !== reelId));
    } else {
      const newLiked: ActivityItem = {
        id: `act-like-${Date.now()}`,
        contentId: reelId,
        type: itemMeta?.type || 'reel',
        title: itemMeta?.title || targetReel?.title || 'Liked Content',
        thumbnail: itemMeta?.thumbnail || (targetReel?.videoUrl ? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80' : undefined),
        videoUrl: itemMeta?.videoUrl || targetReel?.videoUrl,
        creatorName: itemMeta?.creatorName || targetReel?.creator?.name || 'Creator',
        creatorAvatar: itemMeta?.creatorAvatar || targetReel?.creator?.avatar,
        likes: (targetReel?.likes || 0) + 1,
        commentsCount: targetReel?.commentsCount || 0,
        views: targetReel?.views,
        date: 'Just now'
      };
      setLikedActivities(prev => [newLiked, ...prev]);
    }

    try {
      await fetch(`/api/reels/${reelId}/like`, { method: 'POST' });
      await fetch('/api/user/activity/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item: {
            contentId: reelId,
            type: itemMeta?.type || 'reel',
            title: itemMeta?.title || targetReel?.title,
            thumbnail: itemMeta?.thumbnail,
            videoUrl: itemMeta?.videoUrl || targetReel?.videoUrl,
            creatorName: itemMeta?.creatorName || targetReel?.creator?.name,
            creatorAvatar: itemMeta?.creatorAvatar || targetReel?.creator?.avatar,
            likes: targetReel?.likes || 0,
            commentsCount: targetReel?.commentsCount || 0,
            views: targetReel?.views
          }
        })
      });
    } catch (e) {}
  };

  const toggleSave = async (itemMeta: Partial<ActivityItem>): Promise<boolean> => {
    sounds.playClick();
    setConsecutivePassiveCount(0); // active engagement
    if (!itemMeta.contentId) return false;
    const contentId = itemMeta.contentId;
    const isCurrentlySaved = savedActivities.some(a => a.contentId === contentId);

    if (isCurrentlySaved) {
      setSavedActivities(prev => prev.filter(a => a.contentId !== contentId));
    } else {
      const newSaved: ActivityItem = {
        id: `act-save-${Date.now()}`,
        contentId: contentId,
        type: itemMeta.type || 'reel',
        title: itemMeta.title || 'Saved Content',
        thumbnail: itemMeta.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
        videoUrl: itemMeta.videoUrl,
        caption: itemMeta.caption,
        creatorName: itemMeta.creatorName || 'Creator',
        creatorAvatar: itemMeta.creatorAvatar,
        likes: itemMeta.likes || 0,
        commentsCount: itemMeta.commentsCount || 0,
        views: itemMeta.views,
        date: 'Just now'
      };
      setSavedActivities(prev => [newSaved, ...prev]);
    }

    try {
      await fetch('/api/user/activity/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: itemMeta })
      });
    } catch (e) {}

    return !isCurrentlySaved;
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    sounds.playSuccess();
    setUserProfile(prev => {
      if (!prev) return null;
      return { ...prev, ...updates };
    });

    if (updates.name) localStorage.setItem('pulseai_user_name', updates.name);
    if (updates.bio) localStorage.setItem('pulseai_user_bio', updates.bio);
    if (updates.handle) localStorage.setItem('pulseai_user_handle', updates.handle);
    if (updates.avatar) localStorage.setItem('pulseai_user_avatar', updates.avatar);

    try {
      await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch (e) {}
  };

  const addUserContent = async (type: 'reel' | 'video' | 'post', item: any) => {
    sounds.playSuccess();
    const newItem = {
      ...item,
      id: item.id || `user-${type}-${Date.now()}`,
      uploadDate: 'Just now',
      creator: {
        name: userProfile?.name || 'You',
        handle: userProfile?.handle || '@you',
        avatar: userProfile?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        verified: true,
        bio: userProfile?.bio || ''
      }
    };

    if (type === 'reel') {
      setUserReels(prev => [newItem, ...prev]);
      setReels(prev => [newItem, ...prev]);
    } else if (type === 'video') {
      setUserVideos(prev => [newItem, ...prev]);
    } else if (type === 'post') {
      setUserPosts(prev => [newItem, ...prev]);
    }

    try {
      await fetch('/api/user/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, item: newItem })
      });
    } catch (e) {}
  };

  const addComment = async (reelId: string, text: string): Promise<boolean> => {
    sounds.playClick();
    setConsecutivePassiveCount(0); // active engagement
    const targetReel = reels.find(r => r.id === reelId);
    let newComment = {
      id: `c-${Date.now()}`,
      user: userProfile?.name || 'You',
      avatar: userProfile?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      text,
      timeAgo: 'Just now',
      likes: 0
    };

    try {
      const res = await fetch(`/api/reels/${reelId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, user: userProfile?.name || 'You' })
      });
      if (res.headers.get('content-type')?.includes('application/json')) {
        const data = await res.json();
        if (data.success && data.comment) {
          newComment = data.comment;
        }
      }
    } catch (e) {
      console.warn('Comment sync notice:', e);
    }

    setReels(prev =>
      prev.map(r =>
        r.id === reelId
          ? {
              ...r,
              commentsCount: (r.commentsCount || 0) + 1,
              comments: [newComment, ...(r.comments || [])]
            }
          : r
      )
    );

    // Record to commentActivities
    const newCommentAct: CommentActivity = {
      id: `act-comm-${Date.now()}`,
      contentId: reelId,
      contentType: 'reel',
      contentTitle: targetReel?.title || 'Reel',
      thumbnail: targetReel?.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
      videoUrl: targetReel?.videoUrl,
      commentText: text,
      timeAgo: 'Just now',
      timestamp: new Date().toISOString()
    };
    setCommentActivities(prev => [newCommentAct, ...prev]);

    try {
      await fetch('/api/user/activity/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentId: reelId,
          contentType: 'reel',
          contentTitle: targetReel?.title || 'Reel',
          thumbnail: targetReel?.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
          videoUrl: targetReel?.videoUrl,
          text
        })
      });
    } catch (e) {}

    awardXP(10, 'Thoughtful Comment');
    return true;
  };

  const awardXP = async (amount: number, reason = 'Action Completed') => {
    sounds.playXpChime();
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0.1, y: 0.2 }
    });

    setUserProfile(prev => {
      if (!prev) return null;
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 500) + 1;
      return { ...prev, xp: newXp, level: newLevel };
    });

    try {
      await fetch('/api/user/xp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, reason })
      });
    } catch (e) {}
  };

  const startTimeSession = (minutes: number) => {
    sounds.playSuccess();
    const seconds = minutes * 60;
    setTimeSession({
      isActive: true,
      totalSeconds: seconds,
      remainingSeconds: seconds,
      reelsWatched: 0,
      sessionFinished: false
    });
    setActiveModal(null);
  };

  const stopTimeSession = () => {
    setTimeSession(prev => ({ ...prev, isActive: false, sessionFinished: false }));
  };

  const extendSessionOneMore = () => {
    sounds.playClick();
    setTimeSession(prev => ({
      ...prev,
      remainingSeconds: 60,
      sessionFinished: false
    }));
  };

  const finishSessionNow = () => {
    awardXP(50, 'Finished Timed Session on Time');
    stopTimeSession();
    setIsPlaying(false);
  };

  const openModal = (modalName: string) => {
    sounds.playClick();
    setActiveModal(modalName);
    setConsecutivePassiveCount(0); // user engaged
  };

  const closeModal = () => {
    sounds.playClick();
    setActiveModal(null);
  };

  const toggleDetoxMode = () => {
    sounds.playClick();
    setIsDetoxMode(prev => !prev);
  };

  const toggleMute = () => {
    sounds.playClick();
    setIsMuted(prev => !prev);
  };

  const togglePlay = () => {
    sounds.playClick();
    setIsPlaying(prev => !prev);
  };

  const forgetMemoryItem = async (id: string) => {
    sounds.playClick();
    setUserProfile(prev => {
      if (!prev) return null;
      return {
        ...prev,
        memoryVault: (prev.memoryVault || []).filter(m => m.id !== id)
      };
    });
    try {
      await fetch('/api/user/forget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
    } catch (e) {}
  };

  const dismissFirewall = () => {
    sounds.playClick();
    setFirewallTriggered(false);
    setConsecutivePassiveCount(0);
    lastFirewallDismissedAtRef.current = Date.now(); // 10-15 minute cooldown starts now
    setIsPlaying(true);
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        isAuthModalOpen,
        authInitialStep,
        isLoggedIn,
        colorMode,
        setColorMode,
        toggleColorMode,
        currentTheme,
        setTheme,
        isThemeModalOpen,
        openThemeModal,
        closeThemeModal,
        openAuthModal,
        closeAuthModal,
        loginUser,
        logoutUser,
        saveUserMood,
        resetAttentionLimit,
        reels,
        userReels,
        userVideos,
        userPosts,
        likedActivities,
        savedActivities,
        commentActivities,
        loading,
        currentReelIndex,
        currentReel,
        intent,
        selectedCategory,
        selectedMood,
        searchQuery,
        searchIntent,
        language,
        t,
        userProfile,
        isDetoxMode,
        isMuted,
        isPlaying,
        activeModal,
        timeSession,
        firewallTriggered,
        firewallEnabled,
        setFirewallEnabled,
        firewallIntervalMinutes,
        setFirewallIntervalMinutes,
        setCurrentReelIndex: handleSetCurrentReelIndex,
        setIntent,
        setSelectedCategory,
        setSelectedMood,
        setSearchQuery,
        setLanguage,
        toggleLike,
        toggleSave,
        updateUserProfile,
        addUserContent,
        addComment,
        awardXP,
        startTimeSession,
        stopTimeSession,
        extendSessionOneMore,
        finishSessionNow,
        openModal,
        closeModal,
        toggleDetoxMode,
        toggleMute,
        togglePlay,
        dailyReelHistory,
        totalReelsWatched,
        todayReelsWatched,
        recordReelWatch,
        forgetMemoryItem,
        dismissFirewall,
        refreshReels: fetchReels
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
