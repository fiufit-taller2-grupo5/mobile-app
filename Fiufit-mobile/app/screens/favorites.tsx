import * as React from 'react';
import { Container, Text, NativeBaseProvider, extendTheme } from 'native-base';

export default function FavoritesScreen() {
    const theme = extendTheme({
        components: {
            Text: {
                defaultProps: {
                    fontFamily: 'Roboto',
                    fontStyle: 'normal',
                    fontWeight: '800',
                    fontSize: '30px',
                    top: '150px',
                    left: '35%',
                }
            }
        }
    });

    return <NativeBaseProvider theme={theme}>
        <Container>
            <Text>Favorites Screen</Text>
        </Container>
    </NativeBaseProvider>;
}