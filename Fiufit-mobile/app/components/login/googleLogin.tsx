import { VStack, Text, Image } from "native-base";
import { TouchableOpacity } from "react-native";
import { loginAndRegisterStyles } from "../../styles";

import { makeRedirectUri } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { Button } from "native-base";
import { useEffect } from "react";

// const REDIRECT_PARAMS = Constants.appOwnership === 'expo' ? EXPO_REDIRECT_PARAMS : NATIVE_REDIRECT_PARAMS;
// const redirectUri = AuthSession.makeRedirectUri(REDIRECT_PARAMS);

export default function GoogleLogin() {
  const redirectUri = makeRedirectUri({
    useProxy: true, 
    projectNameForProxy: '@expo/fiufit-mobile'
  });

  // TODO: add the case in which the user logs in with google withouth having an account on the app
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    // expoClientId: "423504146626-vdsffal07p46s5s52v0o0l2826rsro0f.apps.googleusercontent.com", // for use with @gabsem/fiufit-mobile
    clientId: "423504146626-fot1vrq5r4285qo64vlh6s6gd9adanag.apps.googleusercontent.com", // for use with @expo/fiufit-mobile
    redirectUri: redirectUri, // for use with @expo/fiufit-mobile
    androidClientId:
      "423504146626-e1u34lh849tjf769p9ppkok8jc84q4cj.apps.googleusercontent.com",
    webClientId:
      "423504146626-mf53940m2vhk31teo1t5ek5q6kjvvc4c.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(getAuth(), credential);
    }
  }, [response]);

  return (
    <VStack space={8} alignItems="center">
      <Text style={ loginAndRegisterStyles.googleTextOption }>O iniciar sesión con</Text>
      <TouchableOpacity onPress={() => {promptAsync();}}>
        <Image
          style={ loginAndRegisterStyles.googleImage }
          source={ require('../../../assets/images/logos_google-icon.png') }
          alt='google'
        />
      </TouchableOpacity>
    </VStack>
  );
}