import { VStack, Input, Heading, NativeBaseProvider } from "native-base";
import SubmitButton from "../../components/editProfile/submitButton";
import React from "react";
import { editProfileStyles } from "../../styles";


export default function ChangeNameScreen({ navigation }: any) {
  const [name, setName] = React.useState("");

  return <NativeBaseProvider>
    <VStack width="100%" space={4} alignItems="center">
      <Heading style={editProfileStyles.heading}>
        ¿Cuál es tu nombre?
      </Heading>
      <Input
        placeholder="Nombre Completo"
        width="80%"
        variant="underlined"
        py="7%"
        top="50%"
        fontSize={18}
        value={name}
        onChangeText={(nombre) => setName(nombre)}
      />
      <SubmitButton
        navigation={navigation}
        optionName="name" 
        newValue={name}
        setter={setName}
        emptyValue=""
      />
    </VStack>
  </NativeBaseProvider>;
}
