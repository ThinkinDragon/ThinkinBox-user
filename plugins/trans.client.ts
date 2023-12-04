import { storeToRefs } from "pinia";
import { defineNuxtPlugin, useRuntimeConfig, useNuxtApp } from "#app";

export default defineNuxtPlugin({
  name: "trans",
  parallel: true,
  async setup(nuxtApp) {
    const store = useLanguage();

    const { language, _translations, cacheTime } = storeToRefs(store);

    nuxtApp.hook("app:created", async () => {
      await getData();
    });
    async function getData() {
      await useLanguage().getApiLanguage();
    }
    nuxtApp.hook("app:mounted", async () => {
      watch(language, async (newValue, oldValue) => {
        if (newValue != oldValue) {
          await getData();
          useHead({ htmlAttrs: { lang: language.value ??'en' } });
        }
      });
      // watchEffect(async () => {
      //   if (language.value) {
      //     console.log("app:mounted watch language");

      //     await getData();
      //   }
      // })
    });

    function translation(key: string = "", replacements: any = {}) {
      let translation =
        _translations.value[key] == null ? key : _translations.value[key];
      Object.keys(replacements).forEach((r) => {
        translation = translation.replace(`:${r}`, replacements[r]);
      });
      return translation;
    }

    return {
      provide: {
        __: (data: string, replacements: any = {}) =>
          translation(data, replacements),
      },
    };
  },
});
