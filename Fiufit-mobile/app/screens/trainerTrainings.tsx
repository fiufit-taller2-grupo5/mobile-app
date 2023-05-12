import * as React from 'react';
import { Container, NativeBaseProvider } from 'native-base';
import TrainerTrainingsList from '../components/trainings/trainerTrainingsList';

export default function TrainerTrainingsScreen({ navigation }: any) {
    return <NativeBaseProvider>
        <Container minWidth="400" height="800" backgroundColor="#fff">
            <TrainerTrainingsList navigation={navigation}/>
        </Container>
    </NativeBaseProvider>;
}
