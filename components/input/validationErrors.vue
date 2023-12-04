<template>
    <div v-if="now">
        <div class="font-medium text-red-600">Whoops! Something went wrong.</div>

        <ul class="mt-3 text-sm text-red-600 list-disc list-inside">
            <li v-for="(error, key) in errors" :key="key">{{ error.name }}:{{ error.value[0] }}</li>
        </ul>
    </div>
</template>

<script setup>
    const props = defineProps({
        errors:{
            type: Array
        }
    })
const now = computed(() => hasErrors())
      function  hasErrors() {
            return Object.keys(props.errors).length > 0
        }

</script>
