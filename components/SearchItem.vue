<template>
        <NuxtLink :to="`/services/${service.id}`" class="inline-flex flex-col items-center justify-center py-4 rounded-2xl">
        <div class="flex flex-col items-center justify-center w-20 h-28">
          <img class="h-20 rounded-full" :src="config.public.BASE_IMAGE_URL + service.marker" />
          <p class="mt-2 text-xs font-thin leading-normal line-clamp-1">{{ $_api_(service.name) }}</p>
        </div>
      </NuxtLink>
</template>

<script setup>
import { format } from 'date-fns'
  const config = useRuntimeConfig()
const props = defineProps({
  service: Object,
})
</script>
