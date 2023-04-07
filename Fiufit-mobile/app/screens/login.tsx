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

export default function LoginScreen({ navigation } : any) {
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
  const [user, loading, error] = useAuthState(auth);

  React.useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigation.navigate('HomeScreen');
  }, [user, loading]);

  return <NativeBaseProvider theme={theme}>
    <VStack
      space={6}
      style={loginAndRegisterStyles.stack}
      height={"full"}
      width={"full"}
    >
      <Heading
        style={[loginAndRegisterStyles.heading, loginAndRegisterStyles.loginHeading]}
      >
        Ingresa tus datos
      </Heading>
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
      <SubmitButton email={email} password={password} />
      <GoogleLogin />
      <MoveToRegister
        navigation={navigation}
        setEmail={setEmail}
        setPassword={setPassword}
      />
    </VStack>
  </NativeBaseProvider>;
}
