import { VStack, Text, Image } from "native-base";
import { TouchableOpacity } from "react-native";
import { loginAndRegisterStyles } from "../../styles";
import { useEffect, useState } from "react";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { sendUserInfoToBackend, userInfo } from "../../../firebase";
interface Props {
  navigation: any;
}


WebBrowser.maybeCompleteAuthSession();

export default function GoogleLogin(props:Props) {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  
  // TODO: add the case in which the user logs in with google withouth having an account on the app
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "423504146626-f2ricjcl5u5lsl410m9knpl3gn5l2civ.apps.googleusercontent.com", // created in dev build
    webClientId:
      "423504146626-mf53940m2vhk31teo1t5ek5q6kjvvc4c.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success" && response?.params?.access_token) {
      // console.log("RESPONSE:",response.params);
      setToken(response.params.access_token);
      console.log("response:",response);
      console.log("TOKEN:",token);
      props.navigation.navigate('HomeScreen');
    } else if (response?.type === "error") {
      alert("Error: " + response.error);
    }
  }, [response, token]);

  // get user info and send it to the backend
  // useEffect(() => {
  //   if (token) {
  //     (async () => {
  //       const userInfoResponse = await fetch(
  //         `https://www.googleapis.com/userinfo/v2/me`,
  //         {
  //           method: "GET",
  //           headers: {"Authorization": "Bearer " + token},
  //         }
  //       );
  //       const userInfo = await userInfoResponse.json();
  //       console.log("USER INFO:", userInfo);
  //       setUserId(userInfo.id);
  //       sendUserInfoToBackend({uid: userId }, token);
  //     })();
  //   }
  // }, [token]);



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