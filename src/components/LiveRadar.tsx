import React, { useState, useEffect } from 'react';
import { Radio, ArrowRight, Activity, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LiveRadarProps {
  onExplore?: () => void;
  theme?: any;
  isLight?: boolean;
}

interface SignalPoint {
  id: string;
  label: string;
  emoji: string;
  count: string;
  angle: number;       // Angle in degrees (0 - 360)
  distance: number;    // Distance from center (0 - 100%)
  color: string;       // Signal accent color
  pulseDelay: string;  // CSS delay for staggered pulsing
}

const RADAR_SIGNALS: SignalPoint[] = [
  { id: 'viral', label: 'VIRAL', emoji: '🔥', count: '+12.4K', angle: 45, distance: 74, color: '#f97316', pulseDelay: '0s' },
  { id: 'music', label: 'MUSIC', emoji: '🎵', count: '+8.7K', angle: 135, distance: 62, color: '#ec4899', pulseDelay: '0.6s' },
  { id: 'reels', label: 'REELS', emoji: '🎬', count: '+18.1K', angle: 220, distance: 82, color: '#06b6d4', pulseDelay: '1.2s' },
  { id: 'ai', label: 'AI', emoji: '🤖', count: '+5.2K', angle: 295, distance: 52, color: '#a855f7', pulseDelay: '1.8s' },
  { id: 'memes', label: 'MEMES', emoji: '😂', count: '+9.3K', angle: 345, distance: 68, color: '#eab308', pulseDelay: '0.3s' },
  { id: 'gaming', label: 'GAMING', emoji: '🎮', count: '+14.6K', angle: 175, distance: 78, color: '#10b981', pulseDelay: '0.9s' },
  { id: 'trending', label: 'TRENDING', emoji: '✨', count: '+21.0K', angle: 85, distance: 86, color: '#38bdf8', pulseDelay: '1.5s' }
];

export const LiveRadar: React.FC<LiveRadarProps> = ({ 
  onExplore, 
  theme, 
  isLight = false 
}) => {
  const { t, language } = useApp();
  // Live animated telemetry counters
  const [activeTrends, setActiveTrends] = useState(1284);
  const [liveSignals, setLiveSignals] = useState(24.8);
  const [sweepAngle, setSweepAngle] = useState(142);

  const getSignalLabel = (sig: SignalPoint) => {
    if (language === 'gu') {
      const guLabels: Record<string, string> = {
        viral: 'વાયરલ',
        music: 'સંગીત',
        reels: 'રીલ્સ',
        ai: 'AI',
        memes: 'મીમ્સ',
        gaming: 'ગેમિંગ',
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
        gaming: 'गेमिंग',
        trending: 'ट्रेंडिंग'
      };
      return hiLabels[sig.id] || sig.label;
    }
    return sig.label;
  };

  // Periodic subtle updates to make radar feel truly alive
  useEffect(() => {
    const trendInterval = setInterval(() => {
      setActiveTrends(prev => {
        const delta = Math.floor(Math.random() * 7) - 3;
        return Math.max(1240, Math.min(1340, prev + delta));
      });
    }, 2400);

    const signalInterval = setInterval(() => {
      setLiveSignals(prev => {
        const delta = (Math.random() * 0.2 - 0.1);
        return parseFloat((prev + delta).toFixed(1));
      });
    }, 3200);

    const sweepDisplayInterval = setInterval(() => {
      setSweepAngle(prev => (prev + 11) % 360);
    }, 120);

    return () => {
      clearInterval(trendInterval);
      clearInterval(signalInterval);
      clearInterval(sweepDisplayInterval);
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
    <div className={`w-full max-w-[380px] min-h-[500px] sm:h-[520px] rounded-3xl overflow-hidden border shadow-2xl relative flex flex-col justify-between p-3.5 sm:p-4.5 select-none transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_20px_50px_rgba(6,182,212,0.12)] group ${
      isLight 
        ? 'bg-[#090d16] border-cyan-500/30 shadow-cyan-950/20' 
        : 'bg-[#060911] border-cyan-500/25 shadow-cyan-950/40'
    }`}>
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(6,182,212,0.12)_0%,rgba(14,165,233,0.04)_50%,transparent_75%)] pointer-events-none" />

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
      <div className="relative z-10 flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          {/* Pulsing Live Beacon */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
          </span>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-wider uppercase text-white font-mono flex items-center gap-1.5">
                {t.landing?.radarTitle || 'LIVE RADAR'}
              </span>
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-500/30">
                {language === 'gu' ? 'ઝિન્કો સ્કેન' : language === 'hi' ? 'ज़िन्को स्कैन' : 'SCANNING ZYNQO'}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-sans tracking-normal pt-0.5">
              {language === 'gu' ? 'રીઅલ-ટાઇમ સોશિયલ ટ્રેન્ડ ઇન્ટેલિજન્સ' : language === 'hi' ? 'रियल-टाइम सोशल ट्रेंड इंटेलिजेंस' : 'Real-time Social Trend Intelligence'}
            </p>
          </div>
        </div>

        {/* Live Frequency / Sweep Azimuth Telemetry */}
        <div className="text-right font-mono">
          <span className="text-[10px] text-cyan-400 font-bold block leading-none">
            AZ {sweepAngle.toString().padStart(3, '0')}°
          </span>
          <span className="text-[9px] text-slate-500 block pt-0.5">
            360° SWEEP
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. LIVE METRICS BAR: ACTIVE TRENDS & LIVE SIGNALS
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 grid grid-cols-2 gap-2 my-1.5">
        <div className="bg-slate-900/70 border border-white/10 rounded-xl px-3 py-1.5 backdrop-blur-md flex items-center justify-between">
          <div>
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">
              {t.landing?.activeTrends || 'ACTIVE TRENDS'}
            </span>
            <span className="text-xs font-mono font-black text-white flex items-center gap-1">
              <Activity className="w-3 h-3 text-cyan-400" />
              {activeTrends.toLocaleString()}
            </span>
          </div>
          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-500/20 font-bold">
            +18%
          </span>
        </div>

        <div className="bg-slate-900/70 border border-white/10 rounded-xl px-3 py-1.5 backdrop-blur-md flex items-center justify-between">
          <div>
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">
              {t.landing?.liveSignals || 'LIVE SIGNALS'}
            </span>
            <span className="text-xs font-mono font-black text-white flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" />
              {liveSignals}k/s
            </span>
          </div>
          <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/50 px-1.5 py-0.5 rounded border border-cyan-500/20 font-bold">
            FAST
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. CENTRAL CIRCULAR RADAR SCOPE
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-1">
        <div className="relative w-[250px] h-[250px] xs:w-[270px] xs:h-[270px] sm:w-[280px] sm:h-[280px] rounded-full flex items-center justify-center bg-[#050811]/90 shadow-[inset_0_0_30px_rgba(6,182,212,0.15)] border border-cyan-500/30 overflow-hidden">
          
          {/* Subtle Rotating Sweep Beam & Conic Trail */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              animation: 'radar-sweep 4.5s linear infinite',
              background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, rgba(6,182,212,0.02) 290deg, rgba(6,182,212,0.12) 330deg, rgba(34,211,238,0.38) 359deg, rgba(34,211,238,0.9) 360deg)'
            }}
          >
            {/* High-intensity Leading Edge Line */}
            <div className="absolute top-0 right-1/2 w-[50%] h-[2px] bg-gradient-to-l from-cyan-300 via-cyan-400 to-transparent shadow-[0_0_8px_#22d3ee] origin-right" />
          </div>

          {/* SVG Concentric Range Rings and Grid Crosshairs */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 280 280">
            {/* Concentric Rings */}
            <circle cx="140" cy="140" r="35" fill="none" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" strokeDasharray="2 3" />
            <circle cx="140" cy="140" r="70" fill="none" stroke="rgba(6, 182, 212, 0.22)" strokeWidth="1" />
            <circle cx="140" cy="140" r="105" fill="none" stroke="rgba(6, 182, 212, 0.25)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="140" cy="140" r="136" fill="none" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="1.5" />

            {/* Radial Crosshairs */}
            <line x1="140" y1="4" x2="140" y2="276" stroke="rgba(6, 182, 212, 0.18)" strokeWidth="1" />
            <line x1="4" y1="140" x2="276" y2="140" stroke="rgba(6, 182, 212, 0.18)" strokeWidth="1" />
            
            {/* 45° Diagonal Guides */}
            <line x1="45" y1="45" x2="235" y2="235" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="1" strokeDasharray="2 4" />
            <line x1="235" y1="45" x2="45" y2="235" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="1" strokeDasharray="2 4" />

            {/* Cardinal Degree Markers */}
            <text x="140" y="16" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="monospace" opacity="0.7">000°</text>
            <text x="268" y="143" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="monospace" opacity="0.7">090°</text>
            <text x="140" y="270" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="monospace" opacity="0.7">180°</text>
            <text x="12" y="143" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="monospace" opacity="0.7">270°</text>

            {/* Range Ticks */}
            <text x="145" y="102" fill="#64748b" fontSize="7" fontFamily="monospace" opacity="0.6">50K</text>
            <text x="145" y="68" fill="#64748b" fontSize="7" fontFamily="monospace" opacity="0.6">150K</text>
            <text x="145" y="32" fill="#64748b" fontSize="7" fontFamily="monospace" opacity="0.6">MAX</text>
          </svg>

          {/* Center Hub Core */}
          <div className="absolute z-20 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <div className="absolute w-6 h-6 rounded-full border border-cyan-400/50 animate-ping" />
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
              className="absolute w-1 h-1 rounded-full bg-cyan-400/40 pointer-events-none"
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
          {RADAR_SIGNALS.map(sig => {
            const { x, y } = getCoordinates(sig.angle, sig.distance);
            const isRightSide = x > 54;
            return (
              <div
                key={sig.id}
                className="absolute z-30 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:scale-125 cursor-pointer group/sig"
                style={{ top: `${y}%`, left: `${x}%` }}
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
                <div className={`absolute ${isRightSide ? 'right-3.5' : 'left-3.5'} -top-2 flex flex-col bg-slate-950/85 backdrop-blur-md px-1.5 py-0.5 rounded-md border border-white/15 shadow-xl pointer-events-none whitespace-nowrap min-w-[50px] transition-all duration-200 group-hover/sig:border-cyan-400/50 group-hover/sig:bg-slate-900`}>
                  <div className="flex items-center gap-1 leading-none">
                    <span className="text-[10px] select-none">{sig.emoji}</span>
                    <span 
                      className="text-[9px] font-mono font-bold tracking-tight"
                      style={{ color: sig.color }}
                    >
                      {getSignalLabel(sig)}
                    </span>
                  </div>
                  <span className="text-[8px] font-mono text-slate-300 font-semibold leading-none pt-0.5">
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
      <div className="relative z-10 pt-2 border-t border-white/10 space-y-2">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-0.5">
          <span className="flex items-center gap-1 text-slate-300">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            {language === 'gu' ? '૭ ચેનલ સ્કેનિંગ' : language === 'hi' ? '७ चैनल स्कैनिंग' : 'SCANNING 7 CHANNELS'}
          </span>
          <span className="text-cyan-400 font-semibold">
            {language === 'gu' ? 'સ્થિતિ: સક્રિય' : language === 'hi' ? 'स्थिति: सक्रिय' : 'STATUS: ACTIVE'}
          </span>
        </div>

        {/* Action Button: Explore Live Feed */}
        <button
          onClick={onExplore}
          className={`w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 hover:opacity-95 text-slate-950 font-sans text-xs font-semibold shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-cyan-500/40 hover:brightness-105 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer group`}
        >
          <span>{t.landing?.exploreFeed || 'Explore Live Trends & Reels'}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
