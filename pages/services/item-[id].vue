<template>
    <div>
        <NuxtLayout name="single">

            <div class="items-center w-auto mx-1 h-full">
                <template v-if="forType === 'none'">
                        <RequestSinglePackage v-for="(address, index) in addresses" :key="index" v-model:address="select_trip_address">
                            <template #final-button>
                                <div class="w-full p-2">
                                    <UiButton size="lg" class="w-full text-white dark:text-gray-900" :disabled="!dataFill" @click="router.push(`/services?for=${forType}`)">Select Delivery methods</UiButton>
                                </div>
                            </template>
                        </RequestSinglePackage>
                </template>
                <template v-else-if="forType === 'multi'">
                    <div class=" space-y-3">
                        <div class="flex flex-row space-x-2 items-center justify-around p-2 bg-gray-100 dark:bg-gray-800 border rounded-lg">
                            <!-- <div class="flex w-10 flex-col space-y-2 items-center justify-center">
                                <div class="flex w-4 h-4 bg-primary rounded-full" />
                            </div> -->

                            <nuxt-link replace :to="`/single-address?for=${route.query.for}&input=pickup`"
                                class="flex flex-col w-full items-center justify-end ">
                                <FormSingleAddressForm label="address" :street="form.s_map_address"
                                    v-model:street="form.s_building" v-model:latitude="form.s_latitude"
                                    v-model:longitude="form.s_longitude" v-model:map_address="form.s_map_address" />
                            </nuxt-link>
                        </div>
                        <div v-for="(address, index) in addresses" :key="index" :value="address.id"
                            class="flex flex-col w-full py-2 ">
                            <!-- <div @click="select_trip_address = address">#{{ index }}</div> -->
                            <nuxt-link replace :to="`/single-address?for=${route.query.for}&input=${address.id}`"
                            class="flex flex-row space-x-2 items-center justify-around p-2 bg-gray-100 dark:bg-gray-800 border rounded-lg my-2">
                            <FormSingleAddressForm label="address" placeholder="delivery"
                                v-model:street="address.address" v-model:latitude="address.latitude"
                                v-model:longitude="address.longitude" v-model:map_address="address.address" />
                        </nuxt-link>
                        <UiButton class="w-full" @click="showModel(address)">edit item</UiButton>

                        </div>
                    </div>
                    <UiButton class="w-full" @click="addAddress">Add Delivery Point</UiButton>

                </template>
                <template v-else-if="forType !== 'none'">
                    <div class="space-y-6">
                        <div class="flex flex-row space-x-2 items-center justify-around p-2 bg-gray-100 dark:bg-gray-800 border rounded-lg">
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
                            <nuxt-link replace :to="`/single-address?for=${route.query.for}`"
                                class="flex flex-col w-full items-center justify-end ">
                                <FormSingleAddressForm label="address" :street="form.s_map_address"
                                    v-model:street="form.s_building" v-model:latitude="form.s_latitude"
                                    v-model:longitude="form.s_longitude" v-model:map_address="form.s_map_address" />

                                <div class="w-full h-0.5 border-1 border-gray-300 bg-gray-300 "></div>

                                <FormSingleAddressForm label="address" :street="form.d_map_address"
                                    v-model:street="form.d_building" v-model:latitude="form.d_latitude"
                                    v-model:longitude="form.d_longitude" v-model:map_address="form.d_map_address" />

                            </nuxt-link>
                        </div>
                        <div class="mx-auto w-full max-w-md">
                            <RadioGroup v-model="service">
                                <RadioGroupLabel class="sr-only">Cab Available</RadioGroupLabel>
                                <div class="space-y-2">
                                    <RadioGroupOption as="template" v-for="plan in tag?.active_service_types" :key="plan.id"
                                        :value="plan" @click="service = plan" v-slot="{ active }">
                                        <div :class="[
                                            service == plan
                                                ? 'bg-primary'
                                                : 'bg-gray-100',
                                        ]"
                                            class="inline-flex space-x-11 items-center justify-between w-full h-16 p-2.5 rounded-lg">
                                            <div class="flex w-full items-center justify-between"
                                                :class="service == plan ? 'text-white' : 'text-gray-900'">
                                                <img class="w-14 h-9" :src="config.public.BASE_IMAGE_URL + plan.image"
                                                    alt="" srcset="" />
                                                <div class="inline-flex flex-col items-start justify-start w-48">
                                                    <p class="text-base">{{ $_api_(plan.name) }}</p>
                                                </div>
                                                <p v-if="service == plan" class="text-sm font-medium leading-snug"></p>
                                                <p v-else class="text-sm font-medium leading-snug"></p>

                                            </div>
                                        </div>
                                    </RadioGroupOption>
                                </div>
                            </RadioGroup>
                        </div>
                        <div v-show="eta?.data == 'SUCCESS'"
                            class="inline-flex space-x-4 items-start justify-between w-full">
                            <div class="flex space-x-2.5 items-center justify-center">
                                <p class="text-sm leading-snug text-gray-500"> {{ $__("Distance") }}</p>
                                <p class="text-xs font-medium leading-tight">{{ eta?.meter_text }}</p>
                            </div>
                            <div class="flex space-x-2.5 items-center justify-center">
                                <p class="text-sm leading-snug text-gray-500">{{ $__("Duration") }}</p>
                                <p class="text-xs font-medium leading-tight">{{ eta?.time }}</p>
                            </div>
                        </div>
                        <UButton v-show="eta?.data == 'SUCCESS'" @click="getEstimate(+service?.id)"
                            class="inline-flex items-center justify-center w-full px-2 py-3 bg-primary rounded-lg disabled:to-slate-500"
                            :disabled="service == 1">
                            <p class="text-base font-semibold text-white dark:text-gray-900">Fare Detail</p>
                        </UButton>
                    </div>
                </template>
            </div>
            <!-- <template #bottom>
                <div class="w-full p-2">
                    <UiButton size="lg" class="w-full text-white dark:text-gray-900" :disabled="!dataFill" @click="router.push(`/services?for=${forType}`)">Select Delivery methods</UiButton>
                </div>
            </template> -->
            <van-popup v-model:show="popup" :style="{ height: '70%' }" position="bottom">
                <UiScrollArea class="w-full h-full">
                    <UiTabs default-value="1" class="flex flex-col w-auto">
                        <UiTabsList class="flex space-x-1 h-auto overflow-x-auto w-full pl-4">
                            <UiTabsTrigger v-for="(item, index) in items" :key="index" :value="'' + item.id"
                                class="flex flex-col !m-1 !p-1 justify-center h-20 min-w-20 active:bg-primary">
                                <img class="object-cover object-center h-16" :src="config.public.BASE_IMAGE_URL + item.marker" alt="" srcset="" />
                                <p>{{ $_api_(item.name) }}</p>
                            </UiTabsTrigger>
                        </UiTabsList>
                        <UiTabsContent v-for="(item, index) in items" :key="index" :value="'' + item.id">
                            <UiCard class="border-none w-full">
                                <UiCardHeader class="!p-2">
                                    <UiCardTitle>{{ $_api_(item.name) }}</UiCardTitle>
                                    <UiCardDescription>
                                        Select your package type and number of required package
                                    </UiCardDescription>
                                </UiCardHeader>
                                <UiCardContent class="space-y-1 w-full !p-2">
                                    <UiScrollArea class="h-72 w-full rounded-md border-none ">
                                        <SelectItems :key="item.id" v-model="select_trip_address.items"
                                            :items="item?.sub_items" />
                                    </UiScrollArea>
                                </UiCardContent>
                            </UiCard>
                        </UiTabsContent>
                    </UiTabs>
                </UiScrollArea>
            </van-popup>
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
import type { trip_addresses, trip_address } from "@/types/booking.d";



