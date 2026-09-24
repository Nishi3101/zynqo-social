import React, { useState, useEffect, useMemo } from 'react';
import { 
  BarChart3, 
  Eye, 
  Heart, 
  MessageSquare, 
  Share2, 
  Users, 
  TrendingUp, 
  Sparkles, 
  ArrowLeft, 
  Plus, 
  Wand2, 
  Video, 
  Clock, 
  Sun, 
  Moon, 
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { themes } from '../utils/theme';
import { CreatorDashboardData, CreatorAnalyticsPost, CreatorDailyStats } from '../types';

export const CreatorDashboardView: React.FC = () => {
  const { 
    userProfile, 
    setCurrentPage, 
    openModal, 
    colorMode, 
    toggleColorMode, 
    currentTheme,
    userReels,
    userVideos,
    userPosts
  } = useApp();

  const isLight = colorMode === 'light';
  const theme = themes[currentTheme] || themes.rose;

  // Selected time frame filter: 7d, 14d, 30d
  const [timeRange, setTimeRange] = useState<'7d' | '14d' | '30d'>('7d');
  const [activeSeries, setActiveSeries] = useState<{ views: boolean; likes: boolean }>({ views: true, likes: true });
  const [hoveredPoint, setHoveredPoint] = useState<CreatorDailyStats | null>(null);
  const [contentFilter, setContentFilter] = useState<'all' | 'reels' | 'videos' | 'posts' | 'scheduled'>('all');

  // Fallback initial data
  const defaultDashboardData: CreatorDashboardData = useMemo(() => ({
    totalViews: 542800,
    totalLikes: 84320,
    totalComments: 12450,
    totalShares: 18900,
    followers: userProfile?.followersCount || 24650,
    followersGained: '+1,240',
    viewsTrend: '+14.2%',
    likesTrend: '+9.8%',
    commentsTrend: '+22.4%',
    sharesTrend: '+31.5%',
    avgWatchTime: '44.2s',
    completionRate: '78.4%',
    meaningfulEngagementRate: '18.6%',
    weeklyAnalytics: [
      { date: 'Mon', label: 'Oct 17', views: 24500, likes: 3800 },
      { date: 'Tue', label: 'Oct 18', views: 38400, likes: 5900 },
      { date: 'Wed', label: 'Oct 19', views: 31200, likes: 4700 },
      { date: 'Thu', label: 'Oct 20', views: 42100, likes: 6800 },
      { date: 'Fri', label: 'Oct 21', views: 56900, likes: 9200 },
      { date: 'Sat', label: 'Oct 22', views: 68400, likes: 11400 },
      { date: 'Sun', label: 'Oct 23', views: 59200, likes: 9800 }
    ],
    recentPosts: [
      {
        id: 'post-1',
        title: 'Deep Learning: Attention Mechanisms in 45s',
        type: 'reel',
        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
        publishedAt: '2 days ago',
        views: 124500,
        likes: 21300,
        comments: 2410,
        shares: 3820,
        performance: 'Viral Hit'
      },
      {
        id: 'post-2',
        title: 'Vadodara Navratri Raas: Garba Step Tutorial',
        type: 'reel',
        thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
        publishedAt: '5 days ago',
        views: 98200,
        likes: 18400,
        comments: 1820,
        shares: 4200,
        performance: 'High Retention'
      },
      {
        id: 'post-3',
        title: 'Quantum Computing Explained with Simple Polarizers',
        type: 'video',
        thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80',
        publishedAt: '1 week ago',
        views: 64100,
        likes: 11200,
        comments: 980,
        shares: 1450,
        performance: 'Steady Growth'
      },
      {
        id: 'post-4',
        title: 'Next-Gen AI Video Pipelines with Transformers',
        type: 'reel',
        thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&q=80',
        publishedAt: 'Oct 26 at 10:00 AM',
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        isScheduled: true,
        performance: 'Scheduled'
      }
    ],
    audienceDemographics: {
      topCountries: ['United States 34%', 'India 28%', 'United Kingdom 14%', 'Germany 8%'],
      topAges: ['18-24 (42%)', '25-34 (44%)', '35-44 (12%)']
    },
    aiCoachFeedback: {
      overallScore: 'A (Top 5% of educational creators)',
      strengths: [
        'Opening 3 seconds have exceptional 92% retention due to direct curiosity hook.',
        'Interactive "Make This Useful" button generated 1,420 note saves.'
      ],
      improvementOpportunities: [
        'Viewer drop-off occurs slightly at second 32. Consider inserting a visual pattern interrupt or quick cut.'
      ]
    }
  }), [userProfile?.followersCount]);

  const [dashboardData, setDashboardData] = useState<CreatorDashboardData>(defaultDashboardData);

  // Fetch creator analytics from backend if available
  useEffect(() => {
    fetch('/api/creator/analytics')
      .then(res => res.headers.get('content-type')?.includes('application/json') ? res.json() : null)
      .then(data => {
        if (data && data.success && data.analytics) {
          setDashboardData(prev => ({
            ...prev,
            ...data.analytics,
            totalViews: typeof data.analytics.totalViews === 'number' ? data.analytics.totalViews : prev.totalViews,
            totalLikes: typeof data.analytics.totalLikes === 'number' ? data.analytics.totalLikes : prev.totalLikes,
            totalComments: typeof data.analytics.totalComments === 'number' ? data.analytics.totalComments : prev.totalComments,
            totalShares: typeof data.analytics.totalShares === 'number' ? data.analytics.totalShares : prev.totalShares,
            followers: typeof data.analytics.followers === 'number' ? data.analytics.followers : prev.followers,
            weeklyAnalytics: Array.isArray(data.analytics.weeklyAnalytics) ? data.analytics.weeklyAnalytics : prev.weeklyAnalytics,
            recentPosts: Array.isArray(data.analytics.recentPosts) && data.analytics.recentPosts.length > 0 ? data.analytics.recentPosts : prev.recentPosts
          }));
        }
      })
      .catch(err => {
        console.warn('Creator analytics fetch notice:', err);
      });
  }, [defaultDashboardData]);

  // Merge uploaded user content into recent posts so creator's own uploads appear live
  const combinedRecentPosts: CreatorAnalyticsPost[] = useMemo(() => {
    const customPosts: CreatorAnalyticsPost[] = [];

    // User uploaded reels
    userReels.forEach(r => {
      customPosts.push({
        id: r.id,
        title: r.title,
        type: 'reel',
        thumbnail: r.thumbnail || (r.videoUrl ? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80' : undefined),
        videoUrl: r.videoUrl,
        publishedAt: 'Recently uploaded',
        views: r.views || Math.floor(Math.random() * 8000) + 1200,
        likes: r.likes || Math.floor(Math.random() * 1200) + 140,
        comments: r.commentsCount || (r.comments?.length || 0),
        shares: Math.floor(Math.random() * 320) + 25,
        performance: 'Growing'
      });
    });

    // User uploaded videos
    userVideos.forEach(v => {
      customPosts.push({
        id: v.id,
        title: v.title,
        type: 'video',
        thumbnail: v.thumbnail,
        videoUrl: v.videoUrl,
        publishedAt: v.uploadDate || 'Recently uploaded',
        views: v.views || 450,
        likes: v.likes || 62,
        comments: v.commentsCount || 12,
        shares: 18,
        performance: 'Steady Growth'
      });
    });

    // User posts
    userPosts.forEach(p => {
      customPosts.push({
        id: p.id,
        title: p.caption?.slice(0, 45) || 'Creator Post',
        type: 'post',
        thumbnail: p.imageUrl,
        publishedAt: p.uploadDate || 'Recently uploaded',
        views: p.likes * 12 || 850,
        likes: p.likes || 45,
        comments: p.commentsCount || 8,
        shares: 14,
        performance: 'Steady Growth'
      });
    });

    // Combine custom posts first, then default posts
    const all = [...customPosts, ...dashboardData.recentPosts];
    // Remove duplicate IDs
    const seen = new Set<string>();
    return all.filter(p => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });
  }, [userReels, userVideos, userPosts, dashboardData.recentPosts]);

  // Filtered posts based on content tab
  const filteredPosts = useMemo(() => {
    if (contentFilter === 'all') return combinedRecentPosts;
    if (contentFilter === 'reels') return combinedRecentPosts.filter(p => p.type === 'reel');
    if (contentFilter === 'videos') return combinedRecentPosts.filter(p => p.type === 'video');
    if (contentFilter === 'posts') return combinedRecentPosts.filter(p => p.type === 'post');
    if (contentFilter === 'scheduled') return combinedRecentPosts.filter(p => p.isScheduled);
    return combinedRecentPosts;
  }, [combinedRecentPosts, contentFilter]);

  // Multiplier based on time range
  const rangeMultiplier = timeRange === '7d' ? 1 : timeRange === '14d' ? 1.85 : 3.4;

  const currentTotalViews = Math.round(dashboardData.totalViews * (rangeMultiplier / 3.4));
  const currentTotalLikes = Math.round(dashboardData.totalLikes * (rangeMultiplier / 3.4));
  const currentTotalComments = Math.round(dashboardData.totalComments * (rangeMultiplier / 3.4));
  const currentTotalShares = Math.round(dashboardData.totalShares * (rangeMultiplier / 3.4));

  // Chart data points based on time range
  const chartPoints = useMemo(() => {
    const base = dashboardData.weeklyAnalytics;
    if (timeRange === '7d') {
      return base;
    }
    if (timeRange === '14d') {
      const prevWeek: CreatorDailyStats[] = [
        { date: 'Mon', label: 'Oct 10', views: 18200, likes: 2900 },
        { date: 'Tue', label: 'Oct 11', views: 29400, likes: 4400 },
        { date: 'Wed', label: 'Oct 12', views: 25100, likes: 3800 },
        { date: 'Thu', label: 'Oct 13', views: 34200, likes: 5200 },
        { date: 'Fri', label: 'Oct 14', views: 48900, likes: 7800 },
        { date: 'Sat', label: 'Oct 15', views: 54100, likes: 8900 },
        { date: 'Sun', label: 'Oct 16', views: 46800, likes: 7400 }
      ];
      return [...prevWeek, ...base];
    }
    // 30d synthetic curve
    const extended: CreatorDailyStats[] = [];
    const days = 30;
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayLabel = `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}`;
      const weekday = d.toLocaleString('default', { weekday: 'short' });
      const cycle = Math.sin((i / days) * Math.PI * 4);
      const v = Math.round(35000 + cycle * 18000 + (days - i) * 600);
      const l = Math.round(v * 0.16 + (Math.random() * 400 - 200));
      extended.push({
        date: weekday,
        label: dayLabel,
        views: Math.max(12000, v),
        likes: Math.max(2000, l)
      });
    }
    return extended;
  }, [dashboardData.weeklyAnalytics, timeRange]);

  // Compute SVG chart coordinates
  const { maxViews, minViews, maxLikes, svgWidth, svgHeight, viewsPath, likesPath, viewsAreaPath, likesAreaPath, pointCoords } = useMemo(() => {
    const width = 800;
    const height = 240;
    const paddingX = 40;
    const paddingY = 30;

    let maxV = 1000;
    let minV = 0;
    let maxL = 1000;

    chartPoints.forEach(p => {
      if (p.views > maxV) maxV = p.views;
      if (p.likes > maxL) maxL = p.likes;
    });

    maxV = Math.ceil((maxV * 1.1) / 5000) * 5000;
    maxL = Math.ceil((maxL * 1.1) / 1000) * 1000;

    const count = chartPoints.length;
    const stepX = (width - paddingX * 2) / Math.max(count - 1, 1);

    const coords: Array<{ x: number; yViews: number; yLikes: number; data: CreatorDailyStats }> = [];

    chartPoints.forEach((p, idx) => {
      const x = paddingX + idx * stepX;
      const normV = (p.views - minV) / (maxV - minV || 1);
      const yViews = height - paddingY - normV * (height - paddingY * 2);

      const normL = p.likes / (maxL || 1);
      const yLikes = height - paddingY - normL * (height - paddingY * 2);

      coords.push({ x, yViews, yLikes, data: p });
    });

    const vPath = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.yViews.toFixed(1)}`).join(' ');
    const lPath = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.yLikes.toFixed(1)}`).join(' ');

    const bottomY = height - paddingY;
    const vArea = coords.length > 0 
      ? `${vPath} L ${coords[coords.length - 1].x.toFixed(1)} ${bottomY} L ${coords[0].x.toFixed(1)} ${bottomY} Z`
      : '';
    const lArea = coords.length > 0 
      ? `${lPath} L ${coords[coords.length - 1].x.toFixed(1)} ${bottomY} L ${coords[0].x.toFixed(1)} ${bottomY} Z`
      : '';

    return {
      maxViews: maxV,
      minViews: minV,
      maxLikes: maxL,
      svgWidth: width,
      svgHeight: height,
      viewsPath: vPath,
      likesPath: lPath,
      viewsAreaPath: vArea,
      likesAreaPath: lArea,
      pointCoords: coords
    };
  }, [chartPoints]);

  return (
    <div className="w-full min-h-screen font-sans transition-colors duration-200">
      {/* ─────────────────────────────────────────────────────────────
          1. DASHBOARD TOP BAR & BREADCRUMBS
          ───────────────────────────────────────────────────────────── */}
      <header className={`sticky top-0 z-30 px-4 sm:px-6 lg:px-8 py-3.5 border-b backdrop-blur-xl transition-colors duration-200 flex items-center justify-between ${
        isLight ? 'bg-white/85 border-slate-200 shadow-sm' : 'bg-slate-950/85 border-white/10'
      }`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage('profile')}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all hover:-translate-y-0.5 active:translate-y-0 ${
              isLight 
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300' 
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-white/15'
            }`}
            title="Back to Profile"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Profile</span>
          </button>

          <div className="h-4 w-px bg-slate-400/30 hidden sm:block" />

          <div>
            <div className="flex items-center gap-2">
              <h1 className={`text-base sm:text-lg font-black tracking-tight font-display flex items-center gap-2 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                <span>Creator Dashboard</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  Pro Analytics
                </span>
              </h1>
            </div>
            <p className="text-[11px] text-slate-400 hidden md:block">
              Real-time viewer reach, content retention & post monetization metrics
            </p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2">
          {/* Quick AI Script Studio Trigger */}
          <button
            onClick={() => openModal('creatorStudio')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition hover:-translate-y-0.5 active:translate-y-0 ${
              isLight
                ? 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
                : 'bg-purple-950/40 text-purple-300 border-purple-500/30 hover:bg-purple-900/50'
            }`}
            title="Open AI Script & Hook Generator"
          >
            <Wand2 className="w-3.5 h-3.5 text-purple-400" />
            <span>AI Script Studio</span>
          </button>

          {/* New Reel Upload CTA */}
          <button
            onClick={() => openModal('creatorStudio')}
            className={`px-3.5 py-1.5 rounded-xl ${theme.buttonClass} text-xs font-bold shadow-md flex items-center gap-1.5 transition-all hover:-translate-y-0.5 active:translate-y-0`}
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Upload Content</span>
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleColorMode}
            className={`p-2 rounded-xl border transition-all ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                : 'bg-slate-900 hover:bg-slate-800 text-amber-300 border-white/15'
            }`}
            title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {isLight ? <Moon className="w-4 h-4 text-indigo-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. CREATOR PROFILE SNAPSHOT BANNER
          ───────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className={`p-4 sm:p-5 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-xl ${
          isLight ? 'bg-white/80 border-slate-200 shadow-sm' : 'bg-slate-900/70 border-white/10'
        }`}>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl p-0.5 bg-gradient-to-tr ${theme.gradient} shadow-md flex-shrink-0`}>
              <img
                src={userProfile?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                alt={userProfile?.name || 'Creator'}
                className="w-full h-full rounded-[14px] object-cover bg-slate-950"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className={`font-black text-sm sm:text-base font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {userProfile?.name || 'Alex Rivera'}
                </h2>
                <span className="text-xs font-mono font-semibold text-rose-500">
                  {userProfile?.handle || '@alex_explorer'}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-sans font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  Verified Creator
                </span>
              </div>
              <p className="text-xs text-slate-400 pt-0.5 line-clamp-1">
                {userProfile?.bio || 'AI Creator & Digital Explorer. Crafting interactive educational reels.'}
              </p>
            </div>
          </div>

          {/* Time Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl border bg-slate-950/20 self-start md:self-auto border-white/10">
            {(['7d', '14d', '30d'] as const).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-mono transition-all ${
                  timeRange === range
                    ? isLight 
                      ? 'bg-rose-500 text-white shadow-md' 
                      : 'bg-rose-600 text-white shadow-md shadow-rose-900/40'
                    : isLight 
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {range === '7d' ? '7 Days' : range === '14d' ? '14 Days' : '30 Days'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. CORE KPI ANALYTICS METRICS (Views, Likes, Comments, Shares, Followers)
          ───────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          
          {/* KPI 1: Total Views */}
          <div className={`p-4 rounded-3xl border transition-all hover:scale-[1.01] ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-white/10'
          }`}>
            <div className="flex items-center justify-between pb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Total Views</span>
              <div className="p-2 rounded-xl bg-rose-500/15 text-rose-500 border border-rose-500/25">
                <Eye className="w-4 h-4" />
              </div>
            </div>
            <div className={`text-xl sm:text-2xl font-black font-display tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {currentTotalViews.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 pt-1.5 text-[11px] font-mono text-emerald-500">
              <TrendingUp className="w-3 h-3" />
              <span className="font-semibold">{dashboardData.viewsTrend || '+14.2%'}</span>
              <span className="text-slate-400 text-[10px]">vs prev period</span>
            </div>
          </div>

          {/* KPI 2: Total Likes */}
          <div className={`p-4 rounded-3xl border transition-all hover:scale-[1.01] ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-white/10'
          }`}>
            <div className="flex items-center justify-between pb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Total Likes</span>
              <div className="p-2 rounded-xl bg-pink-500/15 text-pink-500 border border-pink-500/25">
                <Heart className="w-4 h-4" />
              </div>
            </div>
            <div className={`text-xl sm:text-2xl font-black font-display tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {currentTotalLikes.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 pt-1.5 text-[11px] font-mono text-emerald-500">
              <TrendingUp className="w-3 h-3" />
              <span className="font-semibold">{dashboardData.likesTrend || '+9.8%'}</span>
              <span className="text-slate-400 text-[10px]">engagement</span>
            </div>
          </div>

          {/* KPI 3: Total Comments */}
          <div className={`p-4 rounded-3xl border transition-all hover:scale-[1.01] ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-white/10'
          }`}>
            <div className="flex items-center justify-between pb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Comments</span>
              <div className="p-2 rounded-xl bg-violet-500/15 text-violet-500 border border-violet-500/25">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <div className={`text-xl sm:text-2xl font-black font-display tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {currentTotalComments.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 pt-1.5 text-[11px] font-mono text-emerald-500">
              <TrendingUp className="w-3 h-3" />
              <span className="font-semibold">{dashboardData.commentsTrend || '+22.4%'}</span>
              <span className="text-slate-400 text-[10px]">conversations</span>
            </div>
          </div>

          {/* KPI 4: Total Shares */}
          <div className={`p-4 rounded-3xl border transition-all hover:scale-[1.01] ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-white/10'
          }`}>
            <div className="flex items-center justify-between pb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Total Shares</span>
              <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-500 border border-cyan-500/25">
                <Share2 className="w-4 h-4" />
              </div>
            </div>
            <div className={`text-xl sm:text-2xl font-black font-display tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {currentTotalShares.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 pt-1.5 text-[11px] font-mono text-emerald-500">
              <TrendingUp className="w-3 h-3" />
              <span className="font-semibold">{dashboardData.sharesTrend || '+31.5%'}</span>
              <span className="text-slate-400 text-[10px]">viral loops</span>
            </div>
          </div>

          {/* KPI 5: Total Followers */}
          <div className={`col-span-2 sm:col-span-1 p-4 rounded-3xl border transition-all hover:scale-[1.01] ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-white/10'
          }`}>
            <div className="flex items-center justify-between pb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Followers</span>
              <div className="p-2 rounded-xl bg-amber-500/15 text-amber-500 border border-amber-500/25">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className={`text-xl sm:text-2xl font-black font-display tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {(dashboardData.followers || 24650).toLocaleString()}
            </div>
            <div className="flex items-center gap-1 pt-1.5 text-[11px] font-mono text-emerald-500">
              <TrendingUp className="w-3 h-3" />
              <span className="font-semibold">{dashboardData.followersGained || '+1,240'}</span>
              <span className="text-slate-400 text-[10px]">new audience</span>
            </div>
          </div>

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. VIEWS & LIKES INTERACTIVE ANALYTICS CHART
          ───────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className={`p-5 sm:p-6 rounded-3xl border shadow-xl backdrop-blur-xl ${
          isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-slate-900/80 border-white/10 shadow-black/40'
        }`}>
          {/* Chart Header & Toggles */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-rose-500" />
                <h3 className={`text-base sm:text-lg font-black font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Views & Likes Performance Trend
                </h3>
              </div>
              <p className="text-xs text-slate-400 pt-0.5">
                Daily comparison of viewer reach and active heart reactions
              </p>
            </div>

            {/* Interactive Series Filters & Metrics */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setActiveSeries(prev => ({ ...prev, views: !prev.views }))}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-mono flex items-center gap-2 border transition ${
                  activeSeries.views
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 shadow-sm'
                    : 'bg-slate-800/40 text-slate-500 border-transparent opacity-60'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
                <span>Views Series</span>
              </button>

              <button
                onClick={() => setActiveSeries(prev => ({ ...prev, likes: !prev.likes }))}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-mono flex items-center gap-2 border transition ${
                  activeSeries.likes
                    ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40 shadow-sm'
                    : 'bg-slate-800/40 text-slate-500 border-transparent opacity-60'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                <span>Likes Series</span>
              </button>

              <div className="hidden lg:flex items-center gap-3 pl-3 border-l border-white/10 text-xs font-mono text-slate-400">
                <span>Avg Watch Time: <strong className={isLight ? 'text-slate-800' : 'text-white'}>{dashboardData.avgWatchTime}</strong></span>
                <span>Completion: <strong className="text-emerald-400">{dashboardData.completionRate}</strong></span>
              </div>
            </div>
          </div>

          {/* SVG Responsive Chart Viewport */}
          <div className="pt-6 relative">
            {/* Tooltip Card on Hover */}
            {hoveredPoint && (
              <div 
                className={`absolute top-2 right-4 z-20 px-3.5 py-2.5 rounded-2xl border shadow-xl backdrop-blur-md text-xs font-mono space-y-1 animate-fade-in ${
                  isLight ? 'bg-slate-900/95 text-white border-slate-700' : 'bg-slate-950/95 text-white border-rose-500/40'
                }`}
              >
                <div className="text-[11px] font-bold text-slate-300 border-b border-white/10 pb-1">
                  📅 {hoveredPoint.label} ({hoveredPoint.date})
                </div>
                <div className="flex items-center justify-between gap-4 text-rose-400">
                  <span>Views:</span>
                  <span className="font-bold">{hoveredPoint.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between gap-4 text-cyan-400">
                  <span>Likes:</span>
                  <span className="font-bold">{hoveredPoint.likes.toLocaleString()}</span>
                </div>
                <div className="text-[10px] text-slate-400 pt-0.5">
                  Ratio: {((hoveredPoint.likes / hoveredPoint.views) * 100).toFixed(1)}% conversion
                </div>
              </div>
            )}

            {/* SVG Chart */}
            <div className="w-full overflow-x-auto overflow-y-hidden">
              <svg 
                viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
                className="w-full h-48 sm:h-64 select-none"
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Views Gradient */}
                  <linearGradient id="creatorViewsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
                  </linearGradient>

                  {/* Likes Gradient */}
                  <linearGradient id="creatorLikesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                {[0.25, 0.5, 0.75, 1].map((pct, i) => {
                  const y = 30 + (svgHeight - 60) * (1 - pct);
                  return (
                    <g key={i}>
                      <line 
                        x1="35" 
                        y1={y} 
                        x2={svgWidth - 35} 
                        y2={y} 
                        stroke={isLight ? '#e2e8f0' : 'rgba(255,255,255,0.07)'} 
                        strokeDasharray="4 4" 
                      />
                      <text
                        x="30"
                        y={y + 3}
                        textAnchor="end"
                        fontSize="9"
                        fill={isLight ? '#64748b' : '#64748b'}
                        fontFamily="monospace"
                      >
                        {Math.round((maxViews * pct) / 1000)}k
                      </text>
                    </g>
                  );
                })}

                {/* Views Area & Line */}
                {activeSeries.views && viewsAreaPath && (
                  <path d={viewsAreaPath} fill="url(#creatorViewsGrad)" />
                )}
                {activeSeries.views && viewsPath && (
                  <path 
                    d={viewsPath} 
                    fill="none" 
                    stroke="#f43f5e" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                )}

                {/* Likes Area & Line */}
                {activeSeries.likes && likesAreaPath && (
                  <path d={likesAreaPath} fill="url(#creatorLikesGrad)" />
                )}
                {activeSeries.likes && likesPath && (
                  <path 
                    d={likesPath} 
                    fill="none" 
                    stroke="#06b6d4" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                )}

                {/* Interactive Points on Views */}
                {pointCoords.map((pt, idx) => {
                  const isHovered = hoveredPoint?.label === pt.data.label;
                  return (
                    <g 
                      key={idx}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredPoint(pt.data)}
                      onClick={() => setHoveredPoint(pt.data)}
                    >
                      {/* Invisible hover hitbox */}
                      <rect
                        x={pt.x - 15}
                        y={0}
                        width={30}
                        height={svgHeight}
                        fill="transparent"
                      />

                      {/* Views circle point */}
                      {activeSeries.views && (
                        <circle
                          cx={pt.x}
                          cy={pt.yViews}
                          r={isHovered ? 6 : 3.5}
                          fill="#f43f5e"
                          stroke={isLight ? '#ffffff' : '#0d0b14'}
                          strokeWidth="2"
                          className="transition-all duration-150"
                        />
                      )}

                      {/* Likes circle point */}
                      {activeSeries.likes && (
                        <circle
                          cx={pt.x}
                          cy={pt.yLikes}
                          r={isHovered ? 5.5 : 3}
                          fill="#06b6d4"
                          stroke={isLight ? '#ffffff' : '#0d0b14'}
                          strokeWidth="2"
                          className="transition-all duration-150"
                        />
                      )}

                      {/* X-axis date labels */}
                      {(idx % (timeRange === '30d' ? 5 : timeRange === '14d' ? 2 : 1) === 0) && (
                        <text
                          x={pt.x}
                          y={svgHeight - 10}
                          textAnchor="middle"
                          fontSize="9"
                          fill={isLight ? '#64748b' : '#94a3b8'}
                          fontFamily="monospace"
                        >
                          {pt.data.date}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="flex items-center justify-between pt-2 text-[11px] font-mono text-slate-400">
              <span>Hover or tap data points to inspect daily metrics</span>
              <span className="text-rose-400 font-semibold">Peak Day: {chartPoints.reduce((max, p) => p.views > max.views ? p : max, chartPoints[0])?.label}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. RECENT CREATOR POSTS & CONTENT PERFORMANCE
          ───────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className={`p-5 sm:p-6 rounded-3xl border shadow-xl backdrop-blur-xl space-y-5 ${
          isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-slate-900/80 border-white/10 shadow-black/40'
        }`}>
          {/* Section Header & Content Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-pink-500" />
                <h3 className={`text-base sm:text-lg font-black font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Recent Posts & Content Performance
                </h3>
              </div>
              <p className="text-xs text-slate-400 pt-0.5">
                Detailed breakdowns of your latest reels, videos, and scheduled posts
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl border bg-slate-950/20 border-white/10 overflow-x-auto max-w-full">
              {(['all', 'reels', 'videos', 'posts', 'scheduled'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setContentFilter(tab)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                    contentFilter === tab
                      ? isLight
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-white text-slate-950 shadow-md'
                      : isLight
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab === 'all' ? 'All Content' : tab}
                </button>
              ))}
            </div>
          </div>

          {/* Posts List / Table View */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 mx-auto flex items-center justify-center">
                <Video className="w-6 h-6" />
              </div>
              <p className={`text-sm font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                No posts found for this filter
              </p>
              <button
                onClick={() => openModal('creatorStudio')}
                className={`px-4 py-2 rounded-xl ${theme.buttonClass} text-xs font-semibold`}
              >
                Upload Content Now
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPosts.map(post => (
                <div
                  key={post.id}
                  className={`p-3.5 sm:p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200 hover:border-rose-500/30 ${
                    isLight 
                      ? 'bg-slate-50/80 hover:bg-slate-100/80 border-slate-200' 
                      : 'bg-slate-950/50 hover:bg-slate-950/90 border-white/5'
                  }`}
                >
                  {/* Left: Thumbnail & Post Meta */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-14 h-18 sm:w-16 sm:h-20 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0 relative border border-white/10 shadow-sm">
                      <img
                        src={post.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&q=80'}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/75 text-[9px] font-mono text-white">
                        {post.type.toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                          post.performance === 'Viral Hit'
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : post.performance === 'High Retention'
                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                            : post.performance === 'Scheduled'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-slate-500/20 text-slate-300 border border-slate-500/30'
                        }`}>
                          {post.performance || 'Active'}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.publishedAt}
                        </span>
                      </div>
                      <h4 className={`text-sm font-bold truncate max-w-xs sm:max-w-md ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {post.title}
                      </h4>
                    </div>
                  </div>

                  {/* Right: Metrics Grid */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 border-t sm:border-t-0 pt-2 sm:pt-0 border-white/5 font-mono text-center">
                    <div>
                      <span className={`text-xs sm:text-sm font-bold block ${isLight ? 'text-slate-800' : 'text-white'}`}>
                        {post.views.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 justify-center">
                        <Eye className="w-3 h-3 text-rose-500" />
                        Views
                      </span>
                    </div>

                    <div>
                      <span className={`text-xs sm:text-sm font-bold block ${isLight ? 'text-slate-800' : 'text-white'}`}>
                        {post.likes.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 justify-center">
                        <Heart className="w-3 h-3 text-pink-500" />
                        Likes
                      </span>
                    </div>

                    <div>
                      <span className={`text-xs sm:text-sm font-bold block ${isLight ? 'text-slate-800' : 'text-white'}`}>
                        {post.comments.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 justify-center">
                        <MessageSquare className="w-3 h-3 text-violet-500" />
                        Comments
                      </span>
                    </div>

                    <div>
                      <span className={`text-xs sm:text-sm font-bold block ${isLight ? 'text-slate-800' : 'text-white'}`}>
                        {post.shares.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 justify-center">
                        <Share2 className="w-3 h-3 text-cyan-500" />
                        Shares
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          6. AUDIENCE DEMOGRAPHICS & AI CREATOR COACH
          ───────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Audience Demographics Card */}
          <div className={`p-5 sm:p-6 rounded-3xl border shadow-xl backdrop-blur-xl space-y-4 ${
            isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-slate-900/80 border-white/10 shadow-black/40'
          }`}>
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <Users className="w-5 h-5 text-indigo-400" />
              <h3 className={`text-base font-black font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Audience Demographics & Reach
              </h3>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Top Geographic Regions
              </span>
              <div className="space-y-2">
                {[
                  { country: 'United States', pct: 34, color: 'bg-rose-500' },
                  { country: 'India', pct: 28, color: 'bg-emerald-500' },
                  { country: 'United Kingdom', pct: 14, color: 'bg-cyan-500' },
                  { country: 'Germany', pct: 8, color: 'bg-amber-500' }
                ].map(item => (
                  <div key={item.country} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>{item.country}</span>
                      <span className="font-bold text-slate-400">{item.pct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800/40 overflow-hidden">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block pt-2">
                Viewer Age Distribution
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { range: '18-24 yrs', pct: '42%', desc: 'Gen Z Learners' },
                  { range: '25-34 yrs', pct: '44%', desc: 'Tech Enthusiasts' },
                  { range: '35-44 yrs', pct: '12%', desc: 'Professionals' }
                ].map(age => (
                  <div key={age.range} className={`p-2.5 rounded-2xl border text-center ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-white/5'
                  }`}>
                    <span className="text-base font-black font-display text-rose-500 block">{age.pct}</span>
                    <span className="text-[10px] font-mono text-slate-400 block">{age.range}</span>
                    <span className="text-[9px] text-slate-500 block truncate">{age.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Creator Coach Insights */}
          <div className={`p-5 sm:p-6 rounded-3xl border shadow-xl backdrop-blur-xl space-y-4 ${
            isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-slate-900/80 border-white/10 shadow-black/40'
          }`}>
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-rose-400" />
                <h3 className={`text-base font-black font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  AI Creator Coach Insights
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                {dashboardData.aiCoachFeedback?.overallScore || 'Grade A+'}
              </span>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className={`p-3.5 rounded-2xl border ${
                isLight ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' : 'bg-emerald-950/30 border-emerald-500/20 text-emerald-300'
              }`}>
                <strong className="block font-bold pb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Key Retention Strength:
                </strong>
                {dashboardData.aiCoachFeedback?.strengths?.[0] || 'Opening 3 seconds have exceptional 92% retention due to direct curiosity hooks.'}
              </div>

              <div className={`p-3.5 rounded-2xl border ${
                isLight ? 'bg-amber-50/80 border-amber-200 text-amber-900' : 'bg-amber-950/30 border-amber-500/20 text-amber-300'
              }`}>
                <strong className="block font-bold pb-1 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-amber-500" />
                  Actionable Opportunity:
                </strong>
                {dashboardData.aiCoachFeedback?.improvementOpportunities?.[0] || 'Insert visual pattern interrupts or on-screen kinetic typography around second 30 to maintain peak completion.'}
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  onClick={() => openModal('creatorStudio')}
                  className={`flex-1 py-2 rounded-xl ${theme.buttonClass} text-xs font-bold flex items-center justify-center gap-1.5 shadow`}
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Generate New Hook in Studio</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
