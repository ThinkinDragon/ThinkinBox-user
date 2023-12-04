<template>
  <div>  
    <NuxtLayout name="single">
    <!-- "services.0.children_recursive.0.children_recursive" -->
    <!-- <template v-if="service?.children_recursive?.length == 0" #nav>
      <MainLocation />
    </template> -->
    <div v-if="service" class="flex flex-col">
      <Title>{{ title }}</Title>
      <SubServiceItem v-if="service?.children_recursive?.length > 0"
        v-for="(item, index) in service?.children_recursive" :key="index" :service="item" class="m-2" />
      <div v-else>
        <NuxtLink :to="`/services/${service.id}/show`" prefetch
          class="inline-flex items-center justify-center w-full pb-2 space-x-4 border-b-2">
          <svg v-if="!service.image" class="w-16 h-16" viewBox="0 0 105 116" fill="none"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect width="105" height="116" rx="10" fill="url(#pattern0)" />
            <defs>
              <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image0_86_8452" transform="translate(-0.052381) scale(0.0172619 0.015625)" />
              </pattern>
              <image id="image0_86_8452" width="64" height="64"
                xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAONJREFUeF7t20EOhEAIRFG4/6F7DvEnYeFzryQIv6pBd2behOu9dPvsbog+k+NLgArQAqmJcw9iAAhSgZKB3IJkkAySQTJ4CiE+gA8oBeg0mH3Ai084P89HhqwEqIA209ICsQdjAeaZIgaAYKxBDMCAYy8fXwAIgiAIcoJpJEYGI4VjB3YrbC9gL2AvkCB43cM5PgZgAAZgQFnNZAhdGykQBEEQBEEQDBmgAm2glM/z+QUYisYUGoldO7kY32IEAzCg6RgIRgjFAsw+AgRBMNYgBmCAT2TCYfoPPz/HCqQCX1eBHzHnv7C7WhBSAAAAAElFTkSuQmCC" />
            </defs>
          </svg>
          <img else :src="config.public.BASE_IMAGE_URL + service.image" alt="" srcset="" class="w-28 h-28 rounded-xl" />
          <div class="inline-flex w-full flex-col items-start justify-start space-y-1.5 px-4">
            <div class="flex flex-col items-start justify-start w-full space-y-1">
              <p class="w-full text-sm font-semibold text-gray-900 dark:text-gray-200">{{ $_api_(service.name) }}</p>
            </div>
            <div class="flex h-12 w-48 flex-col items-start justify-end space-y-2.5">
              <div class="inline-flex items-center justify-start w-full space-x-2">
                <p class="flex-1 text-xs font-medium leading-none text-gray-400 line-clamp-2">{{
                    $_api_(service?.description)
                }}</p>
              </div>
            </div>
          </div>
        </NuxtLink>


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

const showDesc = ref(false);

const store2 = useUser();
const { coupons, user } = storeToRefs(store2);

const { service, services, estimate } = storeToRefs(store);
const upload_img_1 = ref<UploaderInstance>();
const upload_img_2 = ref<UploaderInstance>();
const upload_img_3 = ref<UploaderInstance>();

const afterRead_1 = (file) => {
  fdata.append("upload_img_1", file.file);
};
const afterRead_2 = (file) => {
  fdata.append("upload_img_2", file.file);
};
const afterRead_3 = (file) => {
  fdata.append("upload_img_3", file.file);
};

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
});

// onBeforeUnmounted(() => {
//   service.value = null
// })

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

    if (chosenCoupon.value != -1 && coupons.value.length > 0) {
      fdata.append("promocode_id", `${coupons.value[chosenCoupon?.value]?.id}`);
    }
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
