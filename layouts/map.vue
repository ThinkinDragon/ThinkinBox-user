<template>
  <header class="flex-1 items-center">
    <MainMobileDashNav>
      <template #action>
        <slot name="nav" />
      </template>
      <template #full>
        <slot name="topnav"></slot>
      </template>
    </MainMobileDashNav>
  </header>
  <sub-header class="fixed inset-x-1 top-11 p-2 items-center">
    <slot name="subnav"></slot>
  </sub-header>
  <slot />

  <template v-if="$slots.sheet">
    <Sheet v-model:visible="isOpen" :threshold="0" containerColor="rgba(0,0,0,)">
      <div class="p-2">
      <slot  name="sheet" />
      </div>
      </Sheet>
  </template>

  <footer class="fixed inset-x-0 bottom-0 py-5 text-center text-white dark:text-gray-900">
    <slot name="bottom" />
  </footer>
<!-- :style="`width:${width}px; height:${height}px;`" -->
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { Sheet } from "bottom-sheet-vue3";

// map param
const { width, height } = useWindowSize()
const isOpen = useSheetToggle()

const map = inject('map');
const mapDiv = ref<HTMLElement|undefined>();
  const config = useRuntimeConfig();

const coordinates = ref(null);
const markerId = ref(null);

const addressStore = useAddress()
  const { center,currPos, s_latitude, s_longitude, d_latitude, d_longitude } = storeToRefs(addressStore);

  onMounted(async() => {
    //await startMap();
      setTimeout(async() => {
        
      }, 1000);
  })

async function startMap() {
  //if (platform.value === 'web') {    
  try {
    await addressStore.printCurrentPosition()

    // // Add a marker to the map
    markerId.value = await map.value.addMarker({
      coordinate: {...center.value},
      //iconUrl:markerLive
    });

    // Move the map programmatically
    // await map.value.setCamera({
    //   coordinate: currPos.value.value,
    // });
    await map.value.enableCurrentLocation(true);
    await map.value.setPadding({
      top: 0,
      left: 0,
      right: 0,
      bottom: 240
  });
  console.log("here set camera");
  
    await map.value.setCamera({coordinate:{...center.value},zoom:10,animate:true,animationDuration:3000})
    

    return true;
    //BACKWARD_CLOSED_ARROW	, BACKWARD_OPEN_ARROW	, CIRCLE	, FORWARD_CLOSED_ARROW	,FORWARD_OPEN_ARROW

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);



    if (marker2) marker2.setMap(null);
    if (marker1) marker1.setMap(null);
    //if (marker) marker.setMap(null);
    //if (markerMulti) markerMulti.setMap(null);

    watch(bookingDebounce, () => {
      if (estimate.value) {
        drawRouteOnEstimate()
      } else {
        directionsRenderer.setMap(null);
        if (markerMulti) markerMulti.setMap(null);
      }


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
      } else {
        if (marker2) marker2.setMap(null);
        if (marker1) marker1.setMap(null);
        //if (marker) marker.setMap(null);
        autoUpdate();
      }

      if (markerCollection) markerCollection.setMap(null);
      else {

        // if (providers.value?.length > 0) {
        // providers.value.forEach(function (item, index) {
        //   addProviderMarker(new google.maps.LatLng(item?.latitude,item?.longitude), pinDriver, "");
        // })
        // }
      }
      if (providers.value?.length > 0) {
        providers.value.forEach(function (item: any) {
          if (typeof item == 'object' && item?.lat != null)
            addProviderMarker(item?.id, new google.maps.LatLng(item?.lat, item?.lng), pinDriver, "", item?.bearing);
        })
      }


      // var request = {
      //   origin: providerPos.value,
      //   destination: destinationPos.value,
      //   travelMode: "DRIVING",
      // };
      // directionsRenderer.setMap(null);
      // directionsService.route(request, function (response, status) {
      //   if (status == google.maps.DirectionsStatus.OK) {
      //     renderDirections(response);
      //   }
      // });
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
}
</script>

<style scoped>
capacitor-google-map2 {    
display: inline-block;
}

capacitor-google-map {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
