
import { getAuth } from "firebase/auth";
import { initializeApp,getApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPVnKEAuy9-6-XTToUY63jh81MpSZmB9o",
  authDomain: "meal-maven-6d2c7.firebaseapp.com",
  projectId: "meal-maven-6d2c7",
  storageBucket: "meal-maven-6d2c7.appspot.com",
  messagingSenderId: "396876616289",
  appId: "1:396876616289:web:5866f28622e5d4d61c1020"
};

const app = initializeApp(firebaseConfig);
// const app = !getApp() ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
export { auth };

