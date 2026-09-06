import React, { useState, useEffect } from 'react';
import { X, Brain, Trash2, Shield, EyeOff, Sparkles, Check, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MemoryVaultModal: React.FC = () => {
  const { userProfile, forgetMemoryItem, closeModal, t } = useApp();
  const [digest, setDigest] = useState<any>(null);
  const [privateMode, setPrivateMode] = useState(false);
  const [exported, setExported] = useState(false);

  useEffect(() => {
    fetch('/api/user/learning-digest')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDigest(data.digest);
        }
      })
      .catch(e => console.error(e));
  }, []);

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userProfile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "zynqo_social_personal_vault.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-900 border border-white/15 rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 md:p-5 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">{t.actions.memoryVault}</h2>
              <p className="text-xs text-slate-400">Personal AI Memory, Learning Digest & Data Sovereignty</p>
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
        <div className="p-5 space-y-4 flex-1 overflow-y-auto">
          {/* "What Did I Learn Today?" Digest (Feature 160) */}
          {digest && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-violet-950/40 border border-cyan-500/30 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  What Did I Learn Today? ({digest.date})
                </span>
                <span className="text-[10px] font-mono text-cyan-400 font-bold">
                  +{digest.xpGainedToday} XP Earned
                </span>
              </div>
              <ul className="space-y-1.5">
                {digest.insightsLearned.map((ins: string, i: number) => (
                  <li key={i} className="text-xs text-slate-200 flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span>{ins}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Active Memory Items with "Forget This" button (Feature 141) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Active Knowledge Graph & Inferred Interests
              </span>
              <span className="text-[10px] text-slate-500">Click trash to delete preference</span>
            </div>

            <div className="space-y-2">
              {userProfile?.memoryVault && userProfile.memoryVault.length > 0 ? (
                userProfile.memoryVault.map(item => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-slate-800/60 border border-white/10 flex items-center justify-between group hover:border-cyan-500/30 transition"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase text-cyan-400 block">
                        {item.type}
                      </span>
                      <p className="text-xs text-white font-medium">{item.text}</p>
                    </div>
                    <button
                      onClick={() => forgetMemoryItem(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/50 transition"
                      title="Forget This (Feature 141)"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-xs text-slate-400">
                  Your memory vault is clear.
                </div>
              )}
            </div>
          </div>

          {/* Privacy & Incognito Settings (Feature 143, 144) */}
          <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-violet-400" />
                <span className="text-xs font-bold text-white">Private Incognito Mode</span>
              </div>
              <button
                onClick={() => setPrivateMode(prev => !prev)}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  privateMode ? 'bg-violet-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform transform ${
                    privateMode ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              When enabled, viewed reels and quiz answers do not modify your long-term interest graph.
            </p>
          </div>

          {/* Export Data Button */}
          <button
            onClick={handleExportData}
            className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-xs font-semibold text-slate-200 transition flex items-center justify-center gap-2"
          >
            {exported ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4 text-cyan-400" />}
            <span>{exported ? 'Downloaded personal data!' : 'Export AI Vault Data (JSON)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
