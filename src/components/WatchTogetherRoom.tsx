import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Users, 
  Send, 
  Sparkles, 
  Bot, 
  Play, 
  Pause, 
  Share2, 
  Radio,
  Check
} from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import { useApp } from '../context/AppContext';
import { ReelVisualizer } from './ReelVisualizer';

interface RoomMessage {
  id: string;
  user: string;
  avatar: string;
  text: string;
  isAI?: boolean;
  timestamp: string;
}

interface RoomMember {
  id: string;
  name: string;
  avatar: string;
  isAI?: boolean;
}

export const WatchTogetherRoom: React.FC = () => {
  const { currentReel, closeModal, userProfile } = useApp();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomId, setRoomId] = useState('room-global-ai');
  const [isPlaying, setIsPlaying] = useState(true);
  const [members, setMembers] = useState<RoomMember[]>([
    { id: 'b1', name: 'Sophia (AI Room Assistant)', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', isAI: true },
    { id: 'u1', name: 'Alex Rivera (You)', avatar: userProfile?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' },
    { id: 'u2', name: 'Liam Dev', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' }
  ]);
  const [messages, setMessages] = useState<RoomMessage[]>([
    {
      id: 'm1',
      user: 'Sophia (AI Room Assistant)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      isAI: true,
      text: `Welcome to the Watch Together Lounge! Everyone in this room sees the exact same video frame in real time. Feel free to discuss ideas below!`,
      timestamp: 'Just now'
    },
    {
      id: 'm2',
      user: 'Liam Dev',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      text: 'The explanation of weights and backpropagation here is insane.',
      timestamp: '1m ago'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [copied, setCopied] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Connect to Socket.IO backend
    const s = io({ path: '/socket.io' });
    setSocket(s);

    s.emit('join_room', {
      roomId,
      userName: userProfile?.name || 'Alex',
      avatar: userProfile?.avatar
    });

    s.on('room_state', (state: any) => {
      if (state.messages) setMessages(state.messages);
      if (state.members) setMembers(state.members);
      setIsPlaying(state.isPlaying ?? true);
    });

    s.on('new_message', (msg: RoomMessage) => {
      setMessages(prev => [...prev, msg]);
    });

    s.on('playback_synced', ({ isPlaying: syncPlaying }: any) => {
      setIsPlaying(syncPlaying);
    });

    return () => {
      s.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (socket) {
      socket.emit('send_message', {
        roomId,
        text: inputText,
        userName: userProfile?.name || 'Alex Rivera',
        avatar: userProfile?.avatar
      });
    } else {
      // Fallback local chat
      const userMsg: RoomMessage = {
        id: `m-${Date.now()}`,
        user: userProfile?.name || 'You',
        avatar: userProfile?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
        text: inputText,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, userMsg]);
    }

    setInputText('');
  };

  const handleToggleSyncPlayback = () => {
    const nextPlaying = !isPlaying;
    setIsPlaying(nextPlaying);
    if (socket) {
      socket.emit('sync_playback', {
        roomId,
        reelId: currentReel?.id || 'reel-1',
        currentTime: 0,
        isPlaying: nextPlaying
      });
    }
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-2 md:p-6 animate-fade-in">
      <div className="bg-slate-900 border border-white/15 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">Watch Together Lounge</h2>
                <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
                  Synced Live
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Room: <span className="font-mono text-cyan-300 font-bold">{roomId}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyRoomCode}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-white/10 flex items-center gap-1.5 transition"
              title="Copy Room Code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Invite'}</span>
            </button>
            <button
              onClick={closeModal}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Split Screen: Left Synchronized Reel Player / Right Live Room Chat & Spectators */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Player */}
          <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-black flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
            {currentReel && (
              <>
                <ReelVisualizer theme={currentReel.visualTheme} isPlaying={isPlaying} />
                {currentReel.videoUrl && (
                  <video
                    src={currentReel.videoUrl}
                    className="absolute inset-0 w-full h-full object-cover opacity-75 mix-blend-screen pointer-events-none"
                    loop
                    muted
                    autoPlay
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

                {/* Video Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-auto">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                    Synchronized Stream
                  </span>
                  <h3 className="text-sm font-bold text-white leading-tight">
                    {currentReel.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                    {currentReel.creator.name} • {currentReel.category}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={handleToggleSyncPlayback}
                      className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg transition"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isPlaying ? 'Pause All' : 'Play All'}</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Chat & Participants */}
          <div className="w-full md:w-1/2 flex flex-col flex-1 bg-slate-950/60 overflow-hidden">
            {/* Participants Bar */}
            <div className="p-3 border-b border-white/10 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap mr-1">
                Watching ({members.length}):
              </span>
              {members.map(member => (
                <div
                  key={member.id}
                  className="flex items-center gap-1.5 bg-slate-800/80 px-2 py-1 rounded-full border border-white/10 flex-shrink-0"
                  title={member.name}
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span className={`text-[11px] font-medium ${member.isAI ? 'text-cyan-300' : 'text-slate-200'}`}>
                    {member.name.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>

            {/* Chat Stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-2xl text-xs space-y-1 ${
                    msg.isAI
                      ? 'bg-gradient-to-r from-cyan-950/70 to-indigo-950/70 border border-cyan-500/30'
                      : 'bg-slate-800/60 border border-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {msg.isAI && <Bot className="w-3.5 h-3.5 text-cyan-400" />}
                      <span className={`font-bold ${msg.isAI ? 'text-cyan-300' : 'text-white'}`}>
                        {msg.user}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed">{msg.text}</p>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 flex items-center gap-2 bg-slate-900/80">
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Chat with friends & AI Room Assistant..."
                className="flex-1 px-3 py-2 bg-slate-800/80 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-500"
              />
              <button
                type="submit"
                className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
