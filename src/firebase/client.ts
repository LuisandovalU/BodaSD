import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2FZUCSZH-nghQQgnC3EjMXC4T-63I0rM",
  authDomain: "bodasd-64348.firebaseapp.com",
  projectId: "bodasd-64348",
  storageBucket: "bodasd-64348.firebasestorage.app",
  messagingSenderId: "15762489905",
  appId: "1:15762489905:web:358e31cfd725c774a70b10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
