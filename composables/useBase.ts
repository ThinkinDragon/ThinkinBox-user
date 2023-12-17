import { Toast } from 'vant'
import { v4 as uuid } from 'uuid';

export function useBase() {
  const platform = (type) => {
    if (process.client) {
      return type === 'web'
    }
  }

  function errorResponse(err:any) {

    try {
      //useFireAnalytics().logEvent("error_log","ERROR",uuid(),JSON.stringify(err));
      //useBugsnag().notify(JSON.stringify(err));

   console.log(err,err?.status,err._data.error); 
    if (err?.status == 401) {
      //notiError(4000,err?._data?.message,err?._data?.error)
      //notiError(4000,err?.status,err?.message)
      //return await navigateTo('/login')
      // const {logout} = useAuth()
      // logout()
      //return window.location.pathname = '/login'
      const router = useRouter()

      return router.push('/login')
    }else if (err?.status == 403) {
      //notiError(4000,err?._data?.message,err?._data?.error)
      notiError(4000,err?.status,err?.message)
      //return await navigateTo('/login')
      //return window.location.pathname = '/login'
      //return router.push('/login')
    }else if(err?.status == 422 ){
      //console.log(err?._data);
      return notiError(4000,err?._data?.message ?? err._data.error,err?._data['error'])
    }else if(err?.status == 500 ){
      //console.log(err?._data);
      return notiError(4000,err?._data['error'],err?._data['error'])
    }else{
      return notiError(4000,err,err)
    }
  } catch (error) {
   //console.log(error);
    
  }
  }

  async function notiSuccess(time:number = 4000,title:string,text:string) {
    return Toast({
      message: title,
      position: 'bottom',
    });
    //return notify({ group: "success", title: title, text: text}, time) 
  }

  async function notiError(time:number = 4000,title:string,text:string) {
    const toast = useToast()

    return toast.add({
      id: 'my-notification',
      color:'red',
      timeout:time,
      title: JSON.stringify(title),
    });
    return Toast({
      message: JSON.stringify(title),
      position: 'top',duration:7*1000,
    });
    //return notify({ group: "error", title: title, text: text }, time)
  }

  async function notiInfo(title:string) {
    const toast = useToast()

    return toast.add({
      id: 'my-notification',
      color:'red',
      timeout:time,
      title: JSON.stringify(title),
    });
    return Toast({
      message: JSON.stringify(title),
      position: 'bottom',
    });
    //return notify({ group: "info", title: title, text: text }, time )
  }

  const haversineDistance = (pos1, pos2) => {
    const R = 3958.8; // Radius of the Earth in miles
    const rlat1 = pos1.lat * (Math.PI / 180); // Convert degrees to radians
    const rlat2 = pos2.lat * (Math.PI / 180); // Convert degrees to radians
    const difflat = rlat2 - rlat1; // Radian difference (latitudes)
    const difflon = (pos2.lng - pos1.lng) * (Math.PI / 180); // Radian difference (longitudes)
    const d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return d;
  };
  
  return { platform,errorResponse,notiInfo, haversineDistance }
}
