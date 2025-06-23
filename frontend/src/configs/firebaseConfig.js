import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDk3wUXSqi6Z8FQSpEYW1y9xXxKwONyBrk",
  authDomain: "ndss-assignment.firebaseapp.com",
  projectId: "ndss-assignment",
  storageBucket: "ndss-assignment.firebasestorage.app",
  messagingSenderId: "56948979556",
  appId: "1:56948979556:web:d32bf8dc85031127e62c71",
  measurementId: "G-FKH79H1R4T",
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(app);
export const signInWithGoogle = () => signInWithPopup(auth, provider);
