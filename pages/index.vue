<template>
  <div>
    <NuxtLayout name="map">
      <div v-show="user == null" class="overlay">

        </div>
      <template #topnav>
        <div class="mobile-navbar-header block">
          <div class="container mx-auto px-5 lg:px-0 flex items-center justify-between py-2">
            <button @click="openNav()" class="text-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 p-2 rounded-lg shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span class="select-none font-black text-gray-800 text-2xl cursor-pointer">{{ $config.APP_NAME }}</span>
            <button @click="recenter()" class="text-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 p-2 rounded-lg">
              <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 block md:hidden">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
              </svg> -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              
            </button>
          </div>
        </div>
      </template>
      <template #subnav>
        <ClientOnly >
          <div class="flex flex-row space-x-2 items-center shadow-xl justify-around p-2 bg-gray-100 dark:bg-gray-800 border rounded-lg">
            <div class="flex w-10 flex-col space-y-2 items-center justify-center">
                <div class="flex w-4 h-4 bg-primary rounded-full" />
                <div class="transform -rotate-90 w-8 h-1 bg-white dark:bg-gray-900 rounded-full" />
                <svg class="w-full h-6 rounded-full" viewBox="0 0 13 16" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M6.07107 15.8952C6.68708 15.8952 9.62049 12.2114 10.3438 11.0379C11.4557 9.23407 12.1421 8.16692 12.1421 6.17557C12.1421 2.8226 9.42404 0.104492 6.07107 0.104492C2.71811 0.104492 0 2.8226 0 6.17557C0 8.17728 0.63608 9.23732 1.74425 11.0379C2.51662 12.2929 5.45507 15.8952 6.07107 15.8952Z"
                        fill="#F52D56" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M6.07118 8.90408C7.74766 8.90408 9.10672 7.54503 9.10672 5.86854C9.10672 4.19206 7.74766 2.83301 6.07118 2.83301C4.3947 2.83301 3.03564 4.19206 3.03564 5.86854C3.03564 7.54503 4.3947 8.90408 6.07118 8.90408Z"
                        fill="white" />
                </svg>
            </div>
            <div class="flex flex-col w-full justify-end ">
                <ClientOnly >
                  <nuxt-link  :to="`/single-address?for=none&input=pick&goto=/services/items`">
                      <FormSingleAddressForm label="address" :street="form.s_map_address"
                          v-model:street="form.s_building" v-model:latitude="form.s_latitude"
                          v-model:longitude="form.s_longitude" v-model:map_address="form.s_map_address" />
                  </nuxt-link>
                  <div class="w-full h-0.5 border-1 border-gray-300 bg-gray-300 "></div>
    
                  <nuxt-link  :to="`/single-address?for=none&input=drop&goto=/services/items&newAdd=true`">
                      <FormSingleAddressForm label="address" :street="form.d_map_address"
                          v-model:street="form.d_building" v-model:latitude="form.d_latitude"
                          v-model:longitude="form.d_longitude" v-model:map_address="form.d_map_address" />
                  </nuxt-link>
                </ClientOnly>

            </div>

        </div>
      </ClientOnly >

      </template>
      <ClientOnly >

        <div class="bg-white/60 dark:bg-gray-900/60 fixed left-0 bottom-0 items-center w-full py-5 px-2 space-y-2 p-2">
          <LoadingData :data="tags">
            <div class="grid grid-cols-2 gap-2">
              <NuxtLink v-for="category in tags" :key="category?.id" :to="`/single-address?for=${category?.for}&input=drop&goto=/services/items&newAdd=true`" >
                <div class="inline-flex text-black flex-col w-full max-w-1/3 space-y-0.5 items-center justify-evenly">
                  <svg v-if="!category?.image" class="w-16 h-16" viewBox="0 0 105 116" fill="none"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <rect width="105" height="116" rx="10" fill="url(#pattern0)" />
                    <defs>
                      <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#image0_86_8452" transform="translate(-0.052381) scale(0.0172619 0.015625)" />
                      </pattern>
                      <image id="image0_86_8452" width="64" height="64"
                        xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAONJREFUeF7t20EOhEAIRFG4/6F7DvEnYeFzryQIv6pBd2behOu9dPvsbog+k+NLgArQAqmJcw9iAAhSgZKB3IJkkAySQTJ4CiE+gA8oBeg0mH3Ai084P89HhqwEqIA209ICsQdjAeaZIgaAYKxBDMCAYy8fXwAIgiAIcoJpJEYGI4VjB3YrbC9gL2AvkCB43cM5PgZgAAZgQFnNZAhdGykQBEEQBEEQDBmgAm2glM/z+QUYisYUGoldO7kY32IEAzCg6RgIRgjFAsw+AgRBMNYgBmCAT2TCYfoPPz/HCqQCX1eBHzHnv7C7WhBSAAAAAElFTkSuQmCC" />
                    </defs>
                  </svg>
                  <img v-else :src="config.public.BASE_IMAGE_URL + category?.image" alt="" srcset="" class="w-14 h-12 rounded-xl" />
                  <p class="text-xs dark:text-white font-medium">{{ $_api_(category?.name) }}</p>
                </div>
              </NuxtLink>
            </div>
        </LoadingData>
        </div>
      </ClientOnly>
    </NuxtLayout>
    <ClientOnly >
    <teleport to='body' >
      <MainMobileSidebar style="
      pointer-events: auto;"  />
        </teleport>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import type { SwipeInstance } from "vant";
