import { VStack, Heading, NativeBaseProvider } from "native-base";
import SubmitButton from "../../components/editProfile/submitButton";
import { editProfileStyles } from "../../styles";
import { useEffect, useState } from "react";
import InterestsForm from "../../components/metadata/interestsForm";
import ErrorMessage from "../../components/form/errorMessage";
import globalUser from "../../../userStorage";


export default function ChangeInterestsScreen({ navigation }: any) {
  const [interests, setInterests] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function updateInterests() {
      if (interests !== null) {
        globalUser.setInterests(interests);
      }
    }
    updateInterests();
  }, [interests]);
  

  return <NativeBaseProvider>
    <VStack width="100%" space={4} alignItems="center">
      {errorMessage && <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}
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
        setErrorMessage={setErrorMessage}
      />
    </VStack>
  </NativeBaseProvider>;
}