<template>
  <div>
    <NuxtLayout name="single">
      <!-- "services.0.children_recursive.0.children_recursive" -->
      <template v-if="service?.children_recursive?.length == 0" #nav>
        <MainLocation />
      </template>
      <div v-if="service" class="flex flex-col">
        <Title>{{ $__(title) }}</Title>
        <template v-if="service?.children_recursive?.length > 0">
          <SubServiceItem v-for="(item, index) in service?.children_recursive" :key="index" :service="item" class="m-2" />
        </template>
        <div v-else>
          <div class="grid max-w-4xl grid-cols-1 mx-auto">
            <div
              class="relative flex flex-col-reverse col-start-1 row-start-1 p-3 bg-gradient-to-t from-black/75 via-black/0">
              <button
                class="inline-flex items-center justify-center text-white dark:text-gray-900 rounded-md bg-blue-500 px-2 py-0.5 w-fit shadow"
                @click="showDesc = !showDesc">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white dark:text-gray-900" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ $__("About") }}
              </button>
              <h1 class="mt-1 text-lg font-semibold text-white dark:text-gray-900 sm:text-slate-900 md:text-2xl dark:sm:text-white dark:text-gray-900">{{
                  $_api_(service.name)
              }}</h1>
              <div class="inline-flex items-center justify-center rounded-full bg-blue-500 px-2 py-0.5 w-fit shadow">
                <p class="flex flex-row text-xs font-semibold text-white dark:text-gray-900">
                  {{ service?.rating ?? 0 }}
  
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1.5 text-yellow-300" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </p>
              </div>
            </div>
            <div class="grid col-start-1 col-end-3 row-start-1 gap-4">
              <img :src="config.public.BASE_IMAGE_URL + service.image" alt="" class="object-cover w-full max-h-60"
                loading="lazy" />
            </div>
            <!-- <dl class="flex items-center row-start-2 mt-4 text-xs font-medium">
            <dt class="sr-only">Reviews</dt>
            <dd class="flex items-center text-primary dark:text-primary">
              <svg width="24" height="24" fill="none" aria-hidden="true" class="mr-1 stroke-current dark:stroke-primary">
                <path d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z" stroke-width="2" stroke-linecap= "round" stroke-linejoin="round" />
              </svg>
              <span>4.89 <span class="font-normal text-slate-400">(128)</span></span>
            </dd>
            <dt class="sr-only">Location</dt>
            <dd class="flex items-center">
              <svg width="2" height="2" aria-hidden="true" fill="currentColor" class="mx-3 text-slate-300">
                <circle cx="1" cy="1" r="1" />
              </svg>
              <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1 text-slate-400 dark:text-slate-500" aria-hidden="true">
                <path d="M18 11.034C18 14.897 12 19 12 19s-6-4.103-6-7.966C6 7.655 8.819 5 12 5s6 2.655 6 6.034Z" />
                <path d="M14 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
              </svg>
              Collingwood, Ontario
            </dd>
          </dl>
          <div class="self-center col-start-1 row-start-3 mt-4">
            <button type="button" class="px-3 py-2 text-sm font-medium leading-6 text-white dark:text-gray-900 bg-primary rounded-lg">Check availability</button>
          </div> -->
  
            <!-- <p v-show="showDesc" class="col-start-1 m-2 mt-4 text-sm leading-6 dark:text-slate-400 line-clamp-4">
              {{ $_api_(service?.description) }}
            </p> -->
          </div>
          <!-- Coupon Cell -->
          <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true"
            :currency="`${user?.currency}`" />
          <!-- Coupon List -->
          <van-popup v-model:show="showList" round position="bottom" style="height: 90%; padding-top: 4px">
            <van-coupon-list :coupons="coupons" :chosen-coupon="chosenCoupon" @change="onChange" :showExchangeBar="false"
              :currency="`${user?.currency}`" />
          </van-popup>
  
          <div v-if="estimate?.error == null"
            class="relative items-center justify-center w-full p-2 bg-white dark:bg-gray-900 ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg">
            <form @submit.prevent="listProviderNew" enctype="multipart/form-data"
              class="inline-flex flex-col items-center justify-center w-full px-1 py-4 space-y-5 bg-white dark:bg-gray-900">
              <!-- <div class="flex flex-col items-end justify-start space-y-1.5">
                <div class="hidden 6xl:inline-flex items-center justify-center space-x-2.5 rounded-lg bg-blue-500 p-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M17.707 9.293C17.8945 9.48053 17.9998 9.73484 17.9998 10C17.9998 10.2652 17.8945 10.5195 17.707 10.707L10.707 17.707C10.5195 17.8945 10.2652 17.9998 10 17.9998C9.73484 17.9998 9.48053 17.8945 9.293 17.707L2.293 10.707C2.2 10.6143 2.12624 10.5041 2.07596 10.3827C2.02568 10.2614 1.99986 10.1313 2 10V5C2 4.20435 2.31607 3.44129 2.87868 2.87868C3.44129 2.31607 4.20435 2 5 2H10C10.256 2 10.512 2.098 10.707 2.293L17.707 9.293ZM5 6C5.26522 6 5.51957 5.89464 5.70711 5.70711C5.89464 5.51957 6 5.26522 6 5C6 4.73478 5.89464 4.48043 5.70711 4.29289C5.51957 4.10536 5.26522 4 5 4C4.73478 4 4.48043 4.10536 4.29289 4.29289C4.10536 4.48043 4 4.73478 4 5C4 5.26522 4.10536 5.51957 4.29289 5.70711C4.48043 5.89464 4.73478 6 5 6Z"
                      fill="white" />
                  </svg>
                  <p class="text-sm font-medium leading-normal text-right text-white dark:text-gray-900">{{ $__("View Coupons") }}</p>
                </div>
                <p class="w-full text-lg font-semibold text-gray-900 dark:text-gray-200">{{ $__("Add Image") }}</p>
                <div class="inline-flex flex-row items-center justify-between w-full p-1 space-x-4">
                  <van-uploader class="inline-flex items-start justify-start h-full" v-model="upload_img_1"
                    :after-read="afterRead_1" :multiple="false" :max-count="1" />
                  <van-uploader class="inline-flex items-start justify-start h-full" v-model="upload_img_2"
                    :after-read="afterRead_2" :multiple="false" :max-count="1" />
                  <van-uploader class="inline-flex items-start justify-start h-full" v-model="upload_img_3"
                    :after-read="afterRead_3" :multiple="false" :max-count="1" />
                </div>
                <p class="w-full text-xs text-red-500">{{ $__("Max 3 photos upload") }}</p>
                <div class="flex flex-col items-start justify-center w-full space-y-4">
                  <p class="text-lg font-semibold text-gray-900 w-72">{{ $__("Add Description") }}</p>
                  <textarea class="relative border-none rounded-lg h-1/4 w-80 bg-slate-200 focus:border-none"
                    name="description" id="description" v-model="description" cols="20" rows="3"></textarea>
                </div>
              </div> -->
              <!-- <p class="text-sm font-medium leading-normal w-80">Payment Type - Only Card</p> -->
              <div class="flex flex-col items-center justify-start space-y-2">
                <div class="inline-flex items-start justify-between w-full space-x-44">
                  <p class="text-sm leading-normal">{{ $__("Base fee") }}</p>
                  <p class="text-sm font-medium leading-normal text-right">{{ useUser().getCurrency(service?.fixed) }}</p>
                </div>
  
                <div v-if="service?.calculator == 'FIXED'"
                  class="inline-flex items-start justify-between w-full space-x-44">
                  <p class="text-sm leading-normal">{{ $__("Service charges") }} </p>
                  <p class="text-sm font-medium leading-normal text-right">{{ useUser().getCurrency(service?.price) }}</p>
                </div>
                <div v-else class="inline-flex items-start justify-between w-full space-x-44">
                  <p class="text-sm leading-normal">{{ $__("Service charges") }}</p>
                  <p class="text-sm font-medium leading-normal text-right">{{ useUser().getCurrency(service?.price) }}</p>
                </div>
                <div v-if="user.wallet_balance != 0" class="inline-flex items-start justify-between w-full space-x-44">
                  <p class="text-sm leading-normal">{{ $__("Use wallet") }}</p>
                  <input type="checkbox"
                    class="w-4 mt-1 text-primary border-gray-300 rounded shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                    v-model="form.useWallet" id="term" />
                  {{ useUser().getCurrency(user.wallet_balance) }}
  
                </div>
              </div>
              <div v-if="!isSchedule" class="inline-flex w-full items-start justify-start space-x-2 px-2.5">
                <button @click="isSchedule = !isSchedule"
                  class="flex items-center justify-center flex-1 px-5 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 rounded-xl">
                  <p class="text-base font-semibold text-center text-gray-900 dark:text-gray-200">{{ $__("Schedule") }}</p>
                </button>
                <button type="submit" class="flex items-center justify-center flex-1 px-5 py-3 bg-primary rounded-xl">
                  <p class="text-base font-semibold text-center text-gray-50">{{ $__("Request") }}</p>
                </button>
  
              </div>
              <div v-else class="flex flex-col w-full items-start justify-start px-2.5">
                <ClientOnly>
                  <div class="flex flex-col w-full space-y-4">
                    <!-- <van-cell title="Select Date" :value="form.date" is-link @click="show = true">{{ form.date }}</van-cell> -->
                    <div @click="show = true"
                      class="inline-flex items-start justify-start w-full p-4 space-x-3 bg-gray-100 dark:bg-gray-800 border-2 rounded-xl">
                      <svg class="w-6 h-6" width="20" height="20" viewBox="0 0 20 20" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M5 0C5.55228 0 6 0.447715 6 1V2H14V1C14 0.447715 14.4477 0 15 0C15.5523 0 16 0.447715 16 1V2H17C18.6569 2 20 3.34315 20 5V17C20 18.6569 18.6569 20 17 20H3C1.34315 20 0 18.6569 0 17V5C0 3.34315 1.34315 2 3 2H4V1C4 0.447715 4.44772 0 5 0ZM14 4V5C14 5.55228 14.4477 6 15 6C15.5523 6 16 5.55228 16 5V4H17C17.5523 4 18 4.44771 18 5V8H2V5C2 4.44772 2.44772 4 3 4H4V5C4 5.55228 4.44772 6 5 6C5.55228 6 6 5.55228 6 5V4H14ZM2 10V17C2 17.5523 2.44772 18 3 18H17C17.5523 18 18 17.5523 18 17V10H2Z"
                          fill="#434355" />
                      </svg>
                      <div class="inline-flex flex-col items-start justify-start flex-1 space-y-1">
                        <p class="w-full text-xs font-medium leading-3 tracking-wide text-gray-500 uppercase">{{
                            $__("Date")
                        }}</p>
                        <p class="w-full text-base font-semibold leading-normal text-gray-900 dark:text-gray-200">{{ $__("Select your Date")
                        }}</p>
                      </div>
                      {{ form.date }}
                    </div>
                    <van-calendar v-model="form.date" v-model:show="show" teleport="#modals" @confirm="gaetdate"
                      color="#000000" />
  
                    <!-- <van-cell title="Select Time" :value="form.time" is-link @click="showPopup">{{ form.time }}</van-cell> -->
                    <div @click="showPopup"
                      class="inline-flex items-start justify-start w-full p-4 space-x-3 bg-gray-100 dark:bg-gray-800 border-2 rounded-xl">
                      <!-- <svg class="w-6 h-6" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="#6F767E" />
                      </svg> -->
                      <svg class="w-6 h-6" width="22" height="22" viewBox="0 0 22 22" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          fill="#6F767E" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M12 6C12.5523 6 13 6.44772 13 7V11.5858L15.2071 13.7929C15.5976 14.1834 15.5976 14.8166 15.2071 15.2071C14.8166 15.5976 14.1834 15.5976 13.7929 15.2071L11.5858 13C11.2107 12.6249 11 12.1162 11 11.5858V7C11 6.44772 11.4477 6 12 6Z"
                          fill="#6F767E" />
                      </svg>
  
                      <div class="inline-flex flex-col items-start justify-start flex-1 space-y-1">
                        <p class="w-full text-xs font-medium leading-3 tracking-wide text-gray-500 uppercase">{{
                            $__("Time")
                        }}</p>
                        <p class="w-full text-base font-semibold leading-normal text-gray-900 dark:text-gray-200">{{ $__("Select Visit Time")
                        }}</p>
                      </div>
                      {{ form.time }}
                    </div>
                    <van-popup v-model:show="showTime" position="bottom" :style="{ height: '40%' }" teleport="#modals">
                      <van-datetime-picker @confirm="gaetdatetime" @cancel="showPopup" v-model="form.time" type="time"
                        title="Choose Time" />
                    </van-popup>
                  </div>
                </ClientOnly>
                <!-- <div class="relative w-full mt-4"> :min-hour="0" :max-hour="24"
              <select class="relative w-full h-10 px-4 text-base border-2 shadow-lg bg-secondary-100 dark:bg-secondary-800 border-secondary-200 dark:border-secondary-700 rounded-xl sm:h-14 focus:border-primary-300" v-model="form.type">
                <option value="home">{{ "Home" }}</option>
                <option value="office">{{ "Office" }}</option>
                <option value="other">{{ "other" }}</option>
              </select>
              <label for="type" value="type" />
            </div> -->
                <div class="flex flex-row items-center justify-between w-full space-x-2">
                  <button @click="scheduleReset()"
                    class="flex items-center content-between justify-center flex-1 w-full p-2 px-5 py-3 mt-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 rounded-xl">
                    <p class="text-base font-semibold text-center text-gray-900 dark:text-gray-200">{{ $__("Back") }}</p>
                  </button>
  
                  <button
                    class="flex items-center content-between justify-center flex-1 w-full p-2 px-5 py-3 mt-4 text-white dark:text-gray-900 bg-primary btn-grad rounded-xl"
                    :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    <p class="text-base font-semibold text-center text-gray-50">{{ $__("Request") }}</p>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div v-else
            class="relative items-center justify-center w-full p-2 text-center bg-white dark:bg-gray-900 ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg">
            {{ $__("Coming Soon") }}
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import { storeToRefs } from "pinia";
import type { UploaderInstance } from "vant";

