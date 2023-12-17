<template>
  <!-- <div :class="$route.name === 'index' ? 'hidden' : ''" class="sticky top-0 z-10 object-cover w-full bg-gray-50 dark:bg-gray-900 bg-center realtive"> -->
    <div class="sticky top-0 z-5 object-cover w-full  bg-center realtive">
      <nav class="relative z-10 flex items-start justify-between flex-grow p-2 mx-auto">
      <div class="relative inline">
        <slot name="start">
          <div @click="back()" class=" z-50 absolute top-0 w-10 h-10 bg-gray-50 dark:bg-gray-900 rounded-full pt-2 pl-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
        </slot>
      </div>
      <slot name="main">
        <div class="inline-flex items-center self-center justify-center flex-grow font-bold">
          <slot name="nav">
            {{ title }}
          </slot>
        </div>
      </slot>
      <div class="inline-flex min-w-6 min-h-6">
        <slot name="action"></slot>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { App } from "@capacitor/app";

const title = useState("title", () => "Welcome");
const { isLoggedIn } = useAuth();

const router = useRouter();

function back() {
  router.back();
}
</script>
