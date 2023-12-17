<template>
  <div>
    <NuxtLayout name="flow">
      <div class="container mx-auto overflow-y-scroll mb-4">
        <Title> {{ title }}</Title>
        <client-only>
          <div class="inline-flex flex-col items-center justify-center w-full p-2 rounded-lg">
            <LoadingData :data="booking">
              <div v-if="booking?.status === 'DROPPED'"
                class="inline-flex flex-col items-center justify-center w-full space-y-3">
                <div class="flex flex-col items-center justify-center w-full space-y-3">
                  <div class="inline-flex items-center justify-center w-full">
                    <img src="" alt="" srcset="~/assets/image/Invoice.png" />
                  </div>
                  <div
                    class="flex flex-col items-start border-2 p-2 rounded-xl border-dashed shadow-xl justify-between w-full space-y-3">
                    <RequestInvoice :booking="booking" />
                  </div>
                  <div class="flex w-full flex-1 items-start justify-start px-2.5">

                    <button v-if="booking.payment_mode == 'CASH'"
                      class="flex items-center justify-center flex-1 px-5 py-3 rounded-xl bg-primary">
                      <p class="text-base font-semibold text-white dark:text-gray-900">{{ $__("Done") }}</p>
                    </button>

                    <button v-else @click="store.makePayment(route?.params?.id, booking.payment_mode, 0)"
                      class="flex items-center justify-center flex-1 px-5 py-3 rounded-xl bg-primary">
                      <p class="text-base font-semibold text-white dark:text-gray-900">{{ $__("Pay Now") }}</p>
                    </button>

                  </div>
                </div>
              </div>
              <div v-else-if="booking?.paid === 1 && booking?.user_rated == 0"
                class="flex flex-col items-center justify-center w-full mt-2 space-x-4 space-y-4">
                <img class="flex items-center w-24 h-24 rounded-full"
                  :src="booking?.provider?.avatar != null ? config.public.BASE_IMAGE_URL + booking?.provider?.avatar : avatarStatic" />
                <p class="text-base font-medium text-center text-gray-900 dark:text-gray-200">{{ $__("Rate your Experience with") }} {{ booking.provider.first_name }}</p>
                <p class="text-lg font-medium text-center text-gray-900 dark:text-gray-200">{{ $__("How would you Rate service Experience ? ") }}</p>
                <div class="inline-flex items-center justify-center space-x-1">
                  <van-rate v-model="ratingg" :size="25" color="#ffd21e" void-icon="star" void-color="#eee" />
                </div>
                <textarea v-model="comment" class="relative inline-flex rounded-lg h-1/4 w-80 bg-slate-200" name="comment"
                  id="comment" cols="30" rows="5"></textarea>
                <button @click="rating(booking?.id, ratingg, comment)"
                  class="flex items-center justify-center w-full h-full px-2 py-3 rounded-lg bg-primary">
                  <p class="text-base font-semibold text-white dark:text-gray-900">{{ $__("Submit") }}</p>
                </button>
              </div>
              <div v-else class="flex flex-col flex-1 w-full space-y-3">
                <template v-if="booking?.status == 'SEARCHING'">

                  <Vue3Lottie class="flex items-center justify-center h-60" :animationData="DogJSON" :height="100"
                    :width="200" />

                  <p class="flex items-center justify-center font-mono">{{ $__("Searching") }}</p>
                </template>
                <template v-else>
                  <div class="flex flex-row items-end justify-start w-full pb-4 border-b-2 border-dashed">
                    <div class="inline-flex w-16 flex-col items-start justify-start space-y-1.5">
                      <div class="flex flex-col items-center justify-center w-12 h-12">
                        <img class="h-full rounded-full"
                          :src="config.public.BASE_IMAGE_URL + booking?.service_type?.image" />
                      </div>
                    </div>
                    <div class="inline-flex w-60 flex-col items-start justify-start space-y-1.5">
                      <p class="w-full text-base font-bold text-gray-900 dark:text-gray-50 capitalize">{{
                        booking?.service_type?.name?.en }}</p>
                      <p class="w-full text-xs font-medium leading-none text-gray-500">{{ $__("Reference Code") }} : #{{
                        booking?.booking_id }}</p>
                    </div>
                  </div>

                  <RequestStatus :status="booking?.status" />
                  <div v-show="booking?.provider != undefined"
                    class="flex flex-row gap-1 items-center justify-between w-full">
                    <img class="w-16 h-16 pt-1 bg-blue-200 rounded-full"
                      :src="booking?.provider?.avatar != undefined ? config.public.BASE_IMAGE_URL + booking?.provider?.avatar : avatarStatic"
                      :alt="booking?.provider?.first_name ?? 'avatar'" />

                    <div class="inline-flex flex-col flex-grow items-start justify-start">
                      <div class="flex flex-col items-start justify-start gap-1">
                        <p class="w-full text-sm font-medium text-gray-900 dark:text-gray-200">{{
                          booking?.provider?.first_name }} | Vehicle :{{ booking?.provider?.viewservice.service_model }}
                        </p>
                        <p class="w-56 text-sm truncate font-medium text-gray-900 dark:text-gray-200">vehicle no :{{
                          booking?.provider?.viewservice.service_number }}</p>

                        <div
                          class="w-full flex flex-row text-sm justify-between font-medium text-gray-900 dark:text-gray-200">
                          <p class="text-base font-bold text-red-500 ">OTP : {{ booking?.otp }}</p>
                          <div class="flex items-center justify-end h-full space-x-1">
                            <svg class="w-4 h-full rounded-full" width="16" height="16" viewBox="0 0 16 16" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M6.75712 2.56231C7.17218 1.36823 8.86089 1.36823 9.27595 2.56231L9.9063 4.37575C10.0894 4.90251 10.581 5.25967 11.1386 5.27103L13.058 5.31015C14.3219 5.3359 14.8438 6.94196 13.8364 7.7057L12.3065 8.86558C11.8621 9.2025 11.6743 9.7804 11.8358 10.3142L12.3918 12.1518C12.7578 13.3618 11.3916 14.3544 10.354 13.6323L8.77811 12.5357C8.32035 12.2172 7.71271 12.2172 7.25496 12.5357L5.67908 13.6323C4.64143 14.3544 3.27523 13.3618 3.6413 12.1518L4.19725 10.3142C4.35874 9.7804 4.17097 9.2025 3.72657 8.86558L2.19668 7.7057C1.1893 6.94196 1.71114 5.3359 2.97504 5.31015L4.89451 5.27103C5.45207 5.25967 5.94366 4.90251 6.12676 4.37575L6.75712 2.56231Z"
                                fill="#FFC554" />
                            </svg>

                            <p class="text-xs font-bold">{{ booking?.provider?.rating }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-row space-x-1">
                      <a :href="`tel:${booking?.provider?.mobile}`"
                        class="flex space-x-2 items-center justify-center h-full px-2 py-2.5 bg-primary shadow rounded-lg">
                        <svg class="w-6 h-6" width="25" height="24" viewBox="0 0 25 24" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M8.82485 6.99841L7.31721 4.94255C7.21469 4.80274 7.02094 4.76711 6.87539 4.86129C4.90296 6.13757 4.36077 8.08717 5.1521 9.52437C6.01752 11.0961 7.35229 13.0237 9.39965 15.0711C11.447 17.1185 13.3746 18.4532 14.9464 19.3187C16.3836 20.11 18.3332 19.5678 19.6095 17.5954C19.7036 17.4498 19.668 17.2561 19.5282 17.1535L17.4723 15.6459C17.17 15.4242 16.7691 15.3902 16.4338 15.5579L15.6143 15.9676C14.9173 16.3161 13.9619 16.4385 13.0575 15.9732C12.4528 15.6622 11.5209 15.071 10.4603 14.0104C9.39976 12.9499 8.80859 12.0179 8.49752 11.4133C8.03222 10.5089 8.15465 9.55342 8.50314 8.85644L8.91287 8.03699C9.08053 7.70167 9.04655 7.30073 8.82485 6.99841ZM5.78888 3.18215C3.24837 4.82601 1.94061 7.83829 3.40011 10.489C4.35264 12.219 5.79947 14.2994 7.98544 16.4853C10.1714 18.6713 12.2518 20.1181 13.9817 21.0706C16.6325 22.5301 19.6447 21.2224 21.2886 18.6819C21.9582 17.647 21.7049 16.2696 20.7109 15.5407L18.6551 14.0331C17.7481 13.368 16.5453 13.266 15.5393 13.769L14.7199 14.1788C14.4827 14.2974 14.2083 14.3161 13.9724 14.1948C13.5428 13.9737 12.7813 13.503 11.8745 12.5962C10.9677 11.6894 10.497 10.928 10.276 10.4983C10.1546 10.2625 10.1734 9.98809 10.292 9.75087L10.7017 8.93142C11.2047 7.92545 11.1028 6.72265 10.4377 5.81569L8.93002 3.75982C8.20113 2.76588 6.82371 2.51256 5.78888 3.18215Z"
                            fill="white" />
                        </svg>
                        <!-- <p class="text-sm font-semibold text-center text-gray-50">{{$__("Call")}}</p> -->
                      </a>
                      <NuxtLink :to="`/booking/${route.params.id}-chat`"
                        class="flex space-x-2 items-center justify-center h-full px-2 py-2.5 bg-primary shadow rounded-lg">
                        <svg class="w-6 h-6 rounded-lg" width="25" height="24" viewBox="0 0 25 24" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M3.5 8L11.39 13.26C11.7187 13.4793 12.1049 13.5963 12.5 13.5963C12.8951 13.5963 13.2813 13.4793 13.61 13.26L21.5 8M5.5 19H19.5C20.0304 19 20.5391 18.7893 20.9142 18.4142C21.2893 18.0391 21.5 17.5304 21.5 17V7C21.5 6.46957 21.2893 5.96086 20.9142 5.58579C20.5391 5.21071 20.0304 5 19.5 5H5.5C4.96957 5 4.46086 5.21071 4.08579 5.58579C3.71071 5.96086 3.5 6.46957 3.5 7V17C3.5 17.5304 3.71071 18.0391 4.08579 18.4142C4.46086 18.7893 4.96957 19 5.5 19Z"
                            stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <!-- <p class="text-sm font-semibold text-center text-gray-50">{{$__("Message")}}</p> -->
                      </NuxtLink>
                    </div>
                  </div>
                  <div class="flex flex-col items-start justify-start">
                    <div v-if="booking?.status === 'SCHEDULED'" class="inline-flex items-center justify-start pr-12">
                      <div class="inline-flex flex-row items-start justify-center flex-1 my-3 space-x-2">
                        <div
                          class="flex items-center justify-center w-1/5 h-full p-2 border border-gray-300 rounded-full border-opacity-30">
                          <svg class="flex-1 w-10 h-full rounded-lg" viewBox="0 0 23 23" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M7.0411 2.33691C7.54736 2.33691 7.95776 2.74732 7.95776 3.25358V4.17025H15.2911V3.25358C15.2911 2.74732 15.7015 2.33691 16.2078 2.33691C16.714 2.33691 17.1244 2.74732 17.1244 3.25358V4.17025H18.0411C19.5599 4.17025 20.7911 5.40146 20.7911 6.92025V17.9202C20.7911 19.439 19.5599 20.6702 18.0411 20.6702H5.20776C3.68898 20.6702 2.45776 19.439 2.45776 17.9202V6.92025C2.45776 5.40146 3.68898 4.17025 5.20776 4.17025H6.12443V3.25358C6.12443 2.74732 6.53484 2.33691 7.0411 2.33691ZM15.2911 6.00358V6.92025C15.2911 7.42651 15.7015 7.83691 16.2078 7.83691C16.714 7.83691 17.1244 7.42651 17.1244 6.92025V6.00358H18.0411C18.5474 6.00358 18.9578 6.41399 18.9578 6.92025V9.67025H4.2911V6.92025C4.2911 6.41399 4.7015 6.00358 5.20776 6.00358H6.12443V6.92025C6.12443 7.42651 6.53484 7.83691 7.0411 7.83691C7.54736 7.83691 7.95776 7.42651 7.95776 6.92025V6.00358H15.2911ZM4.2911 11.5036V17.9202C4.2911 18.4265 4.7015 18.8369 5.20776 18.8369H18.0411C18.5474 18.8369 18.9578 18.4265 18.9578 17.9202V11.5036H4.2911Z"
                              fill="#6F767E" />
                          </svg>
                        </div>
                        <div class="inline-flex flex-col items-start justify-end h-full">
                          <p class="text-sm text-gray-900 dark:text-gray-200">{{ format(new Date(booking.schedule_at),
                            "MMMM dd, yyyy hh:mm aa") }}</p>
                          <p class="text-xs font-bold leading-none text-gray-500">{{ $__("Schedule") }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- <div class="hidden items-center justify-between w-full space-x-4">
                      <div class="inline-flex flex-col items-start justify-start">
                        <p class="text-xs font-bold leading-none text-gray-500">{{ $__("Service location") }}</p>
                        <p class="text-xs font-bold text-center">{{ booking?.s_address }}</p>
                      </div>
                      <div class="flex items-center justify-between rounded-xl bg-primary px-5 py-2.5 shadow">
                        <svg class="w-6 h-full mr-2 rounded-lg" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.3246 7.50232L6.81697 5.44645C6.71445 5.30665 6.5207 5.27102 6.37514 5.3652C4.40272 6.64148 3.86053 8.59107 4.65185 10.0283C5.51728 11.6 6.85204 13.5276 8.8994 15.575C10.9468 17.6224 12.8744 18.9571 14.4461 19.8226C15.8833 20.6139 17.8329 20.0717 19.1092 18.0993C19.2034 17.9537 19.1678 17.76 19.028 17.6574L16.9721 16.1498C16.6698 15.9281 16.2688 15.8941 15.9335 16.0618L15.1141 16.4715C14.4171 16.82 13.4617 16.9424 12.5572 16.4771C11.9526 16.1661 11.0206 15.5749 9.96006 14.5143C8.89951 13.4538 8.30835 12.5218 7.99727 11.9172C7.53198 11.0128 7.65441 10.0573 8.0029 9.36035L8.41263 8.5409C8.58029 8.20557 8.54631 7.80464 8.3246 7.50232ZM5.28864 3.68606C2.74813 5.32992 1.44037 8.3422 2.89987 10.9929C3.8524 12.7229 5.29923 14.8033 7.48519 16.9892C9.67115 19.1752 11.7515 20.622 13.4815 21.5745C16.1322 23.034 19.1445 21.7263 20.7884 19.1858C21.4579 18.1509 21.2046 16.7735 20.2107 16.0446L18.1548 14.537C17.2479 13.8719 16.0451 13.7699 15.0391 14.2729L14.2196 14.6827C13.9824 14.8013 13.708 14.82 13.4722 14.6987C13.0425 14.4776 12.2811 14.0069 11.3743 13.1001C10.4675 12.1933 9.99677 11.4319 9.77572 11.0022C9.65439 10.7664 9.67314 10.492 9.79175 10.2548L10.2015 9.43532C10.7045 8.42936 10.6025 7.22656 9.93741 6.31959L8.42978 4.26373C7.70089 3.26978 6.32346 3.01647 5.28864 3.68606Z" fill="white" />
                        </svg>
                        <p class="text-sm text-center text-gray-50">{{$__("Call")}}</p>
                      </div>
                    </div> -->

                    <div class="inline-flex items-center justify-between w-full gap-2">
                      <svg class="h-6 w-6 inline-flex" width="41" height="41" viewBox="0 0 41 41" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20.5" cy="20.5" r="20.5" fill="#EFEFF4" />
                        <path
                          d="M20.5 32.8078C20.7749 32.8078 21 32.7131 21.1275 32.6504C21.272 32.5795 21.4076 32.4903 21.527 32.4028C21.7667 32.2271 22.0262 31.9948 22.2863 31.7411C22.8112 31.2292 23.424 30.5463 24.0264 29.8322C25.2243 28.4125 26.4662 26.768 26.9815 25.9319C27.0259 25.86 27.0698 25.7888 27.1134 25.7182C28.5015 23.4691 29.5 21.8511 29.5 19C29.5 14.0294 25.4706 10 20.5 10C15.5294 10 11.5 14.0294 11.5 19C11.5 21.9422 12.4811 23.5498 13.9468 25.9314C14.497 26.8253 15.7596 28.4723 16.9679 29.8792C17.5758 30.5871 18.192 31.26 18.7192 31.7635C18.9805 32.0131 19.2408 32.2411 19.481 32.4133C19.6008 32.4992 19.7363 32.5863 19.8803 32.6554C20.0079 32.7167 20.23 32.8078 20.5 32.8078Z"
                          fill="#F52D56" stroke="white" stroke-width="2" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M20.5 22.5957C22.7091 22.5957 24.5 20.8048 24.5 18.5957C24.5 16.3866 22.7091 14.5957 20.5 14.5957C18.2909 14.5957 16.5 16.3866 16.5 18.5957C16.5 20.8048 18.2909 22.5957 20.5 22.5957Z"
                          fill="#E0E0E0" />
                      </svg>

                      <div class="inline-flex flex-col items-start justify-start">
                        <p class="text-xs font-bold text-gray-500">{{ $__("Pick Location") }}</p>
                        <p class="text-xs font-bold text-center">{{ booking?.s_address }}</p>
                      </div>
                    </div>
                    <div class="inline-flex items-center justify-between w-full gap-2">
                      <svg class="h-6 w-6" width="41" height="41" viewBox="0 0 41 41" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20.5" cy="20.5" r="20.5" fill="#EFEFF4" />
                        <path
                          d="M20.5 32.8078C20.7749 32.8078 21 32.7131 21.1275 32.6504C21.272 32.5795 21.4076 32.4903 21.527 32.4028C21.7667 32.2271 22.0262 31.9948 22.2863 31.7411C22.8112 31.2292 23.424 30.5463 24.0264 29.8322C25.2243 28.4125 26.4662 26.768 26.9815 25.9319C27.0259 25.86 27.0698 25.7888 27.1134 25.7182C28.5015 23.4691 29.5 21.8511 29.5 19C29.5 14.0294 25.4706 10 20.5 10C15.5294 10 11.5 14.0294 11.5 19C11.5 21.9422 12.4811 23.5498 13.9468 25.9314C14.497 26.8253 15.7596 28.4723 16.9679 29.8792C17.5758 30.5871 18.192 31.26 18.7192 31.7635C18.9805 32.0131 19.2408 32.2411 19.481 32.4133C19.6008 32.4992 19.7363 32.5863 19.8803 32.6554C20.0079 32.7167 20.23 32.8078 20.5 32.8078Z"
                          fill="#F52D56" stroke="white" stroke-width="2" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M20.5 22.5957C22.7091 22.5957 24.5 20.8048 24.5 18.5957C24.5 16.3866 22.7091 14.5957 20.5 14.5957C18.2909 14.5957 16.5 16.3866 16.5 18.5957C16.5 20.8048 18.2909 22.5957 20.5 22.5957Z"
                          fill="#E0E0E0" />
                      </svg>

                      <div class="inline-flex flex-col items-start justify-start">
                        <p class="text-xs font-bold text-gray-500">{{ $__("Drop location") }}</p>
                        <p class="text-xs font-bold text-center">{{ booking?.d_address }}</p>
                      </div>
                    </div>
                  </div>
                </template>

                <div v-show="booking?.status != 'PICKEDUP' && booking?.status != 'COMPLETED'"
                  class="inline-flex items-center justify-center w-full mt-2 space-x-4">
                  <UButton size="lg" color="red" v-show="!showReason" @click="showReason = !showReason"
                    class="flex items-center justify-center w-full h-full px-2 py-3 ">
                    <p class="text-base font-semibold text-white dark:text-gray-900">{{ $__("Cancel") }}</p>
                  </UButton>
                </div>
              </div>
            </LoadingData>
          </div>
        </client-only>
        <UModal v-model="showReason" class="z-[99999999] p-2">
          <UCard>
            <template #header>
              <h4>
                Select cancel reason
              </h4>
            </template>
            <AppRadioGroup id="status" v-model="formm" :options="booking?.reasons" label="Status" />
            <template #footer>
              <div class="inline-flex items-center justify-center w-full mt-2 space-x-4">
                <UButton size="lg" @click="showReason = !showReason"
                  class="flex items-center justify-center px-2 w-1/2 py-3 bg-primary rounded-lg">
                  <p class="text-base font-semibold text-white dark:text-gray-900">{{ $__("back") }}</p>
                </UButton>
                <UButton size="lg" color="red" @click="cancel(booking?.id, formm?.reason ?? 'user cancel request')"
                  class="flex items-center justify-center w-1/2 px-2 py-3">
                  <p class="text-base font-semibold text-white dark:text-gray-900">{{ $__("Cancel") }}</p>
                </UButton>
              </div>
            </template>
          </UCard>

        </UModal>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { format } from "date-fns";
import { storeToRefs } from "pinia";
import { Device } from "@capacitor/device";
import { Stripe, PaymentSheetEventsEnum } from "@capacitor-community/stripe";
import { StripeElement } from "vue-stripe-js";
import DogJSON from "~/assets/json/search-users.json";
import avatarStatic from '~/assets/image/avatar.png';
const sto = useLoading();
const { loading } = storeToRefs(sto);

definePageMeta({
  layout: false,
});
const config = useRuntimeConfig();

const title = useState("title");
const route = useRoute();

const { removeUser, isLoggedIn, getUser, setUser } = useAuth();
const user = getUser();

const { useBookings, rating, cancel, live } = useBooking();
const store = useBookings();
const { booking, provider, stripe } = storeToRefs(store);

const notif = useLocalNotification();

const comment = ref(null);
const ratingg = ref(0);

//cancel reason
const formm = ref(null);
const showReason = ref(false);

const { platform } = useFirebase();
const NavRoute = useNavRoute();
const pin = usePin();
let connect;

onMounted(async () => {
  booking.value = null
  setUser()
  // Stripe.initialize({
  //   publishableKey: user.stripe_publishable_key,
  // });
  await store.flowBooking(route.params.id);
  useBooking().live(booking.value?.provider_id);
  //booking.value = currBooking.value?.data
  title.value = ''//booking.value?.booking_id;

  if (booking.value?.status == "DROPPED") {
    startStripe();
  }
  watchEffect(() => {
    //store.flowBooking(route.params.id);
    useHead({
      bodyAttrs: {
        style: `pointer-events: ${(showReason.value) ? 'auto' : 'none'} !important;`,
      }
    });

    if (booking.value?.route_key != null && booking.value?.route_key != "") NavRoute.value = booking.value?.route_key;
    if (booking.value?.provider_id != 0) {
      useBooking().live(booking.value?.provider_id);
    }

    if (booking.value?.s_latitude != null && booking.value?.s_latitude != "" && booking.value?.s_longitude != null && booking.value?.s_longitude != "") {
      pin.value = booking.value?.route_key;
      pin.value = {
        lat: parseFloat(booking.value?.s_latitude),
        lng: parseFloat(booking.value?.s_longitude),
      };
    }
    if (booking.value?.status == 'CANCELLED') {
      booking.value = null;
      return navigateTo('/')
    }
  });

});

async function startStripe() {
  await store
    .getStripe(route.params.id, 0)
    .then(async () => {
      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: stripe.value.paymentIntent,
        customerId: stripe.value.customer,
        customerEphemeralKeySecret: stripe.value.ephemeralKey,
        merchantDisplayName: "app name",
      })
        .then((result) => {
          console.log("where's log for createPaymentSheet :", result);
        })
        .catch((err) => {
          console.log(result);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}
async function startgate() {
  // present PaymentSheet and get result.
  await Stripe.presentPaymentSheet()
    .then(async (result) => {
      if (result.paymentResult === PaymentSheetEventsEnum.Completed) {
        await store.stripeResponce(route.params.id, "COMPLETED");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
//const distance = computed(() => (otherPos.value === null ? 0 : haversineDistance(center.value, center.value)));
</script>
