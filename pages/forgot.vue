<template>
  <div>
    <NuxtLayout name="auth">
      <div class="flex flex-col px-4 mx-auto justify-evenly">
        <Title> {{ $__(title) }}</Title>
        <!-- <InputValidationErrors :errors="error" /> -->
        <form action="#" class="space-y-6" @submit.prevent="register">
          <FormForgot v-model:otp="otp" v-model:password="password" v-model:passwordConfirm="passwordConfirm" />
    
          <div>
            <button :disabled="loading" class="inline-flex items-center justify-center w-full px-2 py-3 leading-6 bg-primary rounded-xl">
              <p class="text-base font-semibold text-white dark:text-gray-900">{{ $__("Change password") }}</p>
              <svg v-if="loading" class="w-5 h-5 mr-3 -ml-1 text-white dark:text-gray-900 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
  
  layout: false,
  middleware: ["guest"],
});
const title = useState("title");
const { errorResponse } = useBase();
const router = useRouter();
title.value = "Forgot Password";
const otp = ref("");
const password = ref("");
const passwordConfirm = ref("");


const userStore = useUser();

const store = useFirebase();

const  {loading} = storeToRefs(useLoading());
const { error } = storeToRefs(useUser());

async function register() {
  userStore.reset(otp.value,password.value, passwordConfirm.value);
}
</script>
