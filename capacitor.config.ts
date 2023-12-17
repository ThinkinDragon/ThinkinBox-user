import type { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';
import dotenv from 'dotenv'

const env = () => {
  const env = process.env.STATUS
  if (env === 'staging')
    return 'staging'
  if (env === 'production')
    return 'production'
  if (env === 'development')
    return 'dev'
  return 'dev'
}
dotenv.config({
  path: '.env'
  //path: `.env.${env()}`,
})

const config: CapacitorConfig ={
  appId: 'com.vajjan.user',
  appName: 'Vajjan',
  webDir: 'dist',
  //loggingBehavior: 'production',
  bundledWebRuntime: false,
  android: {
    allowMixedContent: true
  },
  //hideLogs: true,
  plugins: {
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#488AFF',
      sound:'alert_tone.mp3'
    },
    FirebaseMessaging: {
      presentationOptions: ['badge','alert', 'sound'],
    },
    Keyboard: {
      resize: KeyboardResize.Native,      
      style: KeyboardStyle.Dark,
      //resizeOnFullScreen: true
    },
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: true,
      launchFadeOutDuration: 0,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
}

if (process.env.VITE_HOST_IP_LIVE_CAPACITOR) {
  //console.log('API_ADDRESS', ip)
  // Uncomment this to enable live-reload.
  // For Android, need to run `adb reverse tcp:4000 tcp:4000` to port-forward the Frontend server to the emulator.
  //
  if (process.env.STATUS === 'development') {
    config.server = {
      url: `http://${process.env.VITE_HOST_IP_LIVE_CAPACITOR}:${process.env.PORT}`,
      cleartext: true,
    }
  } else {
    config.server = {
      androidScheme: "http",
      cleartext: true,
      hostname: `${process.env.HOSTNAME}:${process.env.PORT}`
    }
  }
}

export default config;

// if (process.env.VITE_HOST_IP_LIVE_CAPACITOR) {

//   if (true || process.env.STATUS === 'development') {
//     config.server = {
//       androidScheme: "https",
//       url: `https://thinkin-box-user.vercel.app/`,//`http://${process.env.VITE_HOST_IP_LIVE_CAPACITOR}:${process.env.PORT}`,
//       cleartext: true,
//     }
//   } else {
//     config.server = {
//       androidScheme: "http",
//       cleartext: true,
//       hostname: `${process.env.HOSTNAME}:${process.env.PORT}`
//     }
//   }
// }

// export default config;