import * as React from 'react';
import { Container, NativeBaseProvider } from 'native-base';
import TrainingCard from '../components/trainings/trainingCard';
  
export default function TrainingInfoScreen({ route, navigation }: any) {
    const { trainingData } = route.params;
    return <NativeBaseProvider>
        <Container minWidth="400" height="800" backgroundColor="#fff">
        <TrainingCard navigation={navigation} trainingData={trainingData}/>
        </Container>
      </NativeBaseProvider>;
  };