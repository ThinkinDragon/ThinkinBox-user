<template>
  <div @click.self.prevent="useKeyboards().hideKeyboard()" class="min-h-screen text-gray-900 disable-scrollbars safe-top">
    <Title>{{ title }}</Title>
    <!-- <MainNav /> -->
    <div class="container my-5 text-center">
      <div class="text-danger-700"><h1>ERROR</h1></div>
      <div v-if="error.statusCode === 500">
        <h2>Oh, oh, server error</h2>
        <p>This is a problem on our end. Contact customer service.</p>      
      </div>
      <div v-else-if="error.statusCode === 404">
        <h2>Oh, no page does not exist!</h2>
        <p>We don't have the page you're looking for.</p>      
      </div>
      <div v-else>
        <h1>We have an error!</h1>
        <p>Contact us to fix it.</p>
      </div>
      <button @click="handleError">Go to home page</button>
    </div>  
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>

<style>
html {
  -webkit-user-select: none;
  /* Safari */
  -ms-user-select: none;
  /* IE 10 and IE 11 */
  user-select: none;
  /* Standard syntax */
}

input {
  scroll-margin-top: 100px;
}

.router-link-active {
  font-weight: bold;
}

.main {
  background-image: url(https://images.unsplash.com/photo-1507608158173-1dcec673a2e5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80);
}

::-webkit-scrollbar {
  width: 0;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-thumb {
  background-color: transparent;
  outline: 1px solid transparent;
}

.vier-sheet-container {
  pointer-events: none !important;
}

.vier-sheet-container>.vier-sheet {
  pointer-events: auto !important;
}</style>
  