import { useGoogleGeocode } from "~/composables/googleGeocode";
import { watchThrottled } from '@vueuse/core'

definePageMeta({  
  key: (route) => route.fullPath,
  layout: false,
  middleware: ['auth']
});
const title = useState("title");

const route = useRoute()
const router = useRouter()

const { useService, getBanner } = useHome();
const { useUser } = useAuth();
const config = useRuntimeConfig();
const sto = useLoading()
const { loading, silentLoading } = storeToRefs(sto)

const swipeRef2 = ref<SwipeInstance>();
// declare store variable
const store = useService();
const store2 = useUser();
const { banners, tags, tag, services, estimate } = storeToRefs(store);
const { show,stage,user } = storeToRefs(store2);
const { useBookings } = useBooking();
const book = useBookings();
const { provider,booking } = storeToRefs(book);

const coordinates = ref();
const form = useAddress();
const {s_map_address, s_latitude, s_longitude } = storeToRefs(form);
const { currPos, d_map_address, d_latitude, d_longitude  } = storeToRefs(useAddress());
const {addresses  } = storeToRefs(useDeliveryAddresses());
const { platform } = useFirebase();
const notif = useLocalNotification();
let geocoder;

const isNavActive = useIsNavActive()
const isNavDeactive = useIsNavDeactive()
const isOpen = useSheetToggle()

const map = inject('map')
const options = inject('mapOptions')
const {clearMap,reloadMap}= useMapFunction(map.value);

onMounted(async () => {
  title.value = "Welcome"
  await map.value.enableCurrentLocation(true);

  stage.value = 0;
  recenter();
  closeNav();
  
  tag.value = null
  d_map_address.value = "" 
  d_latitude.value = 0
  d_longitude.value = 0
  addresses.value = []
            estimate.value = null
  await clearMap();
  if (tags.value != null) {
      tag.value = tags.value[0]
    }
  //console.log(options.value);
  //map.value = await reloadMap(options.value);

  store.getProvidersData();
  await useUser().setUser();

  locationWatcher();
});

const locationWatcher = watchThrottled(s_map_address,() => {
    
    if (s_map_address.value == "") {
      onRefresh()
    }
    // if (booking.value == null) {
    //   clearMap();
    // }

  },{throttle:1000})

async function getLive() {
  
  if (currPos.value?.lat == undefined) return;
  try {
    geocoder = useGoogleGeocode();
      s_latitude.value = currPos.value.lat;
      s_longitude.value = currPos.value.lng;
      var c = {lat: currPos.value.lat,lng: currPos.value.lng};
      await geocoder
        .geocode( currPos.value.lat,currPos.value.lng)
        .then((response) => {
          
          if (response.results[0]) {
            s_map_address.value = response.results[0].formatted_address;
          } else {
            //window.alert("No results found");
          }

          sto.shide()
        })

  } catch (error) {
    console.log(error);
  }



}
async function onRefresh() {
  if (store2.isLoggedIn) {
    await store2.setUser();
    await useUser().getPromocode();
  }
}

async function openNav() {
  if (isNavActive.value) return;
  isNavActive.value = true
  isOpen.value = false
  //isNavDeactive.value = false
}
async function closeNav() {
  if (!isNavActive.value) return;
  isOpen.value = true;
      isNavActive.value = false
      //bodyTag.classList.remove('active-navbar-body')
}

async function setServiceAddress(post:any) {
  tag.value = post

  return router.push(`/services/items?for=${post?.for}&input=drop`);
}

async function recenter() {
      await map.value?.setCamera({
      coordinate: currPos.value,
      duration: 5000,
      zoom: 16
    });
    await getLive();
}
</script>

<style>
.overlay {
  height: 100svh;
  width: 100svh;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgb(255, 255, 255);
  background-color: rgb(255, 255, 255);
  overflow-x: hidden;
  transition: 0.5s;
}
</style>