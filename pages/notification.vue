<template>
  <div>
    <NuxtLayout name="single">
      <div class="flex flex-col items-center justify-center w-full pt-4 pb-6 space-y-6 bg-white dark:bg-gray-900">
        <div v-if="notifications?.length == 0" class="inline-flex flex-col items-center justify-start py-28">
          <div class="flex flex-col items-center justify-end flex-1 space-y-28">
            <img class="flex-1 rounded-lg w-36 h-28" src="~/assets/image/history.svg" />
    
            <div class="flex flex-col space-y-2.5 items-center justify-end w-full h-1/3">
              <p class="text-xl font-bold leading-relaxed text-center text-gray-900 dark:text-gray-200">{{ $__("No Notification") }}</p>
              <p class="w-full text-sm font-medium leading-normal text-center text-gray-600">{{ $__("There is no announcement done till now") }}</p>
            </div>
          </div>
        </div>
        <div v-else>
          <div v-for="(item, index) in notifications" :key="index" class="inline-flex items-center justify-between w-full h-full">
            <img class="h-16" :src="config.public.BASE_IMAGE_URL + item.image" />
            <p class="text-xs leading-snug text-center opacity-80">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';

const { $__ } = useNuxtApp()

definePageMeta({
  
  layout: false,
  middleware: ["auth"],
});
const title = useState("title");
const config = useRuntimeConfig();
const store = useNotification();
const {notifications} = storeToRefs(store);
onMounted(() => {
  title.value = $__("Notification");
  store.fetch();
});
</script>
