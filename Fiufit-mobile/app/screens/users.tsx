import * as React from 'react';
import { Container, Text, NativeBaseProvider, extendTheme, View } from 'native-base';

export default function UsersScreen() {
    const theme = extendTheme({
        components: {
            Text: {
                defaultProps: {
                    fontFamily: 'Roboto',
                    fontStyle: 'normal',
                    fontWeight: '800',
                    fontSize: '30px',
                }
            }
        }
    });

    return <NativeBaseProvider theme={theme}>
        <View flex={1} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
            <Text>Users Screen</Text>
        </View>
    </NativeBaseProvider>;
}