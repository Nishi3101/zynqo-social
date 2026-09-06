import React from 'react';
import { X, Clock, Sparkles, Check, Flame, Trophy, Play, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TimeSessionModal: React.FC = () => {
  const { 
    timeSession, 
    startTimeSession, 
    stopTimeSession, 
    finishSessionNow, 
    extendSessionOneMore, 
    closeModal, 
    t 
  } = useApp();

  const presets = [
    { minutes: 3, label: '3 Minutes', tag: 'Micro-Break', desc: '1 Insight Reel + Quick Quiz' },
    { minutes: 5, label: '5 Minutes', tag: 'Recommended', desc: 'Curated 3-Reel Journey + Action Checklist' },
    { minutes: 10, label: '10 Minutes', tag: 'Skill Deep Dive', desc: 'Curriculum Path with Real Action Items' },
  ];

  const sessionMinutesLeft = Math.floor(timeSession.remainingSeconds / 60);
  const sessionSecondsLeft = timeSession.remainingSeconds % 60;
  const progressPercent = ((timeSession.totalSeconds - timeSession.remainingSeconds) / timeSession.totalSeconds) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-900 border border-white/15 rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 md:p-5 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Time-Aware Entertainment Mode</h2>
              <p className="text-xs text-slate-400">Never get lost in endless scrolling again</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* CASE 1: Session Finished (Smart Session Ending - Concept 12 & 13) */}
          {timeSession.sessionFinished ? (
            <div className="text-center py-4 space-y-4 animate-scale-in">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center text-white mx-auto shadow-2xl shadow-emerald-500/20">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{t.modals.congratulations}</h3>
                <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
                  You stayed intentional with your time and consumed high-value content without doomscrolling.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-300 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>+50 XP Screen-Time Reward Claimed!</span>
              </div>

              {/* Controlled Choices: One More or Finish Now */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  onClick={finishSessionNow}
                  className="flex-1 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs md:text-sm transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{t.modals.finishNow} (Healthy Exit)</span>
                </button>
                <button
                  onClick={extendSessionOneMore}
                  className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition border border-white/10"
                >
                  {t.modals.oneMore} (+60s)
                </button>
              </div>
            </div>
          ) : timeSession.isActive ? (
            /* CASE 2: Active Session in Progress */
            <div className="text-center py-4 space-y-4">
              <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                {/* SVG Progress Circle */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    className="stroke-slate-800"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    className="stroke-amber-400 transition-all duration-1000"
                    strokeWidth="8"
                    strokeDasharray={377}
                    strokeDashoffset={377 - (377 * progressPercent) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-mono font-black text-white">
                    {sessionMinutesLeft}:{sessionSecondsLeft < 10 ? '0' : ''}{sessionSecondsLeft}
                  </span>
                  <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
                    Remaining
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">Session Active</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Watched {timeSession.reelsWatched} reels. Smart completion will trigger automatically when time elapses.
                </p>
              </div>

              <button
                onClick={stopTimeSession}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-red-400 font-semibold text-xs border border-white/10 transition"
              >
                Cancel Session
              </button>
            </div>
          ) : (
            /* CASE 3: Session Preset Selector */
            <div className="space-y-3">
              <p className="text-xs text-slate-300">
                Traditional platforms ask: <span className="italic text-slate-400">"How long can we keep you?"</span><br />
                Zynqo Social asks: <span className="font-bold text-cyan-300">"How much time do you have right now?"</span>
              </p>

              <div className="space-y-2.5">
                {presets.map(preset => (
                  <div
                    key={preset.minutes}
                    onClick={() => startTimeSession(preset.minutes)}
                    className="p-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-white/10 hover:border-amber-500/50 cursor-pointer transition flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white group-hover:text-amber-300 transition">
                          {preset.label}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {preset.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{preset.desc}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 group-hover:scale-110 transition">
                      <Play className="w-4 h-4 fill-amber-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
