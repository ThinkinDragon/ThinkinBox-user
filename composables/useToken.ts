import { defineStore, storeToRefs } from "pinia";

export const useToken = defineStore("authToken", {
  persist: { enabled: true, exclude:['token'] },
  state: () => ({
    token:  null as string | null ,//null as string | null,
    show:  true as boolean ,//true as boolean,
  }),
  getters: {
    getToken(state) : string | null {
      return state.token;
    },
  },
});

// make sure to pass the right store definition, `useToken` in this case.
// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useToken, import.meta.hot));
// }
