import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  RotateCcw, 
  Sparkles, 
  Flame, 
  Users, 
  UserCheck, 
  Building2, 
  PlayCircle, 
  Globe, 
  Compass,
  Layers
} from 'lucide-react';
import { ReelCard } from './ReelCard';
import { useApp } from '../context/AppContext';

export const ReelFeed: React.FC = () => {
  const { 
    reels, 
    loading, 
    currentReelIndex, 
    setCurrentReelIndex, 
    togglePlay, 
    toggleMute, 
    toggleLike, 
    openModal,
    setIntent,
    setSelectedCategory,
    colorMode,
    t
  } = useApp();

  const isLight = colorMode === 'light';
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeFeedTab, setActiveFeedTab] = useState<'universal' | 'discovery' | 'trending' | 'following' | 'friends' | 'communities' | 'creators' | 'business' | 'continue'>('universal');

  const feedTabs = [
    { id: 'universal', label: 'Universal', icon: Globe },
    { id: 'discovery', label: 'AI Discovery', icon: Sparkles },
    { id: 'trending', label: 'Trending', icon: Flame },
    { id: 'following', label: 'Following', icon: UserCheck },
    { id: 'friends', label: 'Friends', icon: Users },
    { id: 'communities', label: 'Communities', icon: Layers },
    { id: 'creators', label: 'Creators', icon: Compass },
    { id: 'business', label: 'Business', icon: Building2 },
    { id: 'continue', label: 'Continue', icon: PlayCircle }
  ];

  const displayedReels = useMemo(() => {
    let list = reels;
    if (activeFeedTab === 'discovery') {
      list = reels.filter(r => r.isAIGenerated || r.safetyScore >= 98);
    } else if (activeFeedTab === 'trending') {
      list = reels.filter(r => (r.views && r.views > 15000) || r.likes > 600);
    } else if (activeFeedTab === 'following') {
      list = reels.filter(r => r.creator.verified || r.creator.handle.includes('ai'));
    } else if (activeFeedTab === 'friends') {
      list = reels.filter(r => r.intent === 'connect' || r.category === 'Personal AI');
    } else if (activeFeedTab === 'communities') {
      list = reels.filter(r => ['Productivity', 'Mindfulness', 'Science', 'Design'].includes(r.category));
    } else if (activeFeedTab === 'creators') {
      list = reels.filter(r => r.creator.verified);
    } else if (activeFeedTab === 'business') {
      list = reels.filter(r => r.isSponsored || ['Technology', 'Finance', 'Productivity'].includes(r.category));
    } else if (activeFeedTab === 'continue') {
      list = reels.slice(0, 3);
    }
    return list.length > 0 ? list : reels;
  }, [reels, activeFeedTab]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault();
        scrollToReel(currentReelIndex + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault();
        scrollToReel(currentReelIndex - 1);
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      } else if (e.key === 'l' || e.key === 'L') {
        if (reels[currentReelIndex]) {
          toggleLike(reels[currentReelIndex].id);
        }
      } else if (e.key === 'u' || e.key === 'U') {
        openModal('makeUseful');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentReelIndex, reels]);

  const wheelCooldownRef = useRef(false);
  const dragStartYRef = useRef<number | null>(null);
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<any>(null);

  const scrollToReel = (index: number) => {
    if (index < 0 || index >= reels.length) return;
    const container = containerRef.current;
    if (!container) return;

    const itemHeight = container.clientHeight;
    isProgrammaticScrollRef.current = true;
    container.scrollTo({
      top: index * itemHeight,
      behavior: 'smooth'
    });
    setCurrentReelIndex(index);
    clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 500);
  };

  // Wheel scrolling (Desktop mousewheel & trackpad)
  const handleWheel = (e: React.WheelEvent) => {
    if (wheelCooldownRef.current) return;
    if (Math.abs(e.deltaY) < 25) return;

    wheelCooldownRef.current = true;
    if (e.deltaY > 0) {
      scrollToReel(currentReelIndex + 1);
    } else {
      scrollToReel(currentReelIndex - 1);
    }
    setTimeout(() => {
      wheelCooldownRef.current = false;
    }, 450);
  };



  // Mouse drag up/down simulation
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only left click
    if (e.button !== 0) return;
    dragStartYRef.current = e.clientY;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartYRef.current === null) return;
    const deltaY = e.clientY - dragStartYRef.current;
    dragStartYRef.current = null;
    if (Math.abs(deltaY) < 50) return;

    if (deltaY < 0) {
      scrollToReel(currentReelIndex + 1);
    } else {
      scrollToReel(currentReelIndex - 1);
    }
  };

  // High-performance scroll listener with requestAnimationFrame to eliminate scroll lag
  const scrollRafRef = useRef<number | null>(null);
  const handleScroll = () => {
    if (isProgrammaticScrollRef.current) return;
    const container = containerRef.current;
    if (!container) return;

    if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    scrollRafRef.current = requestAnimationFrame(() => {
      const scrollTop = container.scrollTop;
      const itemHeight = container.clientHeight || window.innerHeight;
      const activeIdx = Math.round(scrollTop / itemHeight);

      if (activeIdx !== currentReelIndex && activeIdx >= 0 && activeIdx < displayedReels.length) {
        setCurrentReelIndex(activeIdx);
      }
    });
  };

  if (loading) {
    return (
      <div className={`flex-1 flex flex-col items-center justify-center gap-3 ${isLight ? 'text-slate-800' : 'text-white'}`}>
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className={`absolute inset-0 rounded-full border-2 animate-spin ${isLight ? 'border-rose-200 border-t-rose-600' : 'border-cyan-500/20 border-t-cyan-400'}`} />
          <Sparkles className={`w-6 h-6 animate-pulse ${isLight ? 'text-rose-600' : 'text-cyan-400'}`} />
        </div>
        <p className={`text-sm font-medium ${isLight ? 'text-rose-900' : 'text-cyan-300'}`}>{t.reel?.curating || "Curating your AI Experience..."}</p>
      </div>
    );
  }

  if (reels.length === 0) {
    return (
      <div className={`flex-1 flex flex-col items-center justify-center p-6 text-center ${isLight ? 'text-slate-800' : 'text-white'}`}>
        <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center mb-4 shadow-xl ${isLight ? 'bg-white/90 border-rose-200 text-rose-600' : 'bg-slate-900/80 border-white/10 text-cyan-400'}`}>
          <RotateCcw className="w-8 h-8" />
        </div>
        <h3 className={`text-lg font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>{t.reel?.noReelsMatch || "No reels match this intent"}</h3>
        <p className={`text-xs max-w-xs mb-4 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          Try switching intents or clearing your category filters to discover fresh AI reels.
        </p>
        <button
          onClick={() => {
            setIntent('all');
            setSelectedCategory('All');
          }}
          className={`px-4 py-2 rounded-xl font-bold text-xs shadow-md transition ${isLight ? 'bg-gradient-to-r from-[#9d174d] to-[#be123c] text-white hover:brightness-105' : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'}`}
        >
          {t.reel?.resetFilters || "Reset All Filters"}
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex-1 h-full w-full flex items-center justify-center overflow-hidden">
      {/* Phone Mockup Frame (Clips corners without blocking inner scroll) */}
      <div className={`relative w-full h-full max-w-[430px] md:rounded-3xl md:border shadow-2xl bg-black overflow-hidden flex flex-col ${
        isLight ? 'md:border-rose-200/80 shadow-rose-950/15' : 'md:border-white/15 shadow-black/80'
      }`}>
        {/* Discovery Feeds Switcher Bar (#48–#57) */}
        <div className="absolute top-2 left-2 right-2 z-40 flex items-center gap-1 overflow-x-auto no-scrollbar py-1 px-1.5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 select-none">
          {(feedTabs || []).map(tab => {
            const TabIcon = tab.icon;
            const isActive = activeFeedTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveFeedTab(tab.id as any);
                  scrollToReel(0);
                }}
                className={`px-2.5 py-1 rounded-xl text-[10px] font-semibold flex items-center gap-1.5 transition whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <TabIcon className="w-3 h-3" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* High-Performance Virtualized Reel Scroll Container */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          className="reel-container w-full h-full flex-1"
        >
          {(displayedReels || []).map((reel, idx) => {
            // High-performance virtualization: mount heavy video and card elements only within ±2 buffer window of active reel
            const isNearActive = Math.abs(idx - currentReelIndex) <= 2;
            return (
              <div key={reel.id} className="reel-item w-full h-full relative">
                {isNearActive ? (
                  <ReelCard 
                    reel={reel} 
                    isActive={idx === currentReelIndex}
                    onEnded={() => {
                      if (idx < displayedReels.length - 1) {
                        scrollToReel(idx + 1);
                      } else {
                        scrollToReel(0);
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-black flex items-center justify-center relative overflow-hidden">
                    {reel.thumbnail ? (
                      <img 
                        src={reel.thumbnail} 
                        alt="" 
                        loading="lazy" 
                        decoding="async"
                        className="w-full h-full object-cover opacity-20 pointer-events-none filter blur-sm" 
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-950" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
