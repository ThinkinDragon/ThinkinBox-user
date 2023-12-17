<template>
  <div>
    <NuxtLayout name="single">
      <template #nav>
        <button @click="logout" class="inline-flex space-x-3.5 items-center justify-center h-8 p-2 bg-gray-200 rounded-lg">
          <svg class="w-6 h-6 rounded-lg" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.0999 3.59961C3.78164 3.59961 3.47642 3.72604 3.25137 3.95108C3.02633 4.17612 2.8999 4.48135 2.8999 4.79961V19.1996C2.8999 19.5179 3.02633 19.8231 3.25137 20.0481C3.47642 20.2732 3.78164 20.3996 4.0999 20.3996C4.41816 20.3996 4.72339 20.2732 4.94843 20.0481C5.17347 19.8231 5.2999 19.5179 5.2999 19.1996V4.79961C5.2999 4.48135 5.17347 4.17612 4.94843 3.95108C4.72339 3.72604 4.41816 3.59961 4.0999 3.59961ZM16.4515 14.7512C16.2329 14.9775 16.112 15.2807 16.1147 15.5953C16.1174 15.9099 16.2436 16.2109 16.4661 16.4334C16.6886 16.6559 16.9896 16.7821 17.3042 16.7848C17.6189 16.7876 17.922 16.6666 18.1483 16.448L21.7483 12.848C21.9733 12.623 22.0996 12.3178 22.0996 11.9996C22.0996 11.6814 21.9733 11.3762 21.7483 11.1512L18.1483 7.55121C18.0376 7.4366 17.9052 7.34518 17.7588 7.28229C17.6124 7.2194 17.4549 7.18629 17.2956 7.18491C17.1362 7.18352 16.9782 7.21389 16.8308 7.27422C16.6833 7.33456 16.5493 7.42366 16.4366 7.53634C16.324 7.64901 16.2349 7.78299 16.1745 7.93046C16.1142 8.07794 16.0838 8.23596 16.0852 8.39529C16.0866 8.55463 16.1197 8.71209 16.1826 8.85849C16.2455 9.0049 16.3369 9.13731 16.4515 9.24801L18.0031 10.7996H8.8999C8.58164 10.7996 8.27642 10.926 8.05137 11.1511C7.82633 11.3761 7.6999 11.6813 7.6999 11.9996C7.6999 12.3179 7.82633 12.6231 8.05137 12.8481C8.27642 13.0732 8.58164 13.1996 8.8999 13.1996H18.0031L16.4515 14.7512Z" fill="black" />
          </svg>
          <p class="text-xs font-medium text-center text-gray-900 dark:text-gray-200">{{ $__("Logout") }}</p>
        </button>
      </template>
      <div class="flex items-center justify-between px-4">
        <div class="flex items-center w-24 h-24 rounded-full">
          <img class="flex items-center w-24 h-24 rounded-full" :src="user?.avatar != null ? config.public.BASE_IMAGE_URL + user?.avatar : avatarStatic" />
        </div>
        <div class="flex flex-col pl-4 leading-none">
          <p class="text-xl font-bold">{{ user?.first_name }}</p>
          <p class="w-full text-xs font-medium leading-none text-gray-500">{{ user?.email }}</p>
        </div>
        <NuxtLink to="/profile" class="w-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-700" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M9.243 19H21v2H3v-4.243l9.9-9.9 4.242 4.244L9.242 19zm5.07-13.556l2.122-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z" />
          </svg>
        </NuxtLink>
        <div @click="sharee">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </div>
      </div>
      <div class="flex flex-col w-full px-2 pt-2">
        <div class="grid grid-cols-2 gap-3">
          <NuxtLink to="/wallet" class="inline-flex h-24 min-w-fit flex-col items-center justify-center rounded-2xl bg-gradient-to-r from-red-300 to-red-500 p-2.5 shadow">
            <div class="flex h-16 flex-col items-center justify-end space-y-3.5">
              <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.89995 6.90039C6.05126 6.90039 5.23733 7.23753 4.63721 7.83765C4.03709 8.43777 3.69995 9.2517 3.69995 10.1004V11.7004H29.2999V10.1004C29.2999 9.2517 28.9628 8.43777 28.3627 7.83765C27.7626 7.23753 26.9486 6.90039 26.0999 6.90039H6.89995Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M29.2999 14.9004H3.69995V22.9004C3.69995 23.7491 4.03709 24.563 4.63721 25.1631C5.23733 25.7632 6.05126 26.1004 6.89995 26.1004H26.0999C26.9486 26.1004 27.7626 25.7632 28.3627 25.1631C28.9628 24.563 29.2999 23.7491 29.2999 22.9004V14.9004ZM6.89995 21.3004C6.89995 20.876 7.06852 20.4691 7.36858 20.169C7.66864 19.869 8.0756 19.7004 8.49995 19.7004H10.1C10.5243 19.7004 10.9313 19.869 11.2313 20.169C11.5314 20.4691 11.7 20.876 11.7 21.3004C11.7 21.7247 11.5314 22.1317 11.2313 22.4318C10.9313 22.7318 10.5243 22.9004 10.1 22.9004H8.49995C8.0756 22.9004 7.66864 22.7318 7.36858 22.4318C7.06852 22.1317 6.89995 21.7247 6.89995 21.3004ZM14.9 19.7004C14.4756 19.7004 14.0686 19.869 13.7686 20.169C13.4685 20.4691 13.3 20.876 13.3 21.3004C13.3 21.7247 13.4685 22.1317 13.7686 22.4318C14.0686 22.7318 14.4756 22.9004 14.9 22.9004H16.5C16.9243 22.9004 17.3313 22.7318 17.6313 22.4318C17.9314 22.1317 18.1 21.7247 18.1 21.3004C18.1 20.876 17.9314 20.4691 17.6313 20.169C17.3313 19.869 16.9243 19.7004 16.5 19.7004H14.9Z" fill="white" />
              </svg>
              <p class="text-xs font-medium text-center text-white dark:text-gray-900">{{ $__("Wallet") }}</p>
            </div>
          </NuxtLink>
          <NuxtLink to="/about" class="inline-flex h-24 min-w-fit flex-col items-center justify-center rounded-2xl bg-gradient-to-r from-blue-400 to-blue-500 p-2.5 shadow">
            <div class="flex h-16 flex-col items-center justify-end space-y-3.5">
              <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.90002 6.9002C6.90002 6.0515 7.23717 5.23757 7.83728 4.63745C8.4374 4.03734 9.25133 3.7002 10.1 3.7002H17.4376C18.2862 3.70038 19.1 4.03764 19.7 4.6378L25.1624 10.1002C25.7626 10.7002 26.0998 11.514 26.1 12.3626V26.1002C26.1 26.9489 25.7629 27.7628 25.1628 28.3629C24.5626 28.9631 23.7487 29.3002 22.9 29.3002H10.1C9.25133 29.3002 8.4374 28.9631 7.83728 28.3629C7.23717 27.7628 6.90002 26.9489 6.90002 26.1002V6.9002ZM10.1 16.5002C10.1 16.0758 10.2686 15.6689 10.5687 15.3688C10.8687 15.0688 11.2757 14.9002 11.7 14.9002H21.3C21.7244 14.9002 22.1313 15.0688 22.4314 15.3688C22.7315 15.6689 22.9 16.0758 22.9 16.5002C22.9 16.9245 22.7315 17.3315 22.4314 17.6316C22.1313 17.9316 21.7244 18.1002 21.3 18.1002H11.7C11.2757 18.1002 10.8687 17.9316 10.5687 17.6316C10.2686 17.3315 10.1 16.9245 10.1 16.5002ZM11.7 21.3002C11.2757 21.3002 10.8687 21.4688 10.5687 21.7688C10.2686 22.0689 10.1 22.4758 10.1 22.9002C10.1 23.3245 10.2686 23.7315 10.5687 24.0316C10.8687 24.3316 11.2757 24.5002 11.7 24.5002H21.3C21.7244 24.5002 22.1313 24.3316 22.4314 24.0316C22.7315 23.7315 22.9 23.3245 22.9 22.9002C22.9 22.4758 22.7315 22.0689 22.4314 21.7688C22.1313 21.4688 21.7244 21.3002 21.3 21.3002H11.7Z" fill="white" />
              </svg>
  
              <p class="text-xs font-medium text-center text-white dark:text-gray-900">{{ $__("About Us") }}</p>
            </div>
          </NuxtLink>
          <NuxtLink to="/faq" class="inline-flex h-24 min-w-fit flex-col items-center justify-center rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-500 p-2.5 shadow">
            <div class="flex h-16 flex-col items-center justify-end space-y-3.5">
              <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M29.3 16.5002C29.3 19.895 27.9514 23.1507 25.5509 25.5512C23.1505 27.9516 19.8947 29.3002 16.5 29.3002C13.1052 29.3002 9.84945 27.9516 7.44898 25.5512C5.04852 23.1507 3.69995 19.895 3.69995 16.5002C3.69995 13.1054 5.04852 9.84969 7.44898 7.44923C9.84945 5.04876 13.1052 3.7002 16.5 3.7002C19.8947 3.7002 23.1505 5.04876 25.5509 7.44923C27.9514 9.84969 29.3 13.1054 29.3 16.5002V16.5002ZM16.5 11.7002C16.2188 11.6999 15.9426 11.7737 15.6991 11.9142C15.4555 12.0546 15.2533 12.2567 15.1128 12.5002C15.0113 12.6888 14.8729 12.8551 14.706 12.9893C14.539 13.1234 14.3468 13.2227 14.1408 13.2812C13.9347 13.3396 13.7191 13.3562 13.5065 13.3298C13.294 13.3034 13.0889 13.2346 12.9034 13.1274C12.718 13.0203 12.5559 12.877 12.4269 12.7061C12.2978 12.5351 12.2044 12.34 12.1522 12.1323C12.0999 11.9246 12.0899 11.7085 12.1227 11.4969C12.1555 11.2852 12.2305 11.0823 12.3432 10.9002C12.8715 9.98518 13.687 9.27005 14.6632 8.86573C15.6394 8.46142 16.7217 8.39049 17.7423 8.66397C18.7629 8.93744 19.6648 9.54003 20.308 10.3783C20.9512 11.2165 21.2999 12.2436 21.3 13.3002C21.3002 14.2932 20.9927 15.2618 20.4196 16.0728C19.8465 16.8837 19.0361 17.497 18.1 17.8282V18.1002C18.1 18.5245 17.9314 18.9315 17.6313 19.2316C17.3313 19.5316 16.9243 19.7002 16.5 19.7002C16.0756 19.7002 15.6686 19.5316 15.3686 19.2316C15.0685 18.9315 14.9 18.5245 14.9 18.1002V16.5002C14.9 16.0758 15.0685 15.6689 15.3686 15.3688C15.6686 15.0688 16.0756 14.9002 16.5 14.9002C16.9243 14.9002 17.3313 14.7316 17.6313 14.4316C17.9314 14.1315 18.1 13.7245 18.1 13.3002C18.1 12.8758 17.9314 12.4689 17.6313 12.1688C17.3313 11.8688 16.9243 11.7002 16.5 11.7002ZM16.5 24.5002C16.9243 24.5002 17.3313 24.3316 17.6313 24.0316C17.9314 23.7315 18.1 23.3245 18.1 22.9002C18.1 22.4758 17.9314 22.0689 17.6313 21.7688C17.3313 21.4688 16.9243 21.3002 16.5 21.3002C16.0756 21.3002 15.6686 21.4688 15.3686 21.7688C15.0685 22.0689 14.9 22.4758 14.9 22.9002C14.9 23.3245 15.0685 23.7315 15.3686 24.0316C15.6686 24.3316 16.0756 24.5002 16.5 24.5002V24.5002Z" fill="white" />
              </svg>
              <p class="text-xs font-medium text-center text-white dark:text-gray-900">{{ $__("FAQ's") }}</p>
            </div>
          </NuxtLink>
          <NuxtLink to="/language" class="inline-flex h-24 min-w-fit flex-col items-center justify-center rounded-2xl bg-gradient-to-r from-zinc-300 to-zinc-500 p-2.5 shadow">
            <div class="flex h-16 flex-col items-center justify-end space-y-3.5">
              <svg class="w-6 h-6 text-white dark:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
              <p class="text-xs font-medium text-center text-white dark:text-gray-900">{{ $__("Language") }}</p>
            </div>
          </NuxtLink>
          <NuxtLink to="/contact" class="inline-flex h-24 min-w-fit flex-col items-center justify-center rounded-2xl bg-gradient-to-r from-green-300 to-green-500 p-2.5 shadow">
            <div class="flex h-16 flex-col items-center justify-end space-y-3.5">
              <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.9 10.0998C14.9 11.3728 14.3943 12.5937 13.4941 13.4939C12.5939 14.3941 11.373 14.8998 10.1 14.8998C8.82694 14.8998 7.60604 14.3941 6.70586 13.4939C5.80569 12.5937 5.29998 11.3728 5.29998 10.0998C5.29998 8.82677 5.80569 7.60587 6.70586 6.70569C7.60604 5.80552 8.82694 5.2998 10.1 5.2998C11.373 5.2998 12.5939 5.80552 13.4941 6.70569C14.3943 7.60587 14.9 8.82677 14.9 10.0998V10.0998ZM27.7 10.0998C27.7 10.7301 27.5758 11.3543 27.3346 11.9367C27.0934 12.519 26.7398 13.0482 26.2941 13.4939C25.8484 13.9396 25.3192 14.2932 24.7369 14.5344C24.1545 14.7756 23.5303 14.8998 22.9 14.8998C22.2696 14.8998 21.6455 14.7756 21.0631 14.5344C20.4807 14.2932 19.9516 13.9396 19.5059 13.4939C19.0601 13.0482 18.7066 12.519 18.4654 11.9367C18.2241 11.3543 18.1 10.7301 18.1 10.0998C18.1 8.82677 18.6057 7.60587 19.5059 6.70569C20.406 5.80552 21.6269 5.2998 22.9 5.2998C24.173 5.2998 25.3939 5.80552 26.2941 6.70569C27.1943 7.60587 27.7 8.82677 27.7 10.0998V10.0998ZM21.188 27.6998C21.2616 27.1766 21.3 26.6438 21.3 26.0998C21.3037 23.586 20.4579 21.1446 18.9 19.1718C20.1161 18.4697 21.4956 18.1 22.8999 18.1C24.3042 18.1 25.6837 18.4696 26.8999 19.1718C28.116 19.8739 29.1259 20.8838 29.8281 22.0999C30.5303 23.316 30.8999 24.6955 30.9 26.0998V27.6998H21.188ZM10.1 18.0998C12.2217 18.0998 14.2565 18.9427 15.7568 20.443C17.2571 21.9432 18.1 23.9781 18.1 26.0998V27.6998H2.09998V26.0998C2.09998 23.9781 2.94283 21.9432 4.44312 20.443C5.94341 18.9427 7.97824 18.0998 10.1 18.0998V18.0998Z" fill="white" />
              </svg>
              <p class="text-xs font-medium text-center text-white dark:text-gray-900">{{ $__("Help / Support") }}</p>
            </div>
          </NuxtLink>
          <NuxtLink to="/referral" class="inline-flex h-24 min-w-fit flex-col items-center justify-center rounded-2xl bg-gradient-to-r from-primary to-primary p-2.5 shadow">
            <div class="flex h-16 flex-col items-center justify-end space-y-3.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white dark:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <p class="text-xs font-medium text-center text-white dark:text-gray-900">{{ $__("Referral") }}</p>
            </div>
          </NuxtLink>
          <NuxtLink to="/term" class="inline-flex h-24 min-w-fit flex-col items-center justify-center rounded-2xl bg-gradient-to-r from-sky-300 to-sky-500 p-2.5 shadow">
            <div class="flex h-16 flex-col items-center justify-end space-y-3.5">
              <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.9 3.7002C14.0513 3.7002 13.2373 4.03734 12.6372 4.63745C12.0371 5.23757 11.7 6.0515 11.7 6.9002V19.7002C11.7 20.5489 12.0371 21.3628 12.6372 21.9629C13.2373 22.5631 14.0513 22.9002 14.9 22.9002H24.5C25.3486 22.9002 26.1626 22.5631 26.7627 21.9629C27.3628 21.3628 27.7 20.5489 27.7 19.7002V10.7626C27.6998 9.91397 27.3625 9.10017 26.7624 8.5002L22.9 4.6378C22.3 4.03764 21.4862 3.70038 20.6376 3.7002H14.9Z" fill="white" />
                <path d="M5.30005 13.2996C5.30005 12.4509 5.63719 11.637 6.23731 11.0369C6.83742 10.4368 7.65136 10.0996 8.50005 10.0996V26.0996H21.3C21.3 26.9483 20.9629 27.7622 20.3628 28.3624C19.7627 28.9625 18.9487 29.2996 18.1 29.2996H8.50005C7.65136 29.2996 6.83742 28.9625 6.23731 28.3624C5.63719 27.7622 5.30005 26.9483 5.30005 26.0996V13.2996Z" fill="white" />
              </svg>
              <p class="text-xs font-medium text-center text-white dark:text-gray-900">{{ $__("Terms & Conditions") }}</p>
            </div>
          </NuxtLink>
          <NuxtLink to="/privacy" class="inline-flex h-24 min-w-fit flex-col items-center justify-center rounded-2xl bg-gradient-to-r from-orange-300 to-orange-500 p-2.5 shadow">
            <div class="flex h-16 flex-col items-center justify-end space-y-3.5">
              <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3 5.3002C13.3 4.87585 13.4686 4.46888 13.7687 4.16882C14.0687 3.86877 14.4757 3.7002 14.9 3.7002H18.1C18.5244 3.7002 18.9314 3.86877 19.2314 4.16882C19.5315 4.46888 19.7 4.87585 19.7 5.3002C19.7 5.72454 19.5315 6.13151 19.2314 6.43157C18.9314 6.73162 18.5244 6.9002 18.1 6.9002H14.9C14.4757 6.9002 14.0687 6.73162 13.7687 6.43157C13.4686 6.13151 13.3 5.72454 13.3 5.3002Z" fill="white" />
                <path d="M10.1 5.2998C9.25133 5.2998 8.4374 5.63695 7.83728 6.23706C7.23717 6.83718 6.90002 7.65111 6.90002 8.4998V26.0998C6.90002 26.9485 7.23717 27.7624 7.83728 28.3625C8.4374 28.9627 9.25133 29.2998 10.1 29.2998H22.9C23.7487 29.2998 24.5626 28.9627 25.1628 28.3625C25.7629 27.7624 26.1 26.9485 26.1 26.0998V8.4998C26.1 7.65111 25.7629 6.83718 25.1628 6.23706C24.5626 5.63695 23.7487 5.2998 22.9 5.2998C22.9 6.57284 22.3943 7.79374 21.4941 8.69392C20.594 9.59409 19.3731 10.0998 18.1 10.0998H14.9C13.627 10.0998 12.4061 9.59409 11.5059 8.69392C10.6057 7.79374 10.1 6.57284 10.1 5.2998V5.2998Z" fill="white" />
              </svg>
              <p class="text-xs font-medium text-center text-white dark:text-gray-900">{{ $__("Privacy Policy") }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import type { User } from "~/types/home";
import { Share } from "@capacitor/share";
import avatarStatic from '~/assets/image/avatar.png';

definePageMeta({
  
  layout: false,
  middleware: ["auth"],
});
const { $apiFetch,$__ } = useNuxtApp();
const { removeUser, logout } = useAuth();
const { user } = storeToRefs(useUser());
const { errorResponse } = useBase();
const title = useState("title");
const router = useRouter();
const config = useRuntimeConfig();

const store = useSetting();
const data = ref("");

onMounted(async () => {
  title.value = $__("My Profile");
  //await store.fetch();
});

async function sharee() {
  await Share.share({
    title: "I tried new shaeen app",
    text: "Really awesome service app you need to see right now",
    url: "https://linktr.ee/vigoapp",
    dialogTitle: "Share with buddies",
  });
}
</script>
