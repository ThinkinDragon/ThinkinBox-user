<template>
    <div>
        <NuxtLayout name="map">
            <template #topnav>
                <button class=" z-20 absolute top-0 w-10 h-10 bg-white dark:bg-gray-900 p-2 m-2 rounded-full">
                    <svg @click="serviceBack()" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <!-- <svg class="h-full flex-1 " viewBox="0 0 20 20" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M18.3333 11.25H5.25L9.83333 17.5H6.91667L1.5 10L6.91667 2.5H9.83333L5.25 8.75H18.3333V11.25Z"
                            fill="black" />
                    </svg> -->
                </button>
            </template>

            <template #subnav>
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
                    <div class="flex flex-col w-full  justify-end ">
                        <nuxt-link :to="`/set-address?for=${route.query.for}&input=pick`">
                            <FormSingleAddressForm label="address" :street="form.s_map_address"
                                v-model:street="form.s_building" v-model:latitude="form.s_latitude"
                                v-model:longitude="form.s_longitude" v-model:map_address="form.s_map_address" />
                        </nuxt-link>
                        <div class="w-full h-0.5 border-1 border-gray-300 bg-gray-300 "></div>

                        <nuxt-link :to="`/set-address?for=${route.query.for}&input=drop`">
                            <FormSingleAddressForm label="address" :street="form.d_map_address"
                                v-model:street="form.d_building" v-model:latitude="form.d_latitude"
                                v-model:longitude="form.d_longitude" v-model:map_address="form.d_map_address" />

                        </nuxt-link>
                    </div>
                </div>
            </template>

            <template #sheet>
                <div class="flex flex-col gap-2">
                    
                    <CommonServices v-model="service" @ser="getEstimateFun" :items="tag?.active_service_types"/>

                    <FormBooking v-show="eta?.data == 'SUCCESS'" >
                        <div v-show="eta?.data == 'SUCCESS'" class="inline-flex space-x-4 items-start justify-between w-full">
                            <div class="flex space-x-2.5 items-center justify-center">
                                <p class="text-sm leading-snug text-gray-500"> {{ $__("Distance") }}</p>
                                <p class="text-xs font-medium leading-tight">{{ eta?.meter_text }}</p>
                            </div>
                            <div class="flex space-x-2.5 items-center justify-center">
                                <p class="text-sm leading-snug text-gray-500">{{ $__("Duration") }}</p>
                                <p class="text-xs font-medium leading-tight">{{ eta?.time }}</p>
                            </div>
                        </div>
                        <RequestGoodType /> 
                    </FormBooking>

                    <!-- <button v-show="eta?.data == 'SUCCESS'" 
                        class="inline-flex items-center justify-center w-full px-2 py-3 bg-primary rounded-lg disabled:to-slate-500"
                        :disabled="service == 1">
                        <p class="text-base font-semibold text-white dark:text-gray-900">Fare Detail</p>
                    </button> -->
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
    middleware: ['auth']
});

const { $_api_ } = useNuxtApp();


const map = inject('map');
const {drawRoute} = useMapFunction(map.value);
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
const { platform } = useFirebase();
const notif = useLocalNotification();
let geocoder;
const title = useState("title");


onMounted(async () => {
    estimate.value = null;
    console.log(tag.value?.active_service_types[0]);

    service.value = tag.value?.active_service_types[0];
    console.log(service.value?.id);
    const result = await Promise.allSettled([ getEta(), getDirection(),]);


});

watchEffect( async() => {
    if (typeof service.value?.id != 'undefined') {
    getEstimateFun(service.value?.id);
    title.value = $_api_(service.value?.name)
    await getEta();
    await drawRoute(direction.value);

    }
})

async function selectService(valStage:number) {

    getEstimateFun(service.value?.id);
    stage.value = valStage;
}
async function getEstimateFun(valStage:number) {
    getEstimate(+valStage);
}

async function serviceBack() {
    if (stage.value > 0) {
        return stage.value--;
    }
    if (estimate.value != null) {
        return estimate.value = null

    } else {
        return router.back();
    }
}

</script>
  