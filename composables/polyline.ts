import { useLocalStorage } from '@vueuse/core'
import type { GoogleMap } from '@capacitor/google-maps';
export const usePolylineReact = () => {
  return reactive({
    polyline: useLocalStorage("local/polyline",null),
    startLocation: useLocalStorage("local/startLocation",{ id: undefined, coordinate: {} }),
    endLocation: useLocalStorage("local/endLocation",{ id: undefined, coordinate: {} }),
    partnerLocation: useLocalStorage("local/partnerLocation",{ id: undefined, coordinate: {} }),
    pathBounds: useLocalStorage("local/pathBounds",{ id: undefined, bounds: {} }),
    async drawRoute(map:GoogleMap,direction: any) {
      if (typeof direction != "undefined" && direction != null) {
        let pat = this.decodePolyline(direction.routes[0].overview_polyline.points);
        this.startLocation.coordinate =  direction.routes[0].legs[0].start_location;
        this.pathBounds.bounds = structuredClone(toRaw(direction.routes[0].bounds));
        this.endLocation.coordinate = direction.routes[0].legs[0].end_location;
  
        const northeast = direction.routes[0].bounds.northeast;
        const southwest = direction.routes[0].bounds.southwest;
  
        // Calculate the map center of the path bounds
        const mapCenter = {
          lat: (northeast.lat + southwest.lat) / 2,
          lng: (northeast.lng + southwest.lng) / 2,
        };
  
        const lines = [
          {
            path: pat,
            strokeColor: "#AA00FF",
            strokeOpacity: 1.0,
            strokeWeight: 3,
            geodesic: true,
            tag: "test",
          },
        ];
  
        this.polyline = await map.addPolylines(lines);
        this.polyline = this.polyline[0];
        this.startLocation.id = await map.addMarker({
          coordinate: this.startLocation.coordinate,
        });
        //pathBounds.value.id = map.fitBounds({bounds:pathBounds.value.bounds})
        this.endLocation.id = await map.addMarker({
          coordinate: this.endLocation.coordinate,
        });
  
        // {
        //   northeast:{...northeast},
        //   southwest:{...southwest}
        // }
        map.fitBounds(this.pathBounds.bounds,25);
        //map.setPadding({top:'1',left:'1',right:'1',bottom:'5'})
        // await map.setCamera({
        //   coordinate: { ...mapCenter },
        //   zoom: 12,
        //   animate: true,
        //   animationDuration: 3000,
        // });
  
        // map.value.addPolylines({
        //     ...direction.value.routes[0]
        // })
      }
    },
    decodePolyline(polyline: any) {
      const coordinates: latLng[] = [];
      let index = 0;
      let lat = 0;
      let lng = 0;
  
      while (index < polyline.length) {
        let shift = 0;
        let result = 0;
        let byte;
  
        do {
          byte = polyline.charCodeAt(index++) - 63;
          result |= (byte & 0x1f) << (shift * 5);
          shift++;
        } while (byte >= 0x20);
  
        const dlat = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
        lat += dlat;
  
        shift = 0;
        result = 0;
  
        do {
          byte = polyline.charCodeAt(index++) - 63;
          result |= (byte & 0x1f) << (shift * 5);
          shift++;
        } while (byte >= 0x20);
  
        const dlng = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
        lng += dlng;
  
        coordinates.push({ lat: lat * 1e-5, lng: lng * 1e-5 });
      }
  
      return coordinates;
    },
    async clearMap(map:any) {
      console.log(this.polyline);
      if (this.polyline != "undefined" && this.polyline != null) {
        await this.removePolyline(map);
      }
      if (
        this.startLocation.id != "undefined" &&
        this.startLocation.id != null
      ) {
        await this.rmMark(map,this.startLocation.id);
        this.startLocation = { id: undefined, coordinate: {} };
      }
      if (this.endLocation.id != "undefined" && this.endLocation.id != null) {
        await this.rmMark(map,this.endLocation.id);
        this.endLocation = { id: undefined, coordinate: {} };
      }
    },
    async rmMark(map:any,params: string) {
      await map.removeMarkers([params]);
    },
    async removePolyline(map:any) {
      console.log("removing polyline");
      console.log(this.polyline);
    
      map.removePolylines([this.polyline]);
      this.polyline = null;
    },
  })
}
