<template>
  <div class="flex overflow-x-scroll -mb-2 hide-scroll-bar">
    <div class="flex flex-nowrap gap-2 ">
      <div :class="[
        ' px-3 m-1 w-24 h-24 justify-center items-center inline-block max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition duration-300 ease-in-out',
        value === item ? 'bg-primary-300 dark:bg-primary-900' : 'bg-white dark:bg-gray-900',
        value === item ? 'ring-2 ring-primary-200 dark:ring-primary-800' : 'ring-1 ring-primary-200 dark:ring-primary-800',
        value === item ? 'shadow' : '',
      ]
        " v-for="(item, index) in items" :key="index" @click="value = item">
        

        <img class="w-16 h-12" :src="config.public.BASE_IMAGE_URL + item.image" alt="" srcset="" />
        <div class="flex flex-row truncate text-xs text-center w-full items-center justify-center">
          <UIcon v-if="value === item" name="i-heroicons-information-circle-solid" />

          {{ $_api_(item.name) }}

        </div>
        <div v-if="value === item" class="inline-flex items-center justify-center rounded-full bg-blue-500 px-2 py-0.5 w-fit shadow">
          <p class="flex flex-row text-xs font-semibold text-white dark:text-gray-900">
            {{ item?.rating ?? 0 }}

            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1.5 text-yellow-300" viewBox="0 0 20 20"
              fill="currentColor">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </p>
        </div>
      </div>
    </div>
  </div>
  <teleport to='body' >
    <UModal class="z-[999999] p-2" style="
    pointer-events: auto;" v-model="showDesc">
      <UCard>
        <template #header>
          {{ $_api_(value?.name ?? "") }}
        </template>
        {{ $_api_(value?.description ?? "") }}
        <template #footer>
          <UButton label="Close" color="red" @click="showDesc = false" />
        </template>
      </UCard>
    </UModal>
    </teleport>
</template>

<script lang="ts" setup>
const props = defineProps(['modelValue', 'items'])
const emit = defineEmits(['update:modelValue', 'ser'])
const config = useRuntimeConfig()
const showDesc = ref(false);
const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    if (props.modelValue === value) {
      showDesc.value = true
    }
    emit('update:modelValue', value)
    emit('ser', value.id)
  }
})

</script>