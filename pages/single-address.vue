<template>
  <div>
    <NuxtLayout name="map">
      <template #subnav>
        <ClientOnly >
          <div class="flex flex-row space-x-2.5 items-center justify-around shadow-xl p-2 bg-gray-50 dark:bg-gray-900 border rounded-lg">
            <div class="flex flex-col w-full items-center justify-end ">
              <FormSingleAddressForm v-if="input == 'pickup'" label="address" :street="form.s_map_address"
                v-model:street="form.s_map_address" v-model:latitude="form.s_latitude" v-model:longitude="form.s_longitude"
                @selected="isSelected" v-model:map_address="form.s_map_address" @hide-marker="hideMarkerInput"  @marker="addMarker" @clear="clearS"
                @recenter="selectPickup()" />
              <FormSingleAddressForm v-else label="address" v-model:street="select_trip_address.address"
                v-model:latitude="select_trip_address.latitude" v-model:longitude="select_trip_address.longitude"
                @selected="isSelected" @marker="addMarker" @clear="clear" @recenter="selectDrop()" />
            </div>
          </div>
        </ClientOnly>

      </template>
      <div class=" h-full mx-auto safe-top text-gray-900">
        <Title> {{ title }}</Title>
        {{ !isVisible }}
        <UIcon v-show="hideMarker" class="pin z-10 h-12 w-12" solid name="i-heroicons-map-pin-solid " />
      </div>
      <template #bottom>
        <div class="fixed bottom-0 md:bottom-32 z-10 w-full p-2 md:max-w-[23rem]" :class="'h-[15vh]'">
          <!-- <div class="inline-flex h-5 w-72 items-center justify-end space-x-2">
            <svg class="h-full w-5 rounded-lg" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M2.05002 2.04987C3.36284 0.737047 5.14341 -0.000488281 7.00002 -0.000488281C8.85663 -0.000488281 10.6372 0.737047 11.95 2.04987C13.2628 3.36269 14.0004 5.14326 14.0004 6.99987C14.0004 8.85648 13.2628 10.637 11.95 11.9499L7.00002 16.8999L2.05002 11.9499C1.39993 11.2998 0.884251 10.5281 0.532423 9.67882C0.180596 8.82949 -0.000488281 7.91918 -0.000488281 6.99987C-0.000488281 6.08056 0.180596 5.17025 0.532423 4.32092C0.884251 3.47159 1.39993 2.69989 2.05002 2.04987ZM7.00002 8.99987C7.53045 8.99987 8.03916 8.78915 8.41423 8.41408C8.7893 8.03901 9.00002 7.5303 9.00002 6.99987C9.00002 6.46944 8.7893 5.96073 8.41423 5.58566C8.03916 5.21058 7.53045 4.99987 7.00002 4.99987C6.46958 4.99987 5.96088 5.21058 5.5858 5.58566C5.21073 5.96073 5.00002 6.46944 5.00002 6.99987C5.00002 7.5303 5.21073 8.03901 5.5858 8.41408C5.96088 8.78915 6.46958 8.99987 7.00002 8.99987Z"
                fill="black" />
            </svg>
            <p class="text-sm font-medium leading-none">{{ $__("Move pin on Map for accurate Location") }}</p>
          </div> -->
          <UButton
            class="flex items-center w-full content-between justify-center flex-1 p-2 px-5 py-3 text-white dark:text-gray-900 rounded-lg shadow bg-primary disabled:to-slate-500"
            @click="gotoNext" :disabled="!dataFill"> {{ $__('Set Address') }}
          </UButton>
        </div>
      </template>
    </NuxtLayout>
    <ClientOnly >
      
    <teleport to='body' >
      <van-popup
      round style="
      pointer-events: auto;" closeable 
      position="bottom" v-model:show="isOpen">
        <UCard>
          <template #header>
            <template v-if="input === 'pickup'">
              <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                {{ $__('Pick up from') }}
              </p>
              <p class=" text-sm text-gray-500 dark:text-gray-400">
                {{ $__('set user info for pickup') }}
              </p>
            </template>
            <template v-else>
              <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                {{ $__('Drop from') }}
              </p>
              <p class=" text-sm text-gray-500 dark:text-gray-400">
                {{ $__('set user info for drop location') }}
              </p>
            </template>
          </template>
          <form  id="formInfo" @submit.prevent="gotoNext()">

          <div v-if="input === 'pickup'" class="space-y-3">
              <UFormGroup label="Name" name="name">
                <UInput size="xl" v-model="select_trip_address.pick_meta.name" required />
              </UFormGroup>
              <UFormGroup label="Mobile" name="mobile">
                <UInput size="xl" type="text" pattern="[1-9]{1}[0-9]{9}" v-model="select_trip_address.pick_meta.phone" required />
              </UFormGroup>
              <UFormGroup label="sender info" name="name">
                <URadio v-for="method of addressFor" :key="method.value" v-model="selectedDeliverTo" v-bind="method" required />
              </UFormGroup>
          </div>
          <div v-else class="space-y-3">
            <UFormGroup label="Name" name="name">
              <UInput size="xl" v-model="select_trip_address.drop_meta.name" required />
            </UFormGroup>
            <UFormGroup label="Mobile" name="mobile">
              <UInput size="xl" type="text" pattern="[1-9]{1}[0-9]{9}" v-model="select_trip_address.drop_meta.phone" required />
            </UFormGroup>

            <UFormGroup label="to User info" name="name">
              <URadio v-for="method of addressFor" :key="method.value" v-model="selectedDeliverTo" v-bind="method" />
            </UFormGroup>
          </div>
          </form>
          <template #footer>
            <div class="w-full justify-end">
              <UButton type="submit" form="formInfo" block size="lg" color="primary">
                Next
              </UButton>
            </div>
          </template>
        </UCard>
      </van-popup>
    </teleport>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useWindowSize, useDebounceFn } from "@vueuse/core";
