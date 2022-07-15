// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA3Hk2kaofuVnVXhR4nfbhyddlJE00prxU',
  authDomain: 'vice-taco.firebaseapp.com',
  projectId: 'vice-taco',
  storageBucket: 'vice-taco.appspot.com',
  messagingSenderId: '949147002925',
  appId: '1:949147002925:web:4260a25105a64b692830a4'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
