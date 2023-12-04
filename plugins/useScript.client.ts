import { defineNuxtPlugin, useNuxtApp, useRuntimeConfig } from '#app'
import { onUnmounted } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {

  async function getUrl(src:string) {
  return new Promise<void>((resolve, reject) => {

    let script = document.querySelector(`script[src="${src}"]`);
 
    if (!script) {
      script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.setAttribute("data-status", "loading");
      document.head.append(script);
    }
 
    if (script.getAttribute("data-status") === "loaded") {
      resolve();
    }
 
    function onScriptLoad() {
      resolve();
      script.setAttribute("data-status", "loaded");
    }
 
    function onScriptError() {
      reject();
      script.setAttribute("data-status", "error");
    }
 
    script.addEventListener("load", onScriptLoad);
    script.addEventListener("error", onScriptError);
 
    nuxtApp.hook("app:mounted", async () => {
      onUnmounted(() => {
        if (document.head.contains(script)) {
          script.removeEventListener("load", onScriptLoad);
          script.removeEventListener("error", onScriptError);
          document.head.removeChild(script);
        }
      })
    });

  })
  }
  return {
    provide: {
        useScript: (src:string)=> getUrl(src)
    },
  }
})