const title = useState("title");
const route = useRoute();
const router = useRouter();
const { useService, getEstimate } = useHome();
const config = useRuntimeConfig();
const { errorResponse } = useBase();
const sto = useLoading();
const { loading } = storeToRefs(sto);
// declare store variable
const store = useService();
definePageMeta({
  
  layout: false,
  middleware: ["auth"],
});
let fdata = new FormData();
const { useUser } = useAuth();
const form = useAddress();
const isSchedule = ref(false);
const description = ref(null);

const { useBookings } = useBooking();
const booking = useBookings();
const { provider } = storeToRefs(booking);
const { addresses,select_trip_address } = storeToRefs(useDeliveryAddresses());

const showDesc = ref(false);

const store2 = useUser();
const { coupons, user } = storeToRefs(store2);

const { service, services, estimate } = storeToRefs(store);

const showList = ref(false);
const chosenCoupon = ref(-1);

const onChange = (index) => {
  showList.value = false;
  chosenCoupon.value = index;
};
onMounted(async () => {
  title.value = "Loading service"
  provider.value = null
  //getEstimate(+route.params.id)

  await store
    .getServiceById(+route.params.id)
    .then((result) => {
      title.value = service.value?.name?.en;
    })
    .catch((err) => {
      console.log(err);
    });

  useUser().getPromocode();

});

