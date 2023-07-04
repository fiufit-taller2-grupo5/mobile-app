import { useState, useEffect } from "react";
import { VStack, Input, Heading, NativeBaseProvider, Modal, View } from "native-base";
import SubmitButton from "../../components/editProfile/submitButton";
import { editProfileStyles } from "../../styles";
import ErrorMessage from "../../components/form/errorMessage";
import globalUser from "../../../userStorage";


export default function ChangeNameScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function updateName() {
      if (name !== "") {
        await globalUser.setName(name);
      }
    }
    updateName();
  }, [name]);

  return <NativeBaseProvider>
    <VStack width="100%" space={4} alignItems="center">
      {errorMessage && 
        <Modal
          style={{maxHeight:"20%", height:"20%", width:"100%", top:"-1.3%"}}
          _backdrop={{backgroundColor: "transparent"}}
          closeOnOverlayClick={true}
          onClose={() => setErrorMessage("")}
          isOpen={errorMessage !== ""}
        >
          <View maxHeight="20%" width="100%">
            <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
          </View>
        </Modal>
      }
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
        setErrorMessage={setErrorMessage}
      />
    </VStack>
  </NativeBaseProvider>;
}
