<template>
  <div>
    <NuxtLayout name="map">
      <template #nav>
        <MainLocation>
          <!-- <svg @click="getLive()" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg> -->
        </MainLocation>
      </template>
      <div class="items-center w-auto py-5 mx-2 space-y-2">
          <TabGroup>
            <TabList class="flex space-x-1 rounded-xl p-1">
              <Tab v-for="category in tags" as="template" :key="category.id" v-slot="{ selected }">
                <div class="inline-flex text-black flex-col w-full max-w-1/3 space-y-0.5 items-center justify-evenly">
                  <svg v-if="!category.image" class="w-16 h-16" viewBox="0 0 105 116" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <rect width="105" height="116" rx="10" fill="url(#pattern0)" />
                    <defs>
                      <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#image0_86_8452" transform="translate(-0.052381) scale(0.0172619 0.015625)" />
                      </pattern>
                      <image id="image0_86_8452" width="64" height="64" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAONJREFUeF7t20EOhEAIRFG4/6F7DvEnYeFzryQIv6pBd2behOu9dPvsbog+k+NLgArQAqmJcw9iAAhSgZKB3IJkkAySQTJ4CiE+gA8oBeg0mH3Ai084P89HhqwEqIA209ICsQdjAeaZIgaAYKxBDMCAYy8fXwAIgiAIcoJpJEYGI4VjB3YrbC9gL2AvkCB43cM5PgZgAAZgQFnNZAhdGykQBEEQBEEQDBmgAm2glM/z+QUYisYUGoldO7kY32IEAzCg6RgIRgjFAsw+AgRBMNYgBmCAT2TCYfoPPz/HCqQCX1eBHzHnv7C7WhBSAAAAAElFTkSuQmCC" />
                    </defs>
                  </svg>
                  <img v-else :src="config.public.BASE_IMAGE_URL + category.image" alt="" srcset="" class="w-14 h-12 rounded-xl" />
                  <p class="text-xs font-medium">{{ $_api_(category?.name) }}</p>
                  <div v-if="selected" class="w-3/4 h-0.5 border border-black" />
                </div>
              </Tab>
            </TabList>
  
            <TabPanels class="mt-2">
              <TabPanel v-for="post in tags" :key="post?.id" >
              <div class="flex flex-col space-y-4 justify-start">
                <div class="relative inline-flex h-12 items-center justify-start rounded-lg border bg-gray-50 dark:bg-gray-900 p-4">
                  <svg class="h-5 w-5 rounded-lg" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6 1.99979C4.93913 1.99979 3.92172 2.42122 3.17157 3.17136C2.42143 3.92151 2 4.93892 2 5.99979C2 7.06066 2.42143 8.07807 3.17157 8.82822C3.92172 9.57836 4.93913 9.99979 6 9.99979C7.06087 9.99979 8.07828 9.57836 8.82843 8.82822C9.57857 8.07807 10 7.06066 10 5.99979C10 4.93892 9.57857 3.92151 8.82843 3.17136C8.07828 2.42122 7.06087 1.99979 6 1.99979ZM1.13461e-07 5.99979C-0.00012039 5.05549 0.222642 4.1245 0.650171 3.28253C1.0777 2.44056 1.69792 1.71139 2.4604 1.15432C3.22287 0.597243 4.10606 0.228002 5.03815 0.0766228C5.97023 -0.0747564 6.92488 -0.00399905 7.82446 0.28314C8.72404 0.570279 9.54315 1.06569 10.2152 1.72909C10.8872 2.39248 11.3931 3.20512 11.6919 4.10092C11.9906 4.99672 12.0737 5.95038 11.9343 6.88434C11.795 7.8183 11.4372 8.70619 10.89 9.47579L15.707 14.2928C15.8892 14.4814 15.99 14.734 15.9877 14.9962C15.9854 15.2584 15.8802 15.5092 15.6948 15.6946C15.5094 15.88 15.2586 15.9852 14.9964 15.9875C14.7342 15.9897 14.4816 15.8889 14.293 15.7068L9.477 10.8908C8.57936 11.5291 7.52335 11.9079 6.42468 11.9859C5.326 12.0639 4.22707 11.8379 3.2483 11.3328C2.26953 10.8276 1.44869 10.0628 0.875723 9.12214C0.30276 8.18147 -0.000214051 7.10122 1.13461e-07 5.99979Z" fill="black"/>
                  </svg>
                  <input class="w-full text-xs bg-transparent" placeholder="Send package to "/>
                  <svg class="h-5 w-5 transform rounded-lg" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.25 12.5L6.75 7L1.25 1.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    
                </div>
                <div class="inline-flex items-start justify-start space-x-2">
                  <div class="flex items-center justify-center space-x-2 rounded-full bg-gray-50 dark:bg-gray-900 px-4 py-2 shadow">
                    <svg class="h-full w-5 rounded-lg" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.20692 0.292786C9.01939 0.105315 8.76508 0 8.49992 0C8.23475 0 7.98045 0.105315 7.79292 0.292786L0.792919 7.29279C0.610761 7.48139 0.509966 7.73399 0.512245 7.99619C0.514523 8.25838 0.619692 8.5092 0.8051 8.6946C0.990508 8.88001 1.24132 8.98518 1.50352 8.98746C1.76571 8.98974 2.01832 8.88894 2.20692 8.70679L2.49992 8.41379V14.9998C2.49992 15.265 2.60528 15.5194 2.79281 15.7069C2.98035 15.8944 3.2347 15.9998 3.49992 15.9998H5.49992C5.76514 15.9998 6.01949 15.8944 6.20703 15.7069C6.39456 15.5194 6.49992 15.265 6.49992 14.9998V12.9998C6.49992 12.7346 6.60528 12.4802 6.79281 12.2927C6.98035 12.1051 7.2347 11.9998 7.49992 11.9998H9.49992C9.76514 11.9998 10.0195 12.1051 10.207 12.2927C10.3946 12.4802 10.4999 12.7346 10.4999 12.9998V14.9998C10.4999 15.265 10.6053 15.5194 10.7928 15.7069C10.9803 15.8944 11.2347 15.9998 11.4999 15.9998H13.4999C13.7651 15.9998 14.0195 15.8944 14.207 15.7069C14.3946 15.5194 14.4999 15.265 14.4999 14.9998V8.41379L14.7929 8.70679C14.9815 8.88894 15.2341 8.98974 15.4963 8.98746C15.7585 8.98518 16.0093 8.88001 16.1947 8.6946C16.3801 8.5092 16.4853 8.25838 16.4876 7.99619C16.4899 7.73399 16.3891 7.48139 16.2069 7.29279L9.20692 0.292786Z" fill="black"/>
                      </svg>
                    <p class="text-sm font-medium leading-none">Home</p>
                  </div>
                  <div class="flex items-center justify-center space-x-2 rounded-full bg-gray-50 dark:bg-gray-900 px-4 py-2 shadow">
                    <svg class="h-full w-5 rounded-lg" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.50007 0C6.4392 0 5.42179 0.421427 4.67164 1.17157C3.9215 1.92172 3.50007 2.93913 3.50007 4V5H2.50007C2.25389 4.99998 2.01635 5.09078 1.83294 5.25499C1.64954 5.41921 1.53315 5.64531 1.50607 5.89L0.506069 14.89C0.490602 15.0298 0.504781 15.1712 0.547681 15.3051C0.590582 15.439 0.661239 15.5624 0.75504 15.6671C0.848841 15.7719 0.963677 15.8556 1.09205 15.913C1.22043 15.9704 1.35946 16 1.50007 16H13.5001C13.6407 16 13.7797 15.9704 13.9081 15.913C14.0365 15.8556 14.1513 15.7719 14.2451 15.6671C14.3389 15.5624 14.4096 15.439 14.4525 15.3051C14.4954 15.1712 14.5095 15.0298 14.4941 14.89L13.4941 5.89C13.467 5.64531 13.3506 5.41921 13.1672 5.25499C12.9838 5.09078 12.7463 4.99998 12.5001 5H11.5001V4C11.5001 2.93913 11.0786 1.92172 10.3285 1.17157C9.57835 0.421427 8.56094 0 7.50007 0ZM9.50007 5V4C9.50007 3.46957 9.28935 2.96086 8.91428 2.58579C8.53921 2.21071 8.0305 2 7.50007 2C6.96964 2 6.46093 2.21071 6.08586 2.58579C5.71078 2.96086 5.50007 3.46957 5.50007 4V5H9.50007ZM3.50007 8C3.50007 7.73478 3.60543 7.48043 3.79296 7.29289C3.9805 7.10536 4.23485 7 4.50007 7C4.76529 7 5.01964 7.10536 5.20718 7.29289C5.39471 7.48043 5.50007 7.73478 5.50007 8C5.50007 8.26522 5.39471 8.51957 5.20718 8.70711C5.01964 8.89464 4.76529 9 4.50007 9C4.23485 9 3.9805 8.89464 3.79296 8.70711C3.60543 8.51957 3.50007 8.26522 3.50007 8ZM10.5001 7C10.2349 7 9.9805 7.10536 9.79296 7.29289C9.60543 7.48043 9.50007 7.73478 9.50007 8C9.50007 8.26522 9.60543 8.51957 9.79296 8.70711C9.9805 8.89464 10.2349 9 10.5001 9C10.7653 9 11.0196 8.89464 11.2072 8.70711C11.3947 8.51957 11.5001 8.26522 11.5001 8C11.5001 7.73478 11.3947 7.48043 11.2072 7.29289C11.0196 7.10536 10.7653 7 10.5001 7Z" fill="black"/>
                    </svg>
                    <p class="text-sm font-medium leading-none">Office</p>
                  </div>
                  <div class="flex items-center justify-center space-x-2 rounded-full bg-gray-50 dark:bg-gray-900 px-4 py-2 shadow">
                    <svg class="h-full w-5 rounded-lg" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.55002 2.04987C3.86284 0.737047 5.64341 -0.000488281 7.50002 -0.000488281C9.35663 -0.000488281 11.1372 0.737047 12.45 2.04987C13.7628 3.36269 14.5004 5.14326 14.5004 6.99987C14.5004 8.85648 13.7628 10.637 12.45 11.9499L7.50002 16.8999L2.55002 11.9499C1.89993 11.2998 1.38425 10.5281 1.03242 9.67882C0.680596 8.82949 0.499512 7.91918 0.499512 6.99987C0.499512 6.08056 0.680596 5.17025 1.03242 4.32092C1.38425 3.47159 1.89993 2.69989 2.55002 2.04987ZM7.50002 8.99987C8.03045 8.99987 8.53916 8.78915 8.91423 8.41408C9.2893 8.03901 9.50002 7.5303 9.50002 6.99987C9.50002 6.46944 9.2893 5.96073 8.91423 5.58566C8.53916 5.21058 8.03045 4.99987 7.50002 4.99987C6.96958 4.99987 6.46088 5.21058 6.0858 5.58566C5.71073 5.96073 5.50002 6.46944 5.50002 6.99987C5.50002 7.5303 5.71073 8.03901 6.0858 8.41408C6.46088 8.78915 6.96958 8.99987 7.50002 8.99987Z" fill="black"/>
                      </svg>
                      
                    <p class="text-sm font-medium leading-none">Home</p>
                  </div>
                </div>
                <div v-show="post.banners" class="block m-2">
                  <van-swipe ref="swipeRef2" :autoplay="3000" class="block w-full overflow-x-scroll" lazy-render>
                    <van-swipe-item v-for="banner in post.banners" :key="banner.id"
                      class="inline-flex flex-col items-start justify-center">
                      <img class="justify-center w-screen bg-gray-200 h-44 rounded-2xl"
                        :src="config.public.BASE_IMAGE_URL + banner.url" />
                    </van-swipe-item>
                  </van-swipe>
                </div>
              </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
  
      </div>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { Device } from "@capacitor/device";
