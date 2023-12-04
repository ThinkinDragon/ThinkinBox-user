<template>
    <div>
        <NuxtLayout name="single">
            <div class="container px-2 py-8 mx-auto">
              <Title>{{ title }}</Title>
                  <div class="space-y-16">
                      <div class="relative h-56 m-auto text-white dark:text-gray-900 transition-transform transform bg-accent  shadow-2xl w-96 rounded-xl hover:scale-110">
                      
                          <img class="relative object-cover w-full h-full rounded-xl" src="https://i.imgur.com/kGkSg1v.png">
                          
                          <div class="absolute w-full px-8 top-8">
                              <div class="flex justify-between">
                                  <div class="">
                                      <p class="font-light">
                                          Name
                                      </p>
                                      <p class="font-medium tracking-widest">
                                          Karthik P
                                      </p>
                                  </div>
                                  <img class="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png"/>
                              </div>
                              <div class="pt-1">
                                  <p class="font-light">
                                      Card Number
                                  </p>
                                  <p class="font-medium tracking-more-wider">
                                      4642  3489  9867  7632
                                  </p>
                              </div>
                              <div class="pt-6 pr-6">
                                  <div class="flex justify-between">
                                      <div class="">
                                          <p class="text-xs font-light">
                                              Valid
                                          </p>
                                          <p class="text-sm font-medium tracking-wider">
                                              11/15
                                          </p>
                                      </div>
                                      <div class="">
                                          <p class="text-xs font-light">
                                              Expiry
                                          </p>
                                          <p class="text-sm font-medium tracking-wider">
                                              03/25
                                          </p>
                                      </div>
              
                                      <div class="">
                                          <p class="text-xs font-light">
                                              CVV
                                          </p>
                                          <p class="text-sm font-bold tracking-more-wider">
                                              ···
                                          </p>
                                      </div>
                                  </div>
                              </div>
              
                          </div>
                      </div>
              
                      <div class="relative h-56 m-auto text-white dark:text-gray-900 transition-transform transform bg-accent  shadow-2xl w-96 rounded-xl hover:scale-110">
                          
                          <img class="relative object-cover w-full h-full rounded-xl" src="https://i.imgur.com/Zi6v09P.png">
                          
                          <div class="absolute w-full px-8 top-8">
                              <div class="flex justify-between">
                                  <div class="">
                                      <p class="font-light">
                                          Name
                                      </p>
                                      <p class="font-medium tracking-widest">
                                          Karthik P
                                      </p>
                                  </div>
                                  <img class="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png"/>
                              </div>
                              <div class="pt-1">
                                  <p class="font-light">
                                      Card Number
                                  </p>
                                  <p class="font-medium tracking-more-wider">
                                      4642  3489  9867  7632
                                  </p>
                              </div>
                              <div class="pt-6 pr-6">
                                  <div class="flex justify-between">
                                      <div class="">
                                          <p class="text-xs font-light">
                                              Valid
                                          </p>
                                          <p class="text-sm font-medium tracking-wider">
                                              11/15
                                          </p>
                                      </div>
                                      <div class="">
                                          <p class="text-xs font-light">
                                              Expiry
                                          </p>
                                          <p class="text-sm font-medium tracking-wider">
                                              03/25
                                          </p>
                                      </div>
              
                                      <div class="">
                                          <p class="text-xs font-light">
                                              CVV
                                          </p>
                                          <p class="text-sm font-bold tracking-more-wider">
                                              ···
                                          </p>
                                      </div>
                                  </div>
                              </div>
              
                          </div>
                      </div>
                  </div>
            </div>
            </NuxtLayout>
    </div>

</template>

<script setup>
definePageMeta({
  
  layout: false,
});
const title = useState('title')
title.value = "Card"
</script>
