import * as React from 'react';
import { StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Center, Container, Box, Button, AspectRatio, Image, Text, NativeBaseProvider, extendTheme, Flex } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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

    return <SafeAreaProvider>
        <NativeBaseProvider theme={theme}>
            <Flex style={[styles.textBox]}>
                <Text style={[styles.text, styles.heading1]} variant="heading1"> DESAFIA </Text>
                <Text style={[styles.text, styles.heading2]} variant="heading2" > TUS </Text>
                <Text style={[styles.text, styles.heading3]} variant="heading3"> LIMITES </Text>
            </Flex>
            <Center>
                <Flex>
                    <Text style={[styles.text, styles.paragraph]} variant="paragraph">
                        Realizá un seguimiento de tus entrenamientos, obtén mejores resultados y sé la mejor versión de ti mismo.
                    </Text>
                </Flex>
                <AspectRatio 
                style={{top: '15%'}}
                w="100%" 
                ratio={16 / 9}>
                    <Image 
                    source={require('../../assets/images/welcome_image.png')} 
                    alt="image" />
                </AspectRatio>
            </Center>
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

        </NativeBaseProvider>
    </SafeAreaProvider>;
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
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
    textBox: {
        textAlign: 'center',
        flexDirection: 'row',
    },
    text: {
        position: 'relative',
        fontFamily: 'BebasNeue',
        fontStyle: 'normal',
        fontWeight: '400',

    },
    heading1: {
        left: '15%',
        right: '0%',
        top: '-20%',
        bottom: '0%',
        fontSize: 100,
        lineHeight: 120,
    },
    heading2: {
        left: '-18.00%',
        right: '0.23%',
        top: '69%',
        bottom: '68.24%',
        fontSize: 77,
        lineHeight: 92,
    },
    heading3: {
        top: '22%',
        right: '15%',
        fontSize: 88,
        lineHeight: 106,
    },
    paragraph: {
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: 'Roboto',
        top: '20%',
        width: '50%',
        height: '20%',
        fontSize: 20,
        lineHeight: 30,
        letterSpacing: -0.01,
    }
});
