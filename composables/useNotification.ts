import { defineStore } from "pinia"
import type { Notification, Notifications } from "~/types/notifications";

const { errorResponse } = useBase()

  export const useNotification = defineStore('notifications', {
      persist: {
    enabled: true,
    // See below for additional options that go here
  },
    state: ():Notifications => ({
      notifications: [],
    }),
    getters:{
      getNotifications(state){
        return state.notifications
      },
    },
    actions:{
      reset(state){
        state.$reset()
      },
      async fetch(){
        await useFetchAuth('/api/user/notifications/user').then((result) => {
          this.notifications = result
        }).catch((err) => {
          errorResponse(err)
        });
      },

    },
  })

  // make sure to pass the right store definition, `useNotification` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNotification, import.meta.hot))
}