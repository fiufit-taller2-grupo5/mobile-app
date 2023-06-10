import * as React from 'react';
import { Container, Text, NativeBaseProvider, extendTheme, View } from 'native-base';
import UsersList from '../components/users/usersList';

export default function UsersScreen({ navigation}: { navigation: any}) {
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
            <UsersList
                navigation={navigation}
            />
        </View>
    </NativeBaseProvider>;
}