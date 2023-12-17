<template>
    <UInput size="xl" color="gray" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" ref="input"
        :placeholder="modelValue">
        <template v-if="$slots.icon" #leading><slot name="icon" /></template>
        
    </UInput>

    <!-- <input class="inline-flex space-x-2.5 items-center justify-start w-full h-12 p-4 bg-gray-100 dark:bg-gray-800 border rounded-xl shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 outline-none border-none" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" ref="input" :placeholder="modelValue"> -->
</template>

<script>
export default {
    props: ['modelValue'],

    emits: ['update:modelValue'],

    methods: {
        focus() {
            this.$refs.input.focus()
        }
    }
}
</script>
