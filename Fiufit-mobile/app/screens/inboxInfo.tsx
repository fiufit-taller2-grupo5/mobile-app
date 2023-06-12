import * as React from "react";
import { NativeBaseProvider, View, Text } from "native-base";
import InboxCard from "../components/inbox/inboxCard";

export default function InboxInfoScreen({ route, navigation }: any) {
  const { chatMetadata } = route.params;
  return (
    <NativeBaseProvider>
      <View flex={1} backgroundColor={"#ffffff"}>
        <InboxCard navigation={navigation} chatMetadata={chatMetadata} />
      </View>
    </NativeBaseProvider>
  );
};

