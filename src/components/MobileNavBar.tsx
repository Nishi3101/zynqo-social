import React from 'react';
import { 
  Compass, 
  Plus, 
  ShieldCheck, 
  User, 
  Sparkles,
  Clapperboard
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { triggerHaptic } from '../utils/nativeBridge';

export const MobileNavBar: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    openModal, 
    activeModal, 
    userProfile, 
    isLoggedIn,
    openAuthModal,
    colorMode,
    t
  } = useApp();

  const isLight = colorMode === 'light';

  const isFeedActive = currentPage === 'feed' && !activeModal;
  const isExploreActive = activeModal === 'aiPlaylists' || activeModal === 'leaderboard';
  const isWellbeingActive = activeModal === 'wellbeing' || activeModal === 'timeSession';
  const isProfileActive = currentPage === 'profile';

  return (
    <nav 
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-2xl transition-colors duration-200 select-none ${
        isLight 
          ? 'bg-white/95 border-rose-100/90 text-slate-800 shadow-[0_-8px_30px_rgba(244,63,94,0.08)]' 
          : 'bg-[#0d0b14]/95 border-white/10 text-slate-200 shadow-[0_-10px_35px_rgba(0,0,0,0.6)]'
      }`}
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 6px)' }}
    >
      <div className="flex items-center justify-around px-2 py-1.5 max-w-md mx-auto relative">
        
        {/* 1. Feed / Reels Tab */}
        <button
          onClick={() => {
            triggerHaptic('light');
            setCurrentPage('feed');
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            isFeedActive 
              ? 'text-rose-500 font-bold scale-105' 
              : isLight ? 'text-slate-500 hover:text-slate-800' : 'text-slate-400 hover:text-white'
          }`}
        >
          <div className="relative">
            <Clapperboard className="w-5 h-5" />
            {isFeedActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 font-medium">
            Reels
          </span>
        </button>

        {/* 2. Explore / AI Modules */}
        <button
          onClick={() => {
            triggerHaptic('light');
            openModal('aiPlaylists');
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            isExploreActive 
              ? 'text-rose-500 font-bold scale-105' 
              : isLight ? 'text-slate-500 hover:text-slate-800' : 'text-slate-400 hover:text-white'
          }`}
        >
          <div className="relative">
            <Compass className="w-5 h-5" />
            {isExploreActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 font-medium">
            Explore
          </span>
        </button>

        {/* 3. CENTER CREATE BUTTON (+) */}
        <div className="flex-1 flex justify-center -mt-4">
          <button
            onClick={() => {
              triggerHaptic('heavy');
              openModal('creatorStudio');
            }}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-600 via-pink-600 to-purple-600 text-white flex items-center justify-center shadow-[0_4px_20px_rgba(244,63,94,0.5)] border-2 border-[#0d0b14] active:scale-95 transition-transform"
            title="Create Reel / AI Studio"
          >
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* 4. Wellbeing / Focus Tab */}
        <button
          onClick={() => {
            triggerHaptic('light');
            openModal('wellbeing');
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            isWellbeingActive 
              ? 'text-rose-500 font-bold scale-105' 
              : isLight ? 'text-slate-500 hover:text-slate-800' : 'text-slate-400 hover:text-white'
          }`}
        >
          <div className="relative">
            <ShieldCheck className="w-5 h-5" />
            {isWellbeingActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 font-medium">
            Focus
          </span>
        </button>

        {/* 5. Profile / Account Tab */}
        <button
          onClick={() => {
            triggerHaptic('light');
            if (isLoggedIn) {
              setCurrentPage('profile');
            } else {
              openAuthModal('login');
            }
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            isProfileActive 
              ? 'text-rose-500 font-bold scale-105' 
              : isLight ? 'text-slate-500 hover:text-slate-800' : 'text-slate-400 hover:text-white'
          }`}
        >
          <div className="relative">
            {isLoggedIn && userProfile?.avatar ? (
              <img 
                src={userProfile.avatar} 
                alt="Profile" 
                className={`w-5 h-5 rounded-full object-cover border ${
                  isProfileActive ? 'border-rose-500 ring-2 ring-rose-500/30' : 'border-slate-500/40'
                }`} 
              />
            ) : (
              <User className="w-5 h-5" />
            )}
            {isProfileActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 font-medium">
            Profile
          </span>
        </button>

      </div>
    </nav>
  );
};
