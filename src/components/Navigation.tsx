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
  MoreVertical
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
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  ];

  const sessionMinutesLeft = Math.floor(timeSession.remainingSeconds / 60);
  const sessionSecondsLeft = timeSession.remainingSeconds % 60;

  const localizedThemeNames: Record<string, Record<string, string>> = {
    emerald: { gu: 'પન્ના લીલો', hi: 'पन्ना हरा', es: 'Esmeralda', fr: 'Émeraude', ja: 'エメラルド', de: 'Smaragd', en: 'Emerald' },
    sunset: { gu: 'સૂર્યાસ્ત', hi: 'सूर्यास्त', es: 'Atardecer', fr: 'Couchant', ja: 'サンセット', de: 'Sonnenuntergang', en: 'Sunset' },
    cyberpunk: { gu: 'સાયબર', hi: 'साइबर', es: 'Cíber', fr: 'Cyber', ja: 'サイバー', de: 'Cyber', en: 'Cyber' },
    ocean: { gu: 'સાગર', hi: 'सागर', es: 'Océano', fr: 'Océan', ja: 'オーシャン', de: 'Ozean', en: 'Ocean' },
    rose: { gu: 'ગુલાબી', hi: 'गुलाबी', es: 'Rosa', fr: 'Rose', ja: 'ローズ', de: 'Rose', en: 'Rose' }
  };
  const displayThemeName = localizedThemeNames[currentTheme]?.[language] || themeConfig?.name?.split(' ')[0] || 'Emerald';

  const localizedAccountName = userProfile?.name 
    ? (language === 'gu' ? 'એલેક્સ' : language === 'hi' ? 'एलेक्स' : userProfile.name.split(' ')[0])
    : (t.nav?.account || 'Account');

  return (
    <aside className={`h-[100dvh] flex flex-col z-40 border-r flex-shrink-0 transition-all duration-200 select-none w-16 sm:w-20 md:w-64 lg:w-72 ${
      isLight 
        ? 'bg-white/95 backdrop-blur-xl border-slate-200 text-slate-900 shadow-sm'
        : 'bg-[#0a0d14]/95 backdrop-blur-xl border-white/10 text-slate-100'
    }`}>
      {/* ─────────────────────────────────────────────────────────────
          1. TOP BRAND HEADER
          ───────────────────────────────────────────────────────────── */}
      <div className={`p-3 md:p-4 border-b flex items-center justify-between gap-2 flex-shrink-0 ${
        isLight ? 'border-slate-100' : 'border-white/5'
      }`}>
        <div 
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2.5 cursor-pointer group w-full justify-center md:justify-start"
          title="Back to Landing Home"
        >
          <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
            <img
              src="/zynqo-symbol.png"
              alt="Zynqo Logo"
              className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(6,182,212,0.4)]"
            />
          </div>
          <div className="hidden md:flex flex-col">
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
      <div className={`p-2 md:p-3 border-b flex-shrink-0 ${
        isLight ? 'border-slate-100' : 'border-white/5'
      }`}>
        {/* Desktop Search Input */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border transition focus-within:border-cyan-500 bg-slate-500/5">
          <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t.nav?.searchPlaceholder || "Search AI reels..."}
            className="w-full text-xs bg-transparent outline-none placeholder:text-slate-400"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-white text-xs">
              ✕
            </button>
          )}
        </div>

        {/* Mobile Search Button */}
        <button
          onClick={() => setIsSearchOpenMobile(prev => !prev)}
          className={`md:hidden w-full p-2 rounded-xl flex items-center justify-center transition ${
            isSearchOpenMobile
              ? 'bg-cyan-500/20 text-cyan-500'
              : isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/10 text-slate-300'
          }`}
          title="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {isSearchOpenMobile && (
          <div className="md:hidden mt-2">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className={`w-full px-2.5 py-1.5 rounded-xl text-xs border outline-none ${
                isLight ? 'bg-slate-100 border-slate-300' : 'bg-slate-900 border-white/20'
              }`}
              autoFocus
            />
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. SCROLLABLE VERTICAL NAVIGATION ITEMS
          ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 md:p-3 space-y-4">
        {/* Section: Primary Navigation */}
        <div className="space-y-1">
          <button
            onClick={() => setCurrentPage('home')}
            className={`w-full p-2.5 md:px-3 md:py-2 rounded-xl text-xs font-semibold flex items-center gap-3 transition justify-center md:justify-start ${
              isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-300 hover:bg-white/10'
            }`}
            title="Landing Home"
          >
            <Home className="w-4 h-4 text-cyan-500 flex-shrink-0" />
            <span className="hidden md:inline">{t.nav?.landingPage || 'Landing Home'}</span>
          </button>

          <button
            onClick={() => setCurrentPage('feed')}
            className={`w-full p-2.5 md:px-3 md:py-2 rounded-xl text-xs font-bold flex items-center gap-3 transition justify-center md:justify-start ${
              themeConfig.buttonClass
            } text-white shadow-md`}
            title="Reels Feed"
          >
            <Flame className="w-4 h-4 flex-shrink-0" />
            <span className="hidden md:inline">Reels Feed</span>
          </button>

          <button
            onClick={() => setCurrentPage('profile')}
            className={`w-full p-2.5 md:px-3 md:py-2 rounded-xl text-xs font-semibold flex items-center gap-3 transition justify-center md:justify-start ${
              isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-300 hover:bg-white/10'
            }`}
            title="My Profile & Activity"
          >
            <User className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span className="hidden md:inline">{t.profile?.title || 'Profile & Activity'}</span>
          </button>

          <button
            onClick={() => openModal('settingsAndActivity')}
            className={`w-full p-2.5 md:px-3 md:py-2 rounded-xl text-xs font-semibold flex items-center gap-3 transition justify-center md:justify-start ${
              isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-300 hover:bg-white/10'
            }`}
            title="Settings and activity"
          >
            <Settings className="w-4 h-4 text-violet-400 flex-shrink-0" />
            <span className="hidden md:inline">Settings and activity</span>
          </button>
        </div>

        {/* Section: AI Modules */}
        <div className="space-y-1">
          <div className="hidden md:block px-3 pt-1 pb-1">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${
              isLight ? 'text-slate-400' : 'text-slate-500'
            }`}>
              AI Modules & Tools
            </span>
          </div>

          {/* I Have X Minutes */}
          <button
            onClick={() => openModal('timeSession')}
            className={`w-full p-2.5 md:px-3 md:py-2 rounded-xl text-xs font-semibold flex items-center gap-3 transition justify-center md:justify-start ${
              timeSession.isActive
                ? 'bg-amber-500 text-slate-950 font-bold animate-pulse'
                : isLight
                ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-white/5'
            }`}
            title={t.actions.timeSession}
          >
            <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <div className="hidden md:flex flex-col text-left">
              <span>{t.actions.timeSession}</span>
              {timeSession.isActive && (
                <span className="text-[10px] text-slate-950 font-bold">
                  {sessionMinutesLeft}:{sessionSecondsLeft < 10 ? '0' : ''}{sessionSecondsLeft} left
                </span>
              )}
            </div>
          </button>

          {/* Goal Pathways */}
          <button
            onClick={() => openModal('goalPaths')}
            className={`w-full p-2.5 md:px-3 md:py-2 rounded-xl text-xs font-semibold flex items-center gap-3 transition justify-center md:justify-start ${
              isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/10 text-slate-300'
            }`}
            title={t.actions.goalPaths}
          >
            <Compass className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span className="hidden md:inline">{t.actions.goalPaths}</span>
          </button>

          {/* Watch Together */}
          <button
            onClick={() => openModal('watchTogether')}
            className={`w-full p-2.5 md:px-3 md:py-2 rounded-xl text-xs font-semibold flex items-center gap-3 transition justify-center md:justify-start ${
              isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/10 text-slate-300'
            }`}
            title={t.actions.watchTogether}
          >
            <Users className="w-4 h-4 text-violet-500 flex-shrink-0" />
            <span className="hidden md:inline">{t.actions.watchTogether}</span>
          </button>

          {/* Creator Studio */}
          <button
            onClick={() => openModal('creatorStudio')}
            className={`w-full p-2.5 md:px-3 md:py-2 rounded-xl text-xs font-semibold flex items-center gap-3 transition justify-center md:justify-start ${
              isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/10 text-slate-300'
            }`}
            title={t.actions.creatorStudio || 'AI Creator Studio'}
          >
            <Video className="w-4 h-4 text-pink-500 flex-shrink-0" />
            <span className="hidden md:inline">{t.actions.creatorStudio || 'Creator Studio'}</span>
          </button>

          {/* Digital Wellbeing */}
          <button
            onClick={() => openModal('wellbeing')}
            className={`w-full p-2.5 md:px-3 md:py-2 rounded-xl text-xs font-semibold flex items-center gap-3 transition justify-center md:justify-start ${
              isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/10 text-slate-300'
            }`}
            title={t.actions.wellbeing}
          >
            <PieChart className="w-4 h-4 text-cyan-500 flex-shrink-0" />
            <span className="hidden md:inline">{t.actions.wellbeing}</span>
          </button>

          {/* Memory Vault */}
          <button
            onClick={() => openModal('memoryVault')}
            className={`w-full p-2.5 md:px-3 md:py-2 rounded-xl text-xs font-semibold flex items-center gap-3 transition justify-center md:justify-start ${
              isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/10 text-slate-300'
            }`}
            title={t.nav?.memory || 'Memory Vault'}
          >
            <Brain className="w-4 h-4 text-teal-400 flex-shrink-0" />
            <span className="hidden md:inline">{t.nav?.memory || 'Memory Vault'}</span>
          </button>
        </div>

        {/* Section: Mindset & Intent Filters */}
        <div className="space-y-1">
          <div className="hidden md:block px-3 pt-1 pb-1">
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
                  className={`w-full p-2 md:px-3 md:py-1.5 rounded-xl text-xs font-medium flex items-center gap-2.5 transition justify-center md:justify-start ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/40'
                      : isLight
                      ? 'hover:bg-slate-100 text-slate-600'
                      : 'hover:bg-white/5 text-slate-400 hover:text-slate-200'
                  }`}
                  title={item.label}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="hidden md:inline truncate">{item.label}</span>
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
        isLight ? 'border-slate-100 bg-slate-50/50' : 'border-white/5 bg-black/20'
      }`}>
        {/* Quick Tools Row: Mode, Theme, Detox, Lang */}
        <div className="flex items-center justify-between gap-1">
          {/* Light / Dark Mode */}
          <button
            onClick={toggleColorMode}
            className={`p-2 rounded-xl text-xs transition border flex items-center justify-center flex-1 ${
              isLight
                ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
                : 'bg-slate-900/80 hover:bg-slate-800 text-amber-300 border-white/10'
            }`}
            title={isLight ? (t.nav?.darkMode || "Dark Mode") : (t.nav?.lightMode || "Light Mode")}
          >
            {isLight ? <Moon className="w-3.5 h-3.5 text-indigo-600" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
          </button>

          {/* Theme Palette Switcher */}
          <button
            onClick={openThemeModal}
            className={`p-2 rounded-xl text-xs transition border flex items-center justify-center flex-1 ${
              isLight
                ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border-white/10'
            }`}
            title={t.nav?.switchTheme || "Switch Theme"}
          >
            <Palette className="w-3.5 h-3.5" style={{ color: themeConfig?.previewColors?.[0] || '#10b981' }} />
          </button>

          {/* Content Detox Toggle */}
          <button
            onClick={toggleDetoxMode}
            className={`p-2 rounded-xl text-xs transition border flex items-center justify-center flex-1 ${
              isDetoxMode
                ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/40'
                : isLight
                ? 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                : 'bg-slate-900/80 text-slate-400 border-white/10 hover:text-white'
            }`}
            title={isDetoxMode ? "Detox Active" : "Content Detox"}
          >
            <Shield className="w-3.5 h-3.5" />
          </button>

          {/* Language Switcher */}
          <div className="relative flex-1">
            <button
              onClick={() => setIsLangMenuOpen(prev => !prev)}
              className={`w-full p-2 rounded-xl text-xs font-bold transition border flex items-center justify-center gap-1 ${
                isLight
                  ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border-white/10'
              }`}
              title="Language"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-500" />
              <span className="hidden md:inline uppercase text-[10px]">{language}</span>
            </button>

            {isLangMenuOpen && (
              <div className={`absolute bottom-full left-0 mb-2 w-36 rounded-2xl border shadow-2xl p-1.5 z-50 animate-fade-in backdrop-blur-2xl ${
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
            className={`w-full p-2 rounded-2xl border flex items-center justify-between gap-2 transition ${
              isLight
                ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-900'
                : 'bg-slate-900/90 hover:bg-slate-800 border-white/10 text-white'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-xl overflow-hidden flex-shrink-0 bg-slate-950">
                <img
                  src={userProfile?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden md:flex flex-col text-left min-w-0">
                <span className="text-xs font-bold truncate block">{localizedAccountName}</span>
                <span className="text-[10px] text-cyan-500 font-mono font-medium truncate block">
                  {userProfile?.handle || '@alex_explorer'}
                </span>
              </div>
            </div>
            <MoreVertical className="hidden md:block w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          </button>

          {/* User Profile Popover Menu */}
          {isUserMenuOpen && (
            <div className={`absolute bottom-full left-0 mb-2 w-56 rounded-2xl border shadow-2xl p-2 z-50 animate-fade-in backdrop-blur-2xl space-y-1 ${
              isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-white/15 text-white'
            }`}>
              <div className={`p-2 border-b ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                <span className="text-xs font-bold block">{localizedAccountName}</span>
                <span className="text-[10px] text-slate-400 block">{userProfile?.handle || '@alex_explorer'}</span>
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
