import React from 'react';
import { X, Palette, Check, Sparkles, Sun, Moon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { themes } from '../utils/theme';
import { ThemeType } from '../types';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({ isOpen, onClose }) => {
  const { currentTheme, setTheme, colorMode, setColorMode } = useApp();

  if (!isOpen) return null;

  const isLight = colorMode === 'light';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
      <div className={`w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col border transition-colors ${
        isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-white/15 text-white'
      }`}>
        {/* Header */}
        <div className={`p-4 md:p-5 border-b flex items-center justify-between ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/70 border-white/10'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-500 text-slate-950 font-black shadow-md">
              <Palette className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h3 className={`text-base font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Visual Experience Studio
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  isLight ? 'bg-slate-200 text-slate-700' : 'bg-white/10 text-slate-300'
                }`}>
                  Modes & Palettes
                </span>
              </h3>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Toggle Light/Dark mode and choose company-grade designer palettes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-full transition ${
              isLight ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200' : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Appearance Mode (Light vs Dark) Selector */}
        <div className={`px-5 py-3.5 border-b flex items-center justify-between ${
          isLight ? 'bg-slate-50/60 border-slate-200' : 'bg-slate-950/40 border-white/10'
        }`}>
          <div>
            <span className={`text-xs font-bold block ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Display Mode
            </span>
            <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Switch between Dark Obsidian and Crisp Daylight White
            </span>
          </div>

          <div className={`p-1 rounded-2xl flex items-center gap-1 border ${
            isLight ? 'bg-slate-100 border-slate-300' : 'bg-slate-800 border-white/10'
          }`}>
            <button
              onClick={() => setColorMode('dark')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                !isLight
                  ? 'bg-slate-900 text-white shadow-md border border-white/10'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              <span>Dark Mode</span>
            </button>
            <button
              onClick={() => setColorMode('light')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                isLight
                  ? 'bg-white text-slate-950 shadow-md font-extrabold border border-slate-200'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Light Mode</span>
            </button>
          </div>
        </div>

        {/* Color Palette List */}
        <div className="p-5 space-y-3 overflow-y-auto max-h-[55vh]">
          <div className="flex items-center justify-between pb-1">
            <span className={`text-xs font-extrabold uppercase tracking-wider ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Brand Color Identity (5 Palettes)
            </span>
            <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Click to preview live
            </span>
          </div>

          {(Object.keys(themes) as ThemeType[]).map(themeKey => {
            const t = themes[themeKey];
            const isSelected = currentTheme === themeKey;

            return (
              <div
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between group ${
                  isSelected
                    ? isLight
                      ? 'bg-slate-50 border-slate-400 shadow-md ring-1 ring-slate-300'
                      : 'bg-white/10 border-white/40 shadow-xl'
                    : isLight
                    ? 'bg-white hover:bg-slate-50 border-slate-200'
                    : 'bg-slate-800/40 hover:bg-slate-800/80 border-white/5'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    {/* Color Swatch Dots */}
                    <div className="flex items-center -space-x-1.5">
                      {t.previewColors.map((c, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 rounded-full border border-black/30 shadow-sm"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                    <span className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {t.name}
                    </span>
                    <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      ({t.tagline})
                    </span>
                  </div>
                  <p className={`text-xs pl-6 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {t.vibe}
                  </p>
                </div>

                <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 ml-3 ${
                  isSelected 
                    ? isLight 
                      ? 'bg-slate-950 text-white border-slate-950' 
                      : 'bg-white text-slate-950 font-bold border-white'
                    : isLight
                    ? 'border-slate-300 group-hover:border-slate-400'
                    : 'border-white/20 group-hover:border-white/40'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className={`p-4 border-t flex items-center justify-between text-xs ${
          isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-slate-950/60 border-white/10 text-slate-400'
        }`}>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Applies immediately across Landing Page, Feed & Modals</span>
          </div>
          <button
            onClick={onClose}
            className={`px-4 py-1.5 rounded-xl font-bold transition ${
              isLight ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
