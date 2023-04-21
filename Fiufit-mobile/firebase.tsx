import { AuthError } from "expo-auth-session";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from "firebase/auth";

type userInfo = {
  name?: string;
  uid: string;
  email: string;
}

type userDetails = {
  userId?: string;
  weight: number;
  height: number;
  birthDate: string;
  streetName: string;
  streetNumber: number;
}

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
let internal_id = "";

const getCauseFromErrorMessage = (s: string): string => {
  // receives a string similar to "Firebase: Error (auth/invalid-email)." or "auth/invalid-email"
  // returns a string similar to "invalid-email"
  return s.split("/")[1].split(")")[0];
}

const getInternalIdFromResponse = (response: any): string => {
  // receives a response from the backend like "{"status": "User Jdjde with id 10 created"}"
  // returns a string similar to "10"
  console.log("internal id receiving response", response.status);
  const res = response.status.split("with id ")[1].split(" ")[0];
  console.log(res);
  return res;
}

const logInWithEmailAndPassword = async (email: string, password: string): Promise<string | void> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const uid = user.uid;
    try {
      const idToken = await user.getIdToken();
      // TODO: get the user info from the back and show it in the home screen
    } catch (error: any) {
      alert(error.message);
    }
  }
  catch (error: any) {
    return getErrorMessage(error);
  }
};

const registerWithEmailAndPassword =
  async (name: string, email: string, password: string): Promise<void | string> => {
    try {
      console.log("registering");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("registered user with id: " + user.uid);
      try {
        const idToken = await user.getIdToken();
        console.log("register w email TOKEN:", idToken);
        createUser({ name: name, uid: user.uid, email: email }, idToken);
      } catch (error: any) {
        alert(error.message);
      }
    }
    catch (error: any) {
      return getErrorMessage(error);
    }
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
      return "Usuario no encontrado";
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

const createUser = async (data: userInfo, token: string) => {
  console.log("DATA:", data, "token:", token);
  try {
    const response = await fetch("https://api-gateway-prod-szwtomas.cloud.okteto.net/user-service/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "connection": "keep-alive",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      try {
        const data = await response.json();
        internal_id = getInternalIdFromResponse(data);
        console.log("BACKEND RESPONSE:", data);
      } catch (err: any) {
        console.error(err);
      }
    } else {
      alert("Error al iniciar sesión");
      console.error(response.json());
    }
  } catch (err: any) {
    console.error(err);
    console.log(err.stack);
    alert("CREATE USER ERROR" + err.message);
  }
}

const updateUserDetails = async (data: userDetails) => {
  data.userId = internal_id;
  console.log("DATA:", data);
  const newData = {
    "userId": internal_id,
    "weight": 80,
    "height": 180,
    "birthDate": null,
    "latitude": 3.14,
    "longitude": 10.1
  }
  try {
    const url = "https://api-gateway-prod-szwtomas.cloud.okteto.net/user-service/api/users/" + internal_id + "/metadata";
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "connection": "keep-alive",
        // "dev": "a",
        "Authorization": "Bearer " + await getIdToken(),
      },
      body: JSON.stringify(newData), // SENDIND MOCKED DATA
    });
    if (response.ok) {
      try {
        const data = await response.json();
        console.log("BACKEND RESPONSE:", data);
      } catch (err: any) {
        console.error(err);
      }
    } else {
      alert("Error al iniciar sesión");
      console.error(response.json());
    }
  } catch (err: any) {
    console.error(err);
    alert("user details error:" + err.message);
  }
}

const getIdToken = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      const idToken = await user.getIdToken();
      console.log("GETTING ID TOKEN:", idToken);
      return idToken;
    } catch (err: any) {
      console.error(err);
      alert("Error al obtener token");
    }
  }
  return null;
}

export {
  createUser,
  updateUserDetails,
  userInfo,
  auth,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};