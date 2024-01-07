// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cheang-45bc7.firebaseapp.com",
  projectId: "cheang-45bc7",
  storageBucket: "cheang-45bc7.appspot.com",
  messagingSenderId: "1081332024804",
  appId: "1:1081332024804:web:bf1d8ab6d74a96c84573f1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
