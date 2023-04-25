import * as React from 'react';
import { NativeBaseProvider } from 'native-base';
import TrainingCard from '../components/trainings/trainingCard';

export default function TrainingInfoScreen({ navigation }: any) {
    return <NativeBaseProvider>
        <TrainingCard navigation={navigation}/>
      </NativeBaseProvider>;
  };