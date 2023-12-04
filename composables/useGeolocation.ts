import { useFirebase } from './useFirebase';
import { storeToRefs } from 'pinia';
import { Geolocation } from '@capacitor/geolocation';

export function useGeolocation() {
  const {center,currPos} = storeToRefs(useAddress()) // reactive({ lat: 0, lng: 0 })

  const {platform } = useFirebase()
  const st = useFirebase()



const isSupported = computed(() => {
  return process.client && 'navigator' in window && 'geolocation' in window.navigator;
});

  let watcher:any ;
      async function gps() {
        if (!isSupported.value) Geolocation.requestPermissions();
        if (platform == 'web') {
          watcher = await  navigator.geolocation.watchPosition(success, error, {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0,
          });
        } else {

          await Geolocation.checkPermissions().then((result) => {
            console.log(result);
            console.log('result geolocation');

          }).catch((err) => {
            console.log(err);
            
          });
          watcher = await Geolocation.watchPosition({
            enableHighAccuracy: false,
            timeout: 30*1000,
            maximumAge: 0,
          },success)
        }
      }
      function error(err):any {
        //console.log(JSON.stringify(err));
        console.error(`geolocation ERROR(${err.code}): ${err.message}`);
      }
      function success(data:any) {
        console.log("geolocation success");

        if (data?.coords == undefined) {
          return true;
        }
        console.log(data.coords.latitude,data.coords.longitude);
          center.value.lat= parseFloat(data.coords.latitude);
          center.value.lng= parseFloat(data.coords.longitude);
          currPos.value.lat= parseFloat(data.coords.latitude);
          currPos.value.lng= parseFloat(data.coords.longitude);
        // console.log(data);
        // console.log(center.lat,center.lng);
      }
  // onUnmounted(() => {
  //   if (watcher) navigator.geolocation.clearWatch(watcher)
  // })



  return { isSupported, gps}
}