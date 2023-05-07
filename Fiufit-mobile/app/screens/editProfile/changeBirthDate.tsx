import { NativeBaseProvider, VStack, Heading } from "native-base";
import { useState } from "react";
import BirthDateForm from "../../components/metadata/birthdateForm";
import SubmitButton from "../../components/editProfile/submitButton";
import { editProfileStyles } from "../../styles";


export default function ChangeDateScreen({ navigation }: any) {
  const [date, setDate] = useState<Date | null>(null);

  return <NativeBaseProvider>
    <VStack width="100%" space={4} alignItems="center">
      <Heading style={editProfileStyles.heading}>
        ¿Cuando naciste?
      </Heading>
      <BirthDateForm top={"60%"} date={date} setDate={setDate}/>
      <SubmitButton
        navigation={navigation}
        optionName="weight"
        newValue={date}
        setter={setDate}
        emptyValue={null}
      />
    </VStack>
  </NativeBaseProvider>;
}
