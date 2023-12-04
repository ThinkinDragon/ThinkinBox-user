import { storeToRefs } from 'pinia';
import { App as CapacitorApp } from '@capacitor/app';


export default defineNuxtRouteMiddleware((to, from) => {
  const {useBookings} = useBooking()
  const {booking} = storeToRefs(useBookings())
    //console.log("from urldata:", JSON.stringify( from));
    //console.log("to urldata:", JSON.stringify( from));
    CapacitorApp.addListener('backButton', ({canGoBack}) => {
      if(!canGoBack){
        CapacitorApp.exitApp();
      } else {
        window.history.back();
      }
    });

    if (to.path == '/') {
      booking.value = null;
    }
  })