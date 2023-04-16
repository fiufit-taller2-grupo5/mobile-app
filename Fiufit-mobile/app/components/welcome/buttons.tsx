import { Button, HStack } from "native-base";
import { welcomeStyles } from "../../styles";


export default function Buttons({ navigation }: any) {
  return (
    <HStack
      space={8}
      style={[welcomeStyles.horizontalStack, welcomeStyles.buttonsHorizontalStack]}
    >
      <Button
        style={welcomeStyles.button}
        _text={{ color: "#FFFFFF" }}
        variant="firstButton"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Iniciar sesión
      </Button>
      <Button
        style={welcomeStyles.button}
        _text={{ color: "#FFFFFF" }}
        variant="secondButton"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Registrarse
      </Button>
    </HStack>
  );
}