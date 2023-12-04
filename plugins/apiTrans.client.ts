import { defineNuxtPlugin, useRuntimeConfig, useNuxtApp } from "#app";

export default defineNuxtPlugin(() => {
  const { useUser } = useAuth()

  function lang(key:any, replacements = {}) {
    return key[useUser().getLang] ?? key;
  }

  return {
    provide: {
      _api_: (data: string, replacements:any = {}) => lang(data, replacements),
    },
  };
});
