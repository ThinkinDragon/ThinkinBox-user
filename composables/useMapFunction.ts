import { usePolylineReact } from "./polyline";
import { GoogleMap } from "@capacitor/google-maps";

export const useMapFunction = (map: any) => {
  // const polyline = useStorage("local/polyline",null);
  // const startLocation = useStorage("local/startLocation",{ id: undefined, coordinate: {}});
  // const pathBounds = useStorage("local/pathBounds",{ id: undefined, bounds: {}});
  // const endLocation = useStorage("local/endLocation",{ id: undefined, coordinate: {}});
  const config = useRuntimeConfig();
  const { isApp } = useWhatPlatform();

  const { setOnCameraMoveStarted, setOnCameraIdle } = storeToRefs(
    usePolyline()
  );

  const { polyline, startLocation, pathBounds, endLocation } =
    usePolylineReact();
  const isNavActive = useIsNavActive();
  const isOpen = useSheetToggle();
  const {
    center,
    currPos,
    markerMoving,
    mapReady,
    s_latitude,
    s_longitude,
    d_latitude,
    d_longitude,
    s_select,
    d_select,
  } = storeToRefs(useAddress());

  async function drawRoute(direction: any) {
    await clearMap();
    console.log(direction);
    
    if (typeof direction != "undefined" && direction != null) {
      await usePolylineReact().drawRoute(map, direction);
    }
  }

  async function clearMap() {                                                                                                                                               
    try {
      usePolylineReact().clearMap(map);
    } catch (error) {
      console.log(error);
    }
  }

  async function rmMark(params: string) {
    await map.removeMarkers([params]);
  }

  async function startMap() {
    if (map == null) return true;

    if (isApp) await map.enableCurrentLocation(true);
    await map.setPadding({
      top: 20,
      left: 0,
      right: 0,
      bottom: 240,
    });
    await setOnMapFunc();
    //await webMap();
  }

  async function setOnMapFunc() {
    setOnCameraMoveStarted.value = await map.setOnCameraMoveStartedListener(
      (event: any) => {
        markerMoving.value = true;
      }
    );

    setOnCameraIdle.value = await map.setOnCameraIdleListener(
      async (event: any) => {
        markerMoving.value = false;
        isOpen.value = !isNavActive.value;

        // if (isNavActive.value) {
        //   isOpen.value = false;
        // } else
        //   isOpen.value = true;
        console.log("camera idle");

        if (s_select.value) {
          s_latitude.value = event.latitude;
          s_longitude.value = event.longitude;
        } else if (d_select.value) {
          d_latitude.value = event.latitude;
          d_longitude.value = event.longitude;
        } else
          center.value = {
            lat: event.latitude,
            lng: event.longitude,
          };
      }
    );
  }

  async function reloadMap(params: any) {
    if (params == undefined) return true;
    // if (map != null) {
    //   await map?.destroy();
    // }
    map = await GoogleMap.create(params)
      .then(async (result) => {
        await startMap();
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
    return map;
  }
  return {
    drawRoute,
    setOnMapFunc,
    rmMark,
    reloadMap,
    clearMap,
    startMap,
  };
};