import type { SwipeInstance } from "vant";
import { Geolocation } from "@capacitor/geolocation";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

const categories = ref({
  Recent: [
    {
      id: 1,
      title: 'Does drinking coffee make you smarter?',
      date: '5h ago',
      commentCount: 5,
      shareCount: 2,
    },
    {
      id: 2,
      title: "So you've bought coffee... now what?",
      date: '2h ago',
      commentCount: 3,
      shareCount: 2,
    },
  ],
  Popular: [
    {
      id: 1,
      title: 'Is tech making coffee better or worse?',
      date: 'Jan 7',
      commentCount: 29,
      shareCount: 16,
    },
    {
      id: 2,
      title: 'The most innovative things happening in coffee',
      date: 'Mar 19',
      commentCount: 24,
      shareCount: 12,
    },
  ],
  Trending: [
    {
      id: 1,
      title: 'Ask Me Anything: 10 answers to your questions about coffee',
      date: '2d ago',
      commentCount: 9,
      shareCount: 5,
    },
    {
      id: 2,
      title: "The worst advice we've ever heard about coffee",
      date: '4d ago',
      commentCount: 1,
      shareCount: 2,
    },
  ],
})

definePageMeta({
  
  layout: false,
});
const { useService, getBanner } = useHome();

const config = useRuntimeConfig();
const sto = useLoading()
const { loading, silentLoading } = storeToRefs(sto)

