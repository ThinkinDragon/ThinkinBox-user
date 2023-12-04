import { defineStore } from "pinia"
import { useMemoize,useStorage } from '@vueuse/core'
import lang from '../src/lang.json';

export interface language {
  language:String;
  _translations:any;
  cacheTime:any;
}

export const useLanguage = defineStore('language', {
  persist: {
    enabled: true,
    //exclude:['_translations']
  },
    state: ():language => ({
      language: 'en',
      _translations: null,
      cacheTime: useCookie('cacheTime'),
    }),
    getters:{
      getLanguage(state){
        return state.language
      },

    },
    actions:{
      async getApiLanguage(){
        console.log(this.cacheTime);
        console.log(this._translations);

        //const data = lang;
        //useMemoize(async (lang) => await useFetchAuth(`/api/language/${lang}`))

        this._translations = lang;//await data(this.language);
      }
    },
  })

      // make sure to pass the right store definition, `useLanguage` in this case.
      if (import.meta.hot) {
        import.meta.hot.accept(acceptHMRUpdate(useLanguage, import.meta.hot))
      }