import { VStack, Heading, NativeBaseProvider } from "native-base";
import SubmitButton from "../../components/editProfile/submitButton";
import { editProfileStyles } from "../../styles";
import { useEffect, useState } from "react";
import HeightForm from "../../components/metadata/heightForm";
import ErrorMessage from "../../components/form/errorMessage";
import globalUser from "../../utils/storageController";


export default function ChangeHeightScreen({ navigation }: any) {
  const [height, setHeight] = useState(150);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function updateHeight() {
      if (height !== null) {
        await globalUser.setHeight(height);
      }
    }
    updateHeight();
  }, [height]);

  return <NativeBaseProvider>
    <VStack width="100%" space={4} alignItems="center">
      {errorMessage && <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}
      <Heading style={editProfileStyles.heading}>
        ¿Cuál es tu altura?
      </Heading>
      <HeightForm top={"60%"} height={height} setHeight={setHeight}/>
      <SubmitButton
        navigation={navigation}
        optionName="height"
        newValue={height}
        setter={setHeight}
        emptyValue={150}
        setErrorMessage={setErrorMessage}
      />
    </VStack>
  </NativeBaseProvider>;
}
