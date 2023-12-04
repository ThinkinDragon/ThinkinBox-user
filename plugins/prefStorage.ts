import { defineNuxtPlugin, useNuxtApp, useRuntimeConfig } from '#app'
import PrefStorage from '~/lib/prefStorage'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      prefStorage: new PrefStorage(),
      //prefStorage: (key:string,value:string)=> new PrefStorage({key,value}),
    },
  }
})

declare module '#app' {
  interface NuxtApp {
    $prefStorage: PrefStorage
  }
}
