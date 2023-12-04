<template>
  <div>
    <NuxtLayout name="single">
      <div class="inline-flex flex-col items-center justify-end w-full pt-4 pb-6 pl-5 pr-4 space-y-6 bg-white dark:bg-gray-900">
        <div class="inline-flex flex-col items-center justify-start py-2">
          <div class="flex flex-col items-center justify-end flex-1 space-y-16">
            <img class="flex-1 rounded-lg w-48 h-28" src="~/assets/image/doc.svg" />
    
            <div class="flex flex-col space-y-2.5 items-center justify-end w-full h-1/3">
              <p class="w-full text-sm font-medium leading-normal text-center px-8 text-gray-600">{{ $__('Select language') }} </p>
            </div>
          </div>
        </div>
        <div class="relative flex flex-col w-full p-5 space-y-4">
          <div v-for="(item, index) in languages" :key="index">
            <div @click="setLanguage(item)" class="flex h-14 items-center justify-between space-x-2 rounded-lg border-2 border-black/50 bg-white dark:bg-gray-900 px-2.5 py-1.5 shadow">
              <p class="text-base text-gray-900 text-start line-clamp-1">{{ $__(item) }}</p>
              <div class="flex items-center justify-start space-x-1 min-w-6">
                <svg v-if="language != item" class="h-5 rounded-lg min-w-5" width="16" height="17"
                  viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M8 16.5C10.1217 16.5 12.1566 15.6571 13.6569 14.1569C15.1571 12.6566 16 10.6217 16 8.5C16 6.37827 15.1571 4.34344 13.6569 2.84315C12.1566 1.34285 10.1217 0.5 8 0.5C5.87827 0.5 3.84344 1.34285 2.34315 2.84315C0.842855 4.34344 0 6.37827 0 8.5C0 10.6217 0.842855 12.6566 2.34315 14.1569C3.84344 15.6571 5.87827 16.5 8 16.5ZM11.707 7.207C11.8892 7.0184 11.99 6.7658 11.9877 6.5036C11.9854 6.2414 11.8802 5.99059 11.6948 5.80518C11.5094 5.61977 11.2586 5.5146 10.9964 5.51233C10.7342 5.51005 10.4816 5.61084 10.293 5.793L7 9.086L5.707 7.793C5.5184 7.61084 5.2658 7.51005 5.0036 7.51233C4.7414 7.5146 4.49059 7.61977 4.30518 7.80518C4.11977 7.99059 4.0146 8.2414 4.01233 8.5036C4.01005 8.7658 4.11084 9.0184 4.293 9.207L6.293 11.207C6.48053 11.3945 6.73484 11.4998 7 11.4998C7.26516 11.4998 7.51947 11.3945 7.707 11.207L11.707 7.207Z"
                    fill="#EFEFF4" />
                </svg>
                <svg v-else class="h-5 rounded-lg min-w-5" width="16" height="17" viewBox="0 0 16 17" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M8 16.5C10.1217 16.5 12.1566 15.6571 13.6569 14.1569C15.1571 12.6566 16 10.6217 16 8.5C16 6.37827 15.1571 4.34344 13.6569 2.84315C12.1566 1.34285 10.1217 0.5 8 0.5C5.87827 0.5 3.84344 1.34285 2.34315 2.84315C0.842855 4.34344 0 6.37827 0 8.5C0 10.6217 0.842855 12.6566 2.34315 14.1569C3.84344 15.6571 5.87827 16.5 8 16.5ZM11.707 7.207C11.8892 7.0184 11.99 6.7658 11.9877 6.5036C11.9854 6.2414 11.8802 5.99059 11.6948 5.80518C11.5094 5.61977 11.2586 5.5146 10.9964 5.51233C10.7342 5.51005 10.4816 5.61084 10.293 5.793L7 9.086L5.707 7.793C5.5184 7.61084 5.2658 7.51005 5.0036 7.51233C4.7414 7.5146 4.49059 7.61977 4.30518 7.80518C4.11977 7.99059 4.0146 8.2414 4.01233 8.5036C4.01005 8.7658 4.11084 9.0184 4.293 9.207L6.293 11.207C6.48053 11.3945 6.73484 11.4998 7 11.4998C7.26516 11.4998 7.51947 11.3945 7.707 11.207L11.707 7.207Z"
                    fill="#27AE60" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      </NuxtLayout>
  </div>
  </template>
  
  <script lang="ts" setup>
  import { storeToRefs } from "pinia";
  
  definePageMeta({
  
    middleware: ["auth"],
    layout: false,
  });
  
  const title = useState("title");
  const {useUser} = useAuth()
  const {user} = storeToRefs(useUser())
const {language} = storeToRefs(useLanguage())
const { $__ } = useNuxtApp()
const {languages} = useSetting()

onMounted(async () => {
    title.value = $__("Language");

  });

  async function setLanguage(params) {
    user.value.language = params
    language.value = params
    useUser().setLang(params)
    //window.location.pathname ='/language'

  }
  
  let data = new FormData();
  const afterRead = async (file, index) => {
    let docs = {
      id: index.name,
      document: file.file,
    };
    data.append("id", index.name);
    data.append("document", file.file);
    await store.upload(data);
  };
  </script>
  
  <style>
  .van-uploader .van-uploader__wrapper .van-uploader__input-wrapper {
    width: 100% !important;
  }
  </style>
  