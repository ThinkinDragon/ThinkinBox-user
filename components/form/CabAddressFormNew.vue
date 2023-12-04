<template>
    <div class="flex flex-col w-full items-center justify-end ">
      <div class="relative flex flex-row w-full">
        <input class=" text-base bg-transparent border-0 w-full" type="text" focus
          @input="$emit('update:street', $event.target.value)" :value="street" ref="s_streetRef"
          placeholder="Pickup from" />
        <div @click="$emit('clear')">
          <svg class="w-6 h-6 mt-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      <div class="w-full h-0.5 border-1 border-gray-300 bg-gray-300 "></div>
      <div class="relative flex flex-row w-full">
        <input class=" text-base bg-transparent border-0 w-full" type="text" focus
          @input="$emit('update:d_street', $event.target.value)" :value="d_street" ref="d_streetRef"
          placeholder="Send package to " />
        <div @click="$emit('clear')">
          <svg class="w-6 h-6 mt-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>

        </div>
      </div>
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
  d_street: {
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
const emit = defineEmits(["marker", "clear", "recenter", "update:streetNumber", "update:time", "update:requestDate", "update:street","update:d_street", "update:city", "update:postcode", "update:state", "update:country", "update:map_address", "update:landmark"]);

const date = ref("");
const show = ref(false);
const formatDate = (date) => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;

const onConfirm = (value) => {
  show.value = false;
  date.value = formatDate(value);
};
const s_streetRef = ref();
const d_streetRef = ref();

let autocomplete;
let destAutocomplete;
onMounted(async () => {

  autocomplete = new google.maps.places.Autocomplete(s_streetRef.value, {
    types: ["address"],
    fields: ["address_components", "geometry", "formatted_address"],
  });
  destAutocomplete = new google.maps.places.Autocomplete(d_streetRef.value, {
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

  google.maps.event.addListener(destAutocomplete, "place_changed", () => {
    const mapping = {
      street_number: "update:d_streetNumber",
      route: "update:d_street",
      locality: "update:d_city",
      administrative_area_level_1: "update:d_state",
      landmark: "update:d_landmark",
      postal_code: "update:d_postcode",
      country: "update:d_country",
    };

    for (const type in mapping) {
      emit(mapping[type], "");
    }

    let place = {
      address_components: [],
      ...autocomplete.getPlace(),
    };

    emit("marker", place.geometry);
    emit("update:d_map_address", place.formatted_address);

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
  if (destAutocomplete) {
    google.maps.event.clearInstanceListeners(destAutocomplete);
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
