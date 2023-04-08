import { View, Button } from "native-base";
import { loginAndRegisterStyles } from "../../styles";
import { registerWithEmailAndPassword } from "../../../firebase";


interface Props {
  navigation: any;
  name: string;
  email: string;
  password: string;
}

export default function SubmitButton(props: Props) {
  const { navigation, name, email, password } = props;

  return (
    <View style={{height: 50, width: "100%", alignItems: "center"}}>
      <Button
        style={[loginAndRegisterStyles.button, loginAndRegisterStyles.loginAndRegisterButton]}
        onPress={() => {
          registerWithEmailAndPassword(name, email, password);
          navigation.navigate('extraInfo');
        }}
        _text={{color: "#FFFFFF", fontSize: "20px", fontWeight: "bold"}}
      >
        Registrarse
      </Button>
    </View>
  );
}