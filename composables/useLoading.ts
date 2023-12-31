import { defineStore } from "pinia"

export interface loading {
  loading:boolean;
  silentLoading:boolean;
}

export const useLoading = defineStore('loading', {
      persist: { enabled: true,},
    state: ():loading => ({
      loading: false,
      silentLoading: false,
    }),
    getters:{
      getLoading(state){
        return state.loading
      },
      getSilentLoading(state){
        return state.silentLoading
      },
    },
    actions:{
      show(){
        this.loading = true
      },
      hide(){
        this.loading = false
      },
      sshow(){
        this.silentLoading = true
      },
      shide(){
        this.silentLoading = false
      },
    },
  })

// make sure to pass the right store definition, `useLoading` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLoading, import.meta.hot))
}