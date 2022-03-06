import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCka6fpX9wfNeFArgQWce3u0BfZ3oJLMoQ",
    authDomain: "task-7d420.firebaseapp.com",
    projectId: "task-7d420",
    storageBucket: "task-7d420.appspot.com",
    messagingSenderId: "755404692738",
    appId: "1:755404692738:web:ed7dd51b45b64629fef61b"
  };

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
    })
    .catch((error) => {
      console.log(error);
    });
};