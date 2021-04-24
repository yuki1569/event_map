import firebase from "firebase/app";
import "firebase/auth"; 
import "firebase/firestore"; 
// import { eventDB } from '../lib/db'

export const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMEIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

export const auth = firebase.auth();
export const fireStoreDB = firebase.firestore();
export const Firebase = firebase;


export const Login = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result: any) {
      return result;
    })
    .catch(function (error) {
      console.log(error);
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

// ログイン状態の検知
export const listenAuthState = (dispatch: any) => {
  return firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      dispatch({
        type: "login",
        payload: {
          user,
        },
      });
    } else {
      // User is signed out.
      // ...
      dispatch({
        type: "logout",
      });
    }
  });
};

export const firebaseUser = () => {
  return firebase.auth().currentUser;
};

// export const userId = firebaseUser().uid

// let user = firebase.auth().currentUser; 
// export const name, email, photoUrl, uid, emailVerified;
// if (user != null) {
//   name = user.displayName;
//   email = user.email;
//   photoUrl = user.photoURL;
//   emailVerified = user.emailVerified;
//   uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
//                    // this value to authenticate with your backend server, if
//                    // you have one. Use User.getToken() instead.
// }

// Logout
export const Logout = () => {
  auth.signOut().then(() => {
    window.location.reload();
  });
};

// export const bookMarkQuery = () => {
//     const query = []
//     const eventListDbQuery = [
//     ]
//     //ログイン中のユーザーのブックマークリストのイベントIDを配列queryに代入
//     fireStoreDB.collection('bookMark').get().then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         doc.data().uid === firebaseUser().uid
//           ? query.push(doc.data().id)
//           : ''
//       });
//       return query
//     }).then((value) => {
//       value.map(que =>
//         // console.log(que)
//         eventListDbQuery.push(
//           eventDB.filter((db) => {
//           return db.id == que
//           })
//         )
//       );
//     })
//     return eventListDbQuery;
// }