import React from 'react';
import { X, ShieldCheck, AlertTriangle, ExternalLink, Award, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RealityCheckModal: React.FC = () => {
  const { currentReel, closeModal, t } = useApp();

  if (!currentReel) return null;

  const { realityCheck } = currentReel;
  const isVerified = realityCheck.verdict === 'Verified';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-900 border border-white/15 rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className={`p-4 md:p-5 border-b flex items-center justify-between ${
          isVerified 
            ? 'bg-emerald-950/50 border-emerald-500/20 text-emerald-300' 
            : 'bg-amber-950/50 border-amber-500/20 text-amber-300'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl border ${
              isVerified 
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' 
                : 'bg-amber-500/20 border-amber-500/40 text-amber-400'
            }`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">{t.actions.realityCheck}</h2>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  isVerified ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {isVerified ? (t.modals?.verifiedFact || 'Verified') : realityCheck.verdict}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Zynqo Social Safety & Verification Shield • {realityCheck.aiConfidence}% AI Confidence
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

        {/* Body */}
        <div className="p-5 space-y-4 flex-1 overflow-y-auto">
          {/* Claim Box */}
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              {t.modals?.claimAnalyzed || 'Claim Analyzed'}
            </span>
            <p className="text-xs md:text-sm text-white font-semibold">
              "{realityCheck.claim}"
            </p>
          </div>

          {/* Explanation */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Scientific Consensus & Context
            </span>
            <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-slate-800/40 p-3.5 rounded-2xl border border-white/5">
              {realityCheck.explanation}
            </p>
          </div>

          {/* Source Citations */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              {t.modals.sourcesTitle}
            </span>
            <div className="space-y-2">
              {realityCheck.sources.map((source, idx) => (
                <a
                  key={idx}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-white/10 hover:border-cyan-500/40 transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition">
                        {source.name}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        Credibility: {source.credibility}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-300 transition" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Safety Pledge */}
          <div className="p-3 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 text-[11px] text-cyan-200/90 leading-normal flex items-start gap-2">
            <Award className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            <span>
              Zynqo Social surfaces verified research to prevent viral pseudoscience, financial scams, and algorithmic echo chambers while preserving open discovery.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
