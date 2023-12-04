<template>
    <div class="relative flex flex-row w-full h-auto group">
        <input @click="$emit('recenter')" @focus="select = true" @blur="select = false" class=" text-base bg-transparent border-0 w-full" type="text" focus
            @input="updateText"  :value="street" ref="streetRef"
            :placeholder="placeholder" />
        <div @click="$emit('clear')">
            <svg class="w-6 h-6 mt-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
        <div v-show="addresses.length >0" class="absolute right-0 left-0 mt-14 z-50 rounded-md shadow-lg bg-gray-100 dark:bg-gray-800 ring-1 ring-black ring-opacity-5 p-1 space-y-1">
            <!-- Search input -->
            <!-- <input id="search-input" class="block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none" type="text" placeholder="Search items" autocomplete="off"> -->
            <!-- Dropdown content goes here -->

            <button @click="setAddress(item)" v-for="(item, index) in addresses" :key="index" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md w-full">{{ item.description }}</button>
          </div>
    </div>

</template>
  
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useThrottleFn } from '@vueuse/core'

const config = useRuntimeConfig();
const props = defineProps({
    label: {
        type: String,
        default: "",
    },
    placeholder: {
        type: String,
        default: "Send package to ",
    },
    street: {
        type: String,
        default: "",
    },
    map_address: {
        type: String,
        default: "",
    },
    latitude: {
        default: 0,
    },
    longitude: {
        default: 0,
    },
});
const emit = defineEmits(["marker", "clear", "recenter", "selected", "update:street", "update:map_address", "update:latitude", "update:longitude"]);

const date = ref("");
const show = ref(false);
const addresses = ref([]);
const select = ref(false);

const formatDate = (date:any) => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
const { currPos } = storeToRefs(useAddress());

const onConfirm = (value:any) => {
    show.value = false;
    date.value = formatDate(value);
};
const streetRef = ref();
const {markerCenter:live} = useAddress()
onMounted(async () => {

    const defaultBounds = {
    north: currPos.value?.lat + 0.1,
    south: currPos.value?.lat - 0.1,
    east: currPos.value?.lng + 0.1,
    west: currPos.value?.lng - 0.1,
  };

    // autocomplete = new google.maps.places.Autocomplete(streetRef.value, {
    //     bounds: defaultBounds,
    //     //componentRestrictions: { country: "py" },
    //     types: ["address"],
    //     fields: ["name","address_components", "geometry", "formatted_address"],
    // });

    // google.maps.event.addListener(autocomplete, "place_changed", () => {
    //     const mapping = {
    //         route: "update:street",
    //     };

    //     for (const type in mapping) {
    //         emit(mapping[type], "");
    //     }

    //     let place = {
    //         address_components: [],
    //         ...autocomplete.getPlace(),
    //     };
    //     emit("marker", place.geometry);
    //     emit("update:latitude", place.geometry.location.lat());
    //     emit("update:longitude", place.geometry.location.lng());
    //     emit("update:map_address", place.formatted_address);

    //     place.address_components.forEach((component) => {
    //         component.types.forEach((type) => {
    //             if (mapping.hasOwnProperty(type)) {
    //                 emit(mapping[type], component.long_name);
    //             }
    //         });
    //     });
    // });
  
});

// onUnmounted(() => {
//     if (autocomplete) {
//         google.maps.event.clearInstanceListeners(autocomplete);
//     }
// });

async function setAddress(para:any) {
    await useGoogleAutoComplete().autocompleteDetail(para.place_id).then((result:any) => {
        console.log(result);
        
        emit("marker", result.geometry.location);
        emit("update:latitude", result.geometry.location.lat);
        emit("update:longitude", result.geometry.location.lng);
        emit("update:map_address", result.formatted_address);
    }).catch((err) => {
        console.log(err);
    });
    addresses.value = [];
}



const selected = (value:any) => {

    emit("selected", value);
};
function updateText(event:any) {
    if (select.value) {
        throttledFn(event.target.value);
    }
    emit('update:street', event.target.value)
}

const throttledFn = useThrottleFn(async(val) => {
    addresses.value = await useGoogleAutoComplete().autocomplete(val,currPos.value.lat,currPos.value.lng);
}, 1000)
</script>
  