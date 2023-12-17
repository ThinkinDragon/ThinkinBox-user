<template>
  <div>

    <header class="flex-1  items-center">
      <MainMobileNav>
        <template v-slot:start>
          <slot name="start"></slot>
        </template>
  
        <template v-slot:main>
          <slot name="nav"></slot>
        </template>
        <slot>
          <slot name="center"></slot>
        </slot>
      </MainMobileNav>
    </header>
    <sub-header class="fixed inset-x-1 top-11 items-center">
      <slot name="subnav"></slot>
    </sub-header>
    <div class="flex-grow block h-full overflow-y-auto">
      <!-- <div  class="block w-full h-full" ref="mapDiv" /> -->
  
      <!-- <div :class="`h-[100svh]`" style="height :97vh" class="relative block overflow-hidden md:h-full" ref="mapDiv" /> -->
      <!-- <capacitor-google-map v-else class="block w-full h-full" ref="mapDiv"></capacitor-google-map> -->
      <!-- :class="pressed ? 'h-[5vh]' : 'transform h-[40vh]'" -->
      <Sheet v-model:visible="isOpen" :threshold="0" containerColor="rgba(0,0,0,)">
        <div class="p-2">
          <slot />
  
        </div>
      </Sheet>
    </div>
  </div>
</template>

<script setup lang="ts">

import { refThrottled, useDebounceFn, useDeviceOrientation, useThrottleFn } from "@vueuse/core";
import { useMousePressed } from "@vueuse/core";
import { useWindowSize } from "@vueuse/core";
import { storeToRefs } from "pinia";
import markerLive from "~/assets/image/marker/marker_live.svg";
import pinUser from "~/assets/image/marker/user.png";
import pinDriver from "~/assets/image/marker/driver.png";
import pinpinDriv from '~/assets/image/marker/car_topview.svg';
//import mapStyle from '~/src/gmapStyle.json';

import { Sheet } from "bottom-sheet-vue3";

const isNavActive = useIsNavActive()
const isOpen = useSheetToggle()

const config = useRuntimeConfig();
const { width, height } = useWindowSize();
const { isAbsolute, alpha, beta, gamma } = useDeviceOrientation();

const NavRoute = useNavRoute();
const { useBookings } = useBooking();
const { provider, booking } = storeToRefs(useBookings());
const bookingDebounce = refThrottled(booking, 2 * 1000)

const { useService } = useHome()
const ser = useService()
const { providers, providerMarkers, estimate, direction, eta } = storeToRefs(ser)

const pin = usePin();
const map = inject('map');
const { drawRoute } = useMapFunction(map.value);

const otherPos = ref(null);
const mapDiv = ref<HTMLElement>();

const { pressed } = useMousePressed({ target: mapDiv });
const { currPos, s_latitude, markerMoving, s_longitude, d_latitude, d_longitude, s_select, d_select, center } = storeToRefs(useAddress());
const { addresses } = storeToRefs(useDeliveryAddresses());
const { partnerLocation } = storeToRefs(usePolyline());
const sourcePos = ref<google.maps.LatLng>();
const destinationPos = ref<google.maps.LatLng>();
const providerPos = ref<google.maps.LatLng>();
const livePos = ref(null);
const { platform } = useFirebase();

const coordinates = ref(null);
const markerId = ref(null);

let bounds: google.maps.LatLngBounds;
let polyline;
let marker: google.maps.Marker;
let markerCollection: google.maps.Marker;

let proMarkers;
let marker1: google.maps.Marker;
let marker2: google.maps.Marker;
let markerMulti: google.maps.Marker;
let clickListener = null;

let directionsService: google.maps.DirectionsService;
let directionsRenderer: google.maps.DirectionsRenderer;

let delayFactor = 0;

let icons: any;



onMounted(async () => {
  setTimeout(async () => {
    await startMap();
  }, 2000);
  useService().getProvidersData();
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

  try {
    // const setOnCameraIdle = await map.value.setOnCameraIdleListener(async(event: any) => {
    // console.log(event);
    // markerMoving.value = false
    // if (s_select.value) {
    //     s_latitude.value = event.latitude;
    //     s_longitude.value = event.longitude;
    //   }
    //  else if (d_select.value) {
    //   console.log("here");

    //   d_latitude.value = event.latitude;
    //   d_longitude.value = event.longitude;
    //   } 

    // center.value = {
    //     lat:event.latitude,
    //     lng:event.longitude
    //   };

    // console.log(markerId.value);
    // if (isNavActive.value) {
    //     isOpen.value = false;
    //   } else
    //     isOpen.value = true;
    // if (markerId.value != null) {
    //   markerId.value = await map.value.removeMarker(markerId.value);
    // }

    // });

    // Handle marker click


    watch(bookingDebounce, () => {
      // if (direction.value) {
      //   drawRoute(direction.value);
      // }

      if (booking.value != null) {
        if (provider.value != undefined) {
          providerPos.value = new google.maps.LatLng(parseFloat(provider.value?.latitude), parseFloat(provider.value?.longitude));
        }
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
        if (booking.value.status == 'SEARCHING') {
          sourcePos.value = new google.maps.LatLng(parseFloat("" + booking.value?.s_latitude), parseFloat("" + booking.value?.s_longitude));
          destinationPos.value = new google.maps.LatLng(parseFloat("" + booking.value?.d_latitude), parseFloat("" + booking.value?.d_longitude));
        } else if (booking.value.status == 'ACCEPTED' || booking.value.status == "STARTED") {
          sourcePos.value = providerPos.value;
          destinationPos.value = new google.maps.LatLng(parseFloat("" + booking.value?.s_latitude), parseFloat("" + booking.value?.s_longitude));
        } else if (booking.value.status == 'ARRIVED') {
          sourcePos.value = new google.maps.LatLng(parseFloat("" + booking.value?.s_latitude), parseFloat("" + booking.value?.s_longitude));
          destinationPos.value = new google.maps.LatLng(parseFloat("" + booking.value?.d_latitude), parseFloat("" + booking.value?.d_longitude));
        } else if (booking.value.status == 'PICKEDUP') {
          sourcePos.value = providerPos.value;
          destinationPos.value = new google.maps.LatLng(parseFloat("" + booking.value?.d_latitude), parseFloat("" + booking.value?.d_longitude));
        } else {
          sourcePos.value = new google.maps.LatLng(parseFloat("" + booking.value?.s_latitude), parseFloat("" + booking.value?.s_longitude));
          destinationPos.value = new google.maps.LatLng(parseFloat("" + booking.value?.d_latitude), parseFloat("" + booking.value?.d_longitude));
        }
        console.log(booking.value?.trip_address);
        drawRouteOnBooking()
      }

      if (providers.value?.length > 0) {
        providers.value.forEach(function (item: any) {
          if (typeof item == 'object' && item?.lat != null)
            addProviderMarker(item?.id, { lat: item?.lat, lng: item?.lng }, pinDriver, "", item?.bearing);
        })
      }
    });

    watch(alpha, (value, oldValue) => {
      if (value != oldValue) {
        console.log(value);
      }
    });

  } catch (error) {
    console.log(error);
  }

}

//const distance = computed(() => (otherPos.value === null ? 0 : haversineDistance(center.value, center.value)));


function addProviderMarker(id: number, position: any, icon: any, title: any, rotate: any) {
  console.log("partner start");

  partnerLocation.value.id = map.value.addMarker({
    coordinate: position, iconUrl: icon
  })
  partnerLocation.value.coordinate = position

}

async function drawRouteOnBooking() {
  console.log("here in direction");

  let coordinatesRequest = [];
  let waypointReq;

  let startPos = sourcePos.value;
  let endPos = destinationPos.value;
  if (startPos?.lat() == undefined) {
    return
  }
  if (endPos?.lat() == undefined) {
    return
  }
  console.log("inside booking");
  try {
    if (booking.value?.trip_address === undefined) {
      return
    }
    if (typeof booking.value.trip_address == 'string') {
      booking.value.trip_address = JSON.parse(booking.value?.trip_address);
    }

    if (booking.value.status == "PICKEDUP") {

      if (booking.value.trip_address.length > 1) {

        booking.value.trip_address.forEach((number, index) => {
          if (number.status != 2) {
            let point = new google.maps.LatLng(parseFloat(number.latitude), parseFloat(number.longitude))
            waypointReq.push({ location: point, stopover: true });
          }
        })
        return await useService().getDir(startPos.lat(), startPos.lng(), endPos.lat(), endPos.lng()
          //,s_latitude,s_longitude,d_latitude,d_longitude
          , waypointReq)


      } else if (booking.value.trip_address.length > 0) {
        let point2;
        let position;
        if (booking.value.trip_address[0].status != 2) {
          point2 = new google.maps.LatLng(parseFloat(booking.value.trip_address[0].latitude), parseFloat(booking.value.trip_address[0].longitude))
          position = { location: point2, stopover: true }

          return await useService().getDir(startPos.lat(), startPos.lng(), endPos.lat(), endPos.lng()
            //,s_latitude,s_longitude,d_latitude,d_longitude
            , position)
        }
        return await useService().getDir(startPos.lat(), startPos.lng(), endPos.lat(), endPos.lng()
          //,s_latitude,s_longitude,d_latitude,d_longitude
          , position)
      } else {
        return await useService().getDir(startPos.lat(), startPos.lng(), endPos.lat(), endPos.lng()
          //,s_latitude,s_longitude,d_latitude,d_longitude
          , booking.value.trip_address)

      }
    } else {
      if (delayFactor == 0) {
        return await useService().getDir(startPos.lat(), startPos.lng(), endPos.lat(), endPos.lng()
          //,s_latitude,s_longitude,d_latitude,d_longitude
          , booking.value.trip_address)
      }
    }
  } catch (error) {
    console.log(error);
  }
}

</script>