import React, { useState } from 'react';
import { 
  Search, 
  Globe, 
  Sun, 
  Moon, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Flame,
  Check,
  Bot,
  Mic,
  MicOff
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { triggerHaptic } from '../utils/nativeBridge';
import { languages } from '../utils/languages';

export const MobileTopBar: React.FC = () => {
  const { 
    colorMode, 
    toggleColorMode, 
    language, 
    setLanguage, 
    searchQuery, 
    setSearchQuery,
    currentPage,
    setCurrentPage,
    isDetoxMode,
    openModal,
    t
  } = useApp();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const isLight = colorMode === 'light';

  const handleVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search is supported in Chrome, Edge, and Safari.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 
        language === 'gu' ? 'gu-IN' :
        language === 'hi' ? 'hi-IN' :
        language === 'mr' ? 'mr-IN' :
        language === 'te' ? 'te-IN' :
        language === 'es' ? 'es-ES' :
        language === 'fr' ? 'fr-FR' :
        language === 'ja' ? 'ja-JP' :
        language === 'de' ? 'de-DE' : 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
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

  return (
    <>
      <header className={`md:hidden sticky top-0 left-0 right-0 z-40 border-b backdrop-blur-xl transition-colors duration-200 select-none ${
        isLight 
          ? 'bg-white/90 border-rose-100/80 text-slate-900 shadow-sm' 
          : 'bg-[#0d0b14]/90 border-white/10 text-white'
      }`} style={{ paddingTop: 'max(env(safe-area-inset-top), 8px)' }}>
        <div className="flex items-center justify-between px-3.5 py-2.5">
          {/* Brand Logo & Name */}
          <button 
            onClick={() => {
              triggerHaptic('light');
              setCurrentPage('home');
            }}
            className="flex items-center gap-2 text-left"
          >
            <div className="w-7 h-7 flex-shrink-0">
              <img 
                src="/zynqo-symbol.png" 
                alt="Zynqo" 
                className={`w-full h-full object-contain ${
                  isLight ? 'drop-shadow-[0_2px_8px_rgba(244,63,94,0.35)]' : 'drop-shadow-[0_2px_8px_rgba(236,72,153,0.4)]'
                }`} 
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-sm font-extrabold tracking-tight">
                Zynqo<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600">Social</span>
              </span>
              <span className="text-[8px] font-mono font-medium text-pink-500 uppercase tracking-wider">
                Mobile
              </span>
            </div>
          </button>

          {/* Center Detox status pill if active */}
          {isDetoxMode && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold animate-pulse">
              <ShieldCheck className="w-3 h-3" />
              <span>Detox</span>
            </div>
          )}

          {/* Quick Action Icons */}
          <div className="flex items-center gap-1.5">
            {/* Nova AI Companion Trigger */}
            <button
              onClick={() => {
                triggerHaptic('medium');
                openModal('aiCompanion');
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 via-pink-500/20 to-purple-500/20 border border-cyan-400/40 text-cyan-300 shadow-sm active:scale-95 transition"
              title="Nova AI Companion"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="text-[11px] font-bold text-white tracking-tight">Nova</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => {
                triggerHaptic('light');
                setIsSearchOpen(prev => !prev);
              }}
              className={`p-2 rounded-xl transition ${
                isSearchOpen 
                  ? 'bg-rose-500 text-white' 
                  : isLight ? 'text-slate-700 hover:bg-rose-50' : 'text-slate-300 hover:bg-white/10'
              }`}
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Language Switcher Button */}
            <button
              onClick={() => {
                triggerHaptic('light');
                setIsLangOpen(prev => !prev);
              }}
              className={`p-2 rounded-xl transition flex items-center gap-0.5 text-xs font-bold uppercase ${
                isLangOpen 
                  ? isLight ? 'bg-rose-100 text-rose-800' : 'bg-pink-950/60 text-pink-300'
                  : isLight ? 'text-slate-700 hover:bg-rose-50' : 'text-slate-300 hover:bg-white/10'
              }`}
              title="Change Language"
            >
              <Globe className="w-4 h-4 text-rose-500" />
              <span className="text-[10px]">{language}</span>
            </button>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={() => {
                triggerHaptic('medium');
                toggleColorMode();
              }}
              className={`p-2 rounded-xl transition ${
                isLight 
                  ? 'text-amber-600 hover:bg-amber-50' 
                  : 'text-yellow-400 hover:bg-white/10'
              }`}
              title="Toggle Theme"
            >
              {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Expandable Input */}
        {isSearchOpen && (
          <div className="px-3 pb-2.5 pt-1 animate-fade-in flex items-center gap-2">
            <div className={`flex-1 flex items-center gap-2 px-3 py-1.5 rounded-xl border ${
              isLight ? 'bg-rose-50/50 border-rose-200 text-slate-900' : 'bg-[#181328] border-white/15 text-white'
            }`}>
              <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t.nav?.searchPlaceholder || 'Search AI reels, topics, creators...'}
                className="bg-transparent border-none outline-none text-xs w-full text-inherit placeholder:text-slate-400"
                autoFocus
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="p-0.5">
                  <X className="w-3.5 h-3.5 text-slate-400" />
                </button>
              )}
              <button
                type="button"
                onClick={handleVoiceSearch}
                className={`p-1 rounded-lg transition-all ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/50'
                    : isLight
                    ? 'text-slate-500 hover:text-cyan-600 hover:bg-slate-200'
                    : 'text-slate-400 hover:text-cyan-400 hover:bg-white/10'
                }`}
                title={isListening ? "Listening... speak now" : "Voice Search"}
              >
                {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              </button>
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-xs font-semibold px-2 py-1 text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>
        )}
      </header>

      {/* Language Selection Modal Sheet on Mobile */}
      {isLangOpen && (
        <div 
          className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end animate-fade-in"
          onClick={() => setIsLangOpen(false)}
        >
          <div 
            className={`w-full max-h-[70vh] rounded-t-3xl border-t p-4 pb-8 space-y-3 overflow-y-auto animate-slide-up ${
              isLight ? 'bg-white border-rose-100 text-slate-900' : 'bg-[#120d1e] border-white/15 text-white'
            }`}
            onClick={e => e.stopPropagation()}
            style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 24px)' }}
          >
            <div className="w-12 h-1.5 rounded-full bg-slate-400/40 mx-auto" />
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-rose-500" />
                Select Language / भाषा चुनें
              </h3>
              <button 
                onClick={() => setIsLangOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => {
                    triggerHaptic('light');
                    setLanguage(lang.code);
                    setIsLangOpen(false);
                  }}
                  className={`p-2.5 rounded-2xl border text-left text-xs font-medium flex items-center justify-between transition ${
                    language === lang.code
                      ? 'bg-rose-500/20 text-rose-500 border-rose-500 font-bold'
                      : isLight 
                      ? 'bg-slate-50 hover:bg-rose-50/60 border-slate-200 text-slate-800' 
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
                  }`}
                >
                  <span className="truncate">{lang.flag} {lang.label}</span>
                  {language === lang.code && <Check className="w-4 h-4 text-rose-500 flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
