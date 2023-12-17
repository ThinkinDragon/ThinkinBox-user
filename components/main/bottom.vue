<template>
  <div class="fixed bottom-0 z-10 items-center block w-full h-fit md:bg-white md:sticky sm:w-auto sm:px-8">
    <div class="flex flex-row items-center bg-gray-50 dark:bg-gray-900 py-4 text-gray-800 justify-evenly sm:justify-between">
    <NuxtLink to="/" class="flex flex-col items-center ">
	  <Icon name="material-symbols:home" :class="$route.name ==='index'?'text-black':'text-gray-500'" class="w-7 h-7" />
    </NuxtLink>
    <NuxtLink to="/booking" class="flex flex-col items-center ">
		<Icon name="material-symbols:docs-outline" :class="$route.name ==='booking'?'text-black':'text-gray-500'" class="w-7 h-7" />


    </NuxtLink>
    <NuxtLink to="/notification" class="relative flex flex-col items-center ">
				<Icon name="ic:outline-notifications" :class="$route.name ==='notification'?'text-black':'text-gray-500'" class="w-7 h-7" />

				<svg class="absolute inset-0 object-right-top w-3 h-3 " viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="6" cy="6.12695" r="5" fill="#333333" stroke="white" stroke-width="2"/>
				</svg>
    </NuxtLink>
    <NuxtLink to="/menu" class="flex flex-col items-center ">
		<Icon name="material-symbols:list-rounded" :class="$route.name ==='menu'?'text-black':'text-gray-500'" class="w-7 h-7" />
    </NuxtLink>
	</div>
  </div>
</template>

<script setup lang="ts">
const { removeUser, isLoggedIn, getUser ,logout } = useAuth()
const { errorResponse } = useBase()
// !isLoggedIn ? '/login': '
</script>