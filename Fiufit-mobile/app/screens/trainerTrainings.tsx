import * as React from 'react';
import { Container, NativeBaseProvider, View } from 'native-base';
import TrainerTrainingsList from '../components/trainings/trainerTrainingsList';

export default function TrainerTrainingsScreen({ navigation }: any) {
    return <View flex={1} backgroundColor="#fff">
        <TrainerTrainingsList navigation={navigation} />
    </View>
}
