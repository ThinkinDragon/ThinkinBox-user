<template>
  <div class="block h-full mx-auto safe-top">
    <Title> {{ title }}</Title>
    <div :class="`h-[${height}px]`" :style="'height :' + height + 'px'"
      class="relative block w-full overflow-hidden md:h-full" ref="mapDiv" />
    <!-- v-if="store.platform == 'web'" <capacitor-google-map v-else ref="mapDiv"></capacitor-google-map> -->

    <div
      class="fixed md:right-24 top-0 w-full md:top-2 z-[5] flex flex-col md:pt-2 p-2 md:max-w-sm md:mt-16 safe-top bg-white dark:bg-gray-900 md:bg-transparent rounded-lg">
      <nav class="w-full flex items-start justify-around flex-grow p-2 mx-auto bg-white dark:bg-gray-900 rounded-lg">
        <div class="relative inline">
          <div @click="$router.back()" type="button" class="relative inline-flex items-center mt-3 text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
        </div>
        <slot name="main">
          <div class="inline-flex items-center self-center justify-center flex-grow font-bold">
            <slot name="nav">
              {{ title }}
            </slot>
          </div>
        </slot>
        <div class="inline-flex min-w-6 min-h-6">
          <slot name="action">
            <!-- <div v-show="addresses.length < 3" @click="CreateSubAddress()" class="inline-flex items-center self-center justify-center flex-grow font-bold">
              <svg class="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </div> -->
          </slot>
        </div>
      </nav>
      <form id="address" class="space-y-10 flex flex-col w-full bg-white dark:bg-gray-900 rounded-b-lg" @submit.prevent="back()">
        <div class="flex flex-row space-x-2.5 items-center justify-around max-w-sm m-4 p-2 bg-gray-100 dark:bg-gray-800 border rounded-lg">
          <div class="flex w-10 flex-col space-y-2 items-center justify-center">
            <div class="flex w-4 h-4 bg-primary rounded-full" />
            <div class="transform -rotate-90 w-9 h-1 bg-white dark:bg-gray-900 rounded-full" />
            <template v-if="route.query.for === 'multi'">
            
            <div v-for="(item, index) in addresses" :key="index" class="transform -rotate-90 w-9 h-1 bg-white dark:bg-gray-900 rounded-full" />
            </template>
            <svg class="w-full h-6 rounded-full" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M6.07107 15.8952C6.68708 15.8952 9.62049 12.2114 10.3438 11.0379C11.4557 9.23407 12.1421 8.16692 12.1421 6.17557C12.1421 2.8226 9.42404 0.104492 6.07107 0.104492C2.71811 0.104492 0 2.8226 0 6.17557C0 8.17728 0.63608 9.23732 1.74425 11.0379C2.51662 12.2929 5.45507 15.8952 6.07107 15.8952Z"
                fill="#F52D56" />
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M6.07118 8.90408C7.74766 8.90408 9.10672 7.54503 9.10672 5.86854C9.10672 4.19206 7.74766 2.83301 6.07118 2.83301C4.3947 2.83301 3.03564 4.19206 3.03564 5.86854C3.03564 7.54503 4.3947 8.90408 6.07118 8.90408Z"
                fill="white" />
            </svg>
          </div>
        
          <div class="flex flex-col w-full items-center justify-end ">
            <FormSingleAddressForm label="address" :street="form.s_map_address" v-model:street="form.s_building"
              v-model:latitude="form.s_latitude" v-model:longitude="form.s_longitude" @selected="isSelected"
              v-model:map_address="form.s_map_address" @marker="addMarker" @clear="clear" @recenter="selectPickup()" />

              <div class="flex flex-col items-end justify-end w-full">

                <div class="w-full h-0.5 border-1 border-gray-300 bg-gray-300 "></div>
                <template v-if="route.query.for === 'multi'">

                  <div v-if="addresses.length != 0" class="flex flex-wrap w-full justify-around relative items-center">
                  
                    <div v-for="(item, index) in addresses" :key="index" class=" w-full">
                      <FormSingleAddressForm label="address" :street="item.address"            
                      v-model:latitude="item.latitude" v-model:longitude="item.longitude"
                      v-model:map_address="item.address" @marker="addMarker"  @clear="clearList(item)" 
                      @recenter="selectSub(item)" />
                    </div>
                  </div>
                </template>
              </div>
            <FormSingleAddressForm label="address" :street="form.d_map_address" v-model:street="form.d_building"
              v-model:latitude="form.d_latitude" v-model:longitude="form.d_longitude" @selected="isSelected"
              v-model:map_address="form.d_map_address" @marker="addMarker" @clear="clear" @recenter="selectDrop()" />
          </div>

        </div>
      </form>
    </div>
    <div class="fixed bottom-0 md:bottom-32 z-10 w-full p-2 md:max-w-[23rem]" :class="'h-[15vh]'">
      <div class="inline-flex h-5 w-72 items-center justify-end space-x-2">
        <svg class="h-full w-5 rounded-lg" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M2.05002 2.04987C3.36284 0.737047 5.14341 -0.000488281 7.00002 -0.000488281C8.85663 -0.000488281 10.6372 0.737047 11.95 2.04987C13.2628 3.36269 14.0004 5.14326 14.0004 6.99987C14.0004 8.85648 13.2628 10.637 11.95 11.9499L7.00002 16.8999L2.05002 11.9499C1.39993 11.2998 0.884251 10.5281 0.532423 9.67882C0.180596 8.82949 -0.000488281 7.91918 -0.000488281 6.99987C-0.000488281 6.08056 0.180596 5.17025 0.532423 4.32092C0.884251 3.47159 1.39993 2.69989 2.05002 2.04987ZM7.00002 8.99987C7.53045 8.99987 8.03916 8.78915 8.41423 8.41408C8.7893 8.03901 9.00002 7.5303 9.00002 6.99987C9.00002 6.46944 8.7893 5.96073 8.41423 5.58566C8.03916 5.21058 7.53045 4.99987 7.00002 4.99987C6.46958 4.99987 5.96088 5.21058 5.5858 5.58566C5.21073 5.96073 5.00002 6.46944 5.00002 6.99987C5.00002 7.5303 5.21073 8.03901 5.5858 8.41408C5.96088 8.78915 6.46958 8.99987 7.00002 8.99987Z"
            fill="black" />
        </svg>
        <p class="text-sm font-medium leading-none">{{ $__("Move pin on Map for accurate Location") }}</p>
      </div>
      <button form="address"
        class="flex items-center w-full content-between justify-center flex-1 p-2 px-5 py-3 text-white dark:text-gray-900 rounded-lg shadow bg-primary disabled:to-slate-500"
        :disabled="dataFill">
        <p class="text-xl font-medium text-center">{{ "Set Address" }}</p>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import draggable from 'vuedraggable'
