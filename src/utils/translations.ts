import { LanguageCode, Reel } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  whatDoYouNeed: string;
  intents: {
    all: string;
    teach: string;
    achieve: string;
    relax: string;
    entertain: string;
    inspire: string;
    connect: string;
  };
  actions: {
    makeUseful: string;
    realityCheck: string;
    whyThis: string;
    timeSession: string;
    goalPaths: string;
    watchTogether: string;
    creatorStudio: string;
    wellbeing: string;
    memoryVault: string;
    companion: string;
    like: string;
    comment: string;
    share: string;
    subtitles: string;
    sound: string;
  };
  companion: {
    name: string;
    greeting: string;
    inputPlaceholder: string;
    surpriseMe: string;
    eli10: string;
    quizMe: string;
    context: string;
    listening: string;
    speechNotSupported: string;
    errorFallback: string;
    speakAloud: string;
    stopVoice: string;
    voiceMode: string;
    voiceModeOn: string;
    voiceModeOff: string;
  };
  nav: {
    displayMode: string;
    mobileView: string;
    studioView: string;
    landingPage: string;
    keyboardShortcuts: string;
    keyboardTitle: string;
    shortcutNextPrev: string;
    shortcutPlayPause: string;
    shortcutMute: string;
    shortcutLike: string;
    shortcutUseful: string;
    studio: string;
    memory: string;
    account: string;
    display: string;
    lightMode: string;
    darkMode: string;
    switchAccount: string;
    resetLimit: string;
    signOut: string;
    curatedLearning: string;
    watchParties: string;
    creatorStudioTip: string;
    wellbeingTip: string;
    memoryTip: string;
    searchPlaceholder: string;
    clear: string;
    timeLeft: string;
    switchTheme: string;
    editInterests: string;
    detoxActive: string;
    detoxTip: string;
    searchTip: string;
  };
  reel: {
    follow: string;
    following: string;
    safeBadge: string;
    views: string;
    save: string;
    saved: string;
    commentsTitle: string;
    addCommentPlaceholder: string;
    postComment: string;
    toxicBlocked: string;
    shareCopied: string;
    noComments: string;
    shieldActive: string;
    muteTip: string;
    unmuteTip: string;
    shareTip: string;
    curating: string;
    noReelsMatch: string;
    resetFilters: string;
  };
  categories: {
    all: string;
    productivity: string;
    techAI: string;
    healthFitness: string;
    scienceSpace: string;
    finance: string;
    mindfulnessDetox: string;
  };
  modals: {
    quizTitle: string;
    notesTitle: string;
    tasksTitle: string;
    studyPlanTitle: string;
    sourcesTitle: string;
    claimAnalyzed: string;
    verifiedFact: string;
    attentionBudget: string;
    finishNow: string;
    oneMore: string;
    congratulations: string;
    rewardEarned: string;
    forgetThis: string;
    forgetSuccess: string;
  };
  nutrition: {
    title: string;
    learning: string;
    productivity: string;
    mindfulness: string;
    entertainment: string;
    score: string;
  };
  landing: {
    badge: string;
    heroTitle: string;
    heroHighlight: string;
    heroSubtitle: string;
    heroSubtitleAuthor: string;
    exploreFeed: string;
    personalize: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    pillar4Title: string;
    pillar4Desc: string;
    comparisonTitle: string;
    comparisonSubtitle: string;
    traditionalTitle: string;
    traditional1: string;
    traditional2: string;
    traditional3: string;
    traditional4: string;
    zynqoTitle: string;
    zynqo1: string;
    zynqo2: string;
    zynqo3: string;
    zynqo4: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
    radarTitle: string;
    activeTrends: string;
    liveSignals: string;
  };
  profile: {
    title: string;
    backHome: string;
    backFeed: string;
    editProfile: string;
    shareProfile: string;
    followers: string;
    following: string;
    posts: string;
    level: string;
    uploadContent: string;
    exploreFeed: string;
    cancel: string;
    publishNow: string;
    all: string;
    reelsTab: string;
    videosTab: string;
    postsTab: string;
    activityTab: string;
    likedTab: string;
    savedTab: string;
    commentsTab: string;
    milestonesTab: string;
    emptyReels: string;
    emptyVideos: string;
    emptyPosts: string;
    emptyLiked: string;
    emptySaved: string;
    emptyComments: string;
    createPost: string;
  };
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const translations: Partial<Record<LanguageCode, DeepPartial<Translations>>> = {
  en: {
    appName: "Zynqo Social",
    tagline: "Next-Gen Social Entertainment",
    whatDoYouNeed: "What do you need right now?",
    intents: {
      all: "All",
      teach: "Teach me",
      achieve: "Achieve",
      relax: "Relax me",
      entertain: "Entertain me",
      inspire: "Inspire me",
      connect: "Connect me"
    },
    actions: {
      makeUseful: "Make This Useful",
      realityCheck: "AI Reality Check",
      whyThis: "Why Am I Seeing This?",
      timeSession: "I Have 5 Mins",
      goalPaths: "Goal Journeys",
      watchTogether: "Watch Together",
      creatorStudio: "Creator Studio",
      wellbeing: "Digital Wellbeing",
      memoryVault: "AI Memory Vault",
      companion: "Nova AI Companion",
      like: "Like",
      comment: "Comments",
      share: "Share",
      subtitles: "Subtitles",
      sound: "Sound"
    },
    companion: {
      name: "Nova AI Companion",
      greeting: "Hello! I'm Nova, your AI Entertainment Companion. I'm tuned to your current mode. Ask me anything about what you're watching, or tell me what you want to achieve today!",
      inputPlaceholder: "Ask Nova or describe what you want...",
      surpriseMe: "Surprise Me",
      eli10: "ELI10",
      quizMe: "Quiz Me",
      context: "Context",
      listening: "Listening...",
      speechNotSupported: "Speech recognition is not supported in this browser.",
      errorFallback: "I'm here! Let me know if you want notes, quizzes, or a structured session.",
      speakAloud: "Speak Aloud",
      stopVoice: "Stop Speaking",
      voiceMode: "Voice Mode",
      voiceModeOn: "Voice Mode ON",
      voiceModeOff: "Voice Mode OFF"
    },
    nav: {
      displayMode: "Display Mode:",
      mobileView: "Mobile Reel View",
      studioView: "Immersive Studio View",
      landingPage: "Landing Page",
      keyboardShortcuts: "Keyboard Shortcuts (↑/↓, Space, M, L, U)",
      keyboardTitle: "Keyboard Controls",
      shortcutNextPrev: "Next / Previous Reel",
      shortcutPlayPause: "Play / Pause",
      shortcutMute: "Mute / Unmute",
      shortcutLike: "Like Reel",
      shortcutUseful: "Make This Useful (Notes/Quiz)",
      studio: "Studio",
      memory: "Memory",
      account: "Account",
      display: "Display",
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
      switchAccount: "Switch / Sign In Account",
      resetLimit: "Reset Daily Attention Limit (0 min)",
      signOut: "Sign Out",
      curatedLearning: "Curated Learning Tracks",
      watchParties: "Synchronized Watch Parties",
      creatorStudioTip: "AI Creator Studio",
      wellbeingTip: "Attention Nutrition & Screen-Time Protection",
      memoryTip: "Personal AI Memory & Learning Vault",
      searchPlaceholder: "Describe what you want to learn, watch or achieve (Natural Language Search)...",
      clear: "Clear",
      timeLeft: "Left",
      switchTheme: "Switch Color Theme",
      editInterests: "Edit Interests & Budget",
      detoxActive: "Detox Mode Active",
      detoxTip: "Enable Content Detox Mode",
      searchTip: "Search AI Reels"
    },
    reel: {
      follow: "Follow",
      following: "Following",
      safeBadge: "Safe",
      views: "views",
      save: "Save",
      saved: "Saved",
      commentsTitle: "Comments",
      addCommentPlaceholder: "Write a thoughtful comment...",
      postComment: "Post",
      toxicBlocked: "Notice: Toxic or abusive comments are automatically blocked by Safety Shield.",
      shareCopied: "Link copied to clipboard!",
      noComments: "No comments yet. Start a meaningful conversation!",
      shieldActive: "Shield Active",
      muteTip: "Mute",
      unmuteTip: "Unmute",
      shareTip: "Share Reel",
      curating: "Curating your AI Experience...",
      noReelsMatch: "No reels match this intent",
      resetFilters: "Reset All Filters"
    },
    categories: {
      all: "All",
      productivity: "Productivity",
      techAI: "Tech & AI",
      healthFitness: "Health & Fitness",
      scienceSpace: "Science & Space",
      finance: "Finance",
      mindfulnessDetox: "Mindfulness & Detox"
    },
    modals: {
      quizTitle: "Interactive Knowledge Quiz",
      notesTitle: "AI Structured Notes",
      tasksTitle: "Actionable Checklist",
      studyPlanTitle: "3-Day Micro Action Plan",
      sourcesTitle: "Verified Source Citations",
      claimAnalyzed: "Claim Analyzed & Verified",
      verifiedFact: "Clinically / Mathematically Verified",
      attentionBudget: "Daily Attention Budget",
      finishNow: "Finish Session Now",
      oneMore: "One More Reel",
      congratulations: "Session Goal Achieved!",
      rewardEarned: "Screen-Time Reward Earned",
      forgetThis: "Forget This Preference",
      forgetSuccess: "Removed from AI memory."
    },
    nutrition: {
      title: "Entertainment Nutrition Label",
      learning: "Learning & Tech",
      productivity: "Productivity & Habits",
      mindfulness: "Health & Mindfulness",
      entertainment: "Entertainment",
      score: "Meaningful Engagement Score"
    },
    landing: {
      badge: "Next-Gen Social Entertainment Platform • 190-Feature Ecosystem",
      heroTitle: "Entertainment That Respects Your Time & Turns Every Reel Into ",
      heroHighlight: "Real-World Action.",
      heroSubtitle: "Traditional platforms ask: \"How long can we keep you scrolling?\"",
      heroSubtitleAuthor: "Zynqo Social asks: \"What do you need right now, how much time do you have, and how can we make that time meaningful?\"",
      exploreFeed: "Explore AI Reels Feed",
      personalize: "Personalize Profile (Onboarding)",
      pillar1Title: "Personal Entertainment OS",
      pillar1Desc: "Feeds tuned to your intent, goals and attention span",
      pillar2Title: "\"I Have 5 Mins\" Mode",
      pillar2Desc: "Structured sessions with satisfying finish lines",
      pillar3Title: "Make This Useful (Quiz/Notes)",
      pillar3Desc: "Transform passive viewing into instant action",
      pillar4Title: "AI Reality Check & Shield",
      pillar4Desc: "Transparent peer-reviewed source verification",
      comparisonTitle: "Why We Are Replacing Passive Feeds",
      comparisonSubtitle: "The fundamental paradigm shift of the Next-Gen Social Entertainment Platform.",
      traditionalTitle: "Traditional Short-Form Platforms",
      traditional1: "Endless, infinite scroll with zero intentional stopping points",
      traditional2: "Unverified viral health, finance, and science myths go unchecked",
      traditional3: "Passive dopamine loop: You forget what you watched 10s later",
      traditional4: "No concept of daily attention budgets or learning goals",
      zynqoTitle: "Zynqo Social Entertainment OS",
      zynqo1: "\"I Have 5 Minutes\" structured sessions with Smart Session Endings",
      zynqo2: "AI Reality Check with peer-reviewed source transparency",
      zynqo3: "\"Make This Useful\": Instant AI Notes, Quizzes, and Action Checklists",
      zynqo4: "Entertainment Nutrition Label & Attention Budget protection",
      ctaTitle: "Ready for Intelligent Entertainment?",
      ctaSubtitle: "Start your personalized session now and turn digital reels into real-world achievements.",
      ctaButton: "Launch Zynqo Social Experience",
      radarTitle: "Live AI Radar",
      activeTrends: "Active Trends",
      liveSignals: "Live Signals"
    },
    profile: {
      title: "My Profile & Activity",
      backHome: "Back to Home",
      backFeed: "Back to Feed",
      editProfile: "Edit Profile",
      shareProfile: "Share Profile",
      followers: "Followers",
      following: "Following",
      posts: "Posts",
      level: "Level",
      uploadContent: "Upload Content",
      exploreFeed: "Explore Feed",
      cancel: "Cancel",
      publishNow: "Publish Now",
      all: "All",
      reelsTab: "Reels",
      videosTab: "Videos",
      postsTab: "Posts",
      activityTab: "Activity & Interacted",
      likedTab: "Liked",
      savedTab: "Saved",
      commentsTab: "Comments",
      milestonesTab: "Milestones & XP",
      emptyReels: "No reels posted yet.",
      emptyVideos: "No videos uploaded yet.",
      emptyPosts: "No posts created yet.",
      emptyLiked: "No liked content yet.",
      emptySaved: "No saved content yet.",
      emptyComments: "No comments yet.",
      createPost: "Create New Post"
    }
  },

  gu: {
    appName: "Zynqo Social",
    tagline: "નેક્સ્ટ-જનરેશન સોશિયલ એન્ટરટેઈનમેન્ટ",
    whatDoYouNeed: "અત્યારે તમને શેની જરૂર છે?",
    intents: {
      all: "બધું (All)",
      teach: "મને શીખવો",
      achieve: "ધ્યેય પ્રાપ્ત કરો",
      relax: "તણાવમુક્ત થાઓ",
      entertain: "મનોરંજન માણો",
      inspire: "પ્રેરણા મેળવો",
      connect: "મિત્રો સાથે જોડાઓ"
    },
    actions: {
      makeUseful: "આ ઉપયોગી બનાવો",
      realityCheck: "AI સત્ય ચકાસણી",
      whyThis: "મને આ રીલ કેમ દેખાઈ?",
      timeSession: "મારી પાસે 5 મિનિટ છે",
      goalPaths: "ધ્યેય માર્ગદર્શન",
      watchTogether: "સાથે મળીને જુઓ",
      creatorStudio: "ક્રિએટર સ્ટુડિયો",
      wellbeing: "ડિજિટલ વેલબીઇંગ",
      memoryVault: "AI મેમરી વૉલ્ટ",
      companion: "નોવા AI સાથી",
      like: "પસંદ",
      comment: "ટિપ્પણીઓ",
      share: "શેર કરો",
      subtitles: "સબટાઈટલ",
      sound: "અવાજ"
    },
    companion: {
      name: "નોવા AI સાથી",
      greeting: "નમસ્તે! હું નોવા છું, તમારી AI એન્ટરટેઈનમેન્ટ સાથી. હું તમારા વર્તમાન મોડ માટે સજ્જ છું. તમે જે જોઈ રહ્યા છો તેના વિશે મને કંઈપણ પૂછો, અથવા આજે તમે શું પ્રાપ્ત કરવા માંગો છો તે જણાવો!",
      inputPlaceholder: "નોવાને પૂછો અથવા તમારી જરૂરિયાત જણાવો...",
      surpriseMe: "કંઈક નવું બતાવો",
      eli10: "સરળ સમજૂતી (ELI10)",
      quizMe: "મારી ક્વિઝ લો",
      context: "સંદર્ભ",
      listening: "સાંભળી રહ્યું છે...",
      speechNotSupported: "આ બ્રાઉઝરમાં અવાજ ઓળખ ઉપલબ્ધ નથી.",
      errorFallback: "હું અહીં છું! જો તમને નોટ્સ, ક્વિઝ અથવા પ્લાનિંગ જોઈતું હોય તો જણાવો.",
      speakAloud: "અવાજ સાંભળો (Speak)",
      stopVoice: "અવાજ બંધ કરો",
      voiceMode: "વૉઇસ મોડ",
      voiceModeOn: "વૉઇસ મોડ ચાલુ",
      voiceModeOff: "વૉઇસ મોડ બંધ"
    },
    nav: {
      displayMode: "ડિસ્પ્લે મોડ:",
      mobileView: "મોબાઇલ રિલ વ્યૂ",
      studioView: "ઇમર્સિવ સ્ટુડિયો વ્યૂ",
      landingPage: "મુખ્ય પેજ (Landing)",
      keyboardShortcuts: "કીબોર્ડ શોર્ટકટ્સ (↑/↓, Space, M, L, U)",
      keyboardTitle: "કીબોર્ડ કંટ્રોલ્સ",
      shortcutNextPrev: "આગળની / પાછલી રિલ",
      shortcutPlayPause: "ચાલુ / બંધ કરો",
      shortcutMute: "અવાજ ચાલુ / બંધ",
      shortcutLike: "રિલ પસંદ કરો",
      shortcutUseful: "ઉપયોગી બનાવો (નોટ્સ/ક્વિઝ)",
      studio: "સ્ટુડિયો",
      memory: "મેમરી",
      account: "ખાતું",
      display: "ડિસ્પ્લે",
      lightMode: "લાઇટ મોડ",
      darkMode: "ડાર્ક મોડ",
      switchAccount: "ખાતું બદલો / સાઇન ઇન કરો",
      resetLimit: "દૈનિક સમય મર્યાદા રીસેટ કરો (૦ મિનિટ)",
      signOut: "સાઇન આઉટ",
      curatedLearning: "ધ્યેય અનુસાર લર્નિંગ ટ્રેક્સ",
      watchParties: "સાથે મળીને લાઇવ જુઓ",
      creatorStudioTip: "AI ક્રિએટર સ્ટુડિયો",
      wellbeingTip: "ધ્યાન ન્યુટ્રિશન અને સ્ક્રીન-ટાઇમ સુરક્ષા",
      memoryTip: "વ્યક્તિગત AI મેમરી અને લર્નિંગ વૉલ્ટ",
      searchPlaceholder: "તમે શું શીખવા, જોવા કે પ્રાપ્ત કરવા માંગો છો તે લખો...",
      clear: "સાફ કરો",
      timeLeft: "બાકી",
      switchTheme: "કલર થીમ બદલો",
      editInterests: "રુચિઓ અને બજેટ બદલો",
      detoxActive: "ડીટોક્સ મોડ સક્રિય",
      detoxTip: "કન્ટેન્ટ ડીટોક્સ મોડ ચાલુ કરો",
      searchTip: "AI રીલ્સ શોધો"
    },
    reel: {
      follow: "ફોલો કરો",
      following: "ફોલો કર્યું",
      safeBadge: "સુરક્ષિત",
      views: "વ્યૂઝ",
      save: "સાચવો",
      saved: "સાચવેલ",
      commentsTitle: "ટિપ્પણીઓ",
      addCommentPlaceholder: "વિચારશીલ ટિપ્પણી લખો...",
      postComment: "મોકલો",
      toxicBlocked: "નોંધ: અપમાનજનક ટિપ્પણીઓ સેફ્ટી શીલ્ડ દ્વારા આપમેળે બ્લોક થાય છે.",
      shareCopied: "લિંક કૉપિ થઈ ગઈ!",
      noComments: "હજુ કોઈ ટિપ્પણી નથી. સાર્થક ચર્ચા શરૂ કરો!",
      shieldActive: "શીલ્ડ સક્રિય",
      muteTip: "અવાજ બંધ કરો",
      unmuteTip: "અવાજ ચાલુ કરો",
      shareTip: "રીલ શેર કરો",
      curating: "તમારો AI અનુભવ તૈયાર થઈ રહ્યો છે...",
      noReelsMatch: "આ કેટેગરીમાં કોઈ રીલ નથી",
      resetFilters: "બધા ફિલ્ટર્સ રીસેટ કરો"
    },
    categories: {
      all: "બધા",
      productivity: "ઉત્પાદકતા",
      techAI: "ટેકનોલોજી અને AI",
      healthFitness: "સ્વાસ્થ્ય અને ફિટનેસ",
      scienceSpace: "વિજ્ઞાન અને અવકાશ",
      finance: "નાણાં અને રોકાણ",
      mindfulnessDetox: "માનસિક શાંતિ અને ડીટોક્સ"
    },
    modals: {
      quizTitle: "જ્ઞાન ક્વિઝ (Quiz)",
      notesTitle: "AI સારાંશ નોટ્સ",
      tasksTitle: "કાર્યસૂચિ (Checklist)",
      studyPlanTitle: "3-દિવસીય લર્નિંગ પ્લાન",
      sourcesTitle: "ચકાસાયેલ સંદર્ભ સ્ત્રોતો",
      claimAnalyzed: "દાવો વિશ્લેષણ પૂર્ણ",
      verifiedFact: "પ્રમાણિત હકીકત",
      attentionBudget: "દૈનિક સમય મર્યાદા",
      finishNow: "સત્ર સમાપ્ત કરો",
      oneMore: "હજુ એક રીલ",
      congratulations: "સત્ર સફળતાપૂર્વક પૂર્ણ!",
      rewardEarned: "સ્ક્રીન-ટાઇમ રિવોર્ડ મળ્યો",
      forgetThis: "આ રુચિ ભૂલી જાઓ",
      forgetSuccess: "AI મેમરીમાંથી સફળતાપૂર્વક હટાવ્યું."
    },
    nutrition: {
      title: "મનોરંજન ન્યુટ્રિશન લેબલ",
      learning: "શિક્ષણ અને ટેકનોલોજી",
      productivity: "ઉત્પાદકતા અને આદતો",
      mindfulness: "સ્વાસ્થ્ય અને માનસિક શાંતિ",
      entertainment: "શુદ્ધ મનોરંજન",
      score: "સાર્થક જોડાણ સ્કોર"
    },
    landing: {
      badge: "નેક્સ્ટ-જનરેશન સોશિયલ એન્ટરટેઈનમેન્ટ • 190+ ફિચર્સ",
      heroTitle: "સમયનો આદર કરતું મનોરંજન જે દરેક રીલને ફેરવે છે ",
      heroHighlight: "વાસ્તવિક પરિણામોમાં.",
      heroSubtitle: "પરંપરાગત પ્લેટફોર્મ્સ પૂછે છે: \"અમે તમને ક્યાં સુધી સ્ક્રોલ કરાવી શકીએ?\"",
      heroSubtitleAuthor: "ઝિન્કો સોશિયલ પૂછે છે: \"અત્યારે તમને શેની જરૂર છે અને તે સમયને કેવી રીતે સાર્થક બનાવી શકાય?\"",
      exploreFeed: "AI રીલ્સ ફીડ જુઓ",
      personalize: "પ્રોફાઇલ પસંદગીઓ (Onboarding)",
      pillar1Title: "વ્યક્તિગત એન્ટરટેઈનમેન્ટ OS",
      pillar1Desc: "તમારા મૂડ અને લક્ષ્યો અનુસાર તૈયાર કરેલ ફીડ",
      pillar2Title: "\"મારી પાસે 5 મિનિટ છે\" મોડ",
      pillar2Desc: "સમયસર પૂરું થતું સ્માર્ટ સત્ર",
      pillar3Title: "ઉપયોગી બનાવો (ક્વિઝ/નોટ્સ)",
      pillar3Desc: "દરેક રીલમાંથી ત્વરિત શિક્ષણ",
      pillar4Title: "AI સત્ય ચકાસણી અને સેફ્ટી શીલ્ડ",
      pillar4Desc: "સંદર્ભ સ્ત્રોતો સાથે વિશ્વસનીય માહિતી",
      comparisonTitle: "શા માટે આપણે પેસિવ ફીડ્સને બદલી રહ્યા છીએ",
      comparisonSubtitle: "નેક્સ્ટ-જનરેશન સોશિયલ એન્ટરટેઈનમેન્ટ પ્લેટફોર્મનો મૂળભૂત વિચાર.",
      traditionalTitle: "પરંપરાગત શોર્ટ-ફોર્મ પ્લેટફોર્મ્સ",
      traditional1: "અનંત, અનિયંત્રિત સ્ક્રોલ જેમાં અટકવાનો કોઈ વિકલ્પ નથી",
      traditional2: "અપ્રમાણિત વાયરલ અફવાઓ અને ભ્રામક માહિતી",
      traditional3: "પેસિવ ડોપામાઇન ચક્ર: ૧૦ સેકન્ડ પછી તમે ભૂલી જાઓ છો શું જોયું",
      traditional4: "દૈનિક સમય મર્યાદા કે શિક્ષણ લક્ષ્યોનો કોઈ વિચાર નહીં",
      zynqoTitle: "ઝિન્કો સોશિયલ એન્ટરટેઈનમેન્ટ OS",
      zynqo1: "\"મારી પાસે 5 મિનિટ છે\" સ્માર્ટ સત્ર સમય મર્યાદા સાથે",
      zynqo2: "સંદર્ભ સ્ત્રોતો સાથે AI સત્ય ચકાસણી",
      zynqo3: "\"આ ઉપયોગી બનાવો\": ત્વરિત AI નોટ્સ, ક્વિઝ અને કાર્યસૂચિ",
      zynqo4: "મનોરંજન ન્યુટ્રિશન લેબલ અને ધ્યાન સમય સુરક્ષા",
      ctaTitle: "બુદ્ધિશાળી મનોરંજન માટે તૈયાર છો?",
      ctaSubtitle: "હમણાં જ તમારું વ્યક્તિગત સત્ર શરૂ કરો અને ડિજિટલ રીલ્સને વાસ્તવિક સિદ્ધિઓમાં ફેરવો.",
      ctaButton: "ઝિન્કો સોશિયલ શરૂ કરો",
      radarTitle: "લાઈવ AI રડાર",
      activeTrends: "સક્રિય ટ્રેન્ડ્સ",
      liveSignals: "લાઈવ સિગ્નલ્સ"
    },
    profile: {
      title: "મારી પ્રોફાઇલ અને પ્રવૃત્તિ",
      backHome: "મુખ્ય પેજ",
      backFeed: "ફીડ પર પાછા જાઓ",
      editProfile: "પ્રોફાઇલ સંપાદિત કરો",
      shareProfile: "પ્રોફાઇલ શેર કરો",
      followers: "ફોલોઅર્સ",
      following: "ફોલો કર્યું",
      posts: "કુલ પોસ્ટ્સ",
      level: "લેવલ",
      uploadContent: "કન્ટેન્ટ અપલોડ કરો",
      exploreFeed: "ફીડ જુઓ",
      cancel: "રદ કરો",
      publishNow: "હમણાં પ્રકાશિત કરો",
      all: "બધા",
      reelsTab: "રીલ્સ",
      videosTab: "વિડિયોઝ",
      postsTab: "પોસ્ટ્સ",
      activityTab: "પ્રવૃત્તિ અને ક્રિયાપ્રતિક્રિયા",
      likedTab: "પસંદ કરેલ",
      savedTab: "સાચવેલ",
      commentsTab: "ટિપ્પણીઓ",
      milestonesTab: "સિદ્ધિઓ અને XP",
      emptyReels: "હજુ સુધી કોઈ રીલ પોસ્ટ નથી કરી.",
      emptyVideos: "હજુ સુધી કોઈ વિડિયો અપલોડ નથી કર્યો.",
      emptyPosts: "હજુ સુધી કોઈ પોસ્ટ નથી મૂકી.",
      emptyLiked: "હજુ સુધી કોઈ સામગ્રી પસંદ કરી નથી.",
      emptySaved: "હજુ સુધી કોઈ સામગ્રી સાચવી નથી.",
      emptyComments: "હજુ સુધી કોઈ ટિપ્પણી કરી નથી.",
      createPost: "નવી પોસ્ટ બનાવો"
    }
  },

  hi: {
    appName: "Zynqo Social",
    tagline: "नेक्स्ट-जेनरेशन सोशल एंटरटेनमेंट",
    whatDoYouNeed: "अभी आपको किस चीज़ की आवश्यकता है?",
    intents: {
      all: "सभी (All)",
      teach: "मुझे सिखाओ",
      achieve: "लक्ष्य प्राप्त करें",
      relax: "तनावमुक्त हों",
      entertain: "मनोरंजन करें",
      inspire: "प्रेरणा लें",
      connect: "दोस्तों से जुड़ें"
    },
    actions: {
      makeUseful: "इसे उपयोगी बनाएं",
      realityCheck: "AI सत्यता जांच",
      whyThis: "मुझे यह रील क्यों दिखी?",
      timeSession: "मेरे पास 5 मिनट हैं",
      goalPaths: "लक्ष्य यात्राएं",
      watchTogether: "साथ मिलकर देखें",
      creatorStudio: "क्रिएटर स्टूडियो",
      wellbeing: "डिजिटल वेलबीइंग",
      memoryVault: "AI मेमोरी वॉल्ट",
      companion: "नोवा AI साथी",
      like: "पसंद",
      comment: "टिप्पणियाँ",
      share: "साझा करें",
      subtitles: "सबटाइटल",
      sound: "ध्वनि"
    },
    companion: {
      name: "नोवा AI साथी",
      greeting: "नमस्ते! मैं नोवा हूँ, आपकी AI एंटरटेनमेंट साथी। मैं आपके मौजूदा मोड के लिए तैयार हूँ। आप जो देख रहे हैं उसके बारे में मुझसे कुछ भी पूछें, या बताएं कि आज आप क्या सीखना चाहते हैं!",
      inputPlaceholder: "नोवा से पूछें या अपनी पसंद बताएं...",
      surpriseMe: "कुछ नया दिखाओ",
      eli10: "सरल भाषा में समझें",
      quizMe: "मेरी क्विज़ लें",
      context: "संदर्भ",
      listening: "सुन रहे हैं...",
      speechNotSupported: "इस ब्राउज़र में वॉयस रिकग्निशन समर्थित नहीं है।",
      errorFallback: "मैं यहाँ हूँ! यदि आपको नोट्स, क्विज़ या योजना चाहिए तो मुझे बताएं।",
      speakAloud: "आवाज़ सुनें (Speak)",
      stopVoice: "आवाज़ बंद करें",
      voiceMode: "वॉयस मोड",
      voiceModeOn: "वॉयस मोड चालू",
      voiceModeOff: "वॉयस मोड बंद"
    },
    nav: {
      displayMode: "प्रदर्शन मोड:",
      mobileView: "मोबाइल रील व्यू",
      studioView: "स्टूडियो इमर्सिव व्यू",
      landingPage: "मुख्य पृष्ठ (Landing)",
      keyboardShortcuts: "कीबोर्ड शॉर्टकट्स (↑/↓, Space, M, L, U)",
      keyboardTitle: "कीबोर्ड नियंत्रण",
      shortcutNextPrev: "अगली / पिछली रील",
      shortcutPlayPause: "चलाएं / रोकें",
      shortcutMute: "आवाज़ बंद / चालू",
      shortcutLike: "रील पसंद करें",
      shortcutUseful: "उपयोगी बनाएं (नोट्स/क्विज़)",
      studio: "स्टूडियो",
      memory: "मेमोरी",
      account: "खाता",
      display: "प्रदर्शन",
      lightMode: "लाइट मोड",
      darkMode: "डार्क मोड",
      switchAccount: "खाता बदलें / साइन इन करें",
      resetLimit: "दैनिक ध्यान सीमा रीसेट करें (0 मिनट)",
      signOut: "साइन आउट",
      curatedLearning: "लक्ष्य-आधारित सीखने के ट्रैक",
      watchParties: "सिंक्रोनाइज़्ड वॉच पार्टी",
      creatorStudioTip: "AI क्रिएटर स्टूडियो",
      wellbeingTip: "ध्यान पोषण और स्क्रीन-टाइम सुरक्षा",
      memoryTip: "व्यक्तिगत AI मेमोरी और लर्निंग वॉल्ट",
      searchPlaceholder: "आप क्या सीखना या देखना चाहते हैं लिखें...",
      clear: "साफ़ करें",
      timeLeft: "शेष",
      switchTheme: "रंग थीम बदलें",
      editInterests: "रुचियां और बजट बदलें",
      detoxActive: "डिटॉक्स मोड सक्रिय",
      detoxTip: "कंटेंट डिटॉक्स मोड चालू करें",
      searchTip: "AI रील्स खोजें"
    },
    reel: {
      follow: "फॉलो करें",
      following: "फॉलो किया",
      safeBadge: "सुरक्षित",
      views: "व्यूज़",
      save: "सहेजें",
      saved: "सहेजा गया",
      commentsTitle: "टिप्पणियाँ",
      addCommentPlaceholder: "सार्थक टिप्पणी लिखें...",
      postComment: "भेजें",
      toxicBlocked: "सूचना: अभद्र टिप्पणियाँ सेफ्टी शील्ड द्वारा स्वचालित रूप से ब्लॉक की जाती हैं।",
      shareCopied: "लिंक क्लिपबोर्ड पर कॉपी किया गया!",
      noComments: "अभी कोई टिप्पणी नहीं है। सार्थक बातचीत शुरू करें!",
      shieldActive: "शील्ड सक्रिय",
      muteTip: "आवाज़ बंद करें",
      unmuteTip: "आवाज़ चालू करें",
      shareTip: "रील साझा करें",
      curating: "आपका AI अनुभव तैयार हो रहा है...",
      noReelsMatch: "इस श्रेणी में कोई रील नहीं मिली",
      resetFilters: "सभी फ़िल्टर रीसेट करें"
    },
    categories: {
      all: "सभी",
      productivity: "उत्पादकता",
      techAI: "तकनीक और AI",
      healthFitness: "स्वास्थ्य और फिटनेस",
      scienceSpace: "विज्ञान और अंतरिक्ष",
      finance: "वित्त और निवेश",
      mindfulnessDetox: "मानसिक शांति और डिटॉक्स"
    },
    modals: {
      quizTitle: "ज्ञान प्रश्नोत्तरी (Quiz)",
      notesTitle: "AI संक्षिप्त नोट्स",
      tasksTitle: "कार्रवाई सूची (Checklist)",
      studyPlanTitle: "3-दिवसीय एक्शन प्लान",
      sourcesTitle: "प्रमाणित स्रोत",
      claimAnalyzed: "तथ्य विश्लेषण पूर्ण",
      verifiedFact: "सत्यापित तथ्य",
      attentionBudget: "दैनिक ध्यान बजट",
      finishNow: "अभी सत्र समाप्त करें",
      oneMore: "एक और रील",
      congratulations: "सत्र का लक्ष्य पूरा हुआ!",
      rewardEarned: "स्क्रीन-टाइम इनाम प्राप्त",
      forgetThis: "यह पसंद भूल जाएं",
      forgetSuccess: "AI मेमोरी से हटा दिया गया।"
    },
    nutrition: {
      title: "मनोरंजन पोषण लेबल (Nutrition)",
      learning: "सीखना और तकनीक",
      productivity: "उत्पादकता और आदतें",
      mindfulness: "स्वास्थ्य और शांति",
      entertainment: "मनोरंजन",
      score: "सार्थक सहभागिता स्कोर"
    },
    landing: {
      badge: "नेक्स्ट-जेनरेशन सोशल एंटरटेनमेंट • 190+ फीचर्स",
      heroTitle: "समय का सम्मान करने वाला मनोरंजन जो हर रील को बदलता है ",
      heroHighlight: "वास्तविक उपलब्धियों में।",
      heroSubtitle: "पारंपरिक प्लेटफॉर्म पूछते हैं: \"हम आपको कब तक स्क्रॉल करवा सकते हैं?\"",
      heroSubtitleAuthor: "ज़िन्को सोशल पूछता है: \"अभी आपको किस चीज़ की आवश्यकता है और उस समय को सार्थक कैसे बनाएं?\"",
      exploreFeed: "AI रील्स फ़ीड देखें",
      personalize: "प्रोफ़ाइल प्राथमिकताएं (Onboarding)",
      pillar1Title: "व्यक्तिगत एंटरटेनमेंट OS",
      pillar1Desc: "आपके मूड और लक्ष्यों के अनुसार तैयार फ़ीड",
      pillar2Title: "\"मेरे पास 5 मिनट हैं\" मोड",
      pillar2Desc: "समय पर समाप्त होने वाला स्मार्ट सत्र",
      pillar3Title: "उपयोगी बनाएं (क्विज़/नोट्स)",
      pillar3Desc: "हर रील से तुरंत ज्ञान और नोट्स",
      pillar4Title: "AI सत्यता जांच और सेफ्टी शील्ड",
      pillar4Desc: "प्रमाणित स्रोतों के साथ प्रामाणिक जानकारी",
      comparisonTitle: "हम पैसिव फ़ीड्स को क्यों बदल रहे हैं",
      comparisonSubtitle: "नेक्स्ट-जेनरेशन सोशल एंटरटेनमेंट का मौलिक विचार।",
      traditionalTitle: "पारंपरिक शॉर्ट-फ़ॉर्म प्लेटफ़ॉर्म",
      traditional1: "अनंत स्क्रॉल जिसमें रुकने का कोई विकल्प नहीं",
      traditional2: "बिना सत्यापन के फैलने वाले मिथक और अफवाहें",
      traditional3: "पैसिव डोपामाइन चक्र: 10 सेकंड बाद आप भूल जाते हैं",
      traditional4: "दैनिक समय सीमा या सीखने के लक्ष्यों की अनदेखी",
      zynqoTitle: "ज़िन्को सोशल एंटरटेनमेंट OS",
      zynqo1: "\"मेरे पास 5 मिनट हैं\" संरचित सत्र",
      zynqo2: "प्रमाणित स्रोतों के साथ AI सत्यता जांच",
      zynqo3: "\"इसे उपयोगी बनाएं\": त्वरित AI नोट्स और क्विज़",
      zynqo4: "मनोरंजन पोषण लेबल और स्क्रीन-टाइम सुरक्षा",
      ctaTitle: "बुद्धिमान मनोरंजन के लिए तैयार हैं?",
      ctaSubtitle: "अभी अपना व्यक्तिगत सत्र शुरू करें और डिजिटल रील्स को वास्तविक उपलब्धियों में बदलें।",
      ctaButton: "ज़िन्को सोशल शुरू करें",
      radarTitle: "लाइव AI रडार",
      activeTrends: "सक्रिय ट्रेंड्स",
      liveSignals: "लाइव सिग्नल्स"
    },
    profile: {
      title: "मेरी प्रोफ़ाइल और गतिविधि",
      backHome: "मुख्य पृष्ठ",
      backFeed: "फ़ीड पर वापस जाएं",
      editProfile: "प्रोफ़ाइल संपादित करें",
      shareProfile: "प्रोफ़ाइल साझा करें",
      followers: "फ़ॉलोअर्स",
      following: "फ़ॉलो किया",
      posts: "कुल पोस्ट्स",
      level: "लेवल",
      uploadContent: "कंटेंट अपलोड करें",
      exploreFeed: "फ़ीड देखें",
      cancel: "रद्द करें",
      publishNow: "अभी प्रकाशित करें",
      all: "सभी",
      reelsTab: "रील्स",
      videosTab: "वीडियो",
      postsTab: "पोस्ट्स",
      activityTab: "गतिविधि और इंटरैक्शन",
      likedTab: "पसंद किया गया",
      savedTab: "सहेजा गया",
      commentsTab: "टिप्पणियाँ",
      milestonesTab: "उपलब्धियां और XP",
      emptyReels: "अभी तक कोई रील पोस्ट नहीं की गई है।",
      emptyVideos: "अभी तक कोई वीडियो अपलोड नहीं किया गया है।",
      emptyPosts: "अभी तक कोई पोस्ट नहीं बनाई गई है।",
      emptyLiked: "अभी तक कोई सामग्री पसंद नहीं की गई है।",
      emptySaved: "अभी तक कोई सामग्री नहीं सहेजी गई है।",
      emptyComments: "अभी तक कोई टिप्पणी नहीं की गई है।",
      createPost: "नई पोस्ट बनाएं"
    }
  },

  sa: {
    appName: "Zynqo Social",
    tagline: "नव्य-युगस्य सामाजिक-मनोरञ्जनम्",
    whatDoYouNeed: "भवते इदानीं किं रोचते / किं आवश्यकम्?",
    intents: {
      all: "सर्वम् (All)",
      teach: "मां पाठयतु (ज्ञानम्)",
      achieve: "सिद्धिं प्राप्नुहि (लक्ष्यम्)",
      relax: "विश्रामं कुरु (शान्तिः)",
      entertain: "मनोरञ्जनम्",
      inspire: "प्रेरणां प्राप्नुहि",
      connect: "मित्रेभ्यः संयोगः"
    },
    actions: {
      makeUseful: "इदम् उपयुक्तं कुरु",
      realityCheck: "AI सत्य-परीक्षणम्",
      whyThis: "किमर्थम् इदं दृश्यते?",
      timeSession: "मम समीपे ५ निमेषाः सन्ति",
      goalPaths: "लक्ष्य-मार्गाः",
      watchTogether: "सहैव पश्यन्तु",
      creatorStudio: "स्रष्टृ-शाला",
      wellbeing: "डिजिटल-स्वास्थ्यम्",
      memoryVault: "स्मृति-कोशः",
      companion: "नोवा AI सहचरः",
      like: "रोचते",
      comment: "टिप्पण्यः",
      share: "वितरणम् (Share)",
      subtitles: "उपशीर्षकम्",
      sound: "ध्वनिः"
    },
    companion: {
      name: "नोवा AI सहचरः",
      greeting: "नमस्ते! अहं नोवा, भवतः बुद्धिमान् मनोरञ्जन-सहचरः अस्मि। दृश्यविषये किमपि पृच्छतु अथवा अद्य भवान् किं साधयितुम् इच्छति तत् वदतु!",
      inputPlaceholder: "नोवां पृच्छतु अथवा स्वावश्यकतां लिखतु...",
      surpriseMe: "नूतनं दर्शयतु",
      eli10: "सरलतया बोधयतु",
      quizMe: "प्रश्नोत्तरीं चालयतु",
      context: "संदर्भः",
      listening: "शृण्वन् अस्मि...",
      speechNotSupported: "वाणी-संवादः असमिन् जालपुटे असमर्थः।",
      errorFallback: "क्षम्यताम्, सम्भाषणे त्रुटिः संजाता।",
      speakAloud: "उच्चैः पठतु",
      stopVoice: "ध्वनिं स्थगयतु",
      voiceMode: "वाणी-विधानम्",
      voiceModeOn: "वाणी सक्रिया",
      voiceModeOff: "वाणी निष्क्रिया"
    },
    nav: {
      displayMode: "प्रदर्शन-विधानम्:",
      mobileView: "चलदूरभाष-रील् दृश्यम्",
      studioView: "गभीर-स्टुडियो दृश्यम्",
      landingPage: "मुख्य-पृष्ठम्",
      keyboardShortcuts: "कुञ्चिका-संक्षेपाः (↑/↓, Space, M, L, U)",
      keyboardTitle: "कुञ्चिका-नियन्त्रणम्",
      shortcutNextPrev: "अग्रिम / पूर्व रील्",
      shortcutPlayPause: "चालन / स्थगन",
      shortcutMute: "मौनम् / ध्वनिः",
      shortcutLike: "रील् रोचनम् (Like)",
      shortcutUseful: "इदम् उपयुक्तं कुरु (Notes/Quiz)",
      studio: "स्टुडियो",
      memory: "स्मृतिः",
      account: "मम वृत्तम्",
      display: "प्रदर्शनम्",
      lightMode: "शुभ्र-विधानम्",
      darkMode: "श्याम-विधानम्",
      switchAccount: "वृत्त-परिवर्तनम् / प्रवेशः",
      resetLimit: "दैनिक-समयसीमा पुनर्स्थापनम् (० निमेषः)",
      signOut: "निर्गमः",
      curatedLearning: "संयोजित-शिक्षण-मार्गाः",
      watchParties: "सह-दर्शन-सभागारः",
      creatorStudioTip: "AI स्रष्टा-शाला",
      wellbeingTip: "ध्यान-पोषणम् & समय-रक्षणम्",
      memoryTip: "वैयक्तिक AI स्मृति-कोशः",
      searchPlaceholder: "किं शिक्षितुम् इच्छसि वा द्रष्टुम् इच्छसि लिखतु...",
      clear: "स्वच्छं कुरु",
      timeLeft: "अवशिष्टम्",
      switchTheme: "वर्ण-संयोजनं परिवर्तयतु",
      editInterests: "अभिरुचिं समयसीमाञ्च सम्पादयतु",
      detoxActive: "शान्ति-विधानं सक्रियम्",
      detoxTip: "डिटॉक्स-विधानं प्रवर्तयतु",
      searchTip: "AI रील् अन्विषतु"
    },
    reel: {
      follow: "अनुसरतु",
      following: "अनुसरन्",
      safeBadge: "सुरक्षितम्",
      views: "दृष्टयः",
      save: "सञ्चिनोतु",
      saved: "सञ्चितम्",
      commentsTitle: "टिप्पण्यः",
      addCommentPlaceholder: "सार्थक-टिप्पणीं लिखतु...",
      postComment: "प्रेषयतु",
      toxicBlocked: "सूचना: अभद्र-टिप्पण्यः सुरक्षारक्षकेण स्थगिताः।",
      shareCopied: "लिङ्क प्रतिलिपिः संजाता!",
      noComments: "अद्यापि टिप्पण्यः न सन्ति। संवादम् आरभताम्!",
      shieldActive: "शील्ड सक्रियम्",
      muteTip: "मौनं कुरु",
      unmuteTip: "ध्वनिं चालयतु",
      shareTip: "रील् वितरतु",
      curating: "भवतः AI अनुभवः सज्जीक्रियते...",
      noReelsMatch: "एतेन रूपेण कोऽपि रील् नास्ति",
      resetFilters: "सर्वं पुनर्स्थापयतु"
    },
    categories: {
      all: "सर्वाणि",
      productivity: "कार्यक्षमता & प्रगतिः",
      techAI: "तन्त्रज्ञानम् & AI",
      healthFitness: "स्वास्थ्यम् & व्यायामः",
      scienceSpace: "विज्ञानम् & अन्तरिक्षम्",
      finance: "वित्तम् & सम्पत्तिः",
      mindfulnessDetox: "ध्यानम् & शान्तिः"
    },
    modals: {
      quizTitle: "ज्ञान-प्रश्नोत्तरी (Quiz)",
      notesTitle: "AI संरचित-टिप्पण्यः",
      tasksTitle: "कर्म-सूची (Checklist)",
      studyPlanTitle: "त्रि-दिवसीय-कार्य-योजना",
      sourcesTitle: "प्रमाणित-स्रोतांसि",
      claimAnalyzed: "दावा-विश्लेषणं पूर्णम्",
      verifiedFact: "सत्यापित-तथ्यम्",
      attentionBudget: "दैनिक-ध्यान-बजट्",
      finishNow: "इदानीमेव सत्रं समापयतु",
      oneMore: "एकं रील् अधिकम्",
      congratulations: "सत्र-लक्ष्यं सम्पन्नम्!",
      rewardEarned: "समय-रक्षण-पुरस्कारः प्राप्तः",
      forgetThis: "इमां रुचिं विस्मरतु",
      forgetSuccess: "AI स्मृतेः निष्कासितम्।"
    },
    nutrition: {
      title: "मनोरञ्जन-पोषण-मापकः (Nutrition)",
      learning: "शिक्षणम् & तन्त्रज्ञानम्",
      productivity: "उत्पादकता & अभ्यासः",
      mindfulness: "स्वास्थ्यम् & शान्तिः",
      entertainment: "मनोरञ्जनम्",
      score: "सार्थक-सहभागिता-अङ्कः"
    },
    landing: {
      heroTitle: "मनोरञ्जनम् यत् भवतः समयस्य आदरं करोति & ",
      heroHighlight: "प्रत्येकं रील् कर्मणि परिवर्तयति।",
      heroSubtitle: "पारम्परिक-मञ्चाः पृच्छन्ति: \"कियन्तं कालं भवन्तं स्क्रॉल-मध्ये बन्धयितुं शक्नुमः?\"",
      heroSubtitleAuthor: "Zynqo Social पृच्छति: \"इदानीं भवतः किं प्रयोजनम्, कियत् समयः अस्ति, कथं च तं सार्थकं कुर्मः?\"",
      exploreFeed: "रील्-प्रवाहं पश्यन्तु",
      personalize: "वैयक्तिक-प्रोफाइल सज्जं कुरु",
      pillar1Title: "वैयक्तिक मनोरञ्जन OS",
      pillar1Desc: "भवतः उद्देश्यानुसारं सज्जीकृता सामग्री",
      pillar2Title: "\"५ निमेषाः सन्ति\" विधानम्",
      pillar2Desc: "निश्चित-समाप्ति-सहितानि सत्राणि",
      pillar3Title: "इदम् उपयुक्तं कुरु",
      pillar3Desc: "रील्-दर्शनं तात्कालिक-ज्ञाने परिवर्तयतु",
      pillar4Title: "AI सत्य-परीक्षण-कवचम्",
      pillar4Desc: "तटस्थ-प्रमाणैः सह तथ्य-परीक्षणम्",
      comparisonTitle: "किमर्थं वयं पारम्परिक-फीड् त्यजामः?",
      comparisonSubtitle: "नव्य-युगस्य सामाजिक-मनोरञ्जन-क्रान्तिः।",
      traditionalTitle: "पारम्परिक-लघु-चलचित्र-मञ्चाः",
      traditional1: "अन्तहीनं स्क्रॉलिंग यत्र कोऽपि विरामः नास्ति",
      traditional2: "अपरीक्षिताः मिथ्या-वादाः अप्रतिबद्धाः प्रसरन्ति",
      traditional3: "निष्क्रिय-डोपामिन: १० क्षणानन्तरं सर्वं विस्मर्यते",
      traditional4: "समय-लक्ष्यस्य वा शिक्षणस्य कोऽपि विचारः नास्ति",
      zynqoTitle: "Zynqo Social Entertainment OS",
      zynqo1: "\"५ निमेषाः सन्ति\" निश्चित-समाप्ति-युक्तानि सत्राणि",
      zynqo2: "AI सत्य-परीक्षणं प्रामाणिक-स्रोतोभिः सह",
      zynqo3: "\"इदम् उपयुक्तं कुरु\": तात्कालिक-टिप्पण्यः & परीक्षा",
      zynqo4: "मनोरञ्जन-पोषण-मापकः & समय-रक्षणम्",
      ctaTitle: "बुद्धिमत्-मनोरञ्जनाय सिद्धाः स्थ?",
      ctaSubtitle: "इदानीमेव स्वकीयं वैयक्तिक-सत्रम् आरभध्वम्।",
      ctaButton: "Zynqo Social आरभताम्",
      radarTitle: "प्रत्यक्ष AI रडार",
      activeTrends: "सक्रिय-प्रवाहाः",
      liveSignals: "प्रत्यक्ष-संकेताः"
    },
    profile: {
      title: "मम विवरणम् & गतिविधयः",
      backHome: "गृहं प्रति",
      backFeed: "रील् प्रति",
      editProfile: "विवरणं सम्पादयतु",
      shareProfile: "विवरणं वितरतु",
      followers: "अनुयायिनः",
      following: "अनुसरन्तः",
      posts: "लेखाः",
      level: "स्तरः",
      uploadContent: "सामग्रीम् आरोपयतु",
      exploreFeed: "फीड् पश्यन्तु",
      cancel: "निरस्यतु",
      publishNow: "इदानीं प्रकाशयतु",
      all: "सर्वम्",
      reelsTab: "रील्स्",
      videosTab: "चलचित्राणि",
      postsTab: "लेखाः",
      activityTab: "गतिविधिः",
      likedTab: "रोचमानानि",
      savedTab: "संरक्षितानि",
      commentsTab: "टिप्पण्यः",
      milestonesTab: "उपलब्धयः & XP",
      emptyReels: "अद्यापि कोऽपि रील् न प्रकाशितः।",
      emptyVideos: "अद्यापि किमपि चलचित्रं न आरोपितम्।",
      emptyPosts: "अद्यापि कोऽपि लेखः न रचितः।",
      emptyLiked: "अद्यापि किमपि न रोचितम्।",
      emptySaved: "अद्यापि किमपि न संरक्षितम्।",
      emptyComments: "अद्यापि कापि टिप्पणी न कृता।",
      createPost: "नवीन-लेखं रचयतु"
    }
  },

  mr: {
    appName: "Zynqo Social",
    tagline: "पुढच्या पिढीचे सोशल मनोरंजन",
    whatDoYouNeed: "आत्ता तुम्हाला कशाची गरज आहे?",
    intents: {
      all: "सर्व (All)",
      teach: "मला शिकवा",
      achieve: "ध्येय साध्य करा",
      relax: "शांत व्हा / रिलॅक्स",
      entertain: "मनोरंजन करा",
      inspire: "प्रेरणा घ्या",
      connect: "मित्रांशी जोडा"
    },
    actions: {
      makeUseful: "हे उपयुक्त बनवा",
      realityCheck: "AI सत्यता पडताळणी",
      whyThis: "मला हे का दिसत आहे?",
      timeSession: "माझ्याकडे ५ मिनिटे आहेत",
      goalPaths: "ध्येय मार्ग",
      watchTogether: "एकत्र पहा (Watch Together)",
      creatorStudio: "क्रिएटर स्टुडिओ",
      wellbeing: "डिजिटल वेलबीइंग",
      memoryVault: "AI मेमरी व्हॉल्ट",
      companion: "नोव्हा AI साथीदार",
      like: "आवडले",
      comment: "कमेंट्स",
      share: "शेअर करा",
      subtitles: "सबटायटल्स",
      sound: "आवाज"
    },
    companion: {
      name: "नोव्हा AI साथीदार",
      greeting: "नमस्कार! मी नोव्हा, तुमचा AI मनोरंजन साथीदार आहे. आज तुम्हाला काय पाहायचे आहे किंवा काय साध्य करायचे आहे ते सांगा!",
      inputPlaceholder: "नोव्हाला विचारा किंवा तुमची गरज लिहा...",
      surpriseMe: "काहीतरी नवीन दाखवा",
      eli10: "सोप्या भाषेत समजावा",
      quizMe: "माझी क्विझ घ्या",
      context: "संदर्भ",
      listening: "ऐकत आहे...",
      speechNotSupported: "तुमच्या ब्राऊझरमध्ये व्हॉइस सपोर्ट उपलब्ध नाही.",
      errorFallback: "क्षमस्व, संभाषणात अडचण आली.",
      speakAloud: "मोठ्याने वाचा",
      stopVoice: "आवाज थांबवा",
      voiceMode: "व्हॉइस मोड",
      voiceModeOn: "व्हॉइस चालू",
      voiceModeOff: "व्हॉइस बंद"
    },
    nav: {
      displayMode: "प्रदर्शन मोड:",
      mobileView: "मोबाइल रील व्ह्यू",
      studioView: "स्टुडिओ इमर्सिव्ह व्ह्यू",
      landingPage: "मुख्य पृष्ठ",
      keyboardShortcuts: "कीबोर्ड शॉर्टकट्स (↑/↓, Space, M, L, U)",
      keyboardTitle: "कीबोर्ड नियंत्रणे",
      shortcutNextPrev: "पुढील / मागील रील",
      shortcutPlayPause: "प्ले / पॉझ",
      shortcutMute: "म्यूट / अनम्यूट",
      shortcutLike: "रील लाईक करा",
      shortcutUseful: "हे उपयुक्त बनवा (नोट्स/क्विझ)",
      studio: "स्टुडिओ",
      memory: "मेमरी",
      account: "माझे खाते",
      display: "डिस्प्ले",
      lightMode: "लाईट मोड",
      darkMode: "डार्क मोड",
      switchAccount: "खाते बदला / साइन इन करा",
      resetLimit: "दैनिक वेळ मर्यादा रीसेट करा (० मिनिटे)",
      signOut: "साइन आउट",
      curatedLearning: "निवडक शिक्षण ट्रॅक",
      watchParties: "सिंक्रोनाइझ्ड वॉच पार्टी",
      creatorStudioTip: "AI क्रिएटर स्टुडिओ",
      wellbeingTip: "लक्ष पोषण आणि स्क्रीन-टाइम संरक्षण",
      memoryTip: "वैयक्तिक AI मेमरी व्हॉल्ट",
      searchPlaceholder: "तुम्हाला काय शिकायचे किंवा पाहायचे आहे ते शोधा...",
      clear: "साफ करा",
      timeLeft: "शिल्लक",
      switchTheme: "रंग थीम बदला",
      editInterests: "रुची आणि बजेट बदला",
      detoxActive: "डिटॉक्स मोड सुरू आहे",
      detoxTip: "कंटेंट डिटॉक्स मोड सुरू करा",
      searchTip: "AI रील्स शोधा"
    },
    reel: {
      follow: "फॉलो करा",
      following: "फॉलो केले",
      safeBadge: "सुरक्षित",
      views: "व्ह्यूज",
      save: "सेव्ह करा",
      saved: "सेव्ह केले",
      commentsTitle: "कमेंट्स",
      addCommentPlaceholder: "सकारात्मक कमेंट लिहा...",
      postComment: "पोस्ट करा",
      toxicBlocked: "सूचना: अपशब्द किंवा आक्षेपार्ह कमेंट्स सेफ्टी शील्डद्वारे स्वयंचलितपणे ब्लॉक केल्या जातात.",
      shareCopied: "लिंक क्लिपबोर्डवर कॉपी केली!",
      noComments: "अजून कोणतीही कमेंट नाही. अर्थपूर्ण संवाद सुरू करा!",
      shieldActive: "शील्ड सक्रिय",
      muteTip: "म्यूट करा",
      unmuteTip: "अनम्यूट करा",
      shareTip: "रील शेअर करा",
      curating: "तुमचा AI अनुभव तयार होत आहे...",
      noReelsMatch: "या श्रेणीमध्ये कोणतीही रील सापडली नाही",
      resetFilters: "सर्व फिल्टर्स रीसेट करा"
    },
    categories: {
      all: "सर्व",
      productivity: "उत्पादकता आणि सवयी",
      techAI: "तंत्रज्ञान आणि AI",
      healthFitness: "आरोग्य आणि फिटनेस",
      scienceSpace: "विज्ञान आणि अंतराळ",
      finance: "वित्त आणि गुंतवणूक",
      mindfulnessDetox: "मानसिक शांती आणि डिटॉक्स"
    },
    modals: {
      quizTitle: "ज्ञान प्रश्नमंजुषा (Quiz)",
      notesTitle: "AI संक्षिप्त नोट्स",
      tasksTitle: "कृती यादी (Checklist)",
      studyPlanTitle: "३ दिवसांची कृती योजना",
      sourcesTitle: "सत्यापित संदर्भ",
      claimAnalyzed: "तथ्य विश्लेषण पूर्ण",
      verifiedFact: "सत्यापित सत्य",
      attentionBudget: "दैनिक ध्यान बजेट",
      finishNow: "आत्ताच सत्र पूर्ण करा",
      oneMore: "आणखी एक रील",
      congratulations: "सत्राचे ध्येय साध्य झाले!",
      rewardEarned: "स्क्रीन-टाइम बक्षीस मिळाले",
      forgetThis: "ही पसंती विसरून जा",
      forgetSuccess: "AI मेमरीमधून काढून टाकले."
    },
    nutrition: {
      title: "मनोरंजन पोषण लेबल (Nutrition)",
      learning: "शिक्षण आणि तंत्रज्ञान",
      productivity: "उत्पादकता आणि सवयी",
      mindfulness: "आरोग्य आणि शांती",
      entertainment: "मनोरंजन",
      score: "सार्थक सहभागिता स्कोअर"
    },
    landing: {
      heroTitle: "मनोरंजन जे तुमच्या वेळेचा आदर करते आणि ",
      heroHighlight: "प्रत्येक रीलला खऱ्या कृतीत बदलते.",
      heroSubtitle: "पारंपारिक प्लॅटफॉर्म्स विचारतात: \"आम्ही तुम्हाला किती वेळ स्क्रोलिंगमध्ये अडकवून ठेवू शकतो?\"",
      heroSubtitleAuthor: "Zynqo Social विचारते: \"आत्ता तुम्हाला कशाची गरज आहे, तुमच्याकडे किती वेळ आहे, आणि तो वेळ कसा सत्कारणी लावता येईल?\"",
      exploreFeed: "रील्स फीड एक्सप्लोर करा",
      personalize: "प्रोफाइल पर्सनलाइझ करा",
      pillar1Title: "पर्सनल एंटरटेनमेंट OS",
      pillar1Desc: "तुमच्या उद्दिष्टानुसार तयार केलेली सामग्री",
      pillar2Title: "\"माझ्याकडे ५ मिनिटे आहेत\" मोड",
      pillar2Desc: "निश्चित समाप्तीसह संरचित सत्रे",
      pillar3Title: "हे उपयुक्त बनवा (क्विझ/नोट्स)",
      pillar3Desc: "रील पाहण्याला त्वरित कृतीत बदला",
      pillar4Title: "AI सत्यता पडताळणी कवच",
      pillar4Desc: "तपासलेल्या संदर्भांसह सत्य माहिती",
      comparisonTitle: "आपण निष्क्रीय फीड का बदलत आहोत?",
      comparisonSubtitle: "पुढच्या पिढीच्या सोशल मीडियाची सुरुवात.",
      traditionalTitle: "पारंपारिक शॉर्ट-फॉर्म प्लॅटफॉर्म्स",
      traditional1: "अखंड स्क्रोलिंग ज्याला कोणताही शेवट नसतो",
      traditional2: "आरोग्य आणि पैशांबद्दलच्या खोट्या अफवा सहज पसरतात",
      traditional3: "निष्क्रीय डोपामाइन: १० सेकंदांनंतर सर्व विसरून जाता",
      traditional4: "वेळेचे किंवा शिकण्याचे कोणतेही नियोजन नसते",
      zynqoTitle: "Zynqo Social Entertainment OS",
      zynqo1: "\"माझ्याकडे ५ मिनिटे आहेत\" संरचित सत्रे",
      zynqo2: "विश्वासार्ह संदर्भांसह AI सत्यता पडताळणी",
      zynqo3: "\"हे उपयुक्त बनवा\": त्वरित नोट्स, क्विझ आणि चेकलिस्ट",
      zynqo4: "मनोरंजन पोषण लेबल आणि वेळेचे रक्षण",
      ctaTitle: "हुशार मनोरंजनासाठी तयार आहात?",
      ctaSubtitle: "आत्ताच तुमचे वैयक्तिक सत्र सुरू करा.",
      ctaButton: "Zynqo Social सुरू करा",
      radarTitle: "थेट AI रडार",
      activeTrends: "सक्रिय ट्रेंड्स",
      liveSignals: "थेट सिग्नल्स"
    },
    profile: {
      title: "माझी प्रोफाइल आणि हालचाली",
      backHome: "मुख्य पानावर जा",
      backFeed: "फीडवर जा",
      editProfile: "प्रोफाइल एडिट करा",
      shareProfile: "प्रोफाइल शेअर करा",
      followers: "फॉलोअर्स",
      following: "फॉलोइंग",
      posts: "पोस्ट्स",
      level: "पातळी",
      uploadContent: "सामग्री अपलोड करा",
      exploreFeed: "फीड पहा",
      cancel: "रद्द करा",
      publishNow: "आत्ता प्रकाशित करा",
      all: "सर्व",
      reelsTab: "रील्स",
      videosTab: "व्हिडिओज",
      postsTab: "पोस्ट्स",
      activityTab: "हालचाली",
      likedTab: "आवडलेले",
      savedTab: "जतन केलेले",
      commentsTab: "कमेंट्स",
      milestonesTab: "टप्पे आणि XP",
      emptyReels: "अद्याप कोणतीही रील पोस्ट केलेली नाही.",
      emptyVideos: "अद्याप कोणताही व्हिडिओ अपलोड केलेला नाही.",
      emptyPosts: "अद्याप कोणतीही पोस्ट तयार केलेली नाही.",
      emptyLiked: "अद्याप काहीही आवडलेले नाही.",
      emptySaved: "अद्याप काहीही जतन केलेले नाही.",
      emptyComments: "अद्याप कोणतीही कमेंट नाही.",
      createPost: "नवीन पोस्ट तयार करा"
    }
  },

  te: {
    appName: "Zynqo Social",
    tagline: "తదుపరి తరం సోషల్ ఎంటర్‌టైన్‌మెంట్",
    whatDoYouNeed: "ప్రస్తుతం మీకు ఏమి కావాలి?",
    intents: {
      all: "అన్నీ (All)",
      teach: "నాకు నేర్పించండి",
      achieve: "లక్ష్యాలు సాధించండి",
      relax: "విశ్రాంతి తీసుకోండి",
      entertain: "వినోదం పొందండి",
      inspire: "స్ఫూర్తి పొందండి",
      connect: "స్నేహితులతో కలవండి"
    },
    actions: {
      makeUseful: "దీన్ని ఉపయోగకరంగా మార్చండి",
      realityCheck: "AI వాస్తవ తనిఖీ",
      whyThis: "నాకు ఇది ఎందుకు కనిపిస్తోంది?",
      timeSession: "నాకు 5 నిమిషాల సమయం ఉంది",
      goalPaths: "లక్ష్య ప్రయాణాలు",
      watchTogether: "కలిసి చూడండి (Watch Together)",
      creatorStudio: "క్రియేటర్ స్టూడియో",
      wellbeing: "డిజిటల్ వెల్‌బీయింగ్",
      memoryVault: "AI మెమరీ వాల్ట్",
      companion: "నోవా AI సహచరి",
      like: "ఇష్టపడండి",
      comment: "కామెంట్లు",
      share: "షేర్ చేయండి",
      subtitles: "సబ్‌టైటిల్స్",
      sound: "ధ్వని"
    },
    companion: {
      name: "నోవా AI సహచరి",
      greeting: "నమస్కారం! నేను నోవా, మీ AI ఎంటర్‌టైన్‌మెంట్ సహచరిని. మీరు ఏమి చూడాలనుకుంటున్నారో లేదా ఏమి సాధించాలనుకుంటున్నారో నాకు చెప్పండి!",
      inputPlaceholder: "నోవాను అడగండి లేదా మీ అవసరాన్ని టైప్ చేయండి...",
      surpriseMe: "కొత్తది చూపించు",
      eli10: "సులభంగా వివరించు",
      quizMe: "నన్ను క్విజ్ చేయండి",
      context: "సందర్భం",
      listening: "వింటున్నాను...",
      speechNotSupported: "మీ బ్రౌజర్‌లో వాయిస్ రికగ్నిషన్ సపోర్ట్ లేదు.",
      errorFallback: "క్షమించండి, సంభాషణలో సమస్య వచ్చింది.",
      speakAloud: "గట్టిగా చదవండి",
      stopVoice: "వాయిస్ ఆపండి",
      voiceMode: "వాయిస్ మోడ్",
      voiceModeOn: "వాయిస్ ఆన్",
      voiceModeOff: "వాయిస్ ఆఫ్"
    },
    nav: {
      displayMode: "డిస్‌ప్లే మోడ్:",
      mobileView: "మొబైల్ రీల్ వ్యూ",
      studioView: "స్టూడియో ఇమ్మర్సివ్ వ్యూ",
      landingPage: "హోమ్ పేజీ",
      keyboardShortcuts: "కీబోర్డ్ షార్ట్‌కట్‌లు (↑/↓, Space, M, L, U)",
      keyboardTitle: "కీబోర్డ్ నియంత్రణలు",
      shortcutNextPrev: "తదుపరి / మునుపటి రీల్",
      shortcutPlayPause: "ప్లే / పాజ్",
      shortcutMute: "మ్యూట్ / అన్‌మ్యూట్",
      shortcutLike: "రీల్ లైక్ చేయండి",
      shortcutUseful: "ఉపయోగకరంగా చేయండి (నోట్స్/క్విజ్)",
      studio: "స్టూడియో",
      memory: "మెమరీ",
      account: "నా ఖాతా",
      display: "డిస్‌ప్లే",
      lightMode: "లైట్ మోడ్",
      darkMode: "డార్క్ మోడ్",
      switchAccount: "ఖాతా మార్చండి / సైన్ ఇన్",
      resetLimit: "రోజువారీ సమయ పరిమితిని రీసెట్ చేయండి (0 నిమి)",
      signOut: "సైన్ అవుట్",
      curatedLearning: "ప్రత్యేక లెర్నింగ్ ట్రాక్‌లు",
      watchParties: "సింక్రొనైజ్డ్ వాచ్ పార్టీలు",
      creatorStudioTip: "AI క్రియేటర్ స్టూడియో",
      wellbeingTip: "ధ్యాన పోషణ మరియు స్క్రీన్-టైమ్ రక్షణ",
      memoryTip: "వ్యక్తిగత AI మెమరీ వాల్ట్",
      searchPlaceholder: "మీరు ఏమి నేర్చుకోవాలనుకుంటున్నారో శోధించండి...",
      clear: "క్లియర్ చేయండి",
      timeLeft: "మిగిలి ఉంది",
      switchTheme: "రంగు థీమ్ మార్చండి",
      editInterests: "ఆసక్తులు & బడ్జెట్ సవరించండి",
      detoxActive: "డిటాక్స్ మోడ్ యాక్టివ్‌గా ఉంది",
      detoxTip: "కంటెంట్ డిటాక్స్ మోడ్ ప్రారంభించండి",
      searchTip: "AI రీల్స్ శోధించండి"
    },
    reel: {
      follow: "ఫాలో అవ్వండి",
      following: "ఫాలో అవుతున్నారు",
      safeBadge: "సురక్షితం",
      views: "వీక్షణలు",
      save: "సేవ్ చేయండి",
      saved: "సేవ్ చేయబడింది",
      commentsTitle: "కామెంట్లు",
      addCommentPlaceholder: "మంచి ఆలోచనను పంచుకోండి...",
      postComment: "పోస్ట్ చేయండి",
      toxicBlocked: "గమనిక: అసభ్యకరమైన కామెంట్లు సేఫ్టీ షీల్డ్ ద్వారా స్వయంచాలకంగా బ్లాక్ చేయబడతాయి.",
      shareCopied: "లింక్ క్లిప్‌బోర్డ్‌కి కాపీ చేయబడింది!",
      noComments: "ఇంకా కామెంట్లు లేవు. అర్థవంతమైన సంభాషణను ప్రారంభించండి!",
      shieldActive: "షీల్డ్ యాక్టివ్",
      muteTip: "మ్యూట్",
      unmuteTip: "అన్‌మ్యూట్",
      shareTip: "రీల్ షేర్ చేయండి",
      curating: "మీ AI అనుభవం సిద్ధమవుతోంది...",
      noReelsMatch: "ఈ విభాగంలో రీల్స్ ఏవీ లేవు",
      resetFilters: "అన్ని ఫిల్టర్‌లను రీసెట్ చేయండి"
    },
    categories: {
      all: "అన్నీ",
      productivity: "ఉత్పాదకత మరియు అలవాట్లు",
      techAI: "టెక్నాలజీ మరియు AI",
      healthFitness: "ఆరోగ్యం మరియు ఫిట్‌నెస్",
      scienceSpace: "సైన్స్ మరియు స్పేస్",
      finance: "ఆర్థికం మరియు పెట్టుబడులు",
      mindfulnessDetox: "మానసిక ప్రశాంతత మరియు డిటాక్స్"
    },
    modals: {
      quizTitle: "నాలెడ్జ్ క్విజ్ (Quiz)",
      notesTitle: "AI నిర్మాణాత్మక నోట్స్",
      tasksTitle: "కార్యాచరణ చెక్‌లిస్ట్",
      studyPlanTitle: "3 రోజుల కార్యాచరణ ప్రణాళిక",
      sourcesTitle: "ధృవీకరించబడిన ఆధారాలు",
      claimAnalyzed: "విశ్లేషణ పూర్తయింది",
      verifiedFact: "ధృవీకరించబడిన వాస్తవం",
      attentionBudget: "రోజువారీ సమయ బడ్జెట్",
      finishNow: "ఇప్పుడే సెషన్‌ను ముగించండి",
      oneMore: "ఇంకొక్క రీల్",
      congratulations: "సెషన్ లక్ష్యం నెరవేరింది!",
      rewardEarned: "స్క్రీన్-టైమ్ రివార్డ్ లభించింది",
      forgetThis: "ఈ ప్రాధాన్యతను మర్చిపోండి",
      forgetSuccess: "AI మెమరీ నుండి తీసివేయబడింది."
    },
    nutrition: {
      title: "వినోద పోషకాహార లేబుల్ (Nutrition)",
      learning: "లెర్నింగ్ & టెక్నాలజీ",
      productivity: "ఉత్పాదకత & అలవాట్లు",
      mindfulness: "ఆరోగ్యం & ప్రశాంతత",
      entertainment: "వినోదం",
      score: "అర్థవంతమైన ఎంగేజ్‌మెంట్ స్కోర్"
    },
    landing: {
      heroTitle: "మీ సమయాన్ని గౌరవించే వినోదం మరియు ",
      heroHighlight: "ప్రతి రీల్‌ను నిజమైన చర్యగా మార్చడం.",
      heroSubtitle: "సాంప్రదాయ ప్లాట్‌ఫారమ్‌లు అడుగుతాయి: \"మేము మిమ్మల్ని ఎంతసేపు స్క్రోలింగ్‌లో ఉంచగలం?\"",
      heroSubtitleAuthor: "Zynqo Social అడుగుతుంది: \"ప్రస్తుతం మీకు ఏమి కావాలి, మీ వద్ద ఎంత సమయం ఉంది, మరియు ఆ సమయాన్ని ఎలా అర్థవంతంగా మార్చవచ్చు?\"",
      exploreFeed: "రీల్స్ ఫీడ్ చూడండి",
      personalize: "ప్రొఫైల్ అనుకూలీకరించండి",
      pillar1Title: "వ్యక్తిగత వినోద OS",
      pillar1Desc: "మీ లక్ష్యాలకు అనుగుణంగా రూపొందించిన ఫీడ్",
      pillar2Title: "\"నాకు 5 నిమిషాలు ఉంది\" మోడ్",
      pillar2Desc: "నిర్దిష్ట ముగింపులతో కూడిన నిర్మాణాత్మక సెషన్‌లు",
      pillar3Title: "దీన్ని ఉపయోగకరంగా మార్చండి (క్విజ్/నోట్స్)",
      pillar3Desc: "రీల్స్ చూడటాన్ని తక్షణ కార్యాచరణగా మార్చండి",
      pillar4Title: "AI వాస్తవ తనిఖీ షీల్డ్",
      pillar4Desc: "ధృవీకరించబడిన ఆధారాలతో నిజమైన సమాచారం",
      comparisonTitle: "మనం సాంప్రదాయ ఫీడ్‌లను ఎందుకు మారుస్తున్నాం?",
      comparisonSubtitle: "తదుపరి తరం సోషల్ ఎంటర్‌టైన్‌మెంట్ విప్లవం.",
      traditionalTitle: "సాంప్రదాయ షార్ట్-వీడియో ప్లాట్‌ఫారమ్‌లు",
      traditional1: "అంతులేని స్క్రోలింగ్ మరియు విరామం లేని లూప్",
      traditional2: "ఆరోగ్యం మరియు డబ్బుపై తప్పుడు ప్రచారాలు",
      traditional3: "నిష్క్రియ డోపమైన్: 10 సెకన్ల తర్వాత చూసింది మర్చిపోవడం",
      traditional4: "సమయ పరిమితులు లేదా నేర్చుకునే లక్ష్యాలు లేకపోవడం",
      zynqoTitle: "Zynqo Social Entertainment OS",
      zynqo1: "\"నాకు 5 నిమిషాలు ఉంది\" పద్ధతి గల సెషన్‌లు",
      zynqo2: "విశ్వసనీయ పరిశోధనలతో AI వాస్తవ తనిఖీ",
      zynqo3: "\"దీన్ని ఉపయోగకరంగా చేయండి\": తక్షణ నోట్స్, క్విజ్‌లు మరియు చెక్‌లిస్ట్‌లు",
      zynqo4: "వినోద పోషకాహార లేబుల్ మరియు సమయ పరిరక్షణ",
      ctaTitle: "తెలివైన వినోదం కోసం సిద్ధంగా ఉన్నారా?",
      ctaSubtitle: "ఇప్పుడే మీ వ్యక్తిగతీకరించిన సెషన్‌ను ప్రారంభించండి.",
      ctaButton: "Zynqo Social ప్రారంభించండి",
      radarTitle: "లైవ్ AI రాడార్",
      activeTrends: "యాక్టివ్ ట్రెండ్‌లు",
      liveSignals: "లైవ్ సిగ్నల్స్"
    },
    profile: {
      title: "నా ప్రొఫైల్ మరియు కార్యకలాపాలు",
      backHome: "హోమ్‌కు తిరిగి వెళ్లండి",
      backFeed: "ఫీడ్‌కు తిరిగి వెళ్లండి",
      editProfile: "ప్రొఫైల్ సవరించండి",
      shareProfile: "ప్రొఫైల్ షేర్ చేయండి",
      followers: "ఫాలోవర్స్",
      following: "ఫాలోయింగ్",
      posts: "పోస్ట్‌లు",
      level: "స్థాయి",
      uploadContent: "కంటెంట్ అప్‌లోడ్ చేయండి",
      exploreFeed: "ఫీడ్ చూడండి",
      cancel: "రద్దు చేయండి",
      publishNow: "ఇప్పుడే ప్రచురించండి",
      all: "అన్నీ",
      reelsTab: "రీల్స్",
      videosTab: "వీడియోలు",
      postsTab: "పోస్ట్‌లు",
      activityTab: "కార్యకలాపాలు",
      likedTab: "ఇష్టపడినవి",
      savedTab: "సేవ్ చేసినవి",
      commentsTab: "కామెంట్లు",
      milestonesTab: "మైలురాళ్ళు & XP",
      emptyReels: "ఇంకా ఎలాంటి రీల్స్ పోస్ట్ చేయలేదు.",
      emptyVideos: "ఇంకా ఎలాంటి వీడియోలు అప్‌లోడ్ చేయలేదు.",
      emptyPosts: "ఇంకా ఎలాంటి పోస్ట్‌లు సృష్టించలేదు.",
      emptyLiked: "ఇంకా ఏమీ ఇష్టపడలేదు.",
      emptySaved: "ఇంకా ఏమీ సేవ్ చేయలేదు.",
      emptyComments: "ఇంకా ఎలాంటి కామెంట్లు లేవు.",
      createPost: "కొత్త పోస్ట్ సృష్టించండి"
    }
  },

  es: {
    appName: "Zynqo Social",
    tagline: "Entretenimiento Social de Nueva Generación",
    whatDoYouNeed: "¿Qué necesitas en este momento?",
    intents: {
      all: "Todo",
      teach: "Enséñame",
      achieve: "Lograr metas",
      relax: "Relajarme",
      entertain: "Entretenerme",
      inspire: "Inspirarme",
      connect: "Conectarme"
    },
    actions: {
      makeUseful: "Hacerlo Útil",
      realityCheck: "Verificación IA",
      whyThis: "¿Por qué veo esto?",
      timeSession: "Tengo 5 Min",
      goalPaths: "Rutas de Metas",
      watchTogether: "Ver Juntos",
      creatorStudio: "Estudio Creador",
      wellbeing: "Bienestar Digital",
      memoryVault: "Memoria IA",
      companion: "Compañera Nova IA",
      like: "Me gusta",
      comment: "Comentarios",
      share: "Compartir",
      subtitles: "Subtítulos",
      sound: "Sonido"
    },
    companion: {
      name: "Compañera Nova IA",
      greeting: "¡Hola! Soy Nova, tu compañera de entretenimiento inteligente. Estoy lista en tu modo actual. ¡Pregúntame sobre este contenido o cuéntame qué quieres lograr hoy!",
      inputPlaceholder: "Pregunta a Nova o escribe lo que necesitas...",
      surpriseMe: "Sorpréndeme",
      eli10: "Explícame Fácil",
      quizMe: "Hazme un Quiz",
      context: "Contexto",
      listening: "Escuchando...",
      speechNotSupported: "El reconocimiento de voz no está disponible en este navegador.",
      errorFallback: "¡Aquí estoy! Dime si deseas notas, un quiz o una sesión estructurada."
    },
    nav: {
      displayMode: "Modo de Vista:",
      mobileView: "Vista Móvil Reel",
      studioView: "Vista Estudio Inmersiva",
      landingPage: "Página Principal",
      keyboardShortcuts: "Atajos de Teclado (↑/↓, Espacio, M, L, U)",
      keyboardTitle: "Controles de Teclado",
      shortcutNextPrev: "Siguiente / Anterior Reel",
      shortcutPlayPause: "Reproducir / Pausar",
      shortcutMute: "Silenciar / Activar sonido",
      shortcutLike: "Dar Me Gusta",
      shortcutUseful: "Hacerlo Útil (Notas/Quiz)",
      studio: "Estudio",
      memory: "Memoria",
      account: "Cuenta",
      display: "Pantalla",
      lightMode: "Modo Claro",
      darkMode: "Modo Oscuro",
      switchAccount: "Cambiar / Iniciar Sesión",
      resetLimit: "Restablecer Límite Diario (0 min)",
      signOut: "Cerrar Sesión",
      curatedLearning: "Rutas de Aprendizaje Guiadas",
      watchParties: "Salas Sincronizadas en Vivo",
      creatorStudioTip: "Estudio de Creación con IA",
      wellbeingTip: "Nutrición de Atención y Límite de Pantalla",
      memoryTip: "Bóveda de Memoria Personal con IA"
    },
    reel: {
      follow: "Seguir",
      following: "Siguiendo",
      safeBadge: "Seguro",
      views: "vistas",
      commentsTitle: "Comentarios",
      addCommentPlaceholder: "Escribe un comentario reflexivo...",
      postComment: "Publicar",
      toxicBlocked: "Aviso: Los comentarios ofensivos son bloqueados por el Escudo de Seguridad.",
      shareCopied: "¡Enlace copiado al portapapeles!"
    },
    categories: {
      all: "Todos",
      productivity: "Productividad",
      techAI: "Tecnología e IA",
      healthFitness: "Salud y Fitness",
      scienceSpace: "Ciencia y Espacio",
      finance: "Finanzas",
      mindfulnessDetox: "Mindfulness y Desconexión"
    },
    modals: {
      quizTitle: "Cuestionario de Conocimiento",
      notesTitle: "Notas Estructuradas IA",
      tasksTitle: "Lista de Tareas",
      studyPlanTitle: "Plan de Acción de 3 Días",
      sourcesTitle: "Fuentes Verificadas",
      claimAnalyzed: "Afirmación Analizada",
      verifiedFact: "Comprobado Científicamente",
      attentionBudget: "Límite Diario de Atención",
      finishNow: "Finalizar Sesión Ahora",
      oneMore: "Un Video Más",
      congratulations: "¡Meta de Sesión Cumplida!",
      rewardEarned: "Recompensa de Tiempo Obtenida",
      forgetThis: "Olvidar esta Preferencia",
      forgetSuccess: "Eliminado de la memoria de la IA."
    },
    nutrition: {
      title: "Etiqueta Nutricional de Contenido",
      learning: "Aprendizaje y Tecnología",
      productivity: "Productividad y Hábitos",
      mindfulness: "Salud y Calma",
      entertainment: "Entretenimiento",
      score: "Índice de Uso Consciente"
    }
  },

  fr: {
    appName: "Zynqo Social",
    tagline: "Divertissement Social Nouvelle Génération",
    whatDoYouNeed: "De quoi avez-vous besoin maintenant ?",
    intents: {
      all: "Tout",
      teach: "Apprends-moi",
      achieve: "Accomplir",
      relax: "Détends-moi",
      entertain: "Divertissement",
      inspire: "Inspire-moi",
      connect: "Connecter"
    },
    actions: {
      makeUseful: "Rendre Utile",
      realityCheck: "Vérification IA",
      whyThis: "Pourquoi cette vidéo ?",
      timeSession: "J'ai 5 Minutes",
      goalPaths: "Parcours d'Objectifs",
      watchTogether: "Regarder Ensemble",
      creatorStudio: "Studio Créateur",
      wellbeing: "Bien-être Numérique",
      memoryVault: "Mémoire IA",
      companion: "Compagnon Nova IA",
      like: "J'aime",
      comment: "Commentaires",
      share: "Partager",
      subtitles: "Sous-titres",
      sound: "Son"
    },
    companion: {
      name: "Compagnon Nova IA",
      greeting: "Bonjour ! Je suis Nova, votre compagne IA de divertissement. Je suis connectée à votre mode actuel. Posez-moi vos questions ou dites-moi ce que vous souhaitez accomplir aujourd'hui !",
      inputPlaceholder: "Demandez à Nova ou décrivez vos envies...",
      surpriseMe: "Surprenez-moi",
      eli10: "Expliquez Simplement",
      quizMe: "Quiz-moi",
      context: "Contexte",
      listening: "Écoute en cours...",
      speechNotSupported: "La reconnaissance vocale n'est pas prise en charge sur ce navigateur.",
      errorFallback: "Je suis là ! Dites-moi si vous voulez des notes, un quiz ou une session."
    },
    nav: {
      displayMode: "Mode d'affichage :",
      mobileView: "Vue Reel Mobile",
      studioView: "Vue Studio Immersive",
      landingPage: "Accueil (Landing)",
      keyboardShortcuts: "Raccourcis Clavier (↑/↓, Espace, M, L, U)",
      keyboardTitle: "Commandes Clavier",
      shortcutNextPrev: "Vidéo Suivante / Précédente",
      shortcutPlayPause: "Lecture / Pause",
      shortcutMute: "Couper / Activer le son",
      shortcutLike: "Aimer la vidéo",
      shortcutUseful: "Rendre Utile (Notes/Quiz)",
      studio: "Studio",
      memory: "Mémoire",
      account: "Compte",
      display: "Affichage",
      lightMode: "Mode Clair",
      darkMode: "Mode Sombre",
      switchAccount: "Changer de compte / Connexion",
      resetLimit: "Réinitialiser la limite quotidienne (0 min)",
      signOut: "Déconnexion",
      curatedLearning: "Parcours d'Apprentissage Ciblés",
      watchParties: "Salons Synchronisés en Direct",
      creatorStudioTip: "Studio de Création Assisté par IA",
      wellbeingTip: "Nutrition de l'Attention et Protection du Temps d'Écran",
      memoryTip: "Coffre-fort Personnel de Connaissances IA"
    },
    reel: {
      follow: "Suivre",
      following: "Suivi(e)",
      safeBadge: "Sûr",
      views: "vues",
      commentsTitle: "Commentaires",
      addCommentPlaceholder: "Rédigez un commentaire constructif...",
      postComment: "Publier",
      toxicBlocked: "Avis : Les messages toxiques sont bloqués par le Bouclier de Sécurité.",
      shareCopied: "Lien copié dans le presse-papiers !"
    },
    categories: {
      all: "Tout",
      productivity: "Productivité",
      techAI: "Tech & IA",
      healthFitness: "Santé & Fitness",
      scienceSpace: "Sciences & Espace",
      finance: "Finances",
      mindfulnessDetox: "Pleine Conscience & Déconnexion"
    },
    modals: {
      quizTitle: "Quiz Interactif",
      notesTitle: "Notes Structurées IA",
      tasksTitle: "Liste d'Actions",
      studyPlanTitle: "Plan d'Action sur 3 Jours",
      sourcesTitle: "Sources Vérifiées",
      claimAnalyzed: "Déclaration Analysée",
      verifiedFact: "Vérifié Scientifiquement",
      attentionBudget: "Budget d'Attention Quotidien",
      finishNow: "Terminer la Session",
      oneMore: "Une Autre Vidéo",
      congratulations: "Objectif Atteint !",
      rewardEarned: "Récompense de Temps Gagnée",
      forgetThis: "Oublier cette préférence",
      forgetSuccess: "Supprimé de la mémoire IA."
    },
    nutrition: {
      title: "Étiquette Nutritionnelle Média",
      learning: "Apprentissage & Tech",
      productivity: "Productivité & Habitudes",
      mindfulness: "Santé & Sérénité",
      entertainment: "Divertissement",
      score: "Score d'Engagement Utile"
    }
  },

  ja: {
    appName: "Zynqo Social",
    tagline: "次世代ソーシャルエンターテインメント",
    whatDoYouNeed: "今、何を求めていますか？",
    intents: {
      all: "すべて",
      teach: "学びたい",
      achieve: "目標達成",
      relax: "リラックス",
      entertain: "楽しみたい",
      inspire: "インスピレーション",
      connect: "つながる"
    },
    actions: {
      makeUseful: "行動に変える (Make Useful)",
      realityCheck: "AIファクトチェック",
      whyThis: "なぜ表示されたか？",
      timeSession: "5分間モード",
      goalPaths: "学習ジャーニー",
      watchTogether: "一緒に視聴",
      creatorStudio: "クリエイタースタジオ",
      wellbeing: "デジタルウェルビーイング",
      memoryVault: "AIメモリ保管庫",
      companion: "Nova AIアシスタント",
      like: "いいね",
      comment: "コメント",
      share: "シェア",
      subtitles: "字幕",
      sound: "音声"
    },
    companion: {
      name: "Nova AIアシスタント",
      greeting: "こんにちは！AIエンタメアシスタントのNovaです。あなたの現在のモードに合わせてサポートします。動画に関する疑問や、今日達成したい目標を教えてください！",
      inputPlaceholder: "Novaに質問または要望を入力...",
      surpriseMe: "サプライズ動画",
      eli10: "わかりやすく解説",
      quizMe: "クイズを出題",
      context: "コンテキスト",
      listening: "音声を聞き取り中...",
      speechNotSupported: "お使いのブラウザは音声認識に対応していません。",
      errorFallback: "待機中です！ノート作成やクイズなどご希望をお知らせください。"
    },
    nav: {
      displayMode: "表示モード:",
      mobileView: "モバイルリール表示",
      studioView: "スタジオ没入表示",
      landingPage: "トップページ (Landing)",
      keyboardShortcuts: "キーボードショートカット (↑/↓, Space, M, L, U)",
      keyboardTitle: "キーボード操作",
      shortcutNextPrev: "次 / 前のリール",
      shortcutPlayPause: "再生 / 一時停止",
      shortcutMute: "ミュート切替",
      shortcutLike: "いいね",
      shortcutUseful: "有益化 (ノート/クイズ)",
      studio: "スタジオ",
      memory: "メモリ",
      account: "アカウント",
      display: "表示",
      lightMode: "ライトモード",
      darkMode: "ダークモード",
      switchAccount: "アカウント切替 / ログイン",
      resetLimit: "本日の視聴制限をリセット (0分)",
      signOut: "ログアウト",
      curatedLearning: "目標達成型学習トラック",
      watchParties: "同期ライブウォッチパーティ",
      creatorStudioTip: "AIクリエイタースタジオ",
      wellbeingTip: "注意力の栄養バランスと画面時間保護",
      memoryTip: "個人専用AIナレッジ保管庫"
    },
    reel: {
      follow: "フォロー",
      following: "フォロー中",
      safeBadge: "安全",
      views: "回再生",
      commentsTitle: "コメント一覧",
      addCommentPlaceholder: "建設的なコメントを入力...",
      postComment: "送信",
      toxicBlocked: "警告：不適切なコメントはAIセーフティシールドにより自動遮断されます。",
      shareCopied: "リンクをコピーしました！"
    },
    categories: {
      all: "すべて",
      productivity: "生産性・習慣",
      techAI: "テクノロジー・AI",
      healthFitness: "健康・フィットネス",
      scienceSpace: "科学・宇宙",
      finance: "お金・資産形成",
      mindfulnessDetox: "マインドフルネス・デジタルデトックス"
    },
    modals: {
      quizTitle: "3問スピードクイズ",
      notesTitle: "AI構造化ノート",
      tasksTitle: "アクションタスク",
      studyPlanTitle: "3日間アクションプラン",
      sourcesTitle: "検証済みエビデンス",
      claimAnalyzed: "主張検証完了",
      verifiedFact: "科学的検証済み",
      attentionBudget: "本日のアテンション予算",
      finishNow: "今すぐ終了する",
      oneMore: "あと1本だけ",
      congratulations: "セッション完了！",
      rewardEarned: "ウェルビーイングXP獲得",
      forgetThis: "この好みを消去",
      forgetSuccess: "AIメモリから削除されました。"
    },
    nutrition: {
      title: "エンタメ栄養成分表示",
      learning: "学習・テクノロジー",
      productivity: "生産性・習慣",
      mindfulness: "健康・リセット",
      entertainment: "エンタメ",
      score: "有意義なエンゲージメントスコア"
    }
  },

  de: {
    appName: "Zynqo Social",
    tagline: "Soziales Entertainment der nächsten Generation",
    whatDoYouNeed: "Was brauchst du gerade?",
    intents: {
      all: "Alle",
      teach: "Bring mir was bei",
      achieve: "Ziele erreichen",
      relax: "Entspannung",
      entertain: "Unterhaltung",
      inspire: "Inspiration",
      connect: "Verbinden"
    },
    actions: {
      makeUseful: "Nützlich Machen",
      realityCheck: "AI Faktencheck",
      whyThis: "Warum sehe ich das?",
      timeSession: "Ich habe 5 Min",
      goalPaths: "Ziel-Pfade",
      watchTogether: "Gemeinsam schauen",
      creatorStudio: "Creator Studio",
      wellbeing: "Digitales Wohlbefinden",
      memoryVault: "AI Speicher",
      companion: "Nova AI Begleiter",
      like: "Gefällt mir",
      comment: "Kommentare",
      share: "Teilen",
      subtitles: "Untertitel",
      sound: "Ton"
    },
    companion: {
      name: "Nova AI Begleiter",
      greeting: "Hallo! Ich bin Nova, deine KI-Unterhaltungsbegleiterin. Ich bin auf deinen aktuellen Modus eingestellt. Frag mich nach Inhalten oder sag mir, was du heute erreichen willst!",
      inputPlaceholder: "Frag Nova oder beschreibe dein Anliegen...",
      surpriseMe: "Überrasch mich",
      eli10: "Einfach Erklärt",
      quizMe: "Quiz Starten",
      context: "Kontext",
      listening: "Höre zu...",
      speechNotSupported: "Spracherkennung wird in diesem Browser nicht unterstützt.",
      errorFallback: "Ich bin bereit! Sag Bescheid, wenn du Notizen, ein Quiz oder Planung brauchst."
    },
    nav: {
      displayMode: "Anzeigemodus:",
      mobileView: "Mobile Reel-Ansicht",
      studioView: "Immersive Studio-Ansicht",
      landingPage: "Startseite (Landing)",
      keyboardShortcuts: "Tastatur-Shortcuts (↑/↓, Leertaste, M, L, U)",
      keyboardTitle: "Tastatursteuerung",
      shortcutNextPrev: "Nächstes / Vorheriges Reel",
      shortcutPlayPause: "Abspielen / Pause",
      shortcutMute: "Stummschalten / Aktivieren",
      shortcutLike: "Gefällt mir markieren",
      shortcutUseful: "Nützlich machen (Notizen/Quiz)",
      studio: "Studio",
      memory: "Speicher",
      account: "Konto",
      display: "Darstellung",
      lightMode: "Hell-Modus",
      darkMode: "Dunkel-Modus",
      switchAccount: "Konto wechseln / Anmelden",
      resetLimit: "Tägliches Limit zurücksetzen (0 Min)",
      signOut: "Abmelden",
      curatedLearning: "Kuratierte Lernpfade",
      watchParties: "Synchrone Watch-Partys",
      creatorStudioTip: "KI-Creator Studio",
      wellbeingTip: "Aufmerksamkeits-Ernährung & Bildschirmschutz",
      memoryTip: "Persönlicher KI-Wissensspeicher"
    },
    reel: {
      follow: "Folgen",
      following: "Gefolgt",
      safeBadge: "Sicher",
      views: "Aufrufe",
      commentsTitle: "Kommentare",
      addCommentPlaceholder: "Schreibe einen konstruktiven Kommentar...",
      postComment: "Senden",
      toxicBlocked: "Hinweis: Toxische Kommentare werden automatisch vom Safety Shield blockiert.",
      shareCopied: "Link in die Zwischenablage kopiert!"
    },
    categories: {
      all: "Alle",
      productivity: "Produktivität",
      techAI: "Tech & KI",
      healthFitness: "Fitness & Gesundheit",
      scienceSpace: "Wissenschaft & Raumfahrt",
      finance: "Finanzen",
      mindfulnessDetox: "Achtsamkeit & Detox"
    },
    modals: {
      quizTitle: "Interaktives Wissensquiz",
      notesTitle: "AI Strukturierte Notizen",
      tasksTitle: "Aktionsliste",
      studyPlanTitle: "3-Tage-Aktionsplan",
      sourcesTitle: "Geprüfte Quellen",
      claimAnalyzed: "Aussage analysiert",
      verifiedFact: "Wissenschaftlich belegt",
      attentionBudget: "Tägliches Aufmerksamkeitsbudget",
      finishNow: "Session jetzt beenden",
      oneMore: "Noch ein Reel",
      congratulations: "Session-Ziel erreicht!",
      rewardEarned: "Screen-Time Belohnung erhalten",
      forgetThis: "Präferenz vergessen",
      forgetSuccess: "Aus dem AI-Gedächtnis gelöscht."
    },
    nutrition: {
      title: "Entertainment-Nährwerttabelle",
      learning: "Lernen & Tech",
      productivity: "Produktivität & Gewohnheiten",
      mindfulness: "Gesundheit & Achtsamkeit",
      entertainment: "Unterhaltung",
      score: "Sinnvoller Engagement-Score"
    }
  }
};

