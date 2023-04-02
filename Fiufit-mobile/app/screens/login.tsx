import * as React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Heading, Flex, Image, Link, Input, Button, Text, Icon, Stack, Pressable, NativeBaseProvider, extendTheme, VStack, HStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from 'react';
import { auth, logInWithEmailAndPassword } from '../../firebase';

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

  const [show, setShow] = useState(false);
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
    <Stack space={ 10 } w="100%" alignItems="center" style={ styles.stack }>
      <Heading style={ styles.heading }>Ingresa tus datos</Heading>
      <VStack space={10} alignItems="center">
        <Input
          w={{ base: "80%", md: "30%" }} 
          h="15%" 
          variant="underlined" 
          placeholder="Email" 
          onChangeText={ (email) => setEmail(email) }
        />
        <Input w={{ base: "80%", md: "25%" }}
          h="15%"
          type={ show ? "text" : "password" }
          variant="underlined"
          onChangeText={ (password) => setPassword(password) }
          InputRightElement={<Pressable onPress={ () => setShow(!show) }>
          <Icon as={<MaterialIcons name={ show ? "visibility" : "visibility-off" } />}
          size={ 5 } mr="2" color="muted.400" />
          </Pressable>} placeholder="Contraseña"
        />
      </VStack>
      <Flex top="-40%" h="12" w="sm" alignItems="center">
        <Button
          style={ styles.button }
          onPress={ () => {logInWithEmailAndPassword(email, password)} }
          _text={{ color: "#FFFFFF", fontSize: "20px", fontWeight: "bold" }}
        >
          Iniciar sesión
        </Button>
    </Flex>
    </Stack>
    <VStack space={8} top="15%">
      <Text style={ styles.registerTextOption }>O iniciar sesión con</Text>
      <TouchableOpacity onPress={ () => {} }>
        <Image
          style={ styles.googleImage }
          source={ require('../../assets/images/logos_google-icon.png') }
          alt='google'
        />
      </TouchableOpacity>
    </VStack>
    <HStack space={2} left="10%" top="50%">
      <Text style={ styles.moveToRegister }>No tienes una cuenta?</Text>
      <Link
        style={ styles.link }
        onPress={ () => {navigation.navigate('RegisterScreen')} }
        _text={{ color: "#BC2666" }}
      >
        Registrarse
      </Link>
    </HStack>
  </NativeBaseProvider>;
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    textAlign: 'center',
    width: "60%",
    left: "2.3%",
    top: "35%",
    borderRadius: 30
  },
  heading: {
    flex: 0,
    left: '1%',
    top: '-10%',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
  },
  googleImage: {
    top: "0%",
    left: "47%",
    right: "0%",
    bottom: "0%",
  },
  link: {
    top: "50%",
    left: "0%",
  },
  stack: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    top: '20%',
  },
  registerTextOption: {
    top: '0%',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 21,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  moveToRegister: {
    top: '2.8%',
    left: '0%',
  }
});
