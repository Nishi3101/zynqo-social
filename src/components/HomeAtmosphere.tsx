import React, { useState, useEffect, useRef } from 'react';

interface HomeAtmosphereProps {
  isLight: boolean;
}

interface DoodleData {
  id: string;
  name: string;
  top: string;
  left: string;
  size: number;
  baseOpacity: number;
  animationClass: string;
  animationDuration: string;
  animationDelay: string;
  colorDark: string;
  colorLight: string;
  renderSvg: () => React.ReactNode;
}

export const HomeAtmosphere: React.FC<HomeAtmosphereProps> = ({ isLight }) => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Global mousemove tracking with requestAnimationFrame for 60fps responsiveness
  useEffect(() => {
    let animId: number;
    const onMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Collection of 16 handcrafted futuristic AI + Entertainment + Social Reels line-art doodles
  const doodles: DoodleData[] = [
    // 1. Neural Network Node Cluster (Top-left above hero title)
    {
      id: 'neural-cluster-1',
      name: 'Neural Network Cluster',
      top: '7%',
      left: '3%',
      size: 42,
      baseOpacity: isLight ? 0.32 : 0.38,
      animationClass: 'animate-doodle-drift-1',
      animationDuration: '8s',
      animationDelay: '0s',
      colorDark: 'text-cyan-400',
      colorLight: 'text-blue-600',
      renderSvg: () => (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <circle cx="12" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="36" cy="14" r="3.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="26" cy="36" r="4" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="16" r="1.5" fill="currentColor" />
          <circle cx="36" cy="14" r="1.5" fill="currentColor" />
          <circle cx="26" cy="36" r="1.5" fill="currentColor" />
          <line x1="15.5" y1="15.5" x2="32.5" y2="14.5" stroke="currentColor" strokeWidth="1.25" strokeDasharray="3 2" />
          <line x1="14" y1="19.5" x2="24" y2="32.5" stroke="currentColor" strokeWidth="1.25" />
          <line x1="33.5" y1="17" x2="28" y2="32.5" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      )
    },

    // 2. Reel Filmstrip / Video Frame (Top-right beyond preview card)
    {
      id: 'reel-filmstrip-2',
      name: 'Reel Filmstrip',
      top: '8%',
      left: '94%',
      size: 38,
      baseOpacity: isLight ? 0.28 : 0.35,
      animationClass: 'animate-doodle-drift-2',
      animationDuration: '10s',
      animationDelay: '1.2s',
      colorDark: 'text-blue-400',
      colorLight: 'text-indigo-600',
      renderSvg: () => (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <rect x="8" y="10" width="32" height="28" rx="5" stroke="currentColor" strokeWidth="1.5" />
          <line x1="8" y1="18" x2="40" y2="18" stroke="currentColor" strokeWidth="1.25" />
          <line x1="8" y1="30" x2="40" y2="30" stroke="currentColor" strokeWidth="1.25" />
          <line x1="16" y1="10" x2="16" y2="18" stroke="currentColor" strokeWidth="1.2" />
          <line x1="24" y1="10" x2="24" y2="18" stroke="currentColor" strokeWidth="1.2" />
          <line x1="32" y1="10" x2="32" y2="18" stroke="currentColor" strokeWidth="1.2" />
          <line x1="16" y1="30" x2="16" y2="38" stroke="currentColor" strokeWidth="1.2" />
          <line x1="24" y1="30" x2="24" y2="38" stroke="currentColor" strokeWidth="1.2" />
          <line x1="32" y1="30" x2="32" y2="38" stroke="currentColor" strokeWidth="1.2" />
          <polygon points="21,21 21,27 27,24" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      )
    },

    // 3. AI Starlight Sparkle (Hero upper-center negative space)
    {
      id: 'ai-sparkle-3',
      name: 'AI Starlight',
      top: '19%',
      left: '49%',
      size: 32,
      baseOpacity: isLight ? 0.35 : 0.42,
      animationClass: 'animate-doodle-drift-3',
      animationDuration: '7s',
      animationDelay: '2.5s',
      colorDark: 'text-sky-300',
      colorLight: 'text-cyan-600',
      renderSvg: () => (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <path d="M24 6 C24 16 26 24 36 24 C26 24 24 32 24 42 C24 32 22 24 12 24 C22 24 24 16 24 6 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="38" cy="11" r="1.5" fill="currentColor" />
          <circle cx="10" cy="37" r="1.5" fill="currentColor" />
        </svg>
      )
    },

    // 4. Play Button in Tech Hexagon (Hero middle-left edge)
    {
      id: 'play-hexagon-4',
      name: 'Play Hexagon',
      top: '31%',
      left: '2%',
      size: 40,
      baseOpacity: isLight ? 0.28 : 0.35,
      animationClass: 'animate-doodle-drift-4',
      animationDuration: '9.5s',
      animationDelay: '0.8s',
      colorDark: 'text-cyan-400',
      colorLight: 'text-blue-500',
      renderSvg: () => (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <polygon points="24,6 40,15 40,33 24,42 8,33 8,15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <polygon points="21,18 21,30 31,24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        </svg>
      )
    },

    // 5. Audio Waveform Lines (Hero middle-right edge)
    {
      id: 'waveform-5',
      name: 'Audio Waveform',
      top: '28%',
      left: '95%',
      size: 44,
      baseOpacity: isLight ? 0.32 : 0.38,
      animationClass: 'animate-doodle-drift-5',
      animationDuration: '8.5s',
      animationDelay: '1.8s',
      colorDark: 'text-blue-400',
      colorLight: 'text-sky-600',
      renderSvg: () => (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <line x1="10" y1="20" x2="10" y2="28" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <line x1="17" y1="14" x2="17" y2="34" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <line x1="24" y1="8" x2="24" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="31" y1="16" x2="31" y2="32" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <line x1="38" y1="22" x2="38" y2="26" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      )
    },

    // 6. Futuristic Headphones (Under hero badges left flank)
    {
      id: 'headphones-6',
      name: 'Headphones',
      top: '41%',
      left: '8%',
      size: 40,
      baseOpacity: isLight ? 0.28 : 0.34,
      animationClass: 'animate-doodle-drift-1',
      animationDuration: '11s',
      animationDelay: '3s',
      colorDark: 'text-indigo-400',
      colorLight: 'text-indigo-600',
      renderSvg: () => (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <path d="M12 26 C12 17 17 11 24 11 C31 11 36 17 36 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="9" y="24" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <rect x="33" y="24" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M41 22 Q43 26 41 30" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      )
    },

    // 7. Friendly AI Robot Avatar (Hero bottom-right flank)
    {
      id: 'robot-avatar-7',
      name: 'Robot Avatar',
      top: '43%',
      left: '91%',
      size: 44,
      baseOpacity: isLight ? 0.3 : 0.36,
      animationClass: 'animate-doodle-drift-3',
      animationDuration: '9s',
      animationDelay: '1.5s',
      colorDark: 'text-cyan-400',
      colorLight: 'text-cyan-600',
      renderSvg: () => (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <line x1="24" y1="6" x2="24" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="24" cy="5" r="2" fill="currentColor" />
          <rect x="10" y="12" width="28" height="24" rx="8" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="18" cy="22" r="2.5" stroke="currentColor" strokeWidth="1.25" fill="currentColor" />
          <circle cx="30" cy="22" r="2.5" stroke="currentColor" strokeWidth="1.25" fill="currentColor" />
          <path d="M19 29 Q24 33 29 29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="6" y1="23" x2="10" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="38" y1="23" x2="42" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    },

    // 8. AI Prompt / Thought Bubble (Corporate palette banner left edge)
    {
      id: 'thought-bubble-8',
      name: 'AI Thought Bubble',
      top: '52%',
      left: '3%',
      size: 38,
      baseOpacity: isLight ? 0.28 : 0.35,
      animationClass: 'animate-doodle-drift-2',
      animationDuration: '10.5s',
      animationDelay: '0.5s',
      colorDark: 'text-blue-400',
      colorLight: 'text-blue-600',
      renderSvg: () => (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <path d="M10 22 C10 14 16 9 24 9 C32 9 38 14 38 22 C38 29 32 34 25 34 C23 34 20 34.5 17 36 L13 39 L14 33 C11.5 30.5 10 26.5 10 22 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M24 16 C24 19 25 21 28 21 C25 21 24 23 24 26 C24 23 23 21 20 21 C23 21 24 19 24 16 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      )
    },

    // 9. Code Syntax Brackets (Corporate palette banner right edge)
    {
      id: 'code-brackets-9',
      name: 'Code Brackets',
      top: '55%',
      left: '95%',
      size: 38,
      baseOpacity: isLight ? 0.28 : 0.35,
      animationClass: 'animate-doodle-drift-4',
      animationDuration: '8.5s',
      animationDelay: '2s',
      colorDark: 'text-indigo-400',
      colorLight: 'text-indigo-600',
      renderSvg: () => (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <path d="M16 16 L8 24 L16 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M32 16 L40 24 L32 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="26" y1="12" x2="22" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    },

    // 10. Energy Bolt / Lightning (Comparison section upper-left margin)
    {
      id: 'energy-bolt-10',
      name: 'Energy Bolt',
      top: '65%',
      left: '5%',
      size: 36,
      baseOpacity: isLight ? 0.3 : 0.38,
      animationClass: 'animate-doodle-drift-5',
      animationDuration: '7.5s',
      animationDelay: '1s',
      colorDark: 'text-cyan-300',
      colorLight: 'text-sky-600',
      renderSvg: () => (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <polygon points="26,6 14,24 23,24 20,42 34,22 25,22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="37" cy="14" r="1.5" fill="currentColor" />
        </svg>
      )
    },

    // 11. Musical Notes Melody (Comparison section upper-right margin)
    {
      id: 'music-melody-11',
      name: 'Music Notes',
      top: '68%',
      left: '93%',
      size: 38,
      baseOpacity: isLight ? 0.3 : 0.36,
      animationClass: 'animate-doodle-drift-1',
      animationDuration: '10s',
      animationDelay: '2.2s',
      colorDark: 'text-cyan-400',
      colorLight: 'text-blue-600',
      renderSvg: () => (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <ellipse cx="14" cy="34" rx="4" ry="3" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="32" cy="30" rx="4" ry="3" stroke="currentColor" strokeWidth="1.5" />
          <line x1="18" y1="34" x2="18" y2="14" stroke="currentColor" strokeWidth="1.5" />
          <line x1="36" y1="30" x2="36" y2="10" stroke="currentColor" strokeWidth="1.5" />
          <polygon points="18,14 36,10 36,14 18,18" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1" />
        </svg>
      )
    },

    // 12. Infinity Continuous Loop (Between Traditional vs Zynqo cards in center gap)
    {
      id: 'infinity-loop-12',
      name: 'Infinity Loop',
      top: '77%',
      left: '49%',
      size: 40,
      baseOpacity: isLight ? 0.32 : 0.38,
      animationClass: 'animate-doodle-drift-3',
      animationDuration: '12s',
      animationDelay: '0.4s',
      colorDark: 'text-blue-400',
      colorLight: 'text-indigo-600',
      renderSvg: () => (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <path d="M16 24 C10 17 10 31 16 24 C22 17 26 31 32 24 C38 17 38 31 32 24 C26 17 22 31 16 24 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="24" cy="24" r="1.5" fill="currentColor" />
        </svg>
      )
    },

    // 13. Camera Lens Aperture (Comparison section lower-left edge)
    {
      id: 'aperture-13',
      name: 'Camera Aperture',
      top: '81%',
      left: '4%',
      size: 38,
      baseOpacity: isLight ? 0.28 : 0.34,
      animationClass: 'animate-doodle-drift-2',
      animationDuration: '9.5s',
      animationDelay: '1.7s',
      colorDark: 'text-cyan-400',
      colorLight: 'text-cyan-700',
      renderSvg: () => (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" />
          <line x1="24" y1="8" x2="34" y2="18" stroke="currentColor" strokeWidth="1.25" />
          <line x1="40" y1="24" x2="30" y2="34" stroke="currentColor" strokeWidth="1.25" />
          <line x1="24" y1="40" x2="14" y2="30" stroke="currentColor" strokeWidth="1.25" />
          <line x1="8" y1="24" x2="18" y2="14" stroke="currentColor" strokeWidth="1.25" />
          <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      )
    },

    // 14. 3D Isometric Wireframe Cube (Comparison section lower-right edge)
    {
      id: 'isometric-cube-14',
      name: '3D Cube',
      top: '83%',
      left: '94%',
      size: 38,
      baseOpacity: isLight ? 0.28 : 0.35,
      animationClass: 'animate-doodle-drift-4',
      animationDuration: '11s',
      animationDelay: '2.8s',
      colorDark: 'text-indigo-400',
      colorLight: 'text-blue-600',
      renderSvg: () => (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <polygon points="24,8 38,16 24,24 10,16" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <polygon points="10,16 24,24 24,40 10,32" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <polygon points="38,16 24,24 24,40 38,32" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="24" cy="24" r="1.5" fill="currentColor" />
        </svg>
      )
    },

    // 15. Synaptic Cognitive Brain Matrix (Bottom CTA left flank)
    {
      id: 'synaptic-brain-15',
      name: 'Synaptic Brain',
      top: '92%',
      left: '11%',
      size: 42,
      baseOpacity: isLight ? 0.3 : 0.38,
      animationClass: 'animate-doodle-drift-5',
      animationDuration: '8s',
      animationDelay: '0.9s',
      colorDark: 'text-sky-400',
      colorLight: 'text-sky-600',
      renderSvg: () => (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <path d="M22 10 C16 10 12 14 12 18 C10 20 8 24 10 28 C10 32 14 36 18 36 C19 38 21 38 22 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M26 10 C32 10 36 14 36 18 C38 20 40 24 38 28 C38 32 34 36 30 36 C29 38 27 38 26 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="17" cy="20" r="1.5" fill="currentColor" />
          <circle cx="31" cy="20" r="1.5" fill="currentColor" />
          <circle cx="24" cy="28" r="1.5" fill="currentColor" />
          <line x1="17" y1="20" x2="24" y2="28" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="31" y1="20" x2="24" y2="28" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      )
    },

    // 16. Orbital Tech Gyroscope (Bottom CTA right flank)
    {
      id: 'orbital-gyro-16',
      name: 'Orbital Gyroscope',
      top: '93%',
      left: '87%',
      size: 44,
      baseOpacity: isLight ? 0.3 : 0.36,
      animationClass: 'animate-doodle-drift-1',
      animationDuration: '10.5s',
      animationDelay: '1.6s',
      colorDark: 'text-cyan-400',
      colorLight: 'text-indigo-600',
      renderSvg: () => (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <ellipse cx="24" cy="24" rx="18" ry="8" transform="rotate(-30 24 24)" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
          <ellipse cx="24" cy="24" rx="18" ry="8" transform="rotate(30 24 24)" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="24" cy="24" r="3" fill="currentColor" />
          <circle cx="38" cy="18" r="1.5" fill="currentColor" />
        </svg>
      )
    }
  ];

  return (
    <div ref={containerRef} className="absolute inset-0 w-full pointer-events-none z-0 overflow-hidden select-none">
      {/* =========================================================================
          INTERACTIVE FLOATING BACKGROUND DOODLES
          ========================================================================= */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {doodles.map((doodle) => (
          <InteractiveDoodleItem
            key={doodle.id}
            doodle={doodle}
            mousePos={mousePos}
            isLight={isLight}
          />
        ))}
      </div>
    </div>
  );
};

interface InteractiveDoodleItemProps {
  doodle: DoodleData;
  mousePos: { x: number; y: number };
  isLight: boolean;
}

const InteractiveDoodleItem: React.FC<InteractiveDoodleItemProps> = ({ doodle, mousePos, isLight }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [physicsOffset, setPhysicsOffset] = useState({ x: 0, y: 0, scale: 1, extraOpacity: 0, rotate: 0 });

  // Calculate mouse proximity physics
  useEffect(() => {
    if (!itemRef.current || mousePos.x < 0) return;

    const rect = itemRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = mousePos.x - centerX;
    const dy = mousePos.y - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Reactive proximity radius (240px)
    const PROXIMITY_RADIUS = 240;

    if (dist < PROXIMITY_RADIUS) {
      const proximity = 1 - dist / PROXIMITY_RADIUS;
      // Gentle repelling push (smooth magnet effect)
      const forceX = -(dx / dist) * proximity * 24;
      const forceY = -(dy / dist) * proximity * 24;
      const scale = 1 + proximity * 0.18;
      const extraOpacity = proximity * 0.55;
      const rotate = proximity * (doodle.id.charCodeAt(0) % 2 === 0 ? 9 : -9);

      setPhysicsOffset({
        x: forceX,
        y: forceY,
        scale,
        extraOpacity,
        rotate
      });
    } else {
      if (physicsOffset.x !== 0 || physicsOffset.scale !== 1) {
        setPhysicsOffset({ x: 0, y: 0, scale: 1, extraOpacity: 0, rotate: 0 });
      }
    }
  }, [mousePos, doodle.id]);

  const colorClass = isLight ? doodle.colorLight : doodle.colorDark;
  const currentOpacity = Math.min(1, doodle.baseOpacity + physicsOffset.extraOpacity + (isHovered ? 0.35 : 0));

  return (
    <div
      ref={itemRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`absolute pointer-events-auto cursor-default transition-transform duration-500 ease-out select-none ${colorClass}`}
      style={{
        top: doodle.top,
        left: doodle.left,
        width: `${doodle.size}px`,
        height: `${doodle.size}px`,
        transform: `translate3d(${physicsOffset.x}px, ${physicsOffset.y}px, 0) scale(${physicsOffset.scale * (isHovered ? 1.15 : 1)}) rotate(${physicsOffset.rotate}deg)`,
        opacity: currentOpacity,
        filter: isHovered || physicsOffset.extraOpacity > 0.08
          ? (isLight 
              ? 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.45)) drop-shadow(0 0 18px rgba(37, 99, 235, 0.25))' 
              : 'drop-shadow(0 0 12px rgba(56, 189, 248, 0.65)) drop-shadow(0 0 24px rgba(99, 102, 241, 0.4))')
          : (isLight 
              ? 'drop-shadow(0 1px 4px rgba(37, 99, 235, 0.12))' 
              : 'drop-shadow(0 0 6px rgba(56, 189, 248, 0.25))'),
        transition: 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.45s ease, filter 0.45s ease'
      }}
      title={doodle.name}
    >
      {/* Inner wrapper executes continuous weightless floating keyframe animation */}
      <div 
        className={`w-full h-full ${doodle.animationClass}`}
        style={{
          animationDuration: doodle.animationDuration,
          animationDelay: doodle.animationDelay,
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite'
        }}
      >
        {doodle.renderSvg()}
      </div>
    </div>
  );
};
