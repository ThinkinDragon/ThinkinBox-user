
export const useGoogleGeocode = () => {
  return reactive({
    processing: false,
    addresses:[],response:{},
    error: null as any,
    async geocode(lat:any,lng:any) {
      if (this.processing) return;
      this.error = null;
      this.processing = true;
      try {
        return await useFetchAuth(`/api/user/geocode`,{
          method:'POST', body:{ latitude: lat, longitude: lng }
        }).then((result:any) => {
          this.response = JSON.parse(result)
          this.processing = false;
          return this.response;
        }).catch((err:any) => {
          console.log(err);
          
        });
      } catch (err) {
        this.error = err;
      }
      this.processing = false;
    },
    async geocodeAddress(lat:any,lng:any) {
      if (this.processing) return;
      await this.geocode(lat,lng).then((result) => {
        if (result.results[0]) {
          return {
            address: result.results[0].formatted_address,
            lat: result.results[0].geometry.location.lat,
            lng: result.results[0].geometry.location.lng
          }
        } 
      }).catch((err) => {
        throw new Error("Error: " + err);
      });
    },
  });
}
