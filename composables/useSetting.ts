import { defineStore, storeToRefs } from "pinia";
import { useService } from "~~/store/home";
import type { Setting } from "~~/types/setting";

export const useSetting = defineStore("setting", {
    persist: {
    enabled: true,
    // See below for additional options that go here
  },
  state: (): Setting => ({
    referral: [],
    about: null,
    term: null,
    privacy: null,
    languages:null,
    faqs: null,
    home_logo: null,
    home_icon: null,
    home_date: null,
    home_title: null,
    home_subtitle: null,
    contact_number:null,
    contact_email:null,
    android_app: null,
    apple_app: null,
    slider_1:null,
    slider_2: null,
    slider_3: null,
    social_login: false,
  }),
  getters: {
    getAbout(state) {
      return state.about;
    },
    getTerm(state) {
      return state.term;
    },
    getPrivacy(state) {
      return state.privacy;
    },
  },
  actions: {
    reset(state) {
      state.$reset();
    },
    async fetch() {
      const { useService } = useHome();
      const serv = await useService()
      const { tags,goods,selectedGood, services,items, searchArray, searchServices } = storeToRefs(serv);

      await useFetchAuth("/api/user/settings")
        .then((result) => {
          
          this.referral = result.referral;
          this.about = result.about;
          this.term = result.term;
          this.privacy = result.privacy;
          this.languages = result.languages;

          this.slider_1 = result.slider_1;
          this.slider_2 = result.slider_2;
          this.slider_3 = result.slider_3;
          this.faqs = result.faqs;
          this.home_logo = result.home_logo;
          this.home_icon = result.home_icon;
          this.home_date = result.home_date;
          this.home_title = result.home_title;
          this.home_subtitle = result.home_subtitle;
          this.contact_number = result.contact_number;
          this.contact_email = result.contact_email;

          this.android_app = result.android_app;
          this.apple_app = result.apple_app;
          this.social_login = false;//result.social_login;
          
          tags.value = result.tags;
          goods.value = result.goods;
          selectedGood.value = result.goods[0];
          services.value = result.serviceTypes;
          items.value = result.serviceItems;
          searchArray.value = result.searchServices;
          searchServices.value = result.searchServices;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});

  // make sure to pass the right store definition, `useSetting` in this case.
  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSetting, import.meta.hot))
  }