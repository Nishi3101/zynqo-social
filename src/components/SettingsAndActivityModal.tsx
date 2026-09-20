import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  User,
  Bookmark,
  Archive,
  Activity,
  Bell,
  Clock,
  Tablet,
  Lock,
  Star,
  Share2,
  Ban,
  Video,
  Users,
  MessageCircle,
  AtSign,
  MessageSquare,
  ShieldAlert,
  AlertCircle,
  Type,
  UserPlus,
  BellOff,
  Sliders,
  HeartOff,
  Smartphone,
  Download,
  Accessibility,
  Volume2,
  Wifi,
  Globe,
  Home,
  Briefcase,
  BadgeCheck,
  CreditCard,
  HelpCircle,
  Sparkles,
  Shield,
  Info,
  Layers,
  Scissors,
  Infinity as InfinityIcon,
  ChevronRight,
  Check,
  X,
  Radio,
  Send
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LanguageCode } from '../types';
import { sounds } from '../utils/sound';
import confetti from 'canvas-confetti';

interface SettingsItem {
  id: string;
  icon: any;
  title: string;
  subtitle?: string;
  badge?: string;
  hasDot?: boolean;
  action: () => void;
}

interface SettingsSection {
  id: string;
  title?: string;
  metaBadge?: boolean;
  items: SettingsItem[];
}

