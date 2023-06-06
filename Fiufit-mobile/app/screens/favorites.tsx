import * as React from 'react';
import { View } from 'native-base';
import TrainingsList from '../components/trainings/trainingsList';

export default function FavoritesScreen({ navigation }: any) {
    return <View style={{ flex: 1 }} backgroundColor="#fff">
        <TrainingsList navigation={navigation} onlyFavorites />
    </View>;
}
