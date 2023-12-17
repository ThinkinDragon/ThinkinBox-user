<template>
  <div class="flex flex-col h-screen">
    <!-- <div class="z-10 w-full space-y-3 overflow-y-scroll  md:border-8 md:shadow-2xl h-[100svh] sm:border-gray-800 md:max-w-sm"> -->
      <header class=" bg-gray-50 dark:bg-gray-900 bg-gradient-to-b from-primary-300/80 to-gray-50/transparent items-center">
        <MainMobileNav>
        <template v-slot:main>
          <slot name="nav"></slot>
        </template>
        <slot>
          <slot name="center"></slot>
        </slot>
      </MainMobileNav>
    </header>
    <main class="flex-1 relative pt-4 overflow-y-auto bg-gray-50 dark:bg-gray-900 px-5 pointer-events-auto">
      <slot />
    </main>
    <footer class="py-5 bg-gray-50 dark:bg-gray-900 text-center">
    <slot name="bottom"></slot>
    </footer>
  </div>
</template>
<script setup lang="ts">

import { useWindowSize } from "@vueuse/core";
const { width, height } = useWindowSize();
</script>
