import * as React from "react";
import { NativeBaseProvider, View } from "native-base";
import GoalCard from "../components/goals/goalCard";

export default function GoalInfoScreen({ route, navigation }: any) {
  const { goalData } = route.params;
  return (
    <NativeBaseProvider>
      <View flex={1} backgroundColor={"#ffffff"}>
        <GoalCard
          navigation={navigation}
          goalData={goalData}/>
      </View>
    </NativeBaseProvider>
  );
}
