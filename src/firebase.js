import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyB5di-dIkRnWsUujcv-_mpn3Erx-xvbNjA",
    authDomain: "snapchat-clone-bfeb0.firebaseapp.com",
    projectId: "snapchat-clone-bfeb0",
    storageBucket: "snapchat-clone-bfeb0.appspot.com",
    messagingSenderId: "874723341635",
    appId: "1:874723341635:web:03d6a3a4c9c5b901b5ebf6",
    measurementId: "G-SVQG2NPYR8"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, storage, provider };