<template>
  <div>
    <NuxtLayout name="single">
      <Title>{{ title }}</Title>
      <TabGroup>
        <TabList class="flex p-1 space-x-1 rounded-xl">
          <Tab v-for="category in Object.keys(categories)" as="template" :key="category" v-slot="{ selected }">
            <button @click="routerr(category)" :class="['w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400', selected ? 'bg-gray-300 shadow' : 'text-gray-400 hover:bg-white/[0.12]']">
              {{ category }}
            </button>
          </Tab>
        </TabList>
  
        <TabPanels class="mt-2">
          <TabPanel v-for="(posts, idx) in Object.values(categories)" :key="idx" :class="['rounded-xl bg-white dark:bg-gray-900 p-3', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400']">
            <ul>
              <RequestItem v-if="posts.length > 0" v-for="post in posts" :key="post.id" :request="post" />
              <div v-else class="inline-flex flex-col items-center justify-start py-28">
                <div class="flex flex-col items-center justify-end flex-1 space-y-16">
                  <img class="flex-1 rounded-lg w-36 h-28" :src="`${categoriesOld[idx].image}`" />
  
                  <div class="flex flex-col space-y-2.5 items-center justify-end w-full h-1/3">
                    <p class="text-xl font-bold leading-relaxed text-center text-gray-900 dark:text-gray-200">{{ categoriesOld[idx].title }}</p>
                    <p class="w-full text-sm font-medium leading-normal text-center text-gray-600">{{ categoriesOld[idx].subTitle }}</p>
                  </div>
                </div>
              </div>
            </ul>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { storeToRefs } from "pinia";

import ongoing from '~/assets/image/ongoing.svg'
import history from '~/assets/image/history.svg'
import upcoming from '~/assets/image/upcoming.svg'

definePageMeta({
  layout: false,
  middleware: ["auth"],
});
const router = useRouter();

const categoriesOld = ref([
  {
    id: 1,
    image: ongoing,
    title: "No ongoing Request",
    subTitle: "Currently you don’t have any ongoing request. Place and track your requests from here.",
  },
  {
    id: 2,
    image: history,
    title: "No Completed Request this month",
    subTitle: "Currently you don’t have any history. Place and track your requests from here.",
  },
  {
    id: 3,
    image: upcoming,
    title: "No upcoming Request",
    subTitle: "Currently you don’t have any upcoming request. Place and track your requests from here.",
  },
]);

const categories = ref({
  Ongoing: [],
  History: [],
  Upcoming: [],
});

const { errorResponse } = useBase()
const { useBookings } = useBooking();
const store = useBookings();
const { bookings } = storeToRefs(store);
const title = useState("title");
onMounted(async () => {
  title.value = "Booking"

  try {
    await store.fetchBookings().then(async(result) => {
      categories.value = {
        ...categories.value,
        Upcoming: store.getUpcomingBookings,
        Ongoing: store.getOngingBookings,
        History: store.getCompletedBookings,
      };
    }).catch((err) => {
      console.log(err);
    });

    

    // categories.value = {...categories.value, Upcoming : store.getUpcomingBookings};
    // categories.value = {...categories.value, Ongoing : store.getOngingBookings};
    // categories.value = {...categories.value, History : store.getCompletedBookings};
  } catch (err) {
    errorResponse(err)
  }
});

async function routerr(params) {
  router.replace('#'+params);
}

</script>
