<template>
  <slot/>
  <div class="sticky top-0 z-10 object-cover w-full bg-center realtive">
    <slot name="full">
    <nav class="relative z-10 flex items-start justify-between flex-grow p-2 mx-auto">
      <div class="relative inline">
        <div @click="$router.back()" type="button" class="relative inline-flex items-center text-gray-800 ">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>
      </div>
      <div class="inline-flex text-gray-800">
        {{ title }}
      </div>
      <div class="inline-flex min-w-6 min-h-6">
        <slot name="action"></slot>
      </div>
    </nav>
  </slot>
  </div>
</template>


<script setup>
import { App } from '@capacitor/app';


const title = useState("title", () => "Welcome");
const { isLoggedIn } = useAuth();

const router = useRouter();

function back() {
  router.back();
}

</script>
