import React, { useState, useEffect, useMemo } from 'react';
import { Radio, ArrowRight, Activity, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Reel } from '../types';

interface LiveRadarProps {
  onExplore?: () => void;
  theme?: any;
  isLight?: boolean;
  className?: string;
}

interface SignalPoint {
  id: string;
  label: string;
  emoji: string;
  count: string;
  reelsCount?: number;
  angle: number;       // Angle in degrees (0 - 360)
  distance: number;    // Distance from center (0 - 100%)
  color: string;       // Signal accent color
  pulseDelay: string;  // CSS delay for staggered pulsing
  category?: string;   // Real category mapping for interactive filtering
}

export const LiveRadar: React.FC<LiveRadarProps> = ({ 
  onExplore, 
  theme, 
  isLight = false,
  className = ''
}) => {
  const { t, language, reels, setSelectedCategory, setCurrentPage } = useApp();

  // Active database list from context
  const activeReels = useMemo<Reel[]>(() => {
    return reels || [];
  }, [reels]);

  // Real aggregate calculations from active reels
  const totalReelsCount = activeReels.length;
  const totalViews = useMemo(() => {
    return activeReels.reduce((sum, r) => sum + (r.views || 0), 0);
  }, [activeReels]);

  const uniqueCategoriesCount = useMemo(() => {
    return new Set(activeReels.map(r => r.category)).size || 11;
  }, [activeReels]);

  // Derived telemetry baseline: real signal velocity based on view volume (~36.9k/s for 3.7B views)
  const baseSignalRate = useMemo(() => {
    return parseFloat((totalViews / 100000000).toFixed(1));
  }, [totalViews]);

  const [liveSignals, setLiveSignals] = useState(baseSignalRate);

  // Keep liveSignals synchronized with baseline when reels load
  useEffect(() => {
    setLiveSignals(baseSignalRate);
  }, [baseSignalRate]);

  // Dynamic Signal Points computed directly from actual reel database
  const radarSignals = useMemo<SignalPoint[]>(() => {
    const formatCompact = (num: number) => {
      if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
      if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
      if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
      return (num || 0).toString();
    };

    // Calculate genuine views/metrics per category from the actual database
    const cultureReels = activeReels.filter(r => r.category === 'Culture & Dance');
    const cultureViews = cultureReels.reduce((s, r) => s + (r.views || 0), 0);

    const musicReels = activeReels.filter(r => 
      r.category === 'Music & Audio' || 
      r.category === 'Mindfulness & Detox' || 
      (r.goalTags && r.goalTags.some(t => ['music', 'guitar', 'relaxation', 'soundhealing', 'audio'].includes(t.toLowerCase())))
    );
    const musicViews = musicReels.reduce((s, r) => s + (r.views || 0), 0);

    const aiReels = activeReels.filter(r => r.category === 'Tech & AI' || (r.goalTags && r.goalTags.some(t => t.toLowerCase().includes('ai') || t.toLowerCase().includes('tech'))));
    const aiViews = aiReels.reduce((s, r) => s + (r.views || 0), 0);

    const memesReels = activeReels.filter(r => r.category === 'Entertainment & Comedy');
    const memesViews = memesReels.reduce((s, r) => s + (r.views || 0), 0);

    const fitnessReels = activeReels.filter(r => r.category === 'Fitness & Health');
    const fitnessViews = fitnessReels.reduce((s, r) => s + (r.views || 0), 0);

    const trendingViews = activeReels.reduce((s, r) => s + (r.views || 0), 0);

    return [
      { 
        id: 'viral', 
        label: 'VIRAL', 
        emoji: '🔥', 
        reelsCount: cultureReels.length,
        count: `${formatCompact(cultureViews)} views`, 
        angle: 45, 
        distance: 74, 
        color: '#f97316', 
        pulseDelay: '0s',
        category: 'Culture & Dance'
      },
      { 
        id: 'music', 
        label: 'MUSIC', 
        emoji: '🎵', 
        reelsCount: musicReels.length,
        count: `${formatCompact(musicViews)} views`, 
        angle: 135, 
        distance: 62, 
        color: '#ec4899', 
        pulseDelay: '0.6s',
        category: 'Mindfulness & Detox'
      },
      { 
        id: 'reels', 
        label: 'REELS', 
        emoji: '🎬', 
        reelsCount: totalReelsCount,
        count: `${formatCompact(totalViews)} views`, 
        angle: 220, 
        distance: 82, 
        color: '#06b6d4', 
        pulseDelay: '1.2s',
        category: 'All'
      },
      { 
        id: 'ai', 
        label: 'AI', 
        emoji: '🤖', 
        reelsCount: aiReels.length,
        count: `${formatCompact(aiViews)} views`, 
        angle: 295, 
        distance: 52, 
        color: '#a855f7', 
        pulseDelay: '1.8s',
        category: 'Tech & AI'
      },
      { 
        id: 'memes', 
        label: 'MEMES', 
        emoji: '😂', 
        reelsCount: memesReels.length,
        count: `${formatCompact(memesViews)} views`, 
        angle: 345, 
        distance: 68, 
        color: '#eab308', 
        pulseDelay: '0.3s',
        category: 'Entertainment & Comedy'
      },
      { 
        id: 'gaming', 
        label: 'FITNESS', 
        emoji: '⚡', 
        reelsCount: fitnessReels.length,
        count: `${formatCompact(fitnessViews)} views`, 
        angle: 175, 
        distance: 78, 
        color: '#10b981', 
        pulseDelay: '0.9s',
        category: 'Fitness & Health'
      },
      { 
        id: 'trending', 
        label: 'TRENDING', 
        emoji: '✨', 
        reelsCount: totalReelsCount,
        count: `${formatCompact(trendingViews)} views`, 
        angle: 85, 
        distance: 86, 
        color: '#38bdf8', 
        pulseDelay: '1.5s',
        category: 'All'
      }
    ];
  }, [activeReels, totalReelsCount]);

  const handleSignalClick = (categoryName?: string) => {
    if (categoryName && categoryName !== 'All') {
      setSelectedCategory(categoryName);
    } else {
      setSelectedCategory('All');
    }
    if (onExplore) {
      onExplore();
    } else {
      setCurrentPage('feed');
    }
  };

  const getSignalLabel = (sig: SignalPoint) => {
    if (language === 'gu') {
      const guLabels: Record<string, string> = {
        viral: 'વાયરલ',
        music: 'સંગીત',
        reels: 'રીલ્સ',
        ai: 'AI',
        memes: 'મીમ્સ',
        gaming: 'ફિટનેસ',
        trending: 'ટ્રેન્ડિંગ'
      };
      return guLabels[sig.id] || sig.label;
    }
    if (language === 'hi') {
      const hiLabels: Record<string, string> = {
        viral: 'वायरल',
        music: 'संगीत',
        reels: 'रील्स',
        ai: 'AI',
        memes: 'मीम्स',
        gaming: 'फिटनेस',
        trending: 'ट्रेंडिंग'
      };
      return hiLabels[sig.id] || sig.label;
    }
    return sig.label;
  };

  // Periodic subtle updates to make radar feel truly alive
  useEffect(() => {
    const signalInterval = setInterval(() => {
      setLiveSignals(prev => {
        const delta = (Math.random() * 0.2 - 0.1);
        return parseFloat(Math.max(1, prev + delta).toFixed(1));
      });
    }, 3200);

    return () => {
      clearInterval(signalInterval);
    };
  }, []);

  // Compute (x, y) percent coordinates within a 0-100% square
  const getCoordinates = (angleDeg: number, distPercent: number) => {
    const rad = (angleDeg - 90) * (Math.PI / 180);
    const radius = (distPercent / 2) * 0.88; // Keep within circular boundary
    const x = 50 + radius * Math.cos(rad);
    const y = 50 + radius * Math.sin(rad);
    return { x, y };
  };

  return (
    <div className={`w-full h-full rounded-3xl overflow-hidden border shadow-2xl relative flex flex-col justify-between p-4 sm:p-5 lg:p-6 select-none transition-all duration-300 hover:shadow-[0_20px_50px_rgba(244,63,94,0.18)] group ${
      isLight 
        ? 'bg-white/95 border-rose-100/90 shadow-rose-950/5 hover:border-rose-300' 
        : 'bg-[#151024]/95 border-white/10 shadow-black/60 hover:border-pink-500/40'
    } ${className}`}>
      {/* Embedded High-Performance Radar Animations */}
      <style>{`
        @keyframes radar-sweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes radar-ping-glow {
          0% { transform: scale(0.9); opacity: 0.9; }
          70% { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes data-drift {
          0% { transform: translate(0, 0); opacity: 0.2; }
          50% { opacity: 0.8; }
          100% { transform: translate(15px, -15px); opacity: 0.1; }
        }
        @keyframes subtle-scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
      `}</style>

      {/* Atmospheric Radial Backlight */}
      <div className={`absolute inset-0 pointer-events-none ${
        isLight
          ? 'bg-[radial-gradient(circle_at_50%_45%,rgba(244,63,94,0.06)_0%,rgba(251,113,133,0.02)_50%,transparent_75%)]'
          : 'bg-[radial-gradient(circle_at_50%_45%,rgba(236,72,153,0.15)_0%,rgba(244,63,94,0.05)_50%,transparent_75%)]'
      }`} />

      {/* Fine Digital Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          1. HEADER: LIVE RADAR + SCANNING ZYNQO
          ───────────────────────────────────────────────────────────── */}
      <div className={`relative z-10 flex items-center justify-between pb-2 border-b flex-shrink-0 ${
        isLight ? 'border-rose-100/80' : 'border-white/10'
      }`}>
        <div className="flex items-center gap-2.5">
          {/* Pulsing Live Beacon */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
          </span>

          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-black tracking-wider uppercase font-mono flex items-center gap-1.5 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {t.landing?.radarTitle || 'LIVE AI RADAR'}
              </span>
              <span className={`text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                isLight 
                  ? 'text-[#9f1239] bg-[#fce7ed] border-rose-200/60' 
                  : 'text-pink-300 bg-[#33183d] border-pink-500/30'
              }`}>
                {language === 'gu' ? 'ઝિન્કો સ્કેન' : language === 'hi' ? 'ज़िन्को स्कैन' : 'SCANNING TRENDS'}
              </span>
            </div>
            <p className={`text-[10px] font-sans tracking-normal pt-0.5 ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}>
              {language === 'gu' ? 'રીઅલ-ટાઇમ સોશિયલ ટ્રેન્ડ ઇન્ટેલિજન્સ' : language === 'hi' ? 'रियल-टाइम सोशल ट्रेंड इंटेलिजेंस' : 'Real-time Social Trend Intelligence'}
            </p>
          </div>
        </div>

        {/* Live Frequency / Sweep Azimuth Telemetry */}
        <div className="text-right font-mono">
          <span className={`text-[10px] font-bold block leading-none ${
            isLight ? 'text-[#be123c]' : 'text-pink-400'
          }`}>
            AZ 360° LIVE
          </span>
          <span className={`text-[9px] block pt-0.5 ${
            isLight ? 'text-slate-400' : 'text-slate-500'
          }`}>
            REAL-TIME
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. LIVE METRICS BAR: ACTIVE REELS & TOTAL AUDIENCE VIEWS
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 grid grid-cols-2 gap-2 my-2 flex-shrink-0">
        <div className={`border rounded-xl px-3 py-1.5 backdrop-blur-md flex items-center justify-between transition-colors ${
          isLight 
            ? 'bg-rose-50/40 border-rose-100/80' 
            : 'bg-[#1c1530]/80 border-white/10'
        }`}>
          <div>
            <span className={`text-[9px] font-mono uppercase tracking-wider block ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}>
              {language === 'gu' ? 'કુલ સક્રિય રીલ્સ' : language === 'hi' ? 'कुल सक्रिय रील्स' : 'ACTIVE REELS'}
            </span>
            <span className={`text-xs font-mono font-black flex items-center gap-1 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              <Activity className={`w-3 h-3 ${isLight ? 'text-[#be123c]' : 'text-pink-400'}`} />
              {totalReelsCount.toLocaleString()} {language === 'gu' ? 'રીલ્સ' : language === 'hi' ? 'रील्स' : 'REELS'}
            </span>
          </div>
          <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-500/20 font-bold">
            100% LIVE
          </span>
        </div>

        <div className={`border rounded-xl px-3 py-1.5 backdrop-blur-md flex items-center justify-between transition-colors ${
          isLight 
            ? 'bg-rose-50/40 border-rose-100/80' 
            : 'bg-[#1c1530]/80 border-white/10'
        }`}>
          <div>
            <span className={`text-[9px] font-mono uppercase tracking-wider block ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}>
              {language === 'gu' ? 'કુલ વ્યૂઝ' : language === 'hi' ? 'कुल व्यूज़' : 'AUDIENCE VIEWS'}
            </span>
            <span className={`text-xs font-mono font-black flex items-center gap-1 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              <Zap className="w-3 h-3 text-amber-500 dark:text-amber-400" />
              {(totalViews / 1000000).toFixed(1)}M {language === 'gu' ? 'વ્યૂઝ' : language === 'hi' ? 'व्यूज़' : 'VIEWS'}
            </span>
          </div>
          <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
            isLight 
              ? 'text-rose-700 bg-rose-100/70 border-rose-200' 
              : 'text-pink-400 bg-pink-950/50 border-pink-500/20'
          }`}>
            REAL-TIME
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. CENTRAL CIRCULAR RADAR SCOPE
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-auto min-h-0 py-2">
        <div className={`relative w-[260px] h-[260px] xs:w-[280px] xs:h-[280px] sm:w-[310px] sm:h-[310px] lg:w-[330px] lg:h-[330px] xl:w-[350px] xl:h-[350px] 2xl:w-[370px] 2xl:h-[370px] rounded-full flex items-center justify-center overflow-hidden transition-all ${
          isLight 
            ? 'bg-[#fcf8fa] shadow-[inset_0_0_24px_rgba(244,63,94,0.06)] border border-rose-200/70' 
            : 'bg-[#0e0a17]/95 shadow-[inset_0_0_30px_rgba(236,72,153,0.18)] border border-pink-500/25'
        }`}>
          
          {/* Subtle Rotating Sweep Beam & Conic Trail */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              animation: 'radar-sweep 4.5s linear infinite',
              background: isLight
                ? 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, rgba(244,63,94,0.02) 290deg, rgba(244,63,94,0.12) 330deg, rgba(225,29,72,0.32) 359deg, rgba(190,18,60,0.85) 360deg)'
                : 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, rgba(236,72,153,0.02) 290deg, rgba(236,72,153,0.15) 330deg, rgba(244,63,94,0.45) 359deg, rgba(244,63,94,0.95) 360deg)'
            }}
          >
            {/* High-intensity Leading Edge Line */}
            <div className={`absolute top-0 right-1/2 w-[50%] h-[2px] origin-right ${
              isLight 
                ? 'bg-gradient-to-l from-rose-400 via-rose-500 to-transparent shadow-[0_0_8px_rgba(244,63,94,0.7)]'
                : 'bg-gradient-to-l from-pink-300 via-rose-400 to-transparent shadow-[0_0_8px_#ec4899]'
            }`} />
          </div>

          {/* SVG Concentric Range Rings and Grid Crosshairs */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 280 280">
            {/* Concentric Rings */}
            <circle cx="140" cy="140" r="35" fill="none" stroke={isLight ? "rgba(244, 63, 94, 0.16)" : "rgba(236, 72, 153, 0.18)"} strokeWidth="1" strokeDasharray="2 3" />
            <circle cx="140" cy="140" r="70" fill="none" stroke={isLight ? "rgba(244, 63, 94, 0.18)" : "rgba(236, 72, 153, 0.20)"} strokeWidth="1" />
            <circle cx="140" cy="140" r="105" fill="none" stroke={isLight ? "rgba(244, 63, 94, 0.20)" : "rgba(236, 72, 153, 0.22)"} strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="140" cy="140" r="136" fill="none" stroke={isLight ? "rgba(244, 63, 94, 0.35)" : "rgba(236, 72, 153, 0.35)"} strokeWidth="1.5" />

            {/* Radial Crosshairs */}
            <line x1="140" y1="4" x2="140" y2="276" stroke={isLight ? "rgba(244, 63, 94, 0.14)" : "rgba(236, 72, 153, 0.15)"} strokeWidth="1" />
            <line x1="4" y1="140" x2="276" y2="140" stroke={isLight ? "rgba(244, 63, 94, 0.14)" : "rgba(236, 72, 153, 0.15)"} strokeWidth="1" />
            
            {/* 45° Diagonal Guides */}
            <line x1="45" y1="45" x2="235" y2="235" stroke={isLight ? "rgba(244, 63, 94, 0.07)" : "rgba(236, 72, 153, 0.08)"} strokeWidth="1" strokeDasharray="2 4" />
            <line x1="235" y1="45" x2="45" y2="235" stroke={isLight ? "rgba(244, 63, 94, 0.07)" : "rgba(236, 72, 153, 0.08)"} strokeWidth="1" strokeDasharray="2 4" />

            {/* Cardinal Degree Markers */}
            <text x="140" y="16" textAnchor="middle" fill={isLight ? "#be123c" : "#f472b6"} fontSize="8" fontFamily="monospace" opacity="0.8">000°</text>
            <text x="268" y="143" textAnchor="middle" fill={isLight ? "#be123c" : "#f472b6"} fontSize="8" fontFamily="monospace" opacity="0.8">090°</text>
            <text x="140" y="270" textAnchor="middle" fill={isLight ? "#be123c" : "#f472b6"} fontSize="8" fontFamily="monospace" opacity="0.8">180°</text>
            <text x="12" y="143" textAnchor="middle" fill={isLight ? "#be123c" : "#f472b6"} fontSize="8" fontFamily="monospace" opacity="0.8">270°</text>

            {/* Range Ticks */}
            <text x="145" y="102" fill={isLight ? "#94a3b8" : "#64748b"} fontSize="7" fontFamily="monospace" opacity="0.7">50K</text>
            <text x="145" y="68" fill={isLight ? "#94a3b8" : "#64748b"} fontSize="7" fontFamily="monospace" opacity="0.7">150K</text>
            <text x="145" y="32" fill={isLight ? "#94a3b8" : "#64748b"} fontSize="7" fontFamily="monospace" opacity="0.7">MAX</text>
          </svg>

          {/* Center Hub Core with Stylized Z Logo */}
          <div className={`absolute z-20 w-5 h-5 rounded-full flex items-center justify-center ${
            isLight
              ? 'bg-gradient-to-tr from-[#9d174d] to-[#be123c] shadow-[0_0_12px_rgba(190,18,60,0.6)]'
              : 'bg-gradient-to-tr from-[#d946ef] to-[#f43f5e] shadow-[0_0_16px_rgba(244,63,94,0.8)]'
          }`}>
            <span className="text-[9px] font-display font-black text-white leading-none select-none">Z</span>
            <div className={`absolute w-8 h-8 rounded-full border animate-ping ${
              isLight ? 'border-rose-400/50' : 'border-pink-400/50'
            }`} />
          </div>

          {/* Ambient Background Particles */}
          {[
            { top: '22%', left: '35%', delay: '0s' },
            { top: '65%', left: '28%', delay: '1.2s' },
            { top: '38%', left: '72%', delay: '0.7s' },
            { top: '78%', left: '60%', delay: '2.1s' }
          ].map((pt, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full pointer-events-none ${
                isLight ? 'bg-rose-400/40' : 'bg-pink-400/40'
              }`}
              style={{
                top: pt.top,
                left: pt.left,
                animation: `data-drift 3s ease-in-out infinite ${pt.delay}`
              }}
            />
          ))}

          {/* ─────────────────────────────────────────────────────────────
              LIVE ZYNQO ENTERTAINMENT SIGNAL DETECTION POINTS
              ───────────────────────────────────────────────────────────── */}
          {radarSignals.map(sig => {
            const { x, y } = getCoordinates(sig.angle, sig.distance);
            const isRightSide = x > 54;
            return (
              <div
                key={sig.id}
                onClick={() => handleSignalClick(sig.category)}
                className="absolute z-30 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:scale-125 cursor-pointer group/sig"
                style={{ top: `${y}%`, left: `${x}%` }}
                title={`Click to explore ${sig.label} reels`}
              >
                {/* Outer Ripple Ping */}
                <div 
                  className="absolute -inset-1.5 rounded-full opacity-70 pointer-events-none"
                  style={{
                    backgroundColor: sig.color,
                    animation: `radar-ping-glow 2.4s ease-out infinite ${sig.pulseDelay}`
                  }}
                />

                {/* Center Core Dot */}
                <div 
                  className="relative w-2.5 h-2.5 rounded-full shadow-md flex items-center justify-center cursor-pointer transition-transform duration-200 group-hover/sig:scale-110"
                  style={{
                    backgroundColor: sig.color,
                    boxShadow: `0 0 10px ${sig.color}`
                  }}
                >
                  <div className="w-1 h-1 rounded-full bg-white" />
                </div>

                {/* Elegant Micro Tag */}
                <div className={`absolute ${isRightSide ? 'right-3.5' : 'left-3.5'} -top-2 flex flex-col backdrop-blur-md px-2 py-0.5 rounded-md border shadow-xl pointer-events-none whitespace-nowrap min-w-[56px] transition-all duration-200 group-hover/sig:scale-105 ${
                  isLight 
                    ? 'bg-white/95 border-rose-200/80 text-slate-800' 
                    : 'bg-[#181228]/95 border-white/15 text-slate-200'
                }`}>
                  <div className="flex items-center gap-1 leading-none">
                    <span className="text-[10px] select-none">{sig.emoji}</span>
                    <span 
                      className="text-[9px] font-mono font-bold tracking-tight"
                      style={{ color: sig.color }}
                    >
                      {getSignalLabel(sig)}
                    </span>
                    {sig.reelsCount !== undefined && sig.reelsCount > 0 && (
                      <span className={`text-[8px] font-mono font-semibold opacity-75 ${
                        isLight ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                        ({sig.reelsCount} {sig.reelsCount === 1 ? 'reel' : 'reels'})
                      </span>
                    )}
                  </div>
                  <span className={`text-[8px] font-mono font-semibold leading-none pt-0.5 ${
                    isLight ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    {sig.count}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. FOOTER: SYSTEM STATUS & ACTION CTA
          ───────────────────────────────────────────────────────────── */}
      <div className={`relative z-10 pt-2 border-t space-y-2 flex-shrink-0 ${
        isLight ? 'border-rose-100/80' : 'border-white/10'
      }`}>
        <div className="flex items-center justify-between text-[10px] font-mono px-0.5">
          <span className={`flex items-center gap-1 ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            <Radio className={`w-3 h-3 animate-pulse ${
              isLight ? 'text-rose-600' : 'text-pink-400'
            }`} />
            {language === 'gu' ? `${uniqueCategoriesCount} ચેનલ સ્કેનિંગ` : language === 'hi' ? `${uniqueCategoriesCount} चैनल स्कैनिंग` : `SCANNING ${uniqueCategoriesCount} CHANNELS`}
          </span>
          <span className={`font-semibold flex items-center gap-1 ${
            isLight ? 'text-rose-700' : 'text-pink-400'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            {language === 'gu' ? 'સ્થિતિ: સક્રિય' : language === 'hi' ? 'स्थिति: सक्रिय' : 'STATUS: ACTIVE'}
          </span>
        </div>

        {/* Action Button: Explore Live Feed */}
        <button
          onClick={onExplore}
          className={`w-full py-2.5 px-3 rounded-xl ${theme?.buttonClass || (isLight ? 'bg-gradient-to-r from-[#701a75] via-[#9d174d] to-[#be123c] text-white' : 'bg-gradient-to-r from-[#d946ef] via-[#ec4899] to-[#f43f5e] text-white')} font-sans text-xs font-semibold shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:brightness-105 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer group`}
        >
          <span>{t.landing?.exploreFeed || 'Explore All Reels Feed →'}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
