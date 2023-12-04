import { defineNuxtPlugin, useRuntimeConfig, useNuxtApp } from "#app";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

(window as any).Pusher = Pusher;

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  nuxtApp.provide(
    "echo",
    new Echo({
      broadcaster: "pusher",
      key: config.public.MIX_PUSHER_APP_KEY,
      cluster: config.public.MIX_PUSHER_APP_CLUSTER,
      //wsHost: window.location.hostname,
      //host: window.location.hostname,
      //wsPort: 6001,
      //encrypted: true,
      //forceTLS: true,
      //disableStats: true
      authorizer: (channel, options) => {
        return {
          authorize: (socketId, callback) => {
            useFetchAuth("/api/user/broadcasting/auth", {
              method: "POST",
              body: {
                socket_id: socketId,
                channel_name: channel.name,
              },
            })
              .then((response) => {
                callback(false, response);
              })
              .catch((error) => {
                callback(true, error);
              });
          },
        };
      },
    })
  );
});
