import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Heart, 
  Bookmark, 
  MessageCircle, 
  Video, 
  Film, 
  FileText, 
  Activity, 
  Check, 
  Plus, 
  Share2, 
  Eye, 
  Clock, 
  Calendar, 
  Edit3, 
  UserPlus, 
  UserCheck, 
  Play, 
  X, 
  Home, 
  Compass, 
  Flame, 
  Trophy, 
  Filter, 
  Trash2,
  ExternalLink,
  Sliders,
  Sun,
  Moon,
  Palette
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { themes } from '../utils/theme';
import { Reel, UserVideo, UserPost, ActivityItem, CommentActivity } from '../types';
import { EditProfileModal } from './EditProfileModal';
import { AIAssistModal } from './AIAssistModal';

export const ProfileView: React.FC = () => {
  const { 
    userProfile, 
    updateUserProfile,
    userReels, 
    userVideos, 
    userPosts, 
    likedActivities, 
    savedActivities, 
    commentActivities, 
    toggleLike, 
    toggleSave, 
    addUserContent,
    setCurrentPage, 
    currentTheme, 
    openThemeModal,
    colorMode, 
    toggleColorMode,
    openModal,
    t
  } = useApp();

  const theme = themes[currentTheme] || themes.emerald;
  const isLight = colorMode === 'light';

  // Navigation & Tabs
  const [activeMainTab, setActiveMainTab] = useState<'reels' | 'videos' | 'posts' | 'activity'>('reels');
  const [activitySubTab, setActivitySubTab] = useState<'liked' | 'saved' | 'comments' | 'milestones'>('liked');
  const [activityFilter, setActivityFilter] = useState<'all' | 'reels' | 'videos' | 'posts'>('all');

  // Modals & Active Viewer State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeMediaItem, setActiveMediaItem] = useState<{
    type: 'reel' | 'video' | 'post';
    title: string;
    videoUrl?: string;
    imageUrl?: string;
    description?: string;
    likes?: number;
    commentsCount?: number;
    creatorName?: string;
    creatorAvatar?: string;
    uploadDate?: string;
  } | null>(null);

  // Quick Post / Upload state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState<'reel' | 'video' | 'post'>('reel');
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [showAIAssistModal, setShowAIAssistModal] = useState(false);

  // Local follow toggle state
  const [isFollowing, setIsFollowing] = useState(userProfile?.isFollowing || false);

  const handleFollowToggle = () => {
    const next = !isFollowing;
    setIsFollowing(next);
    updateUserProfile({ isFollowing: next });
  };

  const handleCreateContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    if (uploadType === 'reel') {
      addUserContent('reel', {
        title: newTitle,
        description: newDesc || 'Created by user.',
        videoUrl: newMediaUrl || '/videos/flower.mp4',
        visualTheme: 'neural_network',
        duration: 45,
        category: 'Personal AI',
        intent: 'teach',
        likes: 1,
        commentsCount: 0,
        views: 1,
        uploadDate: 'Just now'
      });
    } else if (uploadType === 'video') {
      addUserContent('video', {
        title: newTitle,
        description: newDesc,
        thumbnail: newMediaUrl || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
        videoUrl: '/videos/flower.mp4',
        views: 1,
        likes: 1,
        commentsCount: 0,
        uploadDate: 'Just now',
        duration: 120
      });
    } else {
      addUserContent('post', {
        caption: newTitle,
        imageUrl: newMediaUrl || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
        likes: 1,
        commentsCount: 0,
        uploadDate: 'Just now'
      });
    }

    setNewTitle('');
    setNewDesc('');
    setNewMediaUrl('');
    setShowUploadModal(false);
  };

  // Activity filter logic
  const filterActivityList = (items: ActivityItem[]) => {
    if (activityFilter === 'all') return items;
    if (activityFilter === 'reels') return items.filter(it => it.type === 'reel');
    if (activityFilter === 'videos') return items.filter(it => it.type === 'video');
    if (activityFilter === 'posts') return items.filter(it => it.type === 'post');
    return items;
  };

  const filteredLiked = filterActivityList(likedActivities);
  const filteredSaved = filterActivityList(savedActivities);

  return (
    <div className={`w-full min-h-[100dvh] pb-16 overflow-x-hidden font-sans transition-colors duration-200 ${
      isLight ? 'bg-[#f8fafc] text-slate-900' : 'bg-[#06080e] text-slate-100'
    }`}>
      {/* ─────────────────────────────────────────────────────────────
          1. TOP NAVIGATION HEADER
          ───────────────────────────────────────────────────────────── */}
      <header className={`sticky top-0 z-40 backdrop-blur-2xl border-b px-3 sm:px-6 md:px-12 py-2.5 sm:py-3 flex items-center justify-between transition-colors ${
        isLight ? 'bg-white/90 border-slate-200 text-slate-900 shadow-sm' : 'bg-[#0a0d14]/85 border-white/10 text-slate-100'
      }`}>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setCurrentPage('feed')}
            className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-white/15'
            }`}
            title={t.profile?.backFeed || 'Back to Feed'}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{t.profile?.backFeed || 'Back to Feed'}</span>
          </button>

          <button
            onClick={() => setCurrentPage('home')}
            className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-white/15'
            }`}
            title={t.profile?.backHome || t.nav?.landingPage || 'Home'}
          >
            <Home className="w-4 h-4" />
            <span className="hidden md:inline">{t.profile?.backHome || t.nav?.landingPage || 'Home'}</span>
          </button>
        </div>

        {/* Center Brand */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
            <img
              src="/zynqo-symbol.png"
              alt="Zynqo Logo"
              className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(6,182,212,0.4)]"
            />
          </div>
          <span className={`font-display text-sm sm:text-base font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Zynqo<span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradient}`}>Profile</span>
          </span>
        </div>

        {/* Right Tools: Mode, Theme, Upload Action */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleColorMode}
            className={`p-2 rounded-xl border text-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                : 'bg-slate-800/90 hover:bg-slate-700 text-amber-300 border-white/15'
            }`}
            title={isLight ? (t.nav?.darkMode || "Switch to Dark Mode") : (t.nav?.lightMode || "Switch to Light Mode")}
          >
            {isLight ? <Moon className="w-4 h-4 text-indigo-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={openThemeModal}
            className={`p-2 rounded-xl border text-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border-white/15'
            }`}
            title={t.nav?.switchTheme || "Switch Color Theme"}
          >
            <Palette className="w-4 h-4" style={{ color: theme.previewColors[0] }} />
          </button>

          {/* Create / Upload CTA */}
          <button
            onClick={() => setShowUploadModal(true)}
            className={`px-3 sm:px-4 py-1.5 rounded-xl ${theme.buttonClass} text-xs font-semibold shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.profile?.uploadContent || 'Upload Content'}</span>
          </button>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. PROFILE HERO HEADER
          ───────────────────────────────────────────────────────────── */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-6 space-y-6">
        {/* Subtle Ambient Backlight */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-48 rounded-full blur-3xl pointer-events-none opacity-20 bg-gradient-to-r ${theme.gradient}`} />

        <div className={`relative p-5 sm:p-8 rounded-3xl border shadow-xl backdrop-blur-2xl transition-all ${
          isLight ? 'bg-white/90 border-slate-200 shadow-slate-200/50' : 'bg-slate-900/80 border-white/10 shadow-black/40'
        }`}>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar with Ring & Status */}
            <div className="relative group flex-shrink-0">
              <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-3xl p-1 bg-gradient-to-tr ${theme.gradient} shadow-xl shadow-black/20`}>
                <img
                  src={userProfile?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                  alt={userProfile?.name || 'User Avatar'}
                  className="w-full h-full rounded-[22px] object-cover bg-slate-950"
                />
              </div>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="absolute bottom-0 right-0 p-2 rounded-xl bg-slate-950/90 text-cyan-400 border border-white/20 shadow-lg hover:scale-110 active:scale-95 transition"
                title="Edit Avatar"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Profile Core Details */}
            <div className="flex-1 space-y-3 text-center md:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <h1 className={`text-xl sm:text-2xl md:text-3xl font-display font-extrabold tracking-tight ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                      {userProfile?.name || 'Alex Rivera'}
                    </h1>
                    <span className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-[10px] font-bold" title="Verified Zynqo Creator">
                      ✓
                    </span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2 pt-0.5">
                    <span className="text-xs sm:text-sm font-mono font-semibold text-cyan-500">
                      {userProfile?.handle || '@alex_explorer'}
                    </span>
                    {userProfile?.category && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-sans font-medium uppercase tracking-wider ${
                        isLight ? 'bg-slate-100 text-slate-700 border border-slate-300' : 'bg-white/10 text-slate-300 border border-white/10'
                      }`}>
                        {userProfile.category}
                      </span>
                    )}
                    {userProfile?.current_mood && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-sans font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                        Mood: {userProfile.current_mood}
                      </span>
                    )}
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex items-center justify-center md:justify-end gap-2 flex-wrap">
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className={`px-4 py-2 rounded-xl border text-xs font-semibold font-sans flex items-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
                      isLight 
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300' 
                        : 'bg-slate-800 hover:bg-slate-700 text-white border-white/15'
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{t.profile?.editProfile || 'Edit Profile'}</span>
                  </button>

                  <button
                    onClick={handleFollowToggle}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold font-sans flex items-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
                      isFollowing
                        ? isLight 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                          : 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                        : `${theme.buttonClass} shadow-md`
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>{t.reel?.following || 'Following'}</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>{t.reel?.follow || 'Follow'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Bio */}
              <p className={`text-xs sm:text-sm font-sans font-normal leading-relaxed max-w-2xl ${
                isLight ? 'text-slate-600' : 'text-slate-300'
              }`}>
                {userProfile?.bio || 'AI Creator & Digital Explorer. Crafting interactive educational reels, verified science breakdowns, and productivity workflows. 🚀'}
              </p>

              {/* Stats Bar */}
              <div className="pt-2 flex items-center justify-center md:justify-start gap-4 sm:gap-6 text-center md:text-left flex-wrap">
                <div>
                  <span className={`text-base sm:text-lg font-display font-black block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {(userProfile?.followersCount || 1420).toLocaleString()}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    {t.profile?.followers || 'Followers'}
                  </span>
                </div>
                <div>
                  <span className={`text-base sm:text-lg font-display font-black block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {(userProfile?.followingCount || 388).toLocaleString()}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    {t.profile?.following || 'Following'}
                  </span>
                </div>
                <div>
                  <span className={`text-base sm:text-lg font-display font-black block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {userReels.length}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    {t.profile?.reelsTab || 'Reels'}
                  </span>
                </div>
                <div>
                  <span className={`text-base sm:text-lg font-display font-black block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {userVideos.length}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    {t.profile?.videosTab || 'Videos'}
                  </span>
                </div>
                <div>
                  <span className={`text-base sm:text-lg font-display font-black block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {userPosts.length}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    {t.profile?.postsTab || 'Posts'}
                  </span>
                </div>
                <div>
                  <span className="text-base sm:text-lg font-display font-black text-cyan-400 block">
                    {userProfile?.xp || 1420} XP
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    {t.profile?.level || 'Level'} {userProfile?.level || 4}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. MAIN CONTENT TABS (Reels, Videos, Posts, Activity)
          ───────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Navigation Tabs Header */}
        <div className={`p-1.5 rounded-2xl border flex items-center justify-between gap-1 overflow-x-auto ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900/70 border-white/10'
        }`}>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveMainTab('reels')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-semibold font-sans flex items-center gap-2 transition-all duration-200 ${
                activeMainTab === 'reels'
                  ? isLight
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-950 shadow-md'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Film className="w-4 h-4 text-cyan-400" />
              <span>{t.profile?.reelsTab || 'Reels'} ({userReels.length})</span>
            </button>

            <button
              onClick={() => setActiveMainTab('videos')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-semibold font-sans flex items-center gap-2 transition-all duration-200 ${
                activeMainTab === 'videos'
                  ? isLight
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-950 shadow-md'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Video className="w-4 h-4 text-pink-400" />
              <span>{t.profile?.videosTab || 'Videos'} ({userVideos.length})</span>
            </button>

            <button
              onClick={() => setActiveMainTab('posts')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-semibold font-sans flex items-center gap-2 transition-all duration-200 ${
                activeMainTab === 'posts'
                  ? isLight
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-950 shadow-md'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>{t.profile?.postsTab || 'Posts'} ({userPosts.length})</span>
            </button>
          </div>

          <button
            onClick={() => setActiveMainTab('activity')}
            className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-semibold font-sans flex items-center gap-2 transition-all duration-200 ${
              activeMainTab === 'activity'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg'
                : isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>{t.profile?.activityTab || 'Activity & Interacted'}</span>
          </button>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            TAB 1: UPLOADED REELS
            ───────────────────────────────────────────────────────────── */}
        {activeMainTab === 'reels' && (
          <div>
            {userReels.length === 0 ? (
              <div className={`p-10 rounded-3xl border text-center space-y-4 ${
                isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900/50 border-white/10 text-slate-200'
              }`}>
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mx-auto">
                  <Film className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-display font-bold">{t.profile?.emptyReels || "No Reels Uploaded Yet"}</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto pt-1">
                    Create short, high-impact 60s educational reels and share your insights with the community.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setUploadType('reel');
                    setShowUploadModal(true);
                  }}
                  className={`px-5 py-2.5 rounded-xl ${theme.buttonClass} text-xs font-semibold shadow-md transition`}
                >
                  {t.profile?.createPost || 'Create Your First Reel'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {userReels.map((reel) => (
                  <div
                    key={reel.id}
                    onClick={() => setActiveMediaItem({
                      type: 'reel',
                      title: reel.title,
                      videoUrl: reel.videoUrl || '/videos/flower.mp4',
                      description: reel.description,
                      likes: reel.likes,
                      commentsCount: reel.commentsCount,
                      creatorName: reel.creator.name,
                      creatorAvatar: reel.creator.avatar,
                      uploadDate: '2 days ago'
                    })}
                    className={`group rounded-3xl border overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
                      isLight ? 'bg-white border-slate-200 shadow-sm hover:border-cyan-500/40' : 'bg-slate-900/80 border-white/10 hover:border-cyan-500/40'
                    }`}
                  >
                    {/* Thumbnail / Video Preview Area */}
                    <div className="relative aspect-[9/16] bg-slate-950 overflow-hidden">
                      <img
                        src={(reel as any).thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80'}
                        alt={reel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-cyan-500/90 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>

                      {/* Duration Tag */}
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono text-cyan-300 font-semibold border border-white/15">
                        {reel.duration}s
                      </div>

                      {/* Bottom Overlay Stats */}
                      <div className="absolute bottom-3 left-3 right-3 space-y-1">
                        <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug drop-shadow-md">
                          {reel.title}
                        </h4>
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-300">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3 text-cyan-400" />
                            {reel.views ? (reel.views > 999 ? `${(reel.views / 1000).toFixed(1)}k` : reel.views) : '18.4k'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
                            {reel.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3 text-emerald-400" />
                            {reel.commentsCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 2: UPLOADED VIDEOS
            ───────────────────────────────────────────────────────────── */}
        {activeMainTab === 'videos' && (
          <div>
            {userVideos.length === 0 ? (
              <div className={`p-10 rounded-3xl border text-center space-y-4 ${
                isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900/50 border-white/10 text-slate-200'
              }`}>
                <div className="w-14 h-14 rounded-2xl bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center justify-center mx-auto">
                  <Video className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-display font-bold">{t.profile?.emptyVideos || "No Videos Uploaded Yet"}</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto pt-1">
                    Upload longer format videos, lectures, and structured learning modules.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setUploadType('video');
                    setShowUploadModal(true);
                  }}
                  className={`px-5 py-2.5 rounded-xl ${theme.buttonClass} text-xs font-semibold shadow-md transition`}
                >
                  {t.profile?.uploadContent || 'Upload a Video'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userVideos.map((vid) => (
                  <div
                    key={vid.id}
                    onClick={() => setActiveMediaItem({
                      type: 'video',
                      title: vid.title,
                      videoUrl: vid.videoUrl,
                      description: vid.description,
                      likes: vid.likes,
                      commentsCount: vid.commentsCount,
                      creatorName: userProfile?.name || 'Alex Rivera',
                      creatorAvatar: userProfile?.avatar,
                      uploadDate: vid.uploadDate
                    })}
                    className={`group rounded-3xl border overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
                      isLight ? 'bg-white border-slate-200 shadow-sm hover:border-pink-500/40' : 'bg-slate-900/80 border-white/10 hover:border-pink-500/40'
                    }`}
                  >
                    <div className="relative aspect-video bg-slate-950 overflow-hidden">
                      <img
                        src={vid.thumbnail}
                        alt={vid.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-mono text-pink-300 font-semibold">
                        {vid.duration ? `${Math.floor(vid.duration / 60)}:${(vid.duration % 60).toString().padStart(2, '0')}` : '3:05'}
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 className={`text-sm font-bold font-display line-clamp-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {vid.title}
                      </h4>
                      <p className={`text-xs line-clamp-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        {vid.description}
                      </p>
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-white/5">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-cyan-400" />
                          {vid.views.toLocaleString()} {t.reel?.views || 'views'}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 text-pink-400">
                            <Heart className="w-3.5 h-3.5 fill-current" />
                            {vid.likes}
                          </span>
                          <span className="flex items-center gap-1 text-emerald-400">
                            <MessageCircle className="w-3.5 h-3.5" />
                            {vid.commentsCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 3: UPLOADED POSTS
            ───────────────────────────────────────────────────────────── */}
        {activeMainTab === 'posts' && (
          <div>
            {userPosts.length === 0 ? (
              <div className={`p-10 rounded-3xl border text-center space-y-4 ${
                isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900/50 border-white/10 text-slate-200'
              }`}>
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
                  <FileText className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-display font-bold">{t.profile?.emptyPosts || "No Posts Published Yet"}</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto pt-1">
                    Share text reflections, study notes, and diagrams with your followers.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setUploadType('post');
                    setShowUploadModal(true);
                  }}
                  className={`px-5 py-2.5 rounded-xl ${theme.buttonClass} text-xs font-semibold shadow-md transition`}
                >
                  {t.profile?.createPost || 'Create Your First Post'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => setActiveMediaItem({
                      type: 'post',
                      title: post.caption,
                      imageUrl: post.imageUrl,
                      description: post.caption,
                      likes: post.likes,
                      commentsCount: post.commentsCount,
                      creatorName: userProfile?.name || 'Alex Rivera',
                      creatorAvatar: userProfile?.avatar,
                      uploadDate: post.uploadDate
                    })}
                    className={`group rounded-3xl border overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
                      isLight ? 'bg-white border-slate-200 shadow-sm hover:border-emerald-500/40' : 'bg-slate-900/80 border-white/10 hover:border-emerald-500/40'
                    }`}
                  >
                    <div className="aspect-[4/3] bg-slate-950 overflow-hidden relative">
                      <img
                        src={post.imageUrl}
                        alt="Post Media"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-mono text-emerald-300">
                        {post.uploadDate}
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <p className={`text-xs sm:text-sm font-sans leading-relaxed line-clamp-2 ${
                        isLight ? 'text-slate-800' : 'text-slate-200'
                      }`}>
                        {post.caption}
                      </p>
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-white/5">
                        <span className="flex items-center gap-1 text-pink-400">
                          <Heart className="w-3.5 h-3.5 fill-current" />
                          {post.likes} Likes
                        </span>
                        <span className="flex items-center gap-1 text-cyan-400">
                          <MessageCircle className="w-3.5 h-3.5" />
                          {post.commentsCount} Comments
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 4: ACTIVITY SECTION
            ───────────────────────────────────────────────────────────── */}
        {activeMainTab === 'activity' && (
          <div className="space-y-4">
            {/* Activity Sub-Tabs & Filters */}
            <div className={`p-3 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-white/10'
            }`}>
              {/* Categories */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => setActivitySubTab('liked')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                    activitySubTab === 'liked'
                      ? 'bg-pink-500 text-white shadow-md'
                      : isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>{t.profile?.likedTab || 'Liked'} ({likedActivities.length})</span>
                </button>

                <button
                  onClick={() => setActivitySubTab('saved')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                    activitySubTab === 'saved'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                      : isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                  <span>{t.profile?.savedTab || 'Saved'} ({savedActivities.length})</span>
                </button>

                <button
                  onClick={() => setActivitySubTab('comments')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                    activitySubTab === 'comments'
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                      : isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{t.profile?.commentsTab || 'Comments'} ({commentActivities.length})</span>
                </button>

                <button
                  onClick={() => setActivitySubTab('milestones')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                    activitySubTab === 'milestones'
                      ? 'bg-violet-500 text-white shadow-md'
                      : isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5" />
                  <span>{t.profile?.milestonesTab || 'Milestones & XP'}</span>
                </button>
              </div>

              {/* Type Filter */}
              {(activitySubTab === 'liked' || activitySubTab === 'saved') && (
                <div className="flex items-center gap-1 text-[11px] font-mono">
                  <Filter className="w-3 h-3 text-slate-400 mr-1" />
                  {(['all', 'reels', 'videos', 'posts'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setActivityFilter(f)}
                      className={`px-2 py-1 rounded-lg uppercase tracking-wider transition ${
                        activityFilter === f
                          ? 'bg-white/20 font-bold text-cyan-400 border border-cyan-400/40'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {f === 'all' ? (t.profile?.all || 'all') : f === 'reels' ? (t.profile?.reelsTab || 'reels') : f === 'videos' ? (t.profile?.videosTab || 'videos') : (t.profile?.postsTab || 'posts')}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* SubTab 1: Liked Content */}
            {activitySubTab === 'liked' && (
              <div>
                {filteredLiked.length === 0 ? (
                  <div className={`p-8 rounded-3xl border text-center space-y-3 ${
                    isLight ? 'bg-white border-slate-200' : 'bg-slate-900/40 border-white/10'
                  }`}>
                    <Heart className="w-10 h-10 text-pink-400 mx-auto opacity-50" />
                    <h3 className="text-sm font-bold font-display">{t.profile?.emptyLiked || "No Liked Content Found"}</h3>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">
                      Explore the AI Reels feed and like insightful content to populate your activity log.
                    </p>
                    <button
                      onClick={() => setCurrentPage('feed')}
                      className={`px-4 py-2 rounded-xl ${theme.buttonClass} text-xs font-semibold`}
                    >
                      {t.profile?.exploreFeed || "Explore Feed"}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {filteredLiked.map((item) => (
                      <div
                        key={item.id}
                        className={`p-3 rounded-2xl border flex flex-col justify-between space-y-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                          isLight ? 'bg-white border-slate-200 hover:border-pink-300' : 'bg-slate-900/70 border-white/10 hover:border-pink-500/30'
                        }`}
                      >
                        <div 
                          className="flex gap-3 cursor-pointer"
                          onClick={() => setActiveMediaItem({
                            type: item.type,
                            title: item.title,
                            videoUrl: item.videoUrl || '/videos/flower.mp4',
                            description: item.caption || item.title,
                            likes: item.likes,
                            commentsCount: item.commentsCount,
                            creatorName: item.creatorName,
                            creatorAvatar: item.creatorAvatar,
                            uploadDate: item.date
                          })}
                        >
                          <div className="relative w-16 h-20 rounded-xl bg-slate-950 overflow-hidden flex-shrink-0">
                            <img
                              src={item.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&q=80'}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                              <Play className="w-4 h-4 text-white fill-white" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0 space-y-1">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-pink-400 font-semibold block">
                              {item.type}
                            </span>
                            <h4 className={`text-xs font-bold line-clamp-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                              {item.title}
                            </h4>
                            <span className="text-[10px] text-slate-400 block truncate">
                              By {item.creatorName || 'Creator'}
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                          <span className="text-[10px]">{item.date}</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => toggleLike(item.contentId, item)}
                              className="p-1 rounded-lg text-pink-500 hover:bg-pink-500/10 transition"
                              title="Unlike Content"
                            >
                              <Heart className="w-3.5 h-3.5 fill-current" />
                            </button>
                            <button
                              onClick={() => setActiveMediaItem({
                                type: item.type,
                                title: item.title,
                                videoUrl: item.videoUrl || '/videos/flower.mp4',
                                description: item.caption || item.title,
                                likes: item.likes,
                                commentsCount: item.commentsCount,
                                creatorName: item.creatorName,
                                creatorAvatar: item.creatorAvatar,
                                uploadDate: item.date
                              })}
                              className="p-1 rounded-lg text-cyan-400 hover:bg-cyan-500/10 transition"
                              title="Open & Play"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SubTab 2: Saved Content */}
            {activitySubTab === 'saved' && (
              <div>
                {filteredSaved.length === 0 ? (
                  <div className={`p-8 rounded-3xl border text-center space-y-3 ${
                    isLight ? 'bg-white border-slate-200' : 'bg-slate-900/40 border-white/10'
                  }`}>
                    <Bookmark className="w-10 h-10 text-cyan-400 mx-auto opacity-50" />
                    <h3 className="text-sm font-bold font-display">{t.profile?.emptySaved || "No Saved Content Yet"}</h3>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">
                      Bookmark reels, long-form videos, or notes to review them anytime in your profile.
                    </p>
                    <button
                      onClick={() => setCurrentPage('feed')}
                      className={`px-4 py-2 rounded-xl ${theme.buttonClass} text-xs font-semibold`}
                    >
                      {t.profile?.exploreFeed || "Explore Feed & Save"}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {filteredSaved.map((item) => (
                      <div
                        key={item.id}
                        className={`p-3 rounded-2xl border flex flex-col justify-between space-y-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                          isLight ? 'bg-white border-slate-200 hover:border-cyan-300' : 'bg-slate-900/70 border-white/10 hover:border-cyan-500/30'
                        }`}
                      >
                        <div 
                          className="flex gap-3 cursor-pointer"
                          onClick={() => setActiveMediaItem({
                            type: item.type,
                            title: item.title,
                            videoUrl: item.videoUrl || '/videos/flower.mp4',
                            description: item.caption || item.title,
                            likes: item.likes,
                            commentsCount: item.commentsCount,
                            creatorName: item.creatorName,
                            creatorAvatar: item.creatorAvatar,
                            uploadDate: item.date
                          })}
                        >
                          <div className="relative w-16 h-20 rounded-xl bg-slate-950 overflow-hidden flex-shrink-0">
                            <img
                              src={item.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&q=80'}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                              <Play className="w-4 h-4 text-white fill-white" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0 space-y-1">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
                              {item.type}
                            </span>
                            <h4 className={`text-xs font-bold line-clamp-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                              {item.title}
                            </h4>
                            <span className="text-[10px] text-slate-400 block truncate">
                              By {item.creatorName || 'Creator'}
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                          <span className="text-[10px]">{item.date}</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => toggleSave(item)}
                              className="p-1 rounded-lg text-amber-400 hover:bg-amber-400/10 transition"
                              title="Un-save"
                            >
                              <Bookmark className="w-3.5 h-3.5 fill-current" />
                            </button>
                            <button
                              onClick={() => setActiveMediaItem({
                                type: item.type,
                                title: item.title,
                                videoUrl: item.videoUrl || '/videos/flower.mp4',
                                description: item.caption || item.title,
                                likes: item.likes,
                                commentsCount: item.commentsCount,
                                creatorName: item.creatorName,
                                creatorAvatar: item.creatorAvatar,
                                uploadDate: item.date
                              })}
                              className="p-1 rounded-lg text-cyan-400 hover:bg-cyan-500/10 transition"
                              title="Open & Play"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SubTab 3: Comments */}
            {activitySubTab === 'comments' && (
              <div>
                {commentActivities.length === 0 ? (
                  <div className={`p-8 rounded-3xl border text-center space-y-3 ${
                    isLight ? 'bg-white border-slate-200' : 'bg-slate-900/40 border-white/10'
                  }`}>
                    <MessageCircle className="w-10 h-10 text-emerald-400 mx-auto opacity-50" />
                    <h3 className="text-sm font-bold font-display">{t.profile?.emptyComments || "No Comments Found"}</h3>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">
                      Engage with educational reels, ask questions, or share helpful solutions to see your comments here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {commentActivities.map((c) => (
                      <div
                        key={c.id}
                        className={`p-4 rounded-2xl border flex items-start justify-between gap-4 transition ${
                          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/70 border-white/10'
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          <div className="w-12 h-14 rounded-xl bg-slate-950 overflow-hidden flex-shrink-0">
                            <img
                              src={c.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&q=80'}
                              alt="Content"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono font-semibold uppercase text-emerald-400">
                                {c.contentType}
                              </span>
                              <span className="text-[10px] text-slate-400">• {c.timeAgo}</span>
                            </div>
                            <p className={`text-xs sm:text-sm font-medium ${isLight ? 'text-slate-800' : 'text-slate-100'}`}>
                              "{c.commentText}"
                            </p>
                            <span className="text-[10px] text-slate-400 block pt-0.5">
                              On: {c.contentTitle}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => setActiveMediaItem({
                            type: c.contentType,
                            title: c.contentTitle,
                            videoUrl: c.videoUrl || '/videos/flower.mp4',
                            description: c.commentText,
                            uploadDate: c.timeAgo
                          })}
                          className="p-2 rounded-xl border border-white/10 hover:border-cyan-400/40 text-cyan-400 text-xs flex items-center gap-1"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">View</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SubTab 4: Milestones & Platform Engagement */}
            {activitySubTab === 'milestones' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div className={`p-4 rounded-2xl border space-y-2 ${
                  isLight ? 'bg-white border-slate-200' : 'bg-slate-900/70 border-white/10'
                }`}>
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
                    <Trophy className="w-4 h-4" />
                    <span>XP & LEVEL PROGRESS</span>
                  </div>
                  <h4 className="text-xl font-black font-display text-white">
                    {userProfile?.xp || 1420} XP
                  </h4>
                  <p className="text-xs text-slate-400">
                    Level {userProfile?.level || 4} Creator. Next level at 1,500 XP (+80 XP required).
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border space-y-2 ${
                  isLight ? 'bg-white border-slate-200' : 'bg-slate-900/70 border-white/10'
                }`}>
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold">
                    <Flame className="w-4 h-4" />
                    <span>ACTIVE LEARNING STREAK</span>
                  </div>
                  <h4 className="text-xl font-black font-display text-white">
                    {userProfile?.streakDays || 6} Days Streak
                  </h4>
                  <p className="text-xs text-slate-400">
                    Completed daily attention sessions consecutively without passive doom-scrolling.
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border space-y-2 ${
                  isLight ? 'bg-white border-slate-200' : 'bg-slate-900/70 border-white/10'
                }`}>
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                    <Clock className="w-4 h-4" />
                    <span>ATTENTION NUTRITION</span>
                  </div>
                  <h4 className="text-xl font-black font-display text-white">
                    {userProfile?.minutesUsedToday || 14} / {userProfile?.attentionBudgetMinutes || 30}m
                  </h4>
                  <p className="text-xs text-slate-400">
                    46% of attention budget remaining today. 92% meaningful engagement score.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. MEDIA VIEWER MODAL (Plays Reels, Videos, & Views Posts)
          ───────────────────────────────────────────────────────────── */}
      {activeMediaItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-fade-in select-none">
          <div className="relative w-full max-w-2xl bg-slate-950 border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-3.5 sm:p-4 border-b border-white/10 flex items-center justify-between bg-slate-900/80">
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30">
                  {activeMediaItem.type}
                </span>
                <h3 className="text-sm font-display font-bold text-white line-clamp-1">
                  {activeMediaItem.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveMediaItem(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Player Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeMediaItem.type === 'post' ? (
                <div className="rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src={activeMediaItem.imageUrl}
                    alt="Post media"
                    className="w-full max-h-[55vh] object-cover"
                  />
                </div>
              ) : (
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video flex items-center justify-center">
                  <video
                    src={activeMediaItem.videoUrl || '/videos/flower.mp4'}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* Description & Metadata */}
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                  {activeMediaItem.description}
                </p>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-white/10">
                  <span className="text-[11px]">
                    By {activeMediaItem.creatorName || 'Alex Rivera'}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-pink-400">
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      {activeMediaItem.likes || 120}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <MessageCircle className="w-3.5 h-3.5" />
                      {activeMediaItem.commentsCount || 14}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. QUICK UPLOAD / CREATE MODAL
          ───────────────────────────────────────────────────────────── */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-fade-in select-none">
          <div className={`w-full max-w-lg rounded-3xl border shadow-2xl p-5 sm:p-6 space-y-4 ${
            isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-white/15 text-white'
          }`}>
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-display font-bold">{t.profile?.createPost || "Publish to Your Profile"}</h3>
              <button onClick={() => setShowUploadModal(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleCreateContent} className="space-y-3">
              <div className="flex gap-2">
                {(['reel', 'video', 'post'] as const).map((tp) => (
                  <button
                    type="button"
                    key={tp}
                    onClick={() => setUploadType(tp)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
                      uploadType === tp
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : isLight ? 'bg-slate-100 text-slate-700' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {tp === 'reel' ? (t.profile?.reelsTab || 'reel') : tp === 'video' ? (t.profile?.videosTab || 'video') : (t.profile?.postsTab || 'post')}
                  </button>
                ))}
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-400">
                    {uploadType === 'post' ? 'Post Caption' : 'Title / Caption'}
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowAIAssistModal(true)}
                    className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-cyan-500/20 to-pink-500/20 hover:from-cyan-500/30 hover:to-pink-500/30 border border-cyan-400/40 text-cyan-400 hover:text-white text-[11px] font-extrabold flex items-center gap-1.5 transition shadow-sm active:scale-95"
                  >
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>✨ Generate with AI</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={uploadType === 'post' ? 'Write your post caption...' : 'Enter title...'}
                  className={`w-full text-xs sm:text-sm p-2.5 rounded-xl border outline-none ${
                    isLight ? 'bg-slate-100 border-slate-300' : 'bg-slate-800 border-white/10'
                  }`}
                />
              </div>

              {uploadType !== 'post' && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Description</label>
                  <textarea
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    rows={2}
                    placeholder="Short description..."
                    className={`w-full text-xs p-2.5 rounded-xl border outline-none resize-none ${
                      isLight ? 'bg-slate-100 border-slate-300' : 'bg-slate-800 border-white/10'
                    }`}
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Thumbnail / Image URL (Optional)</label>
                <input
                  type="text"
                  value={newMediaUrl}
                  onChange={(e) => setNewMediaUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className={`w-full text-xs p-2.5 rounded-xl border outline-none ${
                    isLight ? 'bg-slate-100 border-slate-300' : 'bg-slate-800 border-white/10'
                  }`}
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold"
                >
                  {t.profile?.cancel || 'Cancel'}
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2 rounded-xl ${theme.buttonClass} text-xs font-semibold shadow-md`}
                >
                  {t.profile?.publishNow || 'Publish Now'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      {/* Optional AI Content Suggestion Assistant */}
      <AIAssistModal
        isOpen={showAIAssistModal}
        onClose={() => setShowAIAssistModal(false)}
        contentType={uploadType}
        initialTitle={newTitle}
        initialDesc={newDesc}
        onApply={(data) => {
          if (data.caption || data.title) {
            setNewTitle(data.caption || data.title || '');
          }
          if (data.description) {
            setNewDesc(data.description);
          }
          if (data.thumbnailUrl) {
            setNewMediaUrl(data.thumbnailUrl);
          }
        }}
      />
    </div>
  );
};
