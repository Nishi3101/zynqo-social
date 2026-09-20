import React, { useState } from 'react';
import { 
  X, 
  Trophy, 
  Medal, 
  Flame, 
  Eye, 
  Sparkles, 
  TrendingUp, 
  Crown, 
  ShieldCheck, 
  UserCheck 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LeaderboardModal: React.FC = () => {
  const { closeModal, colorMode, userProfile, totalReelsWatched } = useApp();
  const isLight = colorMode === 'light';
  const [activeTab, setActiveTab] = useState<'xp' | 'streak' | 'watches'>('xp');

  const topLearners = [
    { rank: 1, name: 'Maya Lin', handle: '@mayabrain', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120', xp: 4850, streak: 28, watched: 184, badge: 'Quantum Scholar', level: 10 },
    { rank: 2, name: 'David Kim', handle: '@neuro_david', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120', xp: 4120, streak: 21, watched: 152, badge: 'Deep Focus Pro', level: 9 },
    { rank: 3, name: 'Aarav Sharma', handle: '@aarav_ai', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120', xp: 3790, streak: 19, watched: 139, badge: 'Mindful Explorer', level: 8 },
    { rank: 4, name: 'Sophia Chen', handle: '@sophia_tech', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120', xp: 3240, streak: 16, watched: 118, badge: 'Curious Mind', level: 7 },
    { rank: 5, name: userProfile?.name || 'Alex Rivera (You)', handle: userProfile?.handle || '@alex_explorer', avatar: userProfile?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120', xp: userProfile?.xp || 1420, streak: userProfile?.streakDays || 6, watched: totalReelsWatched || 42, badge: 'Active Creator', level: userProfile?.level || 4, isCurrentUser: true },
    { rank: 6, name: 'Liam O\'Connor', handle: '@liam_green', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120', xp: 1280, streak: 5, watched: 38, badge: 'Zen Seeker', level: 3 },
    { rank: 7, name: 'Zara Patel', handle: '@zara_pulse', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120', xp: 1150, streak: 4, watched: 31, badge: 'Habit Builder', level: 3 },
  ];

  const sortedList = [...topLearners].sort((a, b) => {
    if (activeTab === 'xp') return b.xp - a.xp;
    if (activeTab === 'streak') return b.streak - a.streak;
    return b.watched - a.watched;
  }).map((item, idx) => ({ ...item, displayRank: idx + 1 }));

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in select-none">
      <div className={`w-full max-w-xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden border transition-colors ${
        isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-white/15 text-white'
      }`}>
        {/* Header */}
        <div className={`p-4 md:p-5 border-b flex items-center justify-between ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-white/10'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-500">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Global Community Leaderboard
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30">
                  Live Rankings
                </span>
              </div>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Compete with mindful learners & top creators across the globe
              </p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className={`p-1.5 rounded-full transition ${
              isLight ? 'text-slate-500 hover:text-slate-950 hover:bg-slate-200' : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Filters */}
        <div className={`p-3 border-b flex items-center justify-between gap-2 ${
          isLight ? 'bg-white border-slate-100' : 'bg-slate-950/40 border-white/5'
        }`}>
          <div className="flex items-center gap-1.5 w-full">
            <button
              onClick={() => setActiveTab('xp')}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                activeTab === 'xp'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : isLight ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Top XP</span>
            </button>

            <button
              onClick={() => setActiveTab('streak')}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                activeTab === 'streak'
                  ? 'bg-orange-500 text-white font-bold shadow-md shadow-orange-500/20'
                  : isLight ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Streak Leaders</span>
            </button>

            <button
              onClick={() => setActiveTab('watches')}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                activeTab === 'watches'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : isLight ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Most Watched</span>
            </button>
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="p-3 sm:p-4 space-y-2 flex-1 overflow-y-auto custom-scrollbar">
          {sortedList.map((user) => {
            const isTop3 = user.displayRank <= 3;
            return (
              <div
                key={user.handle}
                className={`p-3 rounded-2xl border flex items-center justify-between gap-3 transition-all duration-200 ${
                  user.isCurrentUser
                    ? isLight
                      ? 'bg-amber-50/90 border-amber-400 shadow-md ring-1 ring-amber-400'
                      : 'bg-gradient-to-r from-amber-950/40 via-yellow-950/20 to-slate-900 border-amber-500/50 shadow-lg shadow-amber-500/10'
                    : isLight
                    ? 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                    : 'bg-slate-800/60 border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Rank Badge */}
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 font-display font-black text-xs">
                    {user.displayRank === 1 ? (
                      <span className="w-7 h-7 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-md">
                        🥇
                      </span>
                    ) : user.displayRank === 2 ? (
                      <span className="w-7 h-7 rounded-xl bg-slate-300 text-slate-950 flex items-center justify-center shadow-md">
                        🥈
                      </span>
                    ) : user.displayRank === 3 ? (
                      <span className="w-7 h-7 rounded-xl bg-amber-700 text-white flex items-center justify-center shadow-md">
                        🥉
                      </span>
                    ) : (
                      <span className={`font-mono font-bold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        #{user.displayRank}
                      </span>
                    )}
                  </div>

                  {/* Avatar */}
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-xl object-cover border border-white/10 shadow-sm flex-shrink-0"
                  />

                  {/* Name & Handle */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs sm:text-sm font-bold truncate ${
                        user.isCurrentUser ? 'text-amber-500 font-extrabold' : isLight ? 'text-slate-900' : 'text-white'
                      }`}>
                        {user.name}
                      </span>
                      {user.isCurrentUser && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-amber-500 text-slate-950">
                          YOU
                        </span>
                      )}
                      {isTop3 && (
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <span>{user.handle}</span>
                      <span>•</span>
                      <span className="text-cyan-400 font-mono">Lvl {user.level}</span>
                      <span>•</span>
                      <span className="truncate">{user.badge}</span>
                    </div>
                  </div>
                </div>

                {/* Metric Value */}
                <div className="text-right flex-shrink-0">
                  {activeTab === 'xp' && (
                    <div>
                      <span className="text-sm sm:text-base font-display font-black text-amber-500 block">
                        {user.xp.toLocaleString()} XP
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Total Points</span>
                    </div>
                  )}
                  {activeTab === 'streak' && (
                    <div>
                      <span className="text-sm sm:text-base font-display font-black text-orange-500 block">
                        {user.streak} Days 🔥
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Daily Streak</span>
                    </div>
                  )}
                  {activeTab === 'watches' && (
                    <div>
                      <span className="text-sm sm:text-base font-display font-black text-cyan-400 block">
                        {user.watched} Reels 🎬
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Watched</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className={`p-3 border-t text-center text-[11px] ${
          isLight ? 'bg-slate-50 border-slate-200 text-slate-500' : 'bg-slate-950/60 border-white/5 text-slate-400'
        }`}>
          <span>Weekly rankings refresh every Sunday at midnight GMT. Keep watching to climb! 🚀</span>
        </div>
      </div>
    </div>
  );
};
