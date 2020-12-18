import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
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
 export const firestore = fb.firestore();
 export const auth = fb.auth();
 export const generateUserDocument = async (user, additionalData) => {
   console.log(user);
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      const { email, displayName, photoURL } = user;
      try {
        await userRef.set({
          displayName,
          email,
          photoURL,
          ...additionalData
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
    return getUserDocument(user.uid);
}

const getUserDocument = async uid => {
    if (!uid) return null;
    try {
      const userDocument = await firestore.doc(`users/${uid}`).get();
      return {
        uid,
        ...userDocument.data()
      };
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
  };