export const SettingsAndActivityModal: React.FC = () => {
  const {
    closeModal,
    openModal,
    userProfile,
    updateUserProfile,
    isLoggedIn,
    logoutUser,
    openAuthModal,
    colorMode,
    language,
    setLanguage,
    t
  } = useApp();

  const isLight = colorMode === 'light';

  // Sub-view state: null = root list, or sub-view ID
  const [activeSubView, setActiveSubView] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive settings state (persisted in localStorage / userProfile)
  const [isPrivateAccount, setIsPrivateAccount] = useState<boolean>(() => {
    try {
      return localStorage.getItem('zynqo_privacy_private') === 'true';
    } catch (e) {
      return false;
    }
  });

  const [hideLikeCounts, setHideLikeCounts] = useState<boolean>(() => {
    try {
      return localStorage.getItem('zynqo_hide_like_counts') === 'true';
    } catch (e) {
      return false;
    }
  });

  const [pauseNotifications, setPauseNotifications] = useState(false);
  const [dataSaver, setDataSaver] = useState(false);
  const [highQualityUploads, setHighQualityUploads] = useState(true);
  const [isSubscribedVerified, setIsSubscribedVerified] = useState(false);

  // Close friends dummy data with interactive toggle
  const [closeFriends, setCloseFriends] = useState([
    { id: '1', name: 'Jethalal Gada', handle: '@jetha_gada', isClose: true },
    { id: '2', name: 'Taarak Mehta', handle: '@taarak_writer', isClose: true },
    { id: '3', name: 'Champaklal Gada', handle: '@bapuji_gada', isClose: false },
    { id: '4', name: 'Aatmaram Bhide', handle: '@ekmev_secretary', isClose: false }
  ]);

  // Blocked dummy data
  const [blockedUsers, setBlockedUsers] = useState([
    { id: 'b1', name: 'Sundarlal', handle: '@sundar_ahmedabad' }
  ]);

  // AI Support Assistant chat state
  const [supportMessages, setSupportMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([
    { role: 'ai', text: 'Hi! I am the Zynqo AI Support Assistant. How can I help you with your account, reels, or privacy today?' }
  ]);
  const [supportInput, setSupportInput] = useState('');

  // Logout confirmation modal
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const togglePrivateAccount = (value: boolean) => {
    sounds.playClick();
    setIsPrivateAccount(value);
    try {
      localStorage.setItem('zynqo_privacy_private', String(value));
    } catch (e) {}
  };

  const toggleLikeCounts = (value: boolean) => {
    sounds.playClick();
    setHideLikeCounts(value);
    try {
      localStorage.setItem('zynqo_hide_like_counts', String(value));
    } catch (e) {}
  };

  const handleSupportSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportInput.trim()) return;
    const userMsg = supportInput.trim();
    setSupportMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setSupportInput('');

    setTimeout(() => {
      let reply = "Thanks for reaching out! Your settings are securely saved. Feel free to explore our digital wellbeing tools, creator studio, or edit your profile anytime.";
      if (userMsg.toLowerCase().includes('private') || userMsg.toLowerCase().includes('privacy')) {
        reply = "You can toggle your account between Public and Private in 'Account privacy'. When private, only approved followers can view your reels and posts.";
      } else if (userMsg.toLowerCase().includes('verified')) {
        reply = "Zynqo Verified provides a verified badge, proactive identity protection, and priority reach. You can activate it under Subscriptions!";
      } else if (userMsg.toLowerCase().includes('time') || userMsg.toLowerCase().includes('scroll')) {
        reply = "Our AI Endless Scroll Firewall protects your attention span by prompting a mindful pause after 10+ minutes of continuous scrolling.";
      }
      setSupportMessages(prev => [...prev, { role: 'ai', text: reply }]);
      sounds.playSuccess();
    }, 600);
  };

  // Sections definition matching the exact Instagram screenshots
  const sections: SettingsSection[] = [
    {
      id: 'your_account',
      title: 'Your account',
      metaBadge: true,
      items: [
        {
          id: 'accounts_centre',
          icon: User,
          title: 'Accounts Centre',
          subtitle: 'Password, security, personal details, connected experiences, ad preferences',
          action: () => setActiveSubView('accountsCentre')
        }
      ]
    },
    {
      id: 'how_you_use',
      title: 'How you use Zynqo',
      items: [
        {
          id: 'saved',
          icon: Bookmark,
          title: 'Saved',
          action: () => {
            closeModal();
            openModal('memoryVault');
          }
        },
        {
          id: 'archive',
          icon: Archive,
          title: 'Archive',
          action: () => setActiveSubView('archive')
        },
        {
          id: 'your_activity',
          icon: Activity,
          title: 'Your activity',
          action: () => setActiveSubView('yourActivity')
        },
        {
          id: 'notifications',
          icon: Bell,
          title: 'Notifications',
          action: () => setActiveSubView('notifications')
        },
        {
          id: 'time_management',
          icon: Clock,
          title: 'Time management',
          action: () => {
            closeModal();
            openModal('wellbeing');
          }
        },
        {
          id: 'tablets',
          icon: Tablet,
          title: 'Zynqo for tablets & desktop',
          action: () => setActiveSubView('tablets')
        },
        {
          id: 'cross_device_sync',
          icon: Smartphone,
          title: 'Cross-Device Cloud Sync',
          badge: 'Live (3 Devices)',
          action: () => setActiveSubView('crossDeviceSync')
        }
      ]
    },
    {
      id: 'who_can_see',
      title: 'Who can see your content',
      items: [
        {
          id: 'account_privacy',
          icon: Lock,
          title: 'Account privacy',
          badge: isPrivateAccount ? 'Private' : 'Public',
          action: () => setActiveSubView('accountPrivacy')
        },
        {
          id: 'close_friends',
          icon: Star,
          title: 'Close Friends',
          badge: closeFriends.filter(f => f.isClose).length.toString(),
          action: () => setActiveSubView('closeFriends')
        },
        {
          id: 'crossposting',
          icon: Share2,
          title: 'Crossposting',
          action: () => setActiveSubView('crossposting')
        },
        {
          id: 'blocked',
          icon: Ban,
          title: 'Blocked',
          badge: blockedUsers.length.toString(),
          action: () => setActiveSubView('blocked')
        },
        {
          id: 'story_live',
          icon: Video,
          title: 'Story, live and location',
          action: () => setActiveSubView('storyLive')
        },
        {
          id: 'friends_feed',
          icon: Users,
          title: 'Activity in Friends feed',
          action: () => setActiveSubView('friendsFeed')
        }
      ]
    },
    {
      id: 'how_others_interact',
      title: 'How others can interact with you',
      items: [
        {
          id: 'messages',
          icon: MessageCircle,
          title: 'Messages and story replies',
          action: () => setActiveSubView('messages')
        },
        {
          id: 'tags',
          icon: AtSign,
          title: 'Tags and mentions',
          action: () => setActiveSubView('tags')
        },
        {
          id: 'comments',
          icon: MessageSquare,
          title: 'Comments',
          action: () => setActiveSubView('comments')
        },
        {
          id: 'sharing',
          icon: Share2,
          title: 'Sharing',
          action: () => setActiveSubView('sharing')
        },
        {
          id: 'restricted',
          icon: ShieldAlert,
          title: 'Restricted',
          badge: '0',
          action: () => setActiveSubView('restricted')
        },
        {
          id: 'limit_interactions',
          icon: AlertCircle,
          title: 'Limit interactions',
          badge: 'Off',
          action: () => setActiveSubView('limitInteractions')
        },
        {
          id: 'hidden_words',
          icon: Type,
          title: 'Hidden words',
          action: () => setActiveSubView('hiddenWords')
        },
        {
          id: 'follow_invite',
          icon: UserPlus,
          title: 'Follow and invite friends',
          action: () => setActiveSubView('followInvite')
        }
      ]
    },
    {
      id: 'what_you_see',
      title: 'What you see',
      items: [
        {
          id: 'favourites',
          icon: Star,
          title: 'Favourites',
          badge: '0',
          action: () => setActiveSubView('favourites')
        },
        {
          id: 'muted',
          icon: BellOff,
          title: 'Muted accounts',
          badge: '0',
          action: () => setActiveSubView('muted')
        },
        {
          id: 'content_pref',
          icon: Sliders,
          title: 'Content preferences',
          action: () => setActiveSubView('contentPref')
        },
        {
          id: 'like_share_counts',
          icon: HeartOff,
          title: 'Like and share counts',
          action: () => setActiveSubView('likeShareCounts')
        }
      ]
    },
    {
      id: 'app_and_media',
      title: 'Your app and media',
      items: [
        {
          id: 'device_permissions',
          icon: Smartphone,
          title: 'Device permissions',
          action: () => setActiveSubView('devicePermissions')
        },
        {
          id: 'archiving_downloading',
          icon: Download,
          title: 'Archiving and downloading',
          action: () => setActiveSubView('archivingDownloading')
        },
        {
          id: 'accessibility',
          icon: Accessibility,
          title: 'Accessibility',
          action: () => setActiveSubView('accessibility')
        },
        {
          id: 'language_sound',
          icon: Volume2,
          title: 'Language and sound',
          badge: language.toUpperCase(),
          action: () => setActiveSubView('languageSound')
        },
        {
          id: 'data_usage',
          icon: Wifi,
          title: 'Data usage and media quality',
          action: () => setActiveSubView('dataUsage')
        },
        {
          id: 'website_permissions',
          icon: Globe,
          title: 'App website permissions',
          action: () => setActiveSubView('websitePermissions')
        }
      ]
    },
    {
      id: 'family_centre',
      title: 'Family Centre',
      items: [
        {
          id: 'supervision',
          icon: Home,
          title: 'Supervision for Teen Accounts',
          action: () => setActiveSubView('supervision')
        }
      ]
    },
    {
      id: 'insights_tools',
      title: 'Your insights and tools',
      items: [
        {
          id: 'account_tools',
          icon: Briefcase,
          title: 'Account type and tools',
          action: () => setActiveSubView('accountTools')
        }
      ]
    },
    {
      id: 'subscriptions',
      title: 'Subscriptions',
      items: [
        {
          id: 'meta_verified',
          icon: BadgeCheck,
          title: 'Zynqo Verified',
          badge: isSubscribedVerified ? 'Subscribed' : 'Not subscribed',
          action: () => setActiveSubView('verified')
        }
      ]
    },
    {
      id: 'orders_fundraisers',
      title: 'Your orders and fundraisers',
      items: [
        {
          id: 'orders_payments',
          icon: CreditCard,
          title: 'Orders and payments',
          action: () => setActiveSubView('orders')
        }
      ]
    },
    {
      id: 'more_info',
      title: 'More info and support',
      items: [
        {
          id: 'help',
          icon: HelpCircle,
          title: 'Help',
          action: () => setActiveSubView('help')
        },
        {
          id: 'ai_support',
          icon: Sparkles,
          title: 'Zynqo AI support assistant',
          action: () => setActiveSubView('aiSupport')
        },
        {
          id: 'privacy_centre',
          icon: Shield,
          title: 'Privacy Centre',
          action: () => setActiveSubView('privacyCentre')
        },
        {
          id: 'account_status',
          icon: User,
          title: 'Account Status',
          action: () => setActiveSubView('accountStatus')
        },
        {
          id: 'about',
          icon: Info,
          title: 'About',
          action: () => setActiveSubView('about')
        }
      ]
    },
    {
      id: 'also_from_meta',
      title: 'Also from Zynqo',
      items: [
        {
          id: 'meta_ai',
          icon: Sparkles,
          title: 'Zynqo AI',
          subtitle: 'Get answers, advice and generate images',
          hasDot: true,
          action: () => {
            closeModal();
            openModal('explain');
          }
        },
        {
          id: 'threads',
          icon: Layers,
          title: 'Threads Community',
          subtitle: 'Share ideas and join conversations',
          action: () => setActiveSubView('threads')
        },
        {
          id: 'edits',
          icon: Scissors,
          title: 'Edits Studio',
          subtitle: 'Create videos with powerful editing tools',
          hasDot: true,
          action: () => {
            closeModal();
            openModal('creatorStudio');
          }
        },
        {
          id: 'more_from_meta',
          icon: InfinityIcon,
          title: 'More from Zynqo Ecosystem',
          action: () => setActiveSubView('moreFromZynqo')
        }
      ]
    }
  ];

  // Search filtering
  const filteredSections = searchQuery.trim()
    ? sections
        .map(sec => ({
          ...sec,
          items: sec.items.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.subtitle && item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
          )
        }))
        .filter(sec => sec.items.length > 0)
    : sections;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className={`w-full max-w-lg h-full sm:h-[92vh] sm:max-h-[850px] flex flex-col sm:rounded-3xl shadow-2xl overflow-hidden border transition-colors ${
        isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0f141c] border-white/10 text-white'
      }`}>
        {/* TOP BAR */}
        <div className={`px-4 py-3.5 border-b flex items-center justify-between sticky top-0 z-20 backdrop-blur-xl ${
          isLight ? 'bg-white/95 border-slate-100' : 'bg-[#0f141c]/95 border-white/5'
        }`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sounds.playClick();
                if (activeSubView) {
                  setActiveSubView(null);
                } else {
                  closeModal();
                }
              }}
              className={`p-1.5 -ml-1 rounded-full transition ${
                isLight ? 'hover:bg-slate-100 text-slate-900' : 'hover:bg-white/10 text-white'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-base sm:text-lg font-bold tracking-tight">
              {activeSubView ? getSubViewTitle(activeSubView) : 'Settings and activity'}
            </h2>
          </div>
          <button
            onClick={closeModal}
            className={`p-1.5 rounded-full transition ${
              isLight ? 'hover:bg-slate-100 text-slate-500' : 'hover:bg-white/10 text-slate-400'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENT CONTAINER */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {activeSubView ? (
            // SUB-VIEW RENDERER
            <div className="p-4 sm:p-6 space-y-6 animate-fade-in">
              {renderSubViewContent({
                viewId: activeSubView,
                isLight,
                isPrivateAccount,
                togglePrivateAccount,
                hideLikeCounts,
                toggleLikeCounts,
                pauseNotifications,
                setPauseNotifications,
                dataSaver,
                setDataSaver,
                highQualityUploads,
                setHighQualityUploads,
                isSubscribedVerified,
                setIsSubscribedVerified,
                closeFriends,
                setCloseFriends,
                blockedUsers,
                setBlockedUsers,
                supportMessages,
                supportInput,
                setSupportInput,
                handleSupportSend,
                language,
                setLanguage,
                userProfile,
                sounds
              })}
            </div>
          ) : (
            // MAIN SETTINGS & ACTIVITY LIST
            <div className="pb-10">
              {/* SEARCH INPUT */}
              <div className="p-4 pb-2">
                <div className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border transition ${
                  isLight
                    ? 'bg-slate-100/90 border-slate-200 text-slate-800 focus-within:border-slate-400'
                    : 'bg-slate-900/80 border-white/10 text-white focus-within:border-white/30'
                }`}>
                  <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search"
                    className="bg-transparent text-sm w-full outline-none placeholder:text-slate-400"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-white">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* SECTIONS */}
              {filteredSections.map(section => (
                <div
                  key={section.id}
                  className={`py-2 border-b ${isLight ? 'border-slate-100' : 'border-white/5'}`}
                >
                  {section.title && (
                    <div className="px-4 pt-3 pb-1.5 flex items-center justify-between">
                      <span className={`text-[12px] font-semibold tracking-wide ${
                        isLight ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                        {section.title}
                      </span>
                      {section.metaBadge && (
                        <div className="flex items-center gap-1 opacity-70">
                          <InfinityIcon className="w-3.5 h-3.5 text-cyan-500" />
                          <span className="text-[11px] font-bold text-cyan-500">Zynqo</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="divide-y divide-transparent">
                    {section.items.map(item => {
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            sounds.playClick();
                            item.action();
                          }}
                          className={`w-full px-4 py-3 text-left flex items-center justify-between transition group ${
                            isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="flex items-center gap-3.5 min-w-0 pr-3">
                            <IconComponent className={`w-5 h-5 flex-shrink-0 ${
                              isLight ? 'text-slate-800' : 'text-slate-200'
                            }`} />
                            <div className="min-w-0">
                              <span className={`text-[13.5px] font-medium block truncate ${
                                isLight ? 'text-slate-900' : 'text-slate-100'
                              }`}>
                                {item.title}
                              </span>
                              {item.subtitle && (
                                <span className={`text-[11px] leading-tight block truncate mt-0.5 ${
                                  isLight ? 'text-slate-500' : 'text-slate-400'
                                }`}>
                                  {item.subtitle}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            {item.hasDot && (
                              <span className="w-2 h-2 rounded-full bg-blue-500 ring-2 ring-blue-500/20" />
                            )}
                            {item.badge && (
                              <span className={`text-xs ${
                                isLight ? 'text-slate-500' : 'text-slate-400'
                              }`}>
                                {item.badge}
                              </span>
                            )}
                            <ChevronRight className={`w-4 h-4 ${
                              isLight ? 'text-slate-400' : 'text-slate-500'
                            } group-hover:translate-x-0.5 transition-transform`} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* LOGIN SECTION AT THE BOTTOM */}
              <div className="py-3 px-4 space-y-2">
                <span className={`text-[12px] font-semibold block ${
                  isLight ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  Login
                </span>

                <button
                  onClick={() => {
                    sounds.playClick();
                    closeModal();
                    openAuthModal('login');
                  }}
                  className="w-full py-2.5 text-left text-sm font-semibold text-blue-500 hover:text-blue-400 transition block"
                >
                  Add account
                </button>

                <button
                  onClick={() => {
                    sounds.playClick();
                    setShowLogoutConfirm(true);
                  }}
                  className="w-full py-2.5 text-left text-sm font-semibold text-red-500 hover:text-red-400 transition block"
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* LOGOUT CONFIRMATION MODAL */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4 animate-fade-in">
          <div className={`w-full max-w-xs p-6 rounded-3xl text-center space-y-4 shadow-2xl border ${
            isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-white/10 text-white'
          }`}>
            <h3 className="text-base font-bold">Log out of your account?</h3>
            <p className="text-xs text-slate-400">
              You will need to sign in again to access your profile, liked reels, and saved content.
            </p>
            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  sounds.playClick();
                  setShowLogoutConfirm(false);
                  closeModal();
                  logoutUser();
                }}
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition shadow-lg shadow-red-600/20"
              >
                Log Out
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className={`w-full py-2.5 rounded-xl text-xs font-semibold transition ${
                  isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper: title for active sub-view
function getSubViewTitle(id: string): string {
  switch (id) {
    case 'accountsCentre': return 'Accounts Centre';
    case 'accountPrivacy': return 'Account privacy';
    case 'closeFriends': return 'Close Friends';
    case 'likeShareCounts': return 'Like and share counts';
    case 'notifications': return 'Notifications';
    case 'languageSound': return 'Language and sound';
    case 'dataUsage': return 'Data usage & media quality';
    case 'verified': return 'Zynqo Verified';
    case 'aiSupport': return 'AI Support Assistant';
    case 'about': return 'About Zynqo';
    case 'blocked': return 'Blocked Accounts';
    case 'archive': return 'Stories & Reels Archive';
    case 'yourActivity': return 'Your Activity & Stats';
    case 'help': return 'Help Centre';
    case 'crossposting': return 'Crossposting';
    case 'storyLive': return 'Story, live and location';
    case 'friendsFeed': return 'Activity in Friends feed';
    case 'messages': return 'Messages & replies';
    case 'tags': return 'Tags and mentions';
    case 'comments': return 'Comment controls';
    case 'sharing': return 'Sharing & Remixing';
    case 'restricted': return 'Restricted Accounts';
    case 'limitInteractions': return 'Limit interactions';
    case 'hiddenWords': return 'Hidden words filter';
    case 'followInvite': return 'Follow and invite friends';
    case 'favourites': return 'Favourites list';
    case 'muted': return 'Muted accounts';
    case 'contentPref': return 'Content preferences';
    case 'devicePermissions': return 'Device permissions';
    case 'archivingDownloading': return 'Archiving & downloading';
    case 'accessibility': return 'Accessibility';
    case 'websitePermissions': return 'App website permissions';
    case 'supervision': return 'Supervision for Teen Accounts';
    case 'accountTools': return 'Account type and tools';
    case 'orders': return 'Orders and payments';
    case 'privacyCentre': return 'Privacy Centre';
    case 'accountStatus': return 'Account Status';
    case 'threads': return 'Threads Community';
    case 'tablets': return 'Tablets & Desktop Experience';
    case 'crossDeviceSync': return 'Cross-Device Cloud Sync';
    case 'moreFromZynqo': return 'More from Zynqo';
    default: return 'Settings';
  }
}

// Sub-view renderer component
function renderSubViewContent(props: {
  viewId: string;
  isLight: boolean;
  isPrivateAccount: boolean;
  togglePrivateAccount: (v: boolean) => void;
  hideLikeCounts: boolean;
  toggleLikeCounts: (v: boolean) => void;
  pauseNotifications: boolean;
  setPauseNotifications: (v: boolean) => void;
  dataSaver: boolean;
  setDataSaver: (v: boolean) => void;
  highQualityUploads: boolean;
  setHighQualityUploads: (v: boolean) => void;
  isSubscribedVerified: boolean;
  setIsSubscribedVerified: (v: boolean) => void;
  closeFriends: any[];
  setCloseFriends: React.Dispatch<React.SetStateAction<any[]>>;
  blockedUsers: any[];
  setBlockedUsers: React.Dispatch<React.SetStateAction<any[]>>;
  supportMessages: { role: 'ai' | 'user'; text: string }[];
  supportInput: string;
  setSupportInput: (v: string) => void;
  handleSupportSend: (e: React.FormEvent) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  userProfile: any;
  sounds: any;
}) {
  const {
    viewId,
    isLight,
    isPrivateAccount,
    togglePrivateAccount,
    hideLikeCounts,
    toggleLikeCounts,
    pauseNotifications,
    setPauseNotifications,
    dataSaver,
    setDataSaver,
    highQualityUploads,
    setHighQualityUploads,
    isSubscribedVerified,
    setIsSubscribedVerified,
    closeFriends,
    setCloseFriends,
    blockedUsers,
    setBlockedUsers,
    supportMessages,
    supportInput,
    setSupportInput,
    handleSupportSend,
    language,
    setLanguage,
    userProfile,
    sounds
  } = props;

  // 1. ACCOUNT PRIVACY
  if (viewId === 'accountPrivacy') {
    return (
      <div className="space-y-4">
        <div className={`p-4 rounded-2xl border flex items-center justify-between ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-white/10'
        }`}>
          <div>
            <h4 className="text-sm font-bold">Private Account</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-[260px]">
              When your account is public, your profile and reels can be seen by anyone. When private, only approved followers can see what you share.
            </p>
          </div>
          <input
            type="checkbox"
            checked={isPrivateAccount}
            onChange={e => togglePrivateAccount(e.target.checked)}
            className="w-5 h-5 accent-cyan-500 rounded cursor-pointer"
          />
        </div>
        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300">
          ✓ Your existing followers won't be affected when you switch to private mode.
        </div>
      </div>
    );
  }

  // 2. LIKE AND SHARE COUNTS
  if (viewId === 'likeShareCounts') {
    return (
      <div className="space-y-4">
        <div className={`p-4 rounded-2xl border flex items-center justify-between ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-white/10'
        }`}>
          <div>
            <h4 className="text-sm font-bold">Hide like and view counts</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-[260px]">
              You won't see the total number of likes and views on reels from other accounts. You can also hide counts on your own reels when posting.
            </p>
          </div>
          <input
            type="checkbox"
            checked={hideLikeCounts}
            onChange={e => toggleLikeCounts(e.target.checked)}
            className="w-5 h-5 accent-cyan-500 rounded cursor-pointer"
          />
        </div>
      </div>
    );
  }

  // 3. NOTIFICATIONS
  if (viewId === 'notifications') {
    return (
      <div className="space-y-3">
        <div className={`p-4 rounded-2xl border flex items-center justify-between ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-white/10'
        }`}>
          <div>
            <h4 className="text-sm font-bold">Pause all</h4>
            <p className="text-xs text-slate-400 mt-0.5">Temporarily mute all push notifications</p>
          </div>
          <input
            type="checkbox"
            checked={pauseNotifications}
            onChange={e => {
              sounds.playClick();
              setPauseNotifications(e.target.checked);
            }}
            className="w-5 h-5 accent-cyan-500 rounded cursor-pointer"
          />
        </div>

        {['Reels & Stories', 'Messages & Calls', 'Likes & Comments', 'Live & Badges'].map(item => (
          <div
            key={item}
            className={`p-3.5 rounded-2xl border flex items-center justify-between ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-white/10'
            }`}
          >
            <span className="text-xs font-semibold">{item}</span>
            <span className="text-xs text-cyan-500 font-medium">On &gt;</span>
          </div>
        ))}
      </div>
    );
  }

  // 4. LANGUAGE AND SOUND
  if (viewId === 'languageSound') {
    const langList: { code: LanguageCode; name: string; native: string }[] = [
      { code: 'en', name: 'English', native: 'English' },
      { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
      { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
      { code: 'sa', name: 'Sanskrit', native: 'संस्कृतम्' },
      { code: 'mr', name: 'Marathi', native: 'मराठी' },
      { code: 'te', name: 'Telugu', native: 'తెలుగు' },
      { code: 'es', name: 'Spanish', native: 'Español' },
      { code: 'fr', name: 'French', native: 'Français' },
      { code: 'ja', name: 'Japanese', native: '日本語' },
      { code: 'de', name: 'German', native: 'Deutsch' }
    ];

    return (
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Select App Language</h4>
        <div className="space-y-1.5">
          {langList.map(item => (
            <button
              key={item.code}
              onClick={() => {
                sounds.playSuccess();
                setLanguage(item.code);
              }}
              className={`w-full p-3 rounded-2xl border flex items-center justify-between transition ${
                language === item.code
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                  : isLight
                  ? 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                  : 'bg-slate-800/60 border-white/10 hover:bg-slate-800 text-slate-200'
              }`}
            >
              <div>
                <span className="text-xs font-bold block">{item.name}</span>
                <span className="text-[11px] text-slate-400">{item.native}</span>
              </div>
              {language === item.code && <Check className="w-4 h-4 text-cyan-400" />}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 5. DATA USAGE & MEDIA QUALITY
  if (viewId === 'dataUsage') {
    return (
      <div className="space-y-4">
        <div className={`p-4 rounded-2xl border flex items-center justify-between ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-white/10'
        }`}>
          <div>
            <h4 className="text-sm font-bold">Use less mobile data</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-[260px]">
              When Data Saver is on, videos won't load in advance to help you use less cellular data.
            </p>
          </div>
          <input
            type="checkbox"
            checked={dataSaver}
            onChange={e => {
              sounds.playClick();
              setDataSaver(e.target.checked);
            }}
            className="w-5 h-5 accent-cyan-500 rounded cursor-pointer"
          />
        </div>

        <div className={`p-4 rounded-2xl border flex items-center justify-between ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-white/10'
        }`}>
          <div>
            <h4 className="text-sm font-bold">Upload at highest quality</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-[260px]">
              Always upload the highest-resolution videos and reels, even if uploading takes longer.
            </p>
          </div>
          <input
            type="checkbox"
            checked={highQualityUploads}
            onChange={e => {
              sounds.playClick();
              setHighQualityUploads(e.target.checked);
            }}
            className="w-5 h-5 accent-cyan-500 rounded cursor-pointer"
          />
        </div>
      </div>
    );
  }

  // 6. ZYNQO VERIFIED
  if (viewId === 'verified') {
    return (
      <div className="space-y-5 text-center">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white mx-auto shadow-xl shadow-cyan-500/30">
          <BadgeCheck className="w-8 h-8" />
        </div>

        <div>
          <h3 className="text-lg font-bold">Build trust with Zynqo Verified</h3>
          <p className="text-xs text-slate-400 mt-1">
            Verified accounts get a verified badge, proactive account monitoring, and direct customer support.
          </p>
        </div>

        <div className="space-y-2 text-left">
          {[
            'A verified badge showing audience authenticity',
            'Increased account protection with proactive monitoring',
            'Direct support from real team members',
            'Exclusive creator stickers and analytics insights'
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
              <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            sounds.playSuccess();
            confetti({ particleCount: 50, spread: 60 });
            setIsSubscribedVerified(!isSubscribedVerified);
          }}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition shadow-xl shadow-cyan-500/25"
        >
          {isSubscribedVerified ? 'Subscribed • Active (Cancel anytime)' : 'Subscribe for Free Creator Trial'}
        </button>
      </div>
    );
  }

  // 7. CLOSE FRIENDS
  if (viewId === 'closeFriends') {
    return (
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-bold">Close Friends</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            We don't send notifications when you edit your Close Friends list.
          </p>
        </div>

        <div className="space-y-2">
          {closeFriends.map(friend => (
            <div
              key={friend.id}
              className={`p-3 rounded-2xl border flex items-center justify-between ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-white/10'
              }`}
            >
              <div>
                <span className="text-xs font-bold block">{friend.name}</span>
                <span className="text-[11px] text-slate-400">{friend.handle}</span>
              </div>
              <input
                type="checkbox"
                checked={friend.isClose}
                onChange={() => {
                  sounds.playClick();
                  setCloseFriends(prev =>
                    prev.map(f => (f.id === friend.id ? { ...f, isClose: !f.isClose } : f))
                  );
                }}
                className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 8. BLOCKED
  if (viewId === 'blocked') {
    return (
      <div className="space-y-4">
        <p className="text-xs text-slate-400">
          People won't be notified when you block or unblock them.
        </p>

        {blockedUsers.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            No blocked accounts.
          </div>
        ) : (
          <div className="space-y-2">
            {blockedUsers.map(user => (
              <div
                key={user.id}
                className={`p-3 rounded-2xl border flex items-center justify-between ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-white/10'
                }`}
              >
                <div>
                  <span className="text-xs font-bold block">{user.name}</span>
                  <span className="text-[11px] text-slate-400">{user.handle}</span>
                </div>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setBlockedUsers(prev => prev.filter(u => u.id !== user.id));
                  }}
                  className="px-3 py-1 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-xs font-semibold text-white transition"
                >
                  Unblock
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 9. AI SUPPORT ASSISTANT CHAT
  if (viewId === 'aiSupport') {
    return (
      <div className="flex flex-col h-[520px]">
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
          {supportMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-sm'
                    : isLight
                    ? 'bg-slate-100 text-slate-800 rounded-bl-sm border border-slate-200'
                    : 'bg-slate-800/90 text-slate-200 rounded-bl-sm border border-white/10'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSupportSend} className="pt-3 flex gap-2">
          <input
            type="text"
            value={supportInput}
            onChange={e => setSupportInput(e.target.value)}
            placeholder="Ask AI support anything..."
            className={`flex-1 px-3.5 py-2.5 rounded-2xl text-xs outline-none border transition ${
              isLight
                ? 'bg-slate-100 border-slate-200 text-slate-900 focus:border-cyan-500'
                : 'bg-slate-900 border-white/10 text-white focus:border-cyan-500'
            }`}
          />
          <button
            type="submit"
            className="p-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    );
  }

  // 10. ABOUT
  if (viewId === 'about') {
    return (
      <div className="space-y-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-white/10 p-2 mx-auto flex items-center justify-center">
          <img src="/zynqo-symbol.png" alt="Zynqo" className="w-full h-full object-contain" />
        </div>
        <div>
          <h3 className="text-base font-bold">Zynqo Social</h3>
          <span className="text-xs text-slate-400">Version 2.4.1 (Clean Build)</span>
        </div>
        <div className="pt-2 text-left space-y-2">
          {['Terms of Service', 'Privacy Policy', 'Open Source Libraries', 'Safety & Community Guidelines'].map(link => (
            <div
              key={link}
              className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between cursor-pointer ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-white/10'
              }`}
            >
              <span>{link}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 11. YOUR ACTIVITY & STATS
  if (viewId === 'yourActivity') {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className={`p-4 rounded-2xl border text-center ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-white/10'
          }`}>
            <span className="text-2xl font-bold text-cyan-400 block">{userProfile?.minutesUsedToday || 14}m</span>
            <span className="text-[11px] text-slate-400">Time Spent Today</span>
          </div>
          <div className={`p-4 rounded-2xl border text-center ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-white/10'
          }`}>
            <span className="text-2xl font-bold text-emerald-400 block">{userProfile?.xp || 420}</span>
            <span className="text-[11px] text-slate-400">Total XP Earned</span>
          </div>
        </div>

        <div className="space-y-2">
          {['Interactions (Likes, comments, shares)', 'Account history & changes', 'Recently deleted content', 'Download your information'].map(item => (
            <div
              key={item}
              className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between cursor-pointer ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-white/10'
              }`}
            >
              <span>{item}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // CROSS-DEVICE CLOUD SYNC (#92)
  if (viewId === 'crossDeviceSync') {
    return (
      <div className="space-y-4 animate-fade-in">
        <div className={`p-4 rounded-2xl border space-y-2 ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-white/10'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Real-Time Cloud Synchronization Active
            </span>
            <span className="text-[10px] font-mono text-slate-400">Latency: 18ms</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your watch progress, liked reels, study plans, drafts, and preferences sync seamlessly between all your active sessions and devices.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Connected Devices (3)</h4>
          {[
            { name: 'Chrome on Windows (Current)', type: 'Web Desktop', lastActive: 'Active Now', icon: '💻', status: 'In Sync' },
            { name: 'Zynqo Mobile App (Android 14)', type: 'Pixel 8 Pro', lastActive: '2m ago', icon: '📱', status: 'In Sync' },
            { name: 'Zynqo Tablet Edition (iPadOS 17)', type: 'iPad Pro 11"', lastActive: '1h ago', icon: '📟', status: 'In Sync' }
          ].map(dev => (
            <div
              key={dev.name}
              className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-800/60 border-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{dev.icon}</span>
                <div>
                  <h5 className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{dev.name}</h5>
                  <span className="text-[10px] text-slate-400">{dev.type} • Last active: {dev.lastActive}</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {dev.status}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <button
            onClick={() => {
              sounds.playSuccess();
              confetti({ particleCount: 30, spread: 45 });
            }}
            className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-1.5"
          >
            <span>Force Instant Cloud Sync Across All Devices</span>
          </button>
        </div>
      </div>
    );
  }

  // DEFAULT FALLBACK FOR OTHER SUB-VIEWS
  return (
    <div className="space-y-4">
      <div className={`p-5 rounded-2xl border text-center space-y-2 ${
        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-white/10'
      }`}>
        <h4 className="text-sm font-bold">{getSubViewTitle(viewId)}</h4>
        <p className="text-xs text-slate-400">
          This feature is configured with your standard preferences and cloud sync is enabled.
        </p>
      </div>
      <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300">
        ✓ Your settings are automatically synchronized across web, mobile, and tablets.
      </div>
    </div>
  );
}
