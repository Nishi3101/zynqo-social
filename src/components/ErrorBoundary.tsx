import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Sparkles, Terminal, ShieldAlert } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Zynqo Social ErrorBoundary caught an unhandled error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleResetAndReload = () => {
    try {
      localStorage.removeItem('pulseai_theme');
      localStorage.removeItem('pulseai_color_mode');
      localStorage.removeItem('pulseai_lang');
    } catch (e) {
      console.warn('Could not clear localStorage:', e);
    }
    window.location.reload();
  };

  private handleClearAllAndReload = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.warn('Could not clear all storage:', e);
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      const errorMsg = this.state.error?.message || 'Unexpected application runtime exception';

      return (
        <div className="min-h-screen w-screen bg-[#07090e] text-slate-100 flex items-center justify-center p-4 font-sans">
          <div className="max-w-md w-full bg-slate-900/90 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl text-center space-y-5 animate-fade-in">
            {/* Header Brand */}
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                <img
                  src="/zynqo-symbol.png"
                  alt="Zynqo Logo"
                  className="w-full h-full object-contain drop-shadow-[0_2px_10px_rgba(6,182,212,0.4)]"
                />
              </div>
              <span className="text-xl font-black text-white">
                Zynqo<span className="text-cyan-400">Social</span>
              </span>
            </div>

            {/* Error Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Self-Healing Engine Activated</span>
            </div>

            <div className="space-y-1.5">
              <h2 className="text-lg font-bold text-white">System Recovered from Render Issue</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                A UI render conflict was intercepted. You can instantly reset your cached settings to restore the full platform interface.
              </p>
            </div>

            {/* Error Message Snippet */}
            <div className="bg-black/50 border border-white/5 rounded-2xl p-3 text-left">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 mb-1">
                <Terminal className="w-3 h-3" />
                <span>Diagnostics:</span>
              </div>
              <p className="text-[11px] font-mono text-rose-300 break-words line-clamp-3">
                {errorMsg}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={this.handleResetAndReload}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition active:scale-95"
              >
                <RotateCcw className="w-4 h-4 stroke-[2.5]" />
                <span>Reset Theme & Reload Cleanly</span>
              </button>

              <button
                onClick={this.handleClearAllAndReload}
                className="w-full py-2 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium border border-white/10 transition"
              >
                Clear All Cache & Fresh Start
              </button>
            </div>

            <p className="text-[10px] text-slate-500">
              Zynqo Social Executive Edition • Auto-Recovery & Crash Protection
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
