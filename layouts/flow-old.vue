<template>
  <div>
    <client-only>
  <div class="flex flex-col w-full h-full">
    <div class="inline-flex items-center justify-center w-full h-12 bg-gray-50 dark:bg-gray-900">
      <MainMobileNav />
    </div>

    <div class="flex-grow block h-full overflow-y-auto">
      <!-- <div  class="block w-full h-full" ref="mapDiv" /> -->
      <div :class="`h-[80vh]`" :style="pressed ? 'height :90vh' : 'height :50vh'"
        class="relative block w-full overflow-hidden md:h-full" ref="mapDiv" />
      <!-- <capacitor-google-map v-else class="block w-full h-full" ref="mapDiv"></capacitor-google-map> -->
      <!-- :class="pressed ? 'h-[5vh]' : 'transform h-[40vh]'" -->
      <div class="sticky bottom-0 z-10 w-full p-2 bg-gray-50 dark:bg-gray-900 rounded-t-2xl">
        <slot />
      </div>
    </div>
  </div></client-only>
  </div>
</template>

<script setup>
import { Geolocation } from "@capacitor/geolocation";
import { Device } from "@capacitor/device";
//import { GoogleMap } from "@capacitor/google-maps";
import { useDeviceOrientation } from "@vueuse/core";
import { useMousePressed } from "@vueuse/core";
import { useWindowSize } from "@vueuse/core";
import { storeToRefs } from "pinia";
import pinUser from "~/assets/image/marker/user.png";
import pinDriver from "~/assets/image/marker/driver.png";
import { forEach } from "lodash";

const title = useState("title", () => "Address");
const config = useRuntimeConfig();
const { width, height } = useWindowSize();
const { isAbsolute, alpha, beta, gamma } = useDeviceOrientation();

const NavRoute = useNavRoute();
const { useBookings } = useBooking();
const { provider, booking, markers } = storeToRefs(useBookings());
const pin = usePin();

const center = ref(null);
const otherPos = ref(null);
const mapDiv = ref(null);

const { pressed } = useMousePressed({ target: mapDiv });
const {currPos } = storeToRefs(useAddress());

const sourcePos = ref(null);
const destinationPos = ref(null);
const providerPos = ref(null);
const livePos = ref(null);
const { platform } = useFirebase();

const coordinates = ref(null);
let map;
let bounds;
let geocoder;
let polyline;
let direction;
let marker;
let proMarkers;
let marker1;
let marker2;
let clickListener = null;



onMounted(async() => {
  startMap();
});

// onUnmounted(() => {
//   if (clickListener) clickListener.remove();
//   //if (bounds) bounds.remove()
//   if (livePos.value != null) {
//     Geolocation.clearWatch({ id: livePos.value });
//   }
// });

