<template>
  <div class="flex flex-col h-screen">
    <header class=" bg-white dark:bg-gray-900 items-center">
      <MainMobileDashNav>
        <template v-slot:full>
          <slot name="full"></slot>
        </template>
        <template v-slot:action>
          <slot name="nav"></slot>
        </template>

      </MainMobileDashNav>
    </header>
    <sub-header class="fixed z-30 inset-x-1 top-11 p-2 items-center">
      <slot name="subnav"></slot>
    </sub-header>
    <main class="flex-1 relative overflow-y-auto bg-white dark:bg-gray-900 px-5 pointer-events-auto">
  
      <slot />
    </main>
    <!-- <footer class="py-5 text-center text-white dark:text-gray-900">
      
    </footer> -->
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { storeToRefs } from "pinia";
import type { SwipeInstance } from "vant";

const title = useState("title", () => "");
const { removeUser, isLoggedIn, getUser } = useAuth();
const { width, height } = useWindowSize();

const { useUser } = useAuth();
const store2 = useUser();
const { show } = storeToRefs(store2);

const swipeRef = ref<SwipeInstance>();

onMounted(() => {
  window.onerror = function (e) {
    if (e.includes("NotFoundError:")) {
      document.location.reload();
      return true;
    }
  };
});
</script>