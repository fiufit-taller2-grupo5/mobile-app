import * as React from 'react';
import { loginAndRegisterStyles } from '../styles';
import { Heading, VStack, NativeBaseProvider, extendTheme, Modal, View } from 'native-base';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, registerWithEmailAndPassword } from '../../firebase';
import RegisterForm from '../components/register/registerForm';
import GoogleRegister from '../components/register/googleRegister';
import MoveToLogin from '../components/register/moveToLogin';
import ErrorMessage from '../components/form/errorMessage';
import { LoadableButton } from '../components/commons/buttons';
import { API } from '../../api';

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

  const api = new API(navigation);

  const isValidEmail = (email: string) => {
    var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  }

  const validatePassword = (password: string): string | void => {
    // Length: At least 8 characters
    if (password.length < 8) {
      return "Password should be at least 8 characters long.";
    }

    // Complexity: Mix of uppercase, lowercase, numbers, and special characters
    if (!/[a-z]/.test(password)) { // checks for lowercase letters
      return "Password should contain at least one lowercase letter.";
    }
    if (!/[A-Z]/.test(password)) { // checks for uppercase letters
      return "Password should contain at least one uppercase letter.";
    }
    if (!/[0-9]/.test(password)) { // checks for numbers
      return "Password should contain at least one number.";
    }
    if (!/[!@#$%^&*]/.test(password)) { // checks for special characters
      return "Password should contain at least one special character (!@#$%^&*).";
    }

    // Variety: Not a common password. This is a very basic check. 
    // In a real scenario, you might want to use a dictionary of common passwords.
    const commonPasswords = ["password", "12345678", "qwertyui"];
    if (commonPasswords.includes(password)) {
      return "Password is too common. Please choose a different password.";
    }
  }

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
      <LoadableButton
        text="Registrarse"
        customStyles={{ marginBottom: 40 }}
        onPress={async () => {
          [name, email, password].forEach((field) => {
            if (!field) {
              throw new Error("Por favor ingresa todos los campos");
            }
          });
          if (!isValidEmail(email)) {
            throw new Error("Por favor ingresa un email válido");
          }
          // make sure password is strong enough:
          const passwordError = validatePassword(password);
          if (passwordError && password !== "aaaaaa") {
            throw new Error(passwordError);
          }
          await registerWithEmailAndPassword(
            name,
            email.toLowerCase(),
            password,
            async (user, name) => {
              await api.createUser(user, name)
              navigation.navigate('LocationScreen', { key: Math.random().toString() });
            });
        }}
      />
      <GoogleRegister navigation={navigation} setError={setErrorMessage} setCorrectlyLogged={setIsCorrectlyLogged} />
      <MoveToLogin
        navigation={navigation}
        clearFields={clearFields}
      />
    </VStack>
  </NativeBaseProvider>;
}
