import { HStack, Text, Link } from "native-base";
import { loginAndRegisterStyles } from "../../styles";

interface Props {
  navigation: any;
  clearFields: () => void;
}

export default function MoveToRegister(props: Props) {
  const { navigation, clearFields } = props;

  return (
    <HStack space={2} top="10%">
      <Text style={loginAndRegisterStyles.moveToRegister}>No tienes una cuenta?</Text>
      <Link
        style={[loginAndRegisterStyles.link, loginAndRegisterStyles.loginLink]}
        onPress={() => {
          navigation.navigate('RegisterScreen');
          clearFields();
        }}
        _text={{ color: "#BC2666" }}
      >
        Registrarse
      </Link>
    </HStack>
  );
}