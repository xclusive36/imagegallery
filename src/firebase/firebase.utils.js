import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCQRtN5uMxs4PilCHtBHPhcC5IEy8BL0uc",
    authDomain: "imagegallery-5feaf.firebaseapp.com",
    projectId: "imagegallery-5feaf",
    storageBucket: "imagegallery-5feaf.appspot.com",
    messagingSenderId: "779243916977",
    appId: "1:779243916977:web:d2579ff592348658dddc90",
    measurementId: "G-K6244054X1",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp);

export { db, auth };
