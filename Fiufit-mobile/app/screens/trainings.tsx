import React from 'react';
import {NativeBaseProvider} from "native-base";
import TrainingsList from '../components/trainings/trainingsList';

export default function Trainings() {
    return <NativeBaseProvider>
        <TrainingsList/>
    </NativeBaseProvider>;
}