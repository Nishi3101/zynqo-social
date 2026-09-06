import React, { useState, useEffect } from 'react';
import { X, Target, CheckCircle2, Circle, Play, Trophy, Sparkles, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GoalTrack } from '../types';

export const GoalLearningView: React.FC = () => {
  const { closeModal, reels, setCurrentReelIndex, awardXP } = useApp();
  const [goals, setGoals] = useState<GoalTrack[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<GoalTrack | null>(null);

  useEffect(() => {
    fetch('/api/user/goals')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.goals) {
          setGoals(data.goals);
          setSelectedGoal(data.goals[0]);
        }
      })
      .catch(err => console.error('Error fetching goals:', err));
  }, []);

  const handleSelectCurriculumReel = (reelId: string) => {
    const idx = reels.findIndex(r => r.id === reelId);
    if (idx !== -1) {
      setCurrentReelIndex(idx);
      closeModal();
    }
  };

  const handleToggleCurriculumItem = (goalId: string, itemIdx: number) => {
    setGoals(prev =>
      prev.map(g => {
        if (g.id !== goalId) return g;
        const newCurr = [...g.curriculum];
        const wasCompleted = newCurr[itemIdx].completed;
        newCurr[itemIdx] = { ...newCurr[itemIdx], completed: !wasCompleted };
        if (!wasCompleted) {
          awardXP(30, 'Completed Goal Milestone');
        }
        return {
          ...g,
          curriculum: newCurr,
          completedReels: newCurr.filter(c => c.completed).length
        };
      })
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-3 md:p-6 animate-fade-in">
      <div className="bg-slate-900 border border-white/15 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 md:p-5 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-500 text-slate-950 font-bold">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-bold text-white">
                Goal → Content Learning Engine
              </h2>
              <p className="text-xs text-slate-400">
                Turn your ambitions into micro-learning reel roadmaps
              </p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Split: Left Goal Selector / Right Curriculum Details */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Goals List */}
          <div className="w-full md:w-72 p-3 border-b md:border-b-0 md:border-r border-white/10 overflow-y-auto space-y-2 bg-slate-950/40">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 block">
              Active Goal Tracks
            </span>
            {goals.map(g => {
              const isSelected = selectedGoal?.id === g.id;
              const progressPct = Math.round((g.completedReels / g.curriculum.length) * 100);
              return (
                <div
                  key={g.id}
                  onClick={() => setSelectedGoal(g)}
                  className={`p-3 rounded-2xl cursor-pointer transition border ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-500/40 text-white shadow-lg'
                      : 'bg-slate-800/50 hover:bg-slate-800 border-white/5 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold">{g.title}</h4>
                    <span className="text-[10px] font-mono text-cyan-400">
                      {progressPct}%
                    </span>
                  </div>
                  <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Curriculum Milestones */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {selectedGoal && (
              <>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">{selectedGoal.title}</h3>
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1 bg-amber-500/15 px-2.5 py-1 rounded-full border border-amber-500/30">
                      <Trophy className="w-3.5 h-3.5" />
                      +{selectedGoal.xpReward} XP Reward
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{selectedGoal.description}</p>
                </div>

                <div className="pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                    Step-by-Step Reel Curriculum
                  </span>
                  <div className="space-y-2.5">
                    {selectedGoal.curriculum.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-slate-800/60 border border-white/10 flex items-center justify-between group hover:border-cyan-500/30 transition"
                      >
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleToggleCurriculumItem(selectedGoal.id, idx)}
                            className="text-slate-400 hover:text-cyan-400 transition"
                          >
                            {item.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-500" />
                            )}
                          </button>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
                              {item.level}
                            </span>
                            <span className={`text-xs md:text-sm font-medium ${
                              item.completed ? 'line-through text-slate-400' : 'text-slate-200'
                            }`}>
                              {item.topic}
                            </span>
                          </div>
                        </div>

                        {item.reelId && (
                          <button
                            onClick={() => handleSelectCurriculumReel(item.reelId)}
                            className="p-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition ml-2 flex-shrink-0"
                            title="Watch Reel"
                          >
                            <Play className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
                            <span className="hidden sm:inline">Watch Reel</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
