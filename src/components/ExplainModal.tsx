import React, { useState } from 'react';
import { X, HelpCircle, Sliders, Shield, Sparkles, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ExplainModal: React.FC = () => {
  const { currentReel, closeModal, t } = useApp();
  const [topicSlider, setTopicSlider] = useState(70);
  const [savedFeedback, setSavedFeedback] = useState(false);

  if (!currentReel) return null;

  const { whyAmISeeingThis } = currentReel;
  const weights = whyAmISeeingThis.signalWeight;

  const handleTuneFeed = () => {
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-900 border border-white/15 rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 md:p-5 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">{t.actions.whyThis}</h2>
              <p className="text-xs text-slate-400">Explainable AI & Personal Feed Tuning</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 flex-1 overflow-y-auto">
          {/* Primary Reason */}
          <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
              Primary Recommendation Vector
            </span>
            <p className="text-xs md:text-sm text-slate-100 font-medium">
              {whyAmISeeingThis.primaryReason}
            </p>
          </div>

          {/* Matched Interests */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Matched Interests
            </span>
            <div className="flex flex-wrap gap-2">
              {whyAmISeeingThis.matchedInterests.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 border border-white/10 text-cyan-300 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Signal Weights Chart */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Algorithmic Signal Distribution
            </span>
            <div className="space-y-2.5 bg-slate-950/50 p-3.5 rounded-2xl border border-white/5">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-300">Goal Alignment</span>
                  <span className="text-cyan-400 font-bold">{weights.goalAlignment}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${weights.goalAlignment}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-300">Watch History & Engagement</span>
                  <span className="text-violet-400 font-bold">{weights.watchHistory}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500 rounded-full" style={{ width: `${weights.watchHistory}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-300">Active Intent & Mood</span>
                  <span className="text-emerald-400 font-bold">{weights.currentMood}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${weights.currentMood}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* AI Feed Control Tuning */}
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                Tune AI Feed: "{currentReel.category}"
              </span>
              <span className="text-[10px] text-cyan-300 font-mono font-bold">
                {topicSlider}% frequency
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={topicSlider}
              onChange={e => setTopicSlider(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Less of this</span>
              <span>Balanced</span>
              <span>More of this</span>
            </div>
            <button
              onClick={handleTuneFeed}
              className="w-full py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              {savedFeedback ? <Check className="w-3.5 h-3.5" /> : null}
              <span>{savedFeedback ? 'Preference Updated in Memory!' : 'Apply Feed Preference'}</span>
            </button>
          </div>

          {/* Privacy Note */}
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{whyAmISeeingThis.privacyNote}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
