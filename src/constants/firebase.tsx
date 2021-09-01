import firebase from "firebase";
import "firebase/auth"


 const firebaseConfig = {
  apiKey: "AIzaSyBr4Zg6c9NYcjMOmlAmmlRphYATi0tPPA4",
  authDomain: "shopping-list-b4525.firebaseapp.com",
  projectId: "shopping-list-b4525",
  storageBucket: "shopping-list-b4525.appspot.com",
  messagingSenderId: "1051307276486",
  appId: "1:1051307276486:web:a26613c722ab408217bfc7",
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth()
export default firebase;