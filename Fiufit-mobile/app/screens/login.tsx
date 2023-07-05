import * as React from 'react';
import { loginAndRegisterStyles } from '../styles';
import { Heading, NativeBaseProvider, extendTheme, VStack, Modal, View } from "native-base";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from 'react';
import { auth, logInWithEmailAndPassword } from '../../firebase';
import LoginForm from '../components/login/loginForm';
import GoogleLogin from '../components/login/googleLogin';
import MoveToRegister from '../components/login/moveToRegister';
import ErrorMessage from '../components/form/errorMessage';
import ResetPassword from '../components/login/resetPassword';
import { LoadableButton } from '../components/commons/buttons';
import { API } from '../../api';
import globalUser from '../../userStorage';
import * as LocalAuthentication from 'expo-local-authentication';


export default function LoginScreen({ navigation }: any) {
  const theme = extendTheme({
    components: {
      Text: {
        defaultProps: {
          color: '#AEAEAE',
        },
      },
      Button: {
        defaultProps: {
          background: "#FF6060",
        }
      },
      Heading: {
        defaultProps: {
          color: '#FF6060',
        }
      }
    }
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const api = new API(navigation);

  const biometricLogin = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      return;
    }
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      return;
    }
    const { success } = await LocalAuthentication.authenticateAsync();
    if (success) {
      const user = await globalUser.getUser();
      if (user === null) {
        console.error("Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.");
        throw Error("Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.");
      } else {
        console.log("biometric login success", user);
      }
      navigation.navigate('HomeScreen', { key: Math.random().toString() });
    }
  }

  React.useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (error) {
      console.log(error);
      return;
    }
  }, [user, loading]);

  const cleanFields = () => {
    setEmail("");
    setPassword("");
  }

  return <NativeBaseProvider theme={theme}>
    <VStack
      style={loginAndRegisterStyles.stack}
      height={"full"}
      width={"full"}
    >
      {errorMessage &&
        <Modal
          style={{ maxHeight: "20%", height: "20%", width: "100%", top: "-1.3%" }}
          _backdrop={{ backgroundColor: "transparent" }}
          closeOnOverlayClick={true}
          onClose={() => setErrorMessage("")}
          isOpen={errorMessage !== ""}
        >
          <View maxHeight="20%" width="100%">
            <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
          </View>
        </Modal>
      }
      <Heading
        marginTop={'20%'}
        marginBottom={"10%"}
      >
        Ingresa tus datos
      </Heading>
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
      <LoadableButton
        text="Iniciar Sesión"
        customStyles={{ marginBottom: 40 }}
        onPress={async () => {
          const errorMessage = await logInWithEmailAndPassword(email, password);
          if (!errorMessage) {
            // get user info from the back and store it on the storage
            const user = auth.currentUser;
            if (user === null) {
              console.error(errorMessage);
              throw Error("Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.");
            }
            const userInfo = await api.getUserInfoByEmail(email.toLowerCase(), user);
            console.log("userInfo", userInfo)
            userInfo.googleUser = user;
            userInfo.role = "Atleta";
            userInfo.UserMetadata = null;
            globalUser.setUser(userInfo);
            navigation.navigate('HomeScreen', { key: Math.random().toString() });
          } else {
            throw Error(errorMessage);
          }
        }}
      />
      <LoadableButton
        text="Iniciar Sesión con datos biométricos"
        customStyles={{ marginBottom: 10 }}
        onPress={async () => {
          await biometricLogin();
        }}
      />
      <GoogleLogin
        navigation={navigation}
        setErrorMessage={setErrorMessage}
      />
      <MoveToRegister
        navigation={navigation}
        clearFields={cleanFields}
      />
      <ResetPassword
        navigation={navigation}
        clearFields={cleanFields}
        setErrorMessage={setErrorMessage}
        email={email}
      />
    </VStack>
  </NativeBaseProvider>;
}
