import { Icon, Input, Pressable } from "native-base";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";


interface Props {
  password: string;
  setPassword: (password: string) => void;
}

export default function InputPassword(props: Props) {
  const { password, setPassword } = props;
  const [show, setShow] = useState(false);
    
  return (
      <Input
      value={password}
      w={{ base: "80%", md: "25%" }}
      h="12%"
      type={ show ? "text" : "password" }
      variant="underlined"
      onChangeText={ (password) => setPassword(password) }
      InputRightElement={<Pressable onPress={ () => setShow(!show) }>
      <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
      size={5} mr="2" color="muted.400" />
      </Pressable>} placeholder="Contraseña"
    />
  );
}