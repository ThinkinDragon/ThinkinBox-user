<template>
    <van-swipe ref="swipeRef" id="swipeRef" :loop="false" lazy-render>
      <van-swipe-item>
        <div class="flex flex-col items-center justify-center mt-6 space-y-4">
          <img priority src="/slider/img1.png" alt="" class="object-contain h-[70vh]" />
          <div class="inline-flex text-xl font-bold">{{ $__("api.user.slider.title.1") }}</div>
          <div class="inline-flex font-bold">{{ $__("api.user.slider.desc.1") }}</div>
          <nuxt-link to="/set-address"
            class="invisible flex items-center justify-between rounded-xl bg-primary px-5 py-2.5 shadow">
            <p class="text-sm text-center text-gray-50">{{ $__("set location") }}</p>
          </nuxt-link>
        </div>
        <!-- <img :src="image" /> -->
      </van-swipe-item>
      <van-swipe-item>
        <div class="flex flex-col items-center justify-center mt-6 space-y-4">
          <img priority src="/slider/img2.png" alt="" class="object-contain h-[70vh]" />
          <div class="inline-flex text-xl font-bold">{{ $__("api.user.slider.title.2") }}</div>
          <div class="inline-flex font-bold">{{ $__("api.user.slider.desc.2") }}</div>
          <nuxt-link to="/set-address"
            class="invisible flex items-center justify-between rounded-xl bg-primary px-5 py-2.5 shadow">
            <p class="text-sm text-center text-gray-50">{{ $__("set location") }}</p>
          </nuxt-link>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="flex flex-col items-center justify-center mt-6 space-y-4">
          <img priority src="/slider/img3.png" alt="" class="object-contain h-[70vh]" />
          <div class="inline-flex text-xl font-bold">{{ $__("api.user.slider.title.3") }}</div>
          <div class="inline-flex font-bold">{{ $__("api.user.slider.desc.3") }}</div>
        </div>
      </van-swipe-item>
      <template #indicator="{ active, total }">
        <div class="flex flex-row justify-between h-full">
          <!-- <a class="inline-block py-5 text-base font-medium leading-4 text-center text-gray-500 rounded-md px-7" @click="show = !show">skip</a> -->
          <UButton size="lg" v-if="active + 1 === total" to="/login" @click="() => { show = !show; }" class="w-full justify-center self-center">
            {{ $__("Get Started") }}
          </UButton>
  
          <UButton  size="lg" v-else
            class="inline-block  text-base font-medium leading-4 text-center text-white dark:text-gray-900 w-full  px-7"
            @click="swipeRef.next()">{{ $__("next") }}</UButton>
  
        </div>
      </template>
    </van-swipe>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { type SwipeInstance } from "vant";

const { useUser } = useAuth();
const store2 = useUser();
const { show } = storeToRefs(store2);
const { slider_1, slider_2, slider_3 } = storeToRefs(useSetting());
const config = useRuntimeConfig();

const swipeRef = ref<SwipeInstance>();
</script>

<style>
  .my-swipe {
    height: 100vh;
    height: 100svh;
  }
  .van-swipe-item {
    font-size: 20px;
    text-align: center;
  }
  .van-swipe-item {
    font-size: 20px;
    text-align: center;
  }
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }
</style>