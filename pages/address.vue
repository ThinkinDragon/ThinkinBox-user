<template>
  <div>
    <NuxtLayout name="map">
      <div class="h-full mx-auto">
        <Title> {{ title }}</Title>
        <div class="block w-full h-full" ref="mapDiv" />
    
        <div class="sticky bottom-0 z-10 w-full p-2 bg-white dark:bg-gray-900" :class="mapTouch ? 'h-[5vh]' : 'transform h-[25vh]'">
          <form class="space-y-6" @submit.prevent="listProvider">
            <FormAddressFormNew label="address" :street="form.map_address" v-model:street="form.building" v-model:streetNumber="form.landmark" v-model:postcode="form.pincode" v-model:country="form.country" v-model:city="form.city" v-model:state="form.state" v-model:map_address="form.map_address" :picktime="false" @marker="addMarker" />
            <div class="flex flex-row justify-between w-full">
              <!-- <div class="relative w-full mt-4">
                <select class="relative w-full h-10 px-4 text-base border-2 shadow-lg bg-secondary-100 dark:bg-secondary-800 border-secondary-200 dark:border-secondary-700 rounded-xl sm:h-14 focus:border-primary-300" v-model="form.type">
                  <option value="home">{{ "Home" }}</option>
                  <option value="office">{{ "Office" }}</option>
                  <option value="other">{{ "other" }}</option>
                </select>
                <label for="type" value="type" />
              </div> -->
              <button class="flex items-center content-between justify-center flex-1 p-2 px-5 py-3 mt-12 text-white dark:text-gray-900 bg-primary btn-grad rounded-xl" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                <p class="text-xl font-medium text-center">{{ $__("Next") }}</p>
              </button>
            </div>
          </form>
        </div>
      </div>
      </NuxtLayout>
  </div>
</template>

<script setup>
definePageMeta({
  
  layout: false,
});
const title = useState("title");
const config = useRuntimeConfig();
const router = useRouter();

const { errorResponse } = useBase();
const center = ref(null);
let searchAddress = ref(false);
let { coords } = useGeolocation();
const otherPos = ref(null);
const mapDiv = ref(null);
const {currPos} = storeToRefs(useAddress());
const mapTouch = ref(false);
const route = useRoute();
let map;
let bounds;
let geocoder;
let marker;

const form = useAddress();

let clickListener = null;

onMounted(async () => {
  center.value = { lat: 0, lng: 0 };


  title.value = "set Address";

      map = new google.maps.Map(mapDiv.value, {
        //center: center.value,
        center: {
          lat: currPos?.value?.lat ?? 33.6,
          lng: currPos?.value?.lng ?? -117.9,
        },
        zoom: 14,
        mapTypeControl: false,
        gestureHandling: "greedy",
        zoomControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
      });
      geocoder = useGoogleGeocode();

      bounds = new google.maps.LatLngBounds();

      google.maps.event.addListener(map, "center_changed", () => {
        // 3 seconds after the center of the map has changed, pan back to the marker.
        var c = map.getCenter();
        if (marker) {
          marker.setPosition(c);
          form.latitude = c.lat();
          form.longitude = c.lng();
          searchAddress.value = true;
        }
        mapTouch.value = true;
        // getGeoAdderess(c)
      });

      google.maps.event.addListener(map, "idle", () => {
        // 3 seconds after the center of the map has changed, pan back to the marker.
        var c = map.getCenter();
        mapTouch.value = false;
        getGeoAdderess(c);
      });
});

onUnmounted(() => {
  if (clickListener) clickListener.remove();
  //if (bounds) bounds.remove()
});

const addMarker = (data) => {
  if (!data.location) return;

  marker = new google.maps.Marker({
    position: data.location,
    map: map,
    optimized: false,
  });
  form.latitude = data.location.lat();
  form.longitude = data.location.lng();
  if (data.viewport) {
    // Only geocodes have viewport.
    bounds.union(data.viewport);
  } else {
    bounds.extend(data.location);
  }
  map.fitBounds(bounds);
};

const getGeoAdderess = async(c) => {
  if (searchAddress.value) {
    await geocoder
        .geocode( c.lat,c.lng)
        .then((response) => {
        if (response.results[0]) {
          const mapping = {
            street_number: form.building,
            route: form.landmark,
            locality: form.city,
            administrative_area_level_1: form.state,
            landmark: form.landmark,
            postal_code: form.pincode,
            country: form.country,
          };

          form.map_address = response.results[0].formatted_address;
          let place = {
            address_components: [],
            ...response.results[0].address_components,
          };
          place.address_components.forEach((component) => {
            component.types.forEach((type) => {
              if (mapping.hasOwnProperty(type)) {
                mapping[type] = component.long_name;
              }
            });
          });
        } else {
          window.alert("No results found");
        }
        searchAddress.value = false;
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e));
  }
};
</script>
