<template>
  <div>
    <NuxtLayout name="auth">
      <div class="flex flex-col flex-grow h-full px-4 py-8 mx-auto space-y-12">
        <Title> {{ $__(title) }}</Title>
        <div class="flex flex-col space-y-3.5 items-center justify-center h-fit">
          <div class="flex flex-col items-center justify-center">
            <img class="w-1/4" :src="config.public.BASE_IMAGE_URL + setting?.home_logo" alt="" srcset="">
          </div>
          <p class="text-2xl font-semibold text-center text-gray-900 dark:text-gray-200">{{ $__("Login to your account") }}</p>
          <p class="text-xs text-center text-gray-900 dark:text-gray-200">
            {{ $__("Welcome to Vajjan app Sign in and discover great amount of ride and experience") }}
          </p>
        </div>
        <!-- <InputValidationErrors :errors="error" /> -->
        <!-- <ul
          v-if="errors.length > 0"
          className="mb-4 list-disc list-inside text-sm text-red-600"
        >
          <li v-for="(error, index) in errors" :key="index">
            {{ error }}
          </li>
        </ul> -->
        <form class="inline-flex flex-col space-y-16" @submit.prevent="requestOTP()">
          <!-- <FormLogin v-model:email="email" v-model:password="password" :errors="error">
            <div v-show="reset" class="relative w-full mt-2">
              <div class="text-blue-700" @click="forgotpassword()">Reset password</div>
            </div>
          </FormLogin> -->
          <FormLoginOtp v-model:mobile="mobile" v-model:show="show">
            <div class="relative w-full mt-4">
              <div class="relative w-full">
                <InputOtp v-model="otp" :fields="6"></InputOtp>
                <InputText class="w-full" type="text" placeholder="Enter Otp" @input="otp = $event.target.value" :value="otp" id="otp" />
              </div>
            </div>
            <!-- <InputOtp :digit-count="6" @update:otp="otp = $event"></InputOtp> -->
          </FormLoginOtp>
          <div>
            <button type="button" v-if="show" :disabled="loading" @click="otpLogin()"
              class="inline-flex items-center justify-center w-full px-2 py-3 leading-6 bg-primary rounded-xl">
              <p class="text-base font-semibold text-white dark:text-gray-900">Login</p>
              <svg v-if="loading" class="w-5 h-5 mr-3 -ml-1 text-white dark:text-gray-900 animate-spin" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
            </button>
            <button v-else :disabled="loading"
              class="inline-flex items-center justify-center w-full px-2 py-3 leading-6 bg-primary rounded-xl">
              <p class="text-base font-semibold text-white dark:text-gray-900">Request OTP</p>
              <svg v-if="loading" class="w-5 h-5 mr-3 -ml-1 text-white dark:text-gray-900 animate-spin" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
            </button>
          </div>
        </form>
        <!-- <form action="#" class="inline-flex flex-col space-y-16" @submit.prevent="log_in">
          <FormLogin v-model:email="email" v-model:password="password" :errors="error">
            <div v-show="reset" class="relative w-full mt-2">
              <div class="text-blue-700" @click="forgotpassword()">{{ $__("Reset password") }}</div>
            </div>
          </FormLogin>
          <div>
            <button :disabled="loading" class="inline-flex items-center justify-center w-full px-2 py-3 leading-6 bg-primary rounded-xl">
              <p class="text-base font-semibold text-white dark:text-gray-900">{{ $__("Login") }}</p>
              <svg v-if="loading" class="w-5 h-5 mr-3 -ml-1 text-white dark:text-gray-900 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </button>
          </div>
        </form> -->
        <div class="flex flex-col items-center mt-20 space-y-6">
          <div v-show="setting.social_login" class="inline-flex flex-row space-x-2.5 items-center justify-center w-full h-4">
            <div class="h-0.5 bg-gray-300 w-1/3" />
            <p class="text-xs text-center text-gray-900 dark:text-gray-200">{{ $__("Or continue with") }}</p>
            <div class="h-0.5 bg-gray-300 w-1/3" />
          </div>
          <div v-show="setting.social_login" class="inline-flex items-center justify-end w-full h-12 space-x-4">
            <div class="flex space-x-2.5 items-center justify-center w-full h-full p-4 bg-gray-100 dark:bg-gray-800 border rounded-lg">
              <img class="w-1/4" src="~/assets/image/facebook.png" />
              <p class="text-sm">{{ $__("Facebook") }}</p>
            </div>
            <div class="flex space-x-2.5 items-center justify-center w-full h-full p-4 bg-gray-100 dark:bg-gray-800 border rounded-lg">
              <img class="w-1/4" src="~/assets/image/google.png" />
              <p class="text-sm">{{ $__("Google") }}</p>
            </div>
          </div>
          <div v-show="show" class="w-full h-4">
            <p @click="resend" class="text-xs text-center">
              {{ $__("Change Number / Resend OTP ?") }}
              <!-- <a @click="resend" class="font-bold cursor-pointer text-sky-700"> Resend OTP</a> -->
            </p>
          </div>
          <!-- <div class="w-full h-4">
            <p class="text-xs text-center">
              Already have an account?
              <NuxtLink to="/register" class="font-bold cursor-pointer text-sky-700">Sign up</NuxtLink>
            </p>
          </div> -->
        
        </div>
      </div>
      </NuxtLayout>
  </div>
  </template>
  
  <script setup lang="ts">
  import { storeToRefs } from "pinia";
  const { errorResponse } = useBase();
  definePageMeta({
    key: route => route.fullPath,
    layout: false,
    middleware: ["guest"],
  });
  
  const title = useState("title");
  
  const { useUser } = useAuth();
  const sto = useLoading();
  const { loading } = storeToRefs(sto);
  const { error, mobile } = storeToRefs(useUser());
  
  const config = useRuntimeConfig()
  const setting = useSetting();
  
  const otp = ref("");
  
  const email = ref("");
  const password = ref("");
  
  const store = useFirebase();
  const userStore = useUser();
  
  const reset = ref(false);
  const show = ref(false);
  
  onMounted(() => {
    mobile.value = "+91"

    title.value = "login";
    watchEffect(() => {
      if (email.value.length > 0) {
        reset.value = true;
      } else {
        reset.value = false;
      }
    });
  });
  
  async function requestOTP() {
    await userStore.requestOtp(mobile.value, store.token, store?.deviceid?.identifier);
    otp.value = userStore.otp 
    show.value = !show.value
  }
  
  async function otpLogin() {
    if (userStore.otp == otp.value) {
      let pass = userStore.user.email + mobile.value;
      userStore.login(userStore.user.email, store.token, store.deviceid.identifier, pass);
    } else {
      errorResponse("OTP don't match !!")
    }
  }
  
  async function log_in() {
    userStore.login(email.value, store.token, store.deviceid.identifier, password.value);
  }
  
  async function forgotpassword() {
    userStore.forgot(email.value);
  }
  async function resend() {
    show.value = !show.value
    //userStore.otp(email.value, store.token, store.deviceid.identifier, password.value);
  }
  
  </script>
  