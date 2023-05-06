import { HStack, Text, Link } from "native-base";
import { loginAndRegisterStyles } from "../../styles";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { getResetPasswordUrl } from "../../../api";

interface Props {
  navigation: any;
  clearFields: () => void;
  setErrorMessage: (message: string) => void;
  email: string;
}

export default function ResetPassword(props: Props) {
  const { navigation, clearFields, setErrorMessage, email } = props;

  return (
    <HStack space={2} top="10%">
      <Text style={loginAndRegisterStyles.moveToRegister}>Olvidaste tu contraseña?</Text>
      <Link
        style={[loginAndRegisterStyles.link, loginAndRegisterStyles.loginLink]}
        onPress={() => {
          if (email === "") {
            setErrorMessage("Por favor ingrese su email");
            return;
          }
          const url = getResetPasswordUrl(email);
          // TODO: send email with reset password link (from backend)
        }}
        _text={{ color: "#BC2666" }}
      >
        Recuperar contraseña
      </Link>
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