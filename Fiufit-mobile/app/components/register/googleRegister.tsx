import { VStack, Text, Image } from "native-base";
import { TouchableOpacity } from "react-native";
import { loginAndRegisterStyles } from "../../styles";
import { useEffect, useState } from "react";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { createUser, sendUserInfoToBackend, userInfo } from "../../../firebase";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

interface Props {
  navigation: any;
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

export default function GoogleRegister(props: Props) {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [accessTok, setAccessTok] = useState("");
  // TODO: add the case in which the user logs in with google withouth having an account on the app
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "423504146626-f2ricjcl5u5lsl410m9knpl3gn5l2civ.apps.googleusercontent.com", // created in dev build
    webClientId:
      "423504146626-mf53940m2vhk31teo1t5ek5q6kjvvc4c.apps.googleusercontent.com",
  });

  useEffect(() => {
    async function signIn() {
      if (response?.type === "success" && response?.params?.id_token) {
        const credential = GoogleAuthProvider.credential(response?.params?.id_token);
        await signInWithCredential(auth, credential).then((result) => {
          console.log('Signed in with Google:', result.user);
          // Here you can add additional logic, e.g., create a user in your database
        }).catch((error) => {
          console.error('Error signing in with Google:', error);
        });

        // console.log("RESPONSE:", response);
        // setAccessTok(response.params.access_token);
        // setToken(response.params.id_token);
        // console.log("TOKEN:", token);
      } else if (response?.type === "error") {
        alert("Errorrrr: " + response.error);
      }
    }
    signIn();
  }, [response, token]);

  // get user info and send it to the backend
  useEffect(() => {
    if (accessTok) {
      (async () => {
        const userInfoResponse = await fetch(
          `https://www.googleapis.com/userinfo/v2/me`,
          {
            method: "GET",
            headers: { "Authorization": "Bearer " + accessTok },
          }
        );
        const userInfo = await userInfoResponse.json();
        console.log("USER INFO:", userInfo);
        setUserId(userInfo.id);

        await createUser({ name: userInfo.name, uid: userInfo.id, email: userInfo.email }, token);
        props.navigation.navigate('ExtraInfoScreen');
      })();
    }
  }, [token]);


  return (
    <VStack space={8} alignItems="center">
      <Text style={loginAndRegisterStyles.googleTextOption} >O registrarse con</Text>
      <TouchableOpacity onPress={() => { promptAsync(); }}>
        <Image
          style={loginAndRegisterStyles.googleImage}
          source={require('../../../assets/images/logos_google-icon.png')}
          alt='google'
        />
      </TouchableOpacity>
    </VStack>
  );
}