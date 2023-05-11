import { View, Button, Alert, Stack, VStack, HStack, Text, IconButton, CloseIcon } from "native-base";
import { loginAndRegisterStyles } from "../../styles";
import { auth, logInWithEmailAndPassword } from '../../../firebase';
import { getUserInfoByEmail } from "../../../api";
import { storeUserOnStorage } from "../../utils/storageController";
import { User } from "firebase/auth";


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
            // get user info from the back and store it on the storage
            const user = auth.currentUser;
            if (user === null) {
              setErrorMessage("Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.");
              console.error("Error signing in with email: user is null");
              return;
            }
            const userInfo = await getUserInfoByEmail(email, user);
            if (userInfo instanceof Error) {
              // user is not registered in the app
              setErrorMessage("No se encuetra actualmente registrado en Fiufit. Por favor, regístrese primero.");
              // logout from firebase
              auth.signOut();
              return;
            }
            // we store the user info on the storage
            userInfo.googleUser = user;
            if (userInfo.role === null || userInfo.role === "user") {
              userInfo.role = "Atleta"
            }
            storeUserOnStorage(userInfo);
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