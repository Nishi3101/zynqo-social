import React, { useState } from 'react';
import { 
  Sparkles, 
  Play, 
  Clock, 
  ShieldCheck, 
  FileText, 
  Brain, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  Video, 
  Globe, 
  HelpCircle,
  Zap,
  Palette,
  User,
  LogOut,
  SlidersHorizontal,
  Check,
  Sun,
  Moon
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { themes } from '../utils/theme';
import { ThemeType, LanguageCode } from '../types';
import { HomeAtmosphere } from './HomeAtmosphere';
import { LiveRadar } from './LiveRadar';

interface LandingHomeProps {
  onOpenAuth: (step?: 'login' | 'onboarding') => void;
}

export const LandingHome: React.FC<LandingHomeProps> = ({ onOpenAuth }) => {
  const { 
    setCurrentPage, 
    reels, 
    openModal, 
    currentTheme, 
    setTheme, 
    openThemeModal, 
    isLoggedIn, 
    userProfile, 
    logoutUser,
    colorMode,
    toggleColorMode,
    language,
    setLanguage,
    t
  } = useApp();
  
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const isLight = colorMode === 'light';
  const theme = themes[currentTheme] || themes.emerald;
  const previewReel = reels[0] || null;

  const languages: { code: LanguageCode; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
    { code: 'gu', label: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  ];

  return (
    <div className={`min-h-screen w-full transition-colors duration-200 overflow-y-auto font-sans relative ${
      isLight ? 'bg-[#f8fafc] text-slate-900' : 'bg-[#06080e] text-slate-100'
    }`}>
      {/* Background Atmosphere & Interactive Floating Doodles */}
      <HomeAtmosphere isLight={isLight} />

      {/* Top Universal Navbar */}
      {/* Top Universal Navbar */}
      <header className={`sticky top-0 z-50 backdrop-blur-2xl border-b px-3 sm:px-6 md:px-12 py-2.5 sm:py-3 flex items-center justify-between transition-colors ${
        isLight ? 'bg-white/90 border-slate-200 text-slate-900 shadow-sm' : 'bg-[#0a0d14]/85 border-white/10 text-slate-100'
      }`}>
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
            <img
              src="/zynqo-symbol.png"
              alt="Zynqo Logo"
              className="w-full h-full object-contain drop-shadow-[0_2px_10px_rgba(6,182,212,0.4)]"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className={`font-display text-base sm:text-lg md:text-xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Zynqo<span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradient}`}>Social</span>
              </span>
              <span className={`hidden sm:inline-block px-2 py-0.5 rounded text-[9px] font-sans font-semibold uppercase tracking-wider ${theme.badgeClass}`}>
                Company Hackathon Edition
              </span>
            </div>
          </div>
        </div>

        {/* Right Navigation Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-shrink-0">
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleColorMode}
            className={`p-1.5 sm:p-2 rounded-xl border text-xs font-sans font-medium flex items-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300 shadow-sm hover:border-slate-400'
                : 'bg-slate-900 hover:bg-slate-800 text-amber-300 border-white/15 hover:border-white/30'
            }`}
            title={isLight ? "Switch to Dark Mode (🌙)" : "Switch to Light Mode (☀️)"}
          >
            {isLight ? (
              <>
                <Moon className="w-4 h-4 text-indigo-600" />
                <span className="hidden md:inline text-slate-700 font-medium">Dark</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden md:inline text-slate-200 font-medium">Light</span>
              </>
            )}
          </button>

          {/* Theme Palette Switcher Button */}
          <button
            onClick={openThemeModal}
            className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-xl border text-xs font-sans font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300 hover:border-slate-400'
                : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-white/15 hover:border-white/30'
            }`}
            title="Switch color palette"
          >
            <Palette className={`w-3.5 h-3.5 ${theme.textAccent}`} />
            <span className="hidden md:inline text-[11px] opacity-75">Palette:</span>
            <span className={`hidden sm:inline text-xs font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{theme.name.split(' ')[0]}</span>
            <div className="hidden md:flex -space-x-1 ml-0.5">
              {theme.previewColors.map((col, idx) => (
                <span
                  key={idx}
                  className="w-2.5 h-2.5 rounded-full border border-black/30 inline-block"
                  style={{ backgroundColor: col }}
                />
              ))}
            </div>
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(prev => !prev)}
              className={`px-2.5 py-1.5 rounded-xl border text-xs font-sans font-medium flex items-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800 hover:border-slate-400'
                  : 'bg-slate-900 hover:bg-slate-800 border-white/15 text-slate-200 hover:border-white/30'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-cyan-500" />
              <span className="uppercase text-[11px] font-semibold">{language}</span>
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
                    className={`w-full px-2.5 py-1.5 rounded-xl text-left text-xs font-sans font-medium flex items-center justify-between transition-all duration-150 ${
                      language === lang.code
                        ? isLight ? 'bg-slate-100 text-slate-950 font-bold' : 'bg-white/10 text-white font-bold'
                        : isLight ? 'text-slate-700 hover:bg-slate-100 hover:translate-x-0.5' : 'text-slate-300 hover:bg-white/10 hover:translate-x-0.5'
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

          {/* User Auth Status */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage('profile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-sans transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 ${
                  isLight
                    ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200 hover:border-slate-400'
                    : 'bg-slate-900 border-white/15 text-slate-200 hover:text-white hover:border-white/30'
                }`}
                title="View Profile & Activity"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 text-[10px] font-bold flex items-center justify-center text-white overflow-hidden">
                  {userProfile.avatar && userProfile.avatar.startsWith('http') ? (
                    <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{userProfile.name.charAt(0)}</span>
                  )}
                </div>
                <span className="hidden sm:inline font-semibold">{userProfile.name}</span>
              </button>
              <button
                onClick={() => logoutUser()}
                className={`p-1.5 rounded-xl border border-transparent transition-all duration-200 hover:scale-105 active:scale-95 text-xs flex items-center ${
                  isLight
                    ? 'hover:bg-red-50 text-slate-500 hover:text-red-500 hover:border-red-200'
                    : 'hover:bg-red-500/20 text-slate-400 hover:text-red-400 hover:border-red-500/30'
                }`}
                title={t.nav?.signOut || "Sign Out"}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onOpenAuth('login')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-sans font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
                  isLight ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-100' : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {language === 'gu' ? 'સાઇન ઇન' : language === 'hi' ? 'साइन इन' : 'Sign In'}
              </button>
              <button
                onClick={() => onOpenAuth('onboarding')}
                className={`hidden sm:inline-flex px-3 py-1.5 rounded-xl text-xs font-sans font-medium border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 ${
                  isLight
                    ? 'text-slate-700 border-slate-300 hover:bg-slate-100 hover:border-slate-400'
                    : 'text-slate-300 border-white/10 hover:border-white/30 hover:bg-white/5'
                }`}
              >
                {language === 'gu' ? 'રુચિઓ' : language === 'hi' ? 'रुચियां' : 'Onboarding'}
              </button>
            </div>
          )}

          {/* Launch Feed CTA */}
          <button
            onClick={() => setCurrentPage('feed')}
            className={`px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-xl ${theme.buttonClass} text-xs md:text-sm font-sans font-semibold shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:brightness-105 active:translate-y-0 flex items-center gap-1.5 flex-shrink-0 group`}
          >
            <span className="hidden sm:inline">{language === 'gu' ? 'ફીડ શરૂ કરો' : language === 'hi' ? 'फ़ीड शुरू करें' : 'Launch Feed'}</span>
            <span className="sm:hidden">{language === 'gu' ? 'ફીડ' : language === 'hi' ? 'फ़ीड' : 'Feed'}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 md:px-12 pt-8 sm:pt-10 pb-12 sm:pb-16 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
        {/* Left Copy */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-sans font-medium ${
            isLight ? 'bg-slate-100 border-slate-300 text-slate-800' : 'bg-white/5 border-white/10 text-slate-200'
          }`}>
            <Zap className={`w-3.5 h-3.5 ${theme.textAccent}`} />
            <span>{t.landing?.badge || 'Next-Gen Social Entertainment Platform • 190-Feature Ecosystem'}</span>
          </div>

          <h1 className={`font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.12] ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {t.landing?.heroTitle || 'Entertainment That Respects Your Time & Turns Every Reel Into '}
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradient}`}>
              {t.landing?.heroHighlight || 'Real-World Action.'}
            </span>
          </h1>

          <p className={`font-sans text-sm md:text-base font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0 ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            <span className={`italic ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              {t.landing?.heroSubtitle || 'Traditional platforms ask: "How long can we keep you scrolling?"'}
            </span>
            <br />
            <strong className="font-semibold">Zynqo Social</strong>: <span className={`${theme.textAccent} font-medium`}>
              {t.landing?.heroSubtitleAuthor || 'asks: "What do you need right now, how much time do you have, and how can we make that time meaningful?"'}
            </span>
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
            <button
              onClick={() => setCurrentPage('feed')}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl ${theme.buttonClass} font-sans font-semibold text-sm shadow-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:brightness-105 active:translate-y-0 flex items-center justify-center gap-2.5 group`}
            >
              <Play className="w-4 h-4 fill-current transition-transform duration-200 group-hover:scale-110" />
              <span>{t.landing?.exploreFeed || 'Explore AI Reels Feed'}</span>
            </button>
            <button
              onClick={() => onOpenAuth('onboarding')}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl border font-sans font-medium text-xs md:text-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-cyan-500/40 active:translate-y-0 flex items-center justify-center gap-2 group ${
                isLight 
                  ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-sm'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-white/15'
              }`}
            >
              <Sparkles className={`w-4 h-4 ${theme.textAccent} transition-transform duration-200 group-hover:rotate-12`} />
              <span>{t.landing?.personalize || 'Personalize Profile (Onboarding)'}</span>
            </button>
          </div>

          {/* Quick Pillars Badges */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className={`p-3 rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-default ${
              isLight ? 'bg-white border-slate-200 shadow-sm hover:border-slate-400' : 'bg-slate-900/60 border-white/10 hover:border-cyan-500/40'
            }`}>
              <span className={`font-mono text-[10px] uppercase font-semibold ${theme.textAccent} block tracking-wider`}>Pillar 1</span>
              <span className={`font-display text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {t.landing?.pillar1Title || 'Personal Entertainment OS'}
              </span>
            </div>
            <div className={`p-3 rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-default ${
              isLight ? 'bg-white border-slate-200 shadow-sm hover:border-slate-400' : 'bg-slate-900/60 border-white/10 hover:border-amber-500/40'
            }`}>
              <span className="font-mono text-[10px] uppercase font-semibold text-amber-500 block tracking-wider">Pillar 2</span>
              <span className={`font-display text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {t.landing?.pillar2Title || '"I Have 5 Mins" Mode'}
              </span>
            </div>
            <div className={`p-3 rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-default ${
              isLight ? 'bg-white border-slate-200 shadow-sm hover:border-slate-400' : 'bg-slate-900/60 border-white/10 hover:border-emerald-500/40'
            }`}>
              <span className="font-mono text-[10px] uppercase font-semibold text-emerald-500 block tracking-wider">Pillar 3</span>
              <span className={`font-display text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {t.landing?.pillar3Title || 'Make This Useful (Quiz/Notes)'}
              </span>
            </div>
            <div className={`p-3 rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-default ${
              isLight ? 'bg-white border-slate-200 shadow-sm hover:border-slate-400' : 'bg-slate-900/60 border-white/10 hover:border-violet-500/40'
            }`}>
              <span className="font-mono text-[10px] uppercase font-semibold text-violet-500 block tracking-wider">Pillar 4</span>
              <span className={`font-display text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {t.landing?.pillar4Title || 'AI Reality Check & Shield'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side Live Radar */}
        <LiveRadar
          onExplore={() => setCurrentPage('feed')}
          theme={theme}
          isLight={isLight}
        />
      </section>

      {/* Corporate Palette & Mode Picker Banner */}
      <section className={`px-4 md:px-12 py-10 border-t border-b transition-colors ${
        isLight ? 'bg-slate-100/70 border-slate-200' : 'bg-slate-950/70 border-white/10'
      }`}>
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <Palette className={`w-4 h-4 ${theme.textAccent}`} />
                <span className={`font-display text-xs font-bold uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Corporate-Grade Visual Themes & Light/Dark Modes
                </span>
              </div>
              <p className={`font-sans text-xs font-normal ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Switch between Dark Mode / Light Mode and test 5 executive brand identities live with one click:
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Quick Toggle in Banner */}
              <button
                onClick={toggleColorMode}
                className={`px-3 py-1 rounded-lg border text-xs font-sans font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 flex items-center gap-1.5 ${
                  isLight
                    ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-sm hover:border-slate-400'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/15 hover:border-white/30'
                }`}
              >
                {isLight ? <Moon className="w-3.5 h-3.5 text-indigo-600" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
                <span>{isLight ? 'Switch to Dark' : 'Switch to Light'}</span>
              </button>

              <button
                onClick={openThemeModal}
                className={`px-3 py-1 rounded-lg border text-xs font-sans font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 flex items-center gap-1.5 ${
                  isLight
                    ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-sm hover:border-slate-400'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/15 hover:border-white/30'
                }`}
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>Palette Details</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {(Object.keys(themes) as ThemeType[]).map((paletteKey) => {
              const pal = themes[paletteKey];
              const isActive = currentTheme === paletteKey;
              return (
                <button
                  key={paletteKey}
                  onClick={() => setTheme(paletteKey)}
                  className={`p-3.5 rounded-2xl text-left border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 relative flex flex-col justify-between group ${
                    isActive
                      ? isLight
                        ? 'bg-white border-slate-400 ring-2 ring-slate-400 shadow-md'
                        : `bg-white/10 ${pal.borderAccent} ring-1 ring-white/30 shadow-lg`
                      : isLight
                      ? 'bg-white/70 border-slate-200 hover:border-slate-400 hover:bg-white shadow-sm'
                      : 'bg-slate-900/40 border-white/10 hover:border-white/30 hover:bg-slate-900/70'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-display text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{pal.name}</span>
                      {isActive && (
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          isLight ? 'bg-slate-900 text-white' : 'bg-white text-slate-950'
                        }`}>
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <p className={`font-sans text-[10px] font-normal line-clamp-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{pal.tagline}</p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex gap-1.5">
                      {pal.previewColors.map((color, i) => (
                        <span
                          key={i}
                          className="w-3.5 h-3.5 rounded-full border border-black/30 transition-transform duration-200 group-hover:scale-110"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
                      {paletteKey}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison: Traditional Platforms vs PulseAI */}
      <section className="px-4 md:px-12 py-16 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className={`font-display text-2xl md:text-4xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {t.landing?.comparisonTitle || 'Why We Are Replacing Passive Feeds'}
          </h2>
          <p className={`font-sans text-xs md:text-sm font-normal ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            {t.landing?.comparisonSubtitle || 'The fundamental paradigm shift of the Next-Gen Social Entertainment Platform.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Traditional */}
          <div className={`p-6 rounded-3xl border space-y-3 transition-all duration-300 hover:border-red-400/40 hover:shadow-lg ${
            isLight
              ? 'bg-red-50/80 border-red-200 text-slate-800'
              : 'bg-red-950/20 border-red-500/20 text-slate-300'
          }`}>
            <span className="font-display text-xs font-bold uppercase text-red-500 block tracking-wider">
              {t.landing?.traditionalTitle || 'Traditional Short-Form Platforms'}
            </span>
            <ul className="space-y-2 font-sans text-xs md:text-sm font-normal">
              <li className="flex items-center gap-2">
                <span className="text-red-500 font-bold">✕</span>
                <span>{t.landing?.traditional1 || 'Endless, infinite scroll with zero intentional stopping points'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500 font-bold">✕</span>
                <span>{t.landing?.traditional2 || 'Unverified viral health, finance, and science myths go unchecked'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500 font-bold">✕</span>
                <span>{t.landing?.traditional3 || 'Passive dopamine loop: You forget what you watched 10s later'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500 font-bold">✕</span>
                <span>{t.landing?.traditional4 || 'No concept of daily attention budgets or learning goals'}</span>
              </li>
            </ul>
          </div>

          {/* Zynqo Social */}
          <div className={`p-6 rounded-3xl border space-y-3 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-cyan-500/40 ${
            isLight
              ? 'bg-white border-slate-200 text-slate-800'
              : 'bg-slate-900/80 border-white/15 text-slate-200'
          }`}>
            <span className={`font-display text-xs font-bold uppercase ${theme.textAccent} block tracking-wider`}>
              {t.landing?.zynqoTitle || 'Zynqo Social Entertainment OS'}
            </span>
            <ul className="space-y-2 font-sans text-xs md:text-sm font-normal">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{t.landing?.zynqo1 || '"I Have 5 Minutes" structured sessions with Smart Session Endings'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{t.landing?.zynqo2 || 'AI Reality Check with peer-reviewed source transparency'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{t.landing?.zynqo3 || '"Make This Useful": Instant AI Notes, Quizzes, and Action Checklists'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{t.landing?.zynqo4 || 'Entertainment Nutrition Label & Attention Budget protection'}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className={`px-4 md:px-12 py-16 text-center space-y-6 border-t ${
        isLight ? 'bg-slate-100/50 border-slate-200' : 'bg-slate-950/40 border-white/10'
      }`}>
        <h2 className={`font-display text-3xl md:text-4xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
          {t.landing?.ctaTitle || 'Ready for Intelligent Entertainment?'}
        </h2>
        <p className={`font-sans text-xs md:text-sm font-normal max-w-md mx-auto ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          {t.landing?.ctaSubtitle || 'Start your personalized session now and turn digital reels into real-world achievements.'}
        </p>
        <button
          onClick={() => setCurrentPage('feed')}
          className={`px-8 py-4 rounded-2xl ${theme.buttonClass} font-sans font-semibold text-sm md:text-base shadow-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:brightness-105 active:translate-y-0 inline-flex items-center gap-2.5 group`}
        >
          <Sparkles className="w-5 h-5 transition-transform duration-200 group-hover:rotate-12" />
          <span>{t.landing?.ctaButton || 'Launch Zynqo Social Experience'}</span>
        </button>
      </section>
    </div>
  );
};
