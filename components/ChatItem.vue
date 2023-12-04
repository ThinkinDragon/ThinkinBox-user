<template>
      <div class="chat-message">
         <div :class="chat.type == 'pu'?' ':' justify-end '" class="flex items-end">
            <div :class="chat.type == 'pu'?' items-end ':' items-start '" class="flex flex-col max-w-xs mx-2 my-1 text-xs">
               <div><span :class="chat.type == 'pu'?' text-white dark:text-gray-900 bg-primary rounded-br-none ':' text-gray-600 bg-gray-300 rounded-bl-none '" class="inline-block px-4 py-2 rounded-lg">{{chat.message}}</span></div>
            </div>
         </div>
      </div>
</template>

<script setup>
import { format } from 'date-fns'
  const config = useRuntimeConfig()
const props = defineProps({
  chat: Object,
})
</script>
