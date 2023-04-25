import React from 'react';
import {NativeBaseProvider} from "native-base";
import TrainingsList from '../components/trainings/trainingsList';

export default function Trainings({ navigation }: any) {
    return <NativeBaseProvider>
        <TrainingsList navigation={navigation}/>
    </NativeBaseProvider>;
}