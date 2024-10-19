// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFlW7BZ6JHpLeVTIkWakpRAwUd9dVdkT0",
  authDomain: "projeto-bazar-38c5f.firebaseapp.com",
  projectId: "projeto-bazar-38c5f",
  storageBucket: "projeto-bazar-38c5f.appspot.com",
  messagingSenderId: "384344383125",
  appId: "1:384344383125:web:90119a5ce52e3f3011059c",
  measurementId: "G-9LDME4Y7GX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);