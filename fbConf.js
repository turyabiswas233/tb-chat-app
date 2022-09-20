import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPwvwITsJ9Dru8FOWgZ_PPhBj9uRMlOFE",
  authDomain: "chat-app-b62e2.firebaseapp.com",
  projectId: "chat-app-b62e2",
  storageBucket: "chat-app-b62e2.appspot.com",
  messagingSenderId: "881459445341",
  appId: "1:881459445341:web:a4125864186100755317b4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
