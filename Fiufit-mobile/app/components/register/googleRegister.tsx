import { VStack, Text, Image } from "native-base";
import { TouchableOpacity } from "react-native";
import { loginAndRegisterStyles } from "../../styles";


export default function GoogleRegister() {
  return (
    <VStack space={ 8 } alignItems="center">
      <Text style={loginAndRegisterStyles.googleTextOption} >O registrarse con</Text>
      <TouchableOpacity onPress={() => {console.log("intento de registro con google")}}>
          <Image
            style={ loginAndRegisterStyles.googleImage }
            source={ require('../../../assets/images/logos_google-icon.png') }
            alt='google'
          />
      </TouchableOpacity>
    </VStack>
  );
}