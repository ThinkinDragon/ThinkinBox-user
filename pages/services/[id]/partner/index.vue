<template>
  <div>
    <NuxtLayout name="single">
      <div class="inline-flex flex-col items-center justify-end w-full pt-4 pb-6 pl-5 pr-4 space-y-6 bg-white dark:bg-gray-900">
        <div v-if="providers != undefined" class="relative flex flex-col w-full p-2 space-y-4">
          <div v-for="(item, index) in providers" :key="index" @click="edit(item)"
            class="inline-flex items-center justify-between w-full pb-2 space-x-4 border-b-2">
            <img v-if="!item?.avatar" src="~/assets/image/partnerAvatar.png" alt="" srcset=""
              class="w-16 h-16 rounded-xl" />
            <img v-else :src="item?.avatar ? config.public.BASE_IMAGE_URL + item?.avatar : avatarStatic " alt="" srcset=""
              class="w-16 h-16 rounded-xl" />
            <div class="inline-flex w-full flex-grow flex-col items-start justify-evenly space-y-1.5 px-4">
              <div class="flex flex-col items-start justify-start w-full space-y-1">
                <p class="w-full text-sm font-semibold text-gray-900 dark:text-gray-200">{{ item?.first_name }}</p>
              </div>
              <div class="inline-flex items-center justify-start w-full space-x-2">
                <div class="inline-flex items-center justify-center rounded-full bg-blue-500 px-2 py-0.5 w-fit shadow">
                  <p class="flex flex-row text-xs font-semibold text-white dark:text-gray-900">
                    {{ item?.rating ?? 0 }}
  
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1.5 text-yellow-300" viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </p>
                </div>
              </div>
              <!-- <div class="inline-flex h-6 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800 px-1.5">
                <p class="text-xs font-semibold text-gray-900 dark:text-gray-200">{{ useUser().getCurrency(item.price) }}</p>
              </div> -->
            </div>
          
          <div class="inline-flex flex-col space-y-1.5">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </button>
            </div>
          </div>
        </div>
      </div>
      <Sheet v-model:visible="isOpen" containerColor="rgba(0,0,0,)">
        <div class="p-2">
          <div class="flex flex-col space-y-4 justify-start">
            <div class="flex flex-row">
              <img v-if="!provider?.avatar" src="~/assets/image/partnerAvatar.png" alt="" srcset=""
                class="w-16 h-16 rounded-xl" />
              <img v-else :src="provider?.avatar ? config.public.BASE_IMAGE_URL + provider?.avatar : avatarStatic" alt="" srcset="" class="w-16 h-16 rounded-xl" />
              <div class="inline-flex w-full flex-grow flex-col items-start justify-evenly space-y-1.5 px-4">
                <div class="flex flex-col items-start justify-start w-full space-y-1">
                  <p class="w-full text-sm font-semibold text-gray-900 dark:text-gray-200">{{ provider?.first_name }}</p>
                </div>
                <div class="flex flex-col items-start justify-evenly">
                  <!-- <div class="inline-flex h-6 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800 px-1.5">
                      <p class="text-xs font-semibold text-gray-900 dark:text-gray-200">{{ useUser().getCurrency(item.price) }}</p>
                    </div> -->
                </div>
              </div>
            </div>
            <!-- <div class="inline-flex items-center justify-start w-full space-x-2">
                  <p class="flex-1 text-xs font-medium leading-none text-gray-400 line-clamp-2">{{ provider
                  }}</p>
                </div> -->
            <p class="text-base font-medium text-left text-gray-900 dark:text-gray-200">{{ $__("Services") }}</p>
            <PartnerServices :services="provider.service">
              <div class="flex flex-col items-center justify-center w-full mt-2 space-x-4 space-y-4">
                <p class="text-base font-medium text-center text-gray-900 dark:text-gray-200">{{ $__("Review & Rating") }}</p>
                <p class="text-2xl font-medium text-center text-gray-900 dark:text-gray-200">{{ provider.rating }}</p>
                <div class="inline-flex items-center justify-center space-x-1">
                  <van-rate v-model="provider.rating" :size="25" color="#ffd21e" void-icon="star" Readonly
                    void-color="#eee" />
                </div>
              </div>
            </PartnerServices>
            <button @click="listProvider()" class="flex items-center justify-center flex-1 px-5 py-3 bg-primary rounded-xl">
              <p class="text-base font-semibold text-center text-gray-50">{{ $__("Connect with") }} {{
              provider?.first_name }} </p>
            </button>
          </div>
        </div>
      </Sheet>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { Sheet } from 'bottom-sheet-vue3';
import { format } from "date-fns";
import { storeToRefs } from "pinia";
import type { UploaderInstance } from "vant";
import avatarStatic from '~/assets/image/avatar.png';

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

const form = useAddress();
let fdata = new FormData();

definePageMeta({
  
  layout: false,
  middleware: ["auth"],
});
const { useUser } = useAuth();

const { useBookings } = useBooking();
const book = useBookings();
const { booking } = storeToRefs(book);

const store2 = useUser();
const { coupons, user } = storeToRefs(store2);

const { service, provider, providers } = storeToRefs(store);
const isOpen = ref(false)


onMounted(async () => {
  title.value = "Loading service"

  //provider.value = null
  await store
    .getPartnerByService(+route.params.id)
  // .then(() => {
  //   title.value = service?.name?.en;
  // })
  // .catch((err) => {
  //   //console.log(err);
  // });
  title.value = service?.name?.en;
  //useUser().getPromocode();
  // await store
  //   .getServiceById(+route.params.id)
  //   .then((result) => {
  //     title.value = service.value?.name?.en;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // watchEffect(() => {
  //   if (!!upload_img_1.value) {
  //     console.log(upload_img_1?.value[0]);
  //     console.log(upload_img_1.value?.length);
  //   }
  // });

  watchEffect(() => {
    if (isOpen.value == false) {
      provider.value = null;
    }
  })


});

async function edit(data: any) {
  isOpen.value = !isOpen.value
  provider.value = data;
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


    fdata.append("use_wallet", form.useWallet ? "1" : "0");
    fdata.append("s_latitude", ""+form.s_latitude);
    fdata.append("s_longitude", ""+form.s_longitude);
    fdata.append("s_address", form.s_map_address);
    fdata.append("d_latitude", ""+form.d_latitude);
    fdata.append("d_longitude", ""+form.d_longitude);
    fdata.append("d_address", form.d_map_address);


    // if (upload_img_1.value != undefined) {
    //   for (let i = 0; i < upload_img_1.value.length; i++) {
    //     fdata.append("upload_img_1[" + i + "]", upload_img_1.value[i]);
    //   }
    // }
    // if (upload_img_2.value != undefined) {
    //   for (let i = 0; i < upload_img_2.value.length; i++) {
    //     fdata.append("upload_img_2[" + i + "]", upload_img_2.value[i]);
    //   }
    // }
    // if (upload_img_3.value != undefined) {
    //   for (let i = 0; i < upload_img_3.value.length; i++) {
    //     fdata.append("upload_img_3[" + i + "]", upload_img_3.value[i]);
    //   }
    // }

    //   fdata.append('upload_img_1', upload_img_1.value != undefined ? upload_img_1.value : null)
    //  fdata.append( 'upload_img_2', upload_img_2.value != undefined ? upload_img_2.value : null)
    //   fdata.append('upload_img_3', upload_img_3.value != undefined ? upload_img_3.value : null)
    fdata.append("description", "" + " ");
    fdata.append("service_type", "" + route.params.id);
    fdata.append("provider_id", "" + provider.value.id);
    //fdata.append("breakdown", JSON.stringify(items.value));
    fdata.append("payment_mode", "CASH");

    let data;
    if (true) {
      //fdata.append("schedule_date", form.date);
      //fdata.append("schedule_time", form.time);
      data = await useFetchAuth("/api/user/send-request", {
        method: "POST",
        body: fdata,
      })
        .then((result) => {
          sto.hide();
          data = result;

          if (data.request_id != undefined) {
            
            //map_address.value = ""
            window.location.pathname = `/booking/${data.request_id}`;
            //router.push(`/booking/${data.request_id}`);
          }
        })
        .catch((err) => {
          sto.hide();
          return errorResponse(err);
        });
    } else {
      await useFetchAuth("/api/user/send-request", {
        method: "POST",
        body: fdata,
      })
        .then((result) => {
          sto.hide();
          data = result;
          if (data.request_id != undefined) {
            
            //map_address.value = ""
            router.push(`/booking/${data.request_id}`);
          }
        })
        .catch((err) => {
          sto.hide();
          return errorResponse(err);
        });
    }
  } catch (err) {
    sto.hide();
    errorResponse(err.data);
  }
}

</script>
