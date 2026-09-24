import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Users, 
  Send, 
  Bot, 
  Play, 
  Pause, 
  Share2, 
  Radio,
  Check,
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  Headphones,
  Wand2,
  Copy,
  LogOut,
  PlusCircle,
  LogIn,
  ArrowLeft,
  Volume2,
  VolumeX,
  Film,
  Sparkles
} from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import { useApp } from '../context/AppContext';
import { ReelVisualizer } from './ReelVisualizer';

interface RoomMessage {
  id: string;
  user: string;
  avatar?: string;
  text: string;
  isAI?: boolean;
  isSystem?: boolean;
  timestamp: string;
}

interface RoomMember {
  id: string;
  name: string;
  avatar: string;
  isAI?: boolean;
}

interface PublicRoom {
  id: string;
  name: string;
  currentReelId: string;
  memberCount: number;
  isPlaying: boolean;
}

export const WatchTogetherRoom: React.FC = () => {
  const { currentReel, reels, closeModal, userProfile } = useApp();
  
  // Check URL query param for direct join (e.g. ?room=ZYN-8429)
  const queryRoom = typeof window !== 'undefined' 
    ? new URLSearchParams(window.location.search).get('room') 
    : null;

  const [inRoom, setInRoom] = useState<boolean>(Boolean(queryRoom));
  const [lobbyTab, setLobbyTab] = useState<'create' | 'join'>('create');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomId, setRoomId] = useState<string>(queryRoom ? queryRoom.trim().toUpperCase() : 'room-global-ai');
  const [roomName, setRoomName] = useState<string>('🤖 AI & Neural Pioneers Lounge');
  const [currentReelId, setCurrentReelId] = useState<string>(currentReel?.id || 'reel-1');

  // Input states for Lobby
  const [newRoomNameInput, setNewRoomNameInput] = useState<string>(
    userProfile?.name ? `${userProfile.name}'s Lounge` : 'Pulse Watch Lounge'
  );
  const [newRoomReelInput, setNewRoomReelInput] = useState<string>(currentReel?.id || reels[0]?.id || 'reel-1');
  const [joinCodeInput, setJoinCodeInput] = useState<string>(queryRoom || '');
  const [joinError, setJoinError] = useState<string>('');
  const [publicRooms, setPublicRooms] = useState<PublicRoom[]>([]);

  // Room active states
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(60);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'chat' | 'members'>('chat');
  const [members, setMembers] = useState<RoomMember[]>([
    { id: 'b1', name: 'Sophia (AI Room Assistant)', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', isAI: true },
    { id: 'u1', name: userProfile?.name || 'Alex Rivera (You)', avatar: userProfile?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' },
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
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isVoiceLoungeMode, setIsVoiceLoungeMode] = useState(false);
  const [isRecommending, setIsRecommending] = useState(false);
  const [showReelPicker, setShowReelPicker] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const isRemoteSyncRef = useRef<boolean>(false);

  // Active reel object
  const activeReel = reels.find(r => r.id === currentReelId) || currentReel || reels[0];

  // Fetch available public rooms on lobby mount
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch('/api/rooms');
        if (res.ok) {
          const data = await res.json();
          if (data.rooms) setPublicRooms(data.rooms);
        }
      } catch {
        // Fallback default list
        setPublicRooms([
          {
            id: 'room-global-ai',
            name: '🤖 AI & Neural Pioneers Lounge',
            currentReelId: 'reel-1',
            memberCount: 3,
            isPlaying: true
          }
        ]);
      }
    };
    fetchRooms();
  }, [inRoom]);

  // Socket Connection Management
  useEffect(() => {
    if (!inRoom) return;

    const s = io({ path: '/socket.io' });
    setSocket(s);

    s.emit('join_room', {
      roomId,
      userName: userProfile?.name || 'Viewer',
      avatar: userProfile?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      roomName,
      reelId: currentReelId
    });

    s.on('room_state', (state: any) => {
      if (state.name) setRoomName(state.name);
      if (state.currentReelId) setCurrentReelId(state.currentReelId);
      if (state.messages) setMessages(state.messages);
      if (state.members) setMembers(state.members);
      if (typeof state.isPlaying === 'boolean') {
        setIsPlaying(state.isPlaying);
        if (videoRef.current) {
          if (state.isPlaying) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      }
      if (typeof state.currentTime === 'number' && videoRef.current) {
        videoRef.current.currentTime = state.currentTime;
        setCurrentTime(state.currentTime);
      }
    });

    s.on('playback_synced', (data: { reelId: string; currentTime: number; isPlaying: boolean; senderId?: string }) => {
      isRemoteSyncRef.current = true;
      if (data.reelId && data.reelId !== currentReelId) {
        setCurrentReelId(data.reelId);
      }
      setIsPlaying(data.isPlaying);
      if (videoRef.current) {
        if (Math.abs(videoRef.current.currentTime - data.currentTime) > 0.6) {
          videoRef.current.currentTime = data.currentTime;
        }
        if (data.isPlaying) {
          videoRef.current.play().catch(() => {});
        } else {
          videoRef.current.pause();
        }
      }
      setTimeout(() => {
        isRemoteSyncRef.current = false;
      }, 400);
    });

    s.on('member_joined', ({ members: updatedMembers }: any) => {
      if (updatedMembers) setMembers(updatedMembers);
    });

    s.on('member_left', ({ members: updatedMembers }: any) => {
      if (updatedMembers) setMembers(updatedMembers);
    });

    s.on('new_message', (msg: RoomMessage) => {
      setMessages(prev => {
        // Prevent duplicate message ids
        if (prev.some(m => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
    });

    return () => {
      s.emit('leave_room', {
        roomId,
        userName: userProfile?.name || 'Viewer'
      });
      s.disconnect();
    };
  }, [inRoom, roomId]);

  // Autoscroll chat on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeTab]);

  // Video playback time tracking
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 60);
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  // Synchronized Play/Pause toggle
  const handleToggleSyncPlayback = () => {
    const nextPlaying = !isPlaying;
    setIsPlaying(nextPlaying);

    if (videoRef.current) {
      if (nextPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }

    if (socket && !isRemoteSyncRef.current) {
      socket.emit('sync_playback', {
        roomId,
        reelId: currentReelId,
        currentTime: videoRef.current?.currentTime || 0,
        isPlaying: nextPlaying
      });
    }
  };

  // Synchronized Seek
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPercentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = newPercentage * duration;

    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }

    if (socket) {
      socket.emit('sync_playback', {
        roomId,
        reelId: currentReelId,
        currentTime: newTime,
        isPlaying
      });
    }
  };

  // Synchronized Reel Change
  const handleChangeReel = (reel: typeof activeReel) => {
    setCurrentReelId(reel.id);
    setCurrentTime(0);
    setIsPlaying(true);
    setShowReelPicker(false);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }

    if (socket) {
      socket.emit('change_reel', {
        roomId,
        reelId: reel.id,
        reelTitle: reel.title
      });
    }
  };

  // Send Chat Message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (socket) {
      socket.emit('send_message', {
        roomId,
        text: inputText.trim(),
        userName: userProfile?.name || 'Alex Rivera',
        avatar: userProfile?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
      });
    } else {
      const userMsg: RoomMessage = {
        id: `m-${Date.now()}`,
        user: userProfile?.name || 'You',
        avatar: userProfile?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
        text: inputText.trim(),
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, userMsg]);
    }

    setInputText('');
  };

  // Group AI Synergy Recommendation
  const handleGroupRec = () => {
    setIsRecommending(true);
    setTimeout(() => {
      setIsRecommending(false);
      const aiRecMsg: RoomMessage = {
        id: `rec-${Date.now()}`,
        user: 'Sophia (AI Room Assistant)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        isAI: true,
        text: `✨ Group Synergy Pick: Based on everyone's taste profiles (AI Tech + Culture & Beats), I recommend queuing: "United Way Vadodara: 30,000+ Dancers in Hypnotic Circular Raas" next!`,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, aiRecMsg]);
    }, 800);
  };

  // Leave room and return to lobby
  const handleLeaveRoom = () => {
    if (socket) {
      socket.emit('leave_room', {
        roomId,
        userName: userProfile?.name || 'Viewer'
      });
      socket.disconnect();
      setSocket(null);
    }
    setInRoom(false);
  };

  // Copy shareable link
  const copyRoomLink = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const shareableUrl = `${origin}/?room=${encodeURIComponent(roomId)}`;
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Copy room code
  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomId);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Handle Create Room
  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `ZYN-${Math.floor(1000 + Math.random() * 9000)}`;
    const finalName = newRoomNameInput.trim() || `${userProfile?.name || 'Creator'}'s Lounge`;
    setRoomId(randomCode);
    setRoomName(finalName);
    setCurrentReelId(newRoomReelInput);
    setInRoom(true);
  };

  // Handle Join Room by code or link
  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    setJoinError('');

    let raw = joinCodeInput.trim();
    if (!raw) {
      setJoinError('Please enter a room code or link');
      return;
    }

    // If a full link was entered, extract the room code
    if (raw.includes('room=')) {
      try {
        const url = new URL(raw, window.location.origin);
        const codeParam = url.searchParams.get('room');
        if (codeParam) raw = codeParam;
      } catch {
        const match = raw.match(/room=([A-Za-z0-9_-]+)/);
        if (match) raw = match[1];
      }
    }

    const cleanedCode = raw.toUpperCase().trim();
    setRoomId(cleanedCode);
    setRoomName(`Room: ${cleanedCode}`);
    setInRoom(true);
  };

  // Quick join an active public room
  const handleQuickJoin = (pubRoom: PublicRoom) => {
    setRoomId(pubRoom.id);
    setRoomName(pubRoom.name);
    setCurrentReelId(pubRoom.currentReelId || 'reel-1');
    setInRoom(true);
  };

  // Format time (seconds to mm:ss)
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div className="bg-slate-900 border border-white/15 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* ============================================================== */}
        {/* VIEW 1: LOBBY / CREATE / JOIN VIEW (When not in an active room) */}
        {/* ============================================================== */}
        {!inRoom ? (
          <div className="flex flex-col h-full max-h-[92vh] overflow-y-auto">
            {/* Lobby Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-slate-950/80 sticky top-0 z-10 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    Watch Together & Rooms
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/70 px-2 py-0.5 rounded-full border border-cyan-500/30">
                      Live Sync
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Watch reels synchronously with friends, chat in real time, and explore together.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lobby Content */}
            <div className="p-4 sm:p-6 space-y-6 flex-1">
              {/* Tab Selector: Create Room vs Join Room */}
              <div className="flex p-1 bg-slate-950/70 rounded-2xl border border-white/10 max-w-md mx-auto">
                <button
                  type="button"
                  onClick={() => setLobbyTab('create')}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
                    lobbyTab === 'create'
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <PlusCircle className="w-4 h-4" />
                  Create a Room
                </button>
                <button
                  type="button"
                  onClick={() => setLobbyTab('join')}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
                    lobbyTab === 'join'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  Join with Code
                </button>
              </div>

              {/* TAB 1: CREATE ROOM */}
              {lobbyTab === 'create' && (
                <div className="bg-slate-950/50 border border-white/10 rounded-2xl p-5 sm:p-6 max-w-xl mx-auto space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      Host Your Synchronized Watch Party
                    </h3>
                    <p className="text-xs text-slate-400">
                      We'll generate a unique shareable room link and code for your friends.
                    </p>
                  </div>

                  <form onSubmit={handleCreateRoom} className="space-y-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Room Name
                      </label>
                      <input
                        type="text"
                        value={newRoomNameInput}
                        onChange={e => setNewRoomNameInput(e.target.value)}
                        placeholder="e.g. AI Pioneers Lounge"
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition placeholder:text-slate-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Choose Starting Reel
                      </label>
                      <select
                        value={newRoomReelInput}
                        onChange={e => setNewRoomReelInput(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                      >
                        {reels.map(r => (
                          <option key={r.id} value={r.id}>
                            {r.title} ({r.category})
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-500/25 transition flex items-center justify-center gap-2"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Create Room & Enter
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 2: JOIN ROOM */}
              {lobbyTab === 'join' && (
                <div className="bg-slate-950/50 border border-white/10 rounded-2xl p-5 sm:p-6 max-w-xl mx-auto space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <LogIn className="w-4 h-4 text-cyan-400" />
                      Join an Existing Room
                    </h3>
                    <p className="text-xs text-slate-400">
                      Enter a 6-character room code (e.g. <span className="font-mono text-cyan-300 font-bold">ZYN-8429</span>) or paste the full room URL.
                    </p>
                  </div>

                  <form onSubmit={handleJoinRoom} className="space-y-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Room Code or Shareable Link
                      </label>
                      <input
                        type="text"
                        value={joinCodeInput}
                        onChange={e => {
                          setJoinCodeInput(e.target.value);
                          if (joinError) setJoinError('');
                        }}
                        placeholder="e.g. ZYN-8429 or https://zynqo.social/?room=ZYN-8429"
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 transition placeholder:text-slate-500"
                        required
                      />
                      {joinError && (
                        <p className="text-xs text-rose-400 mt-1 font-medium">{joinError}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-cyan-500/25 transition flex items-center justify-center gap-2"
                    >
                      <LogIn className="w-4 h-4" />
                      Join Room
                    </button>
                  </form>
                </div>
              )}

              {/* Active Public Lounges */}
              <div className="max-w-2xl mx-auto pt-2 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    Active Live Lounges
                  </h4>
                  <span className="text-[11px] text-slate-500 font-medium">1-Click Quick Join</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {publicRooms.map(room => (
                    <div
                      key={room.id}
                      className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/10 hover:border-cyan-500/40 transition flex items-center justify-between group"
                    >
                      <div className="space-y-1 min-w-0 pr-2">
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs sm:text-sm font-bold text-white truncate">
                            {room.name}
                          </h5>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          <span className="font-mono text-cyan-400 font-semibold">{room.id}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-emerald-400">
                            <Users className="w-3 h-3" />
                            {room.memberCount || 1} online
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleQuickJoin(room)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 group-hover:bg-cyan-600 text-slate-200 group-hover:text-white text-xs font-bold transition flex items-center gap-1 flex-shrink-0"
                      >
                        <span>Join</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ============================================================== */
          /* VIEW 2: ACTIVE ROOM VIEW (Synchronized Video + Chat + Members)  */
          /* ============================================================== */
          <div className="flex flex-col h-full max-h-[92vh] overflow-hidden">
            {/* Room Header */}
            <div className="p-3 sm:p-4 border-b border-white/10 flex items-center justify-between bg-slate-950/80 flex-shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                {/* Leave Room Button */}
                <button
                  type="button"
                  onClick={handleLeaveRoom}
                  className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/50 hover:text-rose-400 text-slate-300 text-xs font-semibold border border-white/10 transition flex items-center gap-1.5"
                  title="Leave this room and return to lobby"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Leave</span>
                </button>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xs sm:text-sm font-bold text-white truncate max-w-[120px] sm:max-w-xs">
                      {roomName}
                    </h2>
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/40 flex-shrink-0">
                      <Radio className="w-2.5 h-2.5 animate-pulse text-emerald-400" />
                      Synced
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span>Code:</span>
                    <button
                      type="button"
                      onClick={copyRoomCode}
                      className="font-mono text-cyan-300 font-bold hover:underline flex items-center gap-1"
                      title="Click to copy code"
                    >
                      {roomId}
                      {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-2.5 h-2.5 text-slate-400" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action buttons on Header */}
              <div className="flex items-center gap-1 sm:gap-2">
                {/* Mic Toggle */}
                <button
                  type="button"
                  onClick={() => setIsMicOn(prev => !prev)}
                  className={`px-2 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1 ${
                    isMicOn
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-white/10'
                  }`}
                  title={isMicOn ? 'Mute Voice' : 'Join Voice Call'}
                >
                  {isMicOn ? (
                    <>
                      <Mic className="w-3.5 h-3.5 text-emerald-400" />
                      <div className="flex items-center gap-0.5 h-2">
                        <span className="w-0.5 bg-emerald-400 rounded-full animate-bounce h-2" />
                        <span className="w-0.5 bg-emerald-400 rounded-full animate-bounce h-2.5" />
                      </div>
                    </>
                  ) : (
                    <>
                      <MicOff className="w-3.5 h-3.5 text-slate-400" />
                      <span className="hidden md:inline">Voice</span>
                    </>
                  )}
                </button>

                {/* Video Cam Toggle */}
                <button
                  type="button"
                  onClick={() => setIsCameraOn(prev => !prev)}
                  className={`px-2 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1 ${
                    isCameraOn
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-white/10'
                  }`}
                  title={isCameraOn ? 'Turn Off Camera' : 'Start Video Cam'}
                >
                  {isCameraOn ? (
                    <>
                      <VideoIcon className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                      <span className="hidden md:inline">Cam</span>
                    </>
                  ) : (
                    <>
                      <VideoOff className="w-3.5 h-3.5 text-slate-400" />
                      <span className="hidden md:inline">Cam</span>
                    </>
                  )}
                </button>

                {/* Voice Lounge Mode Toggle */}
                <button
                  type="button"
                  onClick={() => setIsVoiceLoungeMode(prev => !prev)}
                  className={`px-2 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1 ${
                    isVoiceLoungeMode
                      ? 'bg-violet-500/20 text-violet-300 border-violet-500/40 shadow'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-white/10'
                  }`}
                  title="Toggle Ambient Audio Lounge"
                >
                  <Headphones className={`w-3.5 h-3.5 ${isVoiceLoungeMode ? 'text-violet-400' : 'text-slate-400'}`} />
                  <span className="hidden lg:inline">Lounge</span>
                </button>

                {/* AI Group Recommendations Button */}
                <button
                  type="button"
                  onClick={handleGroupRec}
                  disabled={isRecommending}
                  className="px-2 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-pink-500/20 hover:from-amber-500/30 hover:to-pink-500/30 text-amber-300 text-xs font-semibold border border-amber-500/30 flex items-center gap-1 transition shadow"
                  title="AI Synergy Recommendation"
                >
                  <Wand2 className={`w-3.5 h-3.5 text-amber-400 ${isRecommending ? 'animate-spin' : ''}`} />
                  <span className="hidden xl:inline">{isRecommending ? 'Analyzing...' : 'Synergy'}</span>
                </button>

                {/* Share Link Button */}
                <button
                  type="button"
                  onClick={copyRoomLink}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-white/10 flex items-center gap-1.5 transition"
                  title="Copy Shareable Room Link"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{copiedLink ? 'Link Copied' : 'Invite'}</span>
                </button>

                {/* Close Modal */}
                <button
                  type="button"
                  onClick={() => {
                    handleLeaveRoom();
                    closeModal();
                  }}
                  className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
                  title="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Split Screen / Responsive Content */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              
              {/* LEFT: Synchronized Video Player / Voice Lounge */}
              <div className="relative w-full md:w-3/5 h-64 sm:h-72 md:h-auto bg-black flex flex-col items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
                {isVoiceLoungeMode ? (
                  /* Voice Lounge Audio First Mode */
                  <div className="w-full h-full p-6 flex flex-col items-center justify-center bg-gradient-to-b from-indigo-950/60 via-slate-950 to-black relative">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 rounded-full bg-violet-500/20 blur-xl animate-ping" />
                      <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-500 p-1 flex items-center justify-center shadow-2xl">
                        <Headphones className="w-8 h-8 text-white animate-pulse" />
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-1">Voice Lounge Mode Active</h3>
                    <p className="text-xs text-violet-300/80 text-center max-w-xs mb-4">
                      Ultra low-latency audio sync. Enjoy crystal-clear voice discussion with fellow viewers.
                    </p>

                    <div className="flex items-center gap-3">
                      {members.map(m => (
                        <div key={m.id} className="flex flex-col items-center gap-1">
                          <div className="relative">
                            <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full border-2 border-violet-400/80 object-cover" />
                            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
                          </div>
                          <span className="text-[10px] text-slate-300 font-medium truncate max-w-[60px]">{m.name.split(' ')[0]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Standard Synced Video Mode */
                  <div className="relative w-full h-full flex flex-col justify-end bg-black overflow-hidden group">
                    <ReelVisualizer theme={activeReel.visualTheme} isPlaying={isPlaying} />
                    
                    {activeReel.videoUrl && (
                      <video
                        ref={videoRef}
                        src={activeReel.videoUrl}
                        className="absolute inset-0 w-full h-full object-cover opacity-85 mix-blend-screen"
                        loop
                        muted={isMuted}
                        playsInline
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onClick={handleToggleSyncPlayback}
                      />
                    )}

                    {/* Gradient overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/85 pointer-events-none" />

                    {/* Webcam Preview if Camera On */}
                    {isCameraOn && (
                      <div className="absolute top-3 right-3 z-30 w-20 h-28 rounded-2xl overflow-hidden border-2 border-cyan-400/80 shadow-2xl bg-slate-900 flex flex-col justify-end">
                        <img
                          src={userProfile?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                          alt="You"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="relative z-10 px-1 py-0.5 bg-black/70 backdrop-blur-sm text-[8px] font-bold text-cyan-300 flex items-center justify-between">
                          <span>You</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        </div>
                      </div>
                    )}

                    {/* Reel Selector Dropdown / Overlay */}
                    {showReelPicker && (
                      <div className="absolute inset-x-3 bottom-24 z-40 bg-slate-900/95 border border-white/20 rounded-2xl p-3 shadow-2xl backdrop-blur-xl max-h-56 overflow-y-auto space-y-1 animate-scale-up">
                        <div className="flex items-center justify-between pb-1.5 border-b border-white/10 mb-2">
                          <span className="text-xs font-bold text-white flex items-center gap-1.5">
                            <Film className="w-3.5 h-3.5 text-cyan-400" />
                            Select Video to Watch Together
                          </span>
                          <button
                            type="button"
                            onClick={() => setShowReelPicker(false)}
                            className="text-slate-400 hover:text-white text-xs"
                          >
                            Close
                          </button>
                        </div>
                        {reels.map(r => (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => handleChangeReel(r)}
                            className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition ${
                              r.id === currentReelId
                                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                                : 'hover:bg-slate-800 text-slate-300'
                            }`}
                          >
                            <span className="truncate pr-2">{r.title}</span>
                            <span className="text-[10px] text-slate-500 uppercase">{r.category}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Video Player Bottom Controls & Overlay */}
                    <div className="relative z-30 p-3 sm:p-4 space-y-2">
                      {/* Video Title & Reel Switcher trigger */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="text-xs sm:text-sm font-bold text-white truncate leading-tight">
                            {activeReel.title}
                          </h3>
                          <p className="text-[11px] text-slate-400 truncate">
                            {activeReel.creator.name} • {activeReel.category}
                          </p>
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => setShowReelPicker(prev => !prev)}
                          className="px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-cyan-300 border border-cyan-500/30 flex items-center gap-1 flex-shrink-0 transition"
                        >
                          <Film className="w-3.5 h-3.5" />
                          <span>Change Reel</span>
                        </button>
                      </div>

                      {/* Interactive Progress Seeker */}
                      <div
                        onClick={handleSeek}
                        className="relative w-full h-2 bg-white/20 hover:h-2.5 rounded-full cursor-pointer transition-all flex items-center"
                        title="Click to seek for everyone"
                      >
                        <div
                          className="h-full bg-cyan-400 rounded-full relative"
                          style={{ width: `${Math.min(100, (currentTime / (duration || 60)) * 100)}%` }}
                        >
                          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md transform scale-0 group-hover:scale-100 transition-transform" />
                        </div>
                      </div>

                      {/* Playback Controls Bar */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          {/* Play/Pause Button */}
                          <button
                            type="button"
                            onClick={handleToggleSyncPlayback}
                            className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-1.5 shadow-lg transition"
                            title={isPlaying ? 'Pause for everyone' : 'Play for everyone'}
                          >
                            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                            <span>{isPlaying ? 'Pause All' : 'Play All'}</span>
                          </button>

                          {/* Sound Mute/Unmute */}
                          <button
                            type="button"
                            onClick={() => setIsMuted(prev => !prev)}
                            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-white/10 transition"
                            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
                          >
                            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
                          </button>

                          {/* Time display */}
                          <span className="text-[11px] font-mono text-slate-400">
                            {formatTime(currentTime)} / {formatTime(duration)}
                          </span>
                        </div>

                        <span className="text-[10px] text-cyan-400/90 font-medium hidden sm:inline">
                          Synced with {members.length} {members.length === 1 ? 'person' : 'people'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT: Chat & Members Tabbed Drawer */}
              <div className="w-full md:w-2/5 flex flex-col flex-1 bg-slate-950/70 overflow-hidden min-h-[220px]">
                {/* Tabs: Chat vs Members */}
                <div className="p-2 border-b border-white/10 flex items-center justify-between bg-slate-950/90 flex-shrink-0">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setActiveTab('chat')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                        activeTab === 'chat'
                          ? 'bg-indigo-600 text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Send className="w-3 h-3" />
                      <span>Chat</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('members')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                        activeTab === 'members'
                          ? 'bg-indigo-600 text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Users className="w-3 h-3" />
                      <span>Members ({members.length})</span>
                    </button>
                  </div>

                  <span className="text-[10px] font-mono text-slate-500 pr-2">
                    Room {roomId}
                  </span>
                </div>

                {/* TAB CONTENT: CHAT */}
                {activeTab === 'chat' && (
                  <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Chat Messages Stream */}
                    <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-2.5">
                      {messages.map(msg => {
                        if (msg.isSystem) {
                          return (
                            <div key={msg.id} className="text-center my-1.5">
                              <span className="text-[10px] font-medium text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-full border border-white/5">
                                {msg.text}
                              </span>
                            </div>
                          );
                        }

                        return (
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
                                {msg.avatar && (
                                  <img
                                    src={msg.avatar}
                                    alt={msg.user}
                                    className="w-4 h-4 rounded-full object-cover"
                                  />
                                )}
                                {msg.isAI && <Bot className="w-3.5 h-3.5 text-cyan-400" />}
                                <span className={`font-bold ${msg.isAI ? 'text-cyan-300' : 'text-white'}`}>
                                  {msg.user}
                                </span>
                              </div>
                              <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                            </div>
                            <p className="text-slate-200 leading-relaxed pl-5 sm:pl-5">{msg.text}</p>
                          </div>
                        );
                      })}
                      <div ref={chatEndRef} />
                    </div>

                    {/* Chat Input Form */}
                    <form onSubmit={handleSendMessage} className="p-2.5 sm:p-3 border-t border-white/10 flex items-center gap-2 bg-slate-900/90 flex-shrink-0">
                      <input
                        type="text"
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                        placeholder="Chat with room participants..."
                        className="flex-1 px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-500"
                      />
                      <button
                        type="submit"
                        disabled={!inputText.trim()}
                        className="p-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white rounded-xl transition flex-shrink-0"
                        title="Send Message"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                )}

                {/* TAB CONTENT: MEMBERS */}
                {activeTab === 'members' && (
                  <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 pb-1 flex items-center justify-between">
                      <span>Currently Watching</span>
                      <span className="text-emerald-400">{members.length} Active</span>
                    </div>

                    {members.map(member => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 border border-white/5"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="relative">
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="w-7 h-7 rounded-full object-cover border border-white/10"
                            />
                            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-slate-900" />
                          </div>
                          <div className="min-w-0">
                            <span className={`text-xs font-semibold block truncate ${member.isAI ? 'text-cyan-300' : 'text-slate-200'}`}>
                              {member.name}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              {member.isAI ? 'AI Assistant' : 'Viewer'}
                            </span>
                          </div>
                        </div>

                        {member.isAI ? (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30 font-bold">
                            AI Bot
                          </span>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                            Online
                          </span>
                        )}
                      </div>
                    ))}

                    {/* Quick Invite in Members view */}
                    <div className="pt-4 border-t border-white/10 space-y-2">
                      <button
                        type="button"
                        onClick={copyRoomLink}
                        className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-white/10 transition flex items-center justify-center gap-1.5"
                      >
                        {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                        <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Share Room Invite Link'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleLeaveRoom}
                        className="w-full py-2 bg-rose-950/30 hover:bg-rose-900/50 text-rose-300 text-xs font-semibold rounded-xl border border-rose-500/20 transition flex items-center justify-center gap-1.5"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Leave Room</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
