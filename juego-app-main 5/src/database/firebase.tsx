// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8kkFC1GKXYV2EBfo25cXK9u7gErnrABg",
  authDomain: "memoria-utn.firebaseapp.com",
  projectId: "memoria-utn",
  storageBucket: "memoria-utn.appspot.com",
  messagingSenderId: "686682538511",
  appId: "1:686682538511:web:77aa79c9404dda3c07597a",
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();

export default firebaseConfig;
