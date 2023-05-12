import { NativeBaseProvider, VStack, Heading } from "native-base";
import LocationForm from "../../components/metadata/locationForm";
import SubmitButton from "../../components/editProfile/locationSubmitButton";
import { editProfileStyles } from "../../styles";
import { useState } from "react";
import ErrorMessage from "../../components/form/errorMessage";


export default function ChangeLocationScreen({ navigation }: any) {
  const [streetName, setStreetName] = useState("");
  const [streetNumber, setStreetNumber] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  return <NativeBaseProvider>
    <VStack width="100%" space={4} alignItems="center">
      {errorMessage && <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}
      <Heading style={editProfileStyles.heading}>
        ¿Cuál es tu dirección?
      </Heading>
      <LocationForm
        streetName={streetName}
        setStreetName={setStreetName}
        streetNumber={streetNumber}
        setStreetNumber={setStreetNumber}
      />
      <SubmitButton
        navigation={navigation}
        newStreetName={streetName}
        newStreetNumber={streetNumber}
        setterStreetName={setStreetName}
        setterStreetNumber={setStreetNumber}
      />
    </VStack>
  </NativeBaseProvider>;
}
