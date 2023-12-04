<template>
    <label class="items-start justify-start block px-4 text-xs">
        <span v-if="value">{{ $__(value) }}</span>
        <span v-else><slot /></span>
    </label>
</template>

<script>
export default {
    props: ['value']
}
</script>
