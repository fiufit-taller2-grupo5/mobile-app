import * as React from 'react';
import { loginAndRegisterStyles } from '../styles';
import { Heading, VStack, NativeBaseProvider, extendTheme, Modal, View } from 'native-base';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import RegisterForm from '../components/register/registerForm';
import SubmitButton from '../components/register/submitButton';
import GoogleRegister from '../components/register/googleRegister';
import MoveToLogin from '../components/register/moveToLogin';
import ErrorMessage from '../components/form/errorMessage';


export default function RegisterScreen({ navigation }: any) {
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
  const [errorMessage, setErrorMessage] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [isCorrectlyLogged, setIsCorrectlyLogged] = useState(false);

  React.useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user && isCorrectlyLogged) navigation.navigate('ExtraInfoScreen');
  }, [user, loading]);

  const clearFields = () => {
    setName("");
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
          style={{maxHeight:"20%", height:"20%", width:"100%", top:"-1.3%"}}
          _backdrop={{backgroundColor: "transparent"}}
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
        marginTop={"20%"}
        marginBottom={"10%"}
      >
        Ingresa tus datos
      </Heading>
      <RegisterForm
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
      <SubmitButton
        navigation={navigation}
        name={name}
        email={email}
        password={password}
        setErrorMessage={setErrorMessage}
        clearFields={clearFields}
        setCorrectlyLogged={setIsCorrectlyLogged}
      />
      <GoogleRegister navigation={navigation} setError={setErrorMessage} setCorrectlyLogged={setIsCorrectlyLogged}/>
      <MoveToLogin
        navigation={navigation}
        clearFields={clearFields}
      />
    </VStack>
  </NativeBaseProvider>;
}
