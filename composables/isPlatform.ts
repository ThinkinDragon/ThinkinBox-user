import { Capacitor } from '@capacitor/core';


export const useWhatPlatform = () => {
  const ios = Capacitor.getPlatform('ios')
  const android = Capacitor.getPlatform('android')
  const capacitor = Capacitor.getPlatform('capacitor')
  const electron = Capacitor.getPlatform('electron')
  const pwa = Capacitor.getPlatform('pwa')
  const cordova = Capacitor.getPlatform('cordova')
  const desktop = Capacitor.getPlatform('desktop')
  const hybrid = Capacitor.getPlatform('hybrid')
  const mobile = Capacitor.getPlatform('mobile')
  const mobileWeb = Capacitor.getPlatform('mobileweb')
  const tablet = Capacitor.getPlatform('tablet')
  const runtimeConfig = useRuntimeConfig()

  const envApp = runtimeConfig.public.mobile

  const isApp = (capacitor || cordova || electron || hybrid || envApp) != 'web'
  
  return {
    ios,
    android,
    capacitor,
    electron,
    pwa,
    cordova,
    desktop,
    hybrid,
    mobile,
    mobileWeb,
    tablet,
    isApp,
    envApp,
  }
}
