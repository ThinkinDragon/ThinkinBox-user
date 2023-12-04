import { defineCustomElements } from '@stripe-elements/stripe-elements/loader';

export default defineNuxtPlugin((nuxtApp) => {
  // when page redirect on mobile device, close drawer navbar
  nuxtApp.hook('generate:page', () => {
    defineCustomElements();
  })
})
