import { ThemeType } from '../types';

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  tagline: string;
  vibe: string;
  previewColors: string[];
  gradient: string;
  textAccent: string;
  borderAccent: string;
  bgGlow: string;
  buttonClass: string;
  badgeClass: string;
}

export const themes: Record<ThemeType, ThemeConfig> = {
  rose: {
    id: 'rose',
    name: 'Zynqo Velvet Rose & Neon Magenta',
    tagline: 'Deep Berry, Magenta Radiance & Rose Obsidian',
    vibe: 'Signature Zynqo brand theme matching official light and dark specifications',
    previewColors: ['#be123c', '#ec4899', '#f43f5e'],
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-600',
    textAccent: 'text-rose-600 dark:text-rose-400',
    borderAccent: 'border-rose-300 dark:border-rose-500/40',
    bgGlow: 'rgba(244, 63, 94, 0.28)',
    buttonClass: 'bg-gradient-to-r from-[#701a75] via-[#9d174d] to-[#be123c] dark:from-[#d946ef] dark:via-[#ec4899] dark:to-[#f43f5e] hover:brightness-105 text-white font-bold shadow-lg shadow-rose-950/20 dark:shadow-rose-500/30',
    badgeClass: 'bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/40'
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Bionic',
    tagline: 'Obsidian & Electric Mint',
    vibe: 'Bio-tech, modern tech leader, high cognitive clarity (Linear & Spotify style)',
    previewColors: ['#10b981', '#34d399', '#064e3b'],
    gradient: 'from-emerald-500 via-teal-400 to-cyan-500',
    textAccent: 'text-emerald-400',
    borderAccent: 'border-emerald-500/40',
    bgGlow: 'rgba(16, 185, 129, 0.25)',
    buttonClass: 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black shadow-emerald-500/25',
    badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
  },
  amber: {
    id: 'amber',
    name: 'Solar Amber & Forge',
    tagline: 'Warm Charcoal & Radiant Bronze',
    vibe: 'Hardware luxury, creative studio, cinematic warmth (Runway & Humane style)',
    previewColors: ['#f59e0b', '#fb923c', '#78350f'],
    gradient: 'from-amber-500 via-orange-400 to-rose-500',
    textAccent: 'text-amber-400',
    borderAccent: 'border-amber-500/40',
    bgGlow: 'rgba(245, 158, 11, 0.25)',
    buttonClass: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black shadow-amber-500/25',
    badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/40'
  },
  cobalt: {
    id: 'cobalt',
    name: 'Royal Cobalt & Deep Navy',
    tagline: 'Midnight Blue & Electric Azure',
    vibe: 'Enterprise grade, trustworthy, high-intelligence fintech (Stripe & Apple Pro style)',
    previewColors: ['#3b82f6', '#6366f1', '#1e3a8a'],
    gradient: 'from-blue-500 via-indigo-500 to-cyan-400',
    textAccent: 'text-blue-400',
    borderAccent: 'border-blue-500/40',
    bgGlow: 'rgba(59, 130, 246, 0.25)',
    buttonClass: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold shadow-blue-500/25',
    badgeClass: 'bg-blue-500/15 text-blue-300 border-blue-500/40'
  },
  cyan: {
    id: 'cyan',
    name: 'Cyber Cyan & Violet',
    tagline: 'Electric Cyan & Deep Purple',
    vibe: 'Futuristic AI neon, high-tech matrix atmosphere',
    previewColors: ['#06b6d4', '#8b5cf6', '#164e63'],
    gradient: 'from-cyan-500 via-teal-400 to-violet-600',
    textAccent: 'text-cyan-400',
    borderAccent: 'border-cyan-500/40',
    bgGlow: 'rgba(6, 182, 212, 0.25)',
    buttonClass: 'bg-gradient-to-r from-cyan-500 to-violet-600 hover:opacity-90 text-white font-bold shadow-cyan-500/25',
    badgeClass: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
  }
};