/**
 * Localized versions of the 8 core reels: titles, descriptions, and transcripts (used for live subtitles).
 */
export const reelTranslations: Partial<Record<LanguageCode, Record<string, { title: string; description: string; transcript: string }>>> = {
  en: {
    "reel-1": {
      title: "How Neural Networks Actually Learn in 60s",
      description: "Forget complex calculus for a second. Here is the intuitive visual breakdown of weights, biases, and gradient descent.",
      transcript: "Think of a neural network like a giant soundboard with millions of volume sliders called weights. At first, all the sliders are set randomly, so the output is pure garbage static. Every time the network makes a guess, backpropagation calculates the error distance from reality. Gradient descent then nudges every slider down the slope of lowest error."
    },
    "reel-2": {
      title: "The 2-Minute Rule That Destroys Procrastination",
      description: "Your brain hates big goals because it perceives them as energy threats. Shrink any task into 120 seconds and watch resistance vanish.",
      transcript: "Whenever you dread writing a report, cleaning your room, or working out, your amygdala sounds an alarm about energy cost. The hack is the 2-Minute Rule: Never commit to the entire task. Commit only to opening the document and typing one sentence, or putting on your running shoes. Once physical inertia is broken, 85% of people continue working effortlessly."
    },
    "reel-3": {
      title: "Debunking the '5 Liters of Water Daily' Viral Trend",
      description: "Social media claims chugging gallons of water cures brain fog and detoxifies organs. Here is the actual renal physiology.",
      transcript: "Drinking 5 liters of water a day won't give you glowing skin or infinite energy—it actually dilutes sodium in your bloodstream, risking hyponatremia. Your kidneys can only filter about 800 to 1,000 milliliters per hour. Follow your natural thirst reflex and check urine color instead."
    },
    "reel-4": {
      title: "Quantum Computing in 60s: Superposition & Qubits",
      description: "Classical computers use bits that are 0 or 1. Quantum computers use qubits that can be both simultaneously.",
      transcript: "Classical bits are like a coin flat on a table: either heads or tails. A quantum qubit is like a spinning coin, existing in a probabilistic state of both until observed. This superposition lets quantum machines evaluate billions of possibilities simultaneously."
    },
    "reel-5": {
      title: "3 Bodyweight Exercises That Replace the Gym",
      description: "No machines, no gym fees. Here is how progressive calisthenics builds real strength using leverage.",
      transcript: "You don't need a gym membership to build elite strength. Master push-ups, deep bodyweight squats, and pull-ups. Manipulate leverage and tempo to increase resistance without touching a single iron barbell."
    },
    "reel-6": {
      title: "Box Breathing: Instant 90-Second Cortisol Reset",
      description: "Used by Navy SEALs and ER doctors. Regulate autonomic nervous system response in under 2 minutes.",
      transcript: "Take a breath with me. Inhale deeply through your nose for 4 seconds... hold for 4 seconds... exhale slowly through your mouth for 4 seconds... hold empty for 4 seconds. When you prolong your exhale, your brain stem signals the heart to slow down. Notice your shoulders dropping."
    },
    "reel-7": {
      title: "Compound Interest in 45 Seconds: How $10/Day Becomes $1,000,000",
      description: "Linear thinking kills wealth. Here is the exact math of reinvested dividends and index compounding.",
      transcript: "If you save $300 a month in cash under your mattress for 30 years, you have $108,000, and inflation eats half. But if you invest that into a broad index fund averaging 10% annual returns, you contribute $108,000, but compound growth pays you over $680,000 in interest."
    },
    "reel-8": {
      title: "5-Minute Mediterranean Power Bowl for Sustained Energy",
      description: "Tired of the 2 PM food coma? Ditch processed takeout carbs. Here is a zero-cook 35g protein bowl.",
      transcript: "Here is how you make lunch faster than ordering delivery. Drain a can of chickpeas, add halved cherry tomatoes, diced cucumber, and olives. Toss in 150 grams of flaked wild tuna or shredded chicken. Drizzle extra virgin olive oil, lemon juice, garlic, and oregano. 35g protein and zero 2 PM crash."
    }
  },

  gu: {
    "reel-1": {
      title: "૬૦ સેકન્ડમાં ન્યુરલ નેટવર્ક્સ કેવી રીતે શીખે છે",
      description: "જટિલ ગણિત ભૂલી જાઓ. અહીં વજન, પૂર્વગ્રહ અને ગ્રેડિયન્ટ ડિસેન્ટનું સાહજિક વિઝ્યુઅલ વિશ્લેષણ છે.",
      transcript: "ન્યુરલ નેટવર્કને લાખો વોલ્યુમ સ્લાઇડર્સ (વેઇટ્સ) ધરાવતા વિશાળ સાઉન્ડબોર્ડ જેવું સમજો. શરૂઆતમાં બધા સ્લાઇડર્સ રેન્ડમ હોય છે. જ્યારે નેટવર્ક અનુમાન લગાવે છે, ત્યારે બેકપ્રોપેગેશન ભૂલની ગણતરી કરે છે અને ગ્રેડિયન્ટ ડિસેન્ટ દરેક સ્લાઇડરને ભૂલ ઘટાડવાની દિશામાં ખસેડે છે."
    },
    "reel-2": {
      title: "પ્રોક્રાસ્ટીનેશન (કામ ટાળવાની આદત) દૂર કરતો ૨-મિનિટનો નિયમ",
      description: "તમારું મગજ મોટા લક્ષ્યોને ધિક્કારે છે કારણ કે તે તેમને ઉર્જા માટે જોખમ ગણે છે. કોઈપણ કાર્યને ૧૨૦ સેકન્ડમાં સંકોચો અને પ્રતિકાર ગાયબ થતો જુઓ.",
      transcript: "જ્યારે પણ તમને રિપોર્ટ લખવાનો, રૂમ સાફ કરવાનો કે કસરત કરવાનો કંટાળો આવે, ત્યારે ૨-મિનિટનો નિયમ અપનાવો: આખા કામનું વચન ક્યારેય ન આપો. માત્ર ફાઇલ ખોલી એક વાક્ય લખવાનું અથવા સ્પોર્ટ્સ શૂઝ પહેરવાનું જ વચન આપો. એકવાર જડતા તૂટે એટલે ૮૫% લોકો વિના પ્રયાસે કામ ચાલુ રાખે છે."
    },
    "reel-3": {
      title: "દરરોજ ૫ લિટર પાણી પીવાનો વાયરલ ટ્રેન્ડ: હકીકત કે વહેમ?",
      description: "સોશિયલ મીડિયા દાવો કરે છે કે ગેલન પાણી પીવાથી મગજ તેજ બને છે. અહીં કિડની વિજ્ઞાનનું અસલ સત્ય જાણો.",
      transcript: "દરરોજ ૫ લિટર પાણી પીવાથી ચમત્કારી ઉર્જા નથી મળતી, તે લોહીમાં સોડિયમનું પ્રમાણ ઘટાડી હાયપોનેટ્રેમિયાનું જોખમ વધારે છે. તમારી કિડની પ્રતિ કલાક ૮૦૦ થી ૧,૦૦૦ મિલીલીટર જ ફિલ્ટર કરી શકે છે. કુદરતી તરસ મુજબ પાણી પીવો."
    },
    "reel-4": {
      title: "ક્વોન્ટમ કમ્પ્યુટિંગ: ક્યુબિટ્સ અને સુપરપોઝિશન ૬૦ સેકન્ડમાં",
      description: "સામાન્ય કમ્પ્યુટર 0 અથવા 1 નો ઉપયોગ કરે છે. ક્વોન્ટમ કમ્પ્યુટર ક્યુબિટ્સ વાપરે છે જે એક સાથે બંને હોઈ શકે છે.",
      transcript: "સામાન્ય બિટ્સ સિક્કા જેવા છે: કાં તો છાપ અથવા કાંટ. પરંતુ ક્વોન્ટમ ક્યુબિટ ફરતા સિક્કા જેવું છે, જે એક સાથે બંને સ્થિતિમાં (સુપરપોઝિશન) રહે છે. આનાથી ક્વોન્ટમ કમ્પ્યુટર અબજો શક્યતાઓની એક સાથે ગણતરી કરી શકે છે."
    },
    "reel-5": {
      title: "જિમ વગર શરીરના વજનથી જ તાકાત વધારવાની ૩ કસરતો",
      description: "કોઈ મશીન નહીં, કોઈ જિમ ફી નહીં. કેલિસ્થેનિક્સ વડે તાકાત અને સંતુલન મેળવો.",
      transcript: "તાકાત બનાવવા માટે મોંઘા જિમની જરૂર નથી. પુશ-અપ્સ, સ્ક્વોટ્સ અને પુલ-અપ્સમાં માસ્ટરી મેળવો. માત્ર તમારા શરીરના વજન અને પોશ્ચરનો ઉપયોગ કરીને સ્નાયુઓને મજબૂત બનાવો."
    },
    "reel-6": {
      title: "બોક્સ બ્રિધિંગ: ૯૦ સેકન્ડમાં તણાવ મુક્ત થવાની પદ્ધતિ",
      description: "નેવી સીલ્સ અને ડોક્ટરો દ્વારા વપરાતી પ્રાણાયામ ટેકનીક, જે નર્વસ સિસ્ટમને તરત શાંત કરે છે.",
      transcript: "મારી સાથે શ્વાસ લો. ૪ સેકન્ડ નાક દ્વારા ઊંડો શ્વાસ અંદર... ૪ સેકન્ડ રોકો... ૪ સેકન્ડ મોં દ્વારા ધીમેથી બહાર કાઢો... ૪ સેકન્ડ ખાલી રાખો. આ ક્રિયા તમારી વેગસ નર્વને સક્રિય કરે છે અને હૃદયના ધબકારા શાંત કરે છે."
    },
    "reel-7": {
      title: "ચક્રવૃદ્ધિ વ્યાજ: રોજના $10 કેવી રીતે $1,000,000 બને છે",
      description: "રૂલ ઓફ ૭૨ અને ઇન્ડેક્સ ફંડ કમ્પાઉન્ડિંગનું સાચું ગણિત સમજો.",
      transcript: "જો તમે દર મહિને $300 બચાવીને તિજોરીમાં રાખો તો ૩૦ વર્ષે $108,000 થશે. પરંતુ તેને ૧૦% વાર્ષિક વળતર આપતા ઇન્ડેક્સ ફંડમાં રોકો તો તે $108,000 પર $680,000 થી વધુ ચક્રવૃદ્ધિ નફો આપશે. સમય બજારમાં સૌથી મહત્વનો છે."
    },
    "reel-8": {
      title: "૫-મિનિટ પાવર બાઉલ: આખો દિવસ સતત ઉર્જા માટે",
      description: "બપોરે સુસ્તી આવે છે? ૩૫ ગ્રામ પ્રોટીન ધરાવતું ઝીરો-કૂકિંગ હેલ્ધી બાઉલ.",
      transcript: "ચણા, ચેરી ટમેટાં, કાકડી, ઓલિવ અને ટુના અથવા ચિકન મિક્સ કરો. ઉપરથી ઓલિવ ઓઇલ, લીંબુ અને લસણ નાખો. ૩૫ ગ્રામ પ્રોટીન અને શૂન્ય પ્રોસેસ્ડ કાર્બ્સ જે તમને આખો દિવસ ઉર્જાવાન રાખશે."
    }
  },

  hi: {
    "reel-1": {
      title: "60 सेकंड में समझें: न्यूरल नेटवर्क कैसे सीखते हैं",
      description: "जटिल कैलकुलस भूल जाइए। यहाँ वज़न, बायस और ग्रेडिएंट डिसेंट का सहज दृश्य विश्लेषण है।",
      transcript: "न्यूरल नेटवर्क को लाखों वॉल्यूम स्लाइडर्स (वेट्स) वाला एक बड़ा साउंडबोर्ड समझें। शुरुआत में सभी स्लाइडर्स बेतरतीब होते हैं। जब नेटवर्क अनुमान लगाता है, तो बैकप्रॉपैगैशन त्रुटि की गणना करता है और ग्रेडिएंट डिसेंट स्लाइडर्स को न्यूनतम त्रुटि की ओर ले जाता है।"
    },
    "reel-2": {
      title: "2-मिनट का नियम जो टालमटोल (Procrastination) को खत्म करता है",
      description: "आपका दिमाग बड़े लक्ष्यों को ऊर्जा के खतरे के रूप में देखता है। किसी भी काम को 120 सेकंड में समेटें और प्रतिरोध को गायब होते देखें।",
      transcript: "जब भी आपको रिपोर्ट लिखने, कमरा साफ करने या कसरत करने में आलस आए, तो 2-मिनट का नियम अपनाएं: पूरे काम का वादा न करें। केवल दस्तावेज़ खोलने और एक वाक्य लिखने का वादा करें। एक बार शुरुआत हो जाने पर 85% लोग आसानी से काम जारी रखते हैं।"
    },
    "reel-3": {
      title: "रोजाना 5 लीटर पानी पीने का वायरल ट्रेंड: सच या मिथक?",
      description: "सोशल मीडिया का दावा है कि ढेर सारा पानी पीने से सारे अंग डिटॉक्स होते हैं। जानिए किडनी फिजियोलॉजी का सच।",
      transcript: "दिन में 5 लीटर पानी पीने से कोई जादुई ऊर्जा नहीं मिलती, बल्कि यह रक्त में सोडियम को पतला कर देता है जिससे हाइपोनेट्रेमिया का खतरा होता है। आपकी किडनी प्रति घंटे केवल 800 से 1000 मिलीलीटर ही फ़िल्टर कर सकती है। केवल अपनी प्यास के अनुसार पिएं।"
    },
    "reel-4": {
      title: "क्वांटम कंप्यूटिंग 60s में: क्यूबिट्स और सुपरपोजिशन",
      description: "सामान्य कंप्यूटर 0 या 1 का उपयोग करते हैं। क्वांटम कंप्यूटर क्यूबिट्स का उपयोग करते हैं जो एक साथ दोनों हो सकते हैं।",
      transcript: "पारंपरिक बिट्स सिक्के की तरह हैं: या तो चित या पट। एक क्वांटम क्यूबिट घूमते हुए सिक्के जैसा है, जो दोनों अवस्थाओं (सुपरपोजिशन) में मौजूद रहता है। इससे क्वांटम मशीनें अरबों गणनाएं एक साथ कर सकती हैं।"
    },
    "reel-5": {
      title: "3 बॉडीवेट एक्सरसाइज जो जिम की जगह ले सकती हैं",
      description: "कोई मशीन नहीं, कोई जिम फीस नहीं। कैलिस्थेनिक्स से असली ताकत और संतुलन बनाएं।",
      transcript: "ताकतवर बनने के लिए जिम मेंबरशिप जरूरी नहीं है। पुश-अप्स, स्क्वैट्स और पुल-अप्स में महारत हासिल करें। केवल अपने शरीर के भार और गति का उपयोग करके मांसपेशियों को मजबूत बनाएं।"
    },
    "reel-6": {
      title: "बॉक्स ब्रीदिंग: 90 सेकंड में तनाव कम करने का तरीका",
      description: "नेवी सील्स और डॉक्टरों द्वारा इस्तेमाल की जाने वाली प्राणायाम तकनीक, जो नर्वस सिस्टम को तुरंत शांत करती है।",
      transcript: "मेरे साथ गहरी सांस लें। 4 सेकंड नाक से सांस अंदर... 4 सेकंड रोकें... 4 सेकंड मुंह से धीरे-धीरे बाहर निकालें... 4 सेकंड खाली रखें। यह क्रिया आपकी वेगस नर्व को सक्रिय करती है और दिल की धड़कन को शांत करती है।"
    },
    "reel-7": {
      title: "चक्रवृद्धि ब्याज: $10/दिन कैसे $1,000,000 बन जाते हैं",
      description: "रूल ऑफ 72 और इंडेक्स फंड कंपाउंडिंग का असली गणित समझें।",
      transcript: "यदि आप 30 साल तक प्रति माह $300 नकद बचाते हैं, तो आपके पास $108,000 होंगे। लेकिन अगर आप इसे 10% रिटर्न वाले इंडेक्स फंड में निवेश करते हैं, तो कंपाउंडिंग आपको ब्याज के रूप में $680,000 से अधिक देगी।"
    },
    "reel-8": {
      title: "5-मिनट पावर बाउल: पूरे दिन भरपूर ऊर्जा के लिए",
      description: "दोपहर की सुस्ती से परेशान हैं? 35 ग्राम प्रोटीन युक्त जीरो-कुकिंग हेल्दी बाउल।",
      transcript: "चने, चेरी टमाटर, खीरा, जैतून और टूना या चिकन मिलाएं। ऊपर से जैतून का तेल और नींबू डालें। 35 ग्राम प्रोटीन और शून्य प्रोसेस्ड कार्ब्स जो आपको पूरे दिन ऊर्जावान बनाए रखेंगे।"
    }
  },

  sa: {
    "reel-1": {
      title: "६० क्षणाभ्यन्तरे ज्ञायताम्: न्यूरल-नेटवर्क्स कथं शिक्षन्ते",
      description: "जटिलं कलनशास्त्रं विहाय, अत्र भाराणां (weights) प्रवणता-अवरोहस्य च दृश्य-विश्लेषणम् अस्ति।",
      transcript: "न्यूरल-नेटवर्क इति एका बृहती ध्वनि-नियन्त्रिका इव चिन्तयतु यस्यां लक्षाधिकाः स्लाइडर्स (भाराः) सन्ति। यदा संजालम् अनुमानं करोति, तदा पश्चात्-प्रसारणं (backpropagation) त्रुटिं गणयति।"
    },
    "reel-2": {
      title: "द्वि-निमेषस्य नियमः यः प्रमादम् आलस्यं च नाशयति",
      description: "भवतः मस्तिष्कः बृहत्-कार्याणि श्रमरूपेण पश्यति। कस्यापि कार्यस्य आरम्भं १२० क्षणाभ्यन्तरे कुरुत।",
      transcript: "यदा यदा कार्ये आलस्यम् आगच्छति, तदा द्वि-निमेष-नियमम् अनुसरतु: केवलं कार्यस्य आरम्भं कुरुत। ८५% जनाः आरम्भानन्तरं कार्यं सहजतया निरन्तरं कुर्वन्ति।"
    },
    "reel-3": {
      title: "प्रतिदिनं ५ लीटर जलपानम्: सत्यं वा भ्रमः?",
      description: "सामाजिक-माध्यमेषु बहुजलपानस्य दावः क्रियते। वृक्कस्य (kidney) वास्तविकं विज्ञानं पश्यन्तु।",
      transcript: "एकस्मिन् दिने ५ लीटर जलपानेन कापि चमत्कारी शक्तिः न लभ्यते। भवतः वृक्कः प्रतिहोरां केवलम् ८०० तः १००० मिलीलीटर जलं शोधयितुं शक्नोति। तृषानुसारं पिबतु।"
    },
    "reel-4": {
      title: "क्वान्टम-कम्प्यूटिंग् ६० क्षणेषु: क्युबिट्स् & सुपरपोजिशन्",
      description: "साधारणाः संगणकाः ० वा १ उपयुञ्जते। क्वान्टम-संगणकाः क्युबिट्स् उपयुञ्जते ये युगपत् उभयं भवितुं शक्नुवन्ति।",
      transcript: "पारम्परिकाः बिट्स नाणकवत् सन्ति: चित् वा पट्। क्वान्टम-क्युबिट् भ्रममाणं नाणकम् इव अस्ति, येन अरबुदानां गणनानां युगपत् सम्पादनं शक्यते।"
    },
    "reel-5": {
      title: "३ शरीरभार-व्यायामाः ये व्यायामशालायाः स्थानं स्वीकुर्वन्ति",
      description: "विना यन्त्रं, विना शुल्कम्। कैलिस्थेनिक्स-द्वारा दृढां शक्तिं प्राप्नुत।",
      transcript: "बलवान् भवितुं व्यायामशाला अनिवार्या नास्ति। स्वशरीरस्य भारम् उपयुज्य मांसपेशीनां दृढीकरणं कुरुत।"
    },
    "reel-6": {
      title: "बाक्स-प्राणायामः: ९० क्षणेषु तणाव-मुक्तिः",
      description: "नेवी-सील्स तथा वैद्यैः प्रयुक्तः श्वास-विधिः, यः मनः शीघ्रं शान्तं करोति।",
      transcript: "मया सह श्वासं गृह्णातु। ४ क्षणान् अन्तः... ४ क्षणान् धारयतु... ४ क्षणान् बहिः... ४ क्षणान् रिक्तं तिष्ठतु। एषा क्रिया मनः शान्तं करोति।"
    },
    "reel-7": {
      title: "चक्रवृद्धि-ब्याजम्: $१०/दिनं कथं $१,०००,००० भवति",
      description: "कम्पाउण्डिंग्-तन्त्रस्य शक्तिं तथा ७२-नियमं पश्यन्तु।",
      transcript: "यदि भवान् प्रतिमासं धनं निवेशयति, तर्हि कम्पाउण्डिंग्-बलेन ३० वर्षेषु विशालं धनं निर्मितं भवति।"
    },
    "reel-8": {
      title: "५-निमेषस्य शक्ति-पात्रम् (Power Bowl): सम्पूर्ण-दिनस्य ऊर्जा",
      description: "मध्याह्नस्य श्रान्तता निवारयतु। ३५ ग्राम प्रोटीन-युक्तं पौष्टिकं भोजनम्।",
      transcript: "चना, शाकम्, जैतून-तैलं च योजयित्वा पौष्टिकं भोजनं सज्जं कुरुत। एतेन दिवसं व्याप्य ऊर्जा लभ्यते।"
    }
  },

  mr: {
    "reel-1": {
      title: "६० सेकंदात समजून घ्या: न्यूरल नेटवर्क्स कसे शिकतात",
      description: "जटिल कॅल्क्युलस विसरा. येथे वजन, बायस आणि ग्रेडियंट डिसेंटचे सोपे दृश्य विश्लेषण आहे.",
      transcript: "न्यूरल नेटवर्कला लक्षावधी व्हॉल्यूम स्लाइडर्स असलेला एक मोठा साउंडबोर्ड समजा. जेव्हा नेटवर्क अंदाज लावते, तेव्हा बॅकप्रोपॅगेशन त्रुटी मोजते आणि ग्रेडियंट डिसेंट स्लाइडर्स योग्य दिशेने हलवते."
    },
    "reel-2": {
      title: "२ मिनिटांचा नियम जो आळस आणि चालढकल नष्ट करतो",
      description: "आपला मेंदू मोठ्या कामांना ऊर्जेचा धोका मानतो. कोणतेही काम १२० सेकंदात सुरू करा.",
      transcript: "जेव्हाही कामाचा कंटाळा येईल तेव्हा २-मिनिटांचा नियम वापरा: फक्त काम सुरू करण्याचे वचन द्या. एकदा सुरुवात झाली की ८५% लोक काम सहज पूर्ण करतात."
    },
    "reel-3": {
      title: "दररोज ५ लिटर पाणी पिण्याचा ट्रेंड: सत्य की गैरसमज?",
      description: "जास्त पाणी प्यायल्याने सर्व आजार बरे होतात असा दावा केला जातो. किडणीचे खरे विज्ञान जाणून घ्या.",
      transcript: "दिवसातून ५ लिटर पाणी प्यायल्याने कोणतीही जादू होत नाही. तुमची किडनी तासाला केवळ ८०० ते १००० मिली फिल्टर करू शकते. केवळ तहान लागेल तेवढेच पाणी प्या."
    },
    "reel-4": {
      title: "क्वांटम कॉम्प्युटिंग ६० सेकंदात: क्यूबिट्स आणि सुपरपोझिशन",
      description: "सामान्य कॉम्प्युटर ० किंवा १ वापरतात. क्वांटम कॉम्प्युटर क्यूबिट्स वापरतात जे एकाच वेळी दोन्ही असू शकतात.",
      transcript: "पारंपारिक बिट्स नाण्यासारखे असतात: छाप किंवा काटा. क्वांटम क्यूबिट फिरणाऱ्या नाण्यासारखे असते, जे अब्जावधी आकडेमोड एकाच वेळी करू शकते."
    },
    "reel-5": {
      title: "३ व्यायाम जे जिमची जागा घेऊ शकतात",
      description: "मशीन नाही, जिम फी नाही. कॅलिस्थेनिक्सने खरी ताकद आणि लवचिकता मिळवा.",
      transcript: "सशक्त होण्यासाठी जिममध्ये जाण्याची गरज नाही. पुश-अप्स, स्क्वॅट्स आणि स्वतःच्या शरीराचे वजन वापरून स्नायू मजबूत करा."
    },
    "reel-6": {
      title: "बॉक्स ब्रीदिंग: ९० सेकंदात तणाव कमी करण्याची सोपी पद्धत",
      description: "नेव्ही सील आणि डॉक्टरांद्वारे वापरले जाणारे प्राणायाम तंत्र, जे मज्जासंस्था त्वरित शांत करते.",
      transcript: "माझ्यासोबत दीर्घ श्वास घ्या. ४ सेकंद श्वास आत... ४ सेकंद रोखा... ४ सेकंद हळूहळू सोडा... ४ सेकंद थांबवा. हे तंत्र हृदयाचे ठोके शांत करते."
    },
    "reel-7": {
      title: "चक्रवाढ व्याज: दररोजचे १० रुपये कसे १ कोटी बनू शकतात",
      description: "रूल ऑफ ७२ आणि इंडेक्स फंड चक्रवाढीचे खरे गणित समजून घ्या.",
      transcript: "जर तुम्ही दरमहा छोटी बचत करून चांगल्या फंडात गुंतवली, तर चक्रवाढ व्याजाच्या जोरावर पुढील काळात खूप मोठी संपत्ती तयार होते."
    },
    "reel-8": {
      title: "५ मिनिटांत बनवा पॉवर बाऊल: दिवसभर मिळवा भरपूर ऊर्जा",
      description: "दुपारच्या सुस्तीने त्रस्त आहात? ३५ ग्रॅम प्रोटीनयुक्त झिरो-कुकिंग हेल्दी बाऊल.",
      transcript: "हरभरे, काकडी, टोमॅटो आणि ऑलिव्ह ऑईल एकत्र करा. ३५ ग्रॅम प्रोटीन तुम्हाला दिवसभर उत्साही आणि ताजेतवाने ठेवेल."
    }
  },

  te: {
    "reel-1": {
      title: "60 సెకన్లలో అర్థం చేసుకోండి: న్యూరల్ నెట్‌వర్క్‌లు ఎలా నేర్చుకుంటాయి",
      description: "సంక్లిష్టమైన లెక్కలను పక్కన పెట్టండి. వెయిట్స్, బయాస్ మరియు గ్రేడియంట్ డిసెంట్ యొక్క స్పష్టమైన వివరణ.",
      transcript: "న్యూరల్ నెట్‌వర్క్‌ను మిలియన్ల కొద్దీ వాల్యూమ్ స్లైడర్‌లు ఉన్న పెద్ద సౌండ్‌బోర్డ్‌గా భావించండి. నెట్‌వర్క్ అంచనా వేసినప్పుడు, బ్యాక్‌ప్రాపగేషన్ లోపాన్ని లెక్కిస్తుంది మరియు గ్రేడియంట్ డిసెంట్ సరైన దిశలో సర్దుబాటు చేస్తుంది."
    },
    "reel-2": {
      title: "వాయిదా వేసే అలవాటును పోగొట్టే 2-నిమిషాల సూత్రం",
      description: "మీ మెదడు పెద్ద పనులను భారంగా భావిస్తుంది. ఏదైనా పనిని 120 సెకన్లలో ప్రారంభించండి.",
      transcript: "పని చేయడంలో బద్ధకం అనిపించినప్పుడు 2-నిమిషాల రూల్ వాడండి: మొత్తం పనిని కాదు, కేవలం ప్రారంభించడానికి మాత్రమే సిద్ధపడండి. 85% మంది ప్రారంభించిన తర్వాత సులభంగా పూర్తి చేస్తారు."
    },
    "reel-3": {
      title: "రోజుకు 5 లీటర్ల నీరు తాగే ట్రెండ్: నిజమా లేక అపోహా?",
      description: "ఎక్కువ నీరు తాగితే శరీరానికి మంచిదని సోషల్ మీడియా ప్రచారం చేస్తోంది. మూత్రపిండాల అసలు సైన్స్ తెలుసుకోండి.",
      transcript: "రోజుకు 5 లీటర్ల నీరు తాగడం వల్ల ఎలాంటి అదనపు ప్రయోజనం ఉండదు. మీ కిడ్నీలు గంటకు 800 నుండి 1000 మి.లీ మాత్రమే ఫిల్టర్ చేయగలవు. దాహాన్ని బట్టి మాత్రమే నీరు త్రాగండి."
    },
    "reel-4": {
      title: "60 సెకన్లలో క్వాంటమ్ కంప్యూటింగ్: క్యూబిట్స్ మరియు సూపర్‌పొజిషన్",
      description: "సాధారణ కంప్యూటర్లు 0 లేదా 1 ఉపయోగిస్తాయి. క్వాంటమ్ కంప్యూటర్లు రెండింటినీ ఏకకాలంలో నిర్వహించే క్యూబిట్‌లను ఉపయోగిస్తాయి.",
      transcript: "సాంప్రదాయ బిట్స్ నాణెం లాంటివి: బొమ్మ లేదా బొరుసు. క్వాంటమ్ క్యూబిట్ తిరుగుతున్న నాణెం లాంటిది, ఇది బిలియన్ల కొద్దీ గణనలను క్షణాల్లో పూర్తి చేయగలదు."
    },
    "reel-5": {
      title: "జిమ్‌తో పనిలేకుండా చేయగలిగే 3 బాడీవెయిట్ వ్యాయామాలు",
      description: "మిషన్లు అవసరం లేదు, ఫీజులు చెల్లించాల్సిన పనిలేదు. కాలిస్టెనిక్స్‌తో నిజమైన బలం మరియు ఫిట్‌నెస్ సాధించండి.",
      transcript: "బలంగా మారడానికి జిమ్ సభ్యత్వం అవసరం లేదు. పుష్-అప్స్, స్క్వాట్స్ మరియు పుల్-అప్స్ ద్వారా మీ స్వంత శరీర బరువుతో కండరాలను బలోపేతం చేయండి."
    },
    "reel-6": {
      title: "బాక్స్ బ్రీతింగ్: 90 సెకన్లలో ఒత్తిడిని తగ్గించే అద్భుతమైన మార్గం",
      description: "నావీ సీల్స్ మరియు వైద్యులు ఉపయోగించే ప్రాణాయామ పద్ధతి, ఇది నాడీ వ్యవస్థను వెంటనే ప్రశాంతపరుస్తుంది.",
      transcript: "నాతో పాటు దీర్ఘ శ్వాస తీసుకోండి. 4 సెకన్లు శ్వాస లోపలికి... 4 సెకన్లు ఆపండి... 4 సెకన్లు నెమ్మదిగా బయటకు వదలండి... 4 సెకన్లు ఖాళీగా ఉండండి. ఇది గుండె స్పందనను స్థిరీకరిస్తుంది."
    },
    "reel-7": {
      title: "చక్రవడ్డీ అద్భుతం: రోజుకు 10 రూపాయలు ఎలా కోటి రూపాయలు అవుతాయి",
      description: "రూల్ ఆఫ్ 72 మరియు ఇండెక్స్ ఫండ్ కాంపౌండింగ్ లెక్కలను వివరంగా తెలుసుకోండి.",
      transcript: "మీరు ప్రతి నెలా క్రమం తప్పకుండా పెట్టుబడి పెడితే, కాంపౌండింగ్ ద్వారా కాలక్రమేణా భారీ సంపదను సృష్టించవచ్చు."
    },
    "reel-8": {
      title: "5 నిమిషాల్లో పవర్ బౌల్: రోజంతా శక్తివంతంగా ఉండటానికి ఆహారం",
      description: "మధ్యాహ్నపు బద్ధకంతో విసిగిపోయారా? 35 గ్రాముల ప్రోటీన్ ఉండే హెల్తీ ఫుడ్ బౌల్.",
      transcript: "శనగలు, దోసకాయ, టొమాటో మరియు ఆలివ్ నూనె కలపండి. 35 గ్రాముల ప్రోటీన్ మీకు రోజంతా నిరంతర శక్తిని అందిస్తుంది."
    }
  },
  es: {
    "reel-1": {
      title: "Cómo aprenden las redes neuronales en 60s",
      description: "Olvídate del cálculo complejo. Aquí está la explicación intuitiva de pesos, sesgos y descenso de gradiente.",
      transcript: "Piensa en una red neuronal como una consola de sonido gigante con millones de controles llamados pesos. Cada vez que la red adivina, la retropropagación calcula el error y el descenso de gradiente ajusta cada control hacia el menor error posible."
    },
    "reel-2": {
      title: "La regla de los 2 minutos que destruye la procrastinación",
      description: "Tu cerebro percibe las grandes metas como amenazas de energía. Reduce cualquier tarea a 120 segundos y la resistencia desaparecerá.",
      transcript: "Cuando sientas pereza de escribir o entrenar, aplica la regla de los 2 minutos: no te comprometas con toda la tarea, solo con abrir el archivo o ponerte las zapatillas. Una vez rota la inercia, el 85% de las personas continúa trabajando sin esfuerzo."
    },
    "reel-3": {
      title: "Desmintiendo el mito viral de '5 litros de agua al día'",
      description: "Beber galones de agua no cura mágicamente tu cuerpo. Descubre la verdadera fisiología renal.",
      transcript: "Beber 5 litros de agua al día diluye el sodio en tu sangre y arriesga hiponatremia. Tus riñones solo pueden procesar entre 800 y 1000 ml por hora. Bebe según tu sed natural."
    },
    "reel-4": {
      title: "Computación cuántica en 60s: Cúbits y superposición",
      description: "Las computadoras clásicas usan 0 o 1. Las cuánticas usan cúbits que pueden ser ambos a la vez.",
      transcript: "Un cúbit cuántico es como una moneda girando: está en un estado probabilístico de cara y cruz simultáneamente hasta que se mide. Esto permite evaluar miles de millones de posibilidades a la vez."
    },
    "reel-5": {
      title: "3 ejercicios con peso corporal que reemplazan al gimnasio",
      description: "Sin máquinas ni cuotas. Construye fuerza funcional con calistenia y control postural.",
      transcript: "Domina las flexiones, sentadillas profundas y dominadas. Manipula el ritmo y la palanca para aumentar la resistencia sin tocar una sola mancuerna."
    },
    "reel-6": {
      title: "Respiración cuadrada: Resetea el cortisol en 90 segundos",
      description: "Técnica usada por los Navy SEALs para calmar el sistema nervioso en menos de 2 minutos.",
      transcript: "Inhala profundamente por la nariz durante 4 segundos... sostén 4 segundos... exhala lentamente por la boca durante 4 segundos... mantén vacío 4 segundos. Tu frecuencia cardíaca se calmará de inmediato."
    },
    "reel-7": {
      title: "Interés compuesto: Cómo $10 al día se convierten en $1,000,000",
      description: "El poder del crecimiento exponencial y los fondos indexados explicado en 45 segundos.",
      transcript: "Ahorrar $300 al mes bajo el colchón te dará $108,000 en 30 años. Pero invirtiéndolo al 10% anual en un fondo indexado, el interés compuesto generará más de $680,000 en rendimientos."
    },
    "reel-8": {
      title: "Bowl mediterráneo de 5 minutos para energía sostenida",
      description: "¿Cansancio a media tarde? 35g de proteína sin cocinar y sin carbohidratos procesados.",
      transcript: "Mezcla garbanzos, tomates cherry, pepino, aceitunas y atún o pollo. Añade aceite de oliva virgen extra y limón. 35g de proteína pura para evitar el bajón de energía de las 2 de la tarde."
    }
  },

  fr: {
    "reel-1": {
      title: "Comment les réseaux de neurones apprennent en 60s",
      description: "Comprenez intuitivement les poids, les biais et la descente de gradient sans calcul complexe.",
      transcript: "Imaginez un réseau de neurones comme une table de mixage avec des millions de curseurs appelés poids. La rétropropagation calcule l'erreur et la descente de gradient ajuste chaque curseur vers l'erreur minimale."
    },
    "reel-2": {
      title: "La règle des 2 minutes pour vaincre la procrastination",
      description: "Votre cerveau craint les tâches lourdes. Réduisez toute action à 120 secondes pour briser la résistance.",
      transcript: "Quand vous hésitez à travailler, appliquez la règle des 2 minutes : engagez-vous seulement à ouvrir le document ou lacer vos baskets. Dès que l'inertie est brisée, 85 % des gens continuent sans effort."
    },
    "reel-3": {
      title: "Boire 5 litres d'eau par jour : Vérité ou danger ?",
      description: "La vérité physiologique sur l'hydratation et le fonctionnement des reins.",
      transcript: "Boire 5 litres d'eau dilue le sodium sanguin et risque une hyponatrémie. Vos reins ne filtrent que 800 à 1000 ml par heure. Écoutez simplement votre soif naturelle."
    },
    "reel-4": {
      title: "L'informatique quantique en 60s : Qubits et superposition",
      description: "Les qubits peuvent être à la fois 0 et 1, décuplant la puissance de calcul.",
      transcript: "Un qubit en superposition est comme une pièce en rotation : il explore simultanément pile et face, permettant de résoudre en minutes des calculs qui prendraient des millénaires."
    },
    "reel-5": {
      title: "3 exercices au poids du corps pour remplacer la salle",
      description: "Développez une force athlétique grâce à la callisthénie et à l'effet de levier.",
      transcript: "Maîtrisez les pompes, les tractions et les squats profonds. Variez le tempo pour intensifier l'effort sans aucun matériel de musculation."
    },
    "reel-6": {
      title: "Respiration carrée : Réinitialisez le cortisol en 90s",
      description: "La méthode des forces spéciales pour calmer immédiatement le système nerveux.",
      transcript: "Inspirez 4 secondes par le nez... bloquez 4 secondes... expirez 4 secondes par la bouche... maintenez poumons vides 4 secondes. Votre rythme cardiaque ralentit naturellement."
    },
    "reel-7": {
      title: "Intérêts composés : Comment 10 $/jour font 1 000 000 $",
      description: "La formule mathématique du patrimoine exponentiel et des fonds indiciels.",
      transcript: "Épargner 300 $ par mois sans investissement donne 108 000 $ en 30 ans. Placés à 10 % par an sur un indice mondial, les intérêts composés génèrent plus de 680 000 $ de gains."
    },
    "reel-8": {
      title: "Bol méditerranéen en 5 minutes pour une énergie stable",
      description: "35g de protéines sans cuisson pour éviter le coup de fatigue de l'après-midi.",
      transcript: "Pois chiches, tomates, concombre, olives et thon ou poulet avec un filet d'huile d'olive et de citron. 35g de protéines saines sans baisse de glycémie."
    }
  },

  ja: {
    "reel-1": {
      title: "ニューラルネットワークが学ぶ仕組みを60秒で解説",
      description: "難しい数式は不要。重み、バイアス、勾配降下法の直感的な仕組みを視覚化。",
      transcript: "ニューラルネットワークは無数の音量スライダー（重み）を持つ巨大なミキサーのようなものです。誤差逆伝播法が正解との差を計算し、勾配降下法がスライダーを最適な位置へ微調整します。"
    },
    "reel-2": {
      title: "先延ばし癖を完全に撃退する「2分間ルール」",
      description: "脳は大きな目標をエネルギー消費の脅威と認識します。タスクを120秒に縮小して抵抗感をゼロに。",
      transcript: "レポート作成や運動が億劫な時は「2分間ルール」を使いましょう。作業全体ではなく、ファイルを開いて1行書くだけ、あるいは靴を履くだけにします。最初の慣性を破れば、85%の人がそのまま集中を持続できます。"
    },
    "reel-3": {
      title: "「毎日水5リットル」の健康神話を科学的に検証",
      description: "過剰な水分補給のリスクと、腎臓生理学に基づく正しい水分摂取量。",
      transcript: "水を1日5リットル飲むと低ナトリウム血症を引き起こす危険があります。腎臓が1時間に処理できる水分量は約800〜1,000mlです。喉の渇きに応じて適量を飲みましょう。"
    },
    "reel-4": {
      title: "量子コンピューティング入門：重ね合わせと量子ビット",
      description: "通常のビットは0か1。量子ビットは両方の状態を同時に保持できます。",
      transcript: "コインを回転させると表と裏が重なり合うように、量子ビットは観測されるまで複数の状態を同時に持ちます。これにより膨大な計算を並列処理できます。"
    },
    "reel-5": {
      title: "ジム通い不要！自重だけで全身を鍛える3大種目",
      description: "器具なしで本格的な筋力とバランスを身につける自重トレーニング。",
      transcript: "腕立て伏せ、懸垂、ディープスクワットをマスターしましょう。動作の速度や角度を変えるだけで、ダンベルなしで十分な負荷を生み出せます。"
    },
    "reel-6": {
      title: "ボックスブリージング：90秒でストレスをリセット",
      description: "特殊部隊や医師が実践する自律神経調整の呼吸法。",
      transcript: "4秒かけて鼻から息を吸い...4秒止め...4秒かけて口からゆっくり吐き...4秒止めます。呼気を長くすることで副交感神経が刺激され、心拍数が落ち着きます。"
    },
    "reel-7": {
      title: "複利の力：1日10ドルが1億円に化ける仕組み",
      description: "72の法則とインデックス投資による資産形成のリアルな計算。",
      transcript: "毎月300ドルを現金で貯めると30年で108,000ドルですが、年利10%のインデックスファンドに投資すると、複利効果で680,000ドル以上の利益が生まれます。"
    },
    "reel-8": {
      title: "午後2時の眠気を防ぐ！5分で作れる地中海パワーボウル",
      description: "調理不要で35gのタンパク質が摂れる血糖値安定ランチ。",
      transcript: "ひよこ豆、トマト、きゅうり、オリーブにツナまたは蒸し鶏を加え、オリーブオイルとレモンをかけるだけ。糖質スパイクを防ぎ、午後も集中力をキープできます。"
    }
  },

  de: {
    "reel-1": {
      title: "Wie neuronale Netze in 60 Sekunden lernen",
      description: "Vergiss komplexe Formeln. Hier ist die intuitive Erklärung von Gewichten und Gradientenabstieg.",
      transcript: "Stell dir ein neuronales Netz wie ein riesiges Mischpult mit Millionen von Reglern vor. Backpropagation berechnet den Fehler zur Realität und der Gradientenabstieg verschiebt jeden Regler in Richtung des geringsten Fehlers."
    },
    "reel-2": {
      title: "Die 2-Minuten-Regel gegen Prokrastination",
      description: "Dein Gehirn sieht große Aufgaben als Energiebedrohung. Verkleinere jede Aufgabe auf 120 Sekunden.",
      transcript: "Wenn du dich vor einer Aufgabe drückst, wende die 2-Minuten-Regel an: Verpflichte dich nur dazu, das Dokument zu öffnen oder die Laufschuhe anzuziehen. Ist die Trägheit gebrochen, arbeiten 85 % der Menschen mühelos weiter."
    },
    "reel-3": {
      title: "Mythos entlarvt: Täglich 5 Liter Wasser trinken?",
      description: "Die physiologische Wahrheit über Nierenfunktion und optimale Flüssigkeitszufuhr.",
      transcript: "5 Liter Wasser am Tag bringen keine Wunderenergie, sondern verdünnen das Natrium im Blut (Hyponatriämie-Gefahr). Deine Nieren filtern etwa 800 bis 1.000 ml pro Stunde. Trink nach deinem natürlichen Durst."
    },
    "reel-4": {
      title: "Quantencomputer in 60s: Qubits & Superposition",
      description: "Klassische Bits sind 0 oder 1. Qubits können beides gleichzeitig sein.",
      transcript: "Ein Quanten-Qubit ist wie eine rotierende Münze, die sich in einer Überlagerung aus Kopf und Zahl befindet. Dadurch können Quantencomputer Milliarden Möglichkeiten parallel berechnen."
    },
    "reel-5": {
      title: "3 Eigengewichtsübungen, die jedes Fitnessstudio ersetzen",
      description: "Keine Geräte, keine Beiträge. Echte Kraft durch Calisthenics und Hebelwirkung.",
      transcript: "Perfektioniere Liegestütze, Kniebeugen und Klimmzüge. Passe Tempo und Hebel an, um den Widerstand ganz ohne Gewichte zu steigern."
    },
    "reel-6": {
      title: "Box-Atmung: In 90 Sekunden Stresshormone senken",
      description: "Von Navy SEALs erprobt: Sofortige Beruhigung des vegetativen Nervensystems.",
      transcript: "Atme mit mir: 4 Sekunden durch die Nase ein... 4 Sekunden halten... 4 Sekunden durch den Mund aus... 4 Sekunden halten. Die verlängerte Ausatmung signalisiert deinem Herz, langsamer zu schlagen."
    },
    "reel-7": {
      title: "Zinseszins-Effekt: Wie aus 10 $/Tag 1.000.000 $ werden",
      description: "Die 72er-Regel und ETF-Zinseszins einfach in 45 Sekunden erklärt.",
      transcript: "300 $ monatlich bar gespart ergeben in 30 Jahren 108.000 $. Investiert in einen breit gestreuten Indexfonds mit ca. 10 % Rendite bringt der Zinseszins über 680.000 $ zusätzliche Gewinne."
    },
    "reel-8": {
      title: "5-Minuten-Power-Bowl für anhaltende Energie",
      description: "Schluss mit dem Nachmittagstief: 35g Protein ohne Kochen für einen stabilen Blutzucker.",
      transcript: "Kichererbsen, Cherrytomaten, Gurken, Oliven und Thunfisch oder Hähnchen mit nativem Olivenöl und Zitrone mischen. 35g Protein und null verarbeitete Kohlenhydrate halten dich wach."
    }
  }
};

/**
 * Deep fallback translation getter: guarantees every single key exists and is non-empty.
 */
export function getTranslations(lang: LanguageCode): Translations {
  const base = translations.en as Translations;
  const current = (translations[lang] || base) as DeepPartial<Translations>;

  return {
    ...base,
    ...current,
    intents: { ...base.intents, ...(current.intents || {}) },
    actions: { ...base.actions, ...(current.actions || {}) },
    companion: { ...base.companion, ...(current.companion || {}) },
    nav: { ...base.nav, ...(current.nav || {}) },
    reel: { ...base.reel, ...(current.reel || {}) },
    categories: { ...base.categories, ...(current.categories || {}) },
    modals: { ...base.modals, ...(current.modals || {}) },
    nutrition: { ...base.nutrition, ...(current.nutrition || {}) },
    landing: { ...base.landing, ...(current.landing || {}) },
    profile: { ...base.profile, ...(current.profile || {}) }
  } as Translations;
}

/**
 * Returns the localized category name (e.g. "Tech & AI" -> "ટેકનોલોજી અને AI" in Gujarati)
 */
export function getLocalizedCategory(cat: string, lang: LanguageCode): string {
  if (!cat) return '';
  const t = getTranslations(lang);
  const normalized = cat.toLowerCase().replace(/[^a-z0-9]/g, '');

  if (normalized === 'all') return t.categories.all;
  if (normalized.includes('tech') || normalized.includes('ai')) return t.categories.techAI;
  if (normalized.includes('productiv')) return t.categories.productivity;
  if (normalized.includes('health') || normalized.includes('fit')) return t.categories.healthFitness;
  if (normalized.includes('science') || normalized.includes('space')) return t.categories.scienceSpace;
  if (normalized.includes('finan') || normalized.includes('money')) return t.categories.finance;
  if (normalized.includes('mindful') || normalized.includes('detox')) return t.categories.mindfulnessDetox;

  return cat;
}

/**
 * Returns the localized version of a reel (Title, Description, and Live Subtitle Transcript).
 */
export function getLocalizedReel(reel: Reel, lang: LanguageCode): Reel {
  const trans = reelTranslations[lang]?.[reel.id] || reelTranslations.en?.[reel.id];
  if (!trans) return reel;

  return {
    ...reel,
    title: trans.title || reel.title,
    description: trans.description || reel.description,
    transcript: trans.transcript || reel.transcript
  };
}

