
export const useGoogleAutoComplete = () => {
  return reactive({
    processing: false,
    addresses:[],
    response:{},
    detail:{},
    error: null as any,
    async autocomplete(input:string,lat:any,lng:any) {
      if (this.processing) return;
 
      this.error = null;
      this.processing = true;
      try {
        await useFetchAuth(`/api/user/autocomplete`,{
          method:'POST', body:{ input:input,latitude: lat, longitude: lng }
        }).then((result:any) => {  
          this.response = JSON.parse(result)
          this.addresses = this.response.predictions;
          this.processing = false;
          return this.response;
        }).catch((err:any) => {
          this.error = err;
        });
      } catch (err) {
        this.error = err;
      }
      this.processing = false;
      return this.addresses;

    },
    async autocompleteDetail(input:string) {
      if (this.processing) return;
 
      this.error = null;
      this.processing = true;
      try {
        await useFetchAuth(`/api/user/autocomplete/detail`,{
          method:'POST', body:{ place_id:input}
        }).then((result:any) => {  
          let data = JSON.parse(result)
           this.detail = data.result;
          this.processing = false;
          return this.detail;
        }).catch((err:any) => {
          this.error = err;
        });
      } catch (err) {
        this.error = err;
      }
      this.processing = false;
      return this.detail;

    },
    ///autocomplete/detail
  });


}
