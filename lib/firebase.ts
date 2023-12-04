// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvJDeqXeWRyUteqlMeQdiTJEN0gjDs5z4",
  authDomain: "vigoapp-307518.firebaseapp.com",
  databaseURL: "https://vigoapp-307518-default-rtdb.firebaseio.com",
  projectId: "vigoapp-307518",
  storageBucket: "vigoapp-307518.appspot.com",
  messagingSenderId: "642331810738",
  appId: "1:642331810738:web:930e306a557fdc3693e2ab",
  measurementId: "G-39KBZRPJBX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getDatabase(app);