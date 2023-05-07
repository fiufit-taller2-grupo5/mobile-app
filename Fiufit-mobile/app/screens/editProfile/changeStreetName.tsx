import { NativeBaseProvider, VStack, Heading } from "native-base";
import SubmitButton from "../../components/editProfile/submitButton";
import { editProfileStyles } from "../../styles";
import { useState } from "react";
import StreetNameForm from "../../components/metadata/streetNameForm";


export default function ChangeStreetNameScreen({ navigation }: any) {
  const [streetName, setStreetName] = useState("");

  return <NativeBaseProvider>
    <VStack width="100%" space={4} alignItems="center">
      <Heading style={editProfileStyles.heading}>
        ¿En que calle vives?
      </Heading>
      <StreetNameForm
        top={"60%"}
        width="xs"
        streetName={streetName}
        setStreetName={setStreetName}
      />
      <SubmitButton
        navigation={navigation}
        optionName="streetName"
        newValue={streetName}
        setter={setStreetName}
        emptyValue={""}
      />
    </VStack>
  </NativeBaseProvider>;
}
