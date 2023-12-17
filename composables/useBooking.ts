import { defineStore, storeToRefs } from "pinia";
import  type { BookingState,Booking, Status,ChatElement ,Provider } from "~/types/booking";
import { InAppBrowser , InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser';

export function useBooking() {
  
  const { errorResponse } = useBase()
  const sto = useLoading()
  const  {loading} = storeToRefs(sto)

  const config = useRuntimeConfig();

  const useBookings = defineStore("booking", {
      persist: { enabled: true,exclude:['booking']},
    state: () => ({      
      recentBookings: [] as Booking[],
      bookings: [] as Booking[],
      booking: null as Booking | null,
      provider: null as Provider| null,
      chat : null as ChatElement | null,
      stripe : null,
    }),
    getters: {
      getBookings(state) {
        return state.bookings;
      },
      getOngingBookings(state) {
          const status = ["SEARCHING", "ACCEPTED", "STARTED", "ARRIVED", "PICKEDUP", "DROPPED"]
        return state.bookings.filter((booking) => status.includes(booking.status) 
        //&&  (booking.user_rated == 0)
        );
      },
      //'SETUP','SEARCHING','CANCELLED','ACCEPTED','STARTED','ARRIVED','PICKEDUP','DROPPED','COMPLETED','SCHEDULED','SCHEDULES'
      getCompletedBookings(state) {
        return state.bookings.filter((booking) => booking.status === "COMPLETED");
      },
      getUpcomingBookings(state) {
        return state.bookings.filter((booking) => booking.status === "SCHEDULED");
      },
      getBookingById(state) {
        return (id:Number) => {state.bookings.find((booking:Booking) => booking.id == id )}
      },
    },
    actions: {
      async fetchBookings() {
        try {
          //if (this.bookings == undefined || this.bookings == []) {
            await useFetchAuth("/api/user/trips").then((result) => {
              this.bookings = result;
              this.recentBookings = {...this.getOngingBookings,...this.getCompletedBookings};
              }).catch((err) => {
                errorResponse(err)
              })
          //}
        } catch (error) {
          errorResponse(error)
        }
      },
      async flowBooking(id:number) {
        if (id == undefined) return true;
        try {
          await useFetchAuth(`/api/user/request/check/${id}`).then((result)=>{


            this.booking = result?.data
            this.provider = result?.data?.provider
            this.chat = result?.data?.chat

            if (result.data == null) {
              this.booking = null
              return navigateTo('/')
            }
          }).catch((err) => {
            return errorResponse(err)
          })
        } catch (error) {
          return errorResponse(error)
        }
      },

      async cancelBooking(id,comment) {
        try {
          const data = await useFetchAuth(`/api/user/cancel/request`,{
            method:'POST',
            body:{
              request_id:id,
              cancel_reason:comment,
            }
            //ACCEPTED,STARTED,ARRIVED,PICKEDUP,DROPPED,PAYMENT,COMPLETED,IMAGE
          }).then(()=>{
            this.booking = null
            return navigateTo('/')
          })
          .catch((err) => {
            errorResponse(err)
          })
          this.flowBooking(id)
        } catch (error) {
          errorResponse(error)
        }
      },

      async sendMessage(id,message) {
        try {
          const data = await useFetchAuth(`/api/user/chat`,{
            method:'POST',
            body:{
              request_id: id,
              message:message,
            }
            //ACCEPTED,STARTED,ARRIVED,PICKEDUP,DROPPED,PAYMENT,COMPLETED,IMAGE
          }).catch((err) => {
            errorResponse(err)
          })
          this.flowBooking(id)
        } catch (error) {
          errorResponse(error)
        }
      },

      async getStripe(id,tip) {
        try {
          const data = await useFetchAuth(`/api/user/init-stripe-payment`,{
            method:'POST',
            body:{
              request_id: id,
              tips:tip,
            }
            //ACCEPTED,STARTED,ARRIVED,PICKEDUP,DROPPED,PAYMENT,COMPLETED,IMAGE
          }).then((result)=>{
            this.stripe = result
            return result
          }).catch((err) => {
            errorResponse(err)
          })
        } catch (error) {
          errorResponse(error)
        }
      },

      async stripeResponce(id,status) {
        try {
          sto.show()
          const data = await useFetchAuth(`/api/user/stripe-payment`,{
            method:'PATCH',
            body:{
              request_id:id,
              status: status,
            }
            //ACCEPTED,STARTED,ARRIVED,PICKEDUP,DROPPED,PAYMENT,COMPLETED,IMAGE
          }).catch((err) => {
            errorResponse(err)
          })
          sto.hide()
          this.flowBooking(id)
        } catch (error) {
          errorResponse(error)
        }
      },

      async rateBooking(id,status,comment) {
        try {
          await useFetchAuth(`/api/user/rate/provider/${id}`,{
            method:'POST',
            body:{
              rating:status,
              comment:comment,
            }
            //ACCEPTED,STARTED,ARRIVED,PICKEDUP,DROPPED,PAYMENT,COMPLETED,IMAGE
          }).then(()=>{
            this.flowBooking(id)
            //return navigateTo('/')
          }).catch((err) => {
            errorResponse(err)
          })
          this.flowBooking(id)
        } catch (error) {
          errorResponse(error)
        }
      },
      
      async makePayment(request_id:number,gateway:String,tips:number) {
          await useFetchAuth('/api/user/payment',{
            method: "POST",
            body: {
              request_id: request_id,
              payment_mode: gateway,
              tips: tips,
            },
          }).then(async(res:any) =>{

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
                  return this.urlFun(event,browser,request_id);
               });
                browser.on('exit').subscribe(event => {
                  console.log("exit 2ww");
    
                  return this.urlFun(event,browser,request_id);
               });
                browser.on('loaderror').subscribe(event => {
                  console.log("loaderror 3ww");
    
                  return this.urlFun(event,browser,request_id);
               });
                browser.on('loadstart').subscribe(event => {
                  console.log("loadstart 4ww");
                  let domain = (new URL(event.url));
                  let domain2 = (new URL(config.public.BASE_URL));
                  if (domain.hostname === domain2.hostname) {
                    this.flowBooking(request_id)
                    return browser.close()
                  }
                  let data = event.url;
                  console.log(data);
                  let data2 = 'https://www.pagopar.com/';
                  console.log(data === data2 );
                  
                  if (data === data2) {
                    this.flowBooking(request_id)
                    JSON.stringify(domain)
                    return browser.close();
                  }
                  return true;
               });
                browser.on('loadstop').subscribe(event => {
                  console.log("loadstop 5ww");
                  return this.urlFun(event,browser,request_id);
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

        urlFun(event: any,browser: any,id:number) {
          let domain = (new URL(event.url));
          let domain2 = (new URL(config.public.BASE_URL));
          if (domain.hostname === domain2.hostname) {
            this.flowBooking(id)
            return browser.close()
          }
          let data = event.url;
          console.log(data);
          let data2 = 'https://www.pagopar.com/';
          console.log(data === data2 );
          
          if (data === data2) {
            this.flowBooking(id)
            JSON.stringify(domain)
            return browser.close();
          }
          return true;
        },

      getbyId(id){
        let data = this.getBookingById
        return data(id)
      },

      //wallet api

      async getStripeWallet(id) {
        try {
          const data = await useFetchAuth(`/api/user/init-stripe-payment-wallet`,{
            method:'POST',
            body:{
              amount: id,
            }
            //ACCEPTED,STARTED,ARRIVED,PICKEDUP,DROPPED,PAYMENT,COMPLETED,IMAGE
          }).then((result)=>{
            this.stripe = result
            return result
          }).catch((err) => {
            errorResponse(err)
          })
        } catch (error) {
          errorResponse(error)
        }
      },

      async stripeResponceWallet(id) {
        try {
          sto.show()
          const data = await useFetchAuth(`/api/user/stripe-payment-wallet`,{
            method:'PATCH',
            body:{
              amount: id,
            }
            //ACCEPTED,STARTED,ARRIVED,PICKEDUP,DROPPED,PAYMENT,COMPLETED,IMAGE
          }).catch((err) => {
            errorResponse(err)
          })
          sto.hide()
          const {useUser} = useAuth()
          useUser.setUser()
          //this.flowBooking(id)
        } catch (error) {
          errorResponse(error)
        }
      },
            //wallet api

            async setProvider(data) {
                this.provider = data
            },
    },
  });

  // make sure to pass the right store definition, `useBookings` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBookings, import.meta.hot))
}

  async function rating(id,rating,comment) {
    return await useBookings().rateBooking(id,rating,comment)
  }

  async function sendMessage(id,message) {
    return await useBookings().sendMessage(id,message)
  }

  async function cancel(id,reason) {
    return await useBookings().cancelBooking(id,reason)
  }

  async function live(id) {
    if (id == '0') return true;
    // $echo.private('Neos.partner-location.' + id)
    // .listen('PartnerLocation', (provider) => {
    //   useBookings().setProvider(provider)
    // });
  }

  return {rating, useBookings,sendMessage,cancel,live };
}
