import { initializeApp } from 'firebase/app';
import { defineStore } from "pinia";
import type { ServiceState,Service,eta } from "~/types/home";
import { useThrottleFn, useDebounceFn } from '@vueuse/core'

const { errorResponse } = useBase();

export function useHome() {
  const sto = useLoading()
  const {loading,silentLoading} = storeToRefs(sto)

  const useService = defineStore("service", {
    state: () => ({
      tags: [],
      goods: [],
      selectedGood: {},
      tag: null,
      banners: [],
      services: [],
      items: [],
      selected_item:[],
      searchServices: [],
      service:null,
      providers: [] as Array<any>|any,
      providerMarkers: [] as Array<any>|any,
      provider: null,
      searchText: "",
      searchArray: [],
      estimate: null,
      direction:null,
      eta : null,
      selected: null,
      source:{
        s_address:null,
        s_longitude:null,
        s_latitude:null
      },
      destination:{
        d_address:null,
        d_longitude:null,
        d_latitude:null
      },
    }),
    getters: {
      getServices(state) {
        return state.services;
      },
      getTags(state) {
        return state.tags;
      },
      getItems(state){
        return state.items;

      },
      // getParentServices(state) {
      //   console.log();
      //   return state.services.filter((service) => service.parent_id == 0);
      // },
      // getServiceById(state) {
      //   this.service = (id:Number) => {
      //       state.services.find((service:Service) => service.id == id )
      //   }
      // },
      // getServiceById(state) {
      //   this.service = (search:string) => {
      //       state.services.find((service:Service) => service.name.en === search )
      //   }
      // },
    },
    actions: {
      async fetchServices() {
        try {
          if (this.services != null) return;
          await useFetchAuth("/api/user/service")
            .then((result) => {
              this.tags = result.tags;
              this.tag = result.tags[0];
              this.services = result.services;
              this.searchArray = result.search_services;
              this.searchServices = result.search_services;
            })
            .catch((err) => {
              errorResponse(err);
            });
        } catch (error) {
          errorResponse(error);
        }
      },
      async fetchBanners() {
        try {
          const data = await useFetchAuth("/api/user/banner")
            .then((result) => {
              this.banners = result;
            })
            .catch((err) => {
              errorResponse(err);
            });
        } catch (error) {
          errorResponse(error);
        }
      },
      async fetchService(id: number) {
        try {
          const data = await useFetchAuth("/api/user/service/" + id)
            .then((result) => {
              this.service = result;
            })
            .catch((err) => {
              errorResponse(err);
            });
        } catch (error) {
          errorResponse(error);
        }
      },
      async getServiceById(id: number) {
        sto.show()
        this.service = null
        let data
        if (this.searchServices.length == 0) {
          await this.fetchServices()
            .then((result) => {
              data = this.searchServices.filter((service: Service) => service.id == id);
            })
            .catch((err) => {
              errorResponse(err);
            });
        } else 
        data = this.searchServices.filter((service: Service) => service.id == id);
        this.service = data[0]
        sto.hide()
      },
            // provider listing
            async getPartnerByService(id: number) {
              try {
                sto.show()
                const {latitude, longitude } = storeToRefs(useAddress());
                const data = await useFetchAuth(`/api/user/show-providers`,{
                  method:'POST',
                  body:{
                    service_type_id: id,
                    latitude:latitude.value,
                    longitude:longitude.value,
      
                  }
                }).then((result)=>{
                  //console.log(result);
                  this.providers = result
                sto.hide()
                })
                .catch((err) => {
                  sto.hide()
                  errorResponse(err)
                })
              } catch (error) {
                sto.hide()
                errorResponse(error)
              }
            },
      async oldgetServiceByIdgetServiceById(id: number) {
        try {
          sto.show()
          const data = await useFetchAuth(`/api/user/child-service`,{
            method:'POST',
            body:{
              service_type_id: id
            }
            //ACCEPTED,STARTED,ARRIVED,PICKEDUP,DROPPED,PAYMENT,COMPLETED,IMAGE
          }).then((result)=>{
            console.log(result.child_services);
            this.service = result.child_services
          sto.hide()
          })
          .catch((err) => {
            sto.hide()
            errorResponse(err)
          })
        } catch (error) {
          sto.hide()
          errorResponse(error)
        }
      },
      async getEstimate(id,s_lat,s_lng,d_lat,d_lng,trip_address) {
        try {
          
          const route = useRoute();
          await useFetchAuth(`/api/user/estimate`,{
            method:'POST',
            body:{
              service_type: id,
              s_latitude: s_lat,
              s_longitude: s_lng,
              d_latitude: d_lat,
              d_longitude: d_lng,
              trip_address: trip_address,
              service_required: route.query.for

            }
            //ACCEPTED,STARTED,ARRIVED,PICKEDUP,DROPPED,PAYMENT,COMPLETED,IMAGE
          }).then((result:any)=>{
            this.estimate = result
          })
        } catch (error) {
          console.log(error);
          
          errorResponse(error)
        }
      },
      async getDir(s_lat:any,s_lng:any,d_lat:any,d_lng:any,trip_address:any) {
        try {
          
          const route = useRoute();
          await useFetchAuth(`/api/user/direction`,{
            method:'POST',
            body:{
              s_latitude: s_lat,
              s_longitude: s_lng,
              d_latitude: d_lat,
              d_longitude: d_lng,
              trip_address: trip_address,
              service_required: route.query.for

            }
            //ACCEPTED,STARTED,ARRIVED,PICKEDUP,DROPPED,PAYMENT,COMPLETED,IMAGE
          }).then((result:any)=>{
            this.direction = result
          })
        } catch (error) {
          console.log(error);
          
          errorResponse(error)
        }
      },
      async getMetricData() {
        try {
          const { s_latitude,s_longitude,d_latitude,d_longitude } = useAddress();

          const { data, pending, refresh } = await useAsyncData(() => useFetchAuth(`/api/user/metrics`,{
            method:'POST', body:{ s_latitude: s_latitude, s_longitude: s_longitude, d_latitude: d_latitude, d_longitude: d_longitude }
          }) 
          //, { watch: [s_latitude] }
          )

            this.eta = data.value;
            loading.value = pending.value;
            
        } catch (error) {
          errorResponse(error)
        }
      },
      async getProvidersData() {
        try {
          return true;
          console.log("hit providers data");
          const { currPos,s_latitude,s_longitude,d_latitude,d_longitude } = storeToRefs(useAddress());
          if (silentLoading.value) {
            return
          }

          //await useFire().initialize();
          setTimeout(async() => {

          const { data, pending, refresh } = await useAsyncData(() => useFetchAuth(`/api/user/show-providers`,{
            method:'POST', body:{ latitude: currPos.value.lat, longitude: currPos.value.lng }
          }) 
          , { watch: [currPos] }
          )
            if (!pending.value) {
            this.providers = data.value;
            if (this.providers?.length >0) {
            this.providers.forEach(async (element:any,index:number) => {
              console.log(element,index);
              console.log(typeof element == 'number');
              
              if (typeof element == 'number') {

                Object.assign( this.providers[index], {'id' : element});
                let datt = await useFire().getData("loc_p_"+element);
                console.log(datt);
                
                if (typeof datt != "undefined") {
                  this.providers[index] = datt;//await useFire().getData("loc_p_"+element);

                }
              }
            });
          }
            }
            silentLoading.value = pending.value;
          }, 500)
        } catch (error) {
          errorResponse(error)
        }
      },
    },
  });

    // make sure to pass the right store definition, `useService` in this case.
    // if (import.meta.hot) {
    //   import.meta.hot.accept(acceptHMRUpdate(useService, import.meta.hot))
    // }
  
  async function getEstimate(id:Number) {
    const { s_latitude,s_longitude,d_latitude,d_longitude } = useAddress()
    const { addresses } = useDeliveryAddresses();
    return await useService().getEstimate(id,s_latitude,s_longitude,d_latitude,d_longitude,addresses)
  }
  async function getDirection() {
    const { s_latitude,s_longitude,d_latitude,d_longitude } = useAddress()
    const { addresses } = useDeliveryAddresses();
    return await useService().getDir(s_latitude,s_longitude,d_latitude,d_longitude,addresses)
  }
  async function getEta() {
    return await useService().getMetricData()
  }

  async function getBanner() {
    return await useService().fetchBanners()
  }

  return { useService, getEstimate, getDirection, getEta, getBanner};
}
