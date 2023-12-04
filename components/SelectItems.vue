<template>
  <div class="w-full">
      <div v-for="(item,index) in items" :key="item.id" :value="item">
        <CommonItem @add="addItem" @delete="deleteItem" :selected="checkSelected(item)"  :item="item" :key="item.id" />
      </div>
  </div>
  
  <!-- <Listbox class="w-full" v-model="modelValue" multiple>
    <ListboxOptions static>
      <ListboxOption v-for="(item,index) in items" :key="index" :value="item">
          <CommonItem v-model="modifiedProp[index]" :selected="checkSelected(item)"  :item="item" :key="item.id" />
            <UiSeparator class="my-2" />
      </ListboxOption>
    </ListboxOptions>
  </Listbox> -->
</template>
  
<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  } from '@headlessui/vue'


const props = defineProps<{
  items?: object
  modelValue?: Array<object>
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: Array<object>): void
}>()
const config = useRuntimeConfig();

const route = useRoute()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
})
const modifiedProp = ref(modelValue);

const {addresses} = storeToRefs(useDeliveryAddresses());

watchEffect(() => {
  if (modifiedProp.value.length >0) {
    emits('update:modelValue',modifiedProp)
  }
})

// const variantAction = (item: object) => {
// console.log(item);
// const itemStr = ref()

//   itemStr.value = structuredClone(toRaw(item))
//   variantData.value = itemStr.value;//JSON.parse(JSON.stringify(item));
//   openVariant.value = true;
//   console.log(variantData.value);
  
// }
function checkSelected(item:any):boolean {
  return modifiedProp.value?.find(i => i.id == item?.id) ? true : false
}
// const checkSelected = computed({get():boolean {
//   return false;
// },set(item){
//   modelValue?.find(i => i.id == item?.id) ? true : false
// }})
function addItem(item: any) {
  // console.log(item.id);

  //   let objIndex =  modifiedProp.value?.find(obj => obj.id !== item.id);
  //   //useBase().errorResponse(objIndex);
  //   console.log(objIndex);
    
  //   if (objIndex) {
  //     modifiedProp.value[objIndex.id] =structuredClone(toRaw(item));
  //   }else{
    let data = item;//structuredClone(toRaw(item));
    modifiedProp.value?.push(item);
    //}
    return true;
  
}


async function deleteItem(params:any) {
  console.log(params);
  let objIndex = modifiedProp.value?.filter(obj => obj.id !== params.id);
  console.log(objIndex);
  // if (objIndex.qty > 1) {
  //   return objIndex.qty--
  // }
  let data = modifiedProp.value.length > 0 ? modifiedProp.value = objIndex : await modifiedProp.value.splice(0);

}

</script>