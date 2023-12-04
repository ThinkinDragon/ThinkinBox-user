<template>
  <div>
    <NuxtLayout name="auth">
      <div class="flex flex-col px-4 mx-auto justify-evenly">
        <Title> {{ title }}</Title>
        <!-- <InputValidationErrors :errors="errors" />   :errors="errors" -->
        <form action="#" class="space-y-6" @submit.prevent="register">
          <FormRegister v-model:name="name" v-model:email="email" v-model:mobile="mobile" v-model:referalCode="referalCode">
            <div class="relative w-full mt-4">
                <InputLabel for="otp" value="OTP" />
                <div class="relative w-full">
                  <InputText class="w-full" type="text" placeholder="Enter Otp" @input="otp = $event.target.value" :value="otp" id="otp" />
                </div>
              <!-- <InputOtp :digit-count="6" @update:otp="otp = $event"></InputOtp> -->
              <!-- <InputLabel for="OTP" value="OTP" />
              <InputOtp :digit-count="6" @update:otp="otp = $event"></InputOtp> -->
            </div>
          </FormRegister>
          <div>
            <button :disabled="loading"
              class="inline-flex items-center justify-center w-full px-2 py-3 leading-6 bg-primary rounded-xl">
              <p class="text-base font-semibold text-white dark:text-gray-900">Register</p>
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
      </div>
      </NuxtLayout>
  </div>
  </template>
  
  <script setup>
  import { storeToRefs } from "pinia";
  
  definePageMeta({
  key: route => route.fullPath,
    layout: false,
    middleware: ["guest"],
  });
  const title = useState("title");
  const { errorResponse } = useBase();
  
  const router = useRouter();
  title.value = "Register";
  const name = ref("");
  const email = ref("");
  const password = ref("");
  const passwordConfirm = ref("");
  const referalCode = ref(null);
  const otp = ref(null);
  const sto = useLoading();
  const { loading } = storeToRefs(sto);
  
  const store = useFirebase();
  const { useUser } = useAuth();
  const userStore = useUser();
  
  const { error, mobile } = storeToRefs(useUser());
  
  onMounted(() => {
    otp.value = userStore.otp
  })
  async function register() {
    if (userStore.otp == otp.value) {
      let pass = email.value + mobile.value;
      userStore.signup(name.value, email.value, mobile.value, store.token, store.deviceid.identifier, pass, pass, referalCode.value);
    } else {
      errorResponse("OTP don't match !!")
    }
  }
  </script>
  