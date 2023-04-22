import { View, Button } from "native-base";
import { loginAndRegisterStyles } from "../../styles";
import { registerWithEmailAndPassword } from "../../../firebase";


interface Props {
  navigation: any;
  name: string;
  email: string;
  password: string;
  setErrorMessage: (errorMessage: string) => void;
  clearFields: () => void;
  setCorrectlyLogged : (isCorrectlyLogged: boolean) => void;
}

export default function SubmitButton(props: Props) {
  const { navigation, name, email, password, setErrorMessage, clearFields } = props;

  return (
    <View style={{ height: 50, width: "100%", alignItems: "center" }}>
      <Button
        style={[loginAndRegisterStyles.button, loginAndRegisterStyles.loginAndRegisterButton]}
        onPress={async () => {
          if (!name) {
            setErrorMessage("Por favor ingresa tu nombre");
            return;
          };
          const errorMessage = await registerWithEmailAndPassword(name, email, password);
          if (!errorMessage) {
            console.log("User registered successfully");
            clearFields();
            props.setCorrectlyLogged(true);
            navigation.navigate('ExtraInfoScreen');
          } else {
            console.log("Error registering user: ", errorMessage);
            setErrorMessage(errorMessage);
          }
        }}
        _text={{ color: "#FFFFFF", fontSize: "20px", fontWeight: "bold" }}
      >
        Registrarse
      </Button>
    </View>
  );
}