<template>
  <div>
    <NuxtLayout name="single">
      <div class="container items-center justify-center py-8 mx-auto">
        <Title> {{ title }}</Title>
        <div class="flex flex-col items-center justify-center mt-32 space-y-4">
          <img src="~/assets/image/support.svg" alt="" />
          <div class="inline-flex text-xl font-bold">{{ $__("How can we help you") }}</div>
    
          <div class="inline-flex items-center text-sm font-bold text-center">{{ $__("Help & suggestions like business, Is better with multiple partners. Contact us any time any place")}}</div>
    
          <div class="inline-flex flex-row space-x-3">
            <a :href="`tel:${setting.contact_number}`" class="flex items-center justify-between p-5 bg-primary rounded-full shadow">
              <img src="~/assets/image/icon/call.svg" alt="" />
            </a>
    
            <a href="https://linktr.ee/vigoapp" class="flex items-center justify-between p-5 bg-primary rounded-full shadow">
              <img src="~/assets/image/icon/web.svg" alt="" />
            </a>
    
            <a  :href="`mailto:${setting.contact_email}`" class="flex items-center justify-between p-5 bg-primary rounded-full shadow">
              <img src="~/assets/image/icon/mail.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>

</template>

<script setup>
  const { $__ } = useNuxtApp()
definePageMeta({
  
  layout: false,
});
const title = useState("title");
const setting = useSetting()
title.value = $__("Contact Us")
</script>
