import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDEgQWxf4lUo5E3QLui9DtIwRj5f23yQc8",
  authDomain: "my-facebook-22867.firebaseapp.com",
  databaseURL: "https://my-facebook-22867.firebaseio.com",
  projectId: "my-facebook-22867",
  storageBucket: "my-facebook-22867.appspot.com",
  messagingSenderId: "1099488324946",
  appId: "1:1099488324946:web:474b46a915d0e49c6b5e8b",
  measurementId: "G-NLRTL5MRZ6",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();

export { auth, provider };
export default db;
