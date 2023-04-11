import { HStack, Text, Link } from "native-base";
import { loginAndRegisterStyles } from "../../styles";


interface Props {
  navigation: any;
  clearFields: () => void;
}

export default function MoveToLogin(props: Props) {
  const { navigation, clearFields } = props;

  return (
    <HStack space={2} top="10%">
      <Text style={ loginAndRegisterStyles.moveToLogin }>No tienes una cuenta?</Text>
      <Link
        style={[loginAndRegisterStyles.link, loginAndRegisterStyles.registerLink]}
        onPress={() => {
          navigation.navigate('LoginScreen');
          clearFields();
        }} 
        _text={{color: "#BC2666"}}
      >
          Iniciar sesión
      </Link>
    </HStack>
  );
}