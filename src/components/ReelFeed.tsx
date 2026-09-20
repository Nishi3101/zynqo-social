import React, { useEffect, useRef } from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';
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
    t
  } = useApp();

  const containerRef = useRef<HTMLDivElement | null>(null);

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

  // Touch Swipe for mobile & tablets
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartYRef.current === null) return;
    const deltaY = e.changedTouches[0].clientY - dragStartYRef.current;
    dragStartYRef.current = null;
    if (Math.abs(deltaY) < 40) return;

    if (deltaY < 0) {
      scrollToReel(currentReelIndex + 1);
    } else {
      scrollToReel(currentReelIndex - 1);
    }
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

  // Scroll listener to update active reel index
  const handleScroll = () => {
    if (isProgrammaticScrollRef.current) return;
    const container = containerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const itemHeight = container.clientHeight || window.innerHeight;
    const activeIdx = Math.round(scrollTop / itemHeight);

    if (activeIdx !== currentReelIndex && activeIdx >= 0 && activeIdx < reels.length) {
      setCurrentReelIndex(activeIdx);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#07090e] gap-3">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
          <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
        </div>
        <p className="text-sm font-medium text-cyan-300">{t.reel?.curating || "Curating your AI Experience..."}</p>
      </div>
    );
  }

  if (reels.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#07090e] p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-center text-cyan-400 mb-4 shadow-xl">
          <RotateCcw className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{t.reel?.noReelsMatch || "No reels match this intent"}</h3>
        <p className="text-xs text-slate-400 max-w-xs mb-4">
          Try switching intents or clearing your category filters to discover fresh AI reels.
        </p>
        <button
          onClick={() => {
            setIntent('all');
            setSelectedCategory('All');
          }}
          className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition"
        >
          {t.reel?.resetFilters || "Reset All Filters"}
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex-1 h-full w-full flex items-center justify-center overflow-hidden">
      {/* Phone Mockup Frame (Clips corners without blocking inner scroll) */}
      <div className="relative w-full h-full max-w-[430px] md:rounded-3xl md:border md:border-white/10 shadow-2xl bg-black overflow-hidden flex flex-col">
        {/* Reel Scroll Container */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          className="reel-container w-full h-full flex-1"
        >
          {reels.map((reel, idx) => (
            <div key={reel.id} className="reel-item w-full h-full relative">
              <ReelCard 
                reel={reel} 
                isActive={idx === currentReelIndex}
                onEnded={() => {
                  if (idx < reels.length - 1) {
                    scrollToReel(idx + 1);
                  } else {
                    scrollToReel(0);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
