// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCInPEx5F6I4l_PzB-DoOWviLphSQZDr3E",
  authDomain: "alarma-utn.firebaseapp.com",
  projectId: "alarma-utn",
  storageBucket: "alarma-utn.appspot.com",
  messagingSenderId: "785126861094",
  appId: "1:785126861094:web:3fa7ed6c9e150d23be79e7"
};

if (!getApps().length) {
    initializeApp(firebaseConfig);
}

export const auth = getAuth();

export default firebaseConfig;