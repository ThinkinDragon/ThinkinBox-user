<template>
<template v-if="stype">
    <div class="inline-flex items-center justify-start px-2 bg-blue-100 rounded">
      <p class="text-sm leading-normal text-right text-blue-500">{{ $__(state) }}</p>
    </div>
</template>
  <div v-else class="flex items-center justify-between flex-1 h-full my-2">
    <p class="inline-flex text-sm font-bold leading-normal text-gray-500 w-52">{{ $__("Status") }}</p>
    <div class="inline-flex items-center justify-start px-2 bg-blue-100 rounded">
      <p class="text-sm leading-normal text-right text-blue-500">{{ $__(state) }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  status: String,
  stype: {
    type: Boolean,
    default:false,
  },
});
const state = computed(() => {return props.status;});
</script>
