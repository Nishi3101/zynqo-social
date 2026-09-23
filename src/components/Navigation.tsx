import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  Compass, 
  Users, 
  Video, 
  PieChart, 
  Brain, 
  Globe, 
  Flame, 
  Trophy,
  Moon,
  Sun,
  Shield,
  Search,
  Check,
  Home,
  User,
  Palette,
  RotateCcw,
  LogOut,
  ChevronDown,
  Settings,
  X,
  Sliders,
  MoreVertical,
  Mic,
  MicOff,
  ListMusic,
  History,
  TrendingUp,
  Bot
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { IntentType, LanguageCode } from '../types';
import { themes } from '../utils/theme';

export const Navigation: React.FC = () => {
  const { 
    intent, 
    setIntent, 
    language, 
    setLanguage, 
    t, 
    userProfile, 
    isLoggedIn,
    logoutUser,
    openModal, 
    timeSession,
    isDetoxMode,
    toggleDetoxMode,
    searchQuery,
    setSearchQuery,
    setCurrentPage,
    currentPage,
    activeModal,
    openAuthModal,
    currentTheme,
    openThemeModal,
    resetAttentionLimit,
    colorMode,
    toggleColorMode
  } = useApp();

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpenMobile, setIsSearchOpenMobile] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showSearchHistory, setShowSearchHistory] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pulseai_recent_searches');
      return saved ? JSON.parse(saved) : ['AI Neuroscience', 'Quantum Computing', 'Mindfulness Flow', 'Productivity Habits'];
    } catch (e) {
      return ['AI Neuroscience', 'Quantum Computing', 'Mindfulness Flow', 'Productivity Habits'];
    }
  });

  const saveSearchQuery = (q: string) => {
    if (!q.trim()) return;
    setRecentSearches(prev => {
      const updated = [q.trim(), ...prev.filter(item => item.toLowerCase() !== q.trim().toLowerCase())].slice(0, 6);
      try {
        localStorage.setItem('pulseai_recent_searches', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search is supported in Chrome, Edge, and Safari.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'hi' ? 'hi-IN' : language === 'es' ? 'es-ES' : 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        saveSearchQuery(transcript);
        setIsListening(false);
        setCurrentPage('feed');
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      setIsListening(false);
    }
  };

  const isLight = colorMode === 'light';
  const themeConfig = themes[currentTheme] || themes.emerald;

  const intents: { id: IntentType; label: string; icon: string }[] = [
    { id: 'all', label: t.intents?.all || 'All', icon: '⚡' },
    { id: 'teach', label: t.intents?.teach || 'Teach', icon: '🧠' },
    { id: 'achieve', label: t.intents?.achieve || 'Achieve', icon: '🎯' },
    { id: 'relax', label: t.intents?.relax || 'Relax', icon: '🌿' },
    { id: 'entertain', label: t.intents?.entertain || 'Entertain', icon: '🎭' },
    { id: 'inspire', label: t.intents?.inspire || 'Inspire', icon: '✨' },
    { id: 'connect', label: t.intents?.connect || 'Connect', icon: '🤝' },
  ];

  const languages: { code: LanguageCode; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
    { code: 'gu', label: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'sa', label: 'संस्कृतम्', flag: '🇮🇳' },
    { code: 'mr', label: 'मराठी', flag: '🇮🇳' },
    { code: 'te', label: 'తెలుగు', flag: '🇮🇳' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  ];

  const sessionMinutesLeft = Math.floor(timeSession.remainingSeconds / 60);
  const sessionSecondsLeft = timeSession.remainingSeconds % 60;

  const localizedThemeNames: Record<string, Record<string, string>> = {
    emerald: { gu: 'પન્ના લીલો', hi: 'पन्ना हरा', sa: 'मरकतम्', mr: 'पाचू हिरवा', te: 'మరకతం', es: 'Esmeralda', fr: 'Émeraude', ja: 'エメラルド', de: 'Smaragd', en: 'Emerald' },
    sunset: { gu: 'સૂર્યાસ્ત', hi: 'सूर्यास्त', sa: 'सूर्यास्तः', mr: 'सूर्यास्त', te: 'సూర్యాస్తమయం', es: 'Atardecer', fr: 'Couchant', ja: 'サンセット', de: 'Sonnenuntergang', en: 'Sunset' },
    cyberpunk: { gu: 'સાયબર', hi: 'साइबर', sa: 'साइबर', mr: 'सायबर', te: 'సైబర్', es: 'Cíber', fr: 'Cyber', ja: 'サイバー', de: 'Cyber', en: 'Cyber' },
    ocean: { gu: 'સાગર', hi: 'सागर', sa: 'सागरः', mr: 'सागर', te: 'సముద్రం', es: 'Océano', fr: 'Océan', ja: 'オーシャン', de: 'Ozean', en: 'Ocean' },
    rose: { gu: 'ગુલાબી', hi: 'गुलाबी', sa: 'गुलाबः', mr: 'गुलाबी', te: 'గులాబీ', es: 'Rosa', fr: 'Rose', ja: 'ローズ', de: 'Rose', en: 'Rose' }
  };
  const displayThemeName = localizedThemeNames[currentTheme]?.[language] || themeConfig?.name?.split(' ')[0] || 'Emerald';

  const localizedAccountName = userProfile?.name 
    ? (['gu', 'hi', 'sa', 'mr'].includes(language) ? 'एलेक्स' : language === 'te' ? 'అలెక్స్' : userProfile.name.split(' ')[0])
    : (t.nav?.account || 'Account');

  return (
    <aside className={`h-[100dvh] hidden md:flex flex-col z-40 border-r flex-shrink-0 transition-all duration-200 select-none md:w-20 lg:w-72 ${
      isLight 
        ? 'bg-white/95 backdrop-blur-xl border-rose-100/80 text-slate-900 shadow-sm'
        : 'bg-[#0d0b14]/95 backdrop-blur-xl border-white/10 text-slate-100'
    }`}>
      {/* ─────────────────────────────────────────────────────────────
          1. TOP BRAND HEADER
          ───────────────────────────────────────────────────────────── */}
      <div className={`p-3 md:p-4 border-b flex items-center justify-between gap-2 flex-shrink-0 ${
        isLight ? 'border-rose-100/60' : 'border-white/5'
      }`}>
        <div 
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2.5 cursor-pointer group w-full justify-center lg:justify-start"
          title="Back to Landing Home"
        >
          <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
            <img
              src="/zynqo-symbol.png"
              alt="Zynqo Logo"
              className={`w-full h-full object-contain ${
                isLight ? 'drop-shadow-[0_2px_8px_rgba(244,63,94,0.35)]' : 'drop-shadow-[0_2px_8px_rgba(236,72,153,0.4)]'
              }`}
            />
          </div>
          <div className="hidden lg:flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className={`font-display text-base lg:text-lg font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Zynqo<span className={`text-transparent bg-clip-text bg-gradient-to-r ${themeConfig.gradient}`}>Social</span>
              </span>
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-sans font-semibold uppercase tracking-wider ${themeConfig.badgeClass}`}>
                MVP
              </span>
            </div>
            <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Mindful AI Reels
            </span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. SEARCH INPUT
          ───────────────────────────────────────────────────────────── */}
      <div className={`p-2 md:p-3 border-b flex-shrink-0 relative ${
        isLight ? 'border-rose-100/60' : 'border-white/5'
      }`}>
        {/* Desktop Search Input with Voice & History (lg: 1024px+) */}
        <div className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl border transition focus-within:border-rose-400 relative ${
          isLight ? 'bg-rose-50/30 border-rose-200/70' : 'bg-[#181328]/80 border-white/10'
        }`}>
          <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onFocus={() => setShowSearchHistory(true)}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                saveSearchQuery(searchQuery);
                setShowSearchHistory(false);
                setCurrentPage('feed');
              }
            }}
            placeholder={t.nav?.searchPlaceholder || "Search AI reels..."}
            className="w-full text-xs bg-transparent outline-none placeholder:text-slate-400"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-white text-xs">
              ✕
            </button>
          )}

          {/* Voice Search Button (#26) */}
          <button
            onClick={handleVoiceSearch}
            className={`p-1 rounded-lg transition-all ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/50'
                : isLight
                ? 'text-slate-500 hover:text-cyan-600 hover:bg-slate-200'
                : 'text-slate-400 hover:text-cyan-400 hover:bg-white/10'
            }`}
            title={isListening ? "Listening... speak now" : "Voice Search (Concept #26)"}
          >
            {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Search History Dropdown (#17) for Desktop */}
        {showSearchHistory && recentSearches.length > 0 && (
          <div className={`hidden lg:block absolute left-3 right-3 top-full mt-1.5 p-2 rounded-2xl border shadow-xl z-50 backdrop-blur-xl ${
            isLight ? 'bg-white/95 border-slate-200 text-slate-900' : 'bg-slate-900/95 border-white/15 text-white'
          }`}>
            <div className="flex items-center justify-between px-2 pb-1.5 border-b border-white/5">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 flex items-center gap-1">
                <History className="w-3 h-3 text-cyan-400" />
                Recent Searches
              </span>
              <button
                onClick={() => setShowSearchHistory(false)}
                className="text-[10px] text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>
            <div className="pt-1.5 space-y-1">
              {recentSearches.map((term, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSearchQuery(term);
                    setShowSearchHistory(false);
                    setCurrentPage('feed');
                  }}
                  className={`px-2 py-1.5 rounded-lg text-xs flex items-center justify-between cursor-pointer transition ${
                    isLight ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-white/10 text-slate-200'
                  }`}
                >
                  <span className="truncate">{term}</span>
                  <span className="text-[10px] text-cyan-400 font-mono">search ↵</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tablet Search Icon Button (md: 768px - 1023px rail, hidden on mobile and desktop) */}
        <div className="hidden md:flex lg:hidden flex-col items-center">
          <button
            onClick={() => setIsSearchOpenMobile(prev => !prev)}
            className={`w-full p-2 rounded-xl flex items-center justify-center transition ${
              isSearchOpenMobile
                ? 'bg-cyan-500/20 text-cyan-500'
                : isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/10 text-slate-300'
            }`}
            title="Search reels"
          >
            <Search className="w-4 h-4" />
          </button>

          {isSearchOpenMobile && (
            <div className={`absolute left-full top-1 ml-2 w-64 p-2.5 rounded-2xl border shadow-2xl z-50 backdrop-blur-2xl ${
              isLight ? 'bg-white/95 border-rose-100/90 text-slate-900' : 'bg-slate-900/95 border-white/15 text-white'
            }`}>
              <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border ${
                isLight ? 'bg-rose-50/40 border-rose-200' : 'bg-slate-950/80 border-white/10'
              }`}>
                <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      saveSearchQuery(searchQuery);
                      setIsSearchOpenMobile(false);
                      setCurrentPage('feed');
                    }
                  }}
                  placeholder="Search reels..."
                  className="w-full text-xs bg-transparent outline-none placeholder:text-slate-400"
                  autoFocus
                />
                <button onClick={() => setIsSearchOpenMobile(false)} className="text-slate-400 hover:text-white text-xs">✕</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. SCROLLABLE VERTICAL NAVIGATION ITEMS
          ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 md:p-3 space-y-4">
        {/* Section: Primary Navigation Dock with Liquid Glass Bubble */}
        <div className="p-1 rounded-2xl liquid-glass-dock space-y-1">
          {[
            {
              id: 'home',
              label: t.nav?.landingPage || 'Landing Home',
              icon: Home,
              iconColor: 'text-cyan-400',
              action: () => setCurrentPage('home'),
              isActive: currentPage === 'home' && !activeModal
            },
            {
              id: 'feed',
              label: 'Reels Feed',
              icon: Flame,
              iconColor: 'text-amber-400',
              action: () => setCurrentPage('feed'),
              isActive: currentPage === 'feed' && !activeModal,
              badge: 'Live'
            },
            {
              id: 'profile',
              label: t.profile?.title || 'Profile & Activity',
              icon: User,
              iconColor: 'text-emerald-400',
              action: () => setCurrentPage('profile'),
              isActive: currentPage === 'profile' && !activeModal
            },
            {
              id: 'settings',
              label: 'Settings and activity',
              icon: Settings,
              iconColor: 'text-violet-400',
              action: () => openModal('settingsAndActivity'),
              isActive: activeModal === 'settingsAndActivity'
            }
          ].map(item => (
            <button
              key={item.id}
              onClick={item.action}
              className={`w-full p-2.5 md:px-3 md:py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-all duration-300 justify-center lg:justify-start relative group overflow-hidden ${
                item.isActive
                  ? `liquid-glass-bubble prismatic-rim animate-chromatic-shimmer ${isLight ? 'text-slate-900 font-extrabold' : 'text-white font-bold'} shadow-lg`
                  : isLight
                  ? 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-950'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`}
              title={item.label}
            >
              {item.isActive && <span className="specular-lens" />}
              <item.icon className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 relative z-10 ${
                item.isActive 
                  ? (isLight ? `${item.iconColor.replace('400', '500')} drop-shadow-sm` : 'text-white drop-shadow-[0_0_8px_rgba(244,63,94,0.85)]') 
                  : item.iconColor
              }`} />
              <span className={`hidden lg:inline truncate relative z-10 ${isLight && item.isActive ? 'text-slate-900 font-extrabold' : ''}`}>
                {item.label}
              </span>
              {item.isActive ? (
                <span className="hidden lg:flex ml-auto items-center relative z-10">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
                </span>
              ) : item.badge ? (
                <span className={`hidden lg:inline-block ml-auto px-1.5 py-0.5 rounded-full text-[9px] font-bold relative z-10 ${
                  isLight 
                    ? 'bg-rose-100 text-rose-700 border border-rose-200' 
                    : 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                }`}>
                  {item.badge}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        {/* Section: AI Modules */}
        <div className="space-y-1">
          <div className="hidden lg:block px-3 pt-1 pb-1">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${
              isLight ? 'text-slate-400' : 'text-slate-500'
            }`}>
              AI Modules & Tools
            </span>
          </div>

          <div className="p-1 rounded-2xl liquid-glass-dock space-y-1">
            {[
              {
                id: 'aiCompanion',
                label: t.companion?.name || 'Nova AI Companion',
                icon: Bot,
                iconColor: 'text-cyan-400',
                action: () => openModal('aiCompanion'),
                isActive: activeModal === 'aiCompanion',
                badge: 'AI'
              },
              {
                id: 'timeSession',
                label: t.actions.timeSession,
                icon: Clock,
                iconColor: 'text-amber-400',
                action: () => openModal('timeSession'),
                isActive: activeModal === 'timeSession' || timeSession.isActive,
                badge: timeSession.isActive ? `${sessionMinutesLeft}:${sessionSecondsLeft < 10 ? '0' : ''}${sessionSecondsLeft}` : undefined
              },
              {
                id: 'goalPaths',
                label: t.actions.goalPaths,
                icon: Compass,
                iconColor: 'text-emerald-400',
                action: () => openModal('goalPaths'),
                isActive: activeModal === 'goalPaths'
              },
              {
                id: 'watchTogether',
                label: t.actions.watchTogether,
                icon: Users,
                iconColor: 'text-violet-400',
                action: () => openModal('watchTogether'),
                isActive: activeModal === 'watchTogether'
              },
              {
                id: 'creatorStudio',
                label: t.actions.creatorStudio || 'Creator Studio',
                icon: Video,
                iconColor: 'text-pink-400',
                action: () => openModal('creatorStudio'),
                isActive: activeModal === 'creatorStudio'
              },
              {
                id: 'wellbeing',
                label: t.actions.wellbeing,
                icon: PieChart,
                iconColor: 'text-cyan-400',
                action: () => openModal('wellbeing'),
                isActive: activeModal === 'wellbeing'
              },
              {
                id: 'memoryVault',
                label: t.nav?.memory || 'Memory Vault',
                icon: Brain,
                iconColor: 'text-teal-400',
                action: () => openModal('memoryVault'),
                isActive: activeModal === 'memoryVault'
              },
              {
                id: 'aiPlaylists',
                label: 'AI Playlists & Journeys',
                icon: ListMusic,
                iconColor: 'text-violet-400',
                action: () => openModal('aiPlaylists'),
                isActive: activeModal === 'aiPlaylists'
              },
              {
                id: 'leaderboard',
                label: 'Leaderboard & Ranks',
                icon: Trophy,
                iconColor: 'text-amber-400',
                action: () => openModal('leaderboard'),
                isActive: activeModal === 'leaderboard'
              }
            ].map(mod => (
              <button
                key={mod.id}
                onClick={mod.action}
                className={`w-full p-2 md:px-2.5 md:py-2 rounded-xl text-xs font-semibold flex items-center gap-3 transition-all duration-300 justify-center lg:justify-start relative group overflow-hidden ${
                  mod.isActive
                    ? `liquid-glass-bubble prismatic-rim animate-chromatic-shimmer ${isLight ? 'text-slate-900 font-extrabold' : 'text-white font-bold'} shadow-md`
                    : isLight
                    ? 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-950'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
                title={mod.label}
              >
                {mod.isActive && <span className="specular-lens" />}
                <mod.icon className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 relative z-10 ${
                  mod.isActive 
                    ? (isLight ? `${mod.iconColor.replace('400', '500')} drop-shadow-sm` : 'text-white drop-shadow-[0_0_8px_rgba(244,63,94,0.85)]') 
                    : mod.iconColor
                }`} />
                <span className={`hidden lg:inline truncate relative z-10 ${isLight && mod.isActive ? 'text-slate-900 font-extrabold' : ''}`}>
                  {mod.label}
                </span>
                {mod.badge && (
                  <span className="hidden lg:inline-block ml-auto px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-500 text-slate-950 shadow-sm animate-pulse relative z-10">
                    {mod.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Section: Mindset & Intent Filters */}
        <div className="space-y-1">
          <div className="hidden lg:block px-3 pt-1 pb-1">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${
              isLight ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {t.whatDoYouNeed || 'Mindset / Intent'}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            {intents.map(item => {
              const isActive = intent === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setIntent(item.id)}
                  className={`w-full p-2 md:px-3 md:py-1.5 rounded-xl text-xs font-medium flex items-center gap-2.5 transition justify-center lg:justify-start ${
                    isActive
                      ? isLight
                        ? 'bg-rose-100/70 text-rose-800 font-bold border border-rose-200 shadow-sm'
                        : 'bg-[#2a1736] text-pink-300 font-bold border border-pink-500/40 shadow-sm'
                      : isLight
                      ? 'hover:bg-rose-50/70 text-slate-600 hover:text-slate-900'
                      : 'hover:bg-white/5 text-slate-400 hover:text-slate-200'
                  }`}
                  title={item.label}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="hidden lg:inline truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. BOTTOM FIXED TOOLS & USER FOOTER
          ───────────────────────────────────────────────────────────── */}
      <div className={`p-2 md:p-3 border-t flex flex-col gap-2 flex-shrink-0 ${
        isLight ? 'border-rose-100/70 bg-white/70' : 'border-white/5 bg-[#0e0a16]/70'
      }`}>
        {/* Quick Tools Row: Mode, Theme, Detox, Lang */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-1.5">
          {/* Light / Dark Mode */}
          <button
            onClick={toggleColorMode}
            className={`w-full lg:w-auto p-2 rounded-xl text-xs transition border flex items-center justify-center flex-1 ${
              isLight
                ? 'bg-white hover:bg-rose-50/80 text-slate-800 border-rose-100/80 shadow-sm'
                : 'bg-slate-900/80 hover:bg-slate-800 text-amber-300 border-white/10'
            }`}
            title={isLight ? (t.nav?.darkMode || "Dark Mode") : (t.nav?.lightMode || "Light Mode")}
          >
            {isLight ? <Moon className="w-3.5 h-3.5 text-indigo-600" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
          </button>

          {/* Content Detox Toggle */}
          <button
            onClick={toggleDetoxMode}
            className={`w-full lg:w-auto p-2 rounded-xl text-xs transition border flex items-center justify-center flex-1 ${
              isDetoxMode
                ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/40'
                : isLight
                ? 'bg-white text-slate-600 border-rose-100/80 hover:bg-rose-50/80 shadow-sm'
                : 'bg-slate-900/80 text-slate-400 border-white/10 hover:text-white'
            }`}
            title={isDetoxMode ? "Detox Active" : "Content Detox"}
          >
            <Shield className="w-3.5 h-3.5" />
          </button>

          {/* Language Switcher */}
          <div className="relative w-full lg:w-auto flex-1">
            <button
              onClick={() => setIsLangMenuOpen(prev => !prev)}
              className={`w-full p-2 rounded-xl text-xs font-bold transition border flex items-center justify-center gap-1 ${
                isLight
                  ? 'bg-white hover:bg-rose-50/80 text-slate-800 border-rose-100/80 shadow-sm'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border-white/10'
              }`}
              title="Language"
            >
              <Globe className={`w-3.5 h-3.5 ${isLight ? 'text-rose-600' : 'text-pink-400'}`} />
              <span className="hidden lg:inline uppercase text-[10px]">{language}</span>
            </button>

            {isLangMenuOpen && (
              <div className={`absolute bottom-full left-0 md:left-2 lg:left-0 mb-2 w-44 max-h-72 overflow-y-auto rounded-2xl border shadow-2xl p-1.5 z-50 animate-fade-in backdrop-blur-2xl ${
                isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-white/15 text-white'
              }`}>
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full px-2.5 py-1.5 rounded-xl text-left text-xs font-medium flex items-center justify-between transition ${
                      language === lang.code
                        ? 'bg-cyan-500/20 text-cyan-500 font-bold'
                        : isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    <span>{lang.flag} {lang.label}</span>
                    {language === lang.code && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* User Account Card */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(prev => !prev)}
            className={`w-full p-2 rounded-2xl border flex items-center justify-center lg:justify-between gap-2 transition ${
              isLight
                ? 'bg-white hover:bg-rose-50/70 border-rose-100/80 text-slate-900 shadow-sm'
                : 'bg-[#181328]/90 hover:bg-[#201835] border-white/10 text-white'
            }`}
          >
            <div className="flex items-center justify-center lg:justify-start gap-2 min-w-0">
              <div className="w-7 h-7 rounded-xl overflow-hidden flex-shrink-0 bg-slate-950">
                <img
                  src={userProfile?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden lg:flex flex-col text-left min-w-0">
                <span className="text-xs font-bold truncate block">{localizedAccountName}</span>
                <span className={`text-[10px] font-mono font-medium truncate block ${
                  isLight ? 'text-rose-600' : 'text-pink-400'
                }`}>
                  {userProfile?.handle || '@alex_explorer'}
                </span>
              </div>
            </div>
            <MoreVertical className="hidden lg:block w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          </button>

          {/* User Profile Popover Menu */}
          {isUserMenuOpen && (
            <div className={`absolute bottom-full left-0 mb-2 w-56 rounded-2xl border shadow-2xl p-2 z-50 animate-fade-in backdrop-blur-2xl space-y-1 ${
              isLight ? 'bg-white/95 border-rose-100/90 text-slate-900' : 'bg-[#181328]/95 border-white/15 text-white'
            }`}>
              <div className={`p-2 border-b ${isLight ? 'border-rose-100/80' : 'border-white/10'}`}>
                <span className="text-xs font-bold block">{localizedAccountName}</span>
                <span className={`text-[10px] block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{userProfile?.handle || '@alex_explorer'}</span>
                <div className="mt-1.5">
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 font-bold inline-block">
                    {userProfile?.xp || 420} XP • Lvl {userProfile?.level || 1}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  setCurrentPage('profile');
                }}
                className={`w-full px-2.5 py-2 rounded-xl text-left text-xs font-semibold flex items-center gap-2 transition ${
                  isLight ? 'text-cyan-700 hover:bg-cyan-50' : 'text-cyan-400 hover:bg-cyan-950/40'
                }`}
              >
                <User className="w-4 h-4 text-cyan-400" />
                <span>{t.profile?.title || 'Profile & Activity'}</span>
              </button>

              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  openModal('settingsAndActivity');
                }}
                className={`w-full px-2.5 py-2 rounded-xl text-left text-xs font-semibold flex items-center gap-2 transition ${
                  isLight ? 'text-slate-800 hover:bg-slate-100' : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                <Settings className="w-4 h-4 text-violet-400" />
                <span>Settings and activity</span>
              </button>

              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  openAuthModal('login');
                }}
                className={`w-full px-2.5 py-2 rounded-xl text-left text-xs font-medium flex items-center gap-2 transition ${
                  isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                <User className="w-4 h-4 text-cyan-500" />
                <span>{t.nav?.switchAccount || 'Switch Account'}</span>
              </button>

              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  resetAttentionLimit();
                }}
                className={`w-full px-2.5 py-2 rounded-xl text-left text-xs font-medium flex items-center gap-2 transition ${
                  isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                <RotateCcw className="w-4 h-4 text-amber-500" />
                <span>Reset Daily Time (0m)</span>
              </button>

              <div className={`pt-1 border-t ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    logoutUser();
                  }}
                  className="w-full px-2.5 py-2 rounded-xl text-left text-xs font-bold text-red-500 hover:bg-red-950/40 flex items-center gap-2 transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t.nav?.signOut || 'Sign Out'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
