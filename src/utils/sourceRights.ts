import { Reel } from '../types';

export interface SourceRights {
  platform: string;
  creatorHandle: string;
  rightsStatus: string;
  url?: string;
  isDemo?: boolean;
}

/**
 * Resolves source & licensing rights information for a given reel.
 * Prioritizes explicit `reel.sourceRights` or `reel.originalSource` data,
 * and provides clearly marked mock/demo metadata when real data is not yet configured.
 */
export function resolveSourceRights(reel: Reel): SourceRights {
  // 1. Explicit sourceRights on reel
  if (reel.sourceRights) {
    return {
      platform: reel.sourceRights.platform || 'Platform',
      creatorHandle: reel.sourceRights.creatorHandle || reel.creator?.handle || '@creator',
      rightsStatus: reel.sourceRights.rightsStatus || 'Licensed (Demo)',
      url: reel.sourceRights.url || reel.originalSource?.url,
      isDemo: reel.sourceRights.isDemo !== undefined ? reel.sourceRights.isDemo : false,
    };
  }

  // 2. Existing originalSource on reel
  if (reel.originalSource) {
    return {
      platform: reel.originalSource.platform || 'Original Source',
      creatorHandle: reel.creator?.handle || '@creator',
      rightsStatus: reel.originalSource.license || 'Licensed (Demo)',
      url: reel.originalSource.url,
      isDemo: true,
    };
  }

  // 3. Fallback inference clearly marked as Demo metadata
  let platform = 'Zynqo Creators';
  let url = '';
  let rightsStatus = 'Licensed (Demo / Curated)';

  const videoUrl = reel.videoUrl || '';
  const reelId = reel.id || '';

  if (reelId.startsWith('ig-') || videoUrl.includes('ig_') || videoUrl.includes('instagram')) {
    platform = 'Instagram';
    const cleanId = reelId.replace(/^ig-/, '').replace(/^tmkoc-/, '').replace(/^navratri-/, '');
    url = cleanId ? `https://www.instagram.com/reel/${cleanId}/` : 'https://www.instagram.com';
    rightsStatus = 'Licensed (Demo / Fair Use)';
  } else if (reelId.startsWith('yt-') || videoUrl.includes('youtube') || videoUrl.includes('youtu.be')) {
    platform = 'YouTube';
    url = 'https://www.youtube.com';
    rightsStatus = 'Licensed (Demo)';
  } else if (videoUrl.includes('pexels')) {
    platform = 'Pexels';
    url = 'https://www.pexels.com';
    rightsStatus = 'Pexels License (Demo)';
  } else if (reel.isAIGenerated) {
    platform = 'AI Synthesis';
    rightsStatus = 'Synthetic CC-0 (Demo)';
  }

  return {
    platform,
    creatorHandle: reel.creator?.handle || '@creator',
    rightsStatus,
    url,
    isDemo: true,
  };
}
