import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBrNj8g3Jkzayi7tlgBMaiE3-xZvOda5R4",
    authDomain: "investment-app-87285.firebaseapp.com",
    projectId: "investment-app-87285",
    storageBucket: "investment-app-87285.appspot.com",
    messagingSenderId: "799872741222",
    appId: "1:799872741222:web:75b87065c10f7ade7da2a7",
    measurementId: "G-GL4RJZH7GZ"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
  
export { db };