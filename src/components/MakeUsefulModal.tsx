import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  FileText, 
  CheckSquare, 
  HelpCircle, 
  Calendar, 
  Copy, 
  Check, 
  Trophy, 
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UsefulOutputs } from '../types';
import { getLocalizedReel } from '../utils/translations';

export const MakeUsefulModal: React.FC = () => {
  const { currentReel, closeModal, awardXP, t, language } = useApp();
  const locReel = currentReel ? getLocalizedReel(currentReel, language) : null;
  const [activeTab, setActiveTab] = useState<'notes' | 'quiz' | 'tasks' | 'studyPlan'>('notes');
  const [copied, setCopied] = useState(false);

  // Quiz state
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Tasks completed state
  const [completedTaskIds, setCompletedTaskIds] = useState<Record<string, boolean>>({});

  if (!currentReel) return null;

  const useful: UsefulOutputs = currentReel.usefulOutputs;

  const handleCopyNotes = () => {
    const text = `${useful.notes.summary}\n\nKey Takeaways:\n${useful.notes.bulletPoints.map(b => `- ${b}`).join('\n')}\n\nCore Rule: ${useful.notes.keyTakeaway}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
    setIsAnswerSubmitted(true);

    const question = useful.quiz[currentQuestionIdx];
    if (idx === question.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx + 1 < useful.quiz.length) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
      awardXP(45, 'Completed AI Knowledge Quiz');
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  const toggleTask = (taskId: string) => {
    setCompletedTaskIds(prev => {
      const updated = { ...prev, [taskId]: !prev[taskId] };
      if (updated[taskId]) {
        awardXP(15, 'Completed Action Task');
      }
      return updated;
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-3 md:p-6 animate-fade-in">
      <div className="bg-slate-900 border border-white/15 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 md:p-5 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 text-white shadow-lg shadow-cyan-500/20">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                {t.actions.makeUseful}
              </h2>
              <p className="text-xs text-slate-400 line-clamp-1">
                From: {locReel?.title || currentReel.title}
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

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 p-2 px-4 border-b border-white/10 bg-slate-900/50 overflow-x-auto">
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap ${
              activeTab === 'notes'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{t.modals?.notesTitle || 'AI Notes'}</span>
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>{t.modals?.quizTitle || 'Interactive Quiz'} (+45 XP)</span>
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap ${
              activeTab === 'tasks'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>{t.modals?.tasksTitle || 'Action Checklist'}</span>
          </button>
          <button
            onClick={() => setActiveTab('studyPlan')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap ${
              activeTab === 'studyPlan'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{t.modals?.studyPlanTitle || 'Study Plan'}</span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {/* TAB 1: AI NOTES */}
          {activeTab === 'notes' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                  Core Summary
                </span>
                <p className="text-sm text-slate-100 font-medium leading-relaxed">
                  {useful.notes.summary}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Key Actionable Takeaways
                </span>
                <ul className="space-y-2">
                  {useful.notes.bulletPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 block">
                    Big Takeaway
                  </span>
                  <p className="text-xs font-semibold text-slate-200">
                    {useful.notes.keyTakeaway}
                  </p>
                </div>
                <button
                  onClick={handleCopyNotes}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 transition ml-2 flex-shrink-0"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Notes'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE QUIZ */}
          {activeTab === 'quiz' && (
            <div className="space-y-4 animate-fade-in">
              {!quizFinished ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">
                      Question {currentQuestionIdx + 1} of {useful.quiz.length}
                    </span>
                    <span className="text-xs font-mono font-bold text-violet-400 bg-violet-950/50 px-2 py-0.5 rounded-md border border-violet-800/50">
                      Score: {score}
                    </span>
                  </div>

                  {/* Question */}
                  <h3 className="text-sm md:text-base font-bold text-white">
                    {useful.quiz[currentQuestionIdx].question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-2.5">
                    {useful.quiz[currentQuestionIdx].options.map((opt, idx) => {
                      const isCorrect = idx === useful.quiz[currentQuestionIdx].correctIndex;
                      const isSelected = selectedOption === idx;

                      let btnStyle = 'bg-slate-800/60 border-white/10 text-slate-200 hover:border-violet-500/50';
                      if (isAnswerSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'bg-red-950/60 border-red-500/60 text-red-300';
                        } else {
                          btnStyle = 'opacity-40 bg-slate-900 border-white/5 text-slate-500';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isAnswerSubmitted}
                          onClick={() => handleSelectOption(idx)}
                          className={`w-full p-3 rounded-2xl border text-left text-xs md:text-sm transition flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswerSubmitted && isCorrect && (
                            <Check className="w-4 h-4 text-emerald-400 ml-2 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation after answering */}
                  {isAnswerSubmitted && (
                    <div className="p-3.5 rounded-2xl bg-violet-950/40 border border-violet-500/30 animate-fade-in space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400 block">
                        AI Reasoning & Explanation
                      </span>
                      <p className="text-xs text-slate-200">
                        {useful.quiz[currentQuestionIdx].explanation}
                      </p>
                      <button
                        onClick={handleNextQuestion}
                        className="mt-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition ml-auto"
                      >
                        <span>{currentQuestionIdx + 1 < useful.quiz.length ? 'Next Question' : 'Finish Quiz'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                /* Quiz Complete Celebration */
                <div className="text-center py-6 space-y-4 animate-scale-in">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-violet-500 to-amber-500 flex items-center justify-center text-white mx-auto shadow-xl shadow-violet-500/30">
                    <Trophy className="w-8 h-8 animate-bounce" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Quiz Mastered!</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      You scored {score} / {useful.quiz.length} and earned <span className="text-cyan-400 font-bold">+45 XP</span>!
                    </p>
                  </div>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={handleResetQuiz}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake Quiz</span>
                    </button>
                    <button
                      onClick={closeModal}
                      className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ACTION CHECKLIST */}
          {activeTab === 'tasks' && (
            <div className="space-y-3 animate-fade-in">
              <p className="text-xs text-slate-400">
                Transform passive watching into real execution. Check off tasks as you finish them to earn XP!
              </p>
              <div className="space-y-2">
                {useful.tasks.map(task => {
                  const isDone = !!completedTaskIds[task.id];
                  return (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                        isDone
                          ? 'bg-emerald-950/30 border-emerald-500/40 text-slate-400 line-through'
                          : 'bg-slate-800/60 border-white/10 text-slate-200 hover:border-cyan-500/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                          isDone ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-white/20'
                        }`}>
                          {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-xs md:text-sm font-medium">{task.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/40">
                        {task.estimatedMinutes}m • +15 XP
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: STUDY PLAN */}
          {activeTab === 'studyPlan' && (
            <div className="space-y-3 animate-fade-in">
              <p className="text-xs text-slate-400">
                3-Day structured micro-roadmap derived from this video's principles:
              </p>
              <div className="space-y-2.5">
                {useful.studyPlan.map((plan, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-slate-800/60 border border-white/10 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400">{plan.day}</span>
                      <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                        Target: {plan.outcome}
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 font-medium">{plan.action}</p>
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
