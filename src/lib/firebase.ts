import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDCrzzES48YuFdV0U-18MnITRHVAeAELQ0",
  authDomain: "icebreaker-bc00f.firebaseapp.com",
  databaseURL: "https://icebreaker-bc00f-default-rtdb.firebaseio.com",
  projectId: "icebreaker-bc00f",
  storageBucket: "icebreaker-bc00f.firebasestorage.app",
  messagingSenderId: "996515019374",
  appId: "1:996515019374:web:d761839514d6fd687a047f",
  measurementId: "G-92HRBFFNS2"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
