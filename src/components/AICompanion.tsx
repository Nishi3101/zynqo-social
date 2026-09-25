import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Bot, 
  HelpCircle, 
  Shuffle, 
  Compass, 
  BookOpen,
  Volume2,
  VolumeX,
  Radio
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getLocalizedReel } from '../utils/translations';
import { clientCompanionChat } from '../utils/aiClientEngine';
import { sounds } from '../utils/sound';
import { triggerHaptic } from '../utils/nativeBridge';

export type VoiceState = 'idle' | 'listening' | 'processing' | 'speaking' | 'error';

interface Message {
  id: string;
  sender: 'user' | 'zyno' | 'nova';
  text: string;
  timestamp: string;
  languageAnalysis?: any;
}

export const AICompanion: React.FC = () => {
  const { currentReel, intent, openModal, closeModal, activeModal, setIntent, t, language, reels, setCurrentReelIndex, setCurrentPage } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (activeModal === 'aiCompanion') {
      setIsOpen(true);
    }
  }, [activeModal]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(true);
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [voiceErrorMsg, setVoiceErrorMsg] = useState<string | null>(null);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const keepAliveTimerRef = useRef<any>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const speechLangMap: Record<string, string> = {
    gu: 'gu-IN',
    hi: 'hi-IN',
    sa: 'sa-IN',
    mr: 'mr-IN',
    te: 'te-IN',
    es: 'es-ES',
    fr: 'fr-FR',
    ja: 'ja-JP',
    de: 'de-DE',
    en: 'en-US'
  };

  // Preload and monitor available voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        try {
          const v = window.speechSynthesis.getVoices();
          if (v && v.length > 0) setVoices(v);
        } catch (e) {}
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const stopSpeaking = () => {
    if (keepAliveTimerRef.current) {
      clearInterval(keepAliveTimerRef.current);
      keepAliveTimerRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
    activeUtteranceRef.current = null;
    try {
      (window as any).__zyno_active_utterance = null;
    } catch (e) {}
    setSpeakingMessageId(null);
    setVoiceState(prev => (prev === 'speaking' ? 'idle' : prev));
  };

  // Keeps Chrome from pausing SpeechSynthesis mid-sentence
  const startKeepAlive = () => {
    if (keepAliveTimerRef.current) clearInterval(keepAliveTimerRef.current);
    keepAliveTimerRef.current = setInterval(() => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }
    }, 4000);
  };

  // Unlock device audio context on user tap or click
  const unlockAudio = () => {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        try {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
        } catch (e) {}
      }
      sounds.playClick();
    }
  };

  const cleanForSpeech = (text: string) => {
    return (text || '')
      .replace(/[*_#`~[\]()]/g, ' ')
      .replace(/https?:\/\/\S+/g, ' ')
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const getSpokenSnippet = (clean: string): string => {
    if (clean.length <= 220) return clean;
    const sentences = clean.match(/[^.!?]+[.!?]+(\s|$)/g);
    if (sentences && sentences.length > 0) {
      let snippet = '';
      for (const s of sentences) {
        if ((snippet + s).length <= 220) {
          snippet += s;
        } else {
          break;
        }
      }
      if (snippet.trim()) return snippet.trim();
    }
    return clean.slice(0, 200).trim() + '...';
  };

  // Direct, zero-latency Web Speech synthesis with Chrome GC protection
  const speakText = (text: string, msgId?: string) => {
    if (speakingMessageId === msgId) {
      stopSpeaking();
      return;
    }

    stopSpeaking();

    const clean = cleanForSpeech(text);
    if (!clean) {
      setSpeakingMessageId(null);
      setVoiceState('idle');
      return;
    }

    const spokenText = getSpokenSnippet(clean);

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setVoiceState('idle');
      return;
    }

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utterance = new SpeechSynthesisUtterance(spokenText);
      const targetLang = speechLangMap[language] || 'en-US';
      utterance.lang = targetLang;
      utterance.rate = 1.0;
      utterance.pitch = 1.05;
      utterance.volume = 1.0;

      const voiceList = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
      if (voiceList && voiceList.length > 0) {
        const exactMatch = voiceList.find(v => v.lang === targetLang);
        const prefixMatch = voiceList.find(v => v.lang.startsWith(targetLang.slice(0, 2)));
        const fallbackMatch = voiceList.find(v => v.lang.startsWith('en'));
        const chosen = exactMatch || prefixMatch || fallbackMatch;
        if (chosen) utterance.voice = chosen;
      }

      utterance.onstart = () => {
        setVoiceState('speaking');
        if (msgId) setSpeakingMessageId(msgId);
        startKeepAlive();
      };

      utterance.onend = () => {
        if (keepAliveTimerRef.current) {
          clearInterval(keepAliveTimerRef.current);
          keepAliveTimerRef.current = null;
        }
        activeUtteranceRef.current = null;
        try { (window as any).__zyno_active_utterance = null; } catch (e) {}
        setSpeakingMessageId(null);
        setVoiceState('idle');
      };

      utterance.onerror = (e) => {
        if (keepAliveTimerRef.current) {
          clearInterval(keepAliveTimerRef.current);
          keepAliveTimerRef.current = null;
        }
        activeUtteranceRef.current = null;
        try { (window as any).__zyno_active_utterance = null; } catch (e) {}
        setSpeakingMessageId(null);
        setVoiceState('idle');
        console.warn('[Zyno Speech] Utterance event error:', e);
      };

      activeUtteranceRef.current = utterance;
      (window as any).__zyno_active_utterance = utterance;

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('[Zyno Speech] Synthesis error:', err);
      if (keepAliveTimerRef.current) {
        clearInterval(keepAliveTimerRef.current);
        keepAliveTimerRef.current = null;
      }
      setSpeakingMessageId(null);
      setVoiceState('idle');
    }
  };

  // Stop speaking on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  // Initialize or update greeting when language or intent changes - PRESERVES existing conversation!
  useEffect(() => {
    const greetingText = t.companion?.greeting || 
      `Hello! I'm Zyno, your AI Entertainment Companion. I'm tuned to your "${intent}" mode. Ask me anything about what you're watching, or tell me what you want to achieve today!`;

    setMessages(prev => {
      if (prev.length > 0) return prev;
      return [
        {
          id: `m-init-${language}`,
          sender: 'zyno',
          text: greetingText,
          timestamp: 'Just now'
        }
      ];
    });
  }, [language, intent, t.companion?.greeting]);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string, isVoiceQuery?: boolean) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    // Ensure drawer is open so user sees both their question and Zyno's response
    setIsOpen(true);
    if (activeModal !== 'aiCompanion') {
      openModal('aiCompanion');
    }

    // Unlock device audio pipeline on user gesture
    unlockAudio();
    triggerHaptic('light');

    if (isVoiceQuery) {
      setVoiceState('processing');
      setVoiceErrorMsg(null);
    }

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    const localizedReel = currentReel ? getLocalizedReel(currentReel, language) : null;

    // Multi-turn conversational context payload
    const conversationHistory = [...messages, userMsg].slice(-8).map(m => ({
      sender: m.sender,
      role: m.sender === 'user' ? 'user' : 'model',
      text: m.text
    }));

    try {
      let data: any = null;
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1200);

        const res = await fetch('/api/ai/companion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            message: text.trim(),
            context: {
              currentReel: localizedReel || currentReel,
              intent,
              remainingMinutes: 5,
              language,
              history: conversationHistory
            }
          })
        });
        clearTimeout(timeoutId);
        if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
          data = await res.json();
        }
      } catch (networkErr) {
        // Fallback gracefully without hanging
      }

      if (!data || !data.success || !data.reply || typeof data.reply !== 'string' || !data.reply.trim()) {
        data = await clientCompanionChat(text.trim(), {
          currentReel: localizedReel || currentReel,
          intent,
          remainingMinutes: 5,
          language,
          history: conversationHistory
        });
      }

      setIsTyping(false);

      const replyText = (data && data.reply && typeof data.reply === 'string' && data.reply.trim())
        ? data.reply.trim()
        : `Hello! I'm Zyno, your AI Companion on Zynqo Social. How can I help you today? Feel free to ask about this reel, explore quizzes, or ask any question!`;

      const zynoMsg: Message = {
        id: `zyno-${Date.now()}`,
        sender: 'zyno',
        text: replyText,
        timestamp: 'Just now',
        languageAnalysis: data?.languageAnalysis
      };
      setMessages(prev => [...prev, zynoMsg]);

      // Play soft confirmation chime & speak aloud
      sounds.playZynoChime();
      if (isVoiceMode !== false) {
        speakText(replyText, zynoMsg.id);
      } else {
        setVoiceState('idle');
      }

      // Trigger action callbacks if requested
      if (data.action === 'SWITCH_REEL' && data.targetReelId) {
        const targetIdx = reels.findIndex(r => r.id === data.targetReelId);
        if (targetIdx !== -1) {
          setCurrentPage('feed');
          setCurrentReelIndex(targetIdx);
        }
      } else if (data.action === 'OPEN_QUIZ') {
        if (data.targetReelId) {
          const targetIdx = reels.findIndex(r => r.id === data.targetReelId);
          if (targetIdx !== -1) {
            setCurrentPage('feed');
            setCurrentReelIndex(targetIdx);
          }
        }
        openModal('makeUseful');
      } else if (data.action === 'PLAN_SESSION') {
        openModal('timeSession');
      } else if (data && data.action === 'EXPLAIN_SIMPLE') {
        if (data.targetReelId) {
          const targetIdx = reels.findIndex(r => r.id === data.targetReelId);
          if (targetIdx !== -1) {
            setCurrentPage('feed');
            setCurrentReelIndex(targetIdx);
          }
        }
      }
    } catch (err) {
      setIsTyping(false);
      if (isVoiceQuery) {
        setVoiceState('error');
        setVoiceErrorMsg('Failed to reach AI service. Please try again.');
      }
      setMessages(prev => [
        ...prev,
        {
          id: `zyno-err-${Date.now()}`,
          sender: 'zyno',
          text: t.companion?.errorFallback || `I'm here! Let me know if you want notes, quizzes, or a structured session on this topic.`,
          timestamp: 'Just now'
        }
      ]);
    }
  };

  // Voice speech-to-text integration using Web Speech API mapped to current language with Interrupt capability
  const toggleSpeechRecognition = () => {
    // Immediate Interrupt: If AI is speaking, stop speaking immediately!
    if (speakingMessageId || voiceState === 'speaking') {
      stopSpeaking();
      return;
    }

    unlockAudio();
    setIsOpen(true);
    if (activeModal !== 'aiCompanion') {
      openModal('aiCompanion');
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceState('error');
      setVoiceErrorMsg(t.companion?.speechNotSupported || 'Voice recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening || voiceState === 'listening') {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      setIsListening(false);
      setVoiceState('idle');
      return;
    }

    setVoiceErrorMsg(null);
    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = speechLangMap[language] || 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceState('listening');
      };

      recognition.onend = () => {
        setIsListening(false);
        setVoiceState(prev => (prev === 'listening' ? 'idle' : prev));
      };

      recognition.onerror = (e: any) => {
        setIsListening(false);
        const errType = e?.error;
        console.warn('Speech recognition error event:', errType);
        if (errType === 'not-allowed') {
          setVoiceState('error');
          setVoiceErrorMsg('Microphone access denied. Please grant microphone permission in your browser.');
        } else if (errType === 'no-speech') {
          setVoiceState('idle');
        } else if (errType === 'audio-capture') {
          setVoiceState('error');
          setVoiceErrorMsg('No microphone detected. Please plug in or connect a microphone.');
        } else if (errType === 'network') {
          setVoiceState('error');
          setVoiceErrorMsg('Network error occurred during voice recognition.');
        } else {
          setVoiceState('idle');
        }
      };

      recognition.onresult = (e: any) => {
        const speechText = e.results[0]?.[0]?.transcript;
        if (speechText && speechText.trim()) {
          setInputValue(speechText);
          handleSendMessage(speechText, true);
        } else {
          setVoiceState('idle');
        }
      };

      recognition.start();
    } catch (err: any) {
      console.warn('Failed to start speech recognition:', err);
      setVoiceState('error');
      setVoiceErrorMsg('Could not access microphone. Please check permissions.');
    }
  };

  const localizedCurrentReel = currentReel ? getLocalizedReel(currentReel, language) : null;

  const thinkingTextMap: Record<string, string> = {
    gu: 'ઝાયનો વિચારી રહ્યો છે...',
    hi: 'ज़ायनो सोच रहा है...',
    es: 'Zyno está pensando...',
    fr: 'Zyno réfléchit...',
    ja: 'Zynoが考え中...',
    de: 'Zyno denkt nach...',
    en: 'Zyno is thinking...'
  };

  return (
    <>
      {/* Floating Liquid Glass Bubble Capsule Trigger - Prominently Visible Above Mobile Nav & Desktop Sidebar */}
      <div className="fixed bottom-20 left-3 md:bottom-6 md:left-24 lg:left-[304px] z-50 pb-safe transition-all duration-300 select-none">
        <div className="liquid-glass-dock rounded-full p-1.5 flex items-center gap-1.5 shadow-2xl backdrop-blur-2xl border border-white/20 bg-slate-950/85">
          {/* Main Zyno Active Liquid Bubble */}
          <button
            onClick={() => {
              unlockAudio();
              setIsOpen(prev => !prev);
              if (!isOpen && activeModal !== 'aiCompanion') {
                openModal('aiCompanion');
              }
            }}
            className={`group relative px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2 transition-all duration-300 cursor-pointer overflow-hidden ${
              isOpen
                ? 'liquid-glass-bubble prismatic-rim animate-chromatic-shimmer text-white shadow-lg'
                : 'liquid-glass-bubble prismatic-rim hover:scale-105 active:scale-95 text-white'
            }`}
            title={t.companion?.name || "Zyno AI Companion"}
          >
            <span className="specular-lens" />
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-500 flex items-center justify-center flex-shrink-0 shadow-sm shadow-cyan-400/50 relative z-10">
              <Bot className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
            </div>
            <span className="text-xs font-bold tracking-wide inline text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] relative z-10">
              {t.companion?.name ? t.companion.name.split(' ')[0] : 'Zyno'}
            </span>

            {/* Glowing Green Notification Badge */}
            <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500 text-[10px] font-black text-white shadow-[0_0_10px_#10b981] ml-0.5 relative z-10 animate-pulse">
              1
            </span>
          </button>

          {/* Quick Voice Mode Bubble */}
          <button
            onClick={() => {
              unlockAudio();
              setIsOpen(true);
              if (activeModal !== 'aiCompanion') {
                openModal('aiCompanion');
              }
              if (speakingMessageId || voiceState === 'speaking') {
                stopSpeaking();
              } else {
                toggleSpeechRecognition();
              }
            }}
            className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center relative overflow-hidden ${
              voiceState === 'listening'
                ? 'liquid-glass-bubble prismatic-rim animate-chromatic-shimmer text-cyan-300 scale-110 shadow-[0_0_14px_#06b6d4]'
                : voiceState === 'speaking'
                ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/50 scale-105 shadow-[0_0_12px_#10b981]'
                : voiceState === 'processing'
                ? 'bg-violet-500/30 text-violet-300 border border-violet-400/50 scale-105 shadow-[0_0_12px_#8b5cf6]'
                : 'hover:bg-white/10 text-slate-400 hover:text-white'
            }`}
            title={
              voiceState === 'listening'
                ? "Listening... Tap to stop"
                : voiceState === 'speaking'
                ? "Zyno is speaking... Tap to interrupt"
                : voiceState === 'processing'
                ? "Thinking..."
                : "Talk to Zyno (Voice)"
            }
          >
            {voiceState === 'listening' && <span className="specular-lens" />}
            {voiceState === 'listening' ? (
              <Mic className="w-4 h-4 text-cyan-400 animate-bounce relative z-10" />
            ) : voiceState === 'speaking' ? (
              <Volume2 className="w-4 h-4 text-emerald-300 animate-pulse relative z-10" />
            ) : voiceState === 'processing' ? (
              <Bot className="w-4 h-4 text-violet-400 animate-spin relative z-10" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </button>

          {/* Quick Superpower Quiz Mini-Bubble */}
          <button
            onClick={() => {
              unlockAudio();
              setIsOpen(true);
              if (activeModal !== 'aiCompanion') {
                openModal('aiCompanion');
              }
              handleSendMessage(t.companion?.quizMe || 'Quiz Me', true);
            }}
            className="hidden lg:flex px-2.5 py-1.5 rounded-full text-[11px] font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition items-center gap-1"
            title="Ask for a 3-question speed quiz"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Quiz</span>
          </button>
        </div>
      </div>

      {/* Expanded Chat Drawer */}
      {isOpen && (
        <div className="fixed inset-x-2 sm:inset-x-4 bottom-20 md:bottom-20 md:left-24 lg:left-[304px] md:right-auto md:w-96 z-50 max-h-[calc(100dvh-110px)] h-[72vh] bg-slate-900/95 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-scale-in pb-safe">
          {/* Header */}
          <div className="p-4 border-b border-white/10 bg-slate-950/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-violet-500 flex items-center justify-center text-slate-950 font-black">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-xs md:text-sm font-bold text-white flex items-center gap-1.5">
                  {t.companion?.name || 'Zyno AI Companion'}
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </h3>
                <p className="text-[10px] text-cyan-300 capitalize">
                  {t.companion?.context || 'Context'}: {localizedCurrentReel ? localizedCurrentReel.title.slice(0, 24) + '...' : (t.intents[intent] || intent)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Voice Mode Toggle (Speaking Aloud) */}
              <button
                onClick={() => {
                  if (isVoiceMode) {
                    stopSpeaking();
                    setIsVoiceMode(false);
                  } else {
                    setIsVoiceMode(true);
                  }
                }}
                className={`p-1.5 rounded-xl text-xs flex items-center gap-1 transition ${
                  isVoiceMode
                    ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
                title={isVoiceMode ? (t.companion?.voiceModeOn || 'Voice Mode ON') : (t.companion?.voiceModeOff || 'Voice Mode OFF')}
              >
                {isVoiceMode ? <Volume2 className="w-4 h-4 text-cyan-300 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
                <span className="text-[10px] hidden sm:inline">{t.companion?.voiceMode || 'Voice'}</span>
              </button>

              {/* AI Avatar Demo Trigger */}
              <button
                onClick={() => {
                  stopSpeaking();
                  setIsOpen(false);
                  openModal('aiAvatar');
                }}
                className="p-1.5 rounded-xl text-xs flex items-center gap-1 text-cyan-300 hover:text-white hover:bg-white/10 transition"
                title="AI Avatar & Digital Twin Demo"
              >
                <Bot className="w-4 h-4 text-cyan-300" />
                <span className="text-[10px] hidden sm:inline">Avatar</span>
              </button>

              <button
                onClick={() => {
                  stopSpeaking();
                  setIsOpen(false);
                  if (activeModal === 'aiCompanion') {
                    closeModal();
                  }
                }}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Real-Time Voice State Banner */}
          {voiceState === 'listening' && (
            <div className="px-3.5 py-2 bg-gradient-to-r from-cyan-950/90 to-blue-950/90 border-b border-cyan-500/30 flex items-center justify-between text-xs text-cyan-200">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="font-semibold tracking-wide">🎙 Listening... Speak now</span>
              </div>
              <button
                type="button"
                onClick={toggleSpeechRecognition}
                className="text-[11px] font-semibold text-cyan-400 hover:text-white underline px-1 rounded transition"
              >
                Cancel
              </button>
            </div>
          )}

          {voiceState === 'processing' && (
            <div className="px-3.5 py-2 bg-gradient-to-r from-violet-950/90 to-fuchsia-950/90 border-b border-violet-500/30 flex items-center gap-2 text-xs text-violet-200">
              <Bot className="w-3.5 h-3.5 text-violet-400 animate-spin" />
              <span className="font-medium">Thinking... Understanding query</span>
            </div>
          )}

          {voiceState === 'speaking' && (
            <div className="px-3.5 py-2 bg-gradient-to-r from-emerald-950/90 to-teal-950/90 border-b border-emerald-500/30 flex items-center justify-between text-xs text-emerald-200">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5 h-3">
                  <span className="w-1 bg-emerald-400 rounded-full animate-bounce" style={{ height: '70%', animationDelay: '0ms' }}></span>
                  <span className="w-1 bg-emerald-400 rounded-full animate-bounce" style={{ height: '100%', animationDelay: '150ms' }}></span>
                  <span className="w-1 bg-emerald-400 rounded-full animate-bounce" style={{ height: '50%', animationDelay: '300ms' }}></span>
                </div>
                <span className="font-semibold">🔊 Zyno speaking...</span>
              </div>
              <button
                type="button"
                onClick={stopSpeaking}
                className="text-[11px] font-semibold text-emerald-400 hover:text-white underline px-1 rounded transition"
                title="Interrupt AI and stop speaking"
              >
                Tap to Interrupt
              </button>
            </div>
          )}

          {voiceState === 'error' && voiceErrorMsg && (
            <div className="px-3.5 py-2 bg-red-950/90 border-b border-red-500/40 flex items-center justify-between text-xs text-red-200">
              <span className="truncate pr-2">{voiceErrorMsg}</span>
              <button
                type="button"
                onClick={() => {
                  setVoiceState('idle');
                  setVoiceErrorMsg(null);
                }}
                className="text-[11px] font-bold text-red-300 hover:text-white underline whitespace-nowrap"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Quick Action Chips in Current Language */}
          <div className="p-2 px-3 border-b border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar bg-slate-900/40">
            {/* AI Avatar Demo Chip */}
            <button
              onClick={() => {
                stopSpeaking();
                setIsOpen(false);
                openModal('aiAvatar');
              }}
              className="px-2.5 py-1 rounded-full bg-gradient-to-r from-violet-600/30 to-cyan-600/30 hover:from-violet-600/50 hover:to-cyan-600/50 text-[10px] font-semibold text-cyan-200 border border-cyan-400/40 whitespace-nowrap flex items-center gap-1 shadow-sm"
              title="Open AI Avatar & Digital Twin Demo"
            >
              <Sparkles className="w-3 h-3 text-cyan-300" />
              <span>AI Avatar Demo</span>
            </button>
            <button
              onClick={() => handleSendMessage(t.companion?.surpriseMe || 'Surprise me with something unexpected!')}
              className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-[10px] font-semibold text-cyan-300 border border-cyan-500/30 whitespace-nowrap flex items-center gap-1"
            >
              <Shuffle className="w-3 h-3" />
              {t.companion?.surpriseMe || 'Surprise Me'}
            </button>
            <button
              onClick={() => handleSendMessage(t.companion?.eli10 || "Explain this like I'm 10 years old")}
              className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-[10px] font-semibold text-violet-300 border border-violet-500/30 whitespace-nowrap flex items-center gap-1"
            >
              <BookOpen className="w-3 h-3" />
              {t.companion?.eli10 || 'ELI10'}
            </button>
            <button
              onClick={() => handleSendMessage(t.companion?.quizMe || 'Quiz me on this reel')}
              className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-[10px] font-semibold text-emerald-300 border border-emerald-500/30 whitespace-nowrap flex items-center gap-1"
            >
              <HelpCircle className="w-3 h-3" />
              {t.companion?.quizMe || 'Quiz Me'}
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2 items-start ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {(msg.sender === 'zyno' || msg.sender === 'nova') && (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-violet-500 flex items-center justify-center text-white flex-shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div className="flex flex-col max-w-[85%]">
                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-md select-text whitespace-pre-wrap break-words ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-semibold rounded-tr-none'
                        : 'bg-slate-800 text-slate-100 border border-white/10 rounded-tl-none font-normal'
                    }`}
                  >
                    {msg.text || (msg.sender === 'user' ? 'Hello' : "Hello! I'm Zyno, your AI Companion on Zynqo Social. How can I help you today?")}
                  </div>

                  {msg.languageAnalysis && (msg.languageAnalysis.detectedSlangs?.length > 0 || msg.languageAnalysis.isCodeMixed || msg.languageAnalysis.detectedDialect !== 'standard') && (
                    <div className="flex flex-wrap items-center gap-1 mt-1 text-[10px]">
                      {msg.languageAnalysis.isCodeMixed && (
                        <span className="px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono">
                          🔀 {msg.languageAnalysis.codeMixedType || 'Code-Mixed'}
                        </span>
                      )}
                      {msg.languageAnalysis.detectedDialect !== 'standard' && (
                        <span className="px-1.5 py-0.5 rounded bg-pink-950/60 border border-pink-500/30 text-pink-300 font-mono">
                          📍 {msg.languageAnalysis.detectedDialect}
                        </span>
                      )}
                      {msg.languageAnalysis.detectedSlangs?.length > 0 && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-500/30 text-amber-300 font-mono">
                          ⚡ Gen-Z: {(msg.languageAnalysis.detectedSlangs || []).map((s: any) => s.term).join(', ')}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Speak Out Loud Button for Zyno messages */}
                {(msg.sender === 'zyno' || msg.sender === 'nova') && (
                  <button
                    onClick={() => speakText(msg.text, msg.id)}
                    className={`p-1 rounded-lg transition self-end mb-1 ${
                      speakingMessageId === msg.id
                        ? 'text-cyan-300 bg-cyan-500/20 animate-pulse'
                        : 'text-slate-500 hover:text-cyan-300 hover:bg-white/5'
                    }`}
                    title={speakingMessageId === msg.id ? (t.companion?.stopVoice || 'Stop Speaking') : (t.companion?.speakAloud || 'Speak Aloud')}
                  >
                    {speakingMessageId === msg.id ? (
                      <VolumeX className="w-3.5 h-3.5 text-cyan-400" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2 items-center text-slate-400 text-xs">
                <Bot className="w-4 h-4 text-cyan-400 animate-spin" />
                <span>{thinkingTextMap[language] || 'Zyno is thinking...'}</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-white/10 bg-slate-950/70 flex items-center gap-2"
          >
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              className={`p-2 rounded-xl transition ${
                voiceState === 'listening'
                  ? 'bg-red-500 text-white animate-pulse shadow-md shadow-red-500/40'
                  : voiceState === 'speaking'
                  ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 animate-pulse'
                  : 'text-slate-400 hover:text-cyan-400 bg-white/5'
              }`}
              title={
                voiceState === 'listening'
                  ? "Listening... Tap to stop"
                  : voiceState === 'speaking'
                  ? "Zyno speaking... Tap to interrupt"
                  : t.companion?.listening || "Voice Query"
              }
            >
              {voiceState === 'listening' ? (
                <MicOff className="w-4 h-4" />
              ) : voiceState === 'speaking' ? (
                <VolumeX className="w-4 h-4 text-emerald-300" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder={t.companion?.inputPlaceholder || "Ask Zyno or describe what you want..."}
              className="flex-1 px-3 py-2 bg-slate-800/80 border border-white/10 rounded-xl text-base sm:text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              className="p-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
