<template>
  <NuxtLink :to="`/services/${service.id}`" prefetch class="inline-flex items-center justify-center w-full pb-2 space-x-4 border-b-2">
    <svg v-if="!service.image" class="w-16 h-16" viewBox="0 0 105 116" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <rect width="105" height="116" rx="10" fill="url(#pattern0)" />
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlink:href="#image0_86_8452" transform="translate(-0.052381) scale(0.0172619 0.015625)" />
        </pattern>
        <image id="image0_86_8452" width="64" height="64" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAONJREFUeF7t20EOhEAIRFG4/6F7DvEnYeFzryQIv6pBd2behOu9dPvsbog+k+NLgArQAqmJcw9iAAhSgZKB3IJkkAySQTJ4CiE+gA8oBeg0mH3Ai084P89HhqwEqIA209ICsQdjAeaZIgaAYKxBDMCAYy8fXwAIgiAIcoJpJEYGI4VjB3YrbC9gL2AvkCB43cM5PgZgAAZgQFnNZAhdGykQBEEQBEEQDBmgAm2glM/z+QUYisYUGoldO7kY32IEAzCg6RgIRgjFAsw+AgRBMNYgBmCAT2TCYfoPPz/HCqQCX1eBHzHnv7C7WhBSAAAAAElFTkSuQmCC" />
      </defs>
    </svg>
    <img else :src="config.public.BASE_IMAGE_URL + service.image" alt="" srcset="" class="w-28 h-28 rounded-xl" />
    <div class="inline-flex w-full flex-col items-start justify-start space-y-1 px-4">
      <div class="flex flex-col items-start justify-start w-full space-y-1">
        <!-- <div class="inline-flex items-center justify-between w-full">
          <div class="flex items-center justify-end w-10 h-4 space-x-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.75712 2.56255C7.17218 1.36847 8.86089 1.36847 9.27595 2.56255L9.9063 4.37599C10.0894 4.90275 10.581 5.25991 11.1386 5.27127L13.058 5.31039C14.3219 5.33615 14.8438 6.94221 13.8364 7.70594L12.3065 8.86583C11.8621 9.20275 11.6743 9.78064 11.8358 10.3144L12.3918 12.152C12.7578 13.362 11.3916 14.3546 10.354 13.6326L8.77811 12.536C8.32035 12.2174 7.71271 12.2174 7.25496 12.536L5.67908 13.6326C4.64143 14.3546 3.27523 13.362 3.6413 12.152L4.19725 10.3144C4.35874 9.78064 4.17097 9.20275 3.72657 8.86583L2.19668 7.70595C1.1893 6.94221 1.71114 5.33615 2.97504 5.31039L4.89451 5.27127C5.45207 5.25991 5.94366 4.90275 6.12676 4.37599L6.75712 2.56255Z" fill="#FFC554" />
            </svg>
            <p class="text-xs font-bold">{{ service?.rating }}</p>
          </div>
        </div> -->
        <p class="w-full text-sm font-semibold text-gray-900 dark:text-gray-200">{{ $_api_(service?.name) }}</p>
      </div>
      <div class="flex h-12 w-36 flex-col items-start justify-end space-y-2.5">
        <div class="inline-flex items-center justify-start w-full space-x-2">
          <p class="flex-1 text-xs font-medium leading-none text-gray-400 line-clamp-2">{{ $_api_(service?.description) }}</p>
        </div>
        <!-- <div class="inline-flex h-6 items-center justify-center rounded-md bg-gray-50 dark:bg-gray-900 px-1.5">
          <p class="text-xs font-semibold text-gray-900 dark:text-gray-200">{{ useUser().getCurrency(service.price) }}</p>
        </div> -->
      </div>
    </div>
    <NuxtLink :to="`/services/${service.id}/partner`" class="flex items-center w-full p-14 m-14 justify-center text-gray-600 flex-1 px-5 py-3">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
      
    </NuxtLink>
  </NuxtLink>
</template>

<script setup lang="ts">
import { format } from "date-fns";
const config = useRuntimeConfig();

const props = defineProps({
  service: Object,
});
</script>
