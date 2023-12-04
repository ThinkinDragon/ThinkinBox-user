import type { items } from './../types/booking.d';
import { defineStore } from "pinia"
const { errorResponse } = useBase()


  export const useItems = defineStore('items', {
    state: ():items => ({items:[{
      id:0,
      description: "",
      rate: "/",
      qty: "unit",
      amount:0,
      edit: true,
    }]}),
    getters:{
      getItems(state){
        state.items
      }
    },
    actions:{
      reset(state){
        state.$reset()
      },
      async storeToServer(id,data,total){
        
        if (total <= 0) return true
        const sto = useLoading()
        const router = useRouter()
        try {
          sto.show()
          await useFetchAuth(`/api/provider/trip/${id}/item`,{
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

      // make sure to pass the right store definition, `useItems` in this case.
      if (import.meta.hot) {
        import.meta.hot.accept(acceptHMRUpdate(useItems, import.meta.hot))
      }