import React from 'react';
import { Container, NativeBaseProvider, View } from "native-base";
import TrainingsList from '../components/trainings/trainingsList';

export default function TrainingsScreen({ navigation }: any) {
    return <View style={{ flex: 1 }} backgroundColor="#fff">
        <TrainingsList navigation={navigation} />
    </View>;
}