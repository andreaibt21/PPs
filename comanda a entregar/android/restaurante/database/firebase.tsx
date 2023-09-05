// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKLTsajRjEyzkm5X7s9FXK6vd1bcInF7M",
  authDomain: "utn-comanda.firebaseapp.com",
  projectId: "utn-comanda",
  storageBucket: "utn-comanda.appspot.com",
  messagingSenderId: "590722154750",
  appId: "1:590722154750:web:42931277b79e1a227d65af"
};

const firebaseApp = initializeApp(firebaseConfig);

if (!getApps().length) {
    initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);


export default firebaseConfig;