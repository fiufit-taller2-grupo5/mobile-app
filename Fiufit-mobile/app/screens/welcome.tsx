import * as React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Center, Container, Box, Button, AspectRatio, Image, Text, NativeBaseProvider, extendTheme } from 'native-base';

export default function WelcomeScreen({navigation} : NativeStackScreenProps<any, any>) {
    const theme = extendTheme({
        components: {
            Button: {
                baseStyle: {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '11px 22px',
                    gap: '10px',
                    position: 'absolute',
                    width: '141px',
                    height: '53px',
                    top: '750px',
                    background: '#FF6060',
                    borderRadius: '50px',
                },
                variants: {
                    firstButton: {
                        left: '10%',
                    },
                    secondButton: {
                        left: '55%',
                    }
                }
            },
            Text: {
                baseStyle: {
                    fontFamily: 'BebasNeue',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    textAlign: 'center',
                },
                variants: {
                    heading1: {
                        paddingTop: '45%',
                        left: '0%',
                        right: '0%',
                        top: '0%',
                        bottom: '0%',
                        fontSize: '100px',
                        lineHeight: '120px',
                        color: '#FF6060'
                    },
                    heading2: {
                        left: '14.00%',
                        right: '60.23%',
                        top: '-5%',
                        bottom: '68.24%',
                        fontSize: '77px',
                        lineHeight: '92px',
                        color: '#616161'
                    },
                    heading3: {
                        left: '45.0%',
                        right: '4.82%',
                        top: '-27%',
                        bottom: '67.9%',
                        fontSize: '88px',
                        lineHeight: '106px',
                        color: '#000000'
                    },
                    paragraph: {
                        fontFamily: 'Roboto',
                        top: '-75%',
                        width: '305px',
                        height: '160px',
                        fontSize: '20px',
                        lineHeight: '30px',
                        letterSpacing: '-0.01em',
                        color: '#212121',
                    }
                }
            }
        }
    });

    return <NativeBaseProvider theme={theme}>
        <Container>
                <Text variant="heading1"> DESAFIA </Text>
                <Text variant="heading2" > TUS </Text>
                <Text variant="heading3"> LIMITES </Text>
            </Container>
        <Center>
            <Container>
                <Text variant="paragraph">
                    Realizá un seguimiento de tus entrenamientos, obtén mejores resultados y sé la mejor versión de ti mismo.
                </Text>
            </Container>
        </Center>
        <Box top="-22%">
          <AspectRatio w="70%" ratio={16 / 9}>
            <Image source={require('../../assets/images/welcome_image.png')} alt="image" />
          </AspectRatio>
        </Box>
        <Button 
        _text={{color: "#FFFFFF"}}
        variant="firstButton"
        onPress={() => navigation.navigate('LoginScreen')}
        >
            Iniciar sesión
        </Button>
        <Button
        _text={{color: "#FFFFFF"}}
        variant="secondButton"
        onPress={() => navigation.navigate('RegisterScreen')}
        >
        Registrarse
        </Button>

    </NativeBaseProvider>;
}
