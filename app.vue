<template>
  <div style="pointer-events: auto;" aria-hidden="true">

  <Title>{{ title }}</Title>
    <USlideover v-model="show" style="pointer-events: auto;" id="home-slider" prevent-close>
      <div class="p-4 flex-1 h-full">
        <HomeSliders />
      </div>
    </USlideover>
  <!-- </van-popup> -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

    <capacitor-google-map class="" ref="mapDiv" id="mapDiv" :style="`width:${width}px; height:${height}px; 
    `"></capacitor-google-map>

  <div id="sidebar"></div>
  <div id="modals"></div>
  <LazyLocationCheck />
  <Notification />
  <UNotifications id="my-notification" :ui="{
    // Show toasts at the top right of the screen
    position: 'top-0 bottom-auto'
  }" />
</div>
</template>

<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { GoogleMap } from '@capacitor/google-maps';
import type { CreateMapArgs } from "@capacitor/google-maps/dist/typings/implementation";
import { Keyboard } from "@capacitor/keyboard";
import mapStyle from '~/src/gmapStyle.json';
import mapStyleDark from '~/src/gmapStyleDark.json';

const { width, height } = useWindowSize();

const isNavActive = useIsNavActive()
const map = ref(null);
const mapDiv = ref<HTMLElement>();

const coordinates = ref(null);
const options = ref<CreateMapArgs>();

const title = useState("title");

const { getBanner } = useHome();

const { platform } = storeToRefs(useFirebase())

const user = useUser();
const { error } = storeToRefs(user)
const { gps } = useGeolocation();
const { reloadMap } = useMapFunction(map.value);
const setting = useSetting();
const { show } = storeToRefs(setting);

const { isVisible } = useKeyboards();

const addressStore = useAddress()

const { center, currPos, markerMoving, mapReady, s_latitude, s_longitude, d_latitude, d_longitude, s_select, d_select } = storeToRefs(addressStore);
const config = useRuntimeConfig();

const colorMode = useColorMode()

onMounted(async () => {
  colorMode.preference = colorMode.value = 'dark';

  s_select.value = false;
  d_select.value = false;

  const result = await Promise.allSettled([
    gps(),useFirebase().device(), user.connectWs(), useFirebase().registerNotifications(),
    , useLocalNotification().registerLocalNotifications(), 
    addressStore.printCurrentPosition(), startMap(),
     setting.fetch(),getBanner(),
  ])


  //console.log(result);
  
})

watchEffect(() => {
  // if (colorMode.value == 'dark' && map.value) {
  //   map.value.setOptions({
  //     style:
  //   })
  // }
  if (isVisible) {
    useHead({
    bodyAttrs: {
      style: `pointer-events:auto !important;`,
    }
  })
  }else{
    useHead({
    bodyAttrs: {
      style: `pointer-events:none !important;`,
    }
  })
  }
})


async function startMap() {

   options.value = {
      id: 'mapDiv',
      element: mapDiv.value,
      apiKey: config.public.GMAP_API,
      forceCreate: true,
      config: {
        center: addressStore.markerCenter ?? center.value,
        zoom: 18,
         mapTypeControl: false,
        // gestureHandling: "greedy",
         zoomControl: false,
         scaleControl: false,
         streetViewControl: false,
         rotateControl: false,
         fullscreenControl: false,
         styles: colorMode.value == 'dark' ? mapStyleDark : mapStyle
      },
    };
  try {
    map.value = await reloadMap(options.value);
    mapReady.value = true;

    //await useMapFunction(map.value).startMap()

  } catch (error) {
    console.log(error);
  }
}

provide('map', map)
provide('mapOptions', options)

</script>

<style>
textarea:focus, input:focus{
  border-style: none !important;
  border: none !important;
  outline: transparent !important;
}
*:focus {
  border-style: none !important;
  border: none !important;
  outline: transparent !important;
}

.router-link-active {
  font-weight: bold;
}

.main {
  background-image: url(https://images.unsplash.com/photo-1507608158173-1dcec673a2e5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80);
}

::-webkit-scrollbar {
  width: 0;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-thumb {
  background-color: transparent;
  outline: 1px solid transparent;
}

.vier-sheet {
  z-index: 1800 !important;
}
.vier-sheet-container {
  pointer-events: none !important;
}

.vier-sheet-container>.vier-sheet {
  pointer-events: auto !important;
}

capacitor-google-map {
  height: 100%;
  width: 100%;
  position: absolute;
  pointer-events: auto;
  top: 0;
  left: 0;
  z-index: -1;
}

.vier-sheet-container > .vier-sheet {
  @apply bg-gray-50 dark:bg-gray-800;
}
.vier-sheet-container > .vier-sheet > .vier-sheet-body{
  @apply bg-gray-50 dark:bg-gray-800;
}
.van-cell{
  @apply bg-gray-50 dark:bg-gray-900;
}
</style>
  