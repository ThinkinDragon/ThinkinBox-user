<template>
    <button class="inline-flex items-center justify-center w-full px-2 py-3 bg-primary rounded-xl">
        <p class="text-base font-semibold text-white dark:text-gray-900">{{$__(srText)}}</p>
    </button>
</template>

<script>
export default {
    props: ['srText']
}
</script>
