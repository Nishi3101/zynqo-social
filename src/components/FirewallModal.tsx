import React from 'react';
import { ShieldAlert, Sparkles, Clock, ArrowRight, Play } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FirewallModal: React.FC = () => {
  const { firewallTriggered, dismissFirewall, openModal } = useApp();

  if (!firewallTriggered) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-900 border border-violet-500/30 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-xl shadow-violet-600/30 animate-pulse">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400 bg-violet-950/60 px-2.5 py-1 rounded-full border border-violet-500/40 inline-block mb-2">
            AI Endless Scroll Firewall
          </span>
          <h3 className="text-lg font-bold text-white">
            Pause & Check In
          </h3>
          <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
            You've watched 4 reels in passive mode. Zynqo Social prevents doomscrolling loops by turning consumption into action.
          </p>
        </div>

        <div className="space-y-2 pt-2 text-left">
          <button
            onClick={() => {
              dismissFirewall();
              openModal('makeUseful');
            }}
            className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-teal-500/20 hover:from-cyan-500/30 hover:to-teal-500/30 border border-cyan-500/40 transition flex items-center justify-between group"
          >
            <div>
              <span className="text-xs font-bold text-white group-hover:text-cyan-300 block">
                Make Current Reel Useful
              </span>
              <span className="text-[10px] text-slate-400">Generate 3-question quiz or notes</span>
            </div>
            <Sparkles className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition" />
          </button>

          <button
            onClick={() => {
              dismissFirewall();
              openModal('timeSession');
            }}
            className="w-full p-3.5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-white/10 transition flex items-center justify-between group"
          >
            <div>
              <span className="text-xs font-bold text-white group-hover:text-amber-300 block">
                Start "I Have 5 Minutes" Mode
              </span>
              <span className="text-[10px] text-slate-400">Fixed curated countdown session</span>
            </div>
            <Clock className="w-4 h-4 text-amber-400 group-hover:scale-110 transition" />
          </button>
        </div>

        <button
          onClick={dismissFirewall}
          className="text-xs text-slate-400 hover:text-white pt-2 block mx-auto underline transition"
        >
          Continue scrolling intentionally
        </button>
      </div>
    </div>
  );
};
