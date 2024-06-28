// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

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

//test database
const firebaseConfig = {
    apiKey: "AIzaSyA9XL-smwP7Zc17qwd2sY4Y5Z_tBKXrJ3A",
    authDomain: "todo-app-test-blintdm.firebaseapp.com",
    projectId: "todo-app-test-blintdm",
    storageBucket: "todo-app-test-blintdm.appspot.com",
    messagingSenderId: "571383985461",
    appId: "1:571383985461:web:1f6c8e052def4c82a9087c"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };