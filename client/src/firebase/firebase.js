import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';



const firebaseConfig = {
  apiKey: "AIzaSyBAe3VYgYSxEqco2hbOyqgPpYqvGgdCXNo",
  authDomain: "blood-donate-e4fbd.firebaseapp.com",
  projectId: "blood-donate-e4fbd",
  storageBucket: "blood-donate-e4fbd.firebasestorage.app",
  messagingSenderId: "700834237736",
  appId: "1:700834237736:web:aadf936f481fe275b1141d"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);