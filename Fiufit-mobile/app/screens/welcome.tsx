import * as React from 'react';
import { StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Center, Container, Box, Button, AspectRatio, Image, Text, NativeBaseProvider, extendTheme } from 'native-base';

export default function WelcomeScreen({navigation} : NativeStackScreenProps<any, any>) {
    const theme = extendTheme({
        components: {
            Button: {
                defaultProps: {
                    background: '#FF6060',
                },
            },
            Text: {
                variants: {
                    heading1: {
                        color: '#FF6060'
                    },
                    heading2: {
                        color: '#616161'
                    },
                    heading3: {
                        color: '#000000'
                    },
                    paragraph: {
                        color: '#212121',
                    }
                }
            }
        }
    });

    return <NativeBaseProvider theme={theme}>
        <Container>
                <Text style={[styles.text, styles.heading1]} variant="heading1"> DESAFIA </Text>
                <Text style={[styles.text, styles.heading2]} variant="heading2" > TUS </Text>
                <Text style={[styles.text, styles.heading3]} variant="heading3"> LIMITES </Text>
            </Container>
        <Center>
            <Container>
                <Text style={[styles.text, styles.paragraph]} variant="paragraph">
                    Realizá un seguimiento de tus entrenamientos, obtén mejores resultados y sé la mejor versión de ti mismo.
                </Text>
            </Container>
        </Center>
        <Box top="-18%">
          <AspectRatio w="70%" ratio={16 / 9}>
            <Image source={require('../../assets/images/welcome_image.png')} alt="image" />
          </AspectRatio>
        </Box>
        <Button
        style={[styles.button, styles.firstButton]}
        _text={{color: "#FFFFFF"}}
        variant="firstButton"
        onPress={() => navigation.navigate('LoginScreen')}
        >
            Iniciar sesión
        </Button>
        <Button
        style={[styles.button, styles.secondButton]}
        _text={{color: "#FFFFFF"}}
        variant="secondButton"
        onPress={() => navigation.navigate('RegisterScreen')}
        >
        Registrarse
        </Button>

    </NativeBaseProvider>;
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '10%',
        paddingRight: '10%',
        gap: 10,
        position: 'absolute',
        width: '35%',
        height: '5%',
        top: '88%',
        left: '20%',
        borderRadius: 50,
    },
    firstButton: {
        left: '10%',
    },
    secondButton: {
        left: '55%',
    },
    text: {
        fontFamily: 'BebasNeue',
        fontStyle: 'normal',
        fontWeight: '400',
        textAlign: 'center',
    },
    heading1: {
        paddingTop: '45%',
        left: '0%',
        right: '0%',
        top: '0%',
        bottom: '0%',
        fontSize: 100,
        lineHeight: 120,
    },
    heading2: {
        left: '14.00%',
        right: '60.23%',
        top: '-5%',
        bottom: '68.24%',
        fontSize: 77,
        lineHeight: 92,
    },
    heading3: {
        left: '45.0%',
        right: '4.82%',
        top: '-27%',
        bottom: '67.9%',
        fontSize: 88,
        lineHeight: 106,
    },
    paragraph: {
        fontFamily: 'Roboto',
        top: '-90%',
        width: '305px',
        height: '160px',
        fontSize: 20,
        lineHeight: 30,
        letterSpacing: -0.01,
    }
});
