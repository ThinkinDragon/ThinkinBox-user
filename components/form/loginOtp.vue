<template>
  <div class="flex flex-col items-start justify-between w-full">
    <div class="relative w-full mt-4">
      <InputLabel for="Mobile" value=" Mobile" />

      <UInput :ui="ui" size="xl" type="number" placeholder="Enter mobile" :disabled="show" required
        @input="$emit('update:mobile', $event.target.value.replace(/\s/g,''))" :value="mobile" >
        <template #leading>
          <UAvatar
            src="https://www.worldatlas.com/r/w425/img/flag/in-flag.jpg"
            size="sm"
          />
        </template>
      </UInput>
        <vue-tel-input v-show="false" @update:modelValue="value => $emit('update:mobile', value.replace(/\s/g,''))" class="inline-flex space-x-2.5 items-center justify-start w-full h-12 p-4 !bg-gray-100 border rounded-xl shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 outline-none border-none" default-country="IN" :modelValue="mobile" id="mobile" mode="auto" :disabled="show" ></vue-tel-input>
    </div>
    <div :class="show ? '' : 'hidden '" class="relative w-full mt-4">
      <InputLabel for="OTP" value="OTP" />

      <div class="flex justify-between">
      <slot/>
      </div>
      <!-- <InputText type="number" class="w-full" placeholder="Enter Your OTP" @input="$emit('update:otp', $event.target.value)" :value="otp" id="otp" /> -->
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  mobile: {
    type: String,
    default: '',
  },
  otp: {
    type: String,
    default: '',
  },
  show: {
    type: Boolean,
    default: false,
  },
  errors: {
    type: [Array, String],
    default: null,
  }
})

const ui = {base : 'inline-flex space-x-2.5 items-center justify-start w-full h-12 p-4 bg-gray-100 dark:bg-gray-800 border rounded-xl shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 outline-none border-none'}
</script>

<style scoped>
  
.vti__input {
  background: transparent !important;
  border: none;
  outline: none !important;
}

.vue-tel-input {
  border-radius: 0px;
  display: flex;
  border: 1px solid #bbb;
  text-align: left;
}
.vue-tel-input.disabled .selection,
.vue-tel-input.disabled .dropdown,
.vue-tel-input.disabled input {
  cursor: no-drop;
}
.vue-tel-input:focus-within {
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
  border-color: transparent !important;
}
.vti__dropdown {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  position: relative;
  padding: 7px;
  cursor: pointer;
}
.vti__dropdown.show {
  max-height: 300px;
  overflow: scroll;
}
.vti__dropdown.open {
  background-color: #f3f3f3;
}
.vti__dropdown.disabled {
  cursor: no-drop;
  outline: none;
  background-color: #f3f3f3;
}
.vti__dropdown:hover {
  background-color: #f3f3f3;
}
.vti__selection {
  font-size: 0.8em;
  display: flex;
  align-items: center;
}
.vti__selection .vti__country-code {
  color: #666;
}
.vti__flag {
  margin-right: 5px;
  margin-left: 5px;
}
.vti__dropdown-list {
  z-index: 1;
  padding: 0;
  margin: 0;
  text-align: left;
  list-style: none;
  max-height: 200px;
  overflow-y: scroll;
  position: absolute;
  left: -1px;
  background-color: #fff;
  border: 1px solid #ccc;
  width: 390px;
}
.vti__dropdown-list.below {
  top: 33px;
}
.vti__dropdown-list.above {
  top: auto;
  bottom: 100%;
}
.vti__dropdown-arrow {
  transform: scaleY(0.5);
  display: inline-block;
  color: #666;
}
.vti__dropdown-item {
  cursor: pointer;
  padding: 4px 15px;
}
.vti__dropdown-item.highlighted {
  background-color: #f3f3f3;
}
.vti__dropdown-item.last-preferred {
  border-bottom: 1px solid #cacaca;
}
.vti__dropdown-item .vti__flag {
  display: inline-block;
  margin-right: 5px;
}
.vti__input {
  border: none;
  border-radius: 0 2px 2px 0;
  width: 100%;
  outline: none;
  padding-left: 7px;
}
.vti__search_box {
  border: 1px solid #ccc;
  width: 94%;
  padding: 7px;
  margin: 2px 2px;
}
</style>

