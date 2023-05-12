import * as React from 'react';
import { Container, NativeBaseProvider } from 'native-base';
import FavoritesTrainingsList from '../components/trainings/favoritesTrainingsList';

export default function FavoritesScreen({ navigation }: any) {
    return <NativeBaseProvider>
        <Container minWidth="400" height="800" backgroundColor="#fff">
            <FavoritesTrainingsList navigation={navigation}/>
        </Container>
    </NativeBaseProvider>;
}
