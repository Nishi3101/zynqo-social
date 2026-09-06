import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Send, 
  X, 
  Clock, 
  Flame,
  AlertTriangle
} from 'lucide-react';
import { Reel } from '../types';
import { ReelVisualizer } from './ReelVisualizer';
import { ReelActions } from './ReelActions';
import { useApp } from '../context/AppContext';
import { getLocalizedReel, getLocalizedCategory } from '../utils/translations';

interface ReelCardProps {
  reel: Reel;
  isActive: boolean;
}

export const ReelCard: React.FC<ReelCardProps> = ({ reel, isActive }) => {
  const { isMuted, isPlaying, togglePlay, addComment, t, language } = useApp();
  const locReel = getLocalizedReel(reel, language);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [commentWarning, setCommentWarning] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  // Synchronize HTML5 video element with active state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive && isPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy fallback
        });
      }
    } else {
      video.pause();
    }
  }, [isActive, isPlaying]);

  // Video time update listener for bottom progress bar
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  const handleSendComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const success = await addComment(reel.id, newCommentText);
    if (success) {
      setNewCommentText('');
      setCommentWarning(null);
    } else {
      setCommentWarning(t.reel?.toxicBlocked || 'Notice: Toxic or abusive comments are automatically blocked by Safety Shield.');
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden select-none">
      {/* Background Visualizer (Canvas procedural art) */}
      <ReelVisualizer theme={reel.visualTheme} isPlaying={isActive && isPlaying} />

      {/* HTML5 Native Video element (layered over canvas) */}
      {reel.videoUrl && (
        <video
          ref={videoRef}
          src={reel.videoUrl}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          loop
          muted={isMuted}
          playsInline
          onTimeUpdate={handleTimeUpdate}
        />
      )}

      {/* Subtle vignette / gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/85 pointer-events-none z-10" />

      {/* Center Tap-to-play/pause area */}
      <div 
        onClick={togglePlay} 
        className="absolute inset-0 z-20 cursor-pointer flex items-center justify-center"
      >
        {!isPlaying && isActive && (
          <div className="p-5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white animate-scale-in">
            <Play className="w-12 h-12 fill-white text-white ml-1" />
          </div>
        )}
      </div>

      {/* Top Header Tags */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-14 sm:right-16 z-30 flex items-center gap-1.5 sm:gap-2 flex-wrap pointer-events-none pt-safe">
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          {getLocalizedCategory(reel.category, language)}
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-500/20 border border-violet-500/40 text-violet-300 backdrop-blur-md capitalize">
          {t.intents?.[reel.intent as keyof typeof t.intents] || reel.intent}
        </span>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 backdrop-blur-md flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" />
          {reel.safetyScore}% {t.reel?.safeBadge || 'Safe'}
        </span>
      </div>

      {/* Subtitles Overlay in Localized Language */}
      {showSubtitles && isActive && (
        <div className="absolute bottom-40 sm:bottom-44 left-3 sm:left-4 right-14 sm:right-16 z-30 pointer-events-none flex justify-center">
          <div className="max-w-[90%] px-3.5 py-1.5 rounded-xl bg-black/85 border border-white/10 backdrop-blur-md shadow-2xl text-center">
            <p className="text-xs sm:text-sm font-medium text-amber-200 tracking-wide leading-relaxed line-clamp-2">
              "{locReel.transcript.replace(/#\w+/g, '').replace(/\n+/g, ' ').trim().slice(0, 120)}..."
            </p>
          </div>
        </div>
      )}

      {/* Bottom Creator & Details Bar */}
      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-16 sm:right-20 z-30 flex flex-col gap-1.5 sm:gap-2 pointer-events-auto pb-safe">
        {/* Creator Info */}
        <div className="flex items-center gap-3">
          <img
            src={reel.creator.avatar}
            alt={reel.creator.name}
            className="w-10 h-10 rounded-full border-2 border-cyan-400/80 object-cover shadow-md"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-white drop-shadow">
                {reel.creator.name}
              </span>
              {reel.creator.verified && (
                <CheckCircle2 className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
              )}
            </div>
            <span className="text-xs text-slate-300 drop-shadow">
              {reel.creator.handle}
            </span>
          </div>

          {/* Follow Button */}
          <button
            onClick={() => setIsFollowing(prev => !prev)}
            className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold transition-all shadow ${
              isFollowing
                ? 'bg-slate-800 text-slate-300 border border-white/10'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold'
            }`}
          >
            {isFollowing ? (t.reel?.following || 'Following') : (t.reel?.follow || 'Follow')}
          </button>
        </div>

        {/* Title */}
        <h2 className="text-base md:text-lg font-bold text-white drop-shadow-md leading-tight mt-1">
          {locReel.title}
        </h2>

        {/* Description & Hashtags */}
        <p className="text-xs md:text-sm text-slate-200/90 line-clamp-2 leading-snug drop-shadow">
          {locReel.description}
        </p>

        {/* Duration badge */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded-md border border-cyan-800/50 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {reel.duration}s
          </span>
          <span className="text-[11px] text-slate-400">
            {reel.views > 999 ? `${(reel.views / 1000).toFixed(0)}k` : reel.views} {t.reel?.views || 'views'}
          </span>
        </div>
      </div>

      {/* Floating Action Buttons Sidebar */}
      <ReelActions
        reel={reel}
        showSubtitles={showSubtitles}
        setShowSubtitles={setShowSubtitles}
        onOpenComments={() => setIsCommentsOpen(true)}
      />

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-40">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-500 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Comments Drawer (Modal Overlay) */}
      {isCommentsOpen && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-50 flex flex-col justify-end animate-fade-in">
          <div className="bg-slate-900/95 border-t border-white/15 rounded-t-3xl max-h-[80%] flex flex-col p-3.5 sm:p-4 shadow-2xl pb-safe">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white">
                  {t.actions.comment} ({reel.commentsCount})
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  {t.reel?.shieldActive || 'Shield Active'}
                </span>
              </div>
              <button
                onClick={() => setIsCommentsOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comment list */}
            <div className="flex-1 overflow-y-auto py-3 flex flex-col gap-3 max-h-72">
              {reel.comments && reel.comments.length > 0 ? (
                reel.comments.map(c => (
                  <div key={c.id} className="flex gap-2.5 items-start">
                    <img
                      src={c.avatar}
                      alt={c.user}
                      className="w-7 h-7 rounded-full object-cover border border-white/10"
                    />
                    <div className="flex-1 bg-slate-800/60 rounded-xl p-2.5 border border-white/5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-cyan-300">{c.user}</span>
                        <span className="text-[10px] text-slate-500">{c.timeAgo}</span>
                      </div>
                      <p className="text-xs text-slate-200 mt-1">{c.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-slate-400 text-xs">
                  {t.reel?.noComments || 'No comments yet. Start a meaningful conversation!'}
                </div>
              )}
            </div>

            {/* Toxicity Warning */}
            {commentWarning && (
              <div className="p-2 mb-2 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                {t.reel?.toxicBlocked || commentWarning}
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSendComment} className="flex gap-2 pt-2 border-t border-white/10">
              <input
                type="text"
                value={newCommentText}
                onChange={e => setNewCommentText(e.target.value)}
                placeholder={t.reel?.addCommentPlaceholder || "Share a thoughtful comment or question..."}
                className="flex-1 px-3 py-2 bg-slate-800/80 border border-white/10 rounded-xl text-base sm:text-xs text-white focus:outline-none focus:border-cyan-500 placeholder:text-slate-500"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1 transition"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
