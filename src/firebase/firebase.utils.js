import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBmFYmRZAFz03khfVpdQ_dX9yXZKvvN-jI",
    authDomain: "tagg-9192a.firebaseapp.com",
    databaseURL: "https://tagg-9192a.firebaseio.com",
    projectId: "tagg-9192a",
    storageBucket: "tagg-9192a.appspot.com",
    messagingSenderId: "433099258283",
    appId: "1:433099258283:web:91581830dfb543a1d9faee",
    measurementId: "G-PLD4MQN1H6"
  };

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();


  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});


  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;