<template>
  <NuxtLink :to="request.status === 'COMPLETED' || request.status === 'SCHEDULED' ? `/booking/${request.id}-detail` : `/booking/${request.id}`" class="max-w-md mx-auto">
    <div class="inline-flex flex-col items-start justify-center w-full p-2 rounded-lg">
      <div class="flex flex-col flex-1 w-full">
        <div class="flex flex-row items-end justify-start w-full pb-4 border-b-2">
          <div class="inline-flex w-16 flex-col items-start justify-start space-y-1.5">
            <div class="flex flex-col items-center justify-center w-12 h-12">
              <img class="h-full rounded-full" :src="config.public.BASE_IMAGE_URL + request?.service_type?.image" />
            </div>
          </div>
          <div class="inline-flex w-60 flex-col items-start justify-start space-y-1.5">
            <p class="w-full text-base font-bold text-gray-900 capitalize">{{ $_api_(request.service_type.name) }}</p>
            <p class="w-full text-xs font-medium leading-none text-gray-500">{{ $__("Reference Code") }} : #{{ request.booking_id }}</p>
          </div>
        </div>

        <RequestStatus :status="request.status" />
        <div class="flex flex-col items-start justify-start">
          <div v-if="request?.status === 'COMPLETED'" class="inline-flex items-center justify-start pr-12">
            <div class="inline-flex flex-row items-start justify-center flex-1 my-3 space-x-2">
              <div class="flex items-center justify-center w-1/5 h-full p-2 border border-gray-300 rounded-full border-opacity-30">
                <svg class="flex-1 w-10 h-full rounded-lg" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.0411 2.33691C7.54736 2.33691 7.95776 2.74732 7.95776 3.25358V4.17025H15.2911V3.25358C15.2911 2.74732 15.7015 2.33691 16.2078 2.33691C16.714 2.33691 17.1244 2.74732 17.1244 3.25358V4.17025H18.0411C19.5599 4.17025 20.7911 5.40146 20.7911 6.92025V17.9202C20.7911 19.439 19.5599 20.6702 18.0411 20.6702H5.20776C3.68898 20.6702 2.45776 19.439 2.45776 17.9202V6.92025C2.45776 5.40146 3.68898 4.17025 5.20776 4.17025H6.12443V3.25358C6.12443 2.74732 6.53484 2.33691 7.0411 2.33691ZM15.2911 6.00358V6.92025C15.2911 7.42651 15.7015 7.83691 16.2078 7.83691C16.714 7.83691 17.1244 7.42651 17.1244 6.92025V6.00358H18.0411C18.5474 6.00358 18.9578 6.41399 18.9578 6.92025V9.67025H4.2911V6.92025C4.2911 6.41399 4.7015 6.00358 5.20776 6.00358H6.12443V6.92025C6.12443 7.42651 6.53484 7.83691 7.0411 7.83691C7.54736 7.83691 7.95776 7.42651 7.95776 6.92025V6.00358H15.2911ZM4.2911 11.5036V17.9202C4.2911 18.4265 4.7015 18.8369 5.20776 18.8369H18.0411C18.5474 18.8369 18.9578 18.4265 18.9578 17.9202V11.5036H4.2911Z" fill="#6F767E" />
                </svg>
              </div>
              <div class="inline-flex flex-col items-start justify-end h-full">
                <p class="text-sm text-gray-900 dark:text-gray-200">{{ format(new Date(request.updated_at), "MMMM dd, yyyy hh:mm aa") }}</p>
                <p class="text-xs font-bold leading-none text-gray-500">{{ $__("Completed") }}</p>
              </div>
            </div>
          </div>
          <div v-if="request?.status === 'SCHEDULED'" class="inline-flex items-center justify-start pr-12">
            <div class="inline-flex flex-row items-start justify-center flex-1 my-3 space-x-2">
              <div class="flex items-center justify-center w-1/5 h-full p-2 border border-gray-300 rounded-full border-opacity-30">
                <svg class="flex-1 w-10 h-full rounded-lg" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.0411 2.33691C7.54736 2.33691 7.95776 2.74732 7.95776 3.25358V4.17025H15.2911V3.25358C15.2911 2.74732 15.7015 2.33691 16.2078 2.33691C16.714 2.33691 17.1244 2.74732 17.1244 3.25358V4.17025H18.0411C19.5599 4.17025 20.7911 5.40146 20.7911 6.92025V17.9202C20.7911 19.439 19.5599 20.6702 18.0411 20.6702H5.20776C3.68898 20.6702 2.45776 19.439 2.45776 17.9202V6.92025C2.45776 5.40146 3.68898 4.17025 5.20776 4.17025H6.12443V3.25358C6.12443 2.74732 6.53484 2.33691 7.0411 2.33691ZM15.2911 6.00358V6.92025C15.2911 7.42651 15.7015 7.83691 16.2078 7.83691C16.714 7.83691 17.1244 7.42651 17.1244 6.92025V6.00358H18.0411C18.5474 6.00358 18.9578 6.41399 18.9578 6.92025V9.67025H4.2911V6.92025C4.2911 6.41399 4.7015 6.00358 5.20776 6.00358H6.12443V6.92025C6.12443 7.42651 6.53484 7.83691 7.0411 7.83691C7.54736 7.83691 7.95776 7.42651 7.95776 6.92025V6.00358H15.2911ZM4.2911 11.5036V17.9202C4.2911 18.4265 4.7015 18.8369 5.20776 18.8369H18.0411C18.5474 18.8369 18.9578 18.4265 18.9578 17.9202V11.5036H4.2911Z" fill="#6F767E" />
                </svg>
              </div>
              <div class="inline-flex flex-col items-start justify-end h-full">
                <p class="text-sm text-gray-900 dark:text-gray-200">{{ format(new Date(request.schedule_at), "MMMM dd, yyyy hh:mm aa") }}</p>
                <p class="text-xs font-bold leading-none text-gray-500">{{$__("Schedule")}}</p>
              </div>
            </div>
          </div>
          <div v-else class="inline-flex items-center justify-start pr-12">
            <div class="inline-flex flex-row items-start justify-center flex-1 my-3 space-x-2">
              <div class="flex items-center justify-center w-1/5 h-full p-2 border border-gray-300 rounded-full border-opacity-30">
                <svg class="flex-1 w-10 h-full rounded-lg" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.0411 2.33691C7.54736 2.33691 7.95776 2.74732 7.95776 3.25358V4.17025H15.2911V3.25358C15.2911 2.74732 15.7015 2.33691 16.2078 2.33691C16.714 2.33691 17.1244 2.74732 17.1244 3.25358V4.17025H18.0411C19.5599 4.17025 20.7911 5.40146 20.7911 6.92025V17.9202C20.7911 19.439 19.5599 20.6702 18.0411 20.6702H5.20776C3.68898 20.6702 2.45776 19.439 2.45776 17.9202V6.92025C2.45776 5.40146 3.68898 4.17025 5.20776 4.17025H6.12443V3.25358C6.12443 2.74732 6.53484 2.33691 7.0411 2.33691ZM15.2911 6.00358V6.92025C15.2911 7.42651 15.7015 7.83691 16.2078 7.83691C16.714 7.83691 17.1244 7.42651 17.1244 6.92025V6.00358H18.0411C18.5474 6.00358 18.9578 6.41399 18.9578 6.92025V9.67025H4.2911V6.92025C4.2911 6.41399 4.7015 6.00358 5.20776 6.00358H6.12443V6.92025C6.12443 7.42651 6.53484 7.83691 7.0411 7.83691C7.54736 7.83691 7.95776 7.42651 7.95776 6.92025V6.00358H15.2911ZM4.2911 11.5036V17.9202C4.2911 18.4265 4.7015 18.8369 5.20776 18.8369H18.0411C18.5474 18.8369 18.9578 18.4265 18.9578 17.9202V11.5036H4.2911Z" fill="#6F767E" />
                </svg>
              </div>
              <div class="inline-flex flex-col items-start justify-end h-full">
                <p class="text-sm text-gray-900 dark:text-gray-200">{{ format(new Date(request.created_at), "MMMM dd, yyyy hh:mm aa") }}</p>
                <p class="text-xs font-bold leading-none text-gray-500">{{ $__("Created at") }}</p>
              </div>
            </div>
          </div>
          <div class="inline-flex items-center justify-between w-full space-x-4">
            <div class="inline-flex flex-col items-start justify-start">
              <p class="text-xs font-bold leading-none text-gray-500">{{ $__("Service location") }}</p>
              <p class="text-xs font-bold text-center">{{ request?.s_address }}</p>
            </div>
            <div class="invisible flex items-center justify-between rounded-xl bg-primary px-5 py-2.5 shadow">
              <svg class="w-6 h-full mr-2 rounded-lg" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.3246 7.50232L6.81697 5.44645C6.71445 5.30665 6.5207 5.27102 6.37514 5.3652C4.40272 6.64148 3.86053 8.59107 4.65185 10.0283C5.51728 11.6 6.85204 13.5276 8.8994 15.575C10.9468 17.6224 12.8744 18.9571 14.4461 19.8226C15.8833 20.6139 17.8329 20.0717 19.1092 18.0993C19.2034 17.9537 19.1678 17.76 19.028 17.6574L16.9721 16.1498C16.6698 15.9281 16.2688 15.8941 15.9335 16.0618L15.1141 16.4715C14.4171 16.82 13.4617 16.9424 12.5572 16.4771C11.9526 16.1661 11.0206 15.5749 9.96006 14.5143C8.89951 13.4538 8.30835 12.5218 7.99727 11.9172C7.53198 11.0128 7.65441 10.0573 8.0029 9.36035L8.41263 8.5409C8.58029 8.20557 8.54631 7.80464 8.3246 7.50232ZM5.28864 3.68606C2.74813 5.32992 1.44037 8.3422 2.89987 10.9929C3.8524 12.7229 5.29923 14.8033 7.48519 16.9892C9.67115 19.1752 11.7515 20.622 13.4815 21.5745C16.1322 23.034 19.1445 21.7263 20.7884 19.1858C21.4579 18.1509 21.2046 16.7735 20.2107 16.0446L18.1548 14.537C17.2479 13.8719 16.0451 13.7699 15.0391 14.2729L14.2196 14.6827C13.9824 14.8013 13.708 14.82 13.4722 14.6987C13.0425 14.4776 12.2811 14.0069 11.3743 13.1001C10.4675 12.1933 9.99677 11.4319 9.77572 11.0022C9.65439 10.7664 9.67314 10.492 9.79175 10.2548L10.2015 9.43532C10.7045 8.42936 10.6025 7.22656 9.93741 6.31959L8.42978 4.26373C7.70089 3.26978 6.32346 3.01647 5.28864 3.68606Z" fill="white" />
              </svg>
              <p class="text-sm text-center text-gray-50">{{$__("Call")}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import type { Booking } from "~/types/booking";
const config = useRuntimeConfig();
interface Props {
  request: Booking;
}
const props = defineProps<Props>();

  const toUrl = computed(topage);

async function topage() {
  let resp = 0;
  if (props.request.status == "COMPLETED" || props.request.status == "SCHEDULED") {
    if (props.request.user_rated === 0) {
      resp = 0;
    } else {
      resp = 1;
    }
  } else {
    resp = 0;
  }
  return resp;
}
</script>