import type { trip_address, latLng } from "~~/types/booking";
import { useMemoize, watchThrottled } from '@vueuse/core'
import { Keyboard, type KeyboardInfo } from '@capacitor/keyboard';

definePageMeta({
  layout: false,
});
const route = useRoute();
const router = useRouter();
const form = useAddress();
const { for: type, input, newAdd,itemId } = route.query;

const { center, d_select, s_select } = storeToRefs(form);

const searchAddress = ref(false);

const map = inject('map')

const isOpen = ref(false)
const {isVisible} = useKeyboards()


const hideMarkerInput = ref(false)

const hideMarker = computed(() => (!isOpen.value || !isVisible) && hideMarkerInput.value)

const inputPickup = ref(false)
const inputDrop = ref(false)

const title = useState("title");
const { select_trip_address, addresses } = storeToRefs(useDeliveryAddresses())


const dataFill = computed(() =>
  {
    if (select_trip_address.value == undefined)  return false;
    return select_trip_address.value?.address?.length > 0
  }
)


const {user} = useUser();


const addressFor = ref([
  { value: 'self', label: 'Self' },
  { value: 'other', label: 'Other' },
])

const geocoder = useGoogleGeocode();

const selectedDeliverTo = ref('other');

onMounted(async () => {

  if (input === 'drop') {
    if (newAdd ) {
      let data = {
      comments: "",
      rate: "",
      qty: 0,
      id:"",
      amount: 0,
      weight: 0,
      image: "",
      edit: false,
      pick_meta: {
        name: "",
        phone: "",
        address: "",
        latitude: 0,
        longitude: 0,
      },
      drop_meta: {
        name: "",
        phone: "",
        address: "",
        latitude: 0,
        longitude: 0,
      },
      address: "",
      latitude: 0,
      longitude: 0,
      items: [],
      status: 0,
    }
    useDeliveryAddresses().pushAddress(data);
    }
  if (itemId == undefined &&( addresses.value.length == 0 || select_trip_address.value == undefined)) {

  } else {
    itemId != undefined ? select_trip_address.value = await useDeliveryAddresses().getAddress(itemId): console.log("no id");
  }
    selectDrop();
  }else{
    selectPickup();
  }

  title.value = input == 'pickup' ? 'Pickup Location' : 'Drop Location'; 

  useMapFunction(map.value).setOnMapFunc();
});

const unwatch1 =  watch(() => selectedDeliverTo.value, () => {
    if (select_trip_address.value == undefined)  return true;
    console.log();
    
  if (selectedDeliverTo.value == 'self' ) {
    if ( input == 'pickup') {
      select_trip_address.value.pick_meta.name = user?.first_name + ' ' + user?.last_name;
      select_trip_address.value.pick_meta.phone = user?.mobile || '';
    }else{
      select_trip_address.value.drop_meta.name = user?.first_name + ' ' + user?.last_name;
      select_trip_address.value.drop_meta.phone = user?.mobile || '';
    }
    }else{
      if ( input == 'pickup') {
      select_trip_address.value.pick_meta.name = '';
      select_trip_address.value.pick_meta.phone = '';
    }else{
      select_trip_address.value.drop_meta.name = '';
      select_trip_address.value.drop_meta.phone = '';
    }
    }
})
// watchThrottled(() => form.markerMoving,
//   (newValue, oldValue) => {
//     console.log(`marker changed from "${oldValue}" to "${newValue}"`);
//     if (oldValue != newValue) {

//       getGeoAddress(form.center);
//     }
//   },{throttle:3000}
// );

const unwatch2 = watch(() => form.markerCenter.lat,
  (newValue, oldValue) => {
    console.log(`Property changed from "${oldValue}" to "${newValue}"`);
    
    if (oldValue != newValue || (select_trip_address.value != undefined && input == 'drop') && !isOpen) getGeoAddress(form.markerCenter);
  }
);

// watch(() =>form.markerCenter.lat , (async() => {
//   console.log(form.markerCenter.lat != null || (select_trip_address.value != undefined && input == 'drop'));
//     console.log(`Property changed from "${form.markerCenter.lat}" to "${form.markerCenter.lat}"`);
//     if (form.markerCenter.lat != null || (select_trip_address.value != undefined && input == 'drop')) await getGeoAddress(form.markerCenter);
//   }
// ));

// onBeforeRouteLeave((to:any, from:any, next:any) => {
//     unwatch1(); 
//     unwatch2();
// })


function convertCoordinatesToJSON(coordinates) {
  var lat = coordinates.lat();
  var lng = coordinates.lng();
  var JSONCoordinates = {
    "lat": lat,
    "lng": lng
  };
  return JSONCoordinates;
}

const getGeoAddress = async (c: latLng) => {
  if (isOpen.value)  return true;
  
  if (select_trip_address.value == undefined && input == 'drop')  return true;
  if (!form.mapReady) return true;
  if (typeof geocoder == 'undefined') return true;


  if (typeof c.lat == 'function') {
    c = convertCoordinatesToJSON(c);
  }
  if (c.lat == 0) return true;

  if (c != null) {
    await geocoder.geocode( c.lat,c.lng)
        .then((response) => {
        console.log(response);
        if (response == undefined)  return true;

        if (response.status == 'ZERO_RESULTS') {
          return true;
        }
        //if (response && response.length > 0) {
        if (response.results[0]) {
          console.log(response.results);
          const place = {
            address_components: [],
            ...response.results[0],
          };
          if (input === 'pickup') {
            form.s_latitude = +c.lat;       
            form.s_longitude = +c.lng;
            form.s_map_address = place.formatted_address;
          } else {
            if (select_trip_address.value == undefined)  return true;
            
            select_trip_address.value.latitude = +c.lat;
            select_trip_address.value.longitude = +c.lng;
            select_trip_address.value.address = place.formatted_address;
            
              if ( input == 'pickup') {
              select_trip_address.value.pick_meta.name = '';
              select_trip_address.value.pick_meta.phone = '';
            }else{
              select_trip_address.value.drop_meta.name = '';
              select_trip_address.value.drop_meta.phone = '';
            }
          }


          console.log(place);

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

function clear() {
  if (select_trip_address.value == undefined)  return true;

  select_trip_address.value.address = '';
  select_trip_address.value.latitude = 0;
  select_trip_address.value.longitude = 0;
}



async function addMarker(params) {
  console.log(typeof params.lat);
  if (typeof params.lat == 'undefined') return true;
  if (typeof params.lat == 'function') {
    params = convertCoordinatesToJSON(params);
  }

  await map.value.setCamera({
    coordinate: params,
    zoom: 18,
    animate: true,
    animationDuration: 3000
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


function isSelected(params: any) {
  console.log("select:",params);
  hideMarkerInput.value = !params;
  console.log("show marker",hideMarker.value,"input selected",hideMarkerInput.value,"is open",!isOpen.value,"keyboard visible", isVisible );
  
}

const geoCodeMemo = useMemoize(async (c:any) =>
  await geocoder.geocode(c.lat, c.lng)
    .then((response) => response),
)
function clearS() {
  form.s_map_address = '';
  form.s_latitude = 0;
  form.s_longitude = 0;
}


async function gotoNext() {
  if (select_trip_address.value == undefined)  
    return true;

  if ( input == 'pickup') {
    isOpen.value = select_trip_address.value.pick_meta.name == '' || select_trip_address.value.pick_meta.phone == ''
    }else{
      isOpen.value = select_trip_address.value.drop_meta.name == '' || select_trip_address.value.drop_meta.phone == ''
    }
    if (isOpen.value) {
    return true};
    unwatch1(); 
    unwatch2();
    
  d_select.value = false
  s_select.value = false
  // let addrr = {
  //   id :input,
  //   address : select_trip_address.value.address,
  //   latitude : select_trip_address.value.latitude,
  //   longitude : select_trip_address.value.longitude,
  // }
  //useDeliveryAddresses().updateAddress(addrr)
  if (input == 'pickup') {

  } else {
    form.d_map_address = ""+select_trip_address.value?.address;
    form.d_latitude = select_trip_address.value?.latitude ||0;
    form.d_longitude = select_trip_address.value?.longitude||0;
  }

  return router.push({
    path: '/manage-address',
    query: {
      for :route.query.for}
  });
  let addrr2 = {
    address: form.d_map_address,
    latitude: form.d_latitude,
    longitude: form.d_longitude,
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
