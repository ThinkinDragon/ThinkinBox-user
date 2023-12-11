<template>
  <div>
    <NuxtLayout name="dashboard">

		<div class=" p-3 space-y-4 z-0">
			<h4 class="font-semibold mt-2">Category</h4>
			<div class="flex items-center justify-between overflow-y-scroll text-gray-500 cursor-pointer space-x-3">
				<div
					class="flex flex-col items-center justify-center w-20  h-20  bg-green-200 rounded-2xl text-green-600 shadow hover:shadow-md cursor-pointer mb-2 p-1 bg-white transition ease-in duration-300">
					<i class="far fa-hotel"></i>
					<p class="text-sm mt-1">Hotel</p>
				</div>
				<div
					class="flex flex-col items-center justify-center w-20  h-20  bg-yellow-200 rounded-2xl text-yellow-600  shadow hover:shadow-md cursor-pointer mb-2 p-1 bg-white transition ease-in duration-300">
					<i class="far fa-bus"></i>
					<p class="text-sm mt-1">Bus</p>
				</div>

				<div
					class="flex flex-col items-center justify-center w-20  h-20  bg-indigo-200  rounded-2xl  text-indigo-500 shadow hover:shadow-md cursor-pointer mb-2 p-1 bg-white transition ease-in duration-300">
					<i class="far fa-mountains"></i>
					<p class="text-sm mt-1">Hills</p>
				</div>
				<div
					class="flex flex-col items-center justify-center w-20  h-20  bg-pink-200   rounded-2xl text-pink-500 shadow hover:shadow-md cursor-pointer mb-2 p-1 bg-white transition ease-in duration-300">
					<i class="far fa-umbrella-beach"></i>
					<p class="text-sm mt-1">Beach</p>
				</div>
			</div>
			<h4 class="font-semibold">Recomented Hotels</h4>
			<div class="grid m-0  grid-cols-2  space-x-4 overflow-y-scroll flex justify-center items-center w-full ">
				<div class="relative flex flex-col justify-between   bg-white shadow-md rounded-3xl  bg-cover text-gray-800  overflow-hidden cursor-pointer w-full object-cover object-center rounded-lg shadow-md h-64 my-2"
					style="background-image:url('https://images.unsplash.com/reserve/8T8J12VQxyqCiQFGa2ct_bahamas-atlantis.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80')">
					<div class="absolute bg-gradient-to-t from-green-400 to-blue-400  opacity-50 inset-0 z-0"></div>
					<div class="relative flex flex-row items-end  h-72 w-full ">
						<div class="absolute right-0 top-0 m-2">
							<svg xmlns="http://www.w3.org/2000/svg"
								class="h-9 w-9 p-2 text-gray-200 hover:text-blue-400 rounded-full hover:bg-white transition ease-in duration-200 "
								fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
							</svg>
						</div>
						<div class="p-6 rounded-lg  flex flex-col w-full z-10 ">
							<h4 class="mt-1 text-white text-xl font-semibold  leading-tight truncate">Loremipsum..
							</h4>
							<div class="flex justify-between items-center ">
								<div class="flex flex-col">
									<h2 class="text-sm flex items-center text-gray-300 font-normal">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
											viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
												d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
											</path>
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
												d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
										</svg>
										Dubai
									</h2>
								</div>
							</div>
							<div class="flex pt-4  text-sm text-gray-300">
								<div class="flex items-center mr-auto">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500 mr-1"
										viewBox="0 0 20 20" fill="currentColor">
										<path
											d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
										</path>
									</svg>
									<p class="font-normal">4.5</p>
								</div>
								<div class="flex items-center font-medium text-white ">
									$1800
									<span class="text-gray-300 text-sm font-normal"> /wk</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="relative flex flex-col justify-between   bg-white shadow-md  rounded-3xl  bg-cover text-gray-800  overflow-hidden cursor-pointer w-full object-cover object-center rounded-lg shadow-md h-64 my-2"
					style="background-image:url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80')">
					<div class="absolute bg-gradient-to-t from-blue-500 to-yellow-400  opacity-50 inset-0 z-0"></div>
					<div class="relative flex flex-row items-end  h-72 w-full ">
						<div class="absolute right-0 top-0 m-2">
							<svg xmlns="http://www.w3.org/2000/svg"
								class="h-9 w-9 p-2 text-gray-200 hover:text-blue-400 rounded-full hover:bg-white transition ease-in duration-200 "
								fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
							</svg>
						</div>
						<div class="p-5 rounded-lg  flex flex-col w-full z-10 ">
							<h4 class="mt-1 text-white text-xl font-semibold  leading-tight truncate">Loremipsum..
							</h4>
							<div class="flex justify-between items-center ">
								<div class="flex flex-col">
									<h2 class="text-sm flex items-center text-gray-300 font-normal">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
											viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
												d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
											</path>
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
												d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
										</svg>
										India
									</h2>
								</div>
							</div>
							<div class="flex pt-4  text-sm text-gray-300">
								<div class="flex items-center mr-auto">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500 mr-1"
										viewBox="0 0 20 20" fill="currentColor">
										<path
											d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
										</path>
									</svg>
									<p class="font-normal">4.5</p>
								</div>
								<div class="flex items-center font-medium text-white ">
									$1800
									<span class="text-gray-300 text-sm font-normal"> /wk</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<h4 class="font-semibold">Suggested By</h4>
			<div class="grid grid-cols-1">
				<div class="">
					<div class="flex  bg-white shadow-md  rounded-2xl p-2">
						<img src="https://images.unsplash.com/photo-1439130490301-25e322d88054?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80"
                                alt="Just a flower" class=" w-16  object-cover  h-16 rounded-xl">
						<div class="flex flex-col justify-center w-full px-2 py-1">
							<div class="flex justify-between items-center ">
								<div class="flex flex-col">
									<h2 class="text-sm font-medium">Massive Dynamic</h2>
								</div>
								<svg xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5 text-gray-500 hover:text-blue-400 cursor-pointer" fill="none"
									viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
								</svg>
							</div>
							<div class="flex pt-2  text-sm text-gray-400">
								<div class="flex items-center mr-auto">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500 mr-1"
										viewBox="0 0 20 20" fill="currentColor">
										<path
											d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
										</path>
									</svg>
									<p class="font-normal">4.5</p>
								</div>
								<div class="flex items-center font-medium text-gray-900 ">
									$1800
									<span class="text-gray-400 text-sm font-normal"> /wk</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
      <div v-show="user == null" class="overlay">

      </div>
      <template #full>
        <div class="realtive sticky top-0  h-36 w-full rounded-b-3xl bg-center cursor-pointer object-cover z-10 shadow-lg"
        style="background-image:url('https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80')">
        <nav class="p-2 flex flex-grow relative justify-between z-10 items-center mx-auto h-18">
          <div class="inline relative">
            <button @click="openNav()" type="button" class="inline-flex items-center relative text-gray-300 hover:text-white mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                                  stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M4 6h16M4 12h8m-8 6h16"></path>
                              </svg>
                          </button>
          </div>
          <div class="inline-flex">
            <a href="/">
              <div class="hidden">
                <svg width="102" height="32" fill="currentcolor" style="display: block">
                  <path
                    d="M29.24 22.68c-.16-.39-.31-.8-.47-1.15l-.74-1.67-.03-.03c-2.2-4.8-4.55-9.68-7.04-14.48l-.1-.2c-.25-.47-.5-.99-.76-1.47-.32-.57-.63-1.18-1.14-1.76a5.3 5.3 0 00-8.2 0c-.47.58-.82 1.19-1.14 1.76-.25.52-.5 1.03-.76 1.5l-.1.2c-2.45 4.8-4.84 9.68-7.04 14.48l-.06.06c-.22.52-.48 1.06-.73 1.64-.16.35-.32.73-.48 1.15a6.8 6.8 0 007.2 9.23 8.38 8.38 0 003.18-1.1c1.3-.73 2.55-1.79 3.95-3.32 1.4 1.53 2.68 2.59 3.95 3.33A8.38 8.38 0 0022.75 32a6.79 6.79 0 006.75-5.83 5.94 5.94 0 00-.26-3.5zm-14.36 1.66c-1.72-2.2-2.84-4.22-3.22-5.95a5.2 5.2 0 01-.1-1.96c.07-.51.26-.96.52-1.34.6-.87 1.65-1.41 2.8-1.41a3.3 3.3 0 012.8 1.4c.26.4.45.84.51 1.35.1.58.06 1.25-.1 1.96-.38 1.7-1.5 3.74-3.21 5.95zm12.74 1.48a4.76 4.76 0 01-2.9 3.75c-.76.32-1.6.41-2.42.32-.8-.1-1.6-.36-2.42-.84a15.64 15.64 0 01-3.63-3.1c2.1-2.6 3.37-4.97 3.85-7.08.23-1 .26-1.9.16-2.73a5.53 5.53 0 00-.86-2.2 5.36 5.36 0 00-4.49-2.28c-1.85 0-3.5.86-4.5 2.27a5.18 5.18 0 00-.85 2.21c-.13.84-.1 1.77.16 2.73.48 2.11 1.78 4.51 3.85 7.1a14.33 14.33 0 01-3.63 3.12c-.83.48-1.62.73-2.42.83a4.76 4.76 0 01-5.32-4.07c-.1-.8-.03-1.6.29-2.5.1-.32.25-.64.41-1.02.22-.52.48-1.06.73-1.6l.04-.07c2.16-4.77 4.52-9.64 6.97-14.41l.1-.2c.25-.48.5-.99.76-1.47.26-.51.54-1 .9-1.4a3.32 3.32 0 015.09 0c.35.4.64.89.9 1.4.25.48.5 1 .76 1.47l.1.2c2.44 4.77 4.8 9.64 7 14.41l.03.03c.26.52.48 1.1.73 1.6.16.39.32.7.42 1.03.19.9.29 1.7.19 2.5zM41.54 24.12a5.02 5.02 0 01-3.95-1.83 6.55 6.55 0 01-1.6-4.48 6.96 6.96 0 011.66-4.58 5.3 5.3 0 014.08-1.86 4.3 4.3 0 013.7 1.92l.1-1.57h2.92V23.8h-2.93l-.1-1.76a4.52 4.52 0 01-3.88 2.08zm.76-2.88c.58 0 1.09-.16 1.57-.45.44-.32.8-.74 1.08-1.25.25-.51.38-1.12.38-1.8a3.42 3.42 0 00-1.47-3.04 2.95 2.95 0 00-3.12 0c-.44.32-.8.74-1.08 1.25a4.01 4.01 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.98.45 1.55.45zM53.45 8.46c0 .35-.06.67-.22.93-.16.25-.38.48-.67.64-.29.16-.6.22-.92.22-.32 0-.64-.06-.93-.22a1.84 1.84 0 01-.67-.64 1.82 1.82 0 01-.22-.93c0-.36.07-.68.22-.93.16-.3.39-.48.67-.64.29-.16.6-.23.93-.23a1.84 1.84 0 011.6.86 2 2 0 01.21.94zm-3.4 15.3V11.7h3.18v12.08h-3.19zm11.68-8.9v.04c-.15-.07-.35-.1-.5-.13-.2-.04-.36-.04-.55-.04-.89 0-1.56.26-2 .8-.48.55-.7 1.32-.7 2.31v5.93h-3.19V11.69h2.93l.1 1.83c.32-.64.7-1.12 1.24-1.48a3.1 3.1 0 011.81-.5c.23 0 .45.02.64.06.1.03.16.03.22.06v3.2zm1.28 8.9V6.74h3.18v6.5c.45-.58.96-1.03 1.6-1.38a5.02 5.02 0 016.08 1.31 6.55 6.55 0 011.6 4.49 6.96 6.96 0 01-1.66 4.58 5.3 5.3 0 01-4.08 1.86 4.3 4.3 0 01-3.7-1.92l-.1 1.57-2.92.03zm6.15-2.52c.57 0 1.08-.16 1.56-.45.44-.32.8-.74 1.08-1.25.26-.51.38-1.12.38-1.8 0-.67-.12-1.28-.38-1.79a3.75 3.75 0 00-1.08-1.25 2.95 2.95 0 00-3.12 0c-.45.32-.8.74-1.09 1.25a4.01 4.01 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.98.45 1.56.45zm7.51 2.53V11.69h2.93l.1 1.57a3.96 3.96 0 013.54-1.89 4.1 4.1 0 013.82 2.44c.35.76.54 1.7.54 2.75v7.24h-3.19v-6.82c0-.84-.19-1.5-.57-1.99-.38-.48-.9-.74-1.56-.74-.48 0-.9.1-1.27.32-.35.23-.64.52-.86.93a2.7 2.7 0 00-.32 1.35v6.92h-3.16zm12.52 0V6.73h3.19v6.5a4.67 4.67 0 013.73-1.89 5.02 5.02 0 013.95 1.83 6.57 6.57 0 011.59 4.48 6.95 6.95 0 01-1.66 4.58 5.3 5.3 0 01-4.08 1.86 4.3 4.3 0 01-3.7-1.92l-.09 1.57-2.93.03zm6.18-2.53c.58 0 1.09-.16 1.56-.45.45-.32.8-.74 1.09-1.25.25-.51.38-1.12.38-1.8a3.42 3.42 0 00-1.47-3.04 2.95 2.95 0 00-3.12 0c-.44.32-.8.74-1.08 1.25a3.63 3.63 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.95.45 1.55.45z">
                  </path>
                </svg>
              </div>
            </a>
          </div>
          <div class="flex-initial">
            <div class="flex justify-end items-center relative">
              <div class="inline relative">
                <div class="block flex-grow-0 flex-shrink-0">
                  <img class="rounded-xl w-8 h-8 border border-yellow-300 shadow"
                                          src="https://media-exp1.licdn.com/dms/image/C5603AQGEQ6ydraNeww/profile-displayphoto-shrink_200_200/0/1623517758261?e=1629331200&v=beta&t=mhUiw4p21E9okkvInvM0ry8lmLsT6s5ppWMKo6kFs2M">
                                  </div>
                </div>
              </div>
            </div>
        </nav>
        <div class="px-3 rounded-lg  flex flex-col w-full">
          <h4 class="text-white text-xl font-semibold  leading-tight truncate">Loremipsum Title
          </h4>
          <div class="flex justify-between items-center ">
            <div class="flex flex-col">
              <h2 class="text-sm flex items-center text-gray-100 font-normal">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                  </path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Massive Dynamic
              </h2>
            </div>
          </div>
        </div>
  
        <div class="flex items-center justify-between mt-3 px-3 z-10">
          <div class="relative w-full">
            <input type="text" class="bg-purple-white shadow rounded-xl border-0 p-3 w-full"
                              placeholder="Search somthing...">
            <div class="absolute top-0 right-0 p-4 pr-3 text-purple-lighter">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
        <div class="mobile-navbar-header block">
          <div class="container mx-auto px-5 lg:px-0 flex items-center justify-between py-2">
            <button @click="openNav()"
              class="text-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 p-2 rounded-lg shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-current" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span class="select-none font-black text-gray-800 text-2xl cursor-pointer">{{ $config.APP_NAME }}</span>
            <button @click="recenter()"
              class="text-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 p-2 rounded-lg">
              <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 block md:hidden">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
              </svg> -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>

            </button>
          </div>
        </div>
      </template>
      <ClientOnly>
        <div class="flex flex-row space-x-2 items-center shadow-xl justify-around p-2 bg-gray-100 dark:bg-gray-800 border rounded-lg">
          <div class="flex w-10 flex-col space-y-2 items-center justify-center">
            <div class="flex w-4 h-4 bg-primary rounded-full" />
            <div class="transform -rotate-90 w-8 h-1 bg-white dark:bg-gray-900 rounded-full" />
            <svg class="w-full h-6 rounded-full" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M6.07107 15.8952C6.68708 15.8952 9.62049 12.2114 10.3438 11.0379C11.4557 9.23407 12.1421 8.16692 12.1421 6.17557C12.1421 2.8226 9.42404 0.104492 6.07107 0.104492C2.71811 0.104492 0 2.8226 0 6.17557C0 8.17728 0.63608 9.23732 1.74425 11.0379C2.51662 12.2929 5.45507 15.8952 6.07107 15.8952Z"
                fill="#F52D56" />
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M6.07118 8.90408C7.74766 8.90408 9.10672 7.54503 9.10672 5.86854C9.10672 4.19206 7.74766 2.83301 6.07118 2.83301C4.3947 2.83301 3.03564 4.19206 3.03564 5.86854C3.03564 7.54503 4.3947 8.90408 6.07118 8.90408Z"
                fill="white" />
            </svg>
          </div>
          <div class="flex flex-col w-full justify-end ">
            <ClientOnly>
              <nuxt-link :to="`/single-address?for=none&input=pick&goto=/services/items`">
                <FormSingleAddressForm label="address" :street="form.s_map_address" v-model:street="form.s_building"
                  v-model:latitude="form.s_latitude" v-model:longitude="form.s_longitude"
                  v-model:map_address="form.s_map_address" />
              </nuxt-link>
              <div class="w-full h-0.5 border-1 border-gray-300 bg-gray-300 "></div>

              <nuxt-link :to="`/single-address?for=none&input=drop&goto=/services/items&newAdd=true`">
                <FormSingleAddressForm label="address" :street="form.d_map_address" v-model:street="form.d_building"
                  v-model:latitude="form.d_latitude" v-model:longitude="form.d_longitude"
                  v-model:map_address="form.d_map_address" />
              </nuxt-link>
            </ClientOnly>
          </div>
        </div>
        <LoadingData :data="tags">
          <div class="grid grid-cols-2 gap-2">
            <NuxtLink v-for="category in tags" :key="category?.id"
              :to="`/single-address?for=${category?.for}&input=drop&goto=/services/items&newAdd=true`">
              <div class="inline-flex text-black flex-col w-full max-w-1/3 space-y-0.5 items-center justify-evenly">
                <svg v-if="!category?.image" class="w-16 h-16" viewBox="0 0 105 116" fill="none"
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <rect width="105" height="116" rx="10" fill="url(#pattern0)" />
                  <defs>
                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlink:href="#image0_86_8452" transform="translate(-0.052381) scale(0.0172619 0.015625)" />
                    </pattern>
                    <image id="image0_86_8452" width="64" height="64"
                      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAONJREFUeF7t20EOhEAIRFG4/6F7DvEnYeFzryQIv6pBd2behOu9dPvsbog+k+NLgArQAqmJcw9iAAhSgZKB3IJkkAySQTJ4CiE+gA8oBeg0mH3Ai084P89HhqwEqIA209ICsQdjAeaZIgaAYKxBDMCAYy8fXwAIgiAIcoJpJEYGI4VjB3YrbC9gL2AvkCB43cM5PgZgAAZgQFnNZAhdGykQBEEQBEEQDBmgAm2glM/z+QUYisYUGoldO7kY32IEAzCg6RgIRgjFAsw+AgRBMNYgBmCAT2TCYfoPPz/HCqQCX1eBHzHnv7C7WhBSAAAAAElFTkSuQmCC" />
                  </defs>
                </svg>
                <img v-else :src="config.public.BASE_IMAGE_URL + category?.image" alt="" srcset=""
                  class="w-14 h-12 rounded-xl" />
                <p class="text-xs dark:text-white font-medium">{{ $_api_(category?.name) }}</p>
              </div>
            </NuxtLink>
          </div>
        </LoadingData>
      </ClientOnly>
    </NuxtLayout>
    <ClientOnly>
      <teleport to='body'>
        <MainMobileSidebar style="
      pointer-events: auto;" />
      </teleport>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import type { SwipeInstance } from "vant";
