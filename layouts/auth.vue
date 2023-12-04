<template>
  <div class="flex flex-col h-screen">
    <header class=" bg-white dark:bg-gray-900 items-center">
      <MainMobileAuthNav/>
  </header>
  <main class="flex-1 overflow-y-auto p-5 bg-white dark:bg-gray-900">
  <slot />
  </main>
  <footer class="fixed inset-x-0 bottom-0 py-5 text-center text-white dark:text-gray-900">
    
  </footer>
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { Capacitor } from "@capacitor/core";

const { width, height } = useWindowSize();
const { removeUser, isLoggedIn, getUser, logout } = useAuth();
const { errorResponse } = useBase();
const store = useFirebase();

onMounted(() => {
  store.device();

  if (store.platform != "web") {
    const isPushNotificationsAvailable = Capacitor.isPluginAvailable("PushNotifications");
    if (isPushNotificationsAvailable) {
      store.registerNotifications();
      store.addFirebaseListeners();
    } else {
      store.token = "web";
    }
  } else {
  }
});
</script>