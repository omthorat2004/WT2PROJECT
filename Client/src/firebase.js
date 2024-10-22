// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0AoigrbYcmLzWgL0zvR4DfahRxYn763k",
  authDomain: "projectmanagement-343ff.firebaseapp.com",
  databaseURL: "https://projectmanagement-343ff-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "projectmanagement-343ff",
  storageBucket: "projectmanagement-343ff.appspot.com",
  messagingSenderId: "30898562314",
  appId: "1:30898562314:web:8866ad3f7bd2c4903c46f3",
  measurementId: "G-EYF307M0B9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)
const analytics = getAnalytics(app);