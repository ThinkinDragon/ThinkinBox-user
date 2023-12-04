


  export default defineNuxtRouteMiddleware((to,from) => {
  
    const { isLoggedIn } = useAuth();

    if (process.client) {
      if (isLoggedIn.value) {
        useAuth().useUser().connectWs()
      }
    }
//     const { $echo } = useNuxtApp()
//     const { useUser } = useAuth()
//     const { user,isLoggedIn } = storeToRefs( useUser())

//     const { platform } = useFirebase();  
//     const {useBookings} = useBooking();
//     const {booking} = storeToRefs(useBookings());

////console.log( isLoggedIn.value,"websocket init");
//     if (isLoggedIn.value) {
//       try {
//        //console.log("websocket started");
        
//         const notif = useLocalNotification();
//         $echo.private(`Neos.User.${user?.value.id}`).notification((notification:any) => {
//              //console.log(notification);
              
//             if (platform == "web") {
//               try {
//                 const greeting = new Notification(notification.title, {
//                   body: notification.message,
//                 });
//                 setTimeout(() => greeting.close(), 10 * 1000);
//               } catch (error) {
//                //console.log(JSON.stringify(error));
//               }

//             } else {

//               if (notification.request != null) 
//               notif.sendLocal({title: notification.title, body: notification.message, id: +notification.request+0, attachments: notification});
//               //else
//               //notif.sendLocal({title: notification.title, body: notification.message, id: 300});
//             }
//             notif.sendLocal({title: notification.title, body: notification.message, id: 300, attachments: notification});

//             if (notification.key == "CANCEL_REQUEST")
//             {
//               return useBookings().flowBooking(+booking?.value?.id);
//             } else
//           {if (notification.request != null) {
//             return useBookings().flowBooking(notification.request);
//           }}
//         });
//       } catch (err) {
//         //console.log(err);
//       }
//     }
  })