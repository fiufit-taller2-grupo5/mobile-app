import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text, NativeBaseProvider, extendTheme } from 'native-base';

export default function ProfileScreen() {
    const theme = extendTheme({
        components: {
            Box: {
                defaultProps: {
                    bg: '#FFFFFF',
                }
            }
        }
    });

    return <NativeBaseProvider theme={theme}>
        <Box>
            <Text style={profileStyles.text}>Florencia Sardella</Text>
        </Box>
    </NativeBaseProvider>;
}

const profileStyles = StyleSheet.create({
    text: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '800',
        fontSize: 30,
        top: '150px',
        left: '35%',
    },
    nameBox: {
        width: '100%',
        height: '100%',
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
    }
});