<template>
        <input type="checkbox" :value="value" v-model="proxyChecked"
            class="mt-1 text-primary border-gray-300 rounded shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
</template>

<script>
export default {
    emits: ['update:checked'],

    props: {
        checked: {
            type: [Array, Boolean],
            default: false,
        },
        value: {
            default: null,
        },
    },

    computed: {
        proxyChecked: {
            get() {
                return this.checked;
            },

            set(val) {
                this.$emit("update:checked", val);
            },
        },
    },
}
</script>