import { useGoogleGeocode } from "~/composables/googleGeocode";
import { watchThrottled } from '@vueuse/core'

definePageMeta({
  key: (route) => route.fullPath,
  layout: false,
  middleware: ['auth']
});
const title = useState("title");

const route = useRoute()
const router = useRouter()

const { useService, getBanner } = useHome();
const { useUser } = useAuth();
const config = useRuntimeConfig();
  const { isApp } = useWhatPlatform();
const sto = useLoading()
const { loading, silentLoading } = storeToRefs(sto)

const swipeRef2 = ref<SwipeInstance>();
// declare store variable
const store = useService();
const store2 = useUser();
const { banners, tags, tag, services, estimate } = storeToRefs(store);
const { show, stage, user } = storeToRefs(store2);
const { useBookings } = useBooking();
const book = useBookings();
const { provider, booking } = storeToRefs(book);

const coordinates = ref();
const form = useAddress();
const { s_map_address, s_latitude, s_longitude } = storeToRefs(form);
const { currPos, d_map_address, d_latitude, d_longitude } = storeToRefs(useAddress());
const { addresses } = storeToRefs(useDeliveryAddresses());
const { platform } = useFirebase();
const notif = useLocalNotification();
let geocoder;

const isNavActive = useIsNavActive()
const isNavDeactive = useIsNavDeactive()
const isOpen = useSheetToggle()

