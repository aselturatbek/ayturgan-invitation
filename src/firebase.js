import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlo-c14FaSoJ3xohtK-5sTEAMTzXD_7Ac",
  authDomain: "ayturgan-invitation.firebaseapp.com",
  projectId: "ayturgan-invitation",
  storageBucket: "ayturgan-invitation.firebasestorage.app",
  messagingSenderId: "578950730123",
  appId: "1:578950730123:web:38914405cb6c3c8b27df8e",
  measurementId: "G-BMPF2B08MC",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});