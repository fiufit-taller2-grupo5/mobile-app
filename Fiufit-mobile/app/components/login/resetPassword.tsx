import { HStack, Text, Link, View } from "native-base";
import { loginAndRegisterStyles } from "../../styles";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { getResetPasswordEmail } from "../../../api";
import { LoadableButton, LoadableLink } from "../commons/buttons";

interface Props {
  navigation: any;
  clearFields: () => void;
  setErrorMessage: (message: string) => void;
  email: string;
}

export default function ResetPassword(props: Props) {
  const { navigation, clearFields, setErrorMessage, email } = props;

  return (
    <HStack space={2} marginTop={10} height={35}>
      <View flexDirection={"row"} alignItems="center" justifyContent={"center"} >
        <Text marginRight={2}>Olvidaste tu contraseña?</Text>
        <LoadableLink
          text="Recuperar contraseña"
          onPress={async () => {
            if (!email) {
              throw Error("Por favor ingrese su email");
            }
            let response = await getResetPasswordEmail(email);
            console.log(await response.json());
            return "revise su casilla de mail para recuperar su contraseña";
          }}
        />
      </View>
    </HStack>
  );
}

// to redirect to a web page:

// const OpenURLButton = ({url, children}: OpenURLButtonProps) => {
//   const handlePress = useCallback(async () => {
//     // Checking if the link is supported for links with custom URL scheme.
//     const supported = await Linking.canOpenURL(url);

//     if (supported) {
//       // Opening the link with some app, if the URL scheme is "http" the web link should be opened
//       // by some browser in the mobile
//       await Linking.openURL(url);
//     } else {
//       Alert.alert(`Don't know how to open this URL: ${url}`);
//     }
//   }, [url]);

//   return <Button title={children} onPress={handlePress} />;
// };