<template>
  <div>
    <NuxtLayout name="single">
      <div class="container px-2 py-8 mx-auto">
        <Title>{{ title }}</Title>
        <div v-html="privacy.value"></div>
      </div>
      </NuxtLayout>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
definePageMeta({
  
  layout: false,
});

const title = useState('title')
title.value = "Privacy Policy"

const {privacy} = storeToRefs(useSetting())
</script>
