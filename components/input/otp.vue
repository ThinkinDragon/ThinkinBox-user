<script lang="ts" setup>
interface Props {
  fields: number;
}

const props = defineProps<Props>();

const data = ref<string[]>([]);
const firstInputEl = ref<HTMLInputElement[]>([]);
const emit = defineEmits(['update:modelValue']);

watch(
  () => data,
  (newVal: any) => {
    //console.log(newVal.value);
    //console.log(newVal.value[0]);
    //console.log('test:',data.value[0]);
    if (newVal.value[0].length > 1 ) {
      data.value[0] = newVal.value[0].charAt(0);
    }
    if (
      newVal.value != '' &&
      newVal.value.length === props.fields &&
      !newVal.value.includes('')
    ) {
      emit('update:modelValue', Number(newVal.value.join('')));
    } else {
      emit('update:modelValue', null);
    }
  },
  { deep: true }
);

const handleOtpInput = (e: any) => {
  if (e.data && e.target.nextElementSibling) {
    e.target.nextElementSibling.focus();
  } else if (e.data == null && e.target.previousElementSibling) {
    e.target.previousElementSibling.focus();

  }
};

const handlePaste = (e: ClipboardEvent) => {
  const pasteData = e.clipboardData.getData('text');
  let nextEl = firstInputEl.value[0].nextElementSibling;
  for (let i = 1; i < pasteData.length; i++) {
    if (nextEl) {
      data.value[i] = pasteData[i];
      nextEl = nextEl.nextElementSibling;
    }
  }
};

// 123456
</script>

<template>
  <div class=" flex flex-1 gap-3 m-1 items-center justify-center text-center h-12 p-2"
    @input="handleOtpInput">
    <template v-for="field in fields" :key="field">
      <input v-model="data[field - 1]" ref="firstInputEl" type="tel" maxlength="1"
        class="border text-gray-900 dark:text-gray-200 bg-transparent w-12 h-12 text-center bg-gray-100 dark:bg-gray-800 rounded-xl shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 outline-none border-none"
        @paste="field === 1 && handlePaste($event)" />
    </template>
  </div>
</template>
