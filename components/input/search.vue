<template>
    <div class="relative flex flex-row items-center justify-start py-2 m-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 rounded-xl">
      <span class="absolute flex items-center ml-2">
        <button type="submit" class="flex items-center justify-center flex-1 p-2 rounded-xl focus:outline-none focus:shadow-outline bg-primary">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6 text-white dark:text-gray-900"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
      </span>
          <input class="py-2 text-sm text-white dark:text-gray-900 bg-transparent rounded-md dorder-none pl-14 focus:outline-none focus:text-gray-900" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" placeholder="Search what you need..." ref="input"/>
    </div>
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
