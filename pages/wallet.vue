<template>
  <div>
    <NuxtLayout name="single">
      <div class="inline-flex flex-col items-center justify-end w-full pt-4 pb-6 pl-5 pr-4 space-y-6 bg-white dark:bg-gray-900">
        <div class="inline-flex flex-col items-center justify-start py-2">
          <div class="flex flex-col items-center justify-end flex-1 space-y-16">
            <img class="flex-1 rounded-lg w-36 h-32" src="~/assets/image/wallet.svg" />
            <div class="flex flex-col space-y-2.5 items-center justify-end w-full h-1/3">
              <!-- <p class="text-xl font-bold leading-relaxed text-center text-gray-900 dark:text-gray-200">No Notification</p> -->
              <p class="w-full text-sm font-medium leading-normal text-center text-gray-600">{{ $__("It's quick, safe and secure") }}</p>
            </div>
          </div>
        </div>
        <div class="relative flex flex-col w-full p-5 space-y-4">
          <div class="flex flex-col justify-between h-64">
            <p class="text-3xl font-medium text-center text-gray-900 dark:text-gray-200">{{ useUser().getCurrency(getWallet) }}</p>
    
            <div class="inline-flex items-end justify-center space-x-2.5">
              <input v-model="recharge" class="w-20 text-sm font-medium text-center text-gray-900 border-0 border-b-2" type="text" />
              <button @click="recharge = '100000'" class="flex items-center justify-center px-3 py-2 text-xs font-thin text-center text-gray-900 bg-white dark:bg-gray-900 border border-gray-400 rounded-lg">
                {{ useUser().getCurrency(100000) }}
              </button>
              <button @click="recharge = '200000'" class="flex items-center justify-center px-3 py-2 text-xs font-thin text-center text-gray-900 bg-white dark:bg-gray-900 border border-gray-400 rounded-lg">
                {{ useUser().getCurrency(200000) }}
              </button>
              <!-- <button @click="recharge = '500000'" class="flex items-center justify-center px-3 py-2 text-xs font-thin text-center text-gray-900 bg-white dark:bg-gray-900 border border-gray-400 rounded-lg">
                {{ useUser().getCurrency(500000) }}
              </button> -->
            </div>
            <p class="text-xs font-medium leading-snug text-center text-gray-900 dark:text-gray-200">{{ $__("add balance to use wallet in request") }}</p>
            <!-- <button @click="startStripe()" class="inline-flex items-center justify-center px-2 py-3 text-base font-semibold text-white dark:text-gray-900 bg-primary rounded-lg">Add Amount</button> -->
            <button @click="addMoney()" class="inline-flex items-center justify-center px-2 py-3 text-base font-semibold text-white dark:text-gray-900 bg-primary rounded-lg">Add Amount</button>
          </div>
        </div>
      </div>
      </NuxtLayout>
  </div>
  </template>
  
  <script lang="ts" setup>
  import { storeToRefs } from "pinia";
  import { Stripe, PaymentSheetEventsEnum } from "@capacitor-community/stripe";
  definePageMeta({
  
    middleware: ["auth"],
    layout: false,
  });
  const title = useState("title");
  const config = useRuntimeConfig();
  const { useUser } = useAuth();
  const { user,getWallet } = storeToRefs(useUser());
  const sto = useLoading();
  const { useBookings, rating, cancel } = useBooking();
  const store = useBookings();
  const { stripe } = storeToRefs(store);
  const recharge = ref(0);
  const { errorResponse } = useBase();
  
  onMounted(async () => {
    title.value = "Wallet";

    // Stripe.initialize({
    //   publishableKey: user.value?.stripe_publishable_key,
    // });
    watch(getWallet, (count, prevCount) => {
      console.log(count);
      
      if (prevCount != 0 && prevCount < count) {
        errorResponse("The credit is all ready in your wallet");
      }
    })
  });
  function alert() {
    window.alert("no active gateway found");
  }
  
  async function addMoney() {
    if (recharge.value >= 10000) {
      await useUser().addMoney(recharge.value,'PAGOPAR','user');
    } else {
      errorResponse("add amount greater than 10000");
    }
  }
  
  async function startStripe() {
      if (user.value?.card == 0) {
      return alert()
    }
    sto.show();
    await store
      .getStripeWallet(recharge.value)
      .then(async () => {
        await Stripe.createPaymentSheet({
          paymentIntentClientSecret: stripe.value.paymentIntent,
          customerId: stripe.value.customer,
          customerEphemeralKeySecret: stripe.value.ephemeralKey,
          merchantDisplayName: "app name",
        })
          .then((result) => {
            sto.hide();
            console.log("where's log for createPaymentSheet :", result);
            startgate();
          })
          .catch((err) => {
            console.log(err);
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
          sto.show();
          await store
            .stripeResponceWallet(recharge.value)
            .then((result) => {
              sto.hide();
            })
            .catch((err) => {
              sto.hide();
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  </script>
  
  <style>
  .van-uploader .van-uploader__wrapper .van-uploader__input-wrapper {
    width: 100% !important;
  }
  </style>
  