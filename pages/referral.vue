<template>
  <div>
    <NuxtLayout name="single">
      <div class="container items-center justify-center py-8 mx-auto">
        <Title>{{ title }}</Title>
        <div class="flex flex-col items-center justify-center mx-2 mt-24 space-y-4">
          <img src="~/assets/image/referral.svg" alt="" />
          <!-- <div class="inline-flex text-xl font-bold">Can I help You</div>
    
          <div class="inline-flex items-center text-sm font-bold text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</div> -->
    
          <div class="inline-flex items-center justify-center space-x-10">
            <p class="text-base font-medium leading-normal text-center">{{ $__("Your Referral id") }}</p>
            <div class="flex items-center justify-start w-32 h-full py-3 pl-4 pr-10 bg-gray-50 dark:bg-gray-900 border border-gray-300 rounded-lg bg-opacity-40">
              <p class="text-base leading-normal text-gray-500">{{user.referral_unique_id}}</p>
            </div>
          </div>
          <div class="flex flex-col items-start justify-center space-y-4">
            <!-- <p class="w-full text-xl font-semibold leading-normal text-center text-gray-900 dark:text-gray-200">{{ $__("Referral Code") }}</p> -->
            <p class="w-full text-xs leading-snug text-center text-gray-500 ">
                <div v-html="user.referral_text"></div>
            </p>
                    <p class="w-full text-xs leading-snug text-center text-gray-500 ">
                <div v-html="user.referral_total_text"></div>
            </p>
            
          </div>
          <UButton @click="sharee" class="w-full px-8 py-4">
            <p class="flex-1 text-base font-semibold leading-normal text-center text-white dark:text-gray-900">{{ $__("Share") }}</p>
          </UButton>
    
        </div>
      </div>
      </NuxtLayout>
  </div>

</template>

<script setup>
import { storeToRefs } from 'pinia';
import { Share } from "@capacitor/share";

definePageMeta({
  
  layout: false,
});

const { $__ } = useNuxtApp()
const title = useState("title");
const setting = useSetting()
const { user } = storeToRefs(useUser())
title.value = $__("Referral")

async function sharee() {
  await Share.share({
    title: "I tried new shaeen app",
    text: "Really awesome service app, use my referral code at register : "+user.value.referral_unique_id,
    url: "https://linktr.ee/vigoapp",
    dialogTitle: "Share with buddies",
  });
}
</script>
