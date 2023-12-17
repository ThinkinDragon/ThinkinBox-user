<template>
  <ClientOnly>
    <div class="inline-flex items-start justify-between w-full">
      <p class="text-sm font-bold leading-normal">{{ $__("Request Id") }}</p>
      <p class="text-sm leading-normal text-right">{{ booking?.booking_id }}</p>
    </div>
    <div v-show="booking?.schedule_at" class="inline-flex items-start justify-between w-full">
      <p class="text-sm font-bold leading-normal">{{ $__("Schedule Time") }}</p>
      <p class="text-sm leading-normal text-right">{{ format(new Date(booking?.schedule_at), "MMMM dd, yyyy hh:mm aa") }}</p>
    </div>
    <div v-show="booking?.started_at" class="inline-flex items-start justify-between w-full">
      <p class="text-sm font-bold leading-normal">{{ $__("Start Time") }}</p>
      <p class="text-sm leading-normal text-right">{{ format(new Date(booking?.started_at), "MMMM dd, yyyy hh:mm aa") }}</p>
    </div>
    <div v-show="booking?.finished_at" class="inline-flex items-start justify-between w-full">
      <p class="text-sm font-bold leading-normal">{{ $__("Finish Time") }}</p>
      <p class="text-sm leading-normal text-right">{{ format(new Date(booking?.finished_at), "MMMM dd, yyyy hh:mm aa") }}</p>
    </div>
        <div v-show="booking.service_type.calculator == 'DISTANCE' && booking?.payment?.distance !=0" class="inline-flex items-start justify-between w-full">
      <p class="text-sm font-bold leading-normal">{{ $__("Distance Fare") }}</p>
      <p class="text-sm leading-normal text-right">{{ useUser().getCurrency(booking?.payment?.distance) }}</p>
    </div>
    <div v-show="booking.service_type.calculator == 'MIN' && booking?.payment?.minute !=0" class="inline-flex items-start justify-between w-full">
      <p class="text-sm font-bold leading-normal">{{ $__("Time Fare") }}</p>
      <p class="text-sm leading-normal text-right">{{ useUser().getCurrency(booking?.payment?.minute) }}</p>
    </div>
    <div v-show="booking.service_type.calculator == 'HOUR' && booking?.payment?.hour !=0" class="inline-flex items-start justify-between w-full">
      <p class="text-sm font-bold leading-normal">{{ $__("Time Fare") }}</p>
      <p class="text-sm leading-normal text-right">{{ useUser().getCurrency(booking?.payment?.hour) }}</p>
    </div>
    <div v-show="booking.service_type.calculator == 'FIXED'" class="inline-flex items-start justify-between w-full">
      <p class="text-sm font-bold leading-normal">{{ $__("Fixed Fare") }}</p>
      <p class="text-sm leading-normal text-right">{{ useUser().getCurrency(booking?.service_type?.price) }}</p>
    </div>
    <div v-show="booking?.item_fare" class="inline-flex items-start justify-between w-full">
      <p class="text-sm font-bold leading-normal">{{ $__("Items cost") }}</p>
      <p class="text-sm leading-normal text-right">{{ useUser().getCurrency(booking?.item_fare ?? 0) }}</p>
    </div>
    <div v-show="booking?.payment?.peak_amount !=0" class="inline-flex items-start justify-between w-full">
      <p class="text-sm font-bold leading-normal">{{ $__("Peak time Fare") }}</p>
      <p class="text-sm leading-normal text-right">{{ useUser().getCurrency(booking?.payment?.peak_amount) }}</p>
    </div>
     <!-- <div v-show="booking?.payment?.distance !=0" class="inline-flex items-start justify-between w-full">
      <p class="text-sm font-bold leading-normal">{{ $__("Distance Fare") }}</p>
      <p class="text-sm leading-normal text-right">{{ useUser().getCurrency(booking?.payment?.fixed) }}</p>
    </div> -->
    <div v-show="booking?.payment?.tax" class="inline-flex items-start justify-between w-full">
      <p class="text-sm font-bold leading-normal">{{ $__("Tax") }}</p>
      <p class="text-sm leading-normal text-right">{{ useUser().getCurrency(booking?.payment?.tax) }}({{ booking?.payment?.tax_per }} %)</p>
    </div>
    <div v-show="booking?.payment?.total" class="inline-flex items-start justify-between w-full">
      <p class="text-base font-bold leading-normal">{{ $__("Total") }}</p>
      <p class="text-base leading-normal text-right">{{ useUser().getCurrency(booking?.payment?.total) }}</p>
    </div>
        <div v-show="booking?.payment?.discount !=0" class="inline-flex items-start justify-between w-full">
      <p class="text-sm font-bold leading-normal">{{ $__("Discount") }}</p>
      <p class="text-sm leading-normal text-right">-{{ useUser().getCurrency(booking?.payment?.discount) }} ({{booking?.payment?.discount_per	}}%)</p>
    </div>
    <div v-show="booking?.payment?.payable" class="inline-flex items-start justify-between w-full">
      <p class="text-base font-bold leading-normal">{{ $__("Payable") }}</p>
      <p class="text-base leading-normal text-right">{{ useUser().getCurrency(booking?.payment?.payable) }}</p>
    </div>
    <div class="inline-flex items-center justify-between w-full">
      <p class="text-sm font-bold leading-normal">{{ $__("Payment Mode") }}</p>
      <p class="text-base leading-normal text-right">{{ booking?.payment_mode ?? "CASH" }}</p>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { format } from "date-fns";

defineProps({
  booking: Object,
});
</script>
