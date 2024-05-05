// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBy_UgbPyfHaptTO2hBliu64P85koQiiBo",
  authDomain: "woofr-c79ab.firebaseapp.com",
  projectId: "woofr-c79ab",
  storageBucket: "woofr-c79ab.appspot.com",
  messagingSenderId: "856161994046",
  appId: "1:856161994046:web:7373cd47ebdd910e57186f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);
