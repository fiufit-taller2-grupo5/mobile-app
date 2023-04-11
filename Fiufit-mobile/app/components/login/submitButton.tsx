import { View, Button, Alert, Stack, VStack, HStack, Text, IconButton, CloseIcon } from "native-base";
import { loginAndRegisterStyles } from "../../styles";
import { logInWithEmailAndPassword } from '../../../firebase';


interface Props {
  navigation: any;
  email: string;
  password: string;
  setErrorMessage: (errorMessage: string) => void;
  clearFields: () => void;
}

export default function SubmitButton(props: Props) {
  const { navigation, email, password, setErrorMessage, clearFields } = props;

  return (
    <View style={{height: 50, width: "100%", alignItems: "center"}}>
      <Button
        style={[loginAndRegisterStyles.button, loginAndRegisterStyles.loginAndRegisterButton]}
        onPress={async () => {
          const errorMessage = await logInWithEmailAndPassword(email, password);
          if (!errorMessage) {
            clearFields();
            navigation.navigate('HomeScreen');
          } else {
            setErrorMessage(errorMessage);
          }
        }}
        _text={{color: "#FFFFFF", fontSize: "20px", fontWeight: "bold"}}
      >
        Iniciar sesión
      </Button>
    </View>
  );
}