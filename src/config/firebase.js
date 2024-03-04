import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCeXv3dNXpBu-9XJSIIFGT-wQt46LdHu1c",
  authDomain: "fir-1-5fc8c.firebaseapp.com",
  projectId: "fir-1-5fc8c",
  storageBucket: "fir-1-5fc8c.appspot.com",
  messagingSenderId: "423621441219",
  appId: "1:423621441219:web:84c1f6f29765c503b05476",
  measurementId: "G-2BT446LSRQ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
