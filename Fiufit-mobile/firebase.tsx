import { AuthError } from "expo-auth-session";
import firebase, { initializeApp } from "firebase/app";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  User,
} from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth/react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

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
const persistence = getReactNativePersistence(AsyncStorage);
(persistence as any).type = "LOCAL";
const auth = initializeAuth(app, {
  persistence: persistence,
});
//auth.signOut();
let internal_id = "";

const getCauseFromErrorMessage = (s: string): string => {
  // receives a string similar to "Firebase: Error (auth/invalid-email)." or "auth/invalid-email"
  // returns a string similar to "invalid-email"
  return s.split("/")[1].split(")")[0];
}


const logInWithEmailAndPassword = async (email: string, password: string): Promise<string | void> => {
  console.log("logInWithEmailAndPassword auth 1: ", auth);
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const uid = user.uid;
    try {
      const idToken = await user.getIdToken();
    } catch (error: any) {
      alert(error.message);
    }
  }
  catch (error: any) {
    return getErrorMessage(error);
  }
};

const registerWithEmailAndPassword =
  async (name: string, email: string, password: string, onSucessfullFirebaseRegister: (user: User, name: string) => Promise<void>): Promise<void | string> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("registered in firebase");
    await onSucessfullFirebaseRegister(user, name);
  };

// TODO: handle errors to show to user
const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

// TODO: handle errors to show to user
const logout = async () => {
  try {
    await signOut(auth);
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const getErrorMessage = (error: AuthError): string => {
  switch (getCauseFromErrorMessage(error.code)) {
    case "invalid-email":
      return "Correo inválido";
    case "user-disabled":
      return "Usuario deshabilitado";
    case "user-not-found":
      return "Usuario no encontrado, por favor regístrese primero";
    case "wrong-password":
      return "Contraseña incorrecta";
    case "weak-password":
      return "La contraseña debe ser de al menos 6 caracteres";
    case "missing-email":
      return "Por favor ingrese un correo"
    case "missing-password":
      return "Por favor ingrese una contraseña";
    case "email-already-in-use":
      return "El correo ya está en uso";
    default:
      console.error(error);
      return "Error desconocido"
  }
}

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
})


export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