async function startMap() {
//if (platform.value === 'web') {
// if (platform.value === "web") {
if (true) {
  await liveloc();

try {
      map = new google.maps.Map(mapDiv.value, {
        center: currPos.value,
        zoom: 14,
        mapTypeControl: false,
        gestureHandling: "greedy",
        zoomControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
      });
      //BACKWARD_CLOSED_ARROW	, BACKWARD_OPEN_ARROW	, CIRCLE	, FORWARD_CLOSED_ARROW	,FORWARD_OPEN_ARROW
      marker = new google.maps.Marker({
        position: currPos.value,
        map,
        icon: {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          scale: 5,
          fillOpacity: 1,
          strokeWeight: 2,
          fillColor: "#000",
          strokeColor: "#ffffff",
          rotation: alpha.value,
        },
      });

      geocoder = new google.maps.Geocoder();

      bounds = new google.maps.LatLngBounds();

      google.maps.event.addListener(map, "center_changed", () => {
        // 3 seconds after the center of the map has changed, pan back to the marker.
        var c = map.getCenter();
        // if (marker) {
        //   marker.setPosition(c);
        //   form.latitude = c.lat();
        //   form.longitude = c.lng();
        //   searchAddress.value = true;
        // }
        // getGeoAdderess(c)
      });

      google.maps.event.addListener(map, "idle", () => {
        // 3 seconds after the center of the map has changed, pan back to the marker.
        var c = map.getCenter();
        //getGeoAdderess(c);
      });
      var directionsService = new google.maps.DirectionsService();
      var directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      var icons = {
        start: new google.maps.MarkerImage(
          // URL
          pinDriver,
          // (width,height)
          new google.maps.Size(32, 32),
          // The origin point (x,y)
          new google.maps.Point(0, 0),
          // The anchor point (x,y)
          new google.maps.Point(22, 32)
        ),
        end: new google.maps.MarkerImage(
          // URL
          pinUser,
          // (width,height)
          new google.maps.Size(32, 32),
          // The origin point (x,y)
          new google.maps.Point(0, 0),
          // The anchor point (x,y)
          new google.maps.Point(22, 32)
        ),
      };


      function renderDirections(result) {
        directionsRenderer.setOptions({
          preserveViewport: true,
          draggable: false,
          polylineOptions: {
            strokeColor: "#00" + (Math.round(Math.random() * 0XFFFF)).toString(16)
          },
          suppressMarkers: true
        });
        directionsRenderer.setMap(map);
        directionsRenderer.setDirections(result);
        directionsRenderer.setMap(map);
        var leg = result.routes[0].legs[0];

        make1Marker(leg.start_location, icons.start, "");
        make2Marker(leg.end_location, icons.end, "");

      }

      watchEffect(() => {
        if (provider.value != undefined) {
          providerPos.value = {
            lat: parseFloat(provider.value?.latitude),
            lng: parseFloat(provider.value?.longitude),
          };
        }
        if (booking.value != undefined) {
          //console.log(useBookings.getBidMarker);

          // if (booking.value?.status == 'BIDDING') {
          //   useBookings.getBidMarker.forEach(element => {
          //   providerPin(element)
          // });
          // } else {
          //   if (proMarkers) {
          //     proMarkers.setMap(null)
          //   }
          // }

          sourcePos.value = {
            lat: parseFloat(booking.value?.s_latitude),
            lng: parseFloat(booking.value?.s_longitude),
          };
        }
        if (booking.value != undefined) {
          destinationPos.value = {
            lat: parseFloat(booking.value?.d_latitude),
            lng: parseFloat(booking.value?.d_longitude),
          };
        }
        var request = {
          origin: providerPos.value,
          destination: destinationPos.value,
          travelMode: "DRIVING",
        };
        if (provider.value == undefined) {
          return false;
        }

        directionsRenderer.setMap(null);
        directionsService.route(request, function (response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            renderDirections(response);
          }
        });
        // if (NavRoute.value != null || NavRoute.value.length > 0) {
        //   polyline = new google.maps.Polyline({
        //     path: google.maps.geometry.encoding.decodePath(NavRoute.value),
        //     map: map,
        //   });
        //   //map.setCenter(polyline.getCenter());
        //   polyline.setMap(map);
        //   //bounds.extend(polyline.getBounds());
        // }
        // if (pin.value != null || pin.value != "") {
        //   console.log(pin.value);
        //   marker2 = new google.maps.Marker({
        //     position: pin.value,
        //     map,
        //   });
        //   marker2.setMap(map);
        // }
      });

      watch(alpha, (value, oldValue) => {
        if (value != oldValue) {
          autoUpdate();
        }
      });

} catch (error) {
  console.log(error);
}


} else {
  const newMap = GoogleMap.create({
    id: "my-map", // Unique identifier for this map instance
    element: mapDiv.value, // reference to the capacitor-google-map element
    apiKey: config.public.GMAP_API, // Your Google Maps API Key
    config: {
      center: currPos.value,
      zoom: 8, // The initial zoom level to be rendered by the map
    },
  });

  // Add a marker to the map
  const markerId = newMap.addMarker({
    coordinate: currPos.value,
  });

  // Move the map programmatically
  newMap.setCamera({
    coordinate: currPos.value,
  });

  // Enable marker clustering
  newMap.enableClustering();
}
}

async function autoUpdate() {
//if (!isAbsolute.value) return
if (marker) {
  // Marker already created - Move it

  marker.setPosition(currPos.value);
  marker.setIcon({
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    scale: 5,
    fillOpacity: 1,
    strokeWeight: 2,
    fillColor: "#000",
    strokeColor: "#ffffff",
    rotation: alpha.value,
  });
} else {
  // Marker does not exist - Create it
  marker = new google.maps.Marker({
    position: currPos.value,
    map,
    icon: {
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
      scale: 5,
      fillOpacity: 1,
      strokeWeight: 2,
      fillColor: "#000",
      strokeColor: "#ffffff",
      rotation: alpha.value,
    },
  });
}

// Center the map on the new position
//map.setCenter(currPos.value);
}

async function providerPin(data) {
//if (!isAbsolute.value) return

  // Marker does not exist - Create it
  proMarkers = new google.maps.Marker({
    position: data,
    map,
    icon: {
      //path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
      scale: 5,
      fillOpacity: 1,
      strokeWeight: 2,
      fillColor: "#000",
      strokeColor: "#ffffff",
      rotation: alpha.value,
    },
  });

// Center the map on the new position
//map.setCenter(currPos.value);
}

const liveloc = async () => {
await Geolocation.watchPosition(
  {
    enableHighAccuracy: true,
    timeout: 5000,
  },
  (position) => {
    if (position == null) {
      return (currPos.value = pin.value);
    }
    livePos.value = position;
    currPos.value = {
      lat: parseFloat(position.coords.latitude),
      lng: parseFloat(position.coords.longitude),
    };
  }
).catch((err) => {
  console.log(err);
});
};

function makeMarker(position, icon, title) {
new google.maps.Marker({
  position: position,
  map: map,
  icon: icon,
  title: title,
});
}
//const distance = computed(() => (otherPos.value === null ? 0 : haversineDistance(center.value, center.value)));
function make1Marker(position, icon, title) {
if (marker1)
  marker1.setMap(null);
marker1 = new google.maps.Marker({
  position: position,
  map: map,
  icon: icon,
  title: title
});
}
function make2Marker(position, icon, title) {
if (marker2)
  marker2.setMap(null);
marker2 = new google.maps.Marker({
  position: position,
  map: map,
  icon: icon,
  title: title
});
}
</script>
