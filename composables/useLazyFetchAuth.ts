import { storeToRefs } from 'pinia';
import { FetchOptions } from "ohmyfetch";

export const useLazyFetchAuth = async(url: string, opts?: FetchOptions) => {
  
    const {token} = storeToRefs(useUser());
    const config = useRuntimeConfig()

    opts = {
        baseURL: config.public.BASE_URL,
        credentials: "include",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token.value ?? ""}`,
        },
      }

  return await useFetch(url,{...opts});
};