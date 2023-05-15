import { VStack, Text, Image } from "native-base";
import { TouchableOpacity } from "react-native";
import { loginAndRegisterStyles } from "../../styles";
import { useEffect, useState } from "react";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { auth, createUser } from "../../../firebase";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";

interface Props {
  navigation: any;
  setError : (errorMessage: string) => void;
  setCorrectlyLogged : (isCorrectlyLogged: boolean) => void;
}
function getErrorMessage (error: string) : string {
  // receive a string like "{"error":"User with name pepe alreasy exists"}" and return the error message
  const errorStr = error.split(':"')[1].split('"}')[0];
  return errorStr;
}
export default function GoogleRegister(props: Props) {
  // TODO: add the case in which the user logs in with google withouth having an account on the app
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "423504146626-f2ricjcl5u5lsl410m9knpl3gn5l2civ.apps.googleusercontent.com", // created in dev build
    webClientId:
      "423504146626-mf53940m2vhk31teo1t5ek5q6kjvvc4c.apps.googleusercontent.com",
  });

  useEffect(() => {
    async function signUp() {
      if (response?.type === "success" && response?.params?.id_token) {
        const credential = GoogleAuthProvider.credential(response?.params?.id_token);
        await signInWithCredential(auth, credential).then(async (result) => {
          console.log('Signed in with Google:', result.user);
          const user = result.user;
          const userCreationRes = await createUser(user);
          if (userCreationRes && userCreationRes.ok) {
            console.log("User created successfully google register");
            props.setCorrectlyLogged(true);
            props.navigation.navigate("LocationScreen");
          } else {
            const responseData = await userCreationRes?.text();
            props.setError(getErrorMessage(responseData? responseData : "Error creating user"));
            auth.signOut();
          }
        }).catch((error) => {
          console.error('Error signing in with Google:', error);
        });

      } else if (response?.type === "error") {
        alert("Error: " + response.error);
      }
    }
    signUp();
  }, [response]);

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