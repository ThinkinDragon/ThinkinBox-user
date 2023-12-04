<template>
  <div class="flex flex-col mt-2">
    <div class="flex flex-row items-center justify-start space-x-4">
      <img class="w-8" src="~/assets/image/icon_location.svg" alt="location" srcset="" />
      <div class="flex flex-col">
        <p class="text-xs font-medium leading-3 tracking-wider text-gray-500 uppercase">{{ $__("Your Location") }}</p>
        <div class="inline-flex items-center justify-start h-4 mx-2">
          <p class="text-xs font-medium text-center line-clamp-1">{{ form.map_address }}</p>
        </div>
      </div>
      <slot/>
      <div>
        <!-- {{platform(coordinates?.platform)}} -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = useAddress();
</script>
