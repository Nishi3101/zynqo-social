import React, { useState } from 'react';
import { 
  X, 
  Video, 
  Sparkles, 
  Upload, 
  BarChart3, 
  Wand2, 
  Check, 
  Copy, 
  Flame, 
  TrendingUp, 
  Camera,
  Globe,
  Languages,
  MapPin,
  Zap,
  Image as ImageIcon
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AIAssistModal } from './AIAssistModal';

export const CreatorStudioModal: React.FC = () => {
  const { closeModal, awardXP, refreshReels, t, language: appLanguage } = useApp();
  const [activeTab, setActiveTab] = useState<'generate' | 'upload' | 'analytics'>('generate');

  // Generation state
  const [topic, setTopic] = useState('How Generative AI Agents Collaborate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState<any>(null);

  // Multi-Language, Gen-Z & Regional Dialect state
  const [selectedLanguage, setSelectedLanguage] = useState<string>(appLanguage === 'gu' ? 'gu' : appLanguage === 'hi' ? 'hi' : 'en');
  const [selectedStyle, setSelectedStyle] = useState<'gen_z' | 'casual' | 'regional' | 'mixed_language' | 'standard'>('gen_z');
  const [selectedDialect, setSelectedDialect] = useState<string>('standard');

  const regionalDialectsMap: Record<string, { id: string; label: string }[]> = {
    gu: [
      { id: 'ahmedabad', label: 'Ahmedabad / Amdavadi Gen-Z' },
      { id: 'kathiawadi', label: 'Saurashtra / Kathiawadi Moj' },
      { id: 'surat', label: 'Surat / South Gujarat' },
      { id: 'mehsana', label: 'North Gujarat / Mehsana' },
      { id: 'standard', label: 'Standard Gujarati' }
    ],
    hi: [
      { id: 'bambaiya', label: 'Mumbai / Tapori Slang' },
      { id: 'delhi', label: 'Delhi / NCR Gen-Z' },
      { id: 'purvanchal', label: 'UP / Purvanchal / Bihar' },
      { id: 'standard', label: 'Standard Hindi' }
    ],
    ta: [
      { id: 'chennai', label: 'Chennai Gethu / Mass' },
      { id: 'standard', label: 'Standard Tamil' }
    ],
    te: [
      { id: 'hyderabad', label: 'Hyderabad Kirrak' },
      { id: 'standard', label: 'Standard Telugu' }
    ],
    mr: [
      { id: 'mumbai_pune', label: 'Mumbai / Pune Lai Bhari' },
      { id: 'standard', label: 'Standard Marathi' }
    ],
    en: [
      { id: 'standard', label: 'Global / Standard' }
    ]
  };

  const languageOptions = [
    { code: 'gu', label: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' },
    { code: 'hi', label: 'हिन्दी (Hindi)', flag: '🇮🇳' },
    { code: 'en', label: 'English', flag: '🌐' },
    { code: 'ta', label: 'தமிழ் (Tamil)', flag: '🇮🇳' },
    { code: 'te', label: 'తెలుగు (Telugu)', flag: '🇮🇳' },
    { code: 'mr', label: 'मराठी (Marathi)', flag: '🇮🇳' },
    { code: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)', flag: '🇮🇳' },
    { code: 'bn', label: 'বাংলা (Bengali)', flag: '🇮🇳' },
    { code: 'ml', label: 'മലയാളം (Malayalam)', flag: '🇮🇳' },
    { code: 'kn', label: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳' }
  ];

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    const available = regionalDialectsMap[lang];
    if (available && available.length > 0) {
      setSelectedDialect(available[0].id);
    } else {
      setSelectedDialect('standard');
    }
  };

  // Upload state
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDesc, setUploadDesc] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Tech & AI');
  const [uploadThumbnailUrl, setUploadThumbnailUrl] = useState('');
  const [uploadOverlayText, setUploadOverlayText] = useState('');
  const [showAIAssist, setShowAIAssist] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Analytics data
  const [analytics, setAnalytics] = useState<any>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/creator/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          language: selectedLanguage,
          regionalStyle: selectedDialect,
          tone: selectedStyle
        })
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedData(data.assets);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLoadAnalytics = async () => {
    try {
      const res = await fetch('/api/creator/analytics');
      const data = await res.json();
      if (data.success) {
        setAnalytics(data.analytics);
      }
    } catch (e) {}
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    setIsPublishing(true);
    try {
      const res = await fetch('/api/reels/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: uploadTitle,
          description: uploadDesc,
          category: uploadCategory,
          thumbnailUrl: uploadThumbnailUrl || undefined,
          overlayText: uploadOverlayText || undefined,
          intent: 'teach',
          duration: 45
        })
      });
      const data = await res.json();
      if (data.success) {
        setPublishSuccess(true);
        awardXP(100, 'Published Native AI Reel');
        refreshReels();
        setTimeout(() => {
          closeModal();
        }, 1500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 md:p-6 animate-fade-in">
      <div className="bg-slate-900 border border-white/15 rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 md:p-5 border-b border-white/10 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-pink-500 to-violet-600 text-white shadow-lg shadow-pink-500/20">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-bold text-white">
                Zynqo Social Creator Studio
              </h2>
              <p className="text-xs text-slate-400">
                AI Hook Generator, Script Engine & Audience Analytics
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

        {/* Tabs */}
        <div className="flex items-center gap-2 p-2 px-4 border-b border-white/10 bg-slate-900/50">
          <button
            onClick={() => setActiveTab('generate')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'generate'
                ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wand2 className="w-4 h-4" />
            <span>AI Script & Hook Studio</span>
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'upload'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Reel (+100 XP)</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('analytics');
              handleLoadAnalytics();
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'analytics'
                ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Audience Retention & Analytics</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {/* TAB 1: AI SCRIPT & HOOK GENERATOR */}
          {activeTab === 'generate' && (
            <div className="space-y-4 animate-fade-in">
              {/* Language & Regional Dialect Engine Settings */}
              <div className="p-3.5 bg-slate-950/60 border border-white/10 rounded-2xl space-y-2.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                  <div className="flex items-center gap-1.5 text-pink-400">
                    <Globe className="w-4 h-4" />
                    <span className="font-bold uppercase tracking-wider text-[11px]">Multi-Language & Regional Dialect AI</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Contextual Intent • Gen-Z • Slang Aware</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {/* Language Selector */}
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Target Language</label>
                    <select
                      value={selectedLanguage}
                      onChange={e => handleLanguageChange(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-800 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-pink-500"
                    >
                      {languageOptions.map(l => (
                        <option key={l.code} value={l.code}>
                          {l.flag} {l.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Style & Tone Selector */}
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Communication Style</label>
                    <select
                      value={selectedStyle}
                      onChange={e => setSelectedStyle(e.target.value as any)}
                      className="w-full px-2.5 py-1.5 bg-slate-800 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-pink-500"
                    >
                      <option value="gen_z">⚡ Gen-Z Slang & Internet Native</option>
                      <option value="casual">☕ Casual & Conversational</option>
                      <option value="regional">📍 Regional & Cultural Idioms</option>
                      <option value="mixed_language">🔀 Code-Switching (Mixed)</option>
                      <option value="standard">🎯 Standard / Professional</option>
                    </select>
                  </div>

                  {/* Regional Dialect Selector */}
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Regional Dialect (Optional)</label>
                    <select
                      value={selectedDialect}
                      onChange={e => setSelectedDialect(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-800 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-pink-500"
                    >
                      {(regionalDialectsMap[selectedLanguage] || [{ id: 'standard', label: 'Standard' }]).map(d => (
                        <option key={d.id} value={d.id}>
                          {d.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Topic Input Bar */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  placeholder="Enter topic (e.g. 5 Habits of High Performers, Quantum Computing)..."
                  className="flex-1 px-3.5 py-2.5 bg-slate-800 border border-white/10 rounded-2xl text-xs md:text-sm text-white focus:outline-none focus:border-pink-500"
                />
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="px-4 py-2.5 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-400 hover:to-violet-500 text-white font-bold text-xs md:text-sm rounded-2xl transition shadow-lg shadow-pink-500/25 flex items-center gap-1.5 flex-shrink-0"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isGenerating ? 'Generating...' : 'Generate Script & Hooks'}</span>
                </button>
              </div>

              {generatedData && (
                <div className="space-y-4 pt-2 animate-fade-in">
                  {/* Generated Dialect Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 px-3.5 bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-cyan-950/40 border border-pink-500/20 rounded-2xl text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-mono text-[11px] font-bold border border-pink-500/30 flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {generatedData.language || 'Multi-Language'}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[11px] font-bold border border-cyan-500/30 flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        {generatedData.tone || 'Gen-Z'}
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Authentic Slang & Dialect Cadence Preserved
                    </span>
                  </div>

                  {/* Viral Hooks */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-pink-400 block mb-2">
                      3 AI-Generated Viral Hooks
                    </span>
                    <div className="space-y-2">
                      {generatedData.hooks.map((h: any, i: number) => (
                        <div
                          key={i}
                          className="p-3 rounded-2xl bg-slate-800/60 border border-white/10 flex items-center justify-between"
                        >
                          <div>
                            <span className="text-[10px] font-bold uppercase text-slate-400 block">
                              {h.type}
                            </span>
                            <p className="text-xs text-white font-medium mt-0.5">{h.hook}</p>
                          </div>
                          <span className="text-[11px] font-mono font-bold text-pink-400 bg-pink-950/60 px-2 py-0.5 rounded border border-pink-500/30 ml-2 flex-shrink-0">
                            {h.score}% Viral
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 60s Script */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-2">
                      60-Second Structured Script
                    </span>
                    <div className="space-y-2 bg-slate-950/60 p-3.5 rounded-2xl border border-white/10">
                      {generatedData.script.segments.map((seg: any, idx: number) => (
                        <div key={idx} className="text-xs space-y-1 pb-2 border-b border-white/5 last:border-0 last:pb-0">
                          <span className="text-[10px] font-mono text-cyan-300 font-bold">
                            {seg.timestamp}
                          </span>
                          <p className="text-slate-400 italic">{seg.visual}</p>
                          <p className="text-white font-medium">"{seg.audio}"</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Coach Feedback */}
                  <div className="p-3.5 rounded-2xl bg-violet-950/40 border border-violet-500/30 space-y-1 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-violet-300 block">
                      AI Creator Coach Retention Tip
                    </span>
                    <p className="text-slate-200">
                      Predicted Retention: <strong className="text-white">{generatedData.coachFeedback.predictedRetention}</strong>
                    </p>
                    <p className="text-slate-300">{generatedData.coachFeedback.pacingTip}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: UPLOAD REEL */}
          {activeTab === 'upload' && (
            <form onSubmit={handlePublish} className="space-y-4 animate-fade-in">
              <div className="border-2 border-dashed border-white/20 hover:border-cyan-400/50 rounded-3xl p-6 text-center bg-slate-950/40 cursor-pointer transition">
                <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <h4 className="text-xs md:text-sm font-bold text-white">Drag & drop your short video here</h4>
                <p className="text-[11px] text-slate-400 mt-1">MP4, WebM up to 60 seconds (9:16 vertical)</p>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-300 block">Reel Title</label>
                    <button
                      type="button"
                      onClick={() => setShowAIAssist(true)}
                      className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-cyan-500/20 to-pink-500/20 hover:from-cyan-500/30 hover:to-pink-500/30 border border-cyan-400/40 text-cyan-300 hover:text-white text-[11px] font-extrabold flex items-center gap-1.5 transition shadow-sm active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>✨ Generate with AI</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={uploadTitle}
                    onChange={e => setUploadTitle(e.target.value)}
                    placeholder="e.g. Master Vector Databases in 45 Seconds"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-white/10 rounded-2xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Description & Hashtags</label>
                  <textarea
                    value={uploadDesc}
                    onChange={e => setUploadDesc(e.target.value)}
                    placeholder="Provide context and keywords..."
                    rows={2}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-white/10 rounded-2xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* AI-Selected Thumbnail Preview if chosen */}
                {uploadThumbnailUrl && (
                  <div className="p-3 rounded-2xl bg-slate-800/80 border border-cyan-500/30 flex items-center justify-between gap-3 animate-fade-in">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative w-14 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10">
                        <img src={uploadThumbnailUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                        {uploadOverlayText && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-0.5">
                            <span className="text-[7px] font-bold text-yellow-300 text-center leading-tight truncate">
                              {uploadOverlayText}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold text-white block">AI Thumbnail Frame</span>
                        <span className="text-[10px] text-cyan-400 truncate block">
                          {uploadOverlayText ? `Overlay: "${uploadOverlayText}"` : 'High-impact visual moment'}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setUploadThumbnailUrl('');
                        setUploadOverlayText('');
                      }}
                      className="text-slate-400 hover:text-rose-400 text-xs p-1"
                      title="Remove custom frame"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Category</label>
                  <select
                    value={uploadCategory}
                    onChange={e => setUploadCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-white/10 rounded-2xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Tech & AI">Tech & AI</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Health & Fitness">Health & Fitness</option>
                    <option value="Finance">Finance</option>
                    <option value="Science & Space">Science & Space</option>
                  </select>
                </div>
              </div>

              {publishSuccess ? (
                <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Reel Published Successfully! (+100 XP Earned)</span>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={isPublishing}
                  className="w-full py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs md:text-sm transition shadow-lg shadow-cyan-500/25"
                >
                  {isPublishing ? 'Publishing to Zynqo Social Feed...' : 'Publish Reel to Feed'}
                </button>
              )}
            </form>
          )}

          {/* TAB 3: CREATOR ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-4 animate-fade-in">
              {analytics ? (
                <>
                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="p-3 rounded-2xl bg-slate-800/60 border border-white/10">
                      <span className="text-[10px] text-slate-400 block font-medium">Total Views</span>
                      <span className="text-base md:text-lg font-bold text-white mt-1 block">
                        {analytics.totalViews}
                      </span>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-800/60 border border-white/10">
                      <span className="text-[10px] text-slate-400 block font-medium">Avg Watch Time</span>
                      <span className="text-base md:text-lg font-bold text-cyan-400 mt-1 block">
                        {analytics.avgWatchTime}
                      </span>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-800/60 border border-white/10">
                      <span className="text-[10px] text-slate-400 block font-medium">Completion Rate</span>
                      <span className="text-base md:text-lg font-bold text-emerald-400 mt-1 block">
                        {analytics.completionRate}
                      </span>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-800/60 border border-white/10">
                      <span className="text-[10px] text-slate-400 block font-medium">Meaningful Actions</span>
                      <span className="text-base md:text-lg font-bold text-violet-400 mt-1 block">
                        {analytics.meaningfulEngagementRate}
                      </span>
                    </div>
                  </div>

                  {/* Retention Curve */}
                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 space-y-3">
                    <span className="text-xs font-bold text-white block">
                      Audience Retention Curve (Seconds 0 to 55)
                    </span>
                    <div className="flex items-end gap-2 h-32 pt-4">
                      {analytics.retentionCurve.map((pt: any, i: number) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                          <div
                            className="w-full bg-gradient-to-t from-cyan-600 to-violet-500 rounded-t-md transition-all duration-500"
                            style={{ height: `${pt.retention}%` }}
                          />
                          <span className="text-[10px] font-mono text-slate-400">{pt.second}s</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Performance Explanation */}
                  <div className="p-3.5 rounded-2xl bg-violet-950/40 border border-violet-500/30 space-y-1 text-xs">
                    <span className="text-[10px] font-bold uppercase text-violet-300 block">
                      AI Performance Explanation (Feature 104)
                    </span>
                    <p className="text-slate-200">
                      {analytics.aiCoachFeedback.strengths[0]}
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-6 text-slate-400 text-xs">Loading analytics...</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Optional AI Content Suggestion Assistant */}
      <AIAssistModal
        isOpen={showAIAssist}
        onClose={() => setShowAIAssist(false)}
        contentType="reel"
        initialTitle={uploadTitle}
        initialDesc={uploadDesc}
        initialCategory={uploadCategory}
        onApply={(data) => {
          if (data.title) setUploadTitle(data.title);
          if (data.description) setUploadDesc(data.description);
          if (data.thumbnailUrl) setUploadThumbnailUrl(data.thumbnailUrl);
          if (data.overlayText) setUploadOverlayText(data.overlayText);
        }}
      />
    </div>
  );
};
