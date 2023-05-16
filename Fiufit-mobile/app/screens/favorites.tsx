import * as React from 'react';
import { Container, NativeBaseProvider, View } from 'native-base';
import FavoritesTrainingsList from '../components/trainings/favoritesTrainingsList';

export default function FavoritesScreen({ navigation }: any) {
    return <View style={{ flex: 1 }} backgroundColor="#fff">
        <FavoritesTrainingsList navigation={navigation} />
    </View>;
}
