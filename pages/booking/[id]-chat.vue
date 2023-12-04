<template>
  <div>
    <NuxtLayout name="single">
      <Title>{{ title }}</Title>
      <div id="messages" ref="messagesRef" class="flex flex-col-reverse h-[85vh] mb-5 md:h-full p-3 space-y-4 overflow-y-auto scrolling-touch scrollbar-thumb-gray scrollbar-thumb-rounded scrollbar-track-gray-lighter scrollbar-w-2">
        <template v-if="chat == null"> </template>
        <ChatItem v-else v-for="item in chat" :key="item.id" :chat="item" />
      </div>
  
      <template #bottom>
          <div class="flex h-full items-center justify-center  pl-4 pr-2.5">
            <form @submit.prevent="send()" class="flex h-full flex-1 items-center justify-end space-x-3.5">
              <input @keyup.enter="send()" class="inline-flex space-x-2.5 items-center justify-start w-full h-12 p-4 bg-white dark:bg-gray-900 border rounded-lg shadow-sm focus:none" type="text" name="message" v-model="message" placeholder="Type a message..." />
              <button class="w-8 h-3/4">
                <div class="relative w-6 bg-opacity-0">
                  <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.611328" width="30" height="27.6667" fill="#FF0000" fill-opacity="0.01" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.24283 6.72393C2.85777 5.90439 3.67321 5.03591 4.51536 5.36864L26.0782 13.888C26.922 14.2214 26.9215 15.4158 26.0774 15.7484L4.48657 24.2571C3.64808 24.5876 2.83471 23.7273 3.21152 22.9086L6.24379 16.3207C6.40025 15.9807 6.73342 15.7566 7.10725 15.7398L27.5697 14.8193L7.07329 13.645C6.70692 13.624 6.38147 13.404 6.22542 13.0719L3.24283 6.72393Z" fill="#DC0D0D" />
                    <mask id="mask0_429_1661" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="3" y="5" width="25" height="20">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.24283 6.72393C2.85777 5.90439 3.67321 5.03591 4.51536 5.36864L26.0782 13.888C26.922 14.2214 26.9215 15.4158 26.0774 15.7484L4.48657 24.2571C3.64808 24.5876 2.83471 23.7273 3.21152 22.9086L6.24379 16.3207C6.40025 15.9807 6.73342 15.7566 7.10725 15.7398L27.5697 14.8193L7.07329 13.645C6.70692 13.624 6.38147 13.404 6.22542 13.0719L3.24283 6.72393Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_429_1661)">
                      <rect y="0.611328" width="30" height="27.6667" fill="black" />
                    </g>
                  </svg>
                </div>
              </button>
            </form>
          </div>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

const title = useState("title");
const route = useRoute();

definePageMeta({
  
  layout: false,
});

  const { $echo } = useNuxtApp()

const { getUser } = useAuth();
const user = getUser();

const { useBookings, sendMessage } = useBooking();
const store = useBookings();
const messagesRef = ref();
const { booking, chat } = storeToRefs(store);
title.value = "Chat";
const message = ref("");
let watchChat:any;
const load = useLoading();
const { silentLoading } = storeToRefs(load);

onMounted(async () => {
  await store.flowBooking(route.params.id);
  //booking.value = currbooking.value?.data
  title.value = "Chat " + booking.value?.booking_id;
  //await echoChat()

  watchChat = watch(chat, async() => {
    await nextTick();
  messagesRef.value.scrollTop =
    messagesRef.value.scrollHeight;
  })
});

// function echoChat() {
//   wsChat.value = $echo.private(`Neos.request-chat.${booking.value?.booking_id}`)
//   wsChat.value.listen('RequestChat', (e:any) => {
//     console.log(e);
//     // chat.value.push({
//     //   message: e.message.message,
//     //   user: e.user
//     // });
//   });
// }

onUnmounted(() => {
  watchChat()
})

const send = async () => {
  if (!silentLoading.value) {
    load.sshow();
    // let obchat = {
    //   id: +chat.value[+chat.value?.length - +1]?.id+1,
    //   request_id: +chat.value[0]?.request_id,
    //   chatable_type: chat.value[0]?.chatable_type,
    //   chatable_id: chat.value[0]?.chatable_id,
    //   message: message.value,
    //   url: null,
    //   type: "up",
    // };
    // chat.value?.push(obchat);
    await sendMessage(route.params.id, message.value)
      .then(async () => {
        message.value = "";
        load.shide();
      })
      .catch((err) => {
        load.shide();
        console.log(err);
      });
  }
};
</script>
