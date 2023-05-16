import { VStack, Select, Heading, NativeBaseProvider, Modal, View } from "native-base";
import SubmitButton from "../../components/editProfile/submitButton";
import { useEffect, useState } from "react";
import { editProfileStyles } from "../../styles";
import globalUser from "../../../userStorage";
import ErrorMessage from "../../components/form/errorMessage";


export default function ChangeRoleScreen({ navigation }: any) {
  const [role, setRole] = useState("Atleta");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function updateRole() {
      if (role !== "") {
        await globalUser.setRole(role);
      }
    }
    updateRole();
  }, [role]);


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
        ¿Cuál es tu rol?
      </Heading>
      <Select
        top={"225"}
        selectedValue={role}
        minWidth="200"
        accessibilityLabel="Elige un rol"
        placeholder="Elige un rol" 
        _selectedItem={{bg: "#FF6060"}}
        variant="underlined"
        onValueChange={newRole => setRole(newRole)}>
          <Select.Item label="Atleta" value="Atleta" />
          <Select.Item label="Entrenador" value="Entrenador" />
      </Select>
      <SubmitButton
        navigation={navigation}
        optionName="role" 
        newValue={role}
        setter={setRole}
        emptyValue=""
        setErrorMessage={setErrorMessage}
      />
    </VStack>
  </NativeBaseProvider>;
}
