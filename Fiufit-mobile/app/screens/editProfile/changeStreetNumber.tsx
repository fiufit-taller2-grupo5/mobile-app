import { NativeBaseProvider, VStack, Heading } from "native-base";
import SubmitButton from "../../components/editProfile/submitButton";
import { editProfileStyles } from "../../styles";
import { useState } from "react";
import StreetNumberForm from "../../components/metadata/streetNumberForm";


export default function ChangeStreetNumberScreen({ navigation }: any) {
  const [streetNumber, setStreetNumber] = useState(0);

  return <NativeBaseProvider>
    <VStack width="100%" space={4} alignItems="center">
      <Heading style={editProfileStyles.heading}>
        ¿A qué altura de calle?
      </Heading>
      <StreetNumberForm
        top={"60%"}
        width="xs"
        streetNumber={streetNumber}
        setStreetNumber={setStreetNumber}
      />
      {/* <SubmitButton
        navigation={navigation}
        optionName="streetNumber"
        newValue={streetNumber}
        setter={setStreetNumber}
        emptyValue={0}
      /> */}
    </VStack>
  </NativeBaseProvider>;
}
