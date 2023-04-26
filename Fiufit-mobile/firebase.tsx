import { AuthError } from "expo-auth-session";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  User
} from "firebase/auth";
import { getUser, storeUser } from "./app/utils/storageController";

type userDetails = {
  userId?: string;
  weight: number;
  height: number;
  birthDate: string;
  location: string;
  interests: string[];
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      try {
        console.log("register w email");
        createUser(user, name);
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
// emailRegisterName default value is "null"
const createUser = async (user: User, emailRegisterName : string = "" ) : Promise<void | Response>  => {

  const data = {
    name: user.displayName? user.displayName as string : emailRegisterName,
    uid: user.uid,
    email: user.email as string
  };
  const token = (user as any).stsTokenManager.accessToken;
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
        const responseData = await response.json();
        internal_id = getInternalIdFromResponse(responseData);
        storeUser({
          user: user,
          internal_id: internal_id,
          is_trainer: false
        });
        console.log("BACKEND RESPONSE:", responseData);
      } catch (err: any) {
        console.error(err);
      }
    } else {
      console.warn("ERROR CREATING USER:", await response.json());
    }
    return response;
  } catch (err: any) {
    console.error(err);
    alert("CREATE USER ERROR:" + err.message);
    return err;
  }
}

const updateUserDetails = async (data: userDetails) => {
  const userInfo = await getUser();
  data.userId = internal_id;
  const accessToken = (userInfo?.user as any).stsTokenManager.accessToken;
  console.log("data:", JSON.stringify(data));
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
        "Authorization": "Bearer " + accessToken,
      },
      body: JSON.stringify(data),
    });
    console.log("RESPONSE:", response);
    if (response.ok) {
      try {
        console.log("BACKEND RESPONSE:", response);
        const data = await response.json();
      } catch (err: any) {
        console.error(err);
      }
    } else {
      alert("Error al iniciar sesión");
      console.error(await response.json());
    }
  } catch (err: any) {
    console.error("errorsito: ",err);
    alert("user details error:" + err.message);
  }
}

export {
  createUser,
  updateUserDetails,
  auth,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
