import * as React from 'react';
import { Container, NativeBaseProvider } from 'native-base';
import FavoriteTrainingCard from '../components/trainings/favoriteTrainingCard';
  
export default function FavoriteTrainingInfoScreen({ route, navigation }: any) {
    const { trainingData } = route.params;
    return <NativeBaseProvider>
        <Container minWidth="400" height="800" backgroundColor="#fff">
        <FavoriteTrainingCard navigation={navigation} trainingData={trainingData}/>
        </Container>
      </NativeBaseProvider>;
  };