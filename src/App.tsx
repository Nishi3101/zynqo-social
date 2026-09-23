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
import { ProfileView } from './components/ProfileView';
import { SettingsAndActivityModal } from './components/SettingsAndActivityModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { AIPlaylistsModal } from './components/AIPlaylistsModal';
import { MobileTopBar } from './components/MobileTopBar';
import { MobileNavBar } from './components/MobileNavBar';
import { configureNativeStatusBar, registerNativeBackHandler } from './utils/nativeBridge';
import { Smartphone, Monitor, Keyboard, Home } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    isAuthModalOpen, 
    authInitialStep, 
    openAuthModal, 
    closeAuthModal, 
    activeModal,
    closeModal,
    colorMode,
    t
  } = useApp();
  
  const [deviceFrameMode, setDeviceFrameMode] = useState<'mobile' | 'studio'>('mobile');
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const isLight = colorMode === 'light';

  // Sync Native Mobile Status Bar with Color Theme
  React.useEffect(() => {
    configureNativeStatusBar(isLight);
  }, [isLight]);

  // Handle Android Hardware Back Button & Mobile Back Gestures
  React.useEffect(() => {
    const unregister = registerNativeBackHandler(() => {
      if (activeModal) {
        closeModal();
        return true;
      }
      if (isAuthModalOpen) {
        closeAuthModal();
        return true;
      }
      if (currentPage !== 'feed') {
        setCurrentPage('feed');
        return true;
      }
      return false;
    });
    return () => unregister();
  }, [activeModal, isAuthModalOpen, currentPage, closeModal, closeAuthModal, setCurrentPage]);

  // If user is on the Landing / Home page
  if (currentPage === 'home') {
    return (
      <div className={`w-full min-h-[100dvh] h-[100dvh] max-w-full overflow-x-hidden overflow-y-auto transition-colors duration-200 ${
        isLight ? 'zynqo-ambient-bg-light text-slate-900' : 'zynqo-ambient-bg-dark text-slate-100'
      }`}>
        <LandingHome onOpenAuth={openAuthModal} />
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={closeAuthModal}
          initialStep={authInitialStep}
        />
      </div>
    );
  }

  // If user is on the Profile & Activity page
  if (currentPage === 'profile') {
    return (
      <div className={`w-full min-h-[100dvh] h-[100dvh] max-w-full overflow-x-hidden overflow-y-auto pb-16 md:pb-0 transition-colors duration-200 ${
        isLight ? 'zynqo-ambient-bg-light text-slate-900' : 'zynqo-ambient-bg-dark text-slate-100'
      }`}>
        <ProfileView />
        <MobileNavBar />
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={closeAuthModal}
          initialStep={authInitialStep}
        />
      </div>
    );
  }

  // If user is on the Reels Feed page
  return (
    <div className={`flex flex-row h-[100dvh] w-full max-w-full overflow-hidden font-sans transition-colors duration-200 relative ${
      isLight ? 'zynqo-ambient-bg-light text-slate-900' : 'zynqo-ambient-bg-dark text-slate-100'
    }`}>
      {/* Ambient Velvet Rose, Peach & Lavender Pastel Glow Blooms for Logged-In Feed View */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        <div className={`absolute top-[-10%] right-[-5%] w-[680px] h-[680px] rounded-full blur-[140px] transition-all duration-700 ${
          isLight ? 'bg-purple-200/60 opacity-90' : 'bg-fuchsia-900/25 opacity-50'
        }`} />
        <div className={`absolute bottom-[-10%] left-[-5%] w-[750px] h-[750px] rounded-full blur-[150px] transition-all duration-700 ${
          isLight ? 'bg-rose-200/70 opacity-95' : 'bg-rose-950/35 opacity-60'
        }`} />
        <div className={`absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[150px] transition-all duration-700 ${
          isLight ? 'bg-pink-100/65 opacity-85' : 'bg-purple-950/25 opacity-40'
        }`} />
      </div>

      {/* Vertical Navigation Sidebar on Left */}
      <Navigation />

      {/* Main Content Area (Right Side) */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative z-10">
        {/* Mobile Top Bar on screens < 768px */}
        <MobileTopBar />

        {/* Viewport Switcher Banner (Mobile Frame Preview vs Immersive Desktop Studio) */}
        <div className={`hidden md:flex items-center justify-between px-3 md:px-4 lg:px-6 py-1.5 border-b text-[11px] transition-colors flex-shrink-0 backdrop-blur-md ${
          isLight 
            ? 'bg-white/70 border-rose-100/80 text-slate-700 shadow-sm'
            : 'bg-[#120d1e]/80 border-white/5 text-slate-400'
        }`}>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="hidden sm:inline">{t.nav?.displayMode || 'Display Mode:'}</span>
            <button
              onClick={() => setDeviceFrameMode('mobile')}
              className={`px-2 py-0.5 rounded-md flex items-center gap-1 transition ${
                deviceFrameMode === 'mobile'
                  ? isLight
                    ? 'bg-rose-100/80 text-rose-800 font-bold border border-rose-200'
                    : 'bg-pink-950/50 text-pink-300 font-bold border border-pink-500/40'
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
                  ? isLight
                    ? 'bg-purple-100/80 text-purple-800 font-bold border border-purple-200'
                    : 'bg-purple-950/50 text-purple-300 font-bold border border-purple-500/40'
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'hover:text-white'
              }`}
            >
              <Monitor className="w-3 h-3" />
              <span className="hidden lg:inline">{t.nav?.studioView || 'Immersive Studio View'}</span>
              <span className="lg:hidden">Studio View</span>
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setCurrentPage('home')}
              className={`flex items-center gap-1 transition ${isLight ? 'hover:text-rose-700' : 'hover:text-pink-300'}`}
            >
              <Home className={`w-3.5 h-3.5 ${isLight ? 'text-rose-600' : 'text-pink-400'}`} />
              <span className="hidden sm:inline">{t.nav?.landingPage || 'Landing Page'}</span>
            </button>
            <button
              onClick={() => setShowKeyboardHelp(prev => !prev)}
              className={`flex items-center gap-1 transition ${isLight ? 'hover:text-rose-700' : 'hover:text-pink-300'}`}
            >
              <Keyboard className={`w-3.5 h-3.5 ${isLight ? 'text-rose-600' : 'text-pink-400'}`} />
              <span className="hidden xl:inline">{t.nav?.keyboardShortcuts || 'Keyboard Shortcuts (↑/↓, Space, M, L, U)'}</span>
              <span className="xl:hidden">Shortcuts</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 relative flex items-center justify-center overflow-hidden p-0 md:p-3 pb-16 md:pb-3 bg-transparent">
          <div className={`w-full h-full flex items-center justify-center ${
            deviceFrameMode === 'mobile' ? 'max-w-[430px]' : 'max-w-4xl'
          }`}>
            <ReelFeed />
          </div>
        </main>
      </div>

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
      {activeModal === 'settingsAndActivity' && <SettingsAndActivityModal />}
      {activeModal === 'leaderboard' && <LeaderboardModal />}
      {activeModal === 'aiPlaylists' && <AIPlaylistsModal />}

      {/* Endless Scroll Firewall Modal */}
      <FirewallModal />

      {/* Mobile Bottom Navigation Bar on screens < 768px */}
      <MobileNavBar />

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
