<template>
  <div>
    <NuxtLayout name="dashboard">

		<div class=" space-y-4 mb-20">
			<h4 class="font-semibold">Category</h4>
			<div class="grid grid-cols-2 place-items-center items-center justify-between overflow-y-scroll text-gray-500 cursor-pointer gap-2">

				<a v-for="category in tags" :key="category?.id"
        @click="goToPage(category)" :style="`background-color: ${category?.color};`" class="relative flex flex-col items-start pl-4 justify-center w-full h-32 rounded-2xl shadow hover:shadow-md cursor-pointer mb-2 p-1 hover:bg-white transition ease-in duration-300">
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
      <img v-else :src="config.public.BASE_IMAGE_URL + category?.image" alt="" srcset=""
        class="absolute bottom-0 right-0 w-28 rounded-xl" />
					<p class="text-sm mt-1 h-full flex justify-start text-start font-bold">{{$_api_(category?.name)}}</p>
				</a>

			</div>

      <LazyLoadingData :data="banners">
        <HomeSlider :images="banners" />
      </LazyLoadingData>

			<h4 class="font-semibold">Recent</h4>
			<div class="grid grid-cols-1">
        <keep-alive>
        
          <LazyLoadingData :data="recentBookings">
            <RequestItem v-for="post in recentBookings" :key="post.id" :request="post" />
  
          </LazyLoadingData>
        </keep-alive>
			</div>
		</div>
      <div v-show="user == null" class="overlay">

      </div>
      <template #full>
        
        <!-- <nav class="p-2 flex flex-grow relative justify-between z-10 items-center mx-auto h-18">
          <div class="inline relative">
            <button type="button" class="inline-flex items-center relative text-gray-300 hover:text-white mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6h16M4 12h8m-8 6h16"></path>
                </svg>
            </button>
          </div>
          <div class="inline-flex">
            <a href="/">
              <div class="hidden">
                <svg width="102" height="32" fill="currentcolor" style="display: block">
                  <path
                    d="M29.24 22.68c-.16-.39-.31-.8-.47-1.15l-.74-1.67-.03-.03c-2.2-4.8-4.55-9.68-7.04-14.48l-.1-.2c-.25-.47-.5-.99-.76-1.47-.32-.57-.63-1.18-1.14-1.76a5.3 5.3 0 00-8.2 0c-.47.58-.82 1.19-1.14 1.76-.25.52-.5 1.03-.76 1.5l-.1.2c-2.45 4.8-4.84 9.68-7.04 14.48l-.06.06c-.22.52-.48 1.06-.73 1.64-.16.35-.32.73-.48 1.15a6.8 6.8 0 007.2 9.23 8.38 8.38 0 003.18-1.1c1.3-.73 2.55-1.79 3.95-3.32 1.4 1.53 2.68 2.59 3.95 3.33A8.38 8.38 0 0022.75 32a6.79 6.79 0 006.75-5.83 5.94 5.94 0 00-.26-3.5zm-14.36 1.66c-1.72-2.2-2.84-4.22-3.22-5.95a5.2 5.2 0 01-.1-1.96c.07-.51.26-.96.52-1.34.6-.87 1.65-1.41 2.8-1.41a3.3 3.3 0 012.8 1.4c.26.4.45.84.51 1.35.1.58.06 1.25-.1 1.96-.38 1.7-1.5 3.74-3.21 5.95zm12.74 1.48a4.76 4.76 0 01-2.9 3.75c-.76.32-1.6.41-2.42.32-.8-.1-1.6-.36-2.42-.84a15.64 15.64 0 01-3.63-3.1c2.1-2.6 3.37-4.97 3.85-7.08.23-1 .26-1.9.16-2.73a5.53 5.53 0 00-.86-2.2 5.36 5.36 0 00-4.49-2.28c-1.85 0-3.5.86-4.5 2.27a5.18 5.18 0 00-.85 2.21c-.13.84-.1 1.77.16 2.73.48 2.11 1.78 4.51 3.85 7.1a14.33 14.33 0 01-3.63 3.12c-.83.48-1.62.73-2.42.83a4.76 4.76 0 01-5.32-4.07c-.1-.8-.03-1.6.29-2.5.1-.32.25-.64.41-1.02.22-.52.48-1.06.73-1.6l.04-.07c2.16-4.77 4.52-9.64 6.97-14.41l.1-.2c.25-.48.5-.99.76-1.47.26-.51.54-1 .9-1.4a3.32 3.32 0 015.09 0c.35.4.64.89.9 1.4.25.48.5 1 .76 1.47l.1.2c2.44 4.77 4.8 9.64 7 14.41l.03.03c.26.52.48 1.1.73 1.6.16.39.32.7.42 1.03.19.9.29 1.7.19 2.5zM41.54 24.12a5.02 5.02 0 01-3.95-1.83 6.55 6.55 0 01-1.6-4.48 6.96 6.96 0 011.66-4.58 5.3 5.3 0 014.08-1.86 4.3 4.3 0 013.7 1.92l.1-1.57h2.92V23.8h-2.93l-.1-1.76a4.52 4.52 0 01-3.88 2.08zm.76-2.88c.58 0 1.09-.16 1.57-.45.44-.32.8-.74 1.08-1.25.25-.51.38-1.12.38-1.8a3.42 3.42 0 00-1.47-3.04 2.95 2.95 0 00-3.12 0c-.44.32-.8.74-1.08 1.25a4.01 4.01 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.98.45 1.55.45zM53.45 8.46c0 .35-.06.67-.22.93-.16.25-.38.48-.67.64-.29.16-.6.22-.92.22-.32 0-.64-.06-.93-.22a1.84 1.84 0 01-.67-.64 1.82 1.82 0 01-.22-.93c0-.36.07-.68.22-.93.16-.3.39-.48.67-.64.29-.16.6-.23.93-.23a1.84 1.84 0 011.6.86 2 2 0 01.21.94zm-3.4 15.3V11.7h3.18v12.08h-3.19zm11.68-8.9v.04c-.15-.07-.35-.1-.5-.13-.2-.04-.36-.04-.55-.04-.89 0-1.56.26-2 .8-.48.55-.7 1.32-.7 2.31v5.93h-3.19V11.69h2.93l.1 1.83c.32-.64.7-1.12 1.24-1.48a3.1 3.1 0 011.81-.5c.23 0 .45.02.64.06.1.03.16.03.22.06v3.2zm1.28 8.9V6.74h3.18v6.5c.45-.58.96-1.03 1.6-1.38a5.02 5.02 0 016.08 1.31 6.55 6.55 0 011.6 4.49 6.96 6.96 0 01-1.66 4.58 5.3 5.3 0 01-4.08 1.86 4.3 4.3 0 01-3.7-1.92l-.1 1.57-2.92.03zm6.15-2.52c.57 0 1.08-.16 1.56-.45.44-.32.8-.74 1.08-1.25.26-.51.38-1.12.38-1.8 0-.67-.12-1.28-.38-1.79a3.75 3.75 0 00-1.08-1.25 2.95 2.95 0 00-3.12 0c-.45.32-.8.74-1.09 1.25a4.01 4.01 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.98.45 1.56.45zm7.51 2.53V11.69h2.93l.1 1.57a3.96 3.96 0 013.54-1.89 4.1 4.1 0 013.82 2.44c.35.76.54 1.7.54 2.75v7.24h-3.19v-6.82c0-.84-.19-1.5-.57-1.99-.38-.48-.9-.74-1.56-.74-.48 0-.9.1-1.27.32-.35.23-.64.52-.86.93a2.7 2.7 0 00-.32 1.35v6.92h-3.16zm12.52 0V6.73h3.19v6.5a4.67 4.67 0 013.73-1.89 5.02 5.02 0 013.95 1.83 6.57 6.57 0 011.59 4.48 6.95 6.95 0 01-1.66 4.58 5.3 5.3 0 01-4.08 1.86 4.3 4.3 0 01-3.7-1.92l-.09 1.57-2.93.03zm6.18-2.53c.58 0 1.09-.16 1.56-.45.45-.32.8-.74 1.09-1.25.25-.51.38-1.12.38-1.8a3.42 3.42 0 00-1.47-3.04 2.95 2.95 0 00-3.12 0c-.44.32-.8.74-1.08 1.25a3.63 3.63 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.95.45 1.55.45z">
                  </path>
                </svg>
              </div>
            </a>
          </div>
          <div class="flex-initial">
            <div class="flex justify-end items-center relative">
              <div class="inline relative">
                <div class="block flex-grow-0 flex-shrink-0">
                  <img class="rounded-xl w-8 h-8 border border-yellow-300 shadow" src="https://media-exp1.licdn.com/dms/image/C5603AQGEQ6ydraNeww/profile-displayphoto-shrink_200_200/0/1623517758261?e=1629331200&v=beta&t=mhUiw4p21E9okkvInvM0ry8lmLsT6s5ppWMKo6kFs2M">
                </div>
                </div>
              </div>
            </div>
        </nav> -->
        <div class="px-3 rounded-lg flex flex-row w-full bg-transparent bg-gradient-to-b from-primary-300/80 to-gray-50/transparent py-4">
          <div class="flex flex-col w-full">
            <h4 class="dark:text-gray-50 text-gray-900 text-xl font-semibold  leading-tight truncate">Welcome,
            </h4>
              <div class="flex flex-col">
                <h2 class="text-base flex items-center h-6 text-gray-100 font-normal">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                    </path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span class="dark:text-gray-50 text-gray-900 line-clamp-1">
                    {{ s_map_address }}
                  </span>
                </h2>
              </div>
          </div>

          <a @click="openNav()" class="flex flex-col">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            
          </a>
        </div>
      </template>
    </NuxtLayout>
    <ClientOnly>
      <teleport to='body'>
        <MainMobileSidebar style="
      pointer-events: auto;" />
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
  keepalive:true,
  middleware: ['auth']
});
const title = useState("title");