const map = inject('map')
const options = inject('mapOptions')
const { clearMap, reloadMap } = useMapFunction(map.value);

onMounted(async () => {
  title.value = "Welcome"
  if (isApp) await map.value.enableCurrentLocation(true);

  stage.value = 0;
  recenter();
  closeNav();

  //tag.value = null
  d_map_address.value = ""
  d_latitude.value = 0
  d_longitude.value = 0
  addresses.value = []
  estimate.value = null
  await clearMap();
  // if (tags.value != null) {
  //     tag.value = tags.value[0]
  //   }
  //console.log(options.value);
  //map.value = await reloadMap(options.value);

  store.getProvidersData();
  await useUser().setUser();

  locationWatcher();
});

const locationWatcher = watchThrottled(s_map_address, () => {

  if (s_map_address.value == "") {
    onRefresh()
  }
  // if (booking.value == null) {
  //   clearMap();
  // }

}, { throttle: 1000 })

async function getLive() {

  if (currPos.value?.lat == undefined) return;
  try {
    geocoder = useGoogleGeocode();
    s_latitude.value = currPos.value.lat;
    s_longitude.value = currPos.value.lng;
    var c = { lat: currPos.value.lat, lng: currPos.value.lng };
    await geocoder
      .geocode(currPos.value.lat, currPos.value.lng)
      .then((response) => {

        if (response.results[0]) {
          s_map_address.value = response.results[0].formatted_address;
        } else {
          //window.alert("No results found");
        }

        sto.shide()
      })

  } catch (error) {
    console.log(error);
  }



}
async function onRefresh() {
  if (store2.isLoggedIn) {
    await store2.setUser();
    await useUser().getPromocode();
  }
}

async function openNav() {
  if (isNavActive.value) return;
  isNavActive.value = true
  isOpen.value = false
  //isNavDeactive.value = false
}
async function closeNav() {
  if (!isNavActive.value) return;
  isOpen.value = true;
  isNavActive.value = false
  //bodyTag.classList.remove('active-navbar-body')
}

async function setServiceAddress(post: any) {
  tag.value = post

  return router.push(`/services/items?for=${post?.for}&input=drop`);
}

async function recenter() {
  await map.value?.setCamera({
    coordinate: currPos.value,
    duration: 5000,
    zoom: 16
  });
  await getLive();
}
</script>

<style>
.overlay {
  height: 100svh;
  width: 100svh;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgb(255, 255, 255);
  background-color: rgb(255, 255, 255);
  overflow-x: hidden;
  transition: 0.5s;
}</style>