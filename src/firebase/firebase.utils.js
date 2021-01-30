import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyDNRLxNi5p8VtpI16x-UsKyBToD4YKIob8",
    authDomain: "e-commerce-ztm-course.firebaseapp.com",
    projectId: "e-commerce-ztm-course",
    storageBucket: "e-commerce-ztm-course.appspot.com",
    messagingSenderId: "630580500",
    appId: "1:630580500:web:06795a5c09c21ed1928e01",
    measurementId: "G-SLW78H860N"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
  });
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;