import { Device } from "@capacitor/device";
import { PushNotifications } from "@capacitor/push-notifications";
import { defineStore } from "pinia";
import { useSessionStorage } from "@vueuse/core";

export const useFirebase = defineStore("firebase", {
  persist: { enabled: true, },
  state: () => ({
    token: "web",
    notification: null,
    notificationList: null,
    processing: false,
    platform: "web",
    deviceid: null,
  }),
  getters: {
    getToken(state) {
      return state.token;
    },
  },
  actions: {
    reset(state) {
      state.$reset();
    },

    async addFirebaseListeners() {
      await PushNotifications.addListener("registration", (token) => {
        console.info("Registration token: ", token.value);
        if (token.value == undefined) return;
        this.token = token.value ?? "web";
      });

      await PushNotifications.addListener("registrationError", (err) => {
        console.error("Registration error: ", err.error);
      });

      await PushNotifications.addListener(
        "pushNotificationReceived",
        (notification) => {
          console.log("Push notification received: ", notification);
          this.notification = notification;
        }
      );

      await PushNotifications.addListener(
        "pushNotificationActionPerformed",
        (notification) => {
          console.log(
            "Push notification action performed",
            notification.actionId,
            notification.inputValue
          );
          this.notification = notification;
        }
      );
    },

    async device() {
      await Device.getInfo()
        .then((result) => {
          this.platform = result.platform;
        })
        .catch((err) => {
          console.log(err);
        });
      await Device.getId()
        .then((result) => {
          this.deviceid = result;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async registerNotifications() {
      await this.device();
      if (this.platform == "web") {
        return true;
      }
      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === "prompt") {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== "granted") {
        throw new Error("User denied permissions!");
      }

      await PushNotifications.register();

      this.addFirebaseListeners();
    },

    // if (this.platform) {
    //   if (platform == "web") {
    //     let permission = await Notification.requestPermission(function () {
    //       if (Notification.permission === "granted") {
    //         console.log("success");
    //       } else if (Notification.permission === "denied") {
    //         console.log("denied");
    //       } else {
    //         console.log("try");
    //       }
    //     });
    //   } else {
    //     //useAppUpdate().startFlexibleUpdate();
    //     notif.registerLocalNotifications();
    //   }
    // }

    async getDeliveredNotifications() {
      this.notificationList =
        await PushNotifications.getDeliveredNotifications();
      console.log("delivered notifications", notificationList);
    },
  },
});

    // make sure to pass the right store definition, `useFirebase` in this case.
    if (import.meta.hot) {
      import.meta.hot.accept(acceptHMRUpdate(useFirebase, import.meta.hot))
    }