//import { GoogleMap } from "@capacitor/google-maps";
import { useWindowSize, useDebounceFn } from "@vueuse/core";
import { Keyboard } from '@capacitor/keyboard';
import type { trip_address } from "../types/booking";

const { width, height } = useWindowSize();

definePageMeta({
  layout: "map-2",
});
const title = useState("title");
const config = useRuntimeConfig();
const router = useRouter();
const route = useRoute();
const { errorResponse } = useBase();
const center = ref(null);
let searchAddress = ref(false);
let { coords } = useGeolocation();
const otherPos = ref(null);
let mapDiv = null;
const mapmarker = ref(false);

const form = useAddress();

const {addresses,select_trip_address} = storeToRefs(useDeliveryAddresses());
const { currPos } = storeToRefs(form);
const mapTouch = ref(false);
const coordinates = ref(null);

const input_address = ref("")
const input_lng = ref(0)
const input_lat = ref(0)

const id = ref(0)
const inputPickup = ref(false)
const inputDrop = ref(false)




const subAddress = ref<trip_address>({ id:0, address:"", latitude: 0, longitude: 0,items:[], status:0});

const dataFill = computed(() =>
  form.s_map_address == '' && form.s_map_address == null && form.d_map_address == undefined && form.d_map_address == '' && form.d_map_address == null && form.d_map_address == undefined
)

const store = useFirebase();

let map : google.maps.Map;
let bounds :google.maps.LatLngBounds;
let geocoder : google.maps.Geocoder;
let marker : google.maps.Marker;


onMounted(async () => {
  center.value = { lat: 0, lng: 0 };


  title.value = "Set address";
  form.d_map_address = "" 
  form.d_latitude = 0
  form.d_longitude = 0
  if (store.platform != 'web') {
    listenKeyboard();
  }
  if (route.params.for !== 'multi') {
    addresses.value = []
  }
  setTimeout(() => {
    selectDrop()
  }, 2000);
  if (true) {


    try {
        map = new google.maps.Map(mapDiv, {
          center: center.value,
          zoom: 14,
          //mapTypeControl: false,
          // gestureHandling: "greedy",
          // zoomControl: false,
          // scaleControl: false,
          // streetViewControl: false,
          // rotateControl: false,
          // fullscreenControl: false,
        });
        geocoder = new google.maps.Geocoder();

        bounds = new google.maps.LatLngBounds();

        marker = new google.maps.Marker({
          position: currPos.value,
          map: map,
          optimized: false,
        });

      useMapAnimation(map,currPos.value)

        google.maps.event.addListener(map, "center_changed", () => {
          // 3 seconds after the center of the map has changed, pan back to the marker.
          var c = map.getCenter();
          if (marker) {
            marker.setPosition(c);
            if (form.s_select) {
              form.s_latitude = c.lat();
              form.s_longitude = c.lng();
            } else if (form.d_select) {
              form.d_latitude = c.lat();
              form.d_longitude = c.lng();
            }
          }

          searchAddress.value = true;
          setTimeout(() => {
            mapTouch.value = true;
            // inputPickup.value = false;
            // inputDrop.value = false;
          }, 3000);

        });

        google.maps.event.addListener(map, "idle", () => {
          {
            // 3 seconds after the center of the map has changed, pan back to the marker.
            console.log("on idle",mapTouch.value);
            //mapTouch.value = false;
            if (!mapTouch.value) return;
            //if (mapmarker.value) return;
            if (!inputPickup.value && !inputDrop.value) {
              var c = map.getCenter();
            getGeoAddress(c);
            }else{
            inputPickup.value = false;
            inputDrop.value = false;
            }

            mapTouch.value = false;
          }
        });

    } catch (error) {
      console.log(error);
    }

  }
});

