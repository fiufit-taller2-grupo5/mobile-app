import { VStack, Select, Heading, NativeBaseProvider, CheckIcon } from "native-base";
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
    {errorMessage && <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}
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
