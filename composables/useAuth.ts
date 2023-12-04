import  type{ User } from '~/types/home.d';
import { defineStore, storeToRefs } from "pinia";
import { InAppBrowser , InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser';

export function useAuth() {
  const { $apiFetch,$echo } = useNuxtApp()
  const { errorResponse } = useBase();

  const {useBookings} = useBooking();
  const store = useBookings();
  const router = useRouter();
  const sto = useLoading();
  const config = useRuntimeConfig()
  
  const { platform } = useFirebase();
  const notif = useLocalNotification();

  let connect;
  const  {loading} = storeToRefs(sto);
  function getUser() {
    return useUser().user
  }

  function removeUser() {
    useUser().logout()
  }

  const isLoggedIn = computed(() => {
    if (process.client) {
      return <Boolean> useUser().isLoggedIn 
    }
  });

  const useUser = defineStore('user', {
    persist: {
      enabled: true,
      // See below for additional options that go here
    },
      state: () => ({
        show : true,
        showResend : false,
        user : null as User|null,
        token: null as String|null,
        otp: null as number | null,
        mobile: null as Number | null,
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
              return state.user != null || state.token != null
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
              await useFetchAuth('/api/user/details').then((res) =>{
                this.user = res

                if(res?.ongoing_request?.id != undefined){
                  return navigateTo(`/booking/${res?.ongoing_request?.id}`);
                }
              }).catch((err) => {
                
                errorResponse(err)
              })
            } catch (err) {
              //console.log(err);
            }
          },
          async connectWs() {

            try {
              connect = $echo.private(`Neos.User.${this.user.id}`).notification((notification) => {
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
              console.log(JSON.stringify(err));
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
                sto.hide()
                this.error = err.response._data.message;
                  return errorResponse(err);
              })
        },
          async login (email,device_token,device_id,password) {
              await useFetchAuth("/api/user/oauth/token", {
                method: "POST",
                body: {
                  email: email,
                  device_type: "android",
                  device_token: device_token ?? "123",
                  device_id: device_id,//store.deviceid.identifier,
                  password: password,//password.value,
                },
              })
                .then(async(result:any) => {
                  this.token = result;
                  await this.setUser()
                  this.connectWs();
                  return router.push({path: '/'});
                  return navigateTo('/',{external: true});
                })
                .catch((err) => {
                  sto.hide()
                  //console.log(err.response._data.message);
                  //this.error = err.response._data.message;
                    return errorResponse(err);
                })
          },
          async forgot (email) {
            sto.show()
            await useFetchAuth("/api/user/forgot/password", {
              method: "POST",
              body: {
                email: email,
              },
            })
              .then(async (result) => {
                sto.hide()
               this.otp = result.user.otp
               this.forgot_id = result.user.id
               return navigateTo('/forgot')
              })
              .catch((err) => {
                sto.hide()
                //console.log(err.response._data.message);
                //this.error = err.response._data.message;
                  return errorResponse(err);
              })
        },
        async reset (otp,password,passwordConfirm,) {
          if (this.otp != otp) return errorResponse("OTP don't match !!");
        sto.show()
          await useFetchAuth("/api/user/reset/password", {
            method: "POST",
            body: {
              id: this.forgot_id,
              password: password,
              password_confirmation: passwordConfirm,
            },
          })
            .then(async (result) => {
              sto.hide()
              return navigateTo('/login')
            })
            .catch((err) => {
              sto.hide()
              //console.log(err.response._data.message);
              //this.error = err.response._data.message;
                return errorResponse(err);
            })
      },
      async change (old_password,password,passwordConfirm,) {
        sto.show()
        await useFetchAuth("/api/user/change/password", {
          method: "POST",
          body: {
            old_password: old_password,
            password: password,
            password_confirmation: passwordConfirm,
          },
        })
          .then(async (result) => {
            sto.hide()
          return navigateTo('/');
          })
          .catch((err) => {
            sto.hide()
            //console.log(err.response._data.message);
            //this.error = err.response._data.message;
              return errorResponse(err);
          })
    },

    async addMoney(amount: Number, gateway: String, user_type: String) {
      //sto.show();
      await useFetchAuth("/api/user/add/money", {
        method: "POST",
        body: {
          amount: amount,
          payment_mode: gateway,
          user_type: user_type,
        },
      })
        .then(async (res: any) => {

        const options : InAppBrowserOptions = {
          location:"yes",
          //beforeload: "yes",
          hideurlbar:"yes",
          hidenavigationbuttons:"yes",
        }
        console.log(res.url);
        
          if (res.url != undefined) {
            const browser = InAppBrowser.create(res.url,'_self', options);
            //'loadstart' | 'loadstop' | 'loaderror' | 'exit' | 'beforeload' 
            browser.on('beforeload').subscribe(event => {
              console.log("beforeload 1ww");
              return this.urlFun(event,browser);
           });
            browser.on('exit').subscribe(event => {
              console.log("exit 2ww");

              return this.urlFun(event,browser);
           });
            browser.on('loaderror').subscribe(event => {
              console.log("loaderror 3ww");

              return this.urlFun(event,browser);
           });
            browser.on('loadstart').subscribe(event => {
              console.log("loadstart 4ww");
              let domain = (new URL(event.url));
              let domain2 = (new URL(config.public.BASE_URL));
              if (domain.hostname === domain2.hostname) {
                this.setUser()
                return browser.close()
              }
              let data = event.url;
              console.log(data);
              let data2 = 'https://www.pagopar.com/';
              console.log(data === data2 );
              
              if (data === data2) {
                this.setUser()
                JSON.stringify(domain)
                return browser.close();
              }
              return true;
           });
            browser.on('loadstop').subscribe(event => {
              console.log("loadstop 5ww");
              return this.urlFun(event,browser);
           });
          }
        })
        .catch((err: any) => {
          sto.hide();
          //console.log(err.response._data.message);
          //this.error = err.response._data.message;
          return errorResponse(err);
        });
    },
    async urlFun(event: any,browser: any) {
      let domain = (new URL(event.url));
      let domain2 = (new URL(config.public.BASE_URL));
      if (domain.hostname === domain2.hostname) {
        this.setUser()
        return browser.close()
      }
      let data = event.url;
      console.log(data);
      let data2 = 'https://www.pagopar.com/';
      console.log(data === data2 );
      
      if (data === data2) {
        this.setUser()
        JSON.stringify(domain)
        return browser.close();
      }
      return true;
    },
          async signup (name,email,mobile,device_token,device_id,password,passwordConfirm,dni,referalCode) {
            sto.show()
  
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
              }).then(async (result) => {
                this.token = result;
                this.setUser()

                const router = useRouter();
                //router.push({ path: "/" })
  
                return navigateTo('/');
                //const router = useRouter();
                //router.push({ path: "/" });
              })
              .catch((err) => {
                this.error = err.response._data.message;
                return errorResponse(err);
              })
              sto.hide()
          },
          async getPromocode () {
            try {
              await useFetchAuth('/api/user/promocodes_list').then((res) =>{
                this.coupons = res?.promo_list
              }).catch((err) => {
                errorResponse(err)
              })
            } catch (err) {
              //console.log(err);
            }
          },
          
          async setLang(data:string) {
            sto.show()
            await useFetchAuth("/api/user/update/language", {
              method: "POST",
              body: {
                language: data,
              },
            })
              .then(async (result) => {
                sto.hide()
              })
              .catch((err) => {
                sto.hide()
                //console.log(err.response._data.message);
                //this.error = err.response._data.message;
                  return errorResponse(err);
              })
          },
          async delAccount(params: string) {
            sto.show();
            const data = await useFetchAuth("/api/user/delete", {
              method: "POST",
              body: {
                delete_reason: params,
                id: this.user.id,
              },
            })
              .then((result) => {
                this.user = null
                this.token = null
                this.show = true
    
                sto.hide();
                return navigateTo('/login')
    
              })
              .catch((err) => {
                errorResponse(err.response);
              });
          },
          async logout () {

            try {
              //$echo.leaveChannel(`Neos.User.${this.user.id}`);

                  const data = await useFetchAuth('/api/user/logout',{
                    method: "POST",
                    body: {
                      id: this.user.id,
                    },
                  }).then(async (result:any) => {
                  
                  this.user = null
                  this.token = null
                  this.show = true
                  return navigateTo('/login')  
                  //return navigateTo('/');

                  //window.location.pathname = '/login'
                  }).catch((err) => {
                    errorResponse(err)

                  this.user = null
                  this.token = null
                  this.show = true
                  return navigateTo('/login')  
                  })
              }
              catch (error) {
                errorResponse(error)
            }
          },
          async logout2 () {
            try {
              if (this.token != null) {
                return true;
              }
              $echo.leaveChannel(`Neos.User.${this.user.id}`);

                  const data = await useFetchAuth('/api/user/logout',{
                    method: "POST",
                    body: {
                      id: this.user.id,
                    },
                  }).then(async (result:any) => {
                  
                  this.user = null
                  this.token = null
                  this.show = true
                  return navigateTo('/login')  
                  //return navigateTo('/');

                  //window.location.pathname = '/login'
                  }).catch((err) => {
                    errorResponse(err)

                  this.user = null
                  this.token = null
                  this.show = true
                  return navigateTo('/login')  
                  })
              }
              catch (error) {
                errorResponse(error)
            }
          }
        }
  })


// make sure to pass the right store definition, `useUser` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot))
}

  async function logout() {
    useUser().logout()
  }

  async function logout2() {
    useUser().logout2()
  }

  async function setUser() {
    return useUser().setUser
  }

  return { setUser, getUser, removeUser, isLoggedIn, useUser, logout ,logout2 };
}
