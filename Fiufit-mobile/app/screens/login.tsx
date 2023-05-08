import * as React from 'react';
import { loginAndRegisterStyles } from '../styles';
import { Heading, NativeBaseProvider, extendTheme, VStack } from "native-base";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from 'react';
import { auth } from '../../firebase';
import LoginForm from '../components/login/loginForm';
import SubmitButton from '../components/login/submitButton';
import GoogleLogin from '../components/login/googleLogin';
import MoveToRegister from '../components/login/moveToRegister';
import ErrorMessage from '../components/form/errorMessage';
import ResetPassword from '../components/login/resetPassword';

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

  React.useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    // if (user) navigation.navigate('HomeScreen');

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
      {errorMessage && <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}
      <Heading
        marginTop={'25%'}
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
      <SubmitButton
        email={email}
        password={password}
        navigation={navigation}
        setErrorMessage={setErrorMessage}
        clearFields={cleanFields}
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
