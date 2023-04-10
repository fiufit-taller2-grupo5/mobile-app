// Import the functions you need from the SDKs you need
import { AuthError } from "expo-auth-session";
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signOut 
} from "firebase/auth";

import { 
  getFirestore, 
  collection, 
  addDoc
} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoN3FOFeaLagniu1nAkyWTbb_4kO4kXBw",
  authDomain: "fiufit-93740.firebaseapp.com",
  projectId: "fiufit-93740",
  storageBucket: "fiufit-93740.appspot.com",
  messagingSenderId: "423504146626",
  appId: "1:423504146626:web:6a2efab8c617ea5965cb5b",
  measurementId: "G-260WD4NMWQ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.signOut();
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const getCauseFromErrorMessage = (s:string) : string => {
  // receives a string similar to "Firebase: Error (auth/invalid-email)." or "auth/invalid-email"
  // returns a string similar to "invalid-email"
  return s.split("/")[1].split(")")[0];
}

const logInWithEmailAndPassword = (email : string , password : string ): void | Error => {
  signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    const uid = user.uid;
    const email = user.email;
    user.getIdToken().then((idToken) => {
      sendIdTokenToBackend(idToken);
    }).catch((error) => {
      alert(error.message);
    });
  })
  .catch((error) => {handleLoginError(error);});
};

const registerWithEmailAndPassword = (name : string, email : string, password : string) : void | Error => {
  if (name === "") {
    alert("Please enter a name");
    return;
  }
  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email: user.email,
    }).catch((error) => {alert(error.message);});
    user.getIdToken().then((idToken) => {
      sendIdTokenToBackend(idToken);
    }).catch((error) => {
      alert(error.message);
    });
  })
  .catch((error) => {handleLoginError(error);});
  
};

const sendPasswordReset = async (email : string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err:any) {
    console.error(err);
    alert(err.message);
  }
};

const logout = async () => {
    try {
        await signOut(auth);
    } catch (err:any) {
        console.error(err);
        alert(err.message);
    }
};

const handleLoginError = (error: AuthError) => {
  switch (getCauseFromErrorMessage(error.code)) {
    case "invalid-email":
      alert("Correo inválido");
      break;
    case "user-disabled":
      alert("Usuario deshabilitado");
      break;
    case "user-not-found":
      alert("Usuario no encontrado");
      break;
    case "wrong-password":
      alert("Contraseña incorrecta");
      break;
    case "weak-password":
      alert("La contraseña debe ser de al menos 6 caracteres");
      break;
    case "missing-password":
      alert("Por favor ingrese una contraseña");
      break;
    case "email-already-in-use":
      alert("El correo ya está en uso");
      break;
    default:
      console.error(error);
      alert("Error desconocido");
      break;
  }
}

const sendIdTokenToBackend = async (idToken: string) => {
  // TODO: Send token to your backend via HTTPS
  // ...
}

export {
    auth,
    db,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
  };