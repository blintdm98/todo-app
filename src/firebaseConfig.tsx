// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// hosted database
// const firebaseConfig = {
//   apiKey: "AIzaSyCxo0Fk6JyaHuUeMcLfXVS545g-TUsQCHI",
//   authDomain: "todo-app-blintdm.firebaseapp.com",
//   projectId: "todo-app-blintdm",
//   storageBucket: "todo-app-blintdm.appspot.com",
//   messagingSenderId: "1080262121080",
//   appId: "1:1080262121080:web:d6122d896d7cc29d733f8d"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDislSxaHHWGYuNkR0ZQ6p5lAjwwgswV8c",
  authDomain: "todo-app-esment.firebaseapp.com",
  projectId: "todo-app-esment",
  storageBucket: "todo-app-esment.appspot.com",
  messagingSenderId: "281464768011",
  appId: "1:281464768011:web:27ed736767396bd3efa90e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };