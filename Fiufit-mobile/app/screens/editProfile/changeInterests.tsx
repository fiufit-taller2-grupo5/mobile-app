import { VStack, Heading, NativeBaseProvider } from "native-base";
import SubmitButton from "../../components/editProfile/submitButton";
import { editProfileStyles } from "../../styles";
import { useState } from "react";
import InterestsForm from "../../components/metadata/interestsForm";


export default function ChangeInterestsScreen({ navigation }: any) {
  const [interests, setInterests] = useState([]);

  return <NativeBaseProvider>
    <VStack width="100%" space={4} alignItems="center">
      <Heading style={editProfileStyles.heading}>
        ¿Cuáles son tus intereses?
      </Heading>
      <InterestsForm
        top={"60%"}
        interests={interests}
        setInterests={setInterests}
      />
      <SubmitButton
        navigation={navigation}
        optionName="interests"
        newValue={interests}
        setter={setInterests}
        emptyValue={[]}
      />
    </VStack>
  </NativeBaseProvider>;
}