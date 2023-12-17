<template>
  <div>
  <NuxtLayout name="map">
    <template #subnav >
      <!-- class="fixed top-0 w-full md:top-2 flex flex-col md:pt-2 md:pr-4 md:max-w-sm md:mt-16 safe-top bg-gray-50 dark:bg-gray-900 md:bg-transparent rounded-lg" -->
      <form id="address" class="space-y-10 flex flex-col w-full rounded-b-lg" @submit.prevent="goto()">
        <div class="flex flex-row space-x-2.5 items-center justify-around shadow-xl max-w-sm p-2 bg-gray-50 dark:bg-gray-900 border rounded-lg">
          <div class="flex w-10 flex-col space-y-2 items-center justify-center">
            <div class="flex w-4 h-4 bg-primary rounded-full" />
            <div class="transform -rotate-90 w-9 h-1 bg-gray-50 dark:bg-gray-900 rounded-full" />
            <template v-if="type === 'multi'">
            <div v-for="(item, index) in addresses" :key="index" class="transform -rotate-90 w-9 h-1 bg-gray-50 dark:bg-gray-900 rounded-full" />
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
              v-model:map_address="form.s_map_address" @marker="addMarker" @clear="clearS" @recenter="selectPickup()" />

              <div class="flex flex-col items-end justify-end w-full">

                <div class="w-full h-0.5 border-1 border-gray-300 bg-gray-300 "></div>
                <template v-if="type === 'multi'">

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
              v-model:map_address="form.d_map_address" @marker="addMarker" @clear="clearD" @recenter="selectDrop()" />
          </div>

        </div>
      </form>
    </template>
  <div class=" h-full mx-auto safe-top">
    <Title> {{ title }}</Title>
    <UIcon class="pin h-12 w-12" solid name="i-heroicons-map-pin-solid " />

    <div class="fixed bottom-0 md:bottom-32 z-10 w-full p-2 md:max-w-[23rem]" :class="'h-[15vh]'">
      <!-- <div class="inline-flex h-5 w-72 items-center justify-end space-x-2">
        <svg class="h-full w-5 rounded-lg" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M2.05002 2.04987C3.36284 0.737047 5.14341 -0.000488281 7.00002 -0.000488281C8.85663 -0.000488281 10.6372 0.737047 11.95 2.04987C13.2628 3.36269 14.0004 5.14326 14.0004 6.99987C14.0004 8.85648 13.2628 10.637 11.95 11.9499L7.00002 16.8999L2.05002 11.9499C1.39993 11.2998 0.884251 10.5281 0.532423 9.67882C0.180596 8.82949 -0.000488281 7.91918 -0.000488281 6.99987C-0.000488281 6.08056 0.180596 5.17025 0.532423 4.32092C0.884251 3.47159 1.39993 2.69989 2.05002 2.04987ZM7.00002 8.99987C7.53045 8.99987 8.03916 8.78915 8.41423 8.41408C8.7893 8.03901 9.00002 7.5303 9.00002 6.99987C9.00002 6.46944 8.7893 5.96073 8.41423 5.58566C8.03916 5.21058 7.53045 4.99987 7.00002 4.99987C6.46958 4.99987 5.96088 5.21058 5.5858 5.58566C5.21073 5.96073 5.00002 6.46944 5.00002 6.99987C5.00002 7.5303 5.21073 8.03901 5.5858 8.41408C5.96088 8.78915 6.46958 8.99987 7.00002 8.99987Z"
            fill="black" />
        </svg>
        <p class="text-sm font-medium leading-none">{{ $__("Move pin on Map for accurate Location") }}</p>
      </div> -->
      <button form="address"
        class="flex items-center w-full content-between justify-center flex-1 p-2 px-5 py-3 text-white dark:text-gray-900 rounded-lg shadow bg-primary disabled:to-slate-500"
        :disabled="dataFill">
        <p class="text-xl font-medium text-center">{{ "Set Address" }}</p>
      </button>
    </div>
    <UModal v-model="isOpen">
      <UCard>
        <template #header>
          <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white dark:text-gray-900">
            {{ $__('Pick up from') }}
          </p>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ $__('set user info for pickup') }}
          </p>
        </template>

        <div v-if="item.key === 'from'" class="space-y-3">
          <UFormGroup label="sender info" name="name">
            <URadio v-for="method of addressFor" :key="method.value" v-model="selectedDeliverTo" v-bind="method" />
          </UFormGroup>
          <template v-if="selectedDeliverTo == 'other'">
            <UFormGroup label="Name" name="name">
              <UInput size="xl" v-model="address.pick_meta.name" />
            </UFormGroup>
            <UFormGroup label="Mobile" name="mobile">
              <UInput size="xl" type="text" pattern="[1-9]{1}[0-9]{9}" v-model="address.pick_meta.phone" />
            </UFormGroup>
          </template>
        </div>
        <div class="space-y-3">
          <UFormGroup label="to User info" name="name">
            <URadio v-for="method of addressFor" :key="method.value" v-model="selectedDeliverTo" v-bind="method" />
          </UFormGroup>
          <template v-if="selectedDeliverTo == 'other'">
          <UFormGroup label="Name" name="name">
            <UInput size="xl" v-model="address.drop_meta.name" />
          </UFormGroup>
          <UFormGroup label="Mobile" name="mobile">
            <UInput size="xl" type="text" pattern="[1-9]{1}[0-9]{9}" v-model="address.drop_meta.phone" />
          </UFormGroup>
        </template>

        </div>
        <template #footer>
          <div class="w-full justify-end">
            <UButton block size="lg" @click="onSubmit" color="primary">
              Next
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</NuxtLayout>
</div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useWindowSize, useDebounceFn } from "@vueuse/core";
import { Keyboard } from '@capacitor/keyboard';
import type { trip_address, latLng } from "~~/types/booking";
import { useMemoize, watchThrottled } from '@vueuse/core'

