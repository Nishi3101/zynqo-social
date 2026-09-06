import React, { useState } from 'react';
import { 
  X, 
  PieChart, 
  Shield, 
  Clock, 
  RotateCcw, 
  Award, 
  Check, 
  Plus, 
  Infinity,
  Leaf
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DigitalWellbeingModal: React.FC = () => {
  const { 
    userProfile, 
    closeModal, 
    isDetoxMode, 
    toggleDetoxMode, 
    resetAttentionLimit,
    t,
    colorMode 
  } = useApp();

  const isLight = colorMode === 'light';
  const [budget, setBudget] = useState(userProfile?.attentionBudgetMinutes || 30);
  const [savedBudget, setSavedBudget] = useState(false);
  const [resetMessage, setResetMessage] = useState(false);

  const categories = [
    { label: t.nutrition?.learning || 'Learning & Technology', pct: 45, color: 'bg-cyan-400', textColor: 'text-cyan-500' },
    { label: t.nutrition?.productivity || 'Productivity & Habits', pct: 30, color: 'bg-violet-400', textColor: 'text-violet-500' },
    { label: t.nutrition?.mindfulness || 'Health & Mindfulness', pct: 15, color: 'bg-emerald-400', textColor: 'text-emerald-500' },
    { label: t.nutrition?.entertainment || 'Pure Entertainment', pct: 10, color: 'bg-amber-400', textColor: 'text-amber-500' },
  ];

  const handleSaveBudget = () => {
    setSavedBudget(true);
    setTimeout(() => setSavedBudget(false), 2000);
  };

  const handleReset = () => {
    resetAttentionLimit();
    setResetMessage(true);
    setTimeout(() => setResetMessage(false), 2500);
  };

  const handleAddMinutes = (mins: number) => {
    setBudget(prev => prev + mins);
    setSavedBudget(true);
    setTimeout(() => setSavedBudget(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
      <div className={`w-full max-w-lg max-h-[90vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden border transition-colors ${
        isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-white/15 text-white'
      }`}>
        {/* Header */}
        <div className={`p-4 md:p-5 border-b flex items-center justify-between ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-white/10'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-500">
              <PieChart className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{t.actions.wellbeing}</h2>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Attention Budget & Healthy Digital Consumption</p>
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

        {/* Content */}
        <div className="p-5 space-y-4 flex-1 overflow-y-auto">
          {/* RESET LIMIT SECTION - Quick Direct Solution */}
          <div className={`p-4 rounded-2xl border space-y-3 ${
            isLight
              ? 'bg-emerald-50/80 border-emerald-300'
              : 'bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-cyan-950/40 border-emerald-500/40'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-emerald-500 animate-spin-slow" />
                <span className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Reset Attention & Time Limit</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-md border border-emerald-500/30">
                {userProfile?.minutesUsedToday || 0} / {budget}m Used
              </span>
            </div>

            <p className={`text-[11px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Need more time or testing the platform? You can reset your daily minutes back to 0, extend your limit, or disable the pause firewall anytime!
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={handleReset}
                className="flex-1 min-w-[130px] py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition shadow-md flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to 0 Mins</span>
              </button>

              <button
                onClick={() => handleAddMinutes(15)}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center gap-1 ${
                  isLight
                    ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-white/10'
                }`}
              >
                <Plus className="w-3.5 h-3.5 text-cyan-500" />
                <span>+15 Mins</span>
              </button>

              <button
                onClick={() => handleAddMinutes(30)}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center gap-1 ${
                  isLight
                    ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-white/10'
                }`}
              >
                <Plus className="w-3.5 h-3.5 text-cyan-500" />
                <span>+30 Mins</span>
              </button>

              <button
                onClick={() => {
                  setBudget(999);
                  handleSaveBudget();
                }}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center gap-1 ${
                  isLight
                    ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-white/10'
                }`}
              >
                <Infinity className="w-3.5 h-3.5 text-violet-500" />
                <span>Unlimited</span>
              </button>
            </div>

            {resetMessage && (
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-xs font-bold text-center border border-emerald-500/40 flex items-center justify-center gap-1.5 animate-fade-in">
                <Check className="w-3.5 h-3.5" />
                <span>Daily Limit & Time Used Reset to 0 Minutes!</span>
              </div>
            )}
          </div>

          {/* Entertainment Nutrition Label (Concept 184) */}
          <div className={`p-4 rounded-2xl border space-y-3 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-white/10'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold flex items-center gap-1.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <Award className="w-4 h-4 text-emerald-500" />
                {t.nutrition.title}
              </span>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                Score: 92/100 (Balanced)
              </span>
            </div>

            {/* Combined Nutrition Bar */}
            <div className={`h-3 w-full rounded-full flex overflow-hidden ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`}>
              <div style={{ width: '45%' }} className="bg-cyan-500 h-full" title="Learning 45%" />
              <div style={{ width: '30%' }} className="bg-violet-500 h-full" title="Productivity 30%" />
              <div style={{ width: '15%' }} className="bg-emerald-500 h-full" title="Health 15%" />
              <div style={{ width: '10%' }} className="bg-amber-500 h-full" title="Entertainment 10%" />
            </div>

            {/* Breakdown List */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {categories.map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className={`w-2.5 h-2.5 rounded-full ${c.color} flex-shrink-0`} />
                  <span className={`truncate ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{c.label}:</span>
                  <span className={`font-bold ${c.textColor}`}>{c.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Attention Budget Slider (Concept 182) */}
          <div className={`p-4 rounded-2xl border space-y-3 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-white/10'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold flex items-center gap-1.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <Clock className="w-4 h-4 text-cyan-500" />
                Configure Daily Target Budget
              </span>
              <span className="text-xs font-mono text-cyan-600 dark:text-cyan-300 font-bold">
                {budget === 999 ? 'Unlimited' : `${budget} Minutes`}
              </span>
            </div>

            <input
              type="range"
              min="15"
              max="120"
              step="5"
              value={budget > 120 ? 120 : budget}
              onChange={e => setBudget(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className={`flex justify-between text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              <span>15m (Strict)</span>
              <span>30m (Balanced)</span>
              <span>60m (Deep)</span>
              <span>120m</span>
            </div>

            <button
              onClick={handleSaveBudget}
              className="w-full py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-bold transition flex items-center justify-center gap-1.5 border border-cyan-500/30"
            >
              {savedBudget ? <Check className="w-3.5 h-3.5" /> : null}
              <span>{savedBudget ? 'Budget Updated!' : 'Save Target Budget'}</span>
            </button>
          </div>

          {/* AI Endless Scroll Firewall (Concept 186) */}
          <div className={`p-4 rounded-2xl border flex items-center justify-between ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-white/10'
          }`}>
            <div className="space-y-0.5">
              <span className={`text-xs font-bold flex items-center gap-1.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <Shield className="w-4 h-4 text-violet-500" />
                Endless Scroll Firewall
              </span>
              <p className={`text-[11px] max-w-[260px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Pauses after 4 consecutive passive reels to protect attention span.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-violet-500/20 text-violet-600 dark:text-violet-300 border border-violet-500/40">
              Active
            </span>
          </div>

          {/* Content Detox Mode (Concept 187) */}
          <div className={`p-4 rounded-2xl border flex items-center justify-between ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-white/10'
          }`}>
            <div className="space-y-0.5">
              <span className={`text-xs font-bold flex items-center gap-1.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <Leaf className="w-4 h-4 text-emerald-500" />
                Content Detox Mode
              </span>
              <p className={`text-[11px] max-w-[260px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Filters out high-arousal clips, prioritizing calming breathwork and slow learning.
              </p>
            </div>
            <button
              onClick={toggleDetoxMode}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                isDetoxMode
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : isLight
                  ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  : 'bg-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              {isDetoxMode ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
