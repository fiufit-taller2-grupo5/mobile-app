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
}

export default function SubmitButton(props: Props) {
  const { navigation, name, email, password, setErrorMessage, clearFields } = props;

  return (
    <View style={{height: 50, width: "100%", alignItems: "center"}}>
      <Button
        style={[loginAndRegisterStyles.button, loginAndRegisterStyles.loginAndRegisterButton]}
        onPress={async () => {
          const errorMessage = await registerWithEmailAndPassword(name, email, password);
          if (!errorMessage) {
            clearFields();
            navigation.navigate('extraInfo');
          } else {
            setErrorMessage(errorMessage);
          }
        }}
        _text={{color: "#FFFFFF", fontSize: "20px", fontWeight: "bold"}}
      >
        Registrarse
      </Button>
    </View>
  );
}