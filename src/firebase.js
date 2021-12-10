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

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const analytics = firebase.analytics();
const storage = firebase.storage();

const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    analytics.logEvent('login');
    const query = await db
      .collection("users")
      .doc(user.uid)
      .get();
    if (!query.exists) {
      analytics.logEvent('sign_up');     
      await db.collection("users").doc(user.uid).collection('myStocks');
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    analytics.logEvent('login');
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    analytics.logEvent('login');
    const query = await db
      .collection("users")
      .doc(user.uid)
      .get();
    if (!query.exists) {
      analytics.logEvent('sign_up');  
      await db.collection("users").doc(user.uid).collection('myStocks');
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  auth.signOut();
};

export {
  auth,
  db,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
  storage
};