<template>
  <div class="space-y-3">
    <div class="flex flex-row space-x-2 items-center justify-around p-2 bg-gray-50 dark:bg-gray-900 border rounded-lg">
        <div class="flex w-10 flex-col space-y-2 items-center justify-center">
            <div class="flex w-4 h-4 bg-primary rounded-full" />
            <div class="transform -rotate-90 w-8 h-1 bg-gray-50 dark:bg-gray-900 rounded-full" />
            <svg class="w-full h-6 rounded-full" viewBox="0 0 13 16" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M6.07107 15.8952C6.68708 15.8952 9.62049 12.2114 10.3438 11.0379C11.4557 9.23407 12.1421 8.16692 12.1421 6.17557C12.1421 2.8226 9.42404 0.104492 6.07107 0.104492C2.71811 0.104492 0 2.8226 0 6.17557C0 8.17728 0.63608 9.23732 1.74425 11.0379C2.51662 12.2929 5.45507 15.8952 6.07107 15.8952Z"
                    fill="#F52D56" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M6.07118 8.90408C7.74766 8.90408 9.10672 7.54503 9.10672 5.86854C9.10672 4.19206 7.74766 2.83301 6.07118 2.83301C4.3947 2.83301 3.03564 4.19206 3.03564 5.86854C3.03564 7.54503 4.3947 8.90408 6.07118 8.90408Z"
                    fill="white" />
            </svg>
        </div>
        <div class="flex flex-col w-full justify-end ">
            <nuxt-link :to="`/set-address?for=${dest}&input=pick`">
                <FormSingleAddressForm label="address" :street="form.s_map_address"
                    v-model:street="form.s_building" v-model:latitude="form.s_latitude"
                    v-model:longitude="form.s_longitude" v-model:map_address="form.s_map_address" />
            </nuxt-link>
            <div class="w-full h-0.5 border-1 border-gray-300 bg-gray-300 "></div>

            <nuxt-link :to="`/set-address?for=${dest}&input=drop`">
                <FormSingleAddressForm label="address" :street="form.d_map_address"
                    v-model:street="form.d_building" v-model:latitude="form.d_latitude"
                    v-model:longitude="form.d_longitude" v-model:map_address="form.d_map_address" />

            </nuxt-link>
        </div>
    </div>
    <UTabs :items="tabItems" v-model="selected" class="w-full">
        <template #item="{ item }">
          <UCard>
            <template #header>
              <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white dark:text-gray-900">
                {{ item.label }}
              </p>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ item.description }}
              </p>
            </template>
    
            <div v-if="item.key === 'from'" class="space-y-3">
              <UFormGroup label="sender info" name="name">
                <URadio v-for="method of addressFor" :key="method.value" v-model="selectedDeliverTo" v-bind="method" />
              </UFormGroup>
              <template v-if="selectedDeliverTo == 'other'">
                <UFormGroup label="Name" name="name">
                  <UInput size="xl" v-model="address.pick_meta.name" />
                </UFormGroup>
                <UFormGroup label="Mobile" name="mobile">
                  <UInput size="xl" type="text" pattern="[1-9]{1}[0-9]{9}" v-model="address.pick_meta.phone" />
                </UFormGroup>
              </template>
            </div>
            <div v-else-if="item.key === 'to'" class="space-y-3">
              <UFormGroup label="to User info" name="name">
                <URadio v-for="method of addressFor" :key="method.value" v-model="selectedDeliverTo" v-bind="method" />
              </UFormGroup>
              <template v-if="selectedDeliverTo == 'other'">
              <UFormGroup label="Name" name="name">
                <UInput size="xl" v-model="address.drop_meta.name" />
              </UFormGroup>
              <UFormGroup label="Mobile" name="mobile">
                <UInput size="xl" type="text" pattern="[1-9]{1}[0-9]{9}" v-model="address.drop_meta.phone" />
              </UFormGroup>
            </template>

            </div>
    
            <div v-else-if="item.key === 'items'" class="space-y-3">
                <div>
                    <UiTabs default-value="1" class="w-auto">
                        <UiTabsList class="flex space-x-1 h-auto overflow-x-auto w-full pl-4">
                            <UiTabsTrigger v-for="(item, index) in items" :key="index" :value="'' + item.id"
                                class="flex flex-col !m-1 !p-1 justify-center h-20 min-w-20 active:bg-primary">
                                <img class="object-cover object-center h-16"
                                    :src="config.public.BASE_IMAGE_URL + item.marker" alt="" srcset="" />
                                <p>{{ $_api_(item.name) }}</p>
                            </UiTabsTrigger>
                        </UiTabsList>
                        <UiTabsContent v-for="(item, index) in items" :key="index" :value="'' + item.id">
                                  <div class="flex flex-row items-center justify-between p-2">
                                      <h4>{{ $_api_(item.name) }}</h4>
                                      <p>{{ $_api_(item.description) }}</p>
                                  </div>
                                <div class="space-y-1 w-full !p-2">
                                    <UiScrollArea class="h-auto w-full rounded-md border-none ">
                                        <SelectItems :key="item.id" v-model="address.items"
                                            :items="item?.sub_items" />
                                    </UiScrollArea>
                                </div>
                        </UiTabsContent>
                    </UiTabs>
                </div>
            </div>
            <template #footer>
              <div v-if="item.key === 'from'" class="w-full justify-end">
                <UButton block size="lg" @click="onSubmit" color="primary">
                  Next
                </UButton>
              </div>
              <div v-else-if="item.key === 'to'" class="w-full justify-end">
                <UButton block size="lg" color="primary" @click="onSubmit" >
                  Next
                </UButton>
              </div>
              <slot v-else name="final-button"></slot>
            </template>
          </UCard>
        </template>
      </UTabs>
      <slot/>
      
</div>
</template>

<script lang="ts" setup>

const {address} = defineProps(['address']);
const emit = defineEmits(['update:address']);

const form = useAddress();
const {for:dest} = useRoute().query;
const config = useRuntimeConfig();
const store = useHome().useService();
const selected = ref(0);
const { items} = storeToRefs(store);

const {user} = useUser();

const tabItems = [{
  key: 'from',
  label: 'Pick up from',
  description: 'set user info for pickup'
}, {
  key: 'to',
  label: 'deliver to',
  description: 'set user info for drop location for verification'
}, {
  key: 'items',
  label: 'deliver item',
  description: ''
}]

const addressFor = [
  { value: 'self', label: 'Self' },
  { value: 'other', label: 'Other' },
]
const selectedDeliverTo = ref('')

function onSubmit () {
  if (selected.value == 0) {
    if (selectedDeliverTo.value == 'self') {
      address.pick_meta.name = user?.first_name + ' ' + user?.last_name;
      address.pick_meta.phone = user?.mobile;
    }
    address.pick_meta.address = form.s_map_address;
    address.pick_meta.latitude = form.s_latitude;
    address.pick_meta.longitude = form.s_longitude;
  }

  if (selected.value == 1) {
    if (selectedDeliverTo.value == 'self') {
      address.drop_meta.name = user?.first_name + ' ' + user?.last_name;
      address.drop_meta.phone = user?.mobile;
    }
    address.drop_meta.address = form.d_map_address;
    address.drop_meta.latitude = form.d_latitude;
    address.drop_meta.longitude = form.d_longitude;
  }

  selected.value++;
  if (selectedDeliverTo.value == 'self') {
    selectedDeliverTo.value = 'other';
  }else{
    selectedDeliverTo.value = 'other';
  }
  emit('update:address', address)
}

</script>

