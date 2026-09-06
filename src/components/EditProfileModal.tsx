import React, { useState } from 'react';
import { X, Camera, Check, Sparkles, User, AtSign, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { themes } from '../utils/theme';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
];

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  const { userProfile, updateUserProfile, currentTheme, colorMode } = useApp();
  const theme = themes[currentTheme] || themes.emerald;
  const isLight = colorMode === 'light';

  const [name, setName] = useState(userProfile?.name || 'Alex Rivera');
  const [handle, setHandle] = useState(userProfile?.handle?.replace('@', '') || 'alex_explorer');
  const [bio, setBio] = useState(userProfile?.bio || 'AI Creator & Digital Explorer. Crafting interactive educational reels, verified science breakdowns, and productivity workflows. 🚀');
  const [avatar, setAvatar] = useState(userProfile?.avatar || AVATAR_PRESETS[0]);
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSaving(true);
    try {
      await updateUserProfile({
        name: name.trim(),
        handle: `@${handle.trim().replace(/\s+/g, '_').toLowerCase()}`,
        bio: bio.trim(),
        avatar: avatar.trim()
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fade-in select-none">
      <div className={`w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-colors ${
        isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-white/15 text-white'
      }`}>
        {/* Header */}
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/70 border-white/10'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${theme.gradient} flex items-center justify-center text-white shadow-md`}>
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-display font-bold">Edit Profile</h2>
              <p className="text-xs text-slate-400 font-sans">Update your public creator identity & bio</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-full transition ${
              isLight ? 'hover:bg-slate-200 text-slate-500' : 'hover:bg-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {/* Avatar Preview & Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block font-sans">
              Profile Picture / Avatar
            </label>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <img
                  src={avatar}
                  alt="Avatar Preview"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-cyan-500/50 shadow-lg"
                />
                <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <span className="text-[11px] text-slate-400 block">Choose a fast preset or enter custom URL:</span>
                <div className="flex items-center gap-2">
                  {AVATAR_PRESETS.map((preset, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setAvatar(preset)}
                      className={`w-8 h-8 rounded-xl overflow-hidden border-2 transition-transform ${
                        avatar === preset ? 'border-cyan-400 scale-110 shadow-md ring-2 ring-cyan-500/30' : 'border-white/20 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={preset} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className={`w-full text-xs px-3 py-1.5 rounded-xl border font-mono transition outline-none ${
                    isLight 
                      ? 'bg-slate-100 border-slate-300 text-slate-800 focus:border-cyan-500' 
                      : 'bg-slate-800/80 border-white/10 text-slate-200 focus:border-cyan-400'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Display Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block font-sans">
              Display Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Rivera"
                required
                className={`w-full text-sm pl-9 pr-3 py-2.5 rounded-xl border font-sans transition outline-none ${
                  isLight 
                    ? 'bg-slate-100 border-slate-300 text-slate-900 focus:border-cyan-500' 
                    : 'bg-slate-800/80 border-white/10 text-white focus:border-cyan-400'
                }`}
              />
            </div>
          </div>

          {/* Username / Handle */}
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block font-sans">
              Username / Handle
            </label>
            <div className="relative">
              <AtSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="alex_explorer"
                required
                className={`w-full text-sm pl-9 pr-3 py-2.5 rounded-xl border font-sans font-medium transition outline-none ${
                  isLight 
                    ? 'bg-slate-100 border-slate-300 text-slate-900 focus:border-cyan-500' 
                    : 'bg-slate-800/80 border-white/10 text-white focus:border-cyan-400'
                }`}
              />
            </div>
            <span className="text-[10px] text-slate-400">Public profile URL: zynqo.social/@{handle.toLowerCase()}</span>
          </div>

          {/* Bio */}
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block font-sans">
              Short Bio
            </label>
            <div className="relative">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                maxLength={200}
                placeholder="Tell the community about what you create and explore..."
                className={`w-full text-xs sm:text-sm p-3 rounded-xl border font-sans transition outline-none resize-none ${
                  isLight 
                    ? 'bg-slate-100 border-slate-300 text-slate-900 focus:border-cyan-500' 
                    : 'bg-slate-800/80 border-white/10 text-white focus:border-cyan-400'
                }`}
              />
              <span className="text-[10px] text-slate-400 block text-right">
                {bio.length} / 200 characters
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-xs font-semibold font-sans transition ${
                isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className={`px-6 py-2 rounded-xl ${theme.buttonClass} text-xs font-semibold font-sans shadow-lg transition flex items-center gap-1.5`}
            >
              {isSaving ? (
                <span>Saving...</span>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
