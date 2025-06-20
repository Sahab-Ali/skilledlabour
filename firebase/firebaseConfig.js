import { initializeApp } from "firebase/app";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBPXtmATUvwEFp1u6oomNScsF1Na-BkPF4",
  authDomain: "skilledlabourex.firebaseapp.com",
  projectId: "skilledlabourex",
  storageBucket: "skilledlabourex.appspot.com",
  messagingSenderId: "474992391287",
  appId: "1:474992391287:web:13a2c9864a03e5f6f40272",
  measurementId: "G-RB8JKBG1D2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence for React Native
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

// Export
export { app, auth, db };
