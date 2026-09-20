import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Play, 
  ListMusic, 
  Clock, 
  Compass, 
  Brain, 
  CheckCircle2, 
  Flame,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AIPlaylistsModal: React.FC = () => {
  const { closeModal, colorMode, setCurrentPage, setSelectedCategory, setIntent, setSelectedMood } = useApp();
  const isLight = colorMode === 'light';
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>('play-1');

  const playlists = [
    {
      id: 'play-1',
      title: 'Morning Cognitive Jumpstart',
      subtitle: '5-part sequence designed to activate neural focus',
      duration: '12 mins',
      reelsCount: 4,
      gradient: 'from-amber-500 to-orange-600',
      category: 'Productivity',
      mood: 'energetic',
      intent: 'achieve',
      reels: [
        { step: 1, title: 'Dopamine Priming & Morning Light Protocol', duration: '45s', category: 'Neuroscience' },
        { step: 2, title: 'Deep Work Timeboxing Framework', duration: '60s', category: 'Productivity' },
        { step: 3, title: 'Micro-Flow State Trigger Habits', duration: '50s', category: 'Focus' },
        { step: 4, title: 'Hydration & Cognitive Altitude', duration: '40s', category: 'Health' }
      ]
    },
    {
      id: 'play-2',
      title: 'Deep Quantum & AI Breakthroughs',
      subtitle: 'Sequential journey through modern frontier tech',
      duration: '22 mins',
      reelsCount: 6,
      gradient: 'from-cyan-500 to-indigo-600',
      category: 'Technology',
      mood: 'curious',
      intent: 'teach',
      reels: [
        { step: 1, title: 'Quantum Superposition Visualized in 3D', duration: '55s', category: 'Physics' },
        { step: 2, title: 'Transformer Attention Mechanics Explained', duration: '60s', category: 'AI Research' },
        { step: 3, title: 'Silicon Photonics: Light-Speed Chips', duration: '45s', category: 'Hardware' },
        { step: 4, title: 'Neural Interfaces & BCI Horizons', duration: '50s', category: 'Biotech' }
      ]
    },
    {
      id: 'play-3',
      title: 'Mindful Evening Decompression Flow',
      subtitle: 'Low-arousal sensory cooldown to reduce sleep latency',
      duration: '15 mins',
      reelsCount: 4,
      gradient: 'from-emerald-500 to-teal-700',
      category: 'Mindfulness',
      mood: 'calm',
      intent: 'relax',
      reels: [
        { step: 1, title: '4-7-8 Parasympathetic Vagus Reset', duration: '60s', category: 'Breathwork' },
        { step: 2, title: 'Nature Resonance & Visual Bioluminescence', duration: '45s', category: 'Visual Zen' },
        { step: 3, title: 'Screen Filter & Blue Light Mitigation', duration: '40s', category: 'Sleep Hygiene' },
        { step: 4, title: 'Gratitude Re-framing Exercise', duration: '50s', category: 'Mental Health' }
      ]
    },
    {
      id: 'play-4',
      title: 'Peak Creativity & Design Metaphors',
      subtitle: 'Artistic generative patterns and divergent thinking prompts',
      duration: '18 mins',
      reelsCount: 5,
      gradient: 'from-pink-500 to-violet-600',
      category: 'Design & Art',
      mood: 'curious',
      intent: 'inspire',
      reels: [
        { step: 1, title: 'Golden Ratio in Modern Architectural Glass', duration: '50s', category: 'Architecture' },
        { step: 2, title: 'Generative Typography & Kinetic Waves', duration: '45s', category: 'Graphic Design' },
        { step: 3, title: 'Color Theory for Cinematic Storytelling', duration: '60s', category: 'Cinema' },
        { step: 4, title: 'Spatial Audio & Soundstage Sculpting', duration: '55s', category: 'Audio Arts' }
      ]
    }
  ];

  const activePlaylist = playlists.find(p => p.id === selectedPlaylistId) || playlists[0];

  const handleStartJourney = (p: typeof playlists[0]) => {
    setSelectedCategory(p.category);
    setSelectedMood(p.mood as any);
    setIntent(p.intent as any);
    setCurrentPage('feed');
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in select-none">
      <div className={`w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden border transition-colors ${
        isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-white/15 text-white'
      }`}>
        {/* Header */}
        <div className={`p-4 md:p-5 border-b flex items-center justify-between ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-white/10'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-violet-500/20 border border-violet-500/40 text-violet-400">
              <ListMusic className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  AI Playlists & Entertainment Journeys
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-violet-500/15 text-violet-400 border border-violet-500/30">
                  Concept 23 & 24
                </span>
              </div>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Sequential curated journeys tailored to your intent and cognitive state
              </p>
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

        {/* Content Body: Left playlist tabs, right sequence viewer */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col md:flex-row gap-4">
          {/* Playlist Cards Grid / Selector */}
          <div className="w-full md:w-5/12 space-y-2.5">
            <span className={`text-[11px] font-mono font-bold uppercase tracking-wider block ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}>
              AI Curated Playlists
            </span>
            {playlists.map((pl) => (
              <div
                key={pl.id}
                onClick={() => setSelectedPlaylistId(pl.id)}
                className={`p-3 rounded-2xl border cursor-pointer transition-all duration-200 ${
                  selectedPlaylistId === pl.id
                    ? isLight
                      ? 'bg-slate-100 border-violet-500 shadow-sm ring-1 ring-violet-500/50'
                      : 'bg-slate-800 border-violet-500/80 shadow-lg shadow-violet-500/10'
                    : isLight
                    ? 'bg-white border-slate-200 hover:border-slate-300'
                    : 'bg-slate-950/60 border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${pl.gradient} text-white flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className={`text-xs font-bold truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {pl.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-0.5">
                      <span className="flex items-center gap-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {pl.duration}
                      </span>
                      <span>•</span>
                      <span>{pl.reelsCount} reels</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Playlist Detail & Step-by-Step Sequence */}
          <div className={`flex-1 p-4 rounded-2xl border flex flex-col justify-between space-y-4 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-white/10'
          }`}>
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    {activePlaylist.category} Journey
                  </span>
                  <h3 className={`text-sm sm:text-base font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {activePlaylist.title}
                  </h3>
                  <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    {activePlaylist.subtitle}
                  </p>
                </div>
              </div>

              {/* Steps timeline */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                  Sequential Content Roadmap:
                </span>
                {activePlaylist.reels.map((item) => (
                  <div
                    key={item.step}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition ${
                      isLight ? 'bg-white border-slate-200' : 'bg-slate-900/80 border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 border border-violet-500/30 flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0">
                        {item.step}
                      </span>
                      <div className="min-w-0">
                        <p className={`font-semibold truncate text-[11px] ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          {item.title}
                        </p>
                        <span className="text-[9px] text-slate-400 font-mono">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 flex-shrink-0 ml-2">
                      {item.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Launch CTA */}
            <button
              onClick={() => handleStartJourney(activePlaylist)}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 transition flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Journey Now ({activePlaylist.duration})</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