definePageMeta({
    layout: false,
    middleware: ['auth']
});

const route = useRoute()
const router = useRouter()
const { useService, getEstimate, getEta, getBanner } = useHome();
const { useUser } = useAuth();
const config = useRuntimeConfig();
const sto = useLoading();
const forType = ref(route.query.for ?? 'none');
const { loading, silentLoading } = storeToRefs(sto)
const { $useScript } = useNuxtApp();

// declare store variable
const store = useService();
const store2 = useUser();
const { tag, service, selected_item, items, estimate, eta } = storeToRefs(store);
const { addresses, select_trip_address } = storeToRefs(useDeliveryAddresses());

const { show, user, stage } = storeToRefs(store2);
const setting = useSetting();
const coordinates = ref();
const popup = ref(false);

const form = useAddress();
const formReact = storeToRefs(useAddress());

const { currPos } = storeToRefs(useAddress());
const { platform } = useFirebase();
const notif = useLocalNotification();
let geocoder;

onMounted(async () => {
    estimate.value = null;

    if (addresses.value.length == 0) {
        let dataa = {
            comments: "",
            rate: "",
            qty: 0,
            amount: 0,
            weight: 0,
            image: "",
            edit: false,
            pick_meta:{
                name: "",
                phone: "",
                address: "",
                latitude: 0,
                longitude: 0,
            },
            drop_meta:{
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

        useDeliveryAddresses().pushAddress(dataa);

    }

    service.value = tag.value?.active_service_types[0];
});

const dataFill = computed(() => formReact.s_map_address?.value?.length > 0 && formReact.d_map_address?.value?.length > 0)

async function selectService(valStage: number) {

    // let data = {
    //     items: selected_item,
    //     latitude: form.d_latitude,
    //     longitude: form.d_longitude,
    //     address: form.d_map_address,
    //     status: 0,
    //     comments: ""
    // }

    // addresses.value.push(data);
    //service.value = tag.value?.active_service_types[0]?.id;
    getEstimateFun(service.value?.id);
    //tag.value = servi
    //console.table(selected_item);
    stage.value = valStage;
}
async function getEstimateFun(valStage: number) {
    getEstimate(+valStage);
}

async function showModel(params:any) {
    select_trip_address.value = params
    popup.value = true;
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

async function goToDeliv() {

     return router.push(`/services?for=${forType.value}`) 
}

async function addAddress() {
    let dataa = {
        comments: "",
        rate: "",
        qty: 0,
        amount: 0,
        weight: 0,
        image: "",
        edit: false,
        address: "",
        latitude: 0,
        longitude: 0,
        items: [],
        status: 0,
    }

    useDeliveryAddresses().pushAddress(dataa);
}

</script>
  