import { defineStore } from "pinia"
import type { trip_addresses, trip_address} from "./../types/booking.d";
import { v4 as uuid } from 'uuid';

const { errorResponse } = useBase()

  export const useDeliveryAddresses = defineStore('addresses', {
    state: () => {
      return {
        addresses: [] as trip_addresses | [],
        select_trip_address: null as trip_address | null 
      }
    },
    getters:{
      getItems(state){
        const allItems = state.addresses.reduce((items, cart) => items.concat(cart.items), []);
        return allItems;
      },
      getAddress(state){
        return  (id:any) => {
          let data = state.addresses.findIndex((obj => obj.id == id));
          return state.addresses[data];
        };
         
      },
      getAddressCount(state){
        const totalItems = state.addresses.length;
        return totalItems;
      },
      getItemTotal(state){
        const allItems = state.addresses.reduce((items, cart) => items.concat(cart.items), []);
        const itemTotal = allItems.reduce((total, cart) => total + (cart.price * cart.qty) , 0);
        return itemTotal;
      }
    },
    actions:{
      async pushAddress(data:trip_address){
        data.id = uuid()
        this.select_trip_address = data        
        this.addresses.push(this.select_trip_address)
      },
      async updateAddress(data:trip_address){
        let objIndex = this.addresses.findIndex((obj => obj.id == data.id));
        this.addresses[objIndex] = {...data,...this.addresses[objIndex]};
      },
      async storeToServer(id,data,total){
        
        if (total <= 0) return true
        const sto = useLoading()
        const router = useRouter()
        try {
          sto.show()
          await useFetchAuth(`/api/provider/trip/${id}/address`,{
            method:'POST',
            body:{
              item_data:data,
              item_fare:total
            }
          }).then((result) => {
            router.back()
          })
          .catch((err:any) => {
            errorResponse(err)
          })
          sto.hide()
        } catch (error) {
          sto.hide()
          errorResponse(error)
        }
      }
    },
  })

  // {
  //   id: 0,
  //   comments: "",
  //   rate: "",
  //   qty: 0,
  //   amount: 0,
  //   weight: 0,
  //   image:"",
  //   edit: false,
  //   address: "",
  //   latitude: 0,
  //   longitude: 0,
  //   items: [],
  //   status: 0,
  // }

    // make sure to pass the right store definition, `useDeliveryAddresses` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDeliveryAddresses, import.meta.hot))
}