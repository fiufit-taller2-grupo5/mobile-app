import * as React from 'react';
import { Container, NativeBaseProvider, View } from 'native-base';
import TrainingsList from '../components/trainings/trainingsList';

export default function TrainerTrainingsScreen({ navigation }: any) {
    return <View flex={1} backgroundColor="#fff">
        <TrainingsList navigation={navigation} />
    </View>
}
