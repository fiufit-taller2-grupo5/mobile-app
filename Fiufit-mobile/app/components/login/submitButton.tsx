import { View, Button } from "native-base";
import { loginAndRegisterStyles } from "../../styles";
import { logInWithEmailAndPassword } from '../../../firebase';


interface Props {
  navigation: any;
  email: string;
  password: string;
  clearFields: () => void;
}

export default function SubmitButton(props: Props) {
  const { navigation, email, password } = props;

  return (
    <View style={{height: 50, width: "100%", alignItems: "center"}}>
      <Button
        style={[loginAndRegisterStyles.button, loginAndRegisterStyles.loginAndRegisterButton]}
        onPress={() => {
          const isError = logInWithEmailAndPassword(email, password);
          if (!isError) {
            props.clearFields();
            return;
          }
          navigation.navigate('HomeScreen');
        }}
        _text={{color: "#FFFFFF", fontSize: "20px", fontWeight: "bold"}}
      >
        Iniciar sesión
      </Button>
    </View>
  );
}