const date = ref("");
const show = ref(false);
const formatDate = (date) => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;

const showTime = ref(false);
const showPopup = () => {
  showTime.value = !showTime.value;
};

const gaetdatetime = (value) => {
  showTime.value = !showTime.value;
  form.time = value;
};

const gaetdate = (value) => {
  date.value = formatDate(value);
  form.date = date.value;
  show.value = !show.value;
};

function scheduleReset() {
  isSchedule.value = !isSchedule.value;
  form.date = null;
  form.time = null;
}

async function listProviderNew() {
  try {
    sto.show();
    if (form.s_latitude == 0 && form.s_map_address == "" && form.s_longitude == 0) {
      let result = confirm("Set Address to continue");
      if (result) {
        router.push(`/set-address`);
        return true;
      } else {
        return true;
      }
    }


    fdata.append("use_wallet", form.useWallet ? "1" : "0");
    fdata.append("s_latitude", ""+form.s_latitude);
    fdata.append("s_longitude", ""+form.s_longitude);
    fdata.append("s_address", form.s_map_address);
    fdata.append("d_latitude", ""+form.d_latitude);
    fdata.append("d_longitude", ""+form.d_longitude);
    fdata.append("d_address", form.d_map_address);

    if (chosenCoupon.value != -1 && coupons.value.length > 0) {
      fdata.append("promocode_id", `${coupons.value[chosenCoupon?.value]?.id}`);
    }
    fdata.append("trip_addresses", "" + addresses.value);
    fdata.append("description", "" + description.value);

    fdata.append("description", "" + description.value);
    fdata.append("service_type", "" + route.params.id);
    fdata.append("payment_mode", "CASH");
    fdata.append("use_wallet", form.useWallet ? "1" : "0");
    let data;
    if (isSchedule.value) {
      fdata.append("schedule_date", form.date);
      fdata.append("schedule_time", form.time);
      data = await useFetchAuth("/api/user/send-request", {
        method: "POST",
        body: fdata,
      })
        .then((result: any) => {
          sto.hide();
          data = result;

          if (data.request_id != undefined) {
            
            //map_address.value = ""
            router.push(`/booking/${data.request_id}`);
          }
        })
        .catch((err: any) => {
          sto.hide();
          return errorResponse(err);
        });
    } else {
      await useFetchAuth("/api/user/send-request", {
        method: "POST",
        body: fdata,
      })
        .then((result: any) => {
          sto.hide();
          data = result;
          if (data.request_id != undefined) {
            
            //map_address.value = ""
            router.push(`/booking/${data.request_id}`);
          }
        })
        .catch((err: any) => {
          sto.hide();
          return errorResponse(err);
        });
    }
  } catch (err) {
    sto.hide();
    errorResponse(err?.data);
  }
}
</script>
