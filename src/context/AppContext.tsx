import React, { createContext, useContext, useState, useEffect } from 'react';
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
  language: LanguageCode;
  t: typeof translations['en'];
  userProfile: UserProfile | null;
  isDetoxMode: boolean;
  isMuted: boolean;
  isPlaying: boolean;
  activeModal: string | null;
  timeSession: TimeSessionState;
  firewallTriggered: boolean;
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
  forgetMemoryItem: (id: string) => Promise<void>;
  dismissFirewall: () => void;
  refreshReels: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPageState] = useState<PageType>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialStep, setAuthInitialStep] = useState<'login' | 'mood' | 'onboarding'>('login');
  
  // Theme state with fallback protection
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(() => {
    try {
      const saved = localStorage.getItem('pulseai_theme') as ThemeType;
      if (saved && themes[saved]) return saved;
    } catch (e) {}
    return 'emerald';
  });
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

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

  const [reels, setReels] = useState<Reel[]>([]);
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
  const [selectedMood, setSelectedMood] = useState<MoodType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
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
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [firewallTriggered, setFirewallTriggered] = useState(false);
  const [consecutivePassiveCount, setConsecutivePassiveCount] = useState(0);

  const [timeSession, setTimeSession] = useState<TimeSessionState>({
    isActive: false,
    totalSeconds: 300,
    remainingSeconds: 300,
    reelsWatched: 0,
    sessionFinished: false
  });

  // Deep fallback translation guarantee
  const t = getTranslations(language);
  const currentReel = reels[currentReelIndex] || null;

  const setCurrentPage = (page: PageType) => {
    sounds.playClick();
    setCurrentPageState(page);
  };

  const setTheme = (newTheme: ThemeType) => {
    sounds.playSuccess();
    const safeTheme = themes[newTheme] ? newTheme : 'emerald';
    setCurrentTheme(safeTheme);
    try {
      localStorage.setItem('pulseai_theme', safeTheme);
    } catch (e) {}
  };

  const openThemeModal = () => {
    sounds.playClick();
    setIsThemeModalOpen(true);
  };

  const closeThemeModal = () => {
    sounds.playClick();
    setIsThemeModalOpen(false);
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
    if (current_mood) localStorage.setItem('pulseai_user_mood', current_mood);

    setUserProfile(prev => {
      if (!prev) return null;
      return {
        ...prev,
        name: name || prev.name,
        handle: `@${(name || 'user').toLowerCase().replace(/\s+/g, '_')}`,
        attentionBudgetMinutes: budget || prev.attentionBudgetMinutes,
        date_of_birth: date_of_birth || prev.date_of_birth || localStorage.getItem('pulseai_user_dob') || undefined,
        category: category || prev.category || localStorage.getItem('pulseai_user_category') || undefined,
        current_mood: current_mood || prev.current_mood || localStorage.getItem('pulseai_user_mood') || 'Happy',
        memoryVault: interests && interests.length > 0 
          ? [
              ...interests.map((it, idx) => ({ id: `m-init-${idx}`, type: 'interest' as const, text: it, dateAdded: 'Today' })),
              ...prev.memoryVault
            ]
          : prev.memoryVault
      };
    });
  };

  const saveUserMood = async (mood: string) => {
    localStorage.setItem('pulseai_user_mood', mood);
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
  };

  // Fetch initial profile, content, and activity
  useEffect(() => {
    fetch('/api/user/profile')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const savedName = localStorage.getItem('pulseai_user_name');
          const savedBio = localStorage.getItem('pulseai_user_bio');
          const savedHandle = localStorage.getItem('pulseai_user_handle');
          const savedAvatar = localStorage.getItem('pulseai_user_avatar');
          if (savedName) {
            data.profile.name = savedName;
            data.profile.handle = `@${savedName.toLowerCase().replace(/\s+/g, '_')}`;
          }
          if (savedBio) data.profile.bio = savedBio;
          if (savedHandle) data.profile.handle = savedHandle;
          if (savedAvatar) data.profile.avatar = savedAvatar;
          setUserProfile(data.profile);
        }
      })
      .catch(err => console.error('Error fetching profile:', err));

    // Fetch user uploaded content (Reels, Videos, Posts)
    fetch('/api/user/content')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          if (data.reels) setUserReels(data.reels);
          if (data.videos) setUserVideos(data.videos);
          if (data.posts) setUserPosts(data.posts);
        }
      })
      .catch(err => console.warn('Content fetch notice:', err));

    // Fetch user activities (Liked, Saved, Comments)
    fetch('/api/user/activity')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
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
      .then(res => res.json())
      .then(data => {
        if (data.success && data.reels) {
          setReels(data.reels);
          setCurrentReelIndex(0);
        }
      })
      .catch(err => console.error('Error fetching reels:', err))
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
    sounds.playClick();
    setCurrentReelIndex(idx);

    if (timeSession.isActive) {
      setTimeSession(prev => ({ ...prev, reelsWatched: prev.reelsWatched + 1 }));
    }

    const nextCount = consecutivePassiveCount + 1;
    setConsecutivePassiveCount(nextCount);

    // AI Endless Scroll Firewall triggers after 4 continuous passive reels without an action
    if (nextCount >= 4 && !firewallTriggered && !timeSession.isActive) {
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
    const targetReel = reels.find(r => r.id === reelId);
    try {
      const res = await fetch(`/api/reels/${reelId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, user: userProfile?.name || 'You' })
      });
      const data = await res.json();
      if (data.success && data.comment) {
        setReels(prev =>
          prev.map(r =>
            r.id === reelId
              ? {
                  ...r,
                  commentsCount: data.totalComments,
                  comments: [data.comment, ...(r.comments || [])]
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
      }
      return false;
    } catch (e) {
      return false;
    }
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
        memoryVault: prev.memoryVault.filter(m => m.id !== id)
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
        language,
        t,
        userProfile,
        isDetoxMode,
        isMuted,
        isPlaying,
        activeModal,
        timeSession,
        firewallTriggered,
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
