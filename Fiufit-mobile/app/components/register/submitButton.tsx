import { View, Button } from "native-base";
import { loginAndRegisterStyles } from "../../styles";
import { registerWithEmailAndPassword } from "../../../firebase";


interface Props {
  navigation: any;
  name: string;
  email: string;
  password: string;
  clearFields: () => void;
}

export default function SubmitButton(props: Props) {
  const { navigation, name, email, password } = props;

  return (
    <View style={{height: 50, width: "100%", alignItems: "center"}}>
      <Button
        style={[loginAndRegisterStyles.button, loginAndRegisterStyles.loginAndRegisterButton]}
        onPress={() => {
          const isError = registerWithEmailAndPassword(name, email, password);
          if (!isError) {
            props.clearFields();
            return;
          }
          navigation.navigate('extraInfo');
        }}
        _text={{color: "#FFFFFF", fontSize: "20px", fontWeight: "bold"}}
      >
        Registrarse
      </Button>
    </View>
  );
}