import { defineStore } from "pinia";
export const usePolyline = defineStore("polyline", {
  persist: { enabled: true, },
  state: () => ({
    polyline: null,
    startLocation:{ id: undefined, coordinate: {} },
    endLocation:{ id: undefined, coordinate: {} },
    partnerLocation:{ id: undefined, coordinate: {} },
    pathBounds:{ id: undefined, bounds: {} },
    setOnCameraMoveStarted:{},
    setOnCameraIdle:{},
  }),
  getters: {
    getPolyline(state) {
      return state.polyline;
    },
  },
  actions: {
    setPolyline(polyline:any) {
      this.polyline = polyline;
    },
    async removePolyline(map:any) {
      map.removePolylines([this.polyline]);
      this.polyline = null;
    },
  },
});

  // make sure to pass the right store definition, `usePolyline` in this case.
  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePolyline, import.meta.hot))
  }
