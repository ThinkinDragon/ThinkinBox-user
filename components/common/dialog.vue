<template>
    <div class="inline-flex h-64 flex-col items-start justify-start rounded-2xl bg-gray-50 dark:bg-gray-900">
        <div class="h-10 w-full flex flex-auto justify-center self-center items-center rounded-t-lg bg-primary-500">
          <img class="h-24" :src="config.public.BASE_IMAGE_URL + setting?.home_logo" alt="request?.service_type?.marker" srcset="">
        </div>
        <div class="flex w-full flex-col items-center justify-center space-y-6 px-8 py-5">
          <p class="text-center text-xl text-gray-900 dark:text-gray-200">{{ dtext }}</p>
          <div class="inline-flex h-10 w-full items-center justify-end space-x-7">
            <button @click="$emit('action:no')" class="flex h-full w-32 items-center justify-center rounded-lg bg-primary-900 px-2.5 py-1.5 shadow">
              <p class="text-2xl text-white dark:text-gray-900">No</p>
            </button>
            <button @click="$emit('action:yes')" class="flex h-full w-32 items-center justify-center rounded-lg bg-primary-500 px-2.5 py-1.5 shadow">
              <p class="text-2xl text-white dark:text-gray-900">Yes</p>
            </button>
          </div>
        </div>
      </div>
</template>

<script setup lang="ts">

const setting = useSetting()
  const config = useRuntimeConfig()
interface Props {
  dtext: string;
}
defineProps<Props>();

defineEmits(['action:yes','action:no']);
</script>
