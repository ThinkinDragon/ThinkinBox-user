import type { User } from "~/types/home.d";
import { defineStore, storeToRefs } from "pinia";
import {
  InAppBrowser,
  type InAppBrowserOptions,
} from "@awesome-cordova-plugins/in-app-browser";

export function useAuth() {
  const { $apiFetch, $echo } = useNuxtApp();
  const { errorResponse } = useBase();

  const { useBookings } = useBooking();
  const store = useBookings();
  const router = useRouter();
  const sto = useLoading();
  const config = useRuntimeConfig();

  const { platform } = useFirebase();
  const notif = useLocalNotification();

  let connect;
  const { loading } = storeToRefs(sto);
  function getUser() {
    return useUser().user;
  }

  function removeUser() {
    useUser().logout();
  }

  const isLoggedIn = computed(() => {
      return <Boolean>useUser().isLoggedIn;
  });

  async function logout() {
    useUser().logout();
  }

  async function logout2() {
    useUser().logout2();
  }

  async function setUser() {
    return useUser().setUser;
  }

  return { setUser, getUser, removeUser, isLoggedIn, logout, logout2 };
}
