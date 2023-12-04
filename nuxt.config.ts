export default defineNuxtConfig({
  //extends:['../nuxt-layer'],
  experimental: {
    externalVue: true,
  },
  runtimeConfig: {
    public: {
      APP_NAME: process.env.APP_NAME,
      BASE_URL: process.env.BASE_URL,
      BASE_IMAGE_URL: process.env.BASE_IMG_URL,
      GMAP_API: process.env.GMAP_API,
      MIX_PUSHER_APP_KEY: process.env.MIX_PUSHER_APP_KEY,
      MIX_PUSHER_APP_CLUSTER: process.env.MIX_PUSHER_APP_CLUSTER,
    },
  },
  typescript: {
    shim: false,
    strict: true,
  },
  ssr: false,
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: process.env.APP_NAME,
      titleTemplate: "%s - " + process.env.APP_NAME,
      meta: [
        {
          name: "viewport",
          content: "initial-scale=1, user-scalable=no, width=device-width, height=device-height, viewport-fit=cover",
        },
        {
          hid: "description",
          name: "description",
          content: "Thinkin Dragon",
        },
      ],
      link: [
        {
          // rel: "stylesheet",
          // href: "https://pro.fontawesome.com/releases/v5.10.0/css/all.css",
        },
      ],
      // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      script: [
        {
          //src: "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.8.1/lottie.min.js",
          //src: "https://js.stripe.com/v3/",
        },
      ],

    },
    pageTransition: {
      name: "fade",
      mode: "out-in", // default
    },
    // layoutTransition: {
    //   name: "slide",
    //   mode: "out-in", // default
    // },
  },
  colorMode: {
    preference: 'light', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'nuxt-color-mode'
  },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/color-mode",
    '@nuxtjs/critters',
    'nuxt-lodash','@nuxtjs/fontaine',
    "nuxt-icon",
    "@vueuse/nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: [
          // automatically imports `defineStore`
          "defineStore", // import { defineStore } from 'pinia'
          "storeToRefs",
          // automatically imports `defineStore` as `definePiniaStore`
          ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
  ],
  // or sourcemap: true
  sourcemap: {
    server: true,
    client: true
  },
  build: {
    transpile: ["@heroicons/vue", "@headlessui/vue"],
  },
  vite: {
    logLevel: "info",
  },
  components: [
    {
      path: "~/components/ui",
      // this is required else Nuxt will autoImport `.ts` file
      extensions: [".vue"],
      // prefix for your components, eg: UiButton
      prefix: "Ui",
    },
    {
      path: "~/components",
    },
  ],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ["capacitor-google-map","sub-header"].includes(tag),
    },
  },
  
  devtools: { enabled: true },

  plugins: [
    "~/plugins/useScript.client.ts",
    "~/plugins/Vue3Lottie.client.ts",
    "~/plugins/trans.client.ts",
    "~/plugins/vant.ts",
    "~/plugins/error.ts",
    "~/plugins/apiTrans.client.ts",
    "~/plugins/echo.client.ts",
    "~/plugins/apiFetch.ts",
    "~/plugins/stripeUi.ts",
    "~/plugins/piniaState.client.ts",
    //"~/plugins/getMap.client.ts",
    "~/plugins/prefStorage.ts",
  ],
});
