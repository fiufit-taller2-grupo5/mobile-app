import * as React from "react";
import { NativeBaseProvider, View } from "native-base";
import TrainingCard from "../components/trainings/trainingCard";

export default function TrainingInfoScreen({ route, navigation }: any) {
  const { trainingData, userLatitude, userLongitude } = route.params;
  return (
    <NativeBaseProvider>
      <View flex={1} backgroundColor={"#ffffff"}>
        <TrainingCard
          navigation={navigation}
          trainingData={trainingData}
          userLatitude={userLatitude}
          userLongitude={userLongitude}/>
      </View>
    </NativeBaseProvider>
  );
}
