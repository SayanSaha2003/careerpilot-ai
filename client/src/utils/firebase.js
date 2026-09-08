import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: "careerpilot-ai-d03f2.firebaseapp.com",
    projectId: "careerpilot-ai-d03f2",
    storageBucket: "careerpilot-ai-d03f2.firebasestorage.app",
    messagingSenderId: "73563793229",
    appId: "1:73563793229:web:686fd3f2579da923477904",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication 
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const provider = new GoogleAuthProvider();
