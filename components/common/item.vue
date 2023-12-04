<script setup lang="ts">

const props = defineProps<{
  item?: object
  selected?: boolean
}>()
const emits = defineEmits<{
  (e: 'add', payload: object): void,(e:'delete', payload: object): void,
}>()
const route = useRoute();
const config = useRuntimeConfig();

// onMounted(() => {
//   watch(props.item, (newitem, olditem) => {
//     let objIndex = selected_item.value?.findIndex(obj => obj.id == newitem.id);
//     selected_item.value[objIndex] = newitem;
//   })
// })

async function add(params:any) {
  console.log(params);
  
  if (params.qty==0 ) params.qty = 1;
  return emits('add', params);
}

// watch(props.item  , (newitem, olditem) => {
//   return emits('add', newitem);
// },{deep:true})

async function remove(params:any) {
  if (params.qty > 1 ) {
    params.qty--
  }else{
    return emits('delete', params );

  }
}

</script>
<template>
  <button :class="selected ? 'bg-gray-300' : ''"
    class="my-2 w-full flex disabled:hidden disabled:bg-gray-500 items-center justify-between rounded-lg border border-2  px-2 shadow-xl">
    <div class="flex items-center gap-2 justify-evenly w-full">
      <div class="flex flex-row items-center justify-center w-12">
        <div class="relative inline-block">
          <img class="object-cover object-center" :src="config.public.BASE_IMAGE_URL + item.marker" alt="" srcset="" />
          <!-- <img class="justify-between inline-block object-cover w-20 h-20 rounded-lg"
            :src="item.image[0]?.image ? config.public.BASE_IMAGE_URL + 'public/' + item?.image[0]?.image : `https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80`"
            :alt="item.name" /> -->
        </div>
      </div>
      <div class="flex flex-col mt-2 justify-center items-center object-center">
        <div class="flex flex-row w-full items-center justify-between content-center">

          <div  class="p-1 items-start flex flex-col justify-start space-x-2">

            <div class="p-1 items-start flex flex-row justify-start space-x-2">
              <div class="text-xs font-semibold truncate mt-1">{{ $_api_(item.name) }}</div>
              <!-- <div class="flex flex-row truncate"> -->
                <div class="flex text-sm font-normal text-red-600">
                  <!-- {{ useAuth().useUser().getCurrency(""+item?.price?.price+ +(item?.select_addon?.reduce((acc: number,
                    item: object) => acc + (item.pivot.price), 0) ?? 0)) }} -->
                  <p >{{ useAuth().useUser().getCurrency(""+(item?.price * item.qty)) }} </p>
                </div>
              <!-- </div> -->
            </div>
            <div class="flex flex-row w-full h-9 text-xs items-start justify-start text-start overflow-hidden">
              {{ item.dimension }}
            </div>
          </div>

          <div :class="selected ? '' : 'hidden '" class="flex items-center border-gray-100">
            <span @click.self="remove(item)"
              class="cursor-pointer rounded-l bg-gray-100 dark:bg-gray-800 py-1 px-3.5 duration-100 hover:bg-primary-500 hover:text-primary-50">
              - </span>
            <div class="h-8 w-8 border bg-white dark:bg-gray-900 text-center text-xs outline-none pt-2"> {{+item.qty }}</div>
            <span @click.self="item.qty++"
              class="cursor-pointer rounded-r bg-gray-100 dark:bg-gray-800 py-1 px-3 duration-100 hover:bg-primary-500 hover:text-primary-50">
              + </span>
          </div>
          <svg @click="add(item)" :class="selected ? 'hidden' : ' '" class="flex text-primary-500 w-32"
            width="88" height="32" viewBox="0 0 88 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="88" height="32" rx="12" fill="#F8F8FA" />
            <path d="M56 16H66M61 11V21V11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M27.528 20H28.968L25.98 11.648H24.396L21.408 20H22.836L23.436 18.296H26.928L27.528 20ZM26.544 17.18H23.82L25.188 13.304L26.544 17.18ZM29.8112 16.664C29.8112 18.704 31.1912 20.108 32.9312 20.108C34.0112 20.108 34.8032 19.604 35.2232 19.004V20H36.6032V11.12H35.2232V14.312C34.7192 13.688 33.8072 13.28 32.9432 13.28C31.1912 13.28 29.8112 14.624 29.8112 16.664ZM35.2232 16.688C35.2232 18.116 34.2512 18.92 33.2192 18.92C32.1992 18.92 31.2152 18.092 31.2152 16.664C31.2152 15.236 32.1992 14.468 33.2192 14.468C34.2512 14.468 35.2232 15.272 35.2232 16.688ZM37.944 16.664C37.944 18.704 39.324 20.108 41.064 20.108C42.144 20.108 42.936 19.604 43.356 19.004V20H44.736V11.12H43.356V14.312C42.852 13.688 41.94 13.28 41.076 13.28C39.324 13.28 37.944 14.624 37.944 16.664ZM43.356 16.688C43.356 18.116 42.384 18.92 41.352 18.92C40.332 18.92 39.348 18.092 39.348 16.664C39.348 15.236 40.332 14.468 41.352 14.468C42.384 14.468 43.356 15.272 43.356 16.688Z"
              fill="currentColor" />
          </svg>
        </div>
 
      </div>
      <!-- <span :class="selected ? '': 'hidden '" class="cursor-pointer pt-2 rounded-sm bg-gray-100 dark:bg-gray-800 py-1 px-3.5 duration-100"> X </span> (${useAuth().useUser().getCurrency(addon.pivot.price)}) -->
    </div>
  </button>
</template>