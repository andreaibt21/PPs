
// // Import the functions you need from the SDKs you need
 import { initializeApp, getApps } from "firebase/app";
 import { getAuth } from "firebase/auth";
 import 'firebase/firestore';
 import { getFirestore } from "firebase/firestore";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAD5uLWGQUpUpX94tuwdfeZOidX-zsCJII",
//   authDomain: "db-login-app-59134.firebaseapp.com",
//   projectId: "db-login-app-59134",
//   storageBucket: "db-login-app-59134.appspot.com",
//   messagingSenderId: "105086574080",
//   appId: "1:105086574080:web:9ccd1494c155e5e073c2e5"
// };

// const firebaseApp = initializeApp(firebaseConfig);

// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFmRdHMdfOwLwW_HE971ZexsZlWqHtcY4",
  authDomain: "qr-app-utn.firebaseapp.com",
  projectId: "qr-app-utn",
  storageBucket: "qr-app-utn.appspot.com",
  messagingSenderId: "1067891166261",
  appId: "1:1067891166261:web:bf5b3dce9204595409357c"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
 const firebaseApp = initializeApp(firebaseConfig);



if (!getApps().length) {
    initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const db = getFirestore(firebaseApp);

export default firebaseConfig;