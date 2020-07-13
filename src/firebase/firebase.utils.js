import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA2_kFJQjJNJ9l0osowOI37-3suNEHpaM4",
  authDomain: "e-comm-52c4f.firebaseapp.com",
  databaseURL: "https://e-comm-52c4f.firebaseio.com",
  projectId: "e-comm-52c4f",
  storageBucket: "e-comm-52c4f.appspot.com",
  messagingSenderId: "575866999951",
  appId: "1:575866999951:web:d72bb0c67ef1b2d0d5ccfa",
  measurementId: "G-6RD0GX57EC"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;