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

interface Message {
  id: string;
  sender: 'user' | 'nova';
  text: string;
  timestamp: string;
  languageAnalysis?: any;
}

export const AICompanion: React.FC = () => {
  const { currentReel, intent, openModal, setIntent, t, language, reels, setCurrentReelIndex, setCurrentPage } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const speechLangMap: Record<string, string> = {
    gu: 'gu-IN',
    hi: 'hi-IN',
    es: 'es-ES',
    fr: 'fr-FR',
    ja: 'ja-JP',
    de: 'de-DE',
    en: 'en-US'
  };

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

  // Text-to-Speech speaking function supporting all languages (using Google TTS POST proxy)
  const speakText = async (text: string, msgId?: string) => {
    stopSpeaking();

    if (speakingMessageId === msgId) {
      return;
    }

    if (msgId) {
      setSpeakingMessageId(msgId);
    }

    // Clean text of markdown asterisks, backticks, emojis and formatting
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
      // POST request bypasses all URL length limitations
      const res = await fetch('/api/ai/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: cleanText,
          lang: language
        })
      });

      if (!res.ok) {
        throw new Error(`TTS server status: ${res.status}`);
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
      console.warn('Google TTS POST failed, attempting Web Speech fallback:', err);
      // Fallback to Web Speech API only if network completely unavailable
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(cleanText);
        const targetLang = speechLangMap[language] || 'en-US';
        utterance.lang = targetLang;
        utterance.onend = () => setSpeakingMessageId(null);
        utterance.onerror = () => setSpeakingMessageId(null);
        window.speechSynthesis.speak(utterance);
      } else {
        setSpeakingMessageId(null);
      }
    }
  };

  // Stop speaking on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  // Initialize or update greeting when language or intent changes
  useEffect(() => {
    stopSpeaking();
    const greetingText = t.companion?.greeting || 
      `Hello! I'm Nova, your AI Entertainment Companion. I'm tuned to your "${intent}" mode. Ask me anything about what you're watching, or tell me what you want to achieve today!`;

    setMessages([
      {
        id: `m-init-${language}`,
        sender: 'nova',
        text: greetingText,
        timestamp: 'Just now'
      }
    ]);
  }, [language, intent, t.companion?.greeting]);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string, isVoiceQuery?: boolean) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    const localizedReel = currentReel ? getLocalizedReel(currentReel, language) : null;

    try {
      const res = await fetch('/api/ai/companion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          context: {
            currentReel: localizedReel || currentReel,
            intent,
            remainingMinutes: 5,
            language
          }
        })
      });
      const data = await res.json();
      setIsTyping(false);

      if (data.success) {
        const novaMsg: Message = {
          id: `nova-${Date.now()}`,
          sender: 'nova',
          text: data.reply,
          timestamp: 'Just now',
          languageAnalysis: data.languageAnalysis
        };
        setMessages(prev => [...prev, novaMsg]);

        // If Voice Mode is enabled or user used voice input, speak Nova's reply aloud in current language!
        if (isVoiceMode || isVoiceQuery) {
          speakText(data.reply, novaMsg.id);
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
        } else if (data.action === 'EXPLAIN_SIMPLE') {
          if (data.targetReelId) {
            const targetIdx = reels.findIndex(r => r.id === data.targetReelId);
            if (targetIdx !== -1) {
              setCurrentPage('feed');
              setCurrentReelIndex(targetIdx);
            }
          }
        }
      }
    } catch (err) {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `nova-err-${Date.now()}`,
          sender: 'nova',
          text: t.companion?.errorFallback || `I'm here! Let me know if you want notes, quizzes, or a structured session on this topic.`,
          timestamp: 'Just now'
        }
      ]);
    }
  };

  // Voice speech-to-text integration using Web Speech API mapped to current language
  const toggleSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(t.companion?.speechNotSupported || 'Speech Recognition is not supported by your browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = speechLangMap[language] || 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (e: any) => {
      const speechText = e.results[0][0].transcript;
      setInputValue(speechText);
      handleSendMessage(speechText, true);
    };

    recognition.start();
  };

  const localizedCurrentReel = currentReel ? getLocalizedReel(currentReel, language) : null;

  const thinkingTextMap: Record<string, string> = {
    gu: 'નોવા વિચારી રહી છે...',
    hi: 'नोवा सोच रही है...',
    es: 'Nova está pensando...',
    fr: 'Nova réfléchit...',
    ja: 'Novaが考え中...',
    de: 'Nova denkt nach...',
    en: 'Nova is thinking...'
  };

  return (
    <>
      {/* Floating Orb Trigger in Bottom Left */}
      <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-40 pb-safe">
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="group relative p-3.5 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-600 to-violet-600 text-white shadow-2xl shadow-cyan-500/30 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center gap-2 border border-white/20"
          title={t.companion?.name || "Nova AI Companion"}
        >
          <Bot className="w-6 h-6 animate-pulse" />
          <span className="hidden sm:inline text-xs font-bold tracking-wide pr-1">
            {t.companion?.name ? t.companion.name.split(' ')[0] : 'Nova AI'}
          </span>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-300"></span>
          </span>
        </button>
      </div>

      {/* Expanded Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-16 sm:bottom-20 left-2 sm:left-4 md:left-6 z-50 w-[calc(100vw-16px)] sm:w-96 max-h-[calc(100dvh-100px)] h-[75vh] bg-slate-900/95 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-scale-in pb-safe">
          {/* Header */}
          <div className="p-4 border-b border-white/10 bg-slate-950/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-violet-500 flex items-center justify-center text-slate-950 font-black">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-xs md:text-sm font-bold text-white flex items-center gap-1.5">
                  {t.companion?.name || 'Nova AI Companion'}
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

              <button
                onClick={() => {
                  stopSpeaking();
                  setIsOpen(false);
                }}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Action Chips in Current Language */}
          <div className="p-2 px-3 border-b border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar bg-slate-900/40">
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
                {msg.sender === 'nova' && (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-violet-500 flex items-center justify-center text-white flex-shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div className="flex flex-col max-w-[80%]">
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-medium rounded-tr-none'
                        : 'bg-slate-800/80 text-slate-200 border border-white/5 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
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
                          ⚡ Gen-Z: {msg.languageAnalysis.detectedSlangs.map((s: any) => s.term).join(', ')}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Speak Out Loud Button for Nova messages */}
                {msg.sender === 'nova' && (
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
                <span>{thinkingTextMap[language] || 'Nova is thinking...'}</span>
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
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'text-slate-400 hover:text-cyan-400 bg-white/5'
              }`}
              title={t.companion?.listening || "Voice Query"}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder={t.companion?.inputPlaceholder || "Ask Nova or describe what you want..."}
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