const addMarker = (data) => {

  if (!data?.location) return;
  if (marker) {
    marker.setMap(null);
  }

  marker = new google.maps.Marker({
    position: data.location,
    map: map,
    optimized: false,
  });
  form.latitude = data.location.lat();
  form.longitude = data.location.lng();
  if (data.viewport) {
    // Only geocodes have viewport.
    bounds.union(data.viewport);
  } else {
    bounds.extend(data.location);
  }
  map.fitBounds(bounds);
};

const CreateSubAddress = () => {

      if (addresses.value.length > 2) {
        return
      }

      select_trip_address.value = {
          id: new Date().getTime(),
              address : input_address.value,
              latitude : input_lat.value,
              longitude : input_lng.value,
              items : [],
              status : 0
        }
      addresses.value.push(select_trip_address.value);

      input_address.value = ""
      input_lat.value = 0
      input_lng.value = 0
    }

const getGeoAddress = (c) => {
  if (c != null) {
    geocoder
      .geocode({ location: c })
      .then((response) => {
        //console.log(response);
    //if (response && response.length > 0) {
        if (response.results[0]) {
          console.log(response.results);
          let place = {
            address_components: [],
            ...response.results[0],
          };
          if (place == undefined) {
            return true;
          }

          if (form.s_select) {
              form.s_latitude = +c.lat();
              form.s_longitude = +c.lng();
              form.s_map_address = place.formatted_address;
          } else if (form.d_select) {
              form.d_latitude = +c.lat();
              form.d_longitude = +c.lng();
              form.d_map_address = place.formatted_address;
          } else{
            if (select_trip_address.value != null) {
              let objIndex = addresses.value.findIndex((obj => obj.id == select_trip_address.value?.id));
              addresses.value[objIndex].address = place.formatted_address;
              addresses.value[objIndex].latitude = +c.lat();
              addresses.value[objIndex].longitude = +c.lng();
            }
          }
          //addMarker(place.geometry)
        } else {
          console.log("No results found");
        }
        searchAddress.value = false;
      });

    map.setCenter(marker.getPosition());  
  }
};

function clear() {
  if (form.s_select) {
    form.s_map_address = null;
    form.s_latitude = null;
    form.s_longitude = null;
  } else if (form.d_select) {
    form.d_map_address = null;
    form.d_latitude = null;
    form.d_longitude = null;
  }else{
    subAddress.value.address = "";
    subAddress.value.latitude = subAddress.value.longitude = 0;
  }
  
  mapmarker.value = true
}

function clearList(params:trip_address) {
  console.log(params);
  const index = addresses.value.indexOf(params);

  addresses.value.splice(index, 1);
 select_trip_address.value = null;
      if (addresses.value.length == 0) {
        id.value = 0;
      }
}

// function recenter() {
//   form.reset()
//   mapmarker.value = false
//   var c = new google.maps.LatLng(currPos.value.lat, currPos.value.lng)
//   getGeoAddress(c)
//   map.setCenter(c);

// }

function back() {
  if (form.d_map_address == "") {
   return alert("set drop location");
  }
  
  select_trip_address.value = {
          id: new Date().getTime(),
              address : form.d_map_address,
              latitude : form.d_latitude,
              longitude : form.d_longitude,
              items : [],
              status : 0
        }
      addresses.value.push(select_trip_address.value);
  form.map_address = form.building
  router.push(`/services?for=${route.query.for}`);
}

async function listenKeyboard() {
  Keyboard.addListener('keyboardWillShow', info => {
    //console.log('keyboard will show with height:', info.keyboardHeight);
    mapmarker.value = false
  });

  Keyboard.addListener('keyboardDidShow', info => {
    //console.log('keyboard did show with height:', info.keyboardHeight);
    mapmarker.value = true
  });

  Keyboard.addListener('keyboardWillHide', () => {
    //console.log('keyboard will hide');
    mapmarker.value = true
  });

  Keyboard.addListener('keyboardDidHide', () => {
    //console.log('keyboard did hide');
    setInterval(
      function () { mapmarker.value = false },
      5000
    );

  });
}

async function selectPickup() {
  console.log("hit form pickup");
  inputPickup.value = true;
  form.s_select = true;
  form.d_select = false;
}
async function selectDrop() {
  console.log("hit form drop");
  inputDrop.value = true;
  form.s_select = false;
  form.d_select = true;
}
async function selectSub(add:trip_address) {
  form.s_select = false;
  form.d_select = false;
  select_trip_address.value = add
  
}

function isSelected(params:any) {
  console.log(params);
  
}
</script>

<style>
.capacitor-google-map {
  display: inline-block;
  width: 275px;
  height: 400px;
}
</style>
