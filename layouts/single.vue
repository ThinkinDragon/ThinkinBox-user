<template>
  <div class="flex flex-col h-screen">
    <!-- <div class="z-10 w-full space-y-3 overflow-y-scroll  md:border-8 md:shadow-2xl h-[100svh] sm:border-gray-800 md:max-w-sm"> -->
      <header class=" bg-white dark:bg-gray-900 items-center">
        <MainMobileNav>
        <template v-slot:main>
          <slot name="nav"></slot>
        </template>
        <slot>
          <slot name="center"></slot>
        </slot>
      </MainMobileNav>
    </header>
    <main class="flex-1 relative overflow-y-auto bg-white dark:bg-gray-900 px-5 pointer-events-auto">
      <slot />
    </main>
    <footer class="py-5 bg-white dark:bg-gray-900 text-center">
    <slot name="bottom"></slot>
    </footer>
  </div>
</template>
<script setup lang="ts">

import { useWindowSize } from "@vueuse/core";
const { width, height } = useWindowSize();
</script>
