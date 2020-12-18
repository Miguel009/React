import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBOtxiziXqHE3zm22Xw2M8L5SgevmNAcbo",
    authDomain: "proyectosfr.firebaseapp.com",
    databaseURL: "https://proyectosfr.firebaseio.com",
    projectId: "proyectosfr",
    storageBucket: "proyectosfr.appspot.com",
    messagingSenderId: "349313304698",
    appId: "1:349313304698:web:61b6640fd621284a49d3c3"
  };
 const fb =  firebase.initializeApp(firebaseConfig);
 export const db = fb.firestore();