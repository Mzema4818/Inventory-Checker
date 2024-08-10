// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "SECRET",
  authDomain: "SECRET",
  projectId: "SECRET",
  storageBucket: "SECRET",
  messagingSenderId: "SECRET",
  appId: "SECRET",
  measurementId: "SECRET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
const imgDB = getStorage(app)

export{firestore, imgDB}
