<template>

  <div class="flex flex-row w-full space-x-5">
    <label class="block w-full col-span-2 text-sm font-medium text-gray-700">
    Search address
    <input class="block w-full mt-1 text-sm placeholder-gray-400 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" type="text" focus @input="$emit('update:street', $event.target.value)" :value="street" ref="streetRef" placeholder="Search" />
  </label>
  <a @click="$emit('recenter')" class="flex cursor-pointer w-1/8 space-x-2 mt-5 items-center text-white dark:text-gray-900 justify-center h-full px-2 py-2.5 bg-primary shadow rounded-lg"> 
<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>
   </a>
  <a @click="$emit('clear')" class="flex cursor-pointer w-1/8 mt-5 space-x-2 items-center text-white dark:text-gray-900 justify-center h-full px-2 py-2.5 bg-primary shadow rounded-lg"> <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg> </a>
  </div>

  <!-- <ClientOnly>
  <div v-show="picktime" class="flex flex-col">
    <van-cell title="Select Date" :value="date" is-link @click="show = true">{{ date }}</van-cell>
    <van-calendar v-model="date" v-model:show="show" teleport="#modals" @confirm="gaetdate" color="#000000" />

    <van-cell title="Select Time" :value="currentTime" is-link @click="showPopup">{{ currentTime }}</van-cell>
    <van-popup v-model:show="showTime" position="bottom" :style="{ height: '30%' }" teleport="#modals">
      <van-datetime-picker @confirm="gaetdatetime" @cancel="showPopup" v-model="currentTime" type="time" title="Choose Time" :min-hour="9" :max-hour="20" />
    </van-popup>
  </div>
</ClientOnly> -->

  <div class="hidden grid-cols-3 gap-5">
    <label class="block col-span-2 text-sm font-medium text-gray-700">
      Street
      <input class="block w-full mt-1 text-sm placeholder-gray-400 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" type="text" placeholder="Street" />
    </label>

    <label class="block text-sm font-medium text-gray-700">
      Number
      <input class="block w-full mt-1 text-sm placeholder-gray-400 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" type="text" @input="$emit('update:streetNumber', $event.target.value)" :value="streetNumber" placeholder="Number" />
    </label>

    <label class="block text-sm font-medium text-gray-700">
      Postcode
      <input class="block w-full mt-1 text-sm placeholder-gray-400 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" type="text" @input="$emit('update:postcode', $event.target.value)" :value="postcode" placeholder="Postcode" />
    </label>

    <label class="block text-sm font-medium text-gray-700">
      City
      <input class="block w-full mt-1 text-sm placeholder-gray-400 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" type="text" @input="$emit('update:city', $event.target.value)" :value="city" placeholder="City" />
    </label>

    <label class="block text-sm font-medium text-gray-700">
      Country
      <input class="block w-full mt-1 text-sm placeholder-gray-400 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" type="text" @input="$emit('update:country', $event.target.value)" :value="country" placeholder="Country" />
    </label>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  street: {
    type: String,
    default: "",
  },
  time: {
    type: String,
    default: "",
  },
  requestDate: {
    type: String,
    default: "",
  },
  streetNumber: {
    type: String,
    default: "",
  },
  postcode: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  map_address: {
    type: String,
    default: "",
  },
  landmark: {
    type: String,
    default: "",
  },
  picktime: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["marker", "clear", "recenter", "update:streetNumber", "update:time", "update:requestDate", "update:street", "update:city", "update:postcode", "update:state", "update:country", "update:map_address", "update:landmark"]);

const date = ref("");
const show = ref(false);
const formatDate = (date) => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;

const onConfirm = (value) => {
  show.value = false;
  date.value = formatDate(value);
};
const streetRef = ref();
let autocomplete;

onMounted(async () => {
  
  //let google = props.mapp
  // if (process.client) {
  //   //streetRef.value.focus();
  //   }

  autocomplete = new google.maps.places.Autocomplete(streetRef.value, {
    types: ["address"],
    fields: ["address_components", "geometry", "formatted_address"],
  });

  google.maps.event.addListener(autocomplete, "place_changed", () => {
    const mapping = {
      street_number: "update:streetNumber",
      route: "update:street",
      locality: "update:city",
      administrative_area_level_1: "update:state",
      landmark: "update:landmark",
      postal_code: "update:postcode",
      country: "update:country",
    };

    for (const type in mapping) {
      emit(mapping[type], "");
    }

    let place = {
      address_components: [],
      ...autocomplete.getPlace(),
    };

    emit("marker", place.geometry);
    emit("update:map_address", place.formatted_address);

    place.address_components.forEach((component) => {
      component.types.forEach((type) => {
        if (mapping.hasOwnProperty(type)) {
          emit(mapping[type], component.long_name);
        }
      });
    });
  });

});

onUnmounted(() => {
  if (autocomplete) {
    google.maps.event.clearInstanceListeners(autocomplete);
  }
});
const showTime = ref(false);
const showPopup = () => {
  showTime.value = !showTime.value;
};
const dateSet = new Date();

const currentDate = ref(new Date());
const minDate = new Date(2020, 0, 1);
const maxDate = new Date(2025, 0, 1);
const currentTime = ref("12:00");

const gaetdatetime = (value) => {
  showTime.value = !showTime.value;
  emit("update:time", value);
};

const gaetdate = (value) => {
  date.value = formatDate(value);
  emit("update:requestDate", date.value);
  show.value = !show.value;
};
</script>
