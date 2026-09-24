import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Sparkles,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Bot,
  Play,
  UserCheck,
  RefreshCw,
  Compass,
  Smile,
  Shield,
  Radio,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { sounds } from '../utils/sound';

interface AvatarMessage {
  id: string;
  sender: 'user' | 'avatar';
  text: string;
  timestamp: string;
  recommendations?: Array<{
    id: string;
    title: string;
    category?: string;
    creatorHandle?: string;
  }>;
}

interface AvatarPersona {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  description: string;
  accentColor: string;
  badge: string;
}

export const AIAvatarModal: React.FC = () => {
  const {
    closeModal,
    selectedMood,
    selectedCategory,
    userProfile,
    reels,
    setCurrentReelIndex,
    setCurrentPage,
    language,
    t
  } = useApp();

  const currentMood = userProfile?.current_mood || selectedMood || 'Happy';

  // Preset Personas for Digital Twin
  const personas: AvatarPersona[] = [
    {
      id: 'twin',
      name: userProfile?.name ? `${userProfile.name}'s Twin` : 'Nova Digital Twin',
      role: 'Personal AI Entertainment Twin',
      avatarUrl: userProfile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      description: 'Learns your tastes, mood, and watch habits to curate your ideal content stream.',
      accentColor: 'from-cyan-500 to-violet-600',
      badge: 'Your Digital Twin'
    },
    {
      id: 'nova',
      name: 'Nova AI Avatar',
      role: 'Autonomous Content Curator',
      avatarUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=150&auto=format&fit=crop&q=80',
      description: 'High-energy, empathetic AI guide specialized in discovering hidden viral gems.',
      accentColor: 'from-violet-500 to-fuchsia-600',
      badge: 'Official Avatar'
    },
    {
      id: 'zen',
      name: 'Zen Guide',
      role: 'Mindful Lifestyle Avatar',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      description: 'Focuses on cortisol reset, breathing exercises, and balanced screen time.',
      accentColor: 'from-emerald-500 to-teal-600',
      badge: 'Detox Twin'
    }
  ];

  const [activePersonaId, setActivePersonaId] = useState<string>('twin');
  const activePersona = personas.find(p => p.id === activePersonaId) || personas[0];

  const [messages, setMessages] = useState<AvatarMessage[]>(() => [
    {
      id: 'init-msg',
      sender: 'avatar',
      text: `Hello ${userProfile?.name || 'there'}! I'm your AI Avatar & Digital Twin. I adapt dynamically to your current mood (${currentMood}) and top interests (${userProfile?.category || selectedCategory || 'Tech & AI'}). Ask me anything, or tap "What should I watch right now?" for a personalized recommendation!`,
      timestamp: 'Just now'
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [autoSpeak, setAutoSpeak] = useState<boolean>(() => {
    try {
      return localStorage.getItem('zynqo_avatar_autospeak') === 'true';
    } catch (e) {
      return false;
    }
  });
  const [isListening, setIsListening] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Quick prompt suggestions
  const quickPrompts = [
    'What should I watch right now?',
    'Suggest something for my current mood',
    'How does my Digital Twin personalize reels?',
    'Give me a quick 2-minute motivation boost'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        stopSpeaking();
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingMessageId(null);
  };

  // Text-To-Speech implementation using Google TTS POST proxy with Web Speech API fallback
  const speakText = async (text: string, msgId: string) => {
    stopSpeaking();

    if (speakingMessageId === msgId) {
      return;
    }

    setSpeakingMessageId(msgId);

    // Clean text of markdown asterisks, backticks, emojis, URLs
    const cleanText = text
      .replace(/[*_#`~[\]()]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .trim();

    if (!cleanText) {
      setSpeakingMessageId(null);
      return;
    }

    try {
      const res = await fetch('/api/ai/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: cleanText,
          lang: language || 'en'
        })
      });

      if (!res.ok) {
        throw new Error(`TTS server responded with ${res.status}`);
      }

      const blob = await res.blob();
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setSpeakingMessageId(null);
        audioRef.current = null;
        URL.revokeObjectURL(audioUrl);
      };

      audio.onerror = () => {
        setSpeakingMessageId(null);
        URL.revokeObjectURL(audioUrl);
      };

      await audio.play();
    } catch (err) {
      console.warn('Google TTS failed, falling back to Web Speech API:', err);
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = language === 'gu' ? 'gu-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
        utterance.onend = () => setSpeakingMessageId(null);
        utterance.onerror = () => setSpeakingMessageId(null);
        window.speechSynthesis.speak(utterance);
      } else {
        setSpeakingMessageId(null);
      }
    }
  };

  // Toggle voice recognition
  const toggleSpeechRecognition = () => {
    sounds.playClick();
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported by your current browser.');
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'gu' ? 'gu-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputValue(transcript);
          handleSendMessage(transcript);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  // Send message and query AI Avatar backend/client
  const handleSendMessage = async (queryText?: string) => {
    const textToSend = (queryText !== undefined ? queryText : inputValue).trim();
    if (!textToSend || isGenerating) return;

    sounds.playClick();
    setInputValue('');

    const userMsgId = `user-${Date.now()}`;
    const userMsg: AvatarMessage = {
      id: userMsgId,
      sender: 'user',
      text: textToSend,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setIsGenerating(true);

    try {
      // Send query to backend AI Avatar endpoint
      const res = await fetch('/api/ai/avatar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          persona: activePersonaId,
          context: {
            mood: currentMood,
            category: userProfile?.category || selectedCategory || 'Tech & AI',
            userName: userProfile?.name || 'Creator',
            language: language || 'en'
          }
        })
      });

      let aiReply = '';
      let recommendations: AvatarMessage['recommendations'] = undefined;

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          aiReply = data.reply;
        }
        if (Array.isArray(data.recommendations) && data.recommendations.length > 0) {
          recommendations = data.recommendations;
        }
      }

      // Robust fallback if network or endpoint unavailable
      if (!aiReply) {
        const lower = textToSend.toLowerCase();
        if (lower.includes('watch') || lower.includes('recommend') || lower.includes('suggest') || lower.includes('entertainment')) {
          // Matching prompt example
          const matchingReels = reels.filter(r =>
            (r.category && r.category.toLowerCase().includes((selectedCategory || '').toLowerCase())) ||
            (r.mood && r.mood.toLowerCase().includes(currentMood.toLowerCase())) ||
            (r.goalTags && r.goalTags.some(g => g.toLowerCase().includes(currentMood.toLowerCase())))
          );
          const topRecs = (matchingReels.length > 0 ? matchingReels : reels).slice(0, 2);

          const r1 = topRecs[0];
          const r2 = topRecs[1] || topRecs[0];

          aiReply = `Based on your current mood (${currentMood}) and interests, here are some entertainment options:\n\n1. 🎬 **${r1 ? r1.title : 'Mastering Atomic Focus'}** by @${r1?.creator?.handle || 'creator'}\n2. 💡 **${r2 ? r2.title : 'Quick Mindset Shift'}** by @${r2?.creator?.handle || 'creator'}\n\nTap below to jump into the reel!`;

          recommendations = topRecs.map(r => ({
            id: r.id,
            title: r.title,
            category: r.category,
            creatorHandle: r.creator?.handle
          }));
        } else if (lower.includes('motivation') || lower.includes('inspire')) {
          aiReply = `Discipline always beats motivation! You've already made notable progress today. Focus on completing just one high-leverage micro-task right now! 🚀`;
        } else {
          aiReply = `I'm tuned to your profile and entertainment goals. As your Digital Twin, I filter noise so you only watch content that enriches your day. What else would you like to explore? ✨`;
        }
      }

      const avatarMsgId = `avatar-${Date.now()}`;
      const avatarMsg: AvatarMessage = {
        id: avatarMsgId,
        sender: 'avatar',
        text: aiReply,
        timestamp: 'Just now',
        recommendations
      };

      setMessages(prev => [...prev, avatarMsg]);
      sounds.playSuccess();

      // Trigger automatic TTS if enabled
      if (autoSpeak) {
        speakText(aiReply, avatarMsgId);
      }
    } catch (err) {
      console.warn('AI Avatar generation notice:', err);
      const fallbackMsgId = `avatar-${Date.now()}`;
      const fallbackReply = `Based on your current mood (${currentMood}) and interests, here are some entertainment options:\n\n1. 🎬 **Atomic Habits for Focus**\n2. 💡 **Relaxing Soundscapes**\n\nTap below to explore!`;
      setMessages(prev => [
        ...prev,
        {
          id: fallbackMsgId,
          sender: 'avatar',
          text: fallbackReply,
          timestamp: 'Just now'
        }
      ]);
      if (autoSpeak) {
        speakText(fallbackReply, fallbackMsgId);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  // Jump directly to recommended reel
  const handleWatchReel = (reelId: string) => {
    sounds.playClick();
    stopSpeaking();
    const idx = reels.findIndex(r => r.id === reelId);
    if (idx !== -1) {
      setCurrentReelIndex(idx);
    }
    setCurrentPage('feed');
    closeModal();
  };

  const isSpeakingNow = speakingMessageId !== null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          stopSpeaking();
          closeModal();
        }
      }}
    >
      <div className="bg-slate-900/95 border border-white/15 rounded-3xl w-full max-w-xl md:max-w-2xl max-h-[92dvh] h-[88vh] flex flex-col shadow-2xl overflow-hidden select-none">
        
        {/* Header */}
        <div className="p-3.5 sm:p-4 md:p-5 border-b border-white/10 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr ${activePersona.accentColor} flex items-center justify-center text-white shadow-lg p-0.5`}>
                <img
                  src={activePersona.avatarUrl}
                  alt={activePersona.name}
                  className="w-full h-full object-cover rounded-2xl"
                  onError={(e) => {
                    // Fallback to bot icon if image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-slate-950 ${
                isSpeakingNow ? 'bg-cyan-400 animate-ping' : 'bg-emerald-400'
              }`} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                  {activePersona.name}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {activePersona.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <span>{activePersona.role}</span>
                <span>•</span>
                <span className="text-cyan-400 font-medium">Mood: {currentMood}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Auto-speak Toggle */}
            <button
              onClick={() => {
                sounds.playClick();
                const nextVal = !autoSpeak;
                setAutoSpeak(nextVal);
                try {
                  localStorage.setItem('zynqo_avatar_autospeak', String(nextVal));
                } catch (e) {}
              }}
              className={`p-2 rounded-xl text-xs flex items-center gap-1.5 transition ${
                autoSpeak
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
              title={autoSpeak ? 'Auto-Voice Enabled' : 'Auto-Voice Muted'}
            >
              {autoSpeak ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
              <span className="text-[10px] hidden sm:inline">{autoSpeak ? 'Voice ON' : 'Voice OFF'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                stopSpeaking();
                closeModal();
              }}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Persona Switcher Chips */}
        <div className="px-3.5 py-2 border-b border-white/5 bg-slate-950/40 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 whitespace-nowrap pl-1">
            Persona:
          </span>
          {personas.map((p) => {
            const isSelected = p.id === activePersonaId;
            return (
              <button
                key={p.id}
                onClick={() => {
                  sounds.playClick();
                  setActivePersonaId(p.id);
                }}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition whitespace-nowrap ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500/25 to-violet-500/25 text-white border border-cyan-400/50 shadow-sm'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-transparent'
                }`}
              >
                <img
                  src={p.avatarUrl}
                  alt={p.name}
                  className="w-3.5 h-3.5 rounded-full object-cover"
                />
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* Chat / Interaction Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {/* Avatar Visual Spotlight Card */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-slate-950/80 via-cyan-950/20 to-slate-900/60 border border-white/10 flex items-center gap-4 shadow-inner">
            <div className="relative flex-shrink-0">
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden ring-2 ${
                isSpeakingNow
                  ? 'ring-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.45)]'
                  : 'ring-white/20'
              } transition-all duration-300`}>
                <img
                  src={activePersona.avatarUrl}
                  alt={activePersona.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Animated Waveform when speaking */}
              {isSpeakingNow && (
                <div className="absolute -bottom-1 -right-1 bg-slate-950/90 rounded-lg px-1.5 py-0.5 border border-cyan-400/40 flex items-center gap-0.5 shadow-md">
                  <span className="w-0.5 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-0.5 h-3 bg-violet-400 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-0.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                  {activePersona.name}
                </h4>
                <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active Twin
                </span>
              </div>
              <p className="text-[11px] text-slate-300 line-clamp-2 mt-0.5">
                {activePersona.description}
              </p>
              <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-400">
                <span className="flex items-center gap-1 text-cyan-300">
                  <Smile className="w-3 h-3" /> Mood: {currentMood}
                </span>
                <span className="flex items-center gap-1 text-violet-300">
                  <Compass className="w-3 h-3" /> {userProfile?.category || 'Tech & AI'}
                </span>
              </div>
            </div>
          </div>

          {/* Messages Log */}
          <div className="space-y-3 pt-1">
            {messages.map((msg) => {
              const isAvatar = msg.sender === 'avatar';
              const isThisSpeaking = speakingMessageId === msg.id;

              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isAvatar ? 'justify-start' : 'justify-end'}`}
                >
                  {isAvatar && (
                    <div className="w-7 h-7 rounded-xl overflow-hidden flex-shrink-0 mt-0.5 ring-1 ring-cyan-500/40">
                      <img
                        src={activePersona.avatarUrl}
                        alt={activePersona.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className={`max-w-[85%] sm:max-w-[78%] flex flex-col ${isAvatar ? 'items-start' : 'items-end'}`}>
                    <div
                      className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-md ${
                        isAvatar
                          ? 'bg-slate-800/80 text-slate-100 border border-white/10 rounded-tl-sm'
                          : 'bg-gradient-to-r from-cyan-600 to-violet-600 text-white font-medium rounded-tr-sm'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.text}</div>

                      {/* Reel Recommendation Chips if present */}
                      {msg.recommendations && msg.recommendations.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-white/10 space-y-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 block">
                            Recommended for you:
                          </span>
                          {msg.recommendations.map((rec) => (
                            <button
                              key={rec.id}
                              onClick={() => handleWatchReel(rec.id)}
                              className="w-full text-left p-2 rounded-xl bg-slate-900/80 hover:bg-cyan-950/50 border border-cyan-500/30 hover:border-cyan-400 transition flex items-center justify-between group"
                            >
                              <div className="flex items-center gap-2 truncate pr-2">
                                <div className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-300 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500 group-hover:text-slate-950 transition">
                                  <Play className="w-2.5 h-2.5 fill-current" />
                                </div>
                                <span className="text-xs font-semibold text-white group-hover:text-cyan-300 truncate">
                                  {rec.title}
                                </span>
                              </div>
                              <span className="text-[10px] text-cyan-400/80 whitespace-nowrap">
                                Watch now →
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer / TTS Button for Avatar */}
                    {isAvatar && (
                      <div className="flex items-center gap-2 mt-1 px-1">
                        <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                        <button
                          onClick={() => speakText(msg.text, msg.id)}
                          className={`text-[10px] font-medium flex items-center gap-1 transition ${
                            isThisSpeaking
                              ? 'text-cyan-300 animate-pulse font-bold'
                              : 'text-slate-400 hover:text-white'
                          }`}
                          title={isThisSpeaking ? 'Stop Voice' : 'Listen with Text-to-Speech'}
                        >
                          {isThisSpeaking ? (
                            <>
                              <VolumeX className="w-3 h-3 text-cyan-400" />
                              <span>Stop voice</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3 text-slate-400 hover:text-cyan-400" />
                              <span>Listen</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Thinking / Generating Indicator */}
            {isGenerating && (
              <div className="flex gap-2.5 items-start">
                <div className="w-7 h-7 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-cyan-500/40">
                  <img
                    src={activePersona.avatarUrl}
                    alt={activePersona.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-white/10 rounded-tl-sm flex items-center gap-2 text-xs text-cyan-300">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>{activePersona.name} is formulating a response...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-3.5 sm:px-4 py-2 bg-slate-950/50 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              disabled={isGenerating}
              className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-200 border border-white/10 hover:border-cyan-500/30 whitespace-nowrap transition disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-white/10 bg-slate-950/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            {/* Voice Mic Button */}
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              className={`p-2.5 rounded-xl transition flex items-center justify-center flex-shrink-0 ${
                isListening
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_#06b6d4] scale-105'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
              title={isListening ? 'Listening... Click to stop' : 'Ask via Voice Speech-to-Text'}
            >
              {isListening ? <Mic className="w-4 h-4 animate-bounce" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Ask ${activePersona.name} (e.g. "What should I watch right now?")...`}
              disabled={isGenerating}
              className="flex-1 bg-slate-900 border border-white/15 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputValue.trim() || isGenerating}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-md flex-shrink-0"
            >
              <Send className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">Ask</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
