import type { User } from "~/types/home";
import { defineStore, storeToRefs } from "pinia";

import type {
   InAppBrowserOptions,
} from "@awesome-cordova-plugins/in-app-browser";
import useInBrowser from "./useInBrowser";


export const useUser = defineStore('vajjanUser', {
    persist: { enabled: true, },
    state: () => ({
      showResend : false,
      user : null as any | null,
      //token: null as string|null,
      otp: null as number | null,
      mobile: null as number | null,
      forgot_id: null,
      coupons: null,
      stage: 0,
      error: [],
      bank_date: null,
    }),
    getters: {
          getUser(state){
            return state.user 
          },
          isLoggedIn(state){
            const {token} = storeToRefs(useToken());

            return state.user != null || token.value  != null
          },
          getLang(state){
            return state?.user?.language ?? 'en'
          },
          getWallet(state) {
            return state.user?.wallet_balance ?? 0;
          },
          getCurrency(state){
            return (val:string) => (state.user?.currency ?? '$') + " " + val;
          },
      },
      actions: {
        async setUser () {
          try {
            await useFetchAuth('/api/user/details').then((res:any) =>{
              this.user = res

              if(res?.ongoing_request?.id != undefined){
                return navigateTo(`/booking/${res?.ongoing_request?.id}`);
              }
            }).catch((err:any) => {
              
              useBase().errorResponse(err)
            })
          } catch (err) {
            //console.log(err);
          }
        },
        async connectWs() {
          const { useBookings } = useBooking();
          const store = useBookings();  
          const notif = useLocalNotification();
          const { $echo } = useNuxtApp();

          try {
             $echo.private(`Neos.User.${this.user?.id || 0}`).notification((notification:any) => {
              console.log(notification);

                //   if (platform === "web") {
                //     const greeting = new Notification(notification.title, {
                //       body: notification.message,
                //     });
                //     setTimeout(() => greeting.close(), 10 * 1000);

                // } else 
                  notif.sendLocal({title: notification.title, body: notification.message, id: +notification.request+0, attachments: notification});
                
                if (notification.key == "CANCEL_REQUEST")
                {
                  return this.showResend = true
                } else
              {if (notification.request != null) {
                return store.flowBooking(notification.request);
              }}
            });

          } catch (err) {
            console.log(err);
          }
        },
        async requestOtp (mobile: string,device_token: string,device_id: any) {
          await useFetchAuth("/api/user/otp", {
            method: "POST",
            body: {
              mobile: mobile,
              device_type: "android",
              device_token: device_token ?? "123",
              device_id: device_id,//store.deviceid.identifier,
            },
          })
            .then(async (result: any) => {
              this.otp = result.otp;
              if (result.user == null) {
                return navigateTo('/register');
              }else{
                this.user = result.user
              }
            })
            .catch((err: { response: { _data: { message: never[]; }; }; }) => {
              useLoading().hide()
              this.error = err.response._data.message;
                return useBase().errorResponse(err);
            })
      },
        async login (email: string,device_token: string,device_id: string,password: string) {
          const userCred ={
            email: email,
            device_type: "android",
            device_token: device_token ?? "123",
            device_id: device_id,//store.deviceid.identifier,
            password: password,//password.value,
          };

          //await login(userCred);
          await useFetchAuth("/api/user/oauth/token", {
              method: "POST",
              body: userCred
            })
              .then(async(result:any) => {
                const {token} = storeToRefs(useToken())
                token.value = result;
                
              const router = useRouter();
                return router.push({path: '/'});
                return navigateTo('/');
              })
              .catch((err:any) => {
                useLoading().hide()
                //console.log(err.response._data.message);
                //this.error = err.response._data.message;
                  return useBase().errorResponse(err);
              })
        },
        async forgot (email:string) {
          useLoading().show()
          await useFetchAuth("/api/user/forgot/password", {
            method: "POST",
            body: {
              email: email,
            },
          })
            .then(async (result:any) => {
              useLoading().hide()
             this.otp = result.user.otp
             this.forgot_id = result.user.id
             return navigateTo('/forgot')
            })
            .catch((err:any) => {
              useLoading().hide()
              //console.log(err.response._data.message);
              //this.error = err.response._data.message;
                return useBase().errorResponse(err);
            })
      },
      async reset (otp:string,password:string,passwordConfirm:string) {
        if (this.otp != otp) return useBase().errorResponse("OTP don't match !!");
      useLoading().show()
        await useFetchAuth("/api/user/reset/password", {
          method: "POST",
          body: {
            id: this.forgot_id,
            password: password,
            password_confirmation: passwordConfirm,
          },
        })
          .then(async (result) => {
            useLoading().hide()
            return navigateTo('/login')
          })
          .catch((err:any) => {
            useLoading().hide()
            //console.log(err.response._data.message);
            //this.error = err.response._data.message;
              return useBase().errorResponse(err);
          })
    },
    async change (old_password:string,password:string,passwordConfirm:string) {
      useLoading().show()
      await useFetchAuth("/api/user/change/password", {
        method: "POST",
        body: {
          old_password: old_password,
          password: password,
          password_confirmation: passwordConfirm,
        },
      })
        .then(async (result:any) => {
          useLoading().hide()
        return navigateTo('/');
        })
        .catch((err:any) => {
          useLoading().hide()
          //console.log(err.response._data.message);
          //this.error = err.response._data.message;
            return useBase().errorResponse(err);
        })
  },

  async addMoney(amount: Number, gateway: String, user_type: String) {
    //useLoading().show();
    await useFetchAuth("/api/user/add/money", {
      method: "POST",
      body: {
        amount: amount,
        payment_mode: gateway,
        user_type: user_type,
      },
    })
      .then(async (res: any) => {


console.log(res);
// var xhr = new XMLHttpRequest();
// xhr.open("POST", "https://test.payu.in/_payment", true);
// xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
// xhr.setRequestHeader("Access-Control-Allow-Origin", "*");


// xhr.onreadystatechange = function() {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//         console.log(xhr.responseText);
//     }
// };

// var formData = new FormData();
// formData.append("key", res.fields.key);
// formData.append("txnid", res.fields.txnid);
// formData.append("amount", res.fields.amount);
// formData.append("productinfo", res.fields.productinfo);
// formData.append("firstname", res.fields.firstname);
// formData.append("email", res.fields.email);
// formData.append("phone", res.fields.phone);
// formData.append("surl", res.fields.surl);
// formData.append("furl", res.fields.furl);
// formData.append("hash", res.fields.hash);
const options : InAppBrowserOptions = {
  location:"yes",
  //beforeload: "yes",
  hideurlbar:"yes",
  fullscreen:"yes",
  hidenavigationbuttons:"yes",
}
console.log(res.payment_url);
// xhr.send(formData);
if (res.payment_url == undefined) return true;
const inBrowser = useInBrowser(res.payment_url,options);
 await inBrowser.startBrowser().then((result) => {
  console.log(result);
  this.setUser();
 }).catch((err) => {
  throw new Error("Error: " + err);
 });


      })
      .catch((err: any) => {
        useLoading().hide();
        this.setUser();
        //console.log(err.response._data.message);
        //this.error = err.response._data.message;
        return useBase().errorResponse(err);
      });
  },

        async signup (name,email,mobile,device_token,device_id,password,passwordConfirm,dni,referalCode) {
          useLoading().show()

            await useFetchAuth('/api/user/register', {
              method: 'POST',
              body: {
                first_name: name,
                last_name: name,
                email: email,
                mobile: mobile,
                password: password,
                password_confirmation: password,
                dni:dni,
                referral_code:referalCode ?? null,
                device_type: 'android',
                device_token: device_token ?? "123",
                device_id: device_id,//store.deviceid.identifier,
                login_by: 'manual',
                country_code: '+91'
              },
            }).then(async (result:string) => {
              
              const {token} = storeToRefs(useToken())
              token.value = result;
              this.setUser()

              const router = useRouter();
              //router.push({ path: "/" })

              return navigateTo('/');
              //const router = useRouter();
              //router.push({ path: "/" });
            })
            .catch((err:any) => {
              this.error = err.response._data.message;
              return useBase().errorResponse(err);
            })
            useLoading().hide()
        },
        async getPromocode () {
          try {
            await useFetchAuth('/api/user/promocodes_list').then((res) =>{
              this.coupons = res?.promo_list
            }).catch((err:any) => {
              useBase().errorResponse(err)
            })
          } catch (err) {
            //console.log(err);
          }
        },
        
        async setLang(data:string) {
          useLoading().show()
          await useFetchAuth("/api/user/update/language", {
            method: "POST",
            body: {
              language: data,
            },
          })
            .then(async (result:any) => {
              useLoading().hide()
            })
            .catch((err:any) => {
              useLoading().hide()
              //console.log(err.response._data.message);
              //this.error = err.response._data.message;
                return useBase().errorResponse(err);
            })
        },
        async delAccount(params: string) {
          useLoading().show();
          const data = await useFetchAuth("/api/user/delete", {
            method: "POST",
            body: {
              delete_reason: params,
              id: this.user.id,
            },
          })
            .then((result:any) => {
              this.user = null
              
              useAuth().$reset();
  
              useLoading().hide();
              return navigateTo('/login')
  
            })
            .catch((err:any) => {
              useBase().errorResponse(err.response);
            });
        },
        async logout () {

          try {
            //$echo.leaveChannel(`Neos.User.${this.user.id}`);
            const {token,show} = storeToRefs(useToken());
                console.log("logout hit token",token.value);

                await useFetchAuth('/api/user/logout',{
                  method: "POST",
                  body: {
                    id: this.user.id,
                  },
                }).then(async (result:any) => {
                console.log("logout hit",result);
                
                this.user = null;
                useToken().$reset();
                return navigateTo('/login')  
                //return navigateTo('/');

                //window.location.pathname = '/login'
                }).catch((err:any) => {
                  console.log(err);
                  
                  //useBase().errorResponse(err)

                this.user = null
                useToken().$reset();
                return navigateTo('/login')  
                })


                this.user = null
                useToken().$reset();
                return navigateTo('/login')  
            }
            catch (error) {
              useBase().errorResponse(error)
          }
        },
        async logout2 () {
          const {token,show} = storeToRefs(useToken())

          try {
            if (token.value != null) {
              return true;
            }
            const { $apiFetch, $echo } = useNuxtApp();

            $echo.leaveChannel(`Neos.User.${this.user?.id || 0}`);

                const data = await useFetchAuth('/api/user/logout',{
                  method: "POST",
                  body: {
                    id: this.user.id,
                  },
                }).then(async (result:any) => {
                
                this.user = null;
                useToken().$reset();

                return navigateTo('/login')  
                //return navigateTo('/');

                //window.location.pathname = '/login'
                }).catch((err:any) => {
                  useBase().errorResponse(err)

                this.user = null
                useToken().$reset();
                return navigateTo('/login')  
                })
            }
            catch (error) {
              useBase().errorResponse(error)
          }
        }
      }
})


// make sure to pass the right store definition, `useUser` in this case.
if (import.meta.hot) {
import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot))
}