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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; // if we do not get back useAuth object from our auth.onAuthStateChanged in app.js

  // firebase give us back one of two types of object, query reference or query snapshot
  // reference is the 'current' place in the data base that we are asking for. we use reference object to tell firebase to either save data to this place or to get data fri this place
  // we perform out CRUD 'set,get,update,delete' methods on the DocumentReference object
  const userRef = firestore.doc(`users/${userAuth.uid}`) // here we query for the reference 'current place' of out authenticated user

  const snapShot = await userRef.get() // here we query for a snaphot of the reference created in the code above, to get back object that consist boolean value 'exists' that lets us determine whatever user is already in our database or not.
 
  if(!snapShot.exists) { // is statement, if our logged in use does not exists in out database then...
    const { displayName, email } = userAuth; // destructuring name and email from our userAuth object
    const createdAt = new Date(); // creating date to store information when our user sign in 

    try { // because it is a async function we do try, catch
      await userRef.set({ // here we are adding our user to the database, using destructured values of name, email and date
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) { // here we catch any error's while adding user to database
      console.log('error creating user', error.message)
    }
  }
  return userRef; // also we want to return userRef object in chance we want to use it to do other things.
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
  });

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;