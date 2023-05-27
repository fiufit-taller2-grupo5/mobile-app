import { Button, View } from "native-base";
import { welcomeStyles } from "../../styles";
import { LoadableButton } from "../commons/buttons";


export default function Buttons({ navigation }: any) {
  return <View >
    <LoadableButton
      text="Iniciar Sesión"
      customStyles={{ marginBottom: 10 }}
      onPress={async () => {
        navigation.navigate('LoginScreen')
      }}
    />
    <LoadableButton
      text="Registrarse"
      onPress={async () => {
        navigation.navigate('RegisterScreen')
      }}
    />
  </View >
}