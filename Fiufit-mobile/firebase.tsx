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

type userInfo = {
  name?: string;
  uid: string;
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
const provider = new GoogleAuthProvider();

const getCauseFromErrorMessage = (s:string) : string => {
  // receives a string similar to "Firebase: Error (auth/invalid-email)." or "auth/invalid-email"
  // returns a string similar to "invalid-email"
  return s.split("/")[1].split(")")[0];
}

const logInWithEmailAndPassword = async (email : string , password : string ): Promise<string | void> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const uid = user.uid;
    user.getIdToken()
      .then((idToken) => {
        sendUserInfoToBackend({uid}, idToken);
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  catch (error: any) {
    return getErrorMessage(error);
  }
};

const registerWithEmailAndPassword =
  async (name : string, email : string, password : string) : Promise<void | string> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      user.getIdToken()
        .then((idToken) => {
          sendUserInfoToBackend({name: name, uid: user.uid}, idToken);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
    catch (error: any) {
      return getErrorMessage(error);
    }
};

// TODO: handle errors to show to user
const sendPasswordReset = async (email : string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err:any) {
    console.error(err);
    alert(err.message);
  }
};

// TODO: handle errors to show to user
const logout = async () => {
  try {
      await signOut(auth);
  } catch (err:any) {
      console.error(err);
      alert(err.message);
  }
};

const getErrorMessage = (error: AuthError) : string => {
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

const sendUserInfoToBackend = async (data : userInfo, idToken: string) => {
  // get de prueba
  // try {
  //   const response = await fetch("https://api-gateway-prod-szwtomas.cloud.okteto.net/user-service/api/users", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "accept": "*/*",
  //       "connection": "keep-alive",
  //       "Authorization": "Bearer " + idToken,
  //     },
  //   });
  //   if (response.ok) {
  //     const data = await response.json();
  //     console.log(data);
  //   } else {
  //     alert("Error al iniciar sesión");
  //     console.error(response);
  //   }
  // } catch (err:any) {
  //   console.error(err);
  //   alert(err.message);
  // }
  
  // post
  // try {
  //   const response = await fetch("https://api-gateway-prod-szwtomas.cloud.okteto.net/user-service/api/users", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "accept": "*/*",
  //       "accept-encoding": "gzip, deflate, br",
  //       "connection": "keep-alive",
  //       "Authorization": "Bearer " + idToken,
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   if (response.ok) {
  //     const data = await response.json();
  //     console.log("BACKEND RESPONSE:", data);
  //   } else {
  //     alert("Error al iniciar sesión");
  //     console.error(response.json());
  //   }
  // } catch (err:any) {
  //   console.error(err);
  //   alert(err.message);
  // }
}

export {
  userInfo,
  sendUserInfoToBackend,
  auth,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};