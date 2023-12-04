<template>
          <div class="w-full p-6">
            <div class="lg:max-w-5xl">
                <img class="h-24" :src="config.public.BASE_IMAGE_URL + setting?.home_logo" alt="" srcset="">
              <h1 class="mb-6 font-bold text-gray-900 font-heading text-7xl md:text-10xl xl:text-12xl">{{setting?.home_title}}</h1>
              <p class="text-lg text-gray-600 mb-9">{{$__(setting?.home_subtitle)}}</p>
              <div class="flex flex-wrap -m-2.5 pb-10 xl:pb-0">
                <div class="w-auto p-2.5">
                  <a :href="setting?.apple_app">
                    <img src="~/assets/logos/brands/app-store-gradient-green.png" alt=""></a>
                </div>
                <div class="w-auto p-2.5">
                  <a :href="setting?.android_app">
                    <img src="~/assets/logos/brands/play-store-gradient-green.png" alt=""></a>
                </div>
              </div>
              <!-- <button
                class="relative w-full px-10 py-5 overflow-hidden text-xs font-semibold text-white dark:text-gray-900 uppercase bg-primary rounded-md group font-heading lg:w-auto tracking-px">
                <div
                  class="absolute top-0 left-0 w-full h-full transition duration-500 ease-in-out transform -translate-x-full bg-gray-800 group-hover:-translate-x-0">
                </div>
                <p class="relative z-10">{{ $__("Connect Now") }}</p>
              </button> -->
            </div>
          </div>
</template>

<script lang="ts" setup>
  const setting = useSetting()
  const config = useRuntimeConfig()
     setting.fetch()
</script>