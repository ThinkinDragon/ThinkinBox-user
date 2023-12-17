import { Capacitor } from '@capacitor/core';


export const useWhatPlatform = () => {
  const plat = Capacitor.getPlatform()
  const runtimeConfig = useRuntimeConfig()

  const envApp = runtimeConfig.public.mobile

  const isApp = plat != 'web'
  
  return {
    plat,
    isApp,
    envApp,
  }
}
