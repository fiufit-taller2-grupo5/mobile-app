import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Heading, Image, Link, Input, Button, Text, Icon, Stack, Pressable, NativeBaseProvider, extendTheme } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";


export default function LoginScreen({ navigation } : any) {
    const theme = extendTheme({
        components: {
            Image: {
                defaultProps: {
                    top: "1250%",
                    left: "47%",
                    right: "0%",
                    bottom: "0%",
                }
            },
            Link: {
                defaultProps: {
                    top: "81.3%",
                    left: "27%",
                }
            },
            Text: {
                variants: {
                    ingresoAlternativo: {
                        top: '25%',
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
                    registrarse: {
                        top: '40%',
                        left: '20%',
                        color: '#AEAEAE'
                    }
                }
            },
            Button: {
                defaultProps: {
                    width: "350px",
                    height: "55px",
                    left: "22px",
                    top: "40%",
                    background: "#FF6060",
                    borderRadius: "30px",
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
            }
        }
    });

    const [show, setShow] = React.useState(false);

    return <NativeBaseProvider theme={theme}>
        <Container>
            <Heading>Ingresa tus datos</Heading>
        </Container>
        <Stack space={4} w="100%" alignItems="center" variant="inputLogin">
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
        _text={{color: "#FFFFFF", fontSize: "20px", fontWeight: "bold"}}>Iniciar sesión</Button>
        <Text variant="ingresoAlternativo">O iniciar sesión con</Text>
        <TouchableOpacity onPress={() => {}}>
            <Image source={require('../../assets/images/logos_google-icon.png')} alt='google'/>
        </TouchableOpacity>
        <Text variant="registrarse">No tienes una cuenta?</Text>
        <Link onPress={() => {navigation.navigate('RegisterScreen')}} _text={{color: "#BC2666"}}>
            Registrarse
        </Link>
    </NativeBaseProvider>;
}