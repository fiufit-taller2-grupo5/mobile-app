import * as React from 'react';
import { loginAndRegisterStyles } from '../styles';
import { Heading, VStack, NativeBaseProvider, extendTheme } from 'native-base';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import RegisterForm from '../components/register/registerForm';
import SubmitButton from '../components/register/submitButton';
import GoogleRegister from '../components/register/googleRegister';
import MoveToLogin from '../components/register/moveToLogin';

export default function RegisterScreen({ navigation } : any) {
  const theme = extendTheme({
    components: {
      Text: {
        defaultProps: {
          color: '#AEAEAE',
        }
      },
      Heading: {
          defaultProps: {
            color: '#FF6060',
          }
      },
      Button: {
        defaultProps: {
            background: "#FF6060",
        }
      }
    }
  });

  const [name, setName] = useState("");
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

  return <NativeBaseProvider theme={ theme }>
    <VStack
      space={2}
      style={loginAndRegisterStyles.stack}
      height={"full"}
      width={"full"}
    >
      <Heading
        style={[loginAndRegisterStyles.heading, loginAndRegisterStyles.registerHeading]}
      >
        Crear una cuenta
      </Heading>
      <RegisterForm
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
      <SubmitButton navigation={navigation} name={name} email={email} password={password}/>
      <GoogleRegister/>
      <MoveToLogin
        navigation={navigation}
        setName={setName}
        setEmail={setEmail}
        setPassword={setPassword}
      />
    </VStack>
  </NativeBaseProvider>;
}
