<template>
  <div>
    <LoadingData :data="estimate">
    <!-- Coupon Cell -->
    <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true"
      :currency="`${user?.currency}`" />
    <!-- Coupon List -->
    <van-popup v-model:show="showList" round position="bottom" style="height: 90%; padding-top: 4px">
      <van-coupon-list :coupons="coupons" :chosen-coupon="chosenCoupon" @change="onChange" :showExchangeBar="false"
        :currency="`${user?.currency}`" />
    </van-popup>

    <div v-if="estimate?.error == null"
      class="relative items-center justify-center w-full px-2 bg-white dark:bg-gray-900 ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg">
      <form @submit.prevent="listProvider" enctype="multipart/form-data"
        class="inline-flex flex-col items-center justify-center w-full px-1 py-4 space-y-5 bg-white dark:bg-gray-900">
        <div class="flex flex-col items-center justify-start gap-0.1">
          <div class="inline-flex items-start justify-between w-full space-x-44">
            <p class="text-sm leading-normal">{{ $__("Base fee") }}</p>
            <p class="text-sm font-medium leading-normal text-right">{{ useUser().getCurrency(service?.fixed) }}</p>
          </div>
          <div v-if="estimate?.estimated_fare" class="inline-flex items-start justify-between w-full space-x-44">
            <p class="text-sm leading-normal">{{ $__("Estimate") }} </p>
            <p class="text-sm font-medium leading-normal text-right">{{ useUser().getCurrency(estimate?.estimated_fare) }}</p>
          </div>
          <!-- <div v-if="formDelivery?.getAddressCount > 0" class="inline-flex items-start justify-between w-full space-x-44">
            <p class="text-sm leading-normal">{{ $__("Delivery locations") }} </p>
            <p class="text-sm font-medium leading-normal text-right">{{ formDelivery?.getAddressCount }}</p>
          </div> -->
          <div v-if="formDelivery?.getItems.length > 0" class="inline-flex items-start justify-between w-full space-x-44">
            <p class="text-sm leading-normal">{{ $__("Items") }} </p>
            <p class="text-sm font-medium leading-normal text-right">{{ useUser().getCurrency(formDelivery?.getItemTotal) }}</p>
          </div>


          <!-- <div v-if="service?.calculator == 'FIXED'" class="inline-flex items-start justify-between w-full space-x-44">
            <p class="text-sm leading-normal">{{ $__("Service charges") }} </p>
            <p class="text-sm font-medium leading-normal text-right">{{ useUser().getCurrency(service?.price) }}</p>
          </div> -->
          <div v-else class="inline-flex items-start justify-between w-full space-x-44">
            <p class="text-sm leading-normal">{{ $__("Service charges") }}</p>
            <p class="text-sm font-medium leading-normal text-right">{{ useUser().getCurrency(service?.price) }}</p>
          </div>
          <div class="inline-flex items-start justify-between w-full space-x-44">
            <p class="text-sm leading-normal">{{ $__("Total") }} </p>
            <p class="text-sm font-medium leading-normal text-right">{{ useUser().getCurrency(formDelivery?.getItemTotal + estimate?.estimated_fare + service?.fixed) }}</p>
          </div>
          <div v-if="user.wallet_balance != 0" class="inline-flex items-start justify-between w-full space-x-44">
            <p class="text-sm leading-normal">{{ $__("Use wallet") }}</p>
            <input type="checkbox"
              class="w-4 mt-1 text-primary border-gray-500 rounded shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              v-model="form.useWallet" id="term" />
            {{ useUser().getCurrency(user.wallet_balance) }}
          </div>
          <div class="inline-flex items-start justify-between w-full space-x-44">
            <p class="text-sm leading-normal">{{ $__("Payment Mode") }}</p>
              <USelectMenu v-model="form.payment_mode" :options="optionPayment" class=" mt-1 text-primary border-gray-300 rounded shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
          </div>
        </div>
        <slot/>
        <div class="inline-flex w-full items-start justify-start space-x-2 px-2.5">
          <!-- <button @click="isSchedule = !isSchedule"
            class="flex items-center justify-center flex-1 px-5 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 rounded-xl">
            <p class="text-base font-semibold text-center text-gray-900 dark:text-gray-200">{{ $__("Schedule") }}</p>
          </button> -->
          <button type="submit" class="flex items-center justify-center flex-1 px-5 py-3 bg-primary rounded-xl">
            <p class="text-base font-semibold text-center text-gray-50">{{ $__("Request") }}</p>
          </button>

        </div>
        <UModal class="z-[99999999] p-2" v-model="isSchedule">
          <UCard>
            <template #header>
              Select Date and time
            </template>
  
            <div class="flex flex-col w-full items-start justify-start px-2.5">
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
                      <p class="w-full text-xs font-medium leading-3 tracking-wide text-gray-500 uppercase">{{ $__("Date")
                      }}
                      </p>
                      <p class="w-full text-base font-semibold leading-normal text-gray-900 dark:text-gray-200">{{ $__("Select your Date") }}
                      </p>
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
                      <p class="w-full text-xs font-medium leading-3 tracking-wide text-gray-500 uppercase">{{ $__("Time")
                      }}
                      </p>
                      <p class="w-full text-base font-semibold leading-normal text-gray-900 dark:text-gray-200">{{ $__("Select Visit Time") }}
                      </p>
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

            </div>
          <template #footer>
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
            </div>          </template>
          </UCard>
        </UModal>
      </form>
    </div>
    <div v-else
      class="relative items-center justify-center w-full p-2 text-center bg-white dark:bg-gray-900 ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg">
      {{ $__("Coming Soon") }}
    </div>
    </LoadingData>
  </div>
</template>
  
<script setup lang="ts">
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const { useService } = useHome();
const config = useRuntimeConfig();
const { errorResponse } = useBase();
const sto = useLoading();
const { loading } = storeToRefs(sto);
// declare store variable
const store = useService();

let fdata = new FormData();
const { useUser } = useAuth();
const form = useAddress();
const formDelivery = useDeliveryAddresses();
const isSchedule = ref(false);
const description = ref(null);

const { useBookings } = useBooking();
const booking = useBookings();
const { provider } = storeToRefs(booking);

const showDesc = ref(false);

const store2 = useUser();
const { coupons, user } = storeToRefs(store2);

const { service, estimate } = storeToRefs(store);

const optionPayment = ['CASH','ONLINE'];
const showList = ref(false);
const chosenCoupon = ref(-1);

const onChange = (index:any) => {
  showList.value = false;
  console.log(index);
  chosenCoupon.value = index;
};

onMounted(async () => {
  useUser().getPromocode();
});

const date = ref("");
const show = ref(false);
const formatDate = (date:any) => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;

const showTime = ref(false);
const showPopup = () => {
  showTime.value = !showTime.value;
};

const gaetdatetime = (value:any) => {
  showTime.value = !showTime.value;
  form.time = value;
};

const gaetdate = (value:any) => {
  date.value = formatDate(value);
  form.date = date.value;
  show.value = !show.value;
};

function scheduleReset() {
  isSchedule.value = !isSchedule.value;
  form.date = null;
  form.time = null;
}

async function listProvider() {
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


    fdata.append("use_wallet", ""+(form.useWallet ?? "0"));
    fdata.append("distance", "0");

    // TODO: for testing only
    // fdata.append("provider_id", "1");

    fdata.append("service_required", route.query.for);

    if (formDelivery.addresses.length > 0) {
    fdata.append("trip_address", JSON.stringify(formDelivery.addresses));
    }

    //formDelivery.addresses = []
    fdata.append("s_latitude", "" + form.s_latitude);
    fdata.append("s_longitude", "" + form.s_longitude);
    fdata.append("s_address", form.s_map_address);
    fdata.append("d_latitude", "" + form.d_latitude);
    fdata.append("d_longitude", "" + form.d_longitude);
    fdata.append("d_address", form.d_map_address);

    if (chosenCoupon.value != -1 && coupons.value.length > 0) {
      fdata.append("promocode_id", `${coupons.value[chosenCoupon?.value]?.id}`);
    }
    fdata.append("estimated_fare", "" + (+formDelivery?.getItemTotal + +estimate.value?.estimated_fare + +service.value?.fixed));

    fdata.append("description", "" + description.value);
    fdata.append("service_type", "" + service.value.id);
    fdata.append("payment_mode", form.payment_mode);
    fdata.append("use_wallet", form.useWallet ? "1" : "0");

    let data;
    if (isSchedule.value) {
      fdata.append("schedule_date", form.date);
      fdata.append("schedule_time", form.time);
      
      await useFetchAuth("/api/user/send-request", {
        method: "POST",
        body: fdata,
      })
        .then((result: any) => {
          sto.hide();
          data = result;

          if (data.request_id != undefined) {
            
            //map_address.value = ""
            formDelivery.addresses = []
            estimate.value = null
            router.push(`/booking/${data.request_id}`);
          }
        })
        .catch((err: any) => {
          sto.hide();
          return errorResponse("Requesting - Solicitando");
        });
    } else {
      await useFetchAuth("/api/user/send-request", {
        method: "POST",
        body: fdata,
      }).then((result: any) => {
          sto.hide();
          data = result;
          if (data.request_id != undefined) {
            
            //map_address.value = ""
            formDelivery.addresses = []
            estimate.value = null
            router.push(`/booking/${data.request_id}`);
          }
        })
        .catch((err: any) => {
          sto.hide();
          return errorResponse("Requesting - Solicitando");
        });
    }
  } catch (err) {
    sto.hide();
    errorResponse(err);
  }
}
</script>
  