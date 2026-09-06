import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navigation } from './components/Navigation';
import { ReelFeed } from './components/ReelFeed';
import { LandingHome } from './components/LandingHome';
import { AuthModal } from './components/AuthModal';
import { AICompanion } from './components/AICompanion';
import { MakeUsefulModal } from './components/MakeUsefulModal';
import { RealityCheckModal } from './components/RealityCheckModal';
import { ExplainModal } from './components/ExplainModal';
import { TimeSessionModal } from './components/TimeSessionModal';
import { GoalLearningView } from './components/GoalLearningView';
import { WatchTogetherRoom } from './components/WatchTogetherRoom';
import { DigitalWellbeingModal } from './components/DigitalWellbeingModal';
import { CreatorStudioModal } from './components/CreatorStudioModal';
import { MemoryVaultModal } from './components/MemoryVaultModal';
import { FirewallModal } from './components/FirewallModal';
import { ThemeModal } from './components/ThemeModal';
import { ProfileView } from './components/ProfileView';
import { Smartphone, Monitor, Keyboard, Home } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    isAuthModalOpen, 
    authInitialStep, 
    openAuthModal, 
    closeAuthModal, 
    isThemeModalOpen,
    closeThemeModal,
    activeModal,
    colorMode,
    t
  } = useApp();
  
  const [deviceFrameMode, setDeviceFrameMode] = useState<'mobile' | 'studio'>('mobile');
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const isLight = colorMode === 'light';

  // If user is on the Landing / Home page
  if (currentPage === 'home') {
    return (
      <div className={`w-full min-h-[100dvh] h-[100dvh] max-w-full overflow-x-hidden overflow-y-auto transition-colors duration-200 ${
        isLight ? 'bg-[#f8fafc] text-slate-900' : 'bg-[#06080e] text-slate-100'
      }`}>
        <LandingHome onOpenAuth={openAuthModal} />
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={closeAuthModal}
          initialStep={authInitialStep}
        />
        {isThemeModalOpen && (
          <ThemeModal isOpen={isThemeModalOpen} onClose={closeThemeModal} />
        )}
      </div>
    );
  }

  // If user is on the Profile & Activity page
  if (currentPage === 'profile') {
    return (
      <div className={`w-full min-h-[100dvh] h-[100dvh] max-w-full overflow-x-hidden overflow-y-auto transition-colors duration-200 ${
        isLight ? 'bg-[#f8fafc] text-slate-900' : 'bg-[#06080e] text-slate-100'
      }`}>
        <ProfileView />
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={closeAuthModal}
          initialStep={authInitialStep}
        />
        {isThemeModalOpen && (
          <ThemeModal isOpen={isThemeModalOpen} onClose={closeThemeModal} />
        )}
      </div>
    );
  }

  // If user is on the Reels Feed page
  return (
    <div className={`flex flex-col h-[100dvh] w-full max-w-full overflow-hidden font-sans transition-colors duration-200 ${
      isLight ? 'bg-[#f1f5f9] text-slate-900' : 'bg-[#07090e] text-slate-100'
    }`}>
      {/* Top Universal Navbar */}
      <Navigation />

      {/* Viewport Switcher Banner (Mobile Frame Preview vs Immersive Desktop Studio) */}
      <div className={`hidden md:flex items-center justify-between px-6 py-1 border-b text-[11px] transition-colors ${
        isLight 
          ? 'bg-white/80 border-slate-200 text-slate-600 shadow-sm'
          : 'bg-slate-950/60 border-white/5 text-slate-400'
      }`}>
        <div className="flex items-center gap-2">
          <span>{t.nav?.displayMode || 'Display Mode:'}</span>
          <button
            onClick={() => setDeviceFrameMode('mobile')}
            className={`px-2 py-0.5 rounded-md flex items-center gap-1 transition ${
              deviceFrameMode === 'mobile'
                ? 'bg-cyan-500/20 text-cyan-500 font-bold border border-cyan-500/40'
                : isLight ? 'text-slate-600 hover:text-slate-900' : 'hover:text-white'
            }`}
          >
            <Smartphone className="w-3 h-3" />
            <span>{t.nav?.mobileView || 'Mobile Reel View'}</span>
          </button>
          <button
            onClick={() => setDeviceFrameMode('studio')}
            className={`px-2 py-0.5 rounded-md flex items-center gap-1 transition ${
              deviceFrameMode === 'studio'
                ? 'bg-violet-500/20 text-violet-500 font-bold border border-violet-500/40'
                : isLight ? 'text-slate-600 hover:text-slate-900' : 'hover:text-white'
            }`}
          >
            <Monitor className="w-3 h-3" />
            <span>{t.nav?.studioView || 'Immersive Studio View'}</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentPage('home')}
            className={`flex items-center gap-1 transition ${isLight ? 'hover:text-cyan-600' : 'hover:text-cyan-300'}`}
          >
            <Home className="w-3.5 h-3.5 text-cyan-500" />
            <span>{t.nav?.landingPage || 'Landing Page'}</span>
          </button>
          <button
            onClick={() => setShowKeyboardHelp(prev => !prev)}
            className={`flex items-center gap-1 transition ${isLight ? 'hover:text-cyan-600' : 'hover:text-cyan-300'}`}
          >
            <Keyboard className="w-3.5 h-3.5 text-cyan-500" />
            <span>{t.nav?.keyboardShortcuts || 'Keyboard Shortcuts (↑/↓, Space, M, L, U)'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className={`flex-1 relative flex items-center justify-center overflow-hidden p-0 md:p-3 ${
        isLight ? 'bg-slate-100/80' : 'bg-transparent'
      }`}>
        <div className={`w-full h-full flex items-center justify-center ${
          deviceFrameMode === 'mobile' ? 'max-w-[430px]' : 'max-w-4xl'
        }`}>
          <ReelFeed />
        </div>
      </main>

      {/* Keyboard Shortcuts Overlay Banner */}
      {showKeyboardHelp && (
        <div className={`absolute bottom-4 right-6 z-40 p-3 rounded-2xl shadow-2xl backdrop-blur-xl text-xs space-y-1.5 animate-fade-in max-w-xs border ${
          isLight
            ? 'bg-white/95 border-slate-300 text-slate-800'
            : 'bg-slate-900/95 border-cyan-500/30 text-slate-100'
        }`}>
          <div className={`flex justify-between font-bold border-b pb-1 ${isLight ? 'text-slate-900 border-slate-200' : 'text-white border-white/10'}`}>
            <span>{t.nav?.keyboardTitle || 'Keyboard Controls'}</span>
            <button onClick={() => setShowKeyboardHelp(false)} className={`${isLight ? 'text-slate-400 hover:text-slate-700' : 'text-slate-400 hover:text-white'}`}>✕</button>
          </div>
          <p className={`${isLight ? 'text-slate-700' : 'text-slate-300'}`}><kbd className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-300 dark:border-white/10 text-cyan-600 dark:text-cyan-300 font-mono">↑</kbd> / <kbd className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-300 dark:border-white/10 text-cyan-600 dark:text-cyan-300 font-mono">↓</kbd> : {t.nav?.shortcutNextPrev || 'Next/Prev Reel'}</p>
          <p className={`${isLight ? 'text-slate-700' : 'text-slate-300'}`}><kbd className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-300 dark:border-white/10 text-cyan-600 dark:text-cyan-300 font-mono">Space</kbd> : {t.nav?.shortcutPlayPause || 'Play / Pause'}</p>
          <p className={`${isLight ? 'text-slate-700' : 'text-slate-300'}`}><kbd className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-300 dark:border-white/10 text-cyan-600 dark:text-cyan-300 font-mono">M</kbd> : {t.nav?.shortcutMute || 'Mute / Unmute'}</p>
          <p className={`${isLight ? 'text-slate-700' : 'text-slate-300'}`}><kbd className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-300 dark:border-white/10 text-cyan-600 dark:text-cyan-300 font-mono">L</kbd> : {t.nav?.shortcutLike || 'Like Reel'}</p>
          <p className={`${isLight ? 'text-slate-700' : 'text-slate-300'}`}><kbd className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-300 dark:border-white/10 text-cyan-600 dark:text-cyan-300 font-mono">U</kbd> : {t.nav?.shortcutUseful || 'Make This Useful (Notes/Quiz)'}</p>
        </div>
      )}

      {/* Floating AI Companion Orb in Bottom-Left */}
      <AICompanion />

      {/* Auth / Onboarding Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        initialStep={authInitialStep}
      />

      {/* Active Modals */}
      {activeModal === 'makeUseful' && <MakeUsefulModal />}
      {activeModal === 'realityCheck' && <RealityCheckModal />}
      {activeModal === 'explain' && <ExplainModal />}
      {activeModal === 'timeSession' && <TimeSessionModal />}
      {activeModal === 'goalPaths' && <GoalLearningView />}
      {activeModal === 'watchTogether' && <WatchTogetherRoom />}
      {activeModal === 'wellbeing' && <DigitalWellbeingModal />}
      {activeModal === 'creatorStudio' && <CreatorStudioModal />}
      {activeModal === 'memoryVault' && <MemoryVaultModal />}

      {/* Endless Scroll Firewall Modal */}
      <FirewallModal />

      {/* Theme Switcher Modal */}
      {isThemeModalOpen && (
        <ThemeModal isOpen={isThemeModalOpen} onClose={closeThemeModal} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
