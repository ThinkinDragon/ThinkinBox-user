<script setup lang="ts">
const { useService } = useHome();
const { goods, selectedGood } = storeToRefs(useService());

defineProps(['type']);

const config = useRuntimeConfig();

const openList = ref(false);

const handleSelectedGoodChange = (newSelected:any, oldSelected:any) => {
  if (newSelected !== oldSelected) {
    openList.value = false;
  }
};

const selectedGoodWatcher = computed(() => {
  return selectedGood.value;
});

//selectedGoodWatcher.watch(handleSelectedGoodChange);

watch(selectedGood, async (newSelected, oldSelected) => {
  if (newSelected !== oldSelected) {
    openList.value = false
  }
})

watchEffect(() =>  {
  console.log("here");
  useHead({
    bodyAttrs: {
      style: `pointer-events: ${openList.value ?'auto':'none'} !important;`,
    }
  })
})

</script>

<template>
    <template v-if="type === 'select'">
        <UModal class="z-[99999999] p-2"  v-model="openList">
          <div class="flex flex-col p-4 gap-2" >
            <UButton v-for="good in goods" :key="good.id" @click="selectedGood = good" variant="ghost">
              <UAvatar v-if="good.image" :src="config.public.BASE_IMAGE_URL + good.image" size="md" />
              <div class="flex flex-col justify-start font-mono text-start">
                <div class="font-bold justify-start text-sm text-gray-900 dark:text-white">{{ $_api_(good.name) }}</div>
                <div>{{ $_api_(good.description) }}</div>
              </div>
            </UButton>
          </div>
        </UModal>
      <div class="flex mt-2">Good Type:</div>

      <UButton @click="openList = !openList" variant="link" block>
        <UAvatar v-if="selectedGood.image" :src="config.public.BASE_IMAGE_URL + selectedGood.image" size="xl" />
        <div class="flex flex-col">
          <div class="font-bold text-sm text-gray-900 dark:text-white">{{ $_api_(selectedGood.name) }}</div>
          <div>{{ $_api_(selectedGood.description) }}</div>
        </div>
        <template #trailing>
          <UIcon name="i-heroicons-chevron-double-down-20-solid" size="xl" />
        </template>
      </UButton>
    </template>
    <div class="flex flex-row" v-else>
      <div class="flex mt-2">Good Type:</div>
      <UButton disable variant="ghost">
        <UAvatar v-if="selectedGood.image" :src="config.public.BASE_IMAGE_URL + selectedGood.image" size="sm" />
        <div class="flex flex-col ">
          <div class="font-bold text-sm text-gray-900 dark:text-white">{{ $_api_(selectedGood.name) }}</div>
        </div>
      </UButton>
    </div>

</template>