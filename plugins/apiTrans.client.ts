import { defineNuxtPlugin, useRuntimeConfig, useNuxtApp } from "#app";

export default defineNuxtPlugin(() => {
  const { getLang } = useUser()

  function lang(key:any, replacements = {}) {
    return key[getLang] ?? key;
  }

  return {
    provide: {
      _api_: (data: string, replacements:any = {}) => lang(data, replacements),
    },
  };
});
