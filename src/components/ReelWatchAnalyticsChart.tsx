import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Calendar, 
  Eye, 
  Flame, 
  Award, 
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ReelWatchAnalyticsChartProps {
  history?: Record<string, number>;
  totalWatched?: number;
  todayCount?: number;
  isLight?: boolean;
  className?: string;
  compact?: boolean;
}

export const ReelWatchAnalyticsChart: React.FC<ReelWatchAnalyticsChartProps> = ({
  history: propHistory,
  totalWatched: propTotal,
  todayCount: propToday,
  isLight: propIsLight,
  className = '',
  compact = false
}) => {
  const { dailyReelHistory, totalReelsWatched, todayReelsWatched, colorMode } = useApp();
  const isLight = propIsLight !== undefined ? propIsLight : colorMode === 'light';

  const history = propHistory || dailyReelHistory;
  const total = propTotal !== undefined ? propTotal : totalReelsWatched;
  const today = propToday !== undefined ? propToday : todayReelsWatched;

  // Zoom filter range: 7 days, 14 days, 30 days, or All
  const [zoomRange, setZoomRange] = useState<'7d' | '14d' | '30d' | 'all'>('14d');
  const [hoveredPoint, setHoveredPoint] = useState<{
    dateStr: string;
    label: string;
    dayName: string;
    count: number;
    x: number;
    y: number;
    index: number;
  } | null>(null);

  // Generate date series based on selected zoom range
  const chartData = useMemo(() => {
    const daysToInclude = zoomRange === '7d' ? 7 : zoomRange === '14d' ? 14 : zoomRange === '30d' ? 30 : 45;
    const points: Array<{
      dateStr: string;
      label: string;
      dayName: string;
      shortDay: string;
      count: number;
      isToday: boolean;
    }> = [];

    const now = new Date();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = daysToInclude - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const dateKey = `${yyyy}-${mm}-${dd}`;
      
      const count = history[dateKey] || 0;
      const isToday = i === 0;

      points.push({
        dateStr: dateKey,
        label: `${monthNames[d.getMonth()]} ${d.getDate()}`,
        dayName: dayNames[d.getDay()],
        shortDay: `${dayNames[d.getDay()]} ${d.getDate()}`,
        count,
        isToday
      });
    }

    return points;
  }, [history, zoomRange]);

  // Compute stats: Max count, Average, Peak Day
  const { maxCount, avgCount, peakPoint } = useMemo(() => {
    let max = 0;
    let sum = 0;
    let peak: typeof chartData[0] | null = null;

    chartData.forEach(p => {
      sum += p.count;
      if (p.count > max) {
        max = p.count;
        peak = p;
      }
    });

    const avg = chartData.length > 0 ? (sum / chartData.length).toFixed(1) : '0';
    // Ensure chart ceiling has headroom
    const chartMax = Math.max(35, Math.ceil((max + 5) / 5) * 5);

    return { maxCount: chartMax, avgCount: avg, peakPoint: peak };
  }, [chartData]);

  // SVG Chart Geometry Calculations
  const svgWidth = 600;
  const svgHeight = 220;
  const padLeft = 36;
  const padRight = 20;
  const padTop = 32;
  const padBottom = 38;

  const innerWidth = svgWidth - padLeft - padRight;
  const innerHeight = svgHeight - padTop - padBottom;

  // Scale coordinates
  const pointsWithCoords = useMemo(() => {
    const totalPoints = chartData.length;
    return chartData.map((d, idx) => {
      const x = padLeft + (idx / Math.max(1, totalPoints - 1)) * innerWidth;
      const y = padTop + innerHeight - (d.count / maxCount) * innerHeight;
      return { ...d, x, y, idx };
    });
  }, [chartData, innerWidth, innerHeight, maxCount, padLeft, padTop]);

  // Construct SVG Path for the line
  const linePath = useMemo(() => {
    if (pointsWithCoords.length === 0) return '';
    return pointsWithCoords.reduce((acc, pt, idx) => {
      if (idx === 0) return `M ${pt.x} ${pt.y}`;
      return `${acc} L ${pt.x} ${pt.y}`;
    }, '');
  }, [pointsWithCoords]);

  // Construct Area Path (for orange tinted shaded background)
  const areaPath = useMemo(() => {
    if (pointsWithCoords.length === 0) return '';
    const first = pointsWithCoords[0];
    const last = pointsWithCoords[pointsWithCoords.length - 1];
    const baseline = padTop + innerHeight;
    return `${linePath} L ${last.x} ${baseline} L ${first.x} ${baseline} Z`;
  }, [linePath, pointsWithCoords, padTop, innerHeight]);

  // Step-area / Histogram background path (matching the reference image stepped histogram)
  const stepHistogramPath = useMemo(() => {
    if (pointsWithCoords.length === 0) return '';
    const baseline = padTop + innerHeight;
    const stepWidth = innerWidth / pointsWithCoords.length;

    let path = `M ${padLeft} ${baseline}`;
    pointsWithCoords.forEach((pt) => {
      // Step bar height with smooth ambient variation like in reference
      const barY = pt.y + 12; // stepped background under the line
      const clampedBarY = Math.min(baseline, Math.max(padTop + 20, barY));
      path += ` L ${pt.x - stepWidth / 2} ${clampedBarY} L ${pt.x + stepWidth / 2} ${clampedBarY}`;
    });
    const last = pointsWithCoords[pointsWithCoords.length - 1];
    path += ` L ${last.x + stepWidth / 2} ${baseline} Z`;
    return path;
  }, [pointsWithCoords, padTop, innerHeight, innerWidth, padLeft]);

  // Grid steps for Y-Axis (e.g. 0, 10, 20, 30, ...)
  const yAxisTicks = [0, 10, 20, 30];

  // Peak marker points (identify local peaks with high values to pin badges like [33], [29], [21])
  const peakMarkers = useMemo(() => {
    return pointsWithCoords.filter((pt, i) => {
      if (pt.count < 15) return false;
      const prev = pointsWithCoords[i - 1]?.count ?? 0;
      const next = pointsWithCoords[i + 1]?.count ?? 0;
      return pt.count >= prev && pt.count >= next;
    });
  }, [pointsWithCoords]);

  return (
    <div className={`rounded-3xl border transition-all duration-300 ${
      isLight 
        ? 'bg-white border-slate-200/90 shadow-lg shadow-slate-200/40 text-slate-900' 
        : 'bg-slate-900/90 border-white/10 shadow-2xl shadow-black/50 text-white'
    } ${className}`}>
      {/* ── Top Header & Stats Bar ── */}
      <div className={`p-4 sm:p-5 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        isLight ? 'border-slate-100 bg-slate-50/60' : 'border-white/5 bg-slate-950/40'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-500 flex items-center justify-center flex-shrink-0 shadow-inner">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-sm sm:text-base font-display font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Reel Watch Activity & Trends
              </h3>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Auto-Track
              </span>
            </div>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Date-wise reels watched • Auto-updates in real-time as you watch
            </p>
          </div>
        </div>

        {/* Zoom Controls & Stat Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Zoom Buttons (matching reference "Zoom: 7d, 14d, 30d, All") */}
          <div className={`p-1 rounded-xl border flex items-center gap-1 ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-800/80 border-white/10'
          }`}>
            <span className="text-[10px] font-mono font-bold text-slate-400 px-1.5 hidden sm:inline">
              Zoom:
            </span>
            {(['7d', '14d', '30d', 'all'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setZoomRange(r)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                  zoomRange === r
                    ? isLight
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-orange-500 text-slate-950 font-black shadow-md shadow-orange-500/30'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Today Count Badge */}
          <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 ${
            isLight ? 'bg-orange-50/80 border-orange-200 text-orange-900' : 'bg-orange-950/40 border-orange-500/30 text-orange-300'
          }`}>
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <div className="text-left">
              <span className="text-[9px] uppercase font-mono block tracking-wider leading-none opacity-80">Today</span>
              <span className="text-xs font-mono font-black">{today} reels</span>
            </div>
          </div>

          {/* Total Count Badge */}
          <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 ${
            isLight ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
          }`}>
            <Eye className="w-3.5 h-3.5 text-emerald-500" />
            <div className="text-left">
              <span className="text-[9px] uppercase font-mono block tracking-wider leading-none opacity-80">Total Watched</span>
              <span className="text-xs font-mono font-black">{total} reels</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Key Metrics Summary Strip ── */}
      <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 border-b ${
        isLight ? 'border-slate-100 bg-white' : 'border-white/5 bg-slate-900/40'
      }`}>
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono uppercase text-slate-400">Total Count</span>
          <p className="text-lg font-display font-black text-orange-500">{total} <span className="text-xs font-sans font-normal text-slate-400">reels</span></p>
        </div>
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono uppercase text-slate-400">Today's Progress</span>
          <p className="text-lg font-display font-black text-cyan-400">{today} <span className="text-xs font-sans font-normal text-slate-400">reels</span></p>
        </div>
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono uppercase text-slate-400">Daily Average</span>
          <p className={`text-lg font-display font-black ${isLight ? 'text-slate-800' : 'text-slate-100'}`}>{avgCount} <span className="text-xs font-sans font-normal text-slate-400">/day</span></p>
        </div>
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono uppercase text-slate-400">Peak Single Day</span>
          <p className="text-lg font-display font-black text-amber-400">{peakPoint ? peakPoint.count : 0} <span className="text-xs font-sans font-normal text-slate-400">reels</span></p>
        </div>
      </div>

      {/* ── The Visual SVG Area & Line Chart (matching reference image) ── */}
      <div className="relative p-4 sm:p-5 select-none overflow-hidden">
        {/* Hover Tooltip Box */}
        {hoveredPoint && (
          <div
            className={`absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-full px-3 py-2 rounded-xl shadow-2xl border text-xs transition-transform duration-100 ${
              isLight
                ? 'bg-slate-900 text-white border-slate-700 shadow-slate-900/30'
                : 'bg-slate-950/95 text-white border-orange-500/50 shadow-orange-500/20'
            }`}
            style={{
              left: `${(hoveredPoint.x / svgWidth) * 100}%`,
              top: `${(hoveredPoint.y / svgHeight) * 100}%`,
              marginTop: '-12px'
            }}
          >
            <div className="flex items-center gap-1.5 text-orange-400 font-mono font-bold text-[11px]">
              <Calendar className="w-3 h-3" />
              <span>{hoveredPoint.label} ({hoveredPoint.dayName})</span>
            </div>
            <div className="pt-1 flex items-baseline gap-1.5">
              <span className="text-base font-display font-black text-white">{hoveredPoint.count}</span>
              <span className="text-[10px] text-slate-300">reels watched</span>
            </div>
            <div className="text-[9px] text-slate-400 font-mono">
              ~{(hoveredPoint.count * 0.75).toFixed(0)} mins watch time
            </div>
          </div>
        )}

        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto overflow-visible cursor-crosshair"
          onMouseLeave={() => setHoveredPoint(null)}
        >
          <defs>
            {/* Shaded Area Gradient (Warm Orange / Amber) */}
            <linearGradient id="reelAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity={isLight ? 0.35 : 0.45} />
              <stop offset="60%" stopColor="#f59e0b" stopOpacity={isLight ? 0.18 : 0.22} />
              <stop offset="100%" stopColor="#ea580c" stopOpacity={0.02} />
            </linearGradient>

            {/* Stepped background histogram fill */}
            <linearGradient id="stepHistGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fb923c" stopOpacity={isLight ? 0.22 : 0.28} />
              <stop offset="100%" stopColor="#ea580c" stopOpacity={0.04} />
            </linearGradient>

            {/* Glow Filter for the Line */}
            <filter id="orangeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#f97316" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Horizontal Gridlines & Y-Axis Labels */}
          {yAxisTicks.map((val) => {
            const y = padTop + innerHeight - (val / maxCount) * innerHeight;
            return (
              <g key={val}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={svgWidth - padRight}
                  y2={y}
                  stroke={isLight ? '#e2e8f0' : 'rgba(255,255,255,0.08)'}
                  strokeWidth="1"
                  strokeDasharray={val === 0 ? 'none' : '3 3'}
                />
                <text
                  x={padLeft - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  fontSize="10"
                  fontFamily="monospace"
                  fill={isLight ? '#64748b' : '#94a3b8'}
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Stepped Histogram Background (matching the reference chart) */}
          <path
            d={stepHistogramPath}
            fill="url(#stepHistGrad)"
            stroke={isLight ? 'rgba(249, 115, 22, 0.25)' : 'rgba(249, 115, 22, 0.35)'}
            strokeWidth="1"
          />

          {/* Smooth Shaded Area Fill */}
          <path
            d={areaPath}
            fill="url(#reelAreaGrad)"
          />

          {/* Main Orange Curve/Line (as seen in reference) */}
          <path
            d={linePath}
            fill="none"
            stroke="#ea580c"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#orangeGlow)"
          />

          {/* Vertical Guides on Hover */}
          {hoveredPoint && (
            <line
              x1={hoveredPoint.x}
              y1={padTop}
              x2={hoveredPoint.x}
              y2={padTop + innerHeight}
              stroke="#f97316"
              strokeWidth="1.5"
              strokeDasharray="2 2"
              opacity="0.8"
            />
          )}

          {/* Peak Marker Badges [33], [28], [21], etc. (matching reference style) */}
          {peakMarkers.map((pt) => (
            <g key={`peak-${pt.dateStr}`} className="pointer-events-none">
              <rect
                x={pt.x - 12}
                y={pt.y - 20}
                width="24"
                height="15"
                rx="4"
                fill={isLight ? '#ffffff' : '#0f172a'}
                stroke="#ea580c"
                strokeWidth="1.2"
                filter="drop-shadow(0 1px 2px rgba(0,0,0,0.15))"
              />
              <text
                x={pt.x}
                y={pt.y - 9}
                textAnchor="middle"
                fontSize="9"
                fontWeight="900"
                fontFamily="monospace"
                fill={isLight ? '#ea580c' : '#fb923c'}
              >
                {pt.count}
              </text>
            </g>
          ))}

          {/* Interactive Data Points (Dots & Hover Hitboxes) */}
          {pointsWithCoords.map((pt) => {
            const isHovered = hoveredPoint?.dateStr === pt.dateStr;
            return (
              <g
                key={pt.dateStr}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredPoint({
                  dateStr: pt.dateStr,
                  label: pt.label,
                  dayName: pt.dayName,
                  count: pt.count,
                  x: pt.x,
                  y: pt.y,
                  index: pt.idx
                })}
              >
                {/* Invisible large touch target */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="14"
                  fill="transparent"
                />

                {/* Visible Data Dot */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 6 : pt.isToday ? 4.5 : 3}
                  fill={isHovered ? '#ea580c' : pt.isToday ? '#22c55e' : '#f97316'}
                  stroke={isLight ? '#ffffff' : '#0f172a'}
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  className="transition-all duration-150"
                />

                {/* Pulsing ring for Today's point */}
                {pt.isToday && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="8"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="1.2"
                    opacity="0.6"
                    className="animate-ping"
                  />
                )}
              </g>
            );
          })}

          {/* X-Axis Date / Day Labels */}
          {pointsWithCoords.map((pt, i) => {
            // Render every 2nd or 3rd label if too many points to avoid crowding
            const step = pointsWithCoords.length > 20 ? 4 : pointsWithCoords.length > 10 ? 2 : 1;
            if (i % step !== 0 && !pt.isToday && i !== pointsWithCoords.length - 1) return null;

            return (
              <text
                key={`label-${pt.dateStr}`}
                x={pt.x}
                y={svgHeight - 14}
                textAnchor="middle"
                fontSize="9"
                fontFamily="sans-serif"
                fontWeight={pt.isToday ? 'bold' : 'normal'}
                fill={pt.isToday ? '#ea580c' : isLight ? '#64748b' : '#94a3b8'}
              >
                {pt.isToday ? 'Today' : pt.label}
              </text>
            );
          })}
        </svg>

        {/* Bottom Legend & Guidance */}
        <div className={`mt-3 pt-2.5 border-t flex flex-wrap items-center justify-between text-[11px] font-mono ${
          isLight ? 'border-slate-100 text-slate-500' : 'border-white/5 text-slate-400'
        }`}>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" />
              Reels Watched Daily
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              Today's Live Count
            </span>
            <span className="flex items-center gap-1.5">
              <span className="px-1 rounded bg-slate-800 text-[9px] border border-orange-500 text-orange-400 font-bold">[#]</span>
              Peak Day Tag
            </span>
          </div>
          <span className="text-[10px] text-slate-400">
            Hover or tap any node to inspect date details
          </span>
        </div>
      </div>
    </div>
  );
};
