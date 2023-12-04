<template>
  <div>
    <NuxtLayout name="single">
      <div class="flex flex-col px-4 mx-auto justify-evenly">
        <Title> {{ $__(title) }}</Title>
        <div class="flex items-center justify-center w-full px-4">
          <van-uploader :after-read="afterCard" :before-read="beforeRead" accept="image/*" class="flex items-center w-24 h-24 rounded-full" :max-size="10240 * 1024" @oversize="onOversize">
            <img class="flex items-center w-24 h-24 rounded-full" :src="user?.avatar ? config.public.BASE_IMAGE_URL + user?.avatar : avatarStatic" />
            <!-- <van-tag type="danger" class="vip" size="medium">VIP</van-tag> -->
          </van-uploader>
        </div>
        <InputValidationErrors :errors="errors" />
        <form action="#" class="space-y-6" @submit.prevent="updateProfile">
          <FormProfile v-model:name="name" v-model:email="email" v-model:mobile="mobile" :errors="errors" />
          <button :disabled="loading" class="inline-flex items-center justify-center w-full px-2 py-3 leading-6 bg-primary rounded-xl">
            <p class="text-base font-semibold text-white dark:text-gray-900">{{ $__("Update") }}</p>
            <svg v-if="loading" class="w-5 h-5 mr-3 -ml-1 text-white dark:text-gray-900 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </button>
        </form>
        <div class="w-full h-4 my-20">
          <p class="text-xs text-center">
            {{ $__("Do you want to delete an account?") }}
            <div @click="delAcc()" class="font-bold cursor-pointer text-red-700">{{ $__("Delete") }}!</div>
          </p>
        </div>
      </div>
      </NuxtLayout>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import avatarStatic from '~/assets/image/avatar.png'

definePageMeta({
  
  middleware: ["auth"],
  layout:false
});
const title = useState("title");

const { $__ } = useNuxtApp()
const { errorResponse } = useBase();
const router = useRouter();
const config = useRuntimeConfig();

const { useUser, logout } = useAuth();
const { user } = storeToRefs(useUser());

const name = ref("");
const email = ref("");
const mobile = ref("");
const sto = useLoading();
const { loading } = storeToRefs(sto);
const errors = ref([]);

onMounted(() => {
  name.value = user.value.first_name;
  email.value = user.value.email;
  mobile.value = user.value.mobile;
});

async function updateProfile() {
  sto.show();

  try {
    await useFetchAuth("/api/user/update/profile", {
      method: "POST",
      body: {
        first_name: name.value,
        last_name: name.value,
        email: email.value,
        mobile: mobile.value,

        device_type: "android",
        device_token: mobile.value,
        device_id: mobile.value,
        login_by: "manual",
        country_code: "+91",
      },
    }).catch((err) => {
      errorResponse(err);
    });

    // router.push('/my-info')
    const router = useRouter();
    router.push({ path: "/" });
  } catch (err) {
    //errors.value = Object.values(err.data.errors).flat()
    errors.value = Object.entries(err.data.errors).map(([name, value]) => ({
      name,
      value,
    })); //Object.values(err.data.errors)
  }

  sto.hide();
}

//  Limit upload size pictures
function onOversize(file) {
  alert(" The file size cannot exceed  10M");
}
//  Verify the image before uploading
function beforeRead(file) {
  if (file.name) {
    return true;
  } else {
    alert(" Please upload the picture format ");
  }
}
//  Upload your avatar    After the file is uploaded, it will trigger  after-read  Callback function , Get the corresponding  file  object .
async function afterCard(file) {
  const formData = new FormData();
  formData.append("avatar", file.file);
  formData.append("first_name", name.value);
  formData.append("last_name", name.value);

  //  Request the interface to upload pictures to the server
  await useFetchAuth("/api/user/update/profile", {
    method: "POST",
    body: formData,
  })
    .then((result) => {
      useUser().setUser();
    })
    .catch((err) => {
      errorResponse(err);
    });
}

async function delAcc() {
  let person = prompt($__("Are you sure you want to delete the account, enter the short reason for deletion (on performing this action all your personal data will be deleted and can't be recovered)"));
  if (person != "") {
    useUser().delAccount(person)
  }else{
    alert($__("enter reason"))
  }
}
</script>
