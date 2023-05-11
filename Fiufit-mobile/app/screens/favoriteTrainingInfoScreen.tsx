import * as React from 'react';
import { NativeBaseProvider } from 'native-base';
import FavoriteTrainingCard from '../components/trainings/favoriteTrainingCard';
  
export default function FavoriteTrainingInfoScreen({ route, navigation }: any) {
    const { trainingData } = route.params;
    return <NativeBaseProvider>
        <FavoriteTrainingCard navigation={navigation} trainingData={trainingData}/>
      </NativeBaseProvider>;
  };