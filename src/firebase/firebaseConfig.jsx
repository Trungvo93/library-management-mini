// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJBCieEV5AtaBQkqxsagBOP7D5sXHObKQ",
  authDomain: "fir-6d711.firebaseapp.com",
  databaseURL:
    "https://fir-6d711-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-6d711",
  storageBucket: "fir-6d711.appspot.com",
  messagingSenderId: "43272813810",
  appId: "1:43272813810:web:286dcd8ac819f8a0e7246b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
