import React from 'react';
import { NativeBaseProvider, View, theme } from "native-base";
import UserTrainingsList from '../components/userTrainings/userTrainingsList';

export default function UserTrainingsScreen({ navigation }: any) {
    return <NativeBaseProvider theme={theme}>
      <View style={{ flex: 1 }} backgroundColor="#fff">
          <UserTrainingsList navigation={navigation} />
      </View>
    </NativeBaseProvider>;
}