<template>
  <template v-if="(data == null || data == undefined || data.length == 0)">
    <ClientOnly>
      <Vue3Lottie class="inset-0 flex items-center justify-center flex-1 h-auto " :animationData="DogJSON" :height="200" :width="200" />
    </ClientOnly>
  </template>
    <slot v-else/>
</template>

<script setup lang="ts">
import DogJSON from '~/assets/json/loading.json'

defineProps({
  data:Object
})
</script>