<template>
  <template v-if="stype">
    <UBadge size="xs" variant="soft">
      <p class="text-sm leading-normal text-right text-blue-500">{{ $__(state) }}</p>
    </UBadge>
  </template>
  <div v-else class="flex flex-row  w-full sm:w-52 items-center justify-between flex-1 h-full my-2">
    <p class="inline-flex text-sm font-bold leading-normal">{{ $__("Status") }}</p>
    <UBadge size="xs" variant="soft">
      <p class="text-sm leading-normal text-right ">{{ $__(state) }}</p>
    </UBadge>
  </div>
</template>

<script setup>
const props = defineProps({
  status: String,
  stype: {
    type: Boolean,
    default: false,
  },
});
const state = computed(() => { return props.status; });
</script>
