<template>
  <div class="flex flex-col items-start justify-between w-full">
    <div class="relative w-full mt-4">
      <InputLabel for="Name" value="Name">
      <InputText class="w-full" placeholder="Enter Your Name" @input="$emit('update:name', $event.target.value)" :value="name" id="name" />
      </InputLabel>
    </div>
    <div class="relative w-full mt-4">
      <InputLabel for="email" value="Email" >
      <InputText type="email" class="w-full" placeholder="Enter Email" @input="$emit('update:email', $event.target.value)" :value="email" id="email" />
      </InputLabel>
    </div>
    <div class="relative w-full mt-4">
      <InputLabel for="mobile" value="Mobile">

      <InputText type="tel" maxlength="11" class="w-full" placeholder="Enter Mobile" @input="$emit('update:mobile', $event.target.value)" :value="mobile" id="mobile" disabled />
      </InputLabel>
    </div>

    <slot/>
    <!-- <div class="relative w-full mt-4">
      <InputLabel for="password" value="Password" />
      <div class="relative w-full">
        <InputText class="w-full" :type="show ? 'text' : 'password'" placeholder="Enter Password" @input="$emit('update:password', $event.target.value)" :value="password" id="password" />
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5">
          <svg xmlns="http://www.w3.org/2000/svg" @click="show = !show" :class="{ hidden: !show, block: show }" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" @click="show = !show" :class="{ block: !show, hidden: show }" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
          </svg>
        </div>
      </div>

       <InputText class="w-full" type="password" placeholder="Enter Password" @input="$emit('update:password', $event.target.value)" :value="password" id="password" />
    </div>
    <div class="relative w-full mt-4">
      <InputLabel for="passwordConfirm" value="Confirm Password" />
      <div class="relative w-full">
        <InputText class="w-full" :type="show1 ? 'text' : 'password'" placeholder="Enter Password" @input="$emit('update:passwordConfirm', $event.target.value)" :value="passwordConfirm" id="passwordConfirm" />
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5">
          <svg xmlns="http://www.w3.org/2000/svg" @click="show1 = !show1" :class="{ hidden: !show1, block: show1 }" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" @click="show1 = !show1" :class="{ block: !show1, hidden: show1 }" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
          </svg>
        </div>
      </div> -->

      <!-- <InputText class="w-full" type="password" placeholder="Enter Password again" @input="$emit('update:passwordConfirm', $event.target.value)" :value="passwordConfirm" id="passwordConfirm" /> -->
    <!-- </div> -->
    <div class="relative w-full mt-4">
      <InputLabel for="Referral" value="Referral">
        <InputText class="w-full" placeholder="Enter Referral (optional)" @input="$emit('update:referalCode', $event.target.value)" :value="referalCode" id="referalCode" />
      </InputLabel>
    </div>
    <div class="relative w-full mt-4">
      <div class="inline-flex items-center justify-end h-6 space-x-1">
        <InputCheckbox required class="w-4" id="term" />
        <p class="text-xs">
          I have read and agreed the
          <NuxtLink to="/term" class="font-bold cursor-pointer text-sky-700"> Terms and Conditions</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const show = ref(false);
const show1 = ref(false);

defineProps({
  mobile: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  passwordConfirm: {
    type: String,
    default: "",
  },
  referalCode: {
    type: String,
    default: "",
  },
  errors: {
    type: [Array, String],
    default: null,
  },
});
</script>
