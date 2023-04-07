import { View, Button } from "native-base";
import { loginAndRegisterStyles } from "../../styles";
import { logInWithEmailAndPassword } from '../../../firebase';


interface Props {
  email: string;
  password: string;
}

export default function SubmitButton(props: Props) {
  const { email, password } = props;

  return (
    <View style={{height: 50, width: "100%", alignItems: "center"}}>
      <Button
        style={loginAndRegisterStyles.button}
        onPress={() => {logInWithEmailAndPassword(email, password)}}
        _text={{color: "#FFFFFF", fontSize: "20px", fontWeight: "bold"}}
      >
        Iniciar sesión
      </Button>
    </View>
  );
}