import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.zynqosocial.app',
  appName: 'Zynqo Social',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1800,
      backgroundColor: '#0d0b14',
      showSpinner: false
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0d0b14'
    }
  }
};

export default config;
