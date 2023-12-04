import { LocalNotifications, NotificationActionPerformed, NotificationReceived } from '@capacitor/local-notifications';
import { defineStore } from "pinia";

interface NotificationData {
  attachments: Array<any> | any;
  title: string;
  body: string;
  id: number;
}
export const useLocalNotification = defineStore("notification", {
  //persist: { enabled: false},
  state: () => ({
    token: "",
    notification: null,
    notificationList: null,
    processing: false,
  }),
  getters: {
    getToken(state) {
      return state.token;
    },
  },
  actions: {
    async registerNotifications(): Promise<void> {
      try {
        await LocalNotifications.requestPermissions();
      } catch (error) {
        console.error(error);
      }
    },
    
    async getPendingNotifications(): Promise<NotificationData[]> {
      try {
        const pendingNotifications = await LocalNotifications.getPending();
        return pendingNotifications.notifications;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    
    async sendNotification(notification: NotificationData): Promise<void> {
      try {
        //Object.assign(notification,{allowWhileIdle: true})
        console.log(JSON.stringify(notification));
        
        await LocalNotifications.schedule({
          notifications: [notification]
        });
      } catch (error) {
        console.error(error);
      }
    },
    
    async cancelNotification(id: number): Promise<void> {
      try {
        await LocalNotifications.cancel({ notificationIds: [id] });
      } catch (error) {
        console.error(error);
      }
    },
    
    removeAllListeners(): void {
      LocalNotifications.removeAllListeners();
    },
    listener(params:any) {
      let dat : NotificationData;
      dat =  params.notification;
      let msg = dat.attachments;
      if (msg.key == 'CHAT_MESSAGE_PROVIDER') {
        return navigateTo(`/booking/${msg.request}-chat`);
      }

    },
    async registerLocalNotifications() {
      this.registerNotifications();
      
      LocalNotifications.addListener('localNotificationActionPerformed', this.listener);
      //LocalNotifications.addListener('localNotificationReceived', this.listener);

    },

    async sendLocal(notification : NotificationData) {
      this.sendNotification(notification);
    },
  },
});


        // make sure to pass the right store definition, `useLocalNotification` in this case.
        if (import.meta.hot) {
          import.meta.hot.accept(acceptHMRUpdate(useLocalNotification, import.meta.hot))
        }