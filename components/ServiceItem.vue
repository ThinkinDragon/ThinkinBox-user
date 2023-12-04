<template>
  <div class="inline-flex flex-col w-full">
    <h5 class="my-1 text-xl font-bold">{{ servic.name }}</h5>
    <div :class="servic?.active_service_types?.lenth > 2 ?'grid-rows-2':'grid-rows-1'" class="grid grid-flow-col grid-rows-2 gap-4 overflow-x-scroll">

        <NuxtLink :to="`/services/${service.id}`" prefetch v-for="service in servic.active_service_types"
        :key="service" class="relative inline-flex flex-col items-center justify-center w-40 space-y-3 overflow-hidden rounded-2xl">
          <div class="flex h-full flex-1 items-start justify-start w-full rounded-2xl pl-2 pr-16 pt-2.5 pb-32 overflow-hidden bg-center bg-no-repeat bg-cover" :style="{ backgroundImage: 'url(' + config.public.BASE_IMAGE_URL+service.image + ')' }">
            <!-- <div class="flex flex-1 items-center w-10 justify-center rounded-full bg-accent  px-2 py-0.5 shadow">
              <p class="flex flex-row text-xs font-semibold text-white dark:text-gray-900">{{ service.rating }}</p>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1.5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
            </div> -->
          </div>
        <p class="text-sm font-semibold text-center text-gray-800 line-clamp-1">{{ $_api_(service.name) }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { format } from 'date-fns'
  const config = useRuntimeConfig()
const props = defineProps({
  servic: Object,
})
</script>
