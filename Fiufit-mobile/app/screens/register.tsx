import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Heading, Stack, Input, Image, Icon, Button, Link, Text, NativeBaseProvider, extendTheme, Pressable } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons";


export default function RegisterScreen({ navigation } : any) {
  const theme = extendTheme({
    components: {
      Image: {
        defaultProps: {
            top: "780%",
            left: "47%",
            right: "0%",
            bottom: "0%",
        }
      },
      Text: {
        variants: {
            ingresoAlternativo: {
                top: '15%',
                fontFamily: 'Montserrat',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '15px',
                lineHeight: '21px',
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                color: '#AEAEAE'
            },
            iniciarSesion: {
                top: '25%',
                left: '20%',
                color: '#AEAEAE'
            }
        }
      },
      Heading: {
          defaultProps: {
            height: '38px',
            left: '25%',
            top: '350%',
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '800',
            fontSize: '30px',
            lineHeight: '35px',
            textAlign: 'center',
            color: '#FF6060',
          }
      },
      Stack: {
        variants: {
            inputLogin: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                top: '15%',
            }
        }
      },
      Button: {
        defaultProps: {
            width: "350px",
            height: "55px",
            left: "22px",
            top: "20%",
            background: "#FF6060",
            borderRadius: "30px",
        }
      },
      Link: {
        defaultProps: {
            top: "48.9%",
            left: "27%",
        }
      },
    }
  });

  const [show, setShow] = React.useState(false);

  return <NativeBaseProvider theme={theme}>
    <Container>
      <Heading>Crear una cuenta</Heading>
    </Container>
    <Stack space={4} w="100%" alignItems="center" variant="inputLogin">
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
    <Button
        onPress={() => {navigation.navigate('HomeScreen')}}
        _text={{color: "#FFFFFF", fontSize: "20px", fontWeight: "bold"}}>Registrarse</Button>
        <Text variant="ingresoAlternativo">O registrarse con</Text>
        <TouchableOpacity onPress={() => {}}>
            <Image source={require('../../assets/images/logos_google-icon.png')} alt='google'/>
        </TouchableOpacity>
        <Text variant="iniciarSesion">No tienes una cuenta?</Text>
        <Link onPress={() => {navigation.navigate('LoginScreen')}} _text={{color: "#BC2666"}}>
            Iniciar sesión
        </Link>
  </NativeBaseProvider>;
}