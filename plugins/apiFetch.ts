import { defineNuxtPlugin } from "#app";
export default defineNuxtPlugin(async(nuxtApp) => {
  const config = useRuntimeConfig();
  //Cookies.get("user-token") != null ? Cookies.get("user-token") :
  nuxtApp.provide(
    "apiFetch",
    useFetchAuth
  );
});
