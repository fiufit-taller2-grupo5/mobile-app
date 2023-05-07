import { VStack, Heading, NativeBaseProvider } from "native-base";
import SubmitButton from "../../components/editProfile/submitButton";
import { editProfileStyles } from "../../styles";
import React from "react";
import WeightForm from "../../components/metadata/weightForm";


export default function ChangeWeightScreen({ navigation }: any) {
  const [weight, setWeight] = React.useState(50);

  return <NativeBaseProvider>
    <VStack width="100%" space={4} alignItems="center">
      <Heading style={editProfileStyles.heading}>
        ¿Cuál es tu peso?
      </Heading>
      <WeightForm top="60%" weight={weight} setWeight={setWeight}/>
      <SubmitButton
        navigation={navigation}
        optionName="weight"
        newValue={weight}
        setter={setWeight}
        emptyValue={50}
      />
    </VStack>
  </NativeBaseProvider>;
}
