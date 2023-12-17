<template>

    <TabGroup>
        <TabList class="flex flex-wrap p-1 space-x-1">
            <Tab v-for="category in services" as="template" :key="category" v-slot="{ selected }">
                <template v-if="category.service_type != null">
                    <button :class="[
                        ' w-fit rounded-md p-1 text-xs font-bold leading-5 m-1 border-2',
                        selected
                            ? ' text-white dark:text-gray-900 bg-slate-500 border rounded-full '
                            : ' border rounded-full text-slate-700 border-slate-500',
                    ]">
                        {{ $_api_(category.service_type.name) }}
                    </button>
                </template>

            </Tab>
        </TabList>

        <TabPanels class="mt-2">
            <TabPanel v-for="(posts, idx) in services" :key="idx" :class="[
                'rounded-xl bg-gray-50 dark:bg-gray-900 p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-slate-400 ',
            ]">
                <p class="flex mt-1 space-x-1 text-sm font-normal leading-4 rounded-md p-2 border-2 text-gray-500">
                    <span class="font-bold">{{ $_api_(posts.service_type.name) }}</span><br>{{ $_api_(posts.service_type.description) }}
                </p>
                <slot />
            </TabPanel>
        </TabPanels>
    </TabGroup>

</template>
  
  <script setup>
  import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
  
  defineProps(['services']);
  
  </script>
  