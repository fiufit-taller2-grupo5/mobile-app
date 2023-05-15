import { NativeBaseProvider, VStack, Heading } from "native-base";
import LocationForm from "../../components/metadata/locationForm";
import LocationSubmitButton from "../../components/editProfile/locationSubmitButton";
import { editProfileStyles } from "../../styles";
import { useEffect, useState } from "react";
import ErrorMessage from "../../components/form/errorMessage";
import globalUser from "../../../userStorage";


export default function ChangeLocationScreen({ navigation }: any) {
  const [streetName, setStreetName] = useState("");
  const [streetNumber, setStreetNumber] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function updateLocation() {
      if (streetName !== "" && streetNumber !== 0) {
        const location = streetName + streetNumber;
        globalUser.setLocation(location);
      }
    }
    updateLocation();
  }, [streetName, streetNumber]);

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
        top='60%'
      />
      <LocationSubmitButton
        navigation={navigation}
        newStreetName={streetName}
        newStreetNumber={streetNumber}
        setterStreetName={setStreetName}
        setterStreetNumber={setStreetNumber}
        setErrorMessage={setErrorMessage}
      />
    </VStack>
  </NativeBaseProvider>;
}
