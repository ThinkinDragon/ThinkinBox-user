<template>
  <USlideover :ui="ui"  side="left" v-model="isNavActive">
    <div class="w-full h-full" @click.self="isNavActive = false">
      <div class=" flex-1 w-4/5 bg-gray-50 dark:bg-gray-900 h-full">
        <div class=" lg:px-0">
          <div class="select-none flex flex-col md:flex-row justify-between md:items-center">
            <!-- <div class="select-none logo font-black text-2xl cursor-pointer w-full text-center md:text-left relative">
              <span class="selecet-none">{{ config.public.APP_NAME }}</span>
            </div> -->
            <div class="navbar order-1 md:order-0">
              <ul class="flex flex-col md:flex-row md:items-center md:space-x-2">

                <!-- <theme /> :ui="{ background: 'bg-white/20 dark:bg-gray-900/20' }" -->
                <!-- <li><NuxtLink  to="/" class="flex font-semibold text-lg p-3 pl-8 hover:bg-primary hover:bg-opacity-25 transition-all duration-200 md:inline-block items-center gap-2">
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 block md:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </span>
                      <span>{{ $__("Home") }}</span>
                    </NuxtLink></li> -->
                <li>
                  <NuxtLink  to="/booking"
                    class="flex font-semibold text-lg p-3 pl-8 hover:bg-primary hover:bg-opacity-25 transition-all duration-200 md:inline-block items-center gap-2">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 block md:hidden" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </span>
                    <span>{{ $__("Booking") }}</span>
                  </NuxtLink>
                </li>

                <li>
                  <NuxtLink  to="/wallet"
                    class="flex font-semibold text-lg p-3 pl-8 hover:bg-primary hover:bg-opacity-25 transition-all duration-200 md:inline-block items-center gap-2">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6 block">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                      </svg>
                    </span>
                    <span>{{ $__("Wallet") }}</span>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink  to="/notification"
                    class="flex font-semibold text-lg p-3 pl-8 hover:bg-primary hover:bg-opacity-25 transition-all duration-200 md:inline-block items-center gap-2">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 block md:hidden" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </span>
                    <span>{{ $__("Notification") }}</span>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink  to="/language"
                    class="flex font-semibold text-lg p-3 pl-8 hover:bg-primary hover:bg-opacity-25 transition-all duration-200 md:inline-block items-center gap-2">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 block md:hidden" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </span>
                    <span>{{ $__("Language") }}</span>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink  to="/contact"
                    class="flex font-semibold text-lg p-3 pl-8 hover:bg-primary hover:bg-opacity-25 transition-all duration-200 md:inline-block items-center gap-2">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 block md:hidden" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </span>
                    <span>{{ $__("Contact") }}</span>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink  to="/referral"
                    class="flex font-semibold text-lg p-3 pl-8 hover:bg-primary hover:bg-opacity-25 transition-all duration-200 md:inline-block items-center gap-2">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 block md:hidden" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </span>
                    <span>{{ $__("Referral") }}</span>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink  to="/term"
                    class="flex font-semibold text-lg p-3 pl-8 hover:bg-primary hover:bg-opacity-25 transition-all duration-200 md:inline-block items-center gap-2">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 block md:hidden" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </span>
                    <span>{{ $__("Term") }}</span>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink  to="/privacy"
                    class="flex font-semibold text-lg p-3 pl-8 hover:bg-primary hover:bg-opacity-25 transition-all duration-200 md:inline-block items-center gap-2">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 block md:hidden" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                    <span>{{ $__("Privacy") }}</span>
                  </NuxtLink>
                </li>
                <li><button @click="logout()"
                    class="flex font-semibold text-lg p-3 pl-8 hover:bg-primary hover:bg-opacity-25 transition-all duration-200 md:inline-block items-center gap-2">
                    <span>
                      <svg class="h-6 w-6 block md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                        </path>
                      </svg>
                    </span>
                    <span>{{ $__("Logout") }}</span>
                  </button></li>
              </ul>
            </div>
            <div class="flex bg-gradient-to-b from-primary-300/80 to-gray-50/transparent overflow-visible w-full flex-row items-center justify-between px-4 py-12">
              <div  class="flex flex-row items-center">
                <img class="flex items-center w-24 h-24 rounded-full"
                  :src="user?.avatar != null ? config.public.BASE_IMAGE_URL + user?.avatar : avatarStatic" />
                <div class="flex flex-col pl-4 leading-none">
                  <p class="text-xl font-bold">{{ user?.first_name }}</p>
                  <p class="w-full text-xs font-medium leading-none ">{{ user?.email }}</p>
                  <div class="flex flex-row gap-2">
                    <UButton :to="'/profile'" color="gray"
                    variant="ghost">
                      <svg xmlns="http://www.w3.org/2000/svg" class="fill-current" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M9.243 19H21v2H3v-4.243l9.9-9.9 4.242 4.244L9.242 19zm5.07-13.556l2.122-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z" />
                      </svg>
                    </UButton>
                    <ColorPicker />
                    <Theme />
                    <UButton @click="sharee()" color="gray"
                    variant="ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-current" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  </UButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </USlideover>
</template>

<script setup lang="ts">
import avatarStatic from '~/assets/image/avatar.png';
import { storeToRefs } from "pinia";
import { Share } from '@capacitor/share';

const config = useRuntimeConfig();
const isNavActive = useIsNavActive()
const isNavDeactive = useIsNavDeactive()
const isOpen = useSheetToggle()

const { $apiFetch, $__ } = useNuxtApp();
const { removeUser, logout } = useAuth();
const { user } = storeToRefs(useUser());

const ui = {
  background: "bg-white/20 dark:bg-gray-900/20",
}

async function openNav() {
  if (isNavActive.value) return;
  isNavActive.value = true
  isOpen.value = false
  isNavDeactive.value = false
}
async function closeNav() {
  if (!isNavActive.value) return;
  isOpen.value = true;
  isNavActive.value = false
  //bodyTag.classList.remove('active-navbar-body')
  removeDeactiveClass()
}
function removeDeactiveClass() {
  setTimeout(() => {
    isNavDeactive.value = true
  }, 500);
}

async function sharee() {
  await Share.share({
    title: "I tried new shaeen app",
    text: "Really awesome service app you need to see right now",
    url: "https://linktr.ee/vigoapp/",
    dialogTitle: "Share with buddies",
  });
}
</script>