const swipeRef2 = ref<SwipeInstance>();
// declare store variable
const store = useService();
const store2 = useUser();
const { banners, tags, services } = storeToRefs(store);
const { show } = storeToRefs(store2);
const { useBookings } = useBooking();
const booking = useBookings();
const { provider } = storeToRefs(booking);

const setting = useSetting();
const coordinates = ref();
const form = useAddress();
const { s_map_address, s_latitude, s_longitude } = storeToRefs(form);
const { currPos } = storeToRefs(useAddress());
const { platform } = useFirebase();
const notif = useLocalNotification();
let geocoder;

onMounted(async () => {
  await useFirebase().device()
  //provider.value = null
  //onRefresh()


  onRefresh()
  watchEffect(() => {
    if (s_map_address.value == "") {
      onRefresh()
    }
  })
});

async function getLive() {

  //if (silentLoading) return;
  //sto.sshow()

  try {

      geocoder = useGoogleGeocode();
      s_latitude.value = currPos.value.lat;
      s_longitude.value = currPos.value.lng;
      var c = {lat:currPos.value.lat, lng:currPos.value.lng}
      await geocoder
        .geocode( c.lat,c.lng)
        .then((response) => {
          if (response.results[0]) {
            s_map_address.value = response.results[0].formatted_address;
          } else {
            window.alert("No results found");
          }
          sto.shide()
        })

  } catch (error) {
    console.log(error);

  }



}
async function onRefresh() {
  //map_address.value = "refreshing address";


  await setting.fetch();
  await getBanner();

  //store.fetchServices();
  if (store2.isLoggedIn) {
    await store2.setUser();

    await useUser().getPromocode();
  }

  //getLive()
}
</script>
