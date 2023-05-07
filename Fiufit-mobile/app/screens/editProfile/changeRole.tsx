import { VStack, Select, Heading, NativeBaseProvider, CheckIcon } from "native-base";
import SubmitButton from "../../components/editProfile/submitButton";
import { useState } from "react";
import { editProfileStyles } from "../../styles";


export default function ChangeRoleScreen({ navigation }: any) {
  const [role, setRole] = useState("Atleta");

  return <NativeBaseProvider>
    <VStack width="100%" space={4} alignItems="center">
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
      />
    </VStack>
  </NativeBaseProvider>;
}
