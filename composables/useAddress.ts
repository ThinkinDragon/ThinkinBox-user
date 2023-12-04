import { defineStore } from "pinia";
import { Geolocation } from "@capacitor/geolocation";

interface latLng {
  lat: number;
  lng: number;
}

interface dataAddress {
  s_map_address: string;
  s_latitude: number;
  s_longitude: number;
  s_select: boolean;
  d_map_address: string;
  d_latitude: number;
  d_longitude: number;
  d_select: boolean;
  live: latLng;
  currPos: latLng;
  date: string;
  time: string;
  type: string;
  default: boolean;
  useWallet: number;
  payment_mode: string;
  user_id: number;
  processing: boolean;
}

export const useAddress = defineStore("address", {
  persist: { enabled: true },
  state: () => ({
    s_map_address: "",
    s_latitude: 0,
    s_longitude: 0,
    s_select: false,
    d_map_address: "",
    d_latitude: 0,
    d_longitude: 0,
    d_select: false,
    map_live_address: "",
    live: {
      lat: 30.3255646,
      lng: 78.0436813
    } as latLng,
    date: "",
    time: "",
    type: "",
    markerMoving: false,
    default: false,
    mapReady: false,
    useWallet: 0,
    payment_mode: "",
    user_id: 0,
    processing: false,
    center: {
      lat: 0.0,
      lng: 0.0
    } as latLng,
    currPos: {
      lat: 0.0,
      lng: 0.0
    } as latLng
  }),
  getters: {
    markerCenter(state) {
      if (state.s_select) {
        return this.sourceCenter;
      } else if (state.d_select) {
        return this.destinationCenter;
      } else {
        return state.center || state.currPos;
      }
    },
    sourceCenter(state) {
      return { lat: state.s_latitude, lng: state.s_longitude };
    },
    destinationCenter(state) {
      return { lat: state.d_latitude, lng: state.d_longitude };
    }
  },
  actions: {
    async printCurrentPosition() {
      const { coords } = await Geolocation.getCurrentPosition();
      this.live = {
        lat: coords.latitude,
        lng: coords.longitude
      };
      this.center = {
        lat: coords.latitude,
        lng: coords.longitude
      };
      this.currPos = {
        lat: coords.latitude,
        lng: coords.longitude
      };
    },
    async getLive(){
      const geocoder = useGoogleGeocode();
      await geocoder
        .geocode( this.currPos.lat,this.currPos.lng)
        .then((response) => {
          console.log(response);
          if (response.results[0]) {
            this.s_map_address = response.results[0].formatted_address;
          }
        })
    },
    async getGeoAddress(){
      const geocoder = useGoogleGeocode();
      await geocoder
        .geocode( this.currPos.lat,this.currPos.lng)
        .then((response) => {
          console.log(response);
          if (response.results[0]) {
            this.s_map_address = response.results[0].formatted_address;
          }
        })
    }
  }
});

// make sure to pass the right store definition, `useAddressStore` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAddress, import.meta.hot));
}