// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: 'AIzaSyB_cyMfCHOudHpKQih-xM7etNxdHOufdP0',
   authDomain: 'simple-movie-app-f73de.firebaseapp.com',
   projectId: 'simple-movie-app-f73de',
   storageBucket: 'simple-movie-app-f73de.appspot.com',
   messagingSenderId: '23944063554',
   appId: '1:23944063554:web:583e5f3cde0eca84769bdb',
   measurementId: 'G-LF596V8TW6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
