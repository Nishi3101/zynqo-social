import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Edit3,
  Image as ImageIcon,
  Hash,
  MessageSquare,
  ChevronRight,
  Sliders,
  Wand2,
  AlertCircle,
  Tag,
  Flame,
  Globe
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { themes } from '../utils/theme';

export interface AIAssistModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentType: 'reel' | 'video' | 'post';
  initialTitle?: string;
  initialDesc?: string;
  initialCategory?: string;
  onApply: (data: {
    title?: string;
    caption: string;
    description: string;
    hashtags: string[];
    thumbnailUrl?: string;
    overlayText?: string;
  }) => void;
}

interface CaptionOption {
  id: string;
  toneType: string;
  toneLabel: string;
  text: string;
  badge: string;
  recommendedFor: string;
}

interface ThumbnailOption {
  id: string;
  frameType: string;
  timestamp: string;
  previewUrl: string;
  suggestedOverlayText: string;
  reason: string;
}

interface HashtagGroups {
  relevant: string[];
  niche: string[];
  broad: string[];
  regional: string[];
}

export const AIAssistModal: React.FC<AIAssistModalProps> = ({
  isOpen,
  onClose,
  contentType = 'reel',
  initialTitle = '',
  initialDesc = '',
  initialCategory = 'Tech & AI',
  onApply
}) => {
  const { currentTheme, colorMode } = useApp();
  const theme = themes[currentTheme] || themes.emerald;
  const isLight = colorMode === 'light';

  // Navigation / Tab state within AI modal
  const [activeSection, setActiveSection] = useState<'captions' | 'hashtags' | 'thumbnails'>('captions');

  // Input preferences
  const [selectedType, setSelectedType] = useState<'reel' | 'video' | 'post'>(contentType);
  const [titleInput, setTitleInput] = useState(initialTitle);
  const [descInput, setDescInput] = useState(initialDesc);
  const [category, setCategory] = useState(initialCategory || 'Tech & AI');
  const [language, setLanguage] = useState('auto');
  const [dialect, setDialect] = useState('standard');
  const [tone, setTone] = useState('auto');
  const [audience, setAudience] = useState('general');
  const [userPrompt, setUserPrompt] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Suggestions state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generated results
  const [captions, setCaptions] = useState<CaptionOption[]>([]);
  const [selectedCaptionId, setSelectedCaptionId] = useState<string | null>(null);
  const [editingCaptionId, setEditingCaptionId] = useState<string | null>(null);
  const [editedCaptions, setEditedCaptions] = useState<Record<string, string>>({});
  const [copiedCaptionId, setCopiedCaptionId] = useState<string | null>(null);

  // AI Modify Caption
  const [aiModifyInstruction, setAiModifyInstruction] = useState('');
  const [isModifyingCaption, setIsModifyingCaption] = useState(false);

  // Hashtags
  const [hashtags, setHashtags] = useState<HashtagGroups>({
    relevant: [],
    niche: [],
    broad: [],
    regional: []
  });
  const [selectedHashtags, setSelectedHashtags] = useState<Set<string>>(new Set());
  const [copiedTags, setCopiedTags] = useState(false);

  // Thumbnails
  const [thumbnails, setThumbnails] = useState<ThumbnailOption[]>([]);
  const [selectedThumbnailId, setSelectedThumbnailId] = useState<string | null>(null);
  const [customOverlayTexts, setCustomOverlayTexts] = useState<Record<string, string>>({});

  // Regeneration loading states
  const [isRegeneratingCaptions, setIsRegeneratingCaptions] = useState(false);
  const [isRegeneratingHashtags, setIsRegeneratingHashtags] = useState(false);
  const [isRegeneratingThumbnails, setIsRegeneratingThumbnails] = useState(false);

  // Reset or initialize on open
  useEffect(() => {
    if (isOpen) {
      setSelectedType(contentType);
      setTitleInput(initialTitle);
      setDescInput(initialDesc);
      setCategory(initialCategory || 'Tech & AI');
      // If we don't have suggestions yet, trigger initial generation
      if (captions.length === 0) {
        generateAllSuggestions({
          type: contentType,
          title: initialTitle,
          desc: initialDesc,
          cat: initialCategory || 'Tech & AI'
        });
      }
    }
  }, [isOpen, contentType, initialTitle, initialDesc, initialCategory]);

  if (!isOpen) return null;

  // Unified suggestion generator
  async function generateAllSuggestions(params?: {
    type?: 'reel' | 'video' | 'post';
    title?: string;
    desc?: string;
    cat?: string;
  }) {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/suggest-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType: params?.type || selectedType,
          title: params?.title !== undefined ? params.title : titleInput,
          description: params?.desc !== undefined ? params.desc : descInput,
          category: params?.cat || category,
          userPrompt,
          language,
          dialect,
          tone,
          audience
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate suggestions');
      }

      const sug = data.suggestions;
      setCaptions(sug.captions || []);
      if (sug.captions?.length > 0) {
        setSelectedCaptionId(sug.captions[0].id);
      }

      setHashtags(sug.hashtags || { relevant: [], niche: [], broad: [], regional: [] });
      // Pre-select top relevant and regional hashtags by default
      const initialSelected = new Set<string>();
      (sug.hashtags?.relevant || []).slice(0, 3).forEach((t: string) => initialSelected.add(t));
      (sug.hashtags?.niche || []).slice(0, 2).forEach((t: string) => initialSelected.add(t));
      (sug.hashtags?.regional || []).slice(0, 2).forEach((t: string) => initialSelected.add(t));
      (sug.hashtags?.broad || []).slice(0, 1).forEach((t: string) => initialSelected.add(t));
      setSelectedHashtags(initialSelected);

      setThumbnails(sug.thumbnails || []);
      if (sug.thumbnails?.length > 0) {
        setSelectedThumbnailId(sug.thumbnails[0].id);
        const overlayMap: Record<string, string> = {};
        sug.thumbnails.forEach((th: ThumbnailOption) => {
          overlayMap[th.id] = th.suggestedOverlayText;
        });
        setCustomOverlayTexts(overlayMap);
      }
    } catch (err: any) {
      console.error('Generation failed:', err);
      setError(err.message || 'Unable to contact AI suggestion engine. You can still write content manually.');
    } finally {
      setIsLoading(false);
    }
  }

  // Regenerate Captions only
  async function handleRegenerateCaptions() {
    setIsRegeneratingCaptions(true);
    try {
      const res = await fetch('/api/ai/suggest-content/captions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType: selectedType,
          title: titleInput,
          description: descInput,
          category,
          userPrompt,
          language,
          dialect,
          tone,
          audience
        })
      });
      const data = await res.json();
      if (data.success && data.captions) {
        setCaptions(data.captions);
        if (data.captions.length > 0) setSelectedCaptionId(data.captions[0].id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsRegeneratingCaptions(false);
    }
  }

  // Regenerate Hashtags only
  async function handleRegenerateHashtags() {
    setIsRegeneratingHashtags(true);
    try {
      const res = await fetch('/api/ai/suggest-content/hashtags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: titleInput || category,
          category,
          language,
          dialect,
          contentType: selectedType
        })
      });
      const data = await res.json();
      if (data.success && data.hashtags) {
        setHashtags(data.hashtags);
        const updated = new Set<string>();
        (data.hashtags.relevant || []).slice(0, 3).forEach((t: string) => updated.add(t));
        (data.hashtags.niche || []).slice(0, 2).forEach((t: string) => updated.add(t));
        (data.hashtags.regional || []).slice(0, 2).forEach((t: string) => updated.add(t));
        setSelectedHashtags(updated);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsRegeneratingHashtags(false);
    }
  }

  // Regenerate Thumbnails only
  async function handleRegenerateThumbnails() {
    setIsRegeneratingThumbnails(true);
    try {
      const res = await fetch('/api/ai/suggest-content/thumbnails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: titleInput || category,
          category,
          contentType: selectedType,
          userPrompt,
          language
        })
      });
      const data = await res.json();
      if (data.success && data.thumbnails) {
        setThumbnails(data.thumbnails);
        if (data.thumbnails.length > 0) setSelectedThumbnailId(data.thumbnails[0].id);
        const map: Record<string, string> = {};
        data.thumbnails.forEach((th: ThumbnailOption) => {
          map[th.id] = th.suggestedOverlayText;
        });
        setCustomOverlayTexts(map);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsRegeneratingThumbnails(false);
    }
  }

  // Modify active caption with AI instruction
  async function handleModifyCaption(instructionText?: string) {
    const inst = instructionText || aiModifyInstruction;
    if (!inst.trim() || !selectedCaptionId) return;

    const currentCap = editedCaptions[selectedCaptionId] || captions.find(c => c.id === selectedCaptionId)?.text;
    if (!currentCap) return;

    setIsModifyingCaption(true);
    try {
      const res = await fetch('/api/ai/suggest-content/modify-caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caption: currentCap,
          instruction: inst,
          language,
          dialect
        })
      });
      const data = await res.json();
      if (data.success && data.modifiedCaption) {
        setEditedCaptions(prev => ({
          ...prev,
          [selectedCaptionId]: data.modifiedCaption
        }));
        setAiModifyInstruction('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsModifyingCaption(false);
    }
  }

  // Hashtag toggle
  function toggleHashtag(tag: string) {
    setSelectedHashtags(prev => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  }

  // Toggle group of hashtags
  function toggleGroupHashtags(tags: string[]) {
    const allSelected = tags.every(t => selectedHashtags.has(t));
    setSelectedHashtags(prev => {
      const next = new Set(prev);
      tags.forEach(t => {
        if (allSelected) {
          next.delete(t);
        } else {
          next.add(t);
        }
      });
      return next;
    });
  }

  // Copy helpers
  function copyCaption(id: string, text: string) {
    navigator.clipboard.writeText(text);
    setCopiedCaptionId(id);
    setTimeout(() => setCopiedCaptionId(null), 2000);
  }

  function copySelectedHashtags() {
    const text = Array.from(selectedHashtags).join(' ');
    navigator.clipboard.writeText(text);
    setCopiedTags(true);
    setTimeout(() => setCopiedTags(false), 2000);
  }

  // Final apply handler
  function handleApply() {
    const activeCapObj = captions.find(c => c.id === selectedCaptionId);
    const finalCaption = selectedCaptionId
      ? (editedCaptions[selectedCaptionId] || activeCapObj?.text || '')
      : (titleInput || '');

    const tagsArray = Array.from(selectedHashtags);
    const tagsText = tagsArray.join(' ');

    const activeThumb = thumbnails.find(t => t.id === selectedThumbnailId);
    const activeOverlay = selectedThumbnailId ? customOverlayTexts[selectedThumbnailId] : undefined;

    // Combine description and hashtags cleanly
    const finalDescription = descInput
      ? `${descInput}\n\n${tagsText}`
      : tagsText;

    onApply({
      title: titleInput || (finalCaption.length < 60 ? finalCaption : `${finalCaption.slice(0, 50)}...`),
      caption: finalCaption,
      description: finalDescription,
      hashtags: tagsArray,
      thumbnailUrl: activeThumb?.previewUrl,
      overlayText: activeOverlay
    });

    onClose();
  }

  const selectedThumbnail = thumbnails.find(t => t.id === selectedThumbnailId);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in select-none">
      <div
        className={`w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-colors ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-white/15 text-white'
        }`}
      >
        {/* Header */}
        <div
          className={`px-4 py-3.5 sm:px-6 sm:py-4 border-b flex items-center justify-between ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-white/10'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-pink-500 flex items-center justify-center shadow-md shadow-cyan-500/20">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-display font-extrabold tracking-tight">
                  ✨ AI Content Assistant
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  {selectedType}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Tailored captions, hashtags & visual frames for your {selectedType}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preferences / Customization Bar */}
        <div
          className={`p-3 sm:p-4 border-b space-y-3 ${
            isLight ? 'bg-slate-100/70 border-slate-200' : 'bg-slate-950/40 border-white/10'
          }`}
        >
          {/* Main prompt input */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={userPrompt}
                onChange={e => setUserPrompt(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && generateAllSuggestions()}
                placeholder="Tell AI what you want (e.g. 'Short Gujarati Gen-Z caption for college students')..."
                className={`w-full text-xs sm:text-sm pl-3.5 pr-20 py-2.5 rounded-2xl border outline-none transition ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900 focus:border-cyan-500'
                    : 'bg-slate-800/90 border-white/10 text-white focus:border-cyan-400'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded-lg text-[11px] font-semibold text-slate-400 hover:text-white flex items-center gap-1 bg-white/5 hover:bg-white/10 transition"
              >
                <Sliders className="w-3 h-3" />
                <span>Filters</span>
              </button>
            </div>

            <button
              onClick={() => generateAllSuggestions()}
              disabled={isLoading}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition shadow-md ${
                isLoading
                  ? 'bg-cyan-500/50 text-slate-900 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 shadow-cyan-500/20'
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Thinking...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate</span>
                </>
              )}
            </button>
          </div>

          {/* Quick preset chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-[11px]">
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider shrink-0 mr-1">
              Presets:
            </span>
            {[
              { label: '🔥 Gen-Z Viral', prompt: 'Make it Gen-Z viral with internet slang, high energy, and emojis' },
              { label: '⚡ Short & Catchy', prompt: 'Short punchy 1-line caption that stops the scroll immediately' },
              { label: '💼 Professional Insight', prompt: 'Professional high-ROI breakdown with actionable frameworks' },
              { label: '📖 Storytelling Hook', prompt: 'Relatable personal storytelling with curiosity open-loop' },
              { label: '🦁 Gujarati Moj', prompt: 'Saurashtra Kathiawadi style moj caption with natural slang' },
              { label: '😂 Relatable Humor', prompt: 'Self-deprecating funny meme caption with high engagement' }
            ].map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setUserPrompt(p.prompt);
                  generateAllSuggestions();
                }}
                className="shrink-0 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-cyan-400/40 text-slate-300 hover:text-white transition"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Advanced collapsible filters */}
          {showAdvanced && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/5 animate-fade-in text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Content Type</label>
                <select
                  value={selectedType}
                  onChange={e => setSelectedType(e.target.value as any)}
                  className={`w-full p-2 rounded-xl border outline-none text-xs ${
                    isLight ? 'bg-white border-slate-300' : 'bg-slate-800 border-white/10 text-white'
                  }`}
                >
                  <option value="reel">Reel (Vertical 9:16)</option>
                  <option value="video">Video (Landscape 16:9)</option>
                  <option value="post">Image / Post</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Language</label>
                <select
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                  className={`w-full p-2 rounded-xl border outline-none text-xs ${
                    isLight ? 'bg-white border-slate-300' : 'bg-slate-800 border-white/10 text-white'
                  }`}
                >
                  <option value="auto">🌐 Auto Detect</option>
                  <option value="en">English (Gen-Z & Global)</option>
                  <option value="gu">Gujarati (ગુજરાતી / Gujrish)</option>
                  <option value="hi">Hindi (हिन्दी / Hinglish)</option>
                  <option value="mr">Marathi (मराठी)</option>
                  <option value="ta">Tamil (தமிழ்)</option>
                  <option value="te">Telugu (తెలుగు)</option>
                </select>
              </div>

              {(language === 'gu' || language === 'hi') && (
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Regional Dialect</label>
                  <select
                    value={dialect}
                    onChange={e => setDialect(e.target.value)}
                    className={`w-full p-2 rounded-xl border outline-none text-xs ${
                      isLight ? 'bg-white border-slate-300' : 'bg-slate-800 border-white/10 text-white'
                    }`}
                  >
                    {language === 'gu' ? (
                      <>
                        <option value="standard">Standard / Urban</option>
                        <option value="kathiawadi">Saurashtra / Kathiawadi (Moj)</option>
                        <option value="ahmedabad">Ahmedabad / Amdavad (Baka)</option>
                        <option value="surat">Surat (Surti Mijaaj)</option>
                      </>
                    ) : (
                      <>
                        <option value="standard">Standard Hinglish</option>
                        <option value="mumbai">Mumbai / Bambaiya (Bole toh)</option>
                        <option value="delhi">Delhi NCR (Scene sort hai)</option>
                      </>
                    )}
                  </select>
                </div>
              )}

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Audience</label>
                <select
                  value={audience}
                  onChange={e => setAudience(e.target.value)}
                  className={`w-full p-2 rounded-xl border outline-none text-xs ${
                    isLight ? 'bg-white border-slate-300' : 'bg-slate-800 border-white/10 text-white'
                  }`}
                >
                  <option value="general">General Community</option>
                  <option value="students">College Students</option>
                  <option value="creators">Creators & Influencers</option>
                  <option value="professionals">Founders & Professionals</option>
                  <option value="tech">Developers & Geeks</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Navigation tabs for suggestion categories */}
        <div
          className={`flex border-b px-4 sm:px-6 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-white/10'
          }`}
        >
          <button
            onClick={() => setActiveSection('captions')}
            className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition ${
              activeSection === 'captions'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Captions ({captions.length})</span>
          </button>

          <button
            onClick={() => setActiveSection('hashtags')}
            className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition ${
              activeSection === 'hashtags'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Hash className="w-4 h-4" />
            <span>
              Hashtags ({selectedHashtags.size} selected)
            </span>
          </button>

          {(selectedType === 'reel' || selectedType === 'video') && (
            <button
              onClick={() => setActiveSection('thumbnails')}
              className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition ${
                activeSection === 'thumbnails'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Thumbnails & Frames ({thumbnails.length})</span>
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {error && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
              <button
                onClick={() => generateAllSuggestions()}
                className="px-2.5 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 font-bold transition shrink-0"
              >
                Retry
              </button>
            </div>
          )}

          {/* 1. CAPTIONS VIEW */}
          {activeSection === 'captions' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Select a caption variant
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Click "Use This" or customize with inline editing
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRegenerateCaptions}
                  disabled={isRegeneratingCaptions}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRegeneratingCaptions ? 'animate-spin text-cyan-400' : ''}`} />
                  <span>Regenerate Captions</span>
                </button>
              </div>

              {isLoading && captions.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-3">
                  <Sparkles className="w-8 h-8 text-cyan-400 mx-auto animate-pulse" />
                  <p className="text-xs font-medium">Crafting tailored captions in your tone and dialect...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {captions.map((cap) => {
                    const isSelected = selectedCaptionId === cap.id;
                    const isEditing = editingCaptionId === cap.id;
                    const text = editedCaptions[cap.id] ?? cap.text;

                    return (
                      <div
                        key={cap.id}
                        onClick={() => setSelectedCaptionId(cap.id)}
                        className={`p-3.5 sm:p-4 rounded-2xl border transition cursor-pointer relative ${
                          isSelected
                            ? isLight
                              ? 'bg-cyan-50/70 border-cyan-400 ring-2 ring-cyan-400/20 shadow-sm'
                              : 'bg-cyan-950/30 border-cyan-400/60 ring-2 ring-cyan-400/20 shadow-md'
                            : isLight
                            ? 'bg-slate-50 border-slate-200 hover:border-slate-300'
                            : 'bg-slate-800/60 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected
                                  ? 'bg-cyan-500 border-cyan-500 text-slate-950'
                                  : 'border-slate-500'
                              }`}
                            >
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </span>
                            <span className="text-xs font-bold text-white font-display">
                              {cap.toneLabel}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">
                              {cap.badge}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                            <button
                              type="button"
                              onClick={() => {
                                if (isEditing) {
                                  setEditingCaptionId(null);
                                } else {
                                  setEditingCaptionId(cap.id);
                                }
                              }}
                              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition"
                              title="Edit caption"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => copyCaption(cap.id, text)}
                              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition flex items-center gap-1"
                              title="Copy to clipboard"
                            >
                              {copiedCaptionId === cap.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Caption Text or Textarea */}
                        {isEditing ? (
                          <div className="mt-2" onClick={e => e.stopPropagation()}>
                            <textarea
                              value={text}
                              onChange={e =>
                                setEditedCaptions({
                                  ...editedCaptions,
                                  [cap.id]: e.target.value
                                })
                              }
                              rows={3}
                              className={`w-full p-2.5 rounded-xl border text-xs outline-none ${
                                isLight ? 'bg-white border-slate-300' : 'bg-slate-900 border-white/20 text-white'
                              }`}
                            />
                            <div className="flex justify-end gap-2 mt-1.5">
                              <button
                                type="button"
                                onClick={() => setEditingCaptionId(null)}
                                className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-cyan-500 text-slate-950"
                              >
                                Done Editing
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line pl-6">
                            {text}
                          </p>
                        )}

                        <div className="mt-2 pl-6 flex items-center justify-between text-[10px] text-slate-400">
                          <span>Recommended for: {cap.recommendedFor}</span>
                          {isSelected && (
                            <span className="text-cyan-400 font-bold flex items-center gap-1">
                              Selected for post
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Modify Active Caption with AI Bar */}
              {selectedCaptionId && (
                <div
                  className={`p-3.5 rounded-2xl border space-y-2 mt-4 ${
                    isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950/60 border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Wand2 className="w-4 h-4 text-pink-400" />
                    <span className="text-xs font-bold text-white">Ask AI to modify selected caption</span>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={aiModifyInstruction}
                      onChange={e => setAiModifyInstruction(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleModifyCaption()}
                      placeholder="e.g. 'Make it shorter', 'Add Gujarati Kathiawadi slang', 'More emojis'..."
                      className={`flex-1 text-xs px-3 py-2 rounded-xl border outline-none ${
                        isLight ? 'bg-white border-slate-300' : 'bg-slate-800 border-white/10 text-white'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => handleModifyCaption()}
                      disabled={isModifyingCaption || !aiModifyInstruction.trim()}
                      className="px-3.5 py-2 rounded-xl bg-pink-500 hover:bg-pink-400 text-white font-bold text-xs transition flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {isModifyingCaption ? (
                        <RefreshCw className="w-3 h-3 animate-spin" />
                      ) : (
                        <Sparkles className="w-3 h-3" />
                      )}
                      <span>Refine</span>
                    </button>
                  </div>

                  {/* Quick refine chips */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {[
                      { label: '⚡ Punchier / Shorter', inst: 'make it shorter and punchier' },
                      { label: '🔥 More Gen-Z Slang', inst: 'add Gen-Z slang and viral energy' },
                      { label: '✨ Add Emojis', inst: 'add attractive emojis' },
                      { label: '🦁 Gujarati Flavor', inst: 'rewrite in authentic Saurashtra Kathiawadi style' },
                      { label: '💼 Professional Tone', inst: 'make it polished and professional' }
                    ].map((chip, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleModifyCaption(chip.inst)}
                        className="text-[10px] px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. HASHTAGS VIEW */}
          {activeSection === 'hashtags' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Categorized Hashtags
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Tap to toggle tags into your post ({selectedHashtags.size} selected)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copySelectedHashtags}
                    disabled={selectedHashtags.size === 0}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition disabled:opacity-50"
                  >
                    {copiedTags ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Selected</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleRegenerateHashtags}
                    disabled={isRegeneratingHashtags}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRegeneratingHashtags ? 'animate-spin text-cyan-400' : ''}`} />
                    <span>Regenerate</span>
                  </button>
                </div>
              </div>

              {/* Groups */}
              {[
                { key: 'relevant', title: 'Directly Relevant', desc: 'Direct topic & title keywords', tags: hashtags.relevant },
                { key: 'niche', title: 'Niche Subtopics', desc: 'High-intent specialized keywords', tags: hashtags.niche },
                { key: 'broad', title: 'Broad & Discoverability', desc: 'High-volume trending explore tags', tags: hashtags.broad },
                { key: 'regional', title: 'Regional & Cultural', desc: 'Language and regional dialect tags', tags: hashtags.regional }
              ].map((group) => {
                if (!group.tags || group.tags.length === 0) return null;
                const allSelected = group.tags.every(t => selectedHashtags.has(t));

                return (
                  <div
                    key={group.key}
                    className={`p-4 rounded-2xl border ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/40 border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <div>
                        <span className="text-xs font-bold text-white block">{group.title}</span>
                        <span className="text-[10px] text-slate-400">{group.desc}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleGroupHashtags(group.tags)}
                        className="text-[10px] font-bold text-cyan-400 hover:underline"
                      >
                        {allSelected ? 'Deselect All' : 'Select All'}
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {group.tags.map((tag) => {
                        const isSelected = selectedHashtags.has(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleHashtag(tag)}
                            className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                              isSelected
                                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                                : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                            }`}
                          >
                            <span>{tag}</span>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 3. THUMBNAILS & FRAMES VIEW */}
          {activeSection === 'thumbnails' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    AI Frame Moments & Thumbnail Hooks
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    High-retention visual frames and high-CTR text overlays
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRegenerateThumbnails}
                  disabled={isRegeneratingThumbnails}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRegeneratingThumbnails ? 'animate-spin text-cyan-400' : ''}`} />
                  <span>Regenerate Frames</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {thumbnails.map((thumb) => {
                  const isSelected = selectedThumbnailId === thumb.id;
                  const overlayText = customOverlayTexts[thumb.id] ?? thumb.suggestedOverlayText;

                  return (
                    <div
                      key={thumb.id}
                      onClick={() => setSelectedThumbnailId(thumb.id)}
                      className={`rounded-2xl border overflow-hidden cursor-pointer transition relative group ${
                        isSelected
                          ? 'border-cyan-400 ring-2 ring-cyan-400/30 shadow-lg'
                          : 'border-white/10 hover:border-white/20 bg-slate-800/50'
                      }`}
                    >
                      {/* Image Preview with overlay text mock */}
                      <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                        <img
                          src={thumb.previewUrl}
                          alt={thumb.frameType}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Timestamp badge */}
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono font-bold text-cyan-300 border border-white/10">
                          Frame: {thumb.timestamp}
                        </span>

                        {/* Selection check */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-lg">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}

                        {/* Simulated high-CTR overlay text on video */}
                        <div className="absolute bottom-2.5 left-2.5 right-2.5">
                          <span className="inline-block px-2.5 py-1 rounded-lg bg-yellow-400 text-slate-950 font-display font-extrabold text-xs shadow-lg uppercase tracking-tight">
                            {overlayText || thumb.suggestedOverlayText}
                          </span>
                        </div>
                      </div>

                      {/* Frame Details & Editable Overlay */}
                      <div className="p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{thumb.frameType}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed">{thumb.reason}</p>

                        <div className="pt-1.5" onClick={e => e.stopPropagation()}>
                          <label className="text-[10px] font-bold text-slate-400 block mb-1">
                            Edit Overlay Text:
                          </label>
                          <input
                            type="text"
                            value={overlayText}
                            onChange={e =>
                              setCustomOverlayTexts({
                                ...customOverlayTexts,
                                [thumb.id]: e.target.value
                              })
                            }
                            className={`w-full text-xs px-2.5 py-1.5 rounded-xl border outline-none ${
                              isLight ? 'bg-white border-slate-300' : 'bg-slate-900 border-white/20 text-white'
                            }`}
                          />
                        </div>

                        <div className="pt-1 flex justify-end">
                          <button
                            type="button"
                            onClick={() => setSelectedThumbnailId(thumb.id)}
                            className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                              isSelected
                                ? 'bg-cyan-500 text-slate-950'
                                : 'bg-white/10 hover:bg-white/20 text-white'
                            }`}
                          >
                            {isSelected ? 'Frame Selected ✓' : 'Select This Frame'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer with summary and action buttons */}
        <div
          className={`p-3.5 sm:p-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-white/10'
          }`}
        >
          {/* Summary badges */}
          <div className="flex items-center gap-2 flex-wrap text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Ready to apply:</span>
            <span className="px-2 py-0.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[11px] font-medium">
              {selectedCaptionId ? '✓ Caption chosen' : 'Original title'}
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[11px] font-medium">
              ✓ {selectedHashtags.size} hashtags
            </span>
            {(selectedType === 'reel' || selectedType === 'video') && selectedThumbnail && (
              <span className="px-2 py-0.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[11px] font-medium">
                ✓ Frame ({selectedThumbnail.timestamp})
              </span>
            )}
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className={`px-5 py-2.5 rounded-2xl ${theme.buttonClass} text-xs font-extrabold shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition active:scale-95`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Apply to Post ✨</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
