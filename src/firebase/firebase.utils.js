import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

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
  export const storage = firebase.storage();


  export const StoreUser = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();
    
    if (!snapShot.exists) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({displayName, email, createdAt, ...additionalData})
        
      } catch (error) {
        console.log("error at creating user", error.message)
      }
    }
  }

  export const storeQuestion = async (userAuth, data) => {
    if (!userAuth) return alert("Unauthenticated User");

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();
    
    if (snapShot.exists) {
      try {
        await userRef.set({Question: data}, {merge: true})
        
      } catch (error) {
        alert("Cannot store the submission")
      }
    } else {
      alert("user not stored in database")
    }
  }

  export const storeImage = async (userAuth, data, setDisplayImage) => {
    if (!userAuth) return alert("Unauthenticated User");

    const storageRef = storage.ref();
    const imageRef = storageRef.child(`${userAuth.email}`)
    try {
      await imageRef.put(data).then(function(snapshot) {
      })

    } catch(error) {
        alert("Error in uplaoding file", error)
    }
    
    
    imageRef.getDownloadURL().then((url) => {
      setDisplayImage(url);
    })
    
  }


  export const QuestionList =() => {
    var list = [];

    
    firestore.collection("users").get().then(
        function(snapShot) {
            snapShot.forEach((doc) => {
                if (doc.data()["Question"])
                {list.push([doc.data()["Question"],doc.data()["email"]])}
            })
        }
    )

    return list;
      }

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});


  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;