const { width, height } = useWindowSize();

definePageMeta({
  layout: false,
});

const {for: type, input, goto:gotoUrl} = useRoute().query;
const router = useRouter();

const form = useAddress();
const { center,d_select,s_select } = storeToRefs(form);
const isOpen = ref(false)

const geocoder = useGoogleGeocode();
const searchAddress = ref(false);

const map = inject('map')

const inputPickup = ref(false)
const inputDrop = ref(false)

const title = useState("title");
const {select_trip_address,addresses} = storeToRefs(useDeliveryAddresses())


const dataFill = computed(() =>
  form.s_map_address == '' && form.s_map_address == null && form.d_map_address == undefined && form.d_map_address == '' && form.d_map_address == null && form.d_map_address == undefined
)

onMounted(() => {
  center.value = { lat: 0, lng: 0 };

  if (input == 'drop') {
    selectDrop()
  }

  form.d_latitude = 0
  form.d_longitude = 0

});

// watchThrottled(() => form.markerMoving,
//   (newValue, oldValue) => {
//     console.log(`marker changed from "${oldValue}" to "${newValue}"`);
//     if (oldValue != newValue) {
//         if (form.s_select) {
//         getGeoAddress(form.sourceCenter);
//       }
//       if (form.d_select) {
//         getGeoAddress(form.destinationCenter);
//       }
//     }
//   },{throttle:3000}
// );

watch(() => form.markerCenter.lat,
  (newValue, oldValue) => {
    console.log(`Property changed from "${oldValue}" to "${newValue}"`);
    if (oldValue != newValue)  getGeoAddress(form.markerCenter);
  }
);

function convertCoordinatesToJSON(coordinates) {
  var lat = coordinates.lat();
  var lng = coordinates.lng();
  var JSONCoordinates = {
    "lat": lat,
    "lng": lng
  };
  return JSONCoordinates;
}

//TODO: make the getGeoAddress function hit only after 2 sec of request useing throttle
const getGeoAddress = async(c:latLng) => {
  if (!form.mapReady) return true;
console.log(c);
if (typeof c.lat == 'function') {
    c = convertCoordinatesToJSON(c);
  }
if (c.lat == 0) return true;

  if (c != null) {
    await geocoder
        .geocode( c.lat,c.lng)
        .then((response) => {
        //console.log(response);
        //if (response && response.length > 0) {
        if (response.results[0]) {
          const place = {
            address_components: [],
            ...response.results[0],
          };

          if (form.s_select) {
          form.s_latitude = +c.lat;
          form.s_longitude = +c.lng;
          form.s_map_address = place.formatted_address;
          } else 
          if (form.d_select) {
            form.d_latitude = +c.lat;
            form.d_longitude = +c.lng;
            form.d_map_address = place.formatted_address;
          }
          console.log(place.formatted_address);

          if (form.markerMoving) {
            addMarker(place.geometry.location)
          }
          
        } else {
          console.log("No results found");
        }
        searchAddress.value = false;
      });
  }
};

function clearS() {
    form.s_map_address = '';
    form.s_latitude = 0;
    form.s_longitude = 0;
}
function clearD() {
    form.d_map_address = '';
    form.d_latitude = 0;
    form.d_longitude = 0;
}
async function addMarker(params) {
  console.log(typeof params.lat );
  if (typeof params.lat == 'undefined') return true;
  if (typeof params.lat == 'function') {
    params = convertCoordinatesToJSON(params);
  }

    await map.value.setCamera({
      coordinate: params,
      zoom:18,
      animate:true,
      animationDuration:3000
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

const geoCodeMemo = useMemoize(async (c) =>
 await geocoder?.geocode({ location: c })
      .then((response) =>response),
)
const addressFor = [
  { value: 'self', label: 'Self' },
  { value: 'other', label: 'Other' },
]
const selectedDeliverTo = ref('')
async function goto() {
  isOpen.value = true;
  return true;

  if (gotoUrl != null) {
    return router.push(`${gotoUrl}?for=${type}&input=${input}`);
  }
  d_select.value = false
  s_select.value = false
  return router.back();
  let addrr = {
    address : form.d_map_address,
    latitude : form.d_latitude,
    longitude : form.d_longitude,
  }
  useDeliveryAddresses().pushAddress(addrr)
            
  router.push(`/services?for=${type.value}`);
}
</script>

<style scoped>
.pin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
