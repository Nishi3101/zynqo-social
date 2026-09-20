import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { StatusBar, Style } from '@capacitor/status-bar';
import { App } from '@capacitor/app';

export const isNativePlatform = (): boolean => {
  return Capacitor.isNativePlatform();
};

export const getPlatform = (): 'android' | 'ios' | 'web' => {
  const p = Capacitor.getPlatform();
  if (p === 'android') return 'android';
  if (p === 'ios') return 'ios';
  return 'web';
};

export const isMobileScreen = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

export const isTabletScreen = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 768 && window.innerWidth <= 1024;
};

/**
 * Native Haptic Feedback with web vibration fallback
 */
export const triggerHaptic = async (
  type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' = 'light'
): Promise<void> => {
  try {
    if (isNativePlatform()) {
      if (type === 'light') {
        await Haptics.impact({ style: ImpactStyle.Light });
      } else if (type === 'medium') {
        await Haptics.impact({ style: ImpactStyle.Medium });
      } else if (type === 'heavy') {
        await Haptics.impact({ style: ImpactStyle.Heavy });
      } else if (type === 'success') {
        await Haptics.notification({ type: NotificationType.Success });
      } else if (type === 'warning') {
        await Haptics.notification({ type: NotificationType.Warning });
      } else if (type === 'error') {
        await Haptics.notification({ type: NotificationType.Error });
      }
    } else if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      if (type === 'light') navigator.vibrate(10);
      else if (type === 'medium') navigator.vibrate(25);
      else if (type === 'heavy') navigator.vibrate(45);
      else if (type === 'success') navigator.vibrate([15, 30, 20]);
      else if (type === 'warning') navigator.vibrate([30, 40, 30]);
      else if (type === 'error') navigator.vibrate([40, 50, 40]);
    }
  } catch {
    // Ignore errors silently if haptics not supported
  }
};

/**
 * Configure Native Mobile Status Bar
 */
export const configureNativeStatusBar = async (isLight: boolean): Promise<void> => {
  try {
    if (isNativePlatform()) {
      await StatusBar.setStyle({
        style: isLight ? Style.Light : Style.Dark
      });
      if (Capacitor.getPlatform() === 'android') {
        await StatusBar.setBackgroundColor({
          color: isLight ? '#fdf8fa' : '#0d0b14'
        });
      }
    }
  } catch {
    // Ignore if not supported in current environment
  }
};

/**
 * Setup Android Hardware Back Button listener
 * @param callback function that returns true if it consumed the back event (e.g. closed a modal)
 */
export const registerNativeBackHandler = (callback: () => boolean): (() => void) => {
  if (!isNativePlatform()) return () => {};

  let backListener: any = null;
  App.addListener('backButton', ({ canGoBack }) => {
    const handled = callback();
    if (!handled && canGoBack) {
      window.history.back();
    } else if (!handled && !canGoBack) {
      App.exitApp();
    }
  }).then(listener => {
    backListener = listener;
  });

  return () => {
    if (backListener && typeof backListener.remove === 'function') {
      backListener.remove();
    }
  };
};
