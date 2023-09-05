// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX2dv9hx_8FkAmb2VJMdr0frmplRqloTU",
  authDomain: "chat--utn.firebaseapp.com",
  projectId: "chat--utn",
  storageBucket: "chat--utn.appspot.com",
  messagingSenderId: "797922630871",
  appId: "1:797922630871:web:99530eb8cdfd5e1461a492",
};

const firebaseApp = initializeApp(firebaseConfig);

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const db = getFirestore(firebaseApp);
export const auth = getAuth();

export default firebaseConfig;
