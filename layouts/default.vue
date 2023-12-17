<template>
  <div class="flex flex-col h-screen">
    <header class="py-5 bg-gray-50 dark:bg-gray-900 items-center">
      <MainMobileNav />
    </header>
    <main class="flex-1 overflow-y-auto p-5">
      <slot />
    </main>
    <footer class="py-5 text-center text-white dark:text-gray-900">
      
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { storeToRefs } from "pinia";

const { width, height } = useWindowSize();
const title = useState("title");
const {  platform } = storeToRefs(useFirebase())


onMounted(async() => {
  await useFirebase().device()
  useFirebase().registerNotifications();
  recheck();
  //useFirebase().addFirebaseListeners();
  //useAddress().startTracking();

});

</script>

<style>
.router-link-active {
  font-weight: bold;
}

.main {
  background-image: url(https://images.unsplash.com/photo-1507608158173-1dcec673a2e5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80);
}

::-webkit-scrollbar {
  width: 0;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-thumb {
  background-color: transparent;
  outline: 1px solid transparent;
}

.vier-sheet-container{
  pointer-events: none !important;
}
.vier-sheet-container > .vier-sheet{
  pointer-events: auto !important;
}
</style>
