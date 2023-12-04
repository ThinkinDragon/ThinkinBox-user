import { useDebounceFn, useThrottleFn } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { FetchOptions } from "ohmyfetch";

export const useFetchAuth = (url: string, opts?: FetchOptions) => {
    const {token} = storeToRefs(useAuth().useUser());
    const config = useRuntimeConfig()
    const { errorResponse } = useBase();
    const { loading,silentLoading } = storeToRefs(useLoading())
    
    const apiFetch = $fetch.create({
        baseURL: config.public.BASE_URL,
        credentials: "include",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token.value ?? ""}`,
        },
      })

      const debouncedFn = useThrottleFn(() => {
        //loading.value = true
        //silentLoading.value = true
        setTimeout(() => {
          loading.value = false
          silentLoading.value = false
        }, 1000);
      }, 5000)
      
  return apiFetch(url,{...opts,
    async onRequest({ request, options }) {
      // Log request
      //console.log('[fetch request]', request, options)
      debouncedFn();
    }, 
    async onResponse({ request, response, options }) {
      // Log response
      //console.log('[fetch response]', request, response.status, response.body)
      if (response.status == 401) {
         const {logout} = useAuth()
         logout()
        errorResponse(response)
      }
      if (response.status == 422) {
        console.log(JSON.stringify( response._data));
        let data = { response }
        errorResponse(response)
      }

      if (response.status == 500) {
        //console.log(JSON.stringify( response._data.error));
        let data = { response }
        errorResponse(response)
      }
      loading.value = false
      silentLoading.value = false
    },
    async onRequestError({ request, options, error }) {
      // Log error
      //console.log('[fetch request error]', request, error)
      loading.value = false
      silentLoading.value = false
    }
  });
};