<template>
  <div>
    <van-popup :show="isGpsOff" :style="{ width: '90%' }" round>
      <div class="relative p-4 w-full max-w-md h-full md:h-auto">
        <div class="p-1 text-center">
          <h3 class="mb-5 text-lg font-normal text-gray-500">{{$__("Please, Enable the device location to continue using app for better experience")}} {{ isGpsOff }} </h3>
          <UButton @click="open" type="button"
            class="text-white bg-accent  focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
            {{ $__("Enable GPS") }}
          </UButton>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { BleClient } from '@capacitor-community/bluetooth-le';
import { Capacitor } from '@capacitor/core';


const isGpsOff = ref(false)
onMounted(async() => {
  if (!Capacitor.isNativePlatform()) {
      // If not a native platform, return a resolved promise with false
      isGpsOff.value = false;
    } else {
      try {
        // For native platforms, perform the asynchronous operation
        const result = await BleClient.isLocationEnabled();
        isGpsOff.value = !result;
      } catch (error) {
        console.error('Error checking location:', error);
        // Handle the error as needed
        isGpsOff.value = false;
      }
      console.log(isGpsOff.value);
    }
})
async function open() {
    try {
      await BleClient.openLocationSettings();
    } catch (error) {
      console.log(error);
      
    }
  }
</script>