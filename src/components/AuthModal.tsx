import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Mail, 
  User, 
  Clock, 
  LogOut,
  UserCheck,
  Calendar,
  Briefcase,
  Lock,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStep?: 'login' | 'mood' | 'onboarding';
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  initialStep = 'login' 
}) => {
  const { 
    userProfile, 
    isLoggedIn, 
    loginUser, 
    logoutUser, 
    saveUserMood,
    awardXP, 
    setCurrentPage,
    colorMode,
    language
  } = useApp();

  const isLight = colorMode === 'light';
  const [step, setStep] = useState<'login' | 'mood' | 'onboarding'>(initialStep);
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');
  const [name, setName] = useState(userProfile?.name || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [category, setCategory] = useState<string>('');
  const [moodChoice, setMoodChoice] = useState<string>(() => {
    return localStorage.getItem('pulseai_user_mood') || userProfile?.current_mood || 'Happy';
  });
  const [isSubmittingMood, setIsSubmittingMood] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Artificial Intelligence & Coding',
    'Productivity & Habits'
  ]);
  const [selectedBudget, setSelectedBudget] = useState(30);

  // Synchronize step whenever modal opens or initialStep changes
  useEffect(() => {
    if (isOpen) {
      setStep(initialStep);
      setAuthError(null);
      if (initialStep === 'login') {
        setAuthMode('login');
      }
      const savedMood = localStorage.getItem('pulseai_user_mood') || userProfile?.current_mood;
      if (savedMood) {
        setMoodChoice(savedMood);
      }
    }
  }, [isOpen, initialStep]);

  if (!isOpen) return null;

  const MOOD_OPTIONS = [
    { mood: 'Happy', emoji: '😊', label: 'Happy' },
    { mood: 'Relaxed', emoji: '😌', label: 'Relaxed' },
    { mood: 'Excited', emoji: '🤩', label: 'Excited' },
    { mood: 'Chill', emoji: '😎', label: 'Chill' },
    { mood: 'Sad', emoji: '😢', label: 'Sad' },
    { mood: 'Tired', emoji: '😴', label: 'Tired' },
    { mood: 'Neutral', emoji: '😐', label: 'Neutral' },
    { mood: 'Frustrated', emoji: '😡', label: 'Frustrated' },
    { mood: 'Curious', emoji: '🤔', label: 'Curious' },
    { mood: 'Romantic', emoji: '❤️', label: 'Romantic' },
  ];

  const interestsList = [
    { id: 'ai', label: 'Artificial Intelligence & Coding', icon: '🤖' },
    { id: 'focus', label: 'Productivity & Habits', icon: '🎯' },
    { id: 'fitness', label: 'Calisthenics & Fitness', icon: '🏋️' },
    { id: 'finance', label: 'Finance & Compounding', icon: '📈' },
    { id: 'science', label: 'Quantum Physics & Space', icon: '🚀' },
    { id: 'cooking', label: 'Healthy Cooking & Nutrition', icon: '🥗' },
    { id: 'mindfulness', label: 'Breathwork & Mindfulness', icon: '🌿' },
    { id: 'design', label: 'UI/UX & Creative Direction', icon: '🎨' },
  ];

  const toggleInterest = (label: string) => {
    setSelectedInterests(prev => 
      prev.includes(label) 
        ? prev.filter(i => i !== label)
        : [...prev, label]
    );
  };

  const handleQuickLogin = (asGuest = true) => {
    const chosenName = asGuest ? 'Alex Rivera' : (name.trim() || 'Alex Rivera');
    const chosenEmail = asGuest ? 'alex@zynqosocial.internal' : (email.trim() || 'alex@zynqosocial.internal');
    const chosenDob = dateOfBirth.trim() || '1995-06-15';
    const chosenCategory = category.trim() || 'Manager';
    loginUser(chosenName, chosenEmail, selectedInterests, selectedBudget, chosenDob, chosenCategory);
    awardXP(50, 'Account Authentication');
    setMoodChoice(userProfile?.current_mood || localStorage.getItem('pulseai_user_mood') || 'Happy');
    setStep('onboarding');
  };

  const handleSignup = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAuthError(null);

    // Form validations
    if (!name.trim()) {
      setAuthError('Name cannot be empty.');
      return;
    }
    if (!email.trim()) {
      setAuthError('Email cannot be empty.');
      return;
    }
    if (!password.trim()) {
      setAuthError('Password cannot be empty.');
      return;
    }
    if (!dateOfBirth.trim()) {
      setAuthError('Date of Birth cannot be empty.');
      return;
    }
    if (!category.trim()) {
      setAuthError('Category cannot be empty.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
          date_of_birth: dateOfBirth.trim(),
          category: category.trim(),
          language
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setAuthError(data.error || 'Failed to sign up.');
        setIsSubmitting(false);
        return;
      }

      // Successful signup
      loginUser(
        data.user.name,
        data.user.email,
        selectedInterests,
        selectedBudget,
        data.user.date_of_birth,
        data.user.category,
        data.user.current_mood || 'Happy'
      );
      awardXP(100, 'Account Registered with Date of Birth & Category');
      setIsSubmitting(false);
      setMoodChoice(data.user.current_mood || 'Happy');
      setStep('onboarding');
    } catch (err: any) {
      console.error('Signup error:', err);
      setAuthError(err.message || 'Connection error during signup.');
      setIsSubmitting(false);
    }
  };

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAuthError(null);

    if (!email.trim()) {
      setAuthError('Email cannot be empty.');
      return;
    }
    if (!password.trim()) {
      setAuthError('Password cannot be empty.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim()
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setAuthError(data.error || 'Invalid email or password.');
        setIsSubmitting(false);
        return;
      }

      // Successful login
      loginUser(
        data.user.name,
        data.user.email,
        selectedInterests,
        selectedBudget,
        data.user.date_of_birth,
        data.user.category,
        data.user.current_mood || 'Happy'
      );
      awardXP(50, 'Account Authentication');
      setIsSubmitting(false);
      setMoodChoice(data.user.current_mood || 'Happy');
      setStep('onboarding');
    } catch (err: any) {
      console.error('Login error:', err);
      setAuthError(err.message || 'Connection error during login.');
      setIsSubmitting(false);
    }
  };

  const handleContinueFromMood = async () => {
    setIsSubmittingMood(true);
    try {
      await saveUserMood(moodChoice);
      awardXP(25, 'Current Mood Updated');
    } catch (err) {
      console.error('Failed saving current mood:', err);
    } finally {
      setIsSubmittingMood(false);
      setCurrentPage('feed');
      onClose();
    }
  };

  const handleCompleteOnboarding = () => {
    loginUser(
      name || 'Alex Rivera', 
      email || 'alex@zynqosocial.internal', 
      selectedInterests, 
      selectedBudget,
      dateOfBirth || '1995-06-15',
      category || 'Manager',
      moodChoice
    );
    awardXP(50, 'Completed Interests & Attention Budget');
    setStep('mood');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4 animate-fade-in pt-safe pb-safe">
      <div className={`w-full max-w-lg max-h-[92dvh] rounded-3xl shadow-2xl overflow-hidden flex flex-col border transition-colors ${
        isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-white/15 text-white'
      }`}>
        {/* Header */}
        <div className={`p-4 md:p-5 border-b flex items-center justify-between ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/70 border-white/10'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
              <img
                src="/zynqo-symbol.png"
                alt="Zynqo Logo"
                className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(6,182,212,0.4)]"
              />
            </div>
            <div>
              <h3 className={`text-sm md:text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {step === 'login' 
                  ? 'Authentication & Account' 
                  : step === 'onboarding' 
                  ? 'Step 2: Select Your Interests' 
                  : "Step 3: What's your current mood?"}
              </h3>
              <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                {step === 'login' 
                  ? 'Sign in or switch profiles anytime' 
                  : step === 'onboarding'
                  ? 'Curate topics and daily attention budget'
                  : 'Select your vibe to tune your personalized AI feed'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-full transition ${
              isLight ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200' : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Indicator (Automatic step progression, no separate manual tabs) */}
        <div className={`px-5 py-2.5 border-b flex items-center justify-between text-xs font-semibold select-none ${
          isLight ? 'bg-slate-50/80 border-slate-200 text-slate-500' : 'bg-slate-950/40 border-white/10 text-slate-400'
        }`}>
          <div className="flex items-center gap-1.5">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-colors ${
              step === 'login'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'bg-emerald-500 text-slate-950'
            }`}>
              {step === 'login' ? '1' : '✓'}
            </span>
            <span className={`text-[11px] ${step === 'login' ? (isLight ? 'text-slate-900 font-bold' : 'text-white font-bold') : ''}`}>
              Sign In
            </span>
          </div>

          <div className={`h-0.5 flex-1 mx-2.5 rounded-full transition-colors ${
            step === 'onboarding' || step === 'mood' ? 'bg-emerald-500' : isLight ? 'bg-slate-200' : 'bg-white/10'
          }`} />

          <div className="flex items-center gap-1.5">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-colors ${
              step === 'onboarding'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : step === 'mood'
                ? 'bg-emerald-500 text-slate-950'
                : isLight ? 'bg-slate-200 text-slate-500' : 'bg-slate-800 text-slate-400'
            }`}>
              {step === 'mood' ? '✓' : '2'}
            </span>
            <span className={`text-[11px] ${step === 'onboarding' ? (isLight ? 'text-slate-900 font-bold' : 'text-white font-bold') : ''}`}>
              Interests & Budget
            </span>
          </div>

          <div className={`h-0.5 flex-1 mx-2.5 rounded-full transition-colors ${
            step === 'mood' ? 'bg-cyan-500' : isLight ? 'bg-slate-200' : 'bg-white/10'
          }`} />

          <div className="flex items-center gap-1.5">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-colors ${
              step === 'mood'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : isLight ? 'bg-slate-200 text-slate-500' : 'bg-slate-800 text-slate-400'
            }`}>
              3
            </span>
            <span className={`text-[11px] ${step === 'mood' ? (isLight ? 'text-slate-900 font-bold' : 'text-white font-bold') : ''}`}>
              Current Mood
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(92dvh-130px)]">
          {step === 'login' ? (
            /* STEP 1: LOGIN / SIGN UP */
            <div className="space-y-4 animate-fade-in">
              {/* If already logged in, show current status with sign out option */}
              {isLoggedIn && userProfile && (
                <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                  isLight ? 'bg-emerald-50 border-emerald-300' : 'bg-emerald-950/30 border-emerald-500/40'
                }`}>
                  <div className="flex items-center gap-3">
                    <img
                      src={userProfile.avatar}
                      alt={userProfile.name}
                      className="w-10 h-10 rounded-full border border-emerald-400/50"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{userProfile.name}</span>
                        <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                      <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{userProfile.handle}</span>
                    </div>
                  </div>

                  <button
                    onClick={logoutUser}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                      isLight
                        ? 'bg-red-100 hover:bg-red-200 text-red-700 border-red-300'
                        : 'bg-red-950/50 hover:bg-red-900/60 text-red-300 border-red-500/30'
                    }`}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}

              {/* Quick Guest Access button */}
              <button
                onClick={() => handleQuickLogin(true)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 hover:opacity-95 text-slate-950 font-black text-xs md:text-sm shadow-xl shadow-emerald-500/25 transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Instant 1-Click Login (Guest / Alex Rivera)</span>
              </button>

              <div className="flex items-center gap-3 my-3">
                <div className={`h-px flex-1 ${isLight ? 'bg-slate-200' : 'bg-white/10'}`} />
                <span className={`text-[11px] uppercase tracking-wider font-bold ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                  Or continue with your account
                </span>
                <div className={`h-px flex-1 ${isLight ? 'bg-slate-200' : 'bg-white/10'}`} />
              </div>

              {/* Auth Mode Toggle: Sign Up vs Sign In */}
              <div className={`flex rounded-xl p-1 border text-xs font-bold ${
                isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950/40 border-white/10'
              }`}>
                <button
                  type="button"
                  onClick={() => { setAuthMode('signup'); setAuthError(null); }}
                  className={`flex-1 py-1.5 rounded-lg transition ${
                    authMode === 'signup'
                      ? isLight ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'bg-white/15 text-white shadow-sm'
                      : isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sign Up (New Account)
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode('login'); setAuthError(null); }}
                  className={`flex-1 py-1.5 rounded-lg transition ${
                    authMode === 'login'
                      ? isLight ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'bg-white/15 text-white shadow-sm'
                      : isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sign In (Existing)
                </button>
              </div>

              {authError && (
                <div className="p-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              {authMode === 'signup' ? (
                /* SIGN UP FORM: Name + Email + Password + Date of Birth + Category */
                <form onSubmit={handleSignup} className="space-y-3">
                  {/* Full Name */}
                  <div>
                    <label className={`text-xs font-semibold block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Maya Chen"
                        required
                        className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs focus:outline-none focus:border-cyan-400 border transition ${
                          isLight ? 'bg-slate-100 border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-800 border-white/10 text-white placeholder:text-slate-500'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className={`text-xs font-semibold block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="maya@example.com"
                        required
                        className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs focus:outline-none focus:border-cyan-400 border transition ${
                          isLight ? 'bg-slate-100 border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-800 border-white/10 text-white placeholder:text-slate-500'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className={`text-xs font-semibold block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Create a password"
                        required
                        className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs focus:outline-none focus:border-cyan-400 border transition ${
                          isLight ? 'bg-slate-100 border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-800 border-white/10 text-white placeholder:text-slate-500'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Date of Birth (Requirement 1) */}
                  <div>
                    <label className={`text-xs font-semibold block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        value={dateOfBirth}
                        onChange={e => setDateOfBirth(e.target.value)}
                        required
                        className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs focus:outline-none focus:border-cyan-400 border transition ${
                          isLight ? 'bg-slate-100 border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-800 border-white/10 text-white placeholder:text-slate-500 [color-scheme:dark]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Category (Requirement 2: Student, Teacher, Clerk, Manager, Head, Other) */}
                  <div>
                    <label className={`text-xs font-semibold block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Category <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        required
                        className={`w-full pl-9 pr-8 py-2.5 rounded-xl text-xs focus:outline-none focus:border-cyan-400 border transition cursor-pointer appearance-none ${
                          isLight ? 'bg-slate-100 border-slate-300 text-slate-900' : 'bg-slate-800 border-white/10 text-white'
                        }`}
                      >
                        <option value="" disabled>Select Category</option>
                        <option value="Student">Student</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Clerk">Clerk</option>
                        <option value="Manager">Manager</option>
                        <option value="Head">Head</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2.5 rounded-2xl font-bold text-xs border transition mt-2 flex items-center justify-center gap-2 ${
                      isLight
                        ? 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900 shadow-md'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-emerald-400 shadow-md font-black'
                    }`}
                  >
                    <span>{isSubmitting ? 'Creating Account...' : 'Sign Up & Continue to Interests Setup'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <p className="text-[11px] text-center text-slate-400 pt-1">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => { setAuthMode('login'); setAuthError(null); }}
                      className="text-cyan-400 font-bold hover:underline"
                    >
                      Sign In
                    </button>
                  </p>
                </form>
              ) : (
                /* LOGIN FORM: Email + Password */
                <form onSubmit={handleLogin} className="space-y-3">
                  {/* Email Address */}
                  <div>
                    <label className={`text-xs font-semibold block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="e.g. alex@zynqosocial.internal"
                        required
                        className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs focus:outline-none focus:border-cyan-400 border transition ${
                          isLight ? 'bg-slate-100 border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-800 border-white/10 text-white placeholder:text-slate-500'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className={`text-xs font-semibold block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs focus:outline-none focus:border-cyan-400 border transition ${
                          isLight ? 'bg-slate-100 border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-800 border-white/10 text-white placeholder:text-slate-500'
                        }`}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2.5 rounded-2xl font-bold text-xs border transition mt-2 flex items-center justify-center gap-2 ${
                      isLight
                        ? 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900 shadow-md'
                        : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 border-cyan-400 shadow-md font-black'
                    }`}
                  >
                    <span>{isSubmitting ? 'Signing In...' : 'Sign In & Continue'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <p className="text-[11px] text-center text-slate-400 pt-1">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => { setAuthMode('signup'); setAuthError(null); }}
                      className="text-cyan-400 font-bold hover:underline"
                    >
                      Sign Up
                    </button>
                  </p>
                </form>
              )}
            </div>
          ) : step === 'onboarding' ? (
            /* STEP 2: ONBOARDING / INTERESTS */
            <div className="space-y-5 animate-fade-in">
              <div>
                <span className={`text-xs font-bold block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Select Topics of Value
                </span>
                <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Unlike addictive algorithms that guess via clickbait, tell Zynqo Social what matters to you.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {interestsList.map(item => {
                  const isSelected = selectedInterests.includes(item.label);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleInterest(item.label)}
                      className={`p-3 rounded-2xl border text-left transition flex items-center justify-between ${
                        isSelected
                          ? isLight
                            ? 'bg-slate-100 border-slate-400 shadow-sm ring-1 ring-slate-300'
                            : 'bg-white/10 border-cyan-400/60 shadow-lg'
                          : isLight
                          ? 'bg-white border-slate-200 hover:bg-slate-50'
                          : 'bg-slate-800/50 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{item.icon}</span>
                        <span className={`text-xs font-semibold ${
                          isSelected ? (isLight ? 'text-slate-900 font-bold' : 'text-white') : (isLight ? 'text-slate-600' : 'text-slate-300')
                        }`}>
                          {item.label}
                        </span>
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 ml-1" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Attention Budget Selector */}
              <div className={`p-4 rounded-2xl border space-y-2.5 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-white/10'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-500" />
                    <span className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Daily Attention Budget</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                    {selectedBudget} Mins/Day
                  </span>
                </div>

                <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Zynqo Social will automatically initiate a healthy session summary once this limit is approached.
                </p>

                <div className="flex gap-2 pt-1">
                  {[15, 30, 45, 60].map(mins => (
                    <button
                      key={mins}
                      onClick={() => setSelectedBudget(mins)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition ${
                        selectedBudget === mins
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                          : isLight
                          ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                          : 'bg-slate-800 text-slate-300 border-white/10 hover:text-white'
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
              </div>

              {/* Continue to Mood Selection */}
              <button
                onClick={handleCompleteOnboarding}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 hover:opacity-95 text-slate-950 font-black text-xs md:text-sm shadow-xl shadow-cyan-500/25 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* STEP 3: CURRENT MOOD SELECTION */
            <div className="space-y-5 animate-fade-in">
              <div className="text-center space-y-1">
                <h2 className={`text-xl md:text-2xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  What's your current mood?
                </h2>
                <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Select your current mood to align your personalized AI reels feed.
                </p>
              </div>

              {/* 10 Mood Options Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {MOOD_OPTIONS.map(item => {
                  const isSelected = moodChoice === item.mood;
                  return (
                    <button
                      key={item.mood}
                      type="button"
                      onClick={() => setMoodChoice(item.mood)}
                      className={`min-h-[54px] px-3.5 py-3 rounded-2xl border text-left transition flex items-center justify-between group cursor-pointer ${
                        isSelected
                          ? isLight
                            ? 'bg-cyan-50 border-cyan-500 text-slate-950 shadow-md ring-2 ring-cyan-400/40'
                            : 'bg-cyan-950/50 border-cyan-400 text-white shadow-lg ring-2 ring-cyan-400/40'
                          : isLight
                          ? 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          : 'bg-slate-800/60 border-white/10 hover:border-white/20 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl select-none" role="img" aria-label={item.mood}>
                          {item.emoji}
                        </span>
                        <span className={`text-xs md:text-sm font-semibold ${
                          isSelected 
                            ? isLight ? 'text-cyan-950 font-bold' : 'text-cyan-200 font-bold' 
                            : isLight ? 'text-slate-700' : 'text-slate-300'
                        }`}>
                          {item.mood}
                        </span>
                      </div>
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className={`w-5 h-5 rounded-full border border-dashed transition flex-shrink-0 ${
                          isLight ? 'border-slate-300 group-hover:border-slate-400' : 'border-white/20 group-hover:border-white/40'
                        }`} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Continue Button */}
              <button
                type="button"
                onClick={handleContinueFromMood}
                disabled={isSubmittingMood}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 hover:opacity-95 text-slate-950 font-black text-xs md:text-sm shadow-xl shadow-cyan-500/25 transition flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>{isSubmittingMood ? 'Saving...' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