const route = useRoute()
const router = useRouter()

const { useService, getBanner } = useHome();

const config = useRuntimeConfig();
  const { isApp } = useWhatPlatform();
const sto = useLoading()
const { loading, silentLoading } = storeToRefs(sto)

const swipeRef2 = ref<SwipeInstance>();
// declare store variable
const store = useService();
const store2 = useUser();
const { banners, tags, tag, services, estimate } = storeToRefs(store);
const { show, stage, user } = storeToRefs(store2);
const { useBookings } = useBooking();
const book = useBookings();
const { provider, booking,bookings,recentBookings } = storeToRefs(book);

const bookings2 = ref([]);

const form = useAddress();
const { s_map_address, s_latitude, s_longitude } = storeToRefs(form);
const { currPos, d_map_address, d_latitude, d_longitude } = storeToRefs(useAddress());
const { addresses } = storeToRefs(useDeliveryAddresses());
const { platform } = useFirebase();
const notif = useLocalNotification();
let geocoder;

const isNavActive = useIsNavActive()
const isNavDeactive = useIsNavDeactive()
const isOpen = useSheetToggle()

const map = inject('map')
const options = inject('mapOptions')
const { clearMap, reloadMap } = useMapFunction(map.value);

onMounted(async () => {
  title.value = "Welcome"
  if (isApp) await map.value.enableCurrentLocation(true);
  if (!useUser().isLoggedIn) {
    return route({ path: "/login" });
  }
  await useUser().setUser();

  stage.value = 0;
  recenter();
  closeNav();

  //tag.value = null
  d_map_address.value = ""
  d_latitude.value = 0
  d_longitude.value = 0
  addresses.value = []
  estimate.value = null
  await clearMap();
  // if (tags.value != null) {
  //     tag.value = tags.value[0]
  //   }
  //console.log(options.value);
  //map.value = await reloadMap(options.value);
  await onRefresh()
  store.getProvidersData();
  await book.fetchBookings();

  locationWatcher();
});

const locationWatcher = watchThrottled(s_map_address, () => {

  if (s_map_address.value == "") {
    onRefresh()
  }
  // if (booking.value == null) {
  //   clearMap();
  // }

}, { throttle: 1000 })

async function getLive() {

  if (currPos.value?.lat == undefined) return;
  try {
    geocoder = useGoogleGeocode();
    s_latitude.value = currPos.value.lat;
    s_longitude.value = currPos.value.lng;
    var c = { lat: currPos.value.lat, lng: currPos.value.lng };
    await geocoder
      .geocode(currPos.value.lat, currPos.value.lng)
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
    
    await useUser().setUser()
    await useUser().connectWs();
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

async function setServiceAddress(post: any) {
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

async function goToPage(category: any) {

  if (category.for == 'mover' || category.for == 'parcel') {
    return router.push(`/services/items?for=${category?.for}&input=drop&goto=/services/items&newAdd=true`)

  }else{
    return router.push(`/single-address?for=${category?.for}&input=drop&goto=/services/items&newAdd=true`)

  }

  
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
}</style>