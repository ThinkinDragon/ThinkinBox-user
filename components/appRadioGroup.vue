<template>
  <div class="w-full">
    <div class="mx-auto w-full max-w-md">
      <RadioGroup v-model="selected">
        <RadioGroupLabel class="sr-only">Cancel Reason</RadioGroupLabel>
        <div class="space-y-1">
          <RadioGroupOption v-for="option in options" :key="option" v-slot="{ active, checked }" :value="option" as="template" @click="$emit('update:modelValue', option)">
            <div class="relative flex cursor-pointer p-2">
              <div class="flex w-full items-center justify-start text-gray-900 dark:text-gray-200">
                <div v-if="checked" class="shrink-0 text-white dark:text-gray-900">
                  <svg class="h-6 w-6" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16L13 20L23 10" stroke="#FDB813" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="15.5" cy="15.5" r="14.25" stroke="#FDB813" stroke-width="2.5"/>
                </svg>
                </div>
                <div v-else class="shrink-0 text-white dark:text-gray-900">
                  <svg class="h-6 w-6" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="15.5" cy="15.5" r="14.25" stroke="#EFEFF4" stroke-width="2.5" />
                  </svg>
                </div>
                <div class="px-3 flex items-center">
                  <div class="text-sm">
                    <RadioGroupLabel as="p" class="font-medium text-gray-900 dark:text-gray-200">
                      {{ option?.reason }}
                    </RadioGroupLabel>
                  </div>
                </div>
              </div>
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>
    </div>
  </div>
</template>

<script setup>
import { RadioGroup, RadioGroupLabel, RadioGroupDescription, RadioGroupOption } from "@headlessui/vue";

const props = defineProps({
  modelValue: Number | Object,
  //   defaultSelected: {
  //     type: Number | Object,
  //     default: 0,
  //   },
  label: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    required: true,
  },
});

defineEmits(["update:modelValue"]);

const selected = ref(null); //props.options[props.modelValue])
</script>
