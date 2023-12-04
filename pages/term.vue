<template>
  <div>
    <NuxtLayout name="single">
      <div class="container px-2 py-8 mx-auto">
        <Title>{{ title }}</Title>
        <div v-html="term.value"></div>
      </div>
      </NuxtLayout>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
const title = useState("title");
title.value = "Terms & Conditions";
definePageMeta({
  
  layout: false,
});
const { term } = storeToRefs(useSetting());
</script>
