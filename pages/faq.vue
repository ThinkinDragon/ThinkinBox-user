<template>
  <div>
    <NuxtLayout name="single">
      <div class="container px-2 py-8 mx-auto h-fit">
        <Title>{{ title }}</Title>
        <TabGroup>
          <TabList class="flex flex-grow p-1 space-x-1">
            <Tab
              v-for="category in faqs"
              as="template"
              :key="category"
              v-slot="{ selected }"
            >
              <button
                :class="[
                  'w-full rounded-full py-2.5 text-sm font-bold leading-5  border-2',
                  selected
                    ? ' text-white dark:text-gray-900 bg-blue-500 border rounded-full '
                    : ' border rounded-full text-blue-700 border-blue-500',
                ]"
              >
                {{ category.name }}
              </button>
            </Tab>
          </TabList>
    
          <TabPanels class="mt-2">
            <TabPanel
              v-for="(posts, idx) in faqs"
              :key="idx"
              :class="[
                'rounded-xl bg-white dark:bg-gray-900 p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 ',
              ]"
            >
              <ul>
                <li
                  v-for="post in posts.faqs"
                  :key="post.id"
                  class="relative p-3 rounded-md hover:bg-gray-100"
                >
                  <h3 class="text-base font-medium leading-5">
                    {{ post.question }}
                  </h3>
                  <p class="flex mt-1 space-x-1 text-sm font-normal leading-4 text-gray-500">
                    {{ post.answer }}
                  </p>
                </li>
              </ul>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
      </NuxtLayout>
  </div>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { storeToRefs } from 'pinia';
definePageMeta({
  
  layout: false,
});
const title = useState('title')
title.value = "Faq"
const {faqs} = storeToRefs(useSetting())
</script>
