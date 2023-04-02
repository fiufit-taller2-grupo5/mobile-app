import * as React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Flex, Heading, Stack, Input, Image, Icon, Button, Link, Text, NativeBaseProvider, extendTheme, Pressable } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons";


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

  const [show, setShow] = React.useState(false);

  return <NativeBaseProvider theme={theme}>
    <Container>
      <Heading style={styles.heading} >Crear una cuenta</Heading>
    </Container>
    <Stack
    space={4} w="100%"
    alignItems="center"
    style={styles.stack}
    >
      <Input w={{ base: "80%", md: "30%"}} h="15%" variant="underlined" placeholder="Nombre completo" />
      <Input w={{ base: "80%", md: "30%"}} h="15%" variant="underlined" placeholder="Email" />
      <Input w={{base: "80%", md: "25%"}}
      h="15%"
      type={show ? "text" : "password"}
      variant="underlined"
      InputRightElement={<Pressable onPress={() => setShow(!show)}>
      <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
      size={5} mr="2" color="muted.400" />
      </Pressable>} placeholder="Contraseña" />
    </Stack>
    <Flex h="12" alignItems="center">
      <Button
      style={styles.button}
      onPress={() => {navigation.navigate('HomeScreen')}}
      _text={{color: "#FFFFFF", fontSize: "20px", fontWeight: "bold"}}>Registrarse</Button>
    </Flex>
    <Text style={styles.loginTextOption} >O registrarse con</Text>
    <TouchableOpacity onPress={() => {}}>
        <Image
        style={styles.googleImage}
        source={require('../../assets/images/logos_google-icon.png')}
        alt='google'/>
    </TouchableOpacity>
    <Text style={styles.moveToLogin} >No tienes una cuenta?</Text>
    <Link
    style={styles.link}
    onPress={() => {navigation.navigate('LoginScreen')}} 
    _text={{color: "#BC2666"}}>
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
    left: '27%',
    top: '450%',
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