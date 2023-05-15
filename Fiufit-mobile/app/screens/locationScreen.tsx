import React, { useState } from "react";
import { NativeBaseProvider, VStack, Heading } from "native-base";
import { loginAndRegisterStyles } from "../styles";
import LocationForm from "../components/metadata/locationForm";
import SubmitButton from "../components/extraInformation/locationSubmitButton";


export default function LocationScreen({ navigation }: any) {
  const [streetName, setStreetName] = useState("");
  const [streetNumber, setStreetNumber] = useState(0);

  return <NativeBaseProvider>
    <VStack
      space={6}
      style={loginAndRegisterStyles.stack}
      height={"full"}
      width={"full"}
      top="-10%"
    >
      <Heading
        mt={"10"}
        mb={"10"}
        style={[loginAndRegisterStyles.heading, loginAndRegisterStyles.heading1]}
      >
        Queremos conocerte mas!
      </Heading>
      <Heading
        mt={"10"}
        mb={"10"}
        style={[loginAndRegisterStyles.heading1, loginAndRegisterStyles.heading2]}
      >
        ¿En donde vivis?
      </Heading>
      <LocationForm
        streetName={streetName}
        setStreetName={setStreetName}
        streetNumber={streetNumber}
        setStreetNumber={setStreetNumber}
        top='30%'
      />
      <SubmitButton
        navigation={navigation}
        streetName={streetName}
        streetNumber={streetNumber}
      />
    </VStack>
  </NativeBaseProvider>;
}