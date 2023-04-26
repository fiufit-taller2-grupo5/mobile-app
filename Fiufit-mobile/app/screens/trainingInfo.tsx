import * as React from 'react';
import { NativeBaseProvider } from 'native-base';
import TrainingCard from '../components/trainings/trainingCard';
  
export default function TrainingInfoScreen({ route, navigation }: any) {
    const { trainingData } = route.params;
    return <NativeBaseProvider>
        <TrainingCard navigation={navigation} trainingData={trainingData}/>
      </NativeBaseProvider>;
  };