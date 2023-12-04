import database from "../lib/firebase";
import {ref as refDb, onValue} from "firebase/database"

export function useFire() {


  async function setData(path: string, data: any) {
    try {
      await refDb(database, path);
      console.log("Data written to database");
    } catch (error) {
      console.error(error);
    }
  }

  async function getData(path: string) {
    try {
      
      console.log("firebase DB path: " + path);

      if ( path =='loc_p_[object Object]') {
        return
      }

      var data = await refDb(database, `${path}/`);
      let data2;
      onValue(data, (snapshot) => {
        data2 = snapshot.val();
      });
      if ( data2 ) {
        return data2;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return {
    setData,
    getData,
  };
}
