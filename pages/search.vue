<template>
  <div>
    <NuxtLayout name="single">
      <div class="items-center py-4 mx-2 space-y-4 ">
        <Title>{{ title }}</Title>
    
        <InputSearch v-model="searchText" />
    
        <p class="pl-4 text-lg font-semibold text-gray-900 dark:text-gray-200">{{ $__("All Categories") }}</p>
        <div class="grid items-center justify-center w-full grid-cols-3 gap-5 overflow-y-auto">
          <template v-if="searchText != ''">
            <!-- <NuxtLink v-for="service in searchArray" :key="service.id" :to="`/searchServices/${service.id}`" class="inline-flex flex-col items-start justify-center py-4 rounded-2xl">
            <div class="flex flex-col items-center justify-center w-20 h-20">
              <img class="h-full rounded-full" :src="config.public.BASE_IMAGE_URL + service.marker" />
              <p class="mt-4 text-xs font-bold leading-normal">{{ service.name.en }}</p>
            </div>
          </NuxtLink> -->
            <SearchItem v-for="service in searchArray" :key="service.id" :service="service" />
          </template>
          <template v-else>
            <SearchItem v-for="service in searchServices" :key="service.id" :service="service" />
          </template>
        </div>
      </div>
      </NuxtLayout>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

const title = useState("title");
title.value = "Search";
definePageMeta({
  
  layout: false,
});
const config = useRuntimeConfig();
const { $_api_ } = useNuxtApp()
const { useService } = useHome();
// declare store variable
const store = useService();
const { searchText, searchServices, searchArray } = storeToRefs(store);

onMounted(async () => {
  await store.fetchServices();
});

watchEffect(() => {
  if (searchText.value != "") {
    searchArray.value = searchServices.value.filter((service) => {
      return $_api_(service.name).toLowerCase().indexOf(searchText.value.toLowerCase()) != -1;
    });
    searchArray.value.sort(compare);
  }
});

function compare(a, b) {
  if ($_api_(a.name) < $_api_(b.name)) return -1;
  if ($_api_(a.name) > $_api_(b.name)) return 1;

  return 0;
}
</script>
