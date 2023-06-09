import { VStack, Text, Image, View } from "native-base";
import { TouchableOpacity } from "react-native";
import { loginAndRegisterStyles } from "../../styles";
import React, { useEffect } from "react";
import * as Google from 'expo-auth-session/providers/google';
import { auth } from "../../../firebase";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import globalUser from "../../../userStorage";
import { API } from "../../../api";


interface Props {
  navigation: any;
  setErrorMessage: (errorMessage: string) => void;
}

// WebBrowser.maybeCompleteAuthSession();

export default function GoogleLogin(props: Props) {
  // TODO: add the case in which the user logs in with google without having an account on the app
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "423504146626-f2ricjcl5u5lsl410m9knpl3gn5l2civ.apps.googleusercontent.com", // created in dev build
    webClientId:
      "423504146626-mf53940m2vhk31teo1t5ek5q6kjvvc4c.apps.googleusercontent.com",
  });

  const api = new API(props.navigation);

  useEffect(() => {
    async function signIn() {
      if (response?.type === "success" && response?.params?.id_token) {
        const credential = GoogleAuthProvider.credential(response?.params?.id_token);
        await signInWithCredential(auth, credential).then(async (result) => {
          const user = result.user;
          // we make sure user.email is not null
          if (!user?.email) {
            props.setErrorMessage("Hubo un error. Por favor, inténtelo más tarde.");
            console.error("Error signing in with Google: user.email is null");
            return;
          }
          // we get the user info from the back to store it on the storage

          const userInfo = await api.getUserInfoByEmail(user.email, user);
          if (userInfo instanceof Error) {
            props.setErrorMessage("No se encuetra registrado, debe registrarse primero.");
            // logout from firebase
            auth.signOut();
            return;
          }
          // we store the user info on the storage
          userInfo.googleUser = user;
          userInfo.role = "Atleta";
          userInfo.UserMetadata = undefined;

          globalUser.setUser(userInfo);
          console.log('Signed in with Google:', userInfo);
          // TODO: use the user info from the back and show it in the home screen
          props.navigation.navigate('HomeScreen');

        }).catch((error) => {
          props.setErrorMessage("No se encuetra registrado, debe registrarse primero.");
          console.log('Error signing in with Google:', error);
        });

      } else if (response?.type === "error") {
        props.setErrorMessage("Error al iniciar sesión con Google. Por favor, inténtelo de nuevo más tarde.");
        console.error("Error signing in with Google:", response?.error);
      }
    }
    signIn();
  }, [response]);

  return (
    <VStack space={8} alignItems="center" justifyContent={"center"} width={"100%"} height={100}>
      <TouchableOpacity style={{
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center'
      }} onPress={() => { promptAsync(); }}>
        <Text style={loginAndRegisterStyles.googleTextOption}>O iniciar sesión con</Text>
        <Image
          height={5}
          style={loginAndRegisterStyles.googleImage}
          source={require('../../../assets/images/logos_google-icon.png')}
          alt='google'
        />
      </TouchableOpacity>
    </VStack>
  );
}