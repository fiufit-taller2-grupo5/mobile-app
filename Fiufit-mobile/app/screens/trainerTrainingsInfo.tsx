import * as React from 'react';
import { Container, NativeBaseProvider } from 'native-base';
import TrainerTrainingCard from '../components/trainings/trainerTrainingCard';
  
export default function TrainerTrainingInfoScreen({ route, navigation }: any) {
    const { trainingData } = route.params;
    return <NativeBaseProvider>
        <Container minWidth="400" height="800" backgroundColor="#fff">
            <TrainerTrainingCard navigation={navigation} trainingData={trainingData}/>
        </Container>
    </NativeBaseProvider>;
};