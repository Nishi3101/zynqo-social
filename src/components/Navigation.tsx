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
  ChevronDown
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isLight = colorMode === 'light';
  const themeConfig = themes[currentTheme] || themes.emerald;

  const intents: { id: IntentType; label: string; icon: string }[] = [
    { id: 'all', label: t.intents.all, icon: '⚡' },
    { id: 'teach', label: t.intents.teach, icon: '🧠' },
    { id: 'achieve', label: t.intents.achieve, icon: '🎯' },
    { id: 'relax', label: t.intents.relax, icon: '🌿' },
    { id: 'entertain', label: t.intents.entertain, icon: '🎭' },
    { id: 'inspire', label: t.intents.inspire, icon: '✨' },
    { id: 'connect', label: t.intents.connect, icon: '🤝' },
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
    <header className={`w-full z-40 sticky top-0 px-2.5 sm:px-4 md:px-6 py-2 sm:py-2.5 flex flex-col gap-1.5 sm:gap-2 transition-colors ${
      isLight 
        ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 text-slate-900 shadow-sm'
        : 'bg-[#0a0d14]/90 backdrop-blur-xl border-b border-white/10 text-slate-100'
    }`}>
      {/* Top Bar: Brand + Quick Modules + Theme + Mode + User Stats */}
      <div className="flex items-center justify-between gap-1.5 sm:gap-2">
        {/* Brand & Home Link */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-shrink-0">
          <button
            onClick={() => setCurrentPage('home')}
            className={`p-1.5 rounded-xl border transition ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border-white/10'
            }`}
            title="Back to Landing Page"
          >
            <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <div 
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
                <img
                  src="/zynqo-symbol.png"
                  alt="Zynqo Logo"
                  className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(6,182,212,0.4)]"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className={`font-display text-sm sm:text-base md:text-lg font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Zynqo<span className={`text-transparent bg-clip-text bg-gradient-to-r ${themeConfig.gradient}`}>Social</span>
                </span>
                <span className={`hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-sans font-semibold uppercase tracking-wider ${themeConfig.badgeClass}`}>
                  MVP
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Modules Nav (Desktop & Tablet) */}
        <div className="hidden lg:flex items-center gap-2">
          {/* I Have X Minutes */}
          <button
            onClick={() => openModal('timeSession')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition shadow-sm ${
              timeSession.isActive
                ? 'bg-amber-500 text-slate-950 font-bold animate-pulse'
                : isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10'
            }`}
            title={t.actions.timeSession}
          >
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>
              {timeSession.isActive
                ? `${sessionMinutesLeft}:${sessionSecondsLeft < 10 ? '0' : ''}${sessionSecondsLeft} ${t.nav?.timeLeft || 'Left'}`
                : t.actions.timeSession}
            </span>
          </button>

          {/* Goal Pathways */}
          <button
            onClick={() => openModal('goalPaths')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10'
            }`}
            title={t.nav?.curatedLearning || t.actions.goalPaths}
          >
            <Compass className="w-3.5 h-3.5 text-emerald-500" />
            <span>{t.actions.goalPaths}</span>
          </button>

          {/* Watch Together */}
          <button
            onClick={() => openModal('watchTogether')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10'
            }`}
            title={t.nav?.watchParties || t.actions.watchTogether}
          >
            <Users className="w-3.5 h-3.5 text-violet-500" />
            <span>{t.actions.watchTogether}</span>
          </button>

          {/* Creator Studio */}
          <button
            onClick={() => openModal('creatorStudio')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10'
            }`}
            title={t.nav?.creatorStudioTip || "AI Creator Studio"}
          >
            <Video className="w-3.5 h-3.5 text-pink-500" />
            <span>{t.nav?.studio || 'Studio'}</span>
          </button>

          {/* Digital Wellbeing */}
          <button
            onClick={() => openModal('wellbeing')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10'
            }`}
            title={t.nav?.wellbeingTip || "Attention Nutrition & Screen-time Protection"}
          >
            <PieChart className="w-3.5 h-3.5 text-cyan-500" />
            <span>{t.actions.wellbeing}</span>
          </button>

          {/* Memory Vault */}
          <button
            onClick={() => openModal('memoryVault')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10'
            }`}
            title={t.nav?.memoryTip || "Personal AI Memory & Learning Vault"}
          >
            <Brain className="w-3.5 h-3.5 text-teal-500" />
            <span>{t.nav?.memory || 'Memory'}</span>
          </button>
        </div>

        {/* Right Tools: Mode Switcher, Theme Switcher, Search, Language, Account Dropdown */}
        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 flex-shrink-0">
          {/* LIGHT / DARK MODE TOGGLE BUTTON */}
          <button
            onClick={toggleColorMode}
            className={`p-1.5 rounded-full text-xs font-semibold transition border ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300 shadow-sm'
                : 'bg-slate-800/90 hover:bg-slate-700 text-amber-300 border-white/15'
            }`}
            title={isLight ? (t.nav?.darkMode || "Switch to Dark Mode") : (t.nav?.lightMode || "Switch to Light Mode")}
          >
            {isLight ? <Moon className="w-4 h-4 text-indigo-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* THEME COLOR PALETTE SWITCHER BUTTON */}
          <button
            onClick={openThemeModal}
            className={`px-2.5 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1.5 transition shadow-sm ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                : 'bg-slate-800/90 hover:bg-slate-700 border-white/15 text-slate-200'
            }`}
            title={t.nav?.switchTheme || "Switch Theme / Color Palette"}
          >
            <Palette className="w-3.5 h-3.5" style={{ color: themeConfig?.previewColors?.[0] || '#10b981' }} />
            <span className="hidden sm:inline">{displayThemeName}</span>
          </button>

          {/* Content Detox Mode Toggle */}
          <button
            onClick={toggleDetoxMode}
            className={`p-1.5 rounded-full text-xs font-semibold transition border ${
              isDetoxMode
                ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/40 shadow-emerald-500/20 shadow-md'
                : isLight
                ? 'bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-300'
                : 'bg-slate-800/80 text-slate-400 hover:text-white border-white/10'
            }`}
            title={isDetoxMode ? (t.nav?.detoxActive || "Detox Mode Active") : (t.nav?.detoxTip || "Enable Content Detox Mode")}
          >
            <Shield className="w-4 h-4" />
          </button>

          {/* Search Toggle */}
          <button
            onClick={() => setIsSearchOpen(prev => !prev)}
            className={`p-1.5 rounded-full border transition ${
              isLight
                ? 'bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-300'
                : 'bg-slate-800/80 text-slate-400 hover:text-white border-white/10'
            }`}
            title={t.nav?.searchTip || "Search AI Reels"}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(prev => !prev)}
              className={`px-2 py-1 rounded-full border text-xs font-medium flex items-center gap-1.5 transition ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                  : 'bg-slate-800/80 hover:bg-slate-700/80 border-white/10 text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-cyan-500" />
              <span className="uppercase text-[10px] font-bold">{language}</span>
            </button>

            {isLangMenuOpen && (
              <div className={`absolute right-0 mt-2 w-36 rounded-2xl border shadow-2xl p-1.5 z-50 animate-fade-in backdrop-blur-2xl ${
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
                        ? isLight ? 'bg-slate-100 text-slate-950 font-bold' : 'bg-white/10 text-white font-bold'
                        : isLight ? 'text-slate-700 hover:bg-slate-50' : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </span>
                    {language === lang.code && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* USER ACCOUNT DROPDOWN WITH SIGN OUT / SWITCH USER */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(prev => !prev)}
              className={`px-2.5 py-1 rounded-full border text-xs flex items-center gap-1.5 transition ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                  : 'bg-slate-800/90 hover:bg-slate-700 border-white/15 text-slate-200'
              }`}
            >
              <User className="w-3.5 h-3.5" style={{ color: themeConfig.previewColors[0] }} />
              <span className="hidden sm:inline font-bold">
                {localizedAccountName}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isUserMenuOpen && (
              <div className={`absolute right-0 mt-2 w-56 rounded-2xl border shadow-2xl p-2 z-50 animate-fade-in backdrop-blur-2xl space-y-1 ${
                isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-white/15 text-white'
              }`}>
                <div className={`p-2 border-b ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                  <span className={`text-xs font-bold block ${isLight ? 'text-slate-900' : 'text-white'}`}>{localizedAccountName}</span>
                  <span className={`text-[10px] block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{userProfile?.handle || '@alex_explorer'}</span>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                      {userProfile?.xp} XP • Lvl {userProfile?.level}
                    </span>
                  </div>
                </div>

                {/* My Profile & Activity Section */}
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
                  <span>{t.profile?.title || 'My Profile & Activity'}</span>
                </button>

                {/* AI Creator Studio (Multi-Language, Dialects & Slang) */}
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    openModal('creatorStudio');
                  }}
                  className={`w-full px-2.5 py-2 rounded-xl text-left text-xs font-semibold flex items-center gap-2 transition ${
                    isLight ? 'text-pink-700 hover:bg-pink-50' : 'text-pink-400 hover:bg-pink-950/40'
                  }`}
                >
                  <Video className="w-4 h-4 text-pink-400" />
                  <span>{t.actions.creatorStudio || 'AI Creator Studio'}</span>
                </button>

                {/* Quick Toggle Light / Dark Mode in Menu */}
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    toggleColorMode();
                  }}
                  className={`w-full px-2.5 py-2 rounded-xl text-left text-xs font-medium flex items-center gap-2 transition ${
                    isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-200 hover:bg-white/10'
                  }`}
                >
                  {isLight ? <Moon className="w-4 h-4 text-indigo-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
                  <span>{t.nav?.display || 'Display'}: {isLight ? (t.nav?.lightMode || 'Light Mode') : (t.nav?.darkMode || 'Dark Mode')}</span>
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
                  <span>{t.nav?.switchAccount || 'Switch Account / Sign In'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    openAuthModal('onboarding');
                  }}
                  className={`w-full px-2.5 py-2 rounded-xl text-left text-xs font-medium flex items-center gap-2 transition ${
                    isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-200 hover:bg-white/10'
                  }`}
                >
                  <Compass className="w-4 h-4 text-emerald-500" />
                  <span>{t.nav?.editInterests || 'Edit Interests & Budget'}</span>
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
                  <span>{t.nav?.resetLimit || 'Reset Daily Time Used (0m)'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    openThemeModal();
                  }}
                  className={`w-full px-2.5 py-2 rounded-xl text-left text-xs font-medium flex items-center gap-2 transition ${
                    isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-200 hover:bg-white/10'
                  }`}
                >
                  <Palette className="w-4 h-4 text-violet-500" />
                  <span>{t.nav?.switchTheme || 'Switch Color Theme'}</span>
                </button>

                <div className={`pt-1 border-t ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      logoutUser();
                    }}
                    className="w-full px-2.5 py-2 rounded-xl text-left text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-2 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t.nav?.signOut || 'Sign Out'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Input Bar (Dropdown expandable) */}
      {isSearchOpen && (
        <div className="w-full flex items-center gap-2 py-1 animate-fade-in">
          <div className="relative flex-1">
            <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${isLight ? 'text-slate-400' : 'text-slate-400'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t.nav?.searchPlaceholder || "Describe what you want to learn, watch or achieve (Natural Language Search)..."}
              className={`w-full pl-9 pr-4 py-1.5 rounded-xl border text-xs focus:outline-none focus:border-cyan-400 transition ${
                isLight 
                  ? 'bg-slate-100 border-slate-300 text-slate-900 placeholder:text-slate-400' 
                  : 'bg-slate-900 border-white/15 text-white placeholder:text-slate-500'
              }`}
              autoFocus
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className={`text-xs ${isLight ? 'text-slate-500 hover:text-slate-800' : 'text-slate-400 hover:text-white'}`}
            >
              {t.nav?.clear || 'Clear'}
            </button>
          )}
        </div>
      )}

      {/* Personal Entertainment OS (Concept 180): "What do you need right now?" */}
      <div className="w-full flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar scroll-smooth touch-pan-x">
        <span className={`text-[11px] font-semibold whitespace-nowrap mr-1 hidden sm:inline ${
          isLight ? 'text-slate-500' : 'text-slate-400'
        }`}>
          {t.whatDoYouNeed}
        </span>
        {intents.map(item => {
          const isActive = intent === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setIntent(item.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                isActive
                  ? `${themeConfig.buttonClass} text-white shadow-md scale-105`
                  : isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-white/10 hover:border-white/20'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
