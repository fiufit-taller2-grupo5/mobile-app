import React from 'react';
import {Container, NativeBaseProvider} from "native-base";
import TrainingsList from '../components/trainings/trainingsList';

export default function Trainings({ navigation }: any) {
    return <NativeBaseProvider>
        <Container minWidth="400" height="800" backgroundColor="#fff">
        <TrainingsList navigation={navigation}/>
        </Container>
    </NativeBaseProvider>;
}