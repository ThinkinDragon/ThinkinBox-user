<template>
  <div ref="otpCont" class="flex flex-row w-full justify-between">
      <OtpInput
      ref="otpInput"
      input-classes="flex flex-1 w-1/4 m-1 items-center justify-center text-center h-12 p-2 bg-gray-100 dark:bg-gray-800 border rounded-xl shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 outline-none border-none"
      separator=" "
      :num-inputs="digitCount"
      :should-auto-focus="true"
      :is-input-num="true"
      @on-change="handleOnChange"
      @on-complete="handleOnComplete"
    />
  </div>
</template>

<script setup lang="ts">
import OtpInput from 'vue3-otp-input';

  const props = defineProps({
    default: String,
    digitCount: {
      type: Number,
      required: true
    }
  });
  const emit = defineEmits(['update:otp']);
  const otpInput = ref(null)

    const handleOnComplete = (value: string) => {
      //console.log('OTP completed: ', value);
        emit('update:otp', value)
    };

    const handleOnChange = (value: string) => {
      //console.log('OTP changed: ', value);
        emit('update:otp', value)
    };

     const clearInput = () => {
      otpInput.value.clearInput()
    }
</script>