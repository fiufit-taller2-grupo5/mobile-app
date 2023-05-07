import { VStack, Heading, NativeBaseProvider } from "native-base";
import SubmitButton from "../../components/editProfile/submitButton";
import { editProfileStyles } from "../../styles";
import { useState } from "react";
import HeightForm from "../../components/metadata/heightForm";


export default function ChangeHeightScreen({ navigation }: any) {
  const [height, setHeight] = useState(150);

  return <NativeBaseProvider>
    <VStack width="100%" space={4} alignItems="center">
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
      />
    </VStack>
  </NativeBaseProvider>;
}
