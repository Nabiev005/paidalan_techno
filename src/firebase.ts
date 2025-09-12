import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqrYDeFW511svNRtnOZBU1qGWuZ_ILZPg",
  authDomain: "paidalan.firebaseapp.com",
  projectId: "paidalan",
  storageBucket: "paidalan.firebasestorage.app",
  messagingSenderId: "63638234806",
  appId: "1:63638234806:web:88adb826b6489ec1ace817",
  measurementId: "G-9RPP6SPB36"
  
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app); // 👈 Firestore коштук

export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);
