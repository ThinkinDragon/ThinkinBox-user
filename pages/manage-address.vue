<template>
  <div>
      <NuxtLayout name="map">
          <template #topnav>
              <button class=" z-20 absolute top-0 w-10 h-10 bg-white dark:bg-gray-900 p-2 m-2 rounded-full">
                  <svg @click="serviceBack()" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
              </button>
          </template>

          <template #sheet>
              <div class="flex flex-col gap-2">
                  <UCard  :ui="cardInvisibleStyles">
                    <template #header>
                      <h4>Confirm Address</h4>
                      <div class="flex flex-row space-x-2.5 items-center justify-around shadow-xl p-2 bg-gray-100 dark:bg-gray-800 border rounded-lg">
                        <nuxt-link replace :to="`/single-address?for=${route.query.for}&input=pickup`" class="flex flex-col w-full items-center justify-end ">
                          <FormSingleAddressForm label="address" :street="form.s_map_address"
                          v-model:street="form.s_map_address" v-model:latitude="form.s_latitude" 
                          v-model:longitude="form.s_longitude"/>
                        </nuxt-link>
                      </div>
                    </template>
                    <div class="flex flex-col gap-2">

                      <div v-for="item in addresses" :key="item.id" class="flex flex-row space-x-2.5 items-center justify-around shadow-xl p-2 bg-gray-100 dark:bg-gray-800 border rounded-lg">
                      <nuxt-link replace :to="`/single-address?for=${route.query.for}&input=drop&itemId=${item.id}`" class="flex flex-col w-full items-center justify-end ">
                        <FormSingleAddressForm label="address" :street="item.address"
                        v-model:street="item.address" v-model:latitude="item.latitude" 
                        v-model:longitude="item.longitude"/>
                      </nuxt-link>
                      </div>
                      
                        <UButton variant="link" class="justify-center" v-if="route.query.for =='multi' || addresses.length != 1" replace :to="`/single-address?for=${route.query.for}&input=drop&newAdd=true`" >
                          add Address
                        </UButton>
                      </div>
                    <template #footer>

                      <div class="flex flex-col gap-2">
                        <RequestGoodType :type="'select'" /> 
                        <UButton :to="`/services?for=${route.query.for}`" class="flex items-center w-full content-between justify-center flex-1 p-2 px-5 py-3 text-white dark:text-gray-900 rounded-lg shadow bg-primary disabled:to-slate-500"> {{ $__('Confirm Drop') }}</UButton>
                      </div>

                    </template>
                  </UCard>
                  
              </div>
          </template>
      </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from '@headlessui/vue'
import type { latLng } from "~/types/booking";

definePageMeta({
  layout: false,
  middleware: ['auth'],
});



const { $_api_ } = useNuxtApp();

const cardInvisibleStyles = {
  base: "overflow-hidden",
  divide: "divide-y-0 divide-gray-200 dark:divide-gray-800",
  ring: "ring-0 ring-gray-200 dark:ring-gray-800",
  rounded: "rounded-none",
  shadow: "shadow-none",
  body: {
    base: "",
    background: "",
    padding: "px-4 py-5 sm:p-6",
  },
  header: {
    base: "",
    background: "",
    padding: "p-3 sm:px-6",
  },
  footer: {
    base: "",
    background: "",
    padding: "p-3 sm:px-6",
  },
};

const map = inject('map');
const route = useRoute()
const router = useRouter()
const { useService, getEstimate, getEta,getDirection, getBanner } = useHome();
const { useUser } = useAuth();
const config = useRuntimeConfig();
const sto = useLoading();
const { loading, silentLoading } = storeToRefs(sto)

// declare store variable
const store = useService();
const store2 = useUser();
const { tag, service,selected_item,items, estimate, direction, eta } = storeToRefs(store);
const { addresses,select_trip_address } = storeToRefs(useDeliveryAddresses());

const { show, user,stage } = storeToRefs(store2);
const setting = useSetting();
const coordinates = ref();
const form = useAddress();
const { currPos } = storeToRefs(useAddress());
const notif = useLocalNotification();
const title = useState("title");
const {clearMap,reloadMap}= useMapFunction(map.value);


onMounted(async () => {
  title.value = "Manage Address";
  estimate.value = null;

  const result = await Promise.allSettled([ getEta(), getDirection(),]);

  service.value = tag.value?.active_service_types[0];

});


async function serviceBack() {
  if (window.confirm("Do you want to go home?")) {
    await clearMap();
    return router.push('/');
  }
}

</script>
