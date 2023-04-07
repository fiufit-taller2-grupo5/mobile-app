import { VStack, Text, Image } from "native-base";
import { TouchableOpacity } from "react-native";
import { loginAndRegisterStyles } from "../../styles";


export default function GoogleLogin() {
  return (
    <VStack space={8} alignItems="center">
      <Text style={ loginAndRegisterStyles.googleTextOption }>O iniciar sesión con</Text>
      <TouchableOpacity onPress={() => {console.log("intento de login con google")}}>
        <Image
          style={ loginAndRegisterStyles.googleImage }
          source={ require('../../../assets/images/logos_google-icon.png') }
          alt='google'
        />
      </TouchableOpacity>
    </VStack>
  );
}