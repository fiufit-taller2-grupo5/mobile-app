import { VStack, Text, Image } from "native-base";
import { TouchableOpacity } from "react-native";
import { loginAndRegisterStyles } from "../../styles";
import { useEffect, useState } from "react";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { auth, createUser, userInfo } from "../../../firebase";
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

interface Props {
  navigation: any;
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
          await createUser({ name: user.displayName as string, uid: user.uid, email: user.email as string }, (user as any).stsTokenManager.accessToken);
          props.navigation.navigate('ExtraInfoScreen');
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