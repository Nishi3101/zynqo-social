import React, { useState } from 'react';
import { 
  Heart, 
  Bookmark,
  MessageCircle, 
  Share2, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle, 
  Sliders, 
  Volume2, 
  VolumeX, 
  Captions,
  Check
} from 'lucide-react';
import { Reel } from '../types';
import { useApp } from '../context/AppContext';

interface ReelActionsProps {
  reel: Reel;
  showSubtitles: boolean;
  setShowSubtitles: (v: boolean | ((prev: boolean) => boolean)) => void;
  onOpenComments: () => void;
}

export const ReelActions: React.FC<ReelActionsProps> = ({
  reel,
  showSubtitles,
  setShowSubtitles,
  onOpenComments
}) => {
  const { toggleLike, toggleSave, likedActivities, savedActivities, isMuted, toggleMute, openModal, t } = useApp();
  const [copied, setCopied] = useState(false);

  const isLiked = likedActivities.some(a => a.contentId === reel.id);
  const isSaved = savedActivities.some(a => a.contentId === reel.id);

  const handleLike = () => {
    toggleLike(reel.id, {
      contentId: reel.id,
      type: 'reel',
      title: reel.title,
      videoUrl: reel.videoUrl,
      creatorName: reel.creator?.name,
      creatorAvatar: reel.creator?.avatar,
      likes: reel.likes,
      commentsCount: reel.commentsCount,
      views: reel.views
    });
  };

  const handleSave = () => {
    toggleSave({
      contentId: reel.id,
      type: 'reel',
      title: reel.title,
      videoUrl: reel.videoUrl,
      creatorName: reel.creator?.name,
      creatorAvatar: reel.creator?.avatar,
      likes: reel.likes,
      commentsCount: reel.commentsCount,
      views: reel.views
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="absolute right-2 sm:right-3 bottom-20 sm:bottom-24 flex flex-col items-center gap-2 sm:gap-2.5 z-30 select-none pb-safe">
      {/* Make This Useful - Primary High-Leverage Action */}
      <button
        onClick={() => openModal('makeUseful')}
        className="group relative p-3 rounded-full bg-gradient-to-tr from-cyan-500 via-teal-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/30 hover:scale-110 active:scale-95 transition-all duration-200"
        title={t.actions.makeUseful}
      >
        <Sparkles className="w-6 h-6 animate-pulse" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400"></span>
        </span>
        <div className="hidden group-hover:block absolute right-14 whitespace-nowrap px-2.5 py-1 bg-slate-900/90 border border-cyan-500/30 text-xs font-semibold rounded-lg shadow-xl text-cyan-300 backdrop-blur-md">
          {t.actions.makeUseful}
        </div>
      </button>

      {/* AI Reality Check Shield */}
      <button
        onClick={() => openModal('realityCheck')}
        className={`group relative p-2.5 rounded-full backdrop-blur-xl border transition-all duration-200 hover:scale-105 ${
          reel.realityCheck.verdict === 'Verified'
            ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/80'
            : 'bg-amber-950/60 border-amber-500/40 text-amber-400 hover:bg-amber-900/80'
        }`}
        title={t.actions.realityCheck}
      >
        <ShieldCheck className="w-5 h-5" />
        <div className="hidden group-hover:block absolute right-14 whitespace-nowrap px-2.5 py-1 bg-slate-900/90 border border-white/10 text-xs font-semibold rounded-lg shadow-xl text-slate-200 backdrop-blur-md">
          {t.actions.realityCheck}: {reel.realityCheck.verdict === 'Verified' ? (t.modals.verifiedFact || 'Verified') : reel.realityCheck.verdict}
        </div>
      </button>

      {/* Why Am I Seeing This? (Explainable AI) */}
      <button
        onClick={() => openModal('explain')}
        className="group relative p-2.5 rounded-full bg-slate-900/70 border border-white/15 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-200 hover:scale-105"
        title={t.actions.whyThis}
      >
        <HelpCircle className="w-5 h-5" />
        <div className="hidden group-hover:block absolute right-14 whitespace-nowrap px-2.5 py-1 bg-slate-900/90 border border-white/10 text-xs font-semibold rounded-lg shadow-xl text-slate-200 backdrop-blur-md">
          {t.actions.whyThis}
        </div>
      </button>

      {/* Like */}
      <button
        onClick={handleLike}
        className="flex flex-col items-center gap-1 group transition-transform active:scale-75"
      >
        <div className={`p-2.5 rounded-full backdrop-blur-xl border transition-all ${
          isLiked 
            ? 'bg-pink-500/20 border-pink-500/60 text-pink-500' 
            : 'bg-slate-900/70 border-white/15 text-slate-300 hover:text-pink-400'
        }`}>
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-pink-500' : ''}`} />
        </div>
        <span className="text-[11px] font-medium text-slate-300 drop-shadow">
          {reel.likes > 999 ? `${(reel.likes / 1000).toFixed(1)}k` : reel.likes}
        </span>
      </button>

      {/* Comments */}
      <button
        onClick={onOpenComments}
        className="flex flex-col items-center gap-1 group transition-transform active:scale-90"
      >
        <div className="p-2.5 rounded-full bg-slate-900/70 border border-white/15 text-slate-300 hover:text-cyan-400 backdrop-blur-xl transition-all">
          <MessageCircle className="w-5 h-5" />
        </div>
        <span className="text-[11px] font-medium text-slate-300 drop-shadow">
          {reel.commentsCount}
        </span>
      </button>

      {/* Save / Bookmark */}
      <button
        onClick={handleSave}
        className="flex flex-col items-center gap-1 group transition-transform active:scale-90"
        title={isSaved ? (t.reel?.saved || 'Saved') : (t.reel?.save || 'Save Reel')}
      >
        <div className={`p-2.5 rounded-full backdrop-blur-xl border transition-all ${
          isSaved 
            ? 'bg-amber-500/20 border-amber-500/60 text-amber-400' 
            : 'bg-slate-900/70 border-white/15 text-slate-300 hover:text-amber-400'
        }`}>
          <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-amber-400' : ''}`} />
        </div>
        <span className="text-[11px] font-medium text-slate-300 drop-shadow">
          {isSaved ? (t.reel?.saved || 'Saved') : (t.reel?.save || 'Save')}
        </span>
      </button>

      {/* Subtitles Toggle */}
      <button
        onClick={() => setShowSubtitles(prev => !prev)}
        className={`p-2.5 rounded-full border backdrop-blur-xl transition-all ${
          showSubtitles
            ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-400'
            : 'bg-slate-900/70 border-white/15 text-slate-400 hover:text-slate-200'
        }`}
        title={t.actions.subtitles}
      >
        <Captions className="w-5 h-5" />
      </button>

      {/* Mute/Unmute */}
      <button
        onClick={toggleMute}
        className="p-2.5 rounded-full bg-slate-900/70 border border-white/15 text-slate-300 hover:text-cyan-400 backdrop-blur-xl transition-all"
        title={isMuted ? (t.reel?.unmuteTip || 'Unmute') : (t.reel?.muteTip || 'Mute')}
      >
        {isMuted ? <VolumeX className="w-5 h-5 text-amber-400" /> : <Volume2 className="w-5 h-5 text-cyan-400" />}
      </button>

      {/* Share */}
      <button
        onClick={handleShare}
        className="p-2.5 rounded-full bg-slate-900/70 border border-white/15 text-slate-300 hover:text-cyan-400 backdrop-blur-xl transition-all"
        title={t.reel?.shareTip || 'Share Reel'}
      >
        {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
      </button>
    </div>
  );
};
