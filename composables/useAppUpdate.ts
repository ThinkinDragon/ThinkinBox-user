import { defineStore } from "pinia";
import { AppUpdate } from "@capawesome/capacitor-app-update";

const { errorResponse } = useBase();

export const useAppUpdate = defineStore("appUpdate", {
    persist: { enabled: true, },
  state: () => ({
    result: null,
  }),
  actions: {
    async getCurrentAppVersion() {
      const result = await AppUpdate.getAppUpdateInfo();
      return result.currentVersion;
    },

    async getAvailableAppVersion() {
      const result = await AppUpdate.getAppUpdateInfo();
      return result.availableVersion;
    },

    async openAppStore() {
      await AppUpdate.openAppStore();
    },

    async performImmediateUpdate() {
      const result = await AppUpdate.getAppUpdateInfo();
      if (result.updateAvailability !== AppUpdateAvailability.UPDATE_AVAILABLE) {
        return;
      }
      if (result.immediateUpdateAllowed) {
        await AppUpdate.performImmediateUpdate();
      }
    },

    async startFlexibleUpdate() {
      const result = await AppUpdate.getAppUpdateInfo();
      if (result.updateAvailability !== AppUpdateAvailability.UPDATE_AVAILABLE) {
        return;
      }
      if (result.flexibleUpdateAllowed) {
        await AppUpdate.startFlexibleUpdate();
      }
    },

    async completeFlexibleUpdate() {
      await AppUpdate.completeFlexibleUpdate();
    },
  },
});

// make sure to pass the right store definition, `useAppUpdate` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppUpdate, import.meta.hot))
}