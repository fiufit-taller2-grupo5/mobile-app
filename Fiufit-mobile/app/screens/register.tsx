import * as React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Flex, Heading, Stack, Input, Image, Icon, Button, Link, Text, NativeBaseProvider, extendTheme, Pressable } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, registerWithEmailAndPassword } from '../../firebase';

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

  const [show, setShow] = useState(false);
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
    <Stack
      space={ 4 } w="100%"
      alignItems="center"
      style={ styles.stack }
    >
      <Heading style={ styles.heading }>Crear una cuenta</Heading>
      <Input
        w={{ base: "80%", md: "30%" }} 
        h="15%" 
        variant="underlined"
        onChangeText={ (name) => setName(name) }
        placeholder="Nombre completo"
      />
      <Input
        w={{ base: "80%", md: "30%" }} 
        h="15%" 
        variant="underlined" 
        placeholder="Email" 
        onChangeText={ (email) => setEmail(email) }
      />
      <Input
        w={{ base: "80%", md: "25%" }}
        h="15%"
        type={ show ? "text" : "password" }
        variant="underlined"
        onChangeText={ (password) => setPassword(password) }
        InputRightElement={<Pressable onPress={ () => setShow(!show) }>
        <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
        size={5} mr="2" color="muted.400" />
        </Pressable>} placeholder="Contraseña"
      />
    </Stack>
    <Flex h="12" alignItems="center">
      <Button
        style={ styles.button }
        onPress={() => { registerWithEmailAndPassword(name, email, password) }}
        _text={{ color: "#FFFFFF", fontSize: "20px", fontWeight: "bold" }}
      >
        Registrarse
      </Button>
    </Flex>
    <Text style={ styles.loginTextOption } >O registrarse con</Text>
    <TouchableOpacity onPress={() => {}}>
        <Image
          style={ styles.googleImage }
          source={ require('../../assets/images/logos_google-icon.png') }
          alt='google'
        />
    </TouchableOpacity>
    <Text style={ styles.moveToLogin }>No tienes una cuenta?</Text>
    <Link
      style={styles.link}
      onPress={() => { navigation.navigate('LoginScreen') }} 
      _text={{ color: "#BC2666" }}
    >
        Iniciar sesión
    </Link>
  </NativeBaseProvider>;
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    width: "90%",
    left: "2.3%",
    top: "20%",
    borderRadius: 30
  },
  heading: {
    flex: 0,
    left: '1%',
    top: '-20%',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
  },
  googleImage: {
    top: "780%",
    left: "47%",
    right: "0%",
    bottom: "0%",
  },
  link: {
    top: "48.9%",
    left: "27%",
  },
  stack: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    top: '15%',
  },
  loginTextOption: {
    top: '15%',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 21,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  moveToLogin: {
    top: '25%',
    left: '20